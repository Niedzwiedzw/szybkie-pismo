<template>
  <div class="Home">this is <strong>Home</strong></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.Home {
}
</style>
