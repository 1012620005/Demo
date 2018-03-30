<template>
	<div class="container">
		<fc-header>
			<div class="navtop" style="width:190px;display:inline-block" >
				<el-input
					placeholder="搜索..."
					prefix-icon="el-icon-search"
					v-model="state2"
					>
				</el-input>
			</div>
		</fc-header>
		
		<div class="content clearfix">
			<div class="con_left">
				<div class="con_left_top">
					<span v-if="photo != ''" class="imgPhoto cursor" @click="jumperPage"><img :src="photoUrl"/></span>
					<span v-else class="imgPhoto cursor" @click="jumperPage">
						    <img src="../../assets/img/connet/menDefault.png" v-show="sex == 1"/>
							<img src="../../assets/img/connet/womenDefault.png" v-show="sex != 1"/>
					</span>
					<p class="color_bg">{{name}}</p>
					<div style="margin-top:10px;">
						<el-dropdown>
							<span style="color:#fff;cursor: pointer;display: inline-block;width: 90px;">
								{{ curRole }}<i class="el-icon-caret-bottom el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-scrollbar tag="ul"  wrap-class="el-select-dropdown__wraps_mokuai" view-class="el-select-dropdown__list" >
									<el-dropdown-item v-for="(item,index) in role" :key="item.id" ><div  @click="roleChange($event, index, item)" >{{ item.name.length > 4 ? (item.name.substr(0,5) + '...') : item.name }}</div></el-dropdown-item>
									
								</el-scrollbar>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				<!-- <div class="con_left_center">
					<div class="noteBox">
						<span  class="noteTitle">消息通知</span>
						<span class="moreNote cursor" @click="jumpMore">更多</span>
					</div>
					<div class="noteList" id="scroll">
						<ul class="scrollBox" :style="{ top }">
					    	<li v-for="item in noteList" class="noteItem cursor" :id="item.id" @click="seeDetial(item)">{{item.title}}</li>
						</ul>
					</div>
				</div> -->
				<!-- <div class="con_left_bottom">
					<fc-calendar ref="calendar"  :events.sync="fcEvents" lang="en" @dayClick="dayClick" @emitChangeMonth="emitChangeMonth"></fc-calendar>
				</div> -->
		        <!--菜单栏-->
				<div class="menuBox">
					<el-menu
						:default-active="curIndex"
						@open="handleOpen"
						@close="handleClose"
						@select="handleSelect"
						background-color="#3b4966"
						text-color="#fff"
						active-text-color="#ffd04b"  :unique-opened="true">
						<template v-for="item of sel_list">
							<el-submenu :index="item.id" v-if="item.children.length > 0">
								<template slot="title">
								<i class="el-icon-caret-right"></i>
								<span>{{ item.name }}</span>
								</template>
								<template v-for="obj of item.children">
									<el-menu-item :index="obj.href">
										<template>
											<i class="el-icon-caret-right"></i>
											<span>{{ obj.name }}</span>
										</template>
									</el-menu-item>
								</template>
							</el-submenu>
							<el-menu-item :index="item.href" v-else>
									<template slot="title">
									<i class="el-icon-caret-right"></i>
									<span>{{ item.name }}</span>
								</template>
							</el-menu-item>
						</template>	
					</el-menu>
				</div>
			</div>
			<div class="con_right">
				<!-- <div class="con_right_top">
					<h4 class="applyCenter">应用中心</h4>
					<ul class="applyBoxLink">
						<li class="applyBoxItem cursor" v-for="item in restaurants" :key="item.id" :index="item.id" @click="router(item.url)">
							
							<i class="icon"><img :src="item.icon"/></i>
							<a class="applyText" :title="item.name">{{ item.name }}</a>
						</li>
					</ul>
				</div>
				<div class="con_right_center">
					<h4 class="applyCenter">今日提醒</h4>
					<ul class="applyTip">
						<li class="applyTipItem cursor" v-for="item in tipList" >
							<span class="applyTipImg" :style="'backgroundImage:url('+ item.icon +')'"></span>
							<div class="applyTipList">
								<p class="applyTipText">{{item.name}}</p>
								<p class="applyTipNum">{{item.numbers}}</p>
								<p class="applyTipName">{{item.leaveNameList}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="con_right_bottom">
					<h4 class="applyCenter">数据统计</h4>
					<ul class="dataStatis clear cursor">
						<li class="dataStatisItem">
							<div id="mychart1" style="width:290px;height:300px;"></div>
						</li>
						<li class="dataStatisItem">
							<div id="mychart2" style="width:290px;height:300px;"></div>
						</li>
						<li class="dataStatisItem">
							<div id="mychart3" style="width:290px;height:300px;"></div>							
						</li>												
					</ul>
				</div> -->
				<div class="con_right_top">
					<div class="con_right_top_left">
						<div class="noteBox">
						<span  class="noteTitle">消息通知</span>
						<span class="moreNote cursor" @click="jumpMore">更多</span>
					 </div>
					 <div class="noteList" id="scroll">
						<ul class="scrollBox" :style="{ top }">
					    	<li v-for="item in noteList" class="noteItem cursor" :id="item.id" :key="item.id" @click="seeDetial(item)">{{item.title}}</li>
						</ul>
					 </div>
					</div>
					<div class="con_right_top_right">
						<fc-calendar ref="calendar"  :events.sync="fcEvents" lang="en" @dayClick="dayClick" @emitChangeMonth="emitChangeMonth"></fc-calendar>
					</div>
				</div>
				<div class="con_right_bottom">
					<h4 class="con_right_title">
						数据统计
					</h4>
					<el-row :gutter="20">
						<el-col style="height:250px;" :span="8" v-for="item in echartIds" :key="item.id" >
							<div ref="domeecharts" :id="item.id" style="width:100%;height:100%;"></div>
						</el-col>
						<!-- <el-col style="height:250px;" :span="8"><div id="mychart2" style="width:100%;height:100%;"></div></el-col>
						<el-col style="height:250px;" :span="8"><div id="mychart3" style="width:100%;height:100%;"></div></el-col> -->
						
					</el-row>
				</div>
			</div>
		</div>
		<!--校历-->
	   <el-dialog title="校历" :visible.sync="dialogFormVisible" width='30%' class="dialogImg" @close="close('form')">
		  <el-form :model="form"  ref="form">
		    <el-form-item label="个人事件"  prop="title">
		      <el-input v-model="form.content" :row="4" auto-complete="off" type="textarea" resize="none"></el-input>
		    </el-form-item>
			<div style="height:230px; overflow-y:auto">
				<el-form-item label="学校事件" v-for="(t,index) in form.list" :key="index" >
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
	import fcHeader from '../common/headIndex.vue'
	import fcCalendar from '../common/calendar1.vue'
	import userApi from '../../apis/userCenter.js'
	import dataApi from '../../apis/statis.js'
	import Schart from 'vue-schart';
	import util from '../../common/js/util.js'
	import seeIndexDetial from '../common/seeIndexDetial.vue'
	import { getToken } from './../../utils/auth'
	import echarts from 'echarts'
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
				stuActive:0,
				applyList:[],
				tipList:[
					{
						name:'今日请假',
						type:1,
						leaveNameList:'李嘉欣、李贺宇、刘秦天',
						numbers:3,
						icon:'./static/img/indexLeave.png'
					},
					{
						name:'今日加班',
						type:2,
						leaveNameList:'今日查寝男生宿舍、与计算机男生宿舍',
						numbers:9,
						icon:'./static/img/indexJia.png'
					},
					{
						name:'今日公文',
						type:3,
						leaveNameList:'今日查寝男生宿舍、与计算机男生宿舍',
						numbers:8,
						icon:'./static/img/indexLeave.png'
					},
					{
						name:'今日值班',
						type:4,
						leaveNameList:'今日查寝男生宿舍、与计算机男生宿舍',
						numbers:6,
						icon:'./static/img/indexLeave.png'
					}
				],
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
				moreFlag: false,
				timer: null,
				activeIndex: 0,
				curRole:'',
				echartIds:[],
				opt1:{
					title:{
						show:true,
						text:'专业人数比率',
						textStyle:{
							color:'#323232',
							fontSize:'14px',
						    

						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
    				},
					series: [
						{
							name:'访问来源',
							type:'pie',
							radius: ['40%', '70%'], 
							hoverOffset: 20,
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: false,
									textStyle: {
										fontSize: '30',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data:[
								{value:335, name:'会计专业'},
								{value:310, name:'国际贸易专业'},
								{value:234, name:'广告设计专业'},
								{value:135, name:'项目管理专业'}
							]
						}
					],
					color:['#5ddc95','#66b2fd','#9383e5','#fcd629']
				},
				opt3:{
					title:{
						show:true,
						text:'男女比率',
						textStyle:{
							color:'#323232',
							fontSize:'14px',
						    

						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
    				},
					series: [
						{
							name:'访问来源',
							type:'pie',
							radius: ['40%', '70%'], 
							hoverOffset: 20,
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: false,
									textStyle: {
										fontSize: '30',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data:[
								{value:820, name:'男'},
								{value:310, name:'女'}
							]
						}
					],
					color:['#68b4ff','#f8a7ec']
				},
				// opt2:{
				// 	title:{
				// 		show:true,
				// 		text:'就业率',
				// 		textStyle:{
				// 			color:'#323232',
				// 			fontSize:'14px'
				// 		}
				// 	},
				// 	tooltip:{
				// 		trigger: 'axis'
				// 	},
				// 	grid:{
				// 		show: true,
				// 		left:'15%'
				// 	},
				// 	xAxis:[{
				// 		show:true,
				// 		gridIndex: 0,
				// 		type:'category',
				// 		// splitLine:{show: false},//去除网格线
				// 		// splitArea : {show : true},//保留网格区域
				// 		data:['2014','2015','2016','2017'],
				// 		// axisLine:{
				// 		// 	show:false
				// 		// },
				// 		// axisTick:{
				// 		// 	show:false
				// 		// }
				// 	}],
				// 	yAxis:[{
				// 		show:true,
				// 		type:'value',

				// 		// data:['25%','50%','75%','100%'],
				// 		// axisLine:{
				// 		// 	show:false
				// 		// },
				// 		// axisTick:{
				// 		// 	show:false
				// 		// },
				// 		// splitLine: {
				// 		// 	show: true,
				// 		// 	lineStyle: {
				// 		// 		color: '#e7e7e7',
				// 		// 		type: 'dashed'
				// 		// 	}
        		// 		// }
				// 	}],
				// 	series:[{
				// 		type: 'line',
				// 		name:'访问来源',
				// 		smooth: true,
				// 		data:['73%','50%','71%','68%']
				// 	}]

				// }
				opt2:{
					title: {
							text: '就业率',
							textStyle:{
								color:'#323232',
								fontSize:'14px'
							}
					},
					tooltip: {
						trigger: 'axis'
					},
					toolbox: {
						show: false,
						feature: {
							dataZoom: {
								yAxisIndex: 'none'
							},
							dataView: {readOnly: false},
							magicType: {type: ['line', 'bar']},
							restore: {},
							saveAsImage: {}
						}
					},
					grid: {
						show: false,
						left:'15%'
					},
					xAxis:  {
						type: 'category',
						boundaryGap: false,
						data: ['2014','2015','2016','2017'],
						splitLine:{show: false},//去除网格线
						splitArea : {show : true},//保留网格区域
						axisLine:{
							show:false
						},
						axisTick:{
							show:false
						}
					},
					yAxis: {
						type: 'value',
						axisLabel: {
							formatter: '{value} %'
						},
						axisLine:{
							show:false
						},
						axisTick:{
							show:false
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: '#e7e7e7',
								type: 'dashed'
							}
        				}						
					},
					series: [
						{
							name:'访问来源',
							type:'line',
							smooth: true,
							data:[20, 50, 30, 70],
							itemStyle:{
								normal:{
									color:'#208af5'
								}
							}
						}
					]					
				},
				curIndex:'',
		        list:[],
				sel_list:[]
			}
		},
		methods:{
			flattenOptions(options, ancestor = []) {
				let flatOptions = [];
				options.forEach((option) => {
					const optionsStack = ancestor.concat(option);
					if (!option['children']) {
					flatOptions.push(optionsStack);
					} else {
						flatOptions.push(optionsStack);
					flatOptions = flatOptions.concat(this.flattenOptions(option['children'], optionsStack));
					}
				});
				return flatOptions;
			},
			getCascader(val,option){
				const flatOptions = this.flattenOptions(option);
				let filteredFlatOptions = flatOptions.filter(optionsStack => {
					return optionsStack.some(option => new RegExp(val, 'i').test(option['name']));
				});
				console.log(filteredFlatOptions)
				return filteredFlatOptions
			},
			// querySearch(queryString) {
			// 	var restaurants = this.applyList;
			// 	var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
			// 	this.restaurants = results;
			// },
			// createFilter(queryString) {
			// 	return (restaurant) => {
			// 	return (restaurant.name.indexOf(queryString.toLowerCase()) >= 0);
			// 	};
			// },
			changeRoleName () {
				this.moreFlag = ! this.moreFlag
				// if(this.moreFlag) {
				// 	$('.trangle').css({
				// 		'transform':'rotate(180deg)',
				// 		'marginTop':'-7px'
				// 	})
				// } else {
				// 	$('.trangle').css({
				// 		'transform':'rotate(0deg)',
				// 		'marginTop':'0'
				// 	})
				// }
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
						let data = r.data.data
						this.name = data.name;
						this.photo = data.photo;
						this.sex = data.sex;
						this.photoUrl = userApi.getCommonShowUrl(data.photo);
						this.$Cookies.set("user", data.id);
						this.$Cookies.set('username',data.name);
						// this.$store.dispatch('getname',data.name);
						this.$Cookies.set('userId',data.id)
						this.role = data.roleList
						if(localStorage.getItem("role") != null ){
							let role = JSON.parse(localStorage.getItem("role"));
							if(role.index == 0){
								this.sel_list =  this.role[0].menuList;
								this.list = this.role[0].menuList;
								this.curRole = this.role[0].name
							}else{
								this.sel_list =  role.role.menuList;
								this.list = role.role.menuList
								this.curRole = role.role.name
							}
							this.stuActive = role.index;
						}else{
							localStorage.setItem("role", JSON.stringify({'role':data,'index':0}));
							if(this.role && this.role.length > 0) {
								this.applyList = this.role[0].menuList;
								this.list = this.role[0].menuList;
								this.sel_list =  this.role[0].menuList;
								this.curRole = this.role[0].name
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
    		roleChange (event,index,obj) {
				this.stuActive = index
				this.curRole = obj.name
    			this.getRole(obj.id,index)
    		},
    		getRole(id,index) {
				let params = {roleid:id};
				userApi.getRole(params).then(r=>{
				    let role = r.data.data;
				    if (role) {
				        if (role.menuList && role.menuList.length > 0) {
							this.applyList = role.menuList;
							this.list = role.menuList
							this.sel_list = role.menuList;
							localStorage.setItem("role", JSON.stringify({'role':role,'index':index}));
				        } else {
				            this.applyList = [];
							this.list = []
				        }
				    } else {

				            this.menuList = [];
				    }
				})    			
    		},
    		getMsg () {
    			let parmas = {type:'0',pageNo:'1', pageSize:'8'};
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
			},
			jumpMore () {
				this.$router.push('morePage')
			},
			setEchart () {
				this.echartIds = []
				// var echarts1 = echarts.init(document.getElementById('mychart1'))
				// var echarts2 = echarts.init(document.getElementById('mychart2'))
				// var echarts3 = echarts.init(document.getElementById('mychart3'))
				// console.log(this.$refs)
				dataApi.getData().then(res =>{
					var data = res.data.data
					for(let item in data){
						var obj = data[item]
						this.echartIds.push({id:item,data:obj.data,name:obj.name,type:obj.type})
						console.log(this.echartIds)
							
					}
					// let arr_option=[]
					// arr_option=this.echartIds.map(r=>{
					// 	let	option = {
					// 		title:{
					// 			show:true,
					// 			text:r.name,
					// 			textStyle:{
					// 				color:'#323232',
					// 				fontSize:'14px',
					// 			}
					// 		},
					// 		tooltip: {
					// 			trigger:'item',
					// 			formatter: "{a} <br/>{b}: {c} ({d}%)"
					// 		},
					// 		normal: {
					// 			    show: false,
					// 				position: 'center'
					// 			},
					// 			emphasis: {
					// 				show: false,
					// 				textStyle: {
					// 					fontSize: '30',
					// 					fontWeight: 'bold'
					// 				}
					// 		},
					// 		series: [
					// 			{
					// 				name:'访问来源',
					// 				type:'pie',
					// 				radius: ['50%', '70%'],
					// 				avoidLabelOverlap: false,
					// 				label: {
					// 					normal: {
					// 						show: false,
					// 						position: 'center'
					// 					},
					// 					emphasis: {
					// 						show: true,
					// 						textStyle: {
					// 							fontSize: '30',
					// 							fontWeight: 'bold'
					// 						}
					// 					}
					// 				},
					// 				labelLine: {
					// 					normal: {
					// 						show: false
					// 					}
					// 				},
					// 				data:r.data
					// 			}
					// 		]
					// 	};
					// 	return option
					// })
					
					// let _this = this
					// setTimeout(() => {
					// 	let dome = _this.$refs
					// 	console.log(dome['domeecharts'])
					// 	// dome['domeecharts']
					// 	dome['domeecharts'].forEach((r,index)=>{
					// 		console.log(r)
					// 		let objDom=""
					// 		objDom =  echarts.init(r)
					// 		// console.log(objDom)
					// 		objDom.setOption(arr_option[index])
					// 	})
					// }, 0);
					this.$nextTick(function(){
								for(let i = 0,len = this.echartIds.length; i < len; i++){
									var obj = this.echartIds[i]
									var objId = obj.id
									var objDom = ''
									objDom = echarts.init(document.getElementById(objId))
									if(obj.type == '0'){
										// 饼状图
										var option = {
												title:{
													show:true,
													text: obj.name,
													textStyle:{
														color:'#323232',
														fontSize:'14px',
													}
												},
												tooltip: {
													trigger: 'item',
													formatter: "{a} <br/>{b}: {c} ({d}%)"
												},
												series: [
													{
														name:'访问来源',
														type:'pie',
														radius: ['40%', '70%'], 
														hoverOffset: 20,
														avoidLabelOverlap: false,
														label: {
															normal: {
																show: false,
																position: 'center'
															},
															emphasis: {
																show: false,
																textStyle: {
																	fontSize: '30',
																	fontWeight: 'bold'
																}
															}
														},
														labelLine: {
															normal: {
																show: false
															}
														},
														data: obj.data
													}
												]
											}
											objDom.setOption(option)
									} else if(obj.type == '1') {
										// 折线图
										echarts.init(document.getElementById(obj.id))
									}
								}
							})
				})
			},
			jumperPage () {
				// 跳转到个人信息页面
				this.$router.push('/counsellor/personal')
			},
			handleOpen (key, keyPath) {
				console.log(keyPath)
			},
			handleClose (key, keyPath) {
				console.log(key)
			},
			handleSelect (key,keyPath){
				var url = ''
				if (key.indexOf("j_spring_security_check") >= 0) {
					url = key + getToken();
		            window.open(url);
		        } else {
					this.$router.push(key);
					localStorage.setItem("curUrl",key);
		        }
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
			this.$nextTick(function () {
				let curUrl = localStorage.getItem('curUrl') 
				if(curUrl !== null) {
					this.curIndex = curUrl
				} else {
					this.curIndex = ''
				}
				this.setEchart()
				let that = this
				// this.timer = window.setInterval(function (){
				// 	that.scroll()
				// },500)
				this.getUserMsg()
				// }
				// 获取当前用户的消息
				this.getMsg()
				this.findXlExist();	//校历初始化
			}) 
			
			
		},
		watch:{
			state2:function(news,old){
				this.sel_list=[];
				let arr=this.getCascader(news,this.list).map(function(item,index){
					return item[0]
				})
				this.sel_list = Array.from(new Set(arr))
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
		top:84px;
		overflow: hidden;
		.con_left{
			width:220px;
			height:100%;
			background:#3b4966;
			float:left;
			border-top-left-radius:5px;
			border-top-right-radius:5px;
			display:flex;
			flex-direction:column;
		}
		.con_right{
			width:965px;
			float:right;
			display:flex;
			flex-direction:column;
			.con_right_top{
				height:425px;
				margin-bottom:12px;
				display:flex;
			}
			.con_right_bottom{
				background:#fff;
				box-shadow: 0 2px 5px #cdd2da;
			}
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
		height:166px;
		border-radius:2px;
		text-align:center;
		border-bottom:2px solid #fff;
		.color_bg{
			text-align:center;
			color:#fff;
			font-size:16px;
		}
		.role_box{
			color:#fff;
			font-size:16px;
			position:relative;
			width: 60%;
			margin: 10px auto;
			padding: 3px 0;
				.trangle{
					position: absolute;
					right:0;
					top:50%;
					width:0;
					height:0;
					border: 5px solid transparent;
					border-top-color:#fff;
					transform:rotate(0deg)
				}
		}
		.imgPhoto{
			display:inline-block;
			width:80px;
			height:80px;
			overflow:hidden;
			margin-top:14px;
			border-radius: 50%;
			img{
				width:100%;
				height:100%;
			}
		}
		.roleName{
			position: absolute;
			width:90px;
			height:120px;
			top:24px;
			left:50%;
			margin-left:-45px;
			overflow:auto;
			background:#fff;
			border-radius:5px;
			z-index:99;
			.roleItem{
				font-size:14px;
				cursor:pointer;
				height:24px;
				color:#333;
				line-height:26px;
				padding:3px;
				a{
					display:inline-block;
					height:100%;
					width:100%;
					color:#333;
					font-size:14px;
					
				}
				a:hover{
					background:#4f5a70;
					color:#fff;
					height:100%;
					width:100%;
					font-size:14px;
			    }
				
			}
			
		}
		.indexMore{
			height:30px;
			line-height:30px;
		    border-top: 1px solid #d6eaff;
			.arrow{
				display:inline-block;
				width:11px;
				height:11px;
				background:url(../../assets/img/connet/indexArrow.png) no-repeat;
				cursor:pointer;
			}
			.arrowHidden{
				display:inline-block;
				width:11px;
				height:11px;
				background:url(../../assets/img/connet/indexArrow.png) no-repeat;
				transform:rotate(180deg);
				-ms-transform:rotate(180deg); /* Internet Explorer */
				-moz-transform:rotate(180deg); /* Firefox */
				-webkit-transform:rotate(180deg); /* Safari 和 Chrome */			
			}
		}
	}
	.menuBox{
		flex:1;
		overflow:auto;
		.el-menu{
			border-right:none;
	    }
	}
	.con_right_top_left{
		width:526px;
		height:100%;
		background:#fff;
		padding:0 0 39px;
		box-sizing:border-box;
		border-radius:5px;
		margin-right:16px;
		box-shadow: 0 2px 5px #cdd2da;
		.noteBox{
			background:#208af5;
			color:#fff;
			padding: 0 20px;
			position:relative;
			height:64px;
			line-height:64px;
			border-top-left-radius:5px;
			border-top-right-radius:5px;
			.noteTitle{
				color:#fff;
				font-size:18px;
				padding-left:26px;
				background:url(../../assets/img/connet/indexNote.png) no-repeat left center;
				background-size:21px 23px;
			}
			.moreNote{
				position:absolute;
				right:0;
				bottom:0;
				padding-right:12px;
				display:inline-block;
				color:#fff;
				font-size:14px;
			}
		}
		.noteList{
			height:auto;
			overflow:hidden;
			padding: 20px 20px 0;
			.noteItem{
				margin-bottom:25px;
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
	.con_right_top_right{
		width:424px;
		height:100%;
		box-shadow: 0 2px 5px #cdd2da;
		border-radius:5px;
	}
	.con_right_title{
		height:68px;
		line-height:68px;
		color:#333;
		font-size:18px;
		border-bottom:1px solid #e8e8e8;
		padding-left:24px;
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
			width:25%;
			border-right: 1px solid #d5d9e6;
		    box-sizing:border-box;
		    display:flex;
		    align-items:center;
		    &:last-child{
		    	border-right:none;
		    }
			.applyTipImg{
				display:inline-block;
				width:30%;
				height:47px;
				background:url(../../assets/img/connet/indexLeave.png) no-repeat center center;
				margin-left:10px;
			}
			.applyTipImgOther{
				display:inline-block;
				width:30%;
				height:47px;
				background:url(../../assets/img/connet/indexJia.png) no-repeat center center;
				margin-left:10px;
			}
			.applyTipList{
				display:inline-block;
				width:70%;
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
					width:90%;
					overflow:hidden;
					white-space: nowrap;
				    text-overflow: ellipsis;
				}
			}
		}
	}
	.dataStatis{
		background:#fff;
		display:flex;
		box-sizing:border-box;
	}
	.dataStatisItem{
		flex:1;
		text-align:center;
	}
	.cursor{
		cursor:pointer;
	}
	a.acitve{
		color:#fff;
		display:block;
		height:25px;
		padding:4px 0;
		background:#208af5;
		border-radius:5px;
		line-height:25px;
	}
	a.default{
		display:block;
		padding:4px 0;
		height:25px;
		line-height:25px;		
	}
// /*滚动条样式*/
.roleName::-webkit-scrollbar {/*滚动条整体样式*/
    width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
}
.roleName::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.roleName::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
.menuBox::-webkit-scrollbar {/*滚动条整体样式*/
    width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
}
.menuBox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.menuBox::-webkit-scrollbar-track {/*滚动条里面轨道*/
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
<style lang="scss">
  .menuBox{
	.el-submenu__title i{
		color: #fff;
	}
  }
  .container .navtop .el-input__inner {
    background-color: #3b4966;
    border-radius: 0; 
    border:none;
    color: #fff;
  }
  .el-select-dropdown__wraps_mokuai {
	max-height:150px;
  }
</style>