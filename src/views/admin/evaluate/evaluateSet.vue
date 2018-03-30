<template>
  <div class="fixed_evaluate">
          <el-row :gutter="20">
            <el-col style="line-height: 40px;" :span="14">
              <span @click="create" class="add-button">
                <img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加评价体系</i>
              </span>
            </el-col>
            <!-- <el-col :span="10">
              <el-form :inline="true" :model="select_form" label-width="50px"  >
                <el-row type="flex" class="row-bg" justify="space-between">
                   <el-col :span="14">
                  <el-form-item label="状态">
                   
                    <el-select v-model="select_form.flag" >
                      <el-option v-for="item in option_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  </el-col>
                   <el-col :span="8">
                  <el-form-item >
                   
                    <el-input v-model="select_form.name"  placeholder="请输入关键字">
                      <i slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer"  ></i>
                    </el-input>
                    
                  </el-form-item>
                  </el-col>
                  </el-row>
              </el-form>
              
            </el-col> -->
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
              <!-- <el-table-column
                prop="assetsName"
                label="校区">
              </el-table-column> -->
              <el-table-column
                prop="type"
                label="评价类别">
                <template slot-scope="scope">
                  <span v-if="scope.row.type == '0'">教职工互评</span>
                  <span v-if="scope.row.type == '1'">学生对老师评价</span>
                  <span v-if="scope.row.type == '2'">督查对老师评价</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="receive"
                label="评价对象">
                <template slot-scope="scope">
                  <span v-if="scope.row.receive == '0'">部门</span>
                  <span v-if="scope.row.receive == '1'">教职工</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="xq"
                label="评价学期">
              </el-table-column>
              <!-- <el-table-column
                prop="assetsType"
                label="开始时间"
                width="150">
              </el-table-column>
              <el-table-column
                prop="assetsType"
                label="结束时间"
                width="150">
              </el-table-column> -->
              <el-table-column
                prop="project"
                label="评价项目">
              </el-table-column>
              <el-table-column
                prop="statename"
                label="状态"
                width="80">
                <!-- <template slot-scope="scope">
                  <span v-if="scope.row.state == '0'">未下发</span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="操作"
                width="220"
                >
                <template slot-scope="scope">
                  <el-button v-if="scope.row.state == '0'" @click="chenge(scope.row)" plain size="small">修改</el-button>
                  <el-button v-if="scope.row.state == '0'" @click="Issued(scope.row)" type="success" plain size="small">下发</el-button>
                  <el-button v-if="scope.row.state == '0'" @click="deleten(scope.row,'1')" type="danger" size="small">删除</el-button>
                  <el-button v-if="scope.row.state == '1'" @click="deleten(scope.row,'2')" type="danger" size="small">撤销</el-button>
                  <el-button v-if="scope.row.state == '1'" @click="deleten(scope.row,'3')" type="danger" size="small">结束</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="text-align:center; ">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page.pageNo"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="page.count">
            </el-pagination>
          </div>

<!-- 弹出 -->
<el-dialog   :visible.sync="dialogassets" width="35%" >
  <div slot="title"  >
      <p style="font-size:16px;" >{{optiontext+"评价体系"}}</p>
  </div>
  <div style="max-width: 540px; text-align:left;">
    <el-form :model="add_form"  :label-position="labelPosition" :rules="rules" label-width="100px"  ref='add_form'>
      <!-- <el-form-item  label="校区：" prop="sid" >
        <el-select v-model="add_form.sid"  @change="get_bm('1')" >
            <el-option v-for="(item,index) in form2.campus" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item  label="评价类别：" prop="type" >
        <el-select v-model="add_form.type" >
          <el-option label="教职工互评" value="0"></el-option>
          <el-option label="学生对老师评价" value="1"></el-option>
          <el-option label="督查对老师评价" value="2"></el-option>
        </el-select>
        </el-form-item>        
      <el-form-item  label="评价对象：" prop="receive" >
        <el-select v-model="add_form.receive" >
          <el-option label="部门" value="0"></el-option>
          <el-option label="教职工" value="1"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item v-if="add_form.receive =='1'" label="评价科目：" prop="subjectid" >
          <el-select v-model="add_form.subjectid" filterable placeholder="请选择或输入关键字">
            <el-option
              v-for="item in subjectlist"
              :key="item.id"
              :label="item.SubjectName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> 
        <el-form-item  v-if="add_form.receive =='0'" label="评价部门：" prop="deptid" >
          <el-select v-model="add_form.deptid" >
             <el-option v-for="(item,index) in form2.bm" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>      
      <el-form-item  label="评价学期：" prop="xq" >
        <el-select v-model="add_form.xq"  value-key="termId" >
          <el-option v-for="item in trem_list" :key="item.termId" :label="item.term" :value="item.term"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item  label="备注：" prop="remarks" >
          <el-input
            type="textarea"
            :rows="3"
            v-model="add_form.remarks">
          </el-input>
        </el-form-item>
        <el-form-item  label="评价项目：" prop="project" >
          <el-input
            type="textarea"
            :rows="3"
            v-model="add_form.project">
          </el-input>
        </el-form-item>

        <el-row >
          <el-form-item v-for="(item,index) in add_form.contentstr" :key="index"  label="评教内容：" prop="contentstr" >
          <el-col style="margin-right:10px;" :span="15">
              <el-input
                type="textarea"
                :rows="3"
                v-model="add_form.contentstr[index].content">
              </el-input>
          </el-col>
          <el-col :span="8">
              <div>
                <span>分数:</span>
                <el-input-number v-model="add_form.contentstr[index].score" size="small" controls-position="right"  :min="1" :max="10"></el-input-number>
              </div>
              <div style=" height: 30px;color: red;" ><i @click="del_contentstr(index)" style="cursor: pointer;" class="el-icon-delete"></i></div>
          </el-col>
          </el-form-item>
          <div style="float: left;padding-left: 100px;"><img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i @click="add_contentstr" style="cursor: pointer;vertical-align: middle; "> 添加</i></div>
        </el-row>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogassets = false">取 消</el-button>
    <el-button   type="primary" @click="assignation('add_form')" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>

<!-- 弹出 -->
<el-dialog title="下发"  :visible.sync="dialogIssued" width="35%" >
  <div style=" text-align:left;">
    <el-form :model="xf_form"  :label-position="labelPosition" :rules="rules" label-width="100px"  ref='xf_form'>
      <el-form-item  label="评价次数：" prop="times" >
        <el-select v-model="xf_form.times" >
          <el-option v-for="(item,index) in 3" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  v-for="(item,index) in xf_form.times" :key="index" :label="'第'+item+'次：'" prop="date" >
        <el-date-picker
          v-model="xf_form.date[index]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item  label="院系：" prop="deptid" >
        <el-select v-model="xf_form.deptid" @change="get_xf_bj(xf_form.deptid,'3')" >
          <el-option v-for="(item,index) in form2.xf_yx" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        </el-form-item>         -->
      <el-form-item  label="特色班：" prop="proid" >
        <el-select v-model="xf_form.proid"  @change="selectclasse"  >
          <el-option v-for="(item,index) in form2.proid" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        </el-form-item>        
      <el-form-item  label="年级：" prop="nj" >
        <el-select v-model="form2.nj" @change="selectclasse"  >
          <el-option
            v-for="item in form2.options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item  label="班级：" prop="clazzids" >
          <el-checkbox :isIndeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group  v-model="xf_form.clazzids" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="(item,index) in cities" :label="item" :key="item.clazzid" >{{item.clazzname}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogIssued = false">取 消</el-button>
    <el-button   type="primary" @click="sub_xf('xf_form')" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>


  </div>
</template>

<script>
import navTop from "../../common/header";
import validate from "../../../validate";
import AD from "../../../apis/admin.js";
import api from "../../../apis/login.js";
const qs = require('querystring');
export default {
  name: "fixed_evaluate",
  data() {
    return {
      checkAll: false,
      cities: [],
      isIndeterminate: false,
      loading:false,
      dialogIssued:false,
      dialogassets:false,
      tableloading:false,
      labelPosition: "right",
      optiontext:"",
      tableData:[
      ],
      trem_list:[],
      subjectlist:[],
      page:{
        pageNo: 1,
        pageSize: Number,
        count:1,
      },
      xf_form:{
        times:null,
        date:[],
        deptid:"",
        proid:"",
        clazzids:[],
        eid:""
      },
      select_form:{
        flag:"",
        name:""
      },
      add_form:{
        id:"",
        type:"",
        deptid:"",
        remarks:"",
        xq:"",
        subjectid:"",
        project:"",
        contentstr:[
          {content:"",id:"",score:""}
        ],
        sid:"",
        receive:"",
      },
      form2:{
        campus:[],
        bm:[],
        xf_yx:[],
        options:[],
        nj:"",
        proid:[]
      },
      rules:{
        type: [ { required: true, message: '请输入资产类型', trigger: 'blur' }, ],
        name: [ { required: true, message: '请输入资产名称', trigger: 'blur' }, ],
        num: [ 
           {type: 'number', required: true, message: '资产数量不能为空', trigger: 'blur' },
           { type: 'number', message: '数量必须为数字值'}
         ],
        Price: [ 
           {type: 'number', required: true, message: '单价不能为空', trigger: 'blur' },
           { type: 'number', message: '单价必须为数字值'}
        ],
      }
    };
  },
  components: {
    navTop
  },
  created() {
    AD.geTerm().then(r=>{
      if(r){
        this.trem_list = r.data.data;
      }
    });
    api.get_organ({ xz:2,id:""}).then(r => {
      if (r) {
        this.form2.bm = r.data.data;
      }
    });
    AD.get_major().then(r=>{
      if (r) {
        this.form2.proid = r.data.data;
      }
    })
    api.queryAllGrade().then(data=>{
      if(data) this.form2.options = data.data.data;
    })
    AD.get_allsubject().then(r=>{
      if(r){
        this.subjectlist = r.data.data;
      }
    })
  },
  mounted() {
   this.getlist()
  },
  computed: {},
  methods: {
    // get_bm(i){
    //   api.querycampus({ id: this.add_form.sid, type: 2 }).then(r => {
    //     if (r) {
    //       if(i == "1"){
    //         this.add_form.deptid = "";
    //         this.form2.xy = r.data.data;
    //       }else if(i == "2"){
    //         this.form2.xf_yx = r.data.data;
    //       }else{
    //         this.form2.xy = r.data.data;
    //       }
    //     }
    //   });
    // },
    del_contentstr(index){
      if(this.add_form.contentstr.length >= 2){
        this.add_form.contentstr.splice(index,1)
      }
    },
    add_contentstr(){
      this.add_form.contentstr.push({content:"",id:"",score:""})
      // console.log(this.add_form.contentstr)
    },
    handleCheckAllChange(val) {
      console.log(val)
      this.xf_form.clazzids = val ? this.cities : [];
      // this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    Issued(row){
      this.xf_form={
        times:null,
        date:[],
        deptid:"",
        proid:"",
        clazzids:[],
        eid:row.id
      },
      this.add_form.sid = row.sid;
      this.dialogIssued = true;
    },
    // get_xf_bj(r,i){
    //   api.querycampus({ id:r, type:i }).then(r => {
    //     if (r) {
    //       this.xf_form.proid ="";
    //       this.cities  = [],
    //       this.xf_form.clazzids =[]
    //       this.form2.proid =  r.data.data;
    //     }
    //   });
    // },
    selectclasse(){
      this.cities  = [],
      this.xf_form.clazzids =[]
      api.selectclasse({proid:this.xf_form.proid,gradeid:this.form2.nj}).then(r=>{
        if(r){
          this.cities = r.data.data;
        }
      })
    },
    sub_xf(formName){
      this.$refs[formName].validate((valid) =>{
        if (valid) {
          let data=JSON.parse(JSON.stringify(this.xf_form))
          data.date = JSON.stringify(data.date)
          let clazzids = data.clazzids.map(function(item){
            return item.clazzid
          })
          data.clazzids = clazzids.join();
          AD.start_xf(qs.stringify(data)).then(r=>{
            if(r){
              this.dialogIssued = false;
              this.$message({
                showClose: true,
                message: r.data.meta.message,
                type: "success",
                duration: "1500"
              });
            }
          })
        }
      })
    },
    //获取列表
    getlist(){
      let data = {
        "pageSize":10,
         "pageNo":this.page.pageNo, 
         "xq": "",
         "type":""
      }
      AD.getevallist(data).then(r=>{
        if(r) {this.tableData = r.data.data.list;this.page.count = r.data.data.count }
      })
    },
    deleten(row,i){
      let text="删除"
      if(i==='2'){
        text="撤销"
      }else if(i==='3'){
        text="结束"
      }
      this.$confirm('确认'+text+'?', "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            let formdata = new FormData();
            formdata.append("eid", row.id);
            if(i==='1'){
              AD.delevaluate(formdata).then(r => {
                instance.confirmButtonLoading = false;
                if (r) {
                  this.getlist();
                  done();
                  this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: "success",
                    duration: "1500"
                  });
                }
              });
            }else if(i==='2'){
              AD.set_cancel(formdata).then(r => {
                instance.confirmButtonLoading = false;
                if (r) {
                  this.getlist();
                  done();
                  this.$message({
                    showClose: true,
                    message: '撤销成功',
                    type: "success",
                    duration: "1500"
                  });
                }
              });
            }else{
              AD.set_over(formdata).then(r => {
                instance.confirmButtonLoading = false;
                if (r) {
                  this.getlist();
                  done();
                  this.$message({
                    showClose: true,
                    message: '结束成功',
                    type: "success",
                    duration: "1500"
                  });
                }
              });
            }
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
    
    chenge(row){
      AD.get_pjxq({"eid":row.id}).then(r=>{
        if(r){
          let eq = r.data.data
          this.add_form.id = eq.id;
          this.add_form.remarks = eq.remarks;
          this.add_form.sid = eq.sid;
          this.add_form.deptid = eq.deptid;
          this.add_form.subjectid = eq.subjectid;
          this.add_form.receive = eq.receive;
          this.add_form.type = eq.type;
          this.add_form.project = eq.project;
          this.add_form.xq = eq.xq;
          this.add_form.contentstr = eq.contents;
          this.optiontext = '修改'
          this.dialogassets = true;
          console.log(this.add_form)
        }
      })
    },
    assignation(formName){
      this.$refs[formName].validate((valid) =>{
        if (valid) {
          console.log(this.add_form)
          // if(this.optiontext == '添加'){
            this.loading = true;
            let data=JSON.parse(JSON.stringify(this.add_form))
             data.contentstr = JSON.stringify(data.contentstr)
            AD.setevaluate(qs.stringify(data)).then(r=>{
              if(r){
                this.getlist();
                this.loading = false;
                this.dialogassets = false;
                this.$message({
                  showClose: true,
                  message: '保存成功',
                  type: 'success',
                  duration:1500
                });
              }
            })
          // }else{
          //   data.id = this.add_form.id
          //   AD.setevaluate(qs.stringify(data)).then(r=>{
          //     if(r){
          //       this.getlist();
          //       this.loading = false;
          //       this.$message({
          //         showClose: true,
          //         message: '保存成功',
          //         type: 'success',
          //         duration:1500
          //       });
          //     let _this = this
          //     this.$refs[formName].resetFields();
          //     setTimeout(function(){
          //       _this.dialogassets = false;
          //     },0)
          //     }
          //   })
          // }
        } else {
          return false;
        }
      });
    },
    create(){
      this.optiontext = '添加'
      this.dialogassets = true;
      this.add_form={
        id:"",
        type:"",
        deptid:"",
        remarks:"",
        xq:"",
        subjectid:"",
        project:"",
        contentstr:[
          {content:"",id:"",score:""}
        ],
        sid:"",
        receive:"",
      }
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getlist();
    },
    
    
  },
  directives: {},
  watch: {
    'xf_form.times':function(val){
      this.xf_form.date=[];
    }
  }
};
</script>
<style scoped>
.dialog-ul li {
  float: left;
  width: 25%;
  text-align: left;
}
</style>

<style >
.fixed_evaluate .demo-table-expand {
    font-size: 0;
  }
 .fixed_evaluate .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
 .fixed_evaluate .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }
 .fixed_evaluate .el-input-number--small{
    width:85px;
  }
  .fixed_evaluate .el-checkbox-group .el-checkbox {
  width: 33%;
  margin-left: 0;
}
</style>