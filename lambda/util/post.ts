const https = require("https");

export interface PostRequestOptions {
    host: string;
    path: string;
    method: string;
    headers: any;
};

export const postRequest = (options: PostRequestOptions, data: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let buffer = "";
            res.on('data', chunk => {
                buffer += chunk
            });
            res.on('end', () => {
                resolve(buffer);
            });
        })

        // Error Handling
        req.on('error', (e) => {
            reject(e);
        });

        // Perform the request;
        req.write(data);

        // End the request
        req.end();
    });
};
