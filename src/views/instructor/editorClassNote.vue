<template>
	<div>
		<el-dialog :title="form.title" :visible.sync="form.dialogFormVisible"  class="dialogImg" size="tiny" @close="closeForm('form')">
		  <el-form :model="form" :rules="rules" ref="form">
		    <el-form-item label="校区" prop="campus">
		      <el-select v-model="form.campus" @change="loadOrgByTea(form.campus, '', '')" placeholder="请选择校区">
		        <el-option v-for="(t,index) in form.s" :label="t.name" :value="t.id" :key="index"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="院系" prop="campusDepart">
		      <el-select v-model="form.campusDepart" @change="loadOrgByTea('', form.campusDepart, '')" placeholder="请选择校区">
		        <el-option v-for="(t,index) in form.dept" :label="t.name" :value="t.id" :key="index"></el-option>
		      </el-select>
		    </el-form-item>	
		    <el-form-item label="专业" prop="campusPrefess">
		      <el-select v-model="form.campusPrefess" @change="loadOrgByTea('', '', form.campusPrefess)" placeholder="请选择专业">
		        <el-option v-for="(t,index) in form.pro" :label="t.name" :value="t.id" :key="index"></el-option>
		      </el-select>
		    </el-form-item>	
		    <el-form-item label="班级" prop="noteClass">
		    	 <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
				  <div style="margin: 15px 0;"></div>
				  <el-checkbox-group v-model="form.noteClass" @change="handleCheckedCitiesChange">
				    <el-checkbox v-for="t in form.clazz" :label="t.clazzid" :key="t.clazzid">{{t.clazzname}}</el-checkbox>
				  </el-checkbox-group>
		    </el-form-item>   
		    <el-form-item label="标题" class="el-editor" prop="noteTitle">
		      <el-input v-model="form.noteTitle" auto-complete="off" ></el-input>
		    </el-form-item>
		    <el-form-item label="内容" class="el-editor" prop="noteContent">
		      <el-input v-model="form.noteContent" auto-complete="off" type="textarea" :rows="5" resize="none"></el-input>
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
  var noteClassesOption = ['201','202','203','204','205','206','207','208']
  import apis from '../../apis/classNote.js'
  import userApi from '../../apis/userCenter.js'
	export default {
		data () {
			return {
				isIndeterminate: true,
				checkAll: true,
				noteClasses: noteClassesOption,
				rules:{
					campus: [
						 { required: true, message: '请选择校区', trigger: 'change' }
					],
					campusDepart: [
						 { required: true, message: '请选择院系', trigger: 'change' }
					],
					campusPrefess: [
						 { required: true, message: '请选择专业', trigger: 'change' }
					],
					noteClass: [
						 { type:'array',required: true, message: '请至少选择一个班级', trigger: 'change' }
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
				s:[],
				dept:[],
				pro:[],
				clazz:[],			
			}
		},
		mounted () {
			this.loadOrgByTea();
		},
		methods:{
			loadOrgByTea(sid, deptid, proid) {	//加载班级机构信息
				let params = {sid:sid, deptid:deptid, proid:proid};
				userApi.loadOrgByTea(params).then(r=>{
					let map = r.data.data;
					if (sid) {
						if (map && map.dept) {
							this.form.dept = map.dept;
						} else {
							this.form.dept = [];
						}
					} else if (deptid) {
						if (map && map.pro) {
							this.form.pro = map.pro;
						} else {
							this.form.pro = [];
						}
					} else if (proid) {
						if (map && map.clazz) {
							this.form.clazz = map.clazz;
						} else {
							this.form.clazz = [];
						}
					} else {
						if (map && map.s) {
							this.form.s = map.s;
						} else {
							this.form.s = [];
						}
					}
				});
			},
			handleCheckAllChange (event) {
				this.form.noteClass = event.target.checked ? noteClassesOption : [];
                this.isIndeterminate = false;
			},
			handleCheckedCitiesChange (value) {
				let checkedCount = value.length;
                this.checkAll = checkedCount === this.noteClasses.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.noteClasses.length;
			},
			closeForm (form) {
               this.$refs[form].resetFields();
               this.$emit('closeForm')
			},
			submitForm (form) {
				 var _this = this
				 this.$refs[form].validate((valid) => {
				 	if(valid) {
				 		var formData  = new FormData()
				 		formData.append('type',1);
				 		formData.append('title',_this.form.noteTitle)
				 		formData.append('content',_this.form.noteContent)
						formData.append('bids',_this.form.noteClass)
						formData.append('ssid',_this.form.campus)
						formData.append('deptid',_this.form.campusDepart)
						formData.append('proid',_this.form.campusPrefess)
						formData.append('id',_this.form.id)
				 		apis.addClassNote(formData).then(response =>{
							// userApi.showMsg(response.data.meta);
				 			if(response.data.meta.code == 200) {
				 				this.$emit('submitForm')
				 			}
				 		});
				 	}
				 })
				 
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	@import '../../common/css/common.scss';
</style>