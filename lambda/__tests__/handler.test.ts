import { login, callback } from "../handler";
import * as utils from '../util/post';

describe('Spotify Authorization Lambda Unit Tests', () => {
    describe('Login Tests', () => {
        test('Should return a 301', async () => {
            const res = await login();
            expect(res).toBeTruthy();
            expect(res).toEqual(expect.objectContaining({"statusCode": 301}));
        });
    });

    describe('Callback Tests', () => {
        test('Should perform a POST request on Spotify Token API', async () => {
            // Mock API Request
            const mockEvent = require('./mocks/callback-event.json');

            // Fake Spotify Response Object
            const spotify_response = { 
                access_token: "fake access token",
                refresh_token: "fake refresh token"
            };

            // Mock Post Request to Spotify API
            const mockPostRequest = jest.spyOn(utils, 'postRequest')
                .mockResolvedValue(JSON.stringify(spotify_response));

            const res = await callback(mockEvent);
            expect(res).toBeTruthy();
            expect(res).toEqual(expect.objectContaining({"statusCode": 302}));
            expect(mockPostRequest).toHaveBeenCalledTimes(1);
        });
    });
});