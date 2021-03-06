const BASEURL = "http://localhost:3333/";
const LOCALURL = "http://localhost:3000/";
const URL = {
  GetShoppingMallInfo: BASEURL + "index",
  getGoodsInfo: BASEURL + "getGoodsInfo",
  registerUser: LOCALURL + "user/register",   //用户注册接口
  loginUser: LOCALURL + "user/login",   //用户登录接口
  getDetailGoodsInfo: LOCALURL + "goods/getDetailGoodsInfo",   //获取商品详细信息
  getCategoryList: LOCALURL + "goods/getCategoryList",   //获取商品大类
  getCategorySubList: LOCALURL + "goods/getCategorySubList",   //获取商品子类
  getGoodsListByCategorySubID: LOCALURL + "goods/getGoodsListByCategorySubID",   //根据子类获取商品列表
}

module.exports = URL
