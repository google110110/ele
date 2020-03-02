<template>
    <div class="seller-warper">
        <div class="seller">
            <div>
                <div class="score-centent">
                    <div>{{sellers.name}} 总评分: {{sellers.score}}</div>
                    <div class="score">
                        <div v-if="x1!=0"><img v-for="(item,index) in x1" :key="index" src="./icon/x2.png" alt=""></div>
                        <div v-if="x2!=0"><img v-for="(item,index) in x2" :key="index" src="./icon/x1.png" alt=""></div>
                        <div v-if="(5-x1-x2)!=0"><img v-for="(item,index) in (5-x1-x2)" :key="index" src="./icon/x0.png" alt=""></div>
                    </div>
                </div>
                <div class="live">
                    <img :src="flag?one:two" @click="flag=!flag"/>
                    <div >收藏</div>
                </div>
            </div>
            <div class="message">
               <div>
                   <div>起送价</div>
                   <div class="bold">{{sellers.minPrice}}元</div>
               </div>
               <div>
                   <div>配送费</div>
                   <div class="bold">{{sellers.deliveryPrice}}元</div>
               </div>
               <div>
                   <div>配送时间</div>
                   <div class="bold">{{sellers.deliveryTime}}分钟</div>
               </div>
            </div>
        </div>
        <div class="seller-centent">
            <div class="f">
                <div>店铺公告</div>
                <div class="f1">{{sellers.bulletin}}</div>
            </div>
            <div class="description">
                <div v-for="(item,index) in sellers.supports" :key="index">
                    <div class="description-warper">
                        <img :src="item.type|type" alt="">
                        <div>{{item.description}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="seller-photos">
            <div id="seller-photos">店铺实景</div>
            <div ref="betterScroll" class="betterScroll" :style="{'width':+h+'px'}">
                <div class="pics">
                    <div v-for="(item,index) in sellers.pics" :key="index">
                        <img :src="item" alt="">
                    </div>
                    <div v-for="(item,index) in sellers.pics" :key="'a1'+index">
                        <img :src="item" alt="">
                    </div>
                    <div v-for="(item,index) in sellers.pics" :key="'a2'+index">
                        <img :src="item" alt="">
                    </div>
                    <div v-for="(item,index) in sellers.pics" :key="'a3'+index">
                        <img :src="item" alt="">
                    </div>
                    <div v-for="(item,index) in sellers.pics" :key="'a4'+index">
                        <img :src="item" alt="">
                    </div>
                    <div v-for="(item,index) in sellers.pics" :key="'a5'+index">
                        <img :src="item" alt="">
                    </div>
                    <div v-for="(item,index) in sellers.pics" :key="'a6'+index">
                        <img :src="item" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="seller-message">
            <div>商家信息</div>
            <div v-for="(item,index) in sellers.infos" :key="index">{{item}}</div>
        </div>
    </div>
</template>

<script>
    import betterScroll from '@/components/betterScroll'
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                h:0,
                true:true,
                sellers:'',
                x1:0,
                x2:0,
                flag:true,
                one:require("./icon/live1.png"),
                two:require("./icon/live.png"),
                // img:''
            }
        },
        name:'sellers',
        components:{
            betterScroll
        },
        mounted(){
            var o = document.getElementById("seller-photos");
            //获取此元素的高度
            this.h = o.offsetWidth; //高度
            // this.h=document.documentElement.clientHeight-145-30
            var sellers=window.localStorage.getItem('seller')
            // this.sellers=JSON.parse(sellers)
            // var x1=parseInt(sellers.foodScore)
            // var x2=Math.round(sellers.foodScore)-x1
            // this.x1=x1
            // this.x2=x2
            if(sellers){
                this.sellers=JSON.parse(sellers)
                var x1=parseInt(this.sellers.foodScore)
                var x2=Math.round(this.sellers.foodScore)-x1
                this.x1=x1
                this.x2=x2
                this.$nextTick(()=>{
                    console.log('444')
                    var scroll =new BScroll(this.$refs.betterScroll,{
                        scrollX:true,
                        eventPassthrough:'vertical'
                    })
                }) 
            }else{
                alert('没有接收到商家信息,可能会导致部分资源加载失败,请刷新一下试试!')
            }
        },
        methods:{

        },
        filters:{
            type(e){
                switch (e) {
                    case 0:
                       return  require("./icon/j.png")
                    break;
                    case 1:
                       return  require("./icon/z.png")
                    break;
                    case 2:
                       return  require("./icon/t.png") 
                    break;
                    case 3:
                       return  require("./icon/p.png")
                    break;
                    case 4:
                       return  require("./icon/b.png")
                    break;
                    default:
                        return ''
                        break;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.seller-warper{width: 100%; background-color: #ebe6e6;}
.seller-warper .seller{width: 100%;height: 160px; display: block; background-color:white;}
.seller-warper .seller >div:first-child{border-bottom: 1px solid rgb(245, 243, 243);width: 100%;height: 99px;}
.score-centent{float: left; display: block;height: 50px; margin-left: 20px; width: auto; margin-top: 10px;}
.score-centent div:first-child{height: 30px;font-weight: bold; font-size: 15px; line-height: 30px; text-align: left;}
.score-centent .score {margin-top: 5px;height: 20px;float: left; display: flex;}
.score-centent .score div{height: 20px; float: left; width: auto;}
.score-centent .score div img{width: 16px;height: 16px;margin-top: 2px; float: left;}
.seller .message{width: 100%;height: 60px;display: flex;justify-content: space-between;}
.seller .message >div{margin-top: 8px; height: 44px; box-sizing: border-box;width:30%;border-right:1px solid rgb(235, 231, 231);}
.seller .message div div{font-size: 15px;line-height: 20px; }
.seller .message >div:last-child{border:0;}
.bold{font-weight: bold;color: rgb(243, 193, 99);}
.live{float: right; height: 100px;width: 100px;margin-right: 100px; margin-top: 10px;}
.live img{height: 20px;width: 20px; }
.live div{font-size: 13px;font-weight: bold;line-height: 20px;width: 100px;text-align: center;}
.seller-warper .seller-centent{background-color:white;width: 100%; margin-top: 10px; border-top: 1px solid rgb(245, 243, 243)}
.seller-centent .f{padding: 10px 15px; text-align: left;font-size: 15px; font-weight: bold;line-height: 20px;min-height: 70px;}
.f1{margin-top: 5px; width: 100%; box-sizing: border-box; padding-left: 15px; color: red;font-size: 12px;font-weight: bold;line-height: 20px;}
// .description-warper{ display: block;}
.description{width: 100%; display: block !important; text-align: left; padding: 0 5px;}
.description .description-warper{display: inline-flex; border-top: 1px solid rgb(245, 243, 243);width: 100%;}
.description .description-warper img{margin-left: 20px; width:14px;height: 14px; float: left;margin-top: 18px;}
.description .description-warper div{font-size: 13px;font-weight: bold;line-height: 50px; float: left; margin-left: 5px; color: rgb(170, 168, 168);}
.seller-warper .seller-photos{background-color:white;margin-top: 10px;}
.seller-photos{width: 100%;padding: 0 20px; min-height: 200px;}
.seller-photos >div:first-child{width: 100%; font-size: 14px;font-weight: bold;line-height: 20px; text-align: left;}
.seller-photos .pics{width: auto; height: 150px; display: inline-flex;}
.seller-photos .pics >div{box-sizing: border-box; height: 150px;width: 150px;margin-right: 10px; background-color: rgb(245, 241, 241);}
.seller-photos .pics div img{height: 140px;width: 140px; margin-top: 5px;}
.betterScroll{height:150px;overflow: hidden;}
.seller-message{background-color:white;width: 100%;margin-top: 10px; padding: 0 25px;box-sizing: border-box; }
.seller-message div{font-size: 13px;font-weight: bold;line-height: 50px;text-align: left;border-top: 1px solid rgb(245, 243, 243);}
.seller-message div:first-child{font-size: 15px;}
</style>