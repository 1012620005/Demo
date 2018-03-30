import get from '../utils/get'
import post from '../utils/post'
import delet from '../utils/delete'
import put from '../utils/put'
export default {
    // 添加值班信息
    getAdDuInfo(data){
        return post({
            url: 'work1/jwTeacherDuty/save',
            data: data
        })
    },
    // 获取所有校区
    // getCampus() {
    //     return get ({
    //         url: '/studentSupport/getOffice'
    //     }) 
    // },
    // 通过校区查询老师
    // queryduty(data){
    //     return get({
    //         url: '/jwTeacherDuty/findByOffice',
    //         params: data
    //     })
    // },
    // 获取值班列表
    // getDuList(schoolZoneId,dutyStartTime,dutyEndTime,pageNo){
    //     return get({
    //         url: 'work1/jwTeacherDuty/dutyList?schoolZoneId='+ schoolZoneId + '&dutyStartTime='+ dutyStartTime + '&dutyEndTime=' + dutyEndTime+'&pageNo'+pageNo,
    //     })
    // },
    getDuList(data){
        return get({
            url: 'work1/jwTeacherDuty/dutyList',
            params: data
        })
    },
    // 校务编辑值班内容
    putEdit(groupId,teacherDuty){
        return post({
            url:'work1/jwTeacherDuty/update/'+groupId,
            data:teacherDuty
        })
    },
    // 通过组号删除行
    deleteRow(group){
        return delet({
            url:'work1/jwTeacherDuty/deleteByGroupId/'+group,
        })
    },
    // 任课老师获取值班列表
    getInsList(data){
        return get({
            url: 'work1/jwTeacherDuty/getListFromTeacher',
            params: data
        })
    },
    // 通过组号获取值班信息（任课老师值班情况）
    getDutyCase(groupId){
        return get({
            url: 'work1/jwTeacherDuty/dutyInfoBygroupId/'+groupId,
        })
    },
    // 任课老师编辑值班情况
    putInsEdit(data){
        return put({
            url: 'work1/jwTeacherDuty/addDutyContent',
            params:data,
        })
    }
}