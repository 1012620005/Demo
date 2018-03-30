<template>
	<div class="container">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title">申请报修</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn" @click="returnBtn">返回</span>
				</div>
			</div> -->
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				 <el-form :inline="true" :model="formInline" class="demo-form-inline">
				 	  <div  class="btnS" @click="absence"><span class="btn qingjia"></span>申请报修</div>
                     <div  class="fontColor label_padding">校区:</div>
				 	 <el-select v-model="formInline.campus" placeholder="校区" clearable  @change="changeList">
                             <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.campusList"></el-option>
                    </el-select>
                    <div  class="fontColor label_padding">处理状态:</div>
				 	 <el-select v-model="formInline.requirStatus" placeholder="处理状态"clearable  @change="changeStatusList">
                             <el-option label="待处理" value="1"></el-option>
                             <el-option label="已处理" value="2"></el-option>
                            
                    </el-select>
				    <div class="export btnS">
				    	<span class="imgScript exporticon"></span>
				    	<span class="export_title fontColor paddingRight">导出</span>
				    	<span class="imgScript print "></span>
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
				      label="校区" width="150">
				    </el-table-column>
				    <el-table-column
				      prop="repairStatus"
				      label="报修情况" show-overflow-tooltip width="150">
				    </el-table-column>
				    <el-table-column
				      prop="address"
				      label="地点"  width="150">
				    </el-table-column>				    
				    <!-- <el-table-column
				      label="图片" prop="repairImg" width="150"show-overflow-tooltip >
				    </el-table-column> -->
					    <!-- <template slot-scope="scope">
					    		<img :src="scope.row.repairImg" class="imgBox"/>
				    	{{ scope.row.repairImg }}
					    </template> -->
				    <el-table-column
				      prop="approveTime"
				      label="报修时间" width="100" show-overflow-tooltip>
				    </el-table-column>	
				    <el-table-column
				      prop="repairmanName"
				      label="维修人员" width="100" >
					      <template slot-scope="scope">
					      	 <span v-if="scope.row.repairmanName">
					      	 	{{ scope.row.repairmanName }}
					      	 </span>
					      	 <span v-else class="daiding">待定</span>
					      </template>
				    </el-table-column>				    			     
				    <el-table-column
				      label="处理状态"  min-width="180">
				       <template slot-scope="scope">
				             <div v-if="scope.row.handleStatus == 1">
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
					      :page-size="6"
					      layout="prev, pager, next, jumper"
					      :total="size">
    				</el-pagination>
                </div>				  				 				
			</div>		
		</div>
		 <editor-equip-manage :form="form" @closeForm="resetForm" @submitForm="resetForm"></editor-equip-manage>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import editorEquipManage from './editorEquipManage.vue'
	import commonApi from '../../apis/common.js'
	import apis from '../../apis/equipRepairManage.js'
	export default {
		data () {
			return {
				formInline:{
					keyword: '',
					campusList:[],
					campus:'',
					requirStatus: ''
				},
				currentPage: 1,
				size: 1,
				tableData:[],
				form:{
					title: '',
					dialogFormVisible: false,
				    id: '',
					campus: '',
					repairSituation: '',
					repairPlace: '',
					repairImg: '',
					campusList:[]
				},
				title:'申请报修'
			}
		},
		components:{
			fcHeader,
			editorEquipManage,
			returnBar
			// seeClassNote
		},
		methods:{
			changeList (val) {
				this.getUserList(this.currentPage,val,this.formInline.handleStatus)
			},
			changeStatusList (val) {
				this.getUserList(this.currentPage,this.formInline.campus,val)
			},
			absence () {
				this.form.dialogFormVisible = true
				this.form.title = '申请报修'
			},
			handleCurrentChange (curPage) {
				this.getUserList(curPage)
			},
			resetForm () {
				this.form.dialogFormVisible = false
				this.form.title = ''
				this.form.id = ''
				this.form.campus = ''
				this.form.repairSituation = ''
				this.form.repairPlace = ''
				this.form.repairImg = ''
				this.getUserList()
			},
			getCampusList () {
				var _this = this
				commonApi.getCampus().then(response =>{
					if(response) {
						var data = response.data.data
						_this.formInline.campusList = data
						_this.form.campusList = data
					}
				})
			},
			getUserList (pageNum,campus,handleStatus) {
				pageNum = pageNum? pageNum : 1;
				campus =  campus? campus: '';
				handleStatus = handleStatus? handleStatus: '';
				var formData = new FormData()
				// var data = {
				// 	pageNum: pageNum,
				// 	campusRegion: campus,
				// 	handleStatus: handleStatus
				// }
				formData.append('pageNum',pageNum)
				formData.append('campusRegion',campus)
				formData.append('handleStatus',handleStatus)
				var _this = this
				apis.querymyList (formData).then(response =>{
					if(response) {
						var data = response.data.data
						_this.tableData = data.list
						_this.size = data.totalSize
					}
					formData.delete('pageNum')
					formData.delete('campusRegion')
					formData.delete('handleStatus')
				})
			},
			returnBtn () {
				this.$router.push('/counsellorIndex')
			}
		},
		mounted () {
			// 获取校区的接口
			this.getCampusList ()
			// 获取自己保修的列表页
			this.getUserList()
		}	

	}
</script>
<style type="text/css" lang="scss">
	@import '../../common/css/common.scss';
	.daiding{
		color:#b9b9b9;
	}
	.imgBox{
		width:100px;
	}
</style>