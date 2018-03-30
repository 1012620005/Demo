<template>
	<div>
		<el-dialog :title="form.dialogTitle" :visible.sync="form.dialogFormVisible" size="tiny" class="dialogImg" label-position="right" @close="closeDialog('form')">
		  <el-form :model="form" :rules="rules" ref="form" id="form" enctype="multipart/form-data">
		    <el-form-item label="开始时间:"  prop="startTime">
		        <el-date-picker
			      v-model="form.startTime"
			      type="datetime"
			      format="yyyy-MM-dd HH:mm:ss"
			      placeholder="选择开始时间" style="width:180px;" :picker-options="pickerStart">
    			</el-date-picker>
		    </el-form-item>
		    <el-form-item label="结束时间:"  prop="endTime">
		        <el-date-picker
			      v-model="form.endTime"
			      type="datetime"
			      format="yyyy-MM-dd HH:mm:ss"
			      placeholder="选择结束时间" style="width:180px;" :picker-options="pickerEnd">
    			</el-date-picker>
		    </el-form-item>
		    <el-form-item label="请假天数:" class="paddingLeave">
		    	<!-- <el-input type="text"  v-model="form.vacateDays" :disabled="true"></el-input> -->
		    	<span class="vacateDays" ref="vacateDays">{{ vacateDaysEvent }}</span>
		    </el-form-item>
		     <el-form-item label="请假类别:" prop="vacateType">
		     	    <el-select v-model="form.vacateType" placeholder="" style="width:150px;" >
				      <el-option label="事假" value="事假"></el-option>
				      <el-option label="病假" value="病假"></el-option>
    				</el-select>
		    </el-form-item>
		    <el-form-item label="请假事由:" prop="vacateReason" class="editorFloat">
		    		<div class="vacateReason">
		    			<el-input type="textarea" resize="none" v-model="form.vacateReason" :rows="3"></el-input>
		    		</div>
		    </el-form-item>
		    <el-form-item label="上传附件:" class="paddingLeave editorFloat">
  				<el-upload :action="action_java" ref="upload" class="upload-demo"  :data="fileData"
						  :on-success="handleAvatarSuccess"  drag :auto-upload="true" :multiple="false" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx" :on-remove="removeList"  :file-list="form.vacateFile"> 
					  <i class="el-icon-upload"></i> 
					  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> 
					  <div class="el-upload__tip" slot="tip" style="color:red;">提示:单次只能上传10个文件 支持格式有(.png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx)</div>
				</el-upload>
               <!--  <input type="file"  @change="getFile($event)" id="files" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx"  multiple="multiple"/> -->
		    </el-form-item>		    
		  </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="successDialog('form')">提交</el-button>
			</div>
        </el-dialog>		
	</div>
</template>
<script type="text/javascript">
   import util from '../../common/js/util.js'
   import api from '../../apis/sLeave.js'
   import commonFile from '../../apis/commonFile.js'
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
			    		{required:true,message:'请填写请假天数',trigger:'change',type:'string'}
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
			    editorLoading: false,
				action_java: '',
				fileData:{
					entity:'leave',
					type:'student'
				},
				fileIdList:[],
			    pickerStart:{
			    	// disabledDate: (time) =>{
        // 				return time.getTime() < new Date().getTime();
			    	// }
			    },
			    pickerEnd: {
			    	// disabledDate:(time) => {
			    	// 	let beginDateVal = this.form.startTime;
			    	// 	if(beginDateVal) {
			    	// 		return time.getTime() < beginDateVal
			    	// 	}
			    	// }
			    },
			    workFlowList:[],
			    wftype:'2'
			}
		},
		props:{
			form: {
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
			getFiles (file,fileList) {
				// if(fileList.length > 10) {
				// 	this.$message.error('最多上传10个文件')
				// 	this.$refs.upload.clearFiles()
				// 	return false;
				// }
				//  for(var i = 0,len = fileList.length; i < len; i++ ) {
				// 	this.filesObj.filesTotalSizes += fileList[i].size
				//  }
				//  if(this.filesObj.filesTotalSizes/this.filesObj.filesSize > 1) {
				//  	this.$message.error('上传的总的大小不能超过20M')
				//  	this.$refs.upload.clearFiles()
				//  	return false;
				//  }
			},
			// removeList (file,fileList) {
			// 	console.log('remove')
			// 	console.log(file)
			// 	for(var i = 0,len = fileList.length; i < len; i++ ) {
			// 		this.filesObj.filesTotalSizes += fileList[i].size
			// 	}
			// 	if(this.filesObj.filesTotalSizes/this.filesObj.filesSize > 1) {
			// 	 	this.$message.error('上传的总的大小不能超过20M')
			// 	 	this.$refs.upload.clearFiles()
			// 	 	return false;
			// 	}
			// 	if(this.form.id) {
			// 	   for(var j = 0, len = this.form.vacateFile.length; j < len; j++) {
			// 	   	   if (this.form.vacateFile[j].uid == file.uid) {
			// 	   	   	  this.form.vacateFile.splice(j,1)
			// 	   	   	  console.log(this.form.vacateFile)
			// 	   	   	  console.log('删除之后')
			// 	   	   }
			// 	   }
			// 	}
			// 	this.filesObj.files = fileList

			// },
			closeDialog (form) {
				this.$refs[form].resetFields();
				this.$emit('closeDialog')
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
							this.formData.append('vacateType',this.form.vacateType)
							this.formData.append('vacateReason',this.form.vacateReason)
							this.formData.append('flowType','2')
							if (this.form.id !== '') {
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
		      						if(response) {
			      						if(response.data.meta.code){
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
			      						}
		      						}
                       	   
		                        })
							} else {
								this.formData.append('fileId',this.fileIdList.join(','))						
								// 新增
							  api.addSleave(this.formData).then(response => {
							  	   if(response) {
										var code = response.data.meta.code
			                       		if (code =='200'){
			                       			this.$message({
			                       				type: 'success',
			                       				message: '提交成功'
			                       			})
			                       		    this.editorLoading = false
			                       		    this.$emit('successDialog')
			                       		} 			  	   	
							  	   } 	
		                       		
		                        })			
							}
						})
					}
				})
				
			},
			getWorkFlowList () {
				var data ={
					'wftype': this.wftype
				};
				var _this = this
				api.getWorkFlowList(data).then(response =>{
					if(response){
						if(response.data.meta.code == 200) {
							var data = response.data.data
							_this.workFlowList = data
						}						
					}

				})
			},
			handleAvatarSuccess (res,file,flieList) {
				if(res.meta.code == 200) {
					var data = res.data
					var fileId = data.id
					this.fileIdList.push(fileId)
				}
			},
			removeList (file,fileList) {
				console.log('remove')
				console.log(file)
				console.log(fileList)
				var _this = this
				var fileid = file.response.data.id
				var index = this.fileIdList.indexOf(fileid)
				var formData = new FormData()
				formData.append('fileid',fileid)
				commonFile.deleteFile(formData).then(res =>{
					 var data = res.data
					if(data.meta.code == 200) {
						var msg = data.meta.message
						_this.fileIdList.splice(index,1)
						_this.$message({
							type:'success',
							message: msg
						})
					}
				})
			},
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
					console.log(hours)
					console.log(days)
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
		},
		mounted () {
			// 获取学生请假需要的工作流
			// this.getWorkFlowList()
			// 获取文件上传的路径
			var _this = this
			this.action_java = commonFile.getFileUploadUrl()
			setInterval(function(){_this.action_java = commonFile.getFileUploadUrl();}, 4 * 60000);
		}
	}
</script>
<style type="text/css" lang="scss">
	 .editorFloat{
		div.el-form-item__content{
			float: left;
			width: 70%;
		}
		.el-upload-dragger{
			width: 270px;
		}
		.el-upload__tip{
			width: 100%;
    		word-break: break-all;
            word-wrap: break-word;
		}

     }
 .dialogImg{
	 .el-dialog__header{
		 background:#e2f0fd;
		 padding:20px;
		 .el-dialog__title{
			 font-weight:normal;
			 color:#000;
		 }
		 .el-dialog__headerbtn{
			 font-size: inherit
		 }
	 }
 }
 .paddingLeave{
	.el-form-item__label{
		margin-left:11px;
	} 
 }
</style>