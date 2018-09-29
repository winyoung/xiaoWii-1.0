<template>
  <!-- 条件搜索 -->
  <div class="hot_selling_trend_search">
    <div class='hot_search '>
      <!-- <span>选择品类：</span> -->
      <slot name="title1"></slot>
      <input type="text" readonly :value="categoryInputVal" @click.prevent="toggleShow('category')">
      <i class="iconfont icon-jiantouxiangxia" @click.prevent="toggleShow('category')"></i>
      <ul class="hot_category" v-show="categoryShow">
        <li v-for="(item,index) in hotcategory" :key="index" @click.prevent="setInputVal('category',item)">
          {{item}}
        </li>
      </ul>
    </div>
    <div class='hot_search'>
      <!-- <span>选择时间：</span> -->
      <slot name="title2"></slot>
      <input type="text" readonly :value="timeInpurVal" @click.prevent="toggleShow('time')">
      <i class="iconfont icon-jiantouxiangxia" @click.prevent="toggleShow('time')"></i>
      <ul class="hot_time" v-show="timeShow">
        <li v-for="(item,index) in hottime" :key="index" @click.prevent="setInputVal('time',item)">
          {{item}}
        </li>
      </ul>
    </div>
    <div class='hot_search'>
      <!-- <span>选择渠道：</span> -->
      <slot name="title3"></slot>
      <input type="text" readonly :value="channelInputVal" @click.prevent="toggleShow('channel')">
      <i class="iconfont icon-jiantouxiangxia" @click.prevent="toggleShow('channel')"></i>
      <ul class="hot_channel" v-show="channelShow">
        <li v-for="(item,index) in hotchannel" :key="index" @click.prevent="setInputVal('channel',item)">
          {{item}}
        </li>
      </ul>
    </div>
    <input class="hot_setsearch" type="button" value="确定" @click.prevent="setSearch(categoryInputVal,timeInpurVal,channelInputVal)">
  </div>
</template>
<style lang="less">
.hot_selling_trend_search {
  z-index: 888;
  width: 100%;
  height: 50px;
  border: 1px solid #d2d3d8;
  border-radius: 5px;
  background-color: #f2fafe;
  position: relative;
  padding-left: 100px;
  .hot_search {
    width: 25%; // border: 1px solid red;
    position: absolute;
    top: 12px;
    &:nth-child(1) {
      left: 30px;
    }
    &:nth-child(2) {
      left: 280px;
    }
    &:nth-child(3) {
      left: 530px;
    }
    ul {
      width: 150px;
      position: absolute;
      left: 74px;
      box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.5);
      background: linear-gradient(to bottom, #fff, #ddf1fc);
      li {
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        &:hover {
          background: linear-gradient(to right, #fff, #ddf1fc);
          cursor: pointer;
        }
      }
    }
    input {
      border: 1px solid #d2d3d8;
      border-radius: 5px;
      width: 150px;
      height: 25px;
      padding-left: 10px;
      cursor: pointer;
    }
    i {
      position: absolute;
      left: 203px;
      top: 3px;
    }
  }
  .hot_setsearch {
    position: absolute;
    right: 100px;
    top: 12px;
    width: 90px;
    height: 25px;
    background-color: #c3ddec;
    border-radius: 5px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      categoryShow: false,
      timeShow: false,
      channelShow: false,
      hotcategory: [], //条件搜索分类下拉数据
      hottime: [], //条件搜索时间下拉数据
      hotchannel: [], //条件搜索渠道下拉数据
      categoryInputVal: "品类",
      timeInpurVal: "时间",
      channelInputVal: "渠道"
    };
  },
  methods: {
    //条件搜索的显示与数据请求
    toggleShow(val) {
      console.log(">>>>>>>>>>>>>下拉调用");
      var that = this;
      switch (val) {
        case "category":
          this.$axios
            .get("/static/json/selectJson.json")
            .then(res => {
              that.hotcategory = res.data.categoryData;
            })
            .catch(res => {
              console.log(error);
            });
          this.timeShow = false;
          this.channelShow = false;
          this.categoryShow = !this.categoryShow;
          break;
        case "time":
          var nowDate = new Date();
          this.hottime = [];
          for (var i = 0; i < 6; i++) {
            let nowYear = nowDate.getFullYear();
            let nowMonth =
              nowDate.getMonth() + 1 - i > 0
                ? nowDate.getMonth() + 1 - i
                : nowDate.getMonth() + 1 - i + 12;
            this.hottime.push(nowYear + "年" + nowMonth + "月");
          }
          this.categoryShow = false;
          this.channelShow = false;
          this.timeShow = !this.timeShow;
          break;
        case "channel":
          this.$axios
            .get("/static/json/selectJson.json")
            .then(res => {
              that.hotchannel = res.data.channelData;
            })
            .catch(res => {
              console.log(error);
            });
          this.categoryShow = false;
          this.timeShow = false;
          this.channelShow = !this.channelShow;
          break;
      }
    },
    setInputVal(val, inputVal) {
      switch (val) {
        case "category":
          this.categoryInputVal = inputVal;
          this.categoryShow = !this.categoryShow;
          break;
        case "time":
          this.timeInpurVal = inputVal;
          this.timeShow = !this.timeShow;
          break;
        case "channel":
          this.channelInputVal = inputVal;
          this.channelShow = !this.channelShow;
          break;
      }
    },
    //条件搜索
    setSearch(cate, time, channel) {
      this.$axios
        .post(
          "https://www.easy-mock.com/mock/5b8cacaa5ae7a7318a66513b/example/search",
          {
            cate: cate,
            time: time,
            channel: channel
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    // this.$store.commit('toggleShow', {isShow: false});
    // console.log(this.$store.state.isShow, 'hotsell');
  }
};
</script>