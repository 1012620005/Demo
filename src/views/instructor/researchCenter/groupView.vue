<template>
	<div class="container">
		<fc-header></fc-header>
		<!--组长查看其他-->
		<!--顶部标签-->
		<el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					教研详情
				</div>
				<div class="tabright" @click="returnRestotal()">
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
						<div class="event-name">活动名称： <span>{{activity.name}}</span></div>
						<ul>
							<li>发起人：<span>{{activity.createUser}}</span></li>
							<li>活动组别：<span>{{activity.groupname}}</span></li>
							<li>结束时间：<span>{{activity.endTime}}</span></li>
							<li v-if="activity.enable === '1'">活动未结束</li>
							<li v-else>活动已经结束</li>
						</ul>
					</div>
					<div class="activcont">
							<h4>活动内容：</h4>
							<div class="actshow">
								{{activity.content}}
							</div>
					</div>
					<div class="acttach">
						<ul>
							<li v-for="t in files">活动内容附件：<span @click="download(t.id)">{{t.oldname}}</span></li>
						</ul>
					</div>
					<div class="evaldetmain">
						<div v-for="m in mins">
							<div class="evaldet">
								<h5 v-if="m.type === '1'">{{m.createDate}}:{{m.suser}}回复</h5>
								<h5 v-else>{{m.createDate}}:{{m.suser}}评价</h5>
								<div class="evalshow">{{m.content}}</div>
								<div class="fjshow">
									<div v-for="t in m.file.file" @click="download(t.id)">{{t.oldname}}</div>
								</div>
							</div>
						</div>
					</div>
					
					
					<div v-if="userid === activity.currentUserid || activity.createUserid === activity.currentUserid" class="group-leader">
						<p v-if="activity.createUserid === userid">评价：</p>
						<p v-else>回复：</p>
						<div class="bianjiqi">
							<el-input
							type="textarea"
							:rows="6"
							placeholder="请输入内容"
							v-model="content">
							</el-input>	
						</div>
							<div class="det-bottom">
							<!-- <div class="cliup" @click="upload">上传附件</div> -->
							<el-upload
								class="upload-demo"
								:on-remove="remove" 
								:data="filedata" 
								:on-success="uploadCallBack" 
								:action="uploadurl"
								:before-upload="before"
								:on-change="handleChange"
								:file-list="fileList"
								multiple>
								<el-button size="small" type="primary" class="cliup">上传附件</el-button>
								<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
							</el-upload>
							<el-button type="primary" class="submit" @click="reply">提交</el-button>
						</div>
					</div>
				</el-col>
				<!--右侧群组-->
				<el-col :span="6" class="right-group">
					<div class="my-group">
						<div class="group-top">
							<div class="group-name">组员列表</div>
						</div>
						<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"  @close="handleClose" theme="dark">
							<el-submenu index="1">
								<template slot="title"><span>{{group.groupname}}</span></template>
								<div v-for="m in group.members">
									<el-menu-item @click="initMins(activity.id, m.userid,$event)" index="1" v-if="m.leader === '1'" class="zuzhang" >
										<i class="touxiang"></i><span class="hovers">{{m.name}}（组长）</span>
										<div class="r-detail">
											<span v-if="m.msg==='1'" class="haveeval">已回复</span>
											<span v-if="m.msg==='2'" class="haveeval">已评价</span>
											<span v-if="m.msg==='0'" class="haveeval">未回复</span>
										</div>
									</el-menu-item>
									<el-menu-item @click="initMins(activity.id, m.userid,$event)" index="1" v-else><i class="touxiang">
										</i><span class="hovers">{{m.name}}</span>
										<div class="r-detail">
											<span v-if="m.msg==='1'" class="haveeval">已回复</span>
											<span v-if="m.msg==='2'" class="haveeval">已评价</span>
											<span v-if="m.msg==='0'" class="haveeval">未回复</span>
										</div>
									</el-menu-item>
								</div>																
							</el-submenu>
						</el-menu>
					</div>
					<div class="rese-bottom">
						<h3>评论区</h3>
						<div class="publis-box">
							<el-input :placeholder="c_username" v-model="c_comment" >
								<el-button slot="append" class="publish" @click="comment">发表</el-button>
							</el-input>
						</div>
						<div class="comcontent">
							<div class="commoncon" v-for="c in c_list">
								<div class=""><span @click="clickComment(c.createUserid, c.createUser)">{{c.title}}</span>{{c.content}}</div>
							</div>
						</div>
					</div>
				</el-col>
			</div>
		</el-row>
	</div>
</template>
<script type="text/javascript">
import fcHeader from '../../common/header.vue'
import api from '../../../apis/researchCenter/research.js'
import userApi from '../../../apis/userCenter.js'
let id=1000;
export default {
	data() {
      return {
				activeName: 'first',
				filedata: {
					entity:'activitymin',
					type:'file',
					filename:'',
				},
				uploadurl:'',
				fileList:[],
				form: {
					name: '',
					area: '',
					date1: '',
					date2: '',
					departments:'',
					majors:'',
					delivery: false,
					resource: '',
					desc: '',
					search: '',
				},
				value1: '',
				// fileList3: [{
				// 	name: 'food.jpeg',
				// 	url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
				// 	status: 'finished'
				// }]
				input5:'',
				files:[],
				fileid:[],
				// 上传附件弹出框
				showUpload:false,
				// 遮罩层
				showDesk:false,
				activity: '',	//教研活动
				mins: '',	//活动详情
				group: '',	//群组成员等
				content: '',	//回复内容
				c_comment: '',	//评论输入框
				c_userid: '',	//回复人
				c_username: '',	//回复人名字
				c_pageNo: '1',	//评论分页
				c_pageSize: '5',	//评论页数
				c_list: '',	//评论明细
				userid: '',	//当前点击的用户id
				activityid:'',
				fileids:[],
			}
    	},
		methods: {
			remove(file, filelist) {
				let fileids = this.fileid;
				for (let i = 0; i < fileids.length; i ++) {
					if (file.uid == fileids[i].uid) {
						this.fileid.splice(i, 1);
					}
				}
			},
			before(file) {
				this.filedata.filename = file.name;
				return true;
			},
			uploadCallBack(r, file, filelist) {
				let p = {fileid:r.data.id, uid:file.uid};
				this.fileid.push(p);
			},
			download(id) {
				if (id) {
					window.open(userApi.getFileDownloadUrl(id));
				}
			},
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
			// 上传附件弹窗框
			upload(){
				this.showUpload=true;
				this.showDesk=true;
			},
			closeCoun(){
				this.showUpload=false;
				this.showDesk=false;
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			initMins(activityid, userid,$event) {	//根据用户加载回复评价详情
				console.log($event)
				if($event){
					let divs = $event.$el.parentElement.parentElement.children
					for(let i = 0 ;i<divs.length;i++){
						divs[i].className = ''; 
					}
					$event.$el.parentElement.className = ' activesss'; 
				}
				
				let param = {activityid:activityid, userid:userid};
				api.findRecord(param).then(response => {
					if(response.data.meta.code == 200){
						this.mins = response.data.data;
						this.userid = userid;	//初始化当前登录用户id
						console.log(this.mins);
					}
				});
			},
			getAG(activityid, groupid) {	//成员列表
				let param = {activityid:activityid, groupid:groupid};
				api.getAG(param).then(response => {
					if(response.data.meta.code == 200){
						this.group = response.data.data;
						console.log(this.group);
					}
				});
			},
			showMsg(meta) {	//回复评价
				if (meta.status == 'fail') {
					this.$message.error(meta.message);
				} else {
					 this.$message({
						message: meta.message,
						type: 'success'
					});
				}
			},
			reply() {	//回复评价
				console.log(this.content)
				let param = new FormData();
				param.append('activityid', this.activity.id);
				param.append('content', this.content);
				param.append('rid', this.userid);
				let fileids = this.fileid;
				let file= '';
				if (fileids && fileids.length > 0) {
					for (let i = 0; i < fileids.length; i ++) {
						file = file + fileids[i].fileid + ","
					}
				}
				param.append('fileids', file);
				if (this.content) {
					api.reply(param).then(response => {
						if(response){
							let meta = response.data.meta;
							this.initMins(this.activity.id, this.userid);
							this.showMsg(meta);
							this.fileList = [];
							this.fileid = [];
							this.content = '';
						}
					});
				} else {
					this.$message.error("内容不能为空");
				}
			},
			findCommentByActivity() {	//查找评论
				let param = {activityid:this.activity.id, pageNo:this.c_pageNo, pageSize:this.c_pageSize};
				console.log("刷新评论")
				api.findCommentByActivity(param).then(response => {
					if(response){
						let meta = response.data.meta;
						this.c_list = response.data.data.list;
						// this.showMsg(meta);					
					}
				});				
			},
			comment() {	//评论
				console.log("评论")
				let param = new FormData();
				param.append('activityid', this.activity.id);
				param.append('content', this.c_comment);
				param.append('rid', this.c_userid);
				if (this.c_comment) {
					api.comment(param).then(response => {
						if(response){
							let meta = response.data.meta;
							this.showMsg(meta);
							this.findCommentByActivity();
							this.c_username = "请输入评论内容";
							this.c_comment="";
							this.c_userid="";
						}
					});
				} else {
					this.$message.error("评论内容不能为空");
				}
			},
			clickComment(c_userid, c_username) {	//评论某某某
				console.log("回复评论");
				console.log(c_userid);
				if (c_userid == this.activity.currentUserid) {
					this.$message({message: "不能回复自己"});
				} else {
					this.c_userid = c_userid;
					this.c_username = "@" + c_username;
				}				
			},
			// 返回教研页面
			returnRestotal(){
				this.$router.push({
					name:'research',
					query:{
						// id:id
					}
				})
			}
			
		},
		mounted () {
			let _this = this;
			_this.uploadurl = userApi.getFileUploadUrl();
			setInterval(function(){_this.uploadurl = userApi.getFileUploadUrl();}, 4 * 60000);
			this.activityid = this.$route.query.id
			let param = {activityid: this.activityid };
			console.log("加载教研详情");
			this.c_username = "请输入评论内容";
			api.getActivity(param).then(response => {
				// console.log(response)
				if(response.data.meta.code == 200){
					this.activity = response.data.data;
					console.log(this.activity);
					if (this.activity) {
						let file = this.activity.file;
						if (file) {
							for (let key in file) {
								if (file[key] && file[key].length > 0) {
									if (file[key]) {
										for (let i = 0; i < file[key].length; i ++) {
											this.files.push(file[key][i]);
										}
									}
								}
							}
						}
						console.log("加载教研当前用户教研回复详情")
						this.initMins(this.activity.id, this.activity.currentUserid);
						console.log("加载教研活动群组")
						this.getAG(this.activity.id, this.activity.groupid);
						console.log("加载评论")
						this.findCommentByActivity();
					}
					
				}
			});
		},
		components:{
			fcHeader
		}
}
</script>
<style type="text/css" lang="scss" scoped>
	body{
		font-size: 14px;
		color: #333;
	}
	// 顶部标签
	.table-box{
		width:1200px;
		margin: 0 auto;
		.tabtop{
			height: 55px;
			margin-top: 7px;
			background-color: #fff;
			border-radius: 4px;
			padding: 0 24px;
			.tableft{
				float: left;
				line-height: 55px;
				color:#208af5;
				font-size:16px;
				border-bottom:2px solid #208af5;
				font-weight: bold;
			}
			.tabright{
				float: right;
				// height: 15px;
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
					display: inline-block;
					float: right;
					margin-left: 6px;
					margin-top: 2px;
				}
			}
		}
	}
	// 主体模块
	.resebox{
		width:1200px;
		margin: 0 auto;
		margin-top: 20px;
		// color:#333;
		font-size: 14px;
		.resenextbox{
			width: 100%;
			min-height: 800px;
			background-color: #fff;
			border-radius: 6px;
			padding: 30px 0;
			margin-bottom: 30px;
			overflow: hidden;
			// 左侧教研详情
			.detail-research{
				padding: 0 24px;
				.det-top{
					border-bottom: 1px solid #d2d2d2;
					font-size: 16px;
					overflow: hidden;
					padding-bottom: 20px;
					margin-bottom: 20px;
					.event-name{
							margin-bottom: 20px;
					}
					ul{
						li{
							float: left;
							margin-right: 34px;
							i{
								display: inline-block;
								margin-left: 8px;
							}
						}
					}
				}
				.activcont{
					.actshow{
						// width: 100%;
						height: 140px;
						border: 1px solid #d2d2d2;
						border-radius: 6px;
						background-color: #f2f2f2;
						padding: 20px 18px;
						overflow :auto;
					}
				}
				.acttach{
					margin-top: 14px;
					margin-bottom: 40px;
					ul{
						li{
							margin-bottom: 10px;
							span{
								color: #448df5;
								cursor:pointer;
							}
						}
					}
				}
				.evaldetmain{
					min-height:200px;
					max-height: 440px;
					overflow: auto;
					.evaldet{
						margin-bottom: 36px;
						.evalshow{
							height: 110px;
							border: 1px solid #d2d2d2;
							border-radius: 6px;
							background-color: #f2f2f2;
							padding: 20px 18px;
							overflow :auto;
							margin-bottom:14px;
						}
						.fjshow{
							height: 100px;
							overflow-y:auto;
							div{
								height:26px;
								line-height:26px;
								font-size:14px;
								color: #48576a;
								padding-left: 4px;
								cursor:pointer;
							}
							div:hover{
								color:#20a0ff;
							}
						}
					}
				}
				.group-leader{
					margin-top: 42px;
					margin-bottom: 16px;
					p{margin-bottom: 12px;}
					.bianjiqi{
						width: 100%;
						height: 158px;
						// border: 1px solid #f2f2f2;
					}
				}
				.det-bottom{
					overflow: hidden;
					.upload-demo{
						float: left;
					}
					.cliup{
						background:transparent;
						color: #208af5;
						text-decoration: underline;
						cursor: pointer;
						border:0;
					}
					.submit{
						width: 96px;
						height: 42px;
						float: right;
					}
				}
			}
			// 右侧群组
			.right-group{
				padding: 0 20px;
				.my-group{
					border: 1px solid #eee;
					padding-bottom: 50px;
					height: 500px;
					overflow: auto;
					.group-top{
						padding: 16px 14px;
						background-color: #dbecac;
						border-radius: 4px;
						text-align: center;
						.group-name{
							display: inline-block;
							font-weight: bold;
							margin-left: 15px;
						}
						.group-icon{
							float: right;
							// overflow: hidden;
							// margin-right: 14px;
							span{
								width: 20px;
								height: 20px;
								display: inline-block;
								cursor: pointer;
								position: relative;
							}
						}
					}
					
				}
				// 列表
				.el-menu-vertical-demo,.el-menu{
					background-color: transparent;
				}
				.el-submenu__title:hover,.el-menu:hover,.el-menu-item:hover{
					background-color: transparent;
				}
				.el-submenu{
					.el-menu-item, .el-submenu__title{
						span{
							display: inline-block;
							// margin-left: 28px;
						}
						height: 40px;
						line-height: 40px;
					}
					.lans{
						color:#208af5 !important;
					}
					.zuzhang{
						color:#208af5 !important;
						.hovers{
							display: inline-block;
							width:126px;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
						.hovers:hover{
							display: inline-block;
							overflow: auto;
							width:168px;
							white-space: normal;
						}
					}
					.el-menu-item{
						position: relative;
						i{
							width:21px;
							height:21px;
							background: url('../../../assets/researchCenter/head-portrait.png') 0 0 no-repeat;
							display: inline-block;
							margin-right: 10px;
						}
						.r-detail{
							position: absolute;
							right: 10px;
							top:1px;
						}
						padding:0 10px;
					}
					// .el-submenu__icon-arrow{
					// 	// position: absolute;
					// 	// right: 220px;
					// 	// top: 57%;
					// 	width:0;
					// 	height:0;
					// 	// background: url('../../../assets/researchCenter/green-add-small.png') 0 0 no-repeat;
					// }
					.el-menu-item-group{
						height: 40px;
						line-height: 40px;
					}
					.el-menu-item-group__title{
						padding-top: 0;
						height:40px;
						line-height: 40px;
						color:#222;
					}
					// .el-icon-arrow-down:before{
					// 	content:''
					// }
					.el-menu{
						background-color: #f9f9f9;
					}
					.haveeval{
						float: right;
						color:#91c604;
					}
					.nofeed{
						float: right;
						color:#208af5
					}
				}
				.el-menu--dark .el-submenu__title{
					color: #222222;
				}
				.el-menu--dark .el-menu-item{
					color: #222222;
				}
				.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
					color:#208af5
				}
				// .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
				// 	transform:rotateZ(0deg);
				// 	background: url('../../../assets/researchCenter/green-subtra.png') 0 0 no-repeat;
				// }
				.el-menu--dark .el-submenu .el-menu .el-menu-item:hover{
					background-color: #dddddd;
				}
				// 底部评论区
				.rese-bottom{
					margin-top: 18px;
					border: 1px solid #eeeeee;
					position: relative;
					height:500px;
					overflow: auto;
					// width:1200px;
					// margin: 0 auto;
					// margin-bottom: 40px;
					// min-height: 218px;
					// background-color: #fff;
					// padding: 24px;
					h3{
						width: 100%;
						background-color:#e7f3ff;
						height: 40px;
						line-height: 40px;
						text-align: center;
						// margin-bottom: 18px;
					}
					
					.publis-box{
						width:100%;
						position: absolute;
						bottom: 0;
						.publish{
							background-color: #208af5 !important;
							color:#fff !important;
						}
						.el-input__inner{
							border-right: 0;
							background-color: #f2f2f2;
						}
					}
					.comcontent{
						padding: 10px;
						height: 400px;
						overflow: auto;
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
				}
			}
		}
		h4{
			font-size: 16px;
			font-weight: normal;
			color: #333;
			margin-bottom: 12px;
		}
		h5{
			font-size: 14px;
			margin-bottom: 12px;
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
	.activesss{
		background-color: #dbdbdb;
	}
</style>