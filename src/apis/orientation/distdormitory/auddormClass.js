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
    getProfAndClazzForTeac(data){
        return get({
            url : '/uc/sys/clazz/findProByFdy',
            params : data
        })
    },
    getClazzForTeac(data){
        return post({
            url : '/work1/dormmanager/distrtotal/getClazzForTeac',
            data : data 
        })
    },
    getDistrDormByMainId(data){
        return get({
            url : '/work1/dormmanager/distrdorm/getDistrDormByMainId',
            params : data
        })
    },
    agreeDistrTotal(data){
        return get({
            url : '/work1/dormmanager/distrtotal/agreeDistrTotal',
            params : data
        })
    },
    exportExcelStuDorm(data){
        return apiUrl.BASE_URL + '/work1/dormmanager/distrdorm/exportExcelDistrDorm?access_token=' + getToken() + '&mainRelation='
        // return get({
        //     url : '/work1/dormmanager/stuDorm/exportExcelStuDorm',
        //     params : data
        // })
    }
    
}