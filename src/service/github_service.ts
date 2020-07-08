import {Repo} from "@/type"

export interface GitHubService {
  getTrendingRepos(): Promise<[Repo]>
}