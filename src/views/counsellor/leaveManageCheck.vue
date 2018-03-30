<template>
	<div>
		<el-dialog title="原因" :visible.sync="form.dialogFormVisible" label-position="right" size="tiny" @close="close('form')">
			  <el-form :model="form"  :rules="rules"  ref="form">
			    <el-form-item label="" label-width="0" prop="noPassReason">
			      <el-input v-model="form.noPassReason" type="textarea" :rows="5" resize="none"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="pass" type="primary" :loading="flag">通过</el-button>
			    <el-button type="danger" @click="noPass('form')" :loading="noFlag" >不通过</el-button>
			  </div>
</el-dialog>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				rules:{
					noPassReason:[
						{
			    			required: true, message: '请填写不通过的原因', trigger: 'change'
			    		}
					]
				},
				flag: false,
				noFlag: false
			}
		},
		props:{
			form: {
				dialogFormVisible: Boolean,
				noPassReason: '',
				id: ''
			}
		},
		methods:{
			pass() {
				this.flag = true
				this.$ajax({
					url: '',
					method:'past',
					data: { id: this.form.id}
				}).then(response =>{
					var code = response.meta.code;
					if(code == '200') {
						this.$message({type: "success",message: "审核通过"})
						this.flag = false
						this.$emit('pass')
					}
				})
				
			},
			noPass (form) {
				this.$refs[form].validate((valid) => {
					if (valid) {
						this.noFlag = true
						this.$ajax({
							url: '',
							method:'past',
							data: { id: this.form.id, noPassReason: this.form.noPassReason}
						}).then(response =>{
							var code = response.meta.code;
							if(code == '200') {
								this.$message({type: "success",message: "审核通过"})
								this.noFlag = false
								this.$emit('noPass')
							}
						})						
					}
				})
			},
			close (form) {
				this.$refs[form].resetFields();
			}
		}
	}
</script>
<style type="text/css" lang="scss"></style>