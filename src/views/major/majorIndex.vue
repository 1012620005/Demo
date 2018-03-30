<template>
   <div class="container">
       <fc-header></fc-header>
       <div class="content">
           <return-bar :title="title"></return-bar>
           <div class="sLeave-bottom bookIndex">
               <el-tabs type="border-card"  v-model="tabCur" @tab-click="handleClick">
                    <el-tab-pane label="专业设置" name="majorIndex"></el-tab-pane>
                    <el-tab-pane label="学制设置" name="schoolLength"></el-tab-pane>
                    <el-tab-pane label="专业分类" name="professional"></el-tab-pane>
                    <el-tab-pane label="层次设置" name="schoolLevel"></el-tab-pane>
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
            title:'专业设置',
            tabCur:'majorIndex'
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





