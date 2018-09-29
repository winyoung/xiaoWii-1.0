<template>
    <div class="wii_main_nav">
        <div class="wii_nav_container">
            <ul class="clearfix wii_main_subnav">
                <li>
                    <!-- <router-link to='/hotSellingTrend'> -->
                        <span>产品开发</span>
                    <!-- </router-link> -->
                    <ul>
                        <li @click='setPath("热卖趋势")'>热卖趋势</li>
                        <li @click='setPath("爆款挖掘")'>爆款挖掘</li>
                        <li @click='setPath("新品开发")'>新品开发</li>
                        <!-- <li @click='setPath("我的产品")'>我的产品</li>
                        <li @click='setPath("产品管理")'>产品管理</li>
                        <li @click='setPath("设置")'>设置</li> -->
                    </ul>
                </li>
                <li>
                    <span>客户开发</span>
                    <ul>
                        <li @click='setPath("客户挖掘")'>客户挖掘</li>
                        <!-- <li>客户管理</li> -->
                    </ul>
                </li>
                 <li>
                    <span>后台管理</span>
                    <ul>
                        <li @click='setPath("web")'>管理员</li>
                        <!-- <li>客户管理</li> -->
                    </ul>
                </li>
                <!-- <li>
                    <span>仓储管理</span>
                    <ul :style="{width:cangchuwidth}">
                        <li>Showroom Management</li>
                        <li>Showroom Order Management</li>
                        <li>库存统计</li>
                        <li>Warehouse Management</li>
                        <li>Stock Package Management</li>
                        <li>Stock Move Management</li>
                        <li>Product Stock Management</li>
                    </ul>
                </li>
                <li>
                    <span>售卖管理</span>
                    <ul>
                        <li>根据日期</li>
                        <li>根据渠道</li>
                        <li>根据产品</li>
                    </ul>
                </li>
                <li>
                    <span>后台管理</span>
                    <ul :style="{width:admwidth}">
                        <li>Sales Market</li>
                        <li>Promotion Channel</li>
                        <li>ProFile Tag</li>
                        <li>User Profile</li>
                    </ul>
                </li>
                <li>
                    <span> 设 置</span>
                    <ul>
                        <li>用户</li>
                        <li>翻译</li>
                    </ul>
                </li> -->
            </ul>
        </div>

    </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "this is wii nav!!!",
      cangchuwidth: "230px",
      admwidth: "155px"
    }
  },
  methods: {
      setPath(info){
          var that = this;
          switch(info){
              case '热卖趋势': that.$router.push('/hotSellingTrend') 
              break;
              case '爆款挖掘': that.$router.push('/burstingDig') 
              break;
              case '新品开发': that.$router.push('/newProDev') 
              break;
              case '我的产品': that.$router.push('/minePro') 
              break;
              case '产品管理': that.$router.push('/proManage') 
              break;
              case '设置': that.$router.push('/setting') 
              break;
              case '客户挖掘': that.$router.push('/cusDig') 
              break;
              case 'web': location.href = '/web' 
              break;
          }
      }
  }
}
</script>
<style lang="less">
.wii_main_nav {
  z-index:999;
  width: 100%;
  height: 42px;
  background: linear-gradient(#fff, #ddf1fc);
  position: fixed;
  top: 50px;
  .wii_nav_container {
    width: 1000px;
    margin: 0 auto;
    
    .wii_main_subnav {
      & > li {
        float: left;
        height: 42px;
        line-height: 42px;
        margin-right: 20px;
        padding: 0 10px;
        position: relative;
        cursor: pointer;
        &:hover {
          border-radius: 5px;
          box-shadow: 0 0 15px -5px black;
          & > ul {
            display: block;
          }
        }
        & > ul {
          display: none;
          position: absolute;
          left: 0;
          min-width: 55px;
          box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.5);
          background: linear-gradient(to bottom, #fff, #ddf1fc);
         
          li {
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            &:hover {
              background: linear-gradient(to right, #fff, #ddf1fc);
            }
          }
        }
      }
    }
  }
}
</style>
