<template>
  <div>
    <div class="chengkai"></div>
    <div class="title">
      <span style="font-size:20px;color:#8f8f8f;margin-left:20px">热卖趋势</span>
    </div>
    <div class="hot_selling_trend">
      <!-- 条件搜索 -->
      <div class="search">
        <el-select clearable v-model='selectVal.categoryVal' filterable placeholder="品类">
          <el-option v-for="(item,index) in ulForSelectData.category" :key="index" :value="item">
          </el-option>
        </el-select>
        <el-select clearable v-model='selectVal.timeVal' placeholder="期间">
          <el-option v-for="(item,index) in ulForSelectData.time" :key="index" :value="item">
          </el-option>
        </el-select>
        <el-select clearable v-model='selectVal.channelVal' filterable placeholder="渠道">
          <el-option v-for="(item,index) in ulForSelectData.channel" :key="index" :value="item">
          </el-option>
        </el-select>
        <div class="submitBtn">
          <button @click='submitSearch()'>确定</button>
        </div>
      </div>

      <!-- 图形展示 -->
      <div class="hot_selling_trend_chart">
      </div>

      <!-- 热销榜 飙升榜 -->
      <div class="hot_ranking_list">
        <span class="hot_ranking_greatsale" @click="toggleRanking('sales_sequence',$event)">热销榜</span>
        <span class="hot_ranking_greatup" @click="toggleRanking('grown_sequence', $event)">飙升榜</span>
      </div>

      <!-- 图片遮罩层 -->
      <div class="hot_selling_trend_proImg">
        <ul class="clearfix">
          <li v-for="(item, index) in hotTopImgs" :key="index">
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
      <!-- 卡片式展示 -->
      <div class="hot_selling_trend_card">
        <ul class="clearfix">
          <li v-for="(item, index) in cardData" :key="item+index">
            <div><img :src="item.images" alt="" style="width:45px;height:45px;border-radius:50%;margin-left:60px;"></div>
              <div><span style="font-weight:600;margin-left:10px">$</span><span style="font-size:40px;vertical-align:middle;margin-left:5px;">{{item.prices}}</span></div>
              <div class="card_comment_num"></div>
              <div style="padding:0 10px;"><hr></div>
                <div><span style="margin-left:10px;">历史总销量：</span><span>${{item.totalSales}}</span></div>
          </li>
        </ul>
      </div>
      <!-- 弹出框 商品详情，客户评论等 -->
      <router-view :proid="proId" :isShow="showProDeatilData" @deletebox="deleteBox"></router-view>
    </div>
  </div>

</template>
<style>
@import url("../../assets/css/proDev/hotSellingTrend.css");
</style>
<script>
// import axios from "axios";
import showProDetail from "../reusableCom/showProDetail";
import conditionSearch from "../reusableCom/conditionSearch";
export default {
  data() {
    return {
      hotTopImgs: [], //前十图片
      chartsXdata: [], //图形x轴数据
      chartsYdata: [], //图形y轴数据
      chartsYname: "销量",
      rankingName: "sales_sequence", //排行榜名称
      proId: "", //当前点击的柱形图id
      showProDeatilData: "", //子组件的弹窗的是否显示
      ulForSelectData: {
        category: [],
        time: [],
        channel: []
      }, //各个下拉框数据
      selectVal: {
        categoryVal: "",
        timeVal: "",
        channelVal: ""
      }, //input框选定数据
      cardData: []
    };
  },
  methods: {
    //条件搜素提交按钮点击
    submitSearch() {
      var that = this;

      var data = {};
      for (var k in this.selectVal) {
        data[k] = this.selectVal[k];
      }
      if (this.selectVal.categoryVal == "") data.categoryVal = 0;
      if (this.selectVal.timeVal == "") {
        data.timeVal = this.getTheDate(-30);
      }
      if (this.selectVal.channelVal == "") data.channelVal = 0;
      data.rankingName = this.rankingName;
      new Promise((resolve, reject) => {
        this.$axios
          .get("/api/v1.0/hot_sell_trend/submit_search", {
            params: data
          })
          .then(res => {
            console.log(res,'热卖趋势');
            that.chartsXdata = res.data.result.topTenId; //这里最好读取id放入x轴
            if (that.rankingName == "sales_sequence") {
              that.chartsYdata = res.data.result.topTenSales;
            } else if (that.rankingName == "grown_sequence") {
              that.chartsYdata = res.data.result.topTenUp;
            }
            that.hotTopImgs = res.data.result.topTenImgs;
            //获取五个卡片式图形数据
            var max_comments = [];
            that.cardData = [];
            for (let i = 0; i < res.data.result.topTenImgs.length - 5; i++) {
              let cards = {};
              cards.images = res.data.result.topTenImgs[i];
              cards.reviewCounts = res.data.result.reviewCounts[i];
              cards.prices = res.data.result.prices[i];
              cards.totalSales = res.data.result.totalSales[i];
              that.cardData.push(cards);
              max_comments.push(cards.reviewCounts);
            }

            let maxComment = Math.max(...max_comments);
            resolve(maxComment);
          });
      }).then(maxComment => {
        that.setEcharts(
          that,
          that.chartsXdata,
          that.chartsYdata,
          that.rankingName
        );
        for (let i = 0; i < 5; i++) {
          that.setCardEcharts(i, maxComment, that.cardData[i].reviewCounts);
        }
      });
    },
    //设置图表
    setEcharts(that, xdata, ydata, name) {
      var myChart = that.$echarts.init(
        document.querySelector(".hot_selling_trend_chart")
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: "热卖趋势"
        },
        tooltip: {},
        xAxis: {
          data: xdata
        },
        yAxis: {},
        grid: {
          bottom: "16%"
          // containLabel: true
        },
        series: [
          {
            name: name,
            type: "bar",
            data: ydata
          }
        ]
      });
      myChart.off("click");
      myChart.on("click", function(param) {
        var name = param.name;
        //xdata传入时可以放当前点击的柱状图的id；
        that.$router.push("hotSellingTrend/showProDetail");
        xdata.forEach((v, i) => {
          if (name == v) {
            // console.log(v,name,'>>>>>>>>>>>>>>>>>>>')
            // that.proDetailShow(v);
            that.proId = v;
            that.showProDeatilData = true;
          }
        });
      });
    },
    //设置卡片的评论数
    setCardEcharts(num, max, ydata) {
      var elementId = document.querySelectorAll(
        ".hot_selling_trend_card .card_comment_num"
      )[num];
      var myChart = this.$echarts.init(elementId);
      var option = {
        title: {},
        tooltip: {},
        xAxis: {
          data: ["评论"]
        },
        yAxis: {
          max: max
        },
        grid: {
          bottom: "16%",
          left: "24%",
          right: "25%",
          top: "10%"
          // containLabel: true
        },
        series: [
          {
            name: name,
            type: "bar",
            data: [ydata]
          }
        ]
      };
      myChart.setOption(option);
    },
    //切换排行榜
    toggleRanking(name, event) {
      this.rankingName = name;
      event.target.parentNode.children[0].style.border = "none";
      event.target.parentNode.children[1].style.border = "none";
      event.target.style.border = "1px solid #d2d3d8";
      event.target.style.borderBottom = "1px solid #fff";
      //根据不同排行类型获取数据并重新渲染图形
      var that = this;
      var data = {};
      for (var k in this.selectVal) {
        data[k] = this.selectVal[k];
      }
      if (this.selectVal.categoryVal == "") data.categoryVal = 0;
      if (this.selectVal.timeVal == "") {
        data.timeVal = this.getTheDate(-30);
      }
      if (this.selectVal.channelVal == "") data.channelVal = 0;
      data.rankingName = this.rankingName;
      new Promise((resolve, reject) => {
        that.$axios
          .get("/api/v1.0/hot_sell_trend/submit_search", {
            params: data
          })
          .then(res => {
            console.log(res, "热面趋势页图形数据");
            that.chartsXdata = res.data.result.topTenId;
            if (that.rankingName == "sales_sequence") {
              that.chartsYdata = res.data.result.topTenSales;
            } else if (that.rankingName == "grown_sequence") {
              that.chartsYdata = res.data.result.topTenUp;
            }
            that.hotTopImgs = res.data.result.topTenImgs;
            //获取五个卡片式图形数据
            var max_comments = [];
            that.cardData = [];
            for (let i = 0; i < res.data.result.topTenImgs.length - 5; i++) {
              let cards = {};
              cards.images = res.data.result.topTenImgs[i];
              cards.reviewCounts = res.data.result.reviewCounts[i];
              cards.prices = res.data.result.prices[i];
              cards.totalSales = res.data.result.totalSales[i];
              that.cardData.push(cards);
              max_comments.push(cards.reviewCounts);
            }

            let maxComment = Math.max(...max_comments);
            resolve(maxComment);
          });
      }).then(res => {
        // console.log( that.chartsXdata , that.chartsYdata)
        that.setEcharts(
          that,
          that.chartsXdata,
          that.chartsYdata,
          that.rankingName
        );
        for (let i = 0; i < 5; i++) {
          that.setCardEcharts(i, maxComment, that.cardData[i].reviewCounts);
        }
      });
    },
    //传入子组件的弹窗触发
    deleteBox() {
      this.showProDeatilData = false;
    },
    //获取并格式化时间
    getTheDate(day) {
      day = day || 0;
      var nowDate = new Date();
      var targetday = nowDate.getTime() + 1000 * 60 * 60 * 24 * day;
      nowDate.setTime(targetday);
      var nowYear = nowDate.getFullYear();
      var nowMonth =
        nowDate.getMonth() + 1 >= 10
          ? nowDate.getMonth() + 1
          : "0" + (nowDate.getMonth() + 1);
      // var nowDay =
      //   nowDate.getDate() >= 10 ? nowDate.getDate() : "0" + nowDate.getDate();
      nowDate = nowYear + "-" + nowMonth;
      return nowDate;
    }
  },
  beforeMount() {
    console.log("组件挂载前");
    //条件搜索的选择期间数据格式化
    var nowDate = new Date();
    for (var i = 1; i < 7; i++) {
      let timer = this.getTheDate(-i * 30);
      this.ulForSelectData.time.push(timer);
    }
  },
  mounted() {
    console.log("热卖趋势挂载完成");
    //用户新刷页面时，弹出框消失，子路由隐藏
    if (this.showProDeatilData == false) {
      this.$router.push("/hotSellingTrend");
    }
    var that = this;
    //获取条件搜索下拉框数据
    this.$axios.get("/api/v1.0/hot_sell_trend/search_select").then(res => {
      console.log(res);
      this.ulForSelectData.category = res.data.result.category;
      this.ulForSelectData.channel = res.data.result.channel;
    });

    //图形数据与显示

    this.submitSearch();
    // var that = this;
    // (function(that) {
    //   new Promise((resolve, reject) => {
    //     that.$axios
    //       .get("/api/v1.0/hot_sell_trend/chart_data", {
    //         params: {
    //           rankingName: that.rankingName
    //         }
    //       })
    //       .then(res => {
    //         resolve(res);
    //       });
    //   }).then(res => {
    //     console.log(res, "默认加载的图形数据");
    //     that.chartsXdata = res.data.result.topTenId;
    //     that.chartsYdata = res.data.result.topTenSales;
    //     that.hotTopImgs = res.data.result.topTenImgs;
    //     that.setEcharts(
    //       that,
    //       that.chartsXdata,
    //       that.chartsYdata,
    //       that.rankingName
    //     );
    //     that.setCardEcharts();
    //   });
    // })(that);
  },
  components: {
    showProDetail,
    conditionSearch
  }
  // watch: {
  //   $route(nV, oV) {
  //     console.log(nV, oV);
  //   }
  // }
};
</script>

