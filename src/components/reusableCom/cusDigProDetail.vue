<template>
  <transition>
    <div class="cus_dig_detail" v-show="isshow">
      <div class="box">
        <div class="close" @click="closeBox"></div>
        <h1 style="font-size:18px;padding-left:10px;margin-top:6px;">客户详情</h1>
        <div class="carousel">
          <el-carousel trigger="click" height="300px" arrow="always" >
            <el-carousel-item v-for="(item,index) in resultData.images" :key="item+index">
              <div :style='"background-image:url("+item+")"' class="bgImg"></div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="other_detail clearfix">
          <p><img src="../../assets/iconfont/u7.png" alt="" style="width:30px;">
            <span v-text="resultData.telephone"></span>
          </p>
          <p><img src="../../assets/iconfont/u10.png" alt="" style="width:30px;">
            <span v-text="resultData.email"></span>
          </p>
          <p><img src="../../assets/iconfont/u13.png" alt="" style="width:30px;">
            <span v-text="resultData.website"></span>
          </p>
          <p><img src="../../assets/iconfont/u17.png" alt="" style="width:30px;">
            <span v-text="resultData.facebook"></span>
          </p>
          <p><img src="../../assets/iconfont/u23.png" alt="" style="width:30px;">
            <span v-text="resultData.instagram"></span>
          </p>
          <p><img src="../../assets/iconfont/u26.png" alt="" style="width:30px;">
            <span v-text="resultData.twitter"></span>
          </p>
          <p><img src="../../assets/iconfont/u20.png" alt="" style="width:30px;">
            <span v-text="resultData.linkedin"></span>
          </p>
          <p><img src="../../assets/iconfont/u32.png" alt="" style="width:30px;">
            <span v-text="resultData.applause_rate"></span>
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>
<style>
@import url("../../assets/css/reusableCom/cusDigProDetail.css");
</style>
<script>
export default {
  data() {
    return {
      resultData: {
        images: [
          "http://117.78.28.109/amazon/8150/186118.jpg",
          "http://117.78.28.109/wayfair/22980/200425.jpg",
          "http://117.78.28.109/wayfair/1494/179745.jpg"
        ], //轮播图片
        telephone: "", //客户电话
        email: "", //客户邮箱
        website: "", //客户网址
        facebook: "", //客户facebook
        instagram: "",
        twitter: "",
        linkedin: "",
        applause_rate: ""
      }
    };
  },
  props: ["isshow", "proid"],
  methods: {
    closeBox() {
      this.$emit("closebox");
    }
  },
  mounted() {
    //请求数据 参数 customer_id
    this.$axios
      .get("/api/v1.0/cus_dig/pro_list/pro_detail", {
        params: {
          customer_id: this.proid
        }
      })
      .then(res => {
        console.log(res);
        this.resultData = res.data.result;
      });
  }
};
</script>

