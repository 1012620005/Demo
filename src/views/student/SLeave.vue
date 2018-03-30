<template>
	<div class="contanier">
		<fc-header></fc-header>
		<div class="content">
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
			    <el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	  	  <div  class="btnS" @click="absence" style="cursor:pointer"><span class="btn qingjia"></span>申请请假</div>
				  	  	  <div class="btnS xiaojiaBtn" @click="cancelDay" style="cursor:pointer"> <span class="btn xiaojia"></span>撤销请假</div>
				  	  	 <span class="label">审核状态</span>
				          <el-select v-model="formInline.vacateStatus" clearable placeholder="审核状态" class="select_width" @change="getUserList">
                              <el-option label="待审核" value= "1" ></el-option>
                              <el-option label="未通过" value="3"></el-option>
                              <el-option label="已撤销" value="5"></el-option>
                              <el-option label="已通过" value="2"></el-option>
                         </el-select>
				  	  	         <span class="label">选择时间</span>
							      <el-date-picker
							      v-model="formInline.startTime"
							      type="date"
							      placeholder="选择开始日期时间" class="label_time" @change="getUserList">
							     </el-date-picker>
							      <el-date-picker
							      v-model="formInline.endTime"
							      type="date"
							      placeholder="选择结束日期时间" class="label_time" @change="getUserList">
							     </el-date-picker>
				</el-form>
				  <el-table
				    ref="multipleTable"
				    :data="tableData"
				    fit style="margin: 0 16px 0 24px;width:1160px;"  @selection-change="handleSelectionChange">
				    	<el-table-column
					      type="selection"
					      width="55" :selectable="checkSelectable">
				    	</el-table-column>
					    <el-table-column
					      type="index"
					      label="序号" width="80">
					    </el-table-column>
					    <el-table-column
					      prop="startTime"
					      label="开始时间" show-overflow-tooltip>
					    </el-table-column>
					    <el-table-column
					      prop="endTime"
					      label="结束时间" show-overflow-tooltip>
					    </el-table-column>
					    <el-table-column
					      prop="vacateDays"
					      label="请假天数" >
					    </el-table-column>
					    <el-table-column
					      prop="vacateReason"
					      label="请假事由"  show-overflow-tooltip>
					    </el-table-column>	
					    <el-table-column
					      prop="vacateType"
					      label="请假类别" >
					    </el-table-column>	
					    <el-table-column
					      label="操作" min-width="200">
					       <template slot-scope="scope">
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
			</div>
		</div>
		<editor-sLeave :form="form" @successDialog="clearForm" @closeDialog="clearForm"></editor-sLeave>
		<audit-detial :form="auditDetialForm"></audit-detial>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import editorSLeave from './editorSLeave.vue'
	import auditDetial from './auditDetial.vue'
	import { Loading } from 'element-ui'
	import api from '../../apis/sLeave.js'
	import responseApi from '../../apis/company/response.js'
	import util from '../../common/js/util.js'
	import commonFile from '../../apis/commonFile.js'
	export default{
		data () {
			return {
				formInline:{
					vacateType: '',
					startTime: '',
					endTime: '',
					vacateStatus: '',
					currentPage: 1,
			        size: 1
				},
				tableData: [],
				formLabelWidth: '120px',
				form:{
					id: '',
					startTime: '',
					endTime: '',
					vacateDays: '',
					vacateType: '',
					vacateReason: '',
					dialogTitle: '',
					vacateFile: [],
					subflowId: '',
					dialogFormVisible: false
			    },
			    auditDetialForm:{
			    	dialogFormVisible: false,
			    	vacateStatus: 1,
			    	id: '',
			    	tableData:[]
			    },
			    multipleSelection:[],
			    title: '申请请假'
			}
		},
		components:{
			fcHeader,
			editorSLeave,
			auditDetial,
			returnBar
		},
		methods:{
			handleCurrentChange (val) {
				this.formInline.currentPage = val
				this.getUserList()				
			},
			getUserList () {
				var startTime = !this.formInline.startTime? '': util.formatDate.format(this.formInline.startTime, 'yyyy-MM-dd');
				var endTime = !this.formInline.endTime? '': util.formatDate.format(this.formInline.endTime,'yyyy-MM-dd');
				var vacateStatus = !this.formInline.vacateStatus? '' : this.formInline.vacateStatus;
				var pageNum = !this.formInline.currentPage ? 1 :this.formInline.currentPage;
				var data ={
					startTime: startTime,
					endTime: endTime,
					vacateStatus: vacateStatus,
					pageNum: pageNum
				}
				api.sLeaveList (data).then(response => {
					if(responseApi.responseCallback(response)) {
						var data = responseApi.responseCallback(response);
						this.formInline.size = data.totalSize
						this.tableData = data.list
					}
				})
			},
			absence () {
				this.form.dialogFormVisible = true;
				this.form.dialogTitle = '新增请假';
			},
			editorDialog (id){
				api.editorSleave(id).then(response => {
					if(response) {
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
					    }
					}
					var data = {
						entity: 'leave',
						bid:id
					}
					commonFile.findFileByEntityAndBid(data).then(res =>{
						console.log(res)
					})
					
				})
			},
			clearForm () {
				this.form.dialogTitle = ''
				this.form.dialogFormVisible = false
				this.form.id=""
				this.form.startTime = ''
				this.form.endTime = ''
				this.form.vacateDays = 0
				this.form.vacateReason = ''
				this.form.vacateType = ''
				this.form.subflowId = ''
				this.form.vacateFile = []
				this.getUserList()
			},
			closeDialog (form){
			   this.clearForm()
			},
			deleteDialog (id) {
				this.$confirm('你确认删除吗？').then(() => {
					this.$ajax({
		                url: '/vacate/delete',
		                method: 'delete',
		                data: {
		                	id: id
		                } 
		            }).then(response => {
		               
		            })	
				}).catch(()  => {
					console.log('失败')
				})
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
			handleSelectionChange (val) {
				this.multipleSelection = val
			},
			checkSelectable (row, index) {
				var startTime = row.startTime
				var status = row.vacateStatus
				var flag = this.showOrNo(startTime)
				if(flag && status != '5') {
					return true
				} else {
					return false
				}
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
					api.studentCancel({ids: arr.join(',')}).then(response => {
						if(response) {
							var code = response.data.meta.code
			                if (code == '200') {
			                	this.$message({type:'success',message:'销假成功'})
			                }
			                this.getUserList()							
						}
		                
		            })
				}
			},
			auditPage (obj) {
				var id = obj.id
				var formData = new FormData();
				formData.append('vid',id);
				var _this = this
				api.auditDetial(formData).then(response =>{
					if(response) {
						if(response.data.meta.code == 200) {
							var data = response.data.data
							_this.auditDetialForm.tableData = data
							_this.auditDetialForm.vacateStatus = obj.vacateStatus
				            _this.auditDetialForm.dialogFormVisible = true
						}						
					}
				})
			}
		},
		mounted () {
			this.getUserList()
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	$large:16px;
	$middle:14px;
	$Small:12px;
	.content{
		position:absolute;
		left:0;
		top:68px;
		right:0;
		bottom:0;
		margin:0 auto;
		width:1200px;
		.sLeave-top{
			height:50px;
			background:#fff;
			display:flex;
			justify-content:space-between;
			border-radius:5px;
			margin-top:11px;
			padding: 0 16px 0 24px;
			.sLeave_title{
				width:65px;
				display:inline-block;
				color:#208af5;
				height:50px;
				line-height:50px;
				font-size:$large;
				border-bottom:2px solid #208af5;
			}
			.sLeave-top-right{
				line-height:50px;
				color:#333;
				font-size:$Small;
				background-image:url('../../assets/img/connet/return.png');
				background-repeat: no-repeat; 
				background-position:right center;
				background-size:9px 15px;
				padding-right:12px;
				.return_btn{
					display:inline-block;
					height:50px;
				}
			}

		}
		.sLeave-bottom{
			width:1200px;
			height:740px;
			background:#fff;
			border-radius:5px;
			margin-top:16px;
			.demo-form-inline{
				display:flex;
				align-items:center;
				padding-left:24px;
				color:#208af5;
				font-size:14px;
				.btnS{
					height:50px;
					display:flex;
					align-items:center;
					padding-right:5px;
					width:90px;
				}
				.xiaojiaBtn{
					color:#ff8b00;
				}
				.btn{
					display:inline-block;
					width:16px;
					height:16px;
					padding-left:10px;
					background:url('../../assets/img/connet/script.png') no-repeat;
					background-position: -48px -352px;
				}
				span.qingjia:hover{
					background-position: -48px -384px;
				}
				span.xiaojia{
					background-position: -48px -416px;
				}
                span.xiaojia:hover{
					background-position: -48px -448px;
				}
				.label{
					width:80px;
					display:inline-block;
					height:50px;
					line-height:50px;
					color:#333;
					font-size:14px;
					text-align:center;
				}
				.label_time{
					width:180px;
					margin-right:5px;
				}
				.select_width{
					width:160px;
				}
				.xiaojia{
					color:#ff8b00;
				}
			}
			.con_left_tab_con_page{
				text-align:center;
				margin-top:20px;
			}
		}
	}
	//文本多出的字省略号表示
	.textoverflow{
		overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width:90px;
	}
	//图片精灵
	.imgScript{
		display:inline-block;
		width:14px;
		height:14px;
		background: url('../../assets/img/connet/script.png') no-repeat;
		background-position: -48px -44px;
	}
	span.shenhe:hover{
		background-position:-48px -74px; 
	}
	span.nosussess{
		background-position:-48px -164px; 
	}
	span.nosussess:hover{
		background-position:-48px -194px; 
	}	
    span.success{
    	background-position:-48px -104px;
    }
	span.sussess:hover{
		background-position:-48px -134px; 
	}  
	span.chexiao{
		background-position:-144px -504px; 
	}
	span.chexiao:hover{
		background-position:-144px -534px; 
	}
	span.btns{
		display:inline-block;
		width:20px;
		height:16px;
		background:url('../../assets/img/connet/script.png') no-repeat;
		background-position:-94px -44px;

	}	
	span.editor:hover{
		background-position: -94px -74px;
	}
	span.delete{
		background-position: -94px -106px;
	}
	span.delete:hover{
		background-position: -94px -138px;
	}	
	div.dialogImg .el-dialog__header span.el-dialog__title{
		display:inline-block;
		width:100px;
		height:32px;
		background:url('../../assets/img/connet/script.png') no-repeat;
		background-position: -195px -44px;
		line-height:32px;
		padding-left:36px;
	}
	.cell div{
		display:flex;
		align-items:center;
	}
// 提示文字
.tipBox{
	color:red;
}
.box{
	display:flex;
}
</style>
<style type="text/css" lang="scss">
	.wrapper_dialog{
		position:relative;
		.xiaojia{
			position:absolute;
			right:-12px;
			top:-30px;
			width:113px;
			height:112px;
			background:url(../../assets/img/connet/xiaojia.png) no-repeat;
		}
	}
</style>