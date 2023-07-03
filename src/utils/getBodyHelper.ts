import { IncomingMessage, ServerResponse } from 'http';
import { isBodyValid } from './validationHelpers.js';

export const getBodyData = (req: IncomingMessage, res: ServerResponse): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let bodyData = '';
      req.on('data', (chunk: Uint8Array) => {
        bodyData += chunk.toString();
      });
      req.on('end', () => {
        if (isBodyValid(res, bodyData)) {
          resolve(bodyData);
        } else {
          reject;
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        reject(err);
      }
    }
  });
};
