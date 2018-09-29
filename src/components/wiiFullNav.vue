<template>
    <div class="wii_full_nav" ref='fullnav'>
        <div class="wii_full_container">
            <ul class="clearfix">
                <li @click='setPath("产品开发")'>
                    <img src="../assets/images/proDev.png" alt="产品开发">
                    <span>产品开发</span>
                </li>
                <li @click='setPath("客户开发")'>
                    <img src="../assets/images/cusDev.png" alt="客户开发">
                    <span>客户开发</span>
                </li>
                <li @click='setPath("管理员")'>
                    <img src="../assets/images/admin.png" alt="管理员">
                    <span>管理员</span>
                </li>
                <li @click='setPath()'>
                    <img src="../assets/images/saleManage.png" alt="售卖管理">
                    <span>售卖管理</span>
                </li>
                <li @click='setPath()'>
                    <img src="../assets/images/storManage.png" alt="仓储管理">
                    <span>仓储管理</span>
                </li>
                <li @click='setPath()'>
                    <img src="../assets/images/setup.png" alt="设置">
                    <span>设置</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less">
.wii_full_nav{
    width: 100%;
    background: url(../assets/getting-started-top-bg.svg) no-repeat;
    background-size: cover;
    margin-top: 80px;
    .wii_full_container{
        width: 1000px;
        margin: 0 auto;
        ul{
            width: 1000px;
            position: absolute;
            padding: 50px 80px;
            li{
               float: left;
               width: 22%;
               height: 235px;
               text-align: center;
               margin: 10px 47px;
               cursor: pointer;
               padding-top: 25px;
               &:hover{
                   background-color: rgba(255, 255, 255, 0.5);
                   box-shadow: 0px 20px 60px 0px rgba(65,116,150,0.2);
                   transition: all 250ms linear;
                   img{
                       width: 160px;
                       height: 160px;
                       transition: all 250ms linear;
                   }
               }
                img{
                    width: 150px;
                    height: 150px;
                    padding: 25px;
                }
                span{
                    display: block;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    text-align: center
                }
            }
        }
    }
}
</style>
<script>
export default {
    data(){
        return{
            clientHeight:'',
        }
    },
    methods:{
      setPath(info){
          var that = this;
          switch(info){
              case "产品开发" : that.$router.push("/hotSellingTrend")
              break;
              case "客户开发" : that.$router.push("/cusDig")
              break;
              case "管理员" : location.href= '/web';
              break;
          }
      }
    },
    mounted(){
        this.clientHeight = document.documentElement.clientHeight-80 + 'px';
        this.$refs.fullnav.style.height = this.clientHeight;
    }
}
</script>

