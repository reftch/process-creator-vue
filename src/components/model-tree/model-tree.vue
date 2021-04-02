<template>
  <div class="model-tree">
    <ul>
      <li>
        <div class="model-tree-caret model-tree-caret-down">Process configuration</div>
        <ul class="model-tree-nested fadein model-tree-active">
          <li>
            <div class="model-tree-caret">Standard processing</div>
            <ul class="model-tree-nested fadein">
            </ul>  
          </li>
          <li>
            <div class="model-tree-caret model-tree-caret-down">General settings</div>
            <ul class="model-tree-nested fadein model-tree-active">
              <div
                v-for="systemname in getSystemSettings"
                :key="systemname"
                class="model-tree-item"
                @click.stop="openHandler('system-settings', systemname)"
              >
                System settings - {{ systemname }}
              </div>

              <li>
                <div class="model-tree-caret model-tree-caret-down">Definitions</div>
                <ul class="model-tree-nested fadein model-tree-active">
                  <span v-for="h in handlers" :key="h">
                    <li v-if="h.hasNested">
                      <div class="model-tree-caret" @click.stop="$emit('open-handler', h.name)">{{ h.name }}</div>
                      <ul class="model-tree-nested fadein">
                      </ul>  
                    </li>
                    <div v-else class="model-tree-item" @click.stop="$emit('open-handler', h.name)">
                      {{ h.name }}  
                    </div>
                  </span>
                </ul>  
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { IProcess } from "../../model/process";
import { useStore } from "vuex";

interface HandlerState {
  name: string;
  hasNested: boolean;
}

export default defineComponent({
  props: {
    // process: { type: Object as PropType<IProcess> },
  },
  setup(props, context) {
    const store = useStore();
    const process = computed(() => store.getters[`processes/getProcess`]);
    const handlers = ref<HandlerState[]>([
      { name: 'Additional sheet definition list', hasNested: false},
      { name: 'Application definition list', hasNested: true},
      { name: 'Directory definition list', hasNested: true},
      { name: 'Document type definition list', hasNested: true},
      { name: 'Field name definition list', hasNested: true},
      { name: 'External program definition list', hasNested: false},
      { name: 'Java commnd definition list', hasNested: false},
      { name: 'Script command type definition list', hasNested: false},
      { name: 'Mail piece bundling definition list', hasNested: true},
      { name: 'Paper type definition list', hasNested: false},
      { name: 'SQL query definition list', hasNested: false},
      { name: 'Trigger definition list', hasNested: false},
      { name: 'Envelope definition list', hasNested: false},
      { name: 'Mail piece class definition list', hasNested: true},
      { name: 'Sendmail definition list', hasNested: false},
      { name: 'Handler sequence definition list', hasNested: true},
      { name: 'Handler definitions', hasNested: true},
      { name: 'Output channel list', hasNested: true},
      { name: 'Subchannel list', hasNested: true},
      { name: 'Output configuration list', hasNested: true},
      { name: 'Print spool handler list', hasNested: false},
      { name: 'Split spool handler list', hasNested: false},
      { name: 'Output configuration handler list', hasNested: false},
      { name: 'Separator sheet list', hasNested: false},
      { name: 'Scheduler shhet list', hasNested: true},
      { name: 'Order and data enrichment definition list', hasNested: true},
      { name: 'Column definition list - Document order im mail piece', hasNested: true},
      { name: 'Column definition list - Mail piece order in job', hasNested: true},
    ]);

    // const handlerComparator = (a: HandlerState, b: HandlerState) => {
    //   return a.name.normalize().localeCompare(b.name.normalize());
    // }

    // const getSortedHandlers = computed(() => handlers.value.sort(handlerComparator));

    const openHandler = (handler: string, value: string) => {
      context.emit('open-handler', { handler, value });
    }

    const getSystemSettings = computed(() => {
      if (process.value) {
        return process.value.ProcessConfiguration.GeneralSettings.SystemSettings.map(
          (s: any) => s.attributes.SystemName
        );
      }
      return {};
    })

    onMounted(() => {
      const toggler = document.getElementsByClassName("model-tree-caret");

      for (let i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", () => {
          const element: HTMLElement = toggler[i] as HTMLElement;
          element.parentElement
            ?.querySelector(".model-tree-nested")
            ?.classList.toggle("model-tree-active");
          element.classList.toggle("model-tree-caret-down");
        })
      }
    })

    return {
      process,
      // getSortedHandlers,
      openHandler,
      getSystemSettings,
    }
  },
});
</script>

