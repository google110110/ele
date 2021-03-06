import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './mock/index'
import Mint from 'mint-ui'
import Filter from '@/util/Filter' 
for (let key in Filter){ 
 Vue.filter(key,Filter[key]) 
}
Vue.use(Mint);
Vue.prototype.axios=axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
