<template>
<div>
    <menuitems></menuitems>
    <el-dialog :visible.sync="diaVisi">
        <el-switch v-model="value1" active-text="所有应用权限" inactive-text="当前权限"></el-switch>
        <el-table :data="gridData" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column property="date" label="权限名称" sortable></el-table-column>
            <el-table-column property="name" label="权限ID" sortable></el-table-column>
            <el-table-column property="date" label="备注" sortable></el-table-column>
            <el-table-column property="name" label="应用" sortable></el-table-column>
            <el-table-column property="address" label="操作" sortable></el-table-column>
        </el-table>
    </el-dialog>

    <div class="mainCon">
        <el-col :span="24">
            <!-- <div class="navhad"></div> -->
            <el-dialog title="新增API" :visible.sync="dialogFormVisible">
                <el-form ref="form" :model="form" label-width="100px" label-position="left" size="mini">
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
                    <el-form-item label="分类">
                        <el-select v-model="form.crud" placeholder="请选择" @change="onchange">
                            <el-option label="base" value="get"></el-option>
                            <el-option label="exampl" value="save"></el-option>
                            <el-option label="Hell" value="update"></el-option>
                            <el-option label="gatewa" value="delete"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="API编号">
                        <el-input v-model="form.apiParams"></el-input>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input v-model="form.apiParams"></el-input>
                    </el-form-item>
                    <el-form-item label="请求类型">
                        <el-select v-model="form.crud" placeholder="请选择" @change="onchange">
                            <el-option label="base" value="get"></el-option>
                            <el-option label="exampl" value="save"></el-option>
                            <el-option label="Hell" value="update"></el-option>
                            <el-option label="gatewa" value="delete"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="URL">
                        <el-input v-model="form.apiParams"></el-input>
                    </el-form-item>
                    <el-form-item label="关联数据建模">
                        <el-select v-model="form.crud" placeholder="请选择" @change="onchange">
                            <el-option label="base" value="get"></el-option>
                            <el-option label="exampl" value="save"></el-option>
                            <el-option label="Hell" value="update"></el-option>
                            <el-option label="gatewa" value="delete"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="条件定义">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="权限">
                        <el-button icon="el-icon-user-solid"></el-button>

                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="_getApiSaveModel">确定</el-button>
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <div style="float:right">
                <el-input width="200px" v-model="search" size="mini" placeholder="输入关键字搜索" />
            </div>
            <div class="buttEdit">
                <el-button @click="dialogFormVisible = true" size="mini" round>新增</el-button>
                <!-- <el-button size="mini" round>删除</el-button> -->
            </div>
            <el-table :data="tableData" style="width: 100%">

                <el-table-column type="selection" width="55"></el-table-column>
                <!-- </el-table>
                    </el-tab-pane>
                  </el-tabs>
                </el-form>
          </template>-->
                <!-- </el-table-column> -->
                <el-table-column prop="apiName" label="所属应用"></el-table-column>
                <el-table-column prop="callMethod" label="Api编号"></el-table-column>
                <el-table-column prop="apiUrl" label="名称"></el-table-column>
                <el-table-column prop="apiUrl" label="关联数据建模"></el-table-column>
                <el-table-column prop="apiUrl" label="条件定义"></el-table-column>
                <el-table-column prop="apiUrl" label="权限"></el-table-column>
                <el-table-column prop="createTime" label="分类"></el-table-column>
                <el-table-column prop="startState" label="请求类型 "></el-table-column>
                <el-table-column prop label="URL"></el-table-column>
                <el-table-column prop label="状态">
                    <template scope="scope">
                        <el-switch on-text="启用" off-text="禁用" on-color="#5B7BFA" off-color="#dadde5" v-model="scope.row.menusstate" @change="handleEdit(scope.$index,scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="sex">
                    <template v-slot="scope">
                        <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                操作
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a" icon="el-icon-plus">修改</el-dropdown-item>
                                <!-- <el-dropdown-item command="b" icon="el-icon-document">文档</el-dropdown-item> -->
                                <!-- <el-dropdown-item command="c" icon="el-icon-document-copy">复制</el-dropdown-item> -->
                                <el-dropdown-item command="d" icon="el-icon-delete">删除</el-dropdown-item>
                                <!-- <el-dropdown-item command="e" icon="el-icon-setting">权限</el-dropdown-item> -->
                                <!-- <el-dropdown-item command="f" icon="el-icon-check">发布</el-dropdown-item> -->
                                <!-- <el-dropdown-item command="g" icon="el-icon-share">测试</el-dropdown-item> -->
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改API" :visible.sync="diaVisible">
                <el-form ref="form" :model="form" label-width="200px" label-position="left" size="mini">
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
                    <el-form-item label="分类">
                        <el-select v-model="form.crud" placeholder="请选择" @change="onchange">
                            <el-option label="base" value="get"></el-option>
                            <el-option label="exampl" value="save"></el-option>
                            <el-option label="Hell" value="update"></el-option>
                            <el-option label="gatewa" value="delete"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="API编号">
                        <el-input v-model="form.apiParams"></el-input>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input v-model="form.apiParams"></el-input>
                    </el-form-item>
                    <el-form-item label="请求类型">
                        <el-select v-model="form.crud" placeholder="请选择" @change="onchange">
                            <el-option label="base" value="get"></el-option>
                            <el-option label="exampl" value="save"></el-option>
                            <el-option label="Hell" value="update"></el-option>
                            <el-option label="gatewa" value="delete"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="URL">
                        <el-input v-model="form.apiParams"></el-input>
                    </el-form-item>
                    <el-form-item label="关联数据建模">
                        <el-select v-model="form.crud" placeholder="请选择" @change="onchange">
                            <el-option label="base" value="get"></el-option>
                            <el-option label="exampl" value="save"></el-option>
                            <el-option label="Hell" value="update"></el-option>
                            <el-option label="gatewa" value="delete"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="条件定义">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="权限">
                        <el-button icon="el-icon-user-solid"></el-button>

                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="_getApiSaveModel">确定</el-button>
                        <el-button @click="diaVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!-- 发布 -->
            <!-- <el-dialog :visible.sync="dialogIssueVisible">
          <el-form :model="form" label-width="200px" label-position="left" size="mini">
            <el-form-item label="API名词">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="URL">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="发布应用">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="发布选项">
              <el-radio v-model="radio" label="1">发布本应用的所有API</el-radio>
            </el-form-item>
            <el-form-item label="可见范围">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="超级管理员" value="shanghai"></el-option>
                <el-option label="测试角色" value="beijing"></el-option>
                <el-option label="开发角色" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input v-model="  textarea" type="textarea" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>-->
            <div class="sech">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
        </el-col>
    </div>
    <!-- </el-row> -->
</div>
</template>

<script>
import {
    postapimodeld
} from "@/api/index.js";
import menuitems from './Formcomponents/appBar.vue'
export default {
    components: {
        menuitems
    },
    data() {
        return {
            activeIndex2: '1',
            textarea: '',
            radio: 3,
            activeName: 'second',
            piles: [],
            value1: true,
            dialogIssueVisible: false,
            dialogFormVisible: false,
            dialogFormVisi: false,
            diaVisible: false,
            diaVisi: false,
            // 用户搜索关键字
            input: '',
            tableData: [{
                apiName: '555',
                apiUrl: '5577',
                callMethod: '555',
                createTime: '5500',
                startState: '555558'
            }],
            tableData1: [{
                apiName: '555',
                apiUrl: '5577',
                callMethod: '555',
                createTime: '5500',
                startState: '555558'
            }],
            gridData: [{
                date: '20',
                name: '王小虎',
                address: '上海市'
            }],
            form: {
                apiParams: '',
                apiName: '',
                tableName: '',
                apiId: '',
                datasourceId: ''
            },
            daceld: '',
            // 分页所对应的数据
            total: 0,
            currentPage: 1,
            //   当前页码
            page: 1,
            // 每页显示的记录数
            pageSize: 6,
            // 用户搜索关键字
            search: '',
            formLabelAlign: {
                name: '',
                region: '',
                type: '',
                code: '',
                value: '',
                codename: '',
                valuename: '',
                vuename: ''
            },
            value: true,
            commandEdit: ''
        }
    },
    methods: {
        _postapimodeld() {
            postapimodeld({
                pageSize: this.pageSize,
                page: this.page
            }).then(res => {
                
            })
        },
        handleCommand(command) {
            console.log(command)
            this.commandEdit = command
            if (this.commandEdit === 'a') {
                this.diaVisible = true
            }
            if (this.commandEdit === 'b') {
                this.$router.push({
                    name: 'Documental'
                })
            }
            if (this.commandEdit === 'c') {
                this.$confirm('复制该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '复制成功!'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
            }
            if (this.commandEdit === 'd') {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            }
            if (this.commandEdit === 'e') {
                this.diaVisi = true
            }
            if (this.commandEdit === 'f') {
                this.dialogIssueVisible = true
            }
            if (this.commandEdit === 'g') {
                this.$router.push({
                    name: 'Measurement'
                })
            }
        },
        onchange(val) {
            console.log(val)
        },
        formatter(row, column) {
            return row.address
        },
        handleEdit(scope, val) {},
        _getApiSaveModel() {},
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        },
    },
    created() {
        this._postapimodeld()
    }
}
</script>

<style>
.mainCon {
    width: 95%;
    margin: 30px 0 0 30px;
}

.sech {
    float: right;
}

.buttEdit {
    padding-left: 10px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}
</style>
