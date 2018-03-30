import get from '../../utils/get'
import post from '../../utils/post'

export default{
    // 根据token获取用户信息
    getCurrentUser(){
        return get({
            url:'/uc/sys/user/getCurrentUser'
        })
    },
    loadSelect(data) {//加载校区
		return get({
            url: '/uc/common/ctrl/findOfficeByPid',
            params: data
		})
    },
    // 通过专业加载班级
    findClazzByPro(data){
        return get({
            url: '/uc/common/ctrl/findClazzByPro',
            params: data
        })
    },
    // 点击提交（学生修改班级院系校区）
    applyChangeCPDM(data){
        return post({
            url:'/work1/changecpdm/changecpdm/applyChangeCPDM',
            data: data
        })
    },
    // 根据班级Id获取辅导员信息
    getTeach(data){
        return get({
            url: '/uc/sys/clazz/get',
            params: data
        })
    },
    // 通过学生Id查找学生提交的申请
    getStuInfo(data){
        return get({
            url: '/work1/changecpdm/changecpdm/getStuInfo',
            params: data
        })
    }
}