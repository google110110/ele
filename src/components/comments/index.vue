<template>
    <div class="coments-warper" >
        <div v-for="(item,index) in foodsComment" :key="index" class="comment-concent">
            <div class="photo">
                <img :src="item.avatar" alt="">
            </div>
            <div class="message">
                <!-- <div class="username">{{item.username}}</div> -->
                <div class="username" v-show="item.username">{{item.username}}</div>

                <!-- <div class="score"> -->
                <div class="score" v-show="item.score">
                    <div v-for="(item,index) in item.score" :key="'x2'+index">
                        <img src="./icon/x2.png" alt="">
                    </div>
                    <div v-for="(item,index) in (i-item.score)" :key="'x1'+index">
                        <img src="./icon/x0.png" alt="">
                    </div>
                </div>
                <!-- <div class="text" v-if="item.text.length>0">{{item.text}}</div> -->
                <div class="text" v-show="item.text">{{item.text}}</div>
                <!-- <div class="up"> -->
                <div class="up" v-show="item.rateType">
                    <img v-if="item.rateType==0" src="./icon/up.png" alt="">
                    <img v-if="item.rateType==1" src="./icon/upp.png" alt="">
                </div>

                <!-- <div class="recommend" v-if="item.recommend.length>0"> -->
                <div class="recommend"  v-show="item.recommend">
                    <div v-for="(items,index) in item.recommend" :key="index" >{{items}}</div>
                </div>
            </div>
            <!-- <div class="time"> -->
            <div class="time" v-show="item.rateTime">
                <div>{{item.rateTime | time}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                flag:false,
                h:0,
                i:5,
            }
        },
        name:'comments',
        props: ['foodsComment'],
        computed:{

        },
        created(){
        },
        mounted(){
            // this.$nextTick(()=>{
            // })
            // setTimeout(()=>{
                // var a=this.foodsCommentage
                // hasOwnProperty hasOwnProperty
                // console.log(a.hasOwnProperty('recommend'))
                // console.log('999999999',this.foodsComment)
            //  },2000)
        },
        methods:{
            
        },
        filters:{
            time(t){
                var date = new Date(t)
                var time1='时间:'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
                return time1
            }
        },
    }
</script>

<style lang="scss" scoped>
.coments-warper{width: 100%;background-color: white;}
.comment-concent{position: relative; width: 100%; padding: 5px;border-top: 1px solid rgb(82, 79, 79); display: inline-flex;}
.comment-concent .photo{ height: 50px;width: 50px;margin-left: 10px;float: left;}
.comment-concent .photo img{height: 30px;width: 30px; margin: 10px;}
.comment-concent .message{text-align: left; width: 400px;margin-left: 20px;float: left; display: block; padding-top: 10px;}
.comment-concent .message div{margin-bottom: 2px;}
.comment-concent .message .username{height: 20px;font-size: 13px;line-height: 20px;font-weight: bold;}
.comment-concent .message .text{font-size: 12px;line-height: 20px;font-weight: bold;}
.comment-concent .message .score{height: 12px; width: 100%;}
.comment-concent .message .score img{float: left;height: 12px;width: 12px;}
.comment-concent .message .up{width: 100%;height: 12px;margin-top: 2px;}
.comment-concent .message .up img{width: 12px;height: 12px; float: left;}
.comment-concent .message .recommend{width: 100%; margin-top: 3px;}
.comment-concent .message .recommend div{border: 1px solid rgb(180, 178, 178);margin-right: 5px; float: left;font-size: 12px;line-height: 15px;font-weight: bold;}
.comment-concent .time{position: absolute; color: rgb(119, 116, 116); bottom: 10px;right: 50px; font-size: 13px;}
</style>