// 通讯录班级和教职工首页的通讯录
import bookIndex from '../views/book/bookIndex.vue'
import classBook from '../views/book/classBook.vue'
import staffBook from '../views/book/staffBook.vue'
export const BOOK = [
    {
        path: '/book/bookIndex',
        component: bookIndex,
        name: 'bookIndex',
        children:[
            {
                name:'classBook',
                component: classBook,
                path:''
            },
            {
                name:'staffBook',
                component: staffBook,
                path:'/book/staffBook' 
            }
        ]
    }
]