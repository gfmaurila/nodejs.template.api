import { MongoDatabase } from "@/infrastructure/database/MongoDatabase";

export class GetStoredUserProfileQuery {
  public async Handle(): Promise<any> {
    const db = await MongoDatabase.GetDbAsync();
    return await db.collection("github_profile").findOne({});
  }
}
