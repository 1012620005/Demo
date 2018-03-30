import majorIndex from '../views/major/majorIndex.vue'
import professional from '../views/major/professional.vue'
import majorSetUp from '../views/major/majorSetUp.vue'
import schoolLength from '../views/major/schoolLength.vue'
import schoolLevel from '../views/major/schoolLevel.vue'

export const MAJOR = [
    {
        path: '/major/majorIndex',
        component: majorIndex,
        name: 'majorIndex',
        children:[
            {
                name:'majorSetUp',
                component: majorSetUp,
                path:'' 
            },
            {
                name:'professional',
                component: professional,
                path:'/major/professional'
            },
            {
                name:'schoolLength',
                component: schoolLength,
                path:'/major/schoolLength'
            },
            {
                name:'schoolLevel',
                component: schoolLevel,
                path:'/major/schoolLevel' 
            },

        ]
    }
]