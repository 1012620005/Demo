import overtime from '../views/instructor/Overtime.vue'
import duty from '../views/instructor/Duty.vue'
import facsalary from '../views/instructor/facsalary.vue'

import leaveManage from '../views/instructor/leaveManage.vue'
import TechLeave from '../views/instructor/TeLeave.vue'
import research from '../views/instructor/researchCenter/research.vue'
import reseDetails from '../views/instructor/researchCenter/reseDetails.vue'
import teamEvaluate from '../views/instructor/researchCenter/teamEvaluate.vue'
import teamView from '../views/instructor/researchCenter/teamView.vue'
import groupView from '../views/instructor/researchCenter/groupView.vue'
// 任课老师首页
import  instructorIndex from '../views/instructor/index.vue'
// 班级通知
import classNote from '../views/instructor/classNote.vue'

export const INSTRUCTOR = [
	{
        path: '/overtime',
        component: overtime,
        name: 'overtime'
    },
    {
        path: '/duty',
        component: duty,
        name: 'duty'
    },
    {
        path: '/facsalary',
        component: facsalary,
        name: '教职工工资'
    },
    {
        path: '/leaveManage',
        component: leaveManage,
        name: 'leaveManage'
    },
    {
        path: '/TechLeave',
        component: TechLeave,
        name: 'TechLeave'
    },
    {
        path: '/research',
        component: research,
        name: 'research'
    },
    {
        path: '/reseDetails',
        component: reseDetails,
        name: 'reseDetails'
    },
    {
        path: '/teamEvaluate',
        component: teamEvaluate,
        name: 'teamEvaluate'
    },
    {
        path: '/teamView',
        component: teamView,
        name: 'teamView'
    },
    {
        path: '/groupView',
        component: groupView,
        name: 'groupView'
    },
    {
        path: '/instructorIndex',
        component: instructorIndex,
        name: 'instructorIndex'
    },
    {
        path: '/classNote',
        component: classNote,
        name: 'classNote'
    }    
]