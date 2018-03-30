import get from '../utils/get'
import post from '../utils/post'
import delet from '../utils/delete'
import put from '../utils/put'

export default{
    // 获取教务下发资助列表
    // postDfsendList(data){
    //     return post({
    //         url:'work1/publishSupport/publishSupportManage',
    //         data: data
    //     })
    // },
    // 教务下发学生资助
    // postDfsendSave(data){
    //     return post({
    //         url:'work1/publishSupport/publishSupportTime',
    //         data: data
    //     })
    // },
    // 修改教务下发学生资助
    // postDfsendMod(data){
    //     return post({
    //         url:'work1/publishSupport/ModifySupportTime',
    //         data: data
    //     })
    // },
    // 教务撤销资助
    // postDfsendUndo(data){
    //     return post({
    //         url:'work1/publishSupport/SupportRevoke',
    //         data: data
    //     })
    // },
    // 教务删除下发资助
    // postDfsendDel(data){
    //     return post({
    //         url:'work1/publishSupport/deleteSupportTime',
    //         data: data
    //     })
    // },
    // 教务奖学金列表
    // getDfschlshipList(data){
    //     return get({
    //         url:'work1/studentSupport/officeGetScholarshipTable',
    //         params:data
    //     })
    // },
    // 教务添加奖学金
    // postDfschlshipAdd(data){
    //     return post({
    //         url:'work1/studentSupport/publishScholarship',
    //         data: data
    //     })
    // },
    // 教务修改奖学金
    // postDfschlshipMod(data){
    //     return post({
    //         url:'work1/studentSupport/modifyScholarship',
    //         data: data
    //     })
    // },
    // 教务删除奖学金
    // postDfschlshipDel(data){
    //     return post({
    //         url:'work1/studentSupport/deleteScholarship',
    //         data:data
    //     })
    // },
    // 教务添加免学费
    // postDftuitAdd(data){
    //     return post({
    //         url:'work1/studentSupport/publishTuitionWaiver',
    //         data:data
    //     })
    // },
    // 教务修改免学费
    // postDftuitMod(data){
    //     return post({
    //         url:'work1/studentSupport/modifyTuitionWaiver',
    //         data:data
    //     })
    // },
    // 教务获取免学费列表
    // getDftuitList(data){
    //     return get({
    //         url:'work1/studentSupport/officeGetTuitionWaiverTable',
    //         params:data
    //     })
    // },
    // 学生申请助学金列表
    // getStAidList(data){
    //     return get({
    //         url:'work1/studentSupport/studentList',
    //         params:data
    //     })
    // },
    // 学生添加助学金
    // postStAidAdd(data){
    //     return post({
    //         url:'work1/studentSupport/studentSave',
    //         data:data
    //     })
    // },
    // 学生奖学金列表
    // getStSchlList(data){
    //     return get({
    //         url:'work1/studentSupport/stuGetScholarship',
    //         params:data
    //     })
    // },
    // 学生免学费列表
    // getStTuitList(data){
    //     return get({
    //         url:'work1/studentSupport/stuGetTuitionWaiver',
    //         params:data
    //     })
    // },
    // 教务添加修改助学金
    postDfAdd(data){
        return post({
            url:"work1/jwSupport/save",
            data:data
        })
    },
    // 获取教务、学生、辅导员列表
    getFundList(data){
        return get({
            url:'work1/jwSupport/findList',
            params:data
        })
    },
    // 删除资助
    postFundDel(data){
        return post({
            url:'work1/jwSupport/delete',
            data:data
        })
    }
    // 获取学期
    // getTerm(){
    //     return get({
    //         url: 'work1/jwTermMamager/getAllTermId',
    //     })
    // },
    // 通过校区获取院系
    // departQueryCamp(data){
    //     return get({
    //         url: 'work1/jwCommon/getOfficeDept',
    //         params: data
    //     })
    // },
    // 根据学院获取专业
    // majorQueryDepart(data){
    //     return get({
    //         url: 'work1/jwCommon/getOfficeMajor',
    //         params: data
    //     })
    // },
    // 根据专业年级获取班级
    // classQueryMajor(data){
    //     return get({
    //         url: 'work1/jwCommon/getClazzByProAndGrade',
    //         params: data
    //     })
    // },
    // 获取所有年级
    // getAllGrade(){
    //     return get({
    //         url: 'work1/jwCommon/getAllGrade',
    //     })
    // },
    // 获取助学类型
    // getFundType(){
    //     return get ({
    //         url: 'work1/jwCommon/getStudyCapital',
    //     })
    // },
    // 获取审核状态
    // getStuAudStat(){
    //     return get({
    //         url: 'work1/jwCommon/getStatusType',
    //     })
    // },
    // 获取用户类型
    // getUserType(){
    //     return get({
    //         url: 'work1/jwCommon/userType',
    //     })
    // },
    // 教务获取资助列表
    // deanGetList(data){
    //     return get({
    //         url: 'work1/studentSupport/leaderSupportManagement',
    //         params: data
    //     })
    // },
    // 获取教务待审核数量
    // getAudNum(){
    //     return get({
    //         url: 'work1/studentSupport/leaderCheckCount',
    //     })
    // },
    // 教务通过
    // putDeanAgree(id){
    //     return put({
    //         url: 'work1/studentSupport/leaderAgree/'+id,
    //     })
    // },
    // 教务不通过
    // putDeanDisAgree(id){
    //     return put({
    //         url: 'work1/studentSupport/leaderDisAgree/'+id,
    //     })
    // },
    // 辅导员当前登录的用户信息
    // getCurUserInfo(){
    //     return get({
    //         url: 'work1/studentSupport/getUserInfo',
    //     })
    // },
    // 获取老师的专业跟班级
    // counsellGetMajor(){
    //     return get({
    //         url: 'work1/jwCommon/findProByFdy',
    //     })
    // },
    // 根据专业获取班级
    // counsellGetClass(data){
    //     return get({
    //         url: 'work1/jwCommon/findProByClass',
    //         params: data
    //     })
    // },
    // 辅导员保存资助信息
    // postTeaSave(data){
    //     return post({
    //         url: 'work1/studentSupport/teacherSave',
    //         data: data
    //     })
    // },
    // 辅导员修改学生资助信息
    // counPutInfo(data){
    //     return put({
    //         url: 'work1/studentSupport/teaUpdate',
    //         data: data
    //     })
    // },
    // 通过班级查询学生
    // getClassQueryStu(data){
    //     return get({
    //         url: 'work1/jwCommon/findStuByClazz',
    //         params: data
    //     })
    // },
    // 辅导员资助管理列表
    // getCounseList(data){
    //     return get({
    //         url: 'work1/studentSupport/supportManagement',
    //         params: data
    //     })
    // },
    // 辅导员审核学生资助列表
    // getCounAudSutList(data){
    //     return get({
    //         url: 'work1/studentSupport/teacherList',
    //         params: data
    //     })
    // },
    // 辅导员通过学生资助申请
    // putCounAgree(supportId){
    //     return put({
    //         url: 'work1/studentSupport/teacherAgreeFromStu/'+supportId,
    //     })
    // },
    // 辅导员不通过学生资助
    // putCounDisAgree(supportId){
    //     return put({
    //         url: 'work1/studentSupport/teacherDisAgreeFromStu/'+supportId,
    //     })
    // },
    // 学生获取资助列表
    // getStuList(data){
    //     return get({
    //         url: 'work1/studentSupport/studentList',
    //         params: data
    //     })
    // },
    // 学生添加资助信息
    // postStuAdd(data){
    //     return post({
    //         url: 'work1/studentSupport/studentSave',
    //         data: data
    //     })
    // },
    // 修改学生资助信息
    // putStuInfo(data){
    //     return put({
    //         url: 'work1/studentSupport/stuUpdate',
    //         data: data
    //     })
    // },
    // 删除信息
    // delFund(id){
    //     return delet({
    //         url: 'work1/studentSupport//delete/'+id,
    //     })
    // }
} 