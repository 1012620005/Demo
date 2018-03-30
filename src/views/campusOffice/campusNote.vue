<template>
	<div class="container">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title">校园通知</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn" @click="router">返回</span>
				</div>
			</div> -->
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				 <el-form :inline="true" :model="formInline" class="demo-form-inline">
				 	<div  class="btnS" @click="absence"><span class="btn qingjia"></span>添加通知</div>
                    <div  class="fontColor label_padding">校区:</div>
				 	<el-select v-model="tableData.ssid" placeholder="校区" clearable @change="findMyMsg">
						<el-option v-for="(t,index) in tableData.s" :label="t.name" :value="t.id" :key="index">{{t.name}}</el-option>
                    </el-select>
                    <div  class="fontColor label_padding">通知成员:</div>
				 	<el-select v-model="tableData.ut" placeholder="通知成员" clearable @change="findMyMsg">
						<el-option v-for="(t,index) in tableData.members" :label="t.label" :value="t.value" :key="index">{{t.label}}</el-option>
                    </el-select> 
					<el-date-picker
							      v-model="tableData.starttime"
							      type="date"
							      placeholder="开始时间" class="label_time" style="width:150px" @change="findMyMsg">
					</el-date-picker>
					<el-date-picker
							      v-model="tableData.endtime"
							      type="date"
							      placeholder="结束时间" class="label_time" style="width:150px" @change="findMyMsg">
					</el-date-picker>                    
                    <!-- <el-button type="primary" @click="findMyMsg" class="label_padding" >查询</el-button> -->
				 </el-form>	
				 <el-table
                 	fit
				    :data="tableData.list"
				    style="margin: 0 16px 0 24px;width:1160px;">
				    <el-table-column
				      type="index"
					  label="序号"
				       width="100">
				    </el-table-column>
				    <el-table-column
				      prop="sname"
				      label="校区" width="250">
				    </el-table-column>	    
				    <el-table-column
				      prop="title"
				      label="标题" width="150"show-overflow-tooltip >
				    </el-table-column>
				    <el-table-column
				      prop="content"
				      label="内容" width="250">
					  <template slot-scope="props">
						   <span class="textCal">{{ props.row.content }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      prop="createDate"
				      label="通知时间" width="200" show-overflow-tooltip>
				    </el-table-column>				     
				    <el-table-column
				      label="操作"  min-width="180">
				       <template slot-scope="props">
				            <span class="imgScript seeBtn" @click="seeDetial(props.row)"></span> 
				           	<span class="btns delete" @click="deleteDialog(props.row)"></span>        	           				           
				      </template>
				    </el-table-column>				    			    			    
				  </el-table>	
                <div class="con_left_tab_con_page">
                	<el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page.sync="tableData.pageNo"
					      :page-size="tableData.pageSize"
					      layout="prev, pager, next, jumper"
					      :total="tableData.count">
    				</el-pagination>
                </div>				  				 				
			</div>		
		</div>
		<editor-class-note :form="form" @closeForm="resetForm" @submitForm="resetForm"></editor-class-note>
		<see-class-note :form ="seeForm" @closeForm="resetSeeForm"></see-class-note>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import editorClassNote from './editorCampusNote.vue'
	import seeClassNote from './seeCampusNote.vue'
	import dictApi from '../../apis/dict.js'
	import userApi from '../../apis/userCenter.js'
	import util from '../../common/js/util.js'
	export default {
		data () {
			return {
				formInline:{
					keyword: ''
				},
				currentPage: 1,
				size: 10,
				tableData:{
					list:[],
					deptid:'',
					ssid:'',
					proid:'',
					pageNo:1,
					pageSize:10,
					count:0,
					starttime:null,
					endtime:null,
					members:[],
					s:[],
					ut:'',
				},
				form:{
					title: '',
					dialogFormVisible: false,
					id: '',
					campus: '',
					campusDepart: '',
					campusPrefess: '',
					noteClass:[],
					noteTitle: '',
					noteContent: '',
					members:[],
					campuses:[],
				},
				seeForm:{
					id: '',
					campus: '',
					campusDepart: '',
					campusPrefess: '',
					noteClass: [],
					noteTitle: '',
					noteContent: '',
					seeClassNote: false
				},
				title:'校园通知'			
			}
		},
		components:{
			fcHeader,
			editorClassNote,
			seeClassNote,
			returnBar
		},
		mounted () {
			let params = {type:'msg_ut'};
			dictApi.apiGetDictMapList(params).then(r=>{
				this.form.members = r.data.data;
				this.tableData.members = r.data.data;
			});
			let params1 = {id:'1', type:'4'};
			userApi.findOffice(params1).then(r=>{
				this.form.campuses = r.data.data;
				this.tableData.s = r.data.data;
			});
			this.findMyMsg();
		},
		methods:{
			router(url){
				this.$router.push("/counsellorIndex")
			},
			getMsg(msgid){
				let params = {msgid:msgid};
				userApi.getMsg(params).then(r=>{
					let msg = r.data.data;
					this.seeForm.campus = msg.sname;
					this.seeForm.campusDepart = msg.utname;
					this.seeForm.campusPrefess = msg.proname;
					this.seeForm.noteTitle = msg.title;
					this.seeForm.noteContent = msg.content;
					// this.seeForm.noteClass = msg.minList;
					this.seeForm.seeClassNote = true;
				});
			},
			absence () {
				this.form.dialogFormVisible = true
				this.form.title = '新增通知'
			},
			findMyMsg(){
				let params = {type:'2',pageNo:this.tableData.pageNo, pageSize:this.tableData.pageSize, count:this.tableData.count,
					ssid:this.tableData.ssid, deptid:this.tableData.deptid, proid:this.tableData.proid,starttime:util.formatDate.format(this.tableData.starttime, 'yyyy-MM-dd')
					,endtime:util.formatDate.format(this.tableData.endtime, 'yyyy-MM-dd')
					};
				console.log(params);
				userApi.findMyMsg(params).then(r=>{
					console.log(r.data.data);
					let page = r.data.data;
					this.tableData.list = page.list;
					this.tableData.pageNo = page.pageNo;
					// this.tableData.pageSize = page.pageSize;
					this.tableData.count = page.count;
				});
			},
			seeDetial (obj) {
				this.seeForm.seeClassNote = true
				this.getMsg(obj.id);
			},
			deleteDialog(obj){
				let f = new FormData()
				f.append("msgid", obj.id);
				userApi.deleteMsg(f).then(r=>{
					userApi.showMsg(r.data.meta);
					if (r.data.meta.status == 'success') {
						this.findMyMsg();
					}
				});
			},
			handleSizeChange () {},
			handleCurrentChange (val) {
				this.tableData.pageNo = val;
				this.findMyMsg();
			},
			resetForm () {
				this.form.dialogFormVisible = false
				this.form.title = ''
				this.form.id = ''
				this.form.campus = ''
				this.form.campusDepart = ''
				this.form.campusPrefess = ''
				this.form.noteClass = []
				this.form.noteTitle = ''
				this.form.noteContent = ''
				this.findMyMsg();
			},
			resetSeeForm () {
				this.seeForm.id = ''
				this.seeForm.campus = ''
				this.seeForm.campusDepart = ''
				this.seeForm.campusPrefess = ''
				this.seeForm.noteClass = []
				this.seeForm.noteTitle = ''
				this.seeForm.noteContent = ''
				this.seeForm.seeClassNote = false			
			}
		}	

	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../common/css/common.scss';
    .textCal{
		display:inline-block;
		width:150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}
</style>