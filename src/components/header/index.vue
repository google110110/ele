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
                    <div><img src=".\icon\decrease_1@2x.png" alt=""><div>{{seller.supports[0].description}}</div></div>
                    <div><img src=".\icon\discount_1@2x.png" alt=""><div>{{seller.supports[1].description}}</div></div>
                        <!-- <div v-for="(item,index) in seller.supports" :key="index">{{item.description}}</div> -->
                    </div>
                </div>
                <div>详情 {{seller.pics.length}} ></div>
            </div>
            <div class="infos">
                <img src=".\icon\bulletin@2x.png" alt=""><div v-for="(item,index) in seller.infos" :key="index">{{item}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'headers',
        props: ['seller'],
        mounted(){
             setTimeout(() => {
                 console.log("seller",this.seller.pics.length)
             },2000)
            
        }
    }
</script>

<style lang="scss" scoped>
.div-wrapper{position: relative;width: 100%;height: 145px;}
.div{ width: 100%; height: 145px; filter: blur(3px);opacity: 1;background-repeat: no-repeat;background-position: center;background-size: cover;}
.header{ width: 100%;height: 145px; padding: 0;border-bottom: 1px solid #ccc; position: absolute; top: 0;left: 0;}
.header .content-wrapper{height: 100px;height: 100px;width: 100%; padding: 10px;font-size: 10px;font-weight: bold;color: #060606;opacity: 0.8; display: flex;position: relative;margin: 0;}
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
</style>