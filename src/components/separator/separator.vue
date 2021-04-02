<template>
  <div
    class="separator"
    :class="{
      'separator-vertical': mode === 'vertical',
      'separator-horizontal': mode === 'horizontal',
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "separator",
  props: {
    mode: String,
  },
});
</script>
