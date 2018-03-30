import { Message } from 'element-ui'
export default{
	// 返回数据的接口处理
	responseCallback (response) {
		 if(response) {
			if(response.data.meta.code) {
				var code = response.data.meta.code;
				if(code == '200') {
					return response.data.data
			    }else {
				    var msg = response.data.meta.message
					Message({ 
					 	message: msg,
					 	type: 'error'
					});
					return null
			    }
			}		 	
		 } else {
		 	Message({
		 		type:'error',
		 		message:'服务器错误请刷新页面重试'
		 	})
		 }
		
	},
	// 不返回数据的接口处理
	responseNull (response){
		if(response) {
			if(response.data.meta.code) {
				var code = response.data.meta.code;
				if(code == '200') {
					return code
				}else{
					var msg = response.data.meta.message
			 		Message({ 
			 			message: msg,
			 			type: 'error'
			 		});
			 		return null
				}
			}			
		} else {
			Message({
		 		type:'error',
		 		message:'服务器错误请刷新页面重试'
		 	})			
		}

	}
}