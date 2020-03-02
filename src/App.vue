<template>
  <div id="app" :style="{'width':+w+'px'}">
    <foodHeader :seller="seller" class="foodHeader"></foodHeader>
    <ul class="ul">
      <router-link to="/food" tag="li" class="li">商品</router-link>
      <router-link to="/comment" tag="li" class="li">评价</router-link>
      <router-link to="/seller" tag="li" class="li">商家详情</router-link>
      <!-- <router-link to="/seller" tag="li" class="li">商家详情</router-link> -->
    </ul>
    <keep-alive>
         <router-view class="router-view" />
    </keep-alive>
    <!-- <router-view class="router-view" /> -->
    <!-- :style="{'height':+h+'px'}" -->
  </div>
</template>

<script>
  import foodHeader from '@/components/header'
  export default {
    data(){
      return{
          seller:[],
          w:0,
          h:0
      }  
    },
    name:'app',
    components:{
      foodHeader,
    },
    mounted() {
      // this.$nextTick(()=>{
        //DOM节点加载完执行
      // })


      //document.documentElement.clientHeight---可用高度
      this.h=document.documentElement.clientHeight-145-30
      // this.h=window.screen.availHeight-145-30
      // console.log("H",window.screen.height,window.screen.availHeight,window.document.body.offsetHeight,document.documentElement.clientHeight)
      this.w=window.screen.width-60
      var seller=window.localStorage.getItem('seller')
      if(seller){
        this.seller=JSON.parse(seller) 
        console.log('本地存储 seller')
      }else{
        this.axios.get('http//196.128.6.23/api/seller')
          .then(response => {
          const result = response.data
          if (result.code==0) {
            this.seller = result.data
            window.localStorage.setItem('seller',JSON.stringify(result.data))      
            // this.headers.score = 3.6
            console.log('seller请求成功')
          }
        }).catch(error => {
            console.log("seller请求失败",error)
          })
      }
    },
    methods:{
      //直接调用$router.push 实现携带参数的跳转
      // insurance(id){
      //     this.$router.push({
      //     path: `/particulars/${id}`,
      //     })
      // }
      
    },
  }
</script>

<style lang="scss">
.foodHeader{margin: auto;}
#app{
  box-shadow:4px -5px 6px 7px rgba(0,0,0,.5) ;
  margin: auto;
  width:100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
.ul{color: rgb(82, 72, 60); background-color: rgb(158, 126, 86); height: 30px; width: 100%; margin: 0;padding: 0;list-style: none;display: flex; justify-content: space-between;}
.ul .li{cursor: pointer;text-align: center; height: 30px;font-size: 15px; line-height: 30px; font-weight: bold;border-right: 1px solid rgb(189, 157, 121);width: 100%;}
.ul .li:last-child{border: 0;}
.router-view{width:100%;}
</style>
