<template>
  <div>
    <div class="chengkai"></div>
    <div class="title">
      <span style="font-size:20px;color:#8f8f8f;margin-left:20px">客户挖掘</span>
    </div>
    <div class="cus_dig">
      <!-- 条件搜索 -->
      <div class="search">
        <div class="search_list">
          <h3 style="color:#999;margin-bottom:5px">品类：</h3>
          <el-checkbox-group v-model="checkedList.product_category">
            <el-checkbox v-for="item in allList.product_category" :label="item" :key="item" :disabled="item==='BAR STOOL'||item==='DINING CHAIR'">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="search_list">
          <h3 style="color:#999;margin-bottom:5px">区域：</h3>
          <el-checkbox-group v-model="checkedList.area">
            <el-checkbox v-for="item in allList.area" :label="item" :key="item" :disabled="item==='TX'||item==='GA'||item==='WA'">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="search_list">
          <h3 style="color:#999;margin-bottom:5px">客户类型：</h3>
          <el-checkbox-group v-model="checkedList.category">
            <el-checkbox v-for="item in allList.category" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

      <!-- 条件标记 -->
      <div class="mark">
        <h3>已选条件:</h3>
        <div class="mark_list clearfix">
          <div class="fl" v-for="(item,index) in checkedList.product_category" :key="item">
            <b>品类:</b>
            <em>{{item}}</em>
            <i class="iconfont icon-shanchudelete30" @click="deleteMark(index, 'category')"></i>
          </div>
          <div class="fl" v-for="(item,index) in checkedList.area" :key="item">
            <b>区域:</b>
            <em>{{item}}</em>
            <i class="iconfont icon-shanchudelete30" @click="deleteMark(index, 'area')"></i>
          </div>
          <div class="fl" v-for="(item,index) in checkedList.category" :key="item">
            <b>客户类型:</b>
            <em>{{item}}</em>
            <i class="iconfont icon-shanchudelete30" @click="deleteMark(index, 'cusType')"></i>
          </div>
        </div>
        <h3 style="margin-top:5px;text-align:right">搜索结果：
          <span>共
            <i style="color:#e4393c" v-text="paginations.total"></i>条</span>
        </h3>
        <div class="clearAllMark" @click="clearAllMark()">【清空全部】</div>
      </div>

      <!-- 产品列表 -->
      <div class="proList">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align='center' label="图片">
            <template slot-scope="props">
              <img style="width:50px" :src="props.row.image_url" alt="">
            </template>
          </el-table-column>
          <el-table-column align='center' label="客户类型" prop="category">
          </el-table-column>
          <el-table-column align='center' label="店铺名" prop="name">
          </el-table-column>
          <el-table-column align='center' label="地址" prop="address">
          </el-table-column>
          <el-table-column align='center' label="评分">
            <template slot-scope="props">
              <div class="block">
                <el-rate v-model="props.row.rating" disabled></el-rate>
              </div>
              <!-- <span style='font-size:14px;color:rgb(247, 186, 42);margin-left:5px;'>{{props.row.star}}</span> -->
            </template>
          </el-table-column>
          <el-table-column align='center' label="详情">
            <template slot-scope="props">
              <i class="iconfont icon-iconfontgengduo" :data-proid="props.row.id" @click="showProDetail($event)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="paginations">
        <el-pagination @current-change="changePage" background layout="prev, pager, next" :total="paginations.total">
        </el-pagination>
      </div>

      <!-- 弹窗 客户详情 -->
      <router-view :proid="proId" :isshow="isShow" @closebox="closeBox"></router-view>
    </div>
  </div>
</template>
<script>
import cusDigProDetail from "../reusableCom/cusDigProDetail";
//复选框全部数据
const product_category = ["RECLINER", "OFFICE CHAIR", "BAR STOOL", "DINING CHAIR"];
const area = ["CA", "NY", "TX", "GA", "WA"];
const category = [
  "Furniture Store",
  "Home Goods Store",
  "Store",
  "General Contractor"
];
export default {
  data() {
    return {
      checkedList: {
        product_category: [],
        area: [],
        category: []
      }, //选中时的数据
      allList: {
        product_category,
        area,
        category
      }, //全部待选项
      tableData: [], //搜索结果列表
      paginations: {
        total: 500
      }, //分页
      proId: "", //客户id
      isShow: false
    };
  },
  methods: {
    //发送条件数据，请求产品列表
    getProList() {
      var that = this;
      var data= {};
      data.product_category= that.checkedList.product_category.join(',');
      data.area= that.checkedList.area.join(',');
      data.category= that.checkedList.category.join(',');
      this.$axios
        .get("/api/v1.0/cus_dig/pro_list", {
          params: data
        })
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.result;
          this.paginations.total = res.data.total;
        });
    },

    //条件标记删除
    deleteMark(index, name) {
      // console.log(index,name);
      switch (name) {
        case "category":
          this.checkedList.product_category.splice(index, 1);
          break;
        case "area":
          this.checkedList.area.splice(index, 1);
          break;
        case "cusType":
          this.checkedList.category.splice(index, 1);
          break;
      }
    },
    clearAllMark() {
      this.checkedList.category = [];
      this.checkedList.area = [];
      this.checkedList.cusType = [];
    },

    //分页
    changePage(val) {
      var that = this;
      var data= {};
      data.product_category= that.checkedList.product_category.join(',');
      data.area= that.checkedList.area.join(',');
      data.category= that.checkedList.category.join(',');
      data.pageNum = val;
      data.pageSize = 10;
      this.$axios.get('/api/v1.0/cus_dig/pro_list/page_search',{
        params:data
      }).then(res=>{
        console.log(res);
        this.tableData = res.data.result;
      })
    },

    //商品详情展示
    showProDetail(e) {
      this.$router.push("cusDig/cusDigProDetail");
      this.proId = e.target.dataset.proid;
      this.isShow = true;
    },

    //弹窗是否显示
    closeBox() {
      this.isShow = false;
      setTimeout(() => {
        this.$router.go(-1);
      }, 300);
    }
  },
  watch: {
    "checkedList.product_category"(nv, ov) {
      this.getProList();
    },
    "checkedList.area"(nv, ov) {
      this.getProList();
    },
    "checkedList.category"(nv, ov) {
      this.getProList();
    }
  },
  mounted() {
    if (this.isShow == false) {
      this.$router.push("/cusDig");
    }
    var that = this;
    //获取全部产品数据
    this.getProList();
    if (this.$route.path == "/cusDig/cusDigProDetail") {
      this.isShow = true;
    }
  },
  components: {
    cusDigProDetail
  }
};
</script>
<style>
@import url("../../assets/css/cusDev/cusDig.css");
</style>


