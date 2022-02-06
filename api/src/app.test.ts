import { App, Channel, Client } from "./app";

describe(App, () => {
  test("getChannel", () => {
    const app = new App();
    const a = app.getChannel("test");
    expect(a.name).toBe("test");
    const b = app.getChannel("test");
    expect(b).toBe(a);
  });

  test("attemptDisposeChannel", () => {
    const app = new App();
    expect(() => app.attemptDisposeChannel("test")).toThrow();
    const channel = app.getChannel("test");
    channel.clients.push({} as Client);
    expect(() => app.attemptDisposeChannel("test")).toThrow();
    channel.clients = [];
    expect(() => app.attemptDisposeChannel("test")).not.toThrow();
    expect(app.channels).not.toHaveProperty("test");
  });
});
