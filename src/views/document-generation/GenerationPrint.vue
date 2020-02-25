<template>
  <div class="GenerationPrint">
    <div class="a4page" v-html="rendered">

    </div>
  </div>
</template>

<script lang="ts">
    import {defineComponent, ref, computed, onMounted} from "@vue/composition-api";
    import {fromBinary} from "@/helpers";

    export default defineComponent({
        name: 'GenerationPrint',
        props: {
            data: {
                type: String,
                default: '',
            },
        },
        setup(props) {
            const rendered = computed(() => fromBinary(props.data));
            const print = () => setTimeout(() => window.print(), 1500);
            onMounted(print);
            return {
                rendered,
            };
        },
    });
</script>

<style scoped lang="scss">
    @import 'src/styles/styles';
    .GenerationPrint {
      .a4page {
        align-self: start !important;
        justify-self: start;
        @include a4-margin;
      }
    }
</style>