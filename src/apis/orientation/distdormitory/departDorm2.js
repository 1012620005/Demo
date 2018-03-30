import get from '../../../utils/get'
import post from '../../../utils/post'

export default{
    //宿管为院系分配宿舍初始化数据
    distrDormForDept (data) {
		return get({
            url: '/work1/dormmanager/distrdorm/distrDormForDept',
            params : data
		})
	},
    //通过校区加载宿舍楼下拉框
    getDormBuildByWhere(data){
        return get({
            url: '/work1/dormmanager/distrdorm/getDormBuildByWhere',
            params : data
        })
    },
    //获取楼层
    getFloors(data){
        return get({
            url: '/work1/dormmanager/dormbuild/getFloors',
            params : data
        })
    },
    getDormForDept(data){
        return get({
            url : '/work1/dormmanager/distrdorm/getDormForDept',
            params : data
        })
    },
     //将宿舍分配给院系
    addDistrdom(data){
        return post({
            url : '/work1/dormmanager/distrdorm/addDistrdomForDept',
            data : data
        })
    },
    //刷新右侧分配到的宿舍
    getDistrDormByMainId(data){
        return get({
            url : '/work1/dormmanager/distrdorm/getDistrDormByMainId?mainRelation=' + data,
        })
    },
    //从宿舍表中删除已经分配的宿舍   
    deleteDistrdom(data){
        return post({
            url : '/work1/dormmanager/distrdorm/deleteDistrdomForDept',
            data : data
        })
    },
    //提交分配记录
    submitdistrTotal(data,boyPerson,girlPerson){
        return get({
            url : '/work1/dormmanager/distrtotal/submitdistrTotal?mainRelation=' + data + '&boyPerson=' + boyPerson + '&girlPerson=' + girlPerson,
        })
    }

}