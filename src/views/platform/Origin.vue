<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb class="breCrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>平台设置</el-breadcrumb-item>
      <el-breadcrumb-item>数据源设置</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑end -->

    <div class="mainCon">
      <!-- 选项卡 -->
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="RMDB">
          <!-- 按钮 -->
          <div>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="dialogFormVisibleRMDB = true"
            >新增数据源|RMDB</el-button>
            <el-button size="small">
              导出
              <i class="el-icon-upload2"></i>
            </el-button>
            <el-button size="small">
              删除
              <i class="el-icon-close"></i>
            </el-button>
          </div>
          <!-- 按钮end -->
          <template>
            <el-table ref="filterTable" :data="tableData" style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="sourceName" label="数据源名称" sortable></el-table-column>
              <el-table-column prop="sourceID" label="数据源ID" sortable :formatter="formatter"></el-table-column>
              <el-table-column
                prop="date"
                label="修改时间"
                sortable
                column-key="date"
                :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                :filter-method="filterHandler"
              ></el-table-column>
              <el-table-column
                prop="type"
                label="链接类型"
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
                label="当前状态"
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

              <el-table-column prop="address" label="操作">
                <template slot-scope>
                  <el-button @click="dialogFormVisibleRMDB = true" type="text" size="small">查看</el-button>
                  <el-button @click="dialogFormVisibleRMDB = true" type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>

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
        </el-tab-pane>

        <el-tab-pane label="MongoDB">
          <!-- 按钮 -->
          <div>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="dialogFormVisibleMDB = true"
            >新增数据源|MongoDB</el-button>
            <el-button size="small">
              导出
              <i class="el-icon-upload2"></i>
            </el-button>
            <el-button size="small">
              删除
              <i class="el-icon-close"></i>
            </el-button>
          </div>
          <!-- 按钮end -->
          <template>
            <el-table ref="filterTable" :data="tableData" style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="sourceName" label="数据源名称" sortable></el-table-column>
              <el-table-column prop="sourceID" label="数据源ID" sortable :formatter="formatter"></el-table-column>
              <el-table-column
                prop="date"
                label="修改时间"
                sortable
                column-key="date"
                :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                :filter-method="filterHandler"
              ></el-table-column>
              <el-table-column
                prop="type"
                label="链接类型"
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
                label="当前状态"
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
              <el-table-column prop="address" label="操作">
                <template slot-scope>
                  <el-button @click="dialogFormVisibleMDB = true" type="text" size="small">查看</el-button>
                  <el-button @click="dialogFormVisibleMDB = true" type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>

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
        </el-tab-pane>
      </el-tabs>
      <!-- 选项卡end -->

      <!-- 弹出框RMDB -->
      <el-dialog title="新增数据源|RMDB" :visible.sync="dialogFormVisibleRMDB">
        <el-form :model="formRMDB">
          <el-form-item label="服务器地址" :label-width="formLabelWidth">
            <el-input v-model="formRMDB.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数据库类型" :label-width="formLabelWidth">
            <el-input v-model="formMDB.name" autocomplete="off" value="RMDB" placeholder="RMDB"></el-input>
          </el-form-item>
          <el-form-item label="端口号" :label-width="formLabelWidth">
            <el-input v-model="formRMDB.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数据库名" :label-width="formLabelWidth">
            <el-input v-model="formRMDB.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="formRMDB.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="formRMDB.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="链接池配置" :label-width="formLabelWidth">
            <el-button>配置</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRMDB = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibleRMDB = false">确 定</el-button>
          <el-button type="primary">开始测试</el-button>
        </div>
      </el-dialog>
      <!-- 弹出框RMDB end -->

      <!-- 弹出框MongoDB -->
      <el-dialog title="新增数据源|MongoDB" :visible.sync="dialogFormVisibleMDB">
        <el-form :model="formMDB">
          <el-form-item label="服务器地址" :label-width="formLabelWidth">
            <el-input v-model="formMDB.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数据库类型" :label-width="formLabelWidth">
            <el-input
              v-model="formMDB.name"
              autocomplete="off"
              value="MongoDB"
              placeholder="MongoDB"
            ></el-input>
          </el-form-item>
          <el-form-item label="端口号" :label-width="formLabelWidth">
            <el-input v-model="formMDB.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数据库名" :label-width="formLabelWidth">
            <el-input v-model="formMDB.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="formMDB.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="formMDB.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="链接池配置" :label-width="formLabelWidth">
            <el-button>配置</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleMDB = false">取 消</el-button>
          <el-button type="primary" @click="dialogTableVisibleMDB = false">确 定</el-button>
          <el-button type="primary">开始测试</el-button>
        </div>
      </el-dialog>
      <!-- 弹出框MongoDB end -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 分页所对应的数据
      total: 0,
      currentPage: 1,
      //   当前页码
      page: 1,
      // 每页显示的记录数
      pageSize: 6,
      tableData: [
        {
          sourceName: "Redis内存数据库",
          sourceID: "redis",
          date: "2019-08-21",
          type: "redis",
          status: "未连接"
        },
        {
          sourceName: "缺省关系数据库数据源",
          sourceID: "default",
          address: "2019-08-22",
          type: "链接池",
          status: "链接中"
        },
        {
          sourceName: "Redis内存数据库",
          sourceID: "redis",
          date: "2019-08-21",
          type: "redis",
          status: "未连接"
        },
        {
          sourceName: "缺省关系数据库数据源",
          sourceID: "default",
          address: "2019-08-22",
          type: "链接池",
          status: "链接中"
        }
      ],
      dialogTableVisibleRMDB: false,
      dialogFormVisibleRMDB: false,
      formRMDB: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dialogTableVisibleMDB: false,
      dialogFormVisibleMDB: false,
      formMDB: {
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
      tabPosition: "top"
    };
  },
  methods: {
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