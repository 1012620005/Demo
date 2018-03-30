<template>
	<div class="container">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title" style="width:114px;">审核工作流设计</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn" @click="returnBtn">返回</span>
				</div>
			</div> -->
			<return-bar :title="title"></return-bar>
            <div class="sLeave-bottom">
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
					      label="校区" show-overflow-tooltip>
					    </el-table-column>
					    <el-table-column
					      prop="creatorName"
					      label="发起人">
					    </el-table-column>					    
					    <el-table-column
					      label="工作流类型">
					       <template slot-scope="scope">
					       		<span v-if="scope.row.flowType == '2'">学生请假</span>
					       		<span v-else>老师请假</span>
					       </template>
					    </el-table-column>
					    <el-table-column
					      prop="createDate"
					      label="发起时间">
					    </el-table-column>
					    <el-table-column
					      label="操作">
					       <template slot-scope="scope">
					           <div v-if="scope.row.checkStatus == '1'" class="cursor" @click="shenhe(scope.row)">
					               <span class="imgScript shenhe"></span>
					           	   待审核 	   
					           </div>
					           <div v-else-if="scope.row.checkStatus == '3'">
					               <span class="imgScript nosussess"></span>
					           	   未通过
					           </div>
					           <div v-else-if="scope.row.checkStatus == '2'">
					                <span class="imgScript success"></span>
					           	   已通过
					           	   
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
	<!-- <initat-workflow :editorForm="form" @closeDialog="close" @saveForm="close"></initat-workflow> -->	   <!--审核通过和不通过-->
		<div class="imgBox">
			<el-dialog title="审核工作流设计" :visible.sync="editorForm.dialogFormVisible"  custom-class="dialogImg" @close="closeDialog()">
				<div class="workFlowContent">
					<div class="workFlowLeft">
						<div class="workType" style="margin-bottom:10px;">
							{{editorForm.workType == '2'? '学生请假': '老师请假'}}类型
						</div>	
						<div class="workTypes auditCon">
							<!--工作流-->
			    			<div class="auditConLeft">
			    				<span class="start" style="margin-bottom:8px;">开始</span>
			    			</div>
			    			<ul class="auditConCenter">
			    				<li v-for="(item, index) in editorForm.workFlows" :id="index" class="auditLi">
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
	 					<dl class="conditionDl" v-for="(item, index) in editorForm.conditions">
							<dt>{{ '条件'+ (index +1)}}</dt>
							<dd class="flexBox">
								<span class="inputBox">{{ item.condition.pref }}</span>
								<span class="inputBox">{{ symArr[item.condition.symOne] }}</span>
								<span class="inputTextTip">请假天数</span>
								<span class="inputBox">{{ symArr[item.condition.symTwo] }}</span>
								<span class="inputBox">{{ item.condition.suf }}</span>
							    <span style="display:inline-block;line-height:36px;"> 天</span>
							</dd>
					    </dl>				    
					</div>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button type="success" @click="pass('2')">通 过</el-button>
					<el-button type="danger" @click="pass('3')" >不通过</el-button>
				</div>
			</el-dialog>
	    </div>
    </div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import api from '../../apis/campusOffice.js'
	import myCard from '../campusOffice/addDomWorkFlow.vue'
	var arr = ['','＜','≤','=','＞','≥']
	export default {
		data () {
			return {
				formInline:{
				    currentPage: 1,
				    size: 10,
				    endTime: '',
				    startTime: '',
				    vacateStatus: '',
				    vacateType: ''
				},
				tableData: [],
				editorForm: {
					dialogFormVisible: false,
					workType: '',
					id: '',
					workFlows: [],
					conditions:[]
				},
				symArr: arr,
				title:'审核工作流设计'
			}
		},
		components: {
			fcHeader,
			myCard,
			returnBar
		},
		methods:{
			handleCurrentChange(curPage) {
				this.formInline.currentPage = curPage
				this.getWorkFlowList(curPage)
			},
			close () {
				this.form.dialogFormVisible = false;
			},
			getWorkFlowList (curPage) {
				var _this = this
				var data ={
					pageNum: curPage ? curPage : 1
				}
				api.getAuditList(data).then(response =>{
					if(response) {
						var data = response.data.data
						_this.tableData = data
					}
				})
			},
			shenhe (obj) {
			    var id = obj.id;
			    this.editorForm.id = id
			    var  _this = this
			    // 渲染数据
			    api.editorWorkFlow({pid: id}).then(response =>{
					if(response) {
						var data = response.data.data
						_this.editorForm.workType = data.prodef.flowType
						_this.editorForm.campus = data.prodef.campus
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
							newArr1.push({id: obj.id,condition: {'pref':obj.dayFrom,'suf': obj.dayTo,'symOne': obj.comparisonFrom,'symTwo': obj.comparisonTo}})
							newArr2.push({'name':'流程'+(i+1),'addDom': [],'end':'结束',over:false,id: obj.id})
						}
						for(let j = 0, len = arr2.length; j < len; j++) {
							var arr2Id = arr2[j].subflowId
							var  isExist = false;
							for(let k = 0, len = newArr2.length; k < len; k++) {
								var newArr2Id = newArr2[k].id
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
						this.editorForm.conditions = newArr1.reverse()
						this.editorForm.workFlows = newArr2
						this.editorForm.dialogFormVisible = true	
					}
			    })
			},
			closeDialog () {

			},
			pass (str) {
				var _this = this
				api.passOrNoWorkFlow({pid: this.editorForm.id,checkStatus: str}).then(response =>{
					if(response) {
						_this.$message({
							type:'success',
							message: '审核完成'
						})
						_this.getWorkFlowList()
						_this.editorForm.dialogFormVisible = false
					}
				})
			},
			returnBtn () {
				this.$router.push('/counsellorIndex')
			}
		},
		mounted () {
			// 获取工作流列表页面的数据
			this.getWorkFlowList()
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