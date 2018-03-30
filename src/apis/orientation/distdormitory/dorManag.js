import get from '../../../utils/get'
import post from '../../../utils/post'

export default {
    loadSelect(data) {
		return get({
			url: '/uc/common/ctrl/findOfficeByPid',
			params : data
		})
	},
    getDormBuildByWhere(data){
        return get({
			url: '/work1/dormmanager/dormbuild/getDormBuildByWhere',
			params : data
		}) 
    },
	
	// getSexDictList(data){
	// 	 return get({
	// 		url: 'uc/common/ctrl/getDictMapList',
	// 		params : data
	// 	}) 
	// },
    addModifDormBuild (data) {
		return post({
			url : '/work1/dormmanager/dormbuild/addModifDormBuild',
            data : data
		})
	},
    deleteDormBuild(data){
        return get({
			url : '/work1/dormmanager/dormbuild/deleteDormBuild',
			params : data
		})
    },
	// 根据所选校区查数据
	selectCampusData (id) {
		return get({
			url: '/work1/clazzmanager/distrclazz/allDept',
			data: data
		}) 
	},
	/**************************************************************************************************** */
	//这里是创建宿舍页面的js
	//通过宿舍楼id获得宿舍
	getDormitoryByBuild (data) {
		return get({
			url : '/work1/dormmanager/dormitory/getDormitoryByBuild?buildId=' + data,
		}) 
	},
	//批量创建宿舍
	addDormitory(data){
		return post({
			url : '/work1/dormmanager/dormitory/addDormitory',
			data : data
		})
	},
	deleteDistrdom(data){
		return post({
			url : '/work1/dormmanager/dormitory/deleteDormitory',
			data : data
		})
	},
	getDormitoryByBuildAndFloor(data){
		return get({
			url : '/work1/dormmanager/dormitory/getDormitoryByBuildAndFloor',
			params : data
		})
	}

	// deleteDormByFloor(data1,data2){
	// 	return get({
	// 		url : '/work1/dormmanager/dormitory/deleteDormByFloor?buildId=' + data1 + '&floor=' + data2
	// 	})
	// }
  
}