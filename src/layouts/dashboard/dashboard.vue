<template>
  <div id="side-nav" class="side-nav">
    <div class="logo">
    </div>

    <p-sidebar :sections="sections" />
  </div>
  <div class="main-content">
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { SectionState } from "@/model";
import Sidebar from "./sidebar.vue";
import store from "@/store";

export default defineComponent({
  components: {
    "p-sidebar": Sidebar,
  },
  setup() {
    const sections = ref<SectionState[]>([
      {
        id: "/dashboard/workspaces",
        title: "Workspaces",
        icon: "bi-box-seam",
        isActive: true,
      },
      {
        id: "/dashboard/settings",
        title: "Settings",
        icon: "bi-gear-fill",
        isActive: false,
      },
      {
        id: "/dashboard/info",
        title: "System Info",
        icon: "bi-info-circle",
        isActive: false,
      },
      {
        id: "/dashboard/copyright",
        title: "Copyright",
        icon: "bi-question-circle",
        isActive: false,
      },
    ]);

    onMounted(() => {
      store.commit(`projects/setProjectName`, "");
    });

    return {
      sections,
    };
  },
});
</script>

