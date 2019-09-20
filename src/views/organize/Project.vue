<template>
  <div class="navblock">
    <!-- 职务 -->
    <el-dialog :visible.sync="diVisibleId">
      <el-form>
        <el-tree
          :props="propsId"
          :load="loadNode"
          node-key="id"
          ref="tree"
          highlight-current
          lazy
          @check="handIdEdit"
        ></el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diVisibleId = false">取 消</el-button>
        <el-button type="primary" @click="diVisibleId = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 部门 -->
    <el-dialog :visible.sync="diVisible">
      <el-form>
        <el-tree
          :props="props"
          :load="loadNode"
          node-key="id"
          ref="tree"
          highlight-current
          lazy
          show-checkbox
          @check="checkEdit"
        ></el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diVisible = false">取 消</el-button>
        <el-button type="primary" @click="diVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="navhad" style="border-bottom:1px #f0f0f0 solid;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Appindex'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>组织管理</el-breadcrumb-item>
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="90px" label-position="left" size="mini">
        <el-form-item label="用户账号">
          <el-input v-model="form.userNumber"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="form.userpsw"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.userTel"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="form.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="扩展编号">
          <el-input v-model="form.sortNumber"></el-input>
        </el-form-item>
        <el-form-item label="扩展信息">
          <el-input v-model="form.extend"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input
            :disabled="true"
            v-show="dialogForm"
            v-model="form.sroleNumber"
            style="width:300px"
          ></el-input>
          <el-button icon="el-icon-user-solid" @click="diVisible = true"></el-button>
        </el-form-item>
        <el-input
          :disabled="true"
          v-show="dialogForm"
          v-model="form.sortNumber"
          style="width:300px"
        ></el-input>
        <el-form-item label="岗位">
          <el-button icon="el-icon-user-solid" @click="diVisible = true"></el-button>
        </el-form-item>
        <el-input
          :disabled="true"
          v-show="dialogForm"
          v-model="form.stationNumber"
          style="width:300px"
        ></el-input>
        <el-form-item label="职务">
          <el-button icon="el-icon-user-solid" @click="diVisibleId = true"></el-button>
        </el-form-item>
        <el-input
          :disabled="true"
          v-show="dialogForm"
          v-model="form.jobNumberr"
          style="width:300px"
        ></el-input>
        <el-form-item label="部门">
          <el-button icon="el-icon-user-solid" @click="diVisible = true"></el-button>
          <span>{{form.deptNumber}}</span>
        </el-form-item>
        <!-- <el-form-item label="兼职部门">
          <el-button icon="el-icon-user-solid" @click="diVisible = true"></el-button>
          <el-input
            :disabled="true"
            v-show="dialogForm"
            v-model=""
            style="width:300px"
          ></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="_focusers">确定</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <div class="blockcg">
            <p class="section"></p>
            <el-tree
              :props="props"
              :load="loadNode"
              node-key="id"
              ref="tree"
              highlight-current
              lazy
              @node-click="handleCurrentEdit"
              @node-expand="handleCurrentEdit"
              @check="handleNodeEdit"
            ></el-tree>
            <!-- show-checkbox -->
          </div>
        </div>
      </el-col>
      <el-col :span="19" style="border-left:#f0f0f0 solid 2px;">
        <div class="grid-content bg-purple-light" style="margin:20px 0 0 10px;padding:0;">
          <div class="buttons">
            <el-button size="mini" type="primary" plain>导出</el-button>
            <el-button size="mini" type="primary" plain>导入</el-button>
            <el-button @click="dialogFormVisible = true" size="mini" type="primary" plain>注册用户</el-button>
            <el-button size="mini" type="primary" plain>删除用户</el-button>
          </div>
          <div style="float:right">
            <el-input width="200px" v-model="search" size="mini" placeholder="输入关键字搜索" />
          </div>
          <el-table :data="tableData" style="width: 100%" @select="deleteEdit">
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- <el-table-column prop="appId" label="主键"></el-table-column> -->
            <el-table-column prop="deptNumbe" label="部门编号"></el-table-column>
            <el-table-column prop="doubleDept" label="兼职部门编号"></el-table-column>
            <!-- <el-table-column prop="extend" label="用户扩展编号"></el-table-column> -->
            <el-table-column prop="jobNumber" label="职务"></el-table-column>
            <el-table-column prop="roleNumber" label="角色编号"></el-table-column>
            <!-- <el-table-column prop="sortNumber" label="排序字段"></el-table-column> -->
            <el-table-column prop="stationNumber" label="岗位编号"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑详情</el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="userEmai" label="用户邮箱地址"></el-table-column> -->
            <!-- <el-table-column prop="userTe" label="用户手机号"></el-table-column> -->
            <!-- <el-table-column prop="userpsw" label="用户密码"></el-table-column> -->
            <!-- <el-table-column prop="state" label="用户状态"></el-table-column> -->
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

          <el-dialog :visible.sync="dialogible">
            <el-form ref="form" :model="form" label-width="90px" label-position="left" size="mini">
              <el-form-item label="用户账号">
                <el-input v-model="form.userNumber"></el-input>
              </el-form-item>
              <el-form-item label="用户密码">
                <el-input v-model="form.userpsw"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form.userTel"></el-input>
              </el-form-item>

              <el-form-item label="邮箱">
                <el-input v-model="form.userEmail"></el-input>
              </el-form-item>
              <el-form-item label="扩展编号">
                <el-input v-model="form.sortNumber"></el-input>
              </el-form-item>
              <el-form-item label="扩展信息">
                <el-input v-model="form.extend"></el-input>
              </el-form-item>

              <el-form-item label="角色">
                <el-input
                  :disabled="true"
                  v-show="dialogForm"
                  v-model="form.sroleNumber"
                  style="width:300px"
                ></el-input>
                <el-button icon="el-icon-user-solid" @click="diVisible = true"></el-button>
              </el-form-item>
              <el-input
                :disabled="true"
                v-show="dialogForm"
                v-model="form.sortNumber"
                style="width:300px"
              ></el-input>
              <el-form-item label="岗位">
                <el-button icon="el-icon-user-solid" @click="diVisible = true"></el-button>
              </el-form-item>
              <el-input
                :disabled="true"
                v-show="dialogForm"
                v-model="form.stationNumber"
                style="width:300px"
              ></el-input>
              <el-form-item label="职务">
                <el-button icon="el-icon-user-solid" @click="diVisibleId = true"></el-button>
              </el-form-item>
              <el-input
                :disabled="true"
                v-show="dialogForm"
                v-model="form.jobNumberr"
                style="width:300px"
              ></el-input>
              <el-form-item label="兼职部门">
                <el-button icon="el-icon-user-solid" @click="diVisible = true"></el-button>
                <el-input
                  :disabled="true"
                  v-show="dialogForm"
                  v-model="form.deptNumber"
                  style="width:300px"
                ></el-input>
              </el-form-item>
              <el-form-item label="部门">
                <el-button icon="el-icon-user-solid" @click="diVisible = true"></el-button>
                <el-input
                  :disabled="true"
                  v-show="dialogForm"
                  v-model="form.deptNumber"
                  style="width:300px"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="loading" @click="urersIdType">确定</el-button>
                <el-button @click="diVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
    <!-- </el-scrollbar> -->
  </div>
</template>
<script>
import {
  focusers,
  postponeOrgDept,
  useragent,
  posturersType,
  posturersIdType,
  getOrgStationType
} from "@/api/index.js";

let id = 1000;
export default {
  data() {
    return {
      loading: false,
       propsId: {
        label: "deptName", //这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
        children: [],
        isLeaf: "leaf"
      },
      props: {
        label: "deptName", //这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
        children: [],
        isLeaf: "leaf"
      },
      diVisibleId: false,
      dialogForm: false,
      diVisible: false,
      dialogible: false,
      dialogFormVisible: false,
      scrollHeight: "0px",
      value: [],
      options: [
        [
          {
            id: 1,
            value: "jituan",
            label: "集团",
            children: [
              {
                id: 2,
                value: "zongjinban",
                label: "总经办"
              },
              {
                id: 3,
                value: "zhanlue",
                label: "战略发展部"
              },
              {
                value: "yunying",
                id: 4,
                label: "运营管理部"
              },
              {
                id: 5,
                value: "xinxi",
                label: "信息管理部",
                children: [
                  {
                    value: "xitong",
                    id: 10,
                    label: "系统管理部"
                  },
                  {
                    value: "xiangmu",
                    id: 11,
                    label: "项目管理部"
                  },
                  {
                    value: "ruanjian",
                    id: 12,
                    label: "软件研发部"
                  }
                ]
              },
              {
                value: "xinzheng",
                id: 6,
                label: "行政管理部"
              },
              {
                value: "caiwu",
                id: 7,
                label: "财务管理部"
              },
              {
                value: "qihua",
                id: 8,
                label: "企划管理部"
              },
              {
                value: "renli",
                id: 9,
                label: "人力资源部"
              }
            ]
          }
        ]
      ],
      deptNumber: "",
      search: "",
      // 分页所对应的数据
      total: 0,
      currentPage: 1,
      //   当前页码
      page: 1,
      // 每页显示的记录数
      pageSize: 6,
      tableData: [{}],

      defaultProps: {
        children: "children",
        label: "label"
      },
      appId: "",
      deptNumber: "",
      diaVisible: false,
      dialogVisible: false,
      formuname: {
        roleNumber: "",
        stationNumber: "",
        jobNumber: "",
        deptNumber: "",
        userTel: "",
        userNumber: "",
        userpsw: "",
        doubleDept: "",
        userEmail: "",
        sortNumber: "",
        extend: "",
        appId: ""
      },
      form: {
        roleNumber: "",
        stationNumber: "",
        jobNumber: "",
        deptNumber: "",
        userTel: "",
        userNumber: "",
        userpsw: "",
        doubleDept: "",
        userEmail: "",
        sortNumber: "",
        extend: ""
      }
    };
  },
  methods: {
    handIdEdit(data) {
      console.log(data);
      this.form.deptNumber = data.deptName;
    },
    checkEdit(data) {
      console.log(data);
      this.form.deptNumber = data.deptName;
    },

    // 删除
    deleteEdit(data) {
      this.appId = data.appId;
      posturersType({ appId: this.appId }).then(res => {
        if (res.data.flag === 1) {
          this.$message({ message: "删除成功", type: "success" });
        } else {
          this.$message.error("删除失败");
        }
      });
    },

    handleEdit(data, val) {
      this.dialogible = true;
      console.log(data, val, 222222);
      this.formuname.appId = val.appId;
      this.formuname.extend = val.extend;
      this.formuname.sortNumber = val.sortNumber;
      this.formuname.doubleDept = val.doubleDept;
      this.formuname.userEmail = val.userEmail;
      this.formuname.userpsw = val.userpsw;
      this.formuname.userNumber = val.userNumber;
      this.formuname.userTel = val.userTel;
      this.formuname.deptNumber = val.deptNumber;
      this.formuname.jobNumber = val.jobNumber;
      this.formuname.roleNumber = val.roleNumber;
      this.formuname.stationNumber = val.stationNumber;
    },
    // 编辑
    urersIdType() {
      this.loading = true;
      posturersIdType(this.formuname).then(res => {
        if (res.data.flag === 1) {
          this.loading = false;
          this.$message({ message: "编辑成功", type: "success" });
        } else {
          this.loading = false;
          this.$message.error("编辑失败");
        }
      });
    },
    _focusers() {
      this.loading = true;
      focusers(this.form).then(res => {
        if (res.data.flag === 1) {
          this.$message({ message: "添加成功", type: "success" });
          this.loading = false;
          this.dialogFormVisible = false;
          this.form.userTel = "";
          this.form.userNumber = "";
          this.form.userpsw = "";
          this.form.doubleDept = "";
          this.form.userEmail = "";
          this.form.sortNumber = "";
          this.form.extend = "";
          this.form.deptNumber = "";
          this.form.jobNumber = "";
          this.form.stationNumber = "";
          this.form.roleNumber = "";
        } else {
          this.$message.error("添加失败");
          this.loading = false;
        }
      });
    },
    // 异步树叶子节点懒加载逻辑
    loadNode(node, resolve) {
      setTimeout(() => {
        // console.log(node);
        if (node.level === 0) {
          this.requestTree(resolve);
        }
        // 其余节点处理
        if (node.level >= 1) {
          // 注意！把resolve传到你自己的异步中去
          this.getIndex(node, resolve);
        }
      }, 500);
    },

    // 异步加载叶子节点数据函数
    getIndex(node, resolve) {
      getOrgStationType({ stationType: this.stationType })
        .then(res => {
          // this.data = res.data.children;
          // 此处需要后台传过来一个值来判断每个节点有无子节点,实际项目中必须加上（如isRealLeaf），不传都默认为叶子节点
          res.data.children.forEach(value => {
            if (value.isRealLeaf === true) {
              value.leaf = false; //不为叶子节点
            } else {
              value.leaf = true; //为叶子节点
            }
          });
          let data = res.data.children;
          resolve(data);
        })
        .catch(error => {});
    },
    requestTree(resolve) {
      getOrgStationType({ stationType: this.stationType })
        .then(res => {
          //     this.data = res.data.children;
          // 此处需要后台传过来一个值来判断每个节点有无子节点,实际项目中必须加上（如isRealLeaf），不传都默认为叶子节点
          res.data.children.forEach(value => {
            if (value.isRealLeaf === true) {
              value.leaf = false; //不为叶子节点
            } else {
              value.leaf = true; //为叶子节点
            }
          });
          let data = res.data.children;
          resolve(data);
        })
        .catch(error => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //   树状图获取节点
    handleNodeEdit(row) {},
    handleCurrentEdit(data, node) {
      console.log(data);
      this.deptNumber = data.deptNumber;
      this.appId = data.appId;
      useragent({
        deptNumber: this.deptNumber,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        this.tableData = res.data.rows;
      });
    },
    // 异步加载叶子节点数据函数
    getIndex(node, resolve) {
      postponeOrgDept({ deptNumber: this.deptNumber })
        .then(res => {
          // this.data = res.data.children;
          // 此处需要后台传过来一个值来判断每个节点有无子节点,实际项目中必须加上（如isRealLeaf），不传都默认为叶子节点
          res.data.children.forEach(value => {
            if (value.isRealLeaf === true) {
              value.leaf = false; //不为叶子节点
            } else {
              value.leaf = true; //为叶子节点
            }
          });
          let data = res.data.children;
          resolve(data);
        })
        .catch(error => {});
    },
    requestTree(resolve) {
      postponeOrgDept({ deptNumber: this.deptNumber })
        .then(res => {
          //     this.data = res.data.children;
          // 此处需要后台传过来一个值来判断每个节点有无子节点,实际项目中必须加上（如isRealLeaf），不传都默认为叶子节点
          res.data.children.forEach(value => {
            if (value.isRealLeaf === true) {
              value.leaf = false; //不为叶子节点
            } else {
              value.leaf = true; //为叶子节点
            }
          });
          let data = res.data.children;
          resolve(data);
        })
        .catch(error => {});
    },

    // 滚动条
    load() {
      this.count += 2;
    },
    getCheckedKeys() {},
    onSubmit() {
      console.log("submit!");
    }
  },
  mounted() {
    this.scrollHeight = window.innerHeight * 0.7 + "px";
  }
};
</script>
<style>
.navhad {
  font-size: 18px;
  padding: 15px 15px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
/* .buttons {
  padding: 0px 0px 15px 0;
} */
.blockcg {
  float: left;
  width: 220px;
  padding: 0px 8px;
}
.tabgrid {
  float: right;
}
.section {
  padding: 20px 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-scrollbar {
  height: 90%;
}
.scrollbar-wrap {
  overflow-x: hidden;
}
/* .bg-purple-light {
  padding: 0px 40px 20px 10px;
} */
.sech {
  float: right;
}
</style>