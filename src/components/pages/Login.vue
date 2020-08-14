<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack()" />
    <div class="login-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
        :error-message="usernameErrorMsg"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="login-button">
        <van-button type="primary" size="large" @click="loginAction()" :loading="openLoading">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, //是否开启用户注册的按钮,false时一直转圈
      usernameErrorMsg: "", //当用户名出现错误时的提示信息
      passwordErrorMsg: "", //当密码出现错误时的提示信息
    };
  },
  created () {
    if(localStorage.userInfo){
      Toast.success('您已经登录');
      this.$router.push('/');
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //注册用户行为
    loginAction() {
      this.checkForm() && this.axiosLoginUser();
    },
    //注册用户
    axiosLoginUser() {
      this.openLoading = true;
      axios({
        url: url.loginUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password,
        },
      })
        .then((response) => {
          console.log("登录信息:", response);
          //若用户密码都正确
          if (response.data.code == 200 && response.data.message == true) {
            //存储用户登录状态
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch((err) => {
                Toast.fail("登录状态保存失败");
              });
          } 
          //若不正确
          else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch((error) => {
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
    //表单验证方法
    checkForm() {
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能少于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
  },
};
</script>

<style scoped>
.login-panel {
  width: 95%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 80px;
}
.login-button {
  padding-top: 10px;
}
</style>