import Vue from 'vue'
import * as types from '../types';
const state = {
    companyInfo: null
};
const getters = {
    companyInfoFuc:function(state) {
    	return state.companyInfo
    }
};
const actions = {
    getcompanyInfo({commit,state}, data){
    	commit('GETCOMPANYINFO',data)
    }
};
const mutations = {
    [types.getCompanyInfo](state, data){
        state.companyInfo = data
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}