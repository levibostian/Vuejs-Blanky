<template lang="pug">
  #id="Repos"
    .br3.pa3.mv3(v-for="(repo, index) in repos" :key="repo.id" :style="{'background-color':getRainbowColor(index)}")
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
  getRainbowColor(seed: number): string {
    const colorHue: number = (360 * seed) / this.$props.repos.length

    return `hsl(${colorHue}, 80%, 60%)`
  }
}
</script>

<style scoped lang="scss">
#Repos {
}
</style>
