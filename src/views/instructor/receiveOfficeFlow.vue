<template>
	<div class="container">
		<fc-header></fc-header>
		<div class="content">
			<!-- <div class="sLeave-top">
				<div class="sLeave-top-left">
					<span class="sLeave_title">接收公文</span>
				</div>
				<div class="sLeave-top-right">
					<span class="return_btn">返回</span>
				</div>
			</div> -->	
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
				<el-form :inline="true" :model="formInline" class="demo-form-inline" style="height:50px;">
					<div class="fontColor label_padding">校区:</div>
					<el-select v-model="formInline.campus" placeholder="选择校区" style="width:80px;margin-right:10px;">
			            <el-option label="106" value="106"></el-option>
			            <el-option label="107" value="107"></el-option>
			        </el-select>
					<el-date-picker v-model="formInline.loadTime" type="datetime"placeholder="选择开始时间"class="label_time">
				    </el-date-picker>  
				    <el-date-picker v-model="formInline.loadTime" type="datetime" placeholder="选择结束时间" class="label_time">
					</el-date-picker>
					<el-button type="primary" @click="onSubmit" class="label_padding" >查询</el-button>	
					<div class="fontColor label_padding">流转对象:</div>
					<el-select v-model="formInline.OfficeObejct" placeholder="选择流转对象" style="width:100px;margin-right:10px;">
			            <el-option label="106" value="106"></el-option>
			            <el-option label="107" value="107"></el-option>
			        </el-select>		
					<el-input placeholder="请输入关键字" icon="search" v-model="formInline.keyword"class="label_time">
					</el-input> 
				</el-form>	
			    <el-table
							    :data="tableData"
							    v-loading.body="loadTab" element-loading-text="拼命加载中..."
							    style="margin: 0 16px 0 24px;width:1160px;">
							    <el-table-column
							      prop="id"
							      label="序号">
							    </el-table-column>
							    <el-table-column
							      prop="campus"
							      label="校区"  show-overflow-tooltip>
							    </el-table-column>
							    <el-table-column
							      prop="OfficeTitle"
							      label="公文标题" show-overflow-tooltip width="150">
							    </el-table-column>				    
							    <el-table-column
							      prop="OfficeContent"
							      label="公文内容" show-overflow-tooltip width="150">
							    </el-table-column>
							    <el-table-column
							      prop="OfficeObejct"
							      label="公文下发"  width="150">
							    </el-table-column>				    
							    <el-table-column
							      prop="loadTime"
							      label="下发时间" width="150" >
							    </el-table-column>
							    <el-table-column
							      prop="officeNote"
							      label="备注" show-overflow-tooltip width="100">
							    </el-table-column>	
							    <el-table-column
							      label="操作">
							      <template slot-scope="scope">
								      <span class="imgScript seeBtn" @click="seeDetial(scope.row)"></span>
							      </template>
							    </el-table-column>				    			    			    
				</el-table>
			<div class="con_left_tab_con_page">
			    <el-pagination
								      @size-change="handleSizeChange"
								      @current-change="handleCurrentChange"
								      :current-page.sync="currentPage"
								      :page-size="6"
								      layout="prev, pager, next, jumper"
								      :total="6">
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
	export default {
		data () {
			return {
				formInline: {
					loadTime: '',
					keyword: '',
					OfficeObejct: ''
				},
				tableData: [
					{
					   id: 1,
					   campus: '上地校区',
					   OfficeTitle: '不是都刚刚发的',
					   OfficeContent: '是的个地方古典风格发的好地方 大发光火',
					   OfficeObejct: '李I简单',
					   loadTime: '2017-09-15',
					   OfficeNote: '',
					   OfficeFlow: true
					},
					{
					   id: 2,
					   campus: '上地校区',
					   OfficeTitle: '22不是都刚刚发的',
					   OfficeContent: '是的个地方古典风格发的好地方是的风格大方发光火',
					   OfficeObejct: '李I简单',
					   loadTime: '2017-09-15',
					   OfficeNote: '',
					   OfficeFlow: false
					}					
				],
				currentPage: 1,
				size: 6,
				dialogFormVisible: false,
				seeDialogVisible: false,
				labelPosition: 'right',
				dialogTitle: '新建公文',
				editLoading: false,
				btnEditText: '提交',
				form:{
					id: '',
					campus: '',
					OfficeObejct: '',
					OfficeTitle: '',
					OfficeContent: '',
					OfficeNote: '',
					OfficeFile: '',
					visible: false,
					isOffice: false,
					OfficeFlow: ''
				},
				loadTab: false,
				title:'接收公文'
			}
		},
		methods:{
			onSubmit () {
			},
			handleSizeChange () {},
			handleCurrentChange () {},
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
				this.form.campus = obj.campus
				this.form.OfficeTitle = obj.OfficeTitle
				this.form.OfficeContent = obj.OfficeContent
				this.form.OfficeNote = obj.OfficeNote
				this.form.OfficeFile = obj.OfficeFile
				this.form.OfficeFlow = obj.OfficeFlow
				this.form.visible = true
			},
			getOfficeList () {
				
			}

		},
		components:{
			seeOfficeFlow,
			fcHeader,
			returnBar
		},
		mounted () {
		   this.getOfficeList()
		}
	}	
</script>
<style type="text/css" lang="scss">
	@import '../../common/css/common.scss';
</style>