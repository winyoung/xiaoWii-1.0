<template>
    <div class="wii_header">
        <div class="wii_header_container clearfix">
            <div class="company_logo fl">
                <a href="javascript:;" @click="goToFirstPage()">
                    <img src="../assets/company_logo.png" alt="">
                </a>
            </div>
            <div class="wii_header_info fr clearfix">
                <div class="wii_email">
                    <i class="iconfont icon-39"></i>
                    <span>收件箱</span>
                </div>
                <div class="wii_message">
                    <i class="iconfont icon-xinxi"></i>
                    <span>聊天</span>
                </div>
                <div class="wii_person">
                    <i class="iconfont icon-gerenfill"></i>
                    <span>个人中心</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "this is wii header!!!"
    }
  },
  methods:{
    goToFirstPage(){
      this.$router.push('/')
    }
  }
};
</script>

<style lang="less">
.wii_header {
  z-index:999;
  width: 100%;
  height: 50px;
  background: linear-gradient(#fff, #ddf1fc);
  //   border-radius: 0 0 20px 20px;
  // background-color: #2041ba;
  position: fixed;
  top: 0;
  // border-bottom: 1px solid rgb(116, 152, 252);
  .wii_header_container {
    width: 1000px;
    height: 50px;
    margin: 0 auto;
    .company_logo {
      width: 50px;
      height: 50px;
      a {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .wii_header_info {
      width: 300px;
      height: 50px;
      vertical-align: middle;
      & > div {
        float: left;
        height: 50px;
        line-height: 50px;
        margin-left: 25px;
        cursor: pointer;
        &:hover {
          border-radius: 5px;
          box-shadow: 0 0 15px -5px black;
        }
        // span,i{
        //     color: white;
        // }
      }
    }
  }
}
</style>




