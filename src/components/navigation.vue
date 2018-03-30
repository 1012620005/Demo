<template>
  <div class="navigation">
    <el-menu   class="el-menu-demo" mode="horizontal">
      <div class="navlogo">
        <span class="logo"><img src='../assets/image/logo.png'/></span><span class="logouesr">智慧校园</span>
        <span  @click="getlogout" class="logout"><img src='../assets/image/logout.png'/>退出</span>
        <div style="float: right;">
          <slot></slot>
          <span style="margin-left:20px;">{{user.name+"，Welcome"}}</span>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import api from '../apis/login.js'
export default {
  name: 'navigation',
  data () {
    return {
      user:{
        name:"",
      }
    }
  },
  mounted () {
    let _this = this
    setTimeout(function(){
     _this.user.name = _this.$Cookies.get('username');
    },1000)
  },
  methods: {
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
            let _this = this
            setTimeout(function(){
              _this.$router.push('/')
            },1000)
        })
      }).catch(()=>{

      })
    }    
 }

}
</script>
<style scoped>
.el-menu{
  background-color:#208af5;
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
 margin-top: 8px;
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
</style>
