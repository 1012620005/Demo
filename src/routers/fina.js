import finaIndex from '../views/fina/index.vue'
// 工资管理
import wagemanage from '../views/fina/wagemanage.vue'

export const FINA = [
	{
		path:'/finaIndex',
		component: finaIndex,
		name: 'finaIndex'
	},
	{
		path:'/wagemanage',
		component: wagemanage,
		name: '工资管理'
	}
]