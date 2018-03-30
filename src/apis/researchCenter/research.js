import get from '../../utils/get'
import post from '../../utils/post'

export default{
    loadteachList(data){
        return get({
            url:'/uc/sys/user/findTcTea',
            params: data
        })
    },
    // 添加群组
    addGroup(data){
        return post({
            url:'/work1/teaching/group/save',
            data: data
        })
    },
    // 查询当前登录用户所有群组
    newteGroup(){
        return get({
            url:'/work1/teaching/group/findByUser',
            // params:data
        })
    },
    // 群组消息
    groupNews(data){
        return get({
            url:'/work1/teaching/group/findMsg',
            params: data
        })
    },
    // 入组或者忽略入组操作
    newSet(data){
        return post({
            url:'/work1/teaching/group/accessOption',
            data:data
        })
    },
    // 退出群组
    quitGroup(data){
        return post({
            url:'/work1/teaching/group/quit',
            data:data
        })
    },
    // 群组设置
    setGroup(data){
        return get({
            url:'/work1/teaching/group/get',
            params: data
        })
    },
    //教研活动列表
    findActivity(data){
        return get({
            url:'/work1/teaching/activity/findActivity',
            params:data
        })
    },
    // 创建教研活动
    save(data){
        return post({
            url:'/work1/teaching/activity/save',
            data:data
        })
    },
    // 活动组别
    activityGroup(data){
        return get({
            url:'/work1/teaching/group/findByLeader',
            params:data
        })
    },
    //查看教研活动页面
    getActivity(data){
        return get({
            url:'/work1/teaching/activity/getActivity',
            params:data
        })
    },
    // 删除教研
    deletResearch(data){
        return post({
            url:'/work1/teaching/activity/delete',
            data:data
        })
    },
    //根据当前人查找回复评价信息
    findRecord(data){
        return get({
            url:'/work1/teaching/activity/findMinByActivity',
            params:data
        })
    },
    //获取群组成员列表
    getAG(data){
        return get({
            url:'/work1/teaching/activity/findMembers',
            params:data
        })
    },
    //回复或者评价
    reply(data){
        return post({
            url:'/work1/teaching/activity/reply',
            data:data
        })
    },
    //评论
    comment(data){
        return post({
            url:'/work1/teaching/activity/comment',
            data:data
        })
    },
    //查询评论
    findCommentByActivity(data){
        return get({
            url:'/work1/teaching/activity/findCommentByActivity',
            params:data
        })
    },
    // 解散群组
    dissolveGroup(data){
        return post({
            url:'/work1/teaching/group/delete',
            data: data
        })
    },
    getUploadUrl(data) {
        return "http://192.168.10.114/work1/common/teaching/upload";
    },
    // 获取备课（全部、我的收藏）
    getPrepAllList(data){
        return get({
            url:'/work1/teaching/lesson/findTotalList',
            params:data
        })
    },
    // 添加修改备课
    postSavePrep(data){
        return post({
            url:'/work1/teaching/lesson/save',
            data:data
        })
    },
    // 获取我的备课列表
    getMyLesList(data){
        return get({
            url:'/work1/teaching/lesson/findLesson',
            params:data
        })
    },
    // 获取公开教案列表
    getPubLesList(data){
        return get({
            url:'/work1/teaching/lesson/findPublicList',
            params:data
        })
    },
    // 删除备课中心
    postPubDel(data){
        return post({
            url:'/work1/teaching/lesson/delete',
            data:data
        })
    },
    // 收藏、取消教案
    postFavPub(data){
        return post({
            url:'/work1/teaching/lesson/collect',
            data:data
        })
    },
    // 公开教案
    postPubLes(data){
        return post({
            url:'/work1/teaching/lesson/public',
            data:data
        })
    },
    

}