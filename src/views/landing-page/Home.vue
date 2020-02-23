<template>
  <div class="Home">
    <div class="contents">
      <v-carousel
        cycle
        continuous
        hide-delimiter-background
        show-arrows-on-hover
        height="15rem"
        width="100%"
      >
        <v-carousel-item v-for="(slogan, i) of slogans" :key="i">
          <encouragement-card
            :key="slogan.title"
            :title="slogan.title"
            style="z-index: 10"
          >{{ slogan.text }}</encouragement-card>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="contents">
      <div class="call-to-action">
        <h3>Zobacz jak to działa</h3>
        <button @click="$router.push({name: 'client:creator:into'})">demo Durlex</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import DurlexNavbar from '../DurlexNavbar.vue';
import EncouragementCard from './EncouragementCard.vue';
type Slogan = { title: string; text: string };
export default defineComponent({
  components: {
    DurlexNavbar,
    EncouragementCard,
  },
  setup() {
    const slogans = ref<Slogan[]>([
      {
        title: 'Koniec z monotonią',
        text:
          'Wprowadź system twojej pracy w XXI wiek. W końcu możesz zająć się tym co ciekawe.',
      },
      {
        title: 'Buduj własną bazę',
        text:
          'Kiedy używasz Durlexa, każdy sporządzony przez Ciebie dokument staje się szablonem dla kolejnych.',
      },
      {
        title: 'Każdy przypadek rozpatrujesz raz',
        text:
          'Durlex to rewolucyjne narzędzie automatyzujące nudną część pracy kancelarii prawniczych oraz prawników.',
      },
    ]);
    return {
      slogans,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/styles/styles';
.Home {
  @include default-view;
  .contents {
    @include grid-center;
    background-color: color(white);
    font-size: $font-medium;
    font-weight: 400;
    grid-gap: $gap;
    @include media('>=tablet') {
      padding: $gap * 1.2;
      max-width: 33rem;
    }

    @include media('<=tablet') {
      padding: 0;
    }
  }

  .call-to-action {
    @include encouragement-card;
    height: min-content;
    align-self: start;
    button {
      background-color: color(white);
      color: color(secondary);
      font-weight: bold;
      padding: $gap/2;
      border-radius: $gap/3;
      @include hoverable;
      text-transform: uppercase;
    }
  }
}
</style>
