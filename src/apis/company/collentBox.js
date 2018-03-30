import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default {
	// 获取收藏列表的内容
	getCollentList (data) {
		return post({
			url:apiAlias + '/conllectionDelivery/conllectionList',
			data:data
		})
	},
	// 取消收藏
	cancelCollented (data) {
		 return post({
		 	url: apiAlias + '/conllectionDelivery/cancelConllection',
		 	data:data
		 })
	},
	// 投递简历
	dropInBox (data) {
		return post({
			url: apiAlias + '/conllectionDelivery/delivery',
			data:data
		})
	}
}