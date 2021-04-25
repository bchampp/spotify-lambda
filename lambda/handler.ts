import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
const http = require('http');
const querystring = require('querystring');

const client_id: string = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const api_redirect_uri: string = process.env.API_REDIRECT_URI;
const client_redirect_uri: string = process.env.CLIENT_REDIRECT_URI;

/**
 * Method to login through spotify and retreive an access token.
 * Called with GET <api>/login.
 * 
 * @param event The API Gateway Event
 * @returns An API Gateway Proxy Handler response.
 */
export const login = async (): Promise<APIGatewayProxyResult> => {
  const state: string = generateRandomString(16);
  const scope: string = 'user-read-private user-read-email';

  const redirectLocation: string = 'https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: api_redirect_uri,
      state: state
    });

  return {
    statusCode: 301,
    headers: {
      Location: redirectLocation
    },
    body: '',
  };
}

export const callback = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event);

  const code = event.queryStringParameters['code'] || null;
  const state = event.queryStringParameters['state'] || null;

  console.log(code);
  console.log(state);

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: client_redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  http.request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      var access_token = body.access_token,
          refresh_token = body.refresh_token;

      var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      http.request.get(options, function(error, response, body) {
        console.log(body);
      });

      const redirectLocation = client_redirect_uri +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        });

        return {
          statusCode: 301,
          headers: {
            Location: redirectLocation
          },
          body: JSON.stringify('Redirecting!'),
        };
    } else {
      const redirectLocation = client_redirect_uri +
        querystring.stringify({
          error: 'invalid_token'
        });

        return {
          statusCode: 301,
          headers: {
            Location: redirectLocation
          },
          body: JSON.stringify('Redirecting!'),
        };
    }
  });
}


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString: string = (length: number) => {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};