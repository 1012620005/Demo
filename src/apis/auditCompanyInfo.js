import get from '../utils/get'
import post from '../utils/post'
import alias from './company/alias'
var apiAlias = alias.ALIAS
export default {
	// 查询所有公司的状态
    queryCompanyList (data) {
    	return post({
    		url: apiAlias +'/company/list',
    		data: data
    	})
    },
    // 审核公司
    auditCompany (data) {
    	return post ({
    		url: apiAlias +'/company/examination',
    		data:data
    	})
    },
	// 获取公司详细信息
	getCompanyMessage (data) {
		return post ({
			url: apiAlias +'/company/toCompany',
			data: data,
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
	},
    // 学生就业的列表页面
    queryStudentList (data) {
        return post({
            url:apiAlias +'/entryUser/list',
            data:data
        })
	},
	// 查看点评
	seeFeedBack (data) {
		return post({
			url: apiAlias +'/entryUser/getFeedback',
			data:data
		})
	}
}