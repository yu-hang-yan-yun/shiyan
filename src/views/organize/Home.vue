<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="130px" label-position="left" size="mini">
        <el-form-item label="分类名称">
          <el-cascader
            :options="options"
            :show-all-levels="false"
            @change="hanChangeEditclick"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="角色分类唯一编号">
          <el-input v-model="form.roleType"></el-input>
        </el-form-item>
        <el-form-item label="角色分类层级编号">
          <el-input v-model="form.superType" placeholder="root"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="_petrolsType">确定</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="navhad" style="border-bottom:1px #f0f0f0 solid;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path:'/Appindex' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>组织管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="5" style="margin:20px 0 0 0 ;">
        <div class="block">
          <el-tree
            :props="props"
            :load="loadNode"
            node-key="id"
            ref="tree"
            highlight-current
            show-checkbox
            lazy
             @node-click="handleCurrentEdit"
            @node-contextmenu="rightClick"
            @node-expand="handleCurrentEdit"
            @check="handleNodeEdit"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="19" style="border-left:#f0f0f0 solid 2px;">
        <div class="grid-content bg-purple-light" style="margin:20px 0 0 10px;padding:0;">
          <div class="buttons">
            <el-button size="mini" @click="_petroleousManganate" type="primary" plain>新增角色</el-button>
            <el-button size="mini" @click="_postholesType" type="primary" plain>删除</el-button>
            <el-button size="mini" type="primary" plain>导出</el-button>
            <el-button size="mini" type="primary" plain>导入</el-button>
            <el-button size="mini" type="primary" plain>返回</el-button>
          </div>
          <div style="float:right">
            <el-input width="200px" v-model="search" size="mini" placeholder="输入关键字搜索" />
          </div>
          <el-table :data="tableData" @select="deleteEdit">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="roleExplain" label="角色说明"></el-table-column>
            <el-table-column prop="roleNumber" label="角色编号"></el-table-column>
            <el-table-column prop="roleType" label="角色类型"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑详情</el-button>
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
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="Visible">
      <el-form ref="form" :model="formManage" label-width="110px" label-position="left" size="mini">
        <el-form-item label="主键">
          <el-input v-model="formManage.appId"></el-input>
        </el-form-item>
        <el-form-item label="角色说明">
          <el-input v-model="formManage.roleExplain"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="formManage.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色唯一编号">
          <el-input v-model="formManage.roleNumber"></el-input>
        </el-form-item>
        <el-form-item label="角色类型">
          <el-input v-model="formManage.roleType"></el-input>
        </el-form-item>
        <el-form-item label="排序字段">
          <el-input v-model="formManage.sortNumber"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="formManage.state"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" @click="_ethosesTypeAphid">确定</el-button>
          <el-button @click="Visible=false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="rolerVisible">
      <el-form
        ref="formroler"
        :model="formroler"
        label-width="130px"
        label-position="left"
        size="mini"
      >
        <el-form-item label="排序字段">
          <el-cascader
            v-model="formroler.sortNumber"
            :options="optionsas"
            :props="{ multiple: true, checkStrictly: true }"
            clearable
          ></el-cascader>
          <el-checkbox v-model="checked">decs</el-checkbox>
        </el-form-item>
        <el-form-item label="角色分类">
          <el-select v-model="formroler.roleType">
            <el-option label="销售专员" value="销售专员"></el-option>
            <el-option label="管理专员" value="管理专员"></el-option>
            <el-option label="推销专员" value="推销专员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色分类唯一编号">
          <el-input v-model="formroler.roleNumber"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="formroler.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色说明">
          <el-input v-model="formroler.roleExplain"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="_postponedManage">确定</el-button>
          <el-button @click="rolerVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div v-show="menuVisible">
      <ul id="menu" class="menu">
        <li class="menu__item" @click="_petrolsTypename">添加</li>
        <li class="menu__item" @click="_roleTypeType">删除</li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  getOrgRoleType,
  petrolsType,
  petronelManage,
  postholesType,
  ethosesType,
  roleTypeType,
  getableType,
  petrolsTypename,
  petroleousManganate,
  postponedManage,
  ethosesTypeAphid
} from "@/api/index.js";
export default {
  data() {
    return {
        loading:false,
      props: {
        label: "typeName", //这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
        children: [],
        isLeaf: "leaf"
      },
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

      defaultProps: {
        children: "children",
        label: "label"
      },
      children: [],
      data: [
        { value: "专业族", label: "专业族" },
        { value: "管理族", label: "管理族" },
        { value: "营销组", label: "营销组" }
      ],
      options: [
        { value: "专业族", label: "专业族" },
        { value: "管理族", label: "管理族" },
        { value: "营销组", label: "营销组" }
      ],
      menuVisible: false,
      checked: false,
      tableData: [],
      roleType: "",
      appId: "",
      Visible: false,
      dialogFormVisible: false,
      rolerVisible: false,
      search: "",
      // 分页所对应的数据
      total: 0,
      currentPage: 1,
      //   当前页码
      page: 1,
      // 每页显示的记录数
      pageSize: 6,
      formroler: {
        roleType: "",
        roleNumber: "",
        roleName: "",
        roleExplain: "",
        sortNumber: ""
      },
      form: {
        typeName: "",
        superType: "",
        roleType: ""
      },
      formManage: {
         
      }
    };
  },
  methods: {
    // 修改一个角色
    _ethosesTypeAphid(){
      ethosesTypeAphid(this.formManage).then(res => {
  if (res.data.flag === 1) {
          this.$message({ message: "修改成功", type: "success" });
          this.loading = false
          this._petronelManage();
        } else {
          this.loading = false
          this.$message.error("修改失败");
        }
      })
    },
    rightClick(MouseEvent, object, Node, element) {
      // 鼠标右击触发事件
      this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
      var menu = document.querySelector("#menu");
      menu.style.left = MouseEvent.clientX - 160 + "px";
      document.addEventListener("click", this.foo); // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
      menu.style.top = MouseEvent.clientY - 10 + "px";
      this.form.superType = object.roleType;
      console.log("右键被点击的event:", MouseEvent);
      console.log("右键被点击的object:", object);
      console.log("右键被点击的value:", Node);
      console.log("右键被点击的element:", element);
      console.log("鼠标点击了树形结构图");
    },
    foo() {
      // 取消鼠标监听事件 菜单栏
      this.menuVisible = false;
      document.removeEventListener("click", this.foo); // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    _petroleousManganate() {
      this.rolerVisible = true;
      petroleousManganate().then(res => {
        this.formroler.roleNumber = res.data.roleNumber;
      });
    },
    _petrolsTypename() {
      this.dialogFormVisible = true;
      petrolsTypename().then(res => {
        this.form.roleType = res.data.roleType;
      });
    },
    handleNodeEdit(row) {
      // console.log(row, 11111111111);
      // console.log(this.$refs.tree.getCheckedNodes(), 222222222);
      let array = this.$refs.tree.getCheckedNodes().map(item => {
        return item.appId;
      });
      this.appId = array.join(",");
    },
    _roleTypeType() {
      roleTypeType({ appId: this.appId }).then(res => {
        if (res.data.flag === 1) {
          this.$message({ message: "删除成功", type: "success" });

          this._petronelManage();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // 删除角色
    deleteEdit(data) {
      console.log(data, 222222);
      let array = data.map(item => {
        return item.appId;
      });
      this.appId = array.join(",");
    },
    handleEdit(index, row) {
      this.Visible = true;
      this.appId = row.appId;
      ethosesType({ appId: this.appId }).then(res => {
        this.formManage = res.data.rows;
      });
    },
    _postponedManage() {
      this.loading = true
      postponedManage(this.formroler).then(res => {
        if (res.data.flag === 1) {
          this.$message({ message: "添加成功", type: "success" });
          this.rolerVisible = false;
          this.loading = false
            this._petronelManage();
        } else {
          this.loading = false
          this.$message.error("添加失败");
        }
      });
    },
    // 全角色详情查询
    _petronelManage() {
      petronelManage({
        page: this.page,
        pageSize: this.pageSize,
        search: this.search,
        roleType: this.roleType
      }).then(res => {
        this.tableData = res.data.rows;
        this.pageSize = res.data.pageSize;
        this.page = res.data.page;
        this.total = res.data.total;
        this.search = res.data.searchStr;
      });
    },
    hanChangeEditclick(data) {
      console.log(data[1]);
      if (data.length === 2) {
        this.form.typeName = data[1];
      }
      if (data.length === 1) {
        this.form.typeName = data[0];
      }
      if (data.length === 3) {
        this.form.typeName = data[2];
      }
      if (data.length === 4) {
        this.form.typeName = data[3];
      }
    },
    // 新增
    _petrolsType() {
      petrolsType(this.form).then(res => {
        this.loading = true
        if (res.data.flag === 1) {
          this.$message({ message: "添加成功", type: "success" });
          this.dialogFormVisible = false;
          this.loading = false
          this.requestTree();
        } else {
          this.loading = false
          this.$message.error("添加失败");
        }
      });
    },

    // 删除角色
    _postholesType() {
      postholesType({ appId: this.appId }).then(res => {
        // this._petronelManage();
        if (res.data.flag === 1) {
          this.$message({ message: "删除成功", type: "success" });
         this._petronelManage();
        } else {
          this.$message.error("删除失败");
        }
        this.requestTree();
      });
    },
    handleCurrentEdit(data, node) {
      console.log(data, 111111);
      this.roleType = data.roleType;
      this.appId = data.appId;
      getOrgRoleType({ appId: this.appId }).then(res => {
        this.tableData = res.data.children;
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
      getOrgRoleType({ roleType: this.roleType })
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
      getOrgRoleType({ roleType: this.roleType })
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
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
    },

    handleNodeClick() {},
    handleChange(value) {
      console.log(value);
    },

    onchange() {}
  },
  created() {
    this._petronelManage();
  }
};
</script>
<style>
.navhad {
  font-size: 18px;
  padding: 15px 15px;
}
.block {
  float: left;
  width: 220px;
  padding: 0px 8px;
}
.buttons {
  padding-bottom: 8px;
  padding-left: 60px;
}
.menu__item {
  display: block;
  line-height: 20px;
  text-align: center;
  margin-top: 10px;
}
.menu {
  font-size: 10px;
  height: 68px;
  width: 42px;
  position: absolute;
  border-radius: 10px;
  border: 1px solid #c7c7c7;
  background-color: #ffffff;
}
li:hover {
  background-color: #999999;
  color: white;
}
</style>