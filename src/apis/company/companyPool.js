import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default{
	// 查询人才库的列表页面信息
	getCompanyPoolList(data){
		return post({
			url: apiAlias + '/resume/list',
			data:data
		})
	},
	// 发起面试邀约
	pubilcInterView(data) {
		return post({
			url: apiAlias + '/interviewEntry/interview',
			data:data
		})
	},
	//查看学生简历
	seeUserResume (data) {
		return post({
			url: apiAlias + '/resume/getResume',
			data:data
		})
	}
}