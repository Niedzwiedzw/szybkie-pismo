import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#107a8b',
        secondary:  '#2cb978',
        accent: '#83e85a',
        error: '#b71c1c',
      },
    },
  },
})
