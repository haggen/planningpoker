import { createServer } from "http";
import { Socket } from "net";
import { URL } from "url";
import { WebSocketServer } from "ws";

const webSocketServer = new WebSocketServer({ noServer: true });

const webServer = createServer((req, resp) => {
  // resp.end();
});

webServer.on("upgrade", (req, socket, head) => {
  webSocketServer.handleUpgrade(req, socket as Socket, head, (ws) => {
    webSocketServer.emit("connection", ws, req);
  });
});

webSocketServer.on("connection", (ws, req) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost/");

  console.log(`client connected from channel ${pathname}`);

  ws.on("message", (message) => {
    console.log(`message received in channel ${pathname}: ${message}`);
  });

  ws.on("close", (code) => {
    console.log(`client disconnected from channel ${pathname}`);
  });
});

webServer.listen(parseInt(process.env.PORT ?? "5000", 10));
