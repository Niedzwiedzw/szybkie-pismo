<template>
  <v-app id="app">
    <durlex-navbar class="durlex-navbar"/>
    <transition name="slide" mode="out-in">
      <router-view class="site-content"/>
    </transition>
  </v-app>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import DurlexNavbar from '@/views/DurlexNavbar.vue';
export default defineComponent({
  components: {
    DurlexNavbar,
  },
});
</script>

<style lang="scss">
@import 'styles/styles';

#app {
  @include grid-center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .site-content {
    @include grid-center;
    overflow-x: hidden;
    overflow-y: scroll;
    height: $remaining-page;
    padding: $gap;
    color: color(black);

    @include media("<=tablet") {
      padding: $gap/3;
    }
  }
}

body, html, #app {
  &, & > .v-application--wrap {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: color(white);
    font-family: 'Montserrat', monospace;
  }
}

// .v-application {
//   background: $primary-background-color !important;
// }

html, body {
    background-color: color(white);
    color: color(white);

}

input {
  text-align: center;
}

.v-tooltip__content {
  background-color: black !important;
  & * {
    background-color: black !important;
  }
}


.v-application--wrap {
  width: 100%;
}

.v-application .white--text {
    color: #FFFFFF;
    caret-color: #FFFFFF;
}

span.highlight {
  color: color(primary);
  font-weight: 900;
}
</style>
