<template>
	<div>
	    <!--编辑与修改公文-->
    <el-dialog :title="editorForm.dialogTitle" :visible.sync="editorForm.dialogFormVisible" size="small" custom-class="dialogImg" @close="closeDialog('editorForm')">
		  <el-form :model="editorForm" :rules="rules" ref="editorForm" id="editorForm" :label-position="labelPosition" enctype="multipart/form-data">
		     <el-form-item label="校区:" prop="campus">
		     	    <el-select v-model="editorForm.campus" placeholder="" @change="findCampusName">
				       <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in editorForm.campusList"></el-option>
    				</el-select>
		    </el-form-item>
		     <el-form-item label="公文下发:" prop="OfficeObejct" class="el-editor">
		     	    <!-- <el-input  v-model="editorForm.OfficeObejct" placeholder="选择下发公文的对象" style="width:auto;" :disabled="true"></el-input>  -->
		    		<span class="el_input">{{ editorForm.OfficeObejct }}</span>
			</el-form-item>	
		    <div class="selectOffice" style="height:100px;overflow-y:auto;">
			    <!-- <el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
			    <el-checkbox-group v-model="checkList"  @change="handleCheckedCitiesChange">
			     	<el-checkbox :label="item.name" :key="item.id" :value="item.id" v-for="item in editorForm.selectBoxList"></el-checkbox>
			    </el-checkbox-group>
		    </div>
		    <el-form-item label="公文标题:" prop="OfficeTitle" class="el-editor">
		    		<div class="vacateReason">
		    		  <el-col :span="20">
		    			<el-input  v-model="editorForm.OfficeTitle" ></el-input>
		    		  </el-col>
		    		</div>
		    </el-form-item>  
		    <el-form-item label="公文内容:" prop="OfficeContent" class="el-editor borderNone">
		    		<div class="vacateReason">
		    			 <el-col :span="20">
		    			 	<el-input type="textarea" resize="none" v-model="editorForm.OfficeContent" :rows="10"></el-input>
		    			 </el-col>
		    		</div>
		    </el-form-item>
		    <el-form-item label="备注:" class="el-editor borderNone noRequire">
		    		<div class="vacateReason" style="margin-left:23px;">
		    		    <el-col :span="20">
		    			   <el-input  v-model="editorForm.OfficeNote" ></el-input>
		    			</el-col>
		    		</div>
		    </el-form-item>		    
		    <el-form-item label="上传附件:" v-model="editorForm.OfficeFile" class="fileUpload noRequire">
  				<el-upload :action="action_java" ref="upload" :auto-upload="false" :on-change="getFiles" :multiple="false" accept=".doc,.docx" :on-remove="removeList">
					<i class="el-icon-upload"></i>
  					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  					<div class="el-upload__tip" slot="tip">只能上传.doc,.docx文件，且不超过20M</div>
				</el-upload>
		    </el-form-item>		    
		  </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="successDialog('editorForm')" :loading="loading" :disabled="flag">{{dialogText}}</el-button>
			</div>
    </el-dialog>
		
	</div>
	
</template>
<script type="text/javascript">
    import apis from '../../apis/officeWork.js'
	export default {
		data () {
			return {
				labelPosition: 'right',
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
					]
				},
				dialogText: '提交',
				loading: false,
				fileSize: 1024*1024*10,
				flag: false,
				action_java: '',
				checkList:[],
				selectBoxList:[],
    			OfficeShow: false,
    			indeterminate: true,
    			checkAll: true,
    			arrIdList:[]
			}
		},
		props:{
			editorForm: {
				dialogTitle: '',
				dialogFormVisible: Boolean,
				id: '',
				campus: '',
				OfficeObejct: '',
				OfficeTitle: '',
				OfficeContent: '',
				OfficeNote: '',
				OfficeFile: '',
				campusList:[],
				selectBoxList:[]
			}
		},
		methods:{
			successDialog (form) {
				var _this = this
				this.$refs[form].validate((valid) => {
					if(valid){
						this.$confirm('确认提交吗?').then(() => {
							var formData = new FormData()
							_this.dialogText = '提交中'
							_this.loading = true
							if (_this.editorForm.id !== '') {
								//编辑
								this.formData.append('id',this.editorForm.id)
								this.formData.append('campusRegion',this.editorForm.campus)
								this.formData.append('OfficeObejct',this.editorForm.OfficeObejct)
								this.formData.append('title',this.editorForm.OfficeTitle)
								this.formData.append('content',this.editorForm.OfficeContent)
								if (this.editorForm.OfficeNote) {
									this.formData.append('remark',this.editorForm.OfficeNote)
								}
							} else {
								//新增
								formData.append('campusRegion',this.editorForm.campus)
								formData.append('ids',this.arrIdList.join(','))
								formData.append('campusRegionName',this.editorForm.campusRegionName.name)
								formData.append('title',this.editorForm.OfficeTitle)
								formData.append('content',this.editorForm.OfficeContent)
								// var data ={
								// 	campusRegionName: this.editorForm.campusRegionName.name,
								// 	campusRegion: this.editorForm.campus,
								// 	ids: this.arrIdList,
								// 	title: this.editorForm.OfficeTitle,
								// 	content: this.editorForm.OfficeContent,
								// 	remark:this.editorForm.OfficeNote
								// }
								if (this.editorForm.OfficeNote) {
									formData.append('remark',this.editorForm.OfficeNote)
								}
								apis.createOfficeWork(formData).then(response =>{
									if(!response) {
										return false
									}
									var code = response.data.meta.code
									if (code === '200') {
										var data = response.data.data;
										this.$emit('successDialog')
										_this.loading = false,
										_this.dialogText = '提交'
										_this.$message({
											type:'success',
											message: '提交成功'
										})
									} else {
										_this.$message.error('网路错误,请重试')
										_this.loading = false,
										_this.dialogText = '提交'
									}
									formData.delete('campusRegion')
									formData.delete('ids')
									formData.delete('title')
									formData.delete('content')
									formData.delete('campusRegionName')
								})
							}
						})
					}
				})
				
			},
			closeDialog (form) {
				this.$refs[form].resetFields();
				this.$emit('closeDialog')
			},
			getFile (event) {
				var file = event.target.files[0];
				var size = file.size;	
				var result = size / this.fileSize
				if(result > 1) {
					this.$message.error('你上传的文件最大不能超过10M')
					return false;
				} 
				this.formData.append('OfficeFile',file)
			},
			getFiles () {

			},
			removeList () {

			},
			OfficePage () {
				this.OfficeShow = !this.OfficeShow
			},
			handleCheckAllChange (event) {
				this.checkList = event.target.checked ? this.selectBoxList : [];
                this.isIndeterminate = false;
			},
			handleCheckedCitiesChange (value) {
				let checkedCount = value.length;
                this.checkAll = checkedCount === this.selectBoxList.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectBoxList.length;
			},
			findCampusName (value) {
				console.log(value)
				this.editorForm.campusRegionName = this.editorForm.campusList.find(function (obj) {
				     return  obj.id == value ? obj.name : ''
				})
			}
		},
		watch:{
			checkList (value,oldValue) {
				this.editorForm.OfficeObejct = value.join(',')
				let arr = [];
				var _this = this
				arr = this.editorForm.selectBoxList.filter(function(n) {
					var name = n.name
					if(value.indexOf(name) > -1) {
						return n.id
					}
				})
				var newArr = []
				for(var i = 0, len = arr.length; i < len; i++) {
					newArr.push(arr[i].id)
				}
				console.log(this.arrIdList)
				this.arrIdList = newArr
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	.el-editor{
		display:flex;
	}
	.selectOffice{
		padding-left:82px;
		padding-bottom:10px;
		margin-bottom: 20px;
	}
</style>
<style type="text/css" lang="scss">
	.fileUpload{
		.el-form-item__content{
			margin-left:80px;
		}
	}
	.borderNone{
		.el-textarea__inner{
			border:none;
			background:#fafafa;
		}
		.el-input__inner{
			border:none;
			background:#fafafa;
		}
	}
	.noRequire{
		.el-form-item__label{
			margin-left:11px;
		}
	}
	.selectOffice{
		.el-checkbox{
			width:10%;
			margin-bottom:5px;
			&:first-child{
				margin-left:15px;
			}
		}
		   
	}
</style>