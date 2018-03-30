<template>
	<div>
		
		
			<div>
				 <el-form :inline="true" :model="formInline" class="demo-form-inline">
				 	<div  class="btnS" @click="add"><span class="btn qingjia"></span>添加</div>
					<!-- <div  class="fontColor label_padding">校区:</div>
				 	<el-select v-model="formInline.ssid" placeholder="校区" clearable style="width:100px;" @change="findDepart">
						<el-option v-for="(t,index) in tableData.s" :label="t.name" :value="t.id" :key="index">{{t.name}}</el-option>
					</el-select>
					<div  class="fontColor label_padding">院系:</div>
				 	<el-select v-model="formInline.depart" placeholder="院系" clearable style="width:100px;"@change="findMajor" >
						<el-option v-for="(t,index) in tableData.depart" :label="t.name" :value="t.id" :key="index">{{t.name}}</el-option>
					</el-select>
					<div  class="fontColor label_padding">专业:</div>
				 	<el-select v-model="formInline.marjor" placeholder="专业" clearable style="width:100px;" @change="findXl">
						<el-option v-for="(t,index) in tableData.marjor" :label="t.label" :value="t.value" :key="index">{{t.label}}</el-option>
					</el-select>   -->
					<!-- <el-date-picker
							      v-model="tableData.starttime"
							      type="date"
								  format="yyyy-MM-dd"
								  change
							      placeholder="开始时间" class="label_time" style="width:150px" >
					</el-date-picker>
					<el-date-picker
							      v-model="tableData.endtime"
							      type="date"
								  format="yyyy-MM-dd"
							      placeholder="结束时间" class="label_time" style="width:150px">
					</el-date-picker>  -->
				 </el-form>	
                <el-table
                 	fit
				    :data="page.list"
				    style="margin: 0 16px 0 24px;width:1160px;">
				    <el-table-column
				      type="index"
				      label="序号"
				       width="232">
				    </el-table-column>
				    <!-- <el-table-column
				      prop="sname"
				      label="校区"  width="150">
					  	<template slot-scope="props">
						   <span class="textCal">{{ props.row.sname }}</span>
					   </template>
				    </el-table-column>-->
				    <!-- <el-table-column
				      prop="deptname"
				      label="院系"  width="150">
					  	<template slot-scope="props">
						   <span class="textCal">{{ props.row.deptname }}</span>
					   </template>
				    </el-table-column>				     -->
				    <!-- <el-table-column
				      prop="proname"
				      label="专业"  width="150">
						<template slot-scope="props">
							<span class="textCal">{{ props.row.proname }}</span>
						</template>
				    </el-table-column> -->
						 <el-table-column
				      prop="eventdate"
				      label="活动名称"  width="232">
						<template slot-scope="props">
							<span class="textCal">{{ props.row.eventdate }}</span>
						</template>					  
				    </el-table-column>			    
				    <el-table-column
				      label="是否排课" width="232" >
					   <template slot-scope="props">
						   <span class="textCal">{{ props.row.content }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      prop="createDate"
				      label="提交时间" width="232">
					  	<template slot-scope="props">
						   <span class="textCal">{{ props.row.createDate }}</span>
					   </template>
				    </el-table-column>				     
				    <el-table-column
				      label="操作"width="232">
				       <template slot-scope="props">
				            <!-- <span class="imgScript seeBtn" @click="seeDetial(props.row)"></span> 
				           	<span class="btns delete" @click="deleteDetial(props.row)"></span>  -->
							<el-button size="mini" class="formBox" type="primary" plain @click.stop.prevent="editorDialog(scope.row)">修改</el-button>
							<el-button size="mini" class="formBox" type="danger" plain @click.stop.prevent="deleteDetial(scope.row)">删除</el-button>  
				      </template>
				    </el-table-column>				    			    			    
				  </el-table>
					<div class="con_left_tab_con_page">
							<el-pagination
							@current-change="handleCurrentChange"
							:current-page.sync="page.pageNo"
							:page-size="page.pageSize"
							layout="prev, pager, next, jumper"
							:total="page.count">
							</el-pagination>
					</div>
			</div>	
	<!--编辑和新增校历-->
		<div class="imgBox">
			<el-dialog title="校历管理" :visible.sync="form.seeXiaoli" class="dialogImg"  @close="closeForm('calenderForm')">
				<div class="calender_wrapper">
					<div class="calender_left">
						 <!--头部-->
						  <div class="full-calendar-header full-calendar-manage">
						    <div class="header-left">
						    </div>
						    <div class="header-center">
						    </div>
						    <div class="header-right">
						      <span class="prev-month prev" @click.stop="goPrev"></span>
						      <span class="title title_editor">{{form.title}}</span>
						      <span class="prev-month next" @click.stop="goNext"></span>
						    </div>
						  </div>
						  <!--body-->
						  <div class="full-calendar-center">
							  <div class="full-calendar-body">
							    <div class="weeks">
							      <span class="week" v-for="week in weekNames">{{week}}</span>
							    </div>
							    <div class="dates" ref="dates">
							      <div class="dates-bg">
							        <div class="week-row" v-for="week in currentDates">
							          <div class="day-cell" v-for="day in week"
							            :class="{'today' : day.isToday,
							              'not-cur-month' : !day.isCurMonth,'curClick': day.date == curDay}" @click="dayClick(day.date,day.monthDay, $event)">
							            <p class="day-number">{{day.monthDay}}</p>
							          </div>
							        </div>
							      </div>
							      <!-- absolute so we can make dynamic td -->
							       <!-- <div class="dates-events">
							        <div class="events-week" v-for="week in currentDates">
							          <div class="events-day" v-for="day in week" track-by="$index"
							            :class="{'today' : day.isToday,
							              'not-cur-month' : !day.isCurMonth,'curClick': day.date == curDay}" @click="dayClick(day.date,day.monthDay, $event)">
							            <p class="day-number">{{day.monthDay}}</p> 
							            <div class="event-box">
							              <p class="event-items" v-for="event in day.events"
							                 :class="[classNames(event.cssClass), {
							                  'is-start'   : isStart(event.start, day.date),
							                  'is-end'     : isEnd(event.end,day.date),
							                  'is-opacity' : !event.isShow,
							                  'today'      : day.isToday
							                  }]">
							                {{ day.monthDay }}
							                <span class="events-text">{{ isBegin(event, day.date, day.weekDay) }}</span>
							              </p>
							            </div> 
							          </div>
							        </div>
							      </div> -->
							      <slot name="body-card">

							      </slot>
							    </div>
							  </div>						  	  
						  </div> 			
					</div>
					<div class="calender_right">
						<el-form ref="calenderForm" :model="calenderForm" label-width="60px" :rules="calenderFormRule">
							<el-form-item label="校区:" prop="campus">
							    <el-select v-model="calenderForm.sid" @change="findOffice(calenderForm.sid,'2')" placeholder="请选择校区">
							      <el-option v-for="(t,index) in calenderForm.slist" :label="t.name" :value="t.id" :key="index">{{t.name}}</el-option>
							    </el-select>
						    </el-form-item>
						    <el-form-item label="院系:" prop="departMan">
							    <el-select v-model="calenderForm.deptid" @change="findOffice(calenderForm.deptid,'3')" placeholder="请选择院系">
							      <el-option v-for="(t,index) in calenderForm.deptlist" :label="t.name" :value="t.id" :key="index">{{t.name}}</el-option>
							    </el-select>
		 					</el-form-item>
							<el-form-item label="专业:" prop="prefor">
							    <el-select v-model="calenderForm.proid" placeholder="请选择专业">
							      <el-option v-for="(t,index) in calenderForm.prolist" :label="t.name" :value="t.id" :key="index">{{t.name}}</el-option>
							    </el-select>
							</el-form-item> 
							<el-form-item label="编辑校历事件:" class="label_form_position" prop="content">
							     <el-input type="textarea" v-model="calenderForm.content" :rows="10" resize="none"  :disabled="flag"></el-input>
							</el-form-item>
						</el-form>
					</div>			
				</div>
				<div slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="submitForm('calenderForm')">提 交</el-button>
		        </div>
			</el-dialog>
		</div>
		<div>
				<el-dialog title="查看" :visible.sync="dialogsee" class="dialogImg">
					<el-form :model="seeForm">
						<el-form-item label="校区:" >
							{{seeForm.sname}}
						</el-form-item>
						<el-form-item label="院系:" >
							{{seeForm.deptname}}
						</el-form-item>
						<el-form-item label="专业:" >
							{{seeForm.proname}}
						</el-form-item>
						<el-form-item label="时间:" >
							{{seeForm.eventdate}}
						</el-form-item>
						<el-form-item label="事件:" >
							{{seeForm.content}}
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogsee = false">取 消</el-button>
						<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
					</div>
				</el-dialog>
			</div>
    </div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import dateFunc from '../common/xiaoliCom/dateFunc'
	import langSet from '../common/xiaoliCom/langSet'
	import userApi from '../../apis/userCenter.js'
	import util from '../../common/js/util.js'
	export default {
		data () {
			return {
				formInline:{
					ssid: '',
					depart: '',
					marjor:''
				},
				tableData:{
					list:[
						{
							id:1,
							sname: '东校区',
							snian: '2017-10',
							deptname: '桂东'
						}
					],
					s:[],
					depart:[],
					marjor:[],
					starttime:'',
					endtime:''
				},
				form:{
					seeXiaoli: false,
					title: '',
					headDate : new Date(),
					currentDate:new Date(),
					titleFormat:'yyyy年MM月',
					firstDay:0,
					monthNames:{},
					events:[{
						title:'event1',
			            start:'2017-10-24',
			            end:'2017-10-24'}]
				},
				calenderFormRule:{
					sid:[
						{required:true,message:'请选择校区',trigger:'change',type:'string'}
					],
					// dep:[
					// 	{required:true,message:'请选择院系',trigger:'change',type:'string'}
					// ],
					// prefor:[
					// 	{required:true,message:'请选择专业',trigger:'change',type:'string'}
					// ],
					content:[
						{required:true,message:'请填写校历的事件',trigger:'change',type:'string'}
					]															
				},
				calenderForm:{
					sid: '',
					slist:[],
					deptid: '',
					deptlist: [],
					proid: '',
					prolist: [],
					content: '',
					eventdate: '',
					date: [],
				},
				weekNames:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
				flag: true,
				curDay: 0,
				page: {
					list:[],
					pageNo:1,
					pageSize:10,
					count:0,
				},
				dialogsee:false,
				seeForm:{
					sname:'',
					deptname:'',
					proname:'',
					eventdate:'',
					content:'',
				},
				title:'校历管理'
			}
		},
		components:{
			fcHeader,
			returnBar
		},
		mounted () {
			this.dispatchEvent()
			this.findXl();
			this.findXlExist();
			this.findCampus();
		},
		methods:{
			add(){	//添加校历
				this.form.seeXiaoli = true;
				this.findOffice("1", "4");
			},
			findXl () {
				let params = {pageNo:this.page.pageNo,pageSize:this.page.pageSize,sid:this.formInline.ssid,deptid:this.formInline.depart,proid:this.formInline.marjor};
				userApi.findXl(params).then(r=>{
					if (r && r.data.data) {
						let page = r.data.data;
						console.log();
						this.page.pageNo = page.pageNo;
						this.page.count = page.count;
						this.page.list = page.list;
					}
				});
			},
			handleCurrentChange(val){
				this.page.pageNo = val;
				this.findXl();
			},
			findOffice(id, type) {	//加载机构
				let params = {id:id, type:type};
				userApi.findOffice(params).then(r=>{
					let list = r.data.data;
					if (type == '4') {
						this.calenderForm.slist = list;
						this.calenderForm.sid = '';
						this.calenderForm.proid = '';
						this.calenderForm.deptid = '';
						this.calenderForm.proid = '';
						this.calenderForm.deptlist = [];
						this.calenderForm.prolist = [];
					} else if (type == '2') {
						this.calenderForm.deptlist = list;
						this.calenderForm.prolist = [];
						this.calenderForm.deptid = '';
						this.calenderForm.proid = '';
					} else if (type == '3') {
						this.calenderForm.prolist = list;
						this.calenderForm.proid = '';
					}
				});
			},
			absence () {
				this.form.seeXiaoli = true
			},
			seeDetial (row) {
				let params = {id:row.id};
				userApi.getXl(params).then(r=>{
					let xl = r.data.data;
					if (xl) {
						this.seeForm.sname = xl.sname;
						this.seeForm.deptname = xl.deptname;
						this.seeForm.proname=xl.proname;
						this.seeForm.eventdate=xl.eventdate;
						this.seeForm.content=xl.content;
					}
				});
				this.dialogsee = true;
			},
			editorDialog (row) {

			},
			deleteDetial(row) {
				this.$confirm('你确定删除吗？').then(()=>{
					let params = new FormData();
					params.append("id", row.id);
					userApi.deleteXl(params).then(r=>{
						let meta = r.data.meta;
						userApi.showMsg(meta);
						if (meta.status == 'success') {
							this.findXl();
						}
					});
				}).catch(()=>{

				})
				
			},
			closeForm (form) {
				this.$refs[form].resetFields();
			},
			findXlExist(date) {
				let params = {eventdate:date, type:'1'};
				userApi.findXlExist(params).then(r=>{
					let data = r.data.data;
					if (data && data.length > 0) {
						this.form.events = [];
						for (let i = 0; i < data.length; i ++) {
							let c = {title:'', start:data[i].eventdate, end:data[i].eventdate};
							this.form.events.push(c);
						}
					}
					// console.log(data);
					// console.log(this.form.events);
				});
			},
			goPrev () {
				this.form.headDate = this.changeMonth(this.form.headDate, -1)
				// console.log("prev")
				// console.log(this.form.headDate)
				this.dispatchEvent()
				this.findXlExist(util.formatDate.format(this.form.headDate));
			},
			goNext () {
				this.form.headDate = this.changeMonth(this.form.headDate, 1)
				// console.log("next")
				// console.log(this.form.headDate)
				this.dispatchEvent();
				this.findXlExist(util.formatDate.format(this.form.headDate));
			},
			changeMonth (date,num) {
		        let dt = new Date(date)
		        // console.log(date)
		        return new Date(dt.setMonth(dt.getMonth() + num))				
			},
			dispatchEvent () {
				this.form.title = dateFunc.format(this.form.headDate, this.form.titleFormat, this.form.monthNames)
				let startDate = dateFunc.getStartDate(this.form.headDate);
				let curWeekDay = startDate.getDay();
				// 1st day of this monthView
				let diff = parseInt(this.form.firstDay) - curWeekDay
				if (diff) diff -= 7	
				startDate.setDate(startDate.getDate() + diff)
				let endDate = dateFunc.changeDay(startDate, 41)
				let currentDate = dateFunc.getStartDate(this.form.headDate)
				this.form.currentDate = currentDate
			},
			getCalendar () {
				// 获取当前的时间
		        let now = new Date(); // today
		        let current = new Date(this.form.currentDate);
		        // 一个月的第一天
		        let startDate = dateFunc.getStartDate(current);
		        let curWeekDay = startDate.getDay();
				console.log(startDate + '-----------------');
		        // 上个月的补齐
                let diff = parseInt(this.form.firstDay) - curWeekDay
                console.log(diff)
                diff = diff > 0 ? (diff - 7) : diff
				startDate.setDate(startDate.getDate() + diff)
                let calendar = []
		        for(let perWeek = 0 ; perWeek < 6 ; perWeek++) {

		          let week = []
		          for(let perDay = 0 ; perDay < 7 ; perDay++) {
		            week.push({
		              monthDay : startDate.getDate(),
		              isToday : now.toDateString() == startDate.toDateString(),
		              isCurMonth : startDate.getMonth() == current.getMonth(),
		              weekDay : perDay,
		              date : new Date(startDate),
		              events : this.slotEvents(startDate)
		            })

		            startDate.setDate(startDate.getDate() + 1)
		            // if (startDate.toDateString() == endDate.toDateString()) {
		            //   isFinal = true
		            //   break
		            // }
		          }
		          calendar.push(week)
		          // if (isFinal) break
				} 
				console.log(calendar)
				console.log('calendar')               
		        return calendar
			},
			slotEvents (date) {
        		// find all events start from this date
		        let cellIndexArr = []
		        let thisDayEvents = this.form.events.filter(day => {
		          let dt = new Date(day.start)
		          let st = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())
		          let ed = day.end ? new Date(day.end) : st
		         // console.log('slotEvt', st, ed, date)
		         // console.log(date>=st && date<=ed)
		          return date>=st && date<=ed
		        })

		        // sort by duration
		        thisDayEvents.sort((a,b)=>{
		          if(!a.cellIndex) return 1
		          if (!b.cellIndex) return -1
		          return a.cellIndex - b.cellIndex
		        })

		        // mark cellIndex and place holder
		        for (let i = 0;i<thisDayEvents.length;i++) {
		          thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1)
		          thisDayEvents[i].isShow = true
		          if (thisDayEvents[i].cellIndex == i+1 || i>2) continue
		          thisDayEvents.splice(i,0,{
		            title : 'holder',
		            cellIndex : i+1,
		            start : dateFunc.format(date,'yyyy-MM-dd'),
		            end : dateFunc.format(date,'yyyy-MM-dd'),
		            isShow : false
		          })
		        }
		        return thisDayEvents				
			},
			submitForm (form) {
				this.$refs[form].validate((valid) => {
					if(valid) {
						let params = new FormData();
						params.append("content", this.calenderForm.content);
						params.append("eventdate", this.calenderForm.eventdate);
						params.append("sid", this.calenderForm.sid);
						params.append("deptid", this.calenderForm.deptid);
						params.append("proid", this.calenderForm.proid);
						params.append("type", '1');
						userApi.saveXl(params).then(r=>{
							let meta = r.data.meta;
							userApi.showMsg(meta);
							if (meta.status == 'success') {
								this.findXl();
								this.form.seeXiaoli = false;
							}
						});
					}
				})
			},
			classNames (cssClass) {
				if(!cssClass) return ''
				// string  
				if (typeof cssClass == 'string') return cssClass

				// Array
				if (Array.isArray(cssClass)) return cssClass.join(' ')
				
				// else
				return ''
			},
			isStart (eventDate, date) {
					let st = new Date(eventDate)
					return st.toDateString() == date.toDateString()
			},
			isEnd (eventDate,date) {
					let ed = new Date(eventDate)
					return ed.toDateString() == date.toDateString()
			},
			isBegin (event, date, index) {
					let st = new Date(event.start)

					if (index == 0 || st.toDateString() == date.toDateString()) {
						return event.title
					}
					return '　'
			},
			dayClick (date,day,event) {	
				let sd = util.formatDate.format(date, "yyyy-MM-dd");
				console.log(sd);
				this.calenderForm.eventdate = sd;
				// let params = {eventdate:sd};
				// userApi.getByDate(params).then(r=>{
				// 	let data = r.data.data;
				// 	this.calenderForm.content = data.content;
				// 	console.log(data);
				// });
				this.curDay = date
				var len = $(event.path[1]).find('div.event-box').children.length;
				var nowDate = new Date().getTime();
				var curTime = new Date(date).getTime();
				var dis = nowDate - curTime
				var hours = dis / (1000 * 60 * 60 * 24);
				if(hours > 1) {
					// this.$message({
					// 	type:'error',
					// 	message:'不能编辑今天以前的时间'
					// })
					// this.flag = true;
					// return false
				}
				if(len == 0) {
					// 新增
				} else{
					// 编辑
					var title = $(event.path[1]).find('span.events-text').text();
					this.calenderForm.content = title

				}

				this.flag = false

			},
			findCampus () {
				var data = {type: '4',id:'1'}
				var _this = this
				userApi.findOffice(data).then(res =>{
					if(res) {
						var data = res.data.data
						_this.tableData.s = data
					}
				})
			},
			findDepart (val) {
				var data = {type:'2',id: val}
				var _this = this
				userApi.findOffice(data).then(res =>{
					if(res) {
						var data = res.data.data
						_this.tableData.depart = data
						_this.findXl()
					}
				})
			},
			findMajor (val) {
				var data = {type:'3',id: val}
				var _this = this
				userApi.findOffice(data).then(res =>{
					if(res) {
						var data = res.data.data
						_this.tableData.marjor = data
						_this.findXl()
					}
				})
			}			
		},
		watch : {
	        currentDate (val) {
		        if (!val) return
		        this.calenderForm.headDate = val
		        console.log('currentDate', val)
		        // this.headDate = JSON.parse(JSON.stringify(val))
	        }
        },
        computed :{
		    currentDates () {
		        return this.getCalendar()
		    }        	
        },
        
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../common/css/common.scss';
	.calender_wrapper{
		display:flex;
	    .calender_left{
	    	.full-calendar-manage{
	    		height:36px;
	    		background:#fff;
				.prev-month{
					display:inline-block;
					width:0;
					height:0;
					border:5px solid transparent; 
				}
	    		.prev{
	    			border-right-color: #bfcbd9;
	    			cursor:pointer
	    		}
	    		.next{
	    			border-left-color: #bfcbd9;
	    			cursor:pointer
	    		}
	    		.title_editor{
	    			color:rgba(0,0,0,0.87)
	    		}
	    	}
	    	.full-calendar-center{
		    	width:542px;
		    	height:394px;
		    	border:1px solid #dfe6ec;
		    	border-bottom:none;
		    	.weeks{
		    		height:44px;
		    		display:flex;
		    		background:#eef1f6;
		    		.week{
		    			height:44px;
		    			line-height:44px;
		    			flex:1;
		    			border-right:1px solid #dfe6ec;
		    			&:last-child{
		    				border-right:none;
		    			}
		    		}
		    	}
		    	.week-row{
					display:flex;
		    		height:58px;
		    		border-bottom:1px solid #dfe6ec;
		    		.day-cell{
		    			width:77px;
		    			border-right:1px solid #dfe6ec;
		    			height:56px;
		    			text-align:center;
		    			line-height:56px;
		    			&:last-child{
		    				border-right:none;
		    			}
		    		}
		    	}
		    	.events-week{
		    		height:58px;
		    		.events-day{
		    			width:77px;
		    			height:56px;
		    			text-align:center;
		    			line-height:56px;
		    		}
		    		.curClick{
		    			border:1px solid #ccc;
		    		}
		    		.event-items{
		    			width:60px;
		    			height:56px;
		    			background:#ffe17b;
		    			border-radius:5px;
		    			text-align:center;
		    			line-height:56px;
		    			margin:0 auto;
		    		}
		    	}    		
	    	}
	    }
	    .calender_right{
	    	width:250px;
	    	margin-left:20px;
	    }
	}
	.textCal{
		display:inline-block;
		width:150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}
</style>
<style type="text/css" lang="scss">
	.label_form_position {
		.el-form-item__label{
			width:100%!important;
			text-align:left;
		}
	}
</style>

