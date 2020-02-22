<template>
  <div class="Home">

    <div class="contents">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ducimus quae et consectetur dolores, odit esse beatae illum, eum ab asperiores vitae? Perferendis, id ipsa vel quod sequi officia voluptas!
      Incidunt pariatur, explicabo neque velit eveniet suscipit, similique veritatis, nostrum nisi voluptatum illum commodi repellendus aut est voluptates dolores? Saepe labore inventore, similique quis et velit possimus dolores magni. Nostrum?
      Odio pariatur nobis sint, est harum magni velit distinctio impedit aliquam laudantium cumque cupiditate aperiam inventore amet. Cum quasi vitae animi quo mollitia pariatur asperiores minima, eaque facilis aliquid sapiente?
      Autem cum deserunt quasi numquam adipisci rem aut, itaque odit dolores sit fuga eius officiis ullam culpa maxime veritatis officia minima quaerat libero voluptatem eum quidem? Sequi molestiae obcaecati quas!
      Assumenda, repudiandae similique, delectus impedit aperiam labore ipsam nemo quod voluptates suscipit, non cumque quia culpa odio alias? Possimus est nisi assumenda qui explicabo omnis, blanditiis at tenetur. Autem, distinctio.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import DurlexNavbar from '../DurlexNavbar.vue';
export default defineComponent({
  components: {
    DurlexNavbar,
  },
  setup() {
    return {};
  },
})
</script>

<style scoped lang="scss">
@import '@/styles/styles';
.Home {
  @include grid-center; 
  font-weight: bold;
  grid-template-rows: min-content 1fr;
  
  .contents {
    @include grid-center;
    background-color: color(white);
    font-size: medium;
    font-weight: 400;
  }
}
</style>
