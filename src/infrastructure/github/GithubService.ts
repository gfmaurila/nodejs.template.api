import axios from "axios";
import { Settings } from "@/core/env/Settings"; // ou use process.env

export class GithubService {
  private BaseUrl = "https://api.github.com";
  private Username: string;

  constructor(username?: string) {
    this.Username = username || Settings.GithubUsername || "gfmaurila";
  }

  public async GetUserProfile(): Promise<any> {
    const url = `${this.BaseUrl}/users/${this.Username}`;
    const { data } = await axios.get(url);
    return data;
  }

  public async GetUserRepos(): Promise<any[]> {
    const url = `${this.BaseUrl}/users/${this.Username}/repos`;
    const { data } = await axios.get(url);
    return data;
  }
}
