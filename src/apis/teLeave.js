import get from '../utils/get'
import post from '../utils/post'
import alias from './company/alias'
var apiAlias = alias.ALIAS
export default {
	// 获取老师请假的列表
	sLeaveList (data){
		return get({
			url: apiAlias +'/vacate/list1',
			params: data
		})
	},
	// 添加老师请假的接口
	addSleave(data) {
		return post ({
			url: apiAlias +'/vacate/add',
			data: data,
			headers: {
			    'Content-Type': 'multipart/form-data'
			}
		})
	},
	// 跳转老师请假页面
	editorSleave (id) {
		return get ({
			url: apiAlias +'/vacate/toupdate?vacateId=' + id
		})
	},
	// 修改老师的请假
	modifySleave (data) {
		return post ({
			url: apiAlias +'/vacate/doupdate',
			data: data,
			headers:{
				'Content-Type': 'multipart/form-data'
			}
		})
	},
	// 获取老师请假的工作流条件
	getWorkList (data) {
		return get({
			url: apiAlias +'/wf/condition',
			params:data
		})
	},
	// 学生销假
	studentCancel(data) {
		return get({
			url: apiAlias +'/vacate/repeal',
			params: data
		})
	},
	// 审核详情
	auditDetial (data) {
		return post({
			url: apiAlias +'/vacate/operatelist',
			data:data
		})
	},
	// 替课老师的接口
	replaceTeach (data) {
		return get({
			url:'pk/section/getNotSecListForQJ',
			params: data
		})
	}
}