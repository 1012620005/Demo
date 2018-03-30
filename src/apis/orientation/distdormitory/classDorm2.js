import get from '../../../utils/get'
import post from '../../../utils/post'

export default{
    //宿管为院系分配宿舍初始化数据
    distrDormForClazz(data) {
		return get({
			url: '/work1/dormmanager/distrdorm/distrDormForClazz',
            params : data
        })
	},
     //通过性别获取宿舍楼
     getBuildInfoBySex(data) {
        return get({
            url: '/work1/dormmanager/distrdorm/getBuildByMRAndSex',
            params :data
        })
	},
    getFloorByBuildAndMR(data){
         return get({
            url: '/work1/dormmanager/distrdorm/getFloorByBuildAndMR',
            params :data
        })
    },
    //加载到楼层的时候获取宿舍
    getDormBySexBuildFloor(data){
        return get({
            url: '/work1/dormmanager/distrdorm/getDormByMrBuildFloor',
            params :data
        })
    },
    //添加父级宿舍到子集
    addDistrdom(data){
        return post({
            url: '/work1/dormmanager/distrdorm/addDistrdomForProfOrClazz',
            data : data
        })
    },
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
            params :data
        })
    },
    //提交院系宿舍分配总表
    submitdistrTotal(data,boyPerson,girlPerson){
        return get({
            url : '/work1/dormmanager/distrtotal/submitdistrTotal',
            params :data
        })
    }
}