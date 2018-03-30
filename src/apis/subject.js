import get from '../utils/get'
import post from '../utils/post'
import delet from '../utils/delete'
import put from '../utils/put'

export default{
    // 学科管理保存
    postDisc(data){
        return post({
            url: '/uc/sys/subject/save',
            data: data
        })
    },
    // 获取学科列表
    getDiscList(data){
        return get({
            url: '/uc/sys/subject/list',
            params: data
        })
    },
    // 删除学科
    delDisc(id){
        return delet({
            url: '/uc/sys/subject/delete?id='+id,
        })
    },
    // 修改学科信息
    putDiscInfo(data){
        return put({
            url: '/uc/sys/subject/updateSubject',
            data: data
        })
    },
    // 特殊学科管理保存
    postSpsu(data){
        return post({
            url: '/uc/sys/subject/specialSave',
            data: data
        })
    },
    // 获取特殊学科列表
    getSpsuList(data){
        return get({
            url: '/uc/sys/subject/specialList',
            params: data
        })
    },
    // 下载学科模板
    // getDown(){
    //     return get({
    //         url: 'work1/subjectdownload',
    //     })
    // }
    // 获取学期列表
    getTermList(data){
        return get({
            url: 'work1/jwTermMamager/list',
            params: data
        })
    },
    // 设置学期开始时间与结束时间
    putTermTime(data){
        return put({
            url: 'work1/jwTermMamager/update',
            data: data
        })
    }
}