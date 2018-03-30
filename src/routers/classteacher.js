import Studentmanagement from '../views/teacherclass/studentmanagement.vue'
import Personal from '../views/teacherclass/personal.vue'
import Changepersonal from '../views/teacherclass/changepersonal.vue'
export const CLASSTEACHER = [
	{
        path: '/teacherclass/studentmanagement',
        component: Studentmanagement,
        name: 'studentmanagement'
    },
    {
        path: '/teacherclass/personal',
        component: Personal,
        name: 'personal'
    },
    {
        path: '/teacherclass/changepersonals',
        component: Changepersonal,
        name: 'changepersonals'
    }

]