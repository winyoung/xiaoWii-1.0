<template>
  <div>
    <div class="chengkai"></div>
    <div class="title">
      <span style="font-size:20px;color:#8f8f8f;margin-left:20px">售卖管理-日期选择</span>
    </div>
    <div class="sale_date">
      <div class="date">
        <!-- 条件搜索 -->
        <div class="date_search">
          <span class="search_title" style="font-size:18px;color:#000;">日期选择:</span>
          <!-- 可供选择的按钮列表 -->
          <div class="search_list clearfix">
            <el-radio-group fill="rgba(248, 164, 39, 1)" v-model="radioVal">
              <el-radio-button label="今天"></el-radio-button>
              <el-radio-button label="近7天"></el-radio-button>
              <el-radio-button label="近30天"></el-radio-button>
              <el-radio-button label="近半年"></el-radio-button>
              <el-radio-button label="近一年"></el-radio-button>
              <el-radio-button label="自定义"></el-radio-button>
            </el-radio-group>
          </div>
          <!-- 自定义时间 -->
          <transition name="dateshow">
            <div class="choose_date" v-show="showDate">
              <el-date-picker v-model="setDateVal" type="daterange" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </transition>
          <!-- 查询按钮 -->
          <div class="submit_search">
            <button @click="submitSearch()">查询</button>
          </div>
        </div>
        <!-- 销售概况 -->
        <div class="date_overview">
          <div>
            <span style="font-size:18px;color:#000;font-weight:600 ">销售概况：</span>
            <span v-text="overviewTime"></span>
          </div>
          <div class="overview_detail">
            <ul class="clearfix">
              <li>
                <p>订单商品品种数</p>
                <p v-text="overview.cateNumber"></p>
              </li>
              <li>
                <p>订单商品总量</p>
                <p v-text="overview.totalNumber"></p>
              </li>
              <li>
                <p>订单总销售额</p>
                <p v-text="overview.totalSales"></p>
              </li>
              <li>
                <p>每个订单平均商品数</p>
                <p v-text="overview.averageProNumber"></p>
              </li>
              <li>
                <p>每个订单平均销售额</p>
                <p v-text="overview.averageSales"></p>
              </li>
            </ul>
          </div>
        </div>

        <!-- 结果列表 -->
        <div class="date_prolist">
          <h2 style="font-size:18px;color:#000;margin-bottom:10px">订单详情：</h2>
          <!-- <div class="export_excel">导出到excel表</div> -->
          <el-table :data="tableData" stripe style="width: 100%" ref="exportTable">
            <el-table-column prop="id" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="channel" label="渠道" align="center">
            </el-table-column>
            <el-table-column prop="listNum" label="订单编号" align="center">
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center">
            </el-table-column>
            <el-table-column prop="category" label="订单商品种类数" align="center">
            </el-table-column>
            <el-table-column prop="proNumber" label="订单商品数量" align="center">
            </el-table-column>
            <el-table-column prop="price" label="订单销售额" align="center">
            </el-table-column>
          </el-table>
          <el-pagination @current-change="changePage" background layout="prev, pager, next" :total="paginations.total">
          </el-pagination>
        </div>
        <!-- 销售对比 -->
        <div class="date_sale_compare">
          <h2 style="font-size:18px;color:#000;margin-bottom:10px">销售对比：</h2>
          <div class="charts" ref="myChart"></div>
        </div>
      </div>
    </div>
  </div>

</template>
<style>
@import url("../../assets/css/saleManage/saleDate.css");
</style>
<script>
export default {
  data: function() {
    return {
      radioVal: "今天", //默认选中的日期
      tableData: [], //订单详情列表数据
      paginations: {
        total: 500
      },
      setDateVal: "", //自定义日期值
      showDate: false, //日期控件的显示与隐藏
      overview: {
        cateNumber: "1", //订单商品品种数
        totalNumber: "2", //订单商品总量
        totalSales: "US$111", //订单总销售额
        averageProNumber: "4", //每个订单平均商品数
        averageSales: "US$12" //每个订单平均销售额
      }, //销售概况数据
      overviewTime: "",
      startDate: "",
      endDate: ""
    };
  },
  methods: {
    //获取起止日期
    getStartAndEnd() {
      this.endDate = this.getTheDate();
      switch (this.radioVal) {
        case "今天":
          this.startDate = this.getTheDate();
          console.log(this.startDate, this.endDate);
          break;
        case "近7天":
          this.startDate = this.getTheDate(-7);
          console.log(this.startDate, this.endDate);
          break;
        case "近30天":
          this.startDate = this.getTheDate(-30);
          console.log(this.startDate, this.endDate);
          break;
        case "近半年":
          this.startDate = this.getTheDate(-182);
          console.log(this.startDate, this.endDate);
          break;
        case "近一年":
          this.startDate = this.getTheDate(-365);
          console.log(this.startDate, this.endDate);
          break;
        case "自定义":
          this.startDate = this.setDateVal[0];
          this.endDate = this.setDateVal[1];
          console.log(this.startDate, this.endDate);
          break;
      }
    },
    //条件搜索提交
    submitSearch: function() {
      this.getStartAndEnd();
      //提交当前搜索条件
      var that = this;
      this.overviewTime = this.startDate + "至" + this.endDate;
      this.$axios
        .get("/api/v1.0/sale_manage/sale_date", {
          params: {
            startDate: this.startDate,
            endDate: this.endDate
          }
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.result.prolist;
          this.overview = res.data.result.overview;
        });
    },

    //绘图
    setCharts: function() {
      // var startDate = this.getTheDate(-365);
      // var endDate = this.getTheDate();
      var thisYearData, lastYearData;
      this.$axios.get("/api/v1.0/sale_manage/sale_date_chart").then(res => {
        console.log(res);
        thisYearData = res.data.result.thisYearData;
        lastYearData = res.data.result.lastYearData;
      });
      //绘制图形
      var myChart = echarts.init(this.$refs.myChart);
      var option = {
        grid: {
          left: "3%",
          right: "4%",
          top: "18%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          data: ["今年", "去年"]
        },
        tooltip: {
          trigger: "item"
        },
        xAxis: {
          type: "category",
          name: "月份",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {
          type: "value",
          name: "销售额US$",
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "今年",
            type: "line",
            data: thisYearData
          },
          {
            name: "去年",
            type: "line",
            data: lastYearData
          }
        ]
      };
      myChart.setOption(option);
    },
    //分页
    changePage(val) {
      console.log(val);
      this.$axios.get("/api/v1.0/sale_manage/sale_date_page", {
        params: {
          startDate: this.startDate,
          endDate: this.endDate,
          pageNum: val,
          pageSize: 10
        }
      }).then(res=>{
        console.log(res);
      });
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
      var nowDay =
        nowDate.getDate() >= 10 ? nowDate.getDate() : "0" + nowDate.getDate();
      nowDate = nowYear + "-" + nowMonth + "-" + nowDay;
      return nowDate;
    }
  },
  watch: {
    radioVal: function(nv) {
      if (nv == "自定义") {
        this.showDate = true;
      } else {
        this.showDate = false;
        this.setDateVal = "";
      }
    }
  },
  mounted: function() {
    //页面加载完成 请求数据
    var that = this;
    console.log("挂载完成");
    //页面挂在完成，即渲染默认数据
    this.submitSearch(); //默认获取‘今天’相关数据
    this.setCharts(); //图形数据
    window.onresize = function() {
      that.$echarts.init(that.$refs.myChart).resize();
    };
  }
};
</script>

