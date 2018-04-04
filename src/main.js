import App from './App.vue'
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'  //引入富文本编辑器
import axios from 'axios'   //引入ajax
import Cookies from 'js-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex/store'
import Vuex from 'vuex'
// import router from './routers/routers'
import './common/css/font/iconfont.css'
import vueBus from 'vue-bus'
// import 'vue-easytable/libs/themes-base/index.css'
// import {VTable,VPagination} from 'vue-easytable'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import VideoPlayer from 'vue-video-player'
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost:8533/static';
Vue.prototype.$ajax = axios
Vue.prototype.$Cookies = Cookies
console.log(axios)
console.log('+++++++')
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueQuillEditor)
Vue.use(vueBus)
Vue.use(VideoPlayer)
new Vue({
 //  router,
  store,
  render: h => h(App)
}).$mount('#app')

