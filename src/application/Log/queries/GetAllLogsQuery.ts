import { MongoDatabase } from "@/infrastructure/database/MongoDatabase";

export class GetAllLogsQuery {
  public async Execute(limit: number): Promise<any[]> {
    const db = await MongoDatabase.GetDbAsync();
    return await db.collection("logs")
      .find({})
      .sort({ _id: -1 })
      .limit(limit)
      .toArray();
  }
}
