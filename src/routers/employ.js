import studentIndex from '../views/employ/studentEmploy/studentIndex.vue'
import companyIndex from '../views/employ/companyIndex.vue'
import companyMassage from '../views/employ/complayMessage.vue'
import companyPool from '../views/employ/campusPool.vue'
import publicJob from '../views/employ/publicJob.vue'
import interviewNote from '../views/employ/interviewNote.vue'
import jobInBox from '../views/employ/jobInBox.vue'
import offerLetter from '../views/employ/offerLetter.vue'
// 修改账户
import editorCompanyInformation from '../views/employ/editorCompanyInformation.vue'
// 公司注册
import companyLogin from '../views/employ/companyLogin.vue'
// 公司注册信息
import employStep1 from '../views/employ/employComm/employStep1.vue'
// 公司完善资料
import companyComplete from '../views/employ/companyComplete.vue'

// 公司登录

import companyEnter from '../views/employ/companyEnter.vue'

//  公司默认首页
import companyDefault from '../views/employ/companyDefault.vue'
// 学生的就业模块首页
import studentDefault from '../views/employ/studentEmploy/studentDefault.vue'
// 学生就业模块应聘职位
import studentEmployJob from '../views/employ/studentEmploy/studentEmployJob.vue'
// 学生的简历
import myResume from '../views/employ/studentEmploy/myResume.vue'
// 编辑简历
import editorResume from '../views/employ/studentEmploy/editorResume.vue'
// 公司详情
import companyDetial from '../views/employ/studentEmploy/companyDetial.vue'
// 收藏夹
import collentBox from '../views/employ/studentEmploy/collentBox.vue'
// 投递箱
import dropInBox from '../views/employ/studentEmploy/dropInBox.vue'
export const EMPLOY = [
	{
		path:'/studentIndex',
		component: studentIndex,
		name: 'studentIndex',
		children:[
			{
				path: '/studentIndex/studentDefault',
				component: studentDefault,
				name: 'studentDefault'
			},
			{
				path: '/studentEmployJob',
				component: studentEmployJob,
				name: 'studentEmployJob'
			},
			{
				path: '/myResume',
				component: myResume,
				name: 'myResume'
			},
			{
				path: '/editorResume',
				component: editorResume,
				name:'editorResume'
			},
			{
				path: '/companyDetial',
				component: companyDetial,
				name: 'companyDetial'
			},
			{
				path: '/collentBox',
				component: collentBox,
				name: 'collentBox'
			},
			{
				path: '/dropInBox',
				component: dropInBox,
				name: 'dropInBox'
			}
		]
	},
	{
		path: '/companyLogin',
		component: companyLogin,
		name: 'companyLogin',
		children:[
			{
				path: '',
				component: employStep1,
				name: 'employStep1'
			},
			{
				path: '/companyComplete',
				component: companyComplete,
				name: 'companyComplete'
			}
		]
	},
	{
		path:'/companyIndex',
		component: companyIndex,
		name: 'companyIndex',
		children:[
			{
				path: '/companyIndex/default',
				component:companyMassage,
				name:'companyMassage'
			},
			{
				path: '/companyPool',
				component: companyPool,
				name: 'companyPool'
			},
			{
				path: '/publicJob',
				component: publicJob,
				name: 'publicJob'
			},
			{
				path: '/interviewNote',
				component: interviewNote,
				name: 'interviewNote'
			},
			{
				path: '/jobInBox',
				component: jobInBox,
				name: 'jobInBox'
			},
			{
				path: '/editorCompanyInformation',
				component: editorCompanyInformation,
				name: 'editorCompanyInformation'
			},
			{
				path: '/offerLetter',
				component: offerLetter,
				name:'offerLetter'
			}
		]
	},{
		path: '/companyEnter',
		component: companyEnter,
		name: 'companyEnter'
	},
	{
		path: '/companyDefault',
		component: companyDefault,
		name: 'companyDefault',
		children:[
			{
				path: '',
				component: studentDefault,
				name: 'studentDefault'
			},
			{
				path: '/studentEmployJob',
				component: studentEmployJob,
				name: 'studentEmployJob'
			}			
		]
	}
]