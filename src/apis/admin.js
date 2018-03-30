import get from '../utils/get'
import post from '../utils/post'

export default {
	GetTree (data){
		return get({
			url: '/uc/sys/jc/getJcTree',
			data: data
		})
	},
	
	Assetsdel (data) {
    	return post ({
    		url: '/work1/assets/delAssets',
    		data:data
    	})
	},
	//会议list
	// meetList (data){ 
	// 	return post({
	// 		url: '/platform/meeting/list',
	// 		data:data
	// 	})
	// },
	meetList (data){ 
		return get({
			url: 'work1/meetingmanager/meetingInfo/getAllMeetingInfo',
			params:data
		})
	},
	// 查询机构
	getQueryInstit(data){
		return get({
			url:"/uc/common/ctrl/findOffice",
			params:data
		})
	},
	// 教研中心查询老师
	getMeetQueryTea(data){
		return get({
			url:"/uc/sys/user/findTcTea?",
			params:data
		})
	},
	//编辑记录
	upmeet (data){ 
		return post({
			url: '/work1/meeting/updateMeeting',
			data:data
		})
	},
	//查看记录
	meetsee (data){ 
		return post({
			url: '/work1/meeting/getMeeting',
			data:data
		})
	},
	//添加list
	meetadd (data){ 
		return post({
			url: '/work1/meetingmanager/meetingInfo/addOrModifMeeting',
			data:data
		})
	},
	// meetadd (data){ 
	// 	return post({
	// 		url: '/platform/meeting/addMeeting',
	// 		data:data
	// 	})
	// },
	//教师列表
	teacherlist (data){ 
		return get({
			url: '/uc/sys/user/findTcTea',
			params: data
		})
	},
	//处罚列表
	punishlist (data){ 
		return post({
			url: '/work1/punish/list',
			data:data
		})
	},
	//添加list
	punishdel (data){ 
		return post({
			url: '/work1/punish/delPunish',
			data:data
		})
	},
	//添加list
	punishadd (data){ 
		return post({
			url: '/work1/punish/addPunish',
			data:data
		})
	},
	//添加list
	punishup (data){ 
		return post({
			url: '/work1/punish/updatePunish',
			data:data
		})
	},
	getstu (data){
		return get({
			url: '/uc/sys/clazz/findStuByClazz',
			params: data
		})
	},
	getTcreview (data){
		return get({
			url: '/uc/sys/clazz/getTeachPjByStu',
			params: data
		})
	},
	//学期包含id
	geTerm (data){
		return get({
			url: 'work1/jwTermMamager/getAllTermId',
		})
	},
	setpj (data){ 
		return post({
			url: '/uc/sys/clazz/addPjByStu',
			data:data
		})
	},
	getleave (data){ 
		return get({
			url: '/work1/leavaSchool/getGraduateList',
			params:data
		})
	},
	upmake (data){ 
		return post({
			url: '/work1/leavaSchool/certificateReapply',
			data:data
		})
	},
	Receivestu (data){ 
		return post({
			url: '/work1/leavaSchool/ReceiveGraduate',
			data:data
		})
	},
	Receiveagain (data){ 
		return post({
			url: '/work1/leavaSchool/getCertificateReapply',
			data:data
		})
	},
	getstupy (data){ 
		return post({
			url: '/uc/sys/clazz/getStuPyByTeach',
			data:data
		})
	},
	tecsetstupy (data){ 
		return post({
			url: '/uc/sys/clazz/addPyByTeach',
			data:data
		})
	},
	 //查看当前用户
	 viewUser(data) {
		return get({
		  url: '/uc/sys/user/viewUser',
		  params: data
		})
	  },
	//根据当前登录人员查询其所教授的班级和专业
	findProByFdy(data) {
		return get({
		  url: '/uc/sys/clazz/findProByFdy',
		  params: data
		})
	  },
	  Tecgetclass(data) {
		return get({
		  url: '/uc/sys/clazz/findAllClazzByTea',
		  params: data
		})
	  },
	  //2.0
	  //评价
	getevallist(data) {
		return get({
		  url: '/work1/evaluate/findList',
		  params: data
		})
	},
	setevaluate (data){ 
		return post({
			url: '/work1/evaluate/save',
			data:data
		})
	},
	delevaluate (data){ 
		return post({
			url: '/work1/evaluate/delete',
			data:data
		})
	},
	//根据id获取评价项目详情
	get_pjxq(data) {
		return get({
		  url: '/work1/evaluate/get',
		  params: data
		})
	},
	start_xf(data) {
		return post({
		  url: '/work1/evaluate/send',
		  data: data
		})
	},
	//评价人查询需要评价列表
	get_stupjlist(data){
		return get({
			url:"/work1/evaluate/findSendRecord",
			params:data
		})
	},
	//查询被评信息
	find_bprxq(data){
		return get({
			url:"/work1/evaluate/findRecord",
			params:data
		})
	},
	//获取所以学科
	get_allsubject(){
		return get({
			url:'/uc/common/ctrl/getAllSubject',
		})
	},
	//查询被评对象list
	get_bpteacher(data){
		return get({
			url:'/work1/evaluate/findReceiver',
			params:data
		})
	},
	//评分
	set_score(data){
		return post({
			url:'/work1/evaluate/grade',
			data: data
		})
	},
	//查询自己评价
	myevaluate(data){
		return get({
			url:'/work1/evaluate/findMyEvaluate',
			params:data
		})
	},
	//查询评价结果
	eval_Result(data){
		return get({
			url:'/work1/evaluate/findMyRecored',
			params:data
		})
	},
	//撤销/evaluate/revokeEvaluate
	set_cancel(data){
		return post({
			url:'/work1/evaluate/revokeEvaluate',
			data: data
		})
	},
	//结束
	set_over(data){
		return post({
			url:'/work1/evaluate/finishEvaluate',
			data: data
		})
	},
	//查询所有评价
	get_allRecord(data){
		return get({
			url:'/work1/evaluate/findAllRecord',
			params: data
		})
	},
	//获取机构
	get_organ(data){
		return get({
			url:'/uc/common/ctrl/findOffice',
			params:data
		})
	},
	//获取所以专业
	get_major(data){
		return get({
			url:'/uc/common/ctrl/findAllPro',
			params:data
		})
	},
	//资产
	// 资产列表
	getasstlist(data) {
		return get({
		  url: '/work1/assets/findList',
		  params: data
		})
	},
	setasstup(data){
		return post({
			url:"/work1/assets/saveOrUpdate",
			data:data
		})
	},
	//出库明细
	ck_Detailed(data){
		return get({
			url:"/work1/assetsDeliveryDetail/getDeliveryDetail",
			params:data
		})
	},
	//创建出库
	sertck_created(data){
		return post({
			url:"/work1/assetsDeliveryDetail/delivery",
			data:data
		})
	},
	//创建出库
	sq_scrap(data){
		return post({
			url:"/work1/assets/applyScrap",
			data:data
		})
	},
	//归还
	set_revert(data){
		return post({
			url:"/work1/assetsDeliveryDetail/giveBack",
			data:data
		})
	},
	///assets/findAuditList
	set_asset_aud(data){
		return get({
			url:"/work1/assets/findAuditList",
			params:data
		})
	},
	//
	import_asste(data){
		return get({
			url:"/work1/assets/excelAssetsInfo",
			params:data
		})
	},
	//同意报废
	no_bf(data){
		return post({
			url:"/work1/assets/agreeScrap",
			data:data
		})
	},
	off_bf(data){
		return post({
			url:"/work1/assets/disagreeScrap",
			data:data
		})
	},
	del_asstes(data){
		return post({
			url:"/work1/assets/delete",
			data:data
		})
	},


	//班级管理
	get_executive(data){
		return get({
			url:"/uc/sys/clazz/findXzb",
			params:data
		})
	},
	//班级管理
	get_classes(data){
		return get({
			url:"/uc/sys/clazz/findJxb",
			params:data
		})
	},
	//添加班级
	set_classes(data){
		return post({
			url:"/uc/sys/clazz/save",
			data:data
		})
	},
	//添加班级状态
	state_classes(data){
		return post({
			url:"/uc/sys/clazz/changeSate",
			data:data
		})
	},
	//删除班级
	del_Clazz(data){
		return post({
			url:"/uc/sys/clazz/deleteClazz",
			data:data
		})
	},
	//查询场地
	STstypetree (data){ 
		return get({
			url: '/work1/classroom/findTreeByCampusId',
			params: data
		})
	},
	//
	//删除岗位
	del_posts(data){
		return post({
			url:"/uc/sys/position/delete",
			data:data
		})
	},
	//添加岗位
	add_posts(data){
		return post({
			url:"/uc/sys/position/save",
			data:data
		})
	},
	// 根据用户角色，显示不同的班级列表供筛选
	getConByRole(){
		return get({
			url:'/work1/punish/conByRole'
		})
	},
	// 
	//个人工资
	get_salary(data){
		return get({
			url:"/work1/tsSalary/getPersonalSalary",
			params: data
		})
	},
}