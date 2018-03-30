<template>
  <div class="retrievePassword">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center">找回密码</span><span class="arrow-right" @click="back">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
          <ul class="clear">
            <li class="retrieve-left" >
              <div>
                <img @click="tabRetrieveemail" v-show="!tabRetrieves" src='../../assets/image/retrieve-email-on.png'/>
                <img @click="tabRetrieveemail" v-show="tabRetrieves" src='../../assets/image/retrieve-email-off.png'/>
              </div>
              <div class="retrieve-phone">
                <img @click="tabRetrievephone"  v-show="!tabRetrieves" src='../../assets/image/retrieve-phone-off.png'/>
                <img @click="tabRetrievephone" v-show="tabRetrieves" src='../../assets/image/retrieve-phone-on.png'/>
              </div>
            </li>
            <li class="retrieve-right">
              <div v-if="!tabRetrieves">
                  <div v-if="!retrieveEmail">
                    <p><img src='../../assets/image/retrieve-email-right.png'/></p>
                    <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1"  class="demo-ruleForm">
                      <el-form-item  prop="email">
                        <el-input v-model="ruleForm1.email"  placeholder="请输入邮箱地址"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button class="ligth-button" type="primary" @click="submitForm('ruleForm1')">提交</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div v-if="retrieveEmail">
                    <el-form :model="r_form" ref="r_form" :rules="rules2"  class="demo-ruleForm">
                      <el-form-item prop="pass">
                      <el-input type="password" v-model="r_form.pass" auto-complete="off" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass" >
                      <el-input type="password" v-model="r_form.checkPass" auto-complete="off" placeholder="请确认密码"></el-input>
                    </el-form-item>
                      <el-form-item >
                        <el-button class="ligth-button" type="primary" @click="s_new_p">提交</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
              </div>
              <div v-if="tabRetrieves">
                  <p><img src='../../assets/image/retrieve-email-right.png'/></p>
                  <el-form :model="r_form" ref="r_form"  class="demo-ruleForm">
                    <el-form-item>
                      <el-input type="text" v-model="r_form.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item  class="getcodebox">
                      <el-input type="text" v-model="r_form.phone" auto-complete="off" placeholder="请输入验证码"><div class="getcode" slot="append">获取验证码</div></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input type="text" v-model="r_form.pass" auto-complete="off" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input type="password" v-model="r_form.checkPass" auto-complete="off" placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button class="ligth-button"  type="primary" @click="">提交</el-button>
                    </el-form-item>
                  </el-form>
              </div>
            </li>            
          </ul>
      </div>
  </div>
</template>

<script>
import navTop from '../../components/navigationres'
import validate from "../../validate"
import api from '../../apis/login.js'
export default {
  name: 'retrievePassword',
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.r_form.checkPass !== '') {
            this.$refs.r_form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.r_form.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        tabRetrieves:false,
        retrieveEmail:false,
        code:'',
        imageUrl: '',
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        ruleForm1: {
          email: '',
        },
        rules1: {
          email: [
            { validator: validate.emailx, trigger: 'blur' }
          ]
        },
         r_form: {
          pass: '',
          checkPass: '',
          // age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          // age: [
          //   { validator: validate.checkAge, trigger: 'blur' }
          // ]
        }

      }
    },
    components:{
      navTop
    },
    created(){
      // this.$route.query.code
      if(!this.$route.query.code ==""){
        this.retrieveEmail = true;
        this.code = this.$route.query.code;
      } 
    },
    mounted() {
     this.clientHeight()

    },
    computed: {
      
    },
    methods: {
      s_new_p(){
        let formdata = new FormData();
        formdata.append("code", this.code);
        formdata.append("password", this.r_form.pass);
        formdata.append("repassword", this.r_form.checkPass);
        api.set_pass(formdata).then(r=>{
          if(r){
            this.$message({
              showClose: true,
              message: r.data.meta.message,
              type: 'success'
            });
            this.$router.push('/')
          }
        })
      },
      back(){
        this.$router.push('/')
      },
      tabRetrieveemail(e){
         this.tabRetrieves = false;
      },
      tabRetrievephone(e){
         this.tabRetrieves = true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let formdata = new FormData();
            formdata.append("userType", this.$route.query.id);
            formdata.append("email", this.ruleForm1.email);
            api.retrievePassword(formdata).then(data=>{
              if(data){
                this.$message({
                showClose: true,
                message: data.data.data,
                type: 'success'
              });

              }
            })
          } else {
            return false;
          }
        });
      },

      clientHeight: function (){
        let y= document.body.clientHeight
        document.querySelector(".magessBox").style.height = y-161+"px";
      }
    },
    directives:{
          
      },
      watch:{
        
      }
     
  }

</script>
<style scoped>
.retrievePassword{
  height:100%;
  text-align:center;
}
.log-magess{
  margin:0 auto ;
  position: relative;
  height:50px;
  width:1200px;
  color:#000;
  font-size:16px;
}
.log-magess .arrow-center{
  display:inline-block;
  height:46px;
  border-bottom:4px solid #208af5;
  line-height:50px;
}
.log-magess .arrow-right{
    position: absolute;
    right:0;
    top:16px;
    cursor: pointer;
}
.magessBox{
  width:1200px;
  margin:0 auto 20px;
  padding-top:20px;
  padding-bottom:1px;
  background-color:#fff;
}
.magessBox>ul{
  height:460px;
}
.magessBox .retrieve-left{
  float:left;
  padding-top:28px;
  border-right:1px solid #9fa1ac;
  width:29%;
   height:432px;
}
.magessBox .retrieve-left img{
  cursor:pointer;
}
.magessBox .retrieve-left .retrieve-phone{
  margin-top:80px;
}
.magessBox .retrieve-right{
  float:left;
  padding-top:80px;
  width:70%;
  height:340px;
}
.demo-ruleForm {
  width:210px;
  margin:22px auto 0;
}
.demo-ruleForm .ligth-button {
  width:210px;
}
.magessBox .getcode{
  background-color: #208af5;
  color:#fbfdff;
}
.el-button--primary{
  background-color: #208af5;
  border-color: #208af5;
}
</style>
<style>
.getcodebox .el-form-item__content  .el-input-group__append{
  background-color:#208af5 ;
  font-size:14px;
  cursor:pointer;
}
</style>