<template>
  <div class="sidebar-item-container" v-if="!item.meta || !item.meta.hidden">
    <template 
      v-if="isRenderSingleRoute && theOnlyoneChildRoute"
    >
      <sidebar-item-link v-if="theOnlyoneChildRoute.meta" :to="resolvePath(theOnlyoneChildRoute.path)">
        <el-menu-item :index="resolvePath(theOnlyoneChildRoute.path)">
          <i v-if="icon && icon.includes('el-icon')" :class="icon"></i>
          <svg-icon v-else-if="icon" class="menu-icon" :icon-class="icon"></svg-icon>
          <template #title>
            <span>{{ theOnlyoneChildRoute.meta.title }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <svg-icon
          v-if="icon"
          class="menu-icon"
          :icon-class="icon"
        ></svg-icon>
        <span class="submenu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import { RouteRecordRaw } from "vue-router";
import SidebarItemLink from "./SidebarItemLink.vue";
import path from "path";
import { isExternal } from "@/utils/validate";

export default defineComponent({
  name: "siderbarItem",
  components: {
    SidebarItemLink
  },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      require: true
    },
    basePath: {
      // 父路由路径（子路由路径如果是相对的 要基于父路径）
      type: String,
      required: true
    }
  },
  setup(props) {
    const { item } = toRefs(props);
    // 子路由数量
    const showingChildrenNumber = computed(() => {
      const children = (props.item?.children || []).filter(child => {
        if (child.meta && child.meta.hidden) return false;
        return true;
      });
      return children.length;
    });
    // 如果只有一个子路由就直接渲染这个子路由
    const theOnlyoneChildRoute = computed(() => {
      if (showingChildrenNumber.value > 1) {
        return null;
      }
      if (item.value?.children) {
        for (const child of item.value.children) {
          if (!child.meta || !child.meta.hidden) {
            return child;
          }
        }
      }
      // 无子路由
      return Object.assign({}, props.item, { path: "" ,noShowingChildren:true});
    });
    // 是否有可渲染子路由
    const noShowingChildren = computed(() => showingChildrenNumber.value === 0)
    const icon = computed(() => {
      return (
        theOnlyoneChildRoute.value?.meta?.icon ||
        (props.item?.meta && props.item.meta.icon)
      ) as string;
    });

    const resolvePath = (childPath: string) => {
      if (isExternal(childPath)) {
        return childPath
      }
      return path.resolve(props.basePath, childPath);
    };
    // 是否一直显示根路由，哪怕只有一条子路由
    const alwaysShowRootMenu = computed(
      () => props.item?.meta?.alwaysShow 
    )
    // 是否只有一条可渲染路由
    const isRenderSingleRoute = computed (() => !alwaysShowRootMenu.value && (!theOnlyoneChildRoute.value?.children || noShowingChildren))
    return {
      theOnlyoneChildRoute,
      icon,
      resolvePath,
      isRenderSingleRoute
    };
  }
});
</script>
<style lang="scss">
.sidebar-item-container {
  .menu-icon {
    margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>
