<template>
	<div class="research_container">
		<fc-header></fc-header>
		<!--顶部标签-->
		<el-row :span="24" class="tabbox">
			<el-col :span="24" class="tabtop res-box">
				<el-tabs  class="tableft">
					<el-tab-pane label="教研中心">
						<re-center></re-center>
					</el-tab-pane>
					<!-- <el-tab-pane label="备课中心" >
						<prepar-center></prepar-center>
					</el-tab-pane> -->
				</el-tabs>
				<div class="tabright" @click="router">
					<span>返回</span>
					<i></i>
				</div>
			</el-col>
		</el-row>
		<!-- <el-row :span="24" class="tabbox">
			<el-col :span="24" class="tabtop">
				<el-tabs v-model="type" @tab-click="handleClick" class="tableft">
					<el-tab-pane label="全部" name="0">
						<research-total :type="type" @handleCurrentChange="allpage" :page="a_all"  ></research-total>
					</el-tab-pane>
					<el-tab-pane label="我的教研" name="1">
						<research-total :type="type"  @handleCurrentChange="mypage" :page="a_my" ></research-total>
					</el-tab-pane>
					<el-tab-pane   label="参与教研" name="2">
						<research-total :type="type"  @handleCurrentChange="otherpage" :page="a_other" ></research-total>
					</el-tab-pane>
				</el-tabs>
				<div class="tabright" @click="router">
					<span>返回</span>
					<i></i>
				</div>
			</el-col>
		</el-row> -->
	</div>
	
</template>
<script type="text/javascript">
import fcHeader from '../../common/header.vue'
import reCenter from './reCenter.vue'
// import preparCenter from './preparCenter.vue'


// import researchTotal from './researchTotal.vue'
// import userApi from '../../../apis/userCenter.js'
// import api from '../../../apis/researchCenter/research.js'
// import myResearch from './myResearch.vue'
// import takeResearch from './takeResearch.vue'

// let id=1000;
export default {
	data() {
      return {
		// type: '0',
		// a_all: {
		// 	list:[],
		// 	pageNo:1,
		// 	pageSize:12,
		// 	count:0,
		// },
		// a_my: {
		// 	list:[],
		// 	pageNo:1,
		// 	pageSize:12,
		// 	count:0,
		// },
		// a_other: {
		// 	list:[],
		// 	pageNo:1,
		// 	pageSize:12,
		// 	count:0,
		// },
      }
	},
	mounted () {
		// this.paging();
	},
	methods: {
		router(url){
			this.$router.push("newIndex")
			// this.$router.go("newIndex");
		},
		// allpage(val){
		// 	this.a_all.pageNo = val;
		// 	this.paging();
		// },
		// mypage(val){
		// 	this.a_my.pageNo = val;
		// 	this.paging();
		// },
		// otherpage(val){
		// 	this.a_other.pageNo = val;
		// 	this.paging();
		// },
		// gp() {
		// 	let params = {
		// 		type : this.type,
		// 		pageSize:12,
		// 		pageNo:1,
		// 	};
		// 	if (this.type == '0') {
		// 		params.pageNo = this.a_all.pageNo;
		// 		params.pageSize = this.a_all.pageSize;
		// 	} else if (this.type == '1') {
		// 		params.pageNo = this.a_my.pageNo;
		// 		params.pageSize = this.a_my.pageSize;
		// 	} else if (this.type == '2') {
		// 		params.pageNo = this.a_other.pageNo;
		// 		params.pageSize = this.a_other.pageSize;
		// 	}
		// 	return params;
		// },
		// paging(){
		// 	let params = this.gp();
		// 	api.findActivity(params).then(response => {
		// 		if(response.data.meta.code == 200){
		// 			let page = response.data.data;
		// 			if (this.type == '0') {
		// 				this.a_all.list = page.list;
		// 				this.a_all.pageNo = page.pageNo;
		// 				this.a_all.count = page.count;
		// 			} else if (this.type == '1') {
		// 				this.a_my.list = page.list;
		// 				this.a_my.pageNo = page.pageNo;
		// 				this.a_my.count = page.count;
		// 			} else if (this.type == '2') {
		// 				this.a_other.list = page.list;
		// 				this.a_other.pageNo = page.pageNo;
		// 				this.a_other.count = page.count;
		// 			}
		// 		}
		// 	});
		// },
		//   头部标签
		// handleClick(tab, event) {
		// 	// this.type = tab;
		// 	this.paging();
		// }
    },
	components:{
		fcHeader,
		reCenter,
		// preparCenter
		
		// researchTotal,
		// myResearch,
		// takeResearch
	}
}
</script>
<style type="text/css" lang="scss" scoped>
	body{
		font-size: 14px;
		color: #333;
	}
	.research_container{
		// 顶部标签
		.tabbox{
			width:1200px;
			margin:0 auto;
			.tabtop{
				height: 55px;
				margin-top: 7px;
				background-color: #fff;
				border-radius: 6px;
				position: relative;
				// padding: 0 24px;
				.tableft{
					float: left;
					.el-tabs__header{
						height: 55px;
						border-bottom: 0;
						.el-tabs__nav{
							height: 55px;
							line-height: 55px;
							margin-left: 20px;
							.el-tabs__item{
								color: #333;
							}
							.el-tabs__item.is-active{
								color: #208af5;
							}
						}
					}
				}
				.tabright{
					float: right;
					height: 18px;
					// line-height: 55px;
					margin-top: 7px;
					cursor: pointer;
					overflow: hidden;
					margin-top: 18px;
					margin-right: 20px;
					position: absolute;
					top: 0;
					right: 0;
					span{
						display: inline-block;
						// float: right;
					}
					i{	
						width: 9px;
						height: 15px;
						background:url("../../../assets/researchCenter/return.png") 0 0 no-repeat; 
						display: inline-block;
						float: right;
						margin-left: 6px;
						margin-top: 2px;
					}
				}
			}
		}
		
	} 
</style>
 <style lang="scss">
	.res-box{
		.el-tabs__nav{
			height:55px;
			line-height:55px;
		}
		.el-tabs__header{
			margin-left:20px;
		}
		.el-tabs__nav-wrap::after{
			height:0;
		}
	} 
</style>  
