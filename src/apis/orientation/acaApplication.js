import get from '../../utils/get'
import post from '../../utils/post'

export default {
    loadSelect(data) {//加载校区
		return get({
            url: '/uc/common/ctrl/findOfficeByPid',
            params: data
		})
    },
    // 通过专业加载班级
    findClazzByPro(data){
        return get({
            url: '/uc/sys/clazz/findClazzByPro',
            params: data
        })
    }
}