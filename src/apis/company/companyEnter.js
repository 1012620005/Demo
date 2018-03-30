import get from '../../utils/get'
import post from '../../utils/post'
export default {
	// 用户登录
	UserLogin(data) {
		return post ({
			url: '/uc/oauth/token',
			data: data,
	        headers:{
	          'grant_type' : 'password',
	          'authorization': 'Basic cmM6cmNw'
	        }
		})
	}
}