<template>
  <div>
    <menuitems></menuitems>
    <div class="mainCon">

        <el-col :span="24">
                <div>
                  <el-row>
                    <el-button @click="newDialogFormVisible = true" size="mini" type="primary" style="float:right">新建数据库表</el-button>
                  </el-row>
                </div>
                <el-table style="width:100%" height="100%">
                  <el-table-column prop="apiName" label="所属应用" width="120"></el-table-column>
                  <el-table-column prop="callMethod" label="表名" width="120">
                    <!-- <template slot-scope="scope">
                      <el-button type="primary" size="small" round>{{scope.row.callMethod}}</el-button>
                    </template> -->
                  </el-table-column>
                  <el-table-column prop="apiUrl" label="表说明" width="180"></el-table-column>
                  <el-table-column prop="createTime" label="记录数" width="180"></el-table-column>
                  <el-table-column prop="startState" label="类型" width="180"></el-table-column>
                  <el-table-column prop label="创建状态">
                    <template >
                      <el-tag
                        disable-transitions></el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop label="操作">
                        <template slot-scope="scope">
                          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                          <el-button type="text" size="small">编辑</el-button>
                        </template>
                  </el-table-column> 
                </el-table>

                <div class="sech">
                  <el-pagination
                    layout="total, prev, pager, next, jumper"
                  ></el-pagination>
                </div>

        </el-col>

            <el-dialog title="新增数据库表" :visible.sync="newDialogFormVisible">
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="基础配置" name="first">
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
                      <el-button type="primary" >确定</el-button>
                      <el-button @click="newDialogFormVisible = false">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="字段配置" name="second">
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

    </div>
  </div>
</template>

<script>
import { METHODS } from "http";
import {
  getById,
  getApiSaveModel,
  getTable,
  getApiModel,
  changeApi
} from "@/api/index.js";
import { connect } from "net";
import { constants } from "fs";
import menuitems from "./Formcomponents/appBar.vue";
export default {
  components: { menuitems },
    data() {
        return {
            activeName: "first",
            newDialogFormVisible: false,
            form: {
            apiParams: "",
            apiName: "",
            tableName: "",
            apiId: "TK0002",
            qijDataSource: { datasourceId: "" }
            }
        }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      }
    }
}
</script>

<style>
.mainCon{
    width: 95%;
    margin:30px 0 0 30px;
}
</style>