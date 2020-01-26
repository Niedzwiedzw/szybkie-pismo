<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<style lang="scss">
@import 'styles/styles';

#app {
  @include grid-center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
