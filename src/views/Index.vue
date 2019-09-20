<template>
  <div class="login">
    <div class="container">
      <el-form
        :model="LoginForm"
        :rules="rules"
        ref="LoginForm"
        class="demo-ruleForm"
        label-width="60px"
      >
        <img src="../assets/ee22bb.jpg" alt class="avatar" />
        <el-form-item label="服务器">
          <el-input prefix-icon="myicon myicon-key" v-model="LoginForm.urlId"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="uname">
          <el-input
            v-model="LoginForm.userNumber"
            prefix-icon="myicon myicon-user"
            suffix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upsw">
          <el-input v-model="LoginForm.userpsw" prefix-icon="myicon myicon-key" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" @click="loginSubmit('LoginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Login } from "@/api/index.js";
import { copyFileSync } from "fs";
export default {
  data() {
    return {
      LoginForm: {
        userNumber: "",
        userpsw: "",
        urlId: "http://192.168.1.100:8080/"
      },
      rules: {
        userNumber: [
          // required:是否必须  message：如果不合法的提示信息  trigger：什么时候触发
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userpsw: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    loginSubmit(formname) {
      console.log(this.LoginForm.urlId);
      this.$store.dispatch("setIpHost", this.LoginForm.urlId);
      console.log(this.$store);
      // 实现验证，只需要调用当前表单的validate函数，这函数有一个参数，参数是一个回调函数
      // 回调函数有一个参数，如果验证通过则返回True,否则返回False
      console.log(formname);
      this.$refs[formname].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "登录加载中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          //   说明用户输入合法，那么就可以提交
          //   发送登陆验证请求
          Login(this.LoginForm)
            // Login({Index:JSON.stringify(this.Loginform)})
            .then(result => {
              // console.log(result)
              if (result.data.flag === 1) {
                loading.close();
                this.$store.dispatch(
                  "setUserNameAction",
                  result.data.user.userNumber
                );
                localStorage.setItem("jc_token", result.data.token);
                //   要进行路由的跳转
                this.$router.push({ name: "HelloWorld" });
                this.$message({ message: "登录成功", type: "success" });
                loading.close();
              } else {
                this.$message.error(err);
              }
            });
        } else {
          this.$message.error("数据输入不合法");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
