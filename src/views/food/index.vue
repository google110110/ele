<template>
    <div class="food">
        <foodHeader :seller="seller"></foodHeader>
        <!-- <div class="food-wrapper" ref="betterScroll"> -->
            <foods :foodsPlay="foodsPlay"/>
        <!-- </div> -->
    </div>
</template>

<script>
    import foodHeader from '@/components/header'
    import foods from '@/components/foods'
    import BScroll from 'better-scroll'
    // import axios from 'axios'
    export default {
        data(){
            return{
                seller:[],
                foods:[],
                foodsPlay:[]
            }  
        },
        mounted() {
            // setTimeout(() => {
               this.axios.get('http//196.128.6.23/api/seller')
                    .then(response => {
                    const result = response.data
                    if (result.code==0) {
                    this.seller = result.data
                    // this.headers.score = 3.6
                    console.log('seller请求成功')
                }
                })
                .catch(error => {
                    console.log("seller请求失败",error)
                })
            // }, 1000)
            // setTimeout(() => {
               this.axios.get('http//196.128.6.23/api/food')
                    .then(response => {
                    const result = response.data
                    if (result.code==0) {
                    this.foods = result.data
                    // this.headers.score = 3.6
                    console.log('food请求成功')
                    this.$nextTick(()=>{ 
                        this.foods.forEach(item => {
                            var foods=[]
                            item.foods.forEach(item=>{
                                foods.push({
                                    num:0,
                                    image:item.image,
                                    name:item.name,
                                    sellCount:item.sellCount,
                                    rating:item.rating,
                                    price:item.price
                                })
                            })
                            this.foodsPlay.push({
                                name:item.name,
                                foods:foods
                            })
                        });
                    })
                }
                })
                .catch(error => {
                    console.log("food请求失败",error)
                })
            // }, 1000)
        },
        name:'food',
        components:{
            foodHeader,
            foods
        }
    }
</script>

<style lang="scss" scoped>
// .food{position: relative;}
.food-wrapper{height: 600px;width: 100%;overflow: hidden;}
</style>