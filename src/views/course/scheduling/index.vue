<template>
  <div class="scheduindex">
      <nav-top></nav-top>
      <div class="log-magess">
        <!-- <el-menu :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">排课管理</el-menu-item>
          <el-menu-item index="2">课表设置</el-menu-item>
        </el-menu> -->
        <el-tabs v-model="activeIndex" @tab-click="handleSelect">
          <el-tab-pane label="排课管理" name="1"></el-tab-pane>
          <el-tab-pane label="课表设置" name="2"></el-tab-pane>
        </el-tabs>
        <span class="arrow-right" @click="back" >返回<i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="magessBox clear">
        <router-view></router-view>
     </div>
  </div>
</template>

<script>
import navTop from "../../common/header";
export default {
  name: "scheduindex",
  data() {
    return {
      activeIndex: "2"
    };
  },
  components: {
    navTop
  },
  created() {},
  mounted() {
    this.activeIndex = this.$route.path.split("/")[4];
  },
  computed: {},
  methods: {
    back() {
      // console.log(this.$route);
      // if (this.$route.path.split("/")[4] == "1") {
      //   this.$router.push("/course/scheduling/scheduindex/2");
      //   this.activeIndex = "2";
      // } else {
        this.$router.push("/newIndex");
      // }
    },
    //导航菜单
    handleSelect(key) {
      // console.log(key, keyPath);
      // this.activeIndex = key;
      this.$router.push("/course/scheduling/scheduindex/" + key.name);
    }
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.scheduindex {
  height: 100%;
  text-align: left;
}
.log-magess {
  margin: 6px auto 16px;
  position: relative;
  background-color: #fff;
  height: 50px;
  width: 1180px;
  padding-left: 20px;
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
  /* padding-bottom: 20px; */
  background-color: #fff;
}

.scheduindex .el-menu-demo {
  background-color: #fff;
}
</style>
<style>
/* .scheduindex .log-magess .el-menu--horizontal .el-menu-item {
  height: 50px;
  line-height: 50px;
} */
.scheduindex .log-magess .el-tabs__item{
  height: 50px;
  line-height: 50px;
  font-size:16px;
  color:#000;
}
.scheduindex .log-magess .el-tabs__header{
  border:none;
}
</style>