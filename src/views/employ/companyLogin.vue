<template>
	<div class="container">
		<div class="header">
	<el-row :span="24" class="header_con">
		<el-col :span="6" class="logo">
				<img src="../../assets/img/connet/logo.png"/>
		</el-col>
		<el-col :span="2" class="contentTitle">
			智慧校园
		</el-col>
	</el-row>		
	</div>
		<div class="loginCon">
			<div class="loginName">{{ message }}</div>
			 <div class="loginContent">
			    <router-view></router-view>
			 </div>	
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				message: '注册信息',
				NoShow: false
			}
		},
		components: {
			
		},
		methods:{
			changeTitle () {
				console.log(this.$route)
				var name = this.$route.name
				if(name == 'companyComplete') {
					this.message = '完善信息'
				} else if(name == 'companyLogin') {
					this.message = '注册信息'
				}
			}
		},
		watch: {
			"$route": "changeTitle"
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	 @import '../../common/css/common.scss';
	 .loginContent{
	 	width:1200px;
	 	height:919px;
	 	background:#fff;
	 	margin:0 auto;
	 	border-radius:5px;
	 	overflow:hidden;
	 }
	 .loginName{
	 	height:51px;
	 	line-height:51px;
	 	width:76px;
	 	margin: 0 auto;
	 	font-size:18px;
	 	color:#000;
	 	border-bottom: 4px solid #3b4966;
	 }
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
				}
			}
		}	
</style>