<template>
	<div>
		<el-dialog :title="form.title" :visible.sync="form.dialogFormVisible" size="tiny" class="dialogImg"  @close="closeForm('form')">
		  <el-form :model="form"  ref="form" >
		    <el-form-item label="校区" prop="campus">
		      <el-select clearable v-model="form.campus" placeholder="请选择校区">
		        <el-option v-for="(t,index) in form.campuses" :label="t.name" :value="t.id" :key="index">{{t.name}}</el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="通知成员" prop="campusDepart">
		      <el-select  clearable v-model="form.campusDepart" placeholder="请选择校区">
		        <el-option v-for="(t,index) in form.members" :label="t.label" :value="t.value" :key="index">{{t.label}}</el-option>
		      </el-select>
		    </el-form-item>	
		    <el-form-item label="标题" class="el-editor" prop="noteTitle">
		      <el-input v-model="form.noteTitle" auto-complete="off" ></el-input>
		    </el-form-item>
		    <el-form-item label="内容" class="el-editor" prop="noteContent">
		      <el-input v-model="form.noteContent" auto-complete="off" type="textarea" :rows="5" resize="none"></el-input>
		    </el-form-item>
		    <el-form-item label="上传附件" class="el-editor">
<!--   				<el-upload :action="action_java" ref="upload" :auto-upload="false" :on-change="getFiles" :multiple="true" accept=".png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx" :on-remove="removeList" :before-upload="filesList" :on-preview="previewFile" :http-request="httpRequest" :file-list="fileList"> <i class="el-icon-upload"></i> <div class="el-upload__text">点击上传</div> <div class="el-upload__tip" slot="tip">只能上传.png,.jpg,.doc,.xlx,.xls,.pdf,.xlsx,.docx文件，且不超过20M</div>
                </el-upload> -->		    	
		    </el-form-item>		    
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="closeForm('form')">取 消</el-button>
		    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
		  </div>
		</el-dialog>		
	</div>
</template>
<script type="text/javascript">
	import userApi from '../../apis/userCenter.js'
	export default {
		data () {
			return {
				isIndeterminate: true,
				checkAll: true,
				labelPosition: 'right',
				// noteClasses: noteClassesOption,
				rules:{
					campus: [
						 { required: true, message: '请选择校区', trigger: 'change' }
					],
					campusDepart: [
						 { required: true, message: '请选通知成员', trigger: 'change' }
					],
					noteTitle: [
						 { required: true, message: '请填写标题', trigger: 'change' }
					],
					noteContent: [
						 { required: true, message: '请填写内容', trigger: 'change' }
					]									
				}
			}
		},
		props:{
			form:{
				title: '',
				dialogFormVisible: Boolean,
			    id: '',
				campus: '',
				campusDepart: '',
				campusPrefess: '',
				noteClass: [],
				noteTitle: '',
				noteContent: ''	,
				members:[],
				campuses:[],			
			}
		},
		methods:{
			closeForm (form) {
               this.$refs[form].resetFields();
               this.$emit('closeForm')
			},
			submitForm (form) {
				let params = new FormData();
				params.append('type',2);	//分校通知
				params.append('title',this.form.noteTitle)
				params.append('content',this.form.noteContent)
				params.append('bids',this.form.campus)
				params.append('ssid',this.form.campus)
				params.append('ut',this.form.campusDepart)
				userApi.addClassNote(params).then(r=>{
					userApi.showMsg(r.data.meta);
					if (r.data.meta.code == '200') {
						this.$emit('submitForm')
					}
				});
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	@import '../../common/css/common.scss';
</style>