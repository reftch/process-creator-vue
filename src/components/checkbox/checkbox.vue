<template>
  <div
    class="custom-checkbox"
    :class="{
      'bi-check-square-fill': isChecked,
      'bi-square': !isChecked,
      'bi-dash-square-fill': isPartlySelected,
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Checkbox",
  props: {
    modelValue: {},
    val: { type: String },
    isPartlySelected: Boolean,
  },
  setup(props, context) {
    const isChecked = computed(() => {
      if (typeof props.modelValue === "boolean") {
        return props.modelValue;
      }
      const value: Array<string> = props.modelValue as Array<string>;
      return value && props.val ? value.includes(props.val) : false;
    });

    const change = () => {
      if (props.modelValue && props.val) {
        const value: Array<string> = props.modelValue as string[];
        const found = value.indexOf(props.val);
        if (found !== -1) {
          value.splice(found, 1);
        } else {
          value.push(props.val);
        }
      }
      context.emit("change", props.modelValue);
    };

    return {
      change,
      isChecked,
    };
  },
});
</script>
<style lang="scss" scoped>
.custom-checkbox {
  cursor: pointer;
}
</style>
