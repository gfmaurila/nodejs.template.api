import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";

import { RedisPostsController } from "@/api/RedisPostsController";
import { MessageController } from "@/api/MessageController";
import { LogController } from "@/api/LogController";
import { GithubController } from "@/api/GithubController";

import { RedisSubscriber } from "@/infrastructure/messaging/User/redis/RedisSubscriber";
import { Settings } from "@/core/env/Settings"; // caso exista no seu template

const app = express();
app.use(express.json());

// Healthcheck
app.get("/", (_req: Request, res: Response) => {
  res.send("API OK");
});

// Rotas
app.use("/redis-posts", RedisPostsController);
app.use("/messages", MessageController);
app.use("/github", GithubController);
app.use("/logs", LogController);

// Middleware de erro padrão (JSON)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[HTTP ERROR]", err);
  res.status(err?.status || 500).json({
    message: err?.message || "Internal Server Error",
  });
});

// Start
const PORT =
  Number(process.env.PORT) ||
  (Settings as any)?.HttpPort ||
  3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Subscriber (escuta eventos do canal)
(async () => {
  try {
    const subscriber = new RedisSubscriber("RedisPostsChannel");
    await subscriber.StartAsync();
  } catch (err) {
    console.error("[RedisSubscriber] Failed to start:", err);
  }
})();

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down...");
  // Feche conexões aqui se necessário (DB, Redis, etc.)
  process.exit(0);
});
