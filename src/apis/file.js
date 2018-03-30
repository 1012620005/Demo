import get from '../utils/get'
import post from '../utils/post'
import delet from '../utils/delete'
import put from '../utils/put'
import apiUrl from '../utils/config'
import { getToken } from './../utils/auth'
export default{
    // 获取学历
    // getEdu(){
    //     return get({
    //         url: 'work1/jwCommon/getEducation'
    //     })
    // },
    // 获取性别
    // getSex(){
    //     return get({
    //         url: 'work1/jwCommon/getSex',
    //     })
    // },
    // 获取学年
    // getAcade(){
    //     return get({
    //         url: 'work1/jwCommon/getAllYear',
    //     })
    // },
    // 根据校区获取院系
    // getDepart(data){
    //     return get({
    //         url: 'work1/jwCommon/getOfficeDept',
    //         params: data
    //     })
    // },
    // 根据学院获取专业
    // getMajor(data){
    //     return get({
    //         url: 'work1/jwCommon/getOfficeMajor',
    //         params: data
    //     })
    // },
    // 根据年级、专业获取班级
    // getClass(data){
    //     return get({
    //         url: 'work1/jwCommon/getClazzByProAndGrade',
    //         params: data
    //     })
    // },
    // 获取学期
    // getTerm(){
    //     return get({
    //         url: 'work1/jwTermMamager/getAllTermId',
    //     })
    // },
    // 获取年级
    // getGrade(){
    //     return get({
    //         url: 'work1/jwCommon/getAllGrade',
    //     })
    // },
    // 获取学生档案列表
    // getStuList(data){
    //     return get({
    //         url: 'work1/fileManagement/studentFile',
    //         params: data
    //     })
    // },
    // 教职工职位状态
    // getJobSta(){
    //     return get({
    //         url: 'work1/jwCommon/getTeacherProStatus',
    //     })
    // },
    // 教职工分类
    // getStaffClass(){
    //     return get({
    //         url: 'work1/jwCommon/getTeacherClassify',
    //     })
    // },
    // 获取教师档案列表
    // getTeaList(data){
    //     return get({
    //         url: 'work1/fileManagement/teacherFile',
    //         params: data
    //     })
    // }
    // 根据字典类型查询所有数据
    getAllData(data){
        return get({
            url:'/uc/common/ctrl/getDictMapList',
            params: data
        })
    },
    // 保存或者修改学籍
    postStusta(data){
        return post({
            url:'/uc/schoolroll/save',
            data:data
        })
    },
    // 列表
    getStustaList(data){
        return get({
            url:'/uc/schoolroll/getList',
            params: data
        })
    },
    // 删除学籍
    postStustaDel(data){
        return post({
            url:'/uc/schoolroll/delete',
            data:data
        })
    },
    //学籍模板下载
    getExcelDown(){
        var url = apiUrl.BASE_URL + '/uc/common/学籍导入模板.xlsx'
        return url
    },
    // 导出学籍表
    getExportSheet(){
        var token = getToken()
        var url = apiUrl.BASE_URL + '/uc/schoolroll/excelSchoolRollInfo?access_token='+ token
        return url
    },
    // 导入学籍列表
    getImportSheet(){
        return apiUrl.BASE_URL + '/uc/schoolroll/importSchoolRollInfo?access_token='+getToken()
        // return get({
        //     url:'/uc/schoolroll/excelSchoolRollInfo',
        //     params:data
        // })
    }
}