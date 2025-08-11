import { MongoClient, Db } from "mongodb";
import { Settings } from "@/core/env/Settings"; // já existe no teu template

export class MongoDatabase {
  private static Client: MongoClient | null = null;
  private static DbInstance: Db | null = null;

  public static async GetDbAsync(): Promise<Db> {
    if (!this.Client) {
      const url = Settings.MongoUrl;           // ex: mongodb://user:pass@localhost:27017
      this.Client = new MongoClient(url);
      await this.Client.connect();
      console.log("[Mongo] Connected");
    }
    if (!this.DbInstance) {
      this.DbInstance = this.Client.db(Settings.MongoDatabase); // ex: node_template
    }
    return this.DbInstance;
  }
}
