import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default {
	// 获取城市的数据接口
	getCityList (code) {
		return get({
			url: '/uc/common/ctrl/findAreaByPtCode',
			params: {
				code: !code? '': code
			}
		})
	},
	// 获取行业的数据接口
	getIntustry () {
		return get({
			url: apiAlias +'/common/industry/list'
		})
	},
	// 获取职位的数据
	getPositionData () {
		return get({
			url: apiAlias +'/common/position/list'
		})
	},	
}

