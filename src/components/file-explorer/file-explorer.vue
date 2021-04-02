<template>
  <!-- <div class="explorer-viewport1 fadein"> -->
    <span
      v-if="root !== folder.path"
      class="explorer-viewport-folder"
      @click.stop="$emit('open-folder', folder.parent)"
    >
      <span class="icon-folder"></span>
      <span class="explorer-viewport-title">..</span>
    </span>
    <span v-for="file in folder.files" :key="file.name">
      <span
        v-if="file.isDirectory"
        class="explorer-viewport-folder"
        @click.stop="$emit('open-folder', file.path)"
      >
        <span class="icon-folder"></span>
        <span class="explorer-viewport-title fadein">
          {{ file.name }}
        </span>
      </span>

      <span
        v-show="!file.isDirectory"
        class="explorer-viewport-file"
        @click.stop="$emit('open-file', file)"
      >
        <span
          class="explorer-viewport-title fadein"
          :class="{ 'explorer-dbe': file.name.includes('.dbe') }"
          >{{ file.name }}</span
        >
      </span>
    </span>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IFolder } from "../../model/folder";

export default defineComponent({
  emits: ['open-file', 'open-folder'],
  props: {
    root: String,
    folder: { type: Object as PropType<IFolder> },
  },
  setup() {

    return {
    }
  },
});
</script>

