<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name: 'Scroller',
    props:{
        handleToScroll: {
            type: Function,
            default: function(){}
        },
        handleToTouchEnd: {
            type: Function,
            default: function(){}
        }
    },
    mounted(){
        var scroll = new BScroll(this.$refs.wrapper, {
            // tap: true,
            // mouseWheel: true,
            probeType: 1
        });

        this.scroll = scroll;

        scroll.on('scroll', (pos) => {
            this.handleToScroll(pos);
        });

        scroll.on('touchEnd', (pos) => {
            this.handleToTouchEnd(pos)
        })
       
    },
    methods: {
        refreshBScroll(){
             this.scroll.refresh()
        },
        // 跳转城市开头字母
        toScrollTop(y){
            this.scroll.scrollTo(0,y)
        }
    }
}
</script>

<style scoped>
.wrapper{
    /* 高度与父元素相同 */
    height: 100%; 
}
</style>