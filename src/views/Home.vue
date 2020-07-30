<template lang="pug">
  div
    .flex.flex-column.self-end-ns.items-center.mt0
      button(type="button" @click="refresh").reset
        picture.w2.h-auto.flex.justify-center
          img(src="../assets/refresh.webp" alt="Refresh")
    .flex.justify-center
      .flex.flex-column.w-60
        Repos(:repos="repos")
        h1.err(v-if="errorStatus") {{ errorStatus }}
        picture(v-if="repos.length==0").loader
          img(src="../assets/github.webp" alt="Loading...")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { RepoController } from "@/controller"
import Repos from "@/components/Repos.vue"
import { Di, Dependency } from "@/di"
import { Repo } from "@/type"
import * as Result from "@/type/result"

@Component({
  name: "Home",
  components: {
    Repos
  }
})
export default class Home extends Vue {
  public repos: Repo[] = []
  public errorStatus: string | null = null
  public controller: RepoController = Di.inject(Dependency.RepoController)

  created(): void {
    this.refresh()
  }
  async refresh(): Promise<void> {
    this.repos = []
    const getReposResult = await this.controller.getRepos()

    if (Result.isError(getReposResult)) {
      this.errorStatus = getReposResult.message
    } else {
      this.repos = getReposResult
    }
  }
}
</script>

<style lang="scss" scoped>
#Home {
}
</style>
