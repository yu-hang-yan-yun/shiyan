<template>
  <div>
    <el-breadcrumb class="breCrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/HelloWorld' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>平台设置</el-breadcrumb-item>
      <el-breadcrumb-item>代码模板</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="mainCon">
      <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增模板</el-button>
      <el-button>
        导出
        <i class="el-icon-upload2"></i>
      </el-button>
      <el-button>
        删除
        <i class="el-icon-close"></i>
      </el-button>
      <el-button>
        刷新
        <i class="el-icon-refresh-right"></i>
      </el-button>
      <template>
        <el-table ref="filterTable" :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column prop="tempID" label="模板ID" sortable :formatter="formatter"></el-table-column>
          <el-table-column prop="tempName" label="模板名称" sortable></el-table-column>
          <el-table-column prop="tempExplain" label="模板说明" sortable :formatter="formatter"></el-table-column>
          <el-table-column
            prop="date"
            label="最后修改时间"
            sortable
            column-key="date"
            :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
            :filter-method="filterHandler"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="适用类型"
            :filters="[{ text: 'redis', value: 'redis' }, { text: 'MongoDB', value: 'MongoDB' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.type === 'redis' ? 'primary' : 'success'"
                disable-transitions
              >{{scope.row.type}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="操作"
            :filters="[{ text: '未连接', value: '未连接' }, { text: '链接中', value: '链接中' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :status="scope.row.status === '未连接' ? 'primary' : 'success'"
                disable-transitions
              >{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-dialog title="新增模板" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="模板名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="模板类型" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模板内容" :label-width="formLabelWidth">
            <el-button  @click="handle">编写代码</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

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
          tempID: "234665",
          tempName: "Redis内存数据库",
          tempExplain: "Redis内存数据库",
          date: "2019-08-21",
          type: "redis",
          status: "未连接"
        },
        {
          tempID: "2989952",
          tempName: "缺省关系数据库数据源",
          tempExplain: "缺省关系数据库数据源",
          date: "2019-08-21",
          type: "redis",
          status: "未连接"
        },
        {
          tempID: "234665",
          tempName: "Redis内存数据库",
          tempExplain: "Redis内存数据库",
          date: "2019-08-21",
          type: "redis",
          status: "未连接"
        },
        {
          tempID: "2989952",
          tempName: "缺省关系数据库数据源",
          tempExplain: "缺省关系数据库数据源",
          date: "2019-08-21",
          type: "redis",
          status: "未连接"
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
      formLabelWidth: "120px"
    };
  },
  methods: {
    handle () {
      this.$router.push({ name: 'MyEditorone' })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
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