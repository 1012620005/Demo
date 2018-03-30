import get from '../utils/get'
import post from '../utils/post'
export default{
	// 退出登录接口
	exitLogin (data) {
		return get({
			url:'uc/oauth/quit',
			params: data
		})
	},
	// 获取用户信息
  	getCurrentUser(data) {
      	return get({
	        url: '/uc/sys/user/getCurrentUser',
	        data: data
    	})
  	}
}