<template>
  <div class="classes">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >教学班管理</span><span @click="back" class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
        <div style="margin:0 auto 50px;width:1160px" class="room-box clear">
        <div class="select clear">
          <el-form  label-width="60px"  v-model="page" class="demo-form-inline" >
            <el-row type="flex" class="row-bg" justify="space-between" >
              <el-col :span="6">
                <el-form-item  label="专业">
                  <!-- <el-select @change="getlist" clearable v-model="sel_form.zy" filterable placeholder="请选择或输入关键字">
                    <el-option v-for="items in def_form.zy" :key="items.id" :label="items.name" :value="items.id"></el-option>
                  </el-select> -->
                   <el-cascader
                    placeholder="选择或搜索关键字"
                    :options="def_form.zy"
                    :props="defaultProps"
                    :show-all-levels="false"
                    filterable
                    @change="get_selzy"
                    clearable 
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item  label="层次">
                  <el-select  @change="getlist" clearable v-model="sel_form.cc" placeholder="请选择">
                    <el-option v-for="item in def_form.cc" :key="item.id" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item  label="学制">
                  <el-select  @change="getlist" clearable v-model="sel_form.xz" placeholder="请选择">
                    <el-option v-for="item in def_form.xz" :key="item.id" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item  label="年级">
                  <el-select  @change="getlist" clearable v-model="sel_form.nj" placeholder="请选择">
                    <el-option v-for="item in def_form.grade" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
            <el-row type="flex" class="row-bg" justify="space-between" >
              <el-col :span="10">
                <span @click="createroom" class="add-button">
                  <img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/>
                  <i style="vertical-align: middle; "> 添加</i>
                </span>
                <span  @click="Setstate_class" class="add-button">
                  <img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/>
                  <i style="vertical-align: middle; "> 设置班级状态</i>
                </span>
                <span  class="add-button">
                  <img style="vertical-align: middle; " src="../../assets/image/daochu-icon.png"/>
                </span>
                <span  class="add-button">
                  <img style="vertical-align: middle; " src="../../assets/image/daoru-icon.png"/>
                </span>
                <span  class="add-button">
                  <img style="vertical-align: middle; " src="../../assets/image/xiazai-icon.png"/>
                </span>
              </el-col>
              <el-col :span="4">
                  <el-input v-model="sel_form.name" @keyup.native.enter="getlist"  placeholder="请输入关键字">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="getlist"></i>
                  </el-input>
              </el-col>
            </el-row>
          <div style="text-align:left">
            <el-table
              :data="page.list"
              stripe
              @selection-change="handleSelectionChange"
              v-loading.body="tableloading"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="最多人数">
                      <span>{{ props.row.maxnum }}</span>
                    </el-form-item>
                    <el-form-item label="总人数">
                      <span>{{ props.row.total }}</span>
                    </el-form-item>
                    <el-form-item label="女">
                      <span>{{ props.row.male }}</span>
                    </el-form-item>
                    <el-form-item label="男">
                      <span>{{ props.row.femal }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="55">
              </el-table-column>
              <el-table-column
                prop="xzbname"
                label="行政班名称">
              </el-table-column>
              <el-table-column
                prop="clazzname"
                label="教学班名称">
              </el-table-column>
              <el-table-column
                prop="proname"
                label="专业">
              </el-table-column>
              <el-table-column
                prop="xzname"
                label="学制"
                width="90">
              </el-table-column>
              <el-table-column
                prop="ccname"
                label="层次"
                width="90">
              </el-table-column>
               <el-table-column
                prop="gradename"
                label="年级"
                width="90">
              </el-table-column>
              <el-table-column
                prop="pyfaname"
                label="培养方案">
              </el-table-column>
              <el-table-column
                prop="statename"
                label="是否毕业"
                width="90">
              </el-table-column>
              <el-table-column
                label="操作"
                width="160"
                >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="getClazz(scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click=" deleteClazz(scope.row)">删除</el-button>
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
     </div>

     <!--修改-->
        <el-dialog   :visible.sync="dialogchang" width="30%" >
          <div slot="title"  >
              <p style="font-size:16px;" >{{optiontext}}</p>
          </div>
          <div style="max-width:400px; text-align:left;">
            <el-form :model="clazz" :label-position="labelPosition" label-width="100px"  ref='form'>
              <el-form-item label="教学班名称:" >
                <el-input v-model="clazz.name"  placeholder="">
                </el-input>
              </el-form-item>
              <el-form-item label="专业:" >
                <!-- <el-select  v-model="clazz.proid" filterable placeholder="请选择或输入关键字" >
                    <el-option v-for="item in def_form.zy" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select> -->
                <el-cascader
                  placeholder="选择或搜索关键字"
                  :options="def_form.zy"
                  :props="defaultProps"
                  :show-all-levels="false"
                  filterable
                  @change="get_classxzb"
                  clearable 
                  v-model="cd_id"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="学制:" >
                <el-select  v-model="clazz.xz"  >
                    <el-option v-for="item in def_form.xz" :key="item.id" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="层次:" >
                <el-select  v-model="clazz.cc"  >
                    <el-option v-for="item in def_form.cc" :key="item.id" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="年级:" >
                <el-select  v-model="clazz.nj"  >
                    <el-option v-for="item in def_form.grade" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="最多人数:" >
                <el-input v-model="clazz.num"  placeholder="">
                </el-input>
              </el-form-item>
              <el-form-item label="行政班名称:" >
                <el-select v-model="clazz.xzb" filterable placeholder="请选择或输入关键字">
                  <el-option
                    v-for="item in def_form.xzb"
                    :key="item.clazzid"
                    :label="item.clazzname"
                    :value="item.clazzid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogchang = false">取 消</el-button>
            <el-button  :loading="loading" type="primary" @click="saveClazz()"  >确 定</el-button>
          </div>
        </el-dialog>



    <el-dialog   :visible.sync="dialogstate" width="30%" >
      <div slot="title"  >
          <p style="font-size:16px;" >设置</p>
      </div>
      <div style="max-width:400px; text-align:left;">
        <el-form  :label-position="labelPosition" label-width="80px" >
          <el-form-item label="状态:" >
            <el-select  v-model="set_state"  >
              <el-option  label="在读" value="0"></el-option>
              <el-option  label="实习" value="1"></el-option>
              <el-option  label="毕业" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogstate = false">取 消</el-button>
        <el-button  :loading="loading" type="primary" @click="state_class()"  >确 定</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import navTop from "../common/header";
import AD from "../../apis/admin.js";
import api from "../../apis/login.js";
import {getCascader} from "../../utils/auth.js"
const qs = require('querystring');
export default {
  name: "classes",
  data() {
    return {
      loading: false,
      dialogchang: false,
      dialogstate:false,
      labelPosition: "right",
      tableloading: false,
      optiontext: null,
      data: "",
      def_form: {
        grade:[],
        zy:[],
        xz:[],
        cc:[],
        xzb:[]
      },
      sel_form:{
        xz:"",
        nj:"",
        zy:"",
        cc:"",
        name:""
      },
      set_state:"",
      section:[],
      tableData: [
      ],
      defaultProps:{
        children: "children",
        label: "label",
        value:'id'
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        count: 0,
        list:[]
      },
      clazz: {
        id: "",
        name: "",
        proid: "",
        nj: "",
        num: "",
        cc: '',
        xzb: '',
        xz:'',
      },
      cd_id:[]
    };
  },
  components: {
    navTop
  },
  created() {},
  mounted() {
    api.getorgantree({ xz: "1", officeid: "" }).then(r => {
      this.def_form.zy = r.data.data;
    });
    api.queryAllGrade().then(data=>{
      if(data) this.def_form.grade = data.data.data;
    })
    api.get_xz().then(r=>{
      if(r){
        this.def_form.xz = r.data.data;
      }
    })
    api.get_cc().then(r=>{
      if(r){
        this.def_form.cc = r.data.data;
      }
    })
    // AD.get_executive({'pageNo':1,'pageSize':1000}).then(r => {
    //   this.def_form.xzb = r.data.data.list;
    // });
    this.getlist();
  },
  computed: {},
  methods: {
    get_selzy(val){
        this.sel_form.zy = val[val.length-1];
        this.getlist();
    },
    get_classxzb(val){
        this.clazz.proid = val[val.length-1];
        this.def_form.xzb=[]
        this.get_proid_xzb()
    },
    get_proid_xzb(){
        api.get_executive({'pageNo':1,'pageSize':-1,'proid':this.clazz.proid,'gradeid':this.clazz.nj}).then(r => {
          this.def_form.xzb = r.data.data.list;
        });
    },
    back(){
      this.$router.go(-1);
    },
    Setstate_class(){
      if(this.section.length >0){
        this.dialogstate=true;
      }else{
        this.$message({
          message:"选择班级",
          type: "info",
          duration: "800"
        });
      }
    },
    state_class(){
      let data={
        'id':this.section.join(','),
        'state':this.set_state
      }
      AD.state_classes(qs.stringify(data)).then(r=>{
        if(r){
          this.dialogstate=false;
          this.$message({
            showClose: true,
            message: r.data.meta.message,
            type: "success",
            duration: "800"
          });
          this.getlist();
        }
      })
    },
    handleSelectionChange(val){
      this.section=val.map(function(item,index){
          return item.clazzid
      })
    },

    saveClazz(row) {
      let data={
        "id":this.clazz.id,
        "type":"1",
        "cc":this.clazz.cc,
        "xz":this.clazz.xz,
        "gradeid":this.clazz.nj,
        "proid":this.clazz.proid,
        "name":this.clazz.name,
        "xzbid":this.clazz.xzb,
        "maxnum":this.clazz.num,
      }
      this.loading = true
      AD.set_classes(qs.stringify(data)).then(r => {
        this.loading = false;
        if(r){
          this.dialogchang = false;
          this.$message({
            showClose: true,
            message: r.data.meta.message,
            type: "success",
            duration: "800"
          });
          this.getlist();
        }
      });
    },
    getClazz(row) {
      this.cd_id = []
      if(row.proid){
        this.cd_id=getCascader(row.proid,this.def_form.zy).map(function(item,index){
          return item.id
        })
      }
      this.dialogchang = true;
      this.optiontext = "修改";
      this.clazz={
        id:row.clazzid,
        name:row.clazzname,
        proid:row.proid,
        nj:row.gradeid,
        cc:row.cc,
        xz:row.xz,
        num:row.maxnum,
        xzb:row.xzbid,
      }
      this.get_proid_xzb()
    },
    getlist() {
      let params = {
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize,
        proid: this.sel_form.zy,
        gradeid: this.sel_form.nj,
        cc: this.sel_form.cc,
        xz: this.sel_form.xz,
        name:this.sel_form.name
      };
      AD.get_classes(params).then(r => {
        let page = r.data.data;
        this.page.list = page.list;
        this.page.pageSize = page.pageSize;
        this.page.pageNo = page.pageNo;
        this.page.count = page.count;
      });
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getlist();
    },
    handleSizeChange(val){
      this.page.pageSize = val;
      this.getlist();
    },
    createroom() {
      //创建弹出
      this.clazz={
        id: "",
        name: "",
        proid: "",
        nj: "",
        num: "",
        cc: '',
        xzb: '',
        xz:'',
      }
      this.dialogchang = true;
      this.optiontext = "添加";
    },
    deleteClazz(row) {
      this.$confirm("确认删除?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            let formdata = new FormData();
            formdata.append("clazzid", row.clazzid);
            AD.del_Clazz(formdata).then(data => {
              instance.confirmButtonLoading = false;
              if (data) {
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: "success",
                  duration: "800"
                });
                this.getlist();
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
          message: "已取消",
          duration: "800"
        });
      });
    }
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.classes {
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
.magessBox {
  width: 1200px;
  margin: 0 auto 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #fff;
}
.el-select {
  width: 100%;
}
.Pagination {
  margin-top: 32px;
  margin-bottom: 60px;
  text-align: center;
}
.select .demo-form-inline{
  margin-left: -20px;
}
.classes .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width:25%;
}
</style>