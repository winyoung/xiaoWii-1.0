<template>
    <div>
        <div class="chengkai"></div>
        <div class="title">
            <span style="font-size:20px;color:#8f8f8f;margin-left:20px">新品开发</span>
        </div>
        <div class="new_pro_dev">
            <!-- 条件搜索 -->
            <div class="search">
                <h3 style="margin-left:30px;margin-top:10px">请输入想开发产品信息:</h3>

                <div class="search_dv">
                    <span>包装尺寸（宽 x 深 x 高）：</span><input type="number" v-model="searchData.width"> x <input type="number" v-model="searchData.length"> x <input type="number" v-model="searchData.height">
                </div>
                <div class="search_dv">
                    <span style="margin-left:42px">产品成本（$USD）:</span>
                    <input type="number" v-model="searchData.fob">
                </div>
                <div class="search_dv">
                    <span style="margin-left:60px">产品毛重（lbs）:</span>
                    <input type="number" v-model="searchData.weight">
                </div>
                <div class="search_dv">
                    <el-select clearable placeholder="选择颜色" filterable v-model="searchData.color_filter">
                        <el-option v-for="(item, index) in selectData.color_filter" :key="index" :value="item">
                        </el-option>
                    </el-select>
                    <el-select clearable placeholder="选择材质" filterable v-model="searchData.material_filter">
                        <el-option v-for="(item, index) in selectData.material_filter" :key="index" :value="item">
                        </el-option>
                    </el-select>
                    <el-select clearable placeholder="选择功能" filterable v-model="searchData.feature_filter">
                        <el-option v-for="(item, index) in selectData.feature_filter" :key="index" :value="item">
                        </el-option>
                    </el-select>
                    <el-select clearable placeholder="选择品类" filterable v-model="searchData.category_filter">
                        <el-option v-for="(item, index) in selectData.category_filter" :key="index" :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="submitBtn">
                    <button @click="submitSearchData()">确定</button>
                </div>
            </div>
            <!-- 搜索结果列表 -->
            <!-- 产品列表 -->
            <div class="proList">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column align='center' label="序号" prop="id">
                    </el-table-column>
                    <el-table-column align='center' label="图片">
                        <template slot-scope="props">
                            <img style="width:50px" :src="props.row.image" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column align='center' label="销售渠道" prop="channel">
                    </el-table-column>
                    <el-table-column align='center' label="售价" prop="price">
                    </el-table-column>
                    <el-table-column align='center' label="预估利润">
                        <template slot-scope="props">
                            <span>{{props.row.estimate_profit|keepTwoPoint1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align='center' label="预估利润率" prop="estimate_profit_margin">
                         <template slot-scope="props">
                            <span>{{props.row.estimate_profit_margin|keepTwoPoint2}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>

</template>
<style>
@import url("../../assets/css/proDev/newProDev.css");
</style>
<script>
export default {
  data() {
    return {
      baseUrl: "",
      searchData: {
        width: "",
        height: "",
        length: "",
        fob: "",
        weight: "",
        color_filter: "",
        material_filter: "",
        feature_filter: "",
        category_filter: ""
      }, //条件搜索各项数据
      selectData: {
        color_filter: [],
        material_filter: [],
        feature_filter: [],
        category_filter: []
      }, //条件搜索下拉框数据
      tableData: [] //搜索结果列表
    };
  },
  methods: {
    //条件搜索按钮提交
    submitSearchData() {
      var that = this;
      //提交数据后会拿到十个产品数据，并渲染
      this.$axios
        .get("/api/v1.0/newpro_dev/pro_list", {
          params: that.searchData
        })
        .then(res => {
            console.log(res);
          this.tableData = res.data.result;
        });
    }
  },
  mounted() {
    //获取下拉框数据
    this.$axios
      .get("/api/v1.0/newpro_dev/search_select")
      .then(res => {
        //   console.log(res.data);
        this.selectData.color_filter = res.data.result.color_filter;
        this.selectData.material_filter = res.data.result.material_filter;
        this.selectData.feature_filter = res.data.result.feature_filter;
        this.selectData.category_filter = res.data.result.category_filter;
      });
  },
  filters:{
      keepTwoPoint1(val){
          return 'US$'+val.toFixed(2);
      },
       keepTwoPoint2(val){
          return val.toFixed(2)+'%';
      }
  }
};
</script>