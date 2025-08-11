import { MongoDatabase } from "@/infrastructure/database/MongoDatabase";

export class GetStoredUserReposQuery {
  public async Handle(): Promise<any[]> {
    const db = await MongoDatabase.GetDbAsync();
    return await db.collection("github_repos").find().toArray();
  }
}
