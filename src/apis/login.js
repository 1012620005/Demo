import get from '../utils/get'
import post from '../utils/post'
export default {

  login(formData) {
    return post({
      url: '/uc/oauth/token',
      headers: {
        'grant_type': 'password',
        'authorization': 'Basic cmM6cmNw'
      },
      data: formData
    })
  },
  istoken(data){
    return post({
      url: '/uc/oauth/checkToken',
      data: data
    })
  },
  checkpass(data){
    return post({
      url: '/uc/sys/user/editPassword',
      data: data
    })
  },
  logout() {
    return get({
      url: '/uc/oauth/quit',
    })
  },
  getrole() {
    return get({
      url: '/uc/sys/user/getCurrentUser',
    })
  },
  retrievePassword(data) {
    return post({
      url: '/uc/oauth/getBackPwdByEmail',
      data: data
    })
  },
  retrievecode(data) {
    return post({
      url: '/uc/oauth/checkPwdEmailCode',
      data: data
    })
  },
  studentRegistration() {
    return get({
      url: '/uc/common/ctrl/registe?type=2',
    })
  },
  teacherRegistration() {
    return get({
      url: '/uc/common/ctrl/registe?type=1',
    })
  },
  parentsRegistration() {
    return get({
      url: '/uc/common/ctrl/registe?type=2',
    })
  },
  studentSave(formdata) {
    return post({
      url: '/uc/common/ctrl/registeStu',
      data: formdata
    })
  },
  studentpers(formdata) {
    return post({
      url: '/uc/sys/user/modifyUser',
      data: formdata
    })
  },
  address(code) {
    return get({
      url: 'uc/common/ctrl/findAreaByPtCode',
      params: {
        code: code,
      }
    })
  },
  teacherSave() {
    return get({
      url: '/uc/common/ctrl/registe?type=2',
    })
  },
  parentsSave(formdata) {
    return post({
      url: '/uc/common/ctrl/registeParent',
      data: formdata
    })
  },
  teacherSave(formdata) {
    return post({
      url: '/uc/common/ctrl/registe',
      data: formdata
    })
  },
  timeofenrollment() {
    return get({
      url: '/uc/common/ctrl/findStudyYear',
    })
  },
  selectclasse(code) {
    return get({
      url: '/uc/common/ctrl/findClazzByPro',
      params: code
    })
  },
  querycampus(code) {
    return get({
      url: '/uc/common/ctrl/findOfficeByPid',
      params: code
    })
  },
  queryCourse() {
    return get({
      url: '/uc/sys/subject/getAllSubject',
    })
  },
  //查看个人信息
  getselfuser() {
    return get({
      url: '/uc/sys/user/viewUser',
    })
  },
  //获取年级
  queryAllGrade(code) {
    return get({
      url: '/uc/common/ctrl/findAllGrade',
      params: code
    })
  },
  // 查询身份证
  getStuByIdcard(data){
    return get({
      url:'/uc/common/ctrl/getStuByIdcard',
      params: data
    })
  },
  set_pass(data) {
    return post({
      url: '/uc/oauth/changePassword',
      data: data
    })
  },
  //学期
  getTerm() {
    return get({
      url: '/work1/common/getAllTermId',
    })
  },
  //获取所以专业
	get_major(data){
		return get({
			url:'/uc/common/ctrl/findAllPro',
			params:data
		})
  },
  //获取学制
	get_xz(data){
		return get({
			url:'/uc/common/ctrl/findXz',
			params:data
		})
  },
  //获取层次
	get_cc(data){
		return get({
			url:'/uc/common/ctrl/findCc',
			params:data
		})
  },
  get_teacher(data){
		return get({
			url:"/uc/sys/user/findAllFdy",
		})
  },
  //获取机构
	get_organ(data){
		return get({
			url:'/uc/common/ctrl/findOffice',
			params:data
		})
  },
  getorgantree(data) {                 //获取机构树
      return get({
        url: '/uc/sys/office/findTree',
        params:data,
    })
  },
  //获取教学班
	get_classes(data){
		return get({
			url:"/uc/sys/clazz/findJxb",
			params:data
		})
  },
  //获取行政班
  get_executive(data){
		return get({
			url:"/uc/sys/clazz/findXzb",
			params:data
		})
	},

  //获取岗位
  get_posts(data){
    return get({
      url:"/uc/sys/position/findPage",
      params:data
    })
  },
  //学生信息管理
 // 获取学生list
  get_stulist(data){
    return get({
      url:"/uc/sys/user/findStudentByXzb",
      params:data
    })
  },
  set_stu(data) {
    return post({
      url: '/uc/sys/user/modifyStu',
      data: data
    })
  },
  //学生完善个人信息
  refined_infor(data) {
    return post({
      url: '/uc/sys/user/completeStuinfo',
      data: data
    })
  },
}
