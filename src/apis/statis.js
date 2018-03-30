import get from '../utils/get'
import post from '../utils/post'
export default{
    // 数据统计接口
    getData () {
       return get({
            url:'/uc/sys/count'
        })
    }
    
}