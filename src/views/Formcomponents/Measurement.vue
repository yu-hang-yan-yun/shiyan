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
        <el-form ref="form" :model="form" label-width="150px" label-position="left" size="mini">
          <el-form-item label="所属应用">
            <el-select v-model="form.crud" placeholder="请选择" @change="onchange">
              <el-option label="base|公共应用" value="get"></el-option>
              <el-option label="example|开发实例" value="save"></el-option>
              <el-option label="Hello|API网关" value="update"></el-option>
              <el-option label="gateway|服务注册与发现" value="delete"></el-option>
              <el-option label="asb|ESB服务编排平台" value="get"></el-option>
              <el-option label="notice|新闻通知" value="save"></el-option>
              <el-option label="zimgr|专家管理" value="update"></el-option>
              <el-option label="apitest|API测试平台" value="delete"></el-option>
              <el-option label="yyAPI|用友接口API" value="get"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="测试说明">
            <el-input v-model="form.apiId"></el-input>
          </el-form-item>
          <el-form-item label="测试的服务地址">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-select v-model="form.api" slot="prepend" placeholder="请选择">
                <el-option label="Post" value="1"></el-option>
                <el-option label="Get" value="2"></el-option>
                <!-- <el-option label="用户电话" value="3"></el-option>
                  <el-option label="用户电话" value=""></el-option> -->
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="测试用户或Token">
            <el-input v-model="form.apiParams"></el-input>
          </el-form-item>
          <el-form-item label="调试">
           <el-radio-group v-model="radio">
              <el-radio :label="3">调试（支队本系统的服务有效）</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="接口需要认证">
          <el-radio-group v-model="radio">
              <el-radio :label="3">是</el-radio>
               <el-radio :label="6">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Request Header">
            <el-input v-model="form.apiParams"></el-input>
          </el-form-item>
          <el-form-item label="参数类型">
          <el-radio-group v-model="radio">
              <el-radio :label="3">键值对</el-radio>
               <el-radio :label="6">RequestBody请求</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="已有测试用例">
            <el-input v-model="form.apiParams"></el-input>
          </el-form-item>
          <el-form-item label="绑定输出视图">
            <el-select v-model="form.apims" slot="prepend" placeholder="请选择">
                <el-option label="Nod found" value="1"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="输入参数">
            <el-input v-model="form.apiParams"></el-input>
          </el-form-item>
          <el-form-item label="Request Url">
            <el-input v-model="form.apiParams" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="Response Headers">
            <el-input v-model="form.apiParams" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="Response Body">
            <el-input v-model="form.apiParams" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">测试</el-button>
            <el-button>保存</el-button>
            <el-button>关闭</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input3: "",
      select: "",
      form: {
          apims:"",
          api:"",
        apiParams: "",
        apiName: "",
        tableName: "",
        apiId: "",
        datasourceId: ""
      }
    };
  }
};
</script>
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>