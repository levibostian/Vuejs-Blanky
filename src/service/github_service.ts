import * as Result from "@/type/result"
import { Repo } from "@/type"
import { GitHubHttp } from "./http"
import { NoReposError } from "./error"

export interface GitHubService {
  getRepos(username: string): Promise<Result.Result<Repo[]>>
}

export class AppGitHubService implements GitHubService {
  constructor(private http: GitHubHttp) {}

  getRepos(username: string): Promise<Result.Result<Repo[]>> {
    return this.http.get(`/users/${username}/repos`, undefined, (processedResponse) => {
      if (processedResponse.statusCode == 404) {
        return new NoReposError(`Looks like ${username} does not have any GitHub repos.`)
      }
      return null
    })
  }
}
