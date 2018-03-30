import counaid from '../views/counsellor/counaid.vue'
// 接收公文流转
import receiveCounsellor from '../views/counsellor/receiveOfficeFlow.vue'
//学生管理
import Studentmanagement from '../views/counsellor/studentmanagement.vue'
//个人信息 教职工通用
import Personal from '../views/counsellor/personal.vue'
//修改个人信息 教职工通用
import Changepersonal from '../views/counsellor/changepersonal.vue'
// 个人首页新页
import newIndex from '../views/counsellor/newIndex.vue'
// 更多页面
import morePage from '../views/counsellor/morePage.vue'
// 新的学生首页
import newStudent from '../views/counsellor/newStudent.vue'

// 图片首页
import echart from '../views/common/echart.vue'
export const COUNSELLOR = [
    {
        path: '/counaid',
        component: counaid,
        name: 'counaid'
    },
    {
        path:'/newIndex',
        component: newIndex,
        name: 'newIndex'
    },
    {
        path:'/echart',
        component: echart,
        name: 'echart'
    },
    {
        path: '/receiveCounsellor',
        component: receiveCounsellor,
        name: 'receiveCounsellor'
    },
    {
        path: '/counsellor/studentmanagement',
        component: Studentmanagement,
        name: 'studentmanagement'
    },
    {
        path: '/counsellor/personal',
        component: Personal,
        name: 'personal'
    },
    {
        path: '/counsellor/changepersonals',
        component: Changepersonal,
        name: 'changepersonals'
    },
    {
        path:'/morePage',
        name:'morePage',
        component:morePage
    },
    {
        path:'/newStudent',
        name:'newStudent',
        component: newStudent
    }
]