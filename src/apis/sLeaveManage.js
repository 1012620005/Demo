import get from '../utils/get'
import post from '../utils/post'
import alias from './company/alias'
var apiAlias = alias.ALIAS
export default{
	// 获取学生管理页面请假的列表页
	getSleaveManList (data) {
		return get({
			url: apiAlias +'/vacate/list2',
			params: data
		})
	},
	// 销假
	studentCancel(data) {
		return get({
			url: apiAlias +'/vacate/repeal',
			params: data
		})
	},
	// 审核详情
	aduitDetial (data) {
		return post({
			url: apiAlias +'/vacate/operatelist',
			data:data
		})
	},
	// 获取转发人的信息
	transpond () {
		return get({
			url: apiAlias +'/vacate/dispatchlist'
		})
	},
	// 点击转发的接口
	clickTranspond (data) {
		return post({
			url:apiAlias +'/vacate/dispatch',
			data:data
		})
	},
	// 用户点击通过
	clickPass (data) {
		return get({
			url:apiAlias +'/vacate/approve',
			params: data
		})
	},
	// 用户点击不通过
	clicNoPass (data) {
		return get({
			url: apiAlias +'/vacate/disapprove',
			params:data
		})
	}
}