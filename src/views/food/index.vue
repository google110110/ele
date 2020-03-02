<template>
    <div class="food-wrapper">
        <!-- :style="{'width':+w+'px'}" -->
        <!-- <foodHeader :seller="seller"></foodHeader> -->
        <foods :foodsPlay="foods"/>
    </div>
</template>

<script>
    // import JSON_DATA from '@/common/JSON.vue'
    import foodHeader from '@/components/header'
    import foods from '@/components/foods'
    import BScroll from 'better-scroll'
    // import axios from 'axios'
    export default {
        data(){
            return{
                seller:[],
                foods:[],
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
                // JSON_DATA.FOODS=this.foods
                // this.getData(JSON.parse(foods)) 
                console.log('本地存储 foods')
            }else{
               this.axios.get('http//196.128.6.23/api/food')
                    .then(response => {
                    const result = response.data
                    if (result.code==0) {
                    this.foods = result.data
                    //测试
                    // this.foods.forEach(item =>{
                    //     item.foods.forEach(items => { 
                    //         items.num=0
                    //     });
                    // })
                    window.localStorage.setItem('foods',JSON.stringify(this.foods))
                    console.log('food请求成功')
                    // this.$nextTick(()=>{ 
                    //     this.getData(result.data)
                    // })
                }
                })
                .catch(error => {
                    console.log("food请求失败",error)
                })
            }
        },
         methods:{
          
        }
    }
</script>

<style lang="scss" scoped>
// .food{position: relative;}
.food-wrapper{ margin: auto;}
// position: absolute;top: 0;left: 20px;
</style>