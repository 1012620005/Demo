<template>
	<div class="container">
		<fc-header></fc-header>
		<!--组员查看其他-->
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					教研详情
				</div>
				<div class="tabright">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
		<!--主体模块-->
		<el-row :span="24" class="resebox">
			<div class="resenextbox">
				<!--左侧教研详情-->
				<el-col :span="18" class="detail-research">
					<div class="det-top">
						<div class="event-name">活动名称： <span>针对这次月考测验成绩分析</span></div>
						<ul>
							<li>发起人：<span>刘宇男</span></li>
							<li>活动组别：<span>语文教研组</span></li>
							<li>结束时间：<span>2017-03-31</span><i>14:52:48</i></li>
						</ul>
					</div>
					<div class="activcont">
						<h4>活动内容：</h4>
						<div class="actshow">
							针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析。
						</div>
					</div>
					<div class="acttach">
						<ul>
							<li>活动内容附件：<span>1024.png</span></li>
							<li>活动内容附件：<span>1024.png</span></li>
						</ul>
					</div>
					<div class="evaldet">
						<h5>2017-03-06 14:53:21:王玺反馈</h5>
						<div class="evalshow">针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考测验成绩分析针对这次月考</div>
					</div>
				</el-col>
				<!--右侧群组-->
				<el-col :span="6" class="right-group">
					<div class="my-group">
						<div class="group-top">
							<div class="group-name">组员列表</div>
						</div>
						<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
							<el-submenu index="1">
								<template slot="title"><span>导航一</span></template>
								<el-menu-item index="1"><i class="touxiang"></i>刘宇男（组长）<span class="haveeval">已评价</span></el-menu-item>
								<el-menu-item index="2" class="lans"><i class="touxiang"></i>往西<span class="haveeval">已评价</span></el-menu-item>
								<el-menu-item index="2"><i class="touxiang"></i>秦佳琪<span class="nofeed">未反馈</span></el-menu-item>
								<el-menu-item index="2"><i class="touxiang"></i>六福<span class="nofeed">未反馈</span></el-menu-item>
								<el-menu-item index="2"><i class="touxiang"></i>刘美辰<span class="nofeed">未反馈</span></el-menu-item>
								<el-menu-item index="2"><i class="touxiang"></i>王硕<span class="nofeed">未反馈</span></el-menu-item>
								<el-menu-item index="2"><i class="touxiang"></i>和灵活<span class="nofeed">未反馈</span></el-menu-item>
								<el-menu-item index="2"><i class="touxiang"></i>郭玉成<span class="nofeed">未反馈</span></el-menu-item>
							</el-submenu>
							<el-submenu index="2">
								<template slot="title"><span>导航二</span></template>
							</el-submenu>
							<el-submenu index="3">
								<template slot="title"><span>导航三</span></template>
							</el-submenu>
						</el-menu>
					</div>
				</el-col>
			</div>
		</el-row>
		<el-row :span="24" class="comsection">
			<!--底部评论区-->
			<el-col :span="24" class="rese-bottom">
				<h3>评论区</h3>
				<el-input placeholder="请输入评论内容" v-model="input5">
					<el-button slot="append" class="publish">发表</el-button>
				</el-input>
				<div class="commoncon">
					<div class=""><span>李本领：</span>这回听明白了？</div>
					<div class=""><span>李本领：</span>回复<i><span>张宇：</span>明白就好</i></div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript">
import fcHeader from '../../common/header.vue'
let id=1000;
export default {
	data() {
      return {
				activeName: 'first',
				form: {
					name: '',
					area: '',
					date1: '',
					date2: '',
					departments:'',
					majors:'',
					delivery: false,
					teacherList: [],
					addedMember:[],
					resource: '',
					desc: '',
					search: '',
				},
				value1: '',
                input5:''
				// fileList3: [{
				// 	name: 'food.jpeg',
				// 	url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
				// 	status: 'finished'
				// }]
				
			}
    	},
		methods: {
			//   头部标签
			handleClick(tab, event) {
				console.log(tab, event);
			},
			//   右侧群组
			handleNodeClick(data) {
				console.log(data);
			},
			handleChange(file, fileList) {
				this.fileList3 = fileList.slice(-3);
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},			
		},
		components:{
			fcHeader
		}
}
</script>
<style type="text/css" lang="scss" scope>
	body{
		font-size: 14px;
		color: #333;
	}
	// 顶部标签
	.tabbox{
		width:1200px;
		margin:0 auto;
		.tabtop{
			height: 55px;
			margin-top: 7px;
			background-color: #fff;
			border-radius: 6px;
			// padding: 0 24px;
			.tableft{
				float: left;
				.el-tabs__header{
					margin: 0;
					height: 55px;
					border-bottom: 0;
					.el-tabs__nav{
						height: 55px;
						line-height: 55px;
						margin-left: 20px;
						.el-tabs__item{
							color: #333;
							font-size: 16px;
						}
						.el-tabs__item.is-active{
							color: #208af5;
						}
					}
				}
			}
			.tabright{
				float: right;
				height: 15px;
				// line-height: 55px;
				margin-top: 7px;
				cursor: pointer;
				overflow: hidden;
				margin-top: 18px;
				span{
					display: inline-block;
					// float: right;
				}
				i{	
					width: 9px;
					height: 15px;
					background:url("../../../assets/researchCenter/return.png") 0 0 no-repeat; 
					display: inline-block;
					float: right;
					margin-left: 6px;
				}
			}
		}
	}
	// 主体模块
	// .resebox{
	// 	width:1200px;
	// 	margin: 0 auto;
	// 	margin-top: 20px;
	// 	// color:#333;
	// 	font-size: 14px;
	// 	.resenextbox{
	// 		width: 100%;
	// 		min-height: 639px;
	// 		background-color: #fff;
	// 		border-radius: 6px;
	// 		padding: 30px 0;
	// 		margin-bottom: 30px;
	// 		overflow: hidden;
	// 		// 左侧教研详情
	// 		.detail-research{
	// 			padding: 0 24px;
	// 			.det-top{
	// 				border-bottom: 1px solid #d2d2d2;
	// 				font-size: 16px;
	// 				overflow: hidden;
	// 				padding-bottom: 20px;
	// 				margin-bottom: 20px;
	// 				.event-name{
	// 						margin-bottom: 20px;
	// 				}
	// 				ul{
	// 					li{
	// 						float: left;
	// 						margin-right: 34px;
	// 						i{
	// 							display: inline-block;
	// 							margin-left: 8px;
	// 						}
	// 					}
	// 				}
	// 			}
	// 			.activcont{
	// 				.actshow{
	// 					// width: 100%;
	// 					height: 140px;
	// 					border: 1px solid #d2d2d2;
	// 					border-radius: 6px;
	// 					background-color: #f2f2f2;
	// 					padding: 20px 18px;
	// 					overflow :auto;
	// 				}
	// 			}
	// 			.acttach{
	// 				margin-top: 14px;
	// 				margin-bottom: 40px;
	// 				ul{
	// 					li{
	// 						margin-bottom: 10px;
	// 						span{
	// 							color: #448df5;
	// 						}
	// 					}
	// 				}
	// 			}
	// 			.evaldet{
	// 				margin-bottom: 36px;
	// 				.evalshow{
	// 					height: 110px;
	// 					border: 1px solid #d2d2d2;
	// 					border-radius: 6px;
	// 					background-color: #f2f2f2;
	// 					padding: 20px 18px;
	// 					overflow :auto;
	// 				}
	// 			}
	// 		}
	// 		// 右侧群组
	// 		.right-group{
	// 			padding: 0 20px;
	// 			.my-group{
	// 				border: 1px solid #eee;
	// 				padding-bottom: 50px;
	// 				min-height: 551px;
	// 				.group-top{
	// 					padding: 16px 14px;
	// 					background-color: #dbecac;
	// 					border-radius: 4px;
	// 					text-align: center;
	// 					.group-name{
	// 						display: inline-block;
	// 						font-weight: bold;
	// 						margin-left: 15px;
	// 					}
	// 					.group-icon{
	// 						float: right;
	// 						// overflow: hidden;
	// 						// margin-right: 14px;
	// 						span{
	// 							width: 20px;
	// 							height: 20px;
	// 							display: inline-block;
	// 							cursor: pointer;
	// 							position: relative;
	// 						}
	// 					}
	// 				}
	// 				// 树形结构
	// 				.el-tree{
	// 					border: 0;
	// 					.el-tree-node__content{
	// 						cursor: default;
	// 						.el-tree-node__expand-icon{
	// 							width: 11px;
	// 							height: 11px;
	// 							border: 0;
	// 							margin-left: 20px;
	// 							background:url("../../../assets/researchCenter/green-add-small.png") 0 0 no-repeat;
	// 						}
	// 						.el-tree-node__expand-icon.expanded{
	// 							transform: rotate(0);
	// 							background:url("../../../assets/researchCenter/green-subtra.png") 0 0 no-repeat;
	// 						}
	// 						.qz-right{
	// 							width: 50px;
	// 							height: 16px;
	// 							margin-top: 3px;
	// 							.shezhi{
	// 								width: 16px;
	// 								height: 16px;
	// 								background: url("../../../assets/researchCenter/setting-gry.png") 0 0 no-repeat;
	// 								display: inline-block;
	// 								cursor: pointer;
	// 							}
	// 							.guanbi{
	// 								width: 16px;
	// 								height: 16px;
	// 								background: url("../../../assets/researchCenter/close-gry.png") 0 0 no-repeat;
	// 								display: inline-block;
	// 								margin-left: 15px;
	// 								cursor: pointer;
	// 							}
	// 						}
							
	// 					}
	// 					.el-tree-node__children{
	// 						background-color: #f9f9f9;
	// 						.el-tree-node:first-child{
	// 							color:#208af5;
	// 						}
	// 						.el-tree-node__expand-icon {
	// 							width: 21px;
	// 							height: 20px;
	// 							background:url("../../../assets/researchCenter/head-portrait.png") 0 0 no-repeat;
	// 						}
	// 						.qz-right{
	// 							width: 0;
	// 							height: 0;
	// 							.shezhi{
	// 								width: 0;
	// 								height: 0;
	// 							}
	// 							.guanbi{
	// 								width: 0;
	// 								height: 0;
	// 							}
	// 						}
	// 					}
						
	// 				}
	// 			}
	// 			// 列表
	// 			.el-menu-vertical-demo,.el-menu{
	// 				background-color: transparent;
	// 			}
	// 			.el-submenu__title:hover,.el-menu:hover,.el-menu-item:hover{
	// 				background-color: transparent;
	// 			}
	// 			.el-submenu{
	// 				.el-menu-item, .el-submenu__title{
	// 					span{
	// 						display: inline-block;
	// 						margin-left: 28px;
	// 					}
	// 					height: 40px;
	// 					line-height: 40px;
	// 				}
	// 				.lans{
	// 					color:#208af5 !important;
	// 				}
	// 				.el-menu-item{
	// 					i{
	// 						width:21px;
	// 						height:21px;
	// 						background: url('../../../assets/researchCenter/head-portrait.png') 0 0 no-repeat;
	// 						display: inline-block;
	// 						margin-right: 10px;
	// 					}
	// 					padding:0 10px;
	// 				}
	// 				.el-submenu__icon-arrow{
	// 					position: absolute;
	// 					right: 220px;
	// 					top: 57%;
	// 					width:11px;
	// 					height:11px;
	// 					background: url('../../../assets/researchCenter/green-add-small.png') 0 0 no-repeat;
	// 				}
	// 				.el-menu-item-group{
	// 					height: 40px;
	// 					line-height: 40px;
	// 				}
	// 				.el-menu-item-group__title{
	// 					padding-top: 0;
	// 					height:40px;
	// 					line-height: 40px;
	// 					color:#222;
	// 				}
	// 				.el-icon-arrow-down:before{
	// 					content:''
	// 				}
	// 				.el-menu{
	// 					background-color: #f9f9f9;
	// 				}
	// 				.haveeval{
	// 					float: right;
	// 					color:#91c604;
	// 				}
	// 				.nofeed{
	// 					float: right;
	// 					color:#208af5
	// 				}
	// 			}
	// 			.el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title{
	// 				color: #222222;
	// 			}
	// 			.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
	// 				transform:rotateZ(0deg);
	// 				background: url('../../../assets/researchCenter/green-subtra.png') 0 0 no-repeat;
	// 			}
	// 		}
	// 	}
	// 	h4{
	// 		font-size: 16px;
	// 		font-weight: normal;
	// 		color: #333;
	// 		margin-bottom: 12px;
	// 	}
	// 	h5{
	// 		font-size: 14px;
	// 		margin-bottom: 12px;
	// 	}
	// }
	// 底部评论区
	.comsection{
		width:1200px;
		margin: 0 auto;
		margin-bottom: 40px;
		min-height: 218px;
		background-color: #fff;
		padding: 24px;
		h3{
			margin-bottom: 18px;
		}
		.publish{
			background-color: #208af5 !important;
			color:#fff !important;
		}
		.el-input__inner{
			border-right: 0;
			background-color: #f2f2f2;
		}
		.commoncon{
			margin-top: 24px;
			div{
				margin-bottom: 12px;
				span{
					color: #208af5;
				}
				i{
					display: inline-block;
					margin-left: 6px;
				}
			}
		}

	}
	// 上传附件弹出框
	.upload-attach{
		width: 568px;
		height: 252px;
		padding: 20px;
		z-index: 2;
		position: fixed;
		top: 50%;
		left: 50%;
		transform:translate(-50%,-50%);
		background-color: #fff;
		border-radius: 6px;
		.upload-top{
			overflow: hidden;
			.upload-cluster{
				float: left;
			}
			.upload-close{
				float: right;
				cursor: pointer;
			}
		}
		.upload-demo{
			width: 100%;
			margin-top: 30px;
			.el-upload{
				width: 100%;
				.el-upload-dragger{
					width: 100%;
					height: 88px;
					i{
						margin: 2px 0 0 0;
						font-size: 44px;
					}
				}
			}
		}
		.el-upload__tip{
			color: #ef0000;
		}
		.affirm{
			width:96px;
			height: 42px;
			float: right;
			margin-top: 10px;
		}
	}
	
</style>