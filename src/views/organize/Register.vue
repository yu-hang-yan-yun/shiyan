<template>
  <div>
    <el-dialog :visible.sync="Visible">
      <el-form ref="form" :model="form" label-width="110px" label-position="left" size="mini">
        <el-form-item label="分类层级" clearable>
          <!-- <el-cascader :options="data" :show-all-levels="false" change></el-cascader> -->
          <el-select v-model="form.typeName">
            <el-option label="专业组" value="专业组"></el-option>
            <el-option label="管理组" value="管理组"></el-option>
            <el-option label="营销组" value="营销组"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位编号">
          <el-input v-model="form.stationType"></el-input>
        </el-form-item>
        <el-form-item label="岗位分类名称">
          <el-input v-model="form.superType" placeholder="root"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="_postSaveOrgStationType">确定</el-button>
          <el-button @click="Visible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="navhad" style="border-bottom:1px #f0f0f0 solid;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Appindex' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>组织管理</el-breadcrumb-item>
        <el-breadcrumb-item>岗位管理</el-breadcrumb-item>
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
            lazy
            @node-contextmenu="rightClick"
             @node-click="handleCurrentEdit"
            show-checkbox
            @node-expand="handleCurrentEdit"
            @check="handleNodeEdit"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="19" style="border-left:#f0f0f0 solid 2px;">
        <div class="grid-content bg-purple-light" style="margin:20px 0 0 10px;padding:0;">
          <div class="buttons">
            <el-button @click="_detstationumberr" size="mini" type="primary" plain>新增</el-button>
             <el-button size="mini" type="primary" plain>导出</el-button>
            <el-button size="mini" type="primary" plain>导入</el-button>
            <!-- <el-button size="mini" @click="redactEdit" type="primary" plain>刷新</el-button> -->
            <el-button size="mini" @click="_getRogationManage" type="primary" plain>删除</el-button>
          </div>
          <el-table :data="tableData" @select="deleteEdit">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="stationName" label="岗位名称"></el-table-column>
            <el-table-column prop="stationNumber" label="岗位编号"></el-table-column>
            <el-table-column prop="stationExplain" label="岗位说明"></el-table-column>
            <el-table-column prop="stationType" label="岗位类型"></el-table-column>
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

          <el-dialog :visible.sync="dialogFormVisible">
            <el-form :model="formtabledata">
              <el-form-item label="岗位说明" :label-width="formLabelWidth">
                <el-input v-model="formtabledata.stationExplain" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="岗位名称" :label-width="formLabelWidth">
                <el-input v-model="formtabledata.stationName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="岗位编号" :label-width="formLabelWidth">
                <el-input v-model="formtabledata.stationNumber" autocomplete="off"></el-input>
                <!-- <el-select v-model="formtabledata.stationNumber">
                  <el-option label="销售专员" value="销售专员"></el-option>
                  <el-option label="管理专员" value="管理专员"></el-option>
                  <el-option label="推销专员" value="推销专员"></el-option>
                </el-select>-->
              </el-form-item>
              <el-form-item label="岗位类型" :label-width="formLabelWidth">
                    <el-select v-model="formtabledata.stationType">
                <el-option label="销售专员" value="销售专员"></el-option>
                <el-option label="管理专员" value="管理专员"></el-option>
                <el-option label="推销专员" value="推销专员"></el-option>
              </el-select>
                <!-- <el-input v-model="formtabledata.stationType" autocomplete="off"></el-input> -->
              </el-form-item>
              <el-form-item label="主键" :label-width="formLabelWidth">
                <el-input v-model="formtabledata.appId" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="排序字段" :label-width="formLabelWidth">
                <el-cascader
                  v-model="formtabledata.sortNumber"
                  :options="optionsas"
                  :props="{ multiple: true, checkStrictly: true }"
                  clearable
                ></el-cascader>
                <el-checkbox v-model="checked">decs</el-checkbox>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible= false">取 消</el-button>
              <el-button type="primary" :loading="loading" @click="_postulationManageStationType">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <el-dialog :visible.sync="dialogVisible">
          <el-form :model="formAdmintable">
            <el-form-item label="岗位说明" :label-width="formLabelWidth">
              <el-input v-model="formAdmintable.stationExplain" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="岗位名称" :label-width="formLabelWidth">
              <el-input v-model="formAdmintable.stationName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="岗位唯一编号" :label-width="formLabelWidth">
              <el-input v-model="formAdmintable.stationNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="岗位类型ID" :label-width="formLabelWidth">
               <el-input v-model="formAdmintable.stationType" autocomplete="off"></el-input>
              <!-- <el-select v-model="formAdmintable.stationType">
                <el-option label="销售专员" value="销售专员"></el-option>
                <el-option label="管理专员" value="管理专员"></el-option>
                <el-option label="推销专员" value="推销专员"></el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="主键" :label-width="formLabelWidth">
              <el-input v-model="formAdmintable.appId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
              <el-input v-model="formAdmintable.state" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序字段" :label-width="formLabelWidth">
              <el-cascader
                v-model="formtabledata.sortNumber"
                :options="optionsas"
                :props="{ multiple: true, checkStrictly: true }"
                clearable
              ></el-cascader>
              <el-checkbox v-model="checked">decs</el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible= false">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="_outstationManage">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
        <div v-show="menuVisible">
   <ul id="menu" class="menu">
     <li class="menu__item" @click="_detestationRenumber">添加</li>
     <li class="menu__item"  @click="_detestationTypeManage"  >删除</li>
   </ul>
</div>
  </div>
</template>
<script>
import {
  postSaveOrgStationType,
  postOrgStationManage,
  getOrgStationType,
  detestationManage,
  postulationsManage,
  outstationManage,
  getRogationManage,
  detestationTypeManage,
  postulationManageStationType,
  detestationRenumber,
  detstationumberr
} from "@/api/index.js";
export default {
  data() {
    return {
      loading: false,
       menuVisible :false,
      Visible: false,
      dialogVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      formtabledata: {
        stationType: "",
        stationNumber: "",
        stationName: "",
        stationExplain: "",
        sortNumber: ""
      },
      formAdmintable: {
        stationType: "",
        stationNumber: "",
        stationName: "",
        stationExplain: "",
        sortNumber: ""
      },
      props: {
        label: "typeName", //这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
        children: [],
        isLeaf: "leaf"
      },
      children: [],

      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: [{}],
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
      data: [
        { value: "专业族", label: "专业族" },
        { value: "管理族", label: "管理族" },
        { value: "营销组", label: "营销组" }
      ],
      stationType: "",
      appId: "",
      form: {
        stationType: "",
        typeName: "",
        superType: ""
      },
      formAdmin: {
        superType: ""
      },
      checked: false,
      searchStr: "",
      // 分页所对应的数据
      total: 0,
      currentPage: 1,
      //   当前页码
      page: 1,
      // 每页显示的记录数
      pageSize: 6
    };
  },
  methods: {
     rightClick(MouseEvent, object, Node, element) { // 鼠标右击触发事件
        this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
        this.menuVisible = true  // 显示模态窗口，跳出自定义菜单栏
        var menu = document.querySelector('#menu') 
        menu.style.left = MouseEvent.clientX - 160 + 'px'
        document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
        menu.style.top = MouseEvent.clientY - 10 + 'px'
         this.form.superType = object.stationType;
        console.log('右键被点击的event:', MouseEvent)
        console.log('右键被点击的object:', object)
        console.log('右键被点击的value:', Node)
        console.log('右键被点击的element:', element)
        console.log('鼠标点击了树形结构图')
      },
     foo() { // 取消鼠标监听事件 菜单栏
        this.menuVisible = false
        document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
      },
    redactEdit() {
      this.$router.go(0);
    },
    _detstationumberr() {
      this.dialogFormVisible = true;
      detstationumberr().then(res => {
        this.formtabledata.stationNumber = res.data.stationNumber;
        console.log(this.formtabledata.stationNumber);
      });
    },
    // 岗位分类编号
    _detestationRenumber() {
      this.Visible = true;
      detestationRenumber().then(res => {
        this.form.stationType = res.data.stationType;
      });
    },
    // 添加岗位
    _postulationManageStationType() {
      this.loading = true
      postulationManageStationType(this.formtabledata).then(res => {
        if (res.data.flag === 1) {
          this.$message({ message: "添加成功", type: "success" });
          this.dialogFormVisible = false;
          this.loading = false
        this._detestationManage();
        } else {
          this.loading = false
          this.$message.error("添加失败");
        }
      });
    },
    // 删除岗位
    deleteEdit(data) {
      console.log(data, 222222);
      let array = data.map(item => {
        return item.appId;
      });
      console.log(array);
      this.appId = array.join(",");
      console.log(this.appId, 9999999999);
    },
    _getRogationManage() {
      getRogationManage({ appId: this.appId }).then(res => {
        if (res.data.flag === 1) {
          this.$message({ message: "删除成功", type: "success" });
          this._detestationManage();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // 搜索
    // serachUser() {
    //   this._detestationManage();
    // },
    // 编辑确定
    _outstationManage() {
      this.loading = true
      outstationManage(this.formAdmintable).then(res => {
        if (res.data.flag === 1) {
          this.$message({ message: "修改成功", type: "success" });
          this.dialogVisible = false;
          this.loading = false
          this._detestationManage();
        } else {
          this.loading = false
          this.$message.error("修改失败");
        }
      });
    },
    // 编辑详情
    handleEdit(data, val) {
      this.dialogVisible = true;
      console.log(val);
      this.appId = val.appId;
      postulationsManage({ appId: this.appId }).then(res => {
        this.formAdmintable = res.data.rows;
      });
    },
    // 所有岗位数据接口
    _detestationManage() {
      detestationManage({
        searchStr: this.searchStr,
        page: this.page,
        pageSize: this.pageSize,
        stationType: this.stationType
      }).then(res => {
        this.tableData = res.data.rows;
        this.pageSize = res.data.pageSize;
        this.page = res.data.page;
        this.searchStr = res.data.searchStr;
        this.total = res.data.total;
      });
    },
    // 删除分类岗位
    _detestationTypeManage() {
      detestationTypeManage({ appId: this.appId }).then(res => {
        if (res.data.flag === 1) {
          this.$message({ message: "删除成功", type: "success" });
          this.loadNode(node, resolve);
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    handleNodeEdit(row) {
      console.log(row,8888)
      let array = this.$refs.tree.getCheckedNodes().map(item => {
        return item.appId;
      });
      console.log(array);
      this.appId = array.join(",");
      console.log(this.appId, 2222222);
    },
    handleCurrentEdit(data, node) {
      console.log(data, 222222);
      this.stationType = data.stationType;
     
      console.log(this.stationType);
      postOrgStationManage({ stationType: this.stationType }).then(res => {
        this.tableData = res.data.rows;
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
    // 添加
    _postSaveOrgStationType() {
      this.loading = true
      postSaveOrgStationType(this.form).then(res => {
        if (res.data.flag === 1) {
          this.$message({ message: "添加成功", type: "success" });
          this.Visible = false;
          this.loading = false
          this._detestationManage();
        } else {this.loading = false
          this.$message.error("添加失败");
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this._detestationManage();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this._detestationManage();
    },

    handleChange(value) {
      console.log(value);
    },
    handleClick(value) {
      console.log(value);
    },
    onchange() {}
  },
  created() {
    this._detestationManage();
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
/* .buttons {
  padding-bottom: 8px;
  padding-left: 60px;
} */
.sech {
  float: right;
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
    background-color:  #999999;
    color: white;
  }
</style>