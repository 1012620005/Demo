import get from '../utils/get'
import post from '../utils/post'
import delet from '../utils/delete'
import put from '../utils/put'
import apiUrl from '../utils/config'
import { getToken } from './../utils/auth'
export default{
    //获取教职工工资明细列表
    getStaffList(data){
        return get ({
            url: 'work1/jwFinance/salaryList',
            params:data
        }) 
    },
    // getStaffList(data){
    //     return get ({
    //         url: 'work1/jwFinance/list',
    //         params:data
    //     }) 
    // },
    // 下载模板
    getDownload(){
        var token = getToken()
        var url = apiUrl.BASE_URL + '/work1/jwFinance/downloadSalaryTemp?access_token='+ token
        return url
    },
    // 导出工资
    exportSalary(salaryStartTime,salaryEndTime,nameOrId){
        var token = getToken()
        var exportUrl = apiUrl.BASE_URL + '/work1/jwFinance/printSalary?access_token='+ token+'&salaryStartTime='+salaryStartTime+'&salaryEndTime='+salaryEndTime+'&nameOrId='+nameOrId
        return exportUrl
    },
    //保存教职工工资明细
    postStaff(data){
        return post ({
            url: 'work1/jwFinance/save',
            data:data
        }) 
    },
    //保存类别
    postPayItem(data){
        return post({
            url: 'work1/jwFinanceType/save',
            data: data
        })
    },
    //获取全部类别(带分页)
    getAllItemNo(data){
        return get ({
            url: 'work1/jwFinanceType/getAll',
            params:data
        }) 
    },
    //获取全部类别(不带分页)
    getAllItem(data){
        return get ({
            url: 'work1/jwFinanceType/getAllFinance',
            params:data
        }) 
    },
    //更新类别
    putUpItem(data){
        return put({
            url: 'work1/jwFinanceType/update',
            data: data
        })
    },
    //删除类别
    delItem(typeId){
        return delet({
            url: 'work1/jwFinanceType/delete/'+typeId,
        })
    },
    // 任课老师获取工资列表
    getFacsaList(){
        return get({
            url: 'work1/jwFinance/teacherFinance'
        })
    }
}