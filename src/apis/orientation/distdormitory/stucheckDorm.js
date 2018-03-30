import get from '../../../utils/get'
import post from '../../../utils/post'

export default{
    loadSelect (id,type) {
		return get({
			url: '/uc/common/ctrl/findOfficeByPid?id=' + id + '&type=' + type
		})
	},
	loadGrade(profId){
		return get({
			url : '/uc/common/ctrl/findAllGrade'
		})
	},
	loadClazz(data){
		return get({
			url: '/uc/sys/clazz/findClazzByPro',
			params : data
		})
	},
	loadInfo(data){
		return get({
			url: '/work1/dormmanager/stuDorm/getStuAndDormByWhere',
			params : data
		})
	},
	getUserById(data){
		return get({
			url: '/uc/sys/user/viewUser',
			params : data
		})
	},
	//退宿
	backDorm(data){
		return get({
			url: '/work1/dormmanager/stuDorm/backDorm',
			params : data
		})
	}
}