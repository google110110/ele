<template>
    <div class="div">
        <betterScroll :maxHeight="h">
            <div>
                <div class="x-warper">
                    <div class="x">
                        <div class="score-content">
                            <div>{{seller.score}}</div>
                            <div>商家总评分</div>
                            <div>高于周边商家<span style="color:#f2b615;">{{seller.rankRate}}</span>%</div>
                        </div>
                        <div class="seller-content">
                           <div class="foodScore">
                               <div>商品评分:{{seller.foodScore}}</div>
                               <div v-if="x1!=0"><img v-for="(item,index) in x1" :key="index" src="./icon/x2.png" alt=""></div>
                               <div v-if="x2!=0"><img v-for="(item,index) in x2" :key="index" src="./icon/x1.png" alt=""></div>
                               <div v-if="(5-x1-x2)!=0"><img v-for="(item,index) in (5-x1-x2)" :key="index" src="./icon/x0.png" alt=""></div>
                            </div> 
                           <div class="foodScore">    
                               <div>服务评分:{{seller.serviceScore}}</div>
                               <div v-if="xx1!=0"><img v-for="(item,index) in xx1" :key="index" src="./icon/x2.png" alt=""></div>
                               <div v-if="xx2!=0"><img v-for="(item,index) in xx2" :key="index" src="./icon/x1.png" alt=""></div>
                               <div v-if="(5-xx1-xx2)!=0"><img v-for="(item,index) in (5-xx1-xx2)" :key="index" src="./icon/x0.png" alt=""></div>
                            </div> 
                           <div>配送时间:{{seller.deliveryTime}}分钟</div> 
                        </div>
                    </div>
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
                </div>
                <comments :foodsComment="foodsComment"/>
            </div>
        </betterScroll>
    </div>
</template>

<script>
    import comments from '@/components/comments'
    import betterScroll from '@/components/betterScroll'
    export default {
        data(){
            return{
                x1:0,
                x2:0,
                xx1:0,
                xx2:0,
                foodsComment:[],
                h:0,
                comment:[],
                comment1:[],
                comment2:[],
                comment3:[],
                class1:'comment',
                class:'blue3',
                seller:[]
            }
        },
        name:'comment',
        components:{
            comments,
            betterScroll
        },
        computed: {
        },
        mounted(){
            var seller=JSON.parse(window.localStorage.getItem('seller'))
            if(seller){
            this.seller=seller 
            var x1=parseInt(seller.foodScore)
            var x2=Math.round(seller.foodScore)-x1
            this.x1=x1
            this.x2=x2
            x1=parseInt(seller.serviceScore)
            x2=Math.round(seller.serviceScore)-x1
            this.xx1=x1
            this.xx2=x2
            }else{
                alert('没有接收到商家信息,可能会导致部分资源加载失败,请刷新一下试试!')
            }
            this.h=document.documentElement.clientHeight-145-30
            // foodsComment数据
            var foodsComment=window.localStorage.getItem('foodsComment')
            if(foodsComment){
                this.foodsComment=JSON.parse(foodsComment) 
                console.log('本地存储 foodsComment')
                this.getData(this.foodsComment)
            }else{
                this.axios.get('http//196.128.6.23/api/comment').then(response => {
                    const result = response.data
                    if (result.code==0) {
                        this.foodsComment = result.data
                        window.localStorage.setItem('foodsComment',JSON.stringify(result.data))
                        this.getData(result.data)
                    }
                }).catch(error => {
                        console.log("comment请求失败",error)
                    })
            }
        },
        methods:{
            getData(data){
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
            },
            getComment(e){
                var id=e.target.id
                console.log(id)
                switch (id) {
                    case 'comment1':
                        this.foodsComment=this.comment1
                        this.class1='comment1'
                        break;
                    case 'comment2':
                        this.foodsComment=this.comment2
                        this.class1='comment2'
                        break;
                    case 'comment3':
                        this.foodsComment=this.comment3
                        this.class1='comment3'
                        break;
                    default:
                        this.foodsComment=this.comment
                        this.class1='comment'
                        break;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.div{background-color: white;}
.x-warper{width: 100%;height: 250px;background-color: rgb(236, 234, 234);}
.x-warper .x{background-color: white;width: 100%;height: 139px;border-bottom: 1px solid #d3d2cf; margin-bottom: 10px; display: flex;}
.x-warper .x .score-content{margin-top: 5px; margin-right: 3%; width: 17%;height: 90%;display: block; border-right: 1px solid #d3d1d1; box-sizing: border-box;}
.x-warper .x .score-content div{width: 100%;height: 25%; font-size: 14px;color: rgb(77, 73, 73); text-align: center;}
.x-warper .x .score-content div:first-child{height: 30%;font-size: 20px;font-weight: bold;color: #f2b615;padding-top: 15px;}
.x-warper .x .seller-content{margin-top: 5px;width: 80%;height: 90%;}
.x-warper .x .seller-content >div{width: 100%;height: 30%; font-size: 15px;color: rgb(39, 38, 38); text-align: left; font-weight: bold; padding-top: 15px;box-sizing: border-box;}
.x-warper .x .seller-content .foodScore div{height: 20px; float: left; line-height: 20px;}
.x-warper .x .seller-content .foodScore div:first-child{margin-right: 10px}
.x-warper .x .seller-content .foodScore div img{width: 16px;height: 16px;margin-top: 2px; float: left;}
.x-warper .select{background-color: white;width: 100%;height: 99px;border-top: 1px solid #d3d2cf;}
.x-warper .select .select-content {width: 100%;height: 66px; display: flex;}
.x-warper .select .select-content div{cursor:pointer;height: 40px; width: 80px;font-size: 15px;font-weight: bold;line-height: 40px; margin: 13px 0;margin-left: 10px;}
#comment{background-color: rgba(0,160,220,.2); margin-left: 30px; }
#comment1{background-color: rgba(0,160,220,.2);}
#comment2{background-color: rgb(161, 160, 160);}
.blue{background-color: #3464e7 !important; color: white !important;}
.green{background-color: rgb(18, 206, 18) !important; color: white !important;}
.gray{background-color:#4d555d !important; color: white !important;}
.x-warper .select .f{width: 100%;height: 32px;border-top: 1px solid #c7c6c4;display: inline-flex;}
.x-warper .select .f div{cursor:pointer;margin-left: 10px; margin-top: 6px; height: 20px;font-size: 13px;font-weight:bold;line-height: 20px; color:rgb(163, 161, 161); }
.x-warper .select .f div:first-child{padding: 0; margin-top: 6px; height: 20px;width: 20px; border-radius: 50%; color: white; background-color: rgb(163, 161, 161);font-size: 15px;font-weight:bold;line-height: 20px;}
</style>