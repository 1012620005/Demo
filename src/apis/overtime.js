import get from '../utils/get'
import post from '../utils/post'
import delet from '../utils/delete'
import put from '../utils/put'

export default{
    // 校务保存老师加班
    postSchSave(data){
        return post({
            url: 'work1/overtime/schoolSave',
            data: data
        })
    },
    // 获取指定加班管理列表
    getDesovList(data){
        return get({
            url: 'work1/overtime/leaderGetList',
            params: data
        })
    },
    // 校务获取审核加班管理待审核人数
    getPendNum(){
        return get({
            url: 'work1/overtime/checkCount'
        })
    },
    // 校务撤销加班
    putOverWork(data){
        return put({
            url: 'work1/overtime/cancelOverTime/'+data,
        })
    },
    // 校务获取任课老师加班审核列表
    getAudovList(data){
        return get({
            url: 'work1/overtime/leaderGetListByTeacher',
            params: data
        })
    },
    // 校务通过教师加班申请
    putAgree(id){
        return put({
            url: 'work1/overtime/agreeOverTime/'+id,
        })
    },
    // 校务不通过教师加班申请
    putDisAgree(id){
        return put({
            url: 'work1/overtime/disagreeOverTime/'+id,
        })
    },
    // 任课老师获取加班列表
    getOvtimeList(data){
        return get({
            url: 'work1/overtime/list',
            params: data
        })
    },
    // 任课老师添加加班信息
    postAdd(data){
        return post({
            url: 'work1/overtime/save',
            data:data
        })
    },
    // 任课老师修改未通过加班申请
    putEditOvtime(data,id){
        return put({
            url: 'work1/overtime/update/'+id,
            data:data
        })
    },
    // 任课老师删除加班信息
    delOvtime(id){
        return delet({
            url: 'work1/overtime/delete/'+id,
        })
    }
}