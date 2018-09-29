import Vue from 'vue'
import Router from 'vue-router'
import mainView from '@/components/mainView'
import hotSellingTrend from '@/components/proDev/hotSellingTrend'
import burstingDig from '../components/proDev/burstingDig.vue'
import newProDev from '../components/proDev/newProDev.vue'
import minePro from '../components/proDev/minePro.vue'
import proManage from '../components/proDev/proManage.vue'
import setting from '../components/proDev/setting.vue'
import showProDetail from '../components/reusableCom/showProDetail.vue'
import cusDig from '../components/cusDev/cusDig.vue'
import cusDigProDetail from '../components/reusableCom/cusDigProDetail.vue'
import saleDate from '../components/saleManage/saleDate.vue'
import saleChannel from '../components/saleManage/saleChannel.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainView',
      component: mainView,
      children:[
        {
          path: 'hotSellingTrend',
          component: hotSellingTrend,
          children:[
            {path:'showProDetail',component:showProDetail}
          ]
        },//热卖趋势
        {
          path: 'burstingDig',
          component: burstingDig,
          children:[
            {path:'showProDetail',component:showProDetail}
          ]
        },//爆款挖掘
        {
          path: 'newProDev',
          component: newProDev
        },//新品开发
        {
          path: 'minePro',
          component: minePro
        },//我的产品
        {
          path: 'proManage',
          component: proManage
        },//产品管理
        {
          path: 'setting',
          component: setting
        },//设置
        {
          path: 'cusDig',
          component: cusDig,
          children:[
            {path:'cusDigProDetail',component:cusDigProDetail}
          ]
        },//客户挖掘
        {
          path: 'saleDate',
          component: saleDate,
          // children:[
          //   {path:'cusDigProDetail',component:cusDigProDetail}
          // ]
        },//售卖管理-根据日期
        {
          path: 'saleChannel',
          component: saleChannel,
        },//售卖管理-根据渠道
      ]
    }
  ]
})
