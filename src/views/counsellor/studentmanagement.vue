<template>
  <div class="studentmanagement">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >学生管理中心</span><span class="arrow-right" @click="router">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="studentmanagement-box">
        <div class="tabs">
          <ul class="tabs-items"  >
            <div  @click="tabs">
            <li data-active="1" class="tabs-items-item">在校生</li>
            <li data-active="2">已停用 </li>
            <li data-active="3" >回收站</li>
            </div>
          </ul>
        </div>
        <div class="select">
          <el-form :inline="true" :model="searchForm" label-width="60px" ref="form" class="demo-form-inline">
            <el-form-item label="专业">
              <el-cascader
                placeholder="选择或搜索关键字"
                :options="searchForm.proList"
                :props="defaultProps"
                :show-all-levels="false"
                filterable
                 @change="get_classxzb" 
                 clearable 
              ></el-cascader>
            </el-form-item>
            <el-form-item label="年级">
              <el-select v-model="searchForm.nj" @change="get_proid_xzb('1')"  clearable placeholder="请选择年级">
                <el-option v-for="item in def_form.nj" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级">
              <el-select v-model="searchForm.clazzid" @visible-change="changexzb"  clearable placeholder="请选择班级">
                <el-option v-for="item in searchForm.clazzList" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" >
               <el-input v-model="searchForm.username" @keyup.native.enter="getlist"  placeholder="请输入姓名">
                 <i slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer" @click="getlist" ></i>
               </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="active=='1'" class="additive">
          <div class="feature">
            <div class="left">
              <span @click="addstudent('1')"><img src="../../assets/image/addstudent.png"/></span>
              <span ><img src="../../assets/image/audit.png"/></span>
              <span><img src="../../assets/image/daochu-icon.png"/></span>
              <span @click="getDownStuTemplate"><img src="../../assets/image/daoru-icon.png"/></span>
              <span @click="exportStu"><img src="../../assets/image/xiazai-icon.png"/></span>
            </div>
      
          </div>
          <div class="table">
             <el-table
              v-loading="loadingtable"
              :element-loading-text="loadingtext"
              :data="stuList"
              stripe
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="身份证号">
                      <span>{{ props.row.idcard | tostime }}</span>
                    </el-form-item>
                    <el-form-item label="家长姓名">
                      <span>{{ props.row.father }}</span>
                    </el-form-item>
                    <el-form-item label="家长电话">
                      <span>{{ props.row.fatherPhone }}</span>
                    </el-form-item>
                    <el-form-item label="入学学期">
                      <span>{{ props.row.xq }}</span>
                    </el-form-item>
                    <el-form-item label="出生年月">
                      <span>{{ props.row.birthday }}</span>
                    </el-form-item>
                    <el-form-item label="生源地">
                      <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="民族">
                      <span>{{ props.row.nationname }}</span>
                    </el-form-item>
                    <el-form-item label="政治面貌">
                      <span>{{ props.row.politicalStatusname }}</span>
                    </el-form-item>
                    <el-form-item label="家庭住址">
                      <span>{{ props.row.address }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column 
                width="45"
                type="selection"
                >
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="学生姓名"
                width="80">
              </el-table-column>
              <el-table-column
                prop="no"
                label="学生学号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="assetsType"
                label="照片"
                width="80"
                >
                <template slot-scope="scope">
                  <span>
                  <img style="width: 35px;height:25px;" v-if="scope.row.photo !== '' && scope.row.photo !== null" :src="scope.row.photo | getsrc"/>
                  <svg t="1518072932083" class="icon" v-if="scope.row.photo == '' || scope.row.photo == null"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3846" xmlns:xlink="http://www.w3.org/1999/xlink" width="35" height="25"><defs></defs><path d="M921.273361 284.410562c1.732457-67.196425-43.048445-121.972982-121.114428-120.641661-191.071733 3.260254-382.278543 3.326768-573.346183-0.079818-74.853825-1.334391-126.530788 43.895743-124.050294 122.177644 3.672646 115.866914 0.904603 231.937466 0.953721 347.922061 0.01842 42.470277-0.500397 84.96102 0.602727 127.407762 1.13587 43.776016 23.833825 74.739215 63.998593 89.757257 19.272949 7.206122 41.523719 8.79941 62.443168 8.885368 164.988682 0.687662 329.980433 0.406253 494.972185 0.372483 9.794064-0.002047 19.751856 0.621147 29.353538-0.860601 40.656979-6.274914 54.06536-39.078017 29.011754-71.109548-6.999414-8.947789-15.836687-16.46909-23.924899-24.550139-53.108568-53.05638-106.242719-106.08513-161.28943-161.040766 41.047882-50.519604 56.205093-52.086285 96.514147-12.325723 45.354977 44.738947 90.105181 90.090854 135.24117 135.052882 8.084119 8.05342 15.827477 17.002232 25.342178 22.959921 27.457352 17.190521 56.961316 4.000104 63.09399-27.871791 1.827625-9.497305 1.12973-19.533892 1.133823-29.321816C920.261311 555.556005 917.77877 419.905512 921.273361 284.410562zM623.580285 743.239572c7.504928 7.525394 13.901615 16.154935 25.768897 30.092365-17.9887 1.465374-28.578896 3.062755-39.170115 3.078105-120.583333 0.174985-241.166665 0.414439-361.748974-0.034792-53.900607-0.200568-63.378469-9.556657-63.605643-62.427818-0.188288-43.908022-10.276041-92.654236 5.395894-130.377396 15.685237-37.752836 57.394175-64.97892 88.574315-95.933933 37.821397-37.551244 51.237965-37.648458 88.976474-0.178055C453.339995 572.417021 538.441209 657.847739 623.580285 743.239572zM837.183174 615.135962c-28.420283-28.105105-48.690956-48.114834-68.920696-68.167542-15.06716-14.935154-29.474288-30.598902-45.232181-44.76146-46.198182-41.520649-98.868775-41.834804-144.913461-0.369414-12.021801 10.825556-21.283746 24.715915-33.897018 39.667441-14.228049-11.58178-24.477484-18.659989-33.224706-27.26497-37.222763-36.624129-73.323982-74.41278-111.110587-110.435205-48.516993-46.25037-104.008842-46.752814-152.029532-0.718361-17.48421 16.761756-30.779004 37.894052-45.984311 57.032948-5.625114-3.344165-11.251252-6.687306-16.876366-10.030447 0-53.318346-1.178849-106.673531 0.478907-159.940712 0.87595-28.131711 15.031345-40.506553 42.894949-43.862997 9.665127-1.162476 19.558451-0.51984 29.348422-0.520863 169.72045-0.022513 339.440899-0.11768 509.161349 0.035816 61.667501 0.057305 72.113411 10.076496 72.356958 69.957305 0.343831 84.857667 0.14224 169.72045 0.017396 254.581186C839.235926 581.170382 838.287321 592.004125 837.183174 615.135962z" p-id="3847"></path></svg>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="sexname"
                label="性别"
                width="50">
              </el-table-column>
              <el-table-column
                prop="proname"
                label="专业">
              </el-table-column>
              <el-table-column
                prop="gradename"
                label="年级">
              </el-table-column>
              <el-table-column
                prop="xzbname"
                label="行政班">
              </el-table-column>
              <el-table-column
                prop="clazzname"
                label="教学班">
              </el-table-column>
              <el-table-column
                label="操作"
                width="190"
                >
                <template slot-scope="scope">
                   <el-button
                    size="mini"
                    @click="changestudent(scope.row)">编辑</el-button>
                  <div class="table-end-caozuo">
                    <el-tooltip :enterable="false" :content="'点击停用'" placement="top">
                      <el-switch
                        v-model="scope.row.loginflag"
                        @change="enableOption(scope.row.id, scope.row.loginflag)"
                        active-color="#208af5"
                        inactive-color="#999"
                        active-value="0"
                        inactive-value="1">
                      </el-switch>
                    </el-tooltip>
                  </div>
                  <el-button
                    size="mini"
                    type="danger"
                    @click=" deleteOption(scope.row.id, '1')">删除</el-button>
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
        </div>
        <dead-status v-if="active=='2'" :dead="dead" ></dead-status>
        <remove-status v-if="active=='3'" :remove="remove" ></remove-status>
        <!--添加学生-->
        <el-dialog  :visible.sync="dialogFormVisible"  width="35%"  >
          <div slot="title"  >
              <p style="font-size:16px;" >{{optiontext+'学生'}}</p>
          </div>
          <div style="width:300px;">
          <el-form :model="userInfo" :label-position="labelPosition" :rules='rules' ref="userInfo" label-width="90px" >
            <el-form-item prop="name" label="学生姓名:">
              <el-input v-model="userInfo.name" ></el-input>
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
              <el-radio class="radio" v-model="userInfo.sex" label="1">男</el-radio>
              <el-radio class="radio" v-model="userInfo.sex" label="2">女</el-radio>
            </el-form-item>
            <el-form-item prop="no" label="学号:" >
              <el-input v-model="userInfo.no" ></el-input>
            </el-form-item>
            <el-form-item  label="手机号:" >
              <el-input v-model="userInfo.mobile" ></el-input>
            </el-form-item>
            <el-form-item prop="idcard" label="身份证号:" >
              <el-input v-model="userInfo.idcard" ></el-input>
            </el-form-item>
            <el-form-item prop="father" label="家长姓名:">
              <el-input v-model="userInfo.father" ></el-input>
            </el-form-item>
            <el-form-item prop="fatherPhone" label="家长电话:">
              <el-input v-model="userInfo.fatherPhone" ></el-input>
            </el-form-item >
            <el-form-item  label="出生年月 :">
              <div style="width:400px;">
                <el-row  class="birthdate-box" >
                  <el-col :span="8" class="inline-block">
                    <el-date-picker 
                      v-model="userInfo.birthday"
                      align="right"
                      type="year">
                    </el-date-picker>
                    <span class="demonstration">年</span>
                  </el-col>
                  <el-col :span="8" class="inline-block" >
                    <el-date-picker
                      v-model="userInfo.birthday"
                      align="right"
                      format="MM"
                      type="month">
                    </el-date-picker>
                    <span class="demonstration">月</span>
                  </el-col>
                  <el-col :span="8" class="inline-block" >
                    <el-date-picker
                      v-model="userInfo.birthday"
                      format="dd"
                      align="right"
                      type="date">
                    </el-date-picker>
                    <span class="demonstration">日</span>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item label="生源地:" >
              <el-select  v-model="userInfo.source" placeholder="选择生源地">
                <el-option v-for="(item,index) in def_form.province" :key="index" :label="item.name" :value="item.code" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="民族:" >
              <el-select  v-model="userInfo.nation" placeholder="民族">
                <el-option v-for="item in def_form.nation" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面貌:"  >
              <el-select v-model="userInfo.politicalStatus" placeholder="政治面貌">
                <el-option v-for="item in def_form.politicsstatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入学学期:" prop="xq">
              <el-select   v-model="userInfo.xq"  placeholder="入学学期"  >
                <el-option v-for="item in def_form.xq" :key="item.term" :label="item.term" :value="item.term"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="专业:">
              <el-cascader
                placeholder="请选择或输入关键字"
                :options="searchForm.proList"
                :props="defaultProps"
                v-model="proid"
                :show-all-levels="false"
                filterable
                @change="add_classxzb" 
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item  label="年级:">
              <el-select   v-model="userInfo.nj" @change="get_proid_xzb('2')" >
                <el-option v-for="item in def_form.nj" :key="item.id" :label="item.name" :value="item.id" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="行政班:">
              <el-select v-model="userInfo.xzbid" >
                <el-option v-for="item in def_form.xzb" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="教学班:">
              <el-select v-model="userInfo.clazzid" >
                <el-option v-for="item in def_form.clazz" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="家庭地址:" >
              <div style="width:400px;">
                <el-row type="flex" class="row-bg" justify="space-between">
                  <el-col :span="7">
                      <el-select @change="selectprovince('2')" v-model="userInfo.province" placeholder="选择省">
                        <el-option v-for="(item,index) in def_form.province" :key="index" :label="item.name" :value="item.code" ></el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="7">
                      <el-select @change="selectcity('2')" v-model="userInfo.city" placeholder="选择市">
                        <el-option v-for="(item,index) in def_form.city" :key="index" :label="item.name" :value="item.code" ></el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-select v-model="userInfo.county" placeholder="选择县">
                      <el-option v-for="(item,index) in def_form.county" :key="index" :label="item.name" :value="item.code" ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-form-item  >
                  <div style="margin-top:20px;">
                      <el-input v-model="userInfo.address" placeholder="详细家庭地址"></el-input>
                  </div>
                </el-form-item>
              </div>
            </el-form-item>
          </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :loading="loading"  @click="savestudent('userInfo')">确 定</el-button>
          </div>
        </el-dialog>

      </div>
  </div>
</template>

<script>
import navTop from "../common/header";
import deadStatus from '../../components/studentmanagement/deadstatus'
import removeStatus from '../../components/studentmanagement/remove'
import validate from "../../validate"
import cf from "../../apis/commonFile.js";
import api from '../../apis/login.js'
import DateFns  from 'date-fns'
import userApi from '../../apis/userCenter.js'
import {getCascader} from "../../utils/auth.js"
const  qs = require('querystring');
export default {
  name: 'studentmanagement',
  data(){
    return {
      loading:false,
      loadingtext:'',
      loadingtable:false,
      labelPosition:"right",
      dead: null,
      remove: null,
      optiontext:"",
      active: "1",
      dialogFormVisible: false,
      userInfo: {                     //添加学生数据
        id:"",
        no:"",
        xq:"",
        name:"",
        mobile: '',
        idcard: '',
        father:"",
        fatherPhone:"",
        birthday:"",
        deptid:"",
        proid:"",
        xzbid:"",
        clazzid:'',
        source:"",
        nation:"",
        politicalStatus:"",
        province:"",
        city:"",
        county:"",
        address:"",
        sex: '1',
      }, 
      proid:[],
      formLabelWidth: '120px',
      stuList: [],  //学生列表
      searchForm: {
        clazzList: [], //班级列表
        proList: [], //专业列表
        proid: '', //专业id
        nj:"",
        clazzid: '', //班级id
        username: '' //学生姓名
      },
      defaultProps:{
        children: "children",
        label: "label",
        value:'id'
      },
      selectData: [],  //多选学生
      def_form:{
        clazz:[],
        xzb:[],
        politicsstatus:[],
        province:[],
        city:[],
        county:[],
        nj:[],
        nation:[],
        xq:[]
      },
      page: {
        pageSize:10,
        pageNo:1,
        count:0
      },
      rules:{
        name: [ { required: true, message: '请输入姓名', trigger: 'blur' }, ],
        father: [ { required: true, message: '请输入家长姓名', trigger: 'blur' }, ],
        no: [ { required: true, message: '请输入学号', trigger: 'blur' }, ],
        // email: [{ required: true, validator: validate.emailx, trigger: 'blur' }],
        idcard: [ {required: true, validator: validate.identityvalidate, trigger: 'blur' }],
        fatherPhone: [ { required: true, message: '请输入手机号', trigger: 'blur' }, ],
      }
    }
  },
  components:{
    navTop,
    deadStatus,
    removeStatus,
  },
  filters: {
    getsrc: function (value) {
      if(value){
        return  userApi.getCommonShowUrl(value);
      }
    },
    tostime: function (value) {
      if(value){
        return value.replace(/(\w)/g,function(a,b,c,d){return ((c>1&&c<6)||c>(value.length-5))?'*':a})
      }
    }
  },
  created(){
    api.studentRegistration().then(r=>{
        this.def_form.nation = r.data.data.nation
        this.def_form.politicsstatus = r.data.data.political
    })
    api.address().then(r=>{
        this.def_form.province = r.data.data
    })
    api.queryAllGrade().then(r=>{
      if(r) this.def_form.nj = r.data.data; 
    })
    api.getTerm().then(data=>{
      if(data) this.def_form.xq = data.data.data;
    })
    api.getorgantree({ xz: "1", officeid: "" }).then(r => {
      this.searchForm.proList = r.data.data;
    });
  },
  mounted() {
    this.getlist();
  },
  computed: {
    
  },
  methods: {
    get_classxzb(val){
        this.searchForm.proid = val[val.length-1];
        this.searchForm.clazzid =""
        this.get_proid_xzb('1')
    },
    add_classxzb(val){
        this.userInfo.proid = val[val.length-1];
        this.userInfo.clazzid =""
    },
    get_proid_xzb(i){
      if(i == '1'){
        this.getlist()
        api.get_executive({'pageNo':1,'pageSize':-1,'proid':this.searchForm.proid,'gradeid':this.searchForm.nj}).then(r => {
          this.searchForm.clazzList = r.data.data.list;
        });
      }else{
        api.get_executive({'pageNo':1,'pageSize':-1,'proid':this.userInfo.proid,'gradeid':this.userInfo.nj}).then(r => {
          this.def_form.xzb = r.data.data.list;
        });
        api.get_classes({'pageNo':1,'pageSize':-1,'proid':this.userInfo.proid,'gradeid':this.userInfo.nj}).then(r => {
          this.def_form.clazz = r.data.data.list;
        });
      }
      
    },
    changexzb(val){
      if(!val){
        this.getlist()
      }
    },
    selectprovince(val){
      if(val == '2'){
        this.userInfo.county = "";
        this.userInfo.city = '';
      }
        api.address(this.userInfo.province).then(data=>{
            this.def_form.city = data.data.data
        })
    },
    selectcity(val){
      if(val == '2'){
        this.userInfo.county = '';
      }  
        api.address(this.userInfo.city).then(data=>{
            this.def_form.county = data.data.data
        })
    },
    getDownStuTemplate() {
      window.location.href=userApi.getDownStuTemplate();
    },
    exportStu() {
      this.loadingtable = true;
      this.loadingtext = "导出处理中...";
      let params = {
        proid:this.searchForm.proid, 
        clazzid:this.searchForm.clazzid, 
        pageNo:this.page.pageNo,
        username:this.searchForm.username,
        tabType:"1",
      };
      if (this.active == "2") {
        params.tabType = "2";
      }
      if (this.active == "3") {
        params.tabType = "3";
      }
      userApi.exportStu(params).then(r=>{
        console.log(r.data.data);
        this.loadingtable = false;
        window.location.href = userApi.getExportUrl(r.data.data);
      });
    },
    router(url){
         this.$router.go(-1);
    },
    
    dealAll(type) {
      let params = '';
      console.log(this.selectData);
      if (this.selectData && this.selectData.length > 0) {
        for (let i = 0; i < this.selectData.length; i++) {
          if (params == '') {
            params = this.selectData[i].id
          } else {
            params = params + "," + this.selectData[i].id
          }
        }
        console.log(params);
        if (type == '0') {  //审核
          // this.deleteOption(params, '1');
        } else if (type == '1') {  //停用
          this.enableOption(params, '1');
        } else if (type == '2') { //删除
          this.deleteOption(params, '1');
        }
      } else {
        userApi.showTip("请选择需要操作的学生");
      }
    },
    deleteOption(id, type){ 
      this.$confirm("确认删除?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            let params = {ids:id, type:type, userType:3};
            userApi.deleteOption(qs.stringify(params)).then(data => {
              instance.confirmButtonLoading = false;
              if (data) {
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: "success",
                  duration: "1500"
                });
              }
              this.getlist();
            });
          } else {
            done();
          }
        }
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消",
          duration: "1500"
        });
      });
    },
    enableOption(id, type){ 
      let params = {ids:id, type:type, userType:3};
      userApi.enableOption(qs.stringify(params)).then(data=>{
        userApi.showMsg(data.data.meta);
        this.getlist();
      });
    },
    getlist(){
      let params = {
        proid:this.searchForm.proid, 
        clazzid:this.searchForm.clazzid, 
        pageNo:this.page.pageNo, 
        pageSize:this.page.pageSize, 
        sname:this.searchForm.username,
        tabType:"1",
        xzbgradeid:this.searchForm.nj
      };
      if (this.active == "2") {
        params.tabType = "2";
      }
      if (this.active == "3") {
        params.tabType = "3";
      }
      console.log(params)
      api.get_stulist(params).then(data=>{
        console.log('11111')
        let page = data.data.data;
        if (this.active == "1") {
            this.page.pageNo = page.pageNo;
            this.page.pageSize = page.pageSize;
            this.page.count = page.count;
            this.stuList = page.list;
          }
          if (this.active == "2") {
            this.dead = page;
          }
          if (this.active == "3") {
            this.remove = page;
          }
      });
    },
    changestudent(row){
      this.proid = []
      if(row.proid){
        this.proid=getCascader(row.proid,this.searchForm.proList).map(function(item,index){
          return item.id
        })
      }
      this.optiontext = '修改'
      this.userInfo= {
        id:row.id,   
        no:row.no,
        name:row.name,
        mobile:row.mobile,
        idcard:row.idcard,
        father:row.father,
        fatherPhone:row.fatherPhone,
        birthday:row.birthday,
        // deptid:row.deptid,
        xq:row.xq,
        nj:row.xzbgradeid,
        proid:row.proid,
        xzbid:row.xzbid,
        clazzid:row.clazzid,
        source:row.source,
        nation:row.nation,
        politicalStatus:row.politicalStatus,
        province:row.province,
        city:row.city,
        county:row.county,
        address:row.address,
        sex: row.sex,
      }
      this.selectprovince('1');
      this.selectcity('1');
      this.dialogFormVisible = true;
    },
    addstudent(row){ //添加学生
      this.optiontext = '添加'
      this.proid = []
      this.userInfo= {   
        id:"",
        no:"",
        xq:"",
        name:"",
        mobile: '',
        idcard: '',
        father:"",
        fatherPhone:"",
        birthday:"",
        deptid:"",
        proid:"",
        xzbid:"",
        clazzid:'',
        source:"",
        nation:"",
        politicalStatus:"",
        province:"",
        city:"",
        county:"",
        address:"",
        sex: '1',
      }
      this.dialogFormVisible = true;
    },
    savestudent(formName){ //保存学生
      console.log(this.userInfo)
      this.userInfo.birthday = DateFns.format(new Date(this.userInfo.birthday), 'YYYY-MM-DD')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          api.set_stu(qs.stringify(this.userInfo)).then(r=>{
            this.loading = false;
            if(r){
              this.$message({
                showClose: true,
                message: r.data.meta.message,
                type: "success",
                duration: "1500"
              });
              this.dialogFormVisible = false;
              this.getlist();
            }
          });
        }
      })
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getlist();
    },
    handleSelectionChange(val){       //被选停用数据
      console.log(val);
      this.selectData = val;
    },
    deadstatus(){
      
    },
    tabs(e){
      this.active = e.target.attributes[1].value
      if (this.active == '1') {
         this.getlist();
      }
      if(e.target.tagName == 'UL' || e.target.tagName == 'DIV') return
      let li = e.target;
      let lis = li.parentElement.children;
      for(let i = 0;i<lis.length;i++){
        lis[i].className = '';
      }
      li.className = 'tabs-items-item'
    }

  },
  directives:{
   
  },
  watch:{
    'userInfo.proid':function(val){
      if(val !== ''){
        this.get_proid_xzb('2')
      }
    }
  }
     
}

</script>
<style scoped>
.studentmanagement{
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
.studentmanagement-box{
  width:1200px;
  margin:0 auto 80px;
  padding-bottom:1px;
  background-color:#fff;
}
.tabs{
  height:40px;
  background-color:#eef1f6;
  text-align:left;
  overflow: hidden;
}
.tabs-items{
  margin-left:-1px;
  border-bottom:1px solid #dfe6ec;
  height:39px;
}
.tabs-items li{
  float:left;
  width:120px;
  line-height:39px;
  height:39px;
  text-align:center;
  font-size:14px;
  cursor:pointer;
}
.tabs-items-item{
  background-color:#fff;
  border-right:1px solid #dfe6ec;
  border-top:1px solid #dfe6ec;
  border-left:1px solid #dfe6ec;
  color:#208af5;
}
.select{
  margin-top:22px;
  padding-left:16px;
  text-align:left;
}
.feature{
  height:30px;
  padding-left: 16px;
  padding-right: 16px;
}
.feature span{
  margin-right:12px;
  cursor:pointer;
  display: inline-block;
}
.table{
  padding-left:16px;
  padding-right:16px;
  text-align:left;
  /* font-size:12px; */
}
.table-end-caozuo{
  height:24px;
  line-height:24px;
  display:inline-block;
  cursor:pointer;
}
.table-end-caozuo img{
  vertical-align: middle;
}
.Pagination{
  margin-top:32px;
  margin-bottom:60px;
  text-align:center;
}
.select-item{
  display:inline-block;
  margin-right:15px;
}

/*添加学生*/
.addclasses-cpm{
  display:inline-block;
  float: left;
}

.addclasses-cpm p{
  display:inline-block;
  margin-left:10px;
}
.addclasses-cpm img{
  vertical-align: middle;
}
.table .el-table .cell{
  padding-right: 0;
}
.el-dialog__header,.el-dialog__body{
  overflow: hidden;
}
.studentmanagement .demo-table-expand .el-form-item {
margin-right: 0;
margin-bottom: 0;
width:33.3%;
}
.el-select{
  width:100%;
}
.birthdate-box{
   width:400px;
}

.birthdate-box .inline-block{
  display:inline-block;
  width:33%;
}
.birthdate-box .inline-block .el-date-editor{
  width:100px;
}
</style>