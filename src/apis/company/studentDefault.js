import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default {
	getCityList (code) {
		return get({
			url: '/uc/common/ctrl/findAreaByPtCode',
			params: {
				code: !code? '': code
			}
		})
	},
	// 获取个人信息
	getUserMsg (data) {
		return get({
			url: '/uc/sys/user/viewUser',
			params: data
		})
	},
	// 调取简历查询接口看是否已经填写简历
	getUserResume (data) {
		return post ({
			url: apiAlias + '/resume/getResume',
			data: data
		})
	},
	// 获取推荐的列表页面
	getEmplayList (data) {
		return post({
			url:apiAlias + '/common/jobTitle/list',
			data:data
		})
	},
	// 收藏接口
	collenting (data) {
		return post ({
			url: apiAlias + '/conllectionDelivery/conllection',
			data:data
		})
	},
	// 取消收藏
	cancelCollent (data) {
		return post({
			url: apiAlias + '/conllectionDelivery/cancel',
			data:data
		})
	},
	// 退出
	exitApi (data) {
		return get({
			url:'uc/oauth/quit',
			params:data
		})
	}
	
}