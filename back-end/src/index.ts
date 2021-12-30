import { createServer } from "http";
import { Socket } from "net";
import { URL } from "url";
import { WebSocketServer } from "ws";
import { App } from "./app";

const webSocketServer = new WebSocketServer({ noServer: true });

const webServer = createServer((req, resp) => {
  // resp.end();
});

const app = new App();

webServer.on("upgrade", (req, socket, head) => {
  webSocketServer.handleUpgrade(req, socket as Socket, head, (ws) => {
    webSocketServer.emit("connection", ws, req);
  });
});

webSocketServer.on("connection", (ws, req) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost/");

  console.log(`client connected to channel ${pathname}`);

  const channel = app.getChannel(pathname);
  const client = channel.addClient(ws);

  ws.on("message", (rawData) => {
    console.log(`message received in channel ${pathname}: ${rawData}`);

    const message = JSON.parse(rawData.toString());

    channel.handleAction(message, client);
  });

  ws.on("close", (code) => {
    console.log(`client disconnected from channel ${pathname}`);

    channel.removeClient(client);
    app.attemptDisposeChannel(channel.name);
  });
});

webServer.listen(parseInt(process.env.PORT ?? "5000", 10));
