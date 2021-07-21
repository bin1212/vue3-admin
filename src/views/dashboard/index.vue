<template>
  <div>
    <h1>Dashboard page</h1>
    缓存测试<input type="text"/>
    <svg-icon icon-class="bug"></svg-icon>
    <svg-icon icon-class="404" @click="sayHi"></svg-icon>
  </div>
</template>

<script>

import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  name: "Dashboard",
  setup() {
    const { proxy } = getCurrentInstance()
    const sayHi = () => {
      console.log("hi svg");
      proxy.$message.success('gongxi')
    };
    return {
      sayHi
    };
  }
});
</script>
<style lang="scss"></style>
