
<template>
<div class="navigation">
	<div   class="el-menu-demo" >
    <div style="position: absolute;  left: 30px; top: 20px;" @click="tog_falg">
      <svg :class="falg ? 'hamburger' : 'active'"  t="1492500959545" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" class="wscn-icon hamburger"><path xmlns="http://www.w3.org/2000/svg" d="M950.857143 768l0 73.142857q0 14.857143-10.857143 25.714286t-25.714286 10.857143l-804.571429 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286l0-73.142857q0-14.857143 10.857143-25.714286t25.714286-10.857143l804.571429 0q14.857143 0 25.714286 10.857143t10.857143 25.714286zm0-292.571429l0 73.142857q0 14.857143-10.857143 25.714286t-25.714286 10.857143l-804.571429 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286l0-73.142857q0-14.857143 10.857143-25.714286t25.714286-10.857143l804.571429 0q14.857143 0 25.714286 10.857143t10.857143 25.714286zm0-292.571429l0 73.142857q0 14.857143-10.857143 25.714286t-25.714286 10.857143l-804.571429 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286l0-73.142857q0-14.857143 10.857143-25.714286t25.714286-10.857143l804.571429 0q14.857143 0 25.714286 10.857143t10.857143 25.714286z" p-id="1442" fill="#e6e6e6"/></svg>
    </div>
    <div style="position: absolute;  left: 30px; top: 80px;z-index:20000" >
      <el-collapse-transition>
        <div v-show="falg" style="width: 220px;text-align:left;" >
          <el-menu
            default-active="2"
            unique-opened
            class="el-menu-vertical-demo"
            background-color="#3b4966"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu :index="item.id" v-for="item in list" :key="item.id" >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{item.name}}</span>
              </template>
              <el-submenu :index="items.id" v-for="items in item.menuList" v-if="items.children.length !== 0" :key="items.id">
                <template slot="title">{{items.name}}</template>
                <el-menu-item  :index="i.id" v-for="i in items.children" :key="i.id" > 
                  <router-link style="color: inherit;" :to="{ path: i.href }">{{i.name}}</router-link>
                </el-menu-item>
              </el-submenu>

              <el-menu-item :index="items.id" v-for="items in item.menuList" v-if="items.children.length == 0" :key="items.id">
                <router-link style="color: inherit;" :to="{ path: items.href }">{{items.name}}</router-link>
              </el-menu-item>
            </el-submenu>
            
          </el-menu>
        </div>
      </el-collapse-transition>
    </div>
    <div class="navlogo">
      <span class="logo"  @click="back"><img style="cursor: pointer;" src='../../assets/img/connet/logo.png'/></span><span class="logouesr">智慧校园</span>
      <div style="float: right;">
        <el-dropdown  >
          <div class="el-dropdown-link" style="font-size: 14px;color: #c0c4cc;cursor: pointer;">
            {{ $store.getters.nameGetter ? $store.getters.nameGetter + '，Welcome' : user.name  + '，Welcome'}}
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled ><div  style="margin:0 10px;"><i class="el-icon-edit"></i><span style="margin-left:10px;">个人中心</span></div></el-dropdown-item>
            <el-dropdown-item  divided ><div @click="getlogout" style="margin:0 10px;"><i class="el-icon-back"></i><span style="margin-left:10px;" >退出登录</span></div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
	</div>
</div>
</template>
<script>
import api from '../../apis/login.js'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'navigation',
  data () {
    return {
      user:{
        name:"",
      },
      falg:false,
      list:[]
    }
  },
  mounted () {
    api.getrole().then(r=>{
      this.list = r.data.data.roleList
    })
    this.$nextTick(function () {
      let _this = this;
        let interval = setInterval(function(){
          if(_this.$Cookies.get('username') !== ''){
            _this.user.name = _this.$Cookies.get('username');
            clearInterval(interval);
          }
        }, 300);
    })
  },
  methods: {
    back(){
      this.$router.push('/newIndex')
    },
    getlogout(){
      this.$confirm('你确定退出吗？').then(() =>{
        api.logout().then(response =>{
            this.$message({
              showClose: true,
              message: "退出成功",
              type: 'success',
              duration:'1500' 
            });
            this.$Cookies.remove('sessionid');
            this.$Cookies.remove('username');
            this.$Cookies.remove('userLogin');
            this.$Cookies.remove('userId');
            window.localStorage.clear()
            window.sessionStorage.clear()
            let _this = this
            setTimeout(function(){
              _this.$router.push('/')
            },1000)
        })
      }).catch(()=>{

      })
    },
    tog_falg(){
      this.falg = !this.falg
    },
  },

}
</script>
<style scoped>
.el-menu{
  background-color:#3b4966;
}
.navlogo{
  margin:0 auto;
  height:70px;
  width:1200px;
  text-align:left;
  line-height:70px;
  color:#fff;
  font-size:16px;
}
 .logouesr{
    margin-left:5px;
    display: inline-block;
    height: 60px;
    font-size: 20px;
    font-weight: bold;;
 }  
.logout{
  float:right;
  margin-left:20px;
  cursor: pointer;
  color:#fff;
}
.logout img{
  margin-right:5px;
}
.navlogo img{
  vertical-align: middle;
}
.logo{
  float:left;
}
.logo>img{
  margin-right:6px;
}
.el-menu-demo{
  background-color: #3b4966;
  position: relative;
}
.hamburger{
    cursor: pointer;
    transform: rotate(90deg);
    transition: .38s;
    transform-origin: 50% 50%;
}
.active{
    cursor: pointer;
    transform: rotate(0deg);
    transition: .38s;
    transform-origin: 50% 50%;
}
</style>
