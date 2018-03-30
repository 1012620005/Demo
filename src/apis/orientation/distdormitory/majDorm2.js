import get from '../../../utils/get'
import post from '../../../utils/post'

export default{
    //获取院系宿舍分配操作页面的基本数据
    distrDormForProf(data) {
        return get({
            url : '/work1/dormmanager/distrdorm/distrDormForProf',
            params : data
        })
	},
    //通过性别获取分配到的宿舍楼
    getBuildInfoBySex(data) {
        return get({
            url: '/work1/dormmanager/distrdorm/getBuildByMRAndSex',
            params : data
        })
    },
    //通过宿舍楼和主关系id获得楼层
    getFloorByBuildAndMR(data){
         return get({
            url: '/work1/dormmanager/distrdorm/getFloorByBuildAndMR',
            params : data
        })
    },
    //加载到楼层的时候获取宿舍
    getDormByMrBuildFloor(data){
        return get({
            url: '/work1/dormmanager/distrdorm/getDormByMrBuildFloor',
            params : data
        })
    },
    //分配宿舍
    addDistrdom(data){
        return post({
            url: '/work1/dormmanager/distrdorm/addDistrdomForProfOrClazz',
            data : data
        })
    },
    //删除已经分配的宿舍
    deleteDistrdom(data){
        return post({
            url: '/work1/dormmanager/distrdorm/deleteDistrdomForProfOrClazz',
            data : data
        })
    },
    //刷新右侧分配到的宿舍
    getDistrDormByMainId(data){
        return get({
            url : '/work1/dormmanager/distrdorm/getDistrDormByMainId',
            params : data
        })
    },
    //提交院系宿舍分配总表
    submitdistrTotal(data){
        return get({
            url : '/work1/dormmanager/distrtotal/submitdistrTotal',
            params : data
        })
    }
}