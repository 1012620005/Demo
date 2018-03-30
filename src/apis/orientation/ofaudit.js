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
    },
    // 获取所有年级
    findAllGrade(){
        return get({
            url:'/uc/common/ctrl/findAllGrade'
        })
    },
    // 查询需要转出的学生
    getOldCPDEM(data){
        return get({
            url: '/work1/changecpdm/changecpdm/getOldCPDEM',
            params: data
        })
    },
    // 院系查询进入的学生
    getNewCPDEMForDept(data){
        return get({
            url: '/work1/changecpdm/changecpdm/getNewCPDEMForDept',
            params: data
        })
    },
    // 学生更换专业班级同意接口
    agreeChangeCPDEM(data){
        return get({
            url: '/work1/changecpdm/changecpdm/agreeChangeCPDEM',
            params: data
        })
    },
    // 不同意学生更换专业申请
    disAgreeChangeCPDEM(data){
        return get({
            url: '/work1/changecpdm/changecpdm/disAgreeChangeCPDEM',
            params: data
        })
    }
}