<template>
    <div>
        <foodHeader :seller="seller"></foodHeader>
    </div>
</template>

<script>
    import foodHeader from '@/components/header'
    // import axios from 'axios'
    export default {
        data(){
            return{
                seller:{}
            }  
        },
        mounted() {
            // setTimeout(() => {
               this.axios.get('http//196.128.6.23/api/seller')
                    .then(response => {
                    const result = response.data
                    if (result.code===0) {
                    this.seller = result.data
                    // this.headers.score = 3.6
                    console.log('api请求成功', this.seller)
                }
                })
                .catch(error => {
                    console.log("api请求失败",error)
                })
            // }, 1000)
        },
        name:'food',
        components:{
            foodHeader
        }
    }
</script>

<style lang="scss" scoped>

</style>