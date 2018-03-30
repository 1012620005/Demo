<template>
	<div class="contanier">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="leaveMan-top-left">
					<span class="sLeave_title leaveMan_title">学生请假管理</span>
					<span class="leaveMan_count">请假总人数<i class="color">60</i>人</span>
					<span class="leaveMan_count">待审核<i class="color">5</i>人</span>
					<span class="leaveMan_count">{{ formInline.campus }}</span>
				</div>
				<div class="sLeave-top-right" >
					<span class="return_btn" @click="returnBtn" style="cursor:pointer">返回</span>
				</div>				
			</div> -->
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				 <el-form :inline="true" :model="formInline">
					 <div class="top_form">
						 <div class="btnS xiaojiaBtn" @click="cancelDay" style="cursor:pointer"> <span class="btn xiaojia"></span>撤销请假</div>
				 	 
						<div class="fontColor label_padding">专业</div>
						<el-select v-model="formInline.prof" clearable placeholder="选择专业"  @change="getClazz" style="width:120px">
								<el-option :label="item.proname" :value="item.proid" :key="item.proid" v-for="item in formInline.profList"></el-option>
						</el-select>
						<div  class="fontColor label_padding">年级</div>
						<el-select v-model="formInline.grade" clearable  placeholder="选择年级" style="width:120px" @change="changeGrade">
								<el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.gradeList"></el-option>
						</el-select>	 
						<div  class="fontColor label_padding">班级</div>
						<el-select v-model="formInline.clazz" clearable  placeholder="选择班级" @change="changeVal" style="width:120px">
								<el-option :label="item.clazzname" :value="item.clazzid" :key="item.clazzid" v-for="item in formInline.clazzList"></el-option>
						</el-select>
						<el-input
							placeholder="请输入学生姓名"
							v-model="formInline.keyword"
							style="margin-left:10px;width:200px;" @blur="searchName">
							<i slot="suffix" class="el-input__icon el-icon-search"></i>
						</el-input>
						<div class="export btnS" style="cursor:pointer">
							<span class="imgScript exporticon"></span>
							<span class="export_title fontColor paddingRight">导出Excel</span>
				    	<!-- <span class="imgScript print "></span>
				    	<span class="export_title fontColor paddingRight">打印</span> -->
				       </div>
					 </div>
					 <div class="bottom_form">
						<!-- <div  class="fontColor" style="padding-right:10px;">请假类别</div>
						<el-select v-model="formInline.vacateType" clearable  placeholder="请假类别">
								<el-option label="事假" value="事假"></el-option>
								<el-option label="病假" value="病假"></el-option>
						</el-select>
						<div  class="fontColor label_padding">审核状态</div>
						<el-select v-model="formInline.vacateStatus" clearable  placeholder="请假类别">
								<el-option label="待审核" value= "1" ></el-option>
								<el-option label="未通过" value="2"></el-option>
								<el-option label="已撤销" value="3"></el-option>
								<el-option label="已通过" value="4"></el-option>
						</el-select> -->
					 </div>   
				 </el-form>
				 
				 <el-table
				    ref="multipleTable"
				    :data="tableData"
				    style="margin: 0 16px 0 24px;width:1160px;"  @selection-change="handleSelectionChange">
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
				      label="学生姓名" width="150">
				    </el-table-column>
				    <el-table-column
				      prop="campusName"
				      label="校区" show-overflow-tooltip>
				    </el-table-column>				    
				    <el-table-column
				      prop="majorName"
				      label="专业" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="majorName"
				      label="年级" show-overflow-tooltip>
				    </el-table-column>					
				    <el-table-column
				      prop="className"
				      label="班级" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="startTime"
				      label="开始时间"  width="150" show-overflow-tooltip>
				    </el-table-column>				    
				    <el-table-column
				      prop="endTime"
				      label="结束时间" width="150" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="vacateDays"
				      label="请假天数"  width="150">
				    </el-table-column>				    
				    <el-table-column
				      prop="vacateReason"
				      label="请假事由" show-overflow-tooltip width="100">
				    </el-table-column>	
				    <el-table-column
				      prop="vacateType"
				      label="请假类别"  width="150">
				    </el-table-column>	
				    <el-table-column
				      prop="applyTime"
				      label="提交时间" width="150">
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
						        <!-- <div v-else-if="scope.row.vacateStatus == 4">
						                <span class="imgScript success"></span>
						           	   已转交
						        </div>						         -->
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
		<!--待审核页面-->
		<el-dialog title="待审核" :visible.sync="auditForm.dialogFormVisible" size="tiny" custom-class="dialogImg" label-position="right" @close="closeDialog">
			<div class="wrapper_dialog">
				<el-table
			      :data="auditTableData"
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
	import apis from '../../apis/sLeaveManage.js'
	import commonApi from '../../apis/common.js'
	import { getToken } from '../../utils/auth.js'
	export default {
		data () {
			return {
				formInline: {
					keyword: '',
					currentPage: 1,
					size: 1,
					prof: '',
					profList:[],
					clazz: '',
					clazzList:[],
					grade:'',
					gradeList:[],
					vacateType:'',
					vacateStatus:''
				},
				tableData:[],
				multipleSelection:[],
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
				careOfData:[],
				title:'学生请假管理'
			}
		},
		components:{
			fcHeader,
			returnBar
		},
		methods:{
			gerUser (pageNum,vacateType,vacateStatus,proId,gradeId,clazzId,keyword) {
				var _this = this;
				vacateType = !vacateType? '' : vacateType;
				vacateStatus = !vacateStatus? '' : vacateStatus;
				pageNum = !pageNum ? 1 :pageNum;
				proId = !proId ? '': proId;
				gradeId = !gradeId ? '' : gradeId;
				clazzId = !clazzId ? '' : clazzId;
				keyword = !keyword ? '': keyword;
				var data ={
					pageNum: pageNum,
					vacateType: vacateType,
					vacateStatus: vacateStatus,
					proId: proId,
					gradeId: gradeId,
					clazzId: clazzId,
					leaverName: keyword,
					user_type: '3'
				};
				apis.getSleaveManList(data).then(response =>{
					if(response) {
						if(response.data.meta.code == 200) {
							var data = response.data.data
							_this.tableData = data.list
							_this.formInline.size = data.totalSize
						}						
					}
				})
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
						if(response) {
			                var code = response.data.meta.code
			                if (code == '200') {
			                	this.$message({type:'success',message:'销假成功'})
			                }							
						}
		            })	
				}
			},
            onSubmit () {
            	var vacateType = this.formInline.vacateType;
            	var vacateStatus = this.formInline.vacateStatus;
            	this.gerUser(vacateType,vacateStatus)
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
            handleCurrentChange (curPage) {
            	this.formInline.currentPage = curPage
            	this.gerUser(curPage,this.formInline.vacateType,this.formInline.vacateStatus,this.formInline.proId,this.formInline.gradeId,this.formInline.clazzId)
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
            		if(response) {
						if(response.data.meta.code == 200) {
	            			var data =response.data.data
	            			_this.auditTableData = data
	            			_this.auditForm.dialogFormVisible = true
	            		}            			
            		}
            	})
            	
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
            			if(response) {
            				if(response.data.meta.code ==  200) {
	            				_this.$message({
	            					type:'success',
	            					message:'请假通过'
	            				})
							}
							_this.auditForm.dialogFormVisible = false
            	            _this.gerUser()
            			}
            			
            		})
            	} else if(str == '2'){
            		// 不通过
            		apis.clicNoPass(data).then(response =>{
            			if(response) {
            				if(response.data.meta.code ==  200) {
	            				_this.$message({
	            					type:'success',
	            					message:'请假不通过'
	            				})
            			    }
						}
						_this.auditForm.dialogFormVisible = false
            	        _this.gerUser()
            		})
            	}
            	
            },
            careOfPage () {
            	var _this = this
            	apis.transpond().then(response =>{
            		if(response) {
            			if(response.data.meta.code == 200) {
	            			var data = response.data.data
	            			_this.careOfData = data
	            			_this.careOfForm.dialogFormVisible = true
            		    }
            		}
            	})
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
	        getUserMsg () {
	        	var _this = this
	            	commonApi.getUserMsg({'access_token': this.access}).then(response =>{
	            		if(!response) {
	            			return false
	            		}	            		
	            		if(response.data.meta.code == 200) {
	            			var  data = response.data.data
	            			console.log(data)
	            			_this.formInline.campus = data.scoms.name
	            		}
	            	})
	            	commonApi.getPofAndClazz({'access_token': this.access}).then(response =>{
	            		if(!response) {
	            			return false
	            		}	            		
	            		if(response.data.meta.code == 200) {
	            			var data =response.data.data
	            			_this.formInline.profList = data.pro
	            		}
	            	})
	        },
	        getGradeList() {
				var _this = this
				commonApi.getGradeList().then(response =>{
					if(response) {
						var data = response.data.data
						_this.formInline.gradeList = data
					}
				})
			},
			getClazz (val) {
				this.gerUser(this.formInline.currentPage,this.formInline.vacateType,this.formInline.vacateStatus,val)
				var params = {
					proid: val,
					gradeid: this.formInline.grade
				}
				var _this = this
				commonApi.getClassList(params).then(res =>{
					if(res){
						var data = res.data.data
						_this.formInline.clazzList = data 
					}
				})
			},
			changeGrade (val) {
				this.gerUser(this.formInline.currentPage,this.formInline.vacateType,this.formInline.vacateStatus,this.formInline.proId,val)
			},
			changeVal (val) {
				if(!this.formInline.grade) {
					this.$message.error('请选择年级')
					return false
				}
				this.gerUser(this.formInline.currentPage,this.formInline.vacateType,this.formInline.vacateStatus,this.formInline.proId,this.formInline.gradeId,val)

			},
			searchName (event) {
				this.gerUser(this.formInline.currentPage,this.formInline.vacateType,this.formInline.vacateStatus,this.formInline.proId,this.formInline.gradeId,this.formInline.clazzId,this.formInline.keyword)
			}   
		},
		mounted () {
			this.access = getToken('sessionid')
			this.getUserMsg()
			this.getGradeList()
			this.gerUser(this.formInline.currentPage)
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
    @import '../../common/css/common.scss';
	
	.export{
		flex:1;
		justify-content:flex-end;
		margin-right:16px;
	}
	.paddingRight{
		padding: 0 5px 0 5px;
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