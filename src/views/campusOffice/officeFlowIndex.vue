<template>
	<div>
	<el-form :inline="true" :model="formInline" class="demo-form-inline" style="height:50px;">
		<div class="fontColor label_padding">校区:</div>
		<el-select v-model="formInline.campus" placeholder="选择校区" clearable   style="width:180px;margin-right:10px;" @change="getOfficeList">
            <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.campusList"></el-option>
        </el-select>
		<el-date-picker v-model="formInline.startTime" type="date"placeholder="选择开始时间"class="label_time" @change="getOfficeList">
	    </el-date-picker>  
	    <el-date-picker v-model="formInline.endTime" type="date" placeholder="选择结束时间" class="label_time" @change="getOfficeList">
		</el-date-picker>
		<el-input placeholder="请输入老师姓名" v-model="formInline.keyword" class="label_time" @blur="getOfficeList">
			<i slot="suffix" class="el-input__icon el-icon-search"></i>
		</el-input> 
	</el-form>
	<div class="demo-form-inline">
		<div  class="btnS" @click="absence" style="cursor:pointer"><span class="btn qingjia"></span>创建公文</div>
		 <div class="export btnS" style="cursor:pointer">
				    	<span class="imgScript exporticon"></span>
				    	<span class="export_title fontColor paddingRight">导出</span>
				    	<span class="imgScript print "></span>
				    	<span class="export_title fontColor paddingRight">打印</span>
		</div> 
	</div>
    <el-table
				    :data="tableData"
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
				      prop="createTime"
				      label="下发时间" width="200">
				    </el-table-column>
				    <el-table-column
				      label="备注" width="100">
				       <template slot-scope="scope">
						   <span class="textCal">{{ scope.row.remark }}</span>
					    </template>
				    </el-table-column>	
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
					      <span class="imgScript seeBtn" @click="seeDetial(scope.row)" style="cursor:pointer"></span>
					     <!--  <span class="btns editor" @click="editorDialog(scope.row)"></span> -->
					      <span class="btns delete" @click="deleteDialog(scope.row.id)" style="cursor:pointer"></span>
				      </template>
				    </el-table-column>				    			    			    
	</el-table>
	<div class="con_left_tab_con_page">
	    <el-pagination      
			@current-change="handleCurrentChange"
			:current-page.sync="formInline.currentPage"
			:page-size="10"
			layout="prev, pager, next, jumper"
			:total="formInline.size">
	    </el-pagination>
    </div>
    <editor-office-flow :editorForm="form" @successDialog="clearEditorForm" @closeDialog="clearEditorForm"></editor-office-flow>
    <see-office-flow :form="seeForm" @closeDialog="clearseeForm" @successDialog="clearseeForm"></see-office-flow>
</div>			
</template>
<script type="text/javascript">
    import seeOfficeFlow from '../common/seeOfficeFlow.vue'
    import editorOfficeFlow from './editorOfficeFlow.vue'
    import apis from '../../apis/officeWork.js'
	import commonApis from '../../apis/common.js'
	import util from '../../common/js/util.js'
	export default {
		data () {
			return {
				formInline: {
					loadTime: '',
					keyword: '',
					OfficeObejct: '',
				    currentPage: 1,
				    size: 6,
				    campus: '',
				    campusList:[],
				    officeObjectList:[]
				},
				tableData: [],
				dialogFormVisible: false,
				editLoading: false,
				form:{
					id: '',
					campus: '',
					OfficeObejct: '',
					OfficeTitle: '',
					OfficeContent: '',
					OfficeNote: '',
					OfficeFile: '',
					dialogFormVisible: false,
					dialogTitle: '新增公文',
					campusList:[],
					selectBoxList:[]
				},
				seeForm: {
					id: '',
	 				campusRegionName: '',
	 				receiverName:'',
	 				officeObjectList:[],
	 				OfficeTitle: '',
	 				OfficeContent: '',
	 				OfficeNote: '',
	 				OfficeFile: '',
	 				OfficeFlow: false,
	 				visible: false,
	 				isOffice: true
				}
			}
		},
		methods:{
			onSubmit () {
				
			},
			handleCurrentChange (curPage) {
				this.formInline.currentPage = curPage
				this.getOfficeList()
			},
			absence () {
				this.form.dialogFormVisible = true
				this.form.dialogTitle = '新增公文'
			},
			seeDetial(obj) {
				this.seeForm.id = obj.id
				var formData = new FormData();
				var _this = this
				formData.append('oid',obj.id);
				apis.jumperOfficeWorkPage(formData).then(response =>{
					if(!response) {
						return false
					}
					if(response.data.meta.code == 200) {
						var data = response.data.data
						_this.seeForm.campusRegionName = data.od.campusRegionName
						_this.seeForm.OfficeObejct = data.user
						_this.seeForm.OfficeContent = data.od.content
						_this.seeForm.OfficeNote = data.od.remark
						// _this.seeForm.OfficeFile = data.od.OfficeFile
						_this.seeForm.OfficeTitle = data.od.title
						_this.seeForm.receiverName = data.od.receiverName
						_this.seeForm.visible = true
						_this.seeForm.isOffice = true							
					}
					formData.delete('oid')
				})
			},
			clearseeForm () {
				this.seeForm.visible = false
				this.seeForm.id = ''
				this.seeForm.campus = ''
				this.seeForm.OfficeObejct = ''
				this.seeForm.OfficeContent = ''
				this.seeForm.OfficeNote = ''
				this.seeForm.OfficeFile = ''
				this.seeForm.OfficeTitle = ''
			},
			clearEditorForm () {
				this.form.id = ''
				this.form.campus = '',
				this.form.OfficeObejct = ''
				this.form.OfficeTitle = ''
				this.form.OfficeContent = ''
				this.form.OfficeNote = ''
				this.form.OfficeFile = ''
				this.form.dialogFormVisible = false
				this.form.dialogTitle = ''
				this.getOfficeList()
			},
			// editorDialog (obj) {
			// 	this.form.id = obj.id
			// 	var formData = new FormData()
			// 	formData.append('oid',obj.id)
			// 	var _this = this
			// 	apis.apis.jumperOfficeWorkPage(formData).then(response =>{
			// 		if(response.data.meta.code == 200) {
			// 			var data = response.data.data
			// 			_this.form.campus = data.campus
			// 	        _this.form.OfficeObejct = data.OfficeObejct
			// 	        _this.form.OfficeContent = data.OfficeContent
			// 	        _this.form.OfficeNote = data.OfficeNote
			// 	        _this.form.OfficeFile = data.OfficeFile
			// 	        _this.form.OfficeTitle = data.OfficeTitle	
			// 	        _this.form.dialogFormVisible = true
			// 	        _this.form.dialogTitle = '编辑公文'
			// 		}	
			// 	})
				
			// },
			getOfficeList () {
				var pageNum = this.formInline.currentPage;
				var campus = this.formInline.campus;
				var startTime = this.formInline.startTime ? util.formatDate.format(this.formInline.startTime, 'yyyy-MM-dd') : '';
				var endTime = this.formInline.endTime ? util.formatDate.format(this.formInline.endTime,'yyyy-MM-dd'): '';
				var keyword = this.formInline.keyword;
				var _this = this
				var formData  = new FormData()
				formData.append('pageNum',pageNum)
				formData.append('campusRegion',campus)
				formData.append('startTime',startTime)
				formData.append('endTime',endTime)
				apis.getOfficeList(formData).then(response =>{
					if(!response) {
						return false
					}
					if(response.data.meta.code == 200) {
						var data = response.data.data
						_this.formInline.size = data.totalSize
						_this.tableData = data.list
					}
					formData.delete('pageNum')
					formData.delete('campusRegion')
					formData.delete('startTime')
					formData.delete('endTime')
				})
			},
			deleteDialog (id) {
				this.$confirm('你确定要删除?').then(() => {
					var _this = this
					var formData = new FormData()
					formData.append('oid',id)
			          apis.deleteOfficeWork(formData).then(response => {
			          	 if(!response) {
						    return false
					     }
			          	 var code = response.data.meta.code
			          	 console.log(response.data.meta.code)
			          	 if (code === '200') {
			          	 	this.$message({
					            type: 'success',
					            message: '删除成功!'
			          		})
			          		this.getOfficeList()
			          	 }
			          	 formData.delete('oid')
			          })
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
        			})
			},
			getCampusList () {
				var _this = this
				apis.getCampus().then(response =>{
					if(!response) {
						return false
					}
					if(response.data.meta.code == 200) {
						var data = response.data.data;
						_this.formInline.campusList = data
						_this.form.campusList = data

					}
				})
			},
			getTeachList () {
				var _this = this
				apis.getAllObject().then(response =>{
					if(!response) {
						return false
					}
					if(response.data.meta.code == 200) {
						var data = response.data.data
						_this.formInline.officeObjectList = data
						_this.form.selectBoxList = data
						_this.seeForm.officeObjectList = data
					}
				})
			}			
		},
		components:{
			seeOfficeFlow,
			editorOfficeFlow
		},
		mounted () {
			this.getOfficeList()
			this.getCampusList()
			this.getTeachList()
		}
	}
</script>
<style type="text/css" lang="scss">
	@import '../../common/css/common.scss';
</style>