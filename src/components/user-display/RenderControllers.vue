<template>
  <div class="RenderControllers">
    <input
        type="text"
        :aria-label="key"
        :placeholder="key"
        v-for="key of variableKeys"
        v-model="controllers.variables[key]"
        :key="key"
    />
    <input
        type="checkbox"
        :aria-label="key"
        :placeholder="key"
        v-for="key of ifKeys"
        v-model="controllers.ifStatements[key]"
        :key="key"
    >
  </div>
</template>

<script lang="ts">
import {keys} from 'lodash';
import { Component, Vue, Prop } from 'vue-property-decorator';
import {RenderArgs} from "@/extended-markdown-parser/renderer";
@Component({
  components: {},
})
export default class RenderControllers extends Vue {
  @Prop({required: true}) controllers!: RenderArgs;

  private get ifKeys(): string[] { return keys(this.controllers.ifStatements) }
  private get variableKeys(): string[] { return keys(this.controllers.variables) }
}
</script>

<style scoped lang="scss">
.RenderControllers {
}
</style>
