<template>
  <div class="InputBox">
    <label for="markdown-input" class="markdown-input-label"
      >Markdown input</label
    >
    <textarea
      v-model="value"
      class="markdown-input-text"
      name="Markdown input"
      id="markdown-input"
      cols="30"
      rows="10"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  components: {},
  props: {
    value: { required: true, type: String },
  },
})
export default class InputBox extends Vue {
  private get value(): string {
    return this.$props['value'];
  }
  private set value(newVal: string) {
    this.$emit('input', newVal);
  }
}
</script>

<style scoped lang="scss">
.InputBox {
  .markdown-input-label {
    visibility: hidden;
  }
  textarea {
    height: 90%;
    width: 100%;
  }
}
</style>
