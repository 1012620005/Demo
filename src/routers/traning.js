import classProgram from '../views/traning/classProgram.vue'
import personProgram from '../views/traning/personProgram.vue'
import teachTask from '../views/traning/teachTask.vue'
import teachTaskAllot from '../views/traning/teachTaskAllot.vue'
import teachTaskAudit from '../views/traning/teachTaskAudit.vue'
import teachTaskApprove from '../views/traning/teachTaskApprove.vue'
export const TRANING = [
    {
        path:'/personProgram',
        name: 'personProgram',
        component:personProgram
    },
    {
        path:'/classProgram',
        name: 'classProgram',
        component:classProgram 
    },
    {
        path:'/teachTask',
        name: 'teachTask',
        component:teachTask
    },
    {
        path:'/teachTaskAllot',
        name: 'teachTaskAllot',
        component:teachTaskAllot
    },
    {
        path:'/teachTaskAudit',
        name: 'teachTaskAudit',
        component:teachTaskAudit  
    },
    {
        path:'/teachTaskApprove',
        name: 'teachTaskApprove',
        component:teachTaskApprove
    }
]