import get from '../utils/get'
import post from '../utils/post'
import alias from './company/alias'
var apiAlias = alias.ALIAS
export default{
	// 申请公文流转列表页
	getOfficeList (data) {
		return post ({
			url:  apiAlias +'/od/listall',
			data: data
		})
	},
	//创建公文流转
	createOfficeWork (data) {
		return post({
			url:  apiAlias +'/od/add',
			data:data,
			contentType:'application/x-www-form-urlencoded'
		})
	},
	// 跳转公文流转编辑页面或查看公文流转
	jumperOfficeWorkPage (data) {
		return post ({
			url: apiAlias +'/od/detail',
			data:data
		})
	},
	// 编辑公文流转页面
	editorOfficeWork (data) {
		return post ({
			url: '',
			data:data
		})
	},
	// 删除公文流转
	deleteOfficeWork (data) {
		return post ({
			url:  apiAlias +'/od/del',
			data:data
		})
	},
	// 接收公文流转列表页
	getOfficeWorkList (data) {
		return post({
			url:  apiAlias +'/od/list',
			data:data
		})
	},
	// 获取公文流转下发的对象的接口
	getAllObject () {
		return get({
			url: apiAlias +'/od/teacherlist'
		})
	},
	// 校区接口
	getCampus() {
		return get({
			url: apiAlias +'/od/campus'
		})
	},
	// 转发公文
	transmit (data) {
		return post({
			url: apiAlias +'/od/dispatch',
			data: data
		})
	}
}