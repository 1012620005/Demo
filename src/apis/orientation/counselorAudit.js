import get from '../../utils/get'
import post from '../../utils/post'

export default{
    loadPro(data){//根据辅导员查询专业和班级
        return get({
            url: '/uc/sys/clazz/findProByFdy',
            params: data
        })
    },
    // 查询需要转出的学生
    getOldCPDEM(data){
        return get({
            url: '/work1/changecpdm/changecpdm/getOldCPDEM',
            params: data
        })
    },
    // 班主任查询需要转入的学生
    getNewCPDEMForTeac(data){
        return get({
            url: '/work1/changecpdm/changecpdm/getNewCPDEMForTeac',
            params: data
        })
    },
    // 获取所有年级
    findAllGrade(){
        return get({
            url:'/uc/common/ctrl/findAllGrade'
        })
    },
    // 通过专业年级查询班级
    findClazzByPro(data){
        return get({
            url:'/uc/sys/clazz/findClazzByPro',
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