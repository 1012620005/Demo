<template>
	<div>
		<el-dialog :title="form.title" :visible.sync="form.dialogFormVisible" size="tiny" @close="closeForm('form')">
		  <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="80px">
		    <el-form-item label="校区" prop="campus">
		      <el-select v-model="form.campus" placeholder="请选择校区"  @change="findCampusName">
		         <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in form.campusList"></el-option>
		      </el-select>
		    </el-form-item>
			<el-form-item label="地点" prop="repairPlace">
		          <el-input v-model="form.repairPlace" placeholder="请输入地点"></el-input>
		    </el-form-item>	
		    <el-form-item label="报修情况"  prop="repairSituation">
		      <el-input v-model="form.repairSituation" auto-complete="off" type="textarea" :rows="5" resize="none"></el-input>
		    </el-form-item>
		    <el-form-item label="上传附件">
 				<el-upload :action="action_java" ref="upload" :auto-upload="false" :on-change="getFiles" :multiple="true" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx" :on-remove="removeList"    :file-list="fileList">
					<i class="el-icon-upload"></i>
  					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  					<div class="el-upload__tip" slot="tip">只能上传.png,.jpg,.gif,.bmp文件</div>
			    </el-upload> 		    	
		    </el-form-item>		    
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="submitForm('form')">提 交</el-button>
		  </div>
		</el-dialog>		
	</div>
</template>
<script type="text/javascript">
	import apis from '../../apis/equipRepairManage.js'
	import commonFile from '../../apis/commonFile.js'
	export default {
		data () {
			return {
				labelPosition: 'right',
				rules:{
					campus: [
						 { required: true, message: '请选择校区', trigger: 'change' }
					],
					repairSituation: [
						 { required: true, message: '请填写具体情况', trigger: 'change' }
					],
					repairPlace: [
						 { required: true, message: '请选择维修地点', trigger: 'change' }
					]								
				},
				action_java: '',
				fileList: [],
				filesObj: {
			    	filesSize: 1024*1024*20,
			    	filesType: ['.png','.jpg','.doc','.xlx','.xls','.pdf','.xlsx','.docx'],
			    	files: [],
			    	filesTotalSizes: 0
			    }
			}
		},
		props:{
			form:{
				title: '',
				dialogFormVisible: Boolean,
			    id: '',
				campus: '',
				campusName:'',
				repairSituation: '',
				repairPlace: '',
				repairImg: '',
				campusList: []
			}
		},
		methods:{
			closeForm (form) {
               this.$refs[form].resetFields();
               this.$emit('closeForm')
			},
			submitForm (form) {
				var _this = this;
				var formData  = new FormData();
				this.$refs[form].validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？').then(() => {
							formData.append('campus_region',_this.form.campus)
							formData.append('campus_name',_this.form.campusName.name)
							formData.append('repair_status',_this.form.repairSituation)
							formData.append('address',_this.form.repairPlace)
							if(this.filesObj.files.length > 0) {
								for(let i = 0,len = this.filesObj.files.length; i < len; i++) {
									formData.append('file'+ (i+1), this.filesObj.files[i].raw)
								}
						    }
						    apis.addEquipData(formData).then(response =>{
						    	if(response.data.meta.code == 200) {
						    		_this.$message({
						    			type:'success',
						    			message:'报修成功'
						    		})
						    	}
						    	_this.$emit('submitForm')
						    })					
						})
					}
				})
				
			},
			removeList(file,fileList) {
				for(var i = 0,len = fileList.length; i < len; i++ ) {
					this.filesObj.filesTotalSizes += fileList[i].size
				}
				if(this.filesObj.filesTotalSizes/this.filesObj.filesSize > 1) {
				 	this.$message.error('上传的总的大小不能超过20M')
				 	this.$refs.upload.clearFiles()
				 	return false;
				}
				this.filesObj.files = fileList				
			},
			getFiles (file,fileList) {
			    if(fileList.length > 10) {
					this.$message.error('最多上传10个文件')
					this.$refs.upload.clearFiles()
					return false;
				}
				for(var i = 0,len = fileList.length; i < len; i++ ) {
					this.filesObj.filesTotalSizes += fileList[i].size
				}
				if(this.filesObj.filesTotalSizes/this.filesObj.filesSize > 1) {
				 	this.$message.error('上传的总的大小不能超过20M')
				 	this.$refs.upload.clearFiles()
				 	return false;
				}
				this.filesObj.files = fileList
			},
			findCampusName (value) {
				console.log(value)
				this.form.campusName = this.form.campusList.find(function (obj) {
				     return  obj.id == value ? obj.name : ''
				})
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	@import '../../common/css/common.scss';
</style>