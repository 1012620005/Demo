<template>
  <div class="setpassword">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >账号设置</span><span class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="authentication-box">
        <div class="steps-box">
          <el-steps :space="300" :active="active" finish-status="success">
            <el-step title="验证密码">1</el-step>
            <el-step title="新密码">2</el-step>
            <el-step title="完成">3</el-step>
          </el-steps>
        </div>
        <el-form v-show="(active==0)?true:false" :model="ruleForm"  ref="ruleForm" label-width="40px" class="demo-ruleForm">
          <el-form-item label="密码" prop="name">
            <el-input size="large" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="btn-box">
            <button type="button" class="btn-succeed margin-right " @click="next"><span>确定</span></button>
            <button type="button" class="btn-faiure "><span>取消</span></button>
          </div>
        </el-form> 
        <el-form v-show="(active==1)?true:false" :model="ruleForm"  ref="ruleForm" label-width="70px" class="demo-ruleForm demo-ruleForm1">
          <el-form-item label="新手机号" prop="name">
            <el-input size="large" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="" prop="name"  class="getcodebox">
              <el-input size="large" type="text" v-model="ruleForm.phonecode" auto-complete="off" placeholder="验证码"><div  @click="getcodebox" class="getcode" slot="append">获取验证码</div></el-input>
          </el-form-item>
          <div class="btn-box">
            <button type="button" class="btn-succeed margin-right" @click="next"><span>确定</span></button>
            <button type="button" class="btn-faiure " @click="pre" ><span>取消</span></button>
          </div>
        </el-form> 
        <div  class="demo-ruleForm" v-show="(active==2)?true:false">
          <div class="setphone-succeed">
            <img src="../../assets/image/setphone-succeed.png"/>
            <span>{{ruleForm.phone}}</span>
          </div>
          <div class="btn-box">
            <button type="button" class="btn-succeed " ><span>进入用户中心</span></button>
          </div>
        </div> 
      </div>
  </div>
</template>

<script>
import navTop from '../../components/navigation'
var flag = true;
export default {
  name: 'setpassword',
  data() {
    return {
     active: 0,
     ruleForm: {
      password: '',
      phone:"",
      phonecode:"",
      },
    }
  },
  components:{
    navTop
  },
  created(){
  },
  mounted() {
  },
  computed: {
    
  },
  methods: {
    getcodebox(event){
      if(flag){
        flag = false
        var wait=60;
        function time(o) {
          if (wait == 0) {
          flag = false
          event.target.innerHTML="获取动态码";
          wait = 60;
          } else {
            event.target.setAttribute("disabled", true);
            event.target.innerHTML="重新发送(" + wait + ")";
            wait--;
            setTimeout(function() {
            time(o)
            }, 1000)
          }
        }
        time(event)
      }
      
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    pre(){
      this.active = this.active-1
    }
    
  },
  directives:{
        
  },
  watch:{
    
  }
     
}

</script>
<style scoped>
.setpassword{
  height:100%;
}
.log-magess{
  margin:6px auto 16px;
  position: relative;
  background-color:#fff;
  height:50px;
  width:1200px;
  color:#000;
  font-size:16px;
}
.log-magess .arrow-center{
  display:inline-block;
  margin-left:38px;
  height:46px;
  border-bottom:4px solid #208af5;
  line-height:50px;
}
.log-magess .arrow-right{
    position: absolute;
    right:10px;
    top:16px;
    cursor: pointer;
}
.authentication-box{
  width:1200px;
  margin:0 auto 80px;
  padding-top:68px;
  padding-bottom:380px;
  background-color:#fff;
}
.steps-box{
  margin:0 auto;
  padding-left: 260px;
}
.demo-ruleForm{
  margin:60px auto 0;
  width:250px;
  /*font-size:14px !important;*/
  text-align:center;
}
.demo-ruleForm1{
  text-align:center;
  width:280px;
}
.btn-box{
  margin-top:52px;
}
.margin-right{
  margin-right:17px;
}
.setphone-succeed{
  display:inline-block;
  position:relative
}
.setphone-succeed span{
  display:inline-block;
  position:absolute;
  left: 88px;
  font-size: 16px;
  top: 38px;
}
.btn-succeed{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #208af5;
    border: 1px solid #208af5;
    color: #fff;
    padding: 15px 34px;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    outline: 0;
    text-align: center;
}
.btn-faiure{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #d2d2d2;
    color: #666;
    background-color:#fff;
    padding: 15px 34px;
    margin-left:17px;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    outline: 0;
    text-align: center;
}
.getcode{
  color:#fbfdff;
}
.getcodebox .el-form-item__content  .el-input-group__append{
  background-color:#20a0ff !important;
}
.getcode>span{
  width: 100px;
  position: absolute;
  background-color: #20a0ff;
  height: 40px;
  left: -10px;
  top: -9px;
  line-height: 40px;
  cursor: pointer;
  font-size: 14px;
}
</style>
<style>
.steps-box .el-step__head.is-text.is-success {
    color: #fff;
    background-color: #208af5;
    border-color: #208af5;
}
.steps-box .el-step__title.is-success {
    font-weight: 700;
    color: #333;
}
.authentication-box input{
  font-size: 14px;
}
</style>