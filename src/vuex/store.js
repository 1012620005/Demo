import Vue from 'vue'
import Vuex from 'vuex'
import company from './modules/company.js'
import permission from './modules/permission.js'
import applyList from './modules/applyList.js'

Vue.use(Vuex)

// 创建 store 实例
export default new Vuex.Store({
	modules:{
       company,
	   permission,
	   applyList
	}
})