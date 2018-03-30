<template>
	<div class="container">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title">接收公文</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn" @click="returnBtn">返回</span>
				</div>
			</div> -->	
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				<el-form :inline="true" :model="formInline" class="demo-form-inline" style="height:50px;">
					<div class="fontColor label_padding">校区:</div>
					<el-select v-model="formInline.campus" placeholder="选择校区" clearable  style="width:180px;margin-right:10px;" @change="getOfficeList">
			           <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.campusList"></el-option>
			        </el-select>
					<el-date-picker v-model="formInline.startTime" type="date"placeholder="选择开始时间"class="label_time" @change="getOfficeList">
				    </el-date-picker>  
				    <el-date-picker v-model="formInline.endTime" type="date" placeholder="选择结束时间" class="label_time" @change="getOfficeList">
					</el-date-picker>
					<el-input placeholder="请输入姓名" v-model="formInline.keyword" class="label_time" @blur="getOfficeList">
						<i slot="suffix" class="el-input__icon el-icon-search"></i>
					</el-input> 
				</el-form>	
			    <el-table
							    :data="tableData"
							    v-loading.body="loadTab" element-loading-text="拼命加载中..."
							    style="margin: 0 16px 0 24px;width:1160px;">
							    <el-table-column
							      type="index"
							      label="序号" width="80">
							    </el-table-column>
							    <el-table-column
							      label="校区">
							      	<template slot-scope="scope">
						   				<span class="textCal">{{ scope.row.campusRegionName }}</span>
					    			</template>
							    </el-table-column>
							    <el-table-column
							      label="公文标题" width="150">
								      <template slot-scope="scope">
							             <span class="textCal">{{ scope.row.title }}</span>
						              </template>
							    </el-table-column>				    
							    <el-table-column
							      label="公文内容" width="150">
							      <template slot-scope="scope">
						              <span class="textCal">{{ scope.row.content }}</span>
					              </template>
							    </el-table-column>
							    <el-table-column
							      label="公文下发"  width="150">
							      <template slot-scope="scope">
						              <span class="textCal">{{ scope.row.receiverName }}</span>
					              </template>
							    </el-table-column>				    
							    <el-table-column
							      label="下发时间" width="150">
							       <template slot-scope="scope">
						              <span class="textCal">{{ scope.row.createTime }}</span>
					              </template>
							    </el-table-column>
							    <el-table-column
							      prop="remark"
							      label="备注" width="100">
							       <template slot-scope="scope">
						              <span class="textCal">{{ scope.row.remark }}</span>
					              </template>
							    </el-table-column>	
							    <el-table-column
							      label="操作">
							      <template slot-scope="scope">
								      <span class="imgScript seeBtn cursor" @click="seeDetial(scope.row)"></span>
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
	    <see-office-flow :form="form" @closeDialog="clearseeForm" @successDialog="clearseeForm"></see-office-flow>
	</div>
</template>
<script type="text/javascript">
    import fcHeader from '../common/header.vue'
    import returnBar from '../common/returnBar.vue'
    import seeOfficeFlow from '../common/seeOfficeFlow.vue'
    import apis from '../../apis/officeWork.js'
	import commonApis from '../../apis/common.js'
	import util from '../../common/js/util.js'
	export default {
		data () {
			return {
				formInline: {
					keyword: '',
					OfficeObejct: '',
					campusList:[],
					campus:'',
					startTime:'',
					endTime:''
				},
				tableData: [],
				currentPage: 1,
				size: 1,
				dialogFormVisible: false,
				seeDialogVisible: false,
				labelPosition: 'right',
				dialogTitle: '新建公文',
				editLoading: false,
				btnEditText: '提交',
				form:{
					id: '',
					campusRegionName: '',
					OfficeTitle: '',
					OfficeContent: '',
					OfficeNote: '',
					OfficeFile: '',
					receiverName: '',
					visible: false,
					isOffice: false,
					OfficeFlow: true
				},
				loadTab: false,
				title:'接收公文'
			}
		},
		methods:{
			handleCurrentChange (curPage) {
				this.currentPage = curpage
				this.getOfficeList()
			},
			absence () {
				this.dialogFormVisible = true
			},
			clearseeForm () {
				this.form.id = ''
				this.form.campus = ''
				this.form.OfficeTitle = ''
				this.form.OfficeContent = ''
				this.form.OfficeNote = ''
				this.form.OfficeFile = ''
				this.form.OfficeFlow = false				
				this.form.visible = false
			},
			seeDetial (obj) {
				this.form.id = obj.id
				var formData = new FormData()
				var _this = this
				formData.append('oid',obj.id)
				apis.jumperOfficeWorkPage(formData).then(response =>{
					if(response) {
						var data =response.data.data.od
						_this.form.campusRegionName = obj.campusRegionName
						_this.form.OfficeTitle = obj.title
						_this.form.OfficeContent = obj.content
						_this.form.OfficeNote = obj.remark
						_this.form.OfficeTitle = data.title
						// _this.form.OfficeFile = obj.OfficeFile
						_this.form.receiverName = data.receiverName
						_this.form.visible = true						
					}
					formData.delete('oid')
				})

			},
			getOfficeList () {
				var pageNum = this.currentPage;
				var campus = this.formInline.campus;
				var keyword = this.formInline.keyword;
				var startTime = this.formInline.startTime ? util.formatDate.format(this.formInline.startTime, 'yyyy-MM-dd'): ''
				var endTime = this.formInline.endTime ? util.formatDate.format(this.formInline.endTime,'yyyy-MM-dd') : ''
				var formData = new FormData ();
				var _this = this
				formData.append('pageNum',pageNum)
				formData.append('campusRegion',campus)
				formData.append('startTime',startTime)
				formData.append('endTime',endTime)
				apis.getOfficeWorkList(formData).then(response =>{
					if(response) {
						var data = response.data.data
						_this.tableData = data.list
						_this.size = data.totalSize
					}
					formData.delete('pageNum')
					formData.delete('campusRegion')
					formData.delete('startTime')
					formData.delete('endTime')					
				})
			},
			getCampusList () {
				var _this = this
				commonApis.getCampus().then(response =>{
					if(response) {
						var data = response.data.data;
						_this.formInline.campusList = data
					}
				})
			}
		},
		components:{
			seeOfficeFlow,
			fcHeader,
			returnBar
		},
		mounted () {
		   this.getOfficeList()
		   this.getCampusList()
		}
	}	
</script>
<style type="text/css" lang="scss">
	@import '../../common/css/common.scss';
</style>