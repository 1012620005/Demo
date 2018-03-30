<template>
	<div class="content">
		<ul>
			<li class="collentBox" v-for="item in collentList">
				<div class="collentBoxLeft">
					<h4 class="collentTitle collentList">{{ item.positionName }}</h4>
					<p class="collentList">{{item.companyName}}</p>
					<p class="collentList">
						<span>{{ item.companyMarket?'已上市':'未上市' }}</span>
						<span>{{ item.workWelfare }}</span>
					</p>
				</div>
				<div class="collentBoxRight">
					<p class="collentList collentTime"><span>发布时间:</span>{{item.creatTime}}</p>
					<p class="collentList">
						<span @click="cancelCollent(item)">
							<i class="icon_collents" :class="[item.delFlag?'icon_collenting':'']"></i><span class="fontSize" style="padding-right:20px;">{{item.delFlag?'取消收藏':'已收藏'}}</span>
					   </span>
					   <span @click="dropInBox(item)">
						    <i class="icon_resume" :class="[item.deliveryStatus?'':'icon_resumeing']"></i><span class="fontSize">{{item.deliveryStatus?'已投递':'投简历'}}</span>
						</span>
					</p>
				</div>
			</li>
		</ul>
		<div class="con_left_tab_con_page">
	        <el-pagination
						      @current-change="handleCurrentChange"
						      :current-page.sync="currentPage"
						      :page-size="10"
						      layout="prev, pager, next, jumper"
						      :total="size">
	    	</el-pagination>
	    </div>		
	</div>
</template>
<script type="text/javascript">
	 import api from '../../../apis/company/collentBox.js'
	export default {
		data () {
		    return {
		    	collentList: [],
		    	userId: '',
		    	size:0,
		    	currentPage: 1
		    }
		},
		methods:{
			getCollentList (curPage) {
				var formData = new FormData();
				var _this = this
				formData.append('userId',this.userId);
				formData.append('curPage',curPage?curPage: 1);
				api.getCollentList (formData).then(response =>{
					if(response.data.meta.code == 200) {
						_this.collentList = response.data.data.list
						_this.size = response.data.data.count
						_this.currentPage = response.data.data.pageNo
					}
				})
			},
			handleCurrentChange (curPage) {
				this.currentPage = curPage
				this.getCollentList()
			},
			cancelCollent (obj) {
			    var id = obj.id
			    var formData = new FormData();
			    var _this = this
			    formData.append('id',id)
			    formData.append('userId',this.userId)
			    api.cancelCollented(formData).then(response =>{
			    	if(response.data.meta.code == 200) {
			    		_this.$message({
			    			type:'success',
			    			message: '取消收藏成功'
			    		})
			    		_this.getCollentList()
			    		formData.delete('id')
			    		formData.delete('userId')
			    	}
			    })
			},
			dropInBox (obj) {
				var status = obj.deliveryStatus
				var formData = new FormData();
				var _this = this
				formData.append('userId',this.userId);
				formData.append('companyId',obj.companyId);
				formData.append('positionName',obj.positionName);
				formData.append('releaseId',obj.releaseId);
				if(!status) {
					api.dropInBox (formData).then(response =>{
						if(response.data.meta.code == 200) {
							_this.$message({
								type: 'success',
								message: '投递成功'
							})
							_this.getCollentList()
							formData.delete('userId')
							formData.delete('companyId')
							formData.delete('positionName')
							formData.delete('releaseId')
						}
					})
				}
			}
		},
		mounted () {
		  // 获取学生的信息
		  this.userId = window.sessionStorage.getItem('stuId');
		  // 获取学生收藏的列表信息
		  this.getCollentList ()

		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	.content{
		width:1200px;
		padding: 0 29px 0 31px;
		margin:16px auto 0;
		background:#fff;
		min-height:919px;
	}
	.icon_collents{
		display:inline-block;
		width:16px;
		height:16px;
		background:url(../../../assets/img/connet/script.png) no-repeat;
		background-position: -309px -170px;
	}
	.icon_collenting{
		background-position: -309px -202px;
	}
	.icon_resume{
		display:inline-block;
		width:16px;
		height:16px;
		background:url(../../../assets/img/connet/script.png) no-repeat;
		background-position: -201px -444px;
	}
	.icon_resumeing{
		background-position: -309px -234px;
	}
	.collentBox{
		display:flex;
		align-items:center;
		justify-content:space-between;
		height:154px;
		border-bottom:1px solid #eee;
	}
	.collentTitle{
		color:#000;
		font-size:18px;
	}	
	.collentList{
		padding-bottom:20px;
		color:#000;
		font-size:16px;
	}
	.collentTime{
		font-size:14px;
		color:#666;
	}
	.fontSize{
		color:#333;
		font-size:16px;
	}
</style>