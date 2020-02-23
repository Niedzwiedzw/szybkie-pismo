<template>
  <div class="durlex-navbar">
    <div class="logo" @click="$router.push({name: 'home'})">Durlex</div>
    <div class="what-is-durlex">
      czym jest <span class="highlight">Durlex</span>?
    </div>
    <div class="kontakt">kontakt</div>
    <v-icon
      class="login reset-element"
      medium
      @click.native="$router.push({name: 'maintainer:creator'})"
    >mdi-account</v-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
export default defineComponent({});
</script>

<style lang="scss">
@import '@/styles/styles';
.durlex-navbar {
  @include media('print') {
    display: none !important;
  }
  font-size: $font-large;
  font-weight: 900; 
  @include grid-center;
  height: $navbar-height;
  min-height: 4rem !important;
  color: color(white);
  background-color: color(secondary);
  * {
    @include hoverable;
    justify-self: start;
    min-width: 2rem;
    white-space: nowrap;
  }


  @include media("<=tablet") {
    font-size: $font-small !important;
    grid-gap: $gap/2;
    .logo {
        font-size: $font-large !important;
    }

    .login {
        margin-right: $gap/2 !important;
    }
  }

  .logo {
    font-size: $font-x-large;
    margin-left: $gap;
    color: color(primary);
  }
  grid-template-columns: 1fr;
  grid-gap: $gap;
  grid-auto-columns: min-content;
  grid-auto-flow: column;

  .login {
    justify-self: start;
    margin-right: $gap;
    margin-bottom: 10%;
    color: color(white) !important;
    background-color: color(primary);
    border-radius: 100%;
    height: 2rem;
    width: 2rem;
  }
}
</style>