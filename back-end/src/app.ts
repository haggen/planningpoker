import { WebSocket } from "ws";

export class App {
  channels: Record<string, Channel> = {};

  getChannel(name: string): Channel {
    if (!this.channels[name]) {
      this.channels[name] = new Channel(name);
    }
    return this.channels[name];
  }

  attemptDisposeChannel(name: string) {
    const channel = this.channels[name];
    if (channel?.isEmpty()) {
      delete this.channels[name];
    }
  }
}

class Client {
  socket: WebSocket;

  constructor(ws: WebSocket) {
    this.socket = ws;
  }

  send(message: string) {
    this.socket.send(message);
  }
}

class Channel {
  name: string;
  clients: Client[] = [];

  constructor(name: string) {
    this.name = name;
  }

  isEmpty() {
    return this.clients.length === 0;
  }

  addClient(socket: WebSocket) {
    const client = new Client(socket);
    this.clients.push(client);
    return client;
  }

  removeClient(client: Client) {
    this.clients = this.clients.filter((c) => c !== client);
  }

  broadcast(message: string, sender: Client) {
    this.clients.forEach((client) => {
      if (client !== sender) {
        client.send(message);
      }
    });
  }
}
