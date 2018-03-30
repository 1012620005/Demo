<template>
	<div>
		<div class="sLeave-top">
			<div class="sLeave-top-left">
				<span class="sLeave_title1">{{ title }}</span>
		    </div>
			<div class="sLeave-top-right">
				<span class="return_btn" @click="returnBtn" style="cursor:pointer">返回</span>
			</div>
		</div>		
	</div>
</template>
<script type="text/javascript">
	export default{
		data () {
			return {
				userLogin: ''
			}
		},
		props:['title'],
		methods:{
			returnBtn () {
				if(this.userLogin == '2') {
					this.$router.go(-1)
				} else {
					this.$router.go(-1)
				}
				
			}
		},
		mounted () {
		   // 获取当前登录者的身份
		   this.userLogin = this.$Cookies.get('userLogin')
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	$large:16px;
	$middle:14px;
	$Small:12px;
	$navHeight:50px;
	.sLeave-top{
			height:50px;
			background:#fff;
			display:flex;
			justify-content:space-between;
			border-radius:5px;
			margin-top:11px;
			padding: 0 16px 0 24px;
		.sLeave_title1{
				padding: 0 5px;
				display:inline-block;
				color:#208af5;
				height:50px;
				line-height:50px;
				font-size:$large;
				border-bottom:2px solid #208af5;
			}
		.sLeave-top-right{
				line-height:50px;
				color:#333;
				font-size:$Small;
				background-image:url('../../assets/img/connet/return.png');
				background-repeat: no-repeat; 
				background-position:right center;
				background-size:9px 15px;
				padding-right:12px;
				.return_btn{
					display:inline-block;
					height:50px;
					cursor:pointer;
				}
		}	
	}	
</style>