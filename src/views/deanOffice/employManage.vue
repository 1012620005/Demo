<template>
	<div class="container">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title" style="width:100px;">企业招聘管理</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn" @click="returnBtn">返回</span>
				</div>				
			</div> -->
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				<el-tabs type="card"  v-model="tabCur" @tab-click="handleClick">
					  <el-tab-pane label="学生就业" name="employManage"></el-tab-pane>
					  <el-tab-pane label="审核企业信息" name="auditCompanyInfo"></el-tab-pane>
				</el-tabs>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	export default {
		data (){
			return {
				tabCur: 'employManage',
				title:'企业招聘管理'
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
			},
			returnBtn () {
				this.$router.push('/counsellorIndex')
			}
		},
		mounted () {
			var path = this.$route.path
			if(path == '/auditCompanyInfo') {
				this.tabCur = 'auditCompanyInfo'
			} else {
				this.tabCur = 'employManage'
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../common/css/common.scss';
</style>