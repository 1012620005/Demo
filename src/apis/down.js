import get from '../utils/getpo'
export default {

  download(data) {
      return get({
        url: '/uc/common/download',
        params:data
    })
  },
}
