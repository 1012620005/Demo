<template>
	<div class="content">
	    <el-form :inline="true" :model="formInline" class="inlineBox">
	    	         <div  class="btnS color" @click="absence"><span class="btn qingjia"></span>发送入职通知</div>
				  	  <div class="label">职位</div>
			  		    <el-cascader style="width:20%" :options="formInline.options" v-model="formInline.positionName" clearable  :props="props" @change="getList"></el-cascader>
				  	  <div class="label">状态</div>
			  		  	  <el-select v-model="formInline.status" placeholder="职位" class="select_width" clearable  @change="getList">
                             <el-option label="已发送入职通知" value="1"></el-option>
                             <el-option label="未发送入职通知" value="0"></el-option>
                          </el-select>  
				  	   	<el-input placeholder="请输入关键字" icon="search"  v-model="formInline.keyword" style="width:193px;margin-left:30px;" @blur="getList">
					    </el-input> 
		</el-form>
		<div class="sLeave-table">
		<el-table :data="tableData" stripe style="width: 100%"  ref="multipleTable"  @selection-change="handleSelectionChange">
						 <el-table-column type="selection" width="55" :selectable="checkSelectable"></el-table-column>
						<el-table-column type="index" label="序号" width="70"></el-table-column>
						<el-table-column prop="name" label="姓名"></el-table-column>
						<el-table-column prop="sex" label="性别">
							<template slot-scope="scope">
								  <span>{{ scope.row.sex == '2'? '女' : '男'}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="age" label="年龄"></el-table-column>
						<el-table-column prop="education" label="学历"></el-table-column>
						<el-table-column prop="positionName" label="应聘职位" show-overflow-tooltip></el-table-column>
						<el-table-column prop="compat" label="匹配度" width="185">
							<template slot-scope="scope">
								<div class="company">
										<el-progress :percentage="scope.row.matching != null ? Number(scope.row.matching) : 70 "></el-progress>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="tscore" label="总分"></el-table-column>
						<el-table-column  label="状态">
							<template slot-scope="scope">
							<span :class="[scope.row.entryStatus != 0?'colors':'']">{{ scope.row.entryStatus != 0?'已通知':'未通知'}}</span>	
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<span class="imgScript seeBtn" style="cursor:pointer" @click="operDetail(scope.row)"></span>
							</template>
						</el-table-column>
						<el-table-column label="点评学生" show-overflow-tooltip>
							<template slot-scope="scope" v-show="scope.row.entryStatus != 0">
								<el-button type="text" v-show="scope.row.feedbackContent == null" @click="feedBack(scope.row)">点评学生</el-button>
								{{ scope.row.feedbackContent != null? scope.row.feedbackContent : "" }}
							</template>
						</el-table-column>
					</el-table>	
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
		<see-resume :seeForm="seeResumeForm" @close="closeResume"></see-resume>
		<!--入职通知-->
        <el-dialog title="入职通知书" :visible.sync="showOrNo" size="tiny">
		  <el-form :model="form" :rules="formRules" ref="form">
		    <el-form-item label="编辑" prop="content">
		      <el-input v-model="form.content" auto-complete="off" type="textarea" :rows="5" resize="none"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="sendMeg('form')">发 送</el-button>
		  </div>
		</el-dialog>
		<!--点评学生-->	
		 <el-dialog title="对实习/试用期学生点评" :visible.sync="showOrNoFeed" size="tiny">
		  <el-form :model="feedBackForm" :rules="feedRules" ref="feedBackForm">
		    <el-form-item label="" prop="content">
		      <el-input v-model="feedBackForm.content" auto-complete="off" type="textarea" :rows="5" resize="none"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="sendMegs('feedBackForm')">提 交</el-button>
		  </div>
		</el-dialog>	
	</div>
</template>
<script type="text/javascript">
    import apis from '../../apis/company/offerLetter.js'
	import commonApis from '../../apis/company/employCommon.js'
    import seeResume from './employComm/seeResume.vue'
	export default{
		data () {
			return {
				tableData: [],
				formInline: {
					post: '',
					updateTime: '',
					keyword: '',
					status: '',
					options: [],
					positionName:[]

				},
				props:{value:'positionName',label: 'positionName',children:'child'},
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
					educations: {
						schoolName: '',
						studyStartTime: '',
						studyEndTime: '',
						education: ''
					}
				},
				multipleSelection: [],
				companyId: '',
				companyStatus: '',
				form:{
					content: ''
				},
				formRules: {
					content:[{required:true,message:'请填写面试邀约的内容',trigger:'change',type:'string'}]
				},
				showOrNo:false,
				showOrNoFeed: false,
				feedBackForm:{
					content: '',
					companyId: '',
					userId: ''
				},
				feedRules:{
					content:[{required:true,message:'请填写点评学生的内容',trigger:'change',type:'string'}]
				}
			}
		},
		components:{
			seeResume
		},
		methods:{
			handleCurrentChange (curpage) {
				this.currentPage = curpage
				this.getList()
			},
			operDetail(obj) {
				var id = obj.userId
				var formData = new FormData()
				formData.append('stuId',id)
				var _this = this
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
				return row.entryStatus != 1
			},
			handleSelectionChange (val) {
				this.multipleSelection = val
			},
			absence () {
				if(this.companyStatus != 1) {
					this.$message.error('公司正在审核中请耐心等待')
					return false;
				}
				if(this.multipleSelection.length == 0) {
					this.$message({
						type:'error',
						message: '请选择要发送入职通知的同学'
					})
					return false
				}
				this.showOrNo = true
			},
			getList () {
				var formData = new FormData();
				var _this = this
				var pageNo = this.currentPage;
				var positionName =this.formInline.positionName.length != 0 ? this.formInline.positionName.join('/') : '';
				var status = this.formInline.status;
				var name = this.formInline.keyword;
				formData.append('companyId',this.companyId)
				formData.append('pageNo',pageNo)
				formData.append('positionName',positionName)
				formData.append('entryStatus',status)
				formData.append('name',name)
				apis.getOfferLetterList(formData).then(response =>{
					if(response) {
						var data = response.data.data
						_this.currentPage = data.pageNo
						_this.size = data.count
						_this.tableData = data.list
					}
					formData.delete('companyId')
					formData.delete('pageNo')
					formData.delete('positionName')
					formData.delete('status')
					formData.delete('name')
				})
			},
			getPositionMsg () {
				var _this = this
				commonApis.getPositionData().then(res =>{
					if(res) {
						var data = res.data.data
						_this.formInline.options = data
					}
				})				
			},
			sendMeg(form) {
				var _this = this
				this.$refs[form].validate((valid) => {
					if(valid){
						var arr = [];
						for(let i = 0, len = _this.multipleSelection.length; i < len; i++) {
							arr.push({
								companyId: _this.companyId,
								positionName: _this.multipleSelection[i].positionName,
								userId: _this.multipleSelection[i].userId,
								releaseId: _this.multipleSelection[i].releaseId,
								entryContent: _this.form.content
							})
						}
						arr = JSON.stringify(arr)
						var formdata = new FormData()
						formdata.append('json',arr)
						apis.offerLetter(formdata).then(response =>{
							if(response){
								_this.$message({
									type: 'success',
									message: '发送成功'
								})
								_this.getList()
								_this.showOrNo = false
							}
							
						})
					}
				})
			},
			feedBack (obj) {
				this.showOrNoFeed = true
				this.feedBackForm.userId = obj.userId
				this.feedBackForm.companyId = obj.companyId
			},
			sendMegs (form) {
				var _this = this
				this.$refs[form].validate((valid) => {
					if(valid) {
						var formData = new FormData()
						formData.append('userId',this.feedBackForm.userId)
						formData.append('companyId',this.feedBackForm.companyId)
						formData.append('feedback',this.feedBackForm.content)
						apis.feedStudent(formData).then(res =>{
							if(res) {
								_this.$message({
									type:'success',
									message: '点评成功'
								})
								_this.getList()
							}
							formData.delete('userId')
							formData.delete('companyId')
							formData.delete('feedback')
							_this.showOrNoFeed = false
							this.feedBackForm.userId = ''
							this.feedBackForm.companyId = ''
							this.feedBackForm.content = ''
						})
					}
				})
			}
		},
		mounted () {
			// 获取公司的id
			this.companyId = window.sessionStorage.getItem('companyId')
			this.companyStatus = window.sessionStorage.getItem('companyStatus')
			this.getList()
			// 获取职位的列表
			this.getPositionMsg();
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
    @import '../../common/css/common.scss';
	 	.sLeave-table{
			margin-top: 10px;
			padding: 0 16px 0 24px;
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
	 .content{
	 	background:#fff;
	 	margin-top:16px;
	 }
	 .label{
	 	color:#333;
	 	padding: 0 9px;
	 }
	 .inlineBox{
	 	display:flex;
	 	align-items:center;
	 	height:50px;
	 	padding-left:24px;
	 }
	 .colors{
		color:#a1a1a1;
	}
	.color{
		color:#208af5;
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