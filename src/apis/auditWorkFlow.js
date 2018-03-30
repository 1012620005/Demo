import get from '../utils/get'
import post from '../utils/post'
import alias from './company/alias'
var apiAlias = alias.ALIAS
export default{
	// 获取审核工作流列表页面
	getAuditList (data) {
		return get({
			url: '',
			params: data
		})
	},
	// 跳转审核页面
	jumpAuditPage (data) {
		return post ({
			url: apiAlias +'/wf/info',
			data:data
		})
	},
	// 审核通过和不通过
	
}