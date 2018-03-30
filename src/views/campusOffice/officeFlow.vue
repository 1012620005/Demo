<template>
	<div class="container">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title">公文流转</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn" @click="returnBtn" style="cursor:pointer">返回</span>
				</div>
			</div> -->
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				<div class="officeFlow-tab">
				    <office-flow-index></office-flow-index>
				</div>

			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import officeFlowIndex from './officeFlowIndex.vue'
	export default {
		data () {
			return {
				activeName2: 'first',
				title:'公文流转'
			}
		},
		components:{
			fcHeader,
			officeFlowIndex,
			returnBar
		},
		methods:{
	        returnBtn () {
	        	this.$router.push('/counsellorIndex')
	        }			
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	 @import '../../common/css/common.scss';
</style>