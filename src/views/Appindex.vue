<template>
  <div>
    <!-- 添加应用dialog -->
    <el-dialog title="添加应用" :visible.sync="dialog">
      <el-form :model="form">
        <el-form-item label="应用名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择分类名称">
            <el-option label="分类一" value="shanghai"></el-option>
            <el-option label="分类二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用编号" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" placeholder="PS:此处系统自动生成编号，且用户可修改(无需禁用)"></el-input>
        </el-form-item>
        <el-form-item label="版本" :label-width="formLabelWidth">
          <el-input v-model="form.version" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remarks" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理权限" :label-width="formLabelWidth">
          <el-button icon="el-icon-user-solid"></el-button>
        </el-form-item>
        <el-form-item label="访问权限" :label-width="formLabelWidth">
          <el-button icon="el-icon-user-solid"></el-button>
        </el-form-item>
        <el-form-item label="允许匿名访问" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio label="允许"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio label="发布"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.remarks" autocomplete="off" placeholder="PS:此处只允许输入整数"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加应用dialog -->

    <!-- 安装应用dialog -->
    <el-dialog title="安装应用" :visible.sync="dialogAdd">
      <el-form :model="form">
        <el-form-item label="如果应用的设计已存在" :label-width="formLabelWidthAdd">
          <el-radio-group v-model="form.resource">
            <el-radio label="跳过"></el-radio>
            <el-radio label="覆盖"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择要导入的应用包" :label-width="formLabelWidthAdd">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 安装应用dialog -->

    <!-- 搜索框 -->
      <el-input
      style="width:200px;float:right"
    placeholder="请输入内容"
    prefix-icon="el-icon-search"
    v-model="input2">
  </el-input>
    <!-- 搜索框 -->

    <!-- 应用列表 -->
    <div class="main-btns" id="main-btns">
      <el-badge class="item"   v-for="(item , index) in plices" :key="index">
        <el-button class="item-button" size="small"   @click="jump(item.appId)">{{item.appName}}{{item.appId}}</el-button>

      </el-badge>

      <!-- 应用列表 -->

      <!-- 添加按钮 -->
      <el-button class="item-button" type="text" @click="dialog = true">+ 添加应用</el-button>
      <el-button class="item-button" type="text" @click="dialogAdd = true">+ 安装应用</el-button>
      <!-- 添加按钮 -->
    </div>
    <div class="block" style="float:right;">
      <el-pagination
        :current-page="page"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { postallyLog,postIdeallyLog } from "@/api/index.js";
import ItemVue from './organize/Item.vue';
export default {
  data() {
    return {
      appId:"",
      input2:"",
      plices: [],
      pageSize: 6,
      // 分页所对应的数据
      total: 0,
      currentPage: 1,
      //   当前页码
      page: 1,
      // 每页显示的记录数
      fileList: [],
      isCollapse: false,
      dialog: false,
      dialogAdd: false,
      loading: false,
      form: {
        name: "",
        region: "",
        id: "",
        version: "",
        remarks: ""
      },
      formLabelWidth: "120px",
      formLabelWidthAdd: "180px"
    };
  },
  methods: {

    // 添加应用
    _postIdeallyLog(){
      postIdeallyLog().then(res=> {

      })
    },
    _postallyLog() {
      postallyLog({ pageSize: this.pageSize, page: this.page }).then(res => {
        (this.page = res.data.page),
          (this.pageSize = res.data.pageSize),
          (this.total = res.data.total);
        this.plices = res.data.rows;
      });
    },
    jump(data) {
      console.log(data)
      this.appId = data
      this.$store.dispatch("setAdminGamepadId", this.appId);
      this.$router.push({ path: "/dataSource" });
    }
  },
  mounted() {
    this._postallyLog();
  }
};
</script>
<style >
.item {
  margin-top: 5px;
  margin-right: 40px;
}
.item-button {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.main-btns {
  margin-left: 50px;
  margin-top: 50px;
}
.searchInp {
  float: right;
  margin: 20px 20px 0 0;
}
.searchInp button {
  border: none;
}
</style>
