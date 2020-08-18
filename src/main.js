// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
require('./mock.js')

// 全局引入（不推荐）
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'

// 全局引入（不推荐）
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)

// 按需引入
import { Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Tab, Tabs, PullRefresh, Stepper } from 'vant'
Vue.use(Button).use(Row).use(Col)
  .use(Swipe).use(SwipeItem)
  .use(Lazyload).use(List)
  .use(Field).use(NavBar)
  .use(Tab).use(Tabs)
  .use(PullRefresh)
  .use(Stepper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
