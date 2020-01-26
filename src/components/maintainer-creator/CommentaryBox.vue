<template>
  <div class="CommentaryBox">
    <input
        type="text"
        v-for="key of variables"
        :key="key"
        :value="value[key]"
        @input="(newVal) => setValue(key, newVal)"
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
$input-height: 2rem;

.CommentaryBox {
  @include grid-center;
  grid-template-columns: repeat(auto-fill, minmax($input-width, 1fr));
  grid-gap: $gap;
  input {
    width: 95%;
  }
}
</style>
