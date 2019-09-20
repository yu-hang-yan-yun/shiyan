<template>
  <div class>
    <menuitems></menuitems>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">
            <router-link to="/dataSet/tableProperties">表格属性</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/dataSet/jsScript">JS脚本</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/dataSet/headerConfiguration">表头配置</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/dataSet/Button">按钮配置</router-link>
          </el-menu-item>
        </el-menu>
      </div>
    </el-col>

    <router-view />
  </div>
</template>
<script>
import menuitems from './Formcomponents/appBar.vue';
export default {
  components: {
    menuitems
  }
}
</script>
<style>
</style>
