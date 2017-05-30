import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/index'
import sell from '@/components/sell'
import stock from '@/components/stock'
import showPrice from '@/components/showPrice'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Hello
    },
    {
      path: '/sell',
      name: 'sell',
      component: sell
    },
    {
      path: '/stock',
      name: 'stock',
      component: stock
    },
    {
      path: '/showPrice',
      name: 'showPrice',
      component: showPrice
    }
  ]
})
