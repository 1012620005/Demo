<template>
	<div>	
		<fc-header>
			<div style="width:190px;display:inline-block" >
			<el-input
				placeholder="请输入内容"
				icon="search"
				v-model="state2"
				>
			</el-input>
			</div>
		</fc-header>
		<div class="content">
			<div class="con_left">
				<div class="con_left_top">
					<p class="color_bg">{{name}}</p>
					<span v-if="photo != ''" class="imgPhoto cursor" @click="jumperPage"><img :src="photoUrl"/></span>
					<span v-else class="imgPhoto cursor"  @click="jumperPage">
						    <img src="../../assets/img/connet/menDefault.png" v-show="sex == 1"/>
							<img src="../../assets/img/connet/womenDefault.png" v-show="sex != 1"/>
					</span>
					<!-- <ul class="roleName" id="showMoreBtn">
						<li v-for="(item,index) in role" :id="item.id" class="roleItem cursor" @click="roleChange($event, index, item.id)"><a class="default" :class="[{'acitve':stuActive==index}]"  :title="item.name">{{ item.name.length > 5 ? (item.name.substr(0,5) + '...') : item.name }}</a></li>
						<span class="arrow cursor" @click="showMore" v-show="role.length > 3 && moreFlag"></span>
						<span class="arrowHidden cursor" @click="hiddenMore" v-show="role.length > 3 && !moreFlag"></span>
					</ul> -->
				</div>
				<div class="con_left_center">
					<div class="noteBox">
						<span  class="noteTitle">消息通知</span>
						<span class="moreNote cursor" @click="jumpMore">更多</span>
					</div>
					<div class="noteList" id="scroll" @mouseover="stop" @mouseout="countie">
						<ul class="scrollBox" :style="{ top }">
					    	<li v-for="item in noteList" class="noteItem cursor" :id="item.id" @click="seeDetial(item)">{{item.content}}</li>
						</ul>
					</div>
				</div>
				<div class="con_left_bottom">
					<fc-calendar ref="calendar"  :events.sync="fcEvents" lang="en" @dayClick="dayClick" @emitChangeMonth="emitChangeMonth"></fc-calendar>
				</div>
			</div>
			<div class="con_right">
				<div class="con_right_top">
					<h4 class="applyCenter">应用中心</h4>
					<ul class="applyBoxLink">
						<li class="applyBoxItem cursor" v-for="item in restaurants" :key="item.id" :index="item.id" @click="router(item.url)">
							<!-- <i class="icon "><img :src="item.icon"/></i> -->
							<i class="icon"><img :src="item.icon"/></i>
							<a class="applyText" :title="item.name">{{ item.name }}</a>
						</li>
					</ul>
				</div>
				<div class="con_right_center">
					<h4 class="applyCenter">今日提醒</h4>
					<ul class="applyTip">
						<li class="applyTipItem cursor">
							<span class="applyTipImg"></span>
							<div class="applyTipList">
								<p class="applyTipText">问卷调查</p>
								<p class="applyTipNum">1</p>
								<p class="applyTipName">今天放假几天？</p>
							</div>
						</li>
						<li class="applyTipItem cursor">
							<span class="applyTipImgOther"></span>
							<div class="applyTipList">
								<p class="applyTipText">今日课程</p>
								<p class="applyTipNum">4</p>  
								<p class="applyTipName">语文、化学、物理、英语</p>
							</div>
						</li>
						<li class="applyTipItem cursor">
							<span class="applyTipImg"></span>
							<div class="applyTipList">
								<p class="applyTipText">处罚记录</p>
								<p class="applyTipNum">1</p>
								<p class="applyTipName">今日迟到扣除0.5分</p>
							</div>
						</li>												
					</ul>
				</div>
				<div class="con_right_bottom">
					<h4 class="applyCenter">通讯录</h4>
					<div class="dataStatis clear">
						<ul class="dataStatisUl">
							<li class="dataStatisItem" v-for="item in bookList">
								<p class="dataImg">
									<span class="imgPhotoPhone">
										 <img src="../../assets/img/connet/menDefault.png" v-if="item.photo == '' && item.sex == 1"/>
							             <img src="../../assets/img/connet/womenDefault.png" v-else-if="item.photo == '' && item.sex != 1"/>
										 <img :src='getUrl(item.photo)' v-else/>
									</span>
								</p>
								<p class="dataName">{{ item.name }}<p>
								<p class="dataTel">{{ item.mobile }}</p>
							</li>                              
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!--校历-->
	   <el-dialog title="校历" :visible.sync="dialogFormVisible" size="tiny" @close="close('form')">
		  <el-form :model="form"  ref="form">
		    <el-form-item label="个人事件"  prop="title">
		      <el-input v-model="form.content" :row="4" auto-complete="off" type="textarea" resize="none"></el-input>
		    </el-form-item>
			<div style="height:230px; overflow-y:auto">
				<el-form-item label="学校事件" v-for="(t,index) in form.list" :key="index">
					<el-input  :row="4" :value="t.content" :readonly="true" auto-complete="off" type="textarea" resize="none"></el-input>
				</el-form-item>
			</div>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="save('form')">保存</el-button>
		  </div>
		</el-dialog>
		<see-index-detial :form="seeForm" @closeDialog="clearSeeForm"></see-index-detial>	
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import fcCalendar from '../common/calendar1.vue'
	import userApi from '../../apis/userCenter.js'
	import Schart from 'vue-schart';
	import util from '../../common/js/util.js'
	import seeIndexDetial from '../common/seeIndexDetial.vue'
	import { getToken } from './../../utils/auth'
	export default{
		data () {
			return {
				photoUrl:'',
				photo:'',
				sex:'',
				name: '',
				state2:'',
				restaurants:"",
				role:[],
				noteList:[],
				fcEvents:[],
				stuActive: 0,
				applyList:[],
				form: {
					id: '',
					content: '',	//个人校历内容
					eventdate:'',
					list: [],	//学校校历内容
				},
				dialogFormVisible: false,
				seeForm:{
					visible: false,
					title: '',
					msgType: '',
					createBy: '',
					createDate: '',
					content: '',
					photo:''
				},
				moreFlag: true,
				timer: null,
                activeIndex: 0,
				bookList:[],
				bookUrl:'',
			}
		},
		methods:{
			querySearch(queryString) {
				var restaurants = this.applyList;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				this.restaurants = results;
			},
			createFilter(queryString) {
				return (restaurant) => {
				return (restaurant.name.indexOf(queryString.toLowerCase()) >= 0);
				};
			},
			showMore () {
				this.moreFlag = false
				$('#showMoreBtn').height('auto');
			},
			hiddenMore () {
				this.moreFlag = true
				$('#showMoreBtn').height('102');
			},
			dayClick (day,jsEvent) {
				console.log(day);
				this.fcEvents=[];
				let today = util.formatDate.format(day, "yyyy-MM-dd");
				this.findXlByDate(today);
				this.getMyXl(today);
				this.form.eventdate = today;
				var nowDate = new Date();
				// if(day <= nowDate) {
				// 	this.$message.error('请选择今天以后的时间进行编辑');
				// 	return false
				// }
				// if(len === 0) {
				// 	this.form.formTitle = '新增内容'
				// } else {
				// 	this.form.formTitle = '编辑内容'
				// 	var title = $(jsEvent.path[1]).find('span.events-text').text();
				// 	this.form.title = title
				// }
				this.dialogFormVisible = true
			},
			emitChangeMonth(start, end, currentStart) {
				// console.log(currentStart);
				this.findXlExist(currentStart);
			},
			getUserMsg () {
				console.log(this.restaurants)
				userApi.getCurrentUser().then(r =>{
					if(r) {
						// console.log(this.restaurants)
						var data = r.data.data
						this.name = data.name
						this.photo = data.photo;
						this.sex = data.sex;
						if(this.photo){
							this.photoUrl = userApi.getCommonShowUrl(data.photo);
						} 
						this.$Cookies.set('username',data.name);
						this.$store.dispatch('getname',data.name);
						this.$Cookies.set('userId',data.id)
						this.role = data.roleList
						if(localStorage.getItem("role")){
							
							let role = JSON.parse(localStorage.getItem("role"));
							if(data.id == role.id) {
								this.restaurants =  role.role.roleList[0].menuList;
							    this.stuActive = role.index;
							} else {
								localStorage.setItem("role", JSON.stringify({'role':data,'index':this.stuActive}));
								if(this.role && this.role.length > 0) {
									this.applyList = this.role[0].menuList;
									this.restaurants =  this.role[0].menuList;
								}
							}
							
						}else{
							localStorage.setItem("role", JSON.stringify({'role':data,'index':this.stuActive}));
							if(this.role && this.role.length > 0) {
								this.applyList = this.role[0].menuList;
								this.restaurants =  this.role[0].menuList;
							}
						}
					}
				})
			},
			router(url){
		        if (url.indexOf("j_spring_security_check") >= 0) {
					url = url + getToken();
		            window.open(url);
		        } else {
		            this.$router.push(url)
		        }
    		},
    		roleChange (event,index,id) {
    			this.stuActive = index
    			this.getRole(id,index)
    		},
    		getRole(id,index) {
				let params = {roleid:id};
				userApi.getRole(params).then(r=>{
				    let role = r.data.data;
				    if (role) {
				        if (role.menuList && role.menuList.length > 0) {
							this.applyList = role.menuList;
							this.restaurants = role.menuList;
							localStorage.setItem("role", JSON.stringify({'role':role,'index':index}));
				        } else {
				            this.applyList = [];
				        }
				    } else {

				            this.menuList = [];
				    }
				})    			
    		},
    		getMsg () {
    			let parmas = {type:'0',pageNo:'1', pageSize:'5'};
    			userApi.findMsg(parmas).then(r=>{
					let page = r.data.data;
					this.noteList = page.list;
				})
    		},
			findXlExist (date) {
				console.log(this.fcEvents)
				console.log('---------')
				let params = {eventdate:date};
				userApi.findXlExist(params).then(r=>{
					let data = r.data.data;
					console.log(data + '+++++++++')
					if (data && data.length > 0) {
						this.form.events = [];
						for (let i = 0; i < data.length; i ++) {
							let c = {title:'有什么事阿斯顿发生地方来看价格 东风螺壳圣诞节', start:data[i].eventdate, end:data[i].eventdate};
							this.fcEvents.push(c);
						}
					}
				});				
			},
			findXlByDate(eventdate){
				let params = {eventdate:eventdate, type:'1'};
				userApi.findXlByDate(params).then(r=>{
					let xl = r.data.data;
					console.log(xl);
					this.form.list = xl;
				});
			},
			getMyXl(eventdate){
				let params = {eventdate:eventdate};
				userApi.getMyXl(params).then(r=>{
					let xl = r.data.data;
					this.form.content = xl.content;
					this.form.id = xl.id;
					console.log(xl);
				});
			},
			save (form) {
				let params = new FormData();
				params.append("content", this.form.content);
				params.append("eventdate", this.form.eventdate);
				params.append("type", '0');
				if(this.form.id) {
					// 编辑
					params.append('id',this.form.id);
				} 
				userApi.saveXl(params).then(r=>{
					let meta = r.data.meta;
					userApi.showMsg(meta);
					if (meta.status == 'success') {
						this.dialogFormVisible = false;
						this.findXlExist(this.form.eventdate);
						this.$refs.calendar.$children[1].getTodayEvent()
						this.$refs.calendar.emitEventClick()
					}
				});

			},
			close (form) {
				this.$refs[form].resetFields();
				this.form.id = ''
				this.form.title = ''
				this.form.formTitle = ''
				this.findXlExist();
			},
			seeDetial (obj) {
				this.seeForm.visible = true
				this.seeForm.title = obj.title
				this.seeForm.msgType = obj.type
				this.seeForm.createBy = obj.createBy
				this.seeForm.createDate = obj.createDate
				this.seeForm.content = obj.content
				this.seeForm.photo = obj.photo
				// this.seeForm.content = '是的公司的风格是的山东分公司的分公司地方公司的风格水电费更好的符合公司的返回是的风格好地方和谁的风格红烧豆腐和水电费合适的返回速度发货水电费红烧豆腐滑过电风扇红烧豆腐和水电费红烧豆腐和水电费红烧豆腐价格哈是看过哈是帝国撒大哥阿斯顿噶速度个按时到岗谁的风格哈谁的风格谁的风格的风格的风格但是风格化I安东方红噶对方好感按时到岗的风格哈大发光火爱的咖啡馆好嘎哈分接开关还时代光华按时到岗回事大概是大哥'
			},
			clearSeeForm () {
				this.seeForm.visible = false
				this.seeForm.title = ''
				this.seeForm.msgType = ''
				this.seeForm.createBy = ''
				this.seeForm.createDate = ''
				this.seeForm.content = ''
				this.seeForm.photo =''			
			},
			jumpMore () {
				this.$router.push('morePage')
			},
			jumperPage () {
				// 跳转到个人信息页面
				this.$router.push('/student/personal')
			},
			scroll () {
				 if(this.activeIndex < this.noteList.length) {
					this.activeIndex += 1;
				} else {
					this.activeIndex = 0;
				}
			},
			stop() {

			},
			countie () {
				
            },
            getBook () {
                var _this = this
                var access_token = getToken('sessionid')
                userApi.getBook({access_token: access_token}).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.bookList = data.tealist
                    }
                })
			},
			getUrl(img) {
				return userApi.getCommonShowUrl(img)
			}
		},
		components:{
			fcHeader,
			fcCalendar,
			Schart,
			seeIndexDetial
		},
		mounted () {
			// console.log(localStorage.getItem("role"))
			// console.log(localStorage.getItem("role") !== null)
			// if(localStorage.getItem("role") !== null){
			// 	let role = JSON.parse(localStorage.getItem("role"));
			// 	// console.log(role)
			// 	this.restaurants =  this.role[0].menuList
			// }else{
			// 
			let that = this
			// this.timer = window.setInterval(function (){
			// 	that.scroll()
			// },500)
			this.getUserMsg()
			// }
			
			window.sessionStorage.setItem('type','5')
			// 获取当前用户的消息
			this.getMsg()
            this.findXlExist();	//校历初始化
            // 获取当前学生通讯录
            this.getBook()
		},
		watch:{
			state2:function(news,old){
				this.querySearch(news);
			}
		},
		computed: {
			top () {
			   return - this.activeIndex * 44 + 'px';
			}
  		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../common/css/common.scss';
	.content{
		display:flex;
		
		.con_left{
			width:312px;
			margin-top:10px;
		}
		.con_right{
			width:870px;
			margin-left:19px;
			margin-top:10px;
			.applyCenter{
				height:55px;
				color:#333;
				font-size:20px;
				line-height:40px;
				font-weight:normal;
			}
		}
	}
	.con_left_top{
		height:150px;
		margin-bottom:17px;
		background:#fff;
		border-radius:2px;
		text-align:center;
		.color_bg{
			height:55px;
			background:#d6eaff;
			text-align:center;
			line-height:30px;
			color:#333;
			font-size:16px;
		}
		.imgPhoto{
			display:inline-block;
			width:80px;
			height:80px;
			overflow:hidden;
			border-radius:50%;
			margin-top:-26px;
			img{
				width:100%;
				height:100%;
			}
		}
		.roleName{
			display:flex;
			flex-wrap:wrap;
			padding-left:10px;
			height:102px;
			position:relative;
			overflow:hidden;
			.roleItem{
				min-width:32%;
				cursor:pointer;
				padding-bottom:25px;
			}
			.arrow{
				position:absolute;
				width:11px;
				height:11px;
				background:url(../../assets/img/connet/indexArrow.png) no-repeat;
				right:9px;
				bottom:6px;
				cursor:pointer;
			}
			.arrowHidden{
				position:absolute;
				width:11px;
				height:11px;
				background:url(../../assets/img/connet/indexArrow.png) no-repeat;
				right: 9px;
				bottom:6px;
				transform:rotate(180deg);
				-ms-transform:rotate(180deg); /* Internet Explorer */
				-moz-transform:rotate(180deg); /* Firefox */
				-webkit-transform:rotate(180deg); /* Safari 和 Chrome */			
			}
		}
	}
	.con_left_center{
		width:312px;
		height:294px;
		background:#fff;
		margin-bottom:13px;
		padding:20px 20px 39px 20px;
		box-sizing:border-box;
		.noteBox{
			border-bottom:1px solid #d5d9e6;
			padding-bottom:9px;
			position:relative;
			.noteTitle{
				color:#333;
				font-size:18px;
				padding-left:26px;
				background:url(../../assets/img/connet/indexNote.png) no-repeat left center;
				background-size:21px 23px;
			}
			.moreNote{
				position:absolute;
				right:0;
				bottom:10px;
				padding-right:12px;
				display:inline-block;
				background:url(../../assets/img/connet/indexArrowLeft.png) no-repeat right center;
				background-size: 11px 11px;
				color:#4c577a;
				font-size:14px;
			}
		}
		.noteList{
			padding-top:20px;
			height:215px;
			overflow:hidden;
			.noteItem{
				margin-bottom:25px;
				background:url(../../assets/img/connet/indexDot.png) no-repeat left center;
				background-size:7px 8px;
				padding-left:18px;
				width:272px;
				overflow:hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				box-sizing:border-box;
				&:hover{
					color:#208af5;
				}
			}

		}
	}
	.con_left_bottom{
		width:312px;
		height:424px;
		background:#fff;
		margin-top:13px;
		border-radius:2px;
	}
	.applyBoxLink{
		height:272px;
		background:#fff;
		overflow-x: hidden;
		overflow-y:auto;
		display:flex;
		flex-wrap:wrap;
		padding-bottom:40px;
		padding-left:20px;
		.applyBoxItem{
			min-width:19%;
			text-align:center;
			height:96px;
			margin-top:40px;
			border-right:1px solid #d5d9e6;
			&:nth-child(5n) {
				border-right:none;
			}
			.applyImg{
				display:block;
				width:37px;
				height:35px;
				margin: 5px auto 0 auto;
				// background:url(../../assets/img/connet/indexApply.png) no-repeat center center;
			}
		}
	}
	.applyTip{
		height:212px;
		background:#fff;
		box-sizing:border-box;
		padding: 24px 0;
		display:flex;
		.applyTipItem{
			height:163px;
			border-right: 1px solid #d5d9e6;
			padding: 0 25px;
		    box-sizing:border-box;
		    display:flex;
		    align-items:center;
		    &:last-child{
		    	border-right:none;
		    }
			.applyTipImg{
				display:inline-block;
				width:44px;
				height:47px;
				background:url(../../assets/img/connet/indexLeave.png) no-repeat center center;
				margin-right:17px;
			}
			.applyTipImgOther{
				display:inline-block;
				width:38px;
				height:47px;
				background:url(../../assets/img/connet/indexJia.png) no-repeat center center;
				margin-right:17px;
			}
			.applyTipList{
				display:inline-block;
				.applyTipText{
					color:#333;
					font-size:16px;
					margin-bottom:5px;
				}
				.applyTipNum{
					color:#208af5;
					font-size:48px;
					font-weight:300;
				}
				.applyTipName{
					width:182px;
					overflow:hidden;
					white-space: nowrap;
				    text-overflow: ellipsis;
				}
			}
		}
	}
	.dataStatis{
		background:#fff;
		padding: 30px 0;
		box-sizing:border-box;
        overflow-x:auto;
		overflow-y:hidden;
		width:100%;
	}
	.dataStatisUl{
		display: flex;
        width: 200%;
	}
	.dataStatisItem{
		width:120px;
		text-align:center;
	}
	.cursor{
		cursor:pointer;
	}
	a.acitve{
		color:#fff;
		display:inline-block;
		padding: 4px 10px;
		height:25px;
		background:#208af5;
		border-radius:5px;
		line-height:25px;
	}
	a.default{
		display:inline-block;
		padding: 4px 10px;
		height:25px;
		line-height:25px;		
	}
    .dataName{
        font-size:16px;
        color:#333;
        margin: 13px 0 14px;
    }
    .dataTel{
        font-size:14px;
        color:#333;
        
    }
	.imgPhotoPhone{
		display:inline-block;
		width:80px;
		height:80px;
		overflow:hidden;
		border-radius:50%;
		img{
			width:100%;
			height:100%;
		}
	}
/*滚动条样式*/
.applyBoxLink::-webkit-scrollbar {/*滚动条整体样式*/
    width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
}
.applyBoxLink::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.applyBoxLink::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
.scrollBox{
	position: relative;
    transition: top 0.5s;
}
.applyBoxItem .icon{
	display:block;
    width:36px;
	height:36px;
	margin: 0 auto;
	margin-bottom:10px;
    -webkit-transition: transform 0.25s ease-out 0s;
    -moz-transition: transform 0.25s ease-out 0s;
    transition: transform 0.25s ease-out 0s;
}
.applyBoxItem .icon:hover{
	transform:scale(1.5);
	-webkit-transform:scale(1.5);
	-o-transform:scale(1.5);
	-moz-transform:scale(1.5);
}
</style>