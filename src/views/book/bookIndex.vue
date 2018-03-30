<template>
   <div class="container">
       <fc-header></fc-header>
       <div class="content">
           <return-bar :title="title"></return-bar>
           <div class="sLeave-bottom bookIndex">
               <el-tabs type="border-card"  v-model="tabCur" @tab-click="handleClick">
                    <el-tab-pane label="班级通讯录" name="bookIndex"></el-tab-pane>
                    <el-tab-pane label="教职工通讯录" name="staffBook"></el-tab-pane>
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
            title:'通讯录',
            tabCur:'bookIndex'
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



