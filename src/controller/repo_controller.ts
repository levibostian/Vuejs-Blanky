import { AxiosInstance } from "axios"

interface Repo {
  name: string
  description: string
}

interface GetReposResult {
  repos?: Repo[]
  error?: Error
}

interface RepoController {
  getRepos(): Promise<GetReposResult>
}

interface Service {
  getRepos(url: string): Promise<GetReposResult>
}

class AppService implements Service {
  constructor(private axios: AxiosInstance) {}
  getRepos(url: string): Promise<GetReposResult> {
    return this.axios.get(url).then((response) => {
      return Promise.resolve({
        repos: response.data
      })
    })
  }
}

class GetRepoController implements RepoController {
  constructor(private service: Service) {}
  async getRepos(): Promise<GetReposResult> {
    return await this.service
      .getRepos("https://api.github.com/users/levibostian/repos")
      .then((reposResult) => {
        let result: GetReposResult
        if (reposResult.error) result = { error: reposResult.error }
        else if (!reposResult.repos || reposResult.repos.length === 0)
          result = { error: Error("No repos") }
        else result = { repos: reposResult.repos }
        return Promise.resolve(result)
      })
  }
}

export { Repo, GetReposResult, Service, AppService, RepoController, GetRepoController }
