import get from '../utils/get'
import post from '../utils/post'

export default{
	// 添加和编辑班级通知
	addClassNote (data) {
		return post({
			url:'/uc/sys/msg/save',
			data: data
		})
	},
	// 获取班级通知列表
	getClassNoteList (data) {
		return get({
			url: '/uc/sys/msg/findMsg',
			params: data
		})
	}
}