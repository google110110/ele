<template>
    <div class="food-wrapper">
        <!-- :style="{'width':+w+'px'}" -->
        <!-- <foodHeader :seller="seller"></foodHeader> -->
        <foods :foodsPlay="foodsPlay"/>
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
                foodsPlay:[],
                // w:0
            }  
        },
        name:'food',
        components:{
            foodHeader,
            foods
        },
        mounted() {
            var foods=window.localStorage.getItem('foods')
            if(foods){
                this.foods=JSON.parse(foods)
                this.getData(JSON.parse(foods)) 
                console.log('本地存储 foods')
            }else{
               this.axios.get('http//196.128.6.23/api/food')
                    .then(response => {
                    const result = response.data
                    if (result.code==0) {
                    this.foods = result.data
                    window.localStorage.setItem('foods',JSON.stringify(result.data))
                    // this.headers.score = 3.6
                    console.log('food请求成功')
                    this.$nextTick(()=>{ 
                        this.getData(result.data)
                    })
                }
                })
                .catch(error => {
                    console.log("food请求失败",error)
                })
            }
        },
         methods:{
            getData(data){
                var food=data
                food.forEach(item => {
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
            }
        }
    }
</script>

<style lang="scss" scoped>
// .food{position: relative;}
.food-wrapper{ margin: auto;}
// position: absolute;top: 0;left: 20px;
</style>