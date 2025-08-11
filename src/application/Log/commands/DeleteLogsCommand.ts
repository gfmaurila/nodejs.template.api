import { MongoDatabase } from "@/infrastructure/database/MongoDatabase";

export class DeleteLogsCommand {
  public async DeleteOlderThan(olderThan: string): Promise<number> {
    const db = await MongoDatabase.GetDbAsync();
    const result = await db.collection("logs").deleteMany({
      createdAt: { $lt: new Date(olderThan) }
    });
    return result.deletedCount || 0;
  }

  public async DeleteAll(): Promise<number> {
    const db = await MongoDatabase.GetDbAsync();
    const result = await db.collection("logs").deleteMany({});
    return result.deletedCount || 0;
  }
}
