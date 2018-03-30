import get from '../../utils/get'
import post from '../../utils/post'
import apiUrl from '../../utils/config'
import { getToken } from '../../utils/auth'

export default{
    initialLoad(data){//通过条件查找招生计划（指标）
        return get({
            url:'/work1/admitmanager/admitPlan/getPlanByWhere',
            params:data
        })
    },
    getAllTermId(data){
        return get({
            url:'work1/jwTermMamager/getAllTermId',
            params:data
        })
    },
    getAdmitAreaByWhere(data){//通过条件查找招生计划（地域）
        return get({
            url: '/work1/common/getAdmitAreaByWhere',
            params: data
        })
    },
    addAdmitArea(data){//添加招生区域
        return post({
            url: '/work1/admitmanager/admitArea/addAdmitArea',
            data: data
        })
    },
    modifyAdmitArea(data){//修改招生区域
        return post({
            url: '/work1/admitmanager/admitArea/modifyAdmitArea',
            data: data
        })
    },
    deleteAdmitArea(data){//删除招生计划（地域）
        return get({
            url:'/work1/admitmanager/admitArea/deleteAdmitArea',
            params:data
        })
    },
    getAdmitAreaByDutyId(data){
        return get({
            url: '/work1/admitmanager/admitArea/getAdmitAreaByDutyId',
            params: data
        })
    },
    loadProfess(){//查询所有专业
        return get({
            url:'/uc/common/ctrl/findAllPro'
        })
    },
    // 通过专业查询特色班
    getAllFeaClazz(data){
        return get({
            url:'/work1/common/getAllFeaClazz',
            params: data
        })
    },
    // 增加特色班
    addFeaClazz(data){
        return post({
            url:'/work1/admitmanager/feaClazz/addFeaClazz',
            data: data
        })
    },
    // 删除特色班
    deleteFeaClazz(data){
        return get({
            url:'/work1/admitmanager/feaClazz/deleteFeaClazz',
            params: data
        })
    },
    // 修改特色班
    modifFeaClazz(data){
        return post({
            url:'/work1/admitmanager/feaClazz/modifFeaClazz',
            data: data
        })
    },
    loadSelect(data) {//加载校区
		return get({
            url: '/uc/common/ctrl/findOfficeByPid',
            params: data
		})
	},
    loadHead(data){//通过专业加载负责人
        return get({
            url:'/work1/admitmanager/admitPlan/getDutyByProfId',
            params: data
        })
    },
    loadStuyear(data) {//加载学年
		return get({
			url: '/uc/common/ctrl/findStudyYear',
            params:data
		})
    },
    findAllGrade(){//加载年级
        return get({
            url: '/uc/common/ctrl/findAllGrade',
        })
    },
    addAdmissionplan(data){//点击提交添加招生计划
        return post({
            url:'/work1/admitmanager/admitPlan/addAdmitPlan',
            data:data
        })
    },
    loadEdusystme(data){//加载学制
        return get({
            url:'/uc/common/ctrl/getDictMapList',
            params:data
        })
    },
    deleAdmissionplan(data){//点击删除招生计划
        return get({
            url:'/work1/admitmanager/admitPlan/deleteAdmitPlan',
            params:data
        })
    },
    // 修改招生计划
    modifAdmissionplan(data){
        return post({
            url:'/work1/admitmanager/admitPlan/modifiAdmitPlan',
            data:data
        })
    },
    submitstuApply(data){//学生提交入学申请
        return post({
            url: '/work1/common/submitstuApply',
            data: data
        })
    },
    // 根据字典查询所有数据
    getDictMapList(data){
        return get({
            url: '/uc/common/ctrl/getDictMapList',
            params: data
        })
    },
    // 加载省市县
    regionalManag(data){
        return get({
            url: '/uc/common/ctrl/findAreaByPtCode',
            params: data
        })
    },
    // 查看个人信息
    viewUserinfo(data){
        return get({
            url:'uc/sys/user/viewUser',
            params: data
        })
    },
    // 学校审核通用接口
    commonAudit(data){
        return get({
            url:'/work1/admitmanager/stuinfoAudit/findStuInfoByWhere',
            params:data
        })
    },
    // 查看报道单
    showReport(data){
        return get({
            url:'/work1/admitmanager/reportPro/showReportPro',
            params:data
        })
    },

    // 缴费业务
    allPayItem(data){
        return get({
            url:'/work1/common/allPayItem',
            params:data
        })
    },
    //修改学生状态（通过不通过）
    modifyStatus(data){
        return get({
            url:'/work1/admitmanager/stuinfoAudit/modifStuInfoAudit',
            params: data
        })
    },
    // 通过身份证查学生
    getStuByIdOrIdCard(data){
        return get({
            url: '/work1/common/getStuApplyByIdOrIdCard',
            params: data
        })
    },
    // 学生缴费支付
    stuPayinfo(data){
        return post({
            url: '/work1/common/submitPayDetail',
            data: data
        })
    },
    // 缴费清单
    getPayInfo(data){
        return get({
            url: '/work1/common/getPayInfo',
            params: data
        })
    },
    // 物品领取管理学生列表
    getPayTotalByWhere(data){
        return get({
            url:'/work1/admitmanager/payTotal/getPayTotalByWhere',
            params: data
        })
    },
    // 物品领取确认领取
    getGoods(data){
        return get({
            url: '/work1/admitmanager/payTotal/getGoods',
            params: data
        })
    },
    // 通过学生id查看学生入学申请
    getStuInfo(data){
        return get({
            url:'/work1/common/getStuInfo',
            params: data
        })
    },
    // 查询辅导员
    findTcTea(data){
        return get({
            url:'/uc/sys/user/findTcTea',
            params: data
        })
    },
    // 获取附件信息
    findFileByEntityAndBid(data){
        return get({
            url: '/uc/common/ctrl/findFileByEntityAndBid',
            params: data
        })
    },
    // 导出招生计划
    exportAdmitPlanExcel(){
        return apiUrl.BASE_URL + '/work1/admitmanager/admitPlan/exportAdmitPlanExcel?access_token=' + getToken()
        // return get({
        //     url:'/work1/admitmanager/admitPlan/exportAdmitPlanExcel'
        // })
    },
    // 导出招生区域
    exportAdmitAreaExcel(){
        return apiUrl.BASE_URL + '/work1/admitmanager/admitArea/exportAdmitAreaExcel?access_token=' + getToken()
    },
    // 查看学生入学申请
    getStuApplyByWhere(data){
        return get({
            url:'/work1/admitmanager/stuApply/getStuApplyByWhere',
            params: data
        })
    },
    // 查看学生信息v2
    getStuApplyByIdOrIdCard(data){
        return get({
            url: '/work1/admitmanager/stuApply/getStuApplyByIdOrIdCard',
            params: data
        })
    },
    // 审核学生入学申请v2
    auditStuApply(data){
        return post({
            url:'/work1/admitmanager/stuApply/auditStuApply',
            data: data
        })
    },
    // 导出学生信息到excelv2
    exportExcel(data){
        return apiUrl.BASE_URL + '/work1/admitmanager/stuApply/exportExcel?access_token=' + getToken()
    },
    // 导出学生信息到wordv2
    exportWordById(){
        return apiUrl.BASE_URL + '/work1/admitmanager/stuApply/exportWordById?access_token=' + getToken() + '&id='
    },
    // 今年招生统计图v2
    chartInfo(data){
        return get({
            url:'/work1/admitmanager/stuApply/chartInfo',
            params: data
        })
    }
}