<template>
	<div class="contanier">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="leaveMan-top-left">
					<span class="sLeave_title leaveMan_title">老师请假管理</span>
					<span class="leaveMan_count">待审核<i class="color">{{ count }}</i>人</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn" @click="returnBtn" style="cursor:pointer">返回</span>
				</div>				
			</div> -->
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				 <el-form :inline="true" :model="formInline">
					 <div class="top_form">
						<!-- <div class="btnS xiaojiaBtn" @click="cancelDay" style="cursor:pointer"> <span class="btn xiaojia"></span>撤销请假</div> -->
						<div class="fontColor label_padding">校区</div>
						<el-select v-model="formInline.campus"  clearable  placeholder="选择校区" style="width:120px;" @change="gerUser">
							<el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.campusList"></el-option>
						</el-select>
						<div  class="fontColor label_padding">审核状态</div>
						<el-select v-model="formInline.vacateStatus" clearable  placeholder="审核状态" style="width:120px;" @change="gerUser">
								<el-option label="待审核" value= "1" ></el-option>
                                <el-option label="未通过" value="3"></el-option>
                                <el-option label="已撤销" value="5"></el-option>
                                <el-option label="已通过" value="2"></el-option>
						</el-select>
						<span class="fontColor label_padding">选择时间</span>
						<el-date-picker
									v-model="formInline.startTime"
									type="date"
									placeholder="选择开始日期时间" class="label_time" @change="gerUser">
						</el-date-picker>
						<el-date-picker
									v-model="formInline.endTime"
									type="date"
									placeholder="选择结束日期时间" class="label_time" @change="gerUser">
						</el-date-picker> 
						<el-input
									placeholder="请输入老师姓名"
									v-model="formInline.keyword"
									style="width:193px;" @blur="gerUser">
									<i slot="suffix" class="el-input__icon el-icon-search"></i>
						</el-input> 
					</div>
					<div class="bottom_form">
						<div class="export btnS" style="cursor:pointer">
							<span class="imgScript exporticon"></span>
							<span class="export_title fontColor paddingRight">导出</span>
							<span class="imgScript print "></span>
							<span class="export_title fontColor paddingRight">打印</span>
				    	</div>  
					</div>     
				 </el-form>
				 <el-table
				    :data="tableData"
				    style="margin: 0 16px 0 24px;width:1160px;">
				     <!-- <el-table-column
				      type="selection"
				      width="55" :selectable="checkSelectable">
				    </el-table-column> -->
				    <el-table-column
				      type="index"
				      label="序号" width="70">
				    </el-table-column>
				    <el-table-column
				      prop="leaverName"
				      label="教职工姓名" show-overflow-tooltip width="150">
				    </el-table-column>
				    <el-table-column
				      prop="campusName"
				      label="校区" show-overflow-tooltip>
				    </el-table-column>				    
				    <el-table-column
				      prop="majorName"
				      label="授课专业" show-overflow-tooltip width="130">
				    </el-table-column>
				    <el-table-column
				      prop="className"
				      label="负责班级" show-overflow-tooltip width="130">
				    </el-table-column>
				    <el-table-column
				      prop="startTime"
				      label="开始时间" show-overflow-tooltip width="130">
				    </el-table-column>				    
				    <el-table-column
				      prop="endTime"
				      label="结束时间" show-overflow-tooltip width="130">
				    </el-table-column>
				    <el-table-column
				      prop="vacateDays"
				      label="请假天数"  show-overflow-tooltip width="130">
				    </el-table-column>	
				    <el-table-column
				      prop="vacateReason"
				      label="替课人" show-overflow-tooltip >
				    </el-table-column>				    			    
				    <el-table-column
				      prop="vacateReason"
				      label="请假事由" show-overflow-tooltip width="130">
				    </el-table-column>	
				    <el-table-column
				      prop="vacateType"
				      label="请假类别" show-overflow-tooltip width="130">
				    </el-table-column>
				    <el-table-column
				      prop="applyTime"
				      label="提交时间" show-overflow-tooltip width="130">
				    </el-table-column>					    
				    <el-table-column
				      label="操作"  min-width="180">
				       <template slot-scope="scope">
				       	    <div class="box">
				       	    	<el-button type="text" @click="auditPage(scope.row,'1')" style="cursor:pointer">审核详情</el-button>
				       	    	<div v-if="scope.row.vacateStatus == 1" @click="auditPage(scope.row,'0')" style="cursor:pointer">
				                 	<span class="imgScript shenhe"></span>
					           	   	待审核 
						        </div>
						        <div v-else-if="scope.row.vacateStatus == 3">
						               <span class="imgScript nosussess"></span>
						           	   未通过
						        </div>
						        <div v-else-if="scope.row.vacateStatus == 5">
						                <span class="imgScript chexiao"></span>
						           	   已撤销
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
			</div>
		</div>
		<el-dialog title="待审核" :visible.sync="auditForm.dialogFormVisible" size="tiny" custom-class="dialogImg" label-position="right" @close="closeDialog">
			<div class="wrapper_dialog">
				<el-table
			      :data="auditTableData"
			      style="width: 100%">
			      <el-table-column
			        prop="operatorName"
			        label="审核人员" show-overflow-tooltip
			        >
			      </el-table-column>
			      <el-table-column
			        label="审核状态"
			        prop="statusAfteroperate"
			       >
			      </el-table-column>
			      <el-table-column
			        prop="operatorTime"
			        label="审核时间">
			      </el-table-column>
			    </el-table>
				<div slot="footer" class="dialog-footer" v-show="auditForm.flag">
					<el-button type="success" @click="pass('1')">通过</el-button>
					<el-button type="danger" @click="pass('2')">不通过</el-button>
					<el-button type="primary" @click="careOfPage">转交</el-button>
				</div>			    	
			</div>
		</el-dialog>		
		<!--转交其他部门人员-->
		<el-dialog title="转交人员/部门" :visible.sync="careOfForm.dialogFormVisible" size="tiny" custom-class="dialogImg" label-position="right" @close="closeDialog">
			<div class="wrapper_dialog wrapper_radio">
				<el-table
			      :data="careOfData"
			      style="width: 100%">
			      <el-table-column
			        label="选中"
			        >
			        <template slot-scope="scope">
                         <el-radio class="radio" v-model="careOfForm.radio" :label="scope.row.id"></el-radio>
                    </template>
			      </el-table-column>
			      <el-table-column
			        prop="name"
			        label="人员/部门"
			       >
			      </el-table-column>
			    </el-table>	
			    <div slot="footer" class="dialog-footer" style="text-align:right">
					<el-button type="success" @click="submitCareOfParson">提交</el-button>
				</div>	
			</div>
		</el-dialog>		
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import apis from '../../apis/tLeaveManage.js'
	import util from '../../common/js/util.js'
	export default {
		data () {
			return {
				count: 10,
				title:'老师请假管理',
				formInline: {
					keyword: '',
					currentPage: 1,
					size: 1,
					campus: '',
					vacateStatus: '',
					campusList: [],
					startTime: '',
					endTime: ''
				},
				checkForm:{
					id: '',
					dialogFormVisible: false,
					noPassReason: ''
				},
				tableData:[],
				multipleSelection:[],
				careOfForm: {
					dialogFormVisible: false,
					radio: '1'
				},
				auditForm: {
					dialogFormVisible: false,
					flag: false,
					id: ''
				},
				careOfForm: {
					dialogFormVisible: false,
					radio: ''
				},
				auditTableData:[],
				careOfData:[]						
			}
		},
		components:{
			fcHeader,
			returnBar
		},
		methods:{
			gerUser () {
				var _this = this
				var data ={
					pageNum: this.formInline.currentPage,
					vacateStatus: this.formInline.vacateStatus,
					campusRegion: this.formInline.campus,
					name: this.formInline.keyword,
					startTime: this.formInline.startTime ?  util.formatDate.format(this.formInline.startTime, 'yyyy-MM-dd'): '',
					endTime: this.formInline.endTime ? util.formatDate.format(this.formInline.endTime,'yyyy-MM-dd') : '',
					user_type: '2'
				};
				apis.getSleaveManList(data).then(response =>{
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
			vacateCheck (id) {
			  this.checkForm.dialogFormVisible = true
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
		                }
		            })							
				}				
			},
            onSubmit () {
            	this.gerUser(this.formInline.currentPage,this.formInline.campus,this.formInline.vacateStatus,this.formInline.keyword)
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
            resetForm () {
            	this.checkForm.id = ''
            	this.checkForm.dialogFormVisible = false
            	this.checkForm.noPassReason = ''
            },
            handleSelectionChange (val) {
            	this.multipleSelection = val
            },
            checkSelectable (row, index) {
 				var startTime = row.startTime
				var flag = this.showOrNo(startTime)
				var status = row.vacateStatus
				if(flag && status != '3'){
					return true
				} else {
					return false
				}          		
            },
            handleCurrentChange (curPage) {
            	this.formInline.currentPage = curPage
            	this.gerUser()
            },
            auditPage (obj,str) {
            	var _this = this
            	if(str == '1') {
            		this.auditForm.flag = false
            		
            	} else {
            		this.auditForm.flag = true
            	}
            	var vid = obj.id
            	this.auditForm.id = vid;
            	var formData = new FormData();
            	formData.append('vid',vid)
            	apis.aduitDetial(formData).then(response =>{
            		if(!response) {
						return false
					}
            		if(response.data.meta.code == 200) {
            			var data =response.data.data
            			_this.auditTableData = data
            		}
            	})
            	this.auditForm.dialogFormVisible = true
            },
            closeDialog () {

            },
            pass (str) {
            	var data ={
            		vid: this.auditForm.id
            	};
            	var _this = this
            	if(str == '1') {
            		// 通过
            		apis.clickPass(data).then(response =>{
            			if(!response) {
						  return false
					    }
            			if(response.data.meta.code ==  200) {
            				_this.$message({
            					type:'success',
            					message:'请假通过'
							})
							this.auditForm.dialogFormVisible = false
            	            this.gerUser()
            			}
            		})
            	} else if(str == '2'){
            		// 不通过
            		apis.clicNoPass(data).then(response =>{
            			if(!response) {
						  return false
					    }
            			if(response.data.meta.code ==  200) {
            				_this.$message({
            					type:'success',
            					message:'请假不通过'
							})
							this.auditForm.dialogFormVisible = false
            	            this.gerUser()
            			}
            		})
            	}
            },
            careOfPage () {
            	var _this = this
            	apis.transpond().then(response =>{
            		if(!response) {
						return false
					}
            		if(response.data.meta.code == 200) {
            			var data = response.data.data
            			_this.careOfData = data
            		}
            	})
            	this.careOfForm.dialogFormVisible = true

            },
            submitCareOfParson () {
            	var _this = this
            	var formData = new FormData();
            	formData.append('dispatcherId',this.careOfForm.radio)
            	formData.append('vid',this.auditForm.id)
            	apis.clickTranspond(formData).then(response =>{
            		if(!response) {
						return false
					}
            		if(response.data.meta.code == 200) {
            			console.log(response.data.meta.message)
						_this.careOfForm.dialogFormVisible = false;
						_this.auditForm.dialogFormVisible = false;
            			// 重新调取审核详情的列表
            			// var formData = new FormData();
		            	// formData.append('vid',_this.auditForm.id)
		            	// apis.aduitDetial(formData).then(response =>{
		            	// 	if(response.data.meta.code == 200) {
		            	// 		var data =response.data.data
		            	// 		_this.auditTableData = data
		            	// 	}
		            	// })
            		}
            	})
            },
            getCampusList() {
            	var _this = this
            	apis.getCampusList().then(response =>{
            		if(response){
            			var data =response.data.data
            			_this.formInline.campusList = data
            		}
            	})
            }
			
		},
		mounted () {
			this.gerUser()
			this.getCampusList()
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../common/css/common.scss';
	.content {
		.sLeave-top {
			span.leaveMan_title.sLeave_title{
			 	width:98px;
			    font-size:16px;
	        }
	        .leaveMan_count{
	        	margin-left:32px;
	        	font-size:14px;
	        	color:#333;
	        	.color{
	        		color:#ef0000;
	        		font-style:normal;
	        		font-weight:bold;
	        		padding-left:5px;
	        		padding-right:5px;
	        	}
	        }
	    }

	}
	.export{
		flex:1;
		justify-content:flex-end;
		margin-right:16px;
	}
	.paddingRight{
		padding: 0 5px 0 5px;
	}
	.box{
		display:flex;
		align-items: center;
    }
    .dialog-footer{
		margin-top:20px;
		text-align:center;
	}
	.box{
		display:flex;
		align-items: center;
    }
	.top_form{
		display: flex;
        align-items: center;
        padding-left: 24px;
		height:50px;
	}
	.bottom_form{
		display: flex;
        align-items: center;
	}
</style>
<style type="text/css" lang="scss">
	.wrapper_radio{
		.el-radio__label{
			text-indent:-9999999px;
			display: inline-block;
		}
	}
</style>