
<template>
  <div class="explorer">    
    <p-tabs :tabs="tabs" :shadow="true" />

    <div class="explorer-container">
      <span v-if="tabs[0].active" class="explorer-container-controls fadein">
        <p-button icon="button icon-department" @action="$emit('open-folder', '')"/>
        <p-button icon="button icon-folder-add" />
        <p-button icon="button icon-file-add" />
        <p-separator mode="horizontal" />
        <p-button icon="button icon-zip-export" />
        <p-button icon="button icon-zip-import" />
      </span>

      <span v-if="tabs[1].active" class="explorer-container-controls fadein">
        <p-button icon="button icon-blocks-properties" />
        <p-button icon="button icon-template" />
        <p-button icon="button icon-database" />
        <p-separator mode="horizontal" />
        <p-button icon="button icon-chart" />
        <p-button icon="button icon-unicode-html-entities" />
        <p-separator mode="horizontal" />
      </span>

      <div v-if="folder && tabs[0].active" class="explorer-viewport fadein">

        <p-file-explorer :root="root" :folder="folder" 
          @open-file="file => $emit('open-file', file)"
          @open-folder="path => $emit('open-folder', path)"
        />
      </div>

      <!-- <div
        v-if="folder && tabs[0].active"
        class="explorer-viewport fadein"
      >
        <span class="explorer-viewport-folder" @click.stop="$emit('open-folder', folder.parent)">
          <span class="icon-folder"></span>
          <span class="title">..</span>
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
            @click.stop="openFile(file)"
          >
            <span
              class="explorer-viewport-title fadein"
              :class="{ 'explorer-dbe': file.name.includes('.dbe') }"
              >{{ file.name }}</span
            >
          </span>
        </span>
      </div> -->

      <p-model-tree
        v-if="folder && tabs[1].active"
        :process="process"
        @open-handler="data => $emit('open-handler', data)"
      ></p-model-tree>
        
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { IFolder, IProcessConfiguration } from "common";
import { TabState } from "@/model";

export default defineComponent({
  props: {
    root: String,
    folder: { type: Object as PropType<IFolder> },
    process: { type: Object as PropType<IProcessConfiguration> },
  },
  setup() {

    const tabs = ref<TabState[]>([
      { id: 1, title: "Project Explorer", active: true },
      { id: 2, title: "Model Tree", active: false },
    ]);

    return {
      tabs,
    };
  },
});
</script>

