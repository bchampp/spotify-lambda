import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { postRequest, PostRequestOptions } from './util/post';
const querystring = require('querystring');

const client_id: string = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const api_redirect_uri: string = process.env.API_REDIRECT_URI;
const client_redirect_uri: string = process.env.CLIENT_REDIRECT_URI;

/**
 * Method to begin Spotify Login Flow. Redirects to Spotify Authorization Page.
 * Called with GET <api>/login.
 * 
 * @param event The API Gateway Event.
 * @returns An API Gateway Proxy Handler Response Body.
 */
export const login = async (): Promise<APIGatewayProxyResult> => {
  const scope: string = 'user-read-private user-read-email';

  const redirectLocation: string = 'https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: api_redirect_uri,
    });

  return {
    statusCode: 301,
    headers: {
      Location: redirectLocation
    },
    body: '',
  };
}

/**
 * The callback API that is called after the user has authorized the application.
 * Exchanges the Spotify Access Code for an Access Token and returns that to client.
 * 
 * @param event The API Gateway Event.
 * @returns An Api Gateawy Proxy Handler Response Body.
 */
export const callback = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const code = event.queryStringParameters['code'] || null;

  const form_data = 'code=' + code 
    + '&redirect_uri=' + api_redirect_uri
    + '&grant_type=authorization_code';

    // Create request options object
  const request_options: PostRequestOptions = {
    host: 'accounts.spotify.com',
    path: '/api/token',
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  const res = await postRequest(request_options, form_data)
  .catch(err => console.error(err));

  const parsedResponse = JSON.parse(res);

  const { access_token, refresh_token } = parsedResponse;

  return {
    statusCode: 302,
    body: '',
    headers: {
      Location: client_redirect_uri + '/?' + 
      querystring.stringify({
        access_token: access_token,
        refresh_token: refresh_token
      })
    }
  }
}
