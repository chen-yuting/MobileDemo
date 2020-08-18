import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    //首页
    {
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall
    },
    //注册页面
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    //登录页面
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    //首页的热卖商品详情页
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    //商品分类列表页面
    {
      path: '/categoryList',
      name: 'CategoryList',
      component: CategoryList
    },
    //购物车页面
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
  ]
})
