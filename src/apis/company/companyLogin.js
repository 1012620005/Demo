import get from '../../utils/get'
import post from '../../utils/post'
import apiUrl from '../../utils/config'
import { getToken } from '../../utils/auth'
import alias from './alias'
var apiAlias = alias.ALIAS
const fileurl = apiUrl.BASE_URL;
export default {
	// 公司注册的接口
	loginCompany (data) {
		return post({
			url: apiAlias + '/common/company/addCompany',
			data: data
		})
	},
	getFileUploadUrl() {  //上传路径
		let url = fileurl + "/fs/common/file/upload" + "?ticket=" + this.getFileticket();
		// console.log(url);
		return url; 
	},
	getFileticket() { //文件票据凭证
		var obj = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据
		obj.open('GET', fileurl + '/fs/common/ticket/get', false);
		// obj.onreadystatechange = function() { 
		//     if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState == 4说明请求已完成
		//       console.log("--------");
		//       console.log(obj.responseText);
		//       console.log("========");
		//     }
		// };
		obj.setRequestHeader("access_token", getToken());  
		obj.send();
		let data = JSON.parse(obj.response);
		return data.data;
	}	
}