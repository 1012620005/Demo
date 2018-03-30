<template>
  <div class="studentRegistration">
      <nav-top></nav-top>

      <p class="log-magess"><span class="arrow-center left" >注册信息</span><span class="arrow-right" @click="router">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox">
        <div class="avatar-uploader">
            <div class="avatar-uploader-size-img" @click="avataruploader">
              <img style="width: 80px;border-radius: 50%; cursor: pointer;" v-if="imageUrl" :src="imageUrl" class="avatars">
              <span v-else ><img src="../../assets/image/headportrait.png"/></span>
            </div>
            <el-dialog
              :visible.sync="avataruploaders" width="30%">
              
                <div slot="title"  >
                    <p style="font-size:16px;text-align:left;" >头像设置</p>
                </div>
                <div>
                <el-upload
                  class="mark-avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :data="filedatat"
                  :on-success="success"
                  :before-upload="beforeupload_p"
                  >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <span v-else ><img src="../../assets/image/avatarupload.png"/></span>
                </el-upload>
              </div>
              <span slot="footer" class="dialog-footer">
                
                <el-button type="primary" @click="savePhoto">保存头像</el-button>
                <el-button @click="avataruploadagain">重新上传</el-button>
              </span>
            </el-dialog>
        </div>
        <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="90px" class="s_form" >
           <el-form-item label="姓名:" prop="name">
              <el-input v-model="ruleForm1.name" placeholder="请输入姓名"></el-input>
           </el-form-item>
           <el-form-item label="学生学号:" prop="studentid">
              <el-input v-model="ruleForm1.studentid" placeholder="请输入学生学号"></el-input>
           </el-form-item>
           <el-form-item label="手机号:" prop="cellphone">
              <el-input v-model="ruleForm1.cellphone" placeholder="请输入手机号"></el-input>
           </el-form-item >
           <el-form-item label="身份证号:" prop="identity" >
              <el-input v-model="ruleForm1.identity"  placeholder="请输入身份证号"></el-input>
           </el-form-item>
           <el-form-item label="性别:">
             <el-radio class="radio" v-model="ruleForm1.radio" label="1">男</el-radio>
             <el-radio class="radio" v-model="ruleForm1.radio" label="2">女</el-radio>
          </el-form-item>
          <el-form-item prop="datevalue5" label="出生年月 :">
            <el-row type="flex" class="birthdate-box" justify="space-between">
              <el-col :span="6" class="inline-block">
                <el-date-picker 
                  v-model="ruleForm1.datevalue5"
                  align="right"
                  type="year">
                </el-date-picker>
                <span class="demonstration">年</span>
              </el-col>
              <el-col :span="6" class="block" >
                <el-date-picker
                  v-model="ruleForm1.datevalue5"
                  align="right"
                  format="MM"
                  type="month">
                </el-date-picker>
                <span class="demonstration">月</span>
              </el-col>
              <el-col :span="6" class="block" >
                <el-date-picker
                  v-model="ruleForm1.datevalue5"
                  format="dd"
                  align="right"
                  type="date">
                </el-date-picker>
                <span class="demonstration">日</span>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="email" label="电子邮箱:">
            <!-- <el-input v-model="ruleForm1.email" placeholder="请输入电子邮箱"></el-input> -->
            <el-autocomplete
                class="inline-input"
                v-model="ruleForm1.email"
                :fetch-suggestions="querySearch"
                placeholder="请输入电子邮箱"
                :trigger-on-focus="false"
              ></el-autocomplete>
          </el-form-item>
          <el-form-item label="民族:" prop="nation">
            <el-select  v-model="ruleForm1.nation" placeholder="民族">
              <el-option v-for="item in ruleForm2.nation" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生源地:" >
             <div style="width:600px;">
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="4">
                    <el-select @change="selectprovince('1')" v-model="ruleForm1.s_ation.s_p" placeholder="选择省">
                      <el-option v-for="(item,index) in homeaddress.province" :key="index" :label="item.name" :value="item.code" ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select @change="selectcity('1')" v-model="ruleForm1.s_ation.s_c" placeholder="选择市">
                      <el-option v-for="(item,index) in s_sy.city" :key="index" :label="item.name" :value="item.code" ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="ruleForm1.s_ation.s_cty" placeholder="选择县">
                    <el-option v-for="(item,index) in s_sy.county" :key="index" :label="item.name" :value="item.code" ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="11">
                  <el-form-item prop="s_ation.s_d" :rules="[{ required: true, message: '详细地址', trigger: 'blur' }]">
                    <div class="grid-content bg-purple">
                        <el-input v-model="ruleForm1.s_ation.s_d" placeholder="详细地址"></el-input>
                    </div>
                  </el-form-item>
                  </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item label="政治面貌:" prop="politicsstatus" >
            <el-select v-model="ruleForm1.politicsstatus" placeholder="政治面貌">
              <el-option v-for="item in ruleForm2.politicsstatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>  
          <el-form-item label="家庭地址:" >
            <div style="width:600px;">
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="4">
                    <el-select @change="selectprovince('2')" v-model="ruleForm1.homeaddress.province" placeholder="选择省">
                      <el-option v-for="(item,index) in homeaddress.province" :key="index" :label="item.name" :value="item.code" ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select @change="selectcity('2')" v-model="ruleForm1.homeaddress.city" placeholder="选择市">
                      <el-option v-for="(item,index) in homeaddress.city" :key="index" :label="item.name" :value="item.code" ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="ruleForm1.homeaddress.county" placeholder="选择县">
                    <el-option v-for="(item,index) in homeaddress.county" :key="index" :label="item.name" :value="item.code" ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="11">
                  <el-form-item prop="homeaddress.detail" :rules="[{ required: true, message: '请输入家庭地址', trigger: 'blur' }]">
                    <div class="grid-content bg-purple">
                        <el-input v-model="ruleForm1.homeaddress.detail" placeholder="详细家庭地址"></el-input>
                    </div>
                  </el-form-item>
                  </el-col>
              </el-row>
            </div>
           </el-form-item>
           <el-form-item label="入学学期:" prop="xq">
            <el-select   v-model="ruleForm1.xq"  placeholder="入学学期"  >
              <el-option v-for="item in ruleForm2.xq" :key="item.term" :label="item.term" :value="item.term"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择专业:" >
            <el-cascader
                placeholder="请选择或输入关键字"
                :options="ruleForm2.chooseamajor"
                :props="defaultProps"
                :show-all-levels="false"
                filterable
                 @change="get_porid" 
                 clearable 
            ></el-cascader>
          </el-form-item>
          <el-form-item label="选择年级:" >
              <el-select @change="selectclass" v-model="ruleForm1.nj" placeholder="选择年级" value-key="id" >
                <el-option v-for="item in ruleForm2.nj" :key="item.id" :label="item.name" :value="item" ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="选择班级:" prop="selecttheclass">
            <el-select  v-model="ruleForm1.selecttheclass" placeholder="选择班级">
              <el-option v-for="item in ruleForm2.selecttheclass" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设置密码:" prop="setpassword">
              <el-input v-model="ruleForm1.setpassword" placeholder="设置密码"></el-input>
           </el-form-item>
           <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm1')" :loading="loading" >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import navTop from '../../components/navigationres'
import api from '../../apis/login.js'
import validate from "../../validate"
import { Message } from 'element-ui'
import DateFns  from 'date-fns'
import userApi from '../../apis/userCenter.js'
import u from '../../apis/commonFile.js'
export default {
  name: 'studentRegistration',
  data() {
    return {
      filedatat:{ 
        entity:'User',
        type:'photo',
        filename:'',
        delflag:'1', //头像只能有一个
        bid:''
      },
      loading:false,
      avataruploaders:false,
      uploadUrl:'',
      imageUrl:'',
      ruleForm1: {
        name: '',
        studentid: '',    //学号
        cellphone: '',    //手机号
        identity: '',     //身份证号码
        radio: '1',       //男&女
        datevalue5: '',   //出生日期
        email:"",
        nation:"",        //民族
        s_ation:{
          s_p:"",
          s_c:"",
          s_cty:"",
          s_d:""
        },  //生源地
        politicsstatus:'', //政治面貌 
        homeaddress:{
          province:"",
          city:"",
          county:"",
          detail:""
        },  //家庭地址 
        nj:{},  
        xq:'', //学期 
        chooseamajor:'', //选择专业 
        selecttheclass:'', //选择班级  
        setpassword:'', //设置密码
        photo:'',
        file:"",
      },
      rules1: {        //表单验证
        name: [ { required: true, message: '请输入姓名', trigger: 'blur'}],
        studentid: [ { required: true, message: '请输入学号', trigger: 'blur' }],
        identity: [ {required: true, validator: validate.identityvalidate, trigger: 'blur' }],
        datevalue5: [{type: 'date', required: true, message: '请输入出生年月', trigger: 'blur' } ],
        email: [{ required: true, validator: validate.emailx, trigger: 'blur' }],
        nation: [{ required: true, message: '请选择民族', trigger: 'change' } ],
        studentsoftranslation: [{ required: true, message: '请选择生源地', trigger: 'change' } ],
        politicsstatus: [{ required: true, message: '请选择政治面貌', trigger: 'change' } ],
        xq: [{ required: true, message: '请选择入学学期', trigger: 'change' } ],
        selecttheclass: [{ required: true, message: '请选择班级', trigger: 'change' } ],
        setpassword: [{required: true, validator: validate.passwords, trigger: 'blur' } ],
      },
      homeaddress:{       //家庭地址 
          province:"",
          city:"",
          county:""
      }, 
      s_sy:{
        province:"",
        city:"",
        county:"",
        detail:""
      },
      ruleForm2: {
        nation:'',        //民族
        studentsoftranslation:'',  //生源地
        politicsstatus:'', //政治面貌               
        nj:'',  //学期  
        xq:'',
        chooseamajor:[], //选择专业 
        selecttheclass:'', //选择班级 
      },
      defaultProps:{
        children: "children",
        label: "label",
        value:'id'
      },
    }
  },
  components:{
    navTop,
  },
  created(){
    api.studentRegistration().then(data=>{
            this.ruleForm2.nation = data.data.data.nation
            this.ruleForm2.politicsstatus = data.data.data.political
    })
    api.address().then(data=>{
          this.homeaddress.province = data.data.data
    })
    api.getTerm().then(data=>{
      if(data) this.ruleForm2.xq = data.data.data;
    })
    api.queryAllGrade().then(r=>{
      if(r) this.ruleForm2.nj = r.data.data;
    })
    api.getorgantree({ xz: "1", officeid: "" }).then(r => {
      this.ruleForm2.chooseamajor = r.data.data;
    });
  },
  mounted() {
    let _this = this;
    _this.uploadUrl = u.getCommonUploadUrl();
    setInterval(function(){_this.uploadUrl = u.getCommonUploadUrl();}, 4 * 60000);
  },
  computed: {
    
  },
  methods: {
    get_porid(val){
      if(val){
        this.ruleForm1.chooseamajor = val[val.length-1];
      }
      this.selectclass();
    },
    selectclass(){    //查询班级
      api.get_executive({'pageNo':1,'pageSize':-1,'proid':this.ruleForm1.chooseamajor,'gradeid':this.ruleForm1.nj.id}).then(r => {
        this.ruleForm2.selecttheclass = r.data.data.list;
      });
    },
    querySearch(queryString, cb) {
        let d=queryString.split('@')[0]
        var results = [
          {value:d+'@qq.com'},
          {value:d+'@163.com'},
          {value:d+'@mail.com'},    
        ]
        cb(results);
      },
    savePhoto(){
      this.avataruploaders = false;
    },
    success(r, file) {
      this.ruleForm1.photo = r.data.name;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeupload_p(file){
      console.log(file)
    },
    avataruploader(){
      this.avataruploaders = true; 
    },
    avataruploadagain(){
      this.imageUrl =""
    },
    router(url){
      this.$router.go(-1);
    },
    
    selectprovince(type){
      if(type == '1'){
        for(var i in this.ruleForm1.s_ation) {
          if(i == 's_c') this.ruleForm1.s_ation[i] = null;
          if(i == 's_cty') this.ruleForm1.s_ation[i] = '';
        }
        api.address(this.ruleForm1.s_ation.s_p).then(data=>{
            this.s_sy.city = data.data.data
        })
      }else{
        for(var i in this.ruleForm1.homeaddress) {
          if(i == 'county') this.ruleForm1.homeaddress[i] = null;
          if(i == 'city') this.ruleForm1.homeaddress[i] = '';
        }
        api.address(this.ruleForm1.homeaddress.province).then(data=>{
            this.homeaddress.city = data.data.data
        })
      }
    },
    selectcity(type){
      if(type == '1'){
        for(var i in this.ruleForm1.s_ation) {
          if(i == 's_cty') this.ruleForm1.s_ation[i] = '';
        }
        api.address(this.ruleForm1.s_ation.s_c).then(data=>{
            this.s_sy.county = data.data.data
        })
      }else{
        for(var i in this.ruleForm1.homeaddress) {
          if(i == 'county') this.ruleForm1.homeaddress[i] = '';
        }
        api.address(this.ruleForm1.homeaddress.city).then(data=>{
            this.homeaddress.county = data.data.data
        })
      }
    },
    submitForm(formName) {        //表单验证
      this.$refs[formName].validate((valid) => {
      if (valid) {
        this.loading = true;
        let s_syd = this.ruleForm1.s_ation.s_p+","+this.ruleForm1.s_ation.s_c+","+this.ruleForm1.s_ation.s_cty+","+this.ruleForm1.s_ation.s_d
       this.ruleForm1.datevalue5 =  DateFns.format(new Date(this.ruleForm1.datevalue5), 'YYYY-MM-DD')
       let  formdata = new FormData()
       console.log(this.ruleForm1);
       formdata.append('name', this.ruleForm1.name);
       formdata.append('no', this.ruleForm1.studentid);
       formdata.append('mobile', this.ruleForm1.cellphone);
       formdata.append('idcard', this.ruleForm1.identity);
       formdata.append('sex', this.ruleForm1.radio);
       formdata.append('birthday', this.ruleForm1.datevalue5);
       formdata.append('email', this.ruleForm1.email);
       formdata.append('year', this.ruleForm1.xq);
       formdata.append('office.id', this.ruleForm1.choosecollege);
       formdata.append('pro.id', this.ruleForm1.chooseamajor);
       formdata.append('password', this.ruleForm1.setpassword);
       formdata.append('clazzs', this.ruleForm1.selecttheclass);
       formdata.append('politicalStatus', this.ruleForm1.politicsstatus);
       formdata.append('nation', this.ruleForm1.nation);
       formdata.append('scoms.id', this.ruleForm1.campus);
       formdata.append('province', this.ruleForm1.homeaddress.province);
       formdata.append('city', this.ruleForm1.homeaddress.city);
       formdata.append('county', this.ruleForm1.homeaddress.county);
       formdata.append('source', s_syd);
       formdata.append('address', this.ruleForm1.homeaddress.detail);
       formdata.append("photo", this.ruleForm1.photo);
       formdata.append('userType', "3");
       api.studentSave(formdata).then(data=>{
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
      } else {
        this.$message({
          showClose: true,
          message: '请完善信息',
          type: 'error',
          duration:'1500'
        });
        return false;
      }
    });
  },
  },
  directives:{
        
  },
  watch:{
    
  }
     
}

</script>
<style scoped>
.avatar{
  text-align:left;
}
.avatar-uploader{
  margin-bottom:18px;
  text-align: center;
}
.avatar-uploader-size-img {
  margin:0 auto;
  width:80px;
  height:80px;
  cursor: pointer;
  border-radius: 50%;
}
.avatar-uploader-size-img .avatars{
  width:80px;
  height:80px;
  border-radius: 50%;
}
.avata{
  width:80px;
  height:80px;
  border-radius: 50%;
}
/*头像上传弹出*/
.mark-avatar-uploader-cmp{
   display:inline-block;
  float: left;
}
.mark-avatar-uploader-cmp p{
   display:inline-block;
  margin-left:10px;
}
.mark-avatar-uploader-icon{
vertical-align: middle;
}
.mark-avatar-uploader .el-upload{
  width:150px;
  height:150px;
  background-color:#bfcbd9;
}
.mark-avatar-uploader img{
  width:183px;
  height:183px;
}
.studentRegistration{
  text-align:left;
}
.log-magess{
  margin:0 auto;
  height:50px;
  width:1200px;
  color:#000;
  font-size:16px;
  text-align:center;
}
.magessBox{
  width:1200px;
  margin:0 auto 20px;
  padding-top:20px;
  padding-bottom:1px;
  background-color:#fff;
}
.el-form{
  margin:0 auto;
  width:300px;
}
.magessBox .s_form .el-button--primary{
  width:100%
}
.birthdate-box{
   width:320px;
}
.birthdate-box .block{
  display:inline-block;
  width:29%;
}
.birthdate-box .inline-block{
  display:inline-block;
  width:33%;
}
.birthdate-box .inline-block .el-date-editor{
  width:80px;
}
.birthdate-box .block .el-date-editor{
  width:65px;
}
.el-button--primary{
  background-color: #208af5;
  border-color: #208af5;
}
.el-select{
  width:100%;
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
.inline-input{
  width: 100%;
}
</style>
