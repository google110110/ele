<template>
    <div ref="betterScroll" class="betterScroll" :style="{'max-height':+maxHeight+'px'}">
        <slot/>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name:'betterScroll',
        props: ['maxHeight'],
        mounted(){
            this.scroll =new BScroll(this.$refs.betterScroll,{
                tap:true,
                probeType:1,
            })
        }
    }
</script>
<style lang="scss" scoped>
.betterScroll{overflow: hidden;width: 100%;}
</style>