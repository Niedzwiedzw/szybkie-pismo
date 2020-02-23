<template>
  <div class="encouragement">
    <h3>{{title}}</h3>
    <div class="content"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/styles/styles';
.encouragement {
 @include encouragement-card;
 .content {
     @include grid-center;
 }
}
</style>