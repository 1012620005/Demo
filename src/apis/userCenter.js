import get from '../utils/get'
import post from '../utils/post' 
import { Message } from 'element-ui'
import apiUrl from '../utils/config'
import { getToken } from './../utils/auth'
//用户中心api接口
const fileurl = apiUrl.BASE_URL;
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
    //修改个人信息
  modifyUser(data) {
      return post({
        url: '/uc/sys/user/modifyUser',
        data:data
    })
  },
  //获取当前登录用户信息
  getCurrentUser(data) {
      return get({
        url: '/uc/sys/user/getCurrentUser',
        data: data
    })
  },
  //获取所有角色
  findAllRole(data) {
      return get({
        url: '/uc/sys/role/findByOffice',
        data: data
    })
  },
  //获取所有角色
  findAllCommonRole(data) {
      return get({
        url: '/uc/common/ctrl/findAllRole',
        data: data
    })
  },
  
  //查看当前用户
  viewUser(data) {
    return get({
      url: '/uc/sys/user/viewUser',
      params: data
    })
  },
  //查看当前用户
  getOffice(data) {
    return get({
      url: '/uc/sys/office/get',
      params: data
    })
  },
  //查找学院
  findOffice(data) {
    return get({
      url: '/uc/common/ctrl/findOfficeByPid',
      params: data
    })
  },
  //查找分校和学校
  findFx(data) {
    return get({
      url: '/uc/sys/office/findFx',
      params: data
    })
  },
  //查找学院
  findClazz(data) {
    return get({
      url: '/uc/sys/clazz/findClazzByPro',
      params: data
    })
  },
  //辅导员查找学生
  findStudentByFdy(data) {
    return get({
      url: '/uc/sys/user/findStudentByFdy',
      params: data
    })
  },
  //导出学生
  exportStu(data){
    return get({
      url : '/uc/sys/user/exportStu',
      params: data
    })
  },
  //导出教师
  exportTea(data){
    return get({
      url : '/uc/sys/user/exportTea',
      params: data
    })
  },
  //下载导出列表
  getExportUrl(filename){
    return apiUrl.BASE_URL + '/uc/common/' + filename;
  },
  //启用停用操作
  enableOption(data) {
    return post({
      url: '/uc/sys/user/enableOption',
      data: data
    })
  },
   //删除恢复操作
  deleteOption(data) {
    return post({
      url: '/uc/sys/user/deleteOption',
      data: data
    })
  },
  //根据当前登录人员查询其所教授的班级和专业
  findProByFdy(data) {
    return get({
      url: '/uc/sys/clazz/findProByFdy',
      params: data
    })
  },
  //根据当前登录人员查询其所教授的班级和机构
  loadOrgByTea(data) {
    return get({
      url: '/uc/sys/clazz/loadOrgByTea',
      params: data
    })
  },
  //查询学年
  findStudyYear(data) {
    return get({
      url: '/uc/common/ctrl/findStudyYear',
      params: data
    });
  },
  //查询所有的辅导员
  findAllFdy(data) {
    return get({
      url: '/uc/sys/user/findAllFdy',
      params: data
    });
  },
  //添加学生
  addStu(data) {
    return post({
      url: '/uc/sys/user/addStu',
      data: data
    });
  },
  //添加教师
  addTea(data) {
    return post({
      url: '/uc/sys/user/addTea',
      data: data
    });
  },
  //保存分校
  saveFx(data) {
    return post({
      url: '/uc/sys/office/saveFx',
      data: data
    });
  },
  //删除机构
  delOffice(data) {
    return post({
      url: '/uc/sys/office/delete',
      data: data
    });
  },
  //查询区域
  getNameByCode(data) {
    return get({
      url: '/uc/common/ctrl/getNameByCode',
      params: data
    });
  },
  //教师管理
  findTeacher(data) {
    return get({
      url: '/uc/sys/user/findTeacher',
      params: data
    })
  },
  //查询机构
  findOffice(data) {
    return get({
      url: '/uc/common/ctrl/findOfficeByPid',
      params: data
    })
  },
  //根据id获取角色
  getRole(data) {
    return get({
      url: '/uc/sys/role/get',
      params: data
    })
  },
  //获取消息明细
  getMsg(data) {
    return get({
      url: '/uc/sys/msg/getMsg',
      params: data
    })
  },
  //删除消息
  deleteMsg(data) {
    return post({
      url: '/uc/sys/msg/delete',
      data: data
    })
  },
  findMyMsg(data) { //查询个人发布的通知
    return get({
      url: '/uc/sys/msg/findMyMsg',
      params: data
    })
  },
  findMsg(data) { //首页通知
    return get({
      url: '/uc/sys/msg/findMsg',
      params: data
    })
  },
  // 添加和编辑班级通知
	addClassNote (data) {
		return post({
			url:'/uc/sys/msg/save',
			data: data
		})
	},
  // 根据日期查询校历
	findXlByDate (data) {
		return get({
			url:'/uc/sys/xl/findByDate',
			params: data
		})
	},
  // 查询今日校历
	findMyTody (data) {
		return get({
			url:'/uc/sys/xl/findMyTody',
			params: data
		})
	},
  // 获取个人校历
	getMyXl (data) {
		return get({
			url:'/uc/sys/xl/getMyXl',
			params: data
		})
	},
  // 分页查询校历
	findXl (data) {
		return get({
			url:'/uc/sys/xl/findXl',
			params: data
		})
	},
  // 保存校历
	saveXl (data) {
		return post({
			url:'/uc/sys/xl/save',
			data: data
		})
	},
  // 删除校历
	deleteXl (data) {
		return post({
			url:'/uc/sys/xl/delete',
			data: data
		})
	},
  // id获取校历
	getXl (data) {
		return get({
			url:'/uc/sys/xl/get',
			params: data
		})
	},
  // id获取校历
	findXlExist (data) {
		return get({
			url:'/uc/sys/xl/findExist',
			params: data
		})
  },
  // 保存校历
	saveXl (data) {
		return post({
			url:'/uc/sys/xl/save',
			data: data
		})
	},
  // 保存校历
	download (fileid, token) {
		return fileurl + "/uc/sys/download?fileid="+fileid + "&access_token=" + token;
  },
   // 保存校历
	download1 (fileid, token) {
    let data = {fileid:fileid, access_token:token}
    return get({
			url:'/uc/sys/download',
			params: data
		})
		// return fileurl + "/uc/sys/download?fileid="+fileid + "&access_token=" + token;
  },
  //保存修改年级
  saveGrade(data) {
    return post({
			url:'/uc/sys/grade/save',
			data: data
		})
  },
  //保存修改年级
  deleleteGrade(data) {
    return post({
			url:'/uc/sys/grade/delete',
			data: data
		})
  },
  //分页查询年级
  findGrade(data) {
    return get({
			url:'/uc/sys/grade/findGrade',
			params: data
		})
  },
  //查询所有年份
  findAllYear(data) {
    return get({
			url:'/uc/common/ctrl/findAllYear',
			params: data
		})
  },
  //查询所有年份
  findAllXq(data) {
    return get({
			url:'/uc/common/ctrl/findAllXq',
			params: data
		})
  },
  //根据id获取年级
  getGrade(data) {
    return get({
			url:'/uc/sys/grade/get',
			params: data
		})
  },
  //查询所有年级
  findAllGrade() {
    return get({
			url:'/uc/common/ctrl/findAllGrade',
		})
  },
  //查询所有班级
  findClazz(data) {
    return get({
      url:'/uc/sys/clazz/findClazz',
      params: data
		})
  },
  //查询所有班级
  saveClazz(data) {
    return post({
      url:'/uc/sys/clazz/save',
      data: data
		})
  },
  //删除班级
  deletClazz(data) {
    return post({
      url:'/uc/sys/clazz/deleteClazz',
      data: data
		})
  },
  //根据id查询班级
  getClazz(data) {
    return get({
      url:'/uc/sys/clazz/get',
      params: data
		})
  },
  //根据年级和专业查询班级
  findClazzByPro(data) {
    return get({
      url:'/uc/common/ctrl/findClazzByPro',
      params: data
		})
  },
  //获取所有学科
  findAllCourse(data) {
    return get({
      url:'/uc/common/ctrl/getAllSubject',
      params: data
		})
  },

  //根据学科获取版本
  findVersionBySubject(data) {
    return get({
      url:'/uc/sys/jc/findVersionBySubject',
      params: data
		})
  },
   //版本获取侧别
  findCbByVersion(data) {
    return get({
      url:'/uc/sys/jc/findCbByVersion',
      params: data
		})
  },
   //根据教材获取章节
   findZjByJc(data) {
    return get({
      url:'/uc/sys/jc/findZjByJc',
      params: data
		})
  },
  //保存教材
  saveJc(data) {
    return post({
      url:'/uc/sys/jc/save',
      data: data
		})
  },
  //删除教材
  deleteJc(data) {
    return post({
      url:'/uc/sys/jc/delete',
      data: data
		})
  },
  //分页查询教材
  findJc(data) {
    return get({
      url:'/uc/sys/jc/findJc',
      params: data
		})
  },
  //根据教材id获取教材
  getJc(data) {
    return get({
      url:'/uc/sys/jc/get',
      params: data
		})
  },
  
  
  findPublicPage(data) { //查找资源
    return get({
      url:'/uc/sys/resource/findPublicPage',
      params: data
		})
  },
  findMyPage(data) { //查找资源
    return get({
      url:'/uc/sys/resource/findMyPage',
      params: data
		})
  },
  saveResource(data) {  //创建资源
    return post({
      url:'/uc/sys/resource/save',
      data: data
		})
  },
  findResourceType() {  //创建资源
    return get({
      url:'/uc/sys/resource/findAllType'
		})
  },
  getResource(data) {  //根据id获取资源信息
    return get({
      url:'/uc/sys/resource/get',
      params: data
		})
  },
  deleteResource(data) {  //删除资源
    return post({
      url:'/uc/sys/resource/delete',
      data: data
		})
  },
  publicResource(data) {  //公开取消公开资源
    return post({
      url:'/uc/sys/resource/publicResource',
      data: data
		})
  },
  //获取用户附件信息
  findFileByEntityAndBid(data) {
    return get({
      url: fileurl + '/fs/file/findFileByEntityAndBid',
      params: data
		})
  },
  //删除附件
  deleteFile(data) {
    return post({
      url: fileurl + '/fs/file/deleteFile',
      data: data
		})
  },
  getDownloadRecourceUrl(filename) { 
    return fileurl + "/uc/common/download/resource?filename=" + filename;
  },
  getFileticket(data) { //文件票据凭证
    return get({
      url: fileurl + '/fs/ticket/get',
      params: data
		})
  },
  getFileUploadUrl() {  //上传路径
    return this.getFileticket().then(r=>{
      return fileurl + "/fs/file/upload" + "?ticket=" + r.data.data;
    })
  },
  getFileDownloadUrl(fileid) {  //下载路径
    return this.getFileticket().then(r=>{
      return fileurl + "/fs/file/download" + "?fileid=" + fileid + "&ticket=" + r.data.data;
    })
  },
  getCommonDownloadUrl(fileid) {  //下载路径
    return fileurl + "/fs/common/download" + "?fileid=" + fileid; 
  },
  getCommonShowUrl(filename) {  //直接查看路径
    return fileurl + "/fs/common/" + filename; 
  },
  getImportZjUrl(data) {
    return apiUrl.BASE_URL + "/uc/common/ctrl/importZj";
  },
  getDownStuTemplate(data) {
    return apiUrl.BASE_URL + "/uc/common/学生导入模板.xlsx";
  },
  getDownTeaTemplate(data) {
    return apiUrl.BASE_URL + "/uc/common/教师导入模板.xlsx";
  },
  getDownZjUrl(data) {
    return apiUrl.BASE_URL + "/uc/common/章节模板.xlsx";
  },
  arr2Str(arr, key) {
    let r = '';
    if (arr && arr.length > 0) {
      for (let i = 0; i < arr.length; i ++) {
        if (r == '') {
          r = arr[i][key];
        } else {
          r = r + "," + arr[i][key];
        }
      }
    }
    return r;
  },
  obj2arr(arr, key) {
    let r = [];
    if (arr && arr.length > 0) {
      for (let i = 0; i < arr.length; i ++) {
        r.push(arr[i][key]);
      }
    }
    return r;
  },
  showMsg(meta) {	//提示
    console.log(meta)
    if (meta.status == 'fail') {
      // this.$message.error(meta.message);
      Message({
        message: meta.message,
        type: 'error',
        duration: 1500
      });
    } else {
      Message({
        message: meta.message,
        type: 'success',
        duration: 1500
      });
    }
  },
  showTip(msg, type) {	//提示
    if (type == '2') {
      Message({
        message: msg,
        type: 'error',
        duration: 1500
      });
    } else if (type == '1') {
      Message({
        message: msg,
        type: 'success',
        duration: 1500
      });
    } else {
      Message({
        message: msg,
        duration: 1500
      });
    }
  },
  // 获取通讯录
  getBook (data) {
    return get({
      url: '/uc/sys/abook/getStuAbook',
      params:data
    })
  },

  findOrgTree(data) { //获取机构数
    return get({
      url:'/uc/sys/office/findTree',
      params: data
		})
  },
  findXzb(data) { //分页查询行政班
    return get({
      url:'/uc/sys/clazz/findXzb',
      params: data
		})
  },
  findXzb(data) { //分页查询教学班
    return get({
      url:'/uc/sys/clazz/findJxb',
      params: data
		})
  },
  findPosition(data) { //分页查询教学班
    return get({
      url:'/uc/sys/position/findPage',
      params: data
		})
  },
  findCommonXzb(data) { //分页查询行政班
    return get({
      url:'/uc/common/clazz/findXzb',
      params: data
		})
  },
  findCommonXzb(data) { //分页查询教学班
    return get({
      url:'/uc/common/clazz/findJxb',
      params: data
		})
  },
  findCommonPosition(data) { //分页查询教学班
    return get({
      url:'/uc/common/position/findPage',
      params: data
		})
  },
}
