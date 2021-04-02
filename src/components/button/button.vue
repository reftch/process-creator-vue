
<template>
  <div
    ref="button"
    class="button"
    :class="classBtn"
    @click="action"
  >
    <div v-if="title" class="button-text">{{title}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext } from 'vue';

export default defineComponent({
  name: "Button",
  props: {
    title: String,
    icon: String,
    primary: Boolean,
    secondary: Boolean,
    disabled: Boolean
  },
  setup(props, context: SetupContext) {
    const classBtn = computed(() => {
      let str = props.primary ? ' button-primary'
        : props.secondary ? ' button-secondary' : ' icon';

      if (props.icon) {
        str += ` ${props.icon}`;
      }
      if (props.disabled) {
        str += ' button-primary-disabled';
      } else {
          str += ' button-icon-only';
      }
      return str;
    });

    // methods

    const action = () => {
      if (!props.disabled) {
        context.emit("action");
      }
    }

    return {
      classBtn,
      action
    }
  }
})
</script>
