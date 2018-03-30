<template>
	<div class="header">
	<el-row :span="24" class="header_con">
		<el-col :span="6" class="logo">
				<img src="../../../assets/img/connet/logo.png" />
		</el-col>
		<el-col :span="2" class="contentTitle">
			校招
		</el-col>
		<el-col :span="13" class="contentTitle" >
			<ul class="companyLabs" id="companyList">
			  	 <li class="companyLab" v-for="(item,index) in (type == 'student'?showOrNo.studentList: showOrNo.companyList)"  ><span class="spanActive" :id="item.name" @click="changeTab($event,index)" :class="[{'acitve':stuActive==index}]">{{item.label}}</span></li>
			</ul> 
		</el-col>
		<ul class="companyLabsBox" v-show="type == 'student' && types == '5'" id="liActive">
			    	<li v-for="(item, index) in studentRouter" class="liList login" ><span class="spanActiveStu" :class="[{'acitve':liAcitve==index}]" @click="changeSTab($event, index)" :id="item.name">{{ item.label }}</span></li>
		</ul>
		<el-col :span="3" class="userinfo" v-show="access != null" >
			   <div @click="exit" class="login loginMiddle">
			   	   <div class="close-btn">
					   <img src="../../../assets/img/header/close.png" class="img_close" />
				   </div>
				   <span class="close">退出</span>
			   </div>
		</el-col>
		<el-col :span="3" class="userinfo" v-show="types != '5' && companyId == null && access == null">
			  <span class="login" style="margin-right:10px;" @click="jumpUrl('companyEnter')">登录</span>
			   <span class="login" @click="jumpUrl('companyLogin')">注册</span>
		</el-col>
	</el-row>		
	</div>
</template>
<script>
	import api from '../../../apis/company/studentDefault.js'
    import responApi from '../../../apis/company/response.js'
    import { getToken, removeToken } from '../../../utils/auth.js'
	export default {
		data () {
			return {
				stuActive: 0,
				liAcitve: 0,
				showOrNo:{
					companyList:[{ label: '企业信息',name: 'companyMassage',show: true},{ label: '校园人才库',show: false,name: 'companyPool'},{ label: '发布职位',show: false,name: 'publicJob'},{ label: '投递箱',show: false,name: 'jobInBox'},{label: '入职通知',name:'offerLetter'}],
					studentList:[
						{label: '首页',name:'studentDefault',show: false},{label: '招聘职位',name:'studentEmployJob',show: false}
					]
				},
				studentRouter: [
					{label: '投递箱',name: 'dropInBox'},{label: '收藏夹',name: 'collentBox'},{label: '我的简历',name:'myResume'}
				],
				studentId: '',
				types: '',
				companyId: '',
				access:''
			}
		},
		props:['showNo','type'],
		methods:{
			handleClick (tab, event) {
				var name = tab.name
			},
			changeTab (event,index) {
				console.log(event)
				var name = event.target.id;
				this.stuActive = index;
				this.$router.push({
				 	name: name
				})
				if(this.types == '5') {
					console.log($('#liActive').find('span.acitve'))
					$('#liActive').find('span.spanActiveStu').removeClass('acitve')
					$('#companyList').find('span.spanActive').eq(index).addClass('acitve')
				}
			},
			changeSTab (event,index){
				var name = event.target.id;
				this.liAcitve = index;
				if(name == 'myResume'){
					var data = {
						id: this.studentId
					}
					this.$router.push({
						name: 'myResume'
					})
					// var formData = new FormData()
					// formData.append('stuId',data.id)
					// api.getUserResume (formData).then(response =>{
					// 		console.log(response)
					// 		if(response.data.data == null) {
					// 			this.$router.push({
					// 				name: 'editorResume'
					// 			}) 
					// 		} else {
					// 			this.$router.push({
					// 				name: 'myResume'
					// 			})
					// 		}
						
					// })
				} else {
				  this.$router.push({
				 	name: name
				  })
				}
				if(this.types == '5') {
					console.log($('#companyList'))
					$('#companyList').find('span.spanActive').removeClass('acitve')
					$('#liActive').find('span.spanActiveStu').eq(index).addClass('acitve')
				}
			},
			getUserInfor () {
				var _this = this
				// 获取assce_thoken 
				var tocken = getToken();
				api.getUserMsg ({'access_token': tocken}).then(response => {
					if(responApi.responseCallback(response)) {
						var data = responApi.responseCallback(response)
						_this.studentId = data.id
						// sessionStorage 存储学生的id 性别  生日
						window.sessionStorage.setItem('stuId',data.id);
						window.sessionStorage.setItem('sex',data.sex);
						window.sessionStorage.setItem('birthday',data.birthday);
						window.sessionStorage.setItem('phone',data.mobile);
						window.sessionStorage.setItem('name',data.name);
						console.log(_this.studentId+'---------------')
					}	
				})	
			},
			jumpUrl (name) {
				this.$router.push(name)
			},
			exit () {
				var _this = this
				_this.$router.push('/newIndex')
			}
		},
		mounted () {
		   // 调取接口获取用户的信息
		   var path = this.$route.path
		   if(path == '/studentIndex/studentDefault'){
		   	  this.getUserInfor()
		   }
		   // 获取sessionstorage 中的type 如果是5 说明不是公司登录
		   this.types = window.sessionStorage.getItem('type')
		   this.companyId = window.sessionStorage.getItem('companyId')
		   this.access = getToken('sessionid')
		   if(this.types == 5) {
			   $('#liActive').find('span.spanActiveStu').removeClass('acitve')
			   this.$bus.on('jumper',(data) =>{
				   console.log(data)
			   })
		   }
		}
	}
</script>
<style lang="scss" scoped>
		.header {
			height: 68px;
			line-height:68px;
			background: #3b4966;
			color: #fff;
			position:relative;
			.header_con{
				width:1200px;
				margin:0 auto;
				.logo {
					padding-top:14px;
					text-align:right;
					padding-right:10px;
					cursor:pointer;
				}
				.contentTitle{
					font-size:20px;
					font-weight:bold;
					display:flex;
					.companyLabs{
						display:flex;
						height:58px;
						.companyLab{
						   padding: 0 5px 7px 0;
						   height:59px;
						   margin: 0 9px;
						   cursor:pointer;
						   font-weight:normal
						}
						
					}
				}
				.userinfo{
					display:flex;
					align-item:center;
					justify-content:flex-end;
					.close-btn{
						display:inline-block;
						margin-right:5px;
						padding-top:5px;
					}
				}
			}
		}
.companyLabsBox{
	position:absolute;
	right:14%;
	top:0;
    height:60px;
    width:200px;
    clear:both;
}
.liList{
	font-size:14px;
	margin-right:5px;
	cursor:pointer;
	float:left;
	height:60px;
}

.login{
	cursor:pointer;
}
.loginMiddle{
	display:flex;
	align-items:center;
}
.spanActive{
	display:inline-block;
	padding:2px 8px;
	color: #fff;
	font-size:16px;
	height:30px;
	line-height: 30px;
	
}
.spanActiveStu{
	display:inline-block;
	font-size:14px;
	height:20px;
	line-height: 20px;
	padding:2px 4px;
}
.acitve{background:#fff; border-radius:2px;color:#3b4966}
</style>