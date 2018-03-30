<template>
	<div class="content">
		<div class="comTop">
			<dl class="companyBox">
				<dt class="campanyLogo">
					<el-upload
						  class="avatar-uploader"
						  accept=".jpg,.png,.jpeg"
						  :action="action_java"
						  :show-file-list="false"
						  :data="fileData"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img  :src="defaultImageUrl" v-if="!photoId" class="avatar">
						  <img  class="avatar" :src="imageUrl" v-else> 
					</el-upload>
				</dt>
				<dd>
					<p class="company companyName">{{ companyName }} <span class="editorCompanyName"  @click="editorImform"><i class="editorIcon"></i>修改账户</span><span class="shenhe" v-show="companyStatus == 0">待审核</span><span class="shenhe" v-show="companyStatus == 1">已通过</span><span class="shenhe" v-show="companyStatus == 2">未通过</span></p>
					<p class="company"><span class="companySpan">{{companyMarket == 0?'未上市': '已上市'}}</span><span>|</span><span class="companySpan">{{companyCount}}</span><span>|</span><span class="companySpan">{{ companyType }}</span></p>
					<p class="company"><a :href="companyWebsite" class="companyLink">{{ companyWebsite}}</a></p>
				</dd>
			</dl>
		</div>
		<div class="comBottom">
			<div class="companyH comBottomjianjie">
				<h3>公司简介</h3>
				<p class="companyIntroduce">
					{{ companyIntroduce }}
				</p>
			</div>
			<div class="companyH comBottomContent">
				<h3>联系我们</h3>
				<ul>
					<li><span class="listCon">公司联系人:</span>{{ companyContant }}</li>
					<li><span class="listCon">联系人电话:</span>{{ companyTel }}</li>
                    <li><span class="listCon">公司邮箱:</span>{{ companyEmail }}</li>
                    <li><span class="listCon">公司详细地址:</span>{{ companyAdress }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
  import apis from '../../apis/company/companyMessage.js'
  import res from '../../apis/company/response.js'
  import userApi from '../../apis/userCenter.js'
	export default{
		data () {
			return {
				companyName: '',
				companyCount: 0,
				companyStatus: '',
				companyMarket: '',
				companyType: '',
				companyWebsite: '',
				companyContant: '',
				companyTel: '',
				companyEmail: '',
				companyAdress: '',
				companyIntroduce: '',
				defaultImageUrl: './static/img/defaultCompany.png',
				action_java: '',
				formData: new FormData(),
				tel: '0',
				companyId: '',
				password: '',
				fileData:{
					entity:"company",
					type:"photo",
					bid:''
				},
				imageUrl:'',
				photoId: ''
			}
		},
		methods:{
			editorImform () {
				this.$router.push({
					name: 'editorCompanyInformation',
					query:{
						id: this.companyId,
						contact: this.companyContant,
						password: this.password
					}
				})	
			},
			upload (file) {
				this.formData.append('photo',file.file)
				this.formData.append('companyId',this.companyId)
				apis.UploadImg (this.formData).then(response => {
					console.log(response)
				})
			},
			handleAvatarSuccess (res,file,fileList) {
				this.imageUrl = URL.createObjectURL(file.raw);
				console.log(res)
				if(res.meta.code == 200) {
					var formData = new FormData()
					var data = res.data
					var id = data.bid
					var photoId = data.id
					this.formData.append('photoId',photoId)
					this.formData.append('id',id)
						apis.UploadImg (this.formData).then(response => {
							console.log(response)
						})
					}
			},
			beforeAvatarUpload (file) {
				 const isJPG = file.type === 'image/jpeg';
        		 const isLt2M = file.size / 1024 / 1024 < 2;
        	    if (!isJPG) {
                     this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            getCompanyMsg () {
            	var formData = new FormData();
            	formData.append('companyPhone',this.tel)
            	var _this = this
            	apis.getCompanyMessage (formData).then(response => {
            		if(res.responseCallback(response)) {
            			var data = res.responseCallback(response)
            			_this.companyName = data.companyName
            			_this.companyCount = data.companyPeopleNumber
            			_this.companyMarket = data.companyMarket
            			_this.companyType = data.companyIndustry
            			_this.companyWebsite = data.companyWebsite
            			_this.companyContant = data.companyContacts
            			_this.companyEmail = data.companyEmail
            			_this.companyAdress = data.companyAddress
            			_this.companyIntroduce = data.companyInformation
            			_this.companyId = data.id
            			_this.companyTel = data.companyPhone
						_this.companyStatus =  data.companyStatus
						// 获取是否有公司头像
						_this.photoId = data.photoId
						_this.getCompanyPhoto(data.photoId)
						_this.fileData.bid = data.id
            			window.sessionStorage.setItem('companyId',data.id)
            			window.sessionStorage.setItem('companyStatus',data.companyStatus)
            			
            		}
            	})
            	
			},
			getCompanyPhoto (id) {
				this.imageUrl = userApi.getFileDownloadUrl(id)
			}
		},
		computed:{
		},
		mounted () {
			this.action_java = userApi.getFileUploadUrl()
			// 获取手机号
		    this.tel = window.sessionStorage.getItem('companyPhone')			
			// 获取公司信息
			this.getCompanyMsg ()
			
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	 @import '../../common/css/common.scss';
	 .content{
	 	background:#fff;
	 	height:919px;
	 	margin-top:16px;
	 }
	 .comTop{
	 	height:140px;
	 	width:100%;
	 	border-radius:5px;
	 	background:#324057;
	 	display:flex;
	 	align-items:center;
	 	padding-left:43px;
	 	box-sizing:border-box;
	 	.companyBox{
	 		display:flex;
	 		color:#fff;
	 		font-size:12px;
	 		.campanyLogo{
	 			margin-right:23px;
	 		}
	 		.companyName{
	 			font-size:18px;

	 			.editorCompanyName{
	 				font-size:12px;
	 				color:#208af5;
	 			}
	 		}
	 		.company{
	 			padding-top:7px;
	 		}
	 		.editorIcon{
	 			display:inline-block;
	 			width:15px;
	 			height:11px;
	 			background:url(../../assets/img/employ/editor.png) no-repeat center center;
	 			margin: 0 3px 0 16px;
	 		}
	 		.companyLink{
	 			color:#fff;
	 		}


	 	}
	 }
	 .comBottom{
	 	margin-top:34px;
	 	display:flex;
	 	padding: 0 47px 0 34px;
	 	color:#333;
	 	.comBottomContent{
	 		width:390px;
	 		height:465px;
	 		border-left:1px solid #eee;
	 		padding-left:36px;
	 		li{
	 			padding-top:20px;
	 			.listCon{
	 				padding: 0 5px 0 0;
	 			}
	 		}
	 	}
	 	.comBottomjianjie{
	 		flex:1;
	 		padding-right:36px;
	 		.companyIntroduce{
	 			line-height:20px;
	 			padding-top:20px;
	 		}
	 	}
	 	.companyH{
	 		h3{
	 			height:34px;
	 			width:65px;
	 			border-bottom:2px solid #208af5;
	 			line-height:34px;
	 			font-size:16px;
	 			font-weight:normal;
	 		}
	 	}

	 }
.avatar{
	width:80px;
	height:80px;
	border-radius:5px;
}
.shenhe{
	color:red;
	font-size:12px;
	padding-left:10px;
}
</style>