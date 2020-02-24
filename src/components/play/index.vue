<template>
    <div class="div-warper">
        <transition name="fade">
            <betterScroll :maxHeight="300" v-if="show1==true">
                <div class="qq">
                    <div v-for="(item,index) in play2" :key="index" class="play-warper">
                        <div v-if="item.num>0" class="play" :name="item.name">
                            <img :src="item.image" alt="">
                            <div>{{item.name}}</div>
                            <div>{{item.price}}</div>
                            <!-- <div>{{item.num}}</div> -->
                            <div class="num">
                                <div class="num1" @click="addNum" :id="index">
                                    +
                                </div>
                                <div v-if="item.num>0"  class="num-">
                                    {{item.num}}
                                </div>
                                <div class="num2" v-if="item.num>0" :id="index" @click="reduceNum">
                                    -
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </betterScroll>
        </transition>
        <div class="i" @click="show1 = !show1">总价:{{i}} 元</div>
    </div>
</template>

<script>
    import betterScroll from '@/components/betterScroll'
    import Nint from '@/util/Nint'
    export default {
        data(){
            return{
                show1: false
            }
        },
        name:'play',
        props: ['play'],
        components:{
            betterScroll
        },
        mounted(){
        },
        filters:{
        },
        computed: {
            // play1(){
            //     return this.play.reverse();
            // },
            play2(){
                var int= Nint.Nint(this.play)
                console.log('888888888',int)
                return int.reverse()
            },
            i(){
                var i=0
                this.play2.forEach(item => {
                    i=i+item.price*item.num
                });
                return i
            }
        },
        methods:{
            addNum(e){
                this.play2[e.target.id].num++
                var name=e.target.parentNode.parentNode.getAttribute("name")
                this.$emit('addNum',name);
            },
            reduceNum(e){
               this.play2[e.target.id].num--
                var name=e.target.parentNode.parentNode.getAttribute("name")
                this.$emit('reduceNum',name);
            }
        }
    }
</script>

<style lang="scss" scoped>
.div-warper{width: 100%;}
.play-warper{height: 51px; width: 100%; background-color: #ccc;opacity: 0.5; font-weight: bold;}
.play-warper .play{height: 50px; width: 100%;border-top: 1px solid rgb(104, 103, 103); padding: 0 10px;}
.play-warper .play img{height: 50px;width: 50px;float: left;}
.play-warper .play div{height: 50px;width: 150px;float: left;}
.play-warper .play .num{height: 50px;width: 100px;float: right; margin-right: 50px;}
.play-warper .play .num div{height: 24px;width: 24px;float: right; margin-top: 13px;}
.play-warper .play .num .num1{background-color: blue; opacity: 0.5;color: white;height: 24px;width: 24px; border-radius: 50%;font-size: 25px;line-height: 24px;}
.play-warper .play .num .num2{background-color: red; opacity: 0.5;color: white;height: 24px;width: 24px; border-radius: 50%;font-size: 25px;line-height: 24px;}
.play-warper .play .num .num-{font-size: 14px;font-weight: bold;line-height: 24px;}
.i{color: red; width: 100%;height: 40px; background-color: rgb(104, 103, 103);font-size: 15px;font-weight: bold;line-height: 40px;opacity: 0.5;}
.qq{width: 100%;height: 100%; transition: overflow 5s ease; background-color: red;opacity: 0.5;}



.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>