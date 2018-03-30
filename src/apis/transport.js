import get from '../utils/get'
import post from '../utils/post'
import alias from './company/alias'
var apiAlias = alias.ALIAS
export default {
    // 获取添加审核车的列表页面
    findApplyCarList (data) {
        return post({
            url: apiAlias + '/useCar/allList',
            data:data
        })
    },
    // 获取当前用户的申请用车的列表页
    findCurrentCarList (data) {
        return post({
            url: apiAlias + '/useCar/userList',
            data:data
        })
    },
    // 添加用车的接口
    addApplyCar (data) {
        return post({
            url: apiAlias + '/useCar/addUseCar',
            data:data
        })
    },
    //还车接口
    returnCar (data) {
        return post({
            url: apiAlias + '/useCar/review',
            data:data
        })
    },
    // 编辑用车
    editorUserCar (data) {
        return post({
            url: apiAlias + '/useCar/updateUseCar',
            data:data
        })
    },
    // 查看用车
    seeApplyCar (data) {
        return post({
            url:  apiAlias + '/useCar/getUseCar',
            data:data
        })
    },
    // 查看所有的车型
    getAllCarType () {
        return post({
            url: apiAlias + '/car/list'
        })
    },
    // 添加车型
    addCar (data) {
        return post({
            url: apiAlias + '/car/addCar',
            data:data
        })
    },
    // 编辑车型
    editorCar (data) {
        return post({
            url:  apiAlias + '/car/updateCar',
            data:data
        })
    },
    // 删除车型
    delCar (data) {
        return post({
            url: apiAlias + '/car/delCar',
            data:data
        })
    },
    // 审核用车
    auditCar (data) {
        return post({
            url: apiAlias + '/useCar/review',
            data:data
        })
    },
    // 查询所有的车载人数
    getAllCarNum (data) {
        return post({
           url:  apiAlias + '/car/vehicleList',
           data: data
        })
    },
    // 条件查询车级别
    getAllCarTypeL (data) {
        return post({
            url: apiAlias + '/car/typeList',
            data:data
        })
    },
    // 条件查询车类型
    getAllCarName (data) {
        return post({
            url:  apiAlias + '/car/carNameList',
            data:data
        })
    },
    // 条件查询车牌号
    getAllCarPlate(data) {
        return post({
            url: apiAlias + '/car/plateList',
            data:data
        })
    }

}