import Vue from 'vue'
import VueRouter from 'vue-router'
import food from './food'
import seller from './seller'
import comment from './comment'
Vue.use(VueRouter)

const routes = [
    food,
    seller,
    comment,
    {
      path:'/*',
      redirect:'/food'
    }
]

const router = new VueRouter({
  // mode: 'history',
  mode :'hash',//加#号,默认
  // base: 'ele',
  base: process.env.BASE_URL,
  routes
 
})

export default router
