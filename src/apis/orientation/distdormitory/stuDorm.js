import get from '../../../utils/get'
import post from '../../../utils/post'

export default{
    distrDormForStu(data) {
        return get({
            url: '/work1/dormmanager/distrdorm/distrDormForStu',
            params : data
        })
	},
    //通过性别获取宿舍楼
    getBuildInfoBySex(data) {
        return get({
            url: '/work1/dormmanager/distrdorm/getBuildByMRAndSex',
            params : data
        })
	},
    getFloorByBuildAndMR(data){
         return get({
            url: '/work1/dormmanager/distrdorm/getFloorByBuildAndMR',
            params : data
        })
    },
    //加载到楼层的时候获取宿舍
    getDormBySexBuildFloor(data){
        return get({
            url: '/work1/dormmanager/distrdorm/getDormByMrBuildFloor',
            params : data
        })
    },
    //添加分配记录
    addDistrdom(data){
        return post({
            url: '/work1/dormmanager/distrdorm/addDistrdomForStu',
            data : data
        })
    },
    //删除学生记录
    deleteDistrdom(data){
        return post({
            url: '/work1/dormmanager/distrdorm/deleteDistrdomForStu',
            data : data
        })
    },
    //提交院系宿舍分配总表
    submitStuDormTotal(data){
        return get({
            url : '/work1/dormmanager/distrtotal/submitStuDormTotal',
            params : data
        })
    },
    
}