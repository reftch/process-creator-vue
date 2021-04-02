<template>
  <div class="table">
    <div class="table-heading">
      <div class="table-cell">
        <p-checkbox
          v-model="allSelected"
          class="checkbox checkbox-header"
          :isPartlySelected="isPartlySelected"
           @click.stop="$emit('set-all')"
        />
      </div>
      <div
        v-for="column in columns"
        :key="column"
        class="table-cell table-header"
      >
        {{ column.id }}
      </div>
    </div>
    <div v-for="item in items" :key="item" class="table-row" >
      <div class="table-cell" @click.stop="$emit('set-row', item[columns[0].id])">
        <p-checkbox :val="item[columns[0].id]" v-model="selected" class="checkbox" />
      </div>
      <div
        v-for="column in columns"
        :key="column"
        class="table-cell"
      >
        <div v-if="column.id === 'address'"><span v-html="item[column.id]"></span></div>
        <div v-if="column.id !== 'actions' && column.id !== 'address'">{{ item[column.id] }}</div>
        <div v-if="column.id === 'action'" class="table-actions">
          <p-button class="icon-settings" @action="$emit('edit', item.name)"/>
        </div>
        <div v-if="column.id === 'actions'" class="table-actions">
          <p-button class="icon-run-application" @action="$emit('open', item.name)"/>
          <p-button class="icon-settings" @action="$emit('edit', item.name)"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    items: { type: Array },
    columns: { type: Array },
    selected: { type: Array as PropType<string[]>, default: [] },
  },
  setup(props) {
    const isPartlySelected = computed(() => props.selected.length !== 0 && props.selected.length !== props.items?.length);
    const allSelected = computed(() => props.selected.length !== 0 && props.selected.length === props.items?.length);

    return {
      allSelected,
      isPartlySelected,
    };
  },
});
</script>

