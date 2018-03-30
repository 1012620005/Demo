import Login from '../views/login/index.vue'
import test from '../views/login/test.vue'
import retrievePassword from '../views/login/retrievePassword.vue'
import StudentRegistration from '../views/Registration/studentRegistration.vue'
import TeacherRegistration from '../views/Registration/teacherRegistration.vue'
import ParentsRegistration from '../views/Registration/parentsRegistration.vue'
export const LOGIN = [
	{
        path: '/',
        component: Login,
        name: 'login'
    },
	{
        path: '/test',
        component: test,
        name: 'test'
    },    
    {
        path: '*',
        name: 'error_404',
        meta: {
            title: '404-页面不存在'
        },
        component: resolve => { require(['../views/common/404.vue'], resolve); }
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            title: '500-页面不存在'
        },
        component: resolve => { require(['../views/common/500.vue'], resolve); }
    },
    {
        path: '/report',
        name: 'report',
        meta: {
            title: '用户反馈'
        },
        component: resolve => { require(['../views/login/report.vue'], resolve); }
    },
    {
        path: '/studentRegistration',
        component: StudentRegistration,
        name: 'studentRegistration'
    },
    {
        path: '/teacherRegistration',
        component: TeacherRegistration,
        name: 'teacherRegistration'
    },
    {
        path: '/parentsRegistration',
        component: ParentsRegistration,
        name: 'parentsRegistration'
    },
    {
        path: '/retrievePassword',
        component: retrievePassword,
        name: 'retrievePassword'
    }
    
]