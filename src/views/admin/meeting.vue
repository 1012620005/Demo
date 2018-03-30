<template>
  <div class="admeet">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >会议管理</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="admeet-box">
        <div class="tabs">
          <ul class="tabs-items"  >
            <div ref="tabs"  @click="tabs">
              <li data-active="1" class="tabs-items-item">会议申请</li>
              <li data-active="2">参加会议</li>
            </div>
          </ul>
        </div>
        <div class="admeet-top clear" >
          <div v-if="active == '1'">
            <div>
              <span @click="create" class="add-button"><img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 发起会议申请</i></span>
            </div>
            <div style="margin:15px 0 20px;">
              <el-table :data="tableData" stripe v-loading.body="tableloading" style="width: 100%">
                <el-table-column type="index" label="序号" width="70">
                </el-table-column>
                <el-table-column prop="title" label="会议主题">
                </el-table-column>
                <el-table-column prop="address" label="会议地点">
                </el-table-column>
                <el-table-column prop="userName" label="发言人">
                </el-table-column>
                <el-table-column prop="address" label="会议内容">
                </el-table-column>
                <el-table-column prop="startime" label="会议开始时间">
                </el-table-column>
                <el-table-column prop="endtime" label="会议结束时间">
                </el-table-column>
                <el-table-column prop="recordStatus" label="状态">
                </el-table-column>
                <el-table-column label="操作" width="160">
                  <template slot-scope="props">
                    <div style="cursor: pointer;">
                      <el-tooltip :content="'查看详情'" placement="top">
                        <span ><img @click="checkinformation(props.row)" style="vertical-align: middle;" src="../../assets/image/eye-icon.png"/></span>
                      </el-tooltip>
                      <span @click="Record(props.row)" v-if="props.row.recordStatus == '1'" style="color:#208af5;text-decoration: underline;">会议记录</span>
                      <span @click="Record(props.row)" v-if="props.row.recordStatus == '0'" >编辑会议记录</span>
                    </div>
                    <!-- <span><img/>未评教</span> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="text-align:center; ">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page.pageNo"
              :page-size="10" layout="prev, pager, next, jumper" :total="page.count">
              </el-pagination>
            </div>
          </div>
          <!-- <m-mt v-if="active == '2'" ></m-mt> -->
        </div>
    </div>

<!-- 弹出 -->
<el-dialog :visible.sync="dialogassets">
  <div slot="title">
      <p style="font-size:16px;" >发起会议申请</p>
  </div>
  <div style="max-width:380px; text-align:left;">
    <el-form :model="form"  :label-position="labelPosition" :rules="rules" label-width="85px"  ref='form'>
        <el-form-item  label="会议主题:" prop="title" >
          <el-input v-model.number="form.title"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="参加对象:">
          <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="form.checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="items in cities" :label="items" :key="items.id">{{items.name}}</el-checkbox>
          </el-checkbox-group> -->
          <el-row :gutter="20">
            <el-col :span="12" style="padding-left:0;">
              <div class="grid-content bg-purple">
                <el-select v-model="form.obdepart" placeholder="部门" @change="getobMeetQueryTea" value-key="id">
                  <el-option v-for="item in obdepartsel" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="11">
              <div class="grid-content bg-purple" style="padding-right:0;">
                <el-select v-model="form.obstaff" placeholder="教职工" multiple collapse-tags @visible-change="showinfo" value-key="id">
                  <el-option v-for="item in obstaffsel" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="form.obdepart == null ? false:true">
            <el-col :span="24">
              <div v-for="(item,index) in form.odepart" :key="index" class="grid-content bg-purple-dark clearfix">
                <span  class="obdep" style="float:left;">{{item.name}}：</span>
                <el-checkbox-group v-model="form.checkedobstaffs" @change="handleCheckedobstaffsChange">
                  <el-checkbox v-for="(obsta,index) in form.ostaff[index]" :label="obsta" :key="index">{{obsta.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item  label="发言人:">
          <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="form.checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="items in cities" :label="items" :key="items.id">{{items.name}}</el-checkbox>
          </el-checkbox-group> -->
          <el-row :gutter="20">
            <el-col :span="12" style="padding-left:0;">
              <div class="grid-content bg-purple">
                <el-select v-model="form.spdepart" placeholder="部门" @change="getspMeetQueryTea" value-key="id">
                  <el-option v-for="item in spdepartsel" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="11">
              <div class="grid-content bg-purple" style="padding-right:0;">
                <el-select v-model="form.spstaff" placeholder="教职工" multiple collapse-tags @visible-change="showspstinfo" value-key="id">
                  <el-option v-for="item in spstaffsel" :label="item.name" :value="item" :key="item.id"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="form.spdepart == null ? false:true">
            <el-col :span="24">
              <div v-for="(sitem,index) in form.sdepart" :key="index" class="grid-content bg-purple-dark clearfix">
                <span class="obdep" style="float:left;">{{sitem.name}}：</span>
                <el-checkbox-group v-model="form.checkedspstaffs" @change="handleCheckedspstaffsChange">
                  <el-checkbox v-for="(spsta,index) in form.sstaff[index]" :label="spsta" :key="index">{{spsta.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item  label="开始时间:" prop="starttime" >
          <el-date-picker type="datetime" v-model="form.starttime" placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item  label="结束时间:" prop="endtime" >
          <el-date-picker type="datetime" v-model="form.endtime" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item  label="会议地点:" prop="dress" >
          <el-input v-model.number="form.dress"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="会议内容:" prop="text" >
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.text" resize="none">
          </el-input>
        </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogassets = false">取 消</el-button> -->
    <el-button   type="primary" @click="assignation('form')" :loading = 'loading' >提 交</el-button>
  </div>
</el-dialog>


<!-- 编辑会议记录 -->
<el-dialog   :visible.sync="dialogMinutes" size='tiny' >
  <div slot="title" style="float:left;margin-bottom: 15px;" >
      <p style="font-size:16px;" >编辑会议记录</p>
  </div>
  <div style="max-width:380px; text-align:left;">
    <el-form :model="Minutes"  :label-position="labelPosition"  label-width="85px"  ref='form'>
        <el-form-item  label="标题:">
          <div>{{Minutes.title}}</div>
        </el-form-item>
        <el-form-item  label="会议记录:"  >
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="Minutes.con">
          </el-input>
        </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogMinutes = false">取 消</el-button>
    <el-button   type="primary" @click="subMinutes('form')" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>
 <!-- 弹出 -->
    <el-dialog   :visible.sync="flag" size='tiny' >
      <div slot="title" style="float:left;" >
          <p style="font-size:16px;" >会议详情</p>
      </div>
      <div style="max-width:380px; text-align:left;">
        <el-form :label-position="labelPosition"  label-width="85px"  ref='form'>
            <el-form-item  label="会议时间:" >
              <div>{{information.time}}</div>
            </el-form-item>
            <el-form-item  label="参加对象:"  >
              <ul class="meetdetails clear">
                <li v-for="item in tec" :key="item.id" >{{item.name}}</li>
              </ul>
            </el-form-item>
            <el-form-item  label="会议地点:" >
              <div>{{information.address}}</div>
            </el-form-item>
            <el-form-item  label="会议标题:" >
              <div>{{information.title}}</div>
            </el-form-item>
            <el-form-item  label="会议内容:"  >
              <div>{{information.content}}</div>
            </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button   type="primary" @click="flag = false" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import navTop from "../common/header";
// import mMt from "./mymeet";
import AD from "../../apis/admin.js";
import DateFns from "date-fns";
import util from '../../common/js/util.js'
const qs = require("querystring");

export default {
  name: "admeet",
  data() {
    return {
      // 部门
      obdepartsel:[{
        label:'',
        value:''
      }],
      spdepartsel:[{
        label:'',
        value:''
      }],
      // 教职工
      obstaffsel:[{
        label:'',
        value:''
      }],
      spstaffsel:[{
        label:'',
        value:''
      }],
      flag:false,
      tec:[],
      active: "1",
      informationflag: false, //详细信息
      information: "",
      dialogMinutes: false,
      Minutes: {
        title: "",
        con: "",
        id: ""
      },
      loading: false,
      dialogassets: false,
      tableloading: false,
      treeloading: false,
      labelPosition: "right",
      optiontext: "",
      tableData: [],
      // checkAll: false,
      // cities: [],
      // isIndeterminate: false,
      // depid:"",
      form: {
        title: "",
        // inobject:"",
        // spokesman:"",
        starttime:null,
        endtime:null,
        dress: "",
        text: "",
        // 参加对象model值
        obdepart:null,
        obstaff:[],
        // 发言人model值
        spdepart:[],
        spstaff:[],
        // 参加对象新增一个数组
        odepart:[],
        ostaff:[],
        // 发言人新增一个数组
        sdepart:[],
        sstaff:[],
        // 参加对象选中的教职工
        checkedobstaffs:[],
        // 发言人选中的教职工
        checkedspstaffs:[]
        // checkedCities: []
      },
      page: {
        pageNo: 1,
        pageSize: Number,
        count: null
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        // inobject: [{ required: true, message: "请选择参加对象", trigger: "blur" }],
        // spokesman: [{ required: true, message: "请选择发言人", trigger: "blur" }],
        starttime:[{ required: true, message: "请选择开始时间", trigger: "blur" }],
        endtime: [{ required: true, message: "请选择结束时间", trigger: "blur" }],
        dress: [{ required: true, message: "请输入地址", trigger: "blur" }],
        text: [{ required: true, message: "请输入会议内容", trigger: "blur" }],
      },
      // 参加对象是否选中
     
    };
  },
  components: {
    navTop,
    // mMt
  },
  created() {},
  mounted() {
    this.getlist();
    AD.teacherlist().then(data => {
      if (data) this.cities = data.data.data;
    });
  },
  computed: {},
  methods: {
    // 查询机构
    getQueryInstit(){
      let para={
        xz:2
      }
      AD.getQueryInstit(para).then(r=>{
        if(r){
          this.obdepartsel = r.data.data;
          this.spdepartsel = r.data.data;
        }
      })
    },
    // 教研中心查新教师
    // 参加对象
    showinfo(val){
      console.log(val);
      console.log(this.form.obstaff)
      console.log("val是个啥");
      if(!val){
        this.form.ostaff.push(this.form.obstaff);
      }
    },
    getobMeetQueryTea(){
      this.form.odepart.push(this.form.obdepart);
      let para={
        dept:this.form.obdepart.id
      }
      AD.getMeetQueryTea(para).then(r=>{
        if(r){
          this.obstaffsel=r.data.data;
          this.form.obstaff = [];
        }
      })
    },
    // 发言人
    showspstinfo(val){
      if(!val){
        this.form.sstaff.push(this.form.spstaff);
      }
    },
    getspMeetQueryTea(){
      this.form.sdepart.push(this.form.spdepart);
      let para={
        dept:this.form.spdepart.id
      }
      AD.getMeetQueryTea(para).then(r=>{
        if(r){
          this.spstaffsel= r.data.data;
          this.form.spstaff = [];
        }
      })
    },
    checkinformation(row) {
      this.tec =[];
      this.information = row;
      let _this = this
      let tecid = this.information.teacherIds.split(',')
      let len = tecid.length;
      console.log(tecid)
      this.cities.map(function(item){
        for(let i=0;i<len;i++){
          if(item.id == tecid[i]){
            _this.tec.push(item)
            console.log( _this.tec)
          }
        }
      })
      this.flag = true;

    },
    // 参加对象
    handleCheckedobstaffsChange(value) {
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.obstaffs.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 发言人
    handleCheckedspstaffsChange(value){

    },
    //获取列表
    getlist() {
      let data = {
        // userId: this.$Cookies.get("user"),
        pageNo: this.page.pageNo,
        pageSize: 10
      };
      AD.meetList(data).then(r => {
        if (r) {
          this.tableData = r.data.data.list;
          this.page.count = r.data.data.count;
        }
      });
    },
    Record(row) {
      this.dialogMinutes = true;
      this.Minutes.id = row.id;
      this.Minutes.title = row.title;
      this.Minutes.con = row.record;
    },
    //会议记录
    subMinutes() {
      let data = {
        id: this.Minutes.id,
        record: this.Minutes.con,
      };
      AD.upmeet(qs.stringify(data)).then(r => {
        if (r) {
          this.$message({
            showClose: true,
            message: r.data.meta.message,
            type: "success"
          });
          this.dialogMinutes = false;
          this.getlist();
        }
      });
    },
    handleCheckAllChange(val) {
      // let cities=this.cities.map(function())
      this.form.checkedCities = event.target.checked ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    assignation(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.form.time =
          //   DateFns.format(new Date(this.form.time[0]), "YYYY-MM-DD HH:mm:ss") +
          //   "-" +
          //   DateFns.format(new Date(this.form.time[1]), "YYYY-MM-DD HH:mm:ss");
          // console.log(this.form.time);
          // let tescherid = this.form.checkedCities.map(function(item) {
          //   return item.id;
          // });
          this.loading = true;
          // let data = {
          //   userId: this.$Cookies.get("user"),
          //   userIds: tescherid.join(','),
          //   time: this.form.time,
          //   address: this.form.dress,
          //   title: this.form.title,
          //   content: this.form.text
          // };
          let data = {
            title:this.form.title,
            deptId:this.form.obdepart.id,
            teacherId:this.form.obstaff.id,
            spokesmanId:this.form.spdepart.id,
            startime:util.formatDate.format(this.form.starttime,'yyyy-MM-dd hh:mm:ss'),
            endtime:util.formatDate.format(this.form.endtime,'yyyy-MM-dd hh:mm:ss'),
            address:this.form.dress
          }
          AD.meetadd(qs.stringify(data)).then(data => {
            console.log(data);
            console.log("0000")
            this.loading = false;
            if (data) {
              this.$message({
                showClose: true,
                message: data.data.meta.message,
                type: "success"
              });
              // this.getlist();
              this.$refs[formName].resetFields();
              this.dialogassets = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //发起会议申请
    create() {
      this.dialogassets = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getlist();
    },
    back() {
      this.$router.go(-1);
    },
    tabs(e) {
      console.log(e);
      if (e.target.tagName == "UL" || e.target.tagName == "DIV") return;
      let li = e.target;
      let lis = li.parentElement.children;
      for (let i = 0; i < lis.length; i++) {
        lis[i].className = "";
      }
      li.className = "tabs-items-item";
      this.active = e.target.attributes[1].value;
    }
  },
  directives: {},
  watch: {
    'form.obstaff':function(old){
      // this.form.ostaff.push(this.form.obstaff);
    }
  },
  mounted () {
    // 查询机构
    this.getQueryInstit();
    
  }
};
</script>
<style scoped>
.admeet {
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
.admeet-box {
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 40px;
  background-color: #fff;
}
.admeet-top {
  margin: 0 auto;
  width: 1160px;
  padding-top: 20px;
}

.logon-main-logon-right-button .el-button--primary {
  background-color: #208af5;
  width: 94px;
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
  line-height: 40px;
  height: 40px;
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
  transition: background-color 0.3s ease-in;
}
.meetdetails li{
  float: left;
  width:32%;
}
.el-date-editor.el-input, 
.el-date-editor.el-input__inner{
  width:100%;
}
.admeet .el-checkbox-group .el-checkbox {
  width: 26%;
  margin-left: 0;
}
.admeet .el-checkbox__label{
  padding-left:4px;
}
</style>
<style>
.met{
  min-height:100px;
  border:1px solid #dcdfe6;
  border-radius:4px;
}
.tevaluation .el-date-editor--datetimerange.el-input {
  max-width: 300px;
}

</style>