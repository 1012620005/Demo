import * as types from '../types';
import Vue from 'vue'
// import userApi from '../../apis/userCenter.js'
const state = {
    menuList:null,
    name: ''
};
const getters = {
    meunListFuc:function(state) {
    	return state.menuList
    },
    nameGetter:function (state) {
        return state.name
    }
};
const actions = {
    getMeunList({commit,state}, data){
    	commit('GETMENULIST',data)
    },
    getname({commit,state},data){
        commit('GETMENULIST',data)
        // userApi.getCurrentUser().then(res =>{
        //     let data = res.data.data
        //     commit('GETNAME',data.name)
        // })
        
    }
};
const mutations = {
    [types.getMenuList](state, data){
        state.meunList = data
    },
    [types.getName](state,data){
        state.name = data
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
