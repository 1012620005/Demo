<template>
	<div class="content">
		<div class="resumeLeft">
			<p class="updateTip">最后更新{{updateTipTime}}</p>
			<div class="resumeMessage">
				<div class="userInfor">
					<el-form  ref="userInforForm" :model="userInforForm"  :label-position="labelPosition" :rules="userInfoRules">
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="姓名">
		    						<el-input v-model="userInforForm.name" :disabled="true"></el-input>
		  						</el-form-item>
		  						<el-form-item label="生日">
		    						<el-input v-model="userInforForm.birthday" :disabled="true"></el-input>
		  						</el-form-item>
	  					    </el-col>
	  					    <el-col :span="8">
								<el-form-item label="开始工作时间" prop="startTime">
		    						    <el-date-picker
									      v-model="userInforForm.startTime" type="month"  placeholder="选择日期">
									    </el-date-picker>
		  						</el-form-item>
		  						<el-form-item label="微信号" prop="weChat">
		    						<el-input v-model="userInforForm.weChat"></el-input>
		  						</el-form-item>
	  					    </el-col>
	  					    <el-col :span="8">
								<el-form-item label="当前求职状态" prop="jobStatus">
		    						<el-select v-model="userInforForm.jobStatus" placeholder="请选择">
									    <el-option key="0" label="离职" value="0"></el-option>
									    <el-option key="1" label="在职" value="1"></el-option>
	  								</el-select>
		  						</el-form-item>
		  						<el-form-item label="性别">
		    						<template>
										  <el-radio disabled v-model="userInforForm.sex" label="1">男</el-radio>
										  <el-radio disabled v-model="userInforForm.sex" label="2">女</el-radio>
									</template>
		  						</el-form-item>
	  					    </el-col>
  					    </el-row>
  					    <el-row>
  					    	<el-col :span="8">
  					    		<el-form-item label="手机号" prop="mobile">
  					    			<el-input v-model="userInforForm.mobile"></el-input>
  					    		</el-form-item>
  					    	</el-col>
  					    </el-row>
  					    <el-form-item class="rightLayout" v-show="!userFlag">
						    <el-button type="primary" @click="userSubmit('userInforForm')" :loading="userSure">确定</el-button>
						    <el-button @click="cancel">取消</el-button>
  						</el-form-item>
					</el-form>
				</div>
			</div>
			<div class="resumeMessage">
				<el-form  :label-position="labelPosition" ref="advantageForm" :rules="advantageRules" :model="advantageForm">
					<el-form-item label="我的优势" >
	    				<el-input v-model="advantageForm.advantage" type="textarea" :rows="6" resize="none"></el-input>
	  				</el-form-item>
  					<el-form-item class="rightLayout" v-show="!advantageFlag">
						<el-button type="primary" @click="advantageSubmit('advantageForm')" :loading="advantageSure">确定</el-button>
						<el-button @click="cancel">取消</el-button>
  				    </el-form-item>	  				
				</el-form>
			</div>
			<div class="resumeMessage">
			    <el-form  ref="intentionForm" :model="intentionForm"  :label-position="labelPosition" :rules="intentionRules">
			    	<p class="titleText">求职意向</p>
			        <el-row  :gutter="20">
				    	<el-col :span="8">
								<el-form-item label="职位" prop="intentionJob">
		    						<el-input v-model="intentionForm.intentionJob"></el-input>
		  						</el-form-item>
	  					</el-col>
	  					<el-col :span="8">
								<el-form-item label="城市" prop="intentionCity">
		    						<el-select v-model="intentionForm.intentionCity" placeholder="请选择">
									    <el-option :key="item.code" :label="item.name" :value="item.code" v-for="item in cityList"></el-option>
  								    </el-select>
		  						</el-form-item>
	  					</el-col>
  					</el-row>
  					<el-form-item class="rightLayout"  v-show="!intentionFlag">
						    <el-button type="primary" @click="intentionSubmit('intentionForm')" :loading="intentionSure">确定</el-button>
						    <el-button @click="cancel">取消</el-button>
  				    </el-form-item>
			    </el-form>
			</div>
			<el-form ref="workForm" :model="workForm" :label-position="labelPosition" :rules="workRules">
			<div class="resumeMessage">
					<p class="titleText">工作经历</p>
					<el-row  :gutter="20">
						<el-col :span="8">
							<el-form-item label="公司名称" prop="companyName">
	    						<el-input v-model="workForm.companyName"></el-input>
	  						</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="所属行业" prop="industryInvolved">
		    				    <el-cascader  :options="options" v-model="workForm.industryInvolved" :props="props"></el-cascader>
		  					</el-form-item>
						</el-col>
						<el-col :span="8">
							 <el-form-item label="所属部门" prop="departMent">
	    						<el-input v-model="workForm.departMent"></el-input>
	  						</el-form-item>
						</el-col>
					</el-row>
					<el-row  :gutter="20">
						<el-col :span="7">
							<el-form-item label="在职时间" prop="workStartTime">
	    							<el-date-picker
								      v-model="workForm.workStartTime" type="month"  placeholder="选择日期">
								    </el-date-picker>
	  						</el-form-item>
						</el-col>
						<el-col :span="2" class="line">-</el-col>
						<el-col :span="7">
							<el-form-item label="在职时间" class="timeIndex" prop="workEndTime">
		    					<el-date-picker
								      v-model="workForm.workEndTime" type="month"  placeholder="选择日期">
								</el-date-picker>
		  					</el-form-item>
						</el-col>
						<el-col :span="8">
							 <el-form-item label="技能标签" prop="skillsLabel">
	    						<el-input v-model="workForm.skillsLabel"></el-input>
	  						</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="工作内容" prop="jobContent">
	    				<el-input v-model="workForm.jobContent" type="textarea" :rows="6" resize="none"></el-input>
	  				</el-form-item>	
	  				<el-row>
		  				<el-col :span="8">
			  				<el-form-item label="职位名称" prop="jobTitle">
			    				<el-input v-model="workForm.jobTitle"></el-input>
			  				</el-form-item>	
			  			</el-col>	
		  			</el-row>
					<p class="titleText">教育经验</p>
					<el-row  :gutter="20">
						<el-col :span="11">
							<el-form-item label="学校名称" prop="schoolName">
	    						<el-input v-model="workForm.schoolName"></el-input>
	  						</el-form-item>
						</el-col>
						<el-col :span="11">
							 <el-form-item label="学历" prop="education">
	    						<el-input v-model="workForm.education"></el-input>
	  						</el-form-item>
						</el-col>
					</el-row>
					<el-row  :gutter="20">
						<el-col :span="7">
							<el-form-item label="时间段" prop="studyStartTime">
	    						<el-date-picker
								      v-model="workForm.studyStartTime" type="month"  placeholder="选择日期">
								    </el-date-picker>
	  						</el-form-item>
						</el-col>
						<el-col :span="2" class="line">-</el-col>
						<el-col :span="7">
							 <el-form-item label="时间段" class="timeIndex" prop="studyEndTime">
	    							<el-date-picker
								      v-model="workForm.studyEndTime" type="month"  placeholder="选择日期">
								    </el-date-picker>
	  						</el-form-item>
						</el-col>
					   <el-col :span="8">
		  			   </el-col>
					</el-row>
			</div>
			<el-form-item class="rightLayout" v-show="!workFlag">
			    <el-button type="primary" @click="workSubmit('workForm')" :loading="false">确定</el-button>
				<el-button @click="cancel">取消</el-button>
  		    </el-form-item>		
			</el-form>		
		</div>
		<div class="resumeRight">
			<ul class="resumeRight_top">
				<li @click="jumperUrl('dropInBox')"><i class="icon_dropInBox"></i><span class="text">投递箱</span></li>
				<li><i class="icon_myresume"></i><span class="text">我的简历</span></li>
				<li @click="jumperUrl('collentBox')"><i class="icon_collents"></i><span class="text">我的收藏</span></li>
			</ul>
			<div class="resumeRight_bottom">
				<h4 class="resumeTitle">附件简历</h4>
				<el-upload
				  class="upload-demo"
				  :action="action_java"
				  :on-remove="handleRemove" style="width:100%">
				  <el-button type="primary" style="width:100%">上传附件</el-button>
				  <div slot="tip" class="el-upload__tip">支持doc、docx、pdf文件</div>
				</el-upload>				
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
   import api from  '../../../apis/company/editorResume.js'
   import commonApi from  '../../../apis/company/employCommon.js'
   import util from '../../../common/js/util.js'
   import validate from "../../../validate"
   export default{
   	  data () {
   	  	return {
   	  		updateTipTime: '',
 			userInforForm:{
 				name: '',
 				birthday: '',
 				phone: '',
 				sex: '',
 				id: '',
 				jobStatus: '',
 				startTime: '',
 				weChat: ''
 			},
 			advantageForm:{
 				advantage: '',
 			},
 			labelPosition: 'top',
 			action_java: '',
 			intentionForm: {
 				intentionJob: '',
 				intentionCity: ''
 			},
 			workForm:{
 				companyName: '',
 				industryInvolved: [],
 				jobTitle: '',
 				skillsLabel: '',
 				departMent: '',
 				jobContent: '',
 				workStartTime: '',
 				workEndTime: '',
 				schoolName: '',
 				education: '',
 				studyStartTime: '',
 				studyEndTime: ''

 			},
 			userInfoRules:{
 				jobStatus: [
 					{require: true, message: '请选择状态',trigger: 'change'}
 				],
 				startTime: [{require: true, message: '请选择工作时间',trigger: 'change',type:'date'}],
 				weChat: [{require: true, message: '请输入微信号',trigger: 'change'}],
 				mobile:[{ validator: validate.phonevalidate, trigger: 'blur' }],
 			},
 			advantageRules:{
 				advantage:[{require: true, message: '请输入你的优势',trigger: 'change'}]
 			},
 			intentionRules:{

 			},
 			workRules:{
 				studyEndTime: [{require: true, message: '请选择工作时间',trigger: 'change',type:'date'}],
 				

 			},
 			resumeId: '',
 			userSure: false,
 			userFlag: false,
 			advantageSure: false,
 			advantageFlag:false,
 			intentionSure: false,
 			intentionFlag: false,
 			workSure: false,
 			workFlag: false,
 			cityList:[],
 			options: [],
 			props:{
 				value: 'industryName',
                children: 'child',
                label: 'industryName'
 			}
   	  	}
   	  },
   	  methods:{
   	  	handleRemove () {},
   	  	userSubmit (form) {
   	  		var _this = this;
   	  		this.$refs[form].validate((valid) => {
   	  			if(valid) {
   	  				var formData = new FormData();
   	  				formData.append('stuId',_this.userInforForm.id);
   	  				formData.append('jobStatus',_this.userInforForm.jobStatus);
   	  				formData.append('startTime',util.formatDate.format(_this.userInforForm.startTime, 'yyyy-MM'));
   	  				formData.append('weChat',_this.userInforForm.weChat);
   	  				formData.append('name',_this.userInforForm.name);
   	  				formData.append('birthday',_this.userInforForm.birthday ? _this.userInforForm.birthday : '2017-10-10');
   	  				formData.append('sex',_this.userInforForm.sex);
   	  				formData.append('mobile',_this.userInforForm.mobile);
   	  				_this.userSure = true
   	  				api.saveUserMsg(formData).then(response => {
   	  					if(response.data.meta.code == 200) {
   	  						_this.resumeId = response.data.data
   	  						_this.userFlag = true
   	  					} else {
		   	  				formData.delete('stuId');
		   	  				formData.delete('jobStatus');
		   	  				formData.delete('startTime');
		   	  				formData.delete('weChat');
		   	  				formData.delete('name');
		   	  				formData.delete('birthday');
		   	  				formData.delete('sex');
		   	  				formData.delete('mobile');
		   	  				_this.userFlag = true   	  						
   	  					}
   	  				})
   	  			}
   	  		})
   	  	},
   	  	advantageSubmit (form) {
   	  		var _this = this
   	  		this.$refs[form].validate((valid) => {
   	  			if(valid) {
   	  				var formData = new FormData();
   	  				formData.append('id', _this.resumeId);
   	  				formData.append('advantage',_this.advantageForm.advantage);
   	  				_this.advantageSure = true
   	  				api.saveAdvantage(formData).then(response =>{
   	  					if(response.data.meta.code == 200) {
   	  						_this.advantageFlag = true
   	  					} else {
	   	  				   formData.delete('id');
	   	  				   formData.delete('advantage');   	  						
	   	  				   _this.userFlag = true
   	  					}
   	  				})
   	  			}
   	  		})
   	  	},
   	  	intentionSubmit (form){
   	  		var _this = this
   	  		this.$refs[form].validate((valid) => {
   	  			if(valid) {
   	  				var formData = new FormData();
   	  				formData.append('id',_this.resumeId);
   	  				formData.append('intentionJob',_this.intentionForm.intentionJob);
   	  				formData.append('intentionCity',_this.intentionForm.intentionCity);
   	  				_this.intentionSure = true;
   	  				api.saveIntention(formData).then(response => {
   	  					if(response.data.meta.code == 200) {
   	  						_this.intentionFlag = true
   	  					} else {
							formData.delete('id');
		   	  				formData.delete('intentionJob');
		   	  				formData.delete('intentionCity'); 
		   	  				_this.intentionFlag = true  	  						
   	  					}
   	  				})
   	  			}
   	  		})
   	  	},
   	  	workSubmit (form) {
   	  		var _this = this
   	  		this.$refs[form].validate((valid) => {
   	  			if(valid) {
   	  				var formData = new FormData();
   	  				formData.append('stuId',_this.userInforForm.id);
   	  				formData.append('id',_this.resumeId);
   	  				formData.append('companyName',_this.workForm.companyName);
   	  				formData.append('industryInvolved',_this.workForm.industryInvolved.join('/'));
   	  				formData.append('jobTitle',_this.workForm.jobTitle);
   	  				formData.append('skillsLabel',_this.workForm.skillsLabel);
   	  				formData.append('departMent',_this.workForm.departMent);
   	  				formData.append('jobContent',_this.workForm.jobContent);
   	  				formData.append('workStartTime',util.formatDate.format(_this.workForm.workStartTime,'yyyy-MM'));
   	  				formData.append('workEndTime',util.formatDate.format(_this.workForm.workEndTime,'yyyy-MM'));
   	  				formData.append('schoolName',_this.workForm.schoolName);
   	  				formData.append('education',_this.workForm.education);
   	  				formData.append('studyStartTime',util.formatDate.format(_this.workForm.studyStartTime,'yyyy-MM'));
   	  				formData.append('studyEndTime',util.formatDate.format(_this.workForm.studyEndTime,'yyyy-MM'));
   	  				_this.workSure = true
    	  			api.saveWorkAndStudy(formData).then(response => {
   	  					if(response.data.meta.code == 200) {
   	  						_this.workFlag = true
   	  					} else {
   	  						formData.delete('stuId');
		   	  				formData.delete('id');
		   	  				formData.delete('companyName');
		   	  				formData.delete('industryInvolved');
		   	  				formData.delete('jobTitle');
		   	  				formData.delete('skillsLabel');
		   	  				formData.delete('departMent');
		   	  				formData.delete('jobContent');
		   	  				formData.delete('workStartTime');
		   	  				formData.delete('workEndTime');
		   	  				formData.delete('schoolName');
		   	  				formData.delete('education');
		   	  				formData.delete('studyStartTime');
		   	  				formData.delete('studyEndTime');
		   	  				_this.workFlag = true   	  						
   	  					}
   	  				})  	  				
   	  			}
   	  		})
   	  	},
   	  	cancel () {},
   	  	jumperUrl (name) {
   	  		this.$router.push({
   	  			name: name
   	  		})
   	  	},
   	  	getCityList () {
   	  		var _this = this
   	  		commonApi.getCityList().then(response =>{
   	  			if(response.data.meta.code == 200) {
   	  				var data =response.data.data
   	  				_this.cityList = data
   	  			}
   	  		})
   	  	},
   	  	getIndustry () {
   	  		var _this = this
   	  		commonApi.getIntustry().then(response =>{
   	  			if(response.data.meta.code == 200) {
   	  				var data =response.data.data
   	  				_this.options = data
   	  			}
   	  		})
   	  	}

   	  },
   	  mounted () {
   	  	  // 从sessionStorage中获取用户的信息
   	  	  this.userInforForm.name = window.sessionStorage.getItem('name');
   	  	  this.userInforForm.birthday = window.sessionStorage.getItem('birthday');
   	  	  this.userInforForm.phone = window.sessionStorage.getItem('phone');
   	  	  this.userInforForm.sex = window.sessionStorage.getItem('sex');
    	  this.userInforForm.id = window.sessionStorage.getItem('stuId');
    	  // 获取城市的列表
    	  this.getCityList()
    	  // 获取行业的列表
    	  this.getIndustry()
   	  }
   }
</script>
<style type="text/css" lang="scss" scoped>
	.content{
		width:1200px;
		min-height:1580px;
		background:#fff;
		margin: 16px auto 0 auto;
		display:flex;
		.resumeLeft{
			width:857px;
			background:#fff;
			margin-right:24px;
			padding:22px 32px 49px;
			.updateTip{
				color:#999;
				font-size:12px;
			}
		}
		.resumeRight{
			width:318px;
		}

	}
	// 女
	.women{
		display:inline-block;
		width:13px;
		height:13px;
		background:url(../../../assets/img/connet/women.png) no-repeat;
	}
	// 男
	.men{
		display:inline-block;
		width:13px;
		height:13px;
		background:url(../../../assets/img/connet/men.png) no-repeat;
	}
	.editor{
		display:inline-block;
		width:20px;
		height:16px;
		background:url(../../../assets/img/connet/script.png) no-repeat;
		background-position: -259px -104px;
	}
	.absolute{
		color: #208af5;
		font-size:12px;
	}
	.telIcon{
		display:inline-block;
		width:10px;
		height:14px;
		background:url(../../../assets/img/connet/script.png) no-repeat;
		background-position: -259px -44px;
	}
	.weChatIcon{
		display:inline-block;
		width:17px;
		height:14px;
		background:url(../../../assets/img/connet/script.png) no-repeat;
		background-position: -259px -74px;
	}
	.advantageTitle{
		border-bottom:1px solid #eee;
	    height:30px;
	    line-height:30px;
	    color:#333;
	    font-size:16px;
	    font-weight:normal;
	    display:flex;
	    justify-content:space-between;
	    padding-top:32px;
	    margin-bottom:21px;
	}
// 个人资料
.presonalInformation{
	display:flex;
	 justify-content:space-between;
	 // 学生名字
	 .presonalName{
	 	font-size:18px;
	 	color:#333;
	 	font-weight:bold;
	 }
	 .sex{
	 	font-size:12px;
	 }
	 .colormen{
	 	color:#5ea9f5;

	 }
     .colorwomen{
     	color:#ef0000;
     }
     .absoluteEditor{
     	margin-left:170px;
     }
     .presonalList{
     	color: #333;
     	font-size:14px;
     }
     .presonalInformation_right{
     	width:80px;
     	height:80px;
     	border-radius:50%;
     	overflow:hidden;
     }
}
.add{
	display:inline-block;
	width:16px;
	height:16px;
	background:url('../../../assets/img/connet/script.png') no-repeat;
	background-position: -48px -352px;
}
.delete{
	display:inline-block;
	width:16px;
	height:16px;
	background:url('../../../assets/img/connet/script.png') no-repeat;
	background-position: -259px -136px; 
}
.comName{
	color:#000;
	font-size:14px;
}
.comList{
	margin-top:15px;
}
.comListDl{
	display:flex;
	dt{
		width:80px;
	}
	dd{
		flex:1;
	}
	.label{
		display:inline-block;
		padding: 8px 11px;
		border:1px solid #ccc;
		border-radius:10%;
		margin-right:16px;
	}
}
.workLists{
  position:relative;
  .absoluteDiv{
  	position:absolute;
  	right:0px;
  	top:0px;
  }
}

.icon_collents{
		display:block;
		width:26px;
		height:26px;
		background:url(../../../assets/img/connet/script.png) no-repeat;
		background-position: -199px -518px;
	}
.icon_dropInBox{
	display:block;
	width:26px;
	height:26px;
	background:url(../../../assets/img/connet/script.png) no-repeat;
	background-position: -304px  -44px;
}
.icon_myresume{
	display:block;
	width:26px;
	height:26px;
	background:url(../../../assets/img/connet/script.png) no-repeat;
	background-position: -304px  -86px;
}
.resumeRight_top{
	height:112px;
	background:#fff;
	margin-bottom:24px;
	display:flex;
	align-items:center;
	li{
		flex:1;
		display:flex;
		justify-content:center;
		flex-direction:column;
		align-items:center;
		.text{
			display:block;
			margin-top:15px;
		}
	}
}
.resumeRight_bottom{
	height:161px;
	background:#fff;
	padding: 22px 20px 28px 28px;
	box-sizing:border-box;
	.resumeTitle{
		color:#000;
		font-size:18px;
		font-weight:normal;
		margin-bottom:24px;
	}
}

/*编辑简历*/
.updateTip{
	margin-bottom:20px;
}
.resumeMessage{
	margin-top:20px;
}
.titleText{
	margin-bottom:20px;
}
.line{
		margin-top:30px;
		text-align:center;
	}
</style>
<style type="text/css" lang="scss">
	.rightLayout{
		text-align:right;
	}
	.timeIndex{
		.el-form-item__label{
			text-indent:-999999px;
		}
	}
</style>