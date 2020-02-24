<template>
    <div class="foods">
        <div class="food-wrapper" >
            <div class="food-menu" ref="betterScroll">
                <div>
                    <div v-for="(item,index) in foodsPlay" :key="index" class="name-wraper" @tap="toScrollTO" :id="index" >
                        <div class="name" :id="index" >{{item.name}}</div>
                        <!-- <div class="foodsname" v-for="(items,index) in item.foods" :key="index">{{items.name}}</div> -->
                    </div>
                </div>
            </div>
            <div class="food-concent" ref="betterScroll2">
                <div>
                    <div v-for="(item,index) in foodsPlay" :key="index" class="foods-wrapper" :id="index">  
                        <div class="name" :id="index" ref="y">{{item.name}}</div>
                        <div class="food-messsage" v-for="(items,index) in item.foods" :key="index">
                            <img :src="items.image" alt="">
                            <div class="messsage">
                                <div>{{items.name}}</div>
                                <div>月售:{{items.sellCount}}份/  好评:{{items.rating}}%</div>
                                <div>￥{{items.price}}</div>
                            </div>
                            <div class="play">
                                <div class="num1" @click="num" :id="index">
                                    +
                                </div>
                                <div v-if="items.num>0"  class="num">
                                    {{items.num}}
                                </div>
                                <div class="num-" v-if="items.num>0" @click="num1" :id="index">
                                    -
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <play :play="play" @addNum="addNum" @reduceNum="reduceNum" class="aliplay"></play>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import Vue from 'vue'
    import play from '@/components/play'
    import Nint from '@/util/Nint'
    export default {
        data(){
            return{
                play:[],
                name:'',
                h:''
            }
        },
        name:'foods',
        props: ['foodsPlay'],
        components:{
            play
        },
        mounted(){  
            this.h=document.body.clientWidth 
            setTimeout(() => {
                this.scroll =new BScroll(this.$refs.betterScroll,{
                    tap:true,
                    probeType:1,
                    // movingDirectionY:-1
                })
                this.scroll2 =new BScroll(this.$refs.betterScroll2)
                // console.log(this.$refs.betterScroll)
            },1000)

        },
        methods:{
            toScrollTO(e){
                 var y=this.$refs.y[e.target.id]
                this.scroll2.scrollTo(0,-y.offsetTop,1000)
                // console.log(e.target.id)
                // console.log(y.offsetTop)
            },
            num(e){
                var a = document.getElementById(e.target.id).parentNode.parentNode.parentNode
                var id=e.target.parentNode.parentNode.parentNode.id
                this.foodsPlay[id].foods[e.target.id].num++
                this.playPush(this.foodsPlay[id].foods[e.target.id])
                // console.log(this.foodsPlay[id].foods[e.target.id].name,this.foodsPlay[id].foods[e.target.id].num)
            },
            num1(e){
                var a = document.getElementById(e.target.id).parentNode.parentNode.parentNode
                var id=e.target.parentNode.parentNode.parentNode.id
                this.foodsPlay[id].foods[e.target.id].num--
                this.playPush1(this.foodsPlay[id].foods[e.target.id])
            },
            playPush(foods){
                var foods=foods
                for(var i=0;i<=this.play.length;i++){
                    if(i==this.play.length){
                        this.play.push({
                            name:foods.name,
                            price:foods.price,
                            num:foods.num,
                            image:foods.image
                        })
                        break   
                    }
                    if(this.play!=null&&foods.name==this.play[i].name){
                        // console.log('num')
                        this.play[i].num++
                        break
                    }
                }
                // this.play=Nint.Nint(this.play)
            },
            playPush1(foods){
                var foods=foods
                for(var i=0;i<this.play.length;i++){
                    if(this.play!=null&&foods.name==this.play[i].name){
                        if(this.play[i].num>0){
                             this.play[i].num--
                             break
                        } 
                    }
                }
                this.play=Nint.Nint(this.play)
            },
            addNum(e){
                console.log(e)
                this.name=e
                this.foodsPlay.forEach(item=> {
                    // console.log(item)
                    item.foods.forEach(items=>{
                        if(items.name==e){
                            items.num++
                        }
                    })
                });
            },
            reduceNum(e){
                console.log(e)
                this.name=e
                this.foodsPlay.forEach(item=> {
                    // console.log(item)
                    item.foods.forEach(items=>{
                        if(items.name==e){
                            items.num--
                        }
                    })
                });
                // this.play=Nint.Nint(this.play)
            },
        }
    }
</script>

<style lang="scss" scoped>
.foods{width: 100%;position: relative;background-color: white;}
// .food-wrapper{height: 200px;width: 100%;position: absolute;top: 0;left: 0;}
.food-wrapper {display: flex;}
.food-wrapper .food-concent{width: 100%; height: 600px; overflow: hidden; }
.food-wrapper .food-concent .foods-wrapper{display: block;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .play{ width: 150px;height: 25; position: absolute;right: 50px;bottom: 30px;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .play div{cursor:pointer;float: right; margin-left: 15px;}
.food-wrapper .food-concent .foods-wrapper .food-messsage{width: 100%;display: flex;height: 120px;padding: 10px;display:flex; position: relative; border-top: 1px solid #ccc;}
.food-wrapper .food-concent .foods-wrapper .food-messsage img{width: 100px;height: 100px;margin: auto 0;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .messsage{width: 200px;height: 100px;margin: auto 0;font-weight: bold;}
.messsage :nth-child(3){color: red;font-size: 20px; margin-top: 25px;}
.messsage :nth-child(2){font-size: 14px; color: #ccc;opacity: 0.8;}
.food-wrapper .food-concent .foods-wrapper .name{width: 100%;background-color:#eeecee; height: 25px; font-size: 15px;line-height: 25px;opacity: 0.5;font-weight:bold;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .play .num1{background-color: blue; opacity: 0.5;color: white;height: 25px;width: 25px; border-radius: 50%;font-size: 25px;line-height: 25px;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .play .num-{background-color: red; opacity: 0.5;color: white;height: 25px;width: 25px; border-radius: 50%;font-size: 25px;line-height: 25px;}
.food-wrapper .food-concent .foods-wrapper .food-messsage .play .num{height: 25; line-height: 25px;font-size: 15px;padding: 0;font-weight: bold;}
.food-wrapper  .food-menu{width: 150px;height: 600px; overflow: hidden; margin-right: 0px;}
.food-wrapper  .food-menu .name-wraper{width: 100%;height: 60px;background-color:#eeecee;border-bottom: 1px solid rgb(228, 224, 224); padding: 10px 0;}
.food-wrapper  .food-menu .name-wraper .name{width: 100%; height: 30px; font-size: 15px;line-height: 30px;font-weight: bold;margin-top: 10px;}
// .food-wrapper  .food-menu .name-wraper .foodsname{width: 100%;background-color: #eeecee;height: 50px;line-height: 50px;border-bottom: 1px solid #ccc;}
.aliplay{position: absolute;bottom: 0;left: 0;}
</style>