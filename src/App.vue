<template>
  <div id="app" class="wrapper">
    <p-header @sidebar-toggle="sidebarToggle"/>
    <p-topbar :project="project"/>
    <router-view></router-view> 
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
// import gql from "graphql-tag";
// import apolloClient from "./api/apolo-ws-client";
import router from "./router";

export default defineComponent({
  setup() {
    const store = useStore();
    const desktop = computed(() => store.getters[`settings/getDesktop`]);
    const project = computed(() => store.getters[`projects/getProjectName`]);

    const openSettings = (id: string) => {
      if (id) {
        router.push({ path: `/dashboard/${id}` });
      }
    };

    const sidebarToggle = () => {
      const sidebar = document.getElementById("side-nav");
      if (sidebar) {
        sidebar.classList.toggle('visible');
      }
    }

    onBeforeMount(async () => {
      await store.dispatch(`settings/fetch`);

      document.documentElement.className =
        desktop.value.theme === "Dark" ? "theme-dark" : "";

      // const observer = apolloClient.subscribe({
      //   query: gql`
      //     subscription {
      //       projectFound {
      //         name
      //       }
      //     }
      //   `,
      // });

      // observer.subscribe({
      //   next(data) {
      //     if (data) {
      //       store.commit(
      //         `projects/setProjectName`,
      //         data.data.projectFound.name
      //       );
      //     }
      //   },
      //   error(error) {
      //     console.error(error);
      //   },
      // });
    });

    return {
      openSettings,
      project,
      sidebarToggle,
    };
  },
});
</script>

<style lang="scss">
@import "./styles/index.scss";
</style>
