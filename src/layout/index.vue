<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <div class="header">
        <div class="navbar">
          <navbar @showSetting="openSetting" />
        </div>
        <div class="tags-view">tagsview</div>
      </div>
      <!-- <Breadcrumb/> -->
      <div class="app-main">
  
        <AppMain/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "./Sidebar/index.vue";
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Breadcrumb from "@/components/Breadcrumb/index.vue";

export default defineComponent({
  components: {
    Sidebar,
    AppMain,
    Breadcrumb,
    Navbar
  },
  setup() {}
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
      // background: cyan;
      .navbar {
        height: 50px;
        // background: #1890ff;
      }
      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }
    .app-main {
      /* 50= navbar  50  如果有tagsview + 34  */
      min-height: calc(100vh - 84px);
      // background: red;
    }
  }
}
</style>
