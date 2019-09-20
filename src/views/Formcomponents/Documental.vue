<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#56565e"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-submenu index="1-7">
            <template slot="title">
              <span>应用管理</span>
            </template>
            <el-menu-item index="/dataSource">添加数据源</el-menu-item>
            <el-menu-item index="/CreateTemplate">创建API模板</el-menu-item>
            <el-menu-item index="/JavaAdmin">Java类管理</el-menu-item>
            <el-menu-item index="/ApiAdmin">API管理</el-menu-item>
            <el-menu-item index="/diction">字典管理</el-menu-item>
            <el-menu-item index="/fileAdmin">文件管理</el-menu-item>
            <el-menu-item index="/variation">版本管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="19">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="API说明文档" name="first">
            <div class="mental">
              <h2>API名称:HelloWorld你好 V1.0</h2>
              <br />
              <el-button type="primary" size="mini">GET</el-button>
              <div></div>
              <br />
              <h2>参数输入方式</h2>
              <br />
              <el-button size="mini">键值对输入</el-button>
              <div></div>
              <br />
              <h2>输入参数定义</h2>
              <br />
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="参数ID"></el-table-column>
                <el-table-column prop="date" label="参数名"></el-table-column>
                <el-table-column prop="date" label="位置"></el-table-column>
                <el-table-column prop="date" label="类型"></el-table-column>
                <el-table-column prop="date" label="必填"></el-table-column>
                <el-table-column prop="date" label="参数实例"></el-table-column>
                <el-table-column prop="date" label="缺省值"></el-table-column>
                <el-table-column prop="name" label="中断"></el-table-column>
                <!-- <el-table-column prop="address" label="验证提示"></el-table-column> -->
                <!-- <el-table-column prop="date" label="验证参数"></el-table-column> -->
                <!-- <el-table-column prop="date" label="错误码"></el-table-column> -->
                <el-table-column prop="date" label="长度限制"></el-table-column>
              </el-table>
              <br />
              <h2>输入参数定义</h2>
              <br />
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="说明"></el-table-column>
                <el-table-column prop="date" label="输出值"></el-table-column>
              </el-table>
              <br />
              <h2>调用的calss</h2>
              <br />
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="说明"></el-table-column>
                <el-table-column prop="date" label="输出值"></el-table-column>
              </el-table>
              <br />
              <h2>绑定数据模型</h2>
              <br />
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="数据模型modeld"></el-table-column>
                <el-table-column prop="date" label="Filters过滤条件"></el-table-column>
              </el-table>
              <br />
              <h2>绑定SQL</h2>
              <br />
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="SQL配置ID"></el-table-column>
              </el-table>
              <br />
              <h2>其他属性</h2>
              <br />
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="属性名"></el-table-column>
                <el-table-column prop="date" label="配置值"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="变更日记" name="second">变更日记</el-tab-pane>
          <el-tab-pane label="依赖关系" name="third">依赖关系</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">
            <el-tabs v-model="active" @tab-click="hanClick">
              <el-tab-pane label="JSON格式" name="fir">1</el-tab-pane>
              <el-tab-pane label="YAML格式" name="sec">1</el-tab-pane>
              <el-tab-pane label="当前服务" name="thi">1</el-tab-pane>
              <el-tab-pane label="按Beanld" name="fou">1</el-tab-pane>
              <el-tab-pane label="按应用" name="ser">1</el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "fir",
      activeName: "first",
      tableData: [
        {
          date: "xxx",
          name: "小虎",
          address: "上海"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    hanClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
.mental {
  padding-left: 5px;
}
</style>