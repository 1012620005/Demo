import courseIndex from '../views/courseManage/courseIndex.vue'
import classification from '../views/courseManage/classification.vue'
import classType from '../views/courseManage/classType.vue'
import courseManage from '../views/courseManage/courseManage.vue'
export const COURSEMANAGE = [
    {
        path: '/courseManage/courseIndex',
        component: courseIndex,
        name: 'courseIndex',
        children:[
            {
                name:'classification',
                component: classification,
                path:''
            },
            {
                name:'classType',
                component: classType,
                path:'/courseManage/classType' 
            },
            {
                name:'courseManage',
                component: courseManage,
                path:'/courseManage/courseManage'  
            }
        ]
    }
]