<template>
  <div class="form fadein">
    <div class="title">Settings</div>
    <div class="form-description">
      <span class="form-description-icon icon-help" />
      These settings are related to the desktop looks like, choose color themes
      and language.
    </div>

    <div class="widget">
      <div class="title">Desktop</div>
      <div class="chart form-inline">
        <div class="row-col-40">
          <label for="appearance" class="form-label">Appearance</label>
          <div class="form-hint">Current application color's theme.</div>
          <p-dropdown
            id="apearance"
            v-model.lazy="theme"
            :options="themes"
            @change="themeChanged"
          />
        </div>

        <div class="row-col-50">
          <label for="language" class="form-label">Language</label>
          <div class="form-hint">
            All elements, labels, tooltips and toaster messages will appear on
            this language.
          </div>
          <p-dropdown
            id="language"
            v-model.lazy="lang"
            :options="languages"
            @change="$emit('list-change')"
          />
        </div>
        <span style="padding-top: 20px">
          <p-button title="Add Theme" :primary="true" />
        </span>
      </div>
    </div>

    <div class="widget">
      <div class="title">Static Applications</div>
      <div class="chart">
        <div class="form-row">
          <div class="form-row-left">
            <p-button title="Deploy" :primary="true" />
          </div>
          <div class="form-row-right">
            <p-button
              title="Delete"
              :primary="true"
              :disabled="isDeleteDisabledApps"
              @action="$refs.modalRef.open()"
            />
            <p-input-field placeholder="Search" />
          </div>
        </div>
        <div class="form-row">
          <p-table
            :items="apps"
            :columns="columnsApps"
            :selected="selectedApps"
            @set-row="setRowApps"
            @set-all="setAllApps"
          />
        </div>
      </div>
    </div>

    <div class="widget">
      <div class="title">Container Registries</div>
      <div class="chart">
        <div class="form-row">
          <div class="form-row-left">
            <p-button title="Add Registry" :primary="true" />
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
            :items="registries"
            :columns="columns"
            :selected="selected"
            @set-row="setRow"
            @set-all="setAll"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const desktop = computed(() => store.getters[`settings/getDesktop`]);

    const languages = ref(["Deutsch", "English", "Français"]);
    const lang = ref("Deutsch");
    const themes = ref(["Light", "Dark"]);
    const theme = computed(() => desktop.value.theme);
    const selected = ref<string[]>([]);
    const selectedApps = ref<string[]>([]);
    const isDeleteDisabled = computed(() => selected.value.length === 0);
    const isDeleteDisabledApps = computed(
      () => selectedApps.value.length === 0
    );

    const columns = ref([
      { id: "address" },
      { id: "username" },
      { id: "action" },
    ]);

    const registries = ref([
      { address: "dockerreg.somecompany.com", username: "Taras Chornyi" },
    ]);

    const columnsApps = ref([
      { id: "address" },
      { id: "rootPath" },
      { id: "action" },
    ]);

    const apps = ref([
      { address: "<a href='https://localhost:3000/creator'>/creator</a>", rootPath: "webapps/creator" },
      { address: "<a href='https://localhost:3000/ui' target='_blank'>/ui</a>", rootPath: "webapps/ui" },
    ]);

    const themeChanged = (mode: string) => {
      desktop.value.theme = mode;
      document.documentElement.className = mode === "Dark" ? "theme-dark" : "";
      store.dispatch(`settings/setDesktop`, desktop.value);
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
      if (selected.value.length === registries.value.length) {
        selected.value = [];
      } else {
        selected.value = [];
        // eslint-disable-next-line
        registries.value.forEach((r: any) => {
          selected.value.push(r.name);
        });
      }
    };

    const setAllApps = () => {
      if (selectedApps.value.length === apps.value.length) {
        selectedApps.value = [];
      } else {
        selectedApps.value = [];
        // eslint-disable-next-line
        apps.value.forEach((r: any) => {
          selectedApps.value.push(r.name);
        });
      }
    };

    const setRowApps = (name: string) => {
      const idx = selectedApps.value.findIndex((i) => i == name);
      if (idx === -1) {
        selectedApps.value.push(name);
      } else {
        selectedApps.value.splice(idx, 1);
      }
    };

    return {
      columns,
      selected,
      registries,
      isDeleteDisabled,
      setRow,
      setAll,
      setRowApps,
      setAllApps,
      lang,
      languages,
      theme,
      themes,
      themeChanged,
      columnsApps,
      apps,
      selectedApps,
      isDeleteDisabledApps,
    };
  },
});
</script>

