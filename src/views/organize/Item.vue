<template>
  <div class="navblock">
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
        <el-breadcrumb-item :to="{ path: '/Appindex' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>组织管理</el-breadcrumb-item>
        <el-breadcrumb-item>部门管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="120px" label-position="left" size="mini">
        <el-form-item label="部门类型">
          <el-select v-model="form.deptType" placeholder="请选择">
            <el-option label="集团" value="集团"></el-option>
            <el-option label="公司" value="公司"></el-option>
            <el-option label="部门" value="部门"></el-option>
            <el-option label="科室/小组" value="科室/小江"></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="状态">
          <el-input placeholder v-model="form.state"></el-input>
        </el-form-item>-->
        <el-form-item label="部门唯一ID">
          <el-input v-model="form.deptNumber"></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="form.deptName"></el-input>
        </el-form-item>
        <el-form-item label="排序字段" v-model="form.sortNumber">
          <el-cascader
            :options="optionsas"
            :props="{ multiple: true, checkStrictly: true }"
            clearable
          ></el-cascader>
          <el-checkbox v-model="checked">decs</el-checkbox>
        </el-form-item>
        <el-form-item label="上级部门">
          <el-button icon="el-icon-user-solid" @click="checkEditId"></el-button>
          <span>{{form.superDept}}</span>
          <!-- <el-cascader
            :options="options"
            :show-all-levels="false"
            @change="hanChangeclick"
            clearable
          ></el-cascader>-->
        </el-form-item>
        <el-form-item label="本部门管理员">
          <el-button icon="el-icon-user-solid" @click="AdminSubmit"></el-button>
          <span>{{formAspect.adminNumber}}</span>
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-button icon="el-icon-user-solid" @click="passSubmit"></el-button>
          <span>{{formData.chargeNumber}}</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="_postageOrgDept">确定</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <div class="block">
            <p class="section"></p>
            <el-tree
              :props="props"
              :load="loadNode"
              node-key="id"
              ref="tree"
              highlight-current
              lazy
              show-checkbox
              @node-click="handleCurrentEdit"
              @node-expand="handleCurrentEdit"
              @check="handleNodeEdit"
            ></el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="19" style="border-left:#f0f0f0 solid 2px;">
        <div class="grid-content bg-purple-light" style="margin:20px 0 0 20px;padding:0;">
          <div class="buttons" style="margin:20px 0 20px 0;padding:0;">
            <!-- <el-button size="mini" v-show="diaAdminVisible" @click="redactEdit" type="primary" plain>刷新</el-button> -->
            <el-button size="mini" v-show="diaVisible" @click="redactAdmin" type="primary" plain>保存</el-button>
            <!-- <el-button size="mini" @click="ExportData">导出</el-button> -->
            <el-button size="mini" type="primary" plain>导出</el-button>
            <el-button size="mini" type="primary" plain>导入</el-button>
            <el-button size="mini" @click="redact" type="primary" plain>编辑</el-button>
            <el-button
              v-show="diaAdminVisible"
              @click="_outnumberOrgDept"
              size="mini"
              type="primary"
              plain
            >添加</el-button>
            <el-button size="mini" @click="_postDeleteOrgDept" type="primary" plain>删除</el-button>
          </div>
          <el-form
            ref="formAdmin"
            :model="formAdmin"
            label-width="120px"
            label-position="left"
            size="mini"
          >
            <el-form-item label="部门名称">
              <el-input v-bind:disabled="form.id!=0" v-model="formAdmin.deptName"></el-input>
            </el-form-item>
            <el-form-item label="部门编号">
              <el-input :disabled="true" v-model="formAdmin.deptNumber"></el-input>
            </el-form-item>
            <el-form-item label="部门类型">
              <el-select
                v-model="formAdmin.deptType"
                v-bind:disabled="form.id!=0"
                placeholder="请选择"
              >
                <el-option label="公司" value="jituan"></el-option>
                <el-option label="部门" value="bumen"></el-option>
                <el-option label="科室/小组" value="科室/小组"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="状态">
                  <el-input v-bind:disabled="form.id!=0" v-model="formAdmin.state"></el-input>
            </el-form-item>-->

            <el-form-item label="排序字段" v-model="formAdmin.sortNumber">
              <el-cascader
                v-show=" diaVisible"
                :options="optionsas"
                :props="{ multiple: true, checkStrictly: true }"
                clearable
              ></el-cascader>
              <el-checkbox v-model="checked" v-show=" diaVisible">decs</el-checkbox>
              <el-input
                :disabled="true"
                v-show="diaAdminVisible"
                v-model="formAdmin.sortNumber"
                style="width:300px"
              ></el-input>
            </el-form-item>

            <el-form-item label="上级部门">
              <el-button icon="el-icon-user-solid" v-show="diaVisible" @click="disible=true"></el-button>
              <span>{{formAdmin.superDept}}</span>
            </el-form-item>
            <el-form-item label="本部门管理员">
              <el-button icon="el-icon-user-solid" v-show=" diaVisible" @click="logSubmit"></el-button>
              <span>{{formUserAdmin.adminNumber}}</span>
            </el-form-item>
            <el-form-item label="部门负责人">
              <el-button icon="el-icon-user-solid" v-show=" diaVisible" @click="lSubmit"></el-button>
              <span>{{bumengData.chargeNumber}}</span>
            </el-form-item>
          </el-form>
        </div>
           <el-dialog :visible.sync="disible">
      <el-form>
        <el-tree
          :props="props"
          :load="loadNode"
          node-key="id"
          ref="tree"
          highlight-current
          lazy
          show-checkbox
          @check="checkEditVis"
        ></el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disible = false">取 消</el-button>
        <el-button type="primary" @click="disible = false">确 定</el-button>
      </div>
    </el-dialog>
      </el-col>
    </el-row>
    <!-- </el-scrollbar> -->
  </div>
</template>
<script>
import {
  postageOrgDept,
  postponeOrgDept,
  posteOrgDept,
  postdateOrgDept,
  postDeleteOrgDept,
  outnumberOrgDept
} from "@/api/index.js";
import { constants } from "crypto";
let id = 1000;
export default {
  data() {
    return {
      disible:false,
      loading: false,
      checked: false,
      props: {
        label: "deptName", //这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
        children: [],
        isLeaf: "leaf"
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      children: [],
      inputAdmin: [],
      inputdata: [],
      dialogForm: true,
      diaAdminVisible: true,
      diaVisible: false,
      diaVisibleEdit: true,
      diVisible: false,
      dialogFormVisible: false,
      scrollHeight: "0px",
      optionsas: [
        {
          value: "deptType",
          label: "deptType"
        },
        {
          value: "deptName",
          label: "deptName"
        },
        {
          value: "deptNumber",
          label: "deptNumber"
        },
        {
          value: "sortNumber",
          label: "sortNumber"
        }
      ],
      options: [
        {
          id: 1,
          value: "集团",
          label: "集团",
          children: [
            {
              id: 2,
              value: "总经办",
              label: "总经办"
            },
            {
              id: 3,
              value: "战略发展部",
              label: "战略发展部"
            },
            {
              value: "运营管理部",
              id: 4,
              label: "运营管理部"
            },
            {
              id: 5,
              value: "信息管理部",
              label: "信息管理部",
              children: [
                {
                  value: "系统管理部",
                  id: 10,
                  label: "系统管理部"
                },
                {
                  value: "项目管理部",
                  id: 11,
                  label: "项目管理部"
                },
                {
                  value: "软件研发部",
                  id: 12,
                  label: "软件研发部"
                }
              ]
            },
            {
              value: "行政管理部",
              id: 6,
              label: "行政管理部"
            },
            {
              value: "财务管理部",
              id: 7,
              label: "财务管理部"
            },
            {
              value: "企划管理部",
              id: 8,
              label: "企划管理部"
            },
            {
              value: "人力资源部",
              id: 9,
              label: "人力资源部"
            }
          ]
        }
      ],

      // defaultProps: {
      //   children: "children",
      //   label: "deptName"
      // },
      formData: { chargeNumber: "" },
      formAspect: { adminNumber: "" },
      formUserAdmin: { adminNumber: "" },
      bumengData: { chargeNumber: "" },
      arrayStr: "",
      appId: "",
      deptNumber: "",
      superDept: "",
      diaVisible: false,
      formAdmin: {},

      form: {
        deptType: "",
        deptName: "",
        deptNumber: "",
        superDept: "",
        adminNumber: "",
        chargeNumber: "",
        sortNumber: "",
        state: ""
      }
    };
  },
  methods: {
    checkEditId() {
      this.diVisible = true;
    },
   checkEditVis(data) {
      console.log(data);
      this.formAdmin.superDept = data.superDept;
      console.log(this.form.superDept);
    },
    checkEdit(data) {
      console.log(data);
      this.form.superDept = data.superDept;
      console.log(this.form.superDept);
    },
    //     // 导出表格
    //     ExportData() {
    //       import("@/vendor/Export2Excel").then(excel => {
    //         //表格的表头列表
    //         const tHeader = [ "上级部门", "部门名称", "部门编号", '部门类型',"排序编号",'本部门管理员','部门负责人'];
    //         //与表头相对应的数据里边的字段
    //         const filterVal = ['adminNumber' ,'deptName','superDept','deptNumber' ,'sortNumber' ,'adminNumber ' , 'chargeNumber' ];
    //         const list = this.formAdmin;
    //         const data = this.formatJson(filterVal, list);
    //         //这里还是使用export_json_to_excel方法比较好，方便操作数据
    //         excel.export_json_to_excel(tHeader,data,'合并收款');
    //       });
    //     },
    //     // 洗数据
    //     formatJson(filterVal, jsonData){
    //           return jsonData.map(v => {
    //             filterVal.map(j => {

    //             })
    //             return v[j]
    //           })
    //     },
    _outnumberOrgDept() {
      this.dialogFormVisible = true;
      outnumberOrgDept().then(res => {
        this.form.deptNumber = res.data.deptNumber;
      });
    },
    hanChangeclick(data) {
      console.log(data[1]);
      if (data.length === 2) {
        this.form.superDept = data[1];
      }
      if (data.length === 1) {
        this.form.superDept = data[0];
      }
      if (data.length === 3) {
        this.form.superDept = data[2];
      }
    },
    handleNodeEdit(row) {
      // console.log(row, 11111111111);
      // console.log(this.$refs.tree.getCheckedNodes(), 222222222);
      let array = this.$refs.tree.getCheckedNodes().map(item => {
        return item.appId;
      });
      console.log(array);
      this.appId = array.join(",");
      console.log(this.appId);
    },
    // 删除
    _postDeleteOrgDept() {
      postDeleteOrgDept({ appId: this.appId }).then(res => {
        if (res.data.flag === 1) {
          this.$message({ message: "删除成功 请刷新页面", type: "success" });
          this.loadNode(node, resolve);
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // 刷新
    redactEdit() {
      this.$router.go(0);
    },
    handleCurrentEdit(data, node) {
      console.log(data, 222222222);
      this.deptNumber = data.deptNumber;
      this.appId = data.appId;
      posteOrgDept({ appId: this.appId }).then(res => {
        this.formUserAdmin.adminNumber = res.data.rows.adminNumber;
        this.bumengData.chargeNumber = res.data.rows.chargeNumber;
        this.formAdmin = res.data.rows;
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
      }, 800);
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
    // 添加按钮
    _postageOrgDept() {
      this.loading = true;
      this.form.adminNumber = this.formAspect.adminNumber;
      this.form.chargeNumber = this.formData.chargeNumber;
      postageOrgDept(this.form).then(res => {
        if (res.data.flag === 1) {
          this.$message({ message: "添加成功 请刷新页面", type: "success" });
          this.requestTree();
          this.loading = false;
        } else {
          this.loading = false;
          this.$message.error("添加失败");
        }
      });
    },
    passSubmit() {
      this.$store.dispatch("sestetNumberName", this.form.deptNumber);
      this.$store.dispatch("sestetNameName", this.form.deptName);
      this.$store.dispatch("setsquareDeptName", this.form.superDept);
      this.$store.dispatch("sensorsNumberName", this.form.sortNumber);
      this.$store.dispatch("sestetTypeName", this.form.deptType);
      this.$router.push({ name: "Ctopcoats" });
    },
    AdminSubmit() {
      this.$store.dispatch("sestetNumberName", this.form.deptNumber);
      this.$store.dispatch("sestetNameName", this.form.deptName);
      this.$store.dispatch("setsquareDeptName", this.form.superDept);
      this.$store.dispatch("sensorsNumberName", this.form.sortNumber);
      this.$store.dispatch("sestetTypeName", this.form.deptType);
      console.log(11111111);
      console.log(this.$store);
      this.$router.push({ name: "Btopcoats" });
    },
    logSubmit() {
      this.$store.dispatch("formerNumberName", this.formAdmin.deptNumber);
      this.$store.dispatch("forwardestName", this.formAdmin.deptName);
      this.$store.dispatch("forwarderDept", this.formAdmin.superDept);
      this.$store.dispatch("forwardersNumberName", this.formAdmin.sortNumber);
      this.$store.dispatch("forwarderTypeName", this.formAdmin.deptType);
      this.$router.push({ name: "Topcoats" });
    },
    lSubmit() {
      this.$store.dispatch("formerNumberName", this.formAdmin.deptNumber);
      this.$store.dispatch("forwardestName", this.formAdmin.deptName);
      this.$store.dispatch("forwarderDept", this.formAdmin.superDept);
      this.$store.dispatch("forwardersNumberName", this.formAdmin.sortNumber);
      this.$store.dispatch("forwarderTypeName", this.formAdmin.deptType);
      this.$router.push({ name: "ATopcoats" });
    },
    redactAdmin() {
      if (this.form.id === 0) {
        this.form.id = 1;
        this.diaVisible = false;
        this.dialogForm = true;
      } else {
        this.form.id = 0;

        this.diaVisible = true;
        this.dialogForm = false;
      }
      postdateOrgDept(this.formAdmin, this.inputAdmin, this.inputdata).then(
        res => {}
      );
    },
    redact() {
      if (this.form.id === 0) {
        this.form.id = 1;
        this.diaVisible = false;
        this.dialogForm = true;
        this.diaVisibleEdit = true;
        this.diaAdminVisible = true;
      } else {
        this.form.id = 0;
        this.diaVisible = true;
        this.dialogForm = false;
        this.diaVisibleEdit = false;
        this.diaAdminVisible = false;
      }
    },
    handleChange(value) {},

    // 滚动条
    load() {
      // this.count += 2;
    },
    getCheckedKeys() {},
    onSubmit() {
      // console.log("submit!");
    }
  },
  mounted() {
    if (this.$route.params.isEdit) {
      this.form.id = 0;
      this.diaVisible = true;
      this.dialogForm = true;
      this.diaVisibleEdit = false;
      this.diaAdminVisible = false;
    }
    if (this.$route.params.AdminEdit) {
      this.form.id = 0;
      this.diaVisible = true;
      this.dialogForm = true;
      this.diaVisibleEdit = false;
      this.diaAdminVisible = false;
    }
    console.log(11111111);
    console.log(this.$store);
    if (this.$store.getters.formerNumberName) {
      this.formAdmin.deptNumber = this.$store.getters.formerNumberName;
    }
    if (this.$store.getters.forwardestName) {
      this.formAdmin.deptName = this.$store.getters.forwardestName;
    }
    if (this.$store.getters.forwarderDept) {
      this.formAdmin.superDept = this.$store.getters.forwarderDept;
    }
    if (this.$store.getters.forwardersNumberName) {
      this.formAdmin.sortNumber = this.$store.getters.forwardersNumberName;
    }
    if (this.$store.getters.forwarderTypeName) {
      this.formAdmin.deptType = this.$store.forwarderTypeName;
    }
    if (this.$store.getters.sestetNumberName) {
      this.form.deptNumber = this.$store.getters.sestetNumberName;
    }
    if (this.$store.getters.sestetNameName) {
      this.form.deptName = this.$store.getters.sestetNameName;
    }
    if (this.$store.getters.setsquareDeptName) {
      this.form.superDept = this.$store.getters.setsquareDeptName;
    }
    if (this.$store.getters.sensorsNumberName) {
      this.form.sortNumber = this.$store.getters.sensorsNumberName;
    }
    if (this.$store.getters.sestetTypeName) {
      this.form.deptType = this.$store.getterssestetTypeName;
    }
    if (this.$store.getters.selectUserName) {
      this.formUserAdmin.adminNumber = this.$store.getters.selectUserName;
    }
    if (this.$store.getters.selectAdminName) {
      this.bumengData.chargeNumber = this.$store.getters.selectAdminName;
    }
    if (this.$store.getters.AspectAdminName) {
      this.formAspect.adminNumber = this.$store.getters.AspectAdminName;
    }
    if (this.$route.params.isEditAspectAdminName) {
      this.dialogFormVisible = true;
    }
    if (this.$store.getters.DischargeGumbel) {
      this.formData.chargeNumber = this.$store.getters.DischargeGumbel;
    }
    if (this.$route.params.isEditDischargeGumbel) {
      this.dialogFormVisible = true;
    }
  }
};
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
/* .buttons {
  padding: 0px 0px 15px 120px;
} */
.block {
  float: left;
  width: 220px;
  padding: 0px 8px;
}
.navhad {
  font-size: 18px;
  padding: 15px 15px;
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
.bg-purple-light {
  padding: 0px 40px 20px 10px;
}
</style>