import { GithubService } from "@/infrastructure/integration/github/GithubService";

export class GetUserReposQuery {
  constructor(private readonly service: GithubService) {}

  public async Handle(): Promise<any[]> {
    return await this.service.GetUserRepos();
  }
}
