import { prisma } from "db/prisma";

Bun.serve({
  port: 8080,
  fetch(request, server) {
    if (server.upgrade(request)) {
      return;
    }
    return new Response("upgrade failed", { status: 500 });
  },
  websocket: {
    message: async (ws, message) => {
      try {
        await prisma.user.create({
          data: {
            username: Math.random().toString(),
            password: Math.random().toString(),
          },
        });
        ws.send(message);
      } catch (err) {
        console.error("Prisma error:", err);
        ws.send("DB error");
      }
    },
  },
});
