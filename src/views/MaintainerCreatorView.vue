<template>
  <div class="MaintainerCreatorView">
    <input-box class="input-text" v-model="markdownInput" />
    <div class="rendered-text" v-html="rendered"></div>
    <render-controllers :controllers="kwargs" class="controllers"/>
  </div>
</template>

<script lang="ts">
import {merge, pick, keys, cloneDeep} from 'lodash';
import { Component, Vue, Prop } from 'vue-property-decorator';
import InputBox from '@/components/maintainer-creator/InputBox.vue';
import { DynamicText } from '@/extended-markdown-parser/transform';
import {RenderArgs} from "@/extended-markdown-parser/renderer";
import RenderControllers from "@/components/user-display/RenderControllers.vue";
import {merged} from "@/helpers";

@Component({
  components: {RenderControllers, InputBox },
})
export default class MaintainerCreatorView extends Vue {
  private markdownInput: string = `# Język "Durlex"

## Proste użycie
przykładowa zmienna: {{ twoje_imie }}

przykładowy warunek: {{ if przykladowy_warunek }} Teraz mnie widać {{ else }} a teraz nie {{ fi }}

## Składnia może być zagnieżdżona!

{{ if juz_przywitano }}
Nie ma co się witać...
{{ else }}
Witaj, {{twoje_imie}}
{{fi}}



`;
  private kwargs: RenderArgs = {variables: {}, ifStatements: {}};
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
  grid-template-rows: 3fr 1fr;
  grid-gap: $gap;

  .input-text {
    width: 100%;
    height: 100%;
  }
  .rendered-text {
    height: 100%;
    width: 100%;
  }

  .controllers {
    grid-row: 2;
    grid-column: 1 / -1;
  }
}
</style>
