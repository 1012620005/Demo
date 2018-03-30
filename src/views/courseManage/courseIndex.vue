<template>
   <div class="container">
       <fc-header></fc-header>
       <div class="content">
           <return-bar :title="title"></return-bar>
           <div class="sLeave-bottom bookIndex">
               <el-tabs type="border-card"  v-model="tabCur" @tab-click="handleClick">
                    <el-tab-pane label="课程分类" name="courseIndex"></el-tab-pane>
                    <el-tab-pane label="课程类型" name="classType"></el-tab-pane>
                    <el-tab-pane label="课程管理" name="courseManage"></el-tab-pane>
               </el-tabs> 
               <router-view></router-view>
           </div>
       </div>
   </div>
</template>
<script>
import fcHeader from '../common/header.vue'
import returnBar from '../common/returnBar.vue'
export default {
    data () {
        return {
            title:'课程管理',
            tabCur:'courseIndex'
        }
    },
    components:{
        fcHeader,
        returnBar
    },
    methods:{
        handleClick (tab,event) {
            var name = tab.name;
			this.$router.push(name)
        }
    }
}
</script>
<style lang="scss" scoped>
   @import '../../common/css/common.scss';
  
</style>
<style lang="scss">
   .bookIndex {
       .el-tabs--border-card{
           border:none;
           box-shadow:none;
           .el-tabs__content{
               padding:0;
           }
       }
   }
</style>






