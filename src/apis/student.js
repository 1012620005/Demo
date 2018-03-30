import get from '../utils/get'
import post from '../utils/post'
export default {

  login(formData) {
      return post({
        url: '/uc/oauth/token',
        headers:{
          'grant_type' : 'password',
          'authorization': 'Basic cmM6cmNw'
        },
        data:formData
    })
  },
  querypersonal(data) {
      return get({
        url: '/uc/sys/user/viewUser',
        params:data
    })
  },
  searchMsg (data){
    return get({
      url: '/uc/sys/msg/findMsg',
      params: data
    })
  }
}
