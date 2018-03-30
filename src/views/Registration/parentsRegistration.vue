<template>
  <div class="parentsRegistration">
      <nav-top></nav-top>
      <p class="log-magess"><span>注册信息</span></p>
      <div class="magessBox">
        <avatar-Mock  @services-change="servicesChange"></avatar-Mock>
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" >
           <el-form-item label="学生姓名:" prop="studentname" >
              <el-input v-model="form.studentname" placeholder="请输入学生姓名"></el-input>
           </el-form-item >
           <el-form-item label="学生学号:" prop="studentid" >
              <el-input v-model="form.studentid " placeholder="请输入学生学号"></el-input>
           </el-form-item>
           <el-form-item label="学生身份证:" prop="studentidentity">
              <el-input v-model="form.studentidentity " placeholder="请输入学生身份证号"></el-input>
           </el-form-item>
           <el-form-item label="家长姓名:" prop="parentname" >
              <el-input v-model="form.parentname " placeholder="请输入家长真实姓名"></el-input>
           </el-form-item>
           <el-form-item label="家长身份证:" prop="parentidentity" >
              <el-input v-model="form.parentidentity " placeholder="请输入家长身份证号"></el-input>
           </el-form-item>
           <el-form-item label="手机号:" prop="parentcellphone" >
              <el-input v-model="form.parentcellphone" placeholder="请输入手机号"></el-input>
           </el-form-item>
           <el-form-item label="邮箱:" prop="parentemail" >
              <el-input v-model="form.parentemail" placeholder="请输入邮箱"></el-input>
           </el-form-item>
          <el-form-item label="设置密码:" prop="password" >
              <el-input v-model="form.password" placeholder="设置密码"></el-input>
           </el-form-item>
           <el-form-item>
            <el-button type="primary" @click="submitForm('form')" :loading="loading" >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import navTop from '../../components/navigationres'
import avatarMock from '../../components/avatar'
import { Message } from 'element-ui'
import api from '../../apis/login.js'
import validate from "../../validate"
export default {
  name: 'parentsRegistration',
  data() {
      return {
        loading:false,
        imageUrl: '',
        form: {
          studentname: '',
          studentid: '',
          studentidentity: '',
          parentname: '',
          parentidentity: "",
          parentcellphone: '',
          parentemail: '',
          password: '',
          file:""
        },
        rules:{        //表单验证
          studentname: [ { required: true, message: '请输入学生姓名', trigger: 'blur'}],
          parentname: [ { required: true, message: '请输入家长姓名', trigger: 'blur'}],
          studentid: [ { required: true, message: '请输入学生学号', trigger: 'blur'}],
          parentcellphone: [ {required: true, validator: validate.phonevalidate, trigger: 'blur' } ],
          studentidentity: [ {required: true, validator: validate.identityvalidate, trigger: 'blur' }],
          parentidentity: [ {required: true, validator: validate.identityvalidate, trigger: 'blur' }],
          parentemail: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' } ],
          password: [{required: true, validator: validate.passwords, trigger: 'blur' } ],
        },
      }
    },
  components:{
    navTop,
    avatarMock
  },
  created(){
    
  },
  mounted() {
    

  },
  computed: {
    
  },
  methods: {
    servicesChange(data){       //上传照片
       this.form.file =  data.file;   
    },
    submitForm(formName) {        //表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          let formdata = new FormData()
          formdata.append('stuName', this.form.studentname);
          formdata.append('stuNo', this.form.studentid);
          formdata.append('stuIdcard', this.form.studentidentity);
          formdata.append('ptName', this.form.parentname);
          formdata.append('ptIdcard', this.form.parentidentity);
          formdata.append('ptMobile', this.form.parentcellphone);
          formdata.append('ptEmail', this.form.parentemail);
          formdata.append('password', this.form.password);
          formdata.append('picture', this.form.file);
          api.parentsSave(formdata).then(data=>{
            this.loading = false;
            if(data){
              Message({
                showClose: true,
                message: data.data.meta.message,
                type: 'success',
                duration:'1500'
              });
              this.$router.push('/')
            }
          })
        }else{
          this.$message({
              showClose: true,
              message: '请完善信息',
              type: 'error',
              duration:'1500'
            });
            return false;
        }
      })
    }
  },
  directives:{
        
  },
  watch:{
    
  }
     
  }

</script>
<style scoped>
.parentsRegistration{
  text-align:center;
}
.log-magess{
  margin:0 auto;
  height:50px;
  width:1200px;
  color:#000;
  font-size:16px;
}
.log-magess>span{
  display:inline-block;
  height:46px;
  border-bottom:4px solid #208af5;
  line-height:50px;
}
.magessBox{
  width:1200px;
  margin:0 auto;
  padding-top:20px;
  padding-bottom:1px;
  background-color:#fff;
}
.avatar-uploader{
  margin-bottom:18px;
}
.el-icon-plus:before{
  content: "";
}
.el-form{
  margin:0 auto;
  width:310px;
}
.el-button--primary{
  width:100%
}
.el-button--primary{
  background-color: #208af5;
  border-color: #208af5;
}
</style>
