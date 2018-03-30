import get from '../utils/get'
import post from '../utils/post'
export default {

    //获取当前登录用户的信息
    getCurrentUser() {
        return get({
            url: '/uc/sys/user/viewUser'
        })
    }, 
    getClazzByStuid(data) {
        return get({
            url: '/uc/sys/clazz/findClazzAndTeaByStu',
            params : data
        })
    }, 
    //通过学生信息获取宿舍信息
    getStuChangeDorm(data){
        return get({
            url: '/yx/changedorm/changeDorm/getStuChangeDorm',
            params : data
        })
    },
    //通过性别获取宿舍楼信息
    getBuildInfoBySex(data) {
        return get({
            url: '/yx/dormmanager/distrdorm/getBuildByMRAndSex',
            params : data
        })
    },
    //通过宿舍楼获取楼层
    getFloorByBuildAndMR(data){
        return get({
           url: '/yx/dormmanager/distrdorm/getFloorByBuildAndMR',
           params : data
       })
   },
   getDormByOfficeBuildFloor(data){
        return get({
            url : '/yx/dormmanager/distrdorm/getDormByOfficeBuildFloor',
            params : data
        })
    },
    //获取对调人
    getStuByDormAndClazz(dormId,clazzId){
        return get({
            url : '/yx/dormmanager/stuDorm/getStuByDormAndClazz?dormId=' + dormId + '&clazzId=' + clazzId
        })
    },
    saveChangeDorm(data){
        return post({
            url : '/yx/changedorm/changeDorm/saveChangeDorm',
            data : data
        })
    }
}
