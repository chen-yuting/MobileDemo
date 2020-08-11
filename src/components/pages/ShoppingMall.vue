<template>
  <div>
    <div class="search-bar">
      <!-- 使用vant组件 -->
      <van-row>
        <!-- 一行24格布局 -->
        <!-- 搜索框 -->
        <van-col span="3">
          <img :src="locationIcon" width="70%" class="location-icon" />
        </van-col>
        <van-col span="17">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="4">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 自动轮播图 -->
    <!-- 使用vant的轮播图组件 -->
    <div class="swipe-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品类型 -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- 广告 -->
    <div>
      <img v-lazy="adBanner" width="100%" />
    </div>
    <!-- 商品推荐 -->
    <!-- 使用vue-awesome-swiper组件 -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img v-lazy="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 楼层 -->
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!-- 热卖区 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!-- 使用vant的List组件 -->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goodsInfoComponent :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.mallPrice"></goodsInfoComponent>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import goodsInfoComponent from "../component/goodsInfoComponent";
import { toMoney } from "@/filter/moneyFilter.js";
import url from '@/serviceAPI.config.js'
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
      },
      msg: "Shopping Mall",
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods:[],
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfoComponent
  },
  created() {
    axios({
      url: url.GetShoppingMallInfo,
      method: "get",
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.category = response.data.data.category; //获得商品类别
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS; //获得广告图片
          this.bannerPicArray = response.data.data.slides; //获得轮播图片
          this.recommendGoods = response.data.data.recommend; //获得推荐商品
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swipe-area {
  max-height: 12rem;
  clear: both;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.type-bar img {
  width: 3rem;
  height: 3rem;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>