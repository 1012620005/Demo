<template>
	<div class="content">
		<div class="sLeave-bottom">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<div class="bottom_form">
					<div  class="btnS" @click="absence"><span class="btn qingjia"></span>发布职位</div>
					<div  class="btnS colorsSpan" @click="stopPublic"><span class="btn nosussess"></span>停止招聘</div>
					<div class="label color">职位</div>
				      <el-cascader
					    :options="options"
					    :props="props"
					    v-model="formInline.positionName"
						clearable
					    @change="handleChange" style="width:30%">
  					  </el-cascader>
					<!-- <el-input placeholder="请输入关键字" icon="search"  v-model="formInline.keyword" style="width:193px;margin-left:30px;">
					</el-input>  -->
					 <!-- <el-button type="primary" @click="onSubmit" style="margin-left:10px;">查询</el-button>					 -->
				</div>
				<!--<div class="return_btn_bottom"><span class="color">返回</span><i class="return_btn_img"></i></div>-->
			</el-form>
			<div class="sLeave-table">
				<template>
					<el-table :data="tableData" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55" :selectable="checkSelectable"></el-table-column>
						<el-table-column type="index" label="序号" width="70"></el-table-column>
						<el-table-column prop="positionName" label="职位类别"></el-table-column>
						<el-table-column prop="department" label="所属部门"></el-table-column>
						<el-table-column prop="salary" label="月薪"></el-table-column>
						<el-table-column prop="workLife" label="工作年限"></el-table-column>
						<el-table-column prop="workCity" label="工作城市"></el-table-column>
						<el-table-column prop="endTime" label="结束时间" width="185"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-icon name="time"></el-icon>
								<span class="imgScript seeBtn" @click="operDetail(scope.row.id)"></span>
								 <!-- <el-switch v-model="scope.row.recruitmentStatus" on-text="" off-text="" :width="30"></el-switch> --> 
								 <span class="fontcolor" style="cursor:pointer"  :class="[scope.row.recruitmentStatus == 1?'colors':'']" @click="stoped(scope.row)">停止招聘</span>

							</template>
						</el-table-column>
					</el-table>
				</template>
			</div>
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
		<public-job-dialog :form="formDetail" @submit="reset('public')" @closeDialog="reset('public')"></public-job-dialog>
		<see-public-job :form="seeForm" @closeDialog="reset('see')"></see-public-job>
	</div>
</template>
<script type="text/javascript">
   import publicJobDialog from './employComm/publicJobDialog.vue'
   import seePublicJob from './employComm/seePublicJob.vue'
   import apis from '../../apis/company/publicJob.js'
   import res from '../../apis/company/response.js'
   import commonApis from '../../apis/company/employCommon.js'
	export default{
		data () {
			return {
				formInline: {
					keyword: '',
					positionName: [],
					options:[]
				},
				seeForm:{
					dialogFormVisible: false,
					positionName:'',
					department: '',
					salary: '',
					workLife: '',
					workDescribe: '',
					workCity: '',
					endTime:  '',
					education: '',
					workWelfare: ''
				},
				tableData: [],
				currentPage: 1,
				size: 0,
				value1:true,
				formDetail:{
					dialogFormVisible: false,
					options: [],
					positionName:[],
					department: '',
					salary: '',
					workLife: '',
					workDescribe: '',
					workCity: '',
					endTime:  '',
					education: '',
					workWelfare: ''
				},
				selectedOptions2: [],
				options: [],
				props:{value:'positionName',label: 'positionName',children:'child'},
				companyId: '',
				multipleSelection: [],
				selectIdList: [],
				companyStatus: ''
			}
		},
		methods:{
			absence(){
				if(this.companyStatus != 1) {
					this.$message.error('公司正在审核中请耐心等待')
					return false;
				}
				this.formDetail.dialogFormVisible = true
			},
			stopPublic () {
				var _this = this
				if(this.companyStatus != 1) {
					this.$message.error('公司正在审核中请耐心等待')
					return false;
				}
				if(this.multipleSelection.length != 0){
					console.log(this.multipleSelection)
					for(var i = 0, len = this.multipleSelection.length; i < len; i++) {
						this.selectIdList.push(this.multipleSelection[i].id)
					}
					var formData = new FormData()
					formData.append('id',this.selectIdList.join(','))
					apis.stopPublic(formData).then(response => {
						if(res.responseNull(response)){
							_this.$message({
								type: 'success',
								message: '更改成功'
							})
							_this.getDataList()
						}
					})
				} else{
					this.$message.error('请选择要停止招聘的职位')
				}
			},
			stoped (obj) {
				var _this = this
				var status = obj.recruitmentStatus
				if(this.companyStatus != 1) {
					this.$message.error('公司正在审核中请耐心等待')
					return false;
				}
				if(status == 1) {
					this.$message.error('公司已经停止招聘')
					return false;
				} else {
					var id = obj.id
					var formData = new FormData()
					formData.append('id',id)
					apis.stopPublic(formData).then(response => {
						if(res.responseNull(response)){
							_this.$message({
								type: 'success',
								message: '更改成功'
							})
							_this.getDataList()
						}
					})
				}
			},
			handleSelectionChange (val) {
				this.multipleSelection = val
			},
			checkSelectable (row) {
				return row.recruitmentStatus == 0 
			},
			reset (str) {
				if(str === 'public') {
					this.formDetail.dialogFormVisible = false;
					this.getDataList()
					console.log('p')
				} else if(str === 'see') {
					this.seeForm.dialogFormVisible = false
					this.seeForm.positionName = ''
					this.seeForm.department = ''
					this.seeForm.salary = ''
					this.seeForm.workLife = ''
					this.seeForm.workDescribe = ''
					this.seeForm.workCity = ''
					this.seeForm.endTime = ''
					this.seeForm.education = ''
					console.log('s')
				}
			},
			onSubmit(){
				this.getDataList(this.currentPage,this.formInline.positionName)
			},
			handleCurrentChange (curpage) {
				this.currentPage = curpage;
				this.getDataList(curpage)
			},
			operDetail(id){
				this.seeForm.dialogFormVisible = true
				var formData = new FormData();
				formData.append('id',id)
				apis.seePublicMsg(formData).then(response => {
					if(res.responseCallback(response)) {
						var data = res.responseCallback(response)
						this.seeForm.positionName = data.positionName
						this.seeForm.department = data.department
						this.seeForm.salary = data.salary
						this.seeForm.workLife = data.workLife
						this.seeForm.workDescribe = data.workDescribe
						this.seeForm.workCity = data.workCity
						this.seeForm.endTime = data.endTime
						this.seeForm.education = data.education
						this.seeForm.workWelfare = data.workWelfare
					}
				})
			},
			handleChange(value) {
				console.log(value)
				this.getDataList(this.currentPage,value)
			},
			getPositionMsg () {
				var _this = this
				apis.getPositionData ().then(response => {
					if(res.responseCallback(response)) {
						var data = res.responseCallback(response)
						_this.options = data
						_this.formDetail.options = data
					}
				})
			},
			getDataList (pageNo,positionName) {
				var _this = this
				var formData = new FormData();
				pageNo = pageNo ? pageNo : '1'
			    positionName = positionName ? positionName.join('/') : ''
				formData.append('companyId',window.sessionStorage.getItem('companyId'));
				formData.append('pageNo',pageNo);
				formData.append('positionName',positionName)
				apis.getPublicList(formData).then(response =>{
                   if(res.responseCallback(response)){
                   	   var data = res.responseCallback(response);
                   	   console.log(data)
                   	   _this.tableData = data.list
                   	   _this.currentPage = data.pageNo
                   	   _this.size = data.count
                   }
				})
			}
		},
		components:{
			publicJobDialog,
			seePublicJob
		},
		mounted () {
			// 获取职位的信息
			this.getPositionMsg();
			// 获取职位的列表
			this.getDataList();
			this.companyId = window.sessionStorage.getItem('companyId')
			this.companyStatus = window.sessionStorage.getItem('companyStatus')
			
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../common/css/common.scss';
	.sLeave-bottom{
		padding: 0 16px 0 0;
		box-sizing:border-box;
		.sLeave-table{
			padding-left: 24px;
			margin-top: 10px;
			.el-icon-time:before{
				content: '';
			}
			.imgScript{
				margin: 0;
				margin-top: 8px;
			}
			.cell{
				cursor: pointer;
			}
			.el-switch{
				.el-switch__core{
					width: 25px !important;
					height: 16px !important;
				}
				.el-switch__button{
					width: 13px !important;
					height: 14px !important;
					transform:translate(2px, 0px) !important;
				}
			}
			.is-checked{
				.el-switch__button{
					transform:translate(9px, 0px) !important;
				}
			}
		}
	}
	.demo-form-inline{
		 justify-content: space-between;
		 .bottom_form{
		 	display:flex;
		 	align-items:center;
		 }
		 .return_btn_bottom{
		 	display:flex;
		 	align-items:center;
				.return_btn_img{
					display:inline-block;
					width:9px;
					height:15px;
					background:url('../../assets/img/connet/return.png') no-repeat;
					padding-left:4px;
					margin-left: 6px;
				}	
		 }

		 .color{
		 	color:#333;
			 margin-right: 12px;
		 }
	}
	// 详情弹框
	.post-job{
		width: 566px;
		height: 820px;
		background-color: #fff;
		border-radius: 6px;
		z-index: 1000;
		position: fixed;
		top: 50%;
		left: 50%;
		transform:translate(-50%,-50%);
		padding:20px 18px;
		.detail-top{
			overflow: hidden;
			margin-bottom: 32px;
			.add-big{
				height: 32px;
				line-height: 32px;
				float: left;
				span{
					display: inline-block;
					float: left;
				}
				.addBig{
					margin-right: 16px;
				}
			}
			.add-right{
				float: right;
				margin-top: 4px;
				cursor: pointer;
			}
		}
		.detail-bottom{
			.el-form-item__label{
				text-align: left;
				width:88px !important;
			}
			.el-form-item__content{
				margin-left: 88px !important;
			}
			.el-textarea__inner{
				background-color: #fafafa;
				border: 0;
			}
			.remark{
				textarea{
					height: 160px;
				}
			}
			.posi{
				textarea{
					height: 80px;
				}
			}
			.el-form-item{
				margin-bottom: 18px;
			}
			.confirm{
				width: 96px;
				height: 42px;
				float: right;
			}
			.el-checkbox+.el-checkbox{
				margin-left: 0;
				margin-right: 15px;
			}
		}
	}
	.colorsSpan{
		color:#f00000;
	}
	.fontcolor{
		color:#333;
		line-height:40px;
	}
	.colors{
		color:#a1a1a1;
	}
</style>