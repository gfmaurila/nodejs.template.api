import { GithubService } from "@/infrastructure/integration/github/GithubService";
import { MongoDatabase } from "@/infrastructure/database/MongoDatabase";

export class StoreUserProfileCommand {
  private service = new GithubService();

  public async Handle(): Promise<void> {
    const profile = await this.service.GetUserProfile();
    const db = await MongoDatabase.GetDbAsync();
    await db.collection("github_profile").deleteMany({});
    await db.collection("github_profile").insertOne(profile);
  }
}
