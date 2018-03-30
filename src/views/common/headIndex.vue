
<template>
<div class="navigation">
	<el-menu   class="el-menu-demo" mode="horizontal">
	<div class="navlogo">
		<span class="logo"  @click="back"><img style="cursor: pointer;" src='../../assets/img/connet/logo.png'/></span><span class="logouesr">智慧校园</span>
		<div style="float: right;">
			<slot></slot>
      <el-dropdown  >
        <div class="el-dropdown-link" style="font-size: 14px;color: #c0c4cc;cursor: pointer;">
          {{ $store.getters.nameGetter ? $store.getters.nameGetter + '，Welcome' : user.name  + '，Welcome'}}
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled ><div  style="margin:0 10px;"><i class="el-icon-edit"></i><span style="margin-left:10px;">个人中心</span></div></el-dropdown-item>
          <el-dropdown-item divided  ><div @click="changepass" style="margin:0 10px;"><i class="el-icon-setting"></i><span style="margin-left:10px;">修改密码</span></div></el-dropdown-item>
          <el-dropdown-item  divided ><div @click="getlogout" style="margin:0 10px;"><i class="el-icon-back"></i><span style="margin-left:10px;" >退出登录</span></div></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
		</div>
	</div>
	</el-menu>
  <el-dialog
    title="修改密码"
    :visible.sync="dialogVisible"
    width="30%">
    <div style="max-width:400px">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原始密码" prop="old">
          <el-input type="password" v-model="ruleForm2.old" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass" required>
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" required>
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="checkPassword('ruleForm2')">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import api from '../../apis/login.js'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'navigation',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogVisible:false,
      user:{
        name:"",
      },
      ruleForm2: {
        pass: '',
        checkPass: '',
        old: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        old: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$store.dispatch('getname')
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
  // directives: {
  //   command:{
  //     update: function(el, binding, vnode) {
  //       console.log(el)
  //       console.log(binding)
  //       console.log(vnode)
  //     },
  //   }
      
  // },
  methods: {
    checkPassword(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formdata = new FormData();
          formdata.append("password", this.ruleForm2.old);
          formdata.append("newPassword1", this.ruleForm2.pass);
          formdata.append("newPassword2", this.ruleForm2.checkPass);
          api.checkpass(formdata).then(r=>{
            if(r){
              this.dialogVisible = false;
              this.$message({
                message: r.data.meta.message,
                type: 'success',
                duration:'800' 
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    changepass(){
      this.dialogVisible = true;
      if(this.$refs.ruleForm2 !== undefined){
        this.$refs.ruleForm2.resetFields()
      }
    },
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
    }    
  },
  // computed: {
  //   getUserIcons() {
  //     return this.$store.getters.nameGetter;
  //   }
  // },
  // watch: {
  //   getUserIcons(val) {
  //     this.user.name = val;
  //   }
  // }

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
</style>
