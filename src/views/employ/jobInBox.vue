<template>
	<div class="content">
		<!--投递箱-->
		<div class="sLeave-bottom">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<div class="inter_form">
					<div  class="btnS" @click="absence"><span class="btn qingjia"></span>发起面试邀约</div>
					<div class="label color">职位</div>
					<el-cascader style="width:30%" :options="formInline.options" v-model="formInline.positionName" clearable :props="props" @change="getJobInBox"></el-cascader>
		            <div class="label color" style="margin-left:10px;">状态</div>
					    <el-select v-model="formInline.job" placeholder="状态" clearable  @change="getJobInBox">
		                    <el-option label="已发送面试通知" value="1" key="1"></el-option>
		                    <el-option label="未发送面试通知" value="0" key="0"></el-option>
		                </el-select>
		            <!-- <el-button type="primary" @click="onSubmit" style="margin-left:10px;">查询</el-button> -->
	            </div>   
				<!-- <div class="return_btn_bottom"><span class="color">返回</span><i class="return_btn_img"></i></div> -->
			</el-form>
			<div class="sLeave-table">
				<template>
					<el-table :data="tableData" stripe style="width: 100%"  ref="multipleTable"  @selection-change="handleSelectionChange">
						 <el-table-column type="selection" width="55" :selectable="checkSelectable"></el-table-column>
						<el-table-column type="index" label="序号" width="70"></el-table-column>
						<el-table-column prop="name" label="姓名"></el-table-column>
						<el-table-column label="性别">
							<template slot-scope="scope">
								  <span>{{ scope.row.sex == '2'? '女' : '男'}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="age" label="年龄"></el-table-column>
						<el-table-column prop="education" label="学历"></el-table-column>
						<el-table-column prop="intentionJob" label="应聘职位" show-overflow-tooltip></el-table-column>
						<el-table-column prop="compat" label="匹配度" width="185">
							<template slot-scope="scope">
								<div class="company">
										<el-progress :percentage="scope.row.matching != null ? Number(scope.row.matching) : 70 "></el-progress>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="tscore" label="总分"></el-table-column>
						<el-table-column prop="oper" label="操作">
							<template slot-scope="scope">
								<el-icon name="time"></el-icon>
								<span class="imgScript seeBtn" @click="operDetail(scope.row)"></span>
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
				<!--发送面试邀请-->
		<el-dialog title="发送面试邀请" :visible.sync="showOrNo" size="tiny">
		  <el-form :model="form" :rules="formRules" ref="form">
		    <el-form-item label="编辑" prop="content">
		      <el-input v-model="form.content" auto-complete="off" type="textarea" :rows="5" resize="none"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="sendMeg('form')">发 送</el-button>
		  </div>
		</el-dialog>
		<see-resume :seeForm="seeResumeForm" @close="closeResume"></see-resume>
	</div>
</template>
<script type="text/javascript">
    import apis from '../../apis/company/jobInBox.js'
    import seeResume from './employComm/seeResume.vue'
	import commonApis from '../../apis/company/employCommon.js'
	export default{
		data () {
			return {
				formInline: {
					keyword: '',
					job: '',
					options: [],
					positionName:[]
				},
				form:{
					content: ''
				},
				formRules: {
					content:[{required:true,message:'请填写面试邀约的内容',trigger:'change',type:'string'}]
				},
				tableData: [],
				currentPage: 1,
				size: 1,
				seeResumeForm: {
					dialogVisible: false,
					id: '',
					name: '',
					sex: '',
					workTime: '',
					education: '',
					intern: '',
					telNumber: '',
					weChat: '',
					photoImg: '',
					advantage: '',
					workExperience:[
						{
							companyName: '',
							jobTitle: '',
							industryInvolved: '',
							positionTime: '',
							departMent: '',
							skillsLabel:'',
							jobContent: ''
						}
					],
					educations:{
						schoolName: '',
						studyStartTime: '',
						studyEndTime: '',
						education: ''
					}
				},
				companyId: '',
				multipleSelection: [],
				showOrNo: false,
				companyStatus:'',
				props:{value:'positionName',label: 'positionName',children:'child'}
			}
		},
		methods:{
			absence(){
			    if(this.companyStatus != 1) {
					this.$message.error('公司正在审核中请耐心等待')
					return false;
				}
				if(this.multipleSelection.length == 0) {
					this.$message({
						type:'error',
						message: '请选择要邀约的学生'
					})
					return false
				} 
				this.showOrNo = true

			},
			sendMeg (form) {
				var _this = this
				this.$refs[form].validate((valid) => {
					if(valid) {
					  var arr = []
						for(let i = 0, len = _this.multipleSelection.length; i < len; i++) {
							arr.push({
								userId: _this.multipleSelection[i].stuId,
								companyId: _this.companyId,
								positionName: _this.multipleSelection[i].intentionJob,
								content: _this.form.content,
								releaseId: _this.multipleSelection[i].releaseId
							})
						}
						arr = JSON.stringify(arr)
						var formData = new FormData();
						formData.append('json',arr)	
						apis.jobInInterview(formData).then(response =>{
							if(response.data.meta.code == 200) {
								_this.$message({
									type:'success',
									message: '面试邀请成功'
								})
								_this.form.content = ''
								_this.showOrNo = false
								_this.getJobInBox()
							}
						})					
					}
				})
				
				
			},
			handleCurrentChange (curpage) {
				this.currentPage = curpage
				this.getJobInBox()
			},
			handleSelectionChange (val) {
				this.multipleSelection = val
			},
			operDetail(obj){
			   var id = obj.stuId
			   var formData = new FormData();
			   var _this = this
			   formData.append('stuId',id)
			   apis.seeResume(formData).then(response =>{
			   		if(response.data.meta.code == 200) {
			   	   	  var data = response.data.data
				   	   	   _this.seeResumeForm.id = data.id
			   	   	      _this.seeResumeForm.name = data.name ? data.name : '无'
						_this.seeResumeForm.sex = data.sex 
						_this.seeResumeForm.workTime = data.workDate ? data.workDate : '暂无工作经验'
						_this.seeResumeForm.education = data.educations ? data.educations.education : '无'
						_this.seeResumeForm.intern = data.jobStatus
						_this.seeResumeForm.telNumber = data.mobile
						_this.seeResumeForm.weChat = data.weChat
						_this.seeResumeForm.photoImg = data.photoImg
						_this.seeResumeForm.advantage = data.advantage
						_this.seeResumeForm.workExperience = data.workExperience
						_this.seeResumeForm.educations = data.educations ? data.educations : {schoolName: '无',
							studyStartTime: '无',
							studyEndTime: '无',
							education: '无'}
				   	   	  _this.seeResumeForm.dialogVisible = true		   			
			   		}
			   })
			},
			closeResume () {
			  this.seeResumeForm.id = ''	
			  this.seeResumeForm.name = ''
	   	   	  this.seeResumeForm.sex = ''
	   	   	  this.seeResumeForm.workTime = ''
	   	   	  this.seeResumeForm.education = ''
	   	   	  this.seeResumeForm.intern = ''
	   	   	  this.seeResumeForm.telNumber = ''
	   	   	  this.seeResumeForm.weChat = ''
	   	   	  this.seeResumeForm.photoImg = ''
	   	   	  this.seeResumeForm.advantage = ''
	   	   	  this.seeResumeForm.workExperience = ''
	   	   	  this.seeResumeForm.educations = ''
	   	   	  this.seeResumeForm.dialogVisible = false				
			},
			checkSelectable (row) {
				return row.interviewStatus != 1
			},
			getJobInBox () {
				var pageNo = this.currentPage;
				var job = this.formInline.job;
				var positionName = this.formInline.positionName.length != 0 ? this.formInline.positionName.join('/') : '';
				var formData = new FormData()
				var _this = this
				formData.append('companyId',this.companyId)
				formData.append('pageNo',pageNo)
			    formData.append('status',job)
				formData.append('positionName',positionName)
				apis.getJobInBoxList(formData).then(response =>{
					if(response.data.meta.code == 200){
						var data = response.data.data
						_this.tableData = data.list
						_this.currentPage = data.pageNo
						_this.size = data.pageNo
					}
				})
			},
			getPositionMsg (){
				var _this = this
				commonApis.getPositionData().then(res =>{
					if(res) {
						var data = res.data.data
						_this.formInline.options = data
					}
				})
			}
		},
		mounted () {
			// 获取公司的id
			this.companyId = window.sessionStorage.getItem('companyId')
			this.companyStatus = window.sessionStorage.getItem('companyStatus')
			this.getJobInBox();
			// 获取职位的列表
			this.getPositionMsg();
		},
		components:{
			seeResume
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
			.hand-green{
				color:#91c604;
			}
		}
	}
	.demo-form-inline{
		 justify-content: space-between;
		 .inter_form{
		 	display:flex;
		 	align-items:center;
			.el-input{
				margin-left: 0 !important;
			}
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
	.opera-pop{
		width: 568px;
		height: 794px;
		background-color: #fff;
		border-radius: 6px;
		z-index: 1000;
		position: fixed;
		top: 50%;
		left: 50%;
		transform:translate(-50%,-50%);
		padding:20px 18px;
		.opear-top{
			overflow: hidden;
			margin-bottom: 36px;
			.last-left{
				color: #999999;
				float: left;
			}
			.last-right{
				float: right;
				.send{
					float: left;
					img{float: left;margin-right: 4px;}
					span{
						display: inline-block;
						float: left;
					}
				}
				.add-close{
					float: right;
					margin-left: 40px;
				}
			}
		}
		.perinfo{
			overflow: hidden;
			.per-left{
				float: left;
				.oper-name{
					overflow: hidden;
					width: 100%;
					margin-bottom: 24px;
					h3{
						font-size: 18px;
						float: left;
						margin-right: 12px;
					}
					img{
						margin-top: 8px;
					}
				}
				.per-detail{
					li{
						ul{
							overflow: hidden;
							margin-bottom: 24px;
							li{
								float: left;
								margin-right: 36px;
							}
						}
					}
				}
			}
			.per-right{
				width: 136px;
				text-align: center;
				float: right;
				margin-top: 16px;
			}
		}
	}
</style>
<style lang="scss">
	.company{
		.el-progress-bar__outer{
			border-radius: 0;
			height: 16px !important;
			width: 100px;
			background-color: #ffe1bd;
		}
		.el-progress-bar__inner{
			border-radius: 0;
			background-color: #ff8b00;
		}
		.el-progress__text{
			color:#ff8b00;
		}
}
</style>