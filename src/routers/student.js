
import stufund from '../views/student/stufund.vue'
import sLeave from '../views/student/SLeave.vue'
import Personal from '../views/student/personal'
import Changepersonal from '../views/student/changepersonal'
import Accountsetings from '../views/student/accountsetings'
import Setpassword from '../views/student/setpassword'
import Setphone from '../views/student/setphone'
import Setemail from '../views/student/setemail'
import replaceDorm from '../views/student/replaceDorm.vue'
import replacePro from '../views/student/replacePro.vue'
import divideClass from '../views/student/divideClass.vue'
export const STUDENT = [
    {
        path: '/stufund',
        component: stufund,
        name: 'stufund'
    },
    {
        path: '/sLeave',
        component: sLeave,
        name:'sLeave'
    },
    {
        path: '/student/personal',
        component: Personal,
        name: 'Personal'
    },
    {
        path: '/student/changepersonal',
        component: Changepersonal,
        name: 'changepersonal'
    },
    {
        path: '/student/accountsetings',
        component: Accountsetings,
        name: 'accountsetings'
    },
    {
        path: '/student/setpassword',
        component: Setpassword,
        name: 'setpassword'
    },
    {
        path: '/student/setphone',
        component: Setphone,
        name: 'setphone'
    },
    {
        path: '/student/setemail',
        component: Setemail,
        name: 'setemail'
    },
    {
        path: '/replaceDorm',
        component: replaceDorm,
        name: 'replaceDorm'
    },
    {
        path: '/replacePro',
        component: replacePro,
        name: 'replacePro'
    },
    {
        path: '/divideClass',
        component: divideClass,
        name: 'divideClass'
    }
]