<template>
  <div class="posts">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >岗位管理</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="posts-box">
        <div class="posts-top clear" >
            <el-row :gutter="20">
              <el-col style="line-height: 40px;" :span="13">
                <span @click="creat" class="add-button">
                  <img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加</i>
                </span>
              </el-col>
              <el-col :span="11">
                <el-form :inline="true" :model="select_form" label-width="50px"  >
                  <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="12">
                      <el-form-item label="部门">
                        <el-cascader
                          placeholder="请选择或输入关键字"
                          :options="data2"
                          :props="defaultProps"
                          filterable
                          @change="get_deptid"
                          clearable
                          change-on-select
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="">
                        <el-input v-model="select_form.name" @keyup.native.enter="getlist"  placeholder="请输入关键字">
                          <i slot="suffix" class="el-input__icon el-icon-search" @click="getlist"></i>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          <div style="margin:0 0 20px;">
            <el-table
              :data="tableData"
              stripe
              v-loading.body="tableloading"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="55">
              </el-table-column>
              <el-table-column
                prop="name"
                label="岗位名称">
              </el-table-column>
              <el-table-column
                prop="deptname"
                label="隶属部门">
              </el-table-column>
              <el-table-column
                prop=""
                label="操作"
                width="160">
                <template slot-scope="scope">
                  <el-button @click="changes(scope.row)"  plain size="small">编辑</el-button>
                  <el-button @click="deletes(scope.row)"  type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="text-align:center; ">
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

<!--  -->
<el-dialog   :visible.sync="dialogMinutes" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >添加岗位</p>
  </div>
  <div style="max-width:380px; text-align:left;">
    <el-form :model="form"  :label-position="labelPosition"  label-width="110px"  ref='form'>
        <el-form-item  label="岗位名称:" prop="name" >
          <el-input v-model="form.name"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="隶属部门:" prop="deptid" >
          <el-cascader
            placeholder="请选择或输入关键字"
            :options="data2"
            :props="defaultProps"
            filterable
            v-model="deptid"
            @change="add_deptid"
            clearable
            change-on-select
          ></el-cascader>
        </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogMinutes = false">取 消</el-button>
    <el-button   type="primary" @click="assignation('form')" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import navTop from "../common/header";
import AD from "../../apis/admin.js";
import api from '../../apis/login.js'
import {getCascader} from "../../utils/auth.js"
const qs = require("querystring");
export default {
  name: "posts",
  data() {
    return {
      select_form:{
        deptid:'',
        name:""
      },
      dialogMinutes:false,
      loading:false,
      tableloading:false,
      labelPosition: "right",
      tableData:[
      ],
      data2: [],
      defaultProps:{
        children: "children",
        label: "label",
        value:'id'
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        count: 1
      },
      form:{
        name:"",
        deptid:"",
        id:""
      },
      deptid:[],
      row:"",
    };
  },
  components: {
    navTop
  },  
  created() {
    this.getlist()
  },
  mounted() {
    api.getorgantree({ xz: "2", officeid: "" }).then(data => {
      this.data2 = data.data.data;
    });
  },
  computed: {},
  methods: {
    changes(row){
      if(row.deptid){
        this.deptid = []
        this.deptid=getCascader(row.deptid,this.data2).map(function(item,index){
          return item.id
        })
      }
      this.form.deptid = row.deptid;
      this.form.id = row.id;
      this.form.name = row.name;
      this.dialogMinutes = true;
    },
    assignation(formName){
      console.log(this.form)
       this.$refs[formName].validate((valid) =>{
        if (valid) {
            AD.add_posts(qs.stringify(this.form)).then(r=>{
              if(r){
                this.getlist();
                this.loading = false;
                this.dialogMinutes = false;
                this.$message({
                  showClose: true,
                  message: '保存成功',
                  type: 'success',
                  duration:1500
                });
              }
            })
        } else {
          return false;
        }
      });
    },
    add_deptid(val){
      if(val){
        this.form.deptid = val[val.length-1]
      }
      console.log(this.form.deptid)
    },
    get_deptid(val){
      if(val){
        this.select_form.deptid = val[val.length-1]
      }
      this.getlist()
    },
    getlist(){
      let u={
        'pageSize':this.page.pageSize,
        'pageNo':this.page.pageNo,
        'name':this.select_form.name,
        'deptid':this.select_form.deptid
      }
      api.get_posts(u).then(r=>{
        if(r){
          this.tableData = r.data.data.list;
          this.page.pageNo = r.data.data.pageNo;
          this.page.count = r.data.data.count;
        }
      })
    },
    creat(){
      this.dialogMinutes = true;
      this.deptid=[];
      this.form={
        name:"",
        deptid:"",
        id:""
      }
    },
    deletes(row){
      this.$confirm("确认删除?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            AD.del_posts(qs.stringify({'id':row.id})).then(r => {
              instance.confirmButtonLoading = false;
              if (r) {
                this.getlist();
                done();
                this.$message({
                  showClose: true,
                  message:'删除成功',
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
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getlist();
    },
    back() {
      this.$router.go(-1);
    },
    
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.posts {
  height: 100%;
  text-align: left;
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
.posts-box {
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 40px;
  background-color: #fff;
}
.posts-top {
  margin: 0 auto;
  width: 1160px;
  padding-top: 20px;
}
.posts .el-cascader{
  width: 100%;
}
</style>