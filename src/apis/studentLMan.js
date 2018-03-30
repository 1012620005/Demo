import get from '../utils/get'
import post from '../utils/post'

export default{
    // 获取离校管理的列表页面
    getLeaveList (data) {
        return post({
            url: '',
            data:data
        })
    },
    // 领取毕业证
    getDip (data) {
        return post({
            url: '',
            data:data
        })
    },
    // 补领毕业证
    replaceDip (data) {
        return post({
            url: '',
            data:data
        })
    },
    
}