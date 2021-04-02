<template>
  <nav>
    <ul>
      <li v-for="s in sections" :key="s.id" :class="{ active: isActive(s.id) }" @click.stop="changeSection(s.id)">
        <div>
          <span :class="s.icon"></span>
          <span>{{ s.title }}</span>
        </div>
      </li>
    </ul>
  </nav>

</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, PropType } from "vue";
import { SectionState } from "@/model";
import router from "@/router";

export default defineComponent({
  props: {
    sections: { type: Array as PropType<SectionState[]> },
    path: { type: String },
  },
  setup(props) {
    const isActive = (id: string) => {
      return router.currentRoute.value.path.includes(id);
    };

    const changeSection = (id: string) => {
      if (props.sections) {
        props.sections.forEach((s: SectionState) => (s.isActive = s.id === id));
        router.push({ path: `${id}` });
      }
    };

    return {
      isActive,
      changeSection,
    };
  },
});
</script>

