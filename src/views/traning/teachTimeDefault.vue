<template>
    <div class="contanier">
		<fc-header></fc-header>
		<div class="content">
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom bookIndex">
				<el-tabs type="border-card"  v-model="tabCur" @tab-click="handleClick">
					  <el-tab-pane label="教学活动时间设置" name="teachTimeDefault"></el-tab-pane>
					  <el-tab-pane label="课程教学时间设置" name="courseTime"></el-tab-pane>
				</el-tabs>
				<router-view></router-view>                
			</div>
		</div>
    </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import apis from '../../apis/traning.js'
    import commonApi from '../../apis/common.js'  
    export default {
        data () {
            return {
                title: '培养方案管理',
                tabCur: 'teachTimeDefault'
            }
        },
        components:{
           fcHeader,
           returnBar
        },
        methods:{
           handleClick (tab) {
               var name = tab.name
               this.$router.push(name)
           }
        }
    }
</script>
<style lang="scss"scoped>
    @import '../../common/css/common.scss';
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


