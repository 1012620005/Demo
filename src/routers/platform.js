// 问卷调查管理
import qunamage from '../views/platform/qunamage.vue'
import initquest from '../views/platform/initquest.vue'

export const PLATFORM = [
	{
        path: '/qunamage',
        component: qunamage,
        name: '问卷调查'
    },
    {
        path: '/initquest',
        component: initquest,
        name: '发起问卷'
    }
]