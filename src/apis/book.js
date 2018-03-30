import get from '../utils/get'
import post from '../utils/post'

export default{
    // 老师获取自己班学生的通讯录
    classBooks (data) {
        return get({
            url:'/uc/sys/abook/findPcTeaClazzBook',
            params:data
        })
    },
    // 学生获取自己班的通讯录
    stuClassBooks (data) {
        return get({
            url:'/uc/sys/abook/findPcStuBook',
            params: data
        })
    },
    // 获取教师的通讯录
    teachBooks (data) {
        return get({
            url:'/uc/sys/abook/findPcTeaBook',
            params: data
        })
    },
    // 获取所有年级的接口
    getGradeList () {
        return get({
            url:'/uc/common/ctrl/findAllGrade'
        })
    },
    // 根据专业和年级查询班级
    getClazzList (data) {
        return get({
            url:'/uc/sys/clazz/findClazzByPro',
            params:data
        })
    }
}