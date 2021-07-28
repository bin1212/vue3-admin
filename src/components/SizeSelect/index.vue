<template> </template>

<script lang="ts">
import { Size } from "@/plugins/element";
import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  ref
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    const size = computed(() => store.getters.size);
    const sizeOptions = ref([
      { label: "Default", value: "default" },
      { label: "Medium", value: "medium" },
      { label: "Small", value: "small" },
      { label: "Mini", value: "mini" }
    ]);
    const refreshView = () => {
      const { fullPath } = route;
      nextTick(() => {
        router.replace({
          path: '/redirect' + fullPath
        })
      })
    };
    
    const handleSize = (command: Size) => {
      (proxy as ComponentPublicInstance).$ELEMENT.size = command
    }
  }
});
</script>

<style lang="scss" scoped></style>
