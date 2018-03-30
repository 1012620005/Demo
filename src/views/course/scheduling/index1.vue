<template>
  <div class="index1">
      <div class="tabs">
        <ul class="tabs-items"  >
          <div ref="tabs"  @click="tabs">
            <li class="tabs-items-item" data-active="1">条件设置</li>
            <li data-active="2">自动排课</li>
            <li data-active="3">课表查询</li>
          </div>
        </ul>
      </div>
      <div style="margin:0 auto 50px;width:1160px" >
        <div class="schedu-condition" v-if="active == '1'">
            <div class="schedu-condition">
              <el-tabs v-model="class_active" @tab-click="handleSelects">
                <el-tab-pane label="班级固排和禁排" name="1"></el-tab-pane>
                <el-tab-pane label="教师固排和禁排" name="2"></el-tab-pane>
                <el-tab-pane label="场地固排和禁排" name="3"></el-tab-pane>
                <el-tab-pane label="教师特殊排课要求" name="4"></el-tab-pane>
                <el-tab-pane label="课程特殊排课要求" name="5"></el-tab-pane>
              </el-tabs>
            </div>
            <div>
              <keep-alive >
                <router-view></router-view>
              </keep-alive>
            </div>
        </div>
        <div  v-if="active == '2'">
          <auto-matic></auto-matic>
        </div>
        <div class="schedu-condition" v-if="active == '3'">
            <div class="schedu-condition">
              <el-tabs v-model="activeIndexssee" @tab-click="handleSelecttable">
                <el-tab-pane label="班级课表" name="1"></el-tab-pane>
                <el-tab-pane label="教职工课表" name="2"></el-tab-pane>
                <el-tab-pane label="场地课表" name="3"></el-tab-pane>
              </el-tabs>
            </div>
            <div>
              <keep-alive >
                <router-view></router-view>
              </keep-alive>
            </div>
        </div>
      </div>   
  </div>
</template>

<script>
import autoMatic from './automatic'
export default {
  name: 'index1',
  data() {
    return {
      active:'1',
      class_active:'1',
      activeIndexssee:'1',
    }
  },
  components:{
    autoMatic
  },
  created(){
    this.$router.push('/course/scheduling/scheduindex/1/schedu1')
  },
  mounted() {
  },
  computed: {
    
  },
  methods: {
    handleSelecttable(tab){
      this.activeIndexssee = tab.name;
     this.$router.push('Schedule'+tab.name)
    },
    handleSelects(tab) {
      this.class_active = tab.name;
      this.$router.push('schedu'+tab.name)
    },
    tabs(e){
      if(e){
        this.active = e.target.attributes[1].value
        if(this.active == '1'){
          this.$router.push('/course/scheduling/scheduindex/1/schedu1')
          this.class_active ='1'
        }
        if(this.active == '3'){
          this.$router.push('/course/scheduling/scheduindex/1/Schedule1')
          this.activeIndexssee = '1'
        }
        var length = e.target.parentElement.children.length;
        for(var i=0;i<length;i++){
          e.target.parentElement.children[i].className=" ";
        }
        e.target.className="tabs-items-item"
      }else{
        let lis = this.$refs.tabs.children;
        let length = lis.length;
        for(let i=0;i<length;i++){
          lis[i].className=" ";
        }
        lis[this.active-1].className="tabs-items-item"
        if(this.active == '1'){
          this.$router.push('/course/scheduling/scheduindex/1/schedu1')
        }
        if(this.active == '3'){
          this.$router.push('/course/scheduling/scheduindex/1/Schedule1')
        }
      }
    }
  },
  directives:{
        
  },
  watch:{
    
  }
     
}

</script>
<style scoped>
.index1{
  height:100%;
  text-align: center;
}

.schedu-condition{
  margin:15px 0;
}
.tabs{
  height:40px;
  background-color:#eef1f6;
  text-align:left;
  overflow: hidden;
}
.tabs-items{
  margin-left:-1px;
  border-bottom:1px solid #dfe6ec;
  height:39px;
}
.tabs-items li{
  float:left;
  width:120px;
  line-height:40px;
  height:40px;
  text-align:center;
  font-size:14px;
  cursor:pointer;
}
.tabs-items-item{
  background-color:#fff;
  border-right:1px solid #dfe6ec;
  border-top:1px solid #dfe6ec;
  border-left:1px solid #dfe6ec;
  color:#208af5;
}
.index1 .el-menu-demo{
  background-color:#fff;
}
</style>
<style>
.schedu-condition .el-menu--horizontal .el-menu-item{
  height:30px;
  line-height:30px;
}

</style>