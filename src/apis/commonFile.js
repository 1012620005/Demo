import get from '../utils/get'
import post from '../utils/post'
import apiUrl from '../utils/config'
import { getToken } from './../utils/auth'
//用户中心api接口
const fileurl = apiUrl.BASE_URL;
export default {
  //获取用户附件信息
  findFileByEntityAndBid(data) {
    return get({
      url: fileurl + '/fs/common/file/findFileByEntityAndBid',
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
  getFileticket(data) { //文件票据凭证
    return get({
      url: fileurl + '/fs/ticket/get',
      params: data
		})
  },
  getFileticketOnce(data) { //文件票据凭证
    return get({
      url: fileurl + '/fs/common/ticket/get',
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
  getUrl(fileid) {  //下载路径
    return this.getFileticket().then(r=>{
      return "&ticket=" + r.data.data;
    })
  },
  getCommonDownloadUrl(fileid) {  //下载路径
    return fileurl + "/fs/common/download" + "?fileid=" + fileid; 
  },
  getCommonUploadUrl() {  //上传路径
    return this.getFileticketOnce().then(r=>{ return fileurl + "/fs/common/file/upload" + "?ticket=" + r.data.data;});
  },
  getDownloadOnceUrl(fileid) {  //下载路径
    return this.getFileticketOnce().then(r=>{ return fileurl + "/fs/common/file/download" + "?ticket=" + r.data.data + "&fileid=" + fileid; });
  },
  getCommonShowUrl(filename) {  //直接查看路径
    return fileurl + "/fs/common/" + filename; 
  },
  getImportZjUrl(data) {
    return fileurl + "/uc/common/ctrl/importZj";
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
  
}
