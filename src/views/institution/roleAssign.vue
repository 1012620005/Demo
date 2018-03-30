<template>
  <div class="roleassign">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >机构设置</span><span class="arrow-right" @click="router">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
        <!--<div class="roleassign-top"><img  src="../../assets/image/roleassign-icon.png"/></div>-->
        <div class="tabs">
          <ul class="tabs-items"  >
            <div  @click="tabs">
              <li data-active="1" class="tabs-items-item">添加分校</li>
              <li data-active="2">添加部门</li>
              <li data-active="3" >添加院系</li>
              <!-- <li data-active="4" >权限分配</li> -->
            </div>
          </ul>
        </div>
        <div v-if="active == '1' " class="roleassign-table clear">
          <div class="roleassign-left left">
            <h3 class="roleassign-left-title">学校名称</h3>
            <div class="roleassign-left-cot">
                <el-tree
                  :data="data2"
                  :props="defaultProps" 
                  node-key="id"
                  highlight-current
                  accordion
                  v-loading.body="treeloading"
                  >
                </el-tree>
            </div>
          </div>
          <div class="roleassign-right right">
            <p style='text-align:left'>
              <span  @click="addFx('0')" class="add-button" ><img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加分校</i></span>
            </p>  
              <div class="roleassign-right-table">
                   <el-table
                    
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      type="index"
                      label="序号"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="分校/学校名称"
                      width="300">
                    </el-table-column>
                    <el-table-column
                      prop="area"
                      label="归属区域"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="类型"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <el-tooltip v-if="tableData[scope.$index].type != '学校'" :content="'修改'" placement="top">
                        <span class="table-end-caozuo"><img @click="addFx(scope.row.id)" src="../../assets/image/xiugai.png"/></span>
                        </el-tooltip>
                        <el-tooltip v-if="tableData[scope.$index].type != '学校'" :content="'删除'" placement="top">
                        <span class="table-end-caozuo"><img @click="delFx(scope.row.id)" src="../../assets/image/delete-icon.png"/></span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
              </div>
          </div>
        </div>
        <add-institution v-if="active == '2' "></add-institution>
        <add-department v-if="active == '3' " ></add-department>
        <!-- <cont-rol v-if="active == '4' " ></cont-rol> -->
    </div>

<!--添加学校名称-->
<el-dialog   :visible.sync="dialogVisible" size='tiny' >
  <div slot="title" style="float:left;" >
      <p style="font-size:16px;" >{{optiontext+"分校"}}</p>
  </div>
  <div style="max-width:450px;">
  <el-form :model="form" :label-position="labelPosition" label-width="80px"  ref='form'>
    <el-form-item prop="schoolname" label="名称:">
      <el-input  v-model="form.name"  placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item  label="">
      <div style="text-align:left">{{form.areaname}}</div>
    </el-form-item>
    <el-form-item prop="homeaddress" label="归属区域:">
    <div  style="max-width:450px;">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="7">
            <el-select @change="selectprovince" v-model="form.homeaddress.province" placeholder="选择省">
              <el-option v-for="item in ruleForm2.homeaddress.province" :key="item.code" :label="item.name" :value="item.code" ></el-option>
            </el-select>
        </el-col>
        <el-col :span="7">
            <el-select @change="selectcity" v-model="form.homeaddress.city" placeholder="选择市">
              <el-option v-for="item in ruleForm2.homeaddress.city" :key="item.code" :label="item.name" :value="item.code" ></el-option>
            </el-select>
        </el-col>
        <el-col :span="7">
          <el-select @change="selectcounty" v-model="form.homeaddress.county" placeholder="选择县">
            <el-option v-for="item in ruleForm2.homeaddress.county" :key="item.code" :label="item.name" :value="item.code" ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    </el-form-item>
    
  </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button   type="primary" @click="saveFx()"  >确 定</el-button>
  </div>
</el-dialog>


  </div>
</template>

<script>
import navTop from "../common/header";
import addInstitution from './addinstitution'
import addDepartment from './adddepartment'
// import contRol from './control'
import api from '../../apis/login.js'
import userApi from '../../apis/userCenter.js'
import institution from '../../apis/institution.js'
const qs = require('querystring');
export default {
  name: 'personal',
  data() {
    return {
      optiontext:'',
      schoolflag:true,
      active:"1",
      treeloading:false,
      labelPosition:'right',
      dialogVisible:false,
      form:{ 
        schoolnames:"",            
        schoolname:'',
        area: '',
        areaname: '',
        name: '',
        id: '',
        homeaddress:{                //地址 
          province:"",
          city:"",
          county:"",
        }, 
        branschoolname:[
          {
          name:"",
          value:true,
          },
        ],
        checkbox:'',
      },
       tableData:[],
       data2: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        ruleForm2: {
        homeaddress:{       //家庭地址 
          province:"",
          city:"",
          county:""
        },                
      },
    }
  },
  components:{
    navTop,
    addInstitution,
    addDepartment,
    // contRol
  },
  created(){
  },
  mounted() {
    this.loadScoms();
    this.loadTree();
    api.address().then(data=>{
        this.ruleForm2.homeaddress.province = data.data.data
    })
  },
  computed: {
    
  },
  methods:{
    router(url){
        this.$router.go(-1);
    },
    loadTree(){
      this.treeloading = true;
      institution.getorgantree().then(data=>{
        this.treeloading = false;
        this.data2 = data.data.data;
      })
    },
    delFx(id) { //删除分校
      let params = {'id':id};
      this.$confirm("确认删除?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            userApi.delOffice(qs.stringify(params)).then(data=>{
              instance.confirmButtonLoading = false;
              if (data) {
                this.loadScoms();
                this.loadTree();
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: "success",
                  duration: "1500"
                });
              }
            });
          } else {
            instance.confirmButtonLoading = false;
            done();
          }
        }
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    },
    saveFx() {  //保存分校
      userApi.saveFx(qs.stringify(this.form)).then(data=>{
        if (data) {
          this.$message({
            showClose: true,
            message: data.data.meta.message,
            type: "success",
            duration: "1500"
          });
          this.loadScoms();
          this.loadTree();
          this.dialogVisible=false;
        }
      });
    },
    getNameByCode(code) {  //获取区域
      let params = {code:code}
      userApi.getNameByCode(params).then(r=>{
        this.form.areaname = r.data.data;
      });
    },
    loadScoms(id, type) {
      userApi.findFx().then(r=>{
        let list = r.data.data;
        this.tableData = list;
      });
    },
    selectprovince(){
      api.address(this.form.homeaddress.province).then(data=>{
          this.form.area = this.form.homeaddress.province;
          this.ruleForm2.homeaddress.city = data.data.data
          this.getNameByCode(this.form.area);
      })
    },
    selectcity(){
      api.address(this.form.homeaddress.city).then(data=>{
        this.form.area = this.form.homeaddress.city;
        this.ruleForm2.homeaddress.county = data.data.data
        this.getNameByCode(this.form.area);
      })
    },
    selectcounty(){
       this.form.area = this.form.homeaddress.county;
       this.getNameByCode(this.form.area);
    },
    addFx(id){
      if (id !== '0') {
        this.optiontext = '修改'
        let params = {id:id};
        userApi.getOffice(params).then(r=>{
          let o = r.data.data;
          this.form.name = o.name;
          this.form.id = o.id;
          this.form.area = o.area;
          this.form.areaname = o.areaname;
          this.dialogVisible=true;
        });
      } else {
        this.optiontext = '添加'
        this.dialogVisible=true;
        this.form.name='';
        this.form.id ='';
        this.form.area = '';
        this.form.areaname='';
        this.form.homeaddress.province='';
        this.form.homeaddress.city='';
        this.form.homeaddress.county='';
      }
    },
    tabs(e){
      if(e.target.tagName == 'UL' || e.target.tagName == 'DIV') return
      let li = e.target;
      let lis = li.parentElement.children;
      for(let i = 0;i<lis.length;i++){
        lis[i].className = '';
      }
      li.className = 'tabs-items-item'
      this.active = e.target.attributes[1].value
      if (this.active == '1') {
        this.loadScoms();
      }
    }
  },
  directives:{
        
  },
  watch:{
    
  }
     
}

</script>
<style scoped>
.roleassign{
  height:100%;
  text-align: center;
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
  margin-left:24px;
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
  margin:0 auto 30px;
  padding-bottom:20px;
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
.roleassign-table{
  width:1150px;
  margin:20px auto 0;
}
.roleassign-right-table{
  text-align:left;
  margin-top:20px;
}
.roleassign-right{
  width:880px;
}
.roleassign-right-title{
  text-align:left;
  height:20px;
}
.roleassign-right-title img{
  cursor:pointer;
}
.addschool-f{
  text-align:right;
}
.addschool-f img{
  cursor:pointer;
}
.table{
  padding-left:16px;
  padding-right:16px;
  text-align:left;
  font-size:12px;
}
.table .el-table{
  font-size:12px;
}
.table-end-caozuo{
  height:24px;
  line-height:24px;
  display:inline-block;
  cursor:pointer;
  margin-right: 5px;
}
.table-end-caozuo img{
  vertical-align: middle;
}
.roleassign-left{
  width:240px;
}
.roleassign-left-title{
  font-size:16px;
  text-align:left;
  color:#666;
  height:20px;
}
.roleassign-left-cot{
  text-align:left;
  margin-top:20px;
}
</style>
<style>
.roleassign .el-dialog__header{
  background-color:#eef1f6;
  overflow: hidden;
}
</style>