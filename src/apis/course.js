import get from '../utils/get'
import post from '../utils/post'

export default {
	sLeaveList (data){
		return get({
			url: '/vacate/clist',
			data: data
		})
	},
	//班级排课列表
	classCoursegetList (data){ 
		return get({
			url: '/work1/courseTask/getList',
			params: data
		})
	},
	//删除班级排课
	STdelete (data){ 
		return post({
			url: '/work1/classCourse/delete',
			data: data
		})
	},
	//修改班级
	STupdate (data){ 
		return post({
			url: '/work1/classCourse/update',
			data: data
		})
	},
	//增加
	STsave (data){ 
		return post({
			url: '/work1/classCourse/save',
			data: data
		})
	},
	//学期
	getTerm() {
      return get({
        url: '/work1/jwTermMamager/getAllTerm',
	  })
	},
	//班级列表
	classList (data){ 
		return get({
			url: '/uc/sys/office/findOrgClazzTree',
			params: data
		})
	},
	//班级关联教职工
	classgetTeacher (data){ 
		return get({
			url: '/uc/sys/clazz/findRkByClazzid',
			params: data
		})
	},
	//教师列表
	teacherlist (data){ 
		return get({
			url: '/uc/sys/user/findTcTea',
			params: data
		})
	},
	//教师授课列表
	GTClist (data){ 
		return get({
			url: '/work1/teacherCourse/getList',
			params: data
		})
	},
	//教师授课列表固排
	GTClistpk (data){ 
		return get({
			url: '/work1/teacherCourse/getListForPk',
			params: data
		})
	},
	//增加教职工授课
	TCsave (data){ 
		return post({
			url: '/work1/teacherCourse/save',
			data: data
		})
	},
	//修改教职工授课/teacherCourse/update
	TCupdate (data){ 
		return post({
			url: '/work1/teacherCourse/update',
			data: data
		})
	},
	//删除教职工授课/teacherCourse/update
	TCdelete (data){ 
		return post({
			url: '/work1/teacherCourse/delete',
			data: data
		})
	},
	//新建课表
	newSChedule (data){ 
		return post({
			url: '/work1/schedule/save',
			data: data
		})
	},
	//获取全部课表
	getallSChedule (data){ 
		return get({
			url: '/work1/schedule/getParentSch',
			params: data
		})
	},
	//估计学期查询课表是否存在
	gettermSChedule (data){ 
		return get({
			url: '/work1/schedule/termIsExist',
			params: data
		})
	},
	//删除课表
	deleteSChedule (data){ 
		return get({
			url: '/work1/schedule/delete',
			params: data
		})
	},
	//id获取新建课表
	getSchedule (data){ 
		return get({
			url: '/work1/schedule/getSchedule',
			params: data
		})
	},
	//id获取课表节次
	getSection (data){ 
		return get({
			url: '/work1/schedule/getSection',
			params: data
		})
	},
	//保存节次时段
	setSectionTime (data){ 
		return post({
			url: '/work1/schedule/setSectionTime',
			data: data
		})
	},
	//公共时段设置
	PublicTime (data){ 
		return post({
			url: '/work1/schedule/addPublic',
			data: data
		})
	},
	//条件设置
	//获取课表信息/schedule/getScheduleByType
	CSByType (data){ 
		return get({
			url: '/work1/schedule/getScheduleByType',
			params: data
		})
	},
	//获取禁排固排
	CSdisType (data){ 
		return get({
			url: '/work1/section/getSectionByType',
			params: data
		})
	},
	//设置禁排固排
	CSsetprohibit (data){ 
		return post({
			url: '/work1/section/setPk',
			data: data
		})
	},
	//特殊排课要求
	getTeacherSpe (data){
		return get({
			url: '/work1/rule/get',
			params: data
		})
	},
	//获取特殊排课要求
	get_sec (data){ 
		return post({
			url: '/work1/rule/getRulelListPage',
			data: data
		})
	},
	//删除特殊排课要求
	CSdeleteSpe (data){ 
		return post({
			url: '/work1/rule/delete',
			data: data
		})
	},
	//添加特殊排课要求
	CSsaveSpe (data){ 
		return post({
			url: '/work1/rule/save',
			data: data
		})
	},
	//修改特殊排课要求
	CSupdateSpe (data){ 
		return post({
			url: '/work1/rule/save',
			data: data
		})
	},
	//开始排课
	CSstartpk (data){ 
		return post({
			url: '/work1/section/autoPk',
			data: data,
			// timeout: 10*60000, 
		})
	},
	//清空课表
	CSclearsection (data){ 
		return post({
			url: '/work1/section/clearSection',
			data: data
		})
	},
	//清空固排
	CSclearfixed (data){ 
		return post({
			url: '/work1/section/clearSolidRow',
			data: data
		})
	},
	//升序降序/rule/setPriority
	CSsetsort (data){ 
		return post({
			url: '/work1/rule/setPriority',
			data: data
		})
	},
	//取消条件设置
	setcondition (data){ 
		return post({
			url: '/work1/rule/cancel',
			data: data
		})
	},
	//场地设置
	//场地学科关联
	STcourse (data){ 
		return get({
			url: '/work1/classCourse/getListForClassRoom',
			params: data
		})
	},
	//新增场地类型
	STnewsitetype (data){ 
		return post({
			url: '/work1/field/saveList',
			data: data
		})
	},
	//删除场地类型
	STdeletsitetype (data){ 
		return get({
			url: '/work1/field/deleteFieldTpye',
			params: data
		})
	},
	//创建场地名称/classroom/createFieldRoom
	STnewsitename (data){ 
		return post({
			url: '/work1/field/createFieldName',
			data: data
		})
	},
	//校区查询场地类型
	STcumpustype (data){ 
		return get({
			url: '/work1/field/selectFieldType',
			params: data
		})
	},
	//校区查询场地tree /classroom/findTreeByCampusId
	STstypetree (data){ 
		return get({
			url: '/work1/classroom/findTreeByCampusId',
			params: data
		})
	},
	//校区查询场地类型
	STtypelist (data){ 
		return get({
			url: '/work1/field/viewAllFieldTpye',
			params: data
		})
	},
	//获取场地名称
	STgetnamelist (){ 
		return get({
			url: '/work1/field/viewFieldName',
		})
	},
	//获取场地房间信息/classroom/viewFieldRoom
	STgetroom(data){
		return get({
			url: '/work1/classroom/viewFieldRoom',
			params: data
		})
	},
	//删除楼层/classroom/chooseFloorNum
	STdeletefloor (data){ 
		return get({
			url: '/work1/classroom/deleteFieldRoomFloorNum',
			params: data
		})
	},
	//获取楼层/classroom/chooseFloorNum
	STgetfloor (data){ 
		return get({
			url: '/work1/classroom/chooseFloorNum',
			params: data
		})
	},
	//创建场地名称/classroom/createFieldRoom
	STcreatroom (data){ 
		return post({
			url: '/work1/classroom/createFieldRoom',
			data: data
		})
	},
	//删除场地名称
	STdeleteroom (data){ 
		return get({
			url: '/work1/field/deleteSiteName',
			params: data
		})
	},
	//修改场地名称/classroom/queryClazz
	STchangeroomname (data){ 
		return post({
			url: '/work1/field/changeSiteName',
			data: data
		})
	},
	//查询班级/field/selectSiteName
	queryclass (data){ 
		return get({
			url: '/work1/classroom/queryClazz',
			params: data
		})
	},
	//查询班级
	querytypename (data){ 
		return get({
			url: '/work1/field/selectSiteName',
			params: data
		})
	},
	//班级添加到教室/classroom/clazzAddRoom
	classandroom (data){ 
		return post({
			url: '/work1/classroom/clazzAddRoom',
			data: data
		})
	},
	//删除教室班级
	deleteclass (data){ 
		return get({
			url: '/work1/classroom/deleteClazz',
			params: data
		})
	},
	//删除zhuanye 
	deletepro (data){ 
		return get({
			url: '/work1/classroom/deletePro',
			params: data
		})
	},
	//特殊学科
	getspecial (data){ 
		return get({
			url: '/work1/classroom/queryPro',
			params: data
		})
	},
	//场地名称房间list
	typegetfloor (data){ 
		return get({
			url: '/work1/classroom/queryField',
			params: data
		})
	},
	//场地id和楼层获取房间信息/schedule/getSectionByPerson
	typegetroom (data){ 
		return get({
			url: '/work1/classroom/queryFieldRoom',
			params: data
		})
	},
	//特殊学科添加到房间
	specaddroom (data){ 
		return post({
			url: '/work1/classroom/proAddRoom',
			data: data
		})
	},
	//查询课表
	querykb (data){ 
		return get({
			url: '/work1/schedule/getSectionByPerson',
			params: data
		})
	},
	//查询课表/section/getSectionByColor
	queryuser (data){ 
		return get({
			url: '/uc/sys/user/viewUser',
			params: data
		})
	},
	//查询课表课手动排课
	getschcolor (data){ 
		return get({
			url: '/work1/section/getSectionByColor',
			params: data
		})
	},
	//查询课表/section/exchangeSec
	exchangeSec (data){ 
		return get({
			url: '/work1/section/exchangeSec',
			params: data
		})
	},
	//获取老师授课学科/sys/clazz/findCourseByTeaAndGrade
	querytechxk (data){ 
		return get({
			url: '/uc/sys/clazz/findCourseByTeaAndGrade',
			params: data
		})
	},
	//获取未排完课程
	getunfinished (data){ 
		return get({
			url: '/work1/courseTask/getListSingleForNot',
			params: data
		})
	},
	//手动排课
	setNotPk (data){ 
		return post({
			url: '/work1/section/setNotPk',
			data: data
		})
	},
	//二维码
	get_code (data){ 
		return post({
			url: '/work1/sectionApp/generateQRCode',
			data: data
		})
	},
	//获取课表
	getnewkb (data){ 
		return get({
			url: '/work1/section/getSectionByType',
			params: data
		})
	},
	//删除房间单个
	del_room (data){ 
		return get({
			url: '/work1/classroom/deleteRoom',
			params: data
		})
	},
	//二维码
	change_room (data){ 
		return post({
			url: '/work1/classroom/updateRoom',
			data: data
		})
	},
	//获取所以课程
	get_allcourse (data){ 
		return get({
			url: '/work1/course/findListAll',
			params: data
		})
	},
}