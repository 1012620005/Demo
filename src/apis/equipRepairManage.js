import get from '../utils/get'
import post from '../utils/post'
import alias from './company/alias'
var apiAlias = alias.ALIAS
export default{
	// 添加设备保修的数据
	addEquipData (data) {
		return post({
			url: apiAlias + '/repair/add',
			data:data
		})
	},
	// 查询设备保修的列表
	queryEquipList (data) {
		return post({
			url: apiAlias + '/repair/listall',
			data:data
		})
	},
	//查询自己录入的信息
	querymyList (data) {
		return post({
			url: apiAlias + '/repair/list',
			data:data
		})
	},
	// 提交设备保修人员
	submitPerson (data) {
		return post({
			url: apiAlias + '/repair/update',
			data:data
		})
	}
}