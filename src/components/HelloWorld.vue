<template>
  <div class="main">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      router
    >
      <div class="imgBox">
        <img src="../assets/ee22bb.jpg" class="logo" />
      </div>
      <el-menu-item index="/Appindex" >
        <span >主页</span>
      </el-menu-item>
      <el-menu-item index="/AppManager">
        <span >应用管理</span>
      </el-menu-item>
      <el-submenu index="1-4">
        <template slot="title">
          <i class="el-icon-s-tools" ></i>
          <span>组织管理</span>
        </template>
        <el-menu-item index="/Item">部门管理</el-menu-item>
        <el-menu-item index="/Project">人员管理</el-menu-item>
        <el-menu-item index="/Home">角色管理</el-menu-item>
        <el-menu-item index="/Register">岗位管理</el-menu-item>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>权限管理</span>
        </template>
      </el-submenu>
      <el-submenu index="1-3">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>平台设置</span>
        </template>
        <el-menu-item index="/Arguments">参数设置</el-menu-item>
        <el-menu-item index="/Origin">数据源设置</el-menu-item>
        <el-menu-item index="/Corelate">代码模板</el-menu-item>
      </el-submenu>
      <el-submenu index="1-6">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>平台监控</span>
        </template>
        <el-menu-item index="/Journal">平台日志</el-menu-item>
        <el-menu-item index="/Record">操作记录</el-menu-item>
        <el-menu-item index="/Cache">缓存管理</el-menu-item>
      </el-submenu>
    </el-menu>

    <div class="routerView">
      <img src="../assets/snipaste.png" alt @click="handleToggle" class="opop" />
      <div style="height:60px;background:#f3f3f4; ">
        <span
          style="line-height: 60px; font-size: 18px; color:#676a6c;padding-left:60px;padding-button:16px;"
        >数据交换平台</span>
        <div
          class="welcome"
          style=" line-height: 60px; font-size: 14px; float:right; padding-right:12px;"
        >
          <span style="padding-right: 14px;color:#a7b1c2;">欢迎你: {{$store.getters.getUserName}}</span>

          <a href="/#/Login" style="color:#a7b1c2;">退出</a>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
       activeIndex2: "1",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleToggle() {
      this.isCollapse = !this.isCollapse;
    },
    exitLogin() {}
  }
};
</script>
<style scoped>
.main {
  display: flex;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 100vh;
}
.imgBox {
  box-sizing: border-box;
  overflow: hidden;
}
.routerView {
  /* overflow: hidden; */
  width: 100%;
  position: relative;
  box-sizing: border-box;
}

.logo {
  width: 100%;
}


.opop {
  position: absolute;
  top: 0px;
}
</style>
