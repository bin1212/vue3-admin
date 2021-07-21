<template>
  <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in levelList"
      :key="item.path"
    >
    <!-- 面包屑导航最后一个是不可点击的 因为最后一个正是当前所显示的路由 -->
      <span
          v-if="index == levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="clickBreadcrumb(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter, RouteLocationMatched, RouteLocationRaw } from 'vue-router'
import {compile} from 'path-to-regexp'
type PartialRouteLocationMatched = Partial<RouteLocationMatched>
export default defineComponent({
  name:'Breadcrumb',
  setup() {
    let whiteRoute:string[] = ['Dashboard']
    const route = useRoute();
    const router = useRouter();
    const levelList = ref<Array<PartialRouteLocationMatched>>([])
    // 白名单路由不需要面包屑
    const notNeedBreadcrumb = (route: PartialRouteLocationMatched) => {
      const name = route?.name;
      if (!name) return false;
      whiteRoute = whiteRoute.map((item:string) => item.toLocaleLowerCase())
      return whiteRoute.includes((name as string).trim().toLocaleLowerCase())
    } 
    // 获取面包屑导航
    const getBreadCrumb = () => {
      let matched = route.matched.filter(item => item.meta?.title) as PartialRouteLocationMatched[]
      levelList.value = matched.filter(item => item.meta?.title && item.meta?.breadcrumb !== false)
    }
    onBeforeMount(() => {
      getBreadCrumb()
    })
    watch(()=>route.path, ()=>{
      getBreadCrumb()
    })
    const pathCompile = (path: string) => {
      const toPath = compile(path)
      const params = route.params
      return toPath(params)
    }
    const clickBreadcrumb = (route: RouteLocationMatched) => {
      const {path, redirect} = route
      if (redirect) {
        router.push(redirect as RouteLocationRaw)
        return
      }
      router.push(pathCompile(path))
    }
    return {
      levelList,
      clickBreadcrumb
    }
  },
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  /* float: left; */
  line-height: 50px;
  font-size: 14px;
  margin-left: 8px;
}

.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>

<style lang="scss">

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}

.breadcrumb-move {
  transition: all .5s;
}
</style>