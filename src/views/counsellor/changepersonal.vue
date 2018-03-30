<template>
  <div class="changepersonal">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >个人信息</span><span class="arrow-right" @click="router">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
         <div class="avatar">
          <div class="avatar-uploader">
              <div class="avatar-uploader-size-img" @click="avataruploader" >
                <img style="width: 80px;border-radius: 50%; cursor: pointer;" v-if="imageUrl !== ''" :src="imageUrl" class="avatars">
                <span v-if="imageUrl == ''" ><img src="../../assets/image/headportrait.png"/></span>
              </div>
          </div>
          <el-dialog :visible.sync="avataruploaders"  width="30%">
            <div slot="title"  > 
                <p style="font-size:16px;"  >头像设置</p>
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
                <img v-if="imageUrl !== ''" :src="imageUrl" class="avatar">
                <span  ><img v-if="imageUrl == ''" src="../../assets/image/avatarupload.png"/></span>
              </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="savePhoto">保存头像</el-button>
              <el-button @click="avataruploadagain">重新上传</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="uesrname"><span>{{user.name}}</span><i><img v-if="user.sex == '2'" src="../../assets/image/sex-nv.png"/><img v-if="user.sex == '1'" src="../../assets/image/sex-nan.png"/></i></div>
         <div class="formbox">
                <el-form :label-position="labelPosition" label-width="82px" ref="form" :model="form" >
                  <el-form-item label="手机号:" >
                      <div>{{user.mobile}}</div>
                  </el-form-item >
                  <el-form-item label="身份证号:">
                      <div>{{user.idcard}}</div>
                  </el-form-item>
                  <el-form-item label="电子邮箱:">
                      <div>{{user.email}}</div>
                  </el-form-item>
                  <el-form-item label="性别:" >
                    <el-radio v-for="(s,index) in sex" class="radio" v-model="user.sex"  :label="s.value" :key="index">{{s.label}}</el-radio>
                  </el-form-item>
                  <el-form-item label="个人学历:" >
                    <el-select v-model="user.education" >
                      <el-option v-for="e in education"
                        :key="e.value"
                        :label="e.label"
                        :value="e.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="个人职称:" >
                    <el-select  v-model="user.positional" >
                    <el-option v-for="e in positional"
                        :key="e.value"
                        :label="e.label"
                        :value="e.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  
                  <el-form-item class="shengfen" label="选择身份:" prop="statuschecked">
                    <el-checkbox-group class="indetatr" v-model="user.proleList" @change="handleCheckedCitiesChange">
                      <ul class="dialog-ul clear">
                        <li v-for="(r,index) in roles" :key="index">
                          <el-checkbox :label="r.id" :value="r.id" name="type">{{r.name}}</el-checkbox>
                        </li>
                      </ul>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item v-if="rolefdy"  >
                  <div  class="classes-table">
                    <div>班级信息:</div>
                    <div v-for="(item, index) in clazzOffice" :key="index" >
                      <el-form >
                        <el-row type="flex" class="row-bg" justify="space-between"  >
                          <el-col :span="4">
                            <el-form-item prop="" >
                              <div >
                              <el-select @change="findClazzOffice(item.sid, '2', index)"  v-model="item.sid"  placeholder="校区">
                                <el-option v-for="items in ss" :key="items.id" :label="items.name" :value="items.id"></el-option>
                              </el-select>
                              </div>
                            </el-form-item>
                          </el-col>
                          <el-col :span="4">
                            <el-form-item prop="" >
                              <div >
                              <el-select @change="findClazzOffice(item.deptid, '3', index)"  v-model="item.deptid" placeholder="学院">
                                <el-option v-for="items in item.deptList" :key="items.id" :label="items.name" :value="items.id"></el-option>
                              </el-select>
                              </div>
                            </el-form-item>
                          </el-col>
                          <el-col :span="4">
                            <el-form-item prop="" >
                              <div>
                              <el-select @change="findClazz(index)"  v-model="item.proid" placeholder="专业">
                                <el-option v-for="items in item.proList" :key="items.id" :label="items.name" :value="items.id"></el-option>
                              </el-select>
                              </div>
                            </el-form-item>
                          </el-col>
                          <el-col :span="4">
                            <el-form-item prop="" >
                              <div>
                              <el-select @change="findClazz(index)"  v-model="item.gradeid" placeholder="年级">
                                <el-option v-for="items in grades" :key="items.id" :label="items.name" :value="items.id"></el-option>
                              </el-select>
                              </div>
                            </el-form-item>
                          </el-col>
                          <el-col :span="5">
                            <el-form-item prop="" >
                              <div >
                              <el-select  v-model="item.clazzid" placeholder="班级" multiple >
                                <el-option v-for="items in item.clazzList" :key="items.clazzid" :label="items.clazzname" :value="items.clazzid"></el-option>
                              </el-select>
                              </div>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-form>
                      <div class="clear margin-top-5"><img class="right" @click="deleteclasswork(index)" src="../../assets/image/deletemessages.png" /></div>
                    </div>
                    <div class="clear margin-top-5"><img class="right" @click="addclasswork" src="../../assets/image/addclass.png" /></div>
                  </div>
                </el-form-item>
                <!-- <el-form-item v-if="roletea"  >
                  <div class="classes-table" >
                    <div>授课信息:</div>
                    <div v-for="(item, index) in course" :key="index" > 
                      <el-form :model="item" ref="ruleForm" >
                        <el-row   type="flex" class="row-bg" justify="space-between"  >
                          <el-col :span="3">
                            <el-form-item prop="" >
                              <el-select @change="findCourseOffice(item.sid, '2', index)" v-model="item.sid" placeholder="校区">
                                <el-option v-for="items in ss" :key="items.id" :label="items.name" :value="items.id"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="3">
                            <el-form-item prop="" >
                              <el-select @change="findCourseClazzByPro(index)" v-model="item.gradeid" placeholder="年级">
                                <el-option v-for="(items) in grades" :key="items.id" :label="items.name" :value="items.id"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="3">
                            <el-form-item prop="" >
                              <el-select @change="findCourseOffice(item.deptid, '3', index)" v-model="item.deptid" placeholder="院系">
                                <el-option v-for="items in item.depts" :key="items.id" :label="items.name" :value="items.id"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="3">
                            <el-form-item prop="" >
                              <el-select @change="findCourseClazzByPro(index)" v-model="item.proid" placeholder="专业">
                                <el-option v-for="items in item.pros" :key="items.id" :label="items.name" :value="items.id"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="3">
                            <el-form-item prop="" >
                              <el-select  v-model="item.subjectid" placeholder="学科">
                                <el-option v-for="items in subjects" :key="items.id" :label="items.SubjectName" :value="items.id"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="5">
                            <el-form-item prop="" >
                              <el-select v-model="item.clazzid" multiple placeholder="班级">
                                <el-option v-for="items in item.clazzs" :key="items.clazzid" :label="items.clazzname" :value="items.clazzid"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-form>    
                      <div class="clear margin-top-5" ><img class="right"  @click="deletecoursework(index)" src="../../assets/image/deletemessages.png" /></div>
                    </div>
                    <div class="clear margin-top-5"><img class="right" @click="addcoursework" src="../../assets/image/addclass.png" /></div>
                  </div>
                </el-form-item> -->
                  <el-form-item label="劳动合同:" >
                    <div style="width:350px">
                      <el-upload
                        accept=".jpg,.png,.jpeg"
                        :action="uploadUrl"
                        :data="filedata"
                        list-type="picture-card"
                        :file-list="fileList"
                        :on-remove="remove" 
                        :on-success="uploadCallBack" 
							          :before-upload="beforeupload_l">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog v-model="dialogVisible" width="30%">
                        <img width="100%" v-for="(t,index) in ldht"  :key="index" :src="t" alt="">
                      </el-dialog>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="primarybutton" type="primary" @click="modifyUser"  :loading='loading'>提交</el-button>
                  </el-form-item>
                </el-form>
        </div>
      </div>

  </div>
</template>

<script>
import navTop from "../common/header";
import avatarMock from '../../components/avatar' 
import userApi from '../../apis/userCenter.js'
import dictApi from '../../apis/dict.js' 
export default {
  name: 'changepersonal',
  data() {
    return {
      loading:false,
      imageUrl:'',
      avataruploaders: false,
      fileid:'',
      filedatat:{ 
        entity:'User',
        type:'photo',
        filename:'',
        delflag:'1', //头像只能有一个
        bid:''
      },
      fileList: [],
      dialogImageUrl: '../../assets/image/deletemessages.png',
      dialogVisible: false,
      labelPosition:'right',
      uploadUrl:'',
      filedata:{
        entity:"User",
        type:"ldht",
        filename:"",
        bid:'',
      },
      form:{
        campus:"",
        name: '',
        sex: '',    //性别
        cellphone: '',    //手机号
        identity: '',     //身份证号码
        radio:"1",        //性别
        email:"",         //邮箱
        education:'',     //学历
        positional:"",  //职称
        statuschecked:[         //身份

        ],      
        setpassword:'',    //设置密码
        id:"",
      },
      form2:{
        campus:"",
        name: '',
        cellphone: '',    //手机号
        identity: '',     //身份证号码
        radio:"1",        //性别
        email:"",         //邮箱
        education:'',     //学历
        professional:"",  //职称
        statuschecked:[         //身份

        ],      
        setpassword:''    //设置密码
      },
      
      education: '',  //学历
      positional: '', //职称
      clazz: '',  //班级
      course: '', //学科
      role: '', //身份
      sex: '', //身份
      offices: {  //
        scoms:[],
        year:[],
        dept:[],
        pro:[],
        clazz:[]
      },
      photo:'',
      ldht:[],
      clazzOffice: [
        {
          sid: "",
          deptid: "",
          proid: "",
          year: "",
          gradeid: "",
          clazzid: [],
          sList: [],
          deptList: [],
          proList: [],
          clazzList: []
        }
      ],
      course: [
        //班主任班级数
        {
          sid: "", //校区
          gradeid: "", //学年
          deptid: "", //学院
          proid: "", //专业
          subjectid: "", //学科
          clazzid: "", //班级
          grades: [], //年级
          pros: [], //专业
          depts: [], //院系
          ss: [], //分校
          clazzs: [] //班级
        }
      ],
      user: {
        //添加教职工
        id: "",
        name: "",
        mobile: "", //手机号
        photo: "", //手机号
        idcard: "", //身份证号码
        sex: "1", //性别
        email: "", //邮箱
        education: "", //学历
        positional: "", //职称
        scoms: "", //校区
        proid: "", //专业id
        deptid: "", //学院id
        sid: "", //校区id
        strrole: "", //角色
        strclazz: "", //班级
        strcourse: "", //授课
        roles: [],
        proleList: [],
        clazzList: [],
        clazzs: [],
        courseList: [],
        sourses: [],
        sList: [],
        deptList: [],
        proList: [],
        clazzPro: {}
      },
      rolefdy: false,
      roletea: false,
      grades: [], //年级
      subjects: [], //学科
      ss: [], //分校
      roles: [], //分校，
    }
    },
    components:{
      navTop,
      avatarMock,
    },
    created(){

    },
    mounted(){
      this.getCurrentUser();
      this.findAllCourse();
      this.findAllGrade();
      this.getDictMapList("education");
      this.getDictMapList("tea_positional");
      this.getDictMapList("sex");
      userApi.findOffice({id:"1", type:'4'}).then(r=>{
        this.ss = r.data.data;
      });
      let _this = this;
      userApi.getFileUploadUrl().then(r=>{
        _this.uploadUrl = r
      })
      setInterval(function(){ userApi.getFileUploadUrl().then(r=>{
          _this.uploadUrl = r
          console.log('222')
        })
      }, 240000);
      userApi.findAllRole().then(data => {
        this.roles = data.data.data;
      });
    },
    computed:{
      
    },
    methods: {
      savePhoto(){
        this.avataruploaders = false;
      },
      success(r, file) {
        console.log(r,file)
        this.user.photo = r.data.name;
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeupload_l(file){
        console.log(file)
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
      findClazz(index) {
        //查找班级
        if (this.clazzOffice[index].gradeid && this.clazzOffice[index].proid) {
          let params = {
            gradeid: this.clazzOffice[index].gradeid,
            proid: this.clazzOffice[index].proid
          };
          // console.log(params);
          userApi.findClazzByPro(params).then(r => {
            this.clazzOffice[index].clazzList = r.data.data;
          });
        }
      },
      deleteclasswork(index) {
        this.clazzOffice.splice(index, 1);
      },
      addclasswork() {
        let p = {
          sid: "",
          deptid: "",
          proid: "",
          gradeid: "",
          clazzid: [],
          deptList: [],
          proList: [],
          clazzList: []
        };
        this.clazzOffice.push(p);
      },
      // 授课教师
    addcoursework() {
      this.course.push({
          sid: "", //校区
          gradeid: "", //学年
          deptid: "", //学院
          proid: "", //专业
          // subject:"",            //学科
          subjectid: "", //学科
          clazzid: [], //班级
          pros: [], //专业
          depts: [], //院系
          clazzs: [] //班级
        });
      },
      deletecoursework(index) {
        this.course.splice(index, 1);
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
      findCourseClazzByPro(index) {
        if (this.course[index].proid && this.course[index].gradeid) {
          let params = {
            proid: this.course[index].proid,
            gradeid: this.course[index].gradeid
          };
          // console.log(params);
          userApi.findClazzByPro(params).then(r => {
            this.course[index].clazzs = r.data.data;
          });
        }
      },
      findCourseOffice(id, type, index) {
        //授课教师级联
        let params = {
          id: id,
          type: type
        };
        userApi.findOffice(params).then(data => {
          let list = data.data.data;
          // console.log(list);
          if (type == "2") {
            this.course[index].depts = list;
            this.course[index].pros = [];
            this.course[index].proid = "";
            this.course[index].deptid = "";
          } else if (type == "3") {
            this.course[index].pros = list;
            this.course[index].proid = "";
          } else if (type == "4") {
            this.ss = list;
          }
        });
      },
      handleCheckedCitiesChange() {
        let role = this.user.proleList;
        // console.log(role);
        let fdy = true;
        let tea = true;
        if (role && role.length > 0) {
          for (let i = 0; i < role.length; i++) {
            if (role[i] == "d8d5d943f9284377af2960c6f9bae1f0") {
              //辅导员
              this.rolefdy = true;
              fdy = false;
            } else if (role[i] == "a96a76567d60459d8267863de9ed3506") {
              //授课教师
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
      findCourseOffice(id, type, index) {
        //授课教师级联
        let params = {
          id: id,
          type: type
        };
        userApi.findOffice(params).then(data => {
          let list = data.data.data;
          // console.log(list);
          if (type == "2") {
            this.course[index].depts = list;
            this.course[index].pros = [];
            this.course[index].proid = "";
            this.course[index].deptid = "";
          } else if (type == "3") {
            this.course[index].pros = list;
            this.course[index].proid = "";
          } else if (type == "4") {
            this.ss = list;
          }
        });
      },
      findClazzOffice(id, type, index) {
        //添加教职工学院信息
        let params = {
          id: id,
          type: type
        };
        userApi.findOffice(params).then(data => {
          let list = data.data.data;
          if (type == "2") {
            this.clazzOffice[index].deptList = list;
            if (this.clazzSelect) {
              this.clazzOffice[index].proList = [];
              this.clazzOffice[index].deptid = "";
              this.clazzOffice[index].proid = "";
            }
          } else if (type == "3") {
            this.clazzOffice[index].proList = list;
            if (this.clazzSelect) {
              this.clazzOffice[index].proid = "";
            }
          } else if (type == "4") {
            this.clazzOffice[index].sList = list;
          }
        });
      },
      findFileByEntityAndBid(id) {
        let params = {bid:id, entity:"User"}
        userApi.findFileByEntityAndBid(params).then(r=>{
          let data = r.data.data;
          let ldht = data.ldht;
          if (ldht) {
            for (let i = 0; i < ldht.length; i ++) {
              userApi.getFileDownloadUrl(ldht[i].id).then(r=>{
                this.fileList.push({url:r, name:ldht[i].oldname, id:ldht[i].id});
              })
            }
          }
        });
      },
      before(file) {
        this.filedata.filename = file.name;
        return true;
		  },
      remove(file, fileList) {  //合同
        if (file && file.id) {
          let params = new FormData();
          params.append("fileid", file.id);
          userApi.deleteFile(params).then(r=>{
            let meta = r.data.meta;
            userApi.showMsg(meta);
          });
        }
        // console.log(file, fileList);
      },
      uploadCallBack(r, file, filelist) {
        // console.log(r);
        // let p = {fileid:r.data[0].id, uid:file.uid};
        // this.fileid.push(p);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getDictMapList(type) {
        // console.log(type);
        let params = {type : type};
        let data = '';
        dictApi.apiGetDictMapList(params).then(response => {
          // console.log("调用字典接口")
          data = response.data.data;
          // console.log(data);
          if (type == "education") {
            this.education = data;
          } else if (type == "tea_positional") {
            this.positional = data;
          } else if (type == "sex") {
            this.sex = data;
          }
        });
      },
      getCurrentUser() {  //获取当前登录用户
        let params = '';

        userApi.viewUser(params).then(r => {
          let user = r.data.data;
          console.log(user);
          if(user.photo == "" || user.photo == null){
            this.imageUrl="";
          }else{
            this.imageUrl = userApi.getCommonShowUrl(user.photo);
          }
          this.user.photo = user.photo
          this.findFileByEntityAndBid(user.id);
          this.filedata.bid = user.id;
          this.filedatat.bid = user.id;
          this.user.id = user.id;
          this.user.education = user.education;
          this.user.educationname = user.educationname;
          this.user.mobile = user.mobile;
          this.user.idcard = user.idcard;
          this.user.email = user.email;
          this.user.name = user.name;
          this.user.sList = [];
          this.user.deptList = [];
          this.user.proList = [];
          this.user.sid = user.sid;
          this.user.scoms = user.scoms;
          this.user.deptid = user.deptid;
          this.user.dept = user.dept;
          this.user.proid = user.proid;
          this.user.pro = user.pro;
          this.user.sex = user.sex;
          this.user.sexname = user.sexname;
          this.user.positional = user.positional;
          this.user.positionalname = user.positionalname;
          this.proClazz = user.proClazz;
          this.user.roleList = user.role;
          this.user.clazz = user.clazz;
          let role = user.role;
          this.user.proleList = [];
          this.findAddOffice(user.sid, "2");
          this.findAddOffice(user.deptid, "3");
          if (role != null && role.length > 0) {
            for (let i = 0; i < role.length; i++) {
              this.user.proleList.push(role[i].id);
            }
          }
          this.handleCheckedCitiesChange();
          let clazz = user.clazz;
          this.clazzOffice = [];
          this.course = [];
          if (this.roletea) {
            let course = user.course;
            if (course && course.length > 0) {
              let map = {};
              for (let i = 0; i < course.length; i++) {
                let key =
                  course[i].gradeid + course[i].proid + course[i].subjectid;
                let temp = map[key];
                if (map[key]) {
                  map[key].clazzid.push(course[i].clazzid);
                } else {
                  map[key] = {
                    sid: course[i].ssid,
                    deptid: course[i].deptid,
                    proid: course[i].proid,
                    gradeid: course[i].gradeid,
                    subjectid: course[i].subjectid,
                    clazzid: []
                  };
                  map[key].clazzid.push(course[i].clazzid);
                }
              }
              if (map) {
                let i = 0;
                // console.log(map);
                for (let key in map) {
                  let p = {
                    sid: map[key].sid,
                    deptid: map[key].deptid,
                    proid: map[key].proid,
                    gradeid: map[key].gradeid,
                    clazzid: map[key].clazzid,
                    subjectid: map[key].subjectid,
                    depts: [],
                    pros: [],
                    clazzs: []
                  };
                  this.course.push(p);
                  this.findCourseEditOffice(map[key].sid, "2", i);
                  this.findCourseEditOffice(map[key].deptid, "3", i);
                  this.findCourseClazzByPro(i);
                  i++;
                }
              }
            }
          }
          if (this.rolefdy) {
            if (clazz && clazz.length > 0) {
              let map = {};
              for (let i = 0; i < clazz.length; i++) {
                let key = clazz[i].gradeid + clazz[i].proid;
                let temp = map[key];
                if (map[key]) {
                  map[key].clazzid.push(clazz[i].clazzid);
                } else {
                  map[key] = {
                    sid: clazz[i].ssid,
                    deptid: clazz[i].deptid,
                    proid: clazz[i].proid,
                    gradeid: clazz[i].gradeid,
                    clazzid: []
                  };
                  map[key].clazzid.push(clazz[i].clazzid);
                }
              }
              if (map) {
                let i = 0;
                for (let key in map) {
                  let p = {
                    sid: map[key].sid,
                    deptid: map[key].deptid,
                    proid: map[key].proid,
                    gradeid: map[key].gradeid,
                    clazzid: map[key].clazzid,
                    deptList: [],
                    proList: [],
                    clazzList: []
                  };
                  let params = { id: map[key].sid, type: "2" };
                  userApi.findOffice(params).then(r => {
                    p.deptList = r.data.data;
                  });
                  params = { id: map[key].deptid, type: "3" };
                  userApi.findOffice(params).then(r => {
                    p.proList = r.data.data;
                  });
                  this.clazzOffice.push(p);
                  this.findClazz(i);
                  i++;
                }
              }
            }
          }
        });
      },
      findCourseEditOffice(id, type, index) {
        let params = { id: id, type: type };
        userApi.findOffice(params).then(r => {
          if (type == "2") {
            this.course[index].depts = r.data.data;
          } else if (type == "3") {
            this.course[index].pros = r.data.data;
          }
        });
      },
      // 提示信息
      findAddOffice(id, type) {
        //添加教职工学院信息
        if (id && type) {
          let params = {
            id: id,
            type: type
          };
          userApi.findOffice(params).then(data => {
            let list = data.data.data;
            if (type == "2") {
              this.user.deptList = list;
              if (this.userSelect) {
                this.user.proList = [];
                this.user.deptid = "";
                this.user.proid = "";
              }
            } else if (type == "3") {
              this.user.proList = list;
              if (this.userSelect) {
                this.user.proid = "";
              }
            } else if (type == "4") {
              if (list && list.length > 0) {
                this.user.sList = list;
                if (this.userSelect) {
                  this.user.deptList = [];
                  this.user.deptid = "";
                  this.user.proList = [];
                  this.user.proid = "";
                }
              } else {
                findOffice("1", "2");
              }
            }
          });
        }
      },
      showMsg(r) {
        let data;
        if (r && r.data) {
            data = r.data;
            if (data.meta.status == "success") {
                this.$message({
                    message: data.meta.message,
                    type: 'success'
                });
            } else {
                this.$message.error(data.meta.message);
            }
        } else {
            this.$message.error("未知错误");
        }
      },
      // 修改保存
      modifyUser(){
        this.loading=true;
        let clazz = this.clazzOffice;
        let course = this.course;
        this.user.strclazz = '';
        this.user.strcourse = '';
        this.user.strrole = this.user.proleList.join();
        if (this.rolefdy && clazz.length > 0) {
          let arr=[];
          clazz.forEach(r=>{arr= arr.concat(r.clazzid)})
          this.user.strclazz=arr.join()
        };
        // params.proleList="";
        let qs = require('querystring');
        let params = qs.stringify(this.user);
        userApi.modifyUser(params).then(r => {
          this.loading=false;
          if (r) {
            this.showMsg(r);
          }
        });
      },
      
    },
    updated(){

    },
    directives:{
          
    },
    watch:{
     
    }
     
  }

</script>
<style scoped>
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
.changepersonal{
  text-align:center;
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
.magessBox{
  width:1200px;
  margin:0 auto 20px;
  padding-top:20px;
  padding-bottom:1px;
  background-color:#fff;
}
.avatar-uploader{
  margin-bottom:18px;
}
.uesrname{
  position:relative;
}
.uesrname span{
  font-size:14px;
  color:#262626;
} 
.uesrname i{
  margin-left:20px;
  position:absolute;
}
/*.el-icon-plus:before{
  content: "";
}*/
.formbox{
  text-align:left;
  margin:20px auto 0;
  width:292px;
}
.primarybutton{
  width:100%
}
.indetatr{
  width:324px;
}
.btn-text{
  margin-left:5px;
  text-decoration:underline;
}
.Class-teacher{
   position: relative;
   width:682px;
   left: -230px;
}
.Class-teacher .el-col-6{
  padding:0 11px;
}
.lineup{
  height:40px;
}
.addclasses-cpm{
  display:inline-block;
  float: left;
}
.addclasses-cpm p{
  display:inline-block;
  margin-left:10px;
}
.classes-table{
  position:relative;
  width: 800px;
  left: -290px;
}
.magessBox .el-select{
  width:100%;
}
.margin-top-5{
  margin-top:5px;
  margin-bottom:5px;
}
.margin-top-5 img{
  cursor: pointer;
}
.dialog-ul li{
  float: left;
  width:33%;
}
.dialog-ul{
  width:500px;
}
</style>
