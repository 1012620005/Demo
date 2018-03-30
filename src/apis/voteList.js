import get from '../utils/get'
import post from '../utils/post'
import alias from './company/alias'
var apiAlias = alias.ALIAS
export default{
	// 获取投票的列表页
	getVoteList (data) {
		return post({
			url: apiAlias + '/vote/list',
			data:data
		})
	},
	// 添加投票
	addVote (data) {
		return post({
			url: apiAlias + '/vote/add',
			data: data
		})
	},
	// 发布投票
	publishVote (data) {
		return post({
			url:apiAlias + '/vote/publish',
			data:data
		})
	},
	// 查看和编辑调取信息
	getSingleMsg (data) {
		return post({
			url: apiAlias + '/vote/info',
			data:data
		})
	},
	// 统计信息
	getResult (data) {
		return post({
			url: apiAlias + '/vote/detail',
			data:data
		})
	},
	delVote (data) {
		return get({
			url: apiAlias +'/vote/delete',
			params:data
		})
	},
	editorVote (data) {
		return post({
			url: apiAlias +'/vote/update',
			data:data
		})
	},
	// 我的投票中点击编辑
	editorMyVoted (data) {
		return post({
			url: apiAlias + '/vote/info',

			data: data
		})
	},
	editorVoteRaios (data) {
		return post({
			url: apiAlias + '/vote/submit',
			data: data
		})
	},
	// 获取当前用户的投票
	getUserVoteList (data) {
		return post({
			url: apiAlias + '/vote/uservotelist',
			data:data
		})
	},
	// 获取校区
	getCampusList() {
		return get({
			url:apiAlias +'/wf/campus'
		})
	}
}