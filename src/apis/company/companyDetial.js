import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default{
	// 获取公司的信息
	getCompanyInfo (data) {
		var formData = new FormData()
		formData.append('companyPhone',data.companyPhone)
		return post({
			url: apiAlias + '/company/toCompany',
			data: formData,
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
	},
	// 获取职位的信息
	getPositionInfo(data) {
		var formData = new FormData()
		formData.append('id',data.id)
		formData.append('companyId',data.companyId)
		formData.append('userId',data.userId)
		formData.append('positionName',data.positionName)
		return post({
			url: apiAlias + '/releasePosition/getReleasePosition',
			data:formData
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
	},
	// 投递简历
	dropInBox (data) {
		return post({
			url: apiAlias + '/conllectionDelivery/delivery',
			data:data
		})
	}

}