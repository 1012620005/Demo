import get from '../../utils/get'
import post from '../../utils/post'

export default{
    // 通过token获取用户信息
    getCurrentUser(){
        return get({
            url:'/uc/sys/user/getCurrentUser'
        })
    },
    // 加载专业
    findOfficeByPid(data){
        return get({
            url:'/uc/common/ctrl/findOfficeByPid',
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