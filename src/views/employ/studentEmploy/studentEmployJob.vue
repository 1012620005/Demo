<template>
	<div class="content">
		<div class="job_top">
			<dl  class="jobClassifyList">
				<dt class="jobClassifyName">职位类别:</dt>
				<dd class="jobClassifyList jobDd" id="jobOne">
					<span v-for="(obj, index) in jobClassify" class="jobClassifyBox"><a href="javascript:;" :id="obj.id"  :class="[{'curJobSelect':jobClass==index}]" @click="changeJobCur(index)">{{ obj.positionName }}</a></span>
					<span class="moreBtn" @click="moreShow($event,'jobOne')" v-show="showStauts">更多>></span>
					<span class="moreBtn" @click="moreHid($event,'jobOne')" v-show="!showStauts">收起>></span>
				</dd>
			</dl>
			<dl class="jobClassifyList">
				<dt class="jobClassifyName">工作城市</dt>
				<dd class="jobClassifyList jobDd" id="jobTwo">
					<span v-for="(obj, index) in cities" class="jobClassifyBox"><a href="javascript:;" :id="obj.id"  :class="[{'curJobSelect':city==index}]" @click="changeCityCur(index)">{{obj.name}}</a></span>
					<span class="moreBtn" @click="moreShow($event,'jobTwo')"  v-show="showCityStauts">更多>></span>
					<span class="moreBtn" @click="moreHid($event,'jobTwo')"  v-show="!showCityStauts">收起>></span>
				</dd>
			</dl>			
		</div>
		<div class="job_center">
			<div class="job_center_left">
				<span class="allMessage">全部校园招聘信息</span>
				<span class="icon_box">
					<i class="icon_collents"></i>
				</span>
				<span class="collentList">收藏列表</span>
			</div>
			<div class="job_center_right">
				<div class="stud_top_right_top">
					<search-box @search="searchResult" :city="false"></search-box>
				</div>				
			</div>
		</div>
		<div class="job_bottom">
			    <ul>
				   <li class="recommendList" v-for="item in recommendList">
				   	   <div class="recommendList_left">
				   	   	   <p @click="jumperUrl(item)"><a href="javascript:;" class="recommendList_title">{{item.positionName}}</a></p>
				   	   	   <p class="padding_place padding_list">
				   	   	   		<span class="color_area">{{ item.workCity }}</span>
				   	   	   		<span class="color_time">{{item.creatTime}}</span>
				   	   	   </p>
				   	   </div>
				   	   <div class="recommendList_right">
				   	   	    <i class="icon_collent" :class="[item.collectionStatus? '' : 'collented']" @click="collented(item)"></i>
				   	   	    <p class="companyName padding_list">{{ item.companyName }}</p>
				   	   </div>
				   </li>
				</ul>
			  <div class="con_left_tab_con_page">
			        <el-pagination
								      @current-change="handleCurrentChange"
								      :current-page.sync="currentPage"
								      :page-size="10"
								      layout="prev, pager, next, jumper"
								      :total="size">
			    	</el-pagination>
			    </div>				
			</div>
	</div>
</template>
<script type="text/javascript">
	import common from '../../../apis/company/employCommon.js'
	import searchBox from '../employComm/searchBox.vue'
	import apis from '../../../apis/company/studentemployList.js'
	export default{
		data () {
			return {
				jobClassify:[],
				cities:[],
				recommendList: [],
				jobClass: 0,
				city: 0,
				currentPage: 1,
				size: 0,
				stuId: '',
				positionName: '',
				cityName: '',
				showStauts: true,
				showCityStauts: true
			}
		},
		methods:{
			changeJobCur (index) {
				this.jobClass = index
				for(var i = 0,len = this.jobClassify.length; i < len; i++) {
					if(i == index) {
						this.positionName = this.jobClassify[i].positionName
					}
				}
				this.queryList({'name': this.positionName,'city': this.cityName});
			},
			changeCityCur (index) {
				this.city = index
			    for(var j = 0,len = this.cities.length; j < len; j++) {
			    	if(j == index ) {
			    		this.cityName = this.cities[j].code
			    	}
			    }
			    this.queryList({'city': this.cityName,'name': this.positionName});
			},
			getCity () {
				var _this = this
				common.getCityList().then(response =>{
					if(!response) {
						return false
					}					
					if(response.data.meta.code == 200) {
						_this.cities = response.data.data
					}
				})
			},
			getIndustry () {
				var _this = this
				common.getPositionData().then(response => {
					if(!response) {
						return false
					}					
					if(response.data.meta.code == 200) {
						var data = response.data.data;
						for (var i = 0; i < data.length; i++) {
							var obj = data[i].child;
							var supPosition = data[i].positionName
							for(var j = 0; j < obj.length; j++) {
								var subPosition = obj[j].positionName
								_this.jobClassify.push({'positionName': supPosition + '/' + subPosition})
							}
						}
					}
				})
			},
			queryList (obj) {
				var formData = new FormData();
				var _this = this;
				console.log(obj)
				if(obj) {
					 formData.append('positionName',obj.name? obj.name:'');
					 formData.append('workOrCompanyName',obj.inputVal? obj.inputVal: '');
					 formData.append('workCity',obj.city? obj.city: '');
				}
				formData.append('userId',this.stuId);
				formData.append('pageNo',this.currentPage? this.currentPage: 1);
				apis.getEmploy(formData).then(response =>{
					if(!response) {
						return false
					}					
					if(response.data.meta.code == 200) {
						_this.recommendList = response.data.data.list
						_this.size = response.data.data.count
						_this.currentPage = response.data.data.pageNo
					}
					formData.delete('positionName')
					formData.delete('workOrCompanyName')
					formData.delete('workCity')
					formData.delete('userId')
				})
			},
			handleCurrentChange (curSize) {
				this.currentPage = curSize
				console.log('haha')
				this.queryList()
			},
			collented (obj) {
				// 查看该项是否为收藏状态 如果是则走取消收藏 如果不是 则走收藏
				var statu = obj.collectionStatus
				var stuId = this.stuId
				var companyId = obj.companyId
				var releaseId = obj.id
				var positionName = obj.positionName
				var formData = new FormData();
				var _this = this
				formData.append('userId',stuId);
				formData.append('companyId',companyId);
				formData.append('positionName',positionName); 
				formData.append('releaseId',releaseId); 
				console.log(statu) 
				if(!statu) {
					// 取消收藏
					apis.cancelCollent(formData).then(response =>{
						if(!response) {
							return false
						}						
						if(response.data.meta.code == 200) {
							_this.$message({
								type:'success',
								message: '取消收藏成功'
							})
							this.queryList() 
						}
						formData.delete('userId');
						formData.delete('companyId');
						formData.delete('positionName');
						formData.delete('releaseId');
					})

				} else if(statu) {
					// 收藏
					apis.collenting(formData).then(response =>{
						if(!response) {
							return false
						}						
						if(response.data.meta.code == 200) {
							_this.$message({
								type:'success',
								message: '收藏成功'
							})
							this.queryList ();
						}
						formData.delete('userId');
						formData.delete('companyId');
						formData.delete('positionName');
						formData.delete('releaseId');						
					})					
				}
            },
            jumperUrl (obj) {
				if(!window.sessionStorage.getItem('obj')) {
					window.sessionStorage.setItem('obj',JSON.stringify(obj))
				} else {
					window.sessionStorage.setItem('obj',JSON.stringify(obj))
				}				
            	this.$router.push({
            		name:'companyDetial'
            	})
            },
            moreShow (event,id) {
            	if(id == 'jobTwo') {
            		this.showCityStauts = false
            	} else {
            		this.showStauts = false
            	}
            	$('#' + id).height('auto')

            },
            moreHid (event,id) {
            	if(id == 'jobTwo') {
            		this.showCityStauts = true
            	} else {
            		this.showStauts = true
            	}
            	$('#' + id).height('96px')
            },
            searchResult (obj) {
            	var inputVal = obj.workOrCompanyName
				var city = obj.city
				var data = {
					inputVal : inputVal
				}
				console.log(data)
				this.queryList(data)
            }
		},
		components: {
			searchBox
		},
		mounted() {
			var query = this.$route.query
			this.$nextTick(function() {
				this.stuId = window.sessionStorage.getItem('stuId')
				this.getCity ();
			    this.getIndustry();
			    this.queryList (query);
			  	

			})
			
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	.content{
		width:1200px;
		height:982px;
		margin: 16px auto 0 auto; 
		.job_top{
			height:auto;
			background:#fff;
			padding: 28px 50px 0 30px;
			box-sizing:border-box;
			overflow:hidden;
			.jobClassifyList{
				display:flex;
				overflow:hidden;
				.jobClassifyName{
					color:#000;
					font-size:16px;
					width:80px;
				}
				.jobClassifyList{
					flex:1;
					display:flex;
					flex-wrap: wrap;
					height:96px;
					overflow:hidden;
					span.jobClassifyBox{
						display:inline-block;
						padding-left:24px;
						padding-bottom:29px;
					}
					a{
					    color: #333;
					    font-size:14px;
					    &.curJobSelect{
							color:#208af5;
						}
					}
					
				}
				.jobDd{
					position:relative;
				}
				.moreBtn{
					position:absolute;
					right:0;
					bottom:0;
					font-size:10px;
					color:#208af5;
					cursor:pointer;
				}
			}
		}
		.job_center{
			height:60px;
			display:flex;
			margin: 24px 0;
			.job_center_left{
				width:330px;
				padding-left:33px;
				.allMessage{
					color:#000;
					font-size:18px;
					line-height:60px;
					margin-right:34px;
				}
				.collentList{
					color:#000;
					font-size:16px;
					line-height:60px;
				}

			}
			.job_center_right{
				flex:1;
				.stud_top_right_top{
        			height:60px;
        		}
			}
		}
		.job_bottom{
			height:669px;
			background:#fff;
			.el-pagination{
				text-align:center;
			}
		}
	}
	.icon_collents{
		display:inline-block;
		width:26px;
		height:26px;
		background:url(../../../assets/img/connet/script.png) no-repeat;
		background-position: -199px -518px;
		margin-right:10px;
	}
.recommendList{
    wdith:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    height:130px;
    border-bottom:1px solid #ebebeb;
    margin: 0 33px 0 34px;

}
.padding_list{
		padding-top:39px;
	}
	.recommendList_title{
		color:#000;
		font-size:18px;
	}
	.recommendList_right{
		text-align:right;
	}
	.color_area{
		colot:#000;
		font-size:14px;
	}
	.color_time{
		color:#666;
		font-size:14px;
		padding-left:20px;
	}
.icon_collent{
		display:inline-block;
		width:26px;
		height:26px;
		background:url(../../../assets/img/connet/script.png) no-repeat;
		background-position: -199px -476px;
	}
	.collented{
		background-position: -199px -518px;
	}
.icon_box{
	display:inline-block;
	height:60px;
	padding-top:17px;
}		
</style>