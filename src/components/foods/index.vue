<template>
    <div class="foods">
        <!-- :style="{'height':+h+'px'}" -->
        <div class="food-wrapper" :style="{'height':+(h-40)+'px'}">
            <betterScroll :maxHeight="(h-40)" class="menu-warper">
                <ul class="food-menu">
                    <li v-for="(item,index) in foodsPlay" :key="index" class="name-wraper" @tap="toScrollTO" :id="index" >{{item.name}}</li>
                </ul>
            </betterScroll>
            <!-- <div class="food-concent" ref="betterScroll2"> -->
                <betterScroll :maxHeight="(h-40)" class="food-concent" ref="betterScrollBox" :handerScroll="handerScroll">
                <div>
                    <!-- <div v-for="(item,index) in foodsData" :key="index" class="foods-wrapper" :id="index"> -->
                    <div v-for="(item,index) in foodsPlay" :key="index" class="foods-wrapper" :id="index"> 
                        
                        <div class="name" :id="index" ref="y">{{item.name}}</div>
                        <div class="food-messsage" v-for="(items,indexs) in item.foods" :key="indexs">
                            <img :src="items.image" alt="单击查看详情" @tap="foodsDetails(item.name,items.name,items)">
                            <!-- @tap="foodsDetails(items.name)" -->
                            <div class="messsage">
                                <div>{{items.name}}</div>
                                <div>月售:{{items.sellCount}}份/  好评:{{items.rating}}%</div>
                                <div>￥{{items.price}} <span class="old" v-show="items.oldPrice">￥{{items.oldPrice}}</span></div>
                            </div>
                            <div class="play">
                                <div class="num1" @tap="num(items,true)" :id="indexs" :name="index">
                                    +
                                </div>
                                <div v-if="items.num"  class="num">
                                    {{items.num}}
                                </div>
                                <div class="num-" v-if="items.num" @tap="num(items,false)" :id="indexs">
                                    -
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </betterScroll>
            <!-- </div> -->
        </div>
        <play :play="foodList" :num="num" class="aliplay" :num0="num0"></play>
        <!-- <play class="aliplay"></play> -->

        <!-- <router-view class="foodsDetails" /> -->
        <router-view class="foodsDetails" name="foodsDetails" :num="num" :foodd="food"/>
    </div>
</template>

<script>
    import JSON_DATA from '@/common/JSON.vue'
    import betterScroll from '@/components/betterScroll'
    // import foodsDetails from '@/components/foodsDetails'
    import BScroll from 'better-scroll'
    import Vue from 'vue'
    import play from '@/components/play'
    import Nint from '@/util/Nint'
    export default {
        data(){
            return{
                // foodData:[],
                food:[],
                play:[],
                name:'',
                h:'',
                // w:''
            }
        },
        name:'foods',
        props: ['foodsPlay'],
        components:{
            play,
            betterScroll,
            // foodsDetails
        },
         watch: {

         },
        computed: {
            foodList () { // 返回所有num>0的foodsPlay的数组
                    const food=[]
                    this.foodsPlay.forEach(item => {
                    item.foods.forEach(items => {
                        if(items.num) {
                        food.push(items)
                        }
                    })
                    })
                    return food
             },
            //  food(){
            //     var food=window.localStorage.getItem('food')
            //     if(food){
            //         var foods=JSON.parse(food)
            //         console.log('food本地缓存')
            //         return foods
            //     }else{
            //         return 
            //     }
            //  }
        },
        created (){
            // this.foodData=this.foodsPlay
        },
        mounted(){  
            // this.w=document.documentElement.clientWidth-150,
            this.h=document.documentElement.clientHeight-145-30
            // setTimeout(() => {
            //     console.log('5555555555555',this.foodsPlay)
            // },2000)
            var food=window.localStorage.getItem('food')
            // console.log('444',food)
            if(food){
                this.food=JSON.parse(food)
                console.log('food本地缓存')
            }else{
                console.log('food没有选中')
            }
        },
        methods:{
            // handerTouchEnd(){
            //     console.log("鼠标/手指离开")
            // },
            foodsDetails(menu,foodName,food){
                console.log(menu+'/'+foodName)
                window.localStorage.setItem('food',JSON.stringify(food))
                this.food=food
                this.$router.push('/food/foodsDetails/'+menu+'/'+foodName)
                    .catch((e) => {
                        console.log('this.$router.push失败',e)  
                    })
            },
            handerScroll(){
                console.log("下拉刷新")
            },
            toScrollTO(e){
                var y=this.$refs.y[e.target.id]
                this.$refs.betterScrollBox.toScrollTo(-y.offsetTop)
            },
            // num(e){
            num(items,flag){
                // console.log(event._constructed)
                // if(!event._constructed) {
                //     return
                // }
                console.log(items.name)
                if(flag){
                    if(!items.num){
                        Vue.set(items,'num',1)
                    }else{
                        items.num++
                    }
                }else{
                    items.num--
                    // this.num0()
                }
                window.localStorage.setItem('foods',JSON.stringify(this.foodsPlay))
                // console.log('===',this.foodsPlay,this.foodList)
                // console.log('菜名',items.name,'数量',items.num,$event)
            },
            num0(){
                console.log('清空')
                this.foodsPlay.forEach(item =>{
                    item.foods.forEach(items => { 
                       if(items.num){
                            items.num=0
                        }
                    });
                })
                window.localStorage.setItem('foods',JSON.stringify(this.foodsPlay))
            }
           
        }
    }
</script>

<style lang="scss" scoped>
.foods{width: 100%;position: relative;background-color: white; margin:0; height: 100%;}
// .food-wrapper{height: 200px;width: 100%;position: absolute;top: 0;left: 0;}
.food-wrapper {display: flex;width: 100%;}
// .food-wrapper .food-concent{width: 100%; height: 600px; overflow: hidden; }
.food-wrapper .food-concent{ overflow: hidden; float: right;margin:0px;}
.food-wrapper .food-concent .foods-wrapper{display: block;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .play{ width: 150px;height: 25; position: absolute;right: 50px;bottom: 30px;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .play div{cursor:pointer;float: right; margin-left: 15px;}
.food-wrapper .food-concent .foods-wrapper .food-messsage{width: 100%;display: flex;height: 120px;padding: 10px;display:flex; position: relative; border-top: 1px solid #ccc;}
.food-wrapper .food-concent .foods-wrapper .food-messsage img{cursor: pointer;width: 100px;height: 100px;margin: auto 0;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .messsage{width: 200px;height: 100px;margin: auto 0;font-weight: bold;}
.messsage :nth-child(3){color: red;font-size: 20px; margin-top: 25px;}
.messsage :nth-child(2){font-size: 14px; color: #ccc;opacity: 0.8;}
.food-wrapper .food-concent .foods-wrapper .name{width: 100%;background-color:#e0dee0; height: 25px; font-size: 15px;line-height: 25px;opacity: 0.5;font-weight:bold;text-align: left;padding:0 50px;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .play .num1{background-color: blue; opacity: 0.5;color: white;height: 25px;width: 25px; border-radius: 50%;font-size: 25px;line-height: 25px;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .play .num-{background-color: red; opacity: 0.5;color: white;height: 25px;width: 25px; border-radius: 50%;font-size: 25px;line-height: 25px;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .play .num{height: 25; line-height: 25px;font-size: 15px;padding: 0;font-weight: bold;}
// .food-wrapper  .food-menu{width: 150px; overflow: hidden; margin-right: 0px;}
// .food-wrapper  .food-menu .name-wraper{width: 100%;height: 60px;background-color:#eeecee;border-bottom: 1px solid rgb(228, 224, 224); padding: 10px 0;}
// .food-wrapper  .food-menu .name-wraper .name{width: 100%; height: 30px; font-size: 15px;line-height: 30px;font-weight: bold;margin-top: 10px;}
.food-wrapper .menu-warper{height: 100%; overflow: hidden; float: left;margin: 0;width: 150px; }
.food-wrapper  .menu-warper .food-menu{ display: block; margin: 0;padding: 0;list-style: none; width: 100%;background-color: rgb(231, 229, 229);}//#ccc
.food-wrapper  .menu-warper .food-menu li{text-align: center;font-weight: bold; cursor: pointer;width: 100%;padding: 10px 0; font-size: 15px; height: 40px; line-height: 20px;border-bottom: 1px solid rgb(248, 245, 245);}
// .food-wrapper  .food-menu .name-wraper .foodsname{width: 100%;background-color: #eeecee;height: 50px;line-height: 50px;border-bottom: 1px solid #ccc;}
// .aliplay{position: absolute;bottom: 0;left: 0;}

.old{ text-decoration: line-through;color:rgb(147, 153, 159);font-size: 13px;}
.foodsDetails{position: absolute;top: -175px;right: 0;width: 100%;}           
</style>