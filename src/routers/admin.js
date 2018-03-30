import resource from '../views/admin/resource.vue'
import assets from '../views/admin/Assets/index.vue'
import consum from '../views/admin/consum/index.vue'
import auditzc from '../views/admin/AuditZc/index.vue'
import repair from '../views/admin/repair/repair.vue'
import shrepair from '../views/admin/repair/shrepair.vue'
import evaluate from '../views/admin/evaluate/index.vue'
import stuesttch from '../views/admin/evaluate/stuesttch.vue'
import teacherDu from '../views/admin/evaluate/teacherDu.vue'
import teacherinfo from '../views/admin/evaluate/teacherinfo.vue'
import seeEvaluate from '../views/admin/evaluate/seeEvaluate.vue'
import punish from '../views/admin/punish.vue'
import punishstu from '../views/admin/punishstu.vue'
import posts from '../views/admin/posts.vue'
import meeting from '../views/admin/meeting.vue'
import salary from '../views/admin/salary.vue'
export const ADMIN = [
    {
        path: '/admin/resource',
        component:resource,
        name: 'resource'
    },
    {
        path: '/admin/assets',
        component:assets,
        name: 'assets'
    },
    {
        path: '/admin/consum',
        component:consum,
        name: 'consum'
    },
    {
        path: '/admin/auditzc',
        component:auditzc,
        name: 'AuditZc'
    },
    {
        path: '/admin/repair',
        component:repair,
        name: 'repair'
    }, 
    {
        path: '/admin/shrepair',
        component:shrepair,
        name: 'shrepair'
    },
    {
        path: '/admin/evaluate',
        component:evaluate,
        name: 'evaluate'
    },
    {
        path: '/admin/stuesttch',
        component:stuesttch,
        name: 'stuesttch'
    },
    {
        path: '/admin/teacherDu',
        component:teacherDu,
        name: 'teacherDu'
    },
    {
        path: '/admin/teacherinfo',
        component:teacherinfo,
        name: 'teacherinfo'
    },
    {
        path: '/admin/seeEvaluate',
        component:seeEvaluate,
        name: 'seeEvaluate'
    },
    {
        path: '/admin/punish',
        component:punish,
        name: 'punish'
    },
    {
        path: '/admin/punishstu',
        component:punishstu,
        name: 'punishstu'
    },
    {
        path: '/admin/posts',
        component:posts,
        name: 'posts'
    },
    {
        path: '/admin/meeting',
        component: meeting,
        name: 'meeting'
    },
    {
        path: '/admin/salary',
        component: salary,
        name: 'salary'
    },
]