<template>
	<div class="content">
		<div class="sLeave-bottom">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<div class="bottom_form">
					<div  class="btnS" @click="absence"><span class="btn qingjia"></span>发起面试邀约</div>
					<div class="label color">职位：</div>
					<el-cascader style="width:30%" :options="formInline.options" clearable v-model="formInline.positionName" :props="props" @change="getCampusPool" ></el-cascader>	
					<el-input placeholder="请输入姓名"   v-model="formInline.keyword" @blur="getCampusPool" icon="search" style="width:193px;margin-left:30px;">
				   </el-input> 
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
						<el-table-column prop="intentionJob" label="应聘职位" show-overflow-tooltip> 
							<template slot-scope="scope">
								{{ scope.row.intentionJob ? scope.row.intentionJob : '无'}}
							</template>
						</el-table-column>
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
		<el-dialog title="发送面试邀请" :visible.sync="showOrNo" size="tiny" @close="closeInterview('form')">
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
	import apis from '../../apis/company/companyPool.js'
	import commonApis from '../../apis/company/employCommon.js'
    import seeResume from './employComm/seeResume.vue'
	export default{
		data () {
			return {
				formInline: {
					keyword: '',
					options: [],
					positionName:[]
				},
				tableData: [],
				multipleSelection: [],
				currentPage: 1,
				size: 1,
				formDetail:{
					offi:'',
					remark:'',
					circ:''
				},
				form:{
					content: ''
				},
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
				showOrNo: false,
				companyId:'',
				formRules:{
					content:[{required:true,message:'请填写面试邀约的内容',trigger:'change',type:'string'}]
				},
				companyId: '',
				companyStatus: '',
				props:{value:'positionName',label: 'positionName',children:'child'}
			}
		},
		methods:{
			absence () {
				if(this.companyStatus != 1) {
					this.$message.error('公司正在审核中请耐心等待')
					return false;
				}
				if(this.multipleSelection.length == 0) {
					this.$message.error('请选择要邀约的同学')
					return false;
				}
				this.showOrNo =true;
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
								content: _this.form.content
							})
						}
						arr = JSON.stringify(arr)
						var formData = new FormData();
						formData.append('json',arr)
						apis.pubilcInterView(formData).then(response =>{
							if(response.data.meta.code == 200) {
								_this.$message({
									type:'success',
									message: '邀约成功'
								})
								_this.getCampusPool()
								this.showOrNo = false
							}
							formData.delete('json');
						})
					}
				})
			},
			handleCurrentChange (curPage) {
				this.currentPage = curPage
				this.getCampusPool()
			},
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			operDetail(obj){
			   var formData =  new FormData();
			   var id = obj.stuId;
			   var _this = this
			   formData.append('stuId',id);
			   apis.seeUserResume(formData).then(response =>{
			   	   if(response) {
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
			   	   formData.delete('stuId')
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
			getCampusPool(){
				var _this = this
				var curPage = this.currentPage;
				var intentionJob = this.formInline.positionName.length != 0 ? this.formInline.positionName.join('/') : '';
				var name = this.formInline.keyword;
				var formData = new FormData();
				formData.append('pageNo',curPage);
				formData.append('intentionJob',intentionJob)
				formData.append('name',name)
				formData.append('companyId',this.companyId)
				apis.getCompanyPoolList(formData).then(response =>{
					if(response.data.meta.code ==  200){
						var data = response.data.data
						_this.tableData = data.list
						_this.currentPage = data.pageNo
						_this.size = data.count
					}
				})
			},
			checkSelectable (row) {
				return row.interviewStatus != 1 
			},
			closeInterview (form){
				this.$refs[form].resetFields();
			},
			getPosition () {
				var _this = this
				commonApis.getPositionData().then(res =>{
					if(res) {
						var data = res.data.data
						_this.formInline.options = data
					}
				})
			}
		},
		components:{
			seeResume
		},
		mounted () {
			// 获取公司Id
			this.companyId = window.sessionStorage.getItem('companyId')
			// 获取公司的审核状态
			this.companyStatus = window.sessionStorage.getItem('companyStatus')
			// 获取职位的列表
			this.getPosition()
			// 获取校园人才库的列表页面
			this.getCampusPool()
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
	.details-pop{
		width: 566px;
		height: 564px;
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
			.office{
				textarea{
					height: 160px;
				}
			}
			.remark{
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
		}
	}
</style>
<style lang="scss">
	// 进度条
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