<template>
  <div class="GenerationGeneration">
    <encouragement-card title="Witaj w generatorze dokumentów">
        Zadamy ci kilka pytań. <button @click="$router.push({name: 'client:creator:select'})">przejdź dalej</button>
    </encouragement-card>
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
.GenerationGeneration {
  @include default-view;
}
</style>
