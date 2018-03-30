import get from '../../utils/get'
import post from '../../utils/post'
import alias from './alias'
var apiAlias = alias.ALIAS
 export default {
 	getUserMsg (data){
 		return post({
 			url: apiAlias +'/resume/getResume',
 			data: data
 		})
 	},
 	// 编辑个人信息
 	editorUserInfo (data) {
 		return post({
 			url:apiAlias +'/resume/updateResume',
 			data:data
 		})
 	},
 	// 编辑我的优势
 	editorAdvange (data) {
 		return post({
 			url: apiAlias +'/resume/addAdvantage',
 			data:data
 		})
 	},
 	// 编辑工作经历
 	editorExprience (data) {
 		return post ({
 			url: apiAlias +'/resume/updateWorkExperience',
 			data:data
 		})
 	},
 	// 编辑教育经历
 	editorEdu (data) {
 		return post({
 			url: apiAlias +'/resume/updateEducations',
 			data:data
 		})
 	},
 	// 添加教育经历
 	addEdu (data) {
 		return post({
 			url: apiAlias +'/resume/addEducations',
 			data:data
 		})
 	},
 	// 删除工作经历
 	delWork (data) {
 		return post({
 			url: apiAlias +'/resume/deleteWorkExperience',
 			data:data
 		})
 	},
 	// 删除教育经历
 	delEdu (data) {
 		return post({
 			url: apiAlias +'/resume/deleteEducations',
 			data:data
 		})
 	},
 	// 添加工作经历
 	addWork (data) {
 		return post({
 			url:apiAlias +'/resume/addWorkExperience',
 			data:data
 		})
 	},
 	getUserResume (data) {
		return post ({
			url: apiAlias +'/resume/getResume',
			data: data
		})
	}
 }