import { GithubService } from "@/infrastructure/integration/github/GithubService";
import { MongoDatabase } from "@/infrastructure/database/MongoDatabase";

export class StoreUserReposCommand {
  private service = new GithubService();

  public async Handle(): Promise<void> {
    const repos = await this.service.GetUserRepos();
    const db = await MongoDatabase.GetDbAsync();
    await db.collection("github_repos").deleteMany({});
    await db.collection("github_repos").insertMany(repos);
  }
}
