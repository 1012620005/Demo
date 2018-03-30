import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default {
	// 保存个人信息
	saveUserMsg (data) {
		return post ({
			url: apiAlias + '/resume/addResume',
			data: data
		})
	},
	//保存优势接口 
	saveAdvantage (data) {
		return post ({
			url: apiAlias + '/resume/addAdvantage',
			data: data
		})
	},
	// 保存求职意向接口
	saveIntention (data) {
		return post({
			url: apiAlias + '/resume/addIntention',
			data: data
		})
	},
	// 保存工作经历和教育经历
	saveWorkAndStudy(data) {
		return post({
			url: apiAlias + '/resume/addWorkAndStudy',
			data: data
		})
	}
}