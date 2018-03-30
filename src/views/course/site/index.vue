<template>
  <div class="setsite">
      <nav-top></nav-top>
      <div class="log-magess">
        <!-- <el-menu :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">场地设置</el-menu-item>
          <el-menu-item index="2">班级分配场地</el-menu-item>
          <el-menu-item index="3">特殊学科分配场地</el-menu-item>
        </el-menu> -->
        <el-tabs v-model="activeIndex" @tab-click="handleSelect">
          <el-tab-pane label="场地设置" name="1"></el-tab-pane>
          <!-- <el-tab-pane label="班级分配场地" name="2"></el-tab-pane>
          <el-tab-pane label="特殊学科分配场地" name="3"></el-tab-pane> -->
        </el-tabs>
        <span class="arrow-right" @click="back" >返回<i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="magessBox clear">
          <set-site v-if = "activeIndex == '1'"></set-site>
          <!-- <allot-site v-if = "activeIndex == '2'"></allot-site>
          <special-subject v-if = "activeIndex == '3'"></special-subject> -->
     </div>
  </div>
</template>

<script>
import navTop from "../../common/header";
import setSite from "./setsite";
import allotSite from "./allotsite";
import specialSubject from "./specialsubject";
export default {
  name: "setsite",
  data() {
    return {
      activeIndex: "1"
    };
  },
  components: {
    navTop,
    setSite,
    allotSite,
    specialSubject
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    //导航菜单
    handleSelect(key) {
      this.activeIndex = key.name;
    },
    back() {
      this.$router.go(-1);
    }
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.setsite {
  height: 100%;
  text-align: center;
}
.log-magess {
  margin: 6px auto 16px;
  position: relative;
  background-color: #fff;
  height: 50px;
  padding-left: 20px;
  width: 1180px;
  color: #000;
  font-size: 16px;
}
.log-magess .arrow-right {
  position: absolute;
  right: 10px;
  top: 16px;
  cursor: pointer;
}
.magessBox {
  width: 1200px;
  margin: 0 auto 30px;
  /*padding-top:20px;*/
  padding-bottom: 20px;
  background-color: #fff;
}
.setsite .el-menu-demo {
  background-color: #fff;
}
</style>
<style>
.setsite .log-magess .el-tabs__item{
  height: 50px;
  line-height: 50px;
  font-size:16px;
  color:#000;
}
.setsite .log-magess .el-tabs__header{
  border:none;
}
</style>