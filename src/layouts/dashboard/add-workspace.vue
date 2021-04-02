<template>
  <div class="form fadein">
    <div class="title">Workspace</div>
    <div class="form-description">
      <span class="form-description-icon icon-help" />
      Process Creator provides developer workspaces with
      everything needed to a code and deploy processes.
      <a href="#">Learn more.</a>
    </div>

    <div class="widget">
      <div class="title">Parameters</div>
      <div class="chart form-inline">
        <div class="row-col-50">
          <label class="form-label">Workspace Name *</label>
          <div class="form-hint">
            Each workspace should have an unique name.
          </div>
          <div class="view-settings-form-row">
            <p-input-field v-model="name" placeholder="New Workspace" />
          </div>
        </div>

        <div class="row-col-30">
          <label class="form-label">Type *</label>
          <div class="form-hint" style="min-width: 300px">
            Please choose a type.
          </div>
          <div class="view-settings-form-row">
            <p-dropdown
              id="dropdown-type"
              v-model.lazy="type"
              :options="types"
            />
          </div>
        </div>

      </div>
    </div>

    <div class="widget">
      <div class="title">Pod</div>
      <div class="chart form-inline">

        <div class="row-col-25">
          <label class="form-label">Database *</label>
          <div class="form-hint" style="min-width: 300px">
            Please choose a database.
          </div>
          <div class="view-settings-form-row">
            <p-dropdown
              id="dropdown-type"
              v-model.lazy="database"
              :options="databases"
            />
          </div>
        </div>

        <div class="row-col-25">
          <label class="form-label">Backend Version *</label>
          <div class="form-hint" style="min-width: 300px">
            Please choose a version.
          </div>
          <div class="view-settings-form-row">
            <p-dropdown
              id="dropdown-type"
              v-model.lazy="app"
              :options="apps"
            />
          </div>
        </div>

        <div class="row-col-25">
          <label class="form-label">UI *</label>
          <div class="form-hint" style="min-width: 300px">
            Please choose a version.
          </div>
          <div class="view-settings-form-row">
            <p-dropdown
              id="dropdown-type"
              v-model.lazy="ui"
              :options="uis"
            />
          </div>
        </div>

        <div class="row-col-25">
          <label class="form-label">Authentication Server *</label>
          <div class="form-hint" style="min-width: 300px">
            Please choose a version.
          </div>
          <div class="view-settings-form-row">
            <p-dropdown
              id="dropdown-type"
              v-model.lazy="ana"
              :options="anas"
            />
          </div>
        </div>

      </div>
    </div>

    <div v-if="type === 'LOCAL'" class="widget">
      <div class="title">Home Directory</div>
      <div class="chart form-inline">
        <div class="row-col-100">
          <label class="form-label">Home Directory *</label>
          <div class="form-hint">
            The directory where projects are assumed to be located.
          </div>
          <div class="view-settings-form-row">
            <p-input-field v-if="root" v-model="root.path" :disabled="true" />
          </div>
        </div>

        <div style="width: 100%">
          <div class="form-file-explorer">
            <p-file-explorer
              v-if="root"
              :folder="root"
              @open-folder="openFolder"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="widget">
      <div class="title">Distribution File System</div>
      <div class="chart form-inline">
        <div class="row-col-100">
          Some settings..
        </div>
      </div>
    </div>

    <div class="form-parameter">
      <div class="form-row-left">
        <p-button
          title="Create & Open"
          :primary="true"
          @action="create"
          :disabled="isNameInvalid"
        />
        <!-- <p-button title="Cancel" :primary="true" @action="cancel" /> -->
      </div>
      <div class="form-row-right"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import router from "@/router";
import { WorkspaceState } from "@/model";

export default defineComponent({
  setup() {
    const store = useStore();
    const desktop = computed(() => store.getters[`settings/getDesktop`]);
    const root = computed(() => store.getters[`workspaces/getRoot`]);
    const name = ref("");
    const type = ref("LOCAL");
    const types = ref(["LOCAL", "DISTRIBUTION"]);
    const database = ref("MariaDB");
    const databases = ref(["MariaDB", "MySQL", "Oracle", "MSSQL"]);
    const app = ref("4.0.0");
    const apps = ref(["4.0.0", "4.1.0", "4.2.0", "4.3.0"]);
    const ana = ref("1.6.0");
    const anas = ref(["1.6.0", "1.7.0", "2.0.0"]);
    const ui = ref("1.0.0");
    const uis = ref(["1.0.0", "1.1.0", "1.2.0"]);

    const isNameInvalid = computed(() => {
      const notUniqueName = desktop.value.workspaces.find(
        (w: WorkspaceState) => w.name === name.value
      );
      const rootPath = root.value ? root.value.path : "/";
      const notUniquePath = desktop.value.workspaces.find(
        (w: WorkspaceState) => w.root?.path === rootPath
      );
      return notUniqueName || notUniquePath || name.value.length === 0;
    });

    const create = () => {
      const workspace = {
        name: name.value,
        type: type.value,
        root: root.value,
        folder: null,
        projects: [],
      };
      desktop.value.workspaces.push(workspace);
      store.dispatch("settings/setDesktop", desktop.value);
      router.push({ path: "/dashboard/workspaces" });
    };

    const cancel = () => {
      router.push({ path: "/dashboard/workspaces" });
    };

    const openFolder = (path: string) => {
      store.dispatch(`workspaces/fetchRoot`, path);
    };

    onMounted(() => {
      let path: string | undefined = "";
      const paramId = router.currentRoute.value.params.id;
      if (paramId) {
        const workspace: WorkspaceState = desktop.value.workspaces.find(
          (w: WorkspaceState) => w.name === paramId
        );
        if (workspace) {
          name.value = workspace.name;
          type.value = workspace.type;
          path = workspace.root?.path;
        }
      }
      store.dispatch("workspaces/fetchRoot", path);
    });

    return {
      ui,
      uis,
      ana,
      anas,
      type,
      types,
      app,
      apps,
      database,
      databases,
      create,
      cancel,
      root,
      name,
      desktop,
      openFolder,
      isNameInvalid,
    };
  },
});
</script>
