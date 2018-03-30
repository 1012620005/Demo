import get from '../../utils/get'
import post from '../../utils/post'
import apiUrl from '../../utils/config'
import { getToken } from '../../utils/auth'
export default{
	// 校区的列表渲染
	loadCampus (id,type) {
		return get({
			url: '/uc/common/ctrl/findOfficeByPid?id=' + id + '&type=' + type
		})
	},
	//通过校区加载内容
	selectData (campusId,deptId,profId) {
		return get({
			url: '/work1/clazzmanager/distrclazz/distrClazzSummary?campusId='+ campusId + (deptId ? '&deptId=' + deptId : '') + (profId ? '&profId=' + profId : '')
		}) 
	},
	selectClazz(data){
		return get({
			url: 'uc/sys/clazz/findClazzByPro',
			params : data
		})
	},
	getCurrentGrade(){
		return get({
			url: 'uc/sys/grade/getCurrentGrade'
		})
	},
	clazzInfo(profId){
		return get({
			url: '/work1/clazzmanager/distritem/auditDistrClzz?profId=' + profId
		})
	},
	//加载字典中的所有字段
	getDictMapList(data){
		return get({
			url:'uc/common/ctrl/getDictMapList?type=' + data,
		})
	},
	//领导审核页面的js
	//同意分班
	agreeDistrClazz(profId){
		return get({
			url: '/work1/clazzmanager/distritem/agreeDistrClazz?profId=' + profId
		})
	},
	disagreeDistrClazz(profId){
		return get({
			url: '/work1/clazzmanager/distritem/disagreeDistrClazz?profId=' + profId
		})
	},
	//导出班级excel
	exportClazzInfo(data){
		return apiUrl.BASE_URL + '/work1/clazzmanager/distritem/excelClazzInfo?access_token=' + getToken() + '&clazzId='
		// return get({
		// 	url: '/work1/clazzmanager/distritem/excelClazzInfo',
		// 	params: data
		// })
	},
	//导出整个专业到excel
	//每个班一个sheet页
	exportExcelClazzForProfzInfo(data){
		return apiUrl.BASE_URL + '/work1/clazzmanager/distrclazz/exportExcelClazzForProf?access_token=' + getToken() + '&profId='
		// return get({
		// 	url: '/work1/clazzmanager/distrclazz/exportExcelClazzForProf',
		// 	params: data
		// })
	}
}