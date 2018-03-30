import get from '../../../utils/get'
import post from '../../../utils/post'
import apiUrl from '../../../utils/config'
import { getToken } from '../../../utils/auth'

export default{
    loadSelect (id,type) {
		return get({
			url: '/uc/common/ctrl/findOfficeByPid?id=' + id + '&type=' + type
		})
	},
    distrTotalForDept(campusId){
        return get({
            url: '/work1/dormmanager/distrtotal/distrTotalForDept' + (campusId ? ('?campusId=' + campusId) : '')
        })
    },
    getDistrDormByMainId(data){
        return get({
            url : '/work1/dormmanager/distrdorm/getDistrDormByMainId?mainRelation=' + data,
        })
    },
    exportExcelDistrDorm(data){
        return apiUrl.BASE_URL + '/work1/dormmanager/distrdorm/exportExcelDistrDorm?access_token=' + getToken() + '&mainRelation='
        // return get({
        //     url : '/work1/dormmanager/distrdorm/exportExcelDistrDorm',
        //     params : data
        // })
    }
    
}