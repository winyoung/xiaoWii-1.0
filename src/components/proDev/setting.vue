<template>
    <div class="setting">
        这是设置页
    </div>
</template>
<style lang="less">
  .setting{
      position: absolute;
      top:100px;
       z-index: -1;
  }
</style>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        // this.$store.commit('toggleShow', {isShow: false});
        // console.log(this.$store.state.isShow, 'hotsell');
    }
}
</script>