import { Router, Request, Response } from "express";


import { randomUUID } from "crypto";
import { RedisClientFactory } from "@/infrastructure/cache/RedisClient";
import { RedisPublisher } from "@/infrastructure/messaging/User/redis/RedisPublisher";
import { RedisSubscriber } from "@/infrastructure/messaging/User/redis/RedisSubscriber";
import { RedisPostModel } from "@/domain/entities/RedisPostModel";

export const RedisPostsController = Router();
const PostKey = (id: string) => `RedisPost:${id}`;
const ChannelName = "RedisPostsChannel";
const Publisher = new RedisPublisher(ChannelName);

// GET /redis-posts
RedisPostsController.get("/", async (_req: Request, res: Response) => {
  const client = await RedisClientFactory.GetClientAsync();
  const keys = await client.keys("RedisPost:*");
  const items: RedisPostModel[] = [];

  for (const key of keys) {
    const json = await client.get(key);
    if (json) items.push(JSON.parse(json));
  }

  console.log(`Ação: GET /redis-posts - Retornados ${items.length} posts`);
  res.json(items);
});

// GET /redis-posts/:id
RedisPostsController.get("/:id", async (req: Request, res: Response) => {
  const client = await RedisClientFactory.GetClientAsync();
  const json = await client.get(PostKey(req.params.id));
  if (!json) {
    console.warn(`Ação: GET /redis-posts/${req.params.id} - Post não encontrado`);
    return res.status(404).json({ message: "Post not found" });
    }
  const post = JSON.parse(json) as RedisPostModel;
  console.log(`Ação: GET /redis-posts/${req.params.id} - Sucesso`);
  res.json(post);
});

// POST /redis-posts
RedisPostsController.post("/", async (req: Request, res: Response) => {
  const client = await RedisClientFactory.GetClientAsync();
  const body = req.body as Omit<RedisPostModel, "Id">;

  const post: RedisPostModel = {
    Id: randomUUID(),
    Title: body.Title,
    Content: body.Content,
  };

  await client.set(PostKey(post.Id), JSON.stringify(post));
  console.log(`Ação: POST /redis-posts - Criado | Id: ${post.Id} | Título: ${post.Title}`);

  await Publisher.PublishAsync({ Event: "RedisPostCreated", Data: post });
  res.status(201).json(post);
});

// PUT /redis-posts/:id
RedisPostsController.put("/:id", async (req: Request, res: Response) => {
  const client = await RedisClientFactory.GetClientAsync();
  const id = req.params.id;
  const exists = await client.get(PostKey(id));
  if (!exists) {
    console.warn(`Ação: PUT /redis-posts/${id} - Post não encontrado`);
    return res.status(404).json({ message: "Post not found" });
  }

  const body = req.body as Omit<RedisPostModel, "Id">;
  const updated: RedisPostModel = { Id: id, Title: body.Title, Content: body.Content };

  await client.set(PostKey(id), JSON.stringify(updated));
  console.log(`Ação: PUT /redis-posts/${id} - Atualizado | Título: ${updated.Title}`);

  await Publisher.PublishAsync({ Event: "RedisPostUpdated", Data: updated });
  res.json(updated);
});

// DELETE /redis-posts/:id
RedisPostsController.delete("/:id", async (req: Request, res: Response) => {
  const client = await RedisClientFactory.GetClientAsync();
  const id = req.params.id;
  const deleted = await client.del(PostKey(id));
  if (deleted === 0) {
    console.warn(`Ação: DELETE /redis-posts/${id} - Post não encontrado`);
    return res.status(404).json({ message: "Post not found" });
  }

  console.log(`Ação: DELETE /redis-posts/${id} - Deletado com sucesso`);
  await Publisher.PublishAsync({ Event: "RedisPostDeleted", Data: { Id: id } });
  res.json({ message: `Post ${id} deleted successfully` });
});
