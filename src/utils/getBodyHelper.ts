import { IncomingMessage } from 'http';

export const getBodyData = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let bodyData = '';
      req.on('data', (chunk: Uint8Array) => {
        bodyData += chunk.toString();
      });
      req.on('end', () => {
        resolve(bodyData);
      });
    } catch (err) {
      if (err instanceof Error) {
        reject(err);
      }
    }
  });
};
