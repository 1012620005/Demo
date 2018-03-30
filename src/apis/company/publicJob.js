import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
export default{
	// 获取职位的数据
	getPositionData () {
		return get({
			url: apiAlias +'/common/position/list'
		})
	},
	getCityList (code) {
		return get({
			url: '/uc/common/ctrl/findAreaByPtCode',
			params: {
				code: !code? '': code
			}
		})
	},
	// 提交发布职位信息
	commitPublicJob (data) {
		return post ({
			url: apiAlias +'/releasePosition/addReleasePosition',
			data: data
		})
	},
	// 获取发布信息的列表
	getPublicList (data) {
		return post({
			url: apiAlias +'/releasePosition/list',
			data: data
		})
	},
	// 查看发布信息的接口
	seePublicMsg (data) {
		return post({
			url: apiAlias +'/releasePosition/getReleasePosition',
			data:data
		})
	},
	// 停止招聘
	stopPublic (data) {
		return post({
			url: apiAlias +'/releasePosition/endReleasePosition',
			data: data
		}) 
	}
}