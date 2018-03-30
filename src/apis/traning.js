import get from '../utils/get'
import post from '../utils/post'
import delet from '../utils/delete'
import put from '../utils/put'
import alias from './company/alias'
var apiAlias = alias.ALIAS
export default{
   // 获取人才培养方式的列表页
   getPersonProgramList (data) {
       return get({
           url:apiAlias + '/trainPlan/getTrainPlanTable',
           params:data
       })
   },
   // 创建人才培养方式
   addPerson (data) {
       return post({
           url:apiAlias +'/trainPlan/saveTrainPlan',
           data:data
       })
   },
   // 删除人才培养方案
   delPerson (data) {
       return post({
           url:apiAlias +'/trainPlan/deleteTrainPlan',
           data: data
       })
   },
   // 设置人才培养方案的课学时
   setPersonList (data) {
       return get({
           url:apiAlias +'/trainPlan/getTrainPlanCourse',
           params:data
       })
   },
   // 添加人才培养方案的课学时
   addPersonSourse (data) {
       return post({
           url:apiAlias +'/trainPlan/SaveTrainPlanCourse',
           data: data
       })
   },
   // 获取人才培养方案的班级列表
   getClassProgram (data) {
       return get({
           url:apiAlias +'/trainPlan/getClazzPlanTable',
           params:data
       })
   },
   // 编辑人才培养方案
   editorPersonSourse (data) {
       return post({
           url:apiAlias +'/trainPlan/updateTrainPlanCourse',
           data: data
       })
   },
   // 删除人才培养方案
   deletePersonSourse (data) {
       return post({
         url:apiAlias +'/trainPlan/deleteTrainPlanCourse',
         data: data
       })
   },
   // 班级培养方案列表
   classProgramList (data) {
       return get({
           url:apiAlias +'/trainPlan/getClazzPlanTable',
           params:data
       })
   },
   //获取班级培养方案的学时
   getClazzCourse (data) {
       return get({
           url:apiAlias +'/trainPlan/getClazzCourse',
           params: data
       })
   },
   // 修改班级培养方案的学时
   updateClazzCourse (data) {
       return post({
           url:apiAlias +'/trainPlan/updateClazzCourse',
           data:data
       })
   },
   // 删除班级培养方案的学时
   delClazzCourse (data) {
       return post({
           url:apiAlias +'/trainPlan/deleteClazzCourse',
           data:data
       })
   },
   // 获取教室树的接口
   getClassRoom () {
       return get({
           url:apiAlias +'/classroom/findTreeByCampusId'
       })
   },
   // 添加班级培养方案课程
   addClassRoom (data) {
       return post({
           url:apiAlias +'/trainPlan/saveClazzCourse',
           data:data
       })
   },
   // 授课任务安排的列表页面
   teachTaskList (data) {
       return get({
           url:apiAlias +'/courseTerm/getCourseTaskTable',
           params:data
       })
   },
   // 授课任务的状态显示
   teachTaskStatus () {
       return get({
           url:apiAlias +'/commonpk/getCourserApproveStatus'
       })
   },
   // 获取单双周的状态
   getDoubleWeek () {
       return get({
           url:apiAlias +'/commonpk/getDoubleWeek'
       })
   },
   // 获取任课老师的接口
   getTeachApi () {
       return get({
           url:'/uc/sys/user/findTcTea'
       })
   },
   // 获取课程合班的接口
   getAllCourseClass (data) {
       return post({
           url:apiAlias +'/courseTerm/checkInClassName',
           data:data
       })
   },
   // 获取教室的接口
   getAllRoom (data) {
       return get({
           url:apiAlias +'/classroom/findCourseTable',
           params:data
       })
   },
   // 获取教室场地的接口
   getFieldRoom () {
       return get({
           url:apiAlias +'/field/viewFieldName'
       })
   },
   // 获取接替课程的接口
   getReplace (data) {
       return post({
           url:apiAlias +'/courseTerm/checkReplaceCourse',
           data: data
       })
   },
   //修改授课任务安排
   updateCourse (data) {
       return post({
           url:apiAlias +'/courseTerm/updateCourseSchedule',
           data: data
       })
   },
   // 授课任务审核
   auditCourse (data) {
       return post({
           url:apiAlias +'/courseTerm/commitAudit',
           data: data
       })
   },
   // 删除授课任务安排
   deleteCourse (data) {
       return post({
           url:apiAlias +'/courseTerm/deleteOneTermCourse',
           data:data
       })
   },
   // 获取审核列表
   getAuditList (data) {
       return get({
           url:apiAlias +'/courseTerm/getCourseAuditTable',
           params:data
       })
   },
   // 审核修改
   updateAudit(data){
       return post({
           url:apiAlias +'/courseTerm/updateCourseAudit',
           data:data
       })
   },
   // 审核通过
   passAudit(data){
        return post({
            url:apiAlias +'/courseTerm/agreeAudit',
            data:data
        })
   },
   // 审核不通过
   nopassAudit(data){
       return post({
           url:apiAlias +'/courseTerm/disagreeAudit',
           data:data
       })
   },
   // 审核删除
   delAudit (data) {
       return post({
           url:apiAlias +'/courseTerm/deleteOneTermCourseAudit',
           data:data
       })
   },
    // 获取审批列表
    getAllotList (data) {
        return get({
            url:apiAlias +'/courseTerm/getCourseExamineTable',
            params:data
        })
    },
    // 审批修改
    updateAllot(data){
        return post({
            url:apiAlias +'/courseTerm/updateCourseExamine',
            data:data
        })
    },
    // 审批通过
    passAllot(data){
         return post({
             url:apiAlias +'/courseTerm/agreeExamine',
             data:data
         })
    },
    // 审批不通过
    nopassAllot(data){
        return post({
            url:apiAlias +'/courseTerm/disagreeExamine',
            data:data
        })
    },
    // 获取授课分配机构的列表页
    getOrgList (data) {
        return get({
            url:apiAlias +'/courseTerm/getCourseAllotOrgTable',
            params:data
        })
    },
    updateOrgList (data) {
        return post({
            url:apiAlias +'/courseTerm/updateCourseAllotOrg',
            data:data
        })
    },
    // 修改人才培养方案
    updatePerson (data) {
        return post({
            url:apiAlias +'/trainPlan/updateTrainPlan',
            data:data
        })
    }
}