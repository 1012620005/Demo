import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default {
	// 查询省的列表
	getProvince (code) {
		return get({
			url: '/uc/common/ctrl/findAreaByPtCode',
			params: {
				code: !code? '': code
			}
		})
	},
	//完善公司接口
	complete(data) {
		return post({
			url: apiAlias + '/common/company/updateCompany',
			data: data
		})
	},
	// 获取行业的接口
	getIntustry () {
		return get({
			url: apiAlias + '/common/industry/list'
			
		})
	}
}