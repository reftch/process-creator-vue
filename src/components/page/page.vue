<template>
  <div v-if="views.length !== 0" class="page">
    <p-tabs
      :tabs="tabs"
      :shadow="true"
      :closeable="true"
      @changed="tabChanged"
      @close="(tab) => $emit('close-page', tab.id)"
    />

    <span v-for="v in views" :key="v.id">
      <component
        v-if="v.isActive"
        :is="v.component"
        v-bind="{ parameters: v.parameters }"
      />
    </span>

  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { TabState, ViewState } from "@/model";

export default defineComponent({
  props: {
    views: { type: Array as PropType<ViewState[]>, default: [] },
  },
  setup(props) {
    const tabs = computed(() =>
      props.views.map((v: ViewState) => {
        return { id: v.id, title: v.title, active: v.isActive };
      })
    );

    const tabChanged = (tab: TabState) => {
      props.views.forEach((v: ViewState) => (v.isActive = v.id === tab.id));
    };

    return {
      tabs,
      tabChanged,
    };
  },
});
</script>

