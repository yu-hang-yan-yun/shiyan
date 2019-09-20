<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb class="breCrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>平台设置</el-breadcrumb-item>
      <el-breadcrumb-item>操作记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑end -->

    <div class="mainCon">
      <el-button size="mini" type="primary">导出</el-button>
      <!-- 列表 -->
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="operNumber" label="操作人" sortable></el-table-column>
          <el-table-column prop="operTime" label="操作时间" sortable></el-table-column>
          <el-table-column prop="operExplain" label="操作说明" sortable></el-table-column>
          <el-table-column prop="operElement" label="对应元素" sortable></el-table-column>
          <el-table-column prop="operAction" label="操作动作" sortable></el-table-column>
        </el-table>
      </template>
      <!-- 列表end -->

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
import { postoperativeLog } from "@/api/index.js";
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
          date: "2016",
          name: "王小虎",
          address: "上海市"
        }
      ]
    };
  },
  methods: {
    _postoperativeLog() {
      postoperativeLog({
        pageSize: this.pageSize,
        page: this.page
      }).then(res => {
          this.page = res.data.page
        this.pageSize = res.data.pageSize
        this.total = res.data.total
        this.tableData = res.data.rows
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  mounted() {
    this._postoperativeLog();
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
.el-pagination {
  float: right;
}
</style>