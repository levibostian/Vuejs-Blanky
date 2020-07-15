<template lang="pug">
  div(id="Repos")
    .br3.pa3.mv3(v-for="(repo, i) in repos" :key="repo.id" :style="{'background-color':rainbow(i)}")
      RepoItem(:repo="repo")
</template>

<script lang="ts">
import RepoItem from "./RepoItem.vue"
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "Repos",
  components: {
    RepoItem
  },
  props: {
    repos: Array
  }
})
export default class Repos extends Vue {
  rainbow(i: number): string {
    return "hsl(" + (360 * i) / this.$props.repos.length + ",80%,60%)"
  }
}
</script>

<style scoped lang="scss">
#Repos {
}
</style>
