import equipRepainManage from '../views/schmanage/equipRepairManage.vue'
// 加班管理
import ovtimanage from '../views/schmanage/ovtimanage.vue'
// 值班管理
import dutymanage from '../views/schmanage/dutymanage.vue'

export const SCHMANAGE = [
	{
		path: '/equipRepainManage',
		component: equipRepainManage,
		name: 'equipRepainManage'
	},
	{
        path: '/ovtimanage',
        component: ovtimanage,
        name: 'ovtimanage'
    },
    {
        path: '/dutymanage',
        component: dutymanage,
        name: 'dutymanage'
    }
]