<template lang="pug">
  div
    .flex.flex-column.self-end-ns.items-center.mt0
      button(type="button" @click="refresh").reset
        picture.w2.h-auto.flex.justify-center
          source(type="image/webp" srcset="../assets/refresh.webp")
          source(type="image/png" srcset="../assets/refresh.png")
          img(src="../assets/refresh.png" alt="Refresh")
    .flex.justify-center
      .flex.flex-column.w-60
        Repos(:repos="repos")
        h1.err(v-if="isError") {{ errorStatus }}
        picture(v-if="repos.length==0").loader
          source(type="image/webp" srcset="../assets/github.webp")
          source(type="image/png" srcset="../assets/github.png")
          img(src="../assets/github.png" alt="Loading...")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Repo, RepoController } from "@/controller/repo_controller"
import Repos from "@/components/Repos.vue"
import { Di, Dependency } from "@/service/container"

@Component({
  name: "Home",
  components: {
    Repos
  }
})
export default class Home extends Vue {
  public repos: Repo[] = []
  public isError = false
  public errorStatus = ""
  public controller: RepoController = Di.inject(Dependency.RepoController)
  created(): void {
    this.refresh()
  }
  refresh(): void {
    this.repos = []
    this.controller
      .getRepos()
      .then((response) => {
        if (response.repos) this.repos = response.repos
      })
      .catch((error) => {
        if (error.response) {
          this.isError = true
          this.errorStatus = `Error ${error.response.status} - ${error.response.statusText}`
        }
      })
  }
}
</script>

<style lang="scss" scoped>
#Home {
}
</style>
