import get from '../utils/get'
export default {
    // 获取所有校区
    getCampus(){
        return get ({
            url: 'work1/jwCommon/getOffice'
        }) 
    },
    // 通过校区查询老师
    queryduty(data){
        return get({
            url: 'work1/jwCommon/findTeacherByOffice',
            params: data
        })
    },
    // 通过校区获取院系
    departQueryCamp(data){
        return get({
            url: 'work1/jwCommon/getOfficeDept',
            params: data
        })
    },
    // 获取专业类
    getProClass(data){
        return get({
            url:'/uc/common/ctrl/findOffice',
            params: data
        })
    },
    // 获取所有专业
    getAllMajor(){
        return get({
            url:'/uc/common/ctrl/findAllPro',
        })
    },
    // 根据学院获取专业
    majorQueryDepart(data){
        return get({
            url: 'work1/jwCommon/getOfficeMajor',
            params: data
        })
    },
    // 获取所有的院系专业班级
    getDepart (data) {
        return get({
            url:'uc/common/ctrl/findOfficeByPid',
            params:data
        })
    },
    // 获取所有年级
    getAllGrade(){
        return get({
            url: 'work1/jwCommon/getAllGrade',
        })
    },
    // 根据专业年级获取班级
    classQueryMajor(data){
        return get({
            url: 'work1/jwCommon/getClazzByProAndGrade',
            params: data
        })
    },
    // 通过班级查询学生
    classQueryStu(data){
        return get({
            url: 'work1/jwCommon/findStuByClazz',
            params: data
        })
    },
    // 获取助学类型
    getFundType(){
        return get ({
            url: 'work1/jwCommon/getStudyCapital',
        })
    },
    // 获取学期
    getTerm(){
        return get({
            url:'work1/jwTermMamager/getAllTermId',
        })
    }, 
    // 通过学号获取学生信息
    getStuInfo(data){
        return get({
            url:'/uc/sys/user/getStuByNo',
            params: data
        })
    },
    // 获取奖学金等级
    getRank(){
        return get({
            url:'work1/common/getScholarshipType',
        })
    },
    // 获取审核状态
    getAudSta(){
        return get({
            url:'work1/jwCommon/getStatusType'
        })
    },
    // 获取当前用户的信息
    getUserMsg (data) {
        return get({
            url: 'uc/sys/user/getCurrentUser',
            params: data
        })
    },
    // 如果是教师的话获取当前用户所教的班级和专业
    getPofAndClazz (data) {
        return get({
            url: '/uc/sys/clazz/findProByFdy',
            params: data
        })
    },
    getGradeList () {
        return get({
            url: '/uc/common/ctrl/findAllGrade'
        })
    },
    // 通过专业获取班级
    getClassList (data) {
        return get({
            url: '/uc/sys/clazz/findClazzByPro',
            params: data
        })
    },
    // 获取所有的学科
    getAllSubject () {
        return get({
            url:'/uc/sys/subject/getAllSubject'
        })
    },
    // 获取机构列表
    getInstitution (data) {
        return get({
            url:'/uc/sys/office/findTree',
            params:data
        })
    },
    // 获取专业的接口
    getProListData () {
        return get({
            url:'/uc/common/ctrl/findAllPro'
        })
    },
    // 获取层次的接口
    getCcData () {
        return get({
            url:'/uc/common/ctrl/findCc'
        })
    },
    // 获取学制的接口
    getSchoolL () {
        return get({
            url:'/uc/common/ctrl/findXz'
        })
    },
    // 获取年级的接口
    getGradeData () {
       return get({
           url:'/uc/common/ctrl/findAllGrade'
       })
    },
    //获取培养方式的接口
    gettranForm (data) {
        return get({
            url:'/uc/common/ctrl/getDictMapList',
            params: data
        })
    },
    // 获取所有的课程
    getAllCourse (data) {
        return get({
            url:'/work1/course/findListAll',
            params:data
        })
    },
    // 获取课程分类和课程类型的接口
    getCourseList (data) {
        return get({
            url:'/work1/course/findListCourseClass',
            params:data
        })
    },
    // 获取考试形式
    getExam () {
        return get({
            url:'/work1/commonpk/getExamMode'
        })
    },
    // 获取教学班的接口
    getClass (data) {
        return get({
            url:'/uc/sys/clazz/findJxb',
            params:data
        })
    },
    // 获取任课老师树的接口
    getTeachTree () {
        return get({
            url:'/uc/sys/position/findTree'
        })
    }
}