<template>
  <div>
    <menuitems></menuitems>
    <div class="mainCon">
      <div style="padding:10px;margin:20px 0">
        <span style="color:#999;font-size:20px;">应用详情</span>
        <el-button
          size="medium"
          type="primary"
          @click="redactAdmin"
          ridio
          style="float:right;margin-right:10px;"
        >编辑</el-button>
        <el-button size="medium" type="danger" ridio style="float:right;margin-right:10px;">删除</el-button>

        <el-button
          size="medium"
          v-show="redactword"
          plain
          style="float:right;margin-right:10px;"
          ridio
        >保存</el-button>
      </div>
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="应用编号">
            <el-input v-model="form.apcId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="应用名称">
            <el-input v-bind:disabled="id!=0" v-model="form.appName"></el-input>
          </el-form-item>
          <el-form-item label="所属分类">
            <el-select v-model="form.region" placeholder="请选择活动区域" v-bind:disabled="id!=0">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理权限">
            <el-button icon="el-icon-user-solid" @click="passSubmit" v-show="redactword"></el-button>
            <span>{{formData.chargeNumber}}</span>
          </el-form-item>
          <el-form-item label="访问权限">
            <el-button icon="el-icon-user-solid" @click="passSubmit" v-show="redactword"></el-button>
            <el-input
              :disabled="true"
              v-show="dialogForm"
              style="width:300px"
              v-model="form.powerVisit"
            ></el-input>
          </el-form-item>
          <el-form-item label="允许匿名访问">
           
              <el-radio v-model="form.anonymous" label="1">允许</el-radio>
          </el-form-item>
          <el-form-item label="版本">
            <el-input :disabled="true" v-model="form.version"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.state">
              <el-radio label="发布"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="form.remarks" autocomplete="off" placeholder="PS:此处只允许输入整数"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
  </div>
</template>
<script>
import { postagesId } from "@/api/index";
import menuitems from "./Formcomponents/appBar.vue";
export default {
  components: { menuitems },
  data() {
    return {
      id: 1,
      appId: "",
      activeIndex2: "1",
      dialogFormVisible: false,
      dialogForm: true,
      redactword: false,
      formData: { chargeNumber: "" },
      formAspect: { adminNumber: "" },
      formUserAdmin: { adminNumber: "" },
      form: {
        databaseName: "",
        databasetype: "",
        ipAddr: "",
        passWord: "",
        userName: "",
        age: ""
      },
      datasourceId: ""
    };
  },
  methods: {
    // 单个应用详情
    _postagesId() {
      postagesId({ appId: this.appId }).then(res => {
        this.form = res.data.rows;
        this.formData.chargeNumber = res.data.rows.powerNumber;
      });
    },
    redactAdmin() {
      if (this.id === 0) {
        this.id = 1;
        this.redactword = false;
      } else {
        this.id = 0;
        this.redactword = true;
      }
    },

    cjSubmit() {
      console.log(99);
      //   getTableList ({dataSource:JSON.stringify(this.form)})
      getDataSre(this.form).then(res => {
        if (res.flag === 1) {
          this.form.databaseName = "";
          this.form.databasetype = "";
          this.form.ipAddr = "";
          this.form.passWord = "";
          this.form.userName = "";
        } else {
          this.form.databaseName = "";
          this.form.databasetype = "";
          this.form.ipAddr = "";
          this.form.passWord = "";
          this.form.userName = "";
          this.$message({
            message: "恭喜你，这是一条成功消息",
            type: "success"
          });
          this.dataSce();
        }
      });
    },

    goBack() {
      console.log("go back");
    },
    passSubmit() {
      this.$router.push({ name: "AdmdataSource" });
    }
  },
  created() {
    if (this.$store.getters.setAdminGamepadId) {
      this.appId = this.$store.getters.setAdminGamepadId;
    }
    if (this.$store.getters.sepoyTypeName) {
      this.formData.chargeNumber = this.$store.getters.sepoyTypeName;
    }
    if (this.$route.params.isEdit) {
      this.id = 0;
      this.redactword = true;
    }
    this._postagesId();
  }
};
</script>
<style>
.mainCon {
  width: 95%;
  margin: 30px 0 0 30px;
}
.sech {
  float: right;
}
</style>
