import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '../utils/auth'
import {ROUTES} from './routerConfig'
import { Message } from 'element-ui'
import api from "../apis/login.js";
import Cookies from 'js-cookie'
Vue.use(Router)

const router = new Router({
    linkActiveClass: 'active',
    routes: ROUTES
})
// 判断是否是登陆的状态 如果路由在找到这个login的时候是没有本地缓存的话 就会跳转到登陆的页面
// 同时会拦截跳转的请求进行判断
//router.beforeEach((to, from, next) => {
    //if (to.path == '/login') {
    //sessionStorage.removeItem('user');
    //}
    //let user = JSON.parse(sessionStorage.getItem('user'));
    //if (!user && to.path != '/login') {
    //    next({ path: '/login' })
    //} else {
    //next()
    //}
//})
router.beforeEach((to, from, next) => {
  // to 和 from 都是 路由信息对象
  //var auth = to.matched[0].default.auth;
  //console.log(to);
  if (to.path =="/" || to.path == "/report" || to.path == "/retrievePassword" || to.path =="/logout" || to.path =='/studentRegistration' || to.path =='/teacherRegistration' || to.path =='/parentsRegistration' || to.path == '/companyDefault' || to.path == '/studentEmployJob' || to.path == '/companyLogin' || to.path == '/companyComplete' || to.path == '/companyEnter' || to.path == '/studentIndex/studentDefault' || to.path=='/recruitAdmin/entApply' || to.path =='/recruitAdmin/payBusiness' || to.path =='/recruitAdmin/paymentList') {
   if(to.path =="/"){
     if(to.query.token){
      let formdata = new FormData();
      formdata.append("access_token", to.query.token);
      api.istoken(formdata).then(r=>{
        if(r.data.data){
          Message({
            message: "登录成功",
            type: "success",
            duration: 800
          });
          Cookies.set('sessionid',to.query.token)
          Cookies.set('userLogin',to.query.userType)
          if(to.query.userType == '3') {
            next({'path':'/newStudent'});
          } else {
            next({'path':'/newIndex'});
          }
        }else{
          Message({
            message: "请重新登录",
            type: 'error',
            duration: 800
            })
          next({'path':'/'});
        }
      })
     }else{
      next();
     }
   }else{
    next();
   }
  }else {
    const user = getToken();
    if(user){
        next();
    }
    else{
      Message({
        message: "请登录",
        type: 'error',
        duration: 5 * 1000
        })
      next({'path':'/'});
    }
  }
});
export default router
