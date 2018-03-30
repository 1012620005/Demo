<template>
<div>
	<el-steps :space="618" :active="active" finish-status="success" class="elStep" align-center>
				  <el-step title="填写联系方式">
				  </el-step>
				  <el-step title="填写公司名称">
				  </el-step>
	</el-steps>
	<div class="elSteps loginRouter">
		<el-form ref="form" :model="form" label-width="0" :rules="rules" enctype="multipart/form-data">
						<div v-show="active == 0">
						 <el-form-item label="" prop="contant">
				   			 <el-input type="text" v-model="form.contant" auto-complete="off" placeholder="请输入姓名"></el-input>
				  		</el-form-item>
						 <el-form-item label="" prop="email">
				   			 <el-input type="text" v-model="form.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
				  		</el-form-item>
						 <el-form-item label="" prop="passWord">
				   			 <el-input type="text" v-model="form.passWord" auto-complete="off" placeholder="设置新密码"></el-input>
				  		</el-form-item>				  		
				  		<el-button type="primary" class="step" @click="stepNext">下一步</el-button>
				  		</div>
				  		<div v-show="active == 1">
							<el-form-item label="" prop="companyName">
					   			 <el-input type="text" v-model="form.companyName" auto-complete="off" placeholder="请填写公司名称"></el-input>
					  		</el-form-item>
							 <el-form-item label="" prop="telNumber">
					   			 <el-input type="text" v-model.number="form.telNumber" auto-complete="off" placeholder="请输入手机号"></el-input>
					  		</el-form-item>
							 <el-form-item label="" prop="yan" >
							 	<div class="formFlex">
							 		<el-input type="text" v-model="form.yan" auto-complete="off" placeholder="验证码"></el-input><el-button type="primary" :disabled="flagTime" @click="setTimeOut">{{ timeOut }}</el-button>
							 	</div>
					  		</el-form-item>
					  		<el-form-item label="" prop="companyFile">
					  			<el-upload
								  class="upload-demo"
								  :action="action_java"
								  :data="fileData"
								  accept=".jpg,.png,.jpeg"
								  ref="upload" 
								  :on-change="handleChange"
								  :show-file-list="false" :auto-upload="true" :on-success="uploadCallBack">
								  <el-button  type="text">上传营业执照</el-button>
								  <dl slot="tip" class="noteList">
								  	 <dt>备注:</dt>
					  		    	 <dd>
					  		    		<p>1.支持GIF,JPG,PNG格式,大小不超过2M</p>
					  		    		<p>2.请上传加盖公司公章(红章)的营业执照扫描件</p>
					  		    	 </dd>
								  </dl>
								  <img v-show="imageUrl" :src="imageUrl" class="avatar">
								</el-upload>
					  		</el-form-item>
				  		   <el-button type="primary" @click="submitForm('form')" :loading="flag"class="step">提交</el-button>
				  		</div>
		</el-form>				    
	</div>
</div>
</template>
<script type="text/javascript">
   import validate from '../../../validate/index.js'
   import apis from '../../../apis/company/companyLogin.js'
   import res from '../../../apis/company/response.js'
	export default {
		data () {
			return {
				active: 0,
				form:{
					contant: '',
					telNumber: '',
					email: '',
					companyName:'',
					passWord: '',
					yan: '',
					companyFile: '',
					fileId:''
				},
				rules:{
					contant: [
						{type: 'string', required: true, message: '请填写姓名', trigger: 'blur' }
					],
					telNumber: [
						{validator: validate.phonevalidate, trigger: 'blur'}
					],
					email: [
						{validator: validate.emailx, trigger: 'blur'}
					],
					companyName: [
						{type: 'string', required: true, message: '请填写公司名称', trigger: 'blur' }
					],
					passWord: [
						{validator: validate.passwords, trigger: 'blur'}
					],
					companyFile: [
						{required: true, message: '请上传公司的营业执照', trigger: 'change', type: 'object'}
					],
					yan: [
						{required:true,message: '请输入验证码', trigger:'change'}
					]
				},
				action_java: '',
				imageUrl: '',
				imgSize: 1024*1024*2,
				imgType: ['.png','.jpg','.gif'],
				formData: new FormData(),
				flag: false,
				timeOut: '发送验证码',
				flagTime: false,
				fileData:{
					entity:"company",
                    type:"licence"
				},
				async: false
			}
		},
		components: {
		},
		methods:{
			submitForm (form) {
				if(!this.async) {
					return false;
				}
				var _this = this
				this.$refs[form].validate((valid) => {
					if(valid) {
						this.active = 2
						this.flag = true;
					    this.formData.append('companyContacts', this.form.contant)
					    this.formData.append('companyPassword',this.form.passWord)
					    this.formData.append('companyPhone',this.form.telNumber)
					    this.formData.append('companyEmail',this.form.email)
					    this.formData.append('companyName',this.form.companyName)
					    this.formData.append('companyLicense',this.form.fileId)
					    // 与后台交互
						apis.loginCompany(this.formData).then(response =>{
							if(response){
								_this.$router.push({
					    			path: '/companyComplete',
					    			query:{
					    				name: this.form.companyName
					    			}
					    		})
					    		_this.flag = false;
							} else{
								_this.$message({
									type: 'error',
									message: response.data.meta.message
								})
								_this.flag = false;
							}
						})
					}
				})
			},
			stepNext () {
				var _this = this
				if (!this.form.contant || !this.form.email || !this.form.passWord) {
					return false
				} else {
					let x = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
					if(x.exec(this.form.passWord) == null) {
						return false
					} else {
						this.active = 1
					}
				}
			},
			handleChange (file,fileList) {
				var size = file.size;
				var type = file.name;
				var fileend = type.substring(type.indexOf("."));
				var isnext = false; 
				for(var i = 0, len = this.imgType.length; i < len; i++) {
					if(this.imgType[i] == fileend ) {
						isnext = true;
						break;
					}
				}
				if(!isnext) {
					this.$message.error('所传图片的格式错误');
					this.$refs.upload.clearFiles();
					return false;
				}
				if (size/this.imgSize > 1) {
					this.$message.error('所传图片大小不能大于2M');
					this.$refs.upload.clearFiles();
					return false;
				}
				this.imageUrl = file.url
				this.form.companyFile = file.raw
			},
			setTimeOut () {
				var _this = this
				this.flagTime = true
				var time = 60
				var timer = window.setInterval(function (){

					if(time == 0) {
						_this.timeOut = '发送验证码'
						_this.flagTime = false
						clearInterval(timer)
					}else{
						time --;
						_this.timeOut = '倒计时' + time +'s'
						_this.flagTime = true
					}
				},1000)
			},
			uploadCallBack (res,file,fileList) {
				this.action_java = apis.getFileUploadUrl();
				if(res.meta.code == 200){
					this.async = true
					this.form.fileId = res.data.id
				} else {
					this.async = false
					this.form.fileId = ''
				}

			}	
		},
		mounted () {
			// 获取图片上传的url
			var _this = this
			this.action_java = apis.getFileUploadUrl()
			 setInterval(function(){_this.action_java = apis.getFileUploadUrl();}, 4 * 60000);
			console.log(this.action_java)
		}	
	}
</script>
<style type="text/css" lang="scss" scoped>
	 .elStep{
	 	width:650px;
	 	height:100px;
	 	padding-top:90px;
	 	margin:0 auto;
	 }
	 .elSteps{
	 	width:650px;
	 	height:100px;
	 	margin:0 auto;
	 }
	 .loginRouter{
	 	width:210px;
	 }
	 .step{width:100%}
	 .formFlex{
	 	display:flex;
	 }
	 .noteList{
	 	color: #f14141;
	 	font-size:12px;
	 	display:flex;
	 	width:320px;
	 	.inputButton{
	 		position:relative;
	 		background:red;
	 	}
	 	.inputFile{
	 		position:absolute;
	 		left:0;
	 		top:0;

	 	}
	 	dt{
	 		width:40px;
	 		line-height:normal;
	 	}
	 	dd{
	 		p{
	 			line-height:1.5;
	 		}
	 	}
	 }
	 .avatar{
	 	display: inline-block;
	 	width:97px;
	 	height:122px;
	 }
	 .icon{
	 	display:inline-block;
	 	width:38px;
	 	height:38px;
	 	background:url(../../../assets/img/connet/yuan.png) no-repeat;
	 	background-size:cover;
	 }
	 .noIcon{
	 	display:inline-block;
	 	width:26px;
	 	height:26px;
	 	background:url(../../../assets/img/connet/noyuan.png) no-repeat;
	 	background-size:cover;
	 }
</style>
<style type="text/css" lang="scss">
	.elStep{
		.el-step__head.is-text{
			background-color:transparent;
			border-style:none;
		}
		.el-step__head.is-text.is-success{
			border-color:#208af5;
		}
		.el-step__title.is-success{
			color:#208af5;
		}
		.el-step__head.is-text.is-success .el-icon-check{
			display:inline-block;
			width:38px;
			height:38px;
			background:url(../../../assets/img/connet/finish.png) no-repeat;
			background-size:cover;
				&:before{
					content:''
				}
		}


	}
</style>