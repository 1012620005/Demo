import get from '../utils/get'
import post from '../utils/post'
import alias from './company/alias'
var apiAlias = alias.ALIAS
export default {
	// 保存工作流
	saveWorkFlow (data) {
		return post({
			url: apiAlias + '/wf/add',
			data:data
		})
	},
	// 角色列表页
	getRoleList() {
		return get({
			url: apiAlias + '/wf/rolelist'
		})
	},
	// 删除工作流
	delWorkFlow (data) {
		return get({
			url: apiAlias + '/wf/del',
			params:data
		})
	},
	// 编辑工作流
    editorWorkFlow (data) {
    	return get({
    		url: apiAlias + '/wf/info',
    		params:data
    	})
    },
    // 发起设计工作流的列表页
    getWorkList (data) {
    	return post({
    		url: apiAlias + '/wf/listbycon',
    		data:data
    	})
    },
    // 启用和停用
    openOrNo (data) {
    	return get({
    		url: apiAlias + '/wf/open',
    		params: data
    	})
    },
    // 校区的列表页
    getCampus () {
    	return get({
    		url: apiAlias + '/wf/campus'
    	})
    },
    // 审核工作流设计的列表页
    getAuditList (data) {
    	return get({
    		url: apiAlias + '/wf/list',
    		params: data
    	})
    },
    // 审核工作流通过和不通过
    passOrNoWorkFlow (data) {
    	return get ({
    		url: apiAlias + '/wf/check',
    		params: data
    	})
    }
}