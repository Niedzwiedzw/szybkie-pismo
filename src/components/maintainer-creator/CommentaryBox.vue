<template>
    <div class="CommentaryBox">
        this is <strong>CommentaryBox</strong>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class CommentaryBox extends Vue {
    }
</script>

<style scoped lang="scss">
    @import "../../styles/styles";
    .CommentaryBox {
        @include grid-center;
    }
</style>
