import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default{
	// 获取投递列表页
	getDropInBox(data) {
		return post({
			url: apiAlias + '/conllectionDelivery/deliveryList',
			data:data
		})
	}

}