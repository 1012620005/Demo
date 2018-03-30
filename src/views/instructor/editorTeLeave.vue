<template>
	<div>
		<el-dialog :title="form.dialogTitle" :visible.sync="form.dialogFormVisible" size="tiny"  @close="closeDialog('form')" class="dialogImg">
		  <el-form :model="form" :rules="rules" ref="form" id="form" enctype="multipart/form-data">
		    <el-form-item label="开始时间:"  prop="startTime">
		        <el-date-picker
			      v-model="form.startTime"
			      type="datetime"
			      placeholder="选择开始时间" style="width:180px;">
    			</el-date-picker>
		    </el-form-item>
		    <el-form-item label="结束时间:"  prop="endTime">
		        <el-date-picker
			      v-model="form.endTime"
			      type="datetime"
			      placeholder="选择结束时间" style="width:180px;">
    			</el-date-picker>
		    </el-form-item>
		    <el-form-item label="请假天数:" class="paddingLeave">
		        <span class="vacateDays" ref="vacateDays">{{ vacateDaysEvent }}</span>
				
		    </el-form-item>		    
		     <el-form-item label="替课老师:" class="paddingLeave">
		     	    <el-select v-model="form.vacateForClass" style="width:150px;" >
				      <el-option :label="item" :value="key" :key="key" v-for="(item,key) in tkTeachList"></el-option>
    				</el-select>
		    </el-form-item>
		     <el-form-item label="请假类型:" prop="vacateType">
		     	    <el-select v-model="form.vacateType" style="width:150px;" >
				      <el-option label="事假" value="事假"></el-option>
				      <el-option label="病假" value="病假"></el-option>
    				</el-select>
		    </el-form-item>	
		     <!-- <el-form-item label="请假流程:" prop="vacateType">
		     	    <el-select v-model="form.subflowId" style="width:150px;" >
				       <el-option :label="item.flowCondition" :value="item.id" :key="item.id" v-for="item in workFlowList"></el-option>
    				</el-select>
		    </el-form-item>	 -->	    	    
		    <el-form-item label="请假事由:" prop="vacateReason" class="editorFloat">
		    		<div class="vacateReason">
		    			<el-input type="textarea" v-model="form.vacateReason" :rows="3" resize="none"></el-input>
		    		</div>
		    </el-form-item>
		    <el-form-item label="上传附件:" class="paddingLeave editorFloat">
  				  <!--  <input type="file"  @change="getFile($event)" id="files" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx"  multiple="multiple"/> -->
  				<el-upload :action="action_java" class="upload-demo" drag  ref="upload" :auto-upload="true"  :data="fileData"
						  :on-success="handleAvatarSuccess"  :on-change="getFiles" :multiple="false" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx" :on-remove="removeList" :file-list="fileList"> 
					  <i class="el-icon-upload"></i> 
					  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> 
					  <div class="el-upload__tip" slot="tip" style="color:red;">提示:单次只能上传10个文件 支持格式有(.png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx)</div>
					
				</el-upload>  				  
		    </el-form-item>		    
		  </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="successDialog('form')" :loading="editLoading">提交</el-button>
			</div>
        </el-dialog>		
	</div>
</template>
<script type="text/javascript">
    import util from '../../common/js/util.js'
	import api from '../../apis/teLeave.js'
	import commonFile from '../../apis/commonFile.js'
	import { getToken } from '../../utils/auth'
	export default {
		data () {
			return {
				 rules:{
			    	startTime: [
			    	   	{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
			    	   
			    	],
			    	endTime: [
			    	   	{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
			    	  	 
			    	],
			    	vacateType: [
			    	    { required: true, message: '请选择请假类型', trigger: 'change' }
			    	],
			    	vacateReason: [
			    		{ required: true, message: '请填写请假事由', trigger: 'change' }
			    	],
			    	vacateDays: [
			    		{required:true,type:'string',message:'请填写请假天数',trigger:'change'}
			    	],
			    	vacateForClass: [
			    		{
			    			required: true, message: '请选择替课老师', trigger: 'change'
			    		}
			    	],
			    	subflowId:[
			    		{
			    			required: true, message: '请选择流程条件', trigger: 'change'
			    		}
			    	]

			    },	
				filesObj: {
			    	filesSize: 1024*1024*20,
			    	filesType: ['.png','.jpg','.doc','.xlx','.xls','.pdf','.xlsx','.docx'],
			    	files: [],
			    	filesTotalSizes: 0
			    },
			    fileList: [],
			    formData: new FormData(),			    
				editLoading: false,
				action_java: '',
				workFlowList:[],
				wftype:	'1',
				tkTeachList:[],
				teachId: '',
				fileData:{
					entity:'leave',
					type:'teacher'
				},
				fileIdList:[]
			}
		},
		props:{
			form:{
				id: '',
				dialogTitle: '',
				dialogFormVisible: Boolean,
				startTime: '',
				endTime: '',
				vacateDays: '',
				vacateReason: '',
				vacateFile: '',
				vacateType: '',
				subflowId: ''
			}
		},
		methods:{
			getFile (event) {
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
			getFiles (file,fileList) {
				console.log('change')
				console.log(file)
				console.log(fileList)
				if(fileList.length > 10) {
					this.$message.error('最多上传10个文件')
					this.$refs.upload.clearFiles()
					return false;
				}
				if(this.filesObj.filesTotalSizes)
				this.filesObj.files = fileList
			},
			removeList (file,fileList) {
				console.log('remove')
				console.log(file)
				for(var i = 0,len = fileList.length; i < len; i++ ) {
					this.filesObj.filesTotalSizes += fileList[i].size
				}
				if(this.filesObj.filesTotalSizes/this.filesObj.filesSize > 1) {
				 	this.$message.error('上传的总的大小不能超过20M')
				 	this.$refs.upload.clearFiles()
				 	return false;
				}
				if(this.form.id) {
				   for(var j = 0, len = this.form.vacateFile.length; j < len; j++) {
				   	   if (this.form.vacateFile[j].uid == file.uid) {
				   	   	  this.form.vacateFile.splice(j,1)
				   	   	  console.log(this.form.vacateFile)
				   	   	  console.log('删除之后')
				   	   }
				   }
				}
				this.filesObj.files = fileList
			},
			// 比较两个数组对象的是否相等如果不同把新的对象组成数组的形式
			campareArr (arr1,arr2) {
				var result = [];
				for(var i = 0; i < arr2.length; i++){
				    var obj = arr2[i];
				    var num = obj.uid;
				    var isExist = false;
				    for(var j = 0; j < arr1.length; j++){
				        var aj = arr1[j];
				        var n = aj.uid;
				        if(n == num){
				            isExist = true;
				            break;
				        }
				    }
				    if(!isExist){
				        result.push(obj);
				    }
				}
				return result
			},									
			successDialog (form) {
				var _this = this;
				this.$refs[form].validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？').then(() => {
							this.editorLoading = true
							this.formData.append('startTime',util.formatDate.format(this.form.startTime, 'yyyy-MM-dd hh:mm:ss'))
							this.formData.append('endTime',util.formatDate.format(this.form.endTime, 'yyyy-MM-dd hh:mm:ss'))
							this.formData.append('vacateDays',this.$refs.vacateDays.innerText)
							this.formData.append('vacateReason',this.form.vacateReason)
							this.formData.append('vacateType',this.form.vacateType)
							this.formData.append('flowType','1')
							if (this.form.id !== '') {
								// 编辑
								this.formData.append('id',this.form.id)
								console.log(this.filesObj.files)
								console.log(this.form.vacateFile)
								var arr = _this.campareArr(_this.form.vacateFile,_this.filesObj.files)
							    for(var k = 0, len = this.form.vacateFile.length; k < len; k++) {
							    	this.formData.append(this.form.vacateFile[k].id, this.form.vacateFile[k].id)
							    }
							    for (var h = 0, len = arr.length; h < len; h++) {
							    	this.formData.append('addattachment'+ (h+1), arr[h].raw)
							    }
								// 编辑
								this.formData.append('id',this.form.id)
		      					api.modifySleave(this.formData).then(response => {
		      						if(response){
		      							var code = response.data.meta.code
										if (code =='200'){
			                       			this.$message({
			                       				type: 'success',
			                       				message: '提交成功'
			                       			})
			                       		    this.editorLoading = false
			                       		    this.$emit('successDialog')
			                       		} else {
			                       			this.editorLoading = false
			                       			this.$message.error(response.data.meta.message)
			                       		}			      							
		      						}else {
		      							this.$message.error(response.data.meta.message)
		      						}                       	   
		                        })								

							} else {
								if(this.filesObj.files.length > 0) {
									for(let i = 0,len = this.filesObj.files.length; i < len; i++) {
										this.formData.append('file'+ (i+1), this.filesObj.files[i].raw)
									}
								}
		                        api.addSleave(this.formData).then(response => {
									if(!response) {
										return false
									}		                        	
		                       		var code = response.data.meta.code
		                       		console.log(code)
		                       		if (code =='200'){
		                       			this.$message({
		                       				type: 'success',
		                       				message: '提交成功'
		                       			})
		                       		    this.editorLoading = false
		                       		    this.$emit('successDialog')
		                       		} else {
		                       			this.editorLoading = false
		                       			this.$message.error('请重新提交')
		                       		}
		                        })						
							}
						})
					}
				})
				
			},
			closeDialog(form){
				this.$refs[form].resetFields();
				this.$emit('closeDialog')
			},
			getWorkFlowList () {
				var _this = this
				api.getWorkList({wftype: this.wftype}).then(response =>{
					if(!response) {
						return false
					}					
					if(response.data.meta.code == 200) {
						var data = response.data.data
						_this.workFlowList = data
					}
				})
			},
			getReplaceTeach (startTime,endTime) {
				var data = {
					teachId: this.teachId,
					startTime:util.formatDate.format(startTime,'yyyy-MM-dd hh:mm:ss'),
					endTime: util.formatDate.format(endTime,'yyyy-MM-dd hh:mm:ss')
				}
				console.log(util.formatDate.format(startTime,'yyyy-MM-dd hh:mm:ss'))
				api.replaceTeach(data).then(res =>{
					if (res) {
						console.log(res)
					}
				})
			},
			handleAvatarSuccess (res,file,fileList) {
				console.log(res)
				if(res.meta.code == 200){
					var fileId = res.data.id
					this.fileIdList.push(fileId)
				}
			}
		},
		mounted () {
			var _this = this
			this.teachId = this.$Cookies.get('userId')
			// 获取老师请假的工作流
			// this.getWorkFlowList ()
			// 获取附件上传路径
			this.action_java = commonFile.getFileUploadUrl()
			setInterval(function(){_this.action_java = commonFile.getFileUploadUrl();}, 4 * 60000);
		},
		computed:{
			vacateDaysEvent () {
				var startTime = this.form.startTime;
				var endTime = this.form.endTime;
				if (startTime && endTime) {
					var start = new Date(startTime).getTime();
					var end = new Date(endTime).getTime();
					var time = end-start;
					// 相差天数
					var days = Math.floor(time/(24*3600*1000));
					// 相差小时
					var hours =  Math.floor((time %(24*3600*1000))/(3600*1000))
					// 获取替课老师的接口
					this.getReplaceTeach(startTime,endTime)
					if(days > 0) {
						if(hours > 6) {
							return days +1
						} else {
							return days + 0.5
						}
					} else {
						if(hours > 6) {
							return 1
						} else {
							return 0.5
						}
					}
					return 0
					
				} else {
					return 0
				}
				
			}
		}
	}
</script>
<style type="text/css" lang="scss">
	@import '../../common/css/common.scss';
</style>