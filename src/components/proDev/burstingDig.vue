<template>
    <div>
        <div class="chengkai"></div>
        <div class="title">
            <span style="font-size:20px;color:#8f8f8f;margin-left:20px">爆款挖掘</span>
        </div>
        <div class="hot_sale">
            <!-- 条件搜索 -->
            <div class="search">
                <el-select clearable v-model='selectVal.channel_filter' filterable  placeholder="渠道">
                    <el-option v-for="(item,index) in ulForSelectData.channel_filter" :key="index" :value="item">
                    </el-option>
                </el-select>
                <el-select clearable v-model='selectVal.material_filter' filterable  placeholder="材质">
                    <el-option v-for="(item,index) in ulForSelectData.material_filter" :key="index" :value="item">
                    </el-option>
                </el-select>
                <el-select clearable v-model='selectVal.color_filter' filterable  placeholder="颜色">
                    <el-option v-for="(item,index) in ulForSelectData.color_filter" :key="index" :value="item">
                    </el-option>
                </el-select>
                <el-select clearable v-model='selectVal.feature_filter' filterable  placeholder="功能">
                    <el-option v-for="(item,index) in ulForSelectData.feature_filter" :key="index" :value="item">
                    </el-option>
                </el-select>
                <div class="search_input">
                    <input type="text" placeholder="请输入关键词" v-model='selectVal.key_word_filter'>
                </div>
                <div class="submitBtn">
                    <button @click='submitSearch()'>确定</button>
                </div>
            </div>
            <!-- 产品列表 -->
            <div class="proList">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column align='center' width='45' label="序号" prop="id">
                    </el-table-column>
                    <el-table-column align='center' width="65" label="图片">
                        <template slot-scope="props">
                            <img style="width:50px" :src="props.row.image" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column align='center' width="280" label="描述" prop="title">
                    </el-table-column>
                    <el-table-column align='center' label="月销量" prop="month_sales">
                    </el-table-column>
                    <el-table-column align='center' label="总销量" prop="total_sales">
                    </el-table-column>
                    <el-table-column align='center' label="售价">
                        <template slot-scope="props">
                            <span>{{props.row.price|addUnit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align='center' width='120' label="月销售额">
                        <template slot-scope="props">
                            <span>{{props.row.month_amount|addUnit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align='center' width='99' label="评分">
                        <template slot-scope="props">
                            <div class="block">
                                <el-rate v-model="props.row.rating" disabled></el-rate>
                            </div>
                            <!-- <span style='font-size:14px;color:rgb(247, 186, 42);margin-left:5px;'>{{props.row.star}}</span> -->
                        </template>
                    </el-table-column>
                    <el-table-column align='center' width="95" label="起售时间" prop="date_first_available">
                    </el-table-column>
                    <el-table-column align='center' width='50' label="更多">
                        <template slot-scope="props">
                            <i class="iconfont icon-iconfontgengduo" :data-proid="props.row.id" @click="showDetailBox($event)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="paginations">
                <el-pagination @current-change="changePage" background layout="prev, pager, next" :total="paginations.total">
                </el-pagination>
            </div>
            <!-- 弹窗 -->
            <router-view :isShow="isDetailBoxShow" :proid="proId" @deletebox="deleteBox"></router-view>
        </div>

    </div>

</template>
<style>
@import url("../../assets/css/proDev/burstingDig.css");
</style>
<script>
import showProDetail from "../reusableCom/showProDetail";
export default {
  data() {
    return {
      isDetailBoxShow: false, //弹窗是否显示
      proId: "", //当前产品id
      ulForSelectData: {
        channel_filter: [],
        material_filter: [],
        color_filter: [],
        feature_filter: []
      }, //各个下拉框数据
      selectVal: {
        channel_filter: "",
        material_filter: "",
        color_filter: "",
        feature_filter: "",
        key_word_filter: ""
      }, //input框选定数据
      tableData: [], //产品列表数据
      paginations: {
        total: 500
      }
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
      if (this.selectVal.channel_filter == "") data.channel_filter = 0;
      if (this.selectVal.material_filter == "") data.material_filter = 0;
      if (this.selectVal.color_filter == "") data.color_filter = 0;
      if (this.selectVal.feature_filter == "") data.feature_filter = 0;
      if (this.selectVal.key_word_filter == "") data.key_word_filter = 0;
      
      //此处提交数据
      this.$axios
        .get("/api/v1.0/bursting_dig/submit_search", {
          params: data
        })
        .then(res => {
            console.log(res);
          this.tableData = res.data.result;
          this.paginations.total = res.data.total;
        });
    },

    //分页部分
    changePage(val) {
      //   console.log("被点击的页码", val);
      var data = {};
      for (var k in this.selectVal) {
        data[k] = this.selectVal[k];
      }
      if (this.selectVal.channel_filter == "") data.channel_filter = 0;
      if (this.selectVal.material_filter == "") data.material_filter = 0;
      if (this.selectVal.color_filter == "") data.color_filter = 0;
      if (this.selectVal.feature_filter == "") data.feature_filter = 0;
      if (this.selectVal.key_word_filter == "") data.key_word_filter = 0;
      data.pageNum = val;
      data.pageSize = 10;
      //发送当前页码，获取当前页数据
      this.$axios
        .get(
          "/api/v1.0/bursting_dig/pro_list/page_search",{
              params:data
          }
        )
        .then(res => {
            console.log(res);
            this.tableData = res.data.result;
        });
    },

    //显示商品详情弹窗
    showDetailBox(event) {
      this.$router.push("burstingDig/showProDetail");
      this.isDetailBoxShow = true;
      this.proId = event.target.dataset.proid;
    },
    //删除弹窗
    deleteBox() {
      this.isDetailBoxShow = false;
    }
  },
  mounted() {
    if (this.isDetailBoxShow == false) {
      this.$router.push("/burstingDig");
    }
    //获取条件搜索框的所有下拉数据
    this.$axios
      .get("/api/v1.0/bursting_dig/search_select")
      .then(res => {
          console.log(res)
        this.ulForSelectData.channel_filter = res.data.result.channel_filter;
        this.ulForSelectData.material_filter = res.data.result.material_filter;
        this.ulForSelectData.color_filter = res.data.result.color_filter;
        this.ulForSelectData.feature_filter = res.data.result.feature_filter;
      });

    //获取第一页产品列表
    this.$axios
      .get("/api/v1.0/bursting_dig/pro_list")
      .then(res => {
          console.log(res);
        this.tableData = res.data.result;
        this.paginations.total = res.data.total;
      });

      var arr = [122,32];
      arr.join(',');
      console.log(arr)
  },
  components: {
    showProDetail
  },
  filters:{
      addUnit(val){
          return "US$"+val
      }
  }
};
</script>