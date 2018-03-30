<template>
	<div class="container">
	   <fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title">申请请假</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn" @click="returnBtn" style="cursor:pointer">返回</span>
				</div>
			</div> -->
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				 <el-form :inline="true" :model="formInline" class="demo-form-inline">
				 	  <div  class="btnS" @click="absence" style="cursor:pointer"><span class="btn qingjia"></span>申请请假</div>
				 	  <div class="btnS xiaojiaBtn" @click="cancelDay" style="cursor:pointer"> <span class="btn xiaojia"></span>撤销请假</div>
                     <div  class="fontColor label_padding">审核状态:</div>
				 	 <el-select v-model="formInline.vacateStatus" placeholder="审核状态" clearable style="width:90px;" @change="changeStatus">
                              <el-option label="待审核" value= "1" ></el-option>
                              <el-option label="未通过" value="3"></el-option>
                              <el-option label="已撤销" value="5"></el-option>
                              <el-option label="已通过" value="2"></el-option>
                    </el-select>
				  	<span class="fontColor label_padding">选择时间</span>
					<el-date-picker
							      v-model="formInline.startTime"
							      type="date"
							      placeholder="选择开始日期时间" class="label_time" @change="changeStart">
					</el-date-picker>
					<el-date-picker
							      v-model="formInline.endTime"
							      type="date"
							      placeholder="选择结束日期时间" class="label_time" @change="changeEnd">
					</el-date-picker> 
				    <div class="export btnS" style="cursor:pointer">
				    	<span class="imgScript exporticon"></span>
				    	<span class="export_title fontColor paddingRight">导出</span>
				    	<span class="imgScript print "></span>
				    	<span class="export_title fontColor paddingRight">打印</span>
				    </div>               
				 </el-form>	
                 <el-table
                    ref="multipleTable"
                 	fit
				    :data="tableData"
				    style="margin: 0 16px 0 24px;width:1160px;" @selection-change="handleSelectionChange">
				     <el-table-column
				      type="selection"
				      width="55" :selectable="checkSelectable">
				    </el-table-column>
				    <el-table-column
				      type="index"
				      label="序号" width="80">
				    </el-table-column>
				    <el-table-column
				      prop="leaverName"
				      label="老师姓名" show-overflow-tooltip  width="130" >
				    </el-table-column>
				    <el-table-column
				      prop="majorName"
				      label="授课专业" show-overflow-tooltip  width="130">
				    </el-table-column>				    
				    <el-table-column
				      prop="className"
				      label="负责班级" show-overflow-tooltip  width="130">
				    </el-table-column>
				    <el-table-column
				      prop="startTime"
				      label="开始时间"   show-overflow-tooltip  width="130">
				    </el-table-column>				    
				    <el-table-column
				      prop="endTime"
				      label="结束时间" show-overflow-tooltip  width="130">
				    </el-table-column>
				    <el-table-column
				      prop="vacateDays"
				      label="请假天数" show-overflow-tooltip  width="130">
				    </el-table-column>					    
				    <el-table-column
				      prop="vacateReason"
				      label="请假事由" show-overflow-tooltip  width="130">
				    </el-table-column>	
				    <el-table-column
				      prop="vacateTeacher"
				      label="替课老师" show-overflow-tooltip  width="130">
				    </el-table-column>	
				    <el-table-column
				      prop="applyTime"
				      label="提交时间" show-overflow-tooltip  width="130">
				    </el-table-column>					    
				    <el-table-column
				      label="审批状态" min-width="260">
				       <template slot-scope="scope" >
				           	<div class="box">
					       	   <el-button type="text" @click="auditPage(scope.row)" style="cursor:pointer">审核详情</el-button>
					           <div v-if="scope.row.vacateStatus == 1">
					               <span class="imgScript shenhe"></span>
					           	   待审核 	   
					           </div>
					           <div v-else-if="scope.row.vacateStatus == 3">
					               <span class="imgScript nosussess"></span>
					           	   未通过
					           	   <span class="btns editor" @click="editorDialog(scope.row.id)" style="cursor:pointer"></span>
					           	   <span class="btns delete" @click="deleteDialog(scope.row.id)" style="cursor:pointer"></span>
					           </div>
					           <div v-else-if="scope.row.vacateStatus == 5">
					                <span class="imgScript chexiao"></span>
					           	   已撤销请假
					           </div>
					           <div v-else-if="scope.row.vacateStatus == 2">
					                <span class="imgScript success"></span>
					           	   已通过
					           </div>
					        </div>				           	           				           
				      </template>
				    </el-table-column>				    			    			    
				  </el-table>
				  <div class="con_left_tab_con_page">
	                	<el-pagination
						      @current-change="handleCurrentChange"
						      :current-page="formInline.currentPage"
						      :page-size="10"
						      layout="prev, pager, next, jumper"
						      :total="formInline.size">
	    				</el-pagination>
	               </div>				  	
				  <!--编辑和新增的对话框-->
				<editor-teLeave :form="form" @successDialog="resetForm" @closeDialog='resetForm'></editor-teLeave>
				<!--审核详情-->
		<el-dialog title="审核流程详情" :visible.sync="auditForm.dialogFormVisible" size="tiny" custom-class="dialogImg" label-position="right" @close="closeDialog">
					<div class="wrapper_dialog">
						<el-table
					      :data="auditForm.tableData"
					      style="width: 100%">
					      <el-table-column
					        prop="operatorName"
					        label="审核人员"
					        show-overflow-tooltip
					        >
					      </el-table-column>
					      <el-table-column
					        label="审核状态"
							prop="statusAfteroperate"
					       >
					      </el-table-column>
					      <el-table-column
					        prop="operatorTime"
					        label="审核时间" show-overflow-tooltip>
					      </el-table-column>
					    </el-table>	
					    <div class="xiaojia" v-show="auditForm.vacateStatus == '3'"></div>			
					</div>
				</el-dialog> 			
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import editorTeLeave  from './editorTeLeave'
	import { Loading } from 'element-ui'
	import util from '../../common/js/util.js'
	import apis from '../../apis/teLeave.js'
	export default {
		data () {
			return {
				formInline: {
					startTime: '',
					endTime: '',
					currentPage: 1,
					size: 1,
					vacateStatus: ''
				},
				tableData: [],
				form: {
					id: '',
					dialogTitle: '',
					startTime: '',
					endTime: '',
					vacateType: '',
					vacateDay: '',
					vacateReason: '',
					vacateFiles: '',
					vacateForClass: '',
					dialogFormVisible: false
				},
				multipleSelection:[],
				auditForm:{
					dialogFormVisible: false,
					tableData:[],
					vacateStatus: '',
					id:''
				},
				title:'申请请假'
			}
		},
		components:{
			fcHeader,
			editorTeLeave,
			returnBar
		},
		methods:{
			absence () {
				this.form.dialogFormVisible = true
				this.form.dialogTitle = '新增请假'
			},
			showOrNo (time) {
				var nowTime = new Date().getTime();
				var startTime = new Date(time).getTime() - 30*60*1000;
				if (nowTime <= startTime){
					return true
				} else{
					return false
				}
			},
			handleSelectionChange (value) {
				this.multipleSelection = value
			},
			checkSelectable (row,index) {
				var startTime = row.startTime
				var flag = this.showOrNo(startTime)
				var status = row.vacateStatus
				if(flag && status != '3'){
					return true
				} else {
					return false
				}
			},	
			onSubmit () {
			   this.getTeLeave(this.formInline.startTime,this.formInline.endTime)
			},
			editorDialog (id) {
				apis.editorSleave(id).then(response => {
					if(!response) {
						return false
					}
					var code = response.data.meta.code
					if (code == '200') {
						var meg = response.data.data.vacateInfo
						var files = response.data.data.attachments
				          var fileList = [];
							if (files.length != 0) {
					    	   for (var i = 0,len = files.length; i < len; i++) {
					    	   	    fileList.push({
					    	   	    	name: files[i].attachmentName,
					    	   	    	url: files[i].attachmentName,
					    	   	    	id: files[i].id
					    	   	    })
					    	   }
					    	}
						this.form.id = meg.id
				        this.form.startTime = new Date(meg.startTime)
				        this.form.endTime = new Date(meg.endTime)
				        this.form.vacateDays = meg.vacateDays
				        this.form.vacateType = meg.vacateType
				        this.form.vacateReason = meg.vacateReason
				        this.form.vacateFile = fileList
				        this.form.dialogFormVisible = true
				        this.form.subflowId  = meg.subflowId
				        this.form.dialogTitle = '编辑请假'
					} else {
						this.$message.error(response.data.meta.message)
					}
				})	
			},
			deleteDialog (id) {
				this.$confirm('你确定要删除吗？').then(() =>{
					this.$ajax({
						url: '',
						method: 'put',
						data: {
							id: id
						}
					}).then(response =>{
						if(!response) {
						    return false
					    }
						var code = response.meta.code
						if(code == '200') {
							this.$message({type: 'success',message: '删除成功'})
						} else {
							this.$message.error('网络错误')
						}
					})
				}).catch(() =>{

				})
			},
			resetForm () {
				this.form.dialogFormVisible = false
				this.form.id = ''
				this.form.startTime = ''
                this.form.endTime = ''
                this.form.vacateForClass = ''
				this.form.vacateReason = ''
                this.form.vacateType = ''
 				this.form.vacateFiles = ''
				this.form.vacateDay = '' 
				this.getTeLeave()              
			},
			cancelDay () {
				if(this.multipleSelection.length === 0) {
					  this.$message({
				          message: '请选择要销假的选项',
				          type: 'warning'
        			  })
					return false;
				} else {
					var arr = []
					for(let i = 0, len = this.multipleSelection.length; i < len; i++) {
						arr.push(this.multipleSelection[i].id)
					}
					apis.studentCancel({ids: arr.join(',')}).then(response => {
						if(!response) {
						   return false
					    }
		                var code = response.data.meta.code
		                if (code == '200') {
							this.$message({type:'success',message:'销假成功'})
							this.getTeLeave()
		                }
		            })	
				}
			},
			disabledDateFuc (curDate) {
				console.log(curDate)
			},
			changeStatus (val) {
				this.getTeLeave(this.formInline.startTime,this.formInline.endTime,this.formInline.vacateStatus)
			},
			changeStart (val) {
				this.getTeLeave(this.formInline.startTime,this.formInline.endTime,this.formInline.vacateStatus)
			},
			changeEnd (val) {
				this.getTeLeave(this.formInline.startTime,this.formInline.endTime,this.formInline.vacateStatus)
			},
			getTeLeave (startTime,endTime,vacateStatus,pageNum) {
				var _this = this;
				startTime = !startTime? '': util.formatDate.format(startTime, 'yyyy-MM-dd');
				endTime = !endTime? '': util.formatDate.format(endTime,'yyyy-MM-dd');
				vacateStatus = !vacateStatus? '' : vacateStatus;
				pageNum = !pageNum ? 1 :pageNum;
				var data ={
					startTime: startTime,
					endTime: endTime,
					vacateStatus: vacateStatus,
					pageNum: pageNum
				};			
				apis.sLeaveList(data).then(response =>{
					if(!response) {
						return false
					}
					if(response.data.meta.code == 200) {
						var data = response.data.data
						_this.tableData = data.list
						_this.formInline.size = data.totalSize
					}
				})
			},
			handleCurrentChange (curPage){
				this.formInline.currentPage = curPage
				this.getTeLeave(this.formInline.startTime,this.formInline.endTime,this.formInline.vacateStatus,this.formInline.currentPage)
			},
			auditPage (obj) {
				var id = obj.id
				var formData = new FormData();
				formData.append('vid',id);
				var _this = this
				apis.auditDetial(formData).then(response =>{
					if(!response) {
						return false
					}
					if(response.data.meta.code == 200) {
						var data = response.data.data
						_this.auditForm.tableData = data
						_this.auditForm.vacateStatus = obj.vacateStatus
				        _this.auditForm.dialogFormVisible = true
					}
				})
				
			},
			closeDialog () {
				this.auditForm.dialogFormVisible = false
			}		
		},
		mounted () {
			this.getTeLeave ()
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../common/css/common.scss';
	.box{
	  	display:flex;
		align-items: center;
    }
</style>