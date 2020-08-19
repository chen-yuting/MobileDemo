<template>
  <div>
    <div>
      <van-nav-bar title="会员中心" />
    </div>
    <div class="top">
      <img :src="image" class="top-img" />
      <div class="login" v-if="isLogin">
        <div>
          <van-button type="warning" @click="outLogin()">退出登录</van-button>
        </div>
      </div>
      <div class="login" v-else>
        <div>
          <van-button type="warning" @click="login()">登录</van-button>
        </div>
        <div>
          <van-button type="primary" @click="register()">注册</van-button>
        </div>
      </div>
    </div>

    <div>
      <van-cell-group>
        <van-cell title="会员卡" is-link />
        <van-cell title="地址管理" is-link />
        <van-cell title="我的订单" is-link />
        <van-cell title="会员权益" is-link />
        <van-cell title="联系我们" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      userInfo: [],
      image: [],
    };
  },
  created() {
    if (localStorage.userInfo) {
      this.isLogin = true;
      this.image = require("@/assets/images/person.jpg");
    } else {
      this.isLogin = false;
      this.image = require("@/assets/images/blank.png");
    }
  },
  methods: {
    outLogin() {
      localStorage.removeItem("userInfo");
      this.isLogin = false;
      this.image = require("@/assets/images/blank.png");
      this.$router.push({ name: "Member" });
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    register() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>

<style scoped>
.top-img {
  width: 70px;
  height: 70px;
  border-radius: 50px;
}
.top {
  text-align: center;
  padding-top: 2rem;
  background-color: #eea2ad;
}
.login {
  display: flex;
  flex-direction: row;
  background-color: #eea2ad;
  padding: 15px;
}
.login div {
  flex: 1;
  text-align: center;
}
</style>