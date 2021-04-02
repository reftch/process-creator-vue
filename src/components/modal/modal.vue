<template>
  <div v-if="opened" class="modal">
    <div class="modal-container">

      <div class="modal-left">
      </div>
      <div class="modal-right">
        <span
          class="modal-close tabs-text-icon icon-close"
          @click.stop="hide('Cancel')"
        />

        <p class="modal-title">
          {{ title }}
        </p>
        <div class="modal-content">
          <slot name="content" />
        </div>
        <div class="modal-footer">
          <p-button
            class="modal-button"
            title="Ok"
            :primary="true"
            @action="hide('Ok')"
          />
          <p-button
            class="modal-button"
            title="Cancel"
            :secondary="true"
            @action="hide('Cancel')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

export default defineComponent({
  props: {
    title: String,
    path: String,
  },
  setup(props, context) {
    const opened = ref(false);
    const workspace = ref(props.path);

    const open = () => {
      opened.value = true;
    };

    const hide = (action: string) => {
      opened.value = false;
      if (action === "Ok") {
        context.emit("ok");
      }
    };

    const esc = (e: KeyboardEvent) => {
      if (e.which === 27) hide("Cancel");
    };

    onMounted(() => {
      window.addEventListener("keyup", (e: KeyboardEvent) => esc(e));
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", (e: KeyboardEvent) => esc(e));
    });

    return {
      workspace,
      opened,
      open,
      hide,
    };
  },
});
</script>

