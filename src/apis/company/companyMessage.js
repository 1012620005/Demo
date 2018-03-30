import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default {
	// 公司头像上传的接口
	UploadImg (data) {
		return post({
			url: apiAlias + '/company/updatePhoto',
			data: data,
			headers:{
				'Content-Type': 'multipart/form-data'
			}
		})
	},
	editorInfo (data) {
		return post({
			url: '/uc/sys/user/modifyUser',
			data: data,
 			headers:{
	          'authorization': 'Basic cmM6cmNw'
	        }			
		})
	},
	editortel (data) {
		return post ({
			url: apiAlias + '/company/updatePhone',
			data: data,
			headers:{
				'authorization': 'Basic cmM6cmNw'
			}
		})
	},
	// 获取公司详细信息
	getCompanyMessage (data) {
		return post ({
			url: apiAlias + '/company/toCompany',
			data: data,
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
	},
	// 获取图片
	getImg (data) {
		return get({
			url:apiAlias + '/company/getPhoto',
			params: data
		})
	}
	
}