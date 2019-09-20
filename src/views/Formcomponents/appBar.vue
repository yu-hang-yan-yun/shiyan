
<template>
  <div>
  <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#99a9bf"
      text-color="#fff"
      active-text-color="#409EFF"
      router>
      <el-menu-item index="/DataSource">应用详情</el-menu-item>
       <el-menu-item index="/DatabaseTable">数据库表管理</el-menu-item>
      <el-menu-item index="/CreateTemplate">数据建模</el-menu-item>
      <el-menu-item index="/JavaAdmin">Java类管理</el-menu-item>
      <el-menu-item index="/ApiAdmin">API管理</el-menu-item>
      <el-menu-item index="/diction">字典管理</el-menu-item>
      <el-menu-item index="/fileAdmin">文件管理</el-menu-item>
      <el-menu-item index="/variation">版本管理</el-menu-item>
      <el-menu-item index="/DataSet/tableProperties">表格基本属性</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'menuitems',
  data () {
    return {
      activeIndex2: '1'
    }
  }
}
</script>

<style>

</style>
