import { createClient, RedisClientType } from "redis";
import { Settings } from "@/core/env/Settings";

export class RedisClientFactory {
  private static Client: RedisClientType | null = null;

  public static async GetClientAsync(): Promise<RedisClientType> {
    if (!this.Client) {
      const url = `redis://:${Settings.RedisPassword}@${Settings.RedisHost}:${Settings.RedisPort}/${Settings.RedisDb ?? 3}`;
      this.Client = createClient({ url });
      this.Client.on("error", (err) => console.error("[Redis] Error:", err));
      await this.Client.connect();
      console.log("[Redis] Connected.");
    }
    return this.Client;
  }

  public static async CreateDuplicateAsync(): Promise<RedisClientType> {
    const base = await this.GetClientAsync();
    const dup = base.duplicate();
    await dup.connect();
    return dup;
  }
}
