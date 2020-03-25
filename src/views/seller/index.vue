<template>
    <div class="div">
        <betterScroll :maxHeight="h">
            <div class="sellers">
                <sellers></sellers>
            </div>
        </betterScroll>
    </div>
</template>

<script>
    import betterScroll from '@/components/betterScroll'
    import sellers from '@/components/sellers'
    export default {
        data(){
            return{
                h:0
            }
        },
        name:'seller',
        components:{
            sellers,
            betterScroll
        },
        mounted() {
            this.h=document.documentElement.clientHeight-145-30
        }
    }
</script>

<style lang="scss" scoped>
.div{width: 100%;height: 100%;background-color: white;}
</style>