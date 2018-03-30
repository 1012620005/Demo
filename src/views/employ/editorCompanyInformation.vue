<template>
	<div class="content">
		<div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title">修改账户信息</span>
				</div>
		</div>
		<div class="companyEditor">
			<ul class="editorInformation">
				<li class="editorCon"><p><span class="conBox">联系人:</span><span class="contact">{{ form.contact }}</span></p><!-- <el-button type="primary"  @click="editorCon({value:1})" ref="ref1">修改</el-button> --></li>
				<li class="editorCon"><p><span class="conBox">密<span class="spacing">空</span>码:</span><input type="password" :value="form.password" disabled="disabled"/></p><el-button type="primary"   @click="editorCon({value:2})">修改</el-button></li>
				<li class="editorCon"><p><span class="conBox">手机号:</span><span class="contact">{{ form.phoneNum }}</span></p><el-button type="primary"   @click="editorCon({value:3})">修改</el-button></li>
			</ul>
		</div>
		<!--修改用户信息-->
	<el-dialog :title="form.dialogTitle" :visible.sync="form.dialogFormVisible" size="tiny" @close="reset('form'+ form.changeForm )">
	  <div v-if="form.changeForm == 1">
	    <el-form :model="form1" :rules="rules1" ref="form1">
	    	<el-form-item prop="password">
	    		<el-input v-model="form1.password" auto-complete="off" placeholder="请输入登录密码"></el-input>
	    	</el-form-item>
	    	<el-form-item prop="name">
	        			<el-input v-model="form1.name" auto-complete="off" placeholder="请输入新的联系人"></el-input>
	        </el-form-item>
	      </el-form>
	  	</div>
	  	<div v-if="form.changeForm == 2">
	      <el-form :model="form2" :rules="rules2" ref="form2">
	  		    <el-form-item prop="password">
	      			<el-input v-model="form2.password" auto-complete="off" placeholder="请输入原密码"></el-input>
	    		</el-form-item>
	  		    <el-form-item prop="newPassword">
	      			<el-input v-model="form2.newPassword" auto-complete="off" placeholder="请输入新密码"></el-input>
	    		</el-form-item>
	  		    <el-form-item prop="checkPassWord">
	      			<el-input v-model="form2.checkPassWord" auto-complete="off" placeholder="请再次输入新密码"></el-input>
	    		</el-form-item> 
	      </el-form>
	  	</div>
	  	<div v-if="form.changeForm == 3">
	        <el-form :model="form3" :rules="rules3" ref="form3">
	          <el-form-item prop="password">
	            <el-input v-model="form3.password" auto-complete="off" placeholder="请输入原密码"></el-input>
	        </el-form-item>          
	  		    <el-form-item prop="mobile">
	  		    	<div class="flexBox">
		      			<el-input v-model="form3.mobile" auto-complete="off" placeholder="请输入新手机号"></el-input>
		      			<el-button  type="primary">发送验证码</el-button>	  		    		
	  		    	</div>

	    		 </el-form-item> 
	   		    <el-form-item prop="yan">
	      			<el-input v-model="form3.yan" auto-complete="off" placeholder="请输入验证码"></el-input>
	    		</el-form-item> 
	      </el-form>   		
	  	</div>
	  	<div slot="footer" class="dialog-footer">
	        <el-button type="primary" @click="save('form'+ form.changeForm)">提交</el-button>
	  	</div>
	</el-dialog>		
	</div>
</template>
<script type="text/javascript">
   import validate from "../../validate"
   import api from '../../apis/company/companyMessage.js'
	export default {
		data () {
			var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		        	if(this.form2) {
		        		if (this.form2.newPassword !== '') {
		                   this.$refs.form2.validateField('checkPassWord');
		                }
		        	}
		          
		          callback();
		        }
	        }
	     
	      var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.form2.newPassword) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
	        }
			return {
				form:{
					contact: '',
					password: '1234567',
					phoneNum: '',
					dialogTitle: '',
					dialogFormVisible: false,
					changeForm: 1
				},
				form1: {
					password: '',
					name: ''
				},
				form2:{
					password: '',
					newPassword: '',
					checkPassWord: ''
				},
				form3:{
					password: '',
					mobile: '',
					yan: ''
				},
				rules1:{
					password:[
						{validator: validate.required}
					],
					name: [
						{required:true,message: '请输入新的联系人', trigger:'change'}
					]					
				},
				rules2:{
					password:[
						{validator: validate.required}
					],
			        newPassword:[
		            {validator:validatePass}
			          ],
			        checkPassWord:[
			           {validator:validatePass2}
			        ]					
				},
				rules3:{
					password:[
						{validator: validate.required}
					],
			        mobile: [
			            {validator: validate.phonevalidate}
			        ],
			        yan:[
			        	{validator: validate.required}
			        ]					
				}								
			}
		},
		methods:{
			editorCon (obj) {
				if (obj.value == '1') {
					this.form.dialogTitle = '修改联系人'
					this.form.changeForm = 1
				} else if(obj.value == '2') {
					this.form.dialogTitle = '修改密码'
					this.form.changeForm = 2
				} else if(obj.value == '3'){
					this.form.dialogTitle = '修改手机号'
					this.form.changeForm = 3
			    }
			    this.form.dialogFormVisible = true
			},
			save (form) {
				var id = form.substr(form.length-1,1);
				var _this = this
				 this.$refs[form].validate((valid) => {
				 	if(valid) {
				 		var formData = new FormData()
				 		if(id == '1') {
				 			formData.append('password',this.form1.password);
				 			formData.append('name',this.form1.name);
				 			api.editorInfo(formData).then(response =>{
				 	   	  		if(response.data.meta.code) {
				 	   	  			var code = response.data.meta.code
				 	   	  			if(code == 200) {
				 	   	  				_this.$message({
				 	   	  					type:'success',
				 	   	  					message: '修改成功'
				 	   	  				})
				 	   	  				
				 	   	  			} else {
				 	   	  				_this.$message.error(response.data.meta.message)
				 	   	  			}
				 	   	  			_this.form.dialogFormVisible = false
				 	   	  		}
				 	   		})
				 		} else if(id == '2') {
				 			formData.append('password',this.form2.password);
				 			formData.append('newPassword',this.form2.newPassword);
				 			api.editorInfo(formData).then(response =>{
				 	   	  		if(response) {
				 	   	  			var code = response.data.meta.code
				 	   	  			if(code == 200) {
				 	   	  				_this.$message({
				 	   	  					type:'success',
				 	   	  					message: '修改成功'
				 	   	  				})

				 	   	  			} else {
				 	   	  				_this.$message.error(response.data.meta.message)
				 	   	  			}
				 	   	  			_this.form.dialogFormVisible = false
				 	   	  		}
				 	   		})
				 		} else if(id == '3') {
				 			formData.append('password',this.form3.password);
				 			formData.append('mobile',this.form3.mobile);
				 			formData.append('id',this.form.companyId);
				 			api.editortel(formData).then(response =>{
				 				if(response) {
				 	   	  			var code = response.data.meta.code
				 	   	  			if(code == 200) {
				 	   	  				_this.$message({
				 	   	  					type:'success',
				 	   	  					message: '修改成功'
				 	   	  				})
				 	   	  				window.sessionStorage.setItem('companyPhone',this.form3.mobile)
				 	   	  				_this.form.phoneNum = this.form3.mobile
				 	   	  			}
				 	   	  		}
				 	   	  		_this.form.dialogFormVisible = false
				 			})
				 		}
				 	}
				 })
			},
			reset (form) {
				this.$refs[form].resetFields();
			}
		},
		mounted () {
			// 获取公司的联系人姓名、手机号、密码
			var data = this.$route.query
			this.form.contact = data.contact
			this.form.phoneNum = window.sessionStorage.getItem('companyPhone')
			this.form.companyId = data.id
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	@import '../../common/css/common.scss';
	input[disabled]{color:#333;opacity:1;background:#fff}
	div.content  .sLeave-top .sLeave_title{
	 	width:103px;
	 	font-size:16px;
	 }
	 div.companyEditor{
	 	width:1200px;
	 	height:870px;
	 	margin-top:16px;
	 	background:#fff;
	 	border-radius:5px;
	 	display:flex;
	 	justify-content:center;
	 	.editorInformation{
	 		margin-top:49px;
	 		.editorCon{
	 			padding-top:48px;
	 			display:flex;
	 			align-items:center;
	 			p{
	 				width:380px;
	 				font-size:14px;
	 				.conBox{
	 					color:#666;
	 				}
	 				.contact{
	 					color:#333;
	 				}
	 				.spacing{
	 					display:inline-block;
	 					width:14px;
	 					overflow:hidden;
	 					text-indent:-99999px;

	 				}
	 			}
	 			.conBox{
	 				letter-spacing:2px;
	 				margin-right:6px;
	 			}
	 			
	 		}
	 	}
	 }
	 .flexBox{
	 	display:flex;
	 }
</style>