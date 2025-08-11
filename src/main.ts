import 'reflect-metadata';
import express from 'express';

import { RedisPostsController } from "@/api/RedisPostsController";
import { RedisSubscriber } from "@/infrastructure/messaging/User/redis/RedisSubscriber";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API OK');
});

// Rotas
app.use("/redis-posts", RedisPostsController);

// Subscriber (escuta eventos do canal)
new RedisSubscriber("RedisPostsChannel").StartAsync().catch(console.error);

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
