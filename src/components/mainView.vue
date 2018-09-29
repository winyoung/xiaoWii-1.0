<template>
  <div>
    <div class="main_view">
      <!-- 全屏导航 -->
      <wii-full-nav v-show="isShow"></wii-full-nav>
      <!-- 头部 -->
      <wii-header></wii-header>
      <!-- 头部导航 -->
      <wii-main-nav></wii-main-nav>
      <!-- 子组件：产品开发，客户管理等 -->
      <router-view></router-view>
    </div>
    <!-- 请求数据时的过渡动画 -->
    <div class="transitionBgbox"><img src="../assets/5-121204193R0-50.gif" alt=""></div>
  </div>
</template>

<script>
import wiiFullNav from "./wiiFullNav";
import wiiHeader from "./wiiHeader";
import wiiMainNav from "./wiiMainNav";
export default {
  name: "mainView",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      isShow: true
    };
  },
  mounted() {
    // 添加请求拦截器
    var bgBox = document.querySelector('.transitionBgbox');
    this.$axios.interceptors.request.use(function(config) {
      // 在发送请求之前做些什么
      console.log("正在请求数据");
      bgBox.style.display = 'block';
      return config;
    },function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

    // 添加响应拦截器
    this.$axios.interceptors.response.use(function(response) {
      // 对响应数据做点什么
      console.log("数据请求完成");
      bgBox.style.display = 'none';
      return response;
    },function (error) {
    // 对请求错误做些什么
    bgBox.style.display = 'none';
    alert('请求错误');
    return Promise.reject(error);
  });

    // console.log("mainView组件挂载完成");
    if (this.$route.path != "/") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  },
  updated() {
    // console.log("mainView组件更新了");
    if (this.$route.path != "/") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  },
  methods: {},
  components: {
    wiiFullNav,
    wiiHeader,
    wiiMainNav
  }
};
</script>

<style scoped>
@import url("../assets/css/mainView.css");
</style>
