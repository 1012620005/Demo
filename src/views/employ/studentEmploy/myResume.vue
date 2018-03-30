<template>
	<div class="content">
		<div class="resumeLeft">
			<p class="updateTip">最后更新{{updateTipTime}}</p>
			<div class="resumeMessage">
				<div class="presonalInformation">
					<div class="presonalInformation_left">
					    <div class="presonalInfo" v-show="!presonalInfo">
							<p class="presonalOne" style="margin-top:37px;">
								<span class="presonalName">{{userInforForm.name}}</span>
								<i class="women" v-show="userInforForm.sex == 2"></i>
								<i class="men" v-show="userInforForm.sex == 1"></i>
								<span class="sex" :class="[ userInforForm.sex == 2?'colorwomen': 'colormen']">{{ userInforForm.sex == 2? '女': '男' }}</span>
								<span class="absolute absoluteEditor" @click="editorUserMsg">
									<i class="editor"></i>
										编辑
								</span>
							</p>
							<p class="presonalOne" style="padding:28px 0 29px;">
								<span class="presonalList" style="padding-right:34px;">{{ userInforForm.workDate }}</span>
								<span class="presonalList" style="padding-right:34px;">{{ userInforForm.age }}</span>
								<span class="presonalList" style="pading-top:">{{ userInforForm.jobStatus == '0'? '离职': '在职' }}</span>
							</p>
							<p class="presonalOne" style="padding-bottom:40px;">
								<i class="telIcon"></i><span class="presonalList" style="margin-right:17px;">{{ userInforForm.mobile }}</span>
								<i class="weChatIcon"></i><span class="presonalList">{{ userInforForm.weChat }}</span>
							</p>
						</div>
						<el-form  ref="userInforForm" :model="userInforForm"  :label-position="labelPosition" :rules="userInfoRules" v-show="presonalInfo" style="margin-top:10px;">
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
											    <el-option :key='0' label="离职" :value="0"></el-option>
											    <el-option :key="1" label="在职" :value="1"></el-option>
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
		  					    		<el-form-item label="手机号">
		  					    			<el-input v-model="userInforForm.mobile" :disabled="true"></el-input>
		  					    		</el-form-item>
		  					    	</el-col>
		  					    </el-row>
		  					    <el-form-item class="rightLayout">
								    <el-button type="primary" @click="userSubmit('userInforForm')">确定</el-button>
								    <el-button @click="cancel('userInforForm')">取消</el-button>
		  						</el-form-item>
						</el-form>						
					</div>
					<div class="presonalInformation_right">
						<img :src="photoImg" class="presonal_photo"/>
					</div>
				</div>
				<div class="presonalAdvantage">
					<div class="presonalAdCon" v-show="!advantageFlag">
						<h4 class="advantageTitle">
							<span>我的优势</span>
							<span class="absolute" @click="editorAdvan">
								<i class="editor"></i>
										编辑
							</span>
						</h4>
						<p class="presonalList">{{advantageForm.advantage}}</p>						
					</div>
					<el-form  :label-position="labelPosition" ref="advantageForm" :rules="advantageRules" :model="advantageForm" v-show="advantageFlag">
					<el-form-item label="我的优势" prop="advantage">
	    				<el-input v-model="advantageForm.advantage" type="textarea" :rows="6" resize="none"></el-input>
	  				</el-form-item>
  					<el-form-item class="rightLayout">
						<el-button type="primary" @click="advantageSubmit('advantageForm')">确定</el-button>
						<el-button @click="cancelAd('advantageForm')">取消</el-button>
  				    </el-form-item>	  				
				</el-form>					
				</div>
				<div class="presonalAdvantage" v-show="intentionFlag">
					<h4 class="advantageTitle">
						<span>求职意向</span>
					</h4>
				    <el-form  ref="intentionForm" :model="intentionForm"  :label-position="labelPosition" :rules="intentionRules" >
				        <el-row  :gutter="20">
					    	<el-col :span="8">
									<el-form-item label="职位" prop="intentionJob">
			    						<el-cascader  :options="positionList" v-model="intentionForm.intentionJob" :props="propsList"></el-cascader>
			  						</el-form-item>
		  					</el-col>
		  					<el-col :span="8">
									<el-form-item label="城市" prop="intentionCity">
			    						<el-select v-model="intentionForm.intentionCity" placeholder="请选择" @click="changeCity">
										    <el-option :key="item.code" :label="item.name" :value="item.code" v-for="item in cityList"></el-option>
	  								    </el-select>
			  						</el-form-item>
		  					</el-col>
	  					</el-row>
	  					<el-form-item class="rightLayout">
							    <el-button type="primary" @click="intentionSubmit('intentionForm')">确定</el-button>
							    <el-button @click="cancelInter('intentionForm')">取消</el-button>
	  				    </el-form-item>
				    </el-form>					
				</div>
				<div class="presonalAdvantage"v-show="!intentionFlag">
					<h4 class="advantageTitle">
							<span>求职意向</span>
							<span class="absolute" @click="editorintention">
								<i class="editor"></i>
										编辑
							</span>
					</h4>
					<p class="presonalList"><span style="margin-right:10px;">{{ showJob }}</span><span>{{ intentionForm.intentionCityName }}</span></p>	
				</div>
				<div class="presonalAdvantage">
					<h4 class="advantageTitle">
						<span>工作经历</span>
					    <span class="absolute" @click="addWork" v-show="!addWorkFlag">
							<i class="add"></i>
								添加
						</span>
					</h4>
					<!--添加和编辑工作经历-->
					<div class="addWorkBox" v-show="addWorkFlag">
						<el-form ref="workForm" :model="workForm" label-position="top" :rules="workRules">
								<el-row  :gutter="20">
									<el-col :span="8">
										<el-form-item label="公司名称">
				    						<el-input v-model="workForm.companyName"></el-input>
				  						</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="所属行业">
		    				    			<el-cascader  :options="options" v-model="workForm.industryInvolved" :props="props"></el-cascader>
		  								</el-form-item>
									</el-col>
									<el-col :span="8">
										 <el-form-item label="所属部门">
				    						<el-input v-model="workForm.departMent"></el-input>
				  						</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="20">
									<el-col :span="7">
										<el-form-item label="在职时间">
				    							<el-date-picker
											      v-model="workForm.workStartTime" type="month"  placeholder="选择日期">
											    </el-date-picker>
				  						</el-form-item>
									</el-col>
									<el-col :span="2" class="line">-</el-col>
									<el-col :span="7">
										<el-form-item label="在职时间" class="timeIndex">
					    					<el-date-picker
											      v-model="workForm.workEndTime" type="month"  placeholder="选择日期">
											</el-date-picker>
					  					</el-form-item>
									</el-col>
									<el-col :span="8">
										 <el-form-item label="技能标签">
				    						<el-input v-model="workForm.skillsLabel"></el-input>
				  						</el-form-item>
									</el-col>
								</el-row>
								<el-form-item label="工作内容">
				    				<el-input v-model="workForm.jobContent" type="textarea" :rows="6" resize="none"></el-input>
				  				</el-form-item>	
				  				<el-row>
					  				<el-col :span="8">
						  				<el-form-item label="职位名称">
						    				<el-input v-model="workForm.jobTitle"></el-input>
						  				</el-form-item>	
						  			</el-col>	
					  			</el-row>
					  			<p>
								    <el-button type="primary" @click="workOption('workForm')">确定</el-button>
								    <el-button @click="workOptionDel('workForm')">取消</el-button>
                        		</p>							
						</el-form>						
					</div>
					<ul>
						<li v-for="(item, index) in workExperience" class="workLists">
							<h4 class="comName">{{ item.companyName }}</h4>
							<p class="comList">
								<span>职位名称:</span><span>{{item.jobTitle}}</span>
								<span>所属行业:</span><span>{{item.industryInvolved}}</span>
							</p>
							<p class="comList">
							   <span>在职时间:</span><span>{{item.workStartTime}} - {{item.workEndTime}}</span>
								<span>所属部门:</span><span>{{item.departMent}}</span>
							</p>
							<dl class="comList comListDl">
								<dt>技能标签:</dt>
								<dd>
									<span class="label">{{ item.skillsLabel }}</span>
								</dd>
							</dl>
							<dl class="comList comListDl">
								<dt>工作内容:</dt>
								<dd class="resumeContentList"><el-input v-model="item.jobContent" type="textarea" :rows="6" resize="none" readonly="readonly"></el-input></dd>
							</dl>
							<div class="absoluteDiv">
								<span class="absolute" @click="editorWork(item,index)">
									<i class="editor"></i>
									编辑
								</span>
								<span class="absolute" @click="delWork(item.workId,index)">
									<i class="delete"></i>
									删除
								</span>
							</div>
						</li>
					</ul>
						
				</div>
				<div class="presonalAdvantage">
					<h4 class="advantageTitle">
						<span>教育经历</span>
					   <!--  <span class="absolute" @click="addEdu">
							<i class="add"></i>
								添加
						</span> -->
					</h4>
					<div class="editorEdu" v-show="addEduFlag">
						<el-form ref="eduForm" :model="eduForm" label-position="top" :rules="eduRules">
						 <el-row  :gutter="20">
							<el-col :span="11">
								<el-form-item label="学校名称" prop="schoolName">
		    						<el-input v-model="eduForm.schoolName"></el-input>
		  						</el-form-item>
							</el-col>
							<el-col :span="11">
								 <el-form-item label="学历" prop="education">
		    						<el-input v-model="eduForm.education"></el-input>
		  						</el-form-item>
							</el-col>
						</el-row>
						<el-row  :gutter="20">
							<el-col :span="7">
								<el-form-item label="时间段" prop="studyStartTime">
		    						<el-date-picker
									      v-model="eduForm.studyStartTime" type="month"  placeholder="选择日期">
									    </el-date-picker>
		  						</el-form-item>
							</el-col>
							<el-col :span="2" class="line">-</el-col>
							<el-col :span="7">
								 <el-form-item label="时间段" class="timeIndex" prop="studyEndTime">
		    							<el-date-picker
									      v-model="eduForm.studyEndTime" type="month"  placeholder="选择日期">
									    </el-date-picker>
		  						</el-form-item>
							</el-col>
						   <el-col :span="8">
			  			   </el-col>
						</el-row>
					  	<p>
						    <el-button type="primary" @click="eduOption('eduForm')">确定</el-button>
						    <el-button @click="eduDel('eduForm')">取消</el-button>
                        </p>						 
					    </el-form>
					</div>
					<ul v-show="!addEduFlag">
						<li class="workLists">
							<p class="">{{educations.schoolName }}</p>
							<p class="comList">
								<span>开始时间:</span><span>{{ educations.studyStartTime }}</span>
								<span>结束时间:</span><span>{{ educations.studyEndTime }}</span>
							</p>
							<p class="comList">
								<span>学历:</span><span>{{ educations.education }}</span>
							</p>
							<div class="absoluteDiv">
								<span class="absolute" @click="editorEdu(educations)">
									<i class="editor"></i>
									编辑
								</span>
								<!-- <span class="absolute" @click="delEdu(educations.eduId)">
									<i class="delete"></i>
									删除
								</span> -->
							</div>
						</li>
					</ul>
				</div>				
			</div>
		</div>
		<div class="resumeRight">
			<ul class="resumeRight_top" style="cursor:pointer">
				<li @click="jumper('dropInBox')"><i class="icon_dropInBox"></i><span class="text">投递箱</span></li>
				<li><i class="icon_myresume"></i><span class="text">我的简历</span></li>
				<li @click="jumper('collentBox')"><i class="icon_collents"></i><span class="text">我的收藏</span></li>
			</ul>
			<!-- <div class="resumeRight_bottom">
				<h4 class="resumeTitle">附件简历</h4>
				<el-upload
				  class="upload-demo"
				  :action="action_java"
				  :on-remove="handleRemove" style="width:100%">
				  <el-button type="primary" style="width:100%">上传附件</el-button>
				  <div slot="tip" class="el-upload__tip">支持doc、docx、pdf文件</div>
				</el-upload>				
			</div> -->
		</div>
	</div>
</template>
<script type="text/javascript">
   import apis from '../../../apis/company/myResume.js'
   import api from '../../../apis/company/editorResume.js'
   import util from '../../../common/js/util.js'
   import commonApi from  '../../../apis/company/employCommon.js'
   import validate from "../../../validate"
   export default{
   	  data () {
   	  	return {
   	  		updateTipTime: '',
   	  		resumeId: '',
   	  		stuId: '',
   	  		photoImg: 'static/img/defaultPhoto.png',
   	  		workExperience: [],
   	  		educations:{},
   	  		action_java: '',
   	  		presonalInfo: false,
   	  		advantageFlag: false,
   	  		intentionFlag: false,
   	  		positionList:[],
 			propsList:{
 				value: 'positionName',
                children: 'child',
                label: 'positionName'
 			}, 
 			cityList:[],  	  		
   	  		workForm:{
   	  			companyName: '',
   	  			industryInvolved: [],
   	  			departMent: '',
   	  			workStartTime: '',
   	  			workEndTime: '',
   	  			skillsLabel: '',
   	  			jobContent: '',
   	  			jobTitle: '',
   	  			workId: '',
   	  			resumeId: ''
   	  		},
   	  		eduForm: {
   	  			resumeId: '',
   	  			eduId:'',
   	  			schoolName: '',
   	  			education: '',
   	  			studyStartTime: '',
   	  			studyEndTime: ''

   	  		},
   	  		eduRules:{
   	  			schoolName:[{required: true, message: '请输入学校名称',trigger: 'change'}],
   	  			education:[{required: true, message: '请输入学历',trigger: 'change'}],
   	  			studyStartTime:[{required: true, message: '请选择教育的开始时间',trigger: 'change',type:'date'}],
   	  			studyEndTime:[{required: true, message: '请选择教育的结束时间',trigger: 'change',type:'date'}]
   	  		},
   	  		intentionForm:{
   	  			intentionJob: [],
				intentionCity: '',
				intentionCityName:'' 
   	  		},
   	  		intentionRules:{
   	  			intentionJob: [{required: true, message: '请选择职位',trigger: 'change',type:'array'}],
   	  			intentionCity: [{required: true, message: '请选择工作城市',trigger: 'change'}]
   	  		},
   	  		workRules:{
   	  			workEndTime: [{required: true, message: '请选择工作的结束时间',trigger: 'change',type:'date'}],
   	  			companyName: [{required: true, message: '请输入公司名',trigger: 'change'}],
   	  			industryInvolved:[{required: true, message: '请选择行业',trigger: 'change',type:'array'}],
   	  			departMent:[{required: true, message: '请输入公司名',trigger: 'change'}],
   	  			workStartTime:[{required: true, message: '请选择开始工作时间',trigger: 'change',type:'date'}],
   	  			skillsLabel:[{required: true, message: '请输入你的技能',trigger: 'change'}],
   	  			jobContent:[{required: true, message: '请输入你的工作内容',trigger: 'change'}],
   	  			jobTitle:[{required: true, message: '请输入职位名称',trigger: 'change'}]
   	  			
   	  		},
   	  		addWorkFlag: false,
   	  		addEduFlag: false,
   	  		options: [],
 			props:{
 				value: 'industryName',
                children: 'child',
                label: 'industryName'
 			},
 			labelPosition: 'top',
 			userInfoRules:{
 				jobStatus: [
 					{required: true, message: '请选择状态',trigger: 'change',type: 'number'}
 				],
 				startTime: [{required: true, message: '请选择工作时间',trigger: 'change',type:'date'}],
 				weChat: [{required: true, message: '请输入微信号',trigger: 'blur'}],
 				mobile:[{ validator: validate.phonevalidate, trigger: 'change' ,required: true}]
 			},
 			userInforForm:{
 				name: '',
 				birthday: '',
 				mobile: '',
 				sex: '',
 				id: '',
 				jobStatus: '',
 				startTime: '',
 				weChat: '',
				workDate: '',
				age: ''
 			},
 			editor: false,
 			editorAd: false,
 			advantageRules:{
 				advantage:[{required: true, message: '请输入你的优势',trigger: 'change'}]
 			},
 			advantageForm:{
 				advantage: ''
 			}
   	  	}
   	  },
   	  methods:{
	    jumper (name) {
			console.log(this.$bus)
			this.$bus.emit('jumper',name)
			this.$router.push(name)
			
		},
   	  	handleRemove () {},
   	  	editorUserMsg () {
   	  		this.editor = true
   	  		this.presonalInfo = true

   	  	},
   	  	editorAdvan () {
   	  		this.advantageFlag = true
   	  	},
   	  	editorAdvanSure () {
   	  		var _this = this
   	  		var formData = new FormData();
   	  		 formData.append('id',this.resumeId);
   	  		 formData.append('advantage',this.advantage);
   	  		 apis.editorAdvange(formData).then(response => {
   	  		 	if(response.data.meta.code == 200) {
   	  		 		_this.$message({
   	  		 			type:'success',
   	  		 			message: '修改成功'
   	  		 		})
   	  		 		this.advantageFlag = false
   	  		 	}
   	  		 })
   	  	},
   	  	addWork (){
   	  		this.addWorkFlag = true
   	  	},
   	  	addEdu () {},
   	  	workOption (form) {
   	  		var _this = this
   	  		if(!this.resumeId) {
   	  			this.$message({
   	  				type:'error',
   	  				message:'请先添加个人信息'
   	  			})
   	  			return false
   	  		}
   	  		this.$refs[form].validate((valid) => {
	   	  			if(valid) {
	   	  				var formData = new FormData();
	   	  				this.workForm.workStartTime = new Date(this.workForm.workStartTime)
			   	  		this.workForm.workEndTime = new Date(this.workForm.workEndTime)
			   	  		formData.append('companyName',this.workForm.companyName)
			   	  		formData.append('industryInvolved',this.workForm.industryInvolved.join('/'))
			  			formData.append('departMent',this.workForm.departMent)
			  			formData.append('workStartTime',util.formatDate.format(this.workForm.workStartTime,'yyyy-MM'))
			  			formData.append('workEndTime',util.formatDate.format(this.workForm.workEndTime,'yyyy-MM'))
			  			formData.append('skillsLabel',this.workForm.skillsLabel)
			  			formData.append('jobContent',this.workForm.jobContent)
			  			formData.append('jobTitle',this.workForm.jobTitle)
			  			formData.append('resumeId',this.resumeId)
			  			formData.append('stuId',this.stuId)
			  			//如果有workId 表示编辑反之为添加
		   	  		if(this.workForm.workId) {
		   	  			formData.append('workId',this.workForm.workId)
		   	  			apis.editorExprience(formData).then(response =>{
		   	  				if(response) {
		   	  					_this.$message({
		   	  						type:'success',
		   	  						message: '编辑成功'
		   	  					})
		   	  					_this.addWorkFlag = false
		   	  					_this.getUserResume()
		   	  					formData.delete('workId')
			   	  				formData.delete('companyName')
					   	        formData.delete('industryInvolved')
					            formData.delete('departMent')
					  	        formData.delete('workStartTime')
					  	        formData.delete('workEndTime')
							  	formData.delete('skillsLabel')
							  	formData.delete('jobContent')
							  	formData.delete('jobTitle')
							  	formData.delete('resumeId')
								formData.delete('stuId')
								_this.workForm.companyName = ''
								_this.workForm.industryInvolved = []
								_this.workForm.departMent = ''
								_this.workForm.workStartTime = ''
								_this.workForm.workEndTime = ''
								_this.workForm.skillsLabel = ''
								_this.workForm.jobContent = ''
								_this.workForm.jobTitle = ''
								_this.workForm.workId = ''
								_this.workForm.resumeId = '' 
		   	  				}  				
		   	  			})
		   	  		} else {
		   	  			// 添加工作经历的接口
		   	  			apis.addWork(formData).then(response =>{
		   	  				if(response) {
		   	  					_this.$message({
		   	  						type:'success',
		   	  						message:'添加成功'
		   	  					})
		   	  					_this.addWorkFlag = false
		   	  					_this.getUserResume()
		   	  					
		   	  				}
		   	  				formData.delete('companyName')
				   	        formData.delete('industryInvolved')
				            formData.delete('departMent')
				  	        formData.delete('workStartTime')
				  	        formData.delete('workEndTime')
						  	formData.delete('skillsLabel')
						  	formData.delete('jobContent')
						  	formData.delete('jobTitle')
						  	formData.delete('resumeId')
							formData.delete('stuId')
							_this.workForm.companyName = ''
							_this.workForm.industryInvolved = []
							_this.workForm.departMent = ''
							_this.workForm.workStartTime = ''
							_this.workForm.workEndTime = ''
							_this.workForm.skillsLabel = ''
							_this.workForm.jobContent = ''
							_this.workForm.jobTitle = ''
							_this.workForm.workId = ''
							_this.workForm.resumeId = '' 							  
		   	  			})
		   	  		}
		   	  		this.addWorkFlag = false;
		   	  		 
	   	  		}
   	  	    })
   	  	},
   	  	workOptionDel (form) {
   	  		if(this.workExperience.length > 0){
   	  			this.addWorkFlag = false
   	  		}
   	  		this.$refs[form].resetFields();
   	  		this.workForm.companyName = ''
   	  		this.workForm.industryInvolved = []
   	  		this.workForm.departMent = ''
   	  		this.workForm.workStartTime = ''
   	  		this.workForm.workEndTime = ''
   	  		this.workForm.skillsLabel = ''
   	  		this.workForm.jobContent = ''
   	  		this.workForm.jobTitle = ''
   	  		this.workForm.workId = ''
   	  		this.workForm.resumeId = '' 

   	  	},
   	  	editorEdu (obj) {
   	  		this.eduForm.eduId = obj.eduId
   	  		this.eduForm.resumeId = obj.resumeId
   	  		this.eduForm.schoolName = obj.schoolName
   	  		this.eduForm.education = obj.education
   	  		this.eduForm.studyStartTime = new Date(obj.studyStartTime)
   	  		this.eduForm.studyEndTime = new Date(obj.studyEndTime)
   	  		this.addEduFlag = true
   	  	},
   	  	eduOption (form) {
   	  		var _this =this;
   	  		if(!this.resumeId) {
   	  			this.$message({
   	  				type:'error',
   	  				message:'请先添加个人信息'
   	  			})
   	  			return false
   	  		}
   	  		this.$refs[form].validate((valid) => {
   	  			if(valid) {
		   	  		var formData = new FormData()
		   	  		formData.append('schoolName',this.eduForm.schoolName)
		   	  		formData.append('education',this.eduForm.education)
		   	  		formData.append('studyStartTime',util.formatDate.format(this.eduForm.studyStartTime,'yyyy-MM'))
		   	  		formData.append('studyEndTime',util.formatDate.format(this.eduForm.studyEndTime,'yyyy-MM'))
		   	  	    formData.append('resumeId',this.resumeId)
			  	    formData.append('stuId',this.stuId)
			  	    if(this.eduForm.eduId) {
			  	    	formData.append('eduId',this.eduForm.eduId)
			  	    	apis.editorEdu(formData).then(response =>{
			  	    		if(response) {
			  	    			_this.$message({
			  	    				type:'success',
			  	    				message:'编辑成功'
			  	    			})
			  	    			_this.addEduFlag = false
			  	    			formData.delete('schoolName')
				   	  		    formData.delete('education')
				   	  		    formData.delete('studyStartTime')
				   	  		    formData.delete('studyEndTime')
				   	  		    formData.delete('resumeId')
				   	  		    formData.delete('stuId')
				   	  		    formData.delete('eduId')
				   	  		    _this.educations.schoolName = _this.eduForm.schoolName
				   	  		    _this.educations.education = _this.eduForm.education
				   	  		    _this.educations.studyStartTime = util.formatDate.format(_this.eduForm.studyStartTime,'yyyy-MM')
				   	  		    _this.educations.studyEndTime = util.formatDate.format(_this.eduForm.studyEndTime,'yyyy-MM')
			  	    		}
			  	    	})
			  	    } else {
			   	  		apis.addEdu(formData).then(response =>{
			   	  		    	if(response) {
			   	  		    		_this.$message({
			   	  		    			type: 'success',
			   	  		    			message: '添加成功'
			   	  		    		})
			   	  		    		_this.addEduFlag = false
			   	  		    		_this.getUserResume()
			   	  		    	}
				   	  		    formData.delete('schoolName')
				   	  		    formData.delete('education')
				   	  		    formData.delete('studyStartTime')
				   	  		    formData.delete('studyEndTime')
				   	  		    formData.delete('resumeId')
				   	  		    formData.delete('stuId')


			   	  		})			  	    	
			  	    }

		   	  		 		   	  		  	  				
   	  			}
   	  		})
   	  	},
   	  	eduDel (form) {
   	  		if(this.eduForm.eduId) {
   	  			this.addEduFlag = false
   	  		} 
   	  		this.$refs[form].resetFields();
   	  	},
   	  	editorWork (obj,index) {
   	  		this.addWorkFlag = true
   	  		this.workForm.workId = obj.workId
   	  		this.workForm.companyName = obj.companyName
   	  		this.workForm.industryInvolved = obj.industryInvolved.split('/')
   	  		this.workForm.departMent = obj.departMent
   	  		this.workForm.workStartTime = new Date(obj.workStartTime)
   	  		this.workForm.workEndTime = new Date(obj.workEndTime)
   	  		this.workForm.skillsLabel = obj.skillsLabel
   	  		this.workForm.jobContent = obj.jobContent
   	  		this.workForm.jobTitle = obj.jobTitle
			this.workForm.resumeId = obj.resumeId
			this.workExperience.splice(index,1)
				 
   	  	},
   	  	delWork (id,index) {
   	  		 var _this = this
   	  		 this.$confirm('你确定要删除这条工作经历吗？').then(()=>{
   	  		 	var formData = new FormData();
   	  		 	formData.append('workId',id)
   	  		 	apis.delWork(formData).then(response =>{
   	  		 		if(response){
   	  		 			_this.$message({
   	  		 				type:'success',
   	  		 				message: '删除成功'
   	  		 			})
   	  		 			// 再次获取列表页面更新数据
   	  		 			_this.getUserResume()
   	  		 			_this.workExperience.splice(index,1)
   	  		 			_this.workForm.companyName = ''
   	  		 			_this.workForm.industryInvolved = []
   	  		 			_this.workForm.departMent = ''
   	  		 			_this.workForm.workStartTime = ''
   	  		 			_this.workForm.workEndTime = ''
   	  		 			_this.workForm.skillsLabel = ''
   	  		 			_this.workForm.jobContent = ''
   	  		 			_this.workForm.jobTitle = ''
   	  		 			_this.workForm.workId = ''
   	  		 			_this.workForm.resumeId = ''
   	  		 		}
   	  		 	})
   	  		 }).catch(()=>{

   	  		 })
   	  	},
   	  	delEdu (id) {
   	  		 var _this = this
   	  		 this.$confirm('你确定要删除这条教育经历吗？').then(()=>{
   	  		 	var formData = new FormData();
   	  		 	formData.append('eduId',id)
   	  		 	apis.delWork(formData).then(response =>{
   	  		 		if(response.data.meta.code == 200) {
   	  		 			_this.$message({
   	  		 				type:'success',
   	  		 				message: '删除成功'
   	  		 			})
   	  		 			// 再次获取列表页面更新数据
   	  		 			// _this.getUserList()
   	  		 		}
   	  		 	})
   	  		 }).catch(()=>{

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
   	  	},
   	  	getPosition () {
   	  		var _this = this
   	  		commonApi.getPositionData().then(response =>{
   	  			if(response) {
   	  				var data = response.data.data
   	  				_this.positionList = data
   	  			}
   	  		})
   	  	},
   	  	getCityList() {
   	  		var _this = this
   	  		commonApi.getCityList().then(response =>{
   	  			if(response) {
   	  				var data = response.data.data
   	  				_this.cityList =  data
   	  			}
   	  		})
   	  	},
   	  	getUserResume () {
   	  		var formData = new FormData();
			formData.append('stuId',this.stuId);
			var _this = this
   	  		apis.getUserResume(formData).then(response =>{
   	  			if(response) {
   	  				var data  = response.data.data
   	  				if(!data) {
   	  					// 表示简历没有添加 
   	  					_this.presonalInfo = true
   	  					_this.advantageFlag = true
   	  					_this.intentionFlag = true
   	  					_this.addWorkFlag = true
   	  					_this.addEduFlag = true
   	  				} else{
   	  					if(data.startTime) {
   	  						// 表示个人信息添加完成
   	  						_this.userInforForm.jobStatus = data.jobStatus
   	  						_this.userInforForm.weChat = data.weChat
   	  						_this.userInforForm.workDate = data.workDate
							_this.userInforForm.birthday = data.birthday
							_this.userInforForm.age = data.age	 
   	  						_this.userInforForm.sex = data.sex
   	  						_this.userInforForm.startTime = new Date(data.startTime)
   	  						_this.resumeId = data.id
   	  					}
   	  					if(!data.advantage) {
   	  						// 没有添加优势
   	  						_this.advantageFlag = true
   	  					} else {
   	  						_this.advantageForm.advantage = data.advantage
   	  						_this.advantageFlag = false
   	  					}
   	  					if(!data.intentionJob) {
   	  						// 没有添加
   	  						_this.intentionFlag = true
   	  					} else {
   	  						_this.intentionForm.intentionJob = data.intentionJob.split('/')
   	  						_this.intentionForm.intentionCityName = data.intentionCity
   	  						_this.intentionFlag = false
   	  					}
   	  					if(data.workExperience.length == 0) {
   	  						// 没有添加工作经历
   	  						_this.addWorkFlag = true
   	  					} else {
   	  						_this.addWorkFlag = false
   	  						_this.workExperience = data.workExperience
   	  					}
   	  					if(!data.educations) {
   	  						_this.addEduFlag = true
   	  					} else {
   	  						_this.addEduFlag = false
   	  						this.educations = data.educations
   	  					}
						this.updateTipTime = data.updateTime
   	  				}
   	  			}
   	  		})
   	  	},
   	  	userSubmit (form){
			var _this = this;
   	  		this.$refs[form].validate((valid) => {
   	  			if(valid) {
   	  				var formData = new FormData();
   	  				formData.append('stuId',_this.stuId);
   	  				formData.append('jobStatus',_this.userInforForm.jobStatus);
   	  				formData.append('startTime',util.formatDate.format(_this.userInforForm.startTime, 'yyyy-MM'));
   	  				formData.append('weChat',_this.userInforForm.weChat);
   	  				formData.append('name',_this.userInforForm.name);
   	  				formData.append('birthday',_this.userInforForm.birthday ? _this.userInforForm.birthday : '2017-10-10');
   	  				formData.append('sex',_this.userInforForm.sex);
   	  				formData.append('mobile',_this.userInforForm.mobile);   	  				
   	  			    // 添加简历
   	  			    if(!_this.resumeId) {
	   	  				api.saveUserMsg(formData).then(response => {
	   	  					if(response) {
	   	  						var data = response.data.data
	   	  						_this.resumeId = data

							}
   	  			   			formData.delete('stuId');
			   	  			formData.delete('jobStatus');
			   	  			formData.delete('startTime');
			   	  			formData.delete('weChat');
			   	  			formData.delete('name');
			   	  			formData.delete('birthday');
			   	  			formData.delete('sex');
							formData.delete('mobile');
							_this.getUserResume()		 
							_this.presonalInfo = false	
							  
	   	  				})
   	  			    } else {
   	  			    	// 编辑简历
   	  			    	formData.append('id',_this.resumeId);
   	  			    	apis.editorUserInfo(formData).then(response =>{
				   	  	  	if(response) {
				   	  	  	 	_this.$message({
				   	  	  	 		type:"success",
				   	  	  	 		message: '修改成功'
				   	  	  	 	})
							}
							formData.delete('id')
							formData.delete('stuId');
							formData.delete('jobStatus');
							formData.delete('startTime');
							formData.delete('weChat');
							formData.delete('name');
							formData.delete('birthday');
							formData.delete('sex');
							formData.delete('mobile');
							_this.getUserResume()
							_this.presonalInfo = false
			   	  	  })
   	  			    }
   	  			}
   	  		})   	  		
   	  	},
   	  	cancel (form) {
   	  		if(this.editor) {
   	  			this.presonalInfo = false
   	  		} else {
   	  			this.$refs[form].resetFields();
   	  		    this.userInforForm.jobStatus = ''
   	  		    this.userInforForm.startTime = ''
   	  		    this.userInforForm.weChat = ''
   	  		}
   	  	},
   	  	advantageSubmit (form) {
   	  		var _this = this;
   	  		if(!this.resumeId) {
   	  			this.$message({
   	  				type:'error',
   	  				message:'请先添加个人信息'
   	  			})
   	  			return false
   	  		}
   	  		this.$refs[form].validate((valid) => {
   	  			if(valid) {
   	  				var formData = new FormData();
   	  				formData.append('id', _this.resumeId);
   	  				formData.append('advantage',_this.advantageForm.advantage);
   	  				api.saveAdvantage(formData).then(response =>{
   	  					if(response) {
   	  						_this.$message({
   	  							type:'success',
   	  							message: '修改成功'
   	  						})
   	  						_this.advantageFlag = false
   	  					} 
	   	  				formData.delete('id');
	   	  				formData.delete('advantage');
   	  					
   	  				})
   	  			}
   	  		})
   	  	},
   	  	cancelAd (form) {
   	  		if(this.advantageForm.advantage) {
   	  			this.advantageFlag = false
   	  		} else {
   	  			this.$refs[form].resetFields();
   	  			this.advantageForm.advantage = ''
   	  		}
   	  	},
   	  	intentionSubmit (form) {
   	  		var _this = this;
   	  		if(!this.resumeId) {
   	  			this.$message({
   	  				type:'error',
   	  				message:'请先添加个人信息'
   	  			})
   	  			return false
   	  		}
   	  		this.$refs[form].validate((valid) => {
   	  			if(valid) {
   	  				var formData = new FormData();
   	  				formData.append('id',_this.resumeId);
   	  				formData.append('intentionJob',_this.intentionForm.intentionJob.join('/'));
   	  				formData.append('intentionCity',_this.intentionForm.intentionCity);
					api.saveIntention(formData).then(response => {
   	  					if(response) {
   	  						_this.$message({
   	  							type:'success',
   	  							message:'修改成功'
   	  						})
   	  					} 
						    formData.delete('id');
		   	  				formData.delete('intentionJob');
		   	  				formData.delete('intentionCity'); 
		   	  				_this.intentionFlag = false;  
   	  				})   	  				
   	  			}
   	  		})
   	  	},
   	  	editorintention () {
			var _this = this
			if(this.cityList.length > 0) {
   	  		var obj = this.cityList.filter(function(m) {
   	  				return m.name == _this.intentionForm.intentionCityName
				})
				console.log(obj)
				console.log(this.intentionForm.intentionCityName)
				this.intentionForm.intentionCity = obj[0].code
				console.log(this.intentionForm.intentionCity)
			} 
			this.intentionFlag = true	 
   	  	},
   	  	cancelInter (form) {
   	  		if(this.intentionForm.intentionJob) {
   	  			this.intentionFlag = false
   	  		} else {
   	  			this.$refs[form].resetFields();
   	  			this.intentionForm.intentionJob = ''
   	  			this.intentionForm.intentionCity = ''
   	  		}
		},
		changeCity (val) {
   	  		var n = Number(val)
			if(!isNaN(n)){
   	  			if(this.cityList.length > 0) {
   	  				var obj = this.cityList.filter(function(m) {
   	  					   return m.code == str
					    })
						 this.intentionForm.intentionCityName = obj.name
						 console.log(this.intentionForm.intentionCityName)
   	  			}
   	  		}			
		}
   	  },
   	  computed:{
   	  	showJob () {
   	  		if(this.intentionForm.intentionJob.length > 0) {
   	  			return this.intentionForm.intentionJob.join('/')
   	  		} else {
   	  			return ''
   	  		}
   	  	},
   	  	// showCity() {
		// 	var str = this.intentionForm.intentionCity;
   	  	// 	var n = Number(str)
		// 	if(!isNaN(n)){
   	  	// 		if(this.cityList.length > 0) {
   	  	// 			var obj = this.cityList.filter(function(m) {
   	  	// 				   return m.code == str
		// 			    })
		// 				 console.log(obj)
   	  	// 			return obj.name
   	  	// 		} else {
   	  	// 		}
   	  			
   	  	// 	} else {
   	  	// 		return str
   	  	// 	}
   	  	// }
   	  },
   	  mounted () {
   	  	// 获取学生的id
   	  	this.stuId = window.sessionStorage.getItem('stuId');
   	  	this.userInforForm.name = window.sessionStorage.getItem('name');
   	  	this.userInforForm.sex = window.sessionStorage.getItem('sex');
   	  	this.userInforForm.mobile = window.sessionStorage.getItem('phone');
	    this.userInforForm.birthday = window.sessionStorage.getItem('birthday');
		console.log(this.$bus)	 
   	  	// 检测用户上次提交信息没
   	  	this.getUserResume()
   	  	// 获取行业的列表
    	this.getIndustry()
    	// 获取职位的列表
    	this.getPosition()
    	// 获取城市的列表
    	this.getCityList()
   	  }
   }
</script>
<style type="text/css" lang="scss" scoped>
	.content{
		width:1200px;
		min-height:1000px;
		margin: 16px auto 0 auto;
		display:flex;
		.resumeLeft{
			width:857px;
			background:#fff;
			margin-right:24px;
			padding:22px 32px 49px;
			height:auto;
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
		cursor:pointer;
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
     	padding-left:10px;
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
.presonalOneEditor{
	line-height:93px;
}
</style>
<style type="text/css" lang="scss">
	.resumeRight_bottom{
		.el-upload--text{
			width:100%;
			background:#eef1f6;
			color:#333;
			font-size:16px;
			.el-button--primary{
				background:#eef1f6;
				color:#333;
			    font-size:16px; 
			    border-color:#eef1f6;
			}
		}
	}
	.resumeContentList{
		.el-textarea__inner{
			border:none;
			background-color:inherit
		}
	}
</style>