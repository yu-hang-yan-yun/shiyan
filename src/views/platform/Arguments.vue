<template>
  <div>
    <el-breadcrumb class="breCrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/HelloWorld' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>平台设置</el-breadcrumb-item>
      <el-breadcrumb-item>参数设置</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="mainCon">
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增设置</el-button>
        <el-button >导出<i class="el-icon-upload2"></i></el-button>
        <el-button >删除<i class="el-icon-close"></i></el-button>

      <el-dialog title="新增设置" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="发布环境" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="唯一ID" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="参数名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="forms.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="设置详情" :visible.sync="dialogFormVisibles">
        <el-form :model="forms">
            <el-form-item label="唯一ID" :label-width="formLabelWidth">
            <el-input v-model="forms.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="参数名" :label-width="formLabelWidth">
            <el-input v-model="forms.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="参数值" :label-width="formLabelWidth">
            <el-input v-model="forms.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="forms.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibles = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibles = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="发布环境" width="180"></el-table-column>
        <el-table-column prop="name" label="唯一ID" width="180"></el-table-column>
        <el-table-column prop="address" label="参数名"></el-table-column>
        <el-table-column prop="address" label="应用"></el-table-column>
        <el-table-column prop="address" label="修改者"></el-table-column>
        <el-table-column prop="address" label="最后修改时间"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope>
            <el-button @click="dialogFormVisibles = true" type="text" size="small">查看</el-button>
            <el-button @click="dialogFormVisibles = true" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

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
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageSize: 6,
      // 分页所对应的数据
      total: 0,
      currentPage: 1,
      //   当前页码
      page: 1,
      // 每页显示的记录数
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      dialogTableVisibles: false,
      dialogFormVisibles: false,
      forms: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style>
.mainCon {
  width: 95%;
  margin: 30px 0 0 30px;
}
.breCrumb {
  margin: 20px 0 0 30px;
}
.btnGruop {
  float: right;
}
.el-pagination {
  float: right;
}
</style>