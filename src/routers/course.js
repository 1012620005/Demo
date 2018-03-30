
import Siteindex from '../views/course/site/index.vue'
import Scheduindex from '../views/course/scheduling/index.vue'
import Scheduindex1 from '../views/course/scheduling/index1.vue'
import Scheduindex2 from '../views/course/scheduling/index2.vue'
import Schedu1 from '../views/course/scheduling/schedu1.vue'
import Schedu2 from '../views/course/scheduling/schedu2.vue'
import Schedu3 from '../views/course/scheduling/schedu3.vue'
import Schedu4 from '../views/course/scheduling/schedu4.vue'
import Schedu5 from '../views/course/scheduling/schedu5.vue'
import Schedule1 from '../views/course/scheduling/Schedule1.vue'
import Schedule2 from '../views/course/scheduling/Schedule2.vue'
import Schedule3 from '../views/course/scheduling/Schedule3.vue'
import Lecture from '../views/course/Lecture/index.vue'
import Classteaching from '../views/course/Lecture/Classteaching.vue'
import Teachingstaff from '../views/course/Lecture/Teachingstaff.vue'
import allotsite from '../views/course/site/allotsite.vue'
import Room from '../views/course/site/room.vue'
import Specialsubject from '../views/course/site/specialsubject.vue'
import Setsite from '../views/course/site/setsite.vue'
import newSchedule from '../views/course/scheduling/newSchedule.vue'
import Grades from '../views/grade/grades.vue'
import executive from '../views/grade/executive.vue'
import classes from '../views/grade/classes.vue'
import Jc from '../views/grade/jc.vue'
import kb from '../views/course/kcb.vue'
import teakcb from '../views/course/teakcb.vue'
// const allotsite = resolve => {require.ensure(['../views/course/site/allotsite.vue'], () => {resolve(require('../views/course/site/allotsite.vue'))})}
// const Room = resolve => {require.ensure(['../views/course/site/room.vue'], () => {resolve(require('../views/course/site/room.vue'))})}
// const Specialsubject = resolve => {require.ensure(['../views/course/site/specialsubject.vue'], () => {resolve(require('../views/course/site/specialsubject.vue'))})}
// const Setsite = resolve => {require.ensure(['../views/course/site/setsite.vue'], () => {resolve(require('../views/course/site/setsite.vue'))})}
// const newSchedule = resolve => {require.ensure(['../views/course/scheduling/newSchedule.vue'], () => {resolve(require('../views/course/scheduling/newSchedule.vue'))})}
// const Grades = resolve => {require.ensure(['../views/grade/grades.vue'], () => {resolve(require('../views/grade/grades.vue'))})}
// const executive = resolve => {require.ensure(['../views/grade/executive.vue'], () => {resolve(require('../views/grade/executive.vue'))})}
// const classes = resolve => {require.ensure(['../views/grade/classes.vue'], () => {resolve(require('../views/grade/classes.vue'))})}
// const Jc = resolve => {require.ensure(['../views/grade/jc.vue'], () => {resolve(require('../views/grade/jc.vue'))})}
export const COURSE = [
    {
        path: '/course/kb',
        component:kb,
        name: 'kcb'
    },
    {
        path: '/course/teakcb',
        component:teakcb,
        name: 'teakcb'
    },
    {
        path: '/grade/jc',
        component:Jc,
        name: 'jc'
    },
    {
        path: '/grade/executive',
        component:executive,
        name: 'executive'
    },
    {
        path: '/grade/classes',
        component:classes,
        name: 'classes'
    },
    {
        path: '/grade/grades',
        component:Grades,
        name: 'grades'
    },
	{
        path: '/course/site/allotsite',
        component:allotsite,
        name: 'allotsite'
    },
    {
        path: '/course/site/room',
        component:Room,
        name: 'room'
    },
    {
        path: '/course/site/siteindex',
        component:Siteindex,
        name: 'siteindex'
    },
    {
        path: '/course/site/specialsubject',
        component:Specialsubject,
        name: 'specialsubject'
    },
    {
        path: '/course/site/scheduindex/newSchedule',
        component:newSchedule,
        name: 'newSchedule'
    },
    {
        path: '/course/Lecture',
        component: Lecture,
        name: 'lecture',
        children: [  
            { path: 'Classteaching', name: 'le1', component: Classteaching},  
            { path: 'Teachingstaff', name: 'le2', component: Teachingstaff},  
        ]
    },
    {
        path: '/course/scheduling/scheduindex',
        component: Scheduindex,
        name: 'scheduindex',
        children: [  
            { path: '1', name: 's1', component: Scheduindex1,
                children: [  
                    { path: 'schedu1', name: 'sc1', component: Schedu1}, 
                    { path: 'schedu2', name: 'sc2', component: Schedu2}, 
                    { path: 'schedu3', name: 'sc3', component: Schedu3},
                    { path: 'schedu4', name: 'sc4', component: Schedu4},
                    { path: 'schedu5', name: 'sc5', component: Schedu5},
                    { path: 'Schedule1', name: 'sce1', component: Schedule1},
                    { path: 'Schedule2', name: 'sce2', component: Schedule2},
                    { path: 'Schedule3', name: 'sce3', component: Schedule3},
                ]
            },  
            { path: '2', name: 's2', component: Scheduindex2,},  
        ]
    },
]