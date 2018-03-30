import get from '../../../utils/get'
import post from '../../../utils/post'

export default{
    getCurrentUser(){
        return get({
            url : '/uc/sys/user/viewUser'
        }) 
    },
    getProfAndClazzForTeac(data){
        return get({
            url : '/uc/sys/clazz/findProByFdy',
            params: data
        })
    },
    getChangeDorm(data){
        return post({
            url : '/work1/changedorm/changeDorm/getChangeDorm',
            data : data
        })
    },
    getAllGrade(){
        return get({
            url : '/uc/common/ctrl/findAllGrade'
        })
    },
    changeDorm(data){
        return post({
            url : '/work1/changedorm/changeDorm/changeDorm',
            data : data
        })
    }
}