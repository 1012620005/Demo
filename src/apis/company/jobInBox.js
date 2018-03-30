import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default {
	// 获取投递箱的列表页面
	getJobInBoxList (data) {
		return post({
			url: apiAlias + '/interviewEntry/list',
			data:data
		})
	},
	// 批量投递面试通知
	jobInInterview (data) {
		return post({
			url: apiAlias + '/interviewEntry/interview',
			data:data
		})
	},
	// 查看简历
	seeResume (data) {
		return post({
			url: apiAlias + '/resume/getResume',
			data:data
		})
	}
}