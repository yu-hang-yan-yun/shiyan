<template>
  <div>
    <el-row>
      <!-- <el-menu
        router
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#99a9bf"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/DataSource">应用详情</el-menu-item>
        <el-menu-item index="/CreateTemplate">数据建模</el-menu-item>
        <el-menu-item index="/JavaAdmin">Java类管理</el-menu-item>
        <el-menu-item index="/ApiAdmin">API管理</el-menu-item>
        <el-menu-item index="/diction">字典管理</el-menu-item>
        <el-menu-item index="/fileAdmin">文件管理</el-menu-item>
        <el-menu-item index="/variation">版本管理</el-menu-item>
      </el-menu>-->
      <menuitems></menuitems>

      <el-dialog title="配置字典" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="所属应用" :label-width="formLabelWidth">
            <el-select v-model="form.crud" placeholder="请选择">
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
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="值" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" placeholder="PS：只允许输入整数"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- <el-col :span="5">
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
      </el-col>-->
      <div class="mainCon">
        <el-col :span="24">
          <el-row>
            <el-button size="mini" @click="dialogFormVisible = true" plain>添加</el-button>
            <el-button size="mini" plain>导出</el-button>
            <el-button size="mini" plain>删除</el-button>
          </el-row>
          <div style="float:right">
            <el-input width="200px" v-model="search" size="mini" placeholder="输入关键字搜索" />
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="名称"></el-table-column>
            <el-table-column prop="name" label="所属应用"></el-table-column>
            <el-table-column prop="address" label="值"></el-table-column>
            <el-table-column prop="address" label="状态"></el-table-column>
            <el-table-column prop="address" label="备注"></el-table-column>
          </el-table>
        </el-col>
        <div class="block" style="float:right;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import menuitems from './Formcomponents/appBar.vue';
export default {
  components: { menuitems },
  data () {
    return {
      pageSize: 6,
      // 分页所对应的数据
      total: 0,
      currentPage: 1,
      //   当前页码
      page: 1,
      // 每页显示的记录数
      activeIndex2: '1',
      dialogFormVisible: false,
      search: '',
      tableData: [
        {
          date: '2016',
          name: '王小虎',
          address: '上海市'
        }
      ],
      form: {
        name: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style>
.mainCon {
  width: 95%;
  margin: 30px 0 0 30px;
}
</style>
