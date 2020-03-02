<template>
    <div>
        <div class="div1">
            <div class="score-centent">
                    <div>{{seller.name}} 总评分: {{seller.score}}</div>
                    <div class="score">
                        <div v-if="x1!=0"><img v-for="(item,index) in x1" :key="index" src="./icon/x2.png" alt=""></div>
                        <div v-if="x2!=0"><img v-for="(item,index) in x2" :key="index" src="./icon/x1.png" alt=""></div>
                        <div v-if="(5-x1-x2)!=0"><img v-for="(item,index) in (5-x1-x2)" :key="index" src="./icon/x0.png" alt=""></div>
                    </div>
            </div>
            <div class="seller-centent">
                <div class="f">
                    <div>店铺公告</div>
                </div>
                <div class="description">
                    <div v-for="(item,index) in seller.supports" :key="index">
                        <div class="description-warper">
                            <img :src="item.type|type" alt="">
                            <div>{{item.description}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seller-message">
                <div>商家信息</div>
                <div v-for="(item,index) in seller.infos" :key="index">{{item}}</div>
            </div>
        </div>    
    </div>
</template>

<script>
    export default {
        data(){
            return{
                x1:0,
                x2:0
            } 
        },
        name:'Details',
        props: ['seller'],
        mounted(){
            console.log(this.seller);
            var x1=parseInt(this.seller.foodScore)
            var x2=Math.round(this.seller.foodScore)-x1
            this.x1=x1
            this.x2=x2
            // setTimeout(()=>{
            //     console.log('==',this.seller);
            // },2000)
            
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
.div1{opacity: 0.7;}
.seller-centent{background-color: white; width: 100%; margin-top: 5px;}
.seller-centent .f{padding: 10px 15px; font-size: 17px; font-weight: bold;line-height: 20px;}
.description{width: 100%; display: block !important;padding: 0 5px;}
.description .description-warper{display: inline-flex; width: 100%; justify-content: center;}
.description .description-warper >div:first-child{border: 0;}
.description .description-warper img{margin-left: 20px; width:14px;height: 14px;margin-top: 18px;}
.description .description-warper div{border-top: 1px solid rgb(245, 243, 243);font-size: 13px;font-weight: bold;line-height: 50px; color: rgb(59, 57, 57);}
.seller-message{margin-top: 5px;background-color: white;width: 100%; padding: 0 25px;box-sizing: border-box; }
.seller-message div{font-size: 13px;font-weight: bold;line-height: 50px;border-top: 1px solid rgb(245, 243, 243);}
.seller-message div:first-child{font-size: 15px;}

.score-centent{margin-top: 10px; background-color: white;justify-content: center; width: 100%; display: block;height: 70px;}
.score-centent div:first-child{height: 30px;font-weight: bold; font-size: 17px; line-height: 30px; }
.score-centent .score {margin-top: 5px;height: 20px;justify-content: center; display: flex;}
.score-centent .score div{height: 20px; float: left; width: auto;}
.score-centent .score div img{width: 16px;height: 16px;margin-top: 2px; float: left;}
</style>