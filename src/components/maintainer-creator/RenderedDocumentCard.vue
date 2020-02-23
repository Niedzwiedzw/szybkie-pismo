<template>
  <div
    @click="printRendered"
    class="rendered-text"
    id="rendered-text"
    :class="{readyToPrint}"
    v-html="rendered"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useDocumentRendering } from '@/usecases.ts';

export default defineComponent({
  name: 'RenderedDocumentCard',
  props: {
    rendered: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { readyToPrint } = useDocumentRendering();
    return {
      readyToPrint,
      printRendered() {
        if (readyToPrint.value) window.print();
      },
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/styles/styles';
.rendered-text {
text-align: start;
  visibility: hidden;
  display: none;
  @include media('print') {
    visibility: unset !important;
    display: unset !important;
    border: none !important;
    transform: none !important;
    opacity: 1 !important;
    position: absolute !important;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    color: black !important;
    & > * {
        color: black !important;
    }
    top: 0 !important;
    left: 0 !important;
    background-color: white;
    @include a4-margin;
    &:after {
      display: none !important;
      visibility: hidden !important;
    }
    &:before {
      content: 'wygenerowano programem Durlex - www.durlex.pl';
      font-size: 50%;
      color: lighten(gray, 40%);
      text-justify: center;
      transform: translateY(-2ch) translateX(30vw);
    }
  }
}
</style>