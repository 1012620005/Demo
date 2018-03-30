<template>
	<div>
	   <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-bottom:10px;">
		<div class="fontColor label_padding">校区:</div>
		<el-select v-model="formInline.campus" placeholder="选择校区" style="width:80px;margin-right:10px;">
            <el-option label="106" value="106"></el-option>
            <el-option label="107" value="107"></el-option>
        </el-select>
		<el-date-picker v-model="formInline.loadTime" type="datetime"placeholder="选择开始时间"class="label_time">
	    </el-date-picker>  
	    <el-date-picker v-model="formInline.loadTime" type="datetime" placeholder="选择结束时间" class="label_time">
		</el-date-picker>
		<!-- <el-button type="primary" @click="onSubmit" class="label_padding" >查询</el-button>	 -->
		<div class="fontColor label_padding">流转对象:</div>
		<el-select v-model="formInline.OfficeObejct" placeholder="选择流转对象" style="width:100px;margin-right:10px;">
            <el-option label="106" value="106"></el-option>
            <el-option label="107" value="107"></el-option>
        </el-select>		
		<el-input placeholder="请输入关键字" v-model="formInline.keyword" class="label_time">
			<i slot="suffix" class="el-input__icon el-icon-search"></i>
		</el-input> 
	</el-form>
    <el-table
				    :data="tableData"
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
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				formInline: {
					loadTime: '',
					keyword: '',
					OfficeObejct: ''
				},
				tableData: [],
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
					OfficeFile: ''
				},
				rules: {
					campus:[
						{ required: true, message: '请选择校区', trigger: 'change'}
					],
					OfficeObejct: [
						{ required: true, message: '请选择下发对象', trigger: 'change'}
					],
					OfficeTitle: [
						{ required: true, message: '请填写公文标题', trigger: 'change'}
					],
					OfficeContent:[
						{ type:'string',required: true, message: '请填写公文内容', trigger: 'change'}
					],
					OfficeNote:[
						{ required: true, message: '请填写公文备注', trigger: 'change'}
					],
					OfficeFile:[
						{ required: true, message: '请上传附件', trigger: 'change'}
					]
				}
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
			closeDialog (form) {

			},
			successDialog (form) {

			}

		}
	}	
</script>
<style type="text/css" lang="scss"></style>