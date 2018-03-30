import get from '../../utils/get'
import post from '../../utils/post'
export default{
    loadclassData(campusId,deptId,profId){
        return get({
            url:'/work1/clazzmanager/distritem/distrClazzForProf?campusId=' + campusId + '&deptId=' + deptId + '&profId=' + profId
        })
    },
    leftData(data){
        return get({
            url:'/work1/clazzmanager/distritem/getStudByProfAMAndSex',
            params:data
        })
    },
    // addClassData(data) {
    //     return post({
    //         url: '/work1/clazzmanager/distritem/addClazz', 
    //         data: data
    //     })
    // },
    addStudent(data){
        return post({
            url:'/work1/clazzmanager/distritem/addStudToClazz',
            data:data
        })
    },
    removeStudent(data){
        return post({
            url:'/work1/clazzmanager/distritem/deleteStudFromClazz',
            data:data
        })
    },
    // removeClass(data){
    //     return get({
    //         url:'/work1/clazzmanager/distritem/deleteClazz?clazzId=' + data,
    //     })
    // },
    submitDistrClazzInfo(data){
        return get({
            url:'/work1//clazzmanager/distritem/submitDistrClazzInfo',
            params : data
        })
    },
    // 重置分班
    resetDistrItem(data){
        return get({
            url:'/work1/clazzmanager/distritem/resetDistrItem?profId=' + data
        })
    },
    autoDistrClazz(data){
        return get({
            url:'/work1/clazzmanager/distritem/autoDistrClazz',
            params :data
        })
    }
}