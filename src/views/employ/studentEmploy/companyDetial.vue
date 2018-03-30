<template>
	<div class="content">
		<div class="detialTop">
			<div class="detialTopLeft">
				<div class="position">{{ detialPosition }}</div>
				<p class="detialPlace padding_box">
					<span>{{ area }}</span>
					<span style="padding-left:17px;">{{ jobNatrue }}</span>
				</p>
				<div class="jobBox">
					<p>
						<span v-for="item in jobRelated" class="jobRelated">{{ item.name}}</span>
				   </p>
				   <p class="operate cursor">
				   	   <div @click="collentBox(collentStatu)">
				   	   	 <i class="icon_collents" :class="[collentStatu?'':'collented']"></i>
				   	     <span>{{collentStatu?'已收藏':'收藏'}}</span>
				   	   </div>
				   	  	<div @click="dropResume(jobInStatu)">
				   	  		 <i class="icon_resume" :class="[jobInStatu == 1? 'iconed':'']"></i>
				   	         <span>{{ jobInStatu == 0 ? '投简历':'已投递'}}</span>
				   	  	</div>
				   </p>
				</div>
			</div>
			<dl class="detialTopRight">
				<dd class="detialDl">
					<p class="detialList" style="font-size:18px;">{{ companyInfor.companyName }}</p>
					<p class="detialList">
						<span class="fontSize">{{ companyInfor.companyNatrue }}</span>
						<span class="paddingFont">|</span>
						<span class="fontSize">{{ companyInfor.companyCount }}</span>
						<span class="paddingFont">|</span>
						<span class="fontSize">{{ companyInfor.companyType }}</span>
					</p>
					<p class="detialList fontSize">
						{{ companyInfor.companyWebsite }}
					</p>
				</dd>
				<dt class="companyPhoto">
					<img :src="companyInfor.companyPhoto"/>
				</dt>
			</dl>
		</div>
		<div class="detialBottom">
			<div class="detialBottomLeft">
				<h4 class="detialBottomTitle">职位诱惑</h4>
				<p class="marginBottom">{{ companyInfor.workWelfare }}</p>
				<h4 class="detialBottomTitle">职位描述</h4>
				<ul class="detialBottomCon marginBottom">
					 {{companyInfor.jobDescription}}
				</ul>
				<h4 class="detialBottomTitle">任职要求</h4>
				<ul class="detialBottomCon marginBottom">
					<li v-for="(item,index) in  companyInfor.jobRequirement">{{index + 1}}{{item.name}}</li>
				</ul>	
				<h4 class="detialBottomTitle">工作地点</h4>
				<p class="marginBottom">{{ companyInfor.workPlace }}</p>			
			</div>
			<div class="detialBottomRight">
				<h4 class="detialBottomTitle">公司简介</h4>
				<p class="profile">{{ companyInfor.companyProfile }}</p>
			</div>
		</div>
	<!-- 投递简历确认弹出框-->
	
	</div>

</template>
<script type="text/javascript">
    import api from  '../../../apis/company/companyDetial.js'
	export default {
		data () {
			return {
				detialPosition: '',
				area: '',
				jobNatrue: '',
				jobRelated: [],
				jobInStatu: '',
				collentStatu: '',
				companyInfor: {
					companyName: '',
					companyCount: '',
					companyType: "",
					companyNatrue: '',
					companyWebsite:'',
					companyPhoto: '/static/img/comploylogo.png',
					temptation: '',
					jobDescription:'',
					jobRequirement: [],
					workPlace: '',
					companyProfile: '',
					workWelfare: ''
				},
				listId: '',
				companyPhone: '',
				obj:null
			}
		},
		methods:{
			collentBox (statu) {
				// 获取当前职位的状态
				var formData = new FormData();
				var _this = this
				if(this.obj) {
					formData.append('userId',window.sessionStorage.getItem('stuId'));
					formData.append('companyId',this.obj.companyId);
					formData.append('positionName',this.obj.positionName); 
					formData.append('releaseId',this.obj.id);
				}
			    if(!statu) {
					// 收藏
					api.collenting(formData).then(res =>{
						if(res) {
							_this.$message({
								type:'success',
								message: '收藏成功'
							})
							_this.collentStatu = 1
						}
					})
				} else if(statu) {
					// 取消收藏
					api.cancelCollent(formData).then(res =>{
						if(res) {
							_this.$message({
								type:'success',
								message: '取消收藏成功'
							})
							_this.collentStatu = 0
						}
					})

				}
			},
			dropResume (status) {
				var formData = new FormData();
				var _this = this
				if(this.obj) {
					formData.append('userId',window.sessionStorage.getItem('stuId'));
					formData.append('companyId',this.obj.companyId);
					formData.append('positionName',this.obj.positionName); 
					formData.append('releaseId',this.obj.id);
				}				
				if(!status){
					// 发送简历
					api.dropInBox(formData).then(res =>{
						if(res) {
							_this.$message({
								type:'success',
								message: '发送成功'
							})
							_this.jobInStatu = 1
							formData.delete('userId')
							formData.delete('companyId')
							formData.delete('positionName')
							formData.delete('releaseId')
						}
					})
				} else {
					this.$message({
						type:'error',
						message: '你已经发送简历'
					})
				}
			}
		},
		mounted () {
			// 获取从前一个页面传
			var obj = window.sessionStorage.getItem('obj')
			obj = JSON.parse(obj)
			this.obj = obj
			var userId = window.sessionStorage.getItem('stuId')
			console.log(obj)
			var _this = this
			// 调取公司的信息和招聘职位的信息
			this.$ajax.all([api.getCompanyInfo({'companyPhone': obj.companyPhone}),api.getPositionInfo({'id':obj.id,'companyId':obj.companyId,'userId':userId,'positionName':obj.positionName})]).then(_this.$ajax.spread(function (acct, perms){
				//console.log(acct) 公司信息
				if(acct.data.meta.code == 200) {
					var data = acct.data.data
					_this.jobNatrue = data.companyIndustry
					_this.companyInfor.companyName = data.companyName
					_this.companyInfor.companyCount = data.companyPeopleNumber
					_this.companyInfor.companyType = data.companyIndustry
					_this.companyInfor.companyNatrue = data.companyMarket? '已上市':'未上市'
					_this.companyInfor.companyWebsite = data.companyWebsite
					_this.companyInfor.companyPhoto = data.companyPhoto
					_this.companyInfor.temptation = data.companyWebsite
					_this.companyInfor.companyProfile = data.companyInformation
					_this.companyInfor.workPlace = data.companyAddress

				}
				// console.log(perms) 职位信息
				if(perms.data.meta.code == 200) {
					var data = perms.data.data
					_this.detialPosition = data.positionName
					_this.area = data.workCity
					_this.companyInfor.jobDescription = data.workDescribe
					_this.companyInfor.collentStatu = data.collectionStatus
					_this.companyInfor.jobInStatu = data.deliveryStatus
					_this.companyInfor.workWelfare =data.workWelfare
				}
			}))

		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	.content{
		width:1200px;
		min-height:919px;
		background:#fff;
		margin:16px auto 0 auto;
		.detialTop{
			height:140px;
			box-sizing:border-box;
			background:#324057;
            color:#fff;
            display:flex;
            justify-content:space-between;
            padding: 40px 40px 28px 44px;
            box-sizing:border-box;
		}

	}
	.icon_collents{
		display:inline-block;
		width:16px;
		height:16px;
		background:url(../../../assets/img/connet/script.png) no-repeat;
		background-position: -309px -170px;
	}
	.icon_resume{
		display:inline-block;
		width:16px;
		height:16px;
		background:url(../../../assets/img/connet/script.png) no-repeat;
		background-position: -309px -234px;
	}
	.iconed {
		background-position: -201px -444px;
	}

.position{
	font-size:18px;
}
.padding_box{
	padding:13px 0 13px;
}
.jobBox{
	display:flex;
	.operate{
		margin-left:59px;
		color:#fed535;
		font-size:14px;
	}
}
.jobRelated{
	font-size:12px;
	padding-right:5px;
}
.detialTopRight{
	display:flex;

}
.detialDl{
	text-align:right;
	.detialList{
		margin-bottom:13px;
	}
}
.companyPhoto{
	margin-left:24px;
}
.fontSize{
	font-size:12px;
}
.paddingFont{
	padding: 0 6px;
}

.detialBottom{
	margin-top:35px;
	display:flex;
	.detialBottomTitle{
		width:67px;
		border-bottom:2px solid #208af5;
		padding-bottom:11px;
		font-size:16px;
		color:#333;
		margin-bottom:26px;
	}
	.detialBottomLeft{
		padding: 0 46px 0 36px;
		width:764px;
		box-sizing:border-box;
	}
	.detialBottomRight{
		width:435px;
		border-left:1px solid #eee;
		min-height:465px;
		padding-left:40px;
		padding-right:40px;
	}
}
.marginBottom{
	margin-bottom:40px;
}
.profile{
	font-size:14px;
	color:#333;
	line-height:1.4;
}
.collented{
	background-position: -309px -202px;
}
.dropInEd{
	background-position: -309px -234px;
}
</style>