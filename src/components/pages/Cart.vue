<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>
    <div class="card-title">
      <van-button size="small" type="danger" @click="clearCart()" plain>清空购物车</van-button>
    </div>

    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <div class="row" v-for="(item,index) in cartInfo" :key="index">
        <div class="row-img">
          <img :src="item.image" width="100%" />
        </div>
        <div class="row-text">
          <div class="goods-name">{{item.name}}</div>
          <div class="control">
            <van-stepper v-model="item.count" theme="round" button-size="25" />
          </div>
        </div>
        <div class="row-price">
          <div>￥{{item.price | moneyFilter}}</div>
          <div>x{{item.count}}</div>
          <div class="total-price">￥{{item.price*item.count | moneyFilter}}</div>
        </div>
      </div>
    </div>

    <!-- 显示总金额 -->
    <div class="total-money">商品总价：￥{{totalMoney | moneyFilter}}</div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false,
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  created() {
    this.getCartInfo();
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count;
      });
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    },
  },
  methods: {
    getCartInfo() {
      if (localStorage.cartInfo) {
        //字符串转化为json对象  {"name":"goatling"} => {​name:"goatling"}
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      //对象转化为字符串   {name:"goatling"} => {"name":"goatling"}
      console.log("购物车：", JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo ? true : false;
    },
    //清空购物车
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    },
  },
};
</script>

<style scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.row-img {
  flex: 6;
}
.row-text {
  flex: 14;
  padding-left: 10px;
}
.control {
  padding-top: 10px;
}
.row-price {
  flex: 4;
  text-align: right;
}
.total-price {
  color: red;
}
.total-money {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
</style>