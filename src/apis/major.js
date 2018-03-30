import get from '../utils/get'
import post from '../utils/post'
export default {
    // 查询专业分类的所有的接口
    searchProList (data){
        return get({
            url:'/uc/common/ctrl/findOffice',
            params:data
        })
    },
    // 查询专业分类的列表页接口
    searchProClassList (data) {
        return get({
            url:'/uc/sys/office/findPageFl',
            params:data
        })
    },
    // 添加和编辑专业分类的接口
    addOrUpdatePro (data) {
        return post({
            url:'/uc/sys/office/saveFl',
            data:data
        })
    },
    // 删除专业分类的接口
    deletePro (data) {
        return post({
            url:'/uc/sys/office/deleteFl',
            data:data
        })
    },
    // 获取专业设置的列表页的接口
    getProListData (data) {
        return get({
            url:'/uc/sys/office/findPagePro',
            params:data
        })
    },
    // 添加和编辑专业的接口
    addOrUpdateProList (data) {
        return post({
            url:'/uc/sys/office/savePro',
            data:data
        })
    },
    // 删除专业的接口
    deleteProList (data) {
        return post({
            url:"/uc/sys/office/deletePro",
            data:data
        })
    },
    // 添加编辑学制
    addSchoolLen (data) {
        return post({
            url:'/uc/sys/dict/saveXz',
            data:data
        })
    },
    // 删除学制
    deleteSchoolLen (data) {
        return post({
            url:'/uc/sys/dict/deleteXz',
            data:data
        })
    },
    // 查询学制
    getSchoolLenList () {
        return get({
            url:'/uc/common/ctrl/findXz'
        })
    },
    // 查询层次的列表页面
    searchLevelList () {
        return get({
            url:'/uc/common/ctrl/findCc'
        })
    },
    // 添加和编辑层次
    addOrEditorCc (data) {
        return post({
            url:'/uc/sys/dict/saveCc',
            data:data
        })
    },
    // 删除层次
    deleteCc (data) {
        return post({
            url:'/uc/sys/dict/deleteCc',
            data:data
        })
    }
}