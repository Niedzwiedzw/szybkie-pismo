<template>
  <div class="RenderControllers">
    <div
        class="variable-input"
        :key="key"
        v-for="key of variableKeys"
    >
      <div class="title">{{key}}:</div>
      <input
        type="text"
        :aria-label="key"
        placeholder="null"
        v-model="controllers.variables[key]"
      />
    </div>

    <div v-for="key of ifKeys" :key="key" class="if-input">
      <div class="title">{{key}}:</div>
      <input
        type="checkbox"
        :aria-label="key"
        :placeholder="key"
        :title="key"
        v-model="controllers.ifStatements[key]"
        :key="key"
      >
    </div>

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
@import '../../styles/styles';

$box-width: 17rem;
$box-height: 3rem;

@mixin box-size($width, $height) {
  width: $width;
  height: $height;
}

.RenderControllers {
  @include grid-center;
  grid-template-columns: repeat(auto-fit, 1fr);
  grid-auto-flow: column;

  .variable-input {
    @include grid-center-all;
    @include app-box;
    @include box-size($box-width, $box-height);
    grid-template-columns: 3fr 1fr;

    input {
      width: $box-width*0.6;
      margin-right: $gap;
    }
  }

  .if-input {
    @include grid-center-all;
    @include app-box;
    @include box-size($box-width, $box-height);
    display: grid;
    grid-template-columns: 3fr 1fr;
    text-align: center;
  }
}
</style>
