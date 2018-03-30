<template>
	<div class="companyCom">
		<el-form ref="completeForm" :model="completeForm" label-width="0" :rules="rules" enctype="multipart/form-data">
			<el-form-item label="" prop="companyWebsite">
				<el-input type="text" v-model="completeForm.companyWebsite" auto-complete="off" placeholder="请输入公司网址"></el-input>
			</el-form-item>
			<el-form-item label="" prop="companyIndustry">
					<el-cascader
					    :options="options"
					   	:props="{value:'industryName',label: 'industryName',children:'child'}"
					    v-model.sync="completeForm.companyIndustry"
					    @change="handleChange" style="width:100%;">
					</el-cascader>
			</el-form-item>	
			<el-form-item label="" prop="companyPeopleNumber">
				<el-input type="text" v-model.number="completeForm.companyPeopleNumber" auto-complete="off" placeholder="请输入公司人数"></el-input>		
			</el-form-item>	
			<el-form-item label="是否上市" label-width="100px;">
				<el-radio class="radio" v-model="completeForm.companyMarket" label="1">是</el-radio>
                <el-radio class="radio" v-model="completeForm.companyMarket" label="0">否</el-radio>
			</el-form-item>
			<div class="flexCity">
				<el-form-item label="" prop="curProvince">
					<el-select v-model="completeForm.curProvince" placeholder="省" style="width:90px;margin-right:8px;"  @change="getCityList">
					    <el-option
						      v-for="item in province"
						      :key="item.code"
						      :label="item.name"
						      :value="item.code">
					    </el-option>
	  				</el-select>					
				</el-form-item>
				<el-form-item label="" prop="curCity">
	 				<el-select v-model="completeForm.curCity" placeholder="市"  style="width:90px;margin-right:8px;" @change="getCountryList">
					    <el-option
						      v-for="item in city"
						      :key="item.code"
						      :label="item.name"
						      :value="item.code">
					    </el-option>
	  				</el-select>					
				</el-form-item>
				<el-form-item label="" prop="curCountry">
				<el-select v-model="completeForm.curCountry" placeholder="县"  style="width:90px;">
				    <el-option
					      v-for="item in country" 
					      :key="item.code"
					      :label="item.name"
					      :value="item.code">
				    </el-option>
  				</el-select>
  				</el-form-item>
			</div>
			<el-form-item label="" prop="companyAddress">
					<el-input type="text" v-model="completeForm.companyAddress" auto-complete="off" placeholder="详细地址"></el-input>
			</el-form-item>
			<el-form-item label="" prop="companyInformation">
					<el-input type="textarea" v-model="completeForm.companyInformation" auto-complete="off" placeholder="简介" :rows="5" resize="none"></el-input>
			</el-form-item>		 
			<el-button type="primary" @click="submitForm('completeForm')" style="width: 100%;">提交</el-button>				
		</el-form>		
	</div>
</template>
<script type="text/javascript">
    import api from '../../apis/company/companyComplete.js'
    import resApi from '../../apis/company/response.js'
	export default {
		data () {
			return {
				completeForm: {
					companyWebsite: '',
					companyIndustry:[],
					companyMarket: '1',
					companyPeopleNumber: '',
					companyInformation: '',
					companyAddress: '',
					curProvince: '',
		            curCity: '',
				    curCountry: ''
				},
				rules:{
					companyIndustry: [
						{required:true,message:'请选择所属行业',trigger:'change',type:'array'}
					],
					companyPeopleNumber: [
						{required:true,message:'请填写公司人数',trigger:'change',type:'number'}
					],
					companyAddress: [
						{required:true,message:'请填写公司详细地址',trigger:'change',type:'string'}
					],
					companyInformation: [
						{required:true,message:'请填写公司简介',trigger:'change',type:'string'}
					],
					curProvince: [
						{required:true,message:'请选择省',trigger:'change',type:'string'}
					],
					curCity: [
						{required:true,message:'请选择市',trigger:'change',type:'string'}
					],
					curCountry: [
						{required:true,message:'请选择县',trigger:'change',type:'string'}
					]										
				},
				province: [],
				city: [],
				country: [],
				options:[{
					id: '',
					industryName:'',
					child:[
						{
							id:'',
							industryName: '',
							parentId: ''
						}
					]
				}],
				formData: new FormData(),
				companyName: ''
			}
		},
		methods:{
			handleChange (val){
				console.log(val)
			},
			submitForm (form) {
				var _this = this
				this.$refs[form].validate((valid) => {
					if(valid) {
						// 接口的调用
						var companyName = _this.formData.append('companyName',_this.companyName)
						var companyWebsite = _this.formData.append('companyWebsite',_this.completeForm.companyWebsite)
						var companyIndustry = _this.formData.append('companyIndustry',_this.completeForm.companyIndustry.join('/'))
						var companyPeopleNumber = _this.formData.append('companyPeopleNumber',_this.completeForm.companyPeopleNumber);
						var companyMarket = _this.formData.append('companyMarket',_this.completeForm.companyMarket);
						var location = _this.completeForm.curProvince +'-'+ _this.completeForm.curCity+'-'+ _this.completeForm.curCountry;
						var companyLocation = _this.formData.append('companyLocation',location)
						var companyAddress = _this.formData.append('companyAddress',_this.completeForm.companyAddress);
						var companyInformation = _this.formData.append('companyInformation',_this.completeForm.companyInformation)
						api.complete(_this.formData).then(response => {
							if(response.data.meta.code) {
								var code = response.data.meta.code
								if (code == '200') {
									_this.$router.push({
										name: 'companyEnter',
										query:{
											name: _this.companyName
										}
									})
								}
							}
							_this.formData.delete('companyName')
							_this.formData.delete('companyWebsite')
							_this.formData.delete('companyIndustry')
							_this.formData.delete('companyPeopleNumber')
							_this.formData.delete('companyMarket')
							_this.formData.delete('companyLocation')
							_this.formData.delete('companyAddress')
							_this.formData.delete('companyInformation')
						})
					}
				})
			},
			getProvince () {
				api.getProvince('').then(response => {
					if(resApi.responseCallback(response)){
						var data = resApi.responseCallback(response);
						this.province = data
					}
				})
			},
			//获取市的列表
			getCityList (val) {
				var _this = this
				this.completeForm.curCity = ''
				this.completeForm.curCountry = ''
				api.getProvince(val).then(response => {
					if(resApi.responseCallback(response)){
						var data = resApi.responseCallback(response);
						_this.city = data
					}
				})
			},
			getCountryList (val) {
				var _this = this
				this.completeForm.curCountry = ''
				api.getProvince(val).then(response => {
					if(resApi.responseCallback(response)){
						var data = resApi.responseCallback(response);
						_this.country = data
					}
				})				
			},
			getIndustrys () {
				var _this = this
				api.getIntustry().then(response => {
					if(resApi.responseCallback(response)){
						var data = resApi.responseCallback(response);
						_this.options = data
					}
				})
			}
		},
		mounted () {
			// 获取省的数据
			// this.getProvince()
			var name = this.$route.query.name
			this.companyName = name
		},
		created () {
			this.getProvince()
			this.getIndustrys()
		}

	}
</script>
<style type="text/css" lang="scss" scoped>
	.companyCom{
		width:310px;
		margin: 0 auto;
		padding-top:39px;
	}
	.selectBox{
		width:100%;
	}
	.flexCity{
		display:flex;
	}
</style>