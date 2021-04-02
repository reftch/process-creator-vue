<template>
  <div class="topbar">
    <div class="topbar-left">
      <div class="topbar-logo">
        <span class="icon-logo" @click.stop="home" />
        <span class="logo" @click.stop="home">Vue</span>
      </div>
      <div class="topbar-title" @click.stop="home">Process Creator</div>
      <div class="topbar-ui"></div>
    </div>

    <div class="topbar-right">
      <p-separator v-if="project" mode="vertical" />
      <span v-if="project">Project:</span>

      <div v-if="project" class="topbar-project">
        {{ project }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopBar",
  props: {
    project: { type: String, default: "" },
  },
  setup() {
    const home = () => {
      router.push({ path: "/dashboard/workspaces" });
    };

    return {
      home,
    };
  },
});
</script>

