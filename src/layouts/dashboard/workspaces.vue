<template>
  <div class="form fadein">
    <div class="title">Workspaces settings</div>
    <div class="form-description">
      <span class="form-description-icon icon-help" />These are
      Process Creator's workspaces settings for the projects location behaviour.
      These settings are unrelated to the process's definitions, parameters and
      behaviour. <a href="#">Learn more.</a>
    </div>

    <div class="widget">
      <div class="title">Workspaces</div>
      <div class="chart">
        <div class="form-row">
          <div class="form-row-left">
            <p-button title="Add Workspace" :primary="true" @action="add" />
          </div>
          <div class="form-row-right">
            <p-button
              title="Delete"
              :primary="true"
              :disabled="isDeleteDisabled"
              @action="$refs.modalRef.open()"
            />
            <p-input-field placeholder="Search" />
          </div>
        </div>
        <div class="form-row">
          <p-table
            :items="workspaces"
            :columns="columns"
            :selected="selected"
            @set-row="setRow"
            @set-all="setAll"
            @open="open"
            @edit="edit"
          />
        </div>
      </div>
    </div>

  </div>

  <p-modal ref="modalRef" title="Delete Workspace" @ok="remove">
    <template v-slot:content>
      <div>Would you like to remove this workspaces?</div>
    </template>
  </p-modal>
</template>

<script lang="ts">
import { WorkspaceState } from "@/model";
import router from "@/router";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const modalRef = ref(null);
    const desktop = computed(() => store.getters[`settings/getDesktop`]);
    const selected = ref<string[]>([]);
    const isDeleteDisabled = computed(() => selected.value.length === 0);
    const columns = ref([
      { id: "name" },
      { id: "type" },
      { id: "projects" },
      { id: "path" },
      { id: "actions" },
    ]);

    const workspaces = computed(() => {
      // eslint-disable-next-line
      const items: any = [];
      desktop.value.workspaces.forEach((w: WorkspaceState) => {
        items.push({
          name: w.name,
          type: w.type,
          projects: w.projects.length,
          path: w.root?.path,
        });
      });
      return items;
    });

    const add = () => {
      router.push({ path: "/dashboard/workspaces/add" });
    };

    const setRow = (name: string) => {
      const idx = selected.value.findIndex((i) => i == name);
      if (idx === -1) {
        selected.value.push(name);
      } else {
        selected.value.splice(idx, 1);
      }
    };

    const setAll = () => {
      if (selected.value.length === workspaces.value.length) {
        selected.value = [];
      } else {
        selected.value = [];
        desktop.value.workspaces.forEach((w: WorkspaceState) => {
          selected.value.push(w.name);
        });
      }
    };

    const escapeCharacters = (expression: string) => {
      return expression
        .split(" ")
        .join("%20")
        .split("=")
        .join("%3D")
        .split("|")
        .join("%7C")
        .split("&")
        .join("%26")
        .split("<")
        .join("%3C")
        .split(">")
        .join("%3E")
        .split(":")
        .join("%3A")
        .split("+")
        .join("%2B")
        .split("~")
        .join("%7E");
    };

    const open = (name: string) => {
      router.push({ path: `/ide/${escapeCharacters(name)}` });
    };

    const edit = (name: string) => {
      router.push({ path: `/dashboard/workspaces/add/${name}` });
    };

    const remove = () => {
      const workspaces = desktop.value.workspaces.filter(
        (w: WorkspaceState) => !selected.value.includes(w.name)
      );
      selected.value = [];
      desktop.value.workspaces = workspaces;
      store.dispatch("settings/setDesktop", desktop.value);
    };

    return {
      add,
      setAll,
      setRow,
      columns,
      desktop,
      selected,
      workspaces,
      modalRef,
      remove,
      open,
      edit,
      isDeleteDisabled,
    };
  },
});
</script>

