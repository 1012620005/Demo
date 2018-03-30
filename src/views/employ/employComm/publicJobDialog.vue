<template>
	<div>
		<el-dialog title="发布职位" :visible.sync="form.dialogFormVisible" @close="closeDialog('form')" class="dialogImg" >
			<el-form ref="form" :model="form" :rules="rules"  enctype="multipart/form-data">
				<el-form-item label="职位名称:" prop="positionName" >
						<el-cascader :options="form.options" v-model="form.positionName" :props="props" ></el-cascader>	
					</el-form-item>
					<el-form-item label="" class="boxItem">
							<el-checkbox-group v-model="type">
								<el-checkbox label="乐观" key="乐观" name="乐观"></el-checkbox>
								<el-checkbox label="稳定" key="稳定"name="稳定" ></el-checkbox>
								<el-checkbox label="幻想" key="幻想" name="幻想"></el-checkbox>
								<el-checkbox label="神经质" key="神经质" name="神经质"></el-checkbox>
								<el-checkbox label="敢为" key="敢为" name="敢为"></el-checkbox>
								<el-checkbox label="独立" key="独立"name="独立" ></el-checkbox>
								<el-checkbox label="责任" key="责任" name="责任"></el-checkbox>
								<el-checkbox label="研究型" key="研究型" name="研究型"></el-checkbox>
							</el-checkbox-group>
					</el-form-item>
					<el-form-item label="所属部门:" class="flexItem" prop="department">
						<el-input v-model="form.department"></el-input>
					</el-form-item>
					<el-form-item label="职位月薪:" class="flexItem paddBox">
						<!-- <el-select v-model="form.salary" placeholder="">
							<el-option label="不限" value="不限" key="不限"></el-option>
							<el-option label="2K以下" value="2K以下"  key="2K以下"></el-option>
							<el-option label="2K-5K" value="2K-5K"  key="2K-5K"></el-option>
							<el-option label="5K-10K" value="5K-10K"  key="5K-10K"></el-option>
							<el-option label="10K-15K" value="10K-15K"  key="10K-15K"></el-option>
							<el-option label="15K-25K" value="15K-25K"  key="15K-25K"></el-option>
							<el-option label="25K-50K" value="25K-50K"  key="25K-50K"></el-option>
							<el-option label="50K以上" value="50K以上"  key="50K以上"></el-option>
						</el-select> -->
						<el-input v-model="form.salary"></el-input>
					</el-form-item>
					<el-form-item label="工作年限:"  class="flexItem">
						<!-- <el-select v-model="form.workLife" placeholder="">
							<el-option label="不限" value="不限" key="不限" ></el-option>
							<el-option label="应届毕业生" value="应届毕业生"  key="应届毕业生"></el-option>
							<el-option label="3年以下" value="3年以下"  key="3年以下"></el-option>
							<el-option label="3-5年" value="3-5年"  key="3-5年"></el-option>
							<el-option label="5-10年" value="5-10年"  key="5-10年"></el-option>
							<el-option label="10年以上" value="10年以上"  key="10年以上"></el-option>
							<el-option label="不要求" value="不要求"  key="不要求"></el-option>
						</el-select> -->
						<el-input v-model="form.workLife" :disabled="checked"></el-input><span class="boxss">以上</span><div><el-checkbox v-model="checked" @change="checkVal">不限</el-checkbox></div> 
					</el-form-item>
					<el-form-item label="学历要求:" class="flexItem paddBox">
						<!-- <el-select v-model="form.education" placeholder="">
							<el-option label="不限" value="不限"  key="不限"></el-option>
							<el-option label="大专" value="大专"  key="大专"></el-option>
							<el-option label="本科" value="本科"  key="本科"></el-option>
							<el-option label="硕士" value="硕士"  key="硕士"></el-option>
							<el-option label="博士" value="博士"  key="博士"></el-option>
							<el-option label="不要求" value="不要求"  key="不要求"></el-option>
						</el-select>
						<span>以上</span> -->
						<el-input v-model="form.education"></el-input><span>以上</span>
					</el-form-item>	
					<el-form-item label="职位描述:" class="flexItem" prop="workDescribe">
						<el-input type="textarea" v-model="form.workDescribe"  resize="none"class="posi"></el-input>
					</el-form-item>				
					<el-form-item label="职场诱惑:" class="flexItem" prop="workWelfore">
							<el-input type="textarea" v-model="form.workWelfore" :rows="6" class="remark" resize="none"></el-input>
						
					</el-form-item>
					<el-form-item label="工作城市:" prop="workCity">
						<el-select v-model="form.workCity">
							<el-option :label="item.name" :value="item.code" :key="item.code" v-for="item in cities"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="截止时间:" class="flexItem" prop="endTime">
						<el-date-picker
							v-model="form.endTime"
							type="datetime"
							format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择截止时间" style="width:180px;">
    					</el-date-picker>
					</el-form-item>
					<el-form-item>
						<div class="align">
						<el-button type="primary" class="confirm" @click="submit('form')">确认</el-button>
						</div>
					</el-form-item>
				</el-form>			
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
   import apis from '../../../apis/company/publicJob.js'
   import res from '../../../apis/company/response.js'
   import util from '../../../common/js/util.js'
	export default {
		data () {
			return {
				type: [],
				rules: {
					positionName: [
						{required:true,message:'请选择要应聘的职位',trigger:'change',type:'array'}
					],
					department: [
						{required:true,message:'请选择部门',trigger:'change',type:'string'}
					],
					workLife: [
						{required:true,message:'请填写工作经验',trigger:'change',type:'string'}
					],
					workWelfore: [
						{required:true,message:'请填写职位诱惑',trigger:'change',type:'string'}
					],
					workDescribe: [
						{required:true,message:'请填写职位描述',trigger:'change',type:'string'}
					],
					workCity: [
						{required:true,message:'请选择城市',trigger:'change',type:'string'}
					],
					endTime: [
						{required:true,message:'请填写截止日期',trigger:'change',type:'date'}
					]
				},
				cities: [],
				props:{value:'positionName',label: 'positionName',children:'child'},
				companyId: '',
				checked: false
			}
		},
		props:{
			form:{
				dialogFormVisible: Boolean,
				positionName:[],
				department: '',
				salary: '',
				workLife: '',
				workDescribe: '',
				workCity: '',
				endTime:  '',
				education: '',
				options: []
			}
		},
		methods:{
			submit (form) {
				var _this = this
				this.$refs[form].validate((valid) => {
					if(valid) {
						var formData = new FormData ()
						formData.append('positionName',_this.form.positionName.join('/'));
						formData.append('department',_this.form.department);
						formData.append('salary',_this.form.salary);
						if(_this.checked) {
							formData.append('workLife','不限');
						} else {
							formData.append('workLife',_this.form.workLife);
						}
						formData.append('workDescribe',_this.form.workDescribe);
						formData.append('workCity',_this.form.workCity);
						formData.append('endTime',util.formatDate.format(_this.form.endTime, 'yyyy-MM-dd hh:mm:ss'));
						formData.append('education',_this.form.education);
						formData.append('workWelfare',_this.form.workWelfore);
						formData.append('companyId',_this.companyId);
						apis.commitPublicJob(formData).then(response => {
							if(res.responseNull(response)) {
								_this.$message({
									type:'success',
									message: '发布职位成功'
								})
								_this.$emit('submit')
							} else {
								formData.delete('positionName');
								formData.delete('department');
								formData.delete('salary');
								formData.delete('workLife');
								formData.delete('workDescribe');
								formData.delete('workCity');
								formData.delete('endTime');
								formData.delete('education');
								formData.delete('workWelfare');
								formData.delete('companyId');								
							}

						})
					}	
				})
			},
			closeDialog (form) {
				this.$refs[form].resetFields();
				this.form.positionName = []
				this.form.salary = ''
				this.form.workLife = ''
				this.form.workDescribe = ''
				this.form.workCity = ''
				this.form.endTime = ''
				this.form.education = ''
				this.form.workWelfore = ''
				this.$emit('closeDialog')
			},
			checkVal (event) {
				var checked = event.target.checked
				if(checked) {
					this.form.workLife = '不限'
				} else {
					this.form.workLife = ''
				}
			}
		},
		mounted () {
			var _this = this
			// 获取城市的信息
			apis.getCityList ().then(response =>{
			     if (res.responseCallback(response)){
			     	var data = res.responseCallback(response)
			     	_this.cities = data
			     }
			});
			// 获取公司id
			this.companyId = window.sessionStorage.getItem('companyId')
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
			display:flex;
			align-items:center;
			.el-input{
				width:200px;
			}
			span.boxss{
				width:50px;
			}
		}
	}
	.align{
		text-align:center;
	}
	.paddBox{
		.el-form-item__label{
			padding-left:11px;
		}
	}
</style>