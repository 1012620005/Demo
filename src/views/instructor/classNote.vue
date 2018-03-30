<template>
	<div class="container">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title">班级通知</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn" @click="returnBtn">返回</span>
				</div>
			</div> -->
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				 <el-form :inline="true" :model="formInline" class="demo-form-inline">
				 	  <div  class="btnS" @click="absence"><span class="btn qingjia"></span>添加通知</div>
                     <div  class="fontColor label_padding">校区:</div>
				 	 <el-select clearable  @change="loadOrgByTeaM(tableData.ssid, '', '')" v-model="tableData.ssid" placeholder="校区" style="width:100px;">
                        <el-option v-for="(t,index) in searchForm.s" :label="t.name" :value="t.id" :key="index"></el-option>
                    </el-select>
                    <div  class="fontColor label_padding">院系:</div>
				 	 <el-select clearable  @change="loadOrgByTeaM('', tableData.deptid, '')" v-model="tableData.deptid" placeholder="院系" style="width:100px;">
                       <el-option v-for="(t,index) in searchForm.dept" :label="t.name" :value="t.id" :key="index"></el-option>
                    </el-select>                  
                    <div  class="fontColor label_padding">专业:</div>
				 	 <el-select clearable  v-model="tableData.proid" placeholder="选择专业" style="width:120px;" @change="findMyMsg">
                        <el-option v-for="(t,index) in searchForm.pro" :label="t.name" :value="t.id" :key="index"></el-option>
                    </el-select> 
					<el-date-picker
							      v-model="tableData.starttime"
							      type="date"
								  format="yyyy-MM-dd"
								  change
							      placeholder="开始时间" class="label_time" style="width:150px">
					</el-date-picker>
					<el-date-picker
							      v-model="tableData.endtime"
							      type="date"
								  format="yyyy-MM-dd"
							      placeholder="结束时间" class="label_time" style="width:150px">
					</el-date-picker>                    
                    <!-- <el-button type="primary" @click="findMyMsg" class="label_padding" >查询</el-button> -->
                    <el-input placeholder="请输入关键字" @blur="findMyMsg"  v-model="formInline.keyword" class="label_time">
						<i slot="suffix" class="el-input__icon el-icon-search"></i>
					</el-input>  
				 </el-form>	
				 <el-table
                 	fit
				    :data="tableData.list"
				    style="margin: 0 16px 0 24px;width:1160px;">
				    <el-table-column
				      type="index"
				      label="序号"
				       width="80">
				    </el-table-column>
				    <el-table-column
				      prop="sname"
				      label="校区" width="150">
					  <template slot-scope="scope">
						   <span class="textCal">{{ scope.row.sname }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      prop="deptname"
				      label="院系"  width="150">
					   <template slot-scope="scope">
						   <span class="textCal">{{ scope.row.deptname }}</span>
					   </template>
				    </el-table-column>				    
				    <el-table-column
				      prop="proname"
				      label="专业"  width="150">
					  <template slot-scope="scope">
						   <span class="textCal">{{ scope.row.proname }}</span>
					   </template>
				    </el-table-column>			    
				    <el-table-column
				      prop="title"
				      label="标题" width="150" >
					  <template slot-scope="scope">
						   <span class="textCal">{{ scope.row.title }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      prop="content"
				      label="内容">
					  <template slot-scope="scope">
						   <span class="textCal">{{ scope.row.content }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      prop="createDate"
				      label="通知时间" width="200">
					    <template slot-scope="scope">
						   <span class="textCal">{{ scope.row.createDate }}</span>
					   </template>
				    </el-table-column>				     
				    <el-table-column
				      label="操作"  min-width="180">
				       <template slot-scope="scope">
				            <!-- <span class="imgScript seeBtn" @click="seeDetial(scope.row)"></span>  -->
							<el-button size="mini" @click="seeDetial(scope.row)">查看</el-button>
							<el-button size="mini"  type="danger" @click="deleteDialog(scope.row)">删除</el-button>
				            <!-- <span class="btns editor" @click="editorDialog(scope.row)"></span> -->
				           	<!-- <span class="btns delete" @click="deleteDialog(scope.row)"></span>        	           				            -->
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
	import editorClassNote from './editorClassNote.vue'
	import seeClassNote from './seeClassNote.vue'
	import util from '../../common/js/util.js'
	import apis from '../../apis/classNote.js'
	import userApi from '../../apis/userCenter.js'
	export default {
		data () {
			return {
				title:'班级通知',
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
					s:[],
					dept:[],
					pro:[],
					clazz:[],
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
				searchForm: {
					dept:[],
					pro:[],
					s:[],
				}	
			}
		},
		components:{
			fcHeader,
			editorClassNote,
			seeClassNote,
			returnBar
		},
		mounted () {
			this.findMyMsg();	//消息列表
			this.loadOrgByTeaM();
		},
		methods:{
			getMsg(msgid){
				let params = {msgid:msgid};
				userApi.getMsg(params).then(r=>{
					let msg = r.data.data;
					this.seeForm.campus = msg.sname;
					this.seeForm.campusDepart = msg.deptname;
					this.seeForm.campusPrefess = msg.proname;
					this.seeForm.noteTitle = msg.title;
					this.seeForm.noteContent = msg.content;
					this.seeForm.noteClass = msg.minList;
					this.seeForm.seeClassNote = true;
				});
			},
			loadOrgByTeaM(sid, deptid, proid) {	//加载班级机构信息
				let params = {sid:sid, deptid:deptid, proid:proid};
				userApi.loadOrgByTea(params).then(r=>{
					let map = r.data.data;
					if (sid) {
						if (map && map.dept) {
							this.searchForm.dept = map.dept;
							this.findMyMsg()
						} else {
							this.searchForm.dept = [];
						}
					} else if (deptid) {
						if (map && map.pro) {
							this.searchForm.pro = map.pro;
							this.findMyMsg()
						} else {
							this.searchForm.pro = [];
						}
					} else {
						if (map && map.s) {
							this.searchForm.s = map.s;
							this.findMyMsg()
						} else {
							this.searchForm.s = [];
						}
					}
				});
			},
			findMyMsg(){
				let params = {type:'1',pageNo:this.tableData.pageNo, pageSize:this.tableData.pageSize, count:this.tableData.count,
					ssid:this.tableData.ssid, deptid:this.tableData.deptid, proid:this.tableData.proid,starttime:util.formatDate.format(this.tableData.starttime, 'yyyy-MM-dd')
					,endtime:util.formatDate.format(this.tableData.endtime, 'yyyy-MM-dd')
					};
				console.log(params);
				userApi.findMyMsg(params).then(r=>{
					console.log(r.data.data);
					let page = r.data.data;
					this.tableData.list = page.list;
					// this.tableData.pageNo = page.pageNo;
					// this.tableData.pageSize = page.pageSize;
					this.tableData.count = page.count;
				});
			},
			onSubmit () {},
			absence () {
				this.form.dialogFormVisible = true
				this.form.title = '新增通知'
			},
			seeDetial (obj) {
				this.getMsg(obj.id);
			},
			deleteDialog(obj){
				this.$confirm('你确认删除吗？').then(()=>{
					let f = new FormData()
					f.append("msgid", obj.id);
					userApi.deleteMsg(f).then(r=>{
						userApi.showMsg(r.data.meta);
						if (r.data.meta.status == 'success') {
							this.findMyMsg();
						}
					});
				}).catch(()=>{

				})
				
			},
			handleSizeChange () {},
			handleCurrentChange (val) {
				this.tableData.pageNo = val;
				this.findMyMsg();
			},
			resetForm () {
				this.form.dialogFormVisible = false
				this.form.title = '';
				this.form.id = '';
				this.form.campus = '';
				this.form.campusDepart = '';
				this.form.campusPrefess = '';
				this.form.noteClass = [];
				this.form.noteTitle = '';
				this.form.noteContent = '';
				this.form.s = [];
				this.form.dept = [];
				this.form.pro = [];
				this.form.clazz = [];
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
			},
			getList() {
				var data = {
					type:1
				};
				var _this = this
				apis.getClassNoteList (data).then(response =>{
					if(response.data.meta.code == 200) {
						_this.tableData = response.data.data.list
					}
				})
			},
			returnBtn () {
				this.$router.push('/counsellorIndex')
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