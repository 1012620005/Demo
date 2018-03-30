/**
 * Created by daibi on 17/4/14.
 */
import home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/common/404.vue'
export const COMMONS = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];