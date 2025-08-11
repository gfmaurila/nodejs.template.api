import { RedisClientFactory } from "@/infrastructure/cache/RedisClient";

export class RedisSubscriber {
  private Channel: string;

  constructor(channel: string) {
    this.Channel = channel;
  }

  public async StartAsync(): Promise<void> {
    const subscriber = await RedisClientFactory.CreateDuplicateAsync();
    await subscriber.subscribe(this.Channel, (message) => {
      console.log(`[REDIS - ${this.Channel}] Mensagem recebida:`, message);
    });
    console.log(`Subscrito no canal Redis: ${this.Channel}`);
  }
}
