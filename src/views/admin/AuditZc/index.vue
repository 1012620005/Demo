<template>
  <div class="Assets">
      <nav-top></nav-top>
      <div class="log-magess"><span class="arrow-center left" >审核资产报废管理</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></div>
      <div class="Assets-box">
        <div class="tabs">
          <ul class="tabs-items"  >
            <div ref="tabs"  @click="tabs">
              <li data-active="1" class="tabs-items-item">固定资产列表</li>
              <li data-active="2">低值易耗品列表</li>
            </div>
          </ul>
        </div>
        <div class="Assets-top">
          <asse-ts v-if="active == '1'" ></asse-ts>
          <scr-ap v-if="active == '2'" ></scr-ap>
        </div>
      </div>  
  </div>
</template>

<script>
import navTop from "../../common/header";
import asseTs from "./Assets";
import scrAp from "./scrap";
export default {
  name: "Assets",
  data() {
    return {
      active: "1",
    };
  },
  components: {
    navTop,
    asseTs,
    scrAp
  },
  created() {},
  mounted() {

  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    tabs(e) {
      if (e.target.tagName == "UL" || e.target.tagName == "DIV") return;
      let li = e.target;
      let lis = li.parentElement.children;
      for (let i = 0; i < lis.length; i++) {
        lis[i].className = "";
      }
      li.className = "tabs-items-item";
      this.active = e.target.attributes[1].value;
    }
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.Assets {
  height: 100%;
}
.log-magess {
  margin: 6px auto 16px;
  position: relative;
  background-color: #fff;
  height: 50px;
  width: 1200px;
  color: #000;
  font-size: 16px;
}
.log-magess .arrow-center {
  display: inline-block;
  margin-left: 38px;
  height: 46px;
  border-bottom: 4px solid #208af5;
  line-height: 50px;
}
.log-magess .arrow-right {
  position: absolute;
  right: 10px;
  top: 16px;
  cursor: pointer;
}
.Assets-box {
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 40px;
  background-color: #fff;
}
.Assets-top {
  margin: 0 auto;
  width: 1160px;
  padding-top: 20px;
}
.tabs {
  height: 40px;
  background-color: #eef1f6;
  text-align: left;
  overflow: hidden;
}
.tabs-items {
  margin-left: -1px;
  border-bottom: 1px solid #dfe6ec;
  height: 39px;
}
.tabs-items li {
  float: left;
  width: 120px;
  line-height: 40px;
  height: 40px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
.tabs-items-item {
  background-color: #fff;
  border-right: 1px solid #dfe6ec;
  border-top: 1px solid #dfe6ec;
  border-left: 1px solid #dfe6ec;
  color: #208af5;
  transition: background-color 0.3s ease-in;
}
</style>