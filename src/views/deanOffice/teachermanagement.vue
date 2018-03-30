<template>
  <div class="teachermanagement">
    <nav-top></nav-top>
    <p class="log-magess">
      <span class="arrow-center left">教职工管理中心</span>
      <span class="arrow-right" @click="router">返回
        <i class="el-icon-arrow-right"></i>
      </span>
    </p>
    <div class="teachermanagement-box">
      <div class="tabs">
        <ul class="tabs-items">
          <div @click="tabs">
            <li data-active="1" class="tabs-items-item">教职工基本信息</li>
            <li data-active="2">已停用</li>
            <li data-active="3">回收站</li>
          </div>
        </ul>
      </div>
      <div class="select clear">
          <div v-if="active=='1'"  class="feature left" >
              <span @click="addteacher">
                <img src="../../assets/image/apply-proper-icon.png" />
              </span>
              <span ><img src="../../assets/image/audit.png"/></span>
              <span><img src="../../assets/image/daochu-icon.png"/></span>
              <span><img src="../../assets/image/daoru-icon.png"/></span>
              <span @click="getDownTeaTemplate"><img src="../../assets/image/xiazai-icon.png"/></span>
          </div>
          <div class="right" >
            <el-form :inline="true" label-width="50px" v-model="searchForm" class="demo-form-inline" ref="form">
              <el-form-item label="岗位" prop="proid">
                <el-select clearable v-model="searchForm.position" placeholder="">
                  <el-option v-for="items in positions" :key="items.id" :label="items.name" :value="items.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="身份" prop="education">
                <el-select clearable v-model="searchForm.education" placeholder="">
                  <el-option v-for="item in eList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-form-item>
                  <el-input v-model="searchForm.name" @keyup.native.enter="findTeacher" placeholder="请输入姓名">
                    <i slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer"   @click="findTeacher" ></i>
                  </el-input>
                </el-form-item>
              </el-form-item>
            </el-form>
          </div>
      </div>
       <div class="table">
          <div v-if="active=='1'" class="additive">
          <el-table :data="teaList" stripe @selection-change="handleSelectionChange"
          v-loading.body="table1loading"
           style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="身份证号">
                    <span>{{ props.row.idcard | tostime}}</span>
                  </el-form-item>
                  <el-form-item label="学历">
                    <span>{{ props.row.education }}</span>
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <span>{{ props.row.email }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column width="45" type="selection">
            </el-table-column>
            <el-table-column type="index" label="序号" width="55">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="90">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="55">
              <template slot-scope="scope">
                <span>{{scope.row.sex== 1 ? '男':'女'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="no" label="工号" >
            </el-table-column>
            <el-table-column prop="positionname" label="岗位" >
            </el-table-column>
            <el-table-column prop="teatypename" label="教职工分类" >
            </el-table-column>
            <el-table-column prop="mobile" label="手机号码" >
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="viewUser(scope.row.id)">编辑</el-button>
                  <div class="table-end-caozuo">
                    <el-tooltip :enterable="false" :content="'点击停用'" placement="top">
                      <el-switch
                      @change="enableOption(scope.row.id, '1')"
                        v-model="scope.row.login_flag"
                        active-color="#208af5"
                        inactive-color="#999"
                        active-value="0"
                        inactive-value="100">
                      </el-switch>
                    </el-tooltip>
                  </div>
                  <el-button
                    size="mini"
                    type="danger"
                   @click="deleteOption(scope.row.id, '1')">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="Pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page.pageNo"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.count">
            </el-pagination>
          </div>
        </div>
        <dead-status v-if="active=='2'" :dead="dead"></dead-status>
        <remove-status v-if="active=='3'" :remove="remove"></remove-status>
      </div>
      
      <!--添加教职工-->
      <el-dialog :visible.sync="dialogFormVisible" >
        <div slot="title"  >
            <p style="font-size:16px;" >{{optiontext+'教职工'}}</p>
        </div>
        <div style="max-width:810px;" class="add-jzg">
          <el-form :model="user" :label-position="labelPosition" ref="user" label-width="90px">
            <el-row>
            <el-col :span="10">
              <el-form-item label="姓名:" prop="name" :rules="[{required: true, message: '填写姓名'}]"  >
                <el-input v-model="user.name"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="10">
              <el-form-item label="部门:" prop="deptid" :rules="[{required: true, message: '填写部门'}]"  >
                <el-cascader
                  placeholder="选择部门"
                  :options="orgTree1"
                  @change="set_deptid"
                  filterable
                  v-model="def_user.deptids"
                  size="medium"
                  :show-all-levels="false"
                  :props="propso"
                  change-on-select
                ></el-cascader>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="10">
              <el-form-item label="岗位:" prop="position" :rules="[{required: true, message: '请选择身份'}]" >
                <el-select clearable v-model="user.position" placeholder="">
                  <el-option v-for="items in positions" :key="items.id" :label="items.name" :value="items.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="10">
              <el-form-item label="手机号:" prop="mobile" :rules="[{required: true, message: '填写手机号'}]" >
                <el-input v-model="user.mobile"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="10">
              <el-form-item label="身份证号:" prop="idcard" :rules="[{required: true, message: '填写身份证号'}]" >
                <el-input v-model="user.idcard"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="10">
              <el-form-item label="工号:" prop="no" :rules="[{required: true, message: '填写工号'}]" >
                <el-input v-model="user.no"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="10">
              <el-form-item label="电子邮箱:" prop="email" :rules="[{required: true, message: '填写电子邮箱'}]" >
                <el-input v-model="user.email"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="10">
              <el-form-item label="性别:">
                <el-radio-group v-model="user.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="10">
              <el-form-item label="学历:" prop="education" :rules="[{required: true, message: '选择学历'}]" >
                <el-select v-model="user.education" value-key="value">
                  <el-option v-for="item in eList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            </el-row>
            <el-form-item class="shengfen" label="选择身份:" prop="proleList"  :rules = "[{ type: 'array', required: true, message: '请至少选择一个身份', trigger: 'change' }]" >
              <el-checkbox-group class="indetatr" v-model="user.proleList" @change="handleCheckedCitiesChange">
                <ul class="dialog-ul clear">
                  <li v-for="r in roles" :key="r.id" >
                    <el-checkbox :label="r.id" :value="r.id" name="type">{{r.name}}</el-checkbox>
                  </li>
                </ul>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="rolefdy" label="行政班信息:" >
              <div v-for="(item, index) in clazzOffice" :key="index"  style="max-width:450px">
                <el-form >
                  <el-row type="flex" class="row-bg" justify="space-between"  >
                    <el-col :span="11">
                      <el-form-item prop="" >
                          <el-cascader
                            placeholder="选择或输入关键字"
                            @change="treechange(index)"
                            v-model="item.proids"
                            :options="orgTree"
                            filterable
                            size="medium"
                            :show-all-levels="false"
                            :props="propso"
                            change-on-select
                          ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item prop="" >
                        <el-select  v-model="item.clazzid" placeholder="班级" multiple >
                          <el-option v-for="items in item.clazzList" :key="items.clazzid" :label="items.clazzname" :value="items.clazzid"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div class="clear margin-top-5"><img class="right"  @click="deleteclasswork(index)" src="../../assets/image/deletemessages.png" /></div>
              </div>
              <div class="clear margin-top-5" style="max-width:450px"><img class="right" @click="addclasswork" src="../../assets/image/addclass.png" /></div>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createTea()">确 定</el-button>
        </div>
      </el-dialog>
  
    </div>
  </div>
</template>
<script>
import navTop from "../common/header";
import deadStatus from "../../components/teachermanagement/deadstatus";
import removeStatus from "../../components/teachermanagement/remove";
import api from "../../apis/login.js";
import userApi from "../../apis/userCenter.js";
import dictApi from "../../apis/dict.js";
import {getCascader} from "../../utils/auth.js"
const qs = require("querystring");
export default {
  name: "teachermanagement",
  data() {
    return {
      optiontext: "",
      table1loading:false,
      dead: null,
      remove: null,
      rolefdy: false,
      roletea: false,
      loading: true,
      labelPosition: "right",
      active: "1",
      dialogFormVisible: false,
      positions:[], //岗位
      orgTree:[], //机构数据
      orgTree1:[], //机构数据
      propso:{label:'label',value:'id',children:'children'},
      proids:["1", "7335a618174a493b8c49c1a672e0c992"],
      user: {
        //添加教职工
        id: "",
        name: "",
        mobile: "", //手机号
        idcard: "", //身份证号码
        sex:'1', //性别
        no:"",  //工号
        email: "", //邮箱
        education: "", //学历
        position: "", //岗位
        proid: "", //专业id
        deptid: "", //学院id
        sid: "", //校区id
        strrole: "", //角色
        strclazz: "", //班级
        roles: [],
        proleList: [],
      },
      def_user:{
        deptids: [], //部门
        clazzs:[],
      },
      // year: [],
      clazzOffice: [ 
      ],
      grades: [], //年级
      subjects: [], //学科
      ss: [], //分校
      tableDatadead: "", //被选停用数据
      teaList: [],
      page: {
        pageSize: 10,
        pageNo: 1,
        count: 0
      },
      searchForm: {
        education: [], //学历
        proid: "", //专业id
        deptid: "", //学院id
        position: "", //学院id
        sid: "", //校区id
        name: "" //姓名
      },
      roles: [],
      eList: [], //学历
      pList: [], //职称
    };
  },
  filters: {
    tostime: function (value) {
      if(value){
        return value.replace(/(\w)/g,function(a,b,c,d){return ((c>1&&c<6)||c>(value.length-5))?'*':a})
      }
    }
  },
  components: {
    navTop,
    deadStatus,
    removeStatus,
  },
  created() {},
  mounted() {
    this.findAllCourse();
    this.findAllGrade();
    this.findTeacher();
    this.getDictMapList("education");
    this.getDictMapList("tea_positional");
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
    userApi.findAllRole().then(data => {
      this.roles = data.data.data;
    });
  },
  computed: {},
  methods: {
    set_deptid(val){
      this.user.deptid = val[val.length-1]
    },
    treechange(index) {
      console.log(this.clazzOffice);
      this.findXzb(index, '1', '1');
    },
    getDownTeaTemplate() {
      window.location.href=userApi.getDownTeaTemplate();
    },
    exportStu() {
      this.loading = true;
      this.loadingtext = "导出处理中...";
      let params = {
        deptid: this.searchForm.deptid,
        proid: this.searchForm.proid,
        sid: this.searchForm.sid,
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize,
        username: this.searchForm.name,
      };
      if (this.active == "1") {
        params.tabType = "1";
        this.table1loading = true;
      }
      if (this.active == "2") {
        params.tabType = "2";
      }
      if (this.active == "3") {
        params.tabType = "3";
      }
      userApi.exportStu(params).then(r=>{
        console.log(r.data.data);
        this.loading = false;
        window.location.href = userApi.getExportUrl(r.data.data);
      });
    },
    router(url) {
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
    handleCheckedCitiesChange() {
      let role = this.user.proleList;
      console.log(role);
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
    viewUser(userid) {
      this.optiontext = "修改";
      this.dialogFormVisible = true;
      let params = { userid: userid };
      userApi.viewUser(params).then(r => {
        let user = r.data.data;
        this.user.id = user.id;
        this.user.education = user.education;
        this.user.educationname = user.educationname;
        this.user.mobile = user.mobile;
        this.user.idcard = user.idcard;
        this.user.no = user.no;
        this.user.position = user.position;
        this.user.email = user.email;
        this.user.name = user.name;
        this.user.sid = user.sid;
        this.user.sname = user.scoms;
        this.user.deptid = user.deptid;
        this.user.dept = user.dept;
        this.user.proid = user.proid;
        this.user.pro = user.pro;
        this.user.sex = user.sex;
        this.user.sexname = user.sexname;

        this.user.proleList = [];
        this.user.proleList = user.role.map(r =>{ return r.id})
        this.def_user.deptids = [];
        if(user.deptid){
          this.def_user.deptids=getCascader(user.deptid,this.orgTree1).map(r=> {return r.id})
        }

        if(user.clazz.length >0){
          this.rolefdy = true;
          let def_proids =[];
          def_proids = user.clazz.map((r,i) =>{return r.proid})
          def_proids = Array.from(new Set(def_proids))
          this.def_user.clazzs =[];
          let _this=this;
          _this.clazzOffice=[];
          def_proids.map((r,i)=>{
            let arr =[]
            user.clazz.forEach((item,index) => {
              if(r == item.proid){
                arr.push(item.clazzid)
              }
            });
            _this.clazzOffice.push({
              proid:r,
              proids: [],
              clazzid:arr,
              clazzList: []
            })
            api.get_executive({'pageNo':1,'pageSize':-1,'proid':r,}).then(r => {
              _this.clazzOffice[i].clazzList = r.data.data.list;
            });
            
             _this.clazzOffice[i].proids=getCascader(r,this.orgTree).map(r=> {return r.id})
          })
        }else{
          this.clazzOffice=[];
          this.rolefdy = false;
        }
      })
    },
    findXzb(index, flag, clear) {  //查询行政班
      let proid = this.clazzOffice[index].proid;
      let proids = this.clazzOffice[index].proids;
      if (flag) {
        proid = proids[proids.length - 1];
      }
      if (clear) {
        this.clazzOffice[index].clazzid = [];
      }
      if (proid) {
        let params = {
            pageNo: 1,
            pageSize: -1,
            proid: proid
        };
        api.get_executive(params).then(r => {
          this.clazzOffice[index].clazzList = r.data.data.list;
        });
      }
    },
    createTea() {  //保存教师
      let params = this.user;
      let clazz = this.clazzOffice;
      this.user.strclazz = "";
      this.user.strrole = this.user.proleList.join();
      if (this.rolefdy && clazz.length > 0) {
        let arr=[];
        clazz.forEach(r=>{arr= arr.concat(r.clazzid)})
        this.user.strclazz=arr.join()
      };
      params.proleList=""
      console.log(this.user)
      userApi.addTea(qs.stringify(params)).then(r => {
        if (r) {
          this.findTeacher();
          userApi.showMsg(r.data.meta);
          this.dialogFormVisible = false;
          this.user.strrole = "";
          this.user.strclazz = "";
        }
      });
    },
    deleteOption(id, type) {
      this.$confirm("确认删除?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            let params = { ids: id, type: 1, userType: 2 };
            userApi.deleteOption(qs.stringify(params)).then(data => {
              instance.confirmButtonLoading = false;
              if (data) {
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: "success",
                  duration: "800"
                });
              }
              this.findTeacher();
            });
          } else {
            done();
          }
        }
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消",
          duration: "800"
        });
      });
    },
    enableOption(id, type) {
      let params = { ids: id, type: type, userType: 2 };
      userApi.enableOption(qs.stringify(params)).then(data => {
        userApi.showMsg(data.data.meta);
        if (data) this.findTeacher();
      });
    },
    addteacher() {
      this.optiontext = "添加";
      this.dialogFormVisible = true;
      this.user = {
        //添加教职工
        id: "",
        name: "",
        mobile: "", //手机号
        idcard: "", //身份证号码
        sex: "", //性别
        email: "", //邮箱
        education: "", //学历
        proid: "", //专业id
        deptid: "", //学院id
        sid: "", //校区id
        strrole: "", //角色
        strclazz: "", //班级
        roles: [],
        eList: [],
        pList: [],
        proleList: [],
      };
    },
    getDictMapList(type) {
      let params = { type: type };
      let data = "";
      dictApi.apiGetDictMapList(params).then(response => {
        data = response.data.data;
        if (type == "education") {
          this.eList = data;
        } else if (type == "tea_positional") {
          this.pList = data;
        }
      });
    },
    findTeacher() {
      //教师列表
      let params = {
        deptid: this.searchForm.deptid,
        position: this.searchForm.position,
        proid: this.searchForm.proid,
        education: this.searchForm.education,
        sid: this.searchForm.sid,
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize,
        username: this.searchForm.name,
      };
      if (this.active == "1") {
        params.tabType = "1";
        this.table1loading = true;
      }
      if (this.active == "2") {
        params.tabType = "2";
      }
      if (this.active == "3") {
        params.tabType = "3";
      }
      userApi.findTeacher(params).then(data => {
        this.table1loading = false;
        let page = data.data.data;
        if (page) {
          if (this.active == "1") {
            this.teaList = page.list;
            this.page.pageNo = page.pageNo;
            this.page.pageSize = page.pageSize;
            this.page.count = page.count;
          }
          if (this.active == "2") {
            this.dead = page;
          }
          if (this.active == "3") {
            this.remove = page;
          }
        }
      });
    },
    addclasswork() {
      this.clazzOffice.push({
        sid: "",
        deptid: "",
        proid: "",
        gradeid: "",
        clazzid: [],
        clazzList: []
      });
    },
    deleteclasswork(index) {
      this.clazzOffice.splice(index, 1);
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.findTeacher();
    },
    handleSizeChange(val){
      this.page.pageSize = val;
      this.findTeacher();
    },
    handleSelectionChange(val) {
      //被选停用数据
      this.tableDatadead = val;
    },
    tabs(e) {
      this.searchForm.proid = "";
      this.searchForm.deptid = "";
      this.searchForm.sid = "";
      this.searchForm.name = "";
      this.active = e.target.attributes[1].value;
      if(this.active == '1'){
        this.findTeacher();
      }
      var length = e.target.parentElement.children.length;
      for (var i = 0; i < length; i++) {
        e.target.parentElement.children[i].className = "";
      }
      e.target.className = "tabs-items-item";
    }
  },
  directives: {},
  watch: {
    "searchForm.proid": function() {
      this.findTeacher();
    },
    "searchForm.education": function() {
      this.findTeacher();
    },
    "searchForm.position": function() {
      this.findTeacher();
    }
  }
};
</script>
<style scoped>
.teachermanagement {
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

.teachermanagement-box {
  width: 1200px;
  margin: 0 auto 80px;
  padding-bottom: 1px;
  background-color: #fff;
}

.tabs {
  height: 40px;
  background-color: #eef1f6;
  text-align: left;
  overflow: hidden;
}

.tabs-items {
  margin-left: -1px;
  border-bottom: 1px solid #dfe6ec;
  height: 39px;
}

.tabs-items li {
  float: left;
  width: 120px;
  line-height: 39px;
  height: 39px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

.tabs-items-item {
  background-color: #fff;
  border-right: 1px solid #dfe6ec;
  border-top: 1px solid #dfe6ec;
  border-left: 1px solid #dfe6ec;
  color: #208af5;
}

.select {
  margin-top: 22px;
  text-align: left;
}

.feature {
  height: 42px;
  padding-left: 16px;
  line-height: 42px;
}

.feature span {
  margin-right: 12px;
  cursor: pointer;
}

.table {
  padding-left: 16px;
  padding-right: 16px;
  text-align: left;
}
.table-end-caozuo {
  margin-right: 5px;
  height: 24px;
  line-height: 24px;
  display: inline-block;
  cursor: pointer;
}

.table-end-caozuo img {
  vertical-align: middle;
}

.Pagination {
  margin-top: 32px;
  margin-bottom: 60px;
  text-align: center;
}
.Class-teacher {
  position: relative;
  width: 700px;
}

.margin-top-5 {
  margin-top: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  text-align: left;
}
.addclasses-cpm {
  display: inline-block;
  float: left;
}
.addclasses-cpm p {
  display: inline-block;
  margin-left: 10px;
}
.addclasses-cpm img {
  vertical-align: middle;
}
.dialog-ul {
  margin-top: 40px;
}
.dialog-ul li {
  float: left;
  width: 25%;
  text-align: left;
}
.el-select {
  width: 100%;
}
.teachermanagement .demo-table-expand .el-form-item {
margin-right: 0;
margin-bottom: 0;
width:33.3%;
}
</style>