<template>
  <div class="header">
    <div class="logo">
      <span class="icon-logo" />
    </div>
    <a href="#" class="nav-trigger" @click.stop="$emit('sidebar-toggle')"><span></span></a>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({});
</script>

