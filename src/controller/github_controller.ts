import { GitHubService } from "@/service/github_service"
import { Repo } from "@/type"

export class GitHubController {
  constructor(private githubService: GitHubService) {}

  getTrendingRepos(): Promise<[Repo]> {
    return this.githubService.getTrendingRepos()
  }
}
