<template>
  <v-app id="app">
    <router-view class="contents"/>
  </v-app>
</template>

<style lang="scss">
@import 'styles/styles';

#app {
  @include grid-center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .contents {
    padding: 2vw;
  }
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $special-text-color;
    }
  }
}
.v-application {
  background: $primary-background-color !important;
}

html, body {
  background-color: $primary-background-color !important;
  & * {
    background-color: $primary-background-color;
  }
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
</style>
