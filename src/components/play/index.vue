<template>
    <div class="div-warper">
        <div class="i" @click="show">
            <div class="img-warper">
                <div v-if="play2.length>0" class="n">
                    {{play2.length}}
                </div>
                <img src="./icon/car3.png" alt="">
            </div>
            <div>￥: <span style="color: red;font-size: 16px;">{{i}}元</span><span style="font-size: 12px;margin-left: 20px;">|另需配送费{{seller.deliveryPrice}}元</span></div>
            <div @click="stopClick">
                <div v-if="go>0">还差{{go}}元起送</div>
                <div v-else style="background-color: red;" @click="goPlay">去结算</div>
            </div>
        </div>
        <transition name="fade">
            <div class="qq" v-if="show1==true" :style="{'height':+(h-40)+'px'}" @click="show">
            <!-- <div class="qq" v-if="show1==true" :style="{'height':+(h-40)+'px' > -->
                <betterScroll :maxHeight="500" class="betterScroll">
                    <div @click="stopClick">
                        <div @click="num0" class="play-warper" style="color:red;font-size: 20px;" >清空</div>
                        <div v-for="(item,index) in play2" :key="index" class="play-warper">
                            <div v-if="item.num>0" class="play" :name="item.name">
                                <img :src="item.image" alt="">
                                <div>{{item.name}}</div>
                                <div>{{item.price}}</div>
                                <!-- <div>{{item.num}}</div> -->
                                <div class="num">
                                    <!-- <div class="num1" @click="addNum" :id="index"> -->
                                    <div class="num1" @tap="num(item,true,)" :id="index">
                                        +
                                    </div>
                                    <div v-if="item.num>0"  class="num-">
                                        {{item.num}}
                                    </div>
                                    <div class="num2" v-if="item.num>0" :id="index" @tap="num(item,false)">
                                        -
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </betterScroll>
            </div>
        </transition>
        <!-- <div :style="{'height':+(h-80)+'px'}" class="w"> dddddddddddddd</div> -->
    </div>
</template>

<script>
    import JSON_DATA from '@/common/JSON.vue'
    import betterScroll from '@/components/betterScroll'
    import Nint from '@/util/Nint'
    export default {
        data(){
            return{
                show1: false,
                h:'300',
                seller:[]
            }
        },
        name:'play',
        props: {
            play:{
                type:Array,
                default:[]
            },
            num:{
                type:Function,
                default: function(){}
            },
            num0:{
                type:Function,
                default: function(){}
            }
        },
        components:{
            betterScroll
        },
        mounted(){
            this.h=document.documentElement.clientHeight
            // this.w=document.documentElement.clientWidth-60
            // this.h=document.body.clientWidth 
            // console.log(this.h)
            // setTimeout(()=>{  
            //     console.log('play ',this.go)
            // },2000)

            var seller=JSON.parse(window.localStorage.getItem('seller'))
            if(seller){
            this.seller=seller 
            }else{
                alert('没有接收到商家信息,可能会导致部分资源加载失败,请刷新一下试试!')
            }
        },
        filters:{
        },
        computed: {
            play2(){
                var int= Nint.Nint(this.play)
                return int.reverse()
            },
            i(){
                var i=0
                this.play2.forEach(item => {
                    i=i+item.price*item.num
                });
                return i
            },
            go(){
                if(this.seller.minPrice){
                    return this.seller.minPrice-this.i
                }
            }
        },
        methods:{
            show(){
                this.show1=!this.show1
            },
            //阻止冒泡
            stopClick(){
                try{
                    e.stopPropagation();//非IE浏览器
                    console.log("1")
                }
                catch(e){
                    window.event.cancelBubble = true;//IE浏览器
                    console.log("0")
                } 
            },
            goPlay(){
                this.stopClick()
                console.log("请付款:",(this.i+10),"元")
            }
        }
    }
</script>

<style lang="scss" scoped>
.div-warper{width: 100%;position: relative; }
.play-warper{z-index: 9;height: 51px; width: 100%; background-color: white;opacity: 0.9; font-weight: bold;}
.play-warper .play{height: 50px; width: 100%;border-top: 1px solid rgb(104, 103, 103); padding: 0 10px;}
.play-warper .play img{height: 50px;width: 50px;float: left;}
.play-warper .play div{height: 50px;width: 150px;float: left;}
.play-warper .play .num{height: 50px;width: 100px;float: right; margin-right: 50px;}
.play-warper .play .num div{cursor:pointer;height: 24px;width: 24px;float: right; margin-top: 13px;}
.play-warper .play .num .num1{background-color: blue; opacity: 0.5;color: white;height: 24px;width: 24px; border-radius: 50%;font-size: 25px;line-height: 24px;}
.play-warper .play .num .num2{background-color: red; opacity: 0.5;color: white;height: 24px;width: 24px; border-radius: 50%;font-size: 25px;line-height: 24px;}
.play-warper .play .num .num-{font-size: 14px;font-weight: bold;line-height: 24px;}
.i{position: relative; display: flex; width: 100%;height: 40px; background-color: #343c5c;z-index: 100;}
.i .img-warper{position: absolute;bottom: 0;left: 20px; height: 54px; width:54px; border-radius: 50%; background-color: #1296db;}
.i .img-warper .n{width: 25px;height: 25px;border-radius: 50%;position: absolute;top: 0;left: 0;background-color: rgb(245, 14, 14);font-size: 17px;font-weight: bold;line-height: 25px;color: white;}
.i .img-warper img{z-index: 12; bottom: 0; height: 40px; width:40px; border-radius: 50%; margin: 6px;}
.i div:nth-child(2){ color:#f7ffff;margin-left: 100px; height: 40px;font-size: 15px;font-weight: bold;line-height: 40px;opacity: 0.9;}
.i >div:last-child{cursor: pointer; z-index: 15;text-align: center; line-height: 40px;height: 40px; width:150px;position: absolute;right: 0;top:0;  font-size: 15px;font-weight: bold;color:#f7ffff;background-color:rgb(105, 102, 102);}
.qq{bottom: 40px; z-index: 11; width: 100%; background-color:#2f384d;opacity: 0.98; position: absolute;left: 0;}// bottom: 40px;

.betterScroll{position: absolute;bottom: 0;left: 0;width: 100%;}
.w{background-color: brown;}

.fade-enter-active {
transition: all .5s ease;
//   transition: all .3s ease;
}
.fade-leave-active {
//   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter,.fade-leave-to{
//   transform: translateY(100%);
    // transform: translateY(200%);
    bottom: 900px;
    opacity: 0;
    // left: 100%;
    // transform: translateX(0);
    // transform: translateZ(0);
//   opacity: 0;
}
// .fade-leave-to{bottom: 600px;}
</style>