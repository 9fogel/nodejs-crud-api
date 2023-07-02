import { IncomingMessage, Server, ServerResponse, createServer } from 'http';
// import Controller from './controller/controller.js';
import { router } from './router/router.js';

const PORT = process.env.PORT || 3000;

const myServer: Server<typeof IncomingMessage, typeof ServerResponse> = createServer(router);

// const myServer: Server<typeof IncomingMessage, typeof ServerResponse> = createServer(
//   async (req: IncomingMessage, res: ServerResponse) => {
//     // if (req.url?.startsWith('/api/users')) {
//     await router(req, res);
//     // } else {
//     //   res.writeHead(404, { 'Content-Type': 'application/json' });
//     //   res.end(JSON.stringify({ message: 'Sorry, such route was not found' }));
//     // }
//   },
// );

myServer.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
