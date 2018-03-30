import * as types from '../types';
// import { _APIDIR } from '../../api/api'
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$ajax = axios
const state = {
    permissionList: {},
    meunList: {},
    sectionid: null,//课表id
    newschedule:{},
    menuList:null,
};


const getters = {
    permissionList: state => state.permissionList,
    meunList: state => state.meunList
};


const actions = {
    getPermissionList({commit, state}, data){
        Vue.prototype.$ajax({
            method: 'post',
            url: `${_APIDIR}api/userAuth/page`,
            data: data
        }).then(function(response){
            if (response.data.code == '200'){
                let permission = response.data.data
                commit(types.getPermissionList, permission);
                //sessionStorage.setItem('permission', JSON.stringify(response.data.data))
                //_this.$router.push({ name: 'homePage' })
            }
        }).catch(function(error){
            console.log(error)
        })
    },
    getMeunList({commit, state}, data){

    },
    incrementWithValue({commit}, value){
        commit("GET_SECTION_ID", value)
    },
    getnewschedule({commit}, value){
        commit("GET_SCHEDULE_ALL", value)
    },
    getmenuListall({commit}, value){
        console.log(value)
        commit("GET_MENU_LIST", value)
    },
};


const mutations = {
    [types.getPermissionList](state, data){
        state.permissionList = data
        console.log("___________", state.permissionList[0])
    },
    [types.getMenuList](state, data){
        state.meunList = data
    },
    GET_SECTION_ID(state, value){
       state.sectionid = value;
    },
    GET_SCHEDULE_ALL(state, value){
       state.newschedule = value;
    },
    GET_MENU_LIST(state, value){
       state.menuList = value;
    },
}


export default {
    state,
    getters,
    actions,
    mutations
}

