<template>
  <div class="RenderControllers">
    <div
        class="variable-input"
        :key="key"
        v-for="key of variableKeys"
    >
      <div class="variable-title">{{key}}:</div>

      <help-tooltip :text="commentary[key]"/>

      <input
        type="text"
        :aria-label="key"
        placeholder="null"
        v-model="controllers.variables[key]"
      />
    </div>

    <div v-for="key of ifKeys" :key="key" class="if-input">
      <div class="variable-title">{{key}}:</div>
      <help-tooltip :text="commentary[key]"/>
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
import {keys, isNil} from 'lodash';
import { Component, Vue, Prop } from 'vue-property-decorator';
import {RenderArgs} from "@/extended-markdown-parser/renderer";
import {Commentary} from "@/extended-markdown-parser/commentary";
import HelpTooltip from "@/components/common/HelpTooltip.vue";


@Component({
  components: {
    HelpTooltip,
  },
})
export default class RenderControllers extends Vue {
  @Prop({required: true}) controllers!: RenderArgs;
  @Prop({required: true}) commentary!: Commentary;

  private get ifKeys(): string[] { return keys(this.controllers.ifStatements) }
  private get variableKeys(): string[] { return keys(this.controllers.variables) }
  private commentaryFor(key: string): string | null {
    return this.commentary[key] ?? null;
  }

  private isNil = isNil;
}
</script>

<style scoped lang="scss">
@import '../../styles/styles';

$box-width: 33rem;
$box-height: 3rem;

@mixin box-size($width, $height) {
  width: 100%;
  height: $height;
}

.RenderControllers {
  @include grid-center;
  grid-template-columns: repeat(auto-fit, minmax($box-width, 1fr));
  grid-gap: $gap;
  grid-auto-flow: dense;
  padding-bottom: 2*$gap;
  text-overflow: ellipsis;

  * {
    max-width: $box-width;
  }
  .variable-input {
    @include grid-center-all;
    @include app-box;
    @include box-size($box-width, $box-height);
    grid-template-columns: 3fr 2rem 1fr;

    input {
      @include app-box;
      width: $box-width*0.4;
      margin-right: $gap;
    }
  }

  .if-input {
    @include grid-center;
    @include app-box;
    @include box-size($box-width, $box-height);
    grid-template-columns: 5fr 2rem 5*$gap;
  }
}
</style>
