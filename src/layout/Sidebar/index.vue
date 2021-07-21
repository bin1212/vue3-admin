<template>
  <div>
    <!-- <h2 @click="isCollapse = !isCollapse">展开测试</h2> -->
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <sidebar-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useRoute, RouteRecordRaw } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
import variables from "@/styles/variables.scss";
import { routes } from "@/router";
import { useStore } from "@/store";

export default defineComponent({
  name: "Sidebar",
  components: {
    SidebarItem
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const activeMenu = computed(() => {
      const { path, meta } = route;
      if(meta.activeMenu){
        return meta.activeMenu
      }
      return path;
    });
    const scssVariables = computed(() => variables);
    // const isCollapse = ref(true);
    const isCollapse = computed(() => !store.getters.sidebar.opened)
    
    const menuRoutes = computed(() => routes as unknown[] as RouteRecordRaw[]);
    return {
      scssVariables,
      activeMenu,
      isCollapse,
      menuRoutes
    };
  }
});
</script>
<style lang="scss"></style>
