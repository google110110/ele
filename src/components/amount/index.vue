<template>
    <div class="play">
        <div class="num1" @click="num(food,true,$event)" :id="indexs">
            +
        </div>
        <div v-show="food.num"  class="num">
            {{food.num}}
        </div>
        <div class="num-" v-show="food.num" @click="num(food,false,$event)">
            -
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            num:{
                type:Function,
                default: function(){}
            },
            food:{
                type:[Array,Object],
                default:[]
            },
        }
    }
</script>

<style lang="scss" scoped>
.play{ width: 150px;height: 25;}
.play div{cursor:pointer;float: right; margin-left: 15px;}
.play .num1{background-color: blue; opacity: 0.5;color: white;height: 25px;width: 25px; border-radius: 50%;font-size: 25px;line-height: 25px;}
.play .num-{background-color: red; opacity: 0.5;color: white;height: 25px;width: 25px; border-radius: 50%;font-size: 25px;line-height: 25px;}
.play .num{height: 25; line-height: 25px;font-size: 15px;padding: 0;font-weight: bold;}
</style>