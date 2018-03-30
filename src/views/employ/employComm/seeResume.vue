<template>
	<el-dialog
	  title="查看简历"
	  :visible.sync="seeForm.dialogVisible" @close="close" class="dialogImg">
		<div class="resumeLeft">
			<p class="updateTip">最后更新{{updateTipTime}}</p>
			<div class="resumeMessage">
				<div class="presonalInformation">
					<div class="presonalInformation_left">
					    <div class="presonalInfo">
							<p class="presonalOne" style="margin-top:37px;">
								<span class="presonalName">{{seeForm.name}}</span>
								<i class="women" v-show="seeForm.sex == '2'"></i>
								<i class="men" v-show="seeForm.sex == '1'"></i>
								<span class="sex" :class="[ seeForm.sex == '2'?'colorwomen': 'colormen']">{{ seeForm.sex == '2'? '女' : '男' }}</span>
							</p>
							<p class="presonalOne" style="padding:28px 0 29px;">
								<span class="presonalList" style="padding-right:34px;">{{ seeForm.workTime }}</span>
								<span class="presonalList" style="padding-right:34px;">{{ seeForm.education }}</span>
								<span class="presonalList" style="pading-top:">{{ seeForm.intern == '0'? '离职': '在职' }}</span>
							</p>
							<p class="presonalOne" style="padding-bottom:40px;">
								<i class="telIcon"></i><span class="presonalList" style="margin-right:17px;">{{ seeForm.telNumber }}</span>
								<i class="weChatIcon"></i><span class="presonalList">{{ seeForm.weChat }}</span>
							</p>
						</div>
					</div>
					<div class="presonalInformation_right">
						<img :src="seeForm.photoImg" class="presonal_photo"/>
					</div>
				</div>
				<div class="presonalAdvantage">
					<div class="presonalAdCon">
						<h4 class="advantageTitle">
							<span>我的优势</span>
						</h4>
						<p class="presonalList">{{seeForm.advantage}}</p>						
					</div>
				</div>

				<div class="presonalAdvantage">
					<h4 class="advantageTitle">
						<span>工作经历</span>
					</h4>
					<ul>
						<li v-for="item in seeForm.workExperience" class="workLists">
							<h4 class="comName">{{ item.companyName }}</h4>
							<p class="comList">
								<span>职位名称:</span><span>{{item.jobTitle}}</span>
								<span>所属行业:</span><span>{{item.industryInvolved}}</span>
							</p>
							<p class="comList">
							   <span>在职时间:</span><span>{{item.workStartTime}} - {{item.workEndTime}}</span>
								<span>所属部门:</span><span>{{item.departMent}}</span>
							</p>
							<dl class="comList comListDl">
								<dt>技能标签:</dt>
								<dd>
									<span class="label">{{ item.skillsLabel }}</span>
								</dd>
							</dl>
							<dl class="comList comListDl">
								<dt>工作内容:</dt>
								<dd>{{ item.jobContent }}</dd>
							</dl>
						</li>
					</ul>
						
				</div>
				<div class="presonalAdvantage">
					<h4 class="advantageTitle">
						<span>教育经历</span>
					</h4>
					<ul>
						<li class="workLists">
							<p class="">{{seeForm.educations.schoolName }}</p>
							<p class="comList">
								<span>开始时间:</span><span>{{ seeForm.educations.studyStartTime }}</span>
								<span>结束时间:</span><span>{{ seeForm.educations.studyEndTime }}</span>
							</p>
							<p class="comList">
								<span>学历:</span><span>{{ seeForm.educations.education }}</span>
							</p>
						</li>
					</ul>
				</div>				
			</div>
		</div>
    </el-dialog>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				updateTipTime: '2017-10-18'
			}
		},
		props:{
			seeForm:{
				dialogVisible:  Boolean,
				id: '',
				name: '',
				sex: '',
				workTime: '',
				education: '',
				intern: '',
				telNumber: '',
				weChat: '',
				photoImg:'static/img/defaultPhoto.png',
				advantage: '',
				workExperience:[
					{
						companyName: '',
						jobTitle: '',
						industryInvolved: '',
						positionTime: '',
						departMent: '',
						skillsLabel:'',
						jobContent: ''
					}
				],
				educations:{
					schoolName: '',
					studyStartTime: '',
					studyEndTime: '',
					education: ''
				}
			}
		},
		methods:{
			close () {
				this.$emit('close')
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	.women{
		display:inline-block;
		width:13px;
		height:13px;
		background:url(../../../assets/img/connet/women.png) no-repeat;
	}
	.men{
		display:inline-block;
		width:13px;
		height:13px;
		background:url(../../../assets/img/connet/men.png) no-repeat;
	}
	 .colormen{
	 	color:#5ea9f5;

	 }
     .colorwomen{
     	color:#ef0000;
     }	
.presonalInformation{
	display:flex;
	 justify-content:space-between;
	 // 学生名字
	 .presonalName{
	 	font-size:18px;
	 	color:#333;
	 	font-weight:bold;
	 }
	 .sex{
	 	font-size:12px;
	 }
     .absoluteEditor{
     	margin-left:170px;
     }
     .presonalList{
     	color: #333;
     	font-size:14px;
     	padding-left:10px;
     }
     .presonalInformation_right{
     	width:80px;
     	height:80px;
     	border-radius:50%;
     	overflow:hidden;
     }
}  
	.advantageTitle{
		border-bottom:1px solid #eee;
	    height:30px;
	    line-height:30px;
	    color:#333;
	    font-size:16px;
	    font-weight:normal;
	    display:flex;
	    justify-content:space-between;
	    padding-top:32px;
	    margin-bottom:21px;
	}  
.comList{
	margin-top:15px;
}
.comListDl{
	display:flex;
	dt{
		width:80px;
	}
	dd{
		flex:1;
	}
	.label{
		display:inline-block;
		padding: 8px 11px;
		border:1px solid #ccc;
		border-radius:10%;
		margin-right:16px;
	}
} 
</style>