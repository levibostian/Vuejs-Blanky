<template lang="pug">
  div
    h1.f2.tc {{ repo.name }}
      p.f3 {{ repo.language }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "RepoItem",
  props: {
    repo: Object
  }
})
export default class RepoItem extends Vue {}
</script>

<style lang="scss" scoped>
#RepoItem {
}
</style>
