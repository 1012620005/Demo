import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default {
	// 获取面试通知的列表页面的数据
	getOfferLetterList(data) {
	   return post({
	   	  url: apiAlias + '/interviewEntry/interviewList',
	   	  data:data
	   })
	},
	//批量入职的接口
	offerLetter (data) {
		return post({
			url: apiAlias + '/interviewEntry/entry',
			data:data
		})
	},
	// 查看学生简历的接口
	seeResume (data) {
		return post({
			url: apiAlias + '/resume/getResume',
			data:data
		})
	},
	// 点评学生
	feedStudent (data) {
		return post({
			url: apiAlias + '/interviewEntry/feedback',
			data:data
		})
	}

}