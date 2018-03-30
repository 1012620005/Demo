<template>
	<div class="container">
		<fc-header></fc-header>
		<div class="content">
<!-- 			<div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title">工作流</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn" @click="returnBtn">返回</span>
				</div>
			</div> -->
			<return-bar :title="title"></return-bar>
            <div class="sLeave-bottom">
			    <el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	  <div class="label">校区</div>
			  		  	  <el-select v-model="formInline.campus" placeholder="校区" clearable  class="select_width" @change="getWorkFlowList">
                             <el-option v-for="item in campusList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                          </el-select>
				  	  	 <span class="label">工作流类型</span>
				          <el-select v-model="formInline.workType" placeholder="工作流类型" clearable class="select_width" @change="getWorkFlowList">
                              <el-option label="学生请假" value="2"></el-option>
							  <el-option label="老师请假" value="1"></el-option>
                         </el-select>
 				  	  	 <span class="label">审核状态</span>
				          <el-select v-model="formInline.checkStatus" placeholder="审核状态" clearable class="select_width" @change="getWorkFlowList">
                              <el-option label="待审核" value="1"></el-option>
                              <el-option label="未通过" value="3"></el-option>
                              <el-option label="已通过" value="2"></el-option>
                         </el-select> 
							     <!--  <el-date-picker
							      v-model="formInline.startTime"
							      type="date"
							      placeholder="选择开始日期时间" class="label_time">
							     </el-date-picker>
							      <el-date-picker
							      v-model="formInline.endTime"
							      type="date"
							      placeholder="选择结束日期时间" class="label_time">
							     </el-date-picker> -->
				  	   	  <!-- <el-button type="primary" @click="onSubmit" style="margin-left:10px">查询</el-button> -->
				</el-form>
				 <div  class="btnS widthed" @click="absence"><span class="btn qingjia"></span>发起工作流设计</div>
				  <el-table
				    :data="tableData"
				    fit
				    style="margin: 0 16px 0 24px;width:1160px;">
					    <el-table-column
					      type="index"
					      label="序号" width="80">
					    </el-table-column>
					    <el-table-column
					      prop="campusName"
					      label="校区" >
					    </el-table-column>
					    <el-table-column
					      label="工作流类型">
					       <template slot-scope="scope">
					       		<span v-if="scope.row.flowType == 2">学生请假</span>
					       		<span v-else>老师请假</span>
					       </template>
					    </el-table-column>
					    <el-table-column
					      prop="createDate"
					      label="提交时间">
					    </el-table-column>
					    <el-table-column
					      label="操作">
					       <template slot-scope="scope">
					       	  <div class="box">
					           <div v-if="scope.row.checkStatus == 1">
					               <span class="imgScript shenhe"></span>
					           	   待审核 	   
					           </div>
					           <div v-else-if="scope.row.checkStatus == 3">
					               <span class="imgScript nosussess"></span>
					           	   未通过
					           	   <span class="btns editor" @click="editorDialog(scope.row)"></span>
					           	   <span class="btns delete" @click="deleteDialog(scope.row.id)"></span>
					           </div>
					           <div v-else-if="scope.row.checkStatus == 2">
					                <span class="imgScript success"></span>
					           	   已通过
					           	   	  <el-tooltip :content="scope.row.isopen == '1' ? '关闭':'开启'" placement="top">
						           	   		<el-switch
										  v-model="scope.row.isopen"  on-text=""  off-text="" on-value="1" off-value="2" :width="30"  @change="statusChange(scope.row)">
									      </el-switch>
								      </el-tooltip>
					          	 </div>
						           <div style="padding-top:3px;">
						           		<span class="imgScript seeBtn" @click="seeDetial(scope.row.id)"></span> 
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
	<initat-workflow :editorForm="form" @closeDialog="close" @saveForm="close"></initat-workflow>
	<!--查看工作流详情-->
    <div class="imgBox">
			<el-dialog title="查看工作流" :visible.sync="seeForm.dialogFormVisible"  custom-class="dialogImg" @close="closeDialog()">
				<div class="workFlowContent">
					<div class="workFlowLeft">
						<div class="workType" style="margin-bottom:10px;">
							{{seeForm.workType == '2'? '学生请假': '老师请假'}}类型
						</div>	
						<div class="workTypes auditCon">
							<!--工作流-->
			    			<div class="auditConLeft">
			    				<span class="start" style="margin-bottom:8px;">开始</span>
			    			</div>
			    			<ul class="auditConCenter">
			    				<li v-for="(item, index) in seeForm.workFlows" :id="index" class="auditLi">
			    					<span class="start colorF">{{ item.name }}</span><i class="arrows"></i>
			    					<span class="dragEndBox">
			    						<my-card v-for="obj in item.addDom" :key="index" :data="obj.data" :dom="obj.dom"></my-card>
			    					</span>
			    					<span class="start">{{ item.end }}</span>
			    				</li>
			    			</ul>
			    		</div>						
					</div>
					<div class="workFlowRight">
					    <h4>流程条件设置</h4>
	 					<dl class="conditionDl" v-for="(item, index) in seeForm.conditions">
						<dt>{{ '条件'+ (index +1)}}</dt>
						<dd class="flexBox">
							<span class="inputBox">{{ item.condition.pref }}</span>
							<span class="inputBox">{{ seeArr[item.condition.symOne] }}</span>
							<span class="inputTextTip">请假天数</span>
							<span class="inputBox">{{ seeArr[item.condition.symTwo] }}</span>
							<span class="inputBox">{{ item.condition.suf }}</span>
						    <span style="display:inline-block;line-height:36px;"> 天</span>
						</dd>
				    </dl> 				    
					</div>
				</div>
			</el-dialog>
	    </div>		   
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import initatWorkflow from './initiatWorkflow.vue'
	import api from '../../apis/campusOffice.js'
	import myCard from '../campusOffice/addDomWorkFlow.vue'
	var arr = ['','＜','≤','=','＞','≥']
	export default {
		data () {
			return {
				formInline:{
				    currentPage: 1,
				    size: 10,
				    campus: '',
				    workType: '',
				    checkStatus: ''
				},
				tableData: [],
				form: {
					dialogFormVisible: false,
					campusRegion: '',
					workType: '',
					conditions: [],
		   			workFlows:[],
		   			campusList:[]					
				},
				campusList: [],
				editorForm: {
					dialogFormVisible: false,
					workType: '',
					id: '',
					workFlows: [],
					conditions:[]					
				},
				seeForm:{
					dialogFormVisible: false,
					workType: '',
					campus: '',
					id: '',
					workFlows: [],
					conditions:[]						
				},
				seeArr: arr,
				title:'工作流'
			}
		},
		components: {
			fcHeader,
			initatWorkflow,
			myCard,
			returnBar
		},
		methods:{
			handleCurrentChange(curPage) {
				this.formInline.currentPage = curPage
				this.getWorkFlowList()
			},
			editorDialog (obj) {
				var id = obj.id
				//id = '0f42752548b84477b23d49e0ab97f011'
				var _this = this
				api.editorWorkFlow({pid: id}).then(response =>{
					if(response) {
						var data = response.data.data
						_this.form.workType = data.prodef.flowType
						_this.form.campusRegion = data.prodef.campusRegion
						var subflow = data.subflow;
						var arr1 = [];
						var arr2 = [];
						for(let data in subflow){
							arr1.push(data);
							arr2 = arr2.concat(subflow[data]);
						}
						console.log(arr2)
						console.log('----------------')
	                    var newArr1 = []
						var newArr2 = []
						for(let i = 0, len = arr1.length; i < len; i++) {
							var obj = JSON.parse(arr1[i])
							console.log(obj)
							newArr1.push({id: obj.id,condition: {'pref':obj.dayFrom,'suf': obj.dayTo,'symOne': obj.comparisonFrom,'symTwo': obj.comparisonTo}})
							newArr2.push({'name':'流程'+(i+1),'addDom': [],'end':'结束',over:false,id: obj.id})
						}
						for(let j = 0, len = arr2.length; j < len; j++) {
							var arr2Id = arr2[j].subflowId
							console.log(arr2[j])
							console.log('++++++++')
							var  isExist = false;
							for(let k = 0, len = newArr2.length; k < len; k++) {
								var newArr2Id = newArr2[k].id
								console.log(newArr2Id)
								console.log('++++++++')
								if(newArr2Id == arr2Id) {
									console.log(isExist)
									isExist = true;
									newArr2[k].addDom.push({
										data: arr2[j].subflowId,
										dom: arr2[j].nodeRoleName,
										flag: true
									});
									continue;
								}
							}
						}
						console.log(newArr2)
						this.form.conditions = newArr1.reverse()
						this.form.workFlows = newArr2
						this.form.dialogFormVisible = true	
					}
				})
			},
			jsonContact () {},
			deleteDialog (id) {
				var _this = this
				 this.$confirm('你确认删除吗？').then(()=>{
				 	var obj = {
				 		id: id
				 	}
				 	api.delWorkFlow(obj).then(response =>{
				 		if(response) {
				 			_this.$message({
				 				type:'success',
				 				message: '删除成功'
				 			})
				 			_this.getWorkFlowList()
				 		}
				 	})
				 }).catch(()=>{})
			},
			absence () {
				this.form.dialogFormVisible = true;
			},
			close () {
				this.form.dialogFormVisible = false;
				this.form.campusRegion = ''
				this.form.workType = ''
				this.form.conditions = []
				this.form.workFlows = []
				this.getWorkFlowList()
			},
			getWorkFlowList () {
				var _this = this
				var data = {
					pageNum: this.formInline.currentPage,
					campusRegion: this.formInline.campus,
					workType: this.formInline.workType,
					checkStatus:this.formInline.checkStatus
				}
				var formData = new FormData()
				formData.append('pageNum',data.pageNum)
				formData.append('campusRegion',data.campusRegion)
				formData.append('workType',data.workType)
				formData.append('checkStatus',data.checkStatus)
				api.getWorkList(formData).then(response =>{
					if(response) {
						var data = response.data.data
						_this.tableData = data
					}
					formData.delete('pageNum')
					formData.delete('campusRegion')
					formData.delete('workType')
					formData.delete('checkStatus')
				})
			},
			statusChange (obj) {
				var id = obj.id
				var openStatus = obj.openStatus == '1'? '2': '1'
				var formData = new FormData();
				var _this = this
				 api.openOrNo({pid: id,openStatus: openStatus}).then(response =>{
				 	if(response) {
				 		// _this.getWorkFlowList()
				 	}
				 })
			},
			getCampus() {
				var _this = this
				api.getCampus().then(response =>{
					if(response) {
						_this.campusList = response.data.data
						_this.form.campusList = response.data.data
					}
				})
			},
			returnBtn () {
				this.$router.push('/counsellorIndex')
			},
			seeDetial (id) {
				var _this = this
				api.editorWorkFlow({pid: id}).then(response =>{
					if(response) {
						var data = response.data.data
						_this.seeForm.workType = data.prodef.flowType
						_this.seeForm.campus = data.prodef.campusName
						var subflow = data.subflow;
						var arr1 = [];
						var arr2 = [];
						for(let data in subflow){
							arr1.push(data);
							arr2 = arr2.concat(subflow[data]);
						}
	                    var newArr1 = []
						var newArr2 = []
						for(let i = 0, len = arr1.length; i < len; i++) {
							var obj = JSON.parse(arr1[i])
							console.log(obj)
							newArr1.push({id: obj.id,condition: {'pref':obj.dayFrom,'suf': obj.dayTo,'symOne': obj.comparisonFrom,'symTwo': obj.comparisonTo}})
							newArr2.push({'name':'流程'+(i+1),'addDom': [],'end':'结束',over:false,id: obj.id})
						}
						for(let j = 0, len = arr2.length; j < len; j++) {
							var arr2Id = arr2[j].subflowId
							console.log(arr2[j])
							console.log('++++++++')
							var  isExist = false;
							for(let k = 0, len = newArr2.length; k < len; k++) {
								var newArr2Id = newArr2[k].id
								console.log(newArr2Id)
								console.log('++++++++')
								if(newArr2Id == arr2Id) {
									console.log(isExist)
									isExist = true;
									newArr2[k].addDom.push({
										data: arr2[j].subflowId,
										dom: arr2[j].nodeRoleName,
										flag: true
									});
									continue;
								}
							}
						}
						this.seeForm.conditions = newArr1.reverse()
						this.seeForm.workFlows = newArr2
						console.log(this.seeForm.conditions)
						this.seeForm.dialogFormVisible = true	
					}
				})
			},
			closeDialog() {
				this.editorForm.dialogFormVisible = false
			}
		},
		computed:{
			seeSym (num) {
				return 'num'
			}
		},
		mounted () {
			// 获取工作流列表页面的数据
			this.getWorkFlowList()
			// 获取校区的列表页
			this.getCampus()
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../common/css/common.scss';
	.content .sLeave-top .sLeave_title{
		width:50px;
	}
	.demo-form-inline{
		height:50px;
	}
	.select_width{
		width:120px;
	}
	.label{
		color:#333;
		padding:0 8px;
	}
	.btnS{
		color:#208af5;
		margin-left:24px;
	}
	.widthed{
		width: 130px;
	}
	.box{
	  display:flex;
    }
.workFlowContent{
		display:flex;
		.workFlowLeft{
			padding: 10px;
			min-height:430px;
			min-width:560px;
			margin-right:38px;
		}
		.workFlowRight{
			min-width:220px;
			padding: 12px 18px;
			min-height:430px;
			background:#eef1f6;
			box-sizing:border-box;
		}
	}	
	.workFlow{
		display:flex;
		h4{
			font-weight:normal;
			color:#262626;
			width:60px;
			text-align:center;

		}
	}
	.workTypes{
		min-height:480px;
		background:#eef1f6;
		width:100%;
	}
.auditCon{
		min-height:263px;
		min-width:560px;
		background:#eef1f6;
		border-radius:5px;
		display:flex;
		padding:10px;
		.auditConLeft{
			width:87px;
			min-height:263px;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
		}
	}
	.btnSWork{
		color:#208af5;
		font-size:14px;
	}	
	.start{
		display:inline-block;
		width:59px;
		height:32px;
		background:#bfcbd9;
		border-radius:5px;
		line-height:32px;
		text-align:center;
	}
	.conditionDl{
		display:flex;
		margin-bottom:10px;
		dt{
			width:60px;
			line-height:32px;
		}
		.flexBox{
			min-width:220px;
		}
	}
	.dragEndBox{
		min-width:20px;
		display:flex;
		height:32px;
		padding-right:10px;
		.listItem{
			margin: 0 20px;
		}
	}
	.drag{
		padding: 4px 3px;
		border:1px dashed #ccc;
		border-radius: 5px;
	}
	.dragIng{
		border:2px dashed #333;
	}
	.auditConCenter{
		flex:1;
		display:flex;
		align-items:center;
		flex-direction:column
	}
	.auditLi{
		display:flex;
		margin-bottom:15px;
	}
	.listItem{
			padding: 1px 3px;
			border:1px solid #bfcbd9;
			border-radius:5px;
			margin: 0 10px 5px 0;
			.itemImg{
				width:12px;
				height:12px;
				img{
					width:12px;
				}
			}

	}
		i.arrows{
			display:inline-block;
			width:16px;
			height:13px;
			margin: 0 5px;
			margin-top:8px;
			background:url(../../assets/img/connet/arrow.png) no-repeat;
	    }	
	.colorF{
		background:#fff;
	}	
	.inputTextTip{
		display: inline-block;
		color:#333;
		font-size:12px;
		line-height:30px; 
		width:60px;
	}	    
</style>
<style type="text/css" lang="scss">
	.imgBox{
		.el-dialog--small{
			width:auto;
		}
	}
	.textarea{
		textarea{
			border:none;
		}
	}
</style>