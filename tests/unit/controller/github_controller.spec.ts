import {GitHubController} from "@/controller"
import { GitHubServiceMock } from '../../mocks'
import { Repo } from "@/type"

const githubServiceMock = new GitHubServiceMock()
const controller = new GitHubController(githubServiceMock)

describe("getTrendingRepos", () => {
  it(`given service throws error, expect get error`, async () => {
    expect.assertions(2)
    githubServiceMock.getTrendingReposMock.mockImplementation(() => { return Promise.reject(new Error("foo")) })

    await expect(controller.getTrendingRepos()).rejects.toThrowError()
    expect(githubServiceMock.getTrendingReposMock.mock.calls.length).toEqual(1)
  })
  it(`given service returns repos, expect get repos`, async () => {
    let givenRepos: [Repo] = [{name: "Repo1"}]
    githubServiceMock.getTrendingReposMock.mockResolvedValueOnce(givenRepos)

    let actual = await controller.getTrendingRepos()

    expect(actual).toEqual(givenRepos)
    expect(githubServiceMock.getTrendingReposMock.mock.calls.length).toEqual(1)
  })
})