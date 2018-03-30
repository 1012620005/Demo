<template>
	<div class="serachOut">
		<div class="searchText">
			<el-input class="searchInput" v-model="searchInput" placeholder="请输入职位或公司名称"></el-input>
		</div>
	    <div class="searchSelect" v-show="city">
		    <el-cascader
				    :options="options"
				    v-model.sync="selectValue"
				    @change="handleChange" :props="props"  @active-item-change="handleItemChange" :change-on-select="false">
			</el-cascader>
		</div>
		<i class="icon_search" @click="search"></i>		
	</div>
</template>
<script type="text/javascript">
    import common from '../../../apis/company/employCommon.js'
    import responApi from '../../../apis/company/response.js'
	export default{
		data () {
			return {
				industryList:[],
				options: [
					{
					  value: '',
					  label: '',
					  cities: []
					}
				],
				props: {
				  value: 'code',
				  label: 'name',
				  children: 'cities'
				},
				selectValue: [],
				searchInput: ''	
			}
		},
		props:['city'],
		methods:{
			handleItemChange (val) {
				var _this = this;
				setTimeout(_ => {
          			common.getCityList(val[0]).then(response => {
          			   if(responApi.responseCallback(response)) {
							var data = responApi.responseCallback(response)
							for(let j = 0, len = _this.options.length; j < len; j++) {
								if(_this.options[j].code == val[0]) {
									_this.options[j].cities = data;
								}
							}
					   }
          			})	
               }, 300);
			},
			getCityList () {
				var _this = this
				common.getCityList ().then(response => {
					if(responApi.responseCallback(response)) {
						var data = responApi.responseCallback(response)
						for (let i = 0, len = data.length; i < len; i++) {
							data[i].cities = []
						}
						_this.options = data
					}
				})
			},
			handleChange (val) {
				console.log(val)
			},
			search () {
				this.$emit('search',{'workOrCompanyName': this.searchInput, 'city': this.selectValue})
			}
		},
		mounted () {
		   var _this = this
		   this.$nextTick(function () {
    			_this.getCityList ()
    			
  			})

		}		
	}
</script>
<style type="text/css" lang="scss" scoped>
	.serachOut{
		height:60px;
		background:#fff;
		display:flex;
		.searchSelect{
			width:167px;
			height:100%;
			outline:none;
			padding-left: 20px;
			border-left:1px solid #eee;
		}
		.icon_search{
			display:inline-block;
			width:65px;
			height:60px;
			background:url(../../../assets/img/employ/search.png) no-repeat center center;
			cursor:pointer;
		}
		.searchText{
			flex:1;
			.searchInput{
				display:inline-block;
				width:100%;
				border:none;
				outline:none;
				height:60px;
				line-height:60px;
				padding-left:30px;
				box-sizing:border-box;
				font-size:14px;
			}
		}		
	}
</style>
<style type="text/css" lang="scss">
	.searchSelect{
		.el-cascader{
			height:60px;
			line-height:60px;

		}
		.el-input__inner {
             border:none;
             height:60px;
        }
        .el-cascader__label{
        	line-height:60px;
        }
	}
	.searchInput{
		.el-input__inner{
			border:none
		}
	}
</style>