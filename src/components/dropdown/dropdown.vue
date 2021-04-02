<template>


  <div
    class="dropdown"
    :class="{ 'dropdown-disabled': disabled }"
    @click="activate"
  >
    <div ref="select" class="dropdown-select">
      <div class="dropdown-select-trigger">
        <span ref="model">{{ getValue }}</span>
        <div class="dropdown-arrow open"></div>
      </div>
      <div v-if="!disabled" class="dropdown-options">
        <span
          v-for="value of options"
          :key="value"
          :data-value="value"
          class="dropdown-option"
          :class="{ selected: getValue === value }"
          @click.stop="deactivate(value)"
        >
          {{ value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  model: {
    prop: "modelValue",
  },
  props: {
    modelValue: { default: "" },
    disabled: Boolean,
    width: Number,
    options: { type: Array },
  },
  setup(props, context) {
    const select = ref<HTMLElement>();
    const model = ref(null);

    const activate = () => {
      if (!props.disabled) {
        select.value?.classList.toggle("open");
      }
    };

    const deactivate = (value: string) => {
      context.emit("update:modelValue", value);
      context.emit("change", value);
      select.value?.classList.remove("open");
    };

    return {
      activate,
      deactivate,
      select,
      model,
      getValue: computed(() => props.modelValue),
    };
  },
});
</script>
