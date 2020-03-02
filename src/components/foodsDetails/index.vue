<template>
    <div :style="{'height':+h+'px'}" class="foodsDetails-warper">
        <betterScroll :maxHeight="h">
            <div>
                <div @click="back" class="back" @mouseover="mouseover" @mouseout="mouseout" :class="{red:flag}">
                    <img :src="r" >
                    <div> 返 回</div>
                </div>
                <div class="food-warper">
                    <img :src="food.image" alt="">
                    <div class="food-centent">
                        <div class="food">
                            <div class="f-size">{{food.name}}</div>
                            <div>月售:{{food.sellCount}}份/  好评:{{food.rating}}%</div>
                            <div class="color-red">￥{{food.price}} <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span></div>
                        </div>
                        <!-- <div class="car" v-if="food.num">
                            <amount :food="food" :num="num"></amount>
                        </div> -->
                        <!-- v-if="food.num" -->
                        <div class="car" @click="num(food,true)">
                            购买{{food.num}}
                        </div>
                    </div>
                    <div class="food-message">
                        <div>商品信息</div>
                        <div v-if="food.info">{{food.info}}</div>
                         <div v-else style="color:red;">该商品没有详情描述!</div>
                    </div>
                    <div class="ratings-warper">
                        <div class="select">
                            <div class="select-content">
                                <div :class="{blue:class1=='comment'}" @click="getComment" id="comment">全部{{comment.length}}个</div>
                                <div :class="{blue:class1=='comment1'}" @click="getComment" id="comment1">好评{{comment1.length}}个</div>
                                <div :class="{gray:class1=='comment2'}" @click="getComment" id="comment2">差评{{comment2.length}}个</div>
                            </div>
                            <div class="f" @click="getComment" id="comment3">
                                <div :class="{green:class1=='comment3'}" id="comment3">✔</div>
                                <div id="comment3">只看有内容地评价!</div>
                            </div>
                        </div>
                        <div class="ratings-centent">
                            <div class="ratings">

                            </div>
                        </div>
                    </div>
                    <comments :foodsComment="foodsComment"/>
                </div>
            </div>
        </betterScroll>
    </div>
</template>

<script>
    import amount from '@/components/amount'
    import JSON_DATA from '@/common/JSON.vue'
    import betterScroll from '@/components/betterScroll'
    import comments from '@/components/comments'
    export default {
        data(){
            return{
                // foodsData:[],
                flag:true,
                r: require("./icon/r1.png"),
                h:0,
                // foods:[],
                foods:[],
                flag:false,
                foodsComment:[],
                comment:[],
                comment1:[],
                comment2:[],
                comment3:[],
                class1:'comment',
                fooddd:[]
            }
        },
        name:'foodsDetails',
        props:{
            foodMenu:String,
            foodName:String,
            num:{
                type:Function,
                default: function(){}
            },
            foodd:{
                type:[Object,Array],
                default:[]
            },
        },
        // props:['foodName'],
        components:{
            betterScroll,
            comments,
            amount
        },
        computed: {
            food(){
                return this.foodd
            }
        },
        // create(){
        mounted(){
            // console.log(this.food)
            // var food=window.localStorage.getItem('food')
            // if(food){
            //     this.fooddd=JSON.parse(food)
            //     this.getRatings(this.fooddd)
            //     console.log('food本地缓存')
            // }else{
            //     this.fooddd=this.foodd
            //     window.localStorage.setItem('food',JSON.stringify(this.foodd))
            //     this.getRatings(this.fooddd)          
            //     console.log('food加载')
            // }
            this.h=document.documentElement.clientHeight-40
            this.getRatings(this.food)
        },
        methods:{
            mouseout(){
                this.r=require("./icon/r1.png")
                this.flag=false
            },
            mouseover(){
                this.r=require("./icon/r.png")
                this.flag=true
            },
            back(){
                this.$router.back()
            },
            getRatings(food){
                var foodsComment=food.ratings
                foodsComment.forEach(item => {
                    this.foodsComment.push({
                        username:item.username,
                        rateTime:item.rateTime,
                        rateType:item.rateType,
                        text:item.text,
                        avatar:item.avatar,
                        recommend:'',
                        score:''
                    })
                })
                // console.log(this.foodsComment)
                this.comment=this.foodsComment
                this.getData(this.foodsComment) 
            },
            getData(data){
                if(data.length>0){
                    this.comment=data
                    for(var i=0;i<data.length;i++){
                        if(data[i].rateType==0){
                            this.comment1.push(data[i])
                        }
                        if(data[i].rateType==1){
                            this.comment2.push(data[i])
                        }
                        if(data[i].text!=""){
                            this.comment3.push(data[i])
                        }
                    }
                }
            },
            getComment(e){
                var id=e.target.id
                console.log(id)
                switch (id) {
                    case 'comment1':
                        this.foodsComment=this.comment1
                        this.class1='comment1'
                        // console.log(this.foodsComment)
                        break;
                    case 'comment2':
                        this.foodsComment=this.comment2
                        this.class1='comment2'
                        // console.log(this.foodsComment)
                        break;
                    case 'comment3':
                        this.foodsComment=this.comment3
                        this.class1='comment3'
                        // console.log(this.foodsComment)
                        break;
                    default:
                        this.foodsComment=this.comment
                        this.class1='comment'
                        // console.log(this.foodsComment)
                        break;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.foodsDetails-warper{background-color: white;opacity: 1;}
.back{width:70px; border-radius: 10px; cursor: pointer; position: absolute;top: 50px;left: 50px; color: rgb(31, 28, 28); font-size: 14px;font-weight: bold;line-height: 25px;display: flex;height: 25px;}
.back img{width: 15px;height: 15px; margin: 4px 2px 5px 7px;}
.red{color: red;background-color: rgb(218, 209, 209);}
.food-warper{background-color:rgb(233, 229, 229);}
.food-warper img{width: 100%;height: auto;}
.food-warper .food-centent{background-color: white;width: 100%;height: 100px; display: inline-flex; position: relative; padding: 0 20px;box-sizing: border-box;}
.food-warper .food-centent .food{height: 100px; float: left; display: block;}
.food-warper .food-centent .food div{font-size: 13px;font-weight: bold;line-height: 20px; margin-bottom: 5px;}
.f-size{font-size: 15px !important; margin-top: 10px;}
.color-red{font-size: 15px !important; color: red !important}
.food-warper .food-centent .car{cursor: pointer; height: 24px; position: absolute;top: 50px;right: 50px; font-size: 14px;font-weight: bold; line-height: 24px; width: 70px;border-radius: 12px;background-color: #07a8e2;}
.old{ text-decoration: line-through;color:rgb(163, 163, 165);font-size: 12px;}
.food-message{background-color: white;width: 100%;min-height: 80px;margin-top: 10px;}

.font{font-size: 15px;font-weight: bold;line-height: 20px;}

.food-message div{text-align: left; width: 100%;font-size: 15px;font-weight: bold;line-height: 20px;padding: 0 10px;}
.food-message div:last-child{font-size: 13px;padding: 0 20px; color: rgb(141, 138, 138);}


.select{background-color: white;width: 100%;height: 99px;border-top: 1px solid #d3d2cf;margin-top: 10px; }
.select .select-content {width: 100%;height: 66px; display: flex;}
.select .select-content div{cursor:pointer;height: 30px; width: 80px;font-size: 13px;font-weight: bold;line-height: 30px; margin: 18px 0;margin-left: 10px;}
#comment{background-color: rgba(0,160,220,.2); margin-left: 30px; }
#comment1{background-color: rgba(0,160,220,.2);}
#comment2{background-color: rgb(161, 160, 160);}
.blue{background-color: #3464e7 !important; color: white !important;}
.green{background-color: rgb(18, 206, 18) !important; color: white !important;}
.gray{background-color:#4d555d !important; color: white !important;}
.select .f{width: 100%;height: 32px;border-top: 1px solid #dddcda;display: inline-flex;}
.select .f div{cursor:pointer;margin-left: 10px; margin-top: 6px; height: 20px;font-size: 13px;font-weight:bold;line-height: 20px; color:rgb(163, 161, 161); }
.select .f div:first-child{padding: 0; margin-top: 6px; height: 20px;width: 20px; border-radius: 50%; color: white; background-color: rgb(163, 161, 161);font-size: 15px;font-weight:bold;line-height: 20px;}
</style>