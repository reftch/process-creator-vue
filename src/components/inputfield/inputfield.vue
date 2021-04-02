<template>
  <div class="inputfield fadein" :class="{ 'inputfield-disabled': disabled, 'inputfield-required': isRequired }">
      <div class="inputfield-form-row" :style="getStyle">
        <input
          type="text"
          :value="modelValue"
          :disabled="disabled"
          :placeholder="placeholder"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  model: {
    prop: "modelValue",
  },
  props: {
    modelValue: { default: "" },
    label: String,
    description: String,
    disabled: Boolean,
    placeholder: String,
    required: Boolean,
    width: Number, 
  },
  setup(props) {

    return {
      getStyle: computed(() => props.width ? `${props.width}px`: ''),
      getValue: computed(() => props.modelValue),
      isRequired: computed(() => props.required && props.modelValue.length === 0),
    };
  },
});
</script>
