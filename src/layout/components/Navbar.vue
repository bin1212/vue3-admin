<template>
  <div class="navbar">
    <hambuger @toggleClick="toggleSidebar" :is-active="sidebar.opened"/>
    <breadcrumb/>
    <div class="right-menu">
      <screen-full id="screefull" class="right-menu-item hover-effect"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hambuger from '@/components/Hambuger/index.vue'
import { useStore } from '@/store/index'
import ScreenFull from '@/components/Screenfull/index.vue'

export default defineComponent({
  name:'navbar',
  components:{
    Breadcrumb,
    Hambuger,
    ScreenFull
  },
  setup() {
    const store = useStore()
    const toggleSidebar = () => {
      store.dispatch('app/toggleSidebar')
    }
    const sidebar = computed(() => store.getters.sidebar)
    return {
      toggleSidebar,
      sidebar
    }
  },
})
</script>
<style lang="scss" scoped>
  .navbar {
    display: flex;
    .right-menu {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 15px;
    }
    #screefull{
      cursor: pointer;
    }
  }
</style>
