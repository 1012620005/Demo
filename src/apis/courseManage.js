import get from '../utils/get'
import post from '../utils/post'
import apiUrl from '../utils/config'
import { getToken } from './../utils/auth'
export default{
    // 添加课程分类和课程类型的接口
    addClassifiCate (data) {
         return post({
            url:'/work1/course/saveCourseClass',
            data: data
         })
    },
    // 获取课程分类和课程类型的列表页的接口
    getCourseList (data) {
        return get({
            url:'/work1/course/findListCourseClassPage',
            params:data
        })
    },
    // 修改课程分类和课程类型接口
    updateClassifiCate (data) {
        return post({
            url:'/work1/course/updateCourseClass',
            data:data
        })
    },
    // 删除课程分类和课程类型的接口
    removeClassifiCate (data) {
        return get({
            url:'/work1/course/deleteCourseClass',
            params:data
        })
    },
    // 获取课程分类和课程类型的全部列表页
    getCourseAllList (data) {
        return get({
            url:'/work1/course/findListCourseClass',
            params:data
        })
    },
    // 添加课程管理
    addCourse (data) {
        return post({
            url:'/work1/course/save',
            data:data
        })
    },
    //修改课程管理
    updateCourse (data) {
        return post({
            url:'/work1/course/update',
            data:data
        })
    },
    // 删除课程管理
    deleteCourse (data) {
        return get({
            url:'/work1/course/delete',
            params:data
        })
    },
    // 获取课程列表
    getCourseAllLists (data) {
        return get({
            url:'/work1/course/findList',
            params:data
        })
    },
    //导入数据
    importData () {
        return apiUrl.BASE_URL + '/work1/course/courseImport?access_token='+getToken()
    },
    // 导出数据
    exportData () {
        return post({
            url:'/work1/course/courseExport'
        })
    },
    // 下载模板
    downLoadData () {
        return get({
            url:'/work1/course/downLoadCourse'
        })
    }
}