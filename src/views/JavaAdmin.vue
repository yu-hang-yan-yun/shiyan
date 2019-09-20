<template>
<div>
    <menuitems></menuitems>
    <div class="mainCon">
        <el-col :span="24">
            <el-dialog title="JAVA类管理" :visible.sync="dialogFormVisible" :fullscreen="false">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="基础配置" name="first">
                        <el-form ref="form" :model="form" label-width="100px" label-position="left" size="mini">
                            <el-form-item label="java类名称">
                                <el-input v-model="form.apiId"></el-input>
                            </el-form-item>
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
                            <el-form-item label="Bean类型">
                                <el-select v-model="form.capiName" placeholder="请选择" @change="onchange">
                                    <el-option label="base" value="get"></el-option>
                                    <el-option label="example" value="save"></el-option>
                                    <el-option label="Hello" value="update"></el-option>
                                    <el-option label="gateway" value="delete"></el-option>
                                    <el-option label="asb|ESB" value="get"></el-option>
                                    <el-option label="notice" value="save"></el-option>
                                    <el-option label="zimgr" value="update"></el-option>
                                    <el-option label="apitest" value="delete"></el-option>
                                    <el-option label="yyAPI" value="get"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="编号">
                                <el-input v-model="form.apiId"></el-input>
                            </el-form-item>
                            <el-form-item label="属性分类">
                                <el-select v-model="form.apiParamse" placeholder="请选择" @change="onchange">
                                    <el-option label="asb|ESB" value="get"></el-option>
                                    <el-option label="notice" value="save"></el-option>
                                    <el-option label="zimgr" value="update"></el-option>
                                    <el-option label="apitest" value="delete"></el-option>
                                    <el-option label="yyAPI" value="get"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <el-form-item label="类路径">
                  <el-input v-model="form.apiParams" placeholder="PS:新增不显示，新增后的详情页显示，编写代码后系统自动生成，无须用户填写"></el-input>
                </el-form-item> -->
                            <el-form-item>
                                <el-button type="primary" @click="_getApiSaveModel">确定</el-button>
                                <el-button @click="dialogFormVisible = false">取消</el-button>
                            </el-form-item>
                        </el-form>

                    </el-tab-pane>

                    <el-tab-pane label="代码内容" name="second">

                        <el-row :gutter="10">
                            <el-col :span="6">
                                <div class="codeLeft grid-content">
                                    <div class="codeLeftTitle">常用类包</div>
                                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="codeRight grid-content">
                                    <ace></ace>
                                </div>
                            </el-col>
                        </el-row>

                    </el-tab-pane>
                </el-tabs>

            </el-dialog>
            <div style="float:right">
                <el-input width="200px" v-model="search" size="mini" placeholder="输入关键字搜索" />
            </div>
            <div class="buttEdit">
                <el-button @click="dialogFormVisible = true" size="mini" round>新增</el-button>
                <el-button size="mini" round>删除</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="apiName" label="bean类型"></el-table-column>
                <el-table-column prop="callMethod" label="java名称"></el-table-column>
                <el-table-column prop="apiUrl" label="属性应用"></el-table-column>
                <el-table-column prop="createTime" label="编号"></el-table-column>
                <el-table-column prop="startState" label="类路径 "></el-table-column>
                <el-table-column prop label="属性分类"></el-table-column>
                <el-table-column prop label="状态">
                    <template scope="scope">
                        <el-switch on-text="启用" off-text="禁用" on-color="#5B7BFA" off-color="#dadde5" v-model="scope.row.menusstate" @change="handleEdit(scope.$index,scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="代码内容">
                    <template slot-scope="scope">
                        <el-button class="el-icon-edit" size="mini" @click="handle(scope.$index,scope.row)">编写代码</el-button>
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
                                <el-dropdown-item command="b" icon="el-icon-document-copy">复制</el-dropdown-item>
                                <el-dropdown-item command="c" icon="el-icon-delete">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <div class="sech">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
        </el-col>
    </div>
    <!-- </el-row>-->
</div>
</template>

<script>
import menuitems from './Formcomponents/appBar.vue';
export default {
    components: {
        menuitems
    },
    data() {
        return {
            activeIndex2: '1',
            radio: 3,
            activeName: 'second',
            piles: [],
            value1: true,
            dialogFormVisible: false,
            dialogFormVisi: false,
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
            form: {
                apiParams: '',
                apiName: '',
                tableName: '',
                apiId: '',
                qijDataSource: {
                    datasourceId: ''
                }
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
            value: '',
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
            //树形菜单
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1',
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {

        handleCommand(command) {
            console.log(command)
            this.commandEdit = command
            if (this.commandEdit === 'a') {
                this.dialogFormVisible = true
            }
            if (this.commandEdit === 'b') {
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
            if (this.commandEdit === 'c') {
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
        },
        onchange(val) {
            console.log(val)
            this.crud = val
        },
        // 状态按钮
        handle(scope, val) {
            this.$router.push({
                name: 'MonacoEditor'
            })
        },
        handleEdit(scope, val) {},
        // 标签页
        handleClick(tab, event) {
            console.log(tab, event)
        },
        _getApiSaveModel() {},
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        },
        serachUser() {},
        _getApiModel() {},

        _getById() {},

        celdchange(val) {},
        //树形菜单事件
        handleNodeClick(data) {
            console.log(data);
        }
    },
    created() {},

}
</script>

<style>
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.codeRight {
    border-left: 2px #eee solid;
    padding-left: 20px;
}

.codeLeftTitle {
    padding: 10px;
    border-bottom: #eee 1px solid;
    color: #999;
}

.sech {
    float: right;
}

.buttEdit {
    padding-left: 10px;
}

.mainCon {
    width: 95%;
    margin: 30px 0 0 30px;
}
</style>
