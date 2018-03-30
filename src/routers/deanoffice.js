import stuproManage from '../views/deanOffice/stuproManage.vue'
import stuhostelMana from '../views/deanOffice/stuhostelMana.vue'
import Teachermanagement from '../views/deanOffice/teachermanagement.vue'
import teLmanage from '../views/deanOffice/teLManage.vue'
import deanOfficeIndex from '../views/deanOffice/index.vue'
// 资助管理
import deanfund from '../views/deanOffice/Deanfund.vue'
// 学生档案
import stufile from '../views/deanOffice/stufile.vue'
// 教师档案
import teafile from '../views/deanOffice/teafile.vue'
// 审核工作流
import auditWorkFlow from '../views/deanOffice/auditWorkFlow.vue'

// 企业招聘管理
import employManage from '../views/deanOffice/employManage.vue'
// 学生就业
import studentEmploy from '../views/deanOffice/studentEmploy.vue'
// 审核公司信息
import auditCompanyInfo from '../views/deanOffice/auditCompanyInfo.vue'
export const ACADEMICOFFICE = [
	{
        path: '/stuproManage',
        component: stuproManage,
        name: 'stuproManage'
    },
    {
        path: '/stuhostelMana',
        component: stuhostelMana,
        name: 'stuhostelMana'
    },
    {
        path: '/deanOffice/teachermanagement',
        component: Teachermanagement,
        name: 'teachermanagement'
    },
    {
        path: '/teLmanage',
        component: teLmanage,
        name:'teLmanage'
    },
    {
        path: '/deanOfficeIndex',
        component: deanOfficeIndex,
        name: 'deanOfficeIndex'
    },
    {
        path: '/deanfund',
        component: deanfund,
        name: 'deanfund'
    },
    {
        path: '/stufile',
        component: stufile,
        name: 'stufile'
    },
    {
        path: '/teafile',
        component: teafile,
        name: 'teafile'
    },
    {
        path: '/auditWorkFlow',
        component: auditWorkFlow,
        name: 'auditWorkFlow'
    },{
        path: '/employManage',
        component: employManage,
        name: 'employManage',
        children:[
            {
                name:'studentEmploy',
                component: studentEmploy,
                path: ''
            },
            {
                name:'auditCompanyInfo',
                component: auditCompanyInfo,
                path:'/auditCompanyInfo'
            }
        ]
    } 
]