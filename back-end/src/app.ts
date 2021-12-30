import { WebSocket } from "ws";

type Action<T = unknown> = { type: string; payload: T };

const SyncActionType = "sync";

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

  send<T>(message: T) {
    const rawData = JSON.stringify(message);
    this.socket.send(rawData);
  }
}

class Channel {
  name: string;
  staleClients: Client[] = [];
  freshClients: Client[] = [];

  constructor(name: string) {
    this.name = name;
  }

  isEmpty() {
    return this.freshClients.length === 0;
  }

  addClient(socket: WebSocket) {
    const client = new Client(socket);
    if (this.freshClients.length === 0) {
      this.freshClients.push(client);
    } else {
      this.staleClients.push(client);
      this.requestSync();
    }
    return client;
  }

  removeClient(client: Client) {
    this.staleClients = this.staleClients.filter((c) => c !== client);
    this.freshClients = this.freshClients.filter((c) => c !== client);
  }

  requestSync() {
    this.freshClients[0].send({ type: SyncActionType });
  }

  handleAction(action: Action, sender: Client) {
    if (action.type === SyncActionType) {
      this.broadcast(action, this.staleClients);
      this.freshClients.push(...this.staleClients);
      this.staleClients = [];
    } else {
      this.broadcast(
        action,
        this.freshClients.filter((c) => c !== sender)
      );
    }
  }

  broadcast(action: Action, recipients: Client[]) {
    recipients.forEach((client) => {
      client.send(action);
    });
  }
}
