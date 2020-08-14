<template>
  <div>
      <div class="navbar-div">
          <van-nav-bar/>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      goodsId: "",
    };
  },
  created() {
    //接受首页点击某个商品传递过来的goodsId
    this.goodsId = this.$route.query.goodsId;
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: { goodsId: this.goodsId },
      })
        .then((response) => {
          console.log("具体商品信息:", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>