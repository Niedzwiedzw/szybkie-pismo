<template>
  <div class="MaintainerCreatorView">
    <div class="available-documents">
      <select name="Available documents" id="available-documents" v-model="selected">
        <option v-for="name of documentNames" :key="name">{{name}}</option>
      </select>
    </div>
    <input-box class="input-text" v-model="markdownInput"/>
    <div class="rendered-text" v-html="rendered"></div>
    <commentary-box
        class="commentary-box"
        v-model="commentary"
    />
    <render-controllers
        :commentary="commentary"
        :controllers="kwargs"
        class="controllers"/>
  </div>
</template>

<script lang="ts">
import {pick, keys, fromPairs, map, replace, capitalize} from 'lodash';
import {Component, Vue, Watch} from 'vue-property-decorator';
import InputBox from '@/components/maintainer-creator/InputBox.vue';
import {DynamicText} from '@/extended-markdown-parser/transform';
import {RenderArgs} from "@/extended-markdown-parser/renderer";
import RenderControllers from "@/components/user-display/RenderControllers.vue";
import {merged, updateOwn} from "@/helpers";
import {SUPPORTED_DOCUMENTS} from "@/documents";
import CommentaryBox from "@/components/maintainer-creator/CommentaryBox.vue";
import {Commentary} from "@/extended-markdown-parser/commentary";

@Component({
  components: {CommentaryBox, RenderControllers, InputBox},
})
export default class MaintainerCreatorView extends Vue {
  private markdownInput: string = '';
  private commentary: Commentary = this.emptyCommentary;

  private supportedDocuments = SUPPORTED_DOCUMENTS;

  private get documentNames(): string[] {
    return keys(this.supportedDocuments);
  }

  private selected: string | null = null;

  @Watch('selected')
  private onSelection(newVal: string, oldVal: string) {
    this.markdownInput = this.supportedDocuments[newVal];
  }

  @Watch('markdownInput')
  private onMarkdownChange(newVal: string, oldVal: string) {
    setTimeout(() => {
      this.commentary = updateOwn(this.emptyCommentary, this.commentary);
    }, 10);
  }

  private kwargs: RenderArgs = {variables: {}, ifStatements: {}};

  private get allVariables() {
    return [
      ...keys(this.kwargs?.ifStatements ?? {}),
      ...keys(this.kwargs?.variables ?? {}),
    ]
  }

  private get emptyCommentary() {
    return pick({
      ...fromPairs(map(this.allVariables, (v) => [v, capitalize(replace(v, /_/g, ' '))])),
      ...(this.commentary ?? {}),
    }, this.allVariables);
  }

  private get rendered(): string {
    const renderer = new DynamicText(this.markdownInput);
    const [kwargs, fn] = renderer.renderer;
    const newKwargs = merged(kwargs, this.kwargs);
    newKwargs.variables = pick(newKwargs.variables, keys(kwargs.variables)) as any;
    newKwargs.ifStatements = pick(newKwargs.ifStatements, keys(kwargs.ifStatements)) as any;
    this.kwargs = newKwargs;
    return fn(this.kwargs);
  }
}
</script>

<style scoped lang="scss">
@import '../styles/styles';


.MaintainerCreatorView {
  @include grid-center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, min-content);
  grid-gap: $gap;

  @include media("<=tablet") {
    grid-template-columns: 1fr;
  }

  * {
    @include app-box;
    width: 100%;
  }

  .available-documents {
    grid-column: 1 / -1;
    select {
      height: $input-height;
      text-align: center;
    }
  }

  .input-text {
    width: 100%;
    height: 100%;
  }

  .rendered-text {
    padding: $gap;
    height: 100%;
    width: 100%;
  }

  .commentary-box {
    grid-column: 1;
  }

  .controllers {
    @include grid-center;
  }
}
</style>
