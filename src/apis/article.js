import fetch from '../utils/post'

export default {

    fetchArticle(user, pass) {
        return fetch({
          url: '/uc/oauth/token',
          method: 'POST',
          params: {
            username:"user",
            password:"pass"
          }
      })
  },
  fetchList() {
      return fetch({
        url: '/uc/oauth/token',
        method: 'get'
    })
  },
  fetchregiste() {
      return fetch({
        url: '/uc/common/ctrl/registe',
        method: 'get'
    })
  }

}

// export default {
// 	getNews() {
// 		return axios.get( NewsResource )
// 	},
// 	getNewsById( id ) {
// 		return axios.get( NewsIdResource + id )
// 	},
// 	getNewsByDate( date ) {
// 		return axios.get( NewsDateResource + date )
// 	},
// 	getNewsInfoById( id ) {
// 		return axios.get( NewsInfoResource, {
// 			params: {
// 				id: id
// 			}
// 		} )
// 	},
// 	getTopics() {
// 		return axios.get( TopicsResource )
// 	},
// 	getTopicsById( topicid ) {
// 		return axios.get( TopicsIdResource + topicid )
// 	},
// 	getSections() {
// 		return axios.get( SectionsResource )
// 	},
// 	getSectionsById( sectionid ) {
// 		return axios.get( SectionIdResource, {
// 			params: {
// 				sectionid: sectionid
// 			}
// 		} )
// 	},
// }



// function fetchList(query) {
//   return fetch({
//     url: '/article/list',
//     method: 'get',
//     params: query
//   })
// }

// export function fetchArticle() {
//   return fetch({
//     url: '/v2/book/1220562',
//     method: 'get'
//   })
// }

// export function fetchPv(pv) {
//   return fetch({
//     url: '/article/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

