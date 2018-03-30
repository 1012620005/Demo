<template>
	<div class="content">
		<div class="stud_top">
			<div class="stud_top_left">
				<h4 class="industry_title">所有行业</h4>
				<div class="scroll_box">
					<dl v-for="(item, index) in industryList" :id="item.id" :ref="item.id">
						<dt class="industry_title">{{ item.positionName }} <i class="moreBtn" @click="moreBox($event,item.id)">更多</i></dt>
						<dd class="industry_category">
							<router-link  class="industry_list industry_flex" style="white-space: pre-wrap;" v-for="obj in item.child" :id="obj.id" :key="obj.id" :to="{ path:'/studentEmployJob',query:{name:item.positionName+'/'+ obj.positionName }}">{{obj.positionName}}</router-link>
							
						</dd>
					</dl>
				</div>
			</div>
			<div class="stud_top_right">
				<div class="stud_top_right_top">
					<!-- <div class="searchText">
						<el-input class="searchInput" v-model="searchInput" placeholder="请输入职位和公司名称"></el-input>
					</div>
					<div class="searchSelect">
						<el-cascader
						    :options="options"
						    v-model.sync="selectValue"
						    @change="handleChange" :props="props"  @active-item-change="handleItemChange" :change-on-select="false">
					   </el-cascader>
					</div>
				    <i class="icon_search" @click="search"></i> -->
				    <search-box @search="searchResult" :city="true"></search-box>
				</div>
				<div class="stud_top_right_bottom">
					<img src="static/img/banner.jpg"/>
				</div>
			</div>
		</div>
		<div class="stud_buttom">
			<h4 class="industry_title">推荐招聘职位</h4>
			    <ul>
				   <li class="recommendList" v-for="item in recommendList">
				   	   <div class="recommendList_left">
				   	   	   <p><a href="javascript:;" class="recommendList_title" @click="jumperUrl(item)">{{item.positionName}}</a></p>
				   	   	   <p class="padding_place padding_list">
				   	   	   		<span class="color_area">{{ item.workCity }}</span>
				   	   	   		<span class="color_time">{{item.creatTime}}</span>
				   	   	   </p>
				   	   </div>
				   	   <div class="recommendList_right">
				   	   	    <i class="icon_collent login" @click="collented(item)" :class="[item.collectionStatus? '' : 'collented']"></i>
				   	   	    <p class="companyName padding_list">{{ item.companyName }}</p>
				   	   </div>
				   </li>
				</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
    import api from '../../../apis/company/studentDefault.js'
    import common from '../../../apis/company/employCommon.js'
    import responApi from '../../../apis/company/response.js'
    import { getToken } from '../../../utils/auth.js'
    import searchBox from '../employComm/searchBox.vue'
	export default {
		data () {
			return {
				industryList:[],
				recommendList: [],
				stuId: ''
			}
		},
		methods:{
			handleChange (val) {
				console.log(val)
			},
			jumperUrl (obj) {
				var id = obj.id
				console.log(this.$store)
				this.$store.dispatch('getcompanyInfo',obj)
				if(!window.sessionStorage.getItem('obj')) {
					window.sessionStorage.setItem('obj',JSON.stringify(obj))
				} else {
					window.sessionStorage.setItem('obj',JSON.stringify(obj))
				}
				this.$router.push({
					name: 'companyDetial'
				})
			},
			searchResult (obj) {
				// 获取用户输入的值和选择的城市跳转页面
				var inputVal = obj.workOrCompanyName
				var city = obj.city
				this.$router.push({
					name: 'studentEmployJob',
					query: {
						inputVal: inputVal,
						city: city.join('-')
					}
				})
			},
			getEmployList () {
				var _this = this
				var stuId = this.stuId;
				var formData = new FormData();
				formData.append('userId',stuId);
				api.getEmplayList(formData).then(response =>{
					if(!response) {
						return false
					}
					if(response.data.meta.code == 200) {
						_this.recommendList = response.data.data.list
						formData.delete('userId')
					}
					
				})
			},
			collented (obj) {
			   var statu = obj.collectionStatus;
               var stuId = this.stuId;
				var companyId = obj.companyId;
				var releaseId = obj.id;
				var positionName = obj.positionName;
				var formData = new FormData();
				var _this = this
				formData.append('userId',stuId);
				formData.append('companyId',companyId);
				formData.append('positionName',positionName); 
				formData.append('releaseId',releaseId);
				if(!statu) {
					// 取消收藏
					api.cancelCollent(formData).then(response =>{
						if(!response) {
							return false
						}						
						if(response.data.meta.code == 200) {
							_this.$message({
								type:'success',
								message: '取消收藏成功'
							})
							_this.getEmployList() 
						}
						formData.delete('userId');
				        formData.delete('companyId');
				        formData.delete('positionName'); 
				        formData.delete('releaseId');
					})

				} else if(statu) {
					// 收藏
					api.collenting(formData).then(response =>{
						if(!response) {
							return false
						}						
						if(response.data.meta.code == 200) {
							_this.$message({
								type:'success',
								message: '收藏成功'
							})
							_this.getEmployList();
						}
						formData.delete('userId');
				        formData.delete('companyId');
				        formData.delete('positionName'); 
				        formData.delete('releaseId');
					})					
				}			   
			   
			},
			moreBox (event,id) {
				var target = event.target.className
				$('#' + id).find('.' + target).css('display','none');
				$('#' + id).children('dd.industry_category').height('auto');
			}
		},
		created () {
			this.$nextTick(function () {
			    var _this = this
				common.getPositionData().then(response =>{
					if(!response) {
						return false
					}
					if(response.data.meta.code == '200') {
						_this.industryList = response.data.data
					} 
				})
			})
		},
		mounted () {
			this.stuId = window.sessionStorage.getItem('stuId')
			console.log(this.stuId + '++++++++++++')
			this.$nextTick(function () {
			    var _this = this
				common.getPositionData().then(response =>{
					if(!response) {
						return false
					}
					if(response.data.meta.code == '200') {
						_this.industryList = response.data.data
					} 
				})
			})
			// 调取招聘首页的列表数据
		    this.getEmployList()
		    
		},
		components:{
			searchBox
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	.content{
		width:1200px;
        height:982px;
        // margin-top:16px;
        margin:16px auto;
        .stud_top{
        	height:429px;
        	display:flex;
        	.stud_top_left{
        		width:318px;
        		background:#fff;
        		margin-right:16px;
        		padding-left:32px;
        		overflow:hidden;
        		.industryPadding{
        			margin-bottom:10px;
        		}
        		.industry_category{
        			height:35px;
        			line-height:35px;
        			overflow:hidden;
        			.industry_list{
	        			color:#333;
	        			font-size:14px;

        			}
        			.industry_flex{
        				display:inline-block;
        				padding: 0 10px;
        				margin: 0 5px 8px 0;
        			}
        		}
        	}
        	.stud_top_right{
        		flex:1;
        		.stud_top_right_top{
        			height:60px;
        		}
        		.stud_top_right_bottom{
        			height:346px;
        			margin-top:24px;
        			background:lightBlue;

        		}
        	}
        }
        .stud_buttom{
        	margin-top:24px;
        	min-height:529px;
        	background:#fff;
        	padding-left:32px;
        	padding-right:30px;
        	.recommendList{
        		wdith:100%;
        		display:flex;
        		align-items:center;
        		justify-content:space-between;
        		height:130px;
        		border-bottom:1px solid #ebebeb;
        	}

        }
	}
	.industry_title{
	    color:#000;
	    font-size:18px;
	    line-height:35px;
	    padding-top:15px;
	    position:relative;
	    .moreBtn{
        	position:absolute;
        	right:5px;
        	bottom:0;
        	font-size:10px;
        	color:#333;
        	cursor:pointer;
        }
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
	.login{
		cursor:pointer;
	}
	.scroll_box{
		width:286px;
		height:379px;
		overflow-y:auto;
		overflow-x:hidden;
	}
	 /*滚动条样式*/
        .scroll_box::-webkit-scrollbar {/*滚动条整体样式*/
            width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 0px;
        }
        .scroll_box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(0,0,0,0.2);
        }
        .scroll_box::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgba(0,0,0,0.1);
        }
</style>
