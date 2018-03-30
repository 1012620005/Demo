<template>
	<div>
	<el-dialog title="填写维修人员" :visible.sync="form.dialogFormVisible" size="tiny" class="dialogImg" >
	  <el-form :model="form" :rules="rules" ref="form">
	    <el-form-item  :label-width="formLabelWidth">
	      <el-input v-model="form.repairName" auto-complete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button type="primary" @click="submitBox('form')">确 定</el-button>
	  </div>
	</el-dialog>
	</div>
</template>
<script type="text/javascript">
	import apis from '../../apis/equipRepairManage.js'	
	export default {
		data () {
			return {
				formLabelWidth: 'right',
				rules:{
					repairName: [
						 { required: true, message: '请填写维修人员', trigger: 'change' }
					]
				}
			}
		},
		props:{
			form: {
				id: '',
				repairName: '',
				dialogFormVisible: Boolean
			}
		},
		methods:{
			submitBox (form) {
				var _this = this
				this.$refs[form].validate((valid) => {
					if(valid) {
						var formData = new FormData()
						formData.append('rid',_this.form.id)
						formData.append('repairmanName',_this.form.repairName)
						apis.submitPerson(formData).then(response =>{
							if(response.data.meta.code == 200) {
								var data = response.data.data
								_this.$message({
									type:'success',
									message:'提交成功'
								})
								_this.$emit('submitBox')
							}
						})
					}
				})
			}			
		}

	}
</script>
<style type="text/css" lang="scss">
	
</style>