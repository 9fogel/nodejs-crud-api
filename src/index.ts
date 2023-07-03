import { IncomingMessage, Server, ServerResponse, createServer } from 'http';
import { router } from './router/router.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const myServer: Server<typeof IncomingMessage, typeof ServerResponse> = createServer(router);

myServer.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
