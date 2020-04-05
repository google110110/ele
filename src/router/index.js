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



 
})

export default router
