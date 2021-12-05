import { createServer } from "http";

const srv = createServer((req, resp) => {
  resp.writeHead(200, { "Content-Type": "text/plain" });
  resp.end("Hello World");
});

srv.listen(parseInt(process.env.PORT ?? "3000", 10));
