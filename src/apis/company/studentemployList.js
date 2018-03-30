import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default {
	// 从首页查询的招聘信息
	getEmploy (data){
		return post({
			url: apiAlias + '/common/jobTitle/list',
			data: data
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
	}
}