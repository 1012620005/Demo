import officeFlow from '../views/campusOffice/officeFlow.vue'
import officeFlowIndex from '../views/campusOffice/index.vue'
import campusNote from '../views/campusOffice/campusNote.vue'
import equipmentManage from '../views/campusOffice/equipmentManage.vue'
import workFlowList from '../views/campusOffice/workFlow.vue'
import calendarManage from '../views/campusoffice/calendarManage.vue'

// 日历组件的编辑

export const CAMPUSOFFICE = [
	{
        path: '/officeFlow',
        component: officeFlow,
        name: 'officeFlow'
    },
    {
    	path: '/officeFlowIndex',
    	component: officeFlowIndex,
    	name: 'officeFlowIndex'
    },
    {
        path: '/campusNote',
        component: campusNote,
        name: 'campusNote'
    },
    {
        path: '/equipmentManage',
        component: equipmentManage,
        name: 'equipmentManage'
    },
    {
        path: '/workFlowList',
        component: workFlowList,
        name: 'workFlowList'
    },
    {
        path: '/calendarManage',
        component: calendarManage,
        name: 'calendarManage',
        // children:[
        //     {
        //         name:'calendarIndex',
        //         path:'',
        //         component: calendarManage,
        //     },
        //     {
        //         name:'calendarEvent',
        //         path:'/calendarEvent',
        //         component: calendarEvent,
        //     }
        // ]

    }
]