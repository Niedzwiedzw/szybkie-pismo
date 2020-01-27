<template>
  <div class="CommentaryBox">
    <h3>komentarze</h3>
    <input
        type="text"
        v-for="key of variables"
        :key="key"
        v-model="value[key]"
        :placeholder="key"
    />
  </div>
</template>

<script lang="ts">
import {keys} from 'lodash';
import {Component, Vue, Prop} from 'vue-property-decorator';
import {Commentary} from "@/extended-markdown-parser/commentary";

@Component({
  components: {},
})
export default class CommentaryBox extends Vue {
  @Prop({default: {}, type: Object}) value!: Commentary;

  private setValue(key: string, value: any) {
    this.$emit('input', {...this.value, ...{[key]: value}});
  }

  private get variables(): string[] {
    return keys(this.value);
  }

}
</script>

<style scoped lang="scss">
@import "../../styles/styles";

$input-width: 30rem;

.CommentaryBox {
  @include grid-center;
  padding: $gap;
  grid-template-columns: repeat(auto-fill, minmax($input-width, 1fr));
  grid-auto-rows: min-content;
  grid-gap: $gap;

  @include media("<=tablet") {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    padding: $gap/3;
  }

  h3 {
    grid-column: 1 / -1;
    color: $special-text-color;
  }
  input {
    @include app-box;
    width: 95%;
    height: $input-height;

    @include media("<=tablet") {
      height: $input-height/3;
    }
  }
}
</style>
