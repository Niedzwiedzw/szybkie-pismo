<template>
  <div class="MaintainerCreatorView">
    <input-box class="input-text" v-model="markdownInput" />
    <div class="rendered-text" v-html="rendered"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import InputBox from '@/components/maintainer-creator/InputBox.vue';
import { DynamicText } from '@/extended-markdown-parser/transform';

@Component({
  components: { InputBox },
})
export default class MaintainerCreatorView extends Vue {
  private markdownInput: string = `
# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~
1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com`;

  private get rendered(): string {
    const renderer = new DynamicText(this.markdownInput);
    return renderer.render();
  }
}
</script>

<style scoped lang="scss">
@import '../styles/styles';

.MaintainerCreatorView {
  @include grid-center;
  grid-template-columns: 1fr 1fr;
  grid-gap: $gap;

  .input-text {
    width: 100%;
    height: 100%;
  }
  .rendered-text {
    height: 100%;
    width: 100%;
  }
}
</style>
