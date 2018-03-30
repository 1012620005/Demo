<template>
	<div>
<el-dialog :title="form.dialogTitle" :visible.sync="form.dialogFormVisible" size="tiny" class="dialogImg" >
  <el-form :model="form" :rules="rules">
  	<el-form-item>
  		<el-input v-model="form.name" auto-complete="off" placeholder="请输入登录密码"></el-input>
  	</el-form-item>
  	<div v-show="form.types == 1">
  		    <el-form-item>
      			<el-input v-model="form.name" auto-complete="off" placeholder="请输入新的联系人"></el-input>
    		</el-form-item>
  	</div>
  	<div v-show="form.types == 2">
  		    <el-form-item>
      			<el-input v-model="form.name" auto-complete="off" placeholder="请输入原密码"></el-input>
    		</el-form-item>
  		    <el-form-item>
      			<el-input v-model="form.name" auto-complete="off" placeholder="请输入新密码"></el-input>
    		</el-form-item>
  		    <el-form-item>
      			<el-input v-model="form.name" auto-complete="off" placeholder="请再次输入新密码"></el-input>
    		</el-form-item> 
  	</div>
  	<div v-show="form.types == 3">
  		    <el-form-item>
      			<el-input v-model="form.name" auto-complete="off" placeholder="请输入新手机号"></el-input>
      			<el-button  type="primary">发送验证码</el-button>
    		</el-form-item> 
   		    <el-form-item>
      			<el-input v-model="form.name" auto-complete="off" placeholder="请输入验证码"></el-input>
    		</el-form-item>    		
  	</div>
  </el-form>
  <div slot="footer" class="dialog-footer">
   
    <el-button type="primary" @click="save('form')">提交</el-button>
  </div>
</el-dialog>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				rules:{

        }
			}
		},
		props:{
			form: {
					types:'1',
					dialogTitle: '',
					dialogFormVisible: Boolean,
			}
		},
		methods:{
			save () {

			}
		}
	}
</script>
<style type="text/css"></style>