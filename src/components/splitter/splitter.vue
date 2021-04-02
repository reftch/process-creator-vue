<template>
  <div ref="outerWrapper" class="splitter splitter-body">
    <div class="splitter-component" :style="styleLeft">
      <slot name="left" />
    </div>
    <div
      class="splitter-bar"
      @mousedown="mousedown"
      @touchstart="mousedown"
    ></div>
    <div class="splitter-component" :style="styleRight">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue';

export default defineComponent({
  name: 'Splitter',
  props: {
    value: { type: Number, default: 0.25 }
  },
  setup(props, context) {
    const outerWrapper = ref<HTMLElement>();
    const flex = ref(props.value);
    const outerWidth = ref(0);
    const offset = ref(0);

    nextTick(() => {
      flex.value = props.value;
    })

    const styleLeft = computed(() => `flex: ${flex.value} 0px;`)
    const styleRight = computed(() => `flex: ${1 - flex.value} 0px;`)

    const mousemove = (event: MouseEvent | TouchEvent) => {
      const x =
        event instanceof MouseEvent
          ? (event as MouseEvent).clientX
          : (event as TouchEvent).touches[0].clientX;

      flex.value = (x - offset.value) / outerWidth.value;
      flex.value = flex.value > 1 ? 1 : flex.value < 0 ? 0 : flex.value;
    }

    const mouseup = () => {
      // console.log(event)
      context.emit('update', flex.value);
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("touchmove", mousemove);
      window.removeEventListener("touchend", mouseup);
    }

    const mousedown = (event: MouseEvent | TouchEvent) => {
      // console.log(event)
      if (outerWrapper.value) {
        // flex.value = props.value;
        outerWidth.value = outerWrapper.value["offsetWidth"];
        const x =
          event instanceof MouseEvent
            ? (event as MouseEvent).x
            : (event as TouchEvent).touches[0].clientX;
        offset.value = x - (outerWidth.value * flex.value);

        window.addEventListener("mouseup", mouseup);
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("touchmove", mousemove);
        window.addEventListener("touchend", mouseup);
      }
    }

    return {
      outerWrapper,
      styleLeft,
      styleRight,
      mousedown
    }
  }
})

</script>
