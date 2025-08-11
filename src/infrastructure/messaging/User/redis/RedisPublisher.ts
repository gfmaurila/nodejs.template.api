import { RedisClientFactory } from "@/infrastructure/cache/RedisClient";

export class RedisPublisher {
  private Channel: string;

  constructor(channel: string) {
    this.Channel = channel;
  }

  public async PublishAsync(message: unknown): Promise<void> {
    const client = await RedisClientFactory.GetClientAsync();
    const payload = typeof message === "string" ? message : JSON.stringify(message);
    await client.publish(this.Channel, payload);
    console.log(`[Redis-Publish] Channel=${this.Channel} Payload=${payload}`);
  }
}
