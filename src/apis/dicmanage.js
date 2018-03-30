import get from '../utils/get'
import post from '../utils/post'
export default {
    // 分页查询字典
    getPageList (data) {
        return get({
            url:'/uc/sys/dict/findPage',
            params:data
        })
    },
    //添加和编辑字典
    addOrEditorList (data) {
        return post({
            url:'/uc/sys/dict/saveDict',
            data:data
        })
    },
    // 删除字典
    deleteList (data) {
        return post({
            url:'/uc/sys/dict/deleteDict',
            data:data
        })
    }
}