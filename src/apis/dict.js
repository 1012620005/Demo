import get from '../utils/get'
import post from '../utils/post'
//用户中心字典接口
export default {
    c_education: [],
    //修改个人信息
    apiGetDictLabel(data) {
      return get({
          url: '/uc/common/ctrl/getDictLabel',
          data:data
      });
    },
  //获取当前登录用户信息
  apiGetDictMapList(data) {
      return get({
        url: '/uc/common/ctrl/getDictMapList',
        params: data
    });
  }
}

