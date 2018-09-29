// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import store from './vuex/store'
import axios from 'axios'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入初始化样式表
import './assets/css/wiiBase.css'
Vue.use(ElementUI);
Vue.use(vuex)
Vue.prototype.$axios = axios;
// Vue.prototype.$axios.defaults.timeout = 6000;
Vue.prototype.$axios.defaults.baseURL = 'https://okyoo.xwetech.com';
Vue.prototype.$echarts = echarts;
// vuex.use(axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
