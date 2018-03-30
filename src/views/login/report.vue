<template>
  <div class="report">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >用户反馈</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="report-box">
        <div class="report-top" >
          <p>尊敬的用户</p>
          <p style="padding-left: 28px;">您好！为了给您提供更好的服务，我们希望收集到您使用智慧校园的看法和建议。对您的配合和支持表示衷心感谢！</p>
          <p>如果您在使用智慧校园产品时，有什么好或不好的地方，请大声说出来！我们会及时关注您的反馈，不断优化产品。为您提供更好的服务</p>
          <div style=" margin: 0 auto; width: 400px;padding-top: 150px;" >
            <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form" :rules="rules">
              <el-row :gutter="20">
              <el-col :span="18">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              </el-row>
              <el-row :gutter="20">
              <el-col :span="18">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="18">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              </el-col>
              </el-row>
              <el-form-item label="反馈意见" prop="textarea">
                <el-input :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="反馈意见" v-model="form.textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <div class=" logon-main-logon-right-button">
                  <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                  
                </div>
                
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import navTop from "../../components/navigationres";
import validate from "../../validate";
import api from "../../apis/login.js";
export default {
  name: "report",
  data() {
    return {
      labelPosition: "right",
      form: {
        name: "",
        phone:"",
        email:"",
        textarea:'',
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        phone: [{ required: true, validator: validate.phonevalidate, trigger: "blur" }],
        textarea: [
          {  required: true, message: "请输入内容", trigger: "blur" }
        ],
      }
    };
  },
  components: {
    navTop
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    onSubmit(formName) {
       this.$refs[formName].validate(valid => {
        if(valid){
          
        }else{
          return false;
        }
      })
    },
    back() {
      this.$router.go(-1);
    }
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.report {
  height: 100%;
}
.log-magess {
  margin: 6px auto 16px;
  position: relative;
  background-color: #fff;
  height: 50px;
  width: 1200px;
  color: #000;
  font-size: 16px;
}
.log-magess .arrow-center {
  display: inline-block;
  margin-left: 38px;
  height: 46px;
  border-bottom: 4px solid #208af5;
  line-height: 50px;
}
.log-magess .arrow-right {
  position: absolute;
  right: 10px;
  top: 16px;
  cursor: pointer;
}
.report-box {
  width: 1200px;
  margin: 0 auto 40px;
  padding-bottom: 40px;
  background-color: #fff;
}
.report-top {
  margin: 0 auto;
  width: 800px;
  padding-top: 20px;
}
.report-top p {
  height: 40px;
  line-height: 40px;
  color: #000;
  font-weight: bold;
}
.logon-main-logon-right-button .el-button--primary {
  background-color: #208af5;
  width: 94px;
}
</style>