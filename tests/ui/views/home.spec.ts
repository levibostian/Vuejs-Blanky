import Home from "@/views/Home.vue"
import { mount, shallowMount, Wrapper } from "@vue/test-utils"
import { Di, Dependency } from "@/service/container"
import flushpromises from "flush-promises"
import { RepoControllerMock } from "../../mocks"
import Repos from "@/components/Repos.vue"
import repos from "./repos.json"

const repoControllerMock = new RepoControllerMock()

afterEach(() => {
  Di.resetOverrides()
})

beforeEach(() => {
  Di.override(Dependency.RepoController, repoControllerMock)
})

describe("Home.vue", () => {
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
  it("renders all repos", async () => {
    repoControllerMock.getRepos.mockResolvedValueOnce(repos)

    const homeWrapper = new HomeWrapper(mount(Home))
    const reposWrapper = mount(Repos, {
      propsData: {
        repos: repos
      }
    })

    await flushpromises()

    expect(homeWrapper.reposList.exists()).toBe(true)
    expect(reposWrapper.props().repos.length).toBe(repos.length)
  })
  it("shows error", async () => {
    repoControllerMock.getRepos.mockRejectedValueOnce({
      response: {
        status: 404,
        statusText: "Not Found"
      }
    })
    const homeWrapper = new HomeWrapper(shallowMount(Home))

    await flushpromises()

    expect(homeWrapper.errorMsg.text()).toBe("Error 404 - Not Found")
    expect(homeWrapper.reposList.exists()).toBe(false)
  })
  it("shows loading", async () => {
    repoControllerMock.getRepos.mockResolvedValueOnce(repos)
    const homeWrapper = new HomeWrapper(mount(Home))

    expect(homeWrapper.loadingImg.isVisible()).toBe(true)
  })
})
