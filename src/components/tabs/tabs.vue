<template>
  <div class="tabs" v-resize="onResize" :class="{ 'tabs-shadow': shadow }">
    <div class="tabs-subheader">
      <p-button
        v-if="scrollVisible"
        icon="icon-arrow-left"
        :disabled="leftScrollDisabled"
        @action="scroll('left')"
      />

      <div ref="tablist" class="tabs-scroller">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tabs-list"
          :style="position"
          @click.stop="click(tab)"
        >
          <span
            class="tabs-text"
            :class="{ 'tab-text-disabled': tab.disabled, 'tabs-text-active': tab.active }"
          >
            {{ tab.title }}
            <span
              v-if="closeable"
              class="tabs-text-icon icon-close"
              @click.stop="$emit('close', tab)"
            />
          </span>
        </div>
      </div>

      <p-button
        v-if="scrollVisible"
        icon="icon-arrow-right"
        :disabled="rightScrollDisabled"
        @action="scroll('right')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType, SetupContext } from "vue";
import { TabState, DetailState } from "../../model";

export default defineComponent({
  props: {
    tabs: { type: Array as PropType<TabState[]> },
    shadow: Boolean,
    closeable: Boolean,
  },
  setup(props, context: SetupContext) {
    const offset = ref<number>(0);
    // eslint-disable-next-line
    const tablist = ref<any>(null);
    const scrollVisible = ref<boolean>(true);
    const leftScrollDisabled = ref<boolean>(true);
    const rightScrollDisabled = ref<boolean>(false);
    const viewWidth = ref(0);

    const position = computed(() => `left: ${offset.value}px;`);

    const scroll = (direction: string) => {
      if (tablist.value) {
        const maxWidth = tablist.value["scrollWidth"];
        const nonVisibleArea = maxWidth - viewWidth.value;

        if (!rightScrollDisabled.value && direction === "right") {
          offset.value -= 50;
        } else if (!leftScrollDisabled.value && direction === "left") {
          offset.value += 50;
        }
        rightScrollDisabled.value = nonVisibleArea <= -30;
        leftScrollDisabled.value = offset.value >= 0;
        scrollVisible.value = maxWidth >= viewWidth.value;
      }
    };

    const click = (tab: TabState) => {
      if (props.tabs) {
        props.tabs.forEach((t: TabState) => (t.active = tab.id === t.id));
        context.emit("changed", tab);
      }
    };

    const onResize = (e: DetailState) => {
      offset.value = 0;
      viewWidth.value = e.detail.width;
      scroll("");
    };

    return {
      tablist,
      position,
      scroll,
      click,
      onResize,
      leftScrollDisabled,
      rightScrollDisabled,
      scrollVisible,
    };
  },
});
</script>

