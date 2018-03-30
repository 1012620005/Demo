<template>
	<div class="container">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="leaveMan-top-left">
					<span class="sLeave_title leaveMan_title">学生请假管理</span>
					<span class="fontColor label_padding">{{formInline.campusSection}}</span>
				 	<span class="fontColor label_padding">{{formInline.campusDepart}}</span>
					<span class="leaveMan_count">请假总人数<i class="color">60</i>人</span>
					<span class="leaveMan_count">待审核<i class="color">5</i>人</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn">返回</span>
				</div>				
			</div> -->
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				 <el-form :inline="true" :model="formInline" class="demo-form-inline">
				 	 <div class="btnS xiaojiaBtn" @click="cancelDay"> <span class="btn xiaojia"></span>销假</div>
				 	 <div class="fontColor label_padding">专业:</div>
				 	 <el-select v-model="formInline" placeholder="选择校区" style="width:80px;">
                             <el-option label="106" value="106"></el-option>
                             <el-option label="107" value="107"></el-option>
                    </el-select>
				 	 <div  class="fontColor label_padding">选择班级:</div>
				 	 <el-select v-model="formInline" placeholder="选择班级" style="width:67px;">
                             <el-option label="106" value="106"></el-option>
                             <el-option label="107" value="107"></el-option>
                    </el-select>
                     <div  class="fontColor label_padding">请假类别:</div>
				 	 <el-select v-model="formInline.vacateType" placeholder="请假类别" style="width:82px;">
                             <el-option label="事假" value="事假"></el-option>
                             <el-option label="病假" value="病假"></el-option>
                    </el-select>
                     <div  class="fontColor label_padding">审核状态:</div>
				 	 <el-select v-model="formInline" placeholder="请假类别" style="width:82px;">
                             <el-option label="事假" value="事假"></el-option>
                             <el-option label="病假" value="病假"></el-option>
                    </el-select>
                    <el-button type="primary" @click="onSubmit" class="label_padding" >查询</el-button>
  					<el-input
						placeholder="请输入关键字"
						icon="search"
						v-model="formInline.keyword"
						style="width:193px;">
				    </el-input>  
				    <div class="export btnS">
				    	<span class="imgScript exporticon"></span>
				    	<span class="export_title fontColor paddingRight">导出</span>
				    	<span class="imgScript print "></span>
				    	<span class="export_title fontColor paddingRight">打印</span>
				    </div>               
				 </el-form>
				 <el-table
				    ref="multipleTable"
				    :data="tableData"
				    style="margin: 0 16px 0 24px;width:1160px;" @selection-change="handleSelectionChange">
				    <el-table-column
				      type="selection"
				      width="55" :selectable="checkSelectable">
				    </el-table-column>
				    <el-table-column
				      type="index"
				      label="序号">
				    </el-table-column>
				    <el-table-column
				      prop="studName"
				      label="学生姓名" width="150">
				    </el-table-column>
				    <el-table-column
				      prop="campus"
				      label="校区">
				    </el-table-column>				    
				    <el-table-column
				      prop="major"
				      label="专业" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="class"
				      label="班级">
				    </el-table-column>
				    <el-table-column
				      prop="startTime"
				      label="开始时间"  width="150">
				    </el-table-column>				    
				    <el-table-column
				      prop="endTime"
				      label="结束时间" width="150" >
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
				      prop="submitTime"
				      label="提交时间" width="150">
				    </el-table-column>					    
				    <el-table-column
				      label="操作"  min-width="180">
				       <template slot-scope="scope">
				       	   <div class="box">
				       	    	<el-button type="text" @click="auditPage(scope.row,'1')">审核详情</el-button>
					           <div v-if="scope.row.vacateStatus == 1">
					           	   <span @click="vacateCheck(scope.row.id)">
					           	   		 <span class="imgScript shenhe"></span>
					           	   待审核
					           	   </span>
					              
					           </div>
					           <div v-else-if="scope.row.vacateStatus == 3">
					               <span class="imgScript nosussess"></span>
					           	   未通过
					           </div>
					           <div v-else-if="scope.row.vacateStatus == 4">
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
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import leaveManageCheck from './leaveManageCheck.vue'
	import apis from '../../apis/sLeaveManage.js'
	export default {
		data () {
			return {
				formInline: {
					keyword: '',
					campusSection: '东校区',
					campusDepart: '计算机系',
					vacateType: '',
					startTime: '',
					endTime: '',
					vacateStatus: '',
					currentPage: 1,
			        size: 1
				},
				tableData:[
				  {
				  	id: 1,
				  	studName: '张三',
				  	campus: '东校区',
				  	major: '城市轨道交通控制',
				  	class: '206',
				  	startTime: '2017-09-21 9:30',
				  	endTime: '2017-09-19 9:30',
				  	vacateDays: '4',
				  	vacateReason: '三个地方好大头鬼十多个都给他',
				  	vacateType: '病假',
				  	submitTime: '2017-09-13 10:30',
				  	vacateStatus: 1
				  },
				  {
				  	id: 2,
				  	studName: '张三',
				  	campus: '东校区',
				  	major: '城市轨道交通控制',
				  	class: '206',
				  	startTime: '2017-09-23 9:30',
				  	endTime: '2017-09-19 9:30',
				  	vacateDays: '4',
				  	vacateReason: '三个地方好大头鬼十多个都给他',
				  	vacateType: '病假',
				  	submitTime: '2017-09-13 10:30',
				  	vacateStatus: 4
				  },
				  {
				  	id: 3,
				  	studName: '张三',
				  	campus: '东校区',
				  	major: '城市轨道交通控制',
				  	class: '206',
				  	startTime: '2017-09-15 9:30',
				  	endTime: '2017-09-19 9:30',
				  	vacateDays: '4',
				  	vacateReason: '三个地方好大头鬼十多个都给他',
				  	vacateType: '病假',
				  	submitTime: '2017-09-13 10:30',
				  	vacateStatus: 1
				  }
				],
				multipleSelection:[],
				checkForm: {
					id: '',
					dialogFormVisible: false,
					noPassReason: ''
				}
			}
		},
		components:{
			fcHeader,
			leaveManageCheck
		},
		methods:{
			gerUser (pageNum,vacateType) {
				var _this = this
				vacateType = !vacateType? '' : vacateType;
				var data ={
					pageNum: pageNum,
					vacateType: vacateType
				};
				apis.getSleaveManList(data).then(response =>{
					if(response.data.meta.code == 200) {
						var data = response.data.data
						// _this.tableData = data.list
						_this.formInline.size = data.totalSize
					}
				})
			},
			vacateCheck (id) {
				this.checkForm.dialogFormVisible = true
			},
			cancelDay () {
				if(this.xiaoList.length === 0) {
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
					apis.studentCancel({ids: arr}).then(response => {
		                var code = response.meta.code
		                if (code == '200') {
		                	this.$message({type:'success',message:'销假成功'})
		                }
		            })	
				}
			},
            onSubmit () {},
            showOrNo (time) {
					var nowTime = new Date().getTime();
					var startTime = new Date(time).getTime() - 30*60*1000;
					if (nowTime <= startTime){
						return true
					} else{
						return false
					}            	
            },
            editorDialog () {},
            deleteDialog () {},
            resetForm () {
            	this.checkForm.id = ''
            	this.checkForm.dialogFormVisible = false
            	this.checkForm.noPassReason = ''
            },
            handleCurrentChange () {

            },
            checkSelectable (row, index) {
 				var startTime = row.startTime
				var flag = this.showOrNo(startTime)
				return flag           		
            },
            handleSelectionChange (val) {
            	this.multipleSelection = val
            }

		},
		mounted () {
			this.gerUser(this.formInline.currentPage)
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
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
	 
</style>