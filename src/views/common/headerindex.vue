<template>
  <div class="navigation">
    <el-menu   class="el-menu-demo" mode="horizontal">
      <div class="navlogo">
        <span class="logo"><img src='../../assets/image/logo.png'/></span><span class="logouesr">智慧校园</span>
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
    </el-menu>
  </div>
</template>

<script>
import api from '../../apis/login.js'
export default {
  name: 'navigation',
  data () {
    return {
     
    }
  },
  methods: {
    getlogout(){
		this.$confirm('你确定退出吗？').then(() =>{
			api.logout().then(response =>{
				if(data) {
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
				}
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
    font-size:18px;
 }  
.logout{
  float:right;
  margin-left:96px;
  cursor: pointer;
  color:#bcd5fb;
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
