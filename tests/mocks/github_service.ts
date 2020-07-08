import { GitHubService } from "@/service/github_service"

export class GitHubServiceMock implements GitHubService {
  public getTrendingReposMock = jest.fn()

  public getTrendingRepos = this.getTrendingReposMock
}

//export const githubServiceMock = new GitHubServiceMock()