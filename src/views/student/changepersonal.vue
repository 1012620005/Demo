<template>
  <div class="personal">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >个人信息</span><span @click="back" class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
        <p style="margin-bottom:20px;">{{type_name[type-1]}}</p>
        <div v-show="type === 1">
            <div class="avatar-uploader">
              <div class="avatar-uploader-size-img" @click="avataruploader">
                <img style="width: 80px;border-radius: 50%; cursor: pointer;" v-if="imageUrl" :src="imageUrl" class="avatars">
                <span v-else ><img src="../../assets/image/headportrait.png"/></span>
              </div>
              <el-dialog :visible.sync="avataruploaders" width="30%">
                  <div slot="title"  >
                      <p style="font-size:16px;text-align:left; " >头像设置</p>
                  </div>
                  <div>
                  <el-upload
                    class="mark-avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :data="filedatat"
                    :on-success="success"
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
          <div class="uesrname">
            <span>{{dataper.name}}</span>
          </div>
          <div class="personalbox">
              <el-form :label-position="labelPosition" label-width="170px" ref="form" :model="form" :rules="rules1">
                <el-form-item  label="身份证号：">
                  {{dataper.idcard}}
                </el-form-item>
                <el-form-item  label="性别：">
                  {{dataper.sexname}}
                </el-form-item>
                <el-form-item  label="出生年月：">
                  {{ dataper.birthday }}
                </el-form-item>
                <el-form-item  label="政治面貌：">
                  {{dataper.politicalStatusname}}
                </el-form-item>
                <el-form-item prop="pcs" label="所属派出所：" :rules="[{ required: true, message: '所属派出所', trigger: 'blur' }]">
                  <el-input v-model="form.pcs" ></el-input>
                </el-form-item>
                <el-form-item  label="户籍性质：">
                  {{dataper.hkname}}
                </el-form-item>
                <el-form-item  label="邮编：" prop="zipcode" :rules="[{ required: true, message: '所属派出所', trigger: 'blur' }]">
                  <el-input v-model="form.zipcode" ></el-input>
                </el-form-item>
                <el-form-item  label="父亲姓名：">
                  {{dataper.father}}
                </el-form-item>
                <el-form-item  label="母亲姓名：">
                  {{dataper.fatherPhone}}
                </el-form-item>
                <el-form-item  label="父亲电话：">
                  {{dataper.mobile}}
                </el-form-item>
                <el-form-item  label="母亲电话：">
                  {{dataper.mobile}}
                </el-form-item>
                <el-form-item  label="是否建档立卡贫困户：" prop="ispoor" :rules="[{ required: true, message: '所属派出所', trigger: 'change' }]">
                  <el-select v-model="form.ispoor" >
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="现家庭详细地址：">
                  {{dataper.provincename+dataper.cityname+dataper.countyname+dataper.address}}
                </el-form-item>
                <el-form-item  label="民族：">
                  {{dataper.nationname}}
                </el-form-item>
              </el-form>
            <div style="text-align:center">
              <el-button  type="primary"  @click="next('form')" >下一步</el-button>
            </div>
          </div>
        </div>
        <div v-show="type === 2">
          <div class="personalbox">
              <el-form :label-position="labelPosition" label-width="170px" ref="entrance" :model="entrance" :rules="rules1">
                <el-form-item  label="专业类：" prop="deptid" :rules="[{ required: true, message: '所属派出所', trigger: 'change' }]" >
                  <el-select v-model="entrance.deptid" placeholder="">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="专业：" prop="proid" :rules="[{ required: true, message: '请选择专业', trigger: 'change' }]" >
                  <el-cascader
                    placeholder="请选择专业"
                    :options="datatree"
                    :props="defaultProps"
                    filterable
                    @change="get_pid"
                    clearable
                  ></el-cascader>
                </el-form-item>
                <el-form-item  label="行政班：" prop="xzbid" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]" >
                  <el-select v-model="entrance.xzbid" >
                    <el-option v-for="i in def_form.xzb" :key="i.clazzid" :label="i.clazzname" :value="i.clazzid"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="教学班：" >
                  {{dataper.mobile}}
                </el-form-item>
                <el-form-item  label="学制：" prop="xz" :rules="[{ required: true, message: '请选择学制', trigger: 'change' }]">
                  <el-select v-model="entrance.xz" placeholder="">
                    <el-option v-for="item in def_form.xz" :key="item.id" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="初中毕业学校：" prop="graduation" :rules="[{ required: true, message: '请输入毕业学校', trigger: 'change' }]">
                  <el-input v-model="entrance.graduation" ></el-input>
                </el-form-item>
                <el-form-item  label="就读方式：" prop="jdtype" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-select v-model="entrance.jdtype" placeholder="">
                    <el-option label="走读" value="走读"></el-option>
                    <el-option label="住校" value="住校"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="入学学期：" prop="xq" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]"> 
                  <el-select v-model="entrance.xq" >
                    <el-option v-for="i in def_form.xq"  :key="i.term" :label="i.term" :value="i.term"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="报名日期：" prop="bmrq" :rules="[{ required: true, message: '选择日期', trigger: 'change' }]">
                  <el-date-picker
                    v-model="entrance.bmrq"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item  label="入学学年：" prop="year" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-select v-model="entrance.year" >
                    <el-option v-for="i in def_form.nj" :key="i.id" :label="i.name" :value="i.name"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="学习形式：" prop="studytype" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-select v-model="entrance.studytype" placeholder="">
                    <el-option label="全日制" value="全日制"></el-option>
                    <el-option label="非全日制" value="非全日制"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="学费票号：" prop="xfph" :rules="[{ required: true, message: '不能为空'},{ type: 'number', message: '必须为9位数字值'}]" >
                  <el-input v-model.number="entrance.xfph" ></el-input>
                </el-form-item>
                <el-form-item  label="书费票号：" prop="sfph" :rules="[{ required: true, message: '不能为空'},{ type: 'number', message: '必须为9位数字值'}]">
                  <el-input v-model.number="entrance.sfph" ></el-input>
                </el-form-item>
                <el-form-item  label="书费金额：" prop="sfje" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-input v-model.number="entrance.sfje" ></el-input>
                </el-form-item>
                <el-form-item  label="金额350住宿费票号：" prop="zsf350ph" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-input v-model="entrance.zsf350ph" ></el-input>
                </el-form-item>
                <el-form-item  label="金额175住宿费票号：" prop="zsf175ph" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-input v-model="entrance.zsf175ph" ></el-input>
                </el-form-item>
                <el-form-item  label="企业培训费票号："  prop="qypxph" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-input v-model="entrance.qypxph" ></el-input>
                </el-form-item>
              </el-form>
              <div style="text-align:center" >
                <el-button   @click="pre" >上一步</el-button><el-button  type="primary"  @click="next('entrance')" >下一步</el-button>
              </div>
          </div>
        </div>
        <div v-show="type === 3">
          <div class="personalbox">
              <el-form :label-position="labelPosition" label-width="170px" ref="source" :model="source" >
                <el-form-item  label="学生来源：" prop="sxly" :rules="[{ required: true,message: '不能为空',  trigger: 'change' }]" >
                  <el-select v-model="source.sxly" placeholder="">
                    <el-option label="应届" value="应届"></el-option>
                    <el-option label="非应届" value="非应届"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="生源地：" prop="source" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]" >
                  <el-select v-model="source.source" placeholder="">
                    <el-option v-for="item in def_form.homeaddress.province" :key="item.code" :label="item.name" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="户口所在地县级以下详细地址：" prop="hkszd" :rules="[{ required: true, message: '不能为空',trigger: 'change' }]" >
                  <el-input v-model="source.hkszd" ></el-input>
                </el-form-item>
                <el-form-item  label="招生季节：" prop="zsjj" :rules="[{ required: true,message: '不能为空', trigger: 'change' }]">
                  <el-select v-model="source.zsjj" placeholder="">
                    <el-option label="春季" value="春季"></el-option>
                    <el-option label="秋季" value="秋季"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="招生来源：" prop="zsly" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-select v-model="source.zsly" >
                    <el-option label="学校知名度" value="学校知名度"></el-option>
                    <el-option label="下校宣传" value="下校宣传"></el-option>
                    <el-option label="发放招生简章" value="发放招生简章"></el-option>

                    <el-option label="发放录取通知书" value="发放录取通知书"></el-option>
                    <el-option label="中考填表志愿" value="中考填表志愿"></el-option>
                    <el-option label="校园网站" value="校园网站"></el-option>

                    <el-option label="互联网搜索" value="互联网搜索"></el-option>

                    <el-option label="微信发布" value="微信发布"></el-option>
                    <el-option label="电话咨询" value="电话咨询"></el-option>
                    <el-option label="学生推荐" value="学生推荐"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="招生区域：" prop="zsqy" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-select v-model="source.zsqy" placeholder="">
                    <el-option v-for="item in def_form.homeaddress.province" :key="item.code" :label="item.name" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="初中毕业证："  :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :data="data_assets"
                    :on-preview="handlePreview"
                    :on-success="handlesuccess"
                    :on-remove="handleRemove"
                    :file-list="fileList2"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item  label="广告媒体名称：" prop="ggmtmc" :rules="[{ required: true,message: '不能为空', trigger: 'change' }]"> 
                  <el-select v-model="source.ggmtmc" >
                    <el-option label="电视宣传" value="电视宣传"></el-option>
                    <el-option label="广播电视报" value="广播电视报"></el-option>
                    <el-option label="消费周刊" value="消费周刊"></el-option>
                    <el-option label="公交电子屏" value="公交电子屏"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="专业意向来源：" prop="zyyxly" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-select v-model="source.zyyxly" >
                    <el-option label="学校品牌" value="学校品牌"></el-option>
                    <el-option label="专业爱好" value="专业爱好"></el-option>
                    <el-option label="就业形势" value="就业形势"></el-option>
                    <el-option label="技能培养" value="技能培养"></el-option>
                    <el-option label="地理位置" value="地理位置"></el-option>
                    <el-option label="他人推荐" value="他人推荐"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="招生组：" prop="zsz" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]">
                  <el-input v-model="source.zsz" ></el-input>
                </el-form-item>
                <el-form-item  label="招生人员：" prop="zsry" :rules="[{ required: true,message: '不能为空', trigger: 'change' }]">
                  <el-input v-model="source.zsry" ></el-input>
                </el-form-item>
                <el-form-item  label="中考成绩：" prop="score" :rules="[{ required: true, message: '不能为空', trigger: 'change' }]" >
                  <el-input v-model="source.score" ></el-input>
                </el-form-item>
                <el-form-item  label="乘火车区间：" prop="train" :rules="[{ required: true,message: '不能为空',  trigger: 'change' }]">
                  <el-input v-model="source.train" placeholder="户口所在地县区"></el-input>
                </el-form-item>
              </el-form>
              <div style="text-align:center" >
                <el-button  type="primary"  @click="submitforms('source')" >保 存</el-button>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import navTop from "../common/header";
import apis from "../../apis/student.js";
import api from "../../apis/login.js";
import userApi from '../../apis/userCenter.js'
const qs = require('querystring');
export default {
  name: "personal",
  data() {
    return {
      filedatat:{ 
        entity:'User',
        type:'photo',
        filename:'',
        delflag:'1', //头像只能有一个
        bid:''
      },
      data_assets:{entity:'assets', type:'file',ticket:''},
      fileList2: [],
      type:1,
      type_name:['基本信息','入学信息','来源信息'],
      labelPosition: "right",
      dataper: "",
      avataruploaders:false,
      uploadUrl:'',
      imageUrl:'',
      datatree:[],
      defaultProps:{
        children: "children",
        label: "label",
        value:'id'
      },
      entrance:{
        qypxph:"",
        zsf175ph:"",
        zsf350ph:"",
        sfje:"",
        sfph:"",
        xfph:"",
        studytype:"",
        year:"",
        bmrq:"",
        xq:"",
        jdtype:"",
        xz:"",
        graduation:"",
        deptid:"",
        proid:"",
        xzbid:"",
      },
      source:{
        train:"",
        score:"",
        zsry:"",
        zsz:"",
        zyyxly:"",
        ggmtmc:"",
        zsqy:"",
        zsly:"",
        zsjj:"",
        source:"",
        xsly:"",
      },
      form: {
        photo:'',
        ispoor:"",
        zipcode:"",
        pcs:"",
      },
      def_form: {
        xzb:[],
        nj:[],
        xq:[],
        xz:[],
        homeaddress: {
          province:[],
          city:[],
          county:[],
        },
      },
      rules1: {

      }
    };
  },
  components: {
    navTop
  },
  filters: {  
    filterFun: function (value) {  
      if(value == null){
        return value
      }else{
        return  value.substring(0,4)+'年'+value.substring(4,6)+'月'+value.substring(6)+'日'
      }
    }  
  },
  created() {
    api.queryAllGrade().then(r=>{
      this.def_form.nj= r.data.data
    })
    api.getTerm().then(r=>{
      this.def_form.xq= r.data.data
    })
    api.getorgantree({ xz: "1", officeid: "" }).then(data => {
      this.datatree = data.data.data;
    });
    api.get_xz().then(r=>{
      this.def_form.xz= r.data.data
    })
    api.address().then(r => {
      this.def_form.homeaddress.province = r.data.data;
    });
    api.getselfuser().then(data=>{
        this.dataper = data.data.data;
        this.source.train = this.dataper.train;
        this.source.score = this.dataper.score
        this.source.zsry = this.dataper.zsry
        this.source.zsz = this.dataper.zsz
        this.source.zyyxly = this.dataper.zyyxly
        this.source.ggmtmc = this.dataper.ggmtmc
        this.source.zsqy = this.dataper.zsqy
        this.source.zsly = this.dataper.zsly
        this.source.zsjj = this.dataper.zsjj
        this.source.source = this.dataper.source
        this.source.xsly = this.dataper.xsly

        this.entrance.qypxph = this.dataper.qypxph
        this.entrance.zsf175ph = this.dataper.zsf175ph
        this.entrance.zsf350ph = this.dataper.zsf350ph
        this.entrance.sfje = this.dataper.sfje
        this.entrance.sfph = this.dataper.sfph
        this.entrance.xfph = this.dataper.xfph
        this.entrance.studytype = this.dataper.studytype
        this.entrance.year = this.dataper.year
        this.entrance.bmrq = this.dataper.bmrq
        this.entrance.xq = this.dataper.xq;
        this.entrance.jdtype = this.dataper.jdtype
        this.entrance.graduation = this.dataper.graduation
        this.entrance.xz = this.dataper.xz
        this.form.ispoor = this.dataper.ispoor;

        this.form.pcs = this.dataper.pcs
        this.form.zipcode = this.dataper.zipcode

    })
  },
  mounted() {
    let _this = this;
    userApi.getFileUploadUrl().then(r=>{
      _this.uploadUrl = r
    })
    setInterval(function(){ userApi.getFileUploadUrl().then(r=>{
        _this.uploadUrl = r
      })
    }, 240000);
  },
  computed: {},
  methods: {
    get_pid(val){
      if(val){
        this.entrance.proid = val[val.length-1];
        this.get_proid_xzb();
      }
    },
    get_proid_xzb(){
        api.get_executive({'pageNo':1,'pageSize':-1,'proid':this.entrance.proid,}).then(r => {
          this.def_form.xzb = r.data.data.list;
        });
    },
    handleRemove(file, fileList) {
      let _this = this
      this.form.imageUrl.map(function(item,index){
        if(item.name == file.name){
          _this.form.imageUrl.splice(index,1)
        }
      })
    },
    handlePreview(file) {
      console.log(file);
    },
    handlesuccess(r, file, fileList){
      console.log(r, file, fileList);
      this.form.imageUrl.push({"fid":r.data.id,"name":file.name})
    },
    next(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.type +=1;
        } else {
          return false;
        }
      });
    },
    pre(){
      this.type -=1
    },
    savePhoto(){
      this.avataruploaders = false;
    },
    success(r, file) {
      this.form.photo = r.data.name;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    avataruploader(){
      this.avataruploaders = true; 
    },
    avataruploadagain(){
      this.imageUrl =""
    },
    back(){
      this.$router.go(-1)
    },
   
    //提交
    submitforms(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          let obj = Object.assign({}, this.form, this.source, this.entrance);
          api.refined_infor(qs.stringify(obj)).then(r => {
            if (r) {
              this.$message({
                message: r.data.meta.message,
                type: "success",
                duration:'800'
              });
            } 
          })
        } else {
          this.$message({
            message: "请完善信息",
            type: "error",
            duration:'800'
          });
          return false;
        }
      });
    }
  },
  watch: {}
};
</script>
<style scoped type="text/css" lang="scss">
.avatar{
  text-align:center;
}
.avatar-uploader{
  margin-bottom:18px;
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
.personal {
  text-align: center;
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
.magessBox {
  width: 1200px;
  margin: 0 auto 80px;
  padding-top: 20px;
  padding-bottom: 1px;
  background-color: #fff;
}
.uesrname span {
  font-size: 14px;
  color: #262626;
}
.personalbox {
  width: 400px;
  margin: 20px auto;
  text-align: left;
}
.personalbox  .el-select{
    width: 100%;
  }
.personalbox .el-date-editor.el-input{
    width: 100% !important;
} 

</style>
