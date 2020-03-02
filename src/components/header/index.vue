<template>
    <div class="div-wrapper">
        <div :style="{'background-image':'url('+seller.avatar+')' }" class="div"></div>
        <div class="header">
            <div class="content-wrapper">
                <div class="img">
                    <img :src="seller.avatar" alt="">
                </div>
                <div class="message">
                    <div class="name"><img src=".\icon\brand@2x.png" alt=""><div>{{seller.name}}</div></div>
                    <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟</div>
                    <div class="favourable">
                    <div v-if="seller.supports"><img src=".\icon\decrease_1@2x.png" alt=""><div>{{seller.supports[0].description}}</div></div>
                    <div v-if="seller.supports"><img src=".\icon\discount_1@2x.png" alt=""><div>{{seller.supports[1].description}}</div></div>
                        <!-- <div v-for="(item,index) in seller.supports" :key="index">{{item.description}}</div> -->
                    </div>
                </div>
                <div v-if="seller.pics" @click="flag=!flag">详情 {{seller.pics.length}} ></div>
            </div>
            <div class="infos">
                <img src=".\icon\bulletin@2x.png" alt=""><div v-for="(item,index) in seller.infos" :key="index">{{item}}</div>
            </div>
        </div>
        <transition name="fade">
            <!-- <div v-if="flag" > 
                 <betterScroll :maxHeight="h"> -->
                    <div class="details" :style="{'min-height':+h+'px'}" v-if="flag">
                        <Details :seller="seller"/>
                        <div @click="flag=!flag" class="x">
                            <div>X</div>
                        </div>
                    </div>
                <!-- </betterScroll>
            </div> -->
        </transition>
    </div>
</template>

<script>
    import betterScroll from '@/components/betterScroll'
    import Details from '@/components/details'
    export default {
        data(){
            return{
                h:0,
                flag:false
            }
        },
        name:'foodHeader',
        props: ['seller'],
        components:{
            Details,
            betterScroll
        },
        mounted(){
            this.h=document.documentElement.clientHeight
            //  setTimeout(() => {
            //      console.log("seller",this.seller.pics)
            //  },2000)
            
        },
        methods:{
            details(){
                console.log('Details')
            }
        }
    }
</script>

<style lang="scss" scoped>
.div-wrapper{position: relative;width: 100%;height: 145px;}
.div{ width: 100%; height: 145px; filter: blur(2px);opacity: 0.8;background-repeat: no-repeat;background-position: center;background-size: cover;}
.header{ width: 100%;height: 145px; padding: 0; position: absolute; top: 0;left: 0;}
.header .content-wrapper{ height: 100px;height: 100px;width: 100%; padding: 10px;font-size: 10px;font-weight: bold;color: #060606;opacity: 0.8; display: flex;position: relative;margin: 0;}
.header .content-wrapper .img{width: 98px;height: 98px; margin: auto 0 ;margin-right: 30px;}
.header .content-wrapper .img img{width: 100%; }
.header .content-wrapper .message{width: 200px; display: block;}
.header .content-wrapper .favourable{height: 20px; margin-top: 5px; font-size: 12px;line-height: 20px;}
.header .content-wrapper .favourable div{display: flex;}
.header .content-wrapper .favourable img{height: 12px;border-radius: 2px;margin-top: 4px;}
.header .content-wrapper .message .name{height: 30px;font-size: 17px;line-height: 30px;font-weight: bold; display: flex;}
.header .content-wrapper .message .name img{height: 20px;margin-right: 5px; border-radius: 2px; margin-top: 5px;}
.header .content-wrapper .message .description{font-size: 14px;line-height: 20px;}
.header .content-wrapper >div:last-child{cursor:pointer;border-radius: 5px;width: 50px;height: 20px; background-color:rgb(22, 22, 22); margin-left: 10px;position: absolute;bottom: 20px;right: 20px;line-height: 20px;opacity: 0.5;font-weight: bold;color: blanchedalmond;}
.header .infos{margin: 0;height: 20px;width: 100%;font-size: 14px;font-weight: bold;color: #060606;opacity: 0.6; border-top: 1px solid #242323; display:flex; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.header .infos img{height: 16px;margin-right: 5px;border-radius: 2px;margin-top: 2px;}
.details{z-index: 1000; position: absolute;top: 0;right: 0;width: 100%;height: 100%; background-color: #17243a;opacity: 0.9;}
.x{width: 100%;height: 50px;position: absolute;bottom: 20px;right: 0;}
.x div{cursor: pointer;background-color: #121b2b; height: 50px;width: 50px; border-radius: 50%;font-size: 30px;font-weight: bold;line-height: 50px; margin: auto; color: white;opacity: 0.8;}
.fade-enter-active {
transition: all .5s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter,.fade-leave-to{
    opacity: 0;
}
</style>
