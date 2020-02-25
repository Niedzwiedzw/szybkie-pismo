<template>
  <div class="GenerationView">
    <v-stepper v-model="step" vertical class="document-generation-stepper">
      <!-- wybierz dokument -->
      <v-stepper-step :complete="step>1" step="1" class="step-title">Wybierz rodzaj dokumentu</v-stepper-step>
      <v-stepper-content dark class="step-box" step="1">
        <v-select v-model="selected" :items="documentNames"></v-select>
        <button @click="step += 1">Kontynuuj</button>
      </v-stepper-content>
      <!-- formularze -->
      <v-lazy>
        <v-stepper-step :complete="step>2" step="2" class="step-title">Uzupełnij dane</v-stepper-step>
      </v-lazy>
      <v-stepper-content dark class="step-box" step="2">
        <render-controllers
          :controllers="kwargs"
          :commentary="commentary"
          class="render-controllers"
          :key="`${step}${show}`"
        />
        <button
          @click="variablesCompleted && (step += 1)"
          :class="{inactive: !variablesCompleted}"
        >Kontynuuj</button>
      </v-stepper-content>
      <!-- płatność -->
      <v-stepper-step :complete="step>3" step="3" class="step-title">Płatność</v-stepper-step>
      <v-stepper-content dark class="step-box" step="3">
        <button @click="(step += 1)">Zapłać (0zł)</button>
      </v-stepper-content>
      <!-- drukowanie -->
      <v-stepper-step :complete="step>3" step="4" class="step-title">Wydrukuj</v-stepper-step>
      <v-stepper-content dark class="step-box" step="4">
        <rendered-document-card :rendered="rendered"/>
        <button @click="printRendered()" :class="{inactive: !readyToPrint}">Drukuj</button>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import { map, some, values, flatten, isNil } from 'lodash';
import { defineComponent, ref, computed, watch } from '@vue/composition-api';
import { useDocumentRendering } from '../../usecases';
import { keysByPrefix } from '@/display-helpers.ts';
import RenderControllers from '@/components/user-display/RenderControllers.vue';
import RenderedDocumentCard from '@/components/maintainer-creator/RenderedDocumentCard.vue';

function useDocumentCreator() {
  const documentRendering = useDocumentRendering();
  const step = ref<number>(1);
  const allVariableValues = computed<Array<string | null | boolean>>(() =>
    flatten(map(values(documentRendering.kwargs), values))
  );
  const variablesCompleted = computed(
    () => !some(allVariableValues.value, isNil)
  );
  const show = ref(false);
  const blink = () => {
    show.value = false;
    setTimeout(() => (show.value = true), 1500);
  };

  watch(() => step.value, blink);

  return {
    step,
    ...documentRendering,
    variablesCompleted,
    stringify: JSON.stringify,
    show,
  };
}

export default defineComponent({
  name: 'GenerationView',
  components: {
    RenderControllers,
    RenderedDocumentCard,
  },
  setup() {
      const documentCreator = useDocumentCreator();
    return {
      ...documentCreator,
    };
  },
});
</script>

<style lang="scss">
@import 'src/styles/styles';
.GenerationView {
  @include default-view;
  @include media('print') {
      all: unset;
  }
  .document-generation-stepper {
    @include grid-center;
    @include app-box;
    @include encouragement-card;
    background-color: color(secondary) !important;
    margin: 0;

    .step-box {
      margin: 0 !important;
      color: color(white);
      .render-controllers {
        &,
        & * {
          color: color(white);
          font-size: $font-small !important;
        }
      }
    }

    .step-title {
      color: color(white);
      & * {
        color: white;
      }
    }
  }
}
</style>