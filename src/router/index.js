import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Member from '@/components/pages/Member'

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        //首页
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall
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
        //会员中心
        {
          path: '/member',
          name: 'Member',
          component: Member
        },
      ]
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

  ]
})
