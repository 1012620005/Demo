// 分班
import classDis from '../views/orientation/classCenter/classdisMan/classDis.vue'
import classDis2 from '../views/orientation/classCenter/classdisMan/classDis2.vue'
import acaApplication from '../views/orientation/classCenter/acaApplication.vue'
import replacement from '../views/orientation/classCenter/replacement.vue'
import counselorAudit from '../views/orientation/classCenter/counselorAudit.vue'
import ofaudit from '../views/orientation/classCenter/ofaudit.vue'
import deptAudit from '../views/orientation/classCenter/deptAudit.vue'
import stumajors from '../views/orientation/classCenter/stumajors.vue'
import councheckClass from '../views/orientation/classCenter/councheckClass.vue'
import acassigClass from '../views/orientation/classCenter/acassigClass.vue'//教务处审核更换班级
import studivClass from '../views/orientation/classCenter/studivClass.vue'//教务处审核更换班级
// 招生管理
// ***学生***
import entApply from '../views/orientation/recruitAdmin/stuAdmin/entApply.vue'
import payBusiness from '../views/orientation/recruitAdmin/stuAdmin/payBusiness.vue'
import payBusinessline from '../views/orientation/recruitAdmin/stuAdmin/payBusinessline.vue'
import paymentList from '../views/orientation/recruitAdmin/stuAdmin/paymentList.vue'
import stupayCost from '../views/orientation/recruitAdmin/stuAdmin/stupayCost.vue'
// ***学校***
import enrollPlan from '../views/orientation/recruitAdmin/schoolAdmin/enrollPlan.vue'
import revapplicant from '../views/orientation/recruitAdmin/schoolAdmin/revapplicant.vue'
import newenrman from '../views/orientation/recruitAdmin/schoolAdmin/newenrman.vue'
import goodsRece from '../views/orientation/recruitAdmin/schoolAdmin/goodsRece.vue'
import goodsreceStu from '../views/orientation/recruitAdmin/schoolAdmin/goodsreceStu.vue'
import goodsreceSearch from '../views/orientation/recruitAdmin/schoolAdmin/goodsreceSearch.vue'
import newReport from '../views/orientation/recruitAdmin/schoolAdmin/newReport.vue'
import issueManage from '../views/orientation/recruitAdmin/schoolAdmin/issueManage.vue' //物品管理发布
import reportSingle from '../views/orientation/recruitAdmin/schoolAdmin/reportSingle.vue' //报到单身份验证
import featclassSet from '../views/orientation/recruitAdmin/schoolAdmin/featclassSet.vue' //特色班
import enrollChart from '../views/orientation/recruitAdmin/schoolAdmin/enrollChart.vue' //招生统计图
// 宿舍管理
import createDorm from '../views/orientation/distdormitory/createDorm.vue'
import crDormitory from '../views/orientation/distdormitory/crDormitory.vue'
import departDorm from '../views/orientation/distdormitory/departDorm.vue'//院系宿舍分配
import departDorm2 from '../views/orientation/distdormitory/departDorm2.vue'
import majDorm from '../views/orientation/distdormitory/majDorm.vue'//专业宿舍分配
import majDorm2 from '../views/orientation/distdormitory/majDorm2.vue'
import classDorm from '../views/orientation/distdormitory/classDorm.vue'//班级宿舍分配
import classDorm2 from '../views/orientation/distdormitory/classDorm2.vue'
import stuDorm from '../views/orientation/distdormitory/stuDorm.vue'//学生宿舍分配
import auddormDepart from '../views/orientation/distdormitory/auddormDepart.vue'//院系宿舍审核
import auddormMajor from '../views/orientation/distdormitory/auddormMajor.vue'//专业宿舍审核
import auddormClass from '../views/orientation/distdormitory/auddormClass.vue'//班级宿舍审核
import stucheckDorm from '../views/orientation/distdormitory/stucheckDorm.vue'//学生退宿管理
import stuhoMan from '../views/orientation/distdormitory/stuhoMan.vue'//学生宿舍管理

export const ORIENTATION = [
    // 分班
	{
        path: '/classCenter/classDis',
        component: classDis,
        name: 'classDis'
    },
    {
        path: '/classCenter/classDis2',
        component: classDis2,
        name: 'classDis2'
    },
    {
        path: '/classCenter/acaApplication',
        component: acaApplication,
        name: 'acaApplication'
    },
    {
        path: '/classCenter/replacement',
        component: replacement,
        name: 'replacement'
    },
    {
        path: '/classCenter/counselorAudit',
        component: counselorAudit,
        name: 'counselorAudit'
    },
    {
        path: '/classCenter/ofaudit',
        component: ofaudit,
        name: 'ofaudit'
    },
    {
        path: '/classCenter/deptAudit',
        component: deptAudit,
        name: 'deptAudit'
    },
    {
        path: '/classCenter/stumajors',
        component: stumajors,
        name: 'stumajors'
    },
    {
        path: '/classCenter/studivClass',
        component: studivClass,
        name: 'studivClass'
    },
    {//教务处审核更换班级
        path: '/classCenter/acassigClass',
        component: acassigClass,
        name: 'acassigClass'
    },{
        path: '/classCenter/councheckClass',
        component: councheckClass,
        name: 'councheckClass'
    },
    // 招生管理
    // ***学生***
    {
        path: '/recruitAdmin/entApply',
        component: entApply,
        name: 'entApply'
    },
    {
        path: '/recruitAdmin/payBusiness',
        component: payBusiness,
        name: 'payBusiness'
    },
    {
        path: '/recruitAdmin/payBusinessline',
        component: payBusinessline,
        name: 'payBusinessline'
    },
    {
        path: '/recruitAdmin/paymentList',
        component: paymentList,
        name: 'paymentList'
    },
    {
        path: '/recruitAdmin/stupayCost',
        component: stupayCost,
        name: 'stupayCost'
    },
    // ***学校***
    {
        path: '/recruitAdmin/enrollPlan',
        component: enrollPlan,
        name: 'enrollPlan'
    },
    {
        path: '/recruitAdmin/revapplicant',
        component: revapplicant,
        name: 'revapplicant'
    },
    {
        path: '/recruitAdmin/newenrman',
        component: newenrman,
        name: 'newenrman'
    },
    {
        path: '/recruitAdmin/goodsRece',
        component: goodsRece,
        name: 'goodsRece'
    },
    {
        path: '/recruitAdmin/goodsreceStu',
        component: goodsreceStu,
        name: 'goodsreceStu'
    },
    {
        path: '/recruitAdmin/goodsreceSearch',
        component: goodsreceSearch,
        name: 'goodsreceSearch'
    },
    {
        path: '/recruitAdmin/newReport',
        component: newReport,
        name: 'newReport'
    },
    {
        path: '/recruitAdmin/issueManage',
        component: issueManage,
        name: 'issueManage'
    },
    {
        path: '/recruitAdmin/reportSingle',
        component: reportSingle,
        name: 'reportSingle'
    },
    {
        path: '/recruitAdmin/featclassSet',
        component: featclassSet,
        name: 'featclassSet'
    },
    {
        path: '/recruitAdmin/enrollChart',
        component: enrollChart,
        name: 'enrollChart'
    },
    // 宿舍管理
    {
        path: '/distdormitory/createDorm',
        component: createDorm,
        name: 'createDorm'
    },
    {
        path: '/distdormitory/crDormitory',
        component: crDormitory,
        name: 'crDormitory'
    },
    {
        path: '/distdormitory/departDorm',//院系宿舍分配
        component: departDorm,
        name: 'departDorm'
    },
    {
        path: '/distdormitory/departDorm2',
        component: departDorm2,
        name: 'departDorm2'
    },
    {
        path: '/distdormitory/majDorm',//专业宿舍分配
        component: majDorm,
        name: 'majDorm'
    },
    {
        path: '/distdormitory/majDorm2',
        component: majDorm2,
        name: 'majDorm2'
    },
    {
        path: '/distdormitory/classDorm',//班级宿舍分配
        component: classDorm,
        name: 'classDorm'
    },
    {
        path: '/distdormitory/classDorm2',
        component: classDorm2,
        name: 'classDorm2'
    },
    {
        path: '/distdormitory/stuDorm',//学生宿舍分配
        component: stuDorm,
        name: 'stuDorm'
    },
    {
        path: '/distdormitory/auddormDepart',//院系宿舍审核
        component: auddormDepart,
        name: 'auddormDepart'
    },
    {
        path: '/distdormitory/auddormMajor',//专业宿舍审核
        component: auddormMajor,
        name: 'auddormMajor'
    },
    {
        path: '/distdormitory/auddormClass',//班级宿舍审核
        component: auddormClass,
        name: 'auddormClass'
    },
    {
        path: '/distdormitory/stucheckDorm',//学生退宿管理
        component: stucheckDorm,
        name: 'stucheckDorm'
    },
    {
        path: '/distdormitory/stuhoMan',//学生宿舍管理
        component: stuhoMan,
        name: 'stuhoMan'
    }
]