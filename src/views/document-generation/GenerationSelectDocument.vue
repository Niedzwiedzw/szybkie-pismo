<template>
  <div class="GenerationSelectDocument">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import EncouragementCard from '@/views/landing-page/EncouragementCard.vue';

export default defineComponent({
    components: {
        EncouragementCard,
    },
});
</script>

<style scoped lang="scss">
@import '@/styles/styles';
.GenerationSelectDocument {
  @include default-view;
}
</style>