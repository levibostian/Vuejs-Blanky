import { RepoController } from "@/controller/repo_controller"

export class RepoControllerMock implements RepoController {
  public getReposMock = jest.fn()

  public getRepos = this.getReposMock
}
