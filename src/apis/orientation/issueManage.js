import get from '../../utils/get'
import post from '../../utils/post'

export default{
    addPayItem(data){
        return post({
            url: '/work1/admitmanager/payItem/addPayItem',
            data: data
        })
    },
    // 一进页面加载必缴项
    allPayItem(data){
        return get({
            url: '/work1/admitmanager/payItem/allPayItem',
            params: data
        })
    }
}