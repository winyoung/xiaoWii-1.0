<template>
    <transition>
        <div v-show="isShow" class="box">
            <div class="hot_selling_trend_detail">
                <div class="deleteBox" @click="deleteBox()"></div>
                <div class='detail_category'>
                    <span class="detail_active" @click="toggleDetail('proDetail', $event)">商品详情</span>|
                    <span @click="toggleDetail('comments', $event)">客户评价</span>|
                    <span @click="toggleDetail('questions', $event)">客户问题</span>|
                    <span @click="toggleDetail('estimate', $event)">成本预估</span>
                </div>
                <!-- 商品详情 -->
                <div class="detail_pro" v-show="detailShow">
                    <div class="detail_pro_imgs">
                        <img :src="proImg" alt="">
                    </div>
                    <div class="detail_pro_info">
                        <table>
                            <tbody>
                                <tr v-for="(item, index) in proDetail" :key="item+index">
                                    <td colspan="2" class="info" v-text="item.category"></td>
                                    <td v-text="item.name"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- 客户评价 -->
                <div class="user_comments" v-show="commentsShow">
                    <ul>
                        <li v-for="(item,index) in userCommentsData" :key="index">
                            <div class="username" style="margin-bottom:5px">
                                <i class="iconfont icon-yonghu1"></i>
                                <span>{{item.user}}</span>
                            </div>
                            <div class="stars" style="margin-bottom:5px">
                                <div class="block">
                                    <el-rate v-model="item.rating" disabled></el-rate>
                                </div>
                            </div>
                            <div class="contents" style="margin-bottom:5px">
                                <p style="font-weight:600;margin-bottom:10px">{{item.title}}</p>
                                <p>{{item.comment}}</p>
                            </div>
                            <div class="commentsTime">
                                <p>{{item.date}}</p>
                            </div>
                        </li>
                    </ul>

                </div>
                <!-- 客户问题 -->
                <div class="user_questions" v-show="questionsShow">
                    <ul>
                        <li v-for="(item, index) in userQuestionsData" :key="item+index">
                            <div>
                                <span>问题：</span>
                                <p v-text="item.question"></p>
                            </div>
                            <div v-show="answerShow">
                                <span>回答：</span>
                                <p v-text="item.answer"></p>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 成本预估 -->
                <div class="cost_estimate" v-show="estimateShow">
                    <form>
                        <div>
                            <label>请输入FOB(单位：USD$)</label>
                            <input type="number" v-model="costEstimateData.fob">
                        </div>
                        <div>
                            <label>请输入包装长(单位：inches)</label>
                            <input type="number" v-model="costEstimateData.length">
                        </div>
                        <div>
                            <label>请输入包装宽(单位：inches)</label>
                            <input type="number" v-model="costEstimateData.width">
                        </div>
                        <div>
                            <label>请输入包装高(单位：inches)</label>
                            <input type="number" v-model="costEstimateData.height">
                        </div>
                        <div>
                            <label>请输入产品毛重（单位：pounds)</label>
                            <input type="number" v-model="costEstimateData.weight">
                        </div>
                    </form>
                    <div class="cost_estimate_submit">
                        <button  @click="estimateSubmit()">提 交</button>
                    </div>
                    <div class="cost_estimate_result">
                        <input type="text" readonly :value="costEstimateData.result">
                    </div>
                </div>
            </div>
        </div>

    </transition>
</template>
<style lang="less">
@import url("../../assets/css/reusableCom/showProDetail.css");
</style>
<script>
export default {
  data() {
    return {
      baseUrl:'',
      proImg: "",
      proDetail: [],
      answerShow:true,
      detailShow: true, //商品详情
      commentsShow: false, //客户评价
      questionsShow: false, //客户问题
      estimateShow: false, //成本预估
      starValue: [], //客户评价星星等级
      userCommentsData: [], //客户评价数据
      userQuestionsData: [],
      costEstimateData: {
        fob: null,
        length: null,
        width: null,
        height: null,
        weight: null,
        result: null
      }, //成本预估数据
      thisRoute: ""
    };
  },
  methods: {
    //删除弹出框
    deleteBox() {
      this.$emit("deletebox");
      setTimeout(() => {
        this.$router.go(-1);
      }, 300);
    },
    //切换商品详情，客户评论等
    toggleDetail(val, event) {
      //被点击的显示颜色，其他的不显示
      var childrenspan = event.target.parentNode.children;
      for (let i = 0; i < childrenspan.length; i++) {
        childrenspan[i].classList.remove("detail_active");
      }
      event.target.classList.add("detail_active");
      //显示对应部分，其他隐藏
      switch (val) {
        case "proDetail":
          this.detailShow = true;
          this.commentsShow = false;
          this.questionsShow = false;
          this.estimateShow = false;
          break;
        case "comments":
          this.detailShow = false;
          this.commentsShow = true;
          this.questionsShow = false;
          this.estimateShow = false;
          this.getUserComments();
          break;
        case "questions":
          this.detailShow = false;
          this.commentsShow = false;
          this.questionsShow = true;
          this.estimateShow = false;
          this.getUserQuestion();
          break;
        case "estimate":
          this.detailShow = false;
          this.commentsShow = false;
          this.questionsShow = false;
          this.estimateShow = true;
          break;
      }
    },
    //获取客户评论数据
    getUserComments() {
      
      var that = this;
      this.$axios
        .get("/api/v1.0/hot_sell_trend/pro_comment", {
          params: {
            proId: that.proid
          }
        })
        .then(res => {
          console.log(res);
          this.userCommentsData = res.data.result;
        });
    },
    //获取客户问题
    getUserQuestion() {
      var that = this;
      this.$axios
        .get("/api/v1.0/hot_sell_trend/user_question", {
          params: {
            proId: that.proid
          }
        })
        .then(res => {
          console.log(res);
          this.userQuestionsData = res.data.result;
        });
    },
    //成本预估数据提交
    estimateSubmit() {
        var that = this;
      this.$axios.get(
        "/api/v1.0/hot_sell_trend/cost_estimate",
        {
          params: {
            fob: that.costEstimateData.fob,
            length: that.costEstimateData.length,
            width: that.costEstimateData.width,
            height: that.costEstimateData.height,
            weight: that.costEstimateData.weight,
            proId:this.proid          }
        }
      ).then(res=>{
          console.log(res);
          this.costEstimateData.result ="US$"+res.data.result;
      });
    }
  },
  props: ["isShow", "proid"],
  mounted() {
    // var thisroute = this.$route.fullPath.split("/")[1];
    // if (thisroute == "hotSellingTrend") {
    //   this.thisRoute = "hot_sell_trend";
    // } else if (thisroute == "burstingDig") {
    //   this.thisRoute = "bursting_dig";
    // }
    //请求商品详情数据并渲染
    console.log(this.proid);
    var that = this;
    this.$axios
      .get("/api/v1.0/hot_sell_trend/pro_detail", {
        params: {
          proId: that.proid
        }
      })
      .then(res => {
          console.log(res);
        that.proImg = res.data.result.img;
        that.proDetail = res.data.result.detail;
      });
  }
};
</script>

