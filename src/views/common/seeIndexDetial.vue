<template>
	<div  class="wrapper_box">
		<el-dialog :title="form.title" :visible.sync="form.visible" size="small" @close="closeDialog()">
			<div class="wrapper_dialog">
				<div class="nameList">
					<span class="img">
						<img :src="showImg(form.photo)" v-if="form.photo"/>
						<img src="../../assets/img/connet/menDefault.png" v-else/>
					</span>
					<span class="name">{{form.createBy}}</span>
					<span class="time">{{form.createDate}}</span>
				</div>
				<div class="contentBox">{{form.content}}</div>
			</div>
			<span class="con_role" v-text="msgTypeList[form.msgType]"></span>
		</el-dialog>
		
	</div>
</template>
<script type="text/javascript">
   import userApi from '../../apis/userCenter.js'
	export default {
		data () {
			return {
				msgTypeList:['个人通知','班级通知','学校通知','','面试通知']
			}
		},
		props:{
			form:{
				visible: Boolean,
				title: '',
				msgType: '',
				createBy: '',
				createDate: '',
				content: '',
				photo:''			
			}
		},
		methods:{
			closeDialog () {
				this.$emit('closeDialog')
			},
			showImg(photo) {
				return userApi.getCommonShowUrl(photo)
			}
		}
	}
</script>
<style type="text/css" lang="scss">
	.wrapper_box{
		.el-dialog__header{
			text-align:center;
			background-color:#fff;
			.el-dialog__title{
				font-size:18px;
				color:#000;
				font-weight:600;
			}
		}
		.el-dialog__body{
			position:relative;
			padding:10px 40px 30px;
		}
	}
</style>
<style type="text/css" lang="scss" scoped>

	.con_role{
		position:absolute;
		right:60px;
		top:-36px;
		padding:2px 3px;
		background:#e8f3fe;
		border:1px solid #208af5;
		font-size:14px;
		color:#208af5;
		border-radius:2px;
	}
	.nameList{
		display:flex;
		align-items:center;
		justify-content: center;
	    padding-bottom: 15px;
	}
	.img,.name,.time{
		display:inline-block;
	}
	.img{
	    width:40px;
		height:40px;
		border-radius:50%;
		overflow:hidden;
		img{
			width:100%;
			height:100%;
		}
	}
	.name{
		font-size:12px;
		padding: 0 12px;
		color: #000;
	}
	.time{
		color:#666;
		font-size:12px;
	}
	.contentBox{
		color:#333;
		font-size:14px;
		line-height:1.7;
	}
</style>