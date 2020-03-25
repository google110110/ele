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
<<<<<<< HEAD
  // mode: 'history',
  mode :'hash',//加#号,默认
  // base: 'ele',
=======
  mode: 'history',
  // mode :'hash',
  base: 'ele',
>>>>>>> bug
  base: process.env.BASE_URL,
  routes
 
})

export default router
