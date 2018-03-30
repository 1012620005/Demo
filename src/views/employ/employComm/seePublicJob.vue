<template>
	<div>
		<el-dialog title="发布职位" :visible.sync="form.dialogFormVisible" @close="closeDialog()" class="dialogImg" >
			<el-form>
				<el-form-item label="职位名称:"  >
						<div>{{ form.positionName }}</div>
				</el-form-item>
					<el-form-item label="所属部门:" class="flexItem">
						<div>{{ form.department }}</div>
					</el-form-item>
					<el-form-item label="职位月薪:">
						<div>{{ form.salary}}</div>
					</el-form-item>
					<el-form-item label="工作年限:" >
						<div>{{ form.workLife }}</div>
					</el-form-item>
					<el-form-item label="学历要求:">
						<div>{{ form.education }}</div>
					</el-form-item>					
					<el-form-item label="职场诱惑:" class="flexItem">
							<div>{{form.workWelfare}}</div>
						
					</el-form-item>
					<el-form-item label="职位描述:" class="flexItem">
						<div>{{ form.workDescribe }}</div>
					</el-form-item>
					<el-form-item label="工作城市:">
						<div>{{ form.workCity }}</div>
					</el-form-item>
					<el-form-item label="截止时间:" class="flexItem">
						<div>{{ form.endTime }}</div>
					</el-form-item>
				</el-form>			
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
 
	export default {
		data () {
			return {
				
			}
		},
		props:{
			form:{
				dialogFormVisible: Boolean,
				positionName:'',
				department: '',
				salary: '',
				workLife: '',
				workDescribe: '',
				workCity: '',
				endTime:  '',
				education: '',
				workWelfare: ''
			}
		},
		methods:{
			closeDialog (form) {
				this.$emit('closeDialog')
			}
		}

	}
</script>
<style type="text/css" lang="scss">
	.boxItem{
		.el-form-item__content{
			margin-left:80px;
		}
	}
	.flexItem{
		display:flex;
		.el-form-item__content{
			flex:1;
		}
	}
	.align{
		text-align:center;
	}
</style>