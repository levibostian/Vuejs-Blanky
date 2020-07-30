import { GitHubHttp, AppGitHubService } from "@/service"
import { AppRepoController } from "@/controller"

export enum Dependency {
  RepoController = "RepoController",
  GitHubService = "GitHubService",
  GitHubHttp = "GitHubHttp"
}

class DiContainer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private overrides: { [key in Dependency]?: any } = {}

  override<T>(dependency: Dependency, value: T): void {
    this.overrides[dependency] = value
  }

  resetOverrides(): void {
    this.overrides = {}
  }

  inject<T>(dependency: Dependency): T {
    const overridenValue = this.overrides[dependency]
    if (overridenValue) {
      return overridenValue
    }

    switch (dependency) {
      case Dependency.GitHubHttp:
        return (new GitHubHttp() as unknown) as T
      case Dependency.GitHubService:
        return (new AppGitHubService(this.inject(Dependency.GitHubHttp)) as unknown) as T
      case Dependency.RepoController:
        return (new AppRepoController(this.inject(Dependency.GitHubService)) as unknown) as T
    }
  }
}

export const Di = new DiContainer()
