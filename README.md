# Spotify Authentication Lambda

This repository contains a serverless application which handles the Spotify Authorization Flow. 

## Lambda
This directory contains the serverless project. 

There are 2 API routes implemented: 
- `GET /login`
- `GET /callback`

The login route is what redirects the user to the Spotify Authorization Form. Once the user has succesfully authorized the application, it will then hit the callback endpoint. 
The callback endpoint is hit with an access code, which is then used with the Spotify Token API to exchange it for an access token and refresh token, which are then passed back to the client. 

Alternatively to passing the tokens to the client, the API could persist the tokens with the users information. Based on the use case of the application, it's up to the consumer of this lambda to handle the tokens. 

## Client
This directory contains a really simple react application to demonstrate the flow. 