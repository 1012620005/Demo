
//机构管理
import RoleAssign from '../views/institution/roleAssign.vue'
import Indexs from '../views/institution/index.vue'
export const INSTITUTION = [
    {
        path: '/institution/roleAssign',
        component: RoleAssign,
        name: 'roleAssign'
    },
    {
        path: '/institution/index',
        component: Indexs,
        name: 'index'
    }
]