import { IncomingMessage, Server, ServerResponse, createServer } from "http";

const PORT = process.env.PORT || 4000;

const myServer: Server<typeof IncomingMessage, typeof ServerResponse> = createServer(async (req, res) => {
  if (req.url?.startsWith("/api/users")) {
    console.log('work with server and ', req.url);
    res.end('Request accepted');
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

myServer.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

