<template>
  <div class="MaintainerCreatorView">
    <div class="available-documents">
      <select name="Available documents" id="available-documents" v-model="selected">
        <option v-for="name of documentNames" :key="name">{{name}}</option>
      </select>
    </div>
    <input-box class="input-text" v-model="markdownInput" />
    <div @click="printRendered" class="rendered-text" id="rendered-text" :class="{readyToPrint}" v-html="rendered"></div>
    <commentary-box class="commentary-box" v-model="commentary" />
    <render-controllers :commentary="commentary" :controllers="kwargs" class="controllers"/>
  </div>
</template>

<script lang="ts">
import { pick, keys, fromPairs, map, replace, capitalize, isNil } from 'lodash';
import InputBox from '@/components/maintainer-creator/InputBox.vue';
import RenderControllers from '@/components/user-display/RenderControllers.vue';
import CommentaryBox from '@/components/maintainer-creator/CommentaryBox.vue';
import { defineComponent } from '@vue/composition-api';
import { useDocumentRendering, usePFDGenerator } from '@/usecases.ts';

export default defineComponent({
  components: {
    InputBox,
    RenderControllers,
    CommentaryBox,
  },
  setup() {
    const {printElement} = usePFDGenerator();
    const documentRendering = useDocumentRendering();
    return {
      printRendered() {
        if (documentRendering.readyToPrint.value) window.print();
      },
      ...documentRendering,
    }
  },
});
</script>

<style scoped lang="scss">
@import '../styles/styles';

.MaintainerCreatorView {
  @include grid-center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, min-content);
  grid-gap: $gap;
  overflow-y: scroll;
  grid-auto-rows: min-content;

  @include media('<=tablet') {
    font-size: $font-x-small !important;
  }

  @include media('<=tablet') {
    grid-template-columns: 1fr;
  }

  * {
    @include app-box;
    width: 100%;
  }

  .available-documents {
    grid-column: 1 / -1;
    & select,
    option {
      height: $input-height;
      text-align: center;
      background-color: color(secondary);
      color: whitesmoke;
      font-weight: 900;
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
    &.readyToPrint {
      @include call-to-action("kliknij aby wydrukować dokument!");
    }
    &::before {
      visibility: none;
    }

    @include media('print') {
      border: none !important;
      transform: none !important;
      opacity: 1 !important;
      position: absolute;
      width: 100vw;
      height: 100vh;
      z-index: 10;
      top: 0;
      left: 0;
      background-color: white;
      @include a4-margin;
      &:after {
        display: none !important;
        visibility: hidden !important;
      }
      &:before {
        content: "wygenerowano programem Durlex - www.durlex.pl";
        font-size: 50%;
        color: lighten(gray, 40%);
        text-justify: center;
        transform: translateY(-2ch) translateX(30vw);

      }
    }
  }

  .commentary-box {
    grid-column: 1;
  }

  .controllers {
    @include grid-center;
  }
}
</style>
