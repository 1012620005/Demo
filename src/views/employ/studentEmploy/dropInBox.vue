<template>
	<div class="content">
		<ul>
			<li class="collentBox" v-for="item in collentList">
				<div class="collentBoxLeft">
					<h4 class="collentTitle collentList">{{ item.positionName }}<span class="nian">{{item.workLife}}</span><span class="nian">{{item.education}}</span></h4>
					<p class="collentList">{{item.companyName}}</p>
					<p class="collentList">
						<span>{{ item.companyMarket? '已上市':'未上市'}}</span>
						<span>{{ item.workWelfare }}</span>
					</p>
				</div>
				<div class="collentBoxRight">
					<p class="collentList collentTime"><span>发布时间:</span>{{item.createDate}}</p>
					<p class="collentList">
						<span class="colors" v-show="item.status == '0'">投递成功</span>
						<span class="colors" v-show="item.status == '1'">面试通知</span>
						<span class="colors" v-show="item.status == '2'">入职通知</span>
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
    import api from '../../../apis/company/dropInBox.js'
	export default {
		data () {
		    return {
		    	collentList: [],
		    	userId: '',
		    	currentPage: 1,
		    	size:1
		    }
		},
		methods:{
			getDropInBox (pageNum) {
				var _this = this;
				pageNum = pageNum ? pageNum : 1;
				var formData = new FormData();
				formData.append('userId',this.userId);
				formData.append('curPage',pageNum)
				api.getDropInBox(formData).then(response =>{
					if(response.data.meta.code == 200) {
						_this.collentList = response.data.data.list;
						_this.currentPage = response.data.data.pageNo;
						_this.size = response.data.data.count;
					}
					formData.delete('userId')
					formData.delete('curPage')
				})
			},
			handleCurrentChange (curPage) {
				this.getDropInBox(curPage)
			}
		},
		mounted () {
			// 获取学生的Id
			this.userId = window.sessionStorage.getItem('stuId')
			// 获取已投递的列表页面
			this.getDropInBox ()
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
	.icon_resume{
		display:inline-block;
		width:16px;
		height:16px;
		background:url(../../../assets/img/connet/script.png) no-repeat;
		background-position: -201px -444px;
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
	.colors{
		color:#91c604;
		font-size:16px;
	}
	.collentBoxRight{
		text-align:right;
	}
	.nian{
		font-weight:normal;
		font-size:14px;
		color: #000;
		display:inline-block;
		margin:0 8px;
	}
</style>