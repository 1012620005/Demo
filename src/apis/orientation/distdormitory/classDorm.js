import get from '../../../utils/get'
import post from '../../../utils/post'
import apiUrl from '../../../utils/config'
import { getToken } from '../../../utils/auth'

export default{
    loadSelect(data) {
        return get({
            url: '/uc/common/ctrl/findOfficeByPid',
            params : data
        })
	},
    distrTotalForClazz(data) {
		return get({
            url: '/work1/dormmanager/distrtotal/distrTotalForClazz',
            params : data   
		})
    },
    getDistrDormByMainId(data){
        return get({
            url : '/work1/dormmanager/distrdorm/getDistrDormByMainId',
            params : data
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