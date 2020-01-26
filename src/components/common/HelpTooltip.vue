<template>
  <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" small>mdi-help</v-icon>
      </template>
      <span>{{text}}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  components: {},
})
export default class HelpTooltip extends Vue {
  @Prop({default: ''}) text!: string;
}
</script>

<style scoped lang="scss">
.HelpTooltip {
}
</style>
