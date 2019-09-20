
<template>
  <div>
    <!-- <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#99a9bf"
      text-color="#fff"
      active-text-color="#409EFF"
      router>
      <el-menu-item index="/DataSource">应用详情</el-menu-item>
      <el-menu-item index="/CreateTemplate">数据建模</el-menu-item>
      <el-menu-item index="/JavaAdmin">Java类管理</el-menu-item>
      <el-menu-item index="/ApiAdmin">API管理</el-menu-item>
      <el-menu-item index="/diction">字典管理</el-menu-item>
      <el-menu-item index="/fileAdmin">文件管理</el-menu-item>
      <el-menu-item index="/variation">版本管理</el-menu-item>
    </el-menu> -->
    <menuitems></menuitems>
    <div class="mainCon">
        <el-col :span="24">

          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >

            <el-tab-pane label="数据接口" name="first">
                <div>
                  <el-row>
                    <el-button @click="dialogFormVisible = true" size="mini" type="primary" style="float:right">创建接口模板</el-button>
                  </el-row>
                </div>
                <el-table :data="tableData" style="width:100%" height="100%">
                  <el-table-column prop="apiName" label="所属应用" width="120"></el-table-column>
                  <el-table-column prop="callMethod" label="配置编号" width="120">
                    <!-- <template slot-scope="scope">
                      <el-button type="primary" size="small" round>{{scope.row.callMethod}}</el-button>
                    </template> -->
                  </el-table-column>
                  <el-table-column prop="apiUrl" label="数据源" width="180"></el-table-column>
                  <el-table-column prop="createTime" label="表名" width="180"></el-table-column>
                  <el-table-column prop="startState" label="关联事件" width="180"></el-table-column>
                  <el-table-column prop label="状态">
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.tag === '家' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.tag}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                  </el-table-column>  
                  
                </el-table>
                 <div class="sech">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total"
                  ></el-pagination>
                </div>
            </el-tab-pane>

            <el-tab-pane label="脚本" name="third">
                <div>
                  <el-row>
                    <el-button @click="scriDialogFormVisible = true" size="mini" type="primary" style="float:right">新建脚本</el-button>
                  </el-row>
                </div>
                <el-table :data="tableData" style="width:100%" height="100%">
                  <el-table-column prop="apiName" label="所属应用" width="120"></el-table-column>
                  <el-table-column prop="callMethod" label="配置编号" width="120">
                    <!-- <template slot-scope="scope">
                      <el-button type="primary" size="small" round>{{scope.row.callMethod}}</el-button>
                    </template> -->
                  </el-table-column>
                  <el-table-column prop="apiUrl" label="配置名称" width="180"></el-table-column>
                  <el-table-column prop label="状态">
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.tag === '家' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.tag}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                  </el-table-column>  
                  
                </el-table>
                 <div class="sech">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total"
                  ></el-pagination>
                </div>
            </el-tab-pane>
          </el-tabs>

          <el-dialog title="新增脚本" :visible.sync="scriDialogFormVisible" fullscreen="false">
              <el-form ref="form" :model="form" label-width="100px">
                  <el-form-item label="所属应用">
                    <el-select v-model="form.region" placeholder="请选择应用">
                      <el-option label="应用一" value="应用一"></el-option>
                      <el-option label="应用二" value="应用二"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="配置编号">
                    <el-input v-model="form.apiName"></el-input>
                  </el-form-item>
                  <el-form-item label="配置名称">
                    <el-input v-model="form.apiName"></el-input>
                  </el-form-item>
                  <el-form-item label="脚本">
                    <ace></ace>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="_getApiSaveModel">确定</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                  </el-form-item>
                </el-form>
          </el-dialog>

          <el-dialog title="新增数据库表" :visible.sync="newDialogFormVisible">
              <el-form ref="form" :model="form" label-width="100px">
                  <el-form-item label="所属应用">
                    <el-select v-model="form.region" placeholder="请选择应用">
                      <el-option label="应用一" value="应用一"></el-option>
                      <el-option label="应用二" value="应用二"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数据表名">
                     <el-input v-model="form.apiName" ></el-input>
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-select v-model="form.region" placeholder="选择类型">
                      <el-option label="表" value="表"></el-option>
                      <el-option label="视图" value="视图"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- <el-form-item label="创建状态">
                    <el-input v-model="form.apiName" disabled></el-input>
                  </el-form-item> -->
                  <el-form-item label="表说明">
                    <el-input v-model="form.apiName" ></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="_getApiSaveModel">确定</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                  </el-form-item>
                </el-form>
          </el-dialog>

          <el-dialog title="新增接口" :visible.sync="dialogFormVisible">
            
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="基础配置" name="first">
                  
                  <el-form ref="form" :model="form" label-width="100px">
                  <el-form-item label="所属应用">
                    <el-select v-model="form.region" placeholder="请选择应用">
                      <el-option label="应用一" value="应用一"></el-option>
                      <el-option label="应用二" value="应用二"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="配置编号">
                    <el-input v-model="form.apiName"></el-input>
                  </el-form-item>
                  <el-form-item label="数据源">
                    <el-select v-model="form.region" placeholder="默认数据源">
                      <el-option label="MySQL" value="MySQL"></el-option>
                      <el-option label="MSSQL" value="MSSQL"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数据表名">
                    <el-select v-model="form.region" placeholder="选择表名">
                      <el-option label="MySQL" value="MySQL"></el-option>
                      <el-option label="MSSQL" value="MSSQL"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="关联事件">
                    <el-select v-model="form.region" placeholder="选择事件">
                      <el-option label="事件1" value="事件1"></el-option>
                      <el-option label="事件2" value="事件2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数据权限">
                    <el-button icon="el-icon-user-solid" @click="diVisible = true"></el-button>
                  </el-form-item>
                  <el-form-item label="排序字段">
                    <el-select v-model="form.region" placeholder="选择字段">
                      <el-option label="字段一" value="字段一"></el-option>
                      <el-option label="字段一" value="字段一"></el-option>
                    </el-select>
                    <el-radio-group >
                      <el-radio label="desc"></el-radio>
                      <el-radio label="允许多个字段排序"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-radio v-model="radio" label="1">启用</el-radio>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="_getApiSaveModel">确定</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                  </el-form-item>
                </el-form>

              </el-tab-pane>

              <el-tab-pane label="数据接口列定义" name="second">
                  <el-button @click="_getApiSaveModel" size="mini">新增列</el-button>
                  <el-button @click="_getApiSaveModel" size="mini">删除选中字段</el-button>
                  <el-button @click="_getApiSaveModel" size="mini">从sql表中载入</el-button>
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      label="字段名"
                      width="120">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="别名"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="说明"
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="备注"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
              </el-tab-pane>
            </el-tabs>

          </el-dialog>
          
         
            </el-col>
    </div>
    <!-- </el-row> -->
  </div>
</template>

<script>
import { METHODS } from "http";
import {
getdatainter
} from "@/api/index.js";
import { connect } from "net";
import { constants } from "fs";
import menuitems from "./Formcomponents/appBar.vue";
export default {
  components: { menuitems },
  data() {
    return {
      radio: '1',
      activeIndex2: '1',
      activeName: "second",
      piles: [],
      scriDialogFormVisible: false,
      dialogFormVisible: false,
      dialogFormVisi: false,
      newDialogFormVisible: false,
      newDialogFormVisi: false,
      // 用户搜索关键字
      input: "",
      tableData: [
      ],
      form: {
        apiParams: "",
        apiName: "",
        tableName: "",
        apiId: "TK0002",
        qijDataSource: { datasourceId: "" }
      },
      crud: "",
      daceld: "",
      // 分页所对应的数据
      total: 0,
      currentPage: 1,
      //   当前页码
      page: 1,
      // 每页显示的记录数
      pageSize: 6,

      value: "",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
        code: "",
        value: "",
        codename: "",
        valuename: "",
        vuename: ""
      },
      value: true,
      activeName: 'first'
    };
  },
  methods: {
   
    onchange(val) {
      console.log(val);
      this.crud = val;
    },
    // 状态按钮
    handleEdit(scope, val) {
      console.log(val);
      this.form.apiId = val.apiId;
      this.form.startState = val.startState;
      changeApi({
        startState: this.form.startState,
        apiId: this.form.apiId
      }).then(res => {});
    },
    // 标签页
    handleClick(tab, event) {
      console.log(tab, event);
    },
    _getApiSaveModel() {
      getApiSaveModel(this.form, this.crud)
        .then(res => {
          if (res.flag === 1) {
          } else {
            this._getApiModel();
            diaVisibe = !true;
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success"
            });
          }
        })
        .catch(e => {
          console.log(this.form);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this._getApiModel();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this._getApiModel();
    },
    // 详情面板
    _getdatainter() {
      getdatainter({
        page: this.page,
        pageSize: this.pageSize
      })
        .then(res => {
          // this.tableData = res.data.rows;
          // this.pageSize = res.data.pageSize;
          // this.page = res.data.page;
          // this.searchStr = res.data.searchStr;
          // this.total = res.data.total;
        })
        .catch(e => {});
    },

    _getById() {
      getById()
        .then(res => {
          // this.tableData = res.data.rows;
          this.piles = res.data.rows;
        })
        .catch(e => {
          console.log(22);
        });
    },

    celdchange(val) {
      this.form.qijDataSource.datasourceId = val;
      console.log(val);
      getTable(this.form.qijDataSource).then(res => {
        console.log(res.data);
        this.piles = res.data;
      });
    }
  },
  created() {
    this._getdatainter();
  },
  handleClick(tab, event) {
        console.log(tab, event);
      },
};
</script>

<style>
.sech {
  float: right;
}
.mainCon{
    width: 95%;
    margin:30px 0 0 30px;
}
</style>
