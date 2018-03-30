<template>
  <div class="teacherRegistration">
    <nav-top></nav-top>
    <p class="log-magess"><span class="arrow-center left" >注册信息</span><span class="arrow-right" @click="router">返回<i class="el-icon-arrow-right"></i></span></p>
    <div class="magessBox">
      <!-- <avatar-Mock @services-change="servicesChange"></avatar-Mock> -->
      <div class="avatar-uploader">
            <div class="avatar-uploader-size-img" @click="avataruploader">
              <img style="width: 80px;border-radius: 50%; cursor: pointer;" v-if="imageUrl" :src="imageUrl" class="avatars">
              <span v-else ><img src="../../assets/image/headportrait.png"/></span>
            </div>
            <el-dialog
              :visible.sync="avataruploaders"
              size="tiny">
              
                <div slot="title" style="float:left;" >
                    <p style="font-size:16px;" >头像设置</p>
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
                  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                  <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
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
      <div class="formbox">
        <el-form ref="form" :model="form" :rules="rules1" label-width="90px">
          <el-form-item label="部门:" prop="deptids" :rules="[{required: true, message: '填写部门'}]"  >
            <div class="block">
              <!-- <span class="demonstration">可选择任意一级菜单的选项</span> -->
              <el-cascader
                placeholder="选择部门"
                :options="orgTree1"
                filterable
                v-model="form.deptids"
                size="medium"
                :show-all-levels="false"
                :props="propso"
                change-on-select
              ></el-cascader>
            </div>
          </el-form-item>
          <el-form-item label="岗位:" prop="position" :rules="[{required: true, message: '请选择身份'}]" >
                <el-select clearable v-model="form.position" placeholder="">
                  <el-option v-for="items in positions" :key="items.id" :label="items.name" :value="items.id"></el-option>
                </el-select>
              </el-form-item>
          <el-form-item prop="name" label="姓名:">
            <el-input v-model="form.name" placeholder="教职工姓名"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="工号:">
            <el-input v-model="form.no" placeholder="教职工工号"></el-input>
          </el-form-item>
          <el-form-item prop="cellphone" label="手机号:">
            <el-input v-model="form.cellphone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="identity" label="身份证号:">
            <el-input v-model="form.identity" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio class="radio" v-model="form.radio" label="1">男</el-radio>
            <el-radio class="radio" v-model="form.radio" label="2">女</el-radio>
          </el-form-item>
          <el-form-item prop="email" label="电子邮箱:">
            <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="education" label="选择学历:">
            <el-select v-model="form.education" placeholder="选择学历">
              <el-option v-for="(item,index) in form2.education" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="professional" label="选择职称:">
            <el-select v-model="form.professional" placeholder="选择职称">
              <el-option v-for="(item,index) in form2.professional" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="professional" label="职工分类:">
            <el-select v-model="form.teatype" placeholder="职工分类">
              <el-option v-for="(item,index) in form2.teatype" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="" label="选择身份:" prop="statuschecked" :rules="{  type: 'array', required: true, message: '请至少选择一个身份', trigger: 'change' }">
            <el-checkbox-group class="indetatr" v-model="form.statuschecked" @change="handleCheckedCitiesChange">
              <ul class="dialog-ul clear">
                <li v-for="r in form2.roles">
                  <el-checkbox :label="r.id" :value="r.id" name="type">{{r.name}}</el-checkbox>
                </li>
              </ul>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <div v-if="rolefdy" class="classes-table">
              行政班信息：
              <div v-for="(item, index) in clazz">
                <el-form  ref="ruleForm">
                  <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="4">
                      <el-form-item prop="">
                        <div class="block">
                            <!-- <span class="demonstration">可选择任意一级菜单的选项</span> -->
                            <el-cascader
                              placeholder="选择专业"
                             
                              @change="findXzb(index, '1')"
                              v-model="item.proids"
                              :options="orgTree"
                              filterable
                              size="medium"
                              :show-all-levels="false"
                              :props="propso"
                              change-on-select
                            ></el-cascader>
                          </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item prop="">
                        <el-select v-model="item.clazzid" multiple placeholder="班级">
                          <el-option v-for="items in item.clazzs" :key="items.clazzid" :label="items.clazzname" :value="items.clazzid"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div class="clear margin-top-5">
                  <img class="right" @click="deleteclasswork(item)" src="../../assets/image/deletemessages.png" />
                </div>
              </div>
              <div class="clear margin-top-5">
                <img class="right" @click="addclasswork" src="../../assets/image/addclass.png" />
              </div>
            </div>
          </el-form-item>
  
          <el-form-item prop="setpassword" label="设置密码:">
            <el-input v-model="form.setpassword" placeholder="设置密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="primarybutton" type="primary" :loading="loading" @click="submitform($event,'form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import navTop from '../../components/navigationres'
import avatarMock from '../../components/avatar'
import api from '../../apis/login.js'
import userApi from '../../apis/userCenter.js'
import validate from "../../validate"
import u from '../../apis/commonFile.js'//commonFile

export default {
  name: 'teacherRegistration',
  data() {
    return {
      filedatat:{ 
        entity:'User',
        type:'photo',
        filename:'',
        delflag:'1', //头像只能有一个
        bid:''
      },
      loading: false,
      addclasseswork: 1,
      courseindex: 1,
      avataruploaders:false,
      uploadUrl:'',
      imageUrl:'',
      positions:[], //岗位
      orgTree:[], //机构数据
      orgTree1:[], //机构数据
      propso:{label:'label',value:'id',children:'children'},
      form: {
        campus: "",
        dept: "",
        deptids: "",
        pro: "",
        name: '',
        position: '', //职位
        no: '', //工号
        teatype: '',
        cellphone: '',    //手机号
        identity: '',     //身份证号码
        radio: "1",        //性别
        email: "",         //邮箱
        education: '',     //学历
        professional: "",  //职称
        statuschecked: [], //身份
        setpassword: '',    //设置密码
        file: ""
      },
      form2: {             //公共数据 
        campus: [],        //校区
        education: [],     //学历
        professional: [],  //职称
        depts: [],  //职称
        pros: [],  //职称
        statuschecked: "", //身份
        timeofenrollment: "",
        choosecollege: "",
        chooseamajor: "",
        course: "",
        selecttheclass: "",
        teatype: "",  //职工类型
        roles: [],
      },
      clazz: [                     //班主任班级数
        {
          sid: '',         //校区     
          gradeid: '',   //学年
          deptid: '',       //学院
          proid: '',       //专业
          proids: [],       //专业
          // subject:"",            //学科
          clazzid: "",      //班级
          grades: [],      //年级
          pros: [],      //专业
          depts: [],      //院系
          ss: [],      //分校
          clazzs: [],      //班级
        },
      ],
      course: [                     //班主任班级数
        {
          sid: '',         //校区     
          gradeid: '',   //学年
          deptid: '',       //学院
          proid: '',       //专业
          subjectid: "",            //学科
          clazzid: "",      //班级
          grades: [],      //年级
          pros: [],      //专业
          depts: [],      //院系
          ss: [],      //分校
          clazzs: [],      //班级
        },
      ],
      grades: [],      //年级
      subjects: [],      //学科
      ss: [],      //分校
      formworkconfirm: [],
      rules1: {        //表单验证
        campus: [{ required: true, message: '请选择校区', trigger: 'change' }],
        dept: [{ required: true, message: '请选择院系部门', trigger: 'change' }],
        // pro: [{ required: true, message: '请选择专业', trigger: 'change' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        cellphone: [{ required: true, validator: validate.phonevalidate, trigger: 'blur' }],
        identity: [{ required: true, validator: validate.identityvalidate, trigger: 'blur' }],
        email: [{ required: true, validator: validate.emailx, trigger: 'blur' }],
        education: [{ required: true, message: '请选择学历', trigger: 'change' }],
        professional: [{ required: true, message: '请选择职称', trigger: 'change' }],
        teatype: [{ required: true, message: '请选择职工分类', trigger: 'change' }],
        setpassword: [{ required: true, validator: validate.passwords, trigger: 'blur' }],
      },
      rolefdy: false,
      roletea: false,
    }
  },
  components: {
    navTop,
    avatarMock,
  },
  created() {
    let parms = {
      id: 1,
      type: 4
    }
    api.querycampus(parms).then(data => {                //查询校区
      this.form2.campus = data.data.data
    })
    api.teacherRegistration().then(data => {
      this.form2.education = data.data.data.education
      this.form2.teatype = data.data.data.teatype
      this.form2.professional = data.data.data.positional
      this.form2.statuschecked = data.data.data.roles
    })
    api.timeofenrollment().then(data => {
      this.form2.timeofenrollment = data.data.data
    })
  },
  mounted() {
    this.findAllRole();
    this.findAllCourse();
    this.findAllGrade();
    this.findClazzOffice(1, 4, 0);
    let _this = this;
    _this.uploadUrl = u.getCommonUploadUrl();
    setInterval(function(){_this.uploadUrl = u.getCommonUploadUrl();}, 4 * 60000);
    let pp = {pageNo:1, pageSize:-1};
    userApi.findPosition(pp).then(data => {  //初始化机构树
      this.positions = data.data.data.list;
    });
    let params = {xz:'1', top:'1'};
    userApi.findOrgTree(params).then(data => {  //初始化机构树
      this.orgTree = data.data.data;
    });
    let params1 = {xz:'2', top:'1'};
    userApi.findOrgTree(params1).then(data => {  //初始化机构树
      this.orgTree1 = data.data.data;
    });
  },
  computed: {

  },
  methods: {
    savePhoto(){
      this.avataruploaders = false;
    },
    success(r, file) {
      console.log(r,file)
      this.form.file = r.data.name;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeupload_p(file){
      console.log(file)
      // this.$emit('services-change',file)
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
    findAllGrade(index) {
      userApi.findAllGrade().then(r => {
        this.grades = r.data.data;
      });
    },
    findAllCourse(index) {
      userApi.findAllCourse().then(r => {
        this.subjects = r.data.data;
      });
    },
    findXzb(index, flag, clear) {  //查询行政班
      let proid = this.clazz[index].proid;
      let proids = this.clazz[index].proids;
      // let gradeid = this.clazzOffice[index].proids;
      if (flag) {
        proid = proids[proids.length - 1];
      }
      if (clear) {
        this.clazz[index].clazzid = [];
      }
      if (proid) {
        let params = {
            pageNo: 1,
            pageSize: -1,
            // gradeid: this.clazzOffice[index].gradeid,
            proid: proid
        };
        userApi.findCommonXzb(params).then(r => {
          this.clazz[index].clazzs = r.data.data.list;
        });
      }
    },
    findClazzByPro(proid, gradeid, index) {
      if (proid) {
        let params = { proid: proid, gradeid: gradeid };
        console.log(params);
        userApi.findClazzByPro(params).then(r => {
          this.clazz[index].clazzs = r.data.data;
        });
      }
    },
    findCourseClazzByPro(proid, gradeid, index) {
      if (proid) {
        let params = { proid: proid, gradeid: gradeid };
        console.log(params);
        userApi.findClazzByPro(params).then(r => {
          this.course[index].clazzs = r.data.data;
        });
      }
    },
    findClazzOffice(id, type, index) {  //班主任级联
      let params = {
        id: id,
        type: type
      };
      userApi.findOffice(params).then(data => {
        let list = data.data.data;
        console.log(list);
        if (type == '2') {
          this.clazz[index].depts = list;
          this.clazz[index].pros = [];
          this.clazz[index].proid = '';
          this.clazz[index].deptid = '';
        } else if (type == '3') {
          this.clazz[index].pros = list;
          this.clazz[index].proid = '';
        } else if (type == '4') {
          this.ss = list;
        }
      });
    },
    findCourseOffice(id, type, index) {  //授课教师级联
      let params = {
        id: id,
        type: type
      };
      userApi.findOffice(params).then(data => {
        let list = data.data.data;
        console.log(list);
        if (type == '2') {
          this.course[index].depts = list;
          this.course[index].pros = [];
          this.course[index].proid = '';
          this.course[index].deptid = '';
        } else if (type == '3') {
          this.course[index].pros = list;
          this.course[index].proid = '';
        } else if (type == '4') {
          this.ss = list;
        }
      });
    },
    findOffice(id, type) {
      let params = {
        id: id,
        type: type
      };
      userApi.findOffice(params).then(data => {
        let list = data.data.data;
        console.log(list);
        if (type == '2') {
          this.form2.depts = list;
          this.form2.pros = [];
          this.form.pro = '';
          this.form.dept = '';
        } else if (type == '3') {
          this.form2.pros = list;
          this.form.pro = '';
        } else if (type == '4') {
          if (list && list.length > 0) {
            this.form2.campus = list;
            this.form2.depts = [];
            this.form.dept = '';
            this.form2.pros = [];
            this.form.pro = '';
          } else {
            findOffice('1', '2');
          }
        }
      });
    },
    findAllRole() {
      userApi.findAllCommonRole().then(data => { //查找所有角色'
        console.log(data);
        this.form2.roles = data.data.data;
      });
    },
    // servicesChange(data) {       //上传照片
    //   this.form.file = data.file;
    // },
    // 班主任
    addclasswork() {
      this.addclasseswork = this.addclasseswork + 1;
      this.clazz.push({
        sid: '',         //校区     
        gradeid: '',   //学年
        deptid: '',       //学院
        proid: '',       //专业
        proids: [],       //专业
        clazzid: [],      //班级
        pros: [],      //专业
        depts: [],      //院系
        clazzs: [],      //班级
      });
    },
    // 授课教师
    addcoursework() {
      this.courseindex = this.courseindex + 1;
      this.course.push({
        sid: '',         //校区     
        gradeid: '',   //学年
        deptid: '',       //学院
        proid: '',       //专业
        subjectid: '',      //学科
        clazzid: [],      //班级
        pros: [],      //专业
        depts: [],      //院系
        clazzs: [],      //班级
      });
    },
    deleteclasswork(item) {
      if (this.addclasseswork >= 2) {
        this.addclasseswork = this.addclasseswork - 1;
      } else {
        return
      }
      this.clazz.splice(item - 1, 1)
    },
    deletecoursework(item) {
      if (this.courseindex >= 2) {
        this.courseindex = this.courseindex - 1;
      } else {
        return
      }
      this.course.splice(item - 1, 1)
    },
    handleCheckedCitiesChange(event) {
      let role = this.form.statuschecked;
      this.statuschecked = event;
      console.log(role);
      let fdy = true;
      let tea = true;
      if (role && role.length > 0) {
        for (let i = 0; i < role.length; i++) {
          if (role[i] == 'd8d5d943f9284377af2960c6f9bae1f0') {  //辅导员
            this.rolefdy = true;
            fdy = false;
          } else if (role[i] == 'a96a76567d60459d8267863de9ed3506') { //授课教师
            this.roletea = true;
            tea = false;
          }
        }
      }
      if (fdy) {
        this.rolefdy = false;
      }
      if (tea) {
        this.roletea = false;
      }
    },
    //提交
    submitform: function (event, formname) {
      let clazz = '';
      if (this.rolefdy) {  //如果是辅导员角色
        let t = this.clazz;
        if (t && t.length > 0) {
          for (let i = 0; i < t.length; i++) {
            let tc = t[i];
            if (tc.clazzid && tc.clazzid.length > 0) {
              for (let j = 0; j < tc.clazzid.length; j++) {
                if (tc.clazzid[j]) {
                  clazz = clazz + tc.clazzid[j] + ",";
                }
              }
            }
          }
        }
      };
      let course = '';
      // if (this.roletea) { //如果是授课教师角色
      //   let t = this.course;
      //   if (t && t.length > 0) {
      //     for (let i = 0; i < t.length; i++) {
      //       let tc = t[i];
      //       if (tc.subjectid && tc.clazzid && tc.clazzid.length > 0) {
      //         for (let j = 0; j < tc.clazzid.length; j++) {
      //           if (tc.clazzid[j]) {
      //             course = course + tc.clazzid[j] + "^" + tc.subjectid + ",";
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      // console.log(clazz);
      // console.log(course);
      // return;
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.loading = true;
          let formdata = new FormData()
          let deptid = this.form.deptids[this.form.deptids.length-1]
          formdata.append('name', this.form.name);
          formdata.append('mobile', this.form.cellphone);
          formdata.append('idcard', this.form.identity);
          formdata.append('sex', this.form.radio);
          formdata.append('email', this.form.email);
          formdata.append('education', this.form.education);
          formdata.append('positional', this.form.professional);
          formdata.append('roles', this.form.statuschecked);
          formdata.append('password', this.form.setpassword);
          formdata.append('userType', '2');
          formdata.append('teatype', this.form.teatype);
          formdata.append('photo', this.form.file);
          formdata.append('clazzs', clazz);
          formdata.append('no', this.form.no);
          formdata.append('position', this.form.position);
          // formdata.append('courses', course);
          // formdata.append('scoms.id', this.form.campus);
          formdata.append('deptid', deptid);
          // formdata.append('pro.id', this.form.pro);
          api.teacherSave(formdata).then(data => {
            this.loading = false
            if (data) {
              this.$message({
                showClose: true,
                message: data.data.meta.message,
                type: 'success'
              });
              this.$router.push('/')
            } else {
              this.loading = false;
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
    }
  },
  updated() {

  },
  directives: {

  },
  watch: {

  }
}

</script>
<style scoped>
.teacherRegistration {
  text-align:left;
}

.log-magess {
  margin: 0 auto;
  height: 50px;
  width: 1200px;
  color: #000;
  font-size: 16px;
  text-align:center;
}



.magessBox {
  width: 1200px;
  margin: 0 auto 20px;
  padding-top: 20px;
  padding-bottom: 1px;
  background-color: #fff;
}

.avatar-uploader {
  margin-bottom: 18px;
  text-align: center;
}

.el-icon-plus:before {
  content: "";
}

.formbox {
  margin: 0 auto;
  width: 300px;
}

.primarybutton {
  width: 100%
}

.indetatr {
  width: 324px;
}

.btn-text {
  margin-left: 5px;
  text-decoration: underline;
}

.Class-teacher {
  position: relative;
  width: 682px;
  left: -230px;
}

.Class-teacher .el-col-6 {
  padding: 0 11px;
}

.lineup {
  height: 40px;
}

.addclasses-cpm {
  display: inline-block;
  float: left;
}

.addclasses-cpm p {
  display: inline-block;
  margin-left: 10px;
}

.classes-table {
  position: relative;
  width: 800px;
  left: -290px;
  text-align: left;
}

.magessBox .el-select {
  width: 100%;
}

.margin-top-5 {
  margin-top: 5px;
  margin-bottom: 5px;
}

.margin-top-5 img {
  cursor: pointer;
}

.el-button--primary {
  background-color: #208af5;
  border-color: #208af5;
}

.dialog-ul {
  margin-top: 40px;
  width: 540px;
}

.dialog-ul li {
  float: left;
  width: 33.3%;
  text-align: left;
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
</style>
<style>
.classes-table .el-table .cell,
.el-table th>div {
  padding-right: 0;
}
</style>