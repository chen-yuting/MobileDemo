<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>

    <div>
      <van-row>
        <!-- 左侧列表 -->
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                @click="clickCategory(index,item.ID)"
                :class="{categoryActice:categoryIndex==index}"
                v-for="(item,index) in category"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <!-- 右侧列表 -->
        <van-col span="18">
          <div class="tabCategorySub">
            <!-- v-model表示第几个van-tab被激活 -->
            <van-tabs v-model="active" @click="clickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh()">
              <!-- 当组件滚动到底部时，会触发load事件并将loading设置成true -->
              <!-- 此时可以发起异步操作并更新数据，数据更新完毕后，将loading设置成false即可。 -->
              <!-- 若数据已全部加载完毕，则直接将finished设置成true即可。 -->
              <van-list v-model="loading" :finished="finished" @load="onLoad()">
                <div
                  class="list-item"
                  v-for="(item,index) in goodsList"
                  :key="index"
                  @click="goGoodsInfo(item.ID)"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      category: [],
      categorySub: [],
      categoryIndex: 0,
      active: 0, //激活van-tab标签的值
      loading: false, //上拉加载
      finished: false, //上拉加载是否到底
      refreshing: false, //下拉刷新
      goodsList: [], //具体类商品
      page: 1, //商品列表的页数
      categorySubId: "", //商品子类ID
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"',
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  created() {
    this.getCategory();
  },

  //DOM加载之后
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height =
      winHeight - 46 - 48 + "px";
    document.getElementById("list-div").style.height =
      winHeight - 90 - 48 + "px";
  },

  methods: {
    //获取大类信息
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get",
      })
        .then((response) => {
          console.log("大类信息:", response);
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySubByCategoryID(this.category[0].ID);
          } else {
            Toast("服务器错误，数据获取失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //点击大类获取子类
    //点击左侧大类背景变白色,绑定:class
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.goodsList = [];
      this.finished = false;
      this.page = 1;
      this.getCategorySubByCategoryID(categoryId);
    },

    //根据大类ID读取子类类别列表
    getCategorySubByCategoryID(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId: categoryId },
      })
        .then((response) => {
          console.log("子类信息:", response);
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0;
            this.categorySubId = this.categorySub[0].ID;
          } else {
            Toast("服务器错误，数据获取失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //点击子类获取商品
    clickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      console.log("categorySubId:", this.categorySubId);
      this.goodsList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },

    //上拉加载
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodsList();
      }, 1000);
    },

    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.refreshing = false;
        this.goodsList = [];
        this.finished = false;
        this.page = 1;
        this.onLoad();
      }, 500);
    },

    //获取具体类的商品
    getGoodsList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page,
        },
      })
        .then((response) => {
          console.log("具体类商品信息:", response);
          if (response.data.code == 200 && response.data.message.length > 0) {
            this.page++;
            this.goodsList = this.goodsList.concat(response.data.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.length(error);
        });
    },

    //跳转商品详细页
    goGoodsInfo(id) {
      // params:name,query:path
      // params传参，路径不能使用path，只能使用name，不然取不到传的数据
      // query传参，用的是path，而不是name,否则也会出错
      this.$router.push({ name: "Goods", params: { goodsId: id } });
    },
  },
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActice {
  background-color: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>