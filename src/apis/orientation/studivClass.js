import get from '../../utils/get'
import post from '../../utils/post'
import apiUrl from '../../utils/config'
import { getToken } from '../../utils/auth'

export default{
    loadPro(data){//根据辅导员查询专业和班级
        return get({
            url: '/uc/sys/clazz/findProByFdy',
            params: data
        })
    },
    currentUser(){
        return get({
            url: '/uc/sys/user/getCurrentUser'
        })
    },
    // 根据班级id查找学生
    findStuByClazz(data){
        return get({
            url: '/uc/sys/clazz/findStuByClazz',
            params: data
        })
    },
    // 查看个人信息
    viewUserinfo(data){
        return get({
            url:'/uc/sys/user/viewUser',
            params: data
        })
    },
    excelClazzInfo(data){
        return apiUrl.BASE_URL + '/work1/clazzmanager/distritem/excelClazzInfo?access_token=' + getToken() + '&clazzId='
        // return get({
        //     url: '/work1/clazzmanager/distritem/excelClazzInfo',
        //     params: data
        // })
    },
    exportWordStuInfo(data){
        return apiUrl.BASE_URL + '/work1/clazzmanager/distritem/exportWordStuInfo?access_token=' + getToken() + '&useId='
        // return get({
        //     url: '/work1/clazzmanager/distritem/exportWordStuInfo',
        //     params: data
        // })
    }
}