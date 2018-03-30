import get from '../../../utils/get'
import post from '../../../utils/post'
import apiUrl from '../../../utils/config'
import { getToken } from '../../../utils/auth'

export default{
    getCurrentUser(){
        return get({
            url : '/uc/sys/user/viewUser'
        }) 
    },
    getDistrTotal(mainRelation){
        return get({
            url : '/work1/dormmanager/distrtotal/getDistrTotal?mainRelation=' + mainRelation
        })
    },
    getDistrDormByMainId(data){
        return get({
            url : '/work1/dormmanager/distrdorm/getDistrDormByMainId?mainRelation=' + data,
        })
    },
    agreeDistrTotal(mainRelation,state,reason){
        return get({
            url : '/work1/dormmanager/distrtotal/agreeDistrTotal?mainRelation=' + mainRelation + '&state=' + state + "&reason=" +reason,
        })
    },
    exportExcelDistrDorm(data){
        return apiUrl.BASE_URL + '/work1/dormmanager/distrdorm/exportExcelDistrDorm?access_token=' + getToken() + '&mainRelation='
    }  
}