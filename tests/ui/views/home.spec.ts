import Home from "@/views/Home.vue"
import { mount, shallowMount, Wrapper } from "@vue/test-utils"
import { Di, Dependency } from "@/di/container"
import flushpromises from "flush-promises"
import { RepoControllerMock } from "../../mocks"
import Repos from "@/components/Repos.vue"
import fakeReposJson from "./repos.json"
import * as Result from "@/type/result"
import { Repo } from "@/type"
import { NoReposError } from "@/service/error"

const repoControllerMock = new RepoControllerMock()
const fakeRepos: Repo[] = fakeReposJson

afterEach(() => {
  Di.resetOverrides()
})

beforeEach(() => {
  Di.override(Dependency.RepoController, repoControllerMock)
})

class HomeWrapper {
  constructor(public wrapper: Wrapper<Home>) {}

  get reposList(): Wrapper<Home> {
    return this.wrapper.find("#Repos") as Wrapper<Home>
  }

  get errorMsg(): Wrapper<Home> {
    return this.wrapper.find("h1.err") as Wrapper<Home>
  }

  get refreshButton(): Wrapper<Home> {
    return this.wrapper.find("button") as Wrapper<Home>
  }

  get loadingImg(): Wrapper<Home> {
    return this.wrapper.find("picture.loader") as Wrapper<Home>
  }
}

describe("Home.vue", () => {
  it("renders all repos", async () => {
    const getReposResponse: Result.Type<Repo[]> = fakeRepos

    repoControllerMock.getRepos.mockResolvedValueOnce(getReposResponse)

    const homeWrapper = new HomeWrapper(mount(Home))
    const reposWrapper = mount(Repos, {
      propsData: {
        repos: fakeRepos
      }
    })

    await flushpromises()

    expect(homeWrapper.reposList.exists()).toBe(true)
    expect(reposWrapper.props().repos.length).toBe(fakeRepos.length)
  })
  it("shows error", async () => {
    const getReposResponse: Result.Type<Repo[]> = new NoReposError("User has no repos")

    repoControllerMock.getRepos.mockResolvedValueOnce(getReposResponse)
    const homeWrapper = new HomeWrapper(shallowMount(Home))

    await flushpromises()

    expect(homeWrapper.errorMsg.text()).toBe(getReposResponse.message)
    expect(homeWrapper.reposList.exists()).toBe(false)
  })
  it("shows loading", async () => {
    repoControllerMock.getRepos.mockResolvedValueOnce(new Promise(() => {}))
    const homeWrapper = new HomeWrapper(mount(Home))

    await flushpromises()

    expect(homeWrapper.loadingImg.isVisible()).toBe(true)
  })
})
