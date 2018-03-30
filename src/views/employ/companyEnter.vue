<template>
  <div class="login">
      <img class="logon-background-img" src="../../assets/image/background-img.png"/>
      <el-row class="logon-main">
          <el-row class="clear">
            <el-col :span="4" ><img src="../../assets/image/logos.png"/></el-col>
            <el-col :span="5"   class="right ">
              <div class="dimension-codebox"><img v-btn class="dimension-code" src="../../assets/image/weixin-dimension-code.png"/>
              <img class="dimension-code-qr" src="../../assets/image/QR-code.png"/>
              </div>
              <div class="dimension-codebox"><img v-btn  class="dimension-code" src="../../assets/image/app-dimension-code.png"/>
              <img class="dimension-code-qr" src="../../assets/image/QR-code.png"/>
              </div>
            </el-col>
          </el-row>
          <el-row class="logon-main-logon">
              <el-col  class="left logon-main-logon-left">        
                 <!--swiper-->
                 <!--swiper-->
                 <div style="height: 260px;margin-bottom: 20px;padding: 22px; border: 1px solid #439cf7;    background-color: #1b83ec;">
                    <!-- <img   src="../../assets/image/synopsis-img.png"/> -->
                  <el-scrollbar tag="ul"  wrap-class="el-select-dropdown__wraps" view-class="el-select-dropdown__list">
                    <p style="text-indent:28px;text-align:justify; color:#fff">
                       北京汇众融成教育科技股份有限公司，北京市高新技术企业、北京市中小企业公共服务平台、软件企业，通过国家质量体系认证。公司自2001年创立伊始，即专注于教育信息化解决方案与教育软件的研发、教育行业的资讯传播与资源整合、教育信息化产品营销渠道的深度经营。目前，“融技”品牌的用户已遍布全国各地。</p>
                     <p style="text-indent:28px;text-align:justify; color:#fff">作为国内领先的教育信息化专业服务商，融成科技自主研发的“职业教育信息化管理平台”、“精工职教网现代职业教育远程培训平台”、“全国中等职业学校毕业生就业信息服务与管理平台”，以及独立整合“中国职业教育与成人教育机构基本信息与发展概况数据库”、“教育信息化政府采购参考目录”等项目的研发与拓展，均取得了令人瞩目的成绩，不仅为国家教育管机构的宏观决策提供了完善的信息数据源，更为职业教育行业的整理发展提供了多元化的产品和渠道。目前已有若干产品获得著作权证书。 近年来，随着国家对教育信息化建设重视程度的日益加深，融成科技凭借雄厚的软件研发实力以及十余年的经验与资源积累，倾力研发了多款智慧教育领域的平台软件产品，并协助国家中等职业教育改革发展示范校建设项目完成数字化校园平台建设与专业内涵建设工作。公司客户遍布全国各级各类职业院校，均获好评。
                    </p>
                   </el-scrollbar>
                 </div>
                 <div class="logon-main-logon-left-swiper">
                    <el-carousel height="200px">
                      <el-carousel-item >
                        <img   src="../../assets/image/str_1.png"/>
                        <img   src="../../assets/image/str_2.png"/>
                      </el-carousel-item>
                      <!-- <el-carousel-item>
                        <img   src="../../assets/image/s_3.png"/>
                        <img   src="../../assets/image/s_4.png"/>
                      </el-carousel-item> -->
                    </el-carousel>
                    <!-- <el-carousel height="200px" type="card">
                      <el-carousel-item >
                        <img   src="../../assets/image/swp1.jpg"/>
                      </el-carousel-item>
                      <el-carousel-item>
                        <img   src="../../assets/image/swp2.jpg"/>
                      </el-carousel-item>
                      <el-carousel-item >
                        <img   src="../../assets/image/swp3.jpg"/>
                      </el-carousel-item>
                      <el-carousel-item >
                        <img   src="../../assets/image/swp4.jpg"/>
                      </el-carousel-item>
                    </el-carousel> -->
                  </div>
              </el-col>
              <el-col class="right logon-main-logon-right">
                <p><img v-if="isLogin" src= "../../assets/img/employ/login.png"/><img v-if="!isLogin" src= "../../assets/img/employ/fund.png"/></p>
                <div class="logon-main-logon-right-input">
                  <ul>
                    <li class="clear" v-show="isLogin">
                      <el-col :span="2" >
                        <div class="user_icon"><img src="../../assets/image/user_ico.png"/></div>
                        <div class="keys_icon"><img src="../../assets/image/keys.png"/></div>
                      </el-col>
                      <el-col :span="22" class="logon-main-logon-right-form">
                          <el-form  :label-position="labelPosition" ref="formuser" :rules="rules1" label-width="65px" :model="formuser">
                            <el-form-item prop="username" label="手机号">
                              <el-input size="large" v-model="formuser.username" name="username" placeholder="手机号"></el-input>
                            </el-form-item>
                            <el-form-item prop="password" label="密码">
                              <el-input type="password"  size="large" v-model="formuser.password" name="password" placeholder="密码"></el-input>
                            </el-form-item>
                          </el-form>
                      </el-col>
                      <el-col  :span="24" >
                        <div class="left">
                          <span @click="isLogin = false" class="retrieve-pass">找回密码</span>
                        </div>
                        <div class="right logon-main-logon-right-button">
                          <el-button @click="jumpUrl" type="text"><span>注册</span></el-button>
                          <el-button @click="login(5,'formuser')" type="primary">登录</el-button>
                        </div>
                      </el-col>
                    </li>
                    <li class="clear" v-show="!isLogin">
                    	 <el-col :span="2" >
                        <div class="user_icon"><img src="../../assets/image/user_ico.png"/></div>
                        <div class="keys_icon"><img src="../../assets/image/keys.png"/></div>
                        <div class="keys_icon" style="margin-top:38px;"><img src="../../assets/image/keys.png"/></div>
                      </el-col>
                      <el-col :span="22" class="logon-main-logon-right-form">
                          <el-form  :label-position="labelPosition" ref="formuserFund" :rules="rules1" label-width="65px" :model="formuserFund">
                            <el-form-item prop="username" label="手机号">
                              <el-input size="large" v-model="formuserFund.username" name="username" placeholder="手机号"></el-input>
                            </el-form-item>
 							<el-form-item prop="yan" label="验证码">
 								<div class="flexBox">
 									 <el-input  size="large" v-model="formuserFund.yan" name="password" placeholder="验证码"></el-input>
                                    <el-button type="primary">获取验证码</el-button>
 								</div>
                            </el-form-item>                           
                            <el-form-item prop="password" label="密码">
                              <el-input  size="large" v-model="formuserFund.password" name="password" placeholder="密码"></el-input>
                            </el-form-item>
                          </el-form>
                      </el-col>
                      <el-col  :span="24" >
                        <div class="left">
                        	<!-- <el-button type="text">返回</el-button> -->
                        </div>
                        <div class="right logon-main-logon-right-button">
                          <el-button @click="jumpUrl" type="text"><span>注册</span></el-button>
                          <el-button @click="editorPassword('formuserFund')" type="primary">确定</el-button>
                        </div>
                      </el-col>
                    </li>
                  </ul>
                </div>
              </el-col>
          </el-row>
      </el-row>
      <!-- <div class="night-owl"><img src = "../../assets/image/night-owl.png"/></div> -->
      <p class="huicheng-copy">汇成教育版权所有 京IPC备16023135号-1</p>
  </div>
</template>

<script>
import api from '../../apis/company/companyEnter.js'
import validate from "../../validate"
export default {
  name: 'login',
  data() {
    return {
      isLogin:true,  
      labelPosition: 'left',
      formuser: {
        username: '',
        password: '',
      },
      formuserFund: {
      	username: '',
      	password: '',
      	yan: ''
      },
      rules1: {        //表单验证
        username: [{ validator: validate.usernames, trigger: 'blur' }],
        password: [//{ validator: validate.passwords, trigger: 'blur' }
                  ],
        yan: [{require: true, message: '请输入验证码',trigger: 'change'}]
      }
    }
  },
  components:{
 
  },
  created(){
    
  },
  mounted() {
    

  },
  computed: {
    
  },
  methods: {
    getcodebox(event){
      console.log(event)
      var wait=60;
      function time(o) {
        if (wait == 0) {
        event.target.removeAttribute("disabled");
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
    },
    login(i,formname){
      this.$refs[formname].validate((valid) => {
        if (valid) {
          let formdata = new FormData()
          formdata.append('username', this.formuser.username);
          formdata.append('password', this.formuser.password);
          formdata.append('type', i);
            api.UserLogin(formdata).then(data=>{
              if(data.data.meta.code == 200){
                this.$message({
                    showClose: true,
                    message: "登录成功",
                    type: 'success'
                  });
                this.$Cookies.set('sessionid',data.data.data, { expires: 7 });
                window.sessionStorage.setItem('companyPhone',this.formuser.username)
                let _this = this
                setTimeout(function(){
                  // console.log(this.usertype[i])
                  _this.$router.push({
                      name: 'companyMassage'
                  })
                },200)
              }
              if(data.data.meta.code == 500){
                alert('123')
                console.log(data)
                this.$message({
                    showClose: true,
                    message: data.data.meta.message,
                    type: 'error'
                  });
              }
            }).catch(req=>{
               
            });
        }else {
          return false;
        }
      })
    },
    // 跳转页面
    jumpUrl () {
    	this.$router.push('companyLogin')
    },
    editorPassword (formname) {
    	this.$refs[formname].validate((valid) => {
    		if (valid) {

    		}
    	})
    },
    retrieve(id){
      this.$router.push({path:'/retrievePassword',query: {id: id}})
    }
  },
  directives:{
    btn:{//自定义函数
      bind:function (el, binding, vnode) {//钩子函数
        el.onmouseover=function(){
          vnode.elm.nextElementSibling.style.display="block"
        }
        el.onmouseout=function(){
          vnode.elm.nextElementSibling.style.display="none"
        }
      },
      update:function (el, binding, vnode) {//钩子函数
      },
      unbind:function (e) {//钩子函数
          // console.log(e)
      }
    },
    code:{//自定义函数
      bind:function (el, binding, vnode) {//钩子函数
        el.onmouseover=function(){
          this.verify = true;
          let p = vnode.elm.parentElement.children
          let li = vnode.elm.parentElement.parentElement.children[1].children
          for(let i=0;i<p.length;i++){
            p[i].className="";
            li[i].style.display="none"
          }
          vnode.elm.className="active"
          li[binding.value].style.display="block"
        }
      },
      update:function (el, binding, vnode) {//钩子函数
      },
      unbind:function (e) {//钩子函数
      }
   }
  },
  watch:{
    
  }
     
}

</script>
<style scoped>
.login{
  width:100%;
  height:100%;
  overflow:hidden;
  text-align:center;
}
.logon-background-img{
  width:100%;
  height:100%;
}
.huicheng-copy{
  position:fixed;
  left:50%;
  margin-left:-130px;
  bottom:20px;
  font-size:14px;
  color:#000;
}
.logon-main{
  width:1200px;
  position: absolute;
  top:44px;
  left:50%;
  margin-left:-600px;
 
}
.dimension-code{
  margin-right:22px;
}
.logon-main-logon{
  margin-top:20px;
  text-align:center;
}
.logon-main-logon-left{
  width:700px;
}
.logon-main-logon-right{
  padding-top:24px;
  width:480px;
  padding-bottom:25px;
  background-color:#fff;
}
.logon-main-logon-right-input{
  margin:20px auto 0; 
  width:380px;
}
.studentadmission{
  width:350px;
}
.logon-main-logon-right-input ul li{
  position:relative;
}
.logon-main-logon-right-role{
  margin-bottom:32px;
}
.logon-main-logon-right-role .active{
   background-color:#208af5;
   color:#fff;
}
.logon-main-logon-right-role p{
  width:33.3%;
  display:inline-block;
  background-color:#ededed;
  height:40px;
  line-height:40px;
  color:#333;
  cursor: pointer;
}

.logon-main-logon-right-form .el-form-item {
    margin-bottom: 34px;
}
.studentadmission .logon-main-logon-right-form{
  margin-top:65px;
  margin-bottom:35px;
}
.user_icon{
  margin-bottom:34px;
  height:38px;
  line-height:38px;
}
.keys_icon{
  height:38px;
  line-height:38px;
}
.retrieve-pass{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    color: #1f2d3d;
    margin: 0;
    padding: 10px 5px;
    font-size: 14px;
    box-sizing: border-box;
}
.dimension-code-qr{
  position:absolute;
  display:none;
  left:-12px;
  z-index:11;
}
.dimension-codebox{
  display:inline-block;
  position: relative;
}
.logon-main-logon-right-button .el-button--primary{
  background-color:#208af5;
  width:94px;
}
.logon-main-logon-right-button .el-button--text{
  text-decoration: underline;
}
.night-owl{
  position:absolute;
  right: 15px;
    bottom:5%;
}
.logon-main .right{
  float:right;
}
.switching{
  position: absolute;
  top: -135px;
  right: -74px;
  z-index: 10;
  height: 55px;
  width: 90px;
}
.switching-phone-text{
  position:absolute;
  top: 0;
  left: -60px;
}
.switching-phone-img{
  cursor: pointer;
}
.parentlogin-explain{
  text-align:right;
  color:#ef0000;
  font-size:11px;
}
/*验证手机*/
.verify-login{
  padding-top:15px;
  position:relative;
}
.verify-login p{
  margin:0 0 35px 0;
}
.getcode{
  position:relative;
  background-color: #208af5;
  color:#fbfdff;
}
.switching-mac{
  position:absolute;
  right: -45px;
  top: -60px;
  cursor: pointer;
}


/*验证码*/
.flexBox{
	display:flex;
}
</style>
<style>
/*swiper*/
.logon-main-logon-left-swiper .el-carousel__indicators .el-carousel__indicator .el-carousel__button{
  width:5px;
  height:5px;
  border-radius:50%;
}
.getcodebox .el-form-item__content  .el-input-group__append{
  background-color:#208af5 ;
  font-size:14px;
  cursor:pointer;
}
</style>