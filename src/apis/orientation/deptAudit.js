import get from '../../utils/get'
import post from '../../utils/post'

export default{
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
    },
    // 加载表格
    getAllChangeCPDEM(data){
        return get({
            url: '/work1/changecpdm/changecpdm/getAllChangeCPDEM',
            params: data
        })
    },
    // 获取所有年级
    findAllGrade(){
        return get({
            url:'/uc/common/ctrl/findAllGrade'
        })
    },
    getOldCPDEM(data){
        return get({
            url: '/work1/changecpdm/changecpdm/getOldCPDEM',
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