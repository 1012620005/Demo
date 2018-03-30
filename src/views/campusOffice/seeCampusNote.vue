<template>
	<div>
		<el-dialog title="班级通知" :visible.sync="form.seeClassNote" class="dialogImg"  size="tiny" @close="closeForm()">
		  <el-form :model="form">
		    <el-form-item label="校区">
		      	<div v-html="form.campus"></div>
		    </el-form-item>
		    <el-form-item label="成员">
		      <div v-html="form.campusDepart"></div>
		    </el-form-item>	
		    <el-form-item label="标题" class="el-editor">
		        <div v-html="form.noteTitle"></div>
		    </el-form-item>
		    <el-form-item label="内容" class="el-editor">
		        <div v-html="form.noteContent"></div>
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
				seeClassNote: Boolean,
			    id: '',
				campus: '',
				campusDepart: '',
				campusPrefess: '',
				noteClass: [],
				noteTitle: '',
				noteContent: ''				
			}
		},
		methods:{
			closeForm (form) {
               this.$emit('closeForm')
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped="scoped">
	@import '../../common/css/common.scss';
	.seeUl{
		display:flex;
		li{
			padding: 0 4px;
		}
	}

</style>