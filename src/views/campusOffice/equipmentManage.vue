<template>
	<div class="container">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title" style="width:100px;">设备报修管理</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn" @click="returnBtn">返回</span>
				</div>
			</div> -->
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				 <el-form :inline="true" :model="formInline" class="demo-form-inline">
                     <div  class="fontColor label_padding">校区:</div>
				 	 <el-select v-model="formInline.campus" placeholder="校区" clearable  @change="getEquipList">
                             <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.campusList"></el-option>
                    </el-select>
                    <div  class="fontColor label_padding">处理状态:</div>
				 	 <el-select v-model="formInline.handleStatus" placeholder="处理状态" clearable @change="getEquipList">
                             <el-option label="待处理" value="1"></el-option>
                             <el-option label="已处理" value="2"></el-option>
                    </el-select> 
					<!-- <el-date-picker
							      v-model="formInline.startTime"
							      type="date"
							      placeholder="开始时间" class="label_time" style="width:150px">
					</el-date-picker>
					<el-date-picker
							      v-model="formInline.endTime"
							      type="date"
							      placeholder="结束时间" class="label_time" style="width:150px">
					</el-date-picker> --> 
				    <div class="export btnS">
				    	<span class="imgScript print"></span>
				    	<span class="export_title fontColor paddingRight">打印</span>
				    </div>                     
				 </el-form>	
				 				 <el-table
                 	fit
				    :data="tableData"
				    style="margin: 0 16px 0 24px;width:1160px;">
				    <el-table-column
				      type="index"
				      label="序号" width="80">
				    </el-table-column>
				    <el-table-column
				      prop="campusName"
				      label="校区" width="150" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="applierName"
				      label="提交人员" width="150" show-overflow-tooltip>
				    </el-table-column>				    
				    <el-table-column
				      prop="repairStatus"
				      label="报修情况" show-overflow-tooltip width="150">
				    </el-table-column>
				    <el-table-column
				      prop="address"
				      label="地点"  width="150" show-overflow-tooltip>
				    </el-table-column>				    
				    <!-- <el-table-column
				      label="图片" prop="repairImg" width="150" show-overflow-tooltip >
				    </el-table-column> -->
					    <!-- <template scope="scope">
					    		<img :src="scope.row.repairImg" class="imgBox"/>
				    	{{ scope.row.repairImg }}
					    </template> -->
				    <el-table-column
				      prop="approveTime"
				      label="报修时间" width="100" show-overflow-tooltip>
				    </el-table-column>	
				    <el-table-column
				      label="维修人员" width="150" show-overflow-tooltip>
					      <template slot-scope="props">
					      	  <div v-if="props.row.handleStatus == 1">
					      	  	   <el-button  type="text" class="serviceManEditor cursor" @click="serviceEditor(props.row)">请输入维修人员</el-button>
					      	  </div>
					      	  <div v-else>
					      	  	  {{ props.row.repairmanName}}
					      	  </div>
					      </template>
				    </el-table-column>				    			     
				    <el-table-column
				      label="处理状态"  min-width="180">
				       <template slot-scope="props">
				             <div v-if="props.row.handleStatus == 1">
				             	<span class="imgScript shenhe"></span>
				             	待处理
				             </div>   
				             <div v-else>
				             	<span class="imgScript success"></span>
				             	已处理
				             </div>   	           				           
				      </template>
				    </el-table-column>				    			    			    
				  </el-table>	
                <div class="con_left_tab_con_page">
                	<el-pagination
					      @current-change="handleCurrentChange"
					      :current-page.sync="currentPage"
					      :page-size="10"
					      layout="prev, pager, next, jumper"
					      :total="size">
    				</el-pagination>
                </div>					  				 				
			</div>		
		</div>
	    <enter-equipment :form="form" @submitBox="commitName"></enter-equipment>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import enterEquipment from './enterEquipment.vue'
	import commonApi from '../../apis/common.js'
	import apis from '../../apis/equipRepairManage.js'	
	export default {
		data () {
			return {
				formInline:{
					keyword: '',
					campusList:[],
					campus:'',
					handleStatus: ''
				},
				currentPage: 1,
				size: 1,
				tableData:[],
				form:{
					dialogFormVisible: false,
				    id: '',
				    repairName: ''
				},
				title: '设备报修管理'
			
			}
		},
		components:{
			fcHeader,
			enterEquipment,
			returnBar
			// seeClassNote
		},
		methods:{
			handleCurrentChange (val) {
				this.currentPage = val
				this.getEquipList()
			},
			serviceEditor (obj) {
				this.form.dialogFormVisible = true
				this.form.id = obj.id
			},
			getCampusList () {
				var _this = this
				commonApi.getCampus().then(response =>{
					if(response) {
						var data = response.data.data
						_this.formInline.campusList = data
					}
				})				
			},
			getEquipList () {
				var pageNum = this.currentPage;
				var campus = this.formInline.campus;
				var handleStatus = this.formInline.handleStatus
				var _this = this
				var formData = new FormData()
				formData.append('pageNum',pageNum)
				formData.append('campusRegion',campus)
				formData.append('handleStatus',handleStatus)
				apis.queryEquipList(formData).then(response =>{
					if(response) {
						var data =response.data.data
						console.log(data)
						_this.tableData = data.list
						_this.size = data.totalSize
					}
					formData.delete('pageNum')
					formData.delete('campusRegion')
					formData.delete('handleStatus')
				})
			},
			commitName() {
				this.form.dialogFormVisible = false
				this.form.id = ''
				this.form.repairName = ''
				this.getEquipList()
			}
		},
		mounted () {
			// 获取校区的接口
			this.getCampusList ()
			// 获取所有的申请报修的列表
			this.getEquipList ()
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../common/css/common.scss';
</style>