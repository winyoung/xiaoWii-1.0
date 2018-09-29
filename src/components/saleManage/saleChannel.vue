<template>
  <div>
    <div class="chengkai"></div>
   
    <div class="sale_channel">
      <div class="channel">
        <!-- 条件搜索 -->
        <div class="channel_search">
          <span class="search_title" style="font-size:18px;color:#000;">渠道选择:</span>
          <!-- 可供选择的按钮列表 -->
          <div class="search_list clearfix">
            <el-radio-group fill="rgba(248, 164, 39, 1)" v-model="radioVal">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="Amazon"></el-radio-button>
              <el-radio-button label="Wayfair"></el-radio-button>
              <el-radio-button label="Walmart"></el-radio-button>
              <el-radio-button label="eBay"></el-radio-button>
              <el-radio-button label="Okyoo"></el-radio-button>
              <el-radio-button label="Target"></el-radio-button>
              <el-radio-button label="Overstock"></el-radio-button>
              <el-radio-button label="Houzz"></el-radio-button>
              <el-radio-button label="更多"></el-radio-button>
            </el-radio-group>
          </div>

          <!-- 查询按钮 -->
          <div class="submit_search">
            <button @click="submitSearch()">查询</button>
          </div>
        </div>
        <!-- 渠道销量分布 -->
        <div class="channel_overview">
          <div>
            <span style="font-size:18px;color:#000;font-weight:600 ">渠道销量分布：</span>
            <span>近30天</span>
          </div>
          <div class="overview_charts" ref="saleCharts">
          </div>
        </div>
        <!-- 趋势图 -->
        <div class="channel_sale_trend">
          <div>
            <span style="font-size:18px;color:#000;font-weight:600 ">渠道销量分布：</span>
            <span>近30天</span>
          </div>
          <div class="trend_charts" ref="trendCharts">
          </div>
        </div>

        <!-- 结果列表 -->
        <div class="channel_prolist">
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
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>
<style>
@import url("../../assets/css/saleManage/saleChannel.css");
</style>

<script>
export default {
  data: function() {
    return {
      radioVal: "全部", //默认选中的渠道
      tableData: [
        {
          id: "1",
          channel: "王小虎",
          listNum: "xxx-xxx",
          date: "2018-9-21",
          category: "2",
          proNumber: "20",
          price: "US$1192"
        },
        {
          id: "1",
          channel: "王小虎",
          listNum: "xxx-xxx",
          date: "2018-9-21",
          category: "2",
          proNumber: "20",
          price: "US$1192"
        },
        {
          id: "1",
          channel: "王小虎",
          listNum: "xxx-xxx",
          date: "2018-9-21",
          category: "2",
          proNumber: "20",
          price: "US$1192"
        }
      ] //订单详情列表数据
    };
  },
  methods: {
    //条件搜索提交
    submitSearch: function() {
      //提交当前搜索条件
      var that = this;
      var data = {};
      this.$axios
        .get("https://okyoo.xwetech.com/api/v1.0/sales/general_data")
        .then(res => {
          console.log(res);
        });
    },

    //绘制渠道销量图
    setSaleCharts() {
      var mySaleCharts = this.$echarts.init(this.$refs.saleCharts);
      var option = {
        color: ["rgba(0, 204, 255, 1)"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "Amazon",
              "Wayfair",
              "Walmart",
              "eBay",
              "Okyoo",
              "Target",
              "Overstock",
              "Houzz",
              "others"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220, 122, 400]
          }
        ]
      };
      mySaleCharts.setOption(option);
    },
    //绘制趋势图
    setTrendCharts() {
      var myTrendCharts = this.$echarts.init(this.$refs.trendCharts);
      var option = {
        color:["rgba(253, 171, 89, 1)"],
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true
          }
        ]
      };
      myTrendCharts.setOption(option);
    }
  },
  watch: {
    radioVal: function(nv) {
      if (nv == "自定义") {
      } else {
      }
    }
  },
  mounted: function() {
    //页面加载完成 请求数据
    var that = this;
    console.log("挂载完成");
    //页面挂在完成，即渲染默认数据
    this.setSaleCharts();
    this.setTrendCharts();
  }
};
</script>
