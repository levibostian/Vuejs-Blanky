import { GitHubService } from "@/service"
import * as Result from "@/type/result"
import { Repo } from "@/type"

export interface RepoController {
  getRepos(): Promise<Result.Type<Repo[]>>
}

export class AppRepoController implements RepoController {
  constructor(private service: GitHubService) {}

  async getRepos(): Promise<Result.Type<Repo[]>> {
    return this.service.getRepos("levibostian")
  }
}
