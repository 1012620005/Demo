<template>
  <div class="tevaluation">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >处罚管理</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="tevaluation-box">
        <div class="tevaluation-top clear" >
          <div>
            <el-row  >
              <el-col :span="2">
            <span @click="create" style="height: 36px;line-height: 36px;" class="add-button"><img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加处罚</i></span>
            </el-col>
           <el-col :span="20">
            <el-form :model="form" label-width="50px" ref="ruleForm" >
              <el-row   type="flex" class="row-bg" justify="space-between"  >
                <el-col :span="5">
                  <el-form-item label="校区">
                    <el-select v-model="form.xq" clearable @change="query(form.xq,2)" placeholder="">
                        <el-option v-for="item in defa.xq" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="院系">
                    <el-select v-model="form.yx" clearable @change="query(form.yx,3)" placeholder="">
                      <el-option v-for="item in defa.yx" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="专业">
                    <el-select v-model="form.zy" @change="selectclass" clearable placeholder="">
                      <el-option v-for="item in defa.zy" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="年级">
                    <el-select v-model="form.nj" @change="selectclass" clearable placeholder="">
                      <el-option v-for="item in defa.nj" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="班级">
                    <el-select v-model="form.bj"  @change="classgetlist"  clearable  placeholder="">
                      <el-option v-for="item in defa.bj" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            </el-col>
              </el-row>
          </div>
          <div style="margin:15px 0 20px;">
            <el-table
              :data="tableData"
              stripe
              v-loading.body="tableloading"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="65">
              </el-table-column>
              <el-table-column
                prop="ssname"
                label="校区"
                >
              </el-table-column>
              <el-table-column
                prop="dept"
                label="院系"
               >
              </el-table-column>
              <el-table-column
                prop="pro"
                label="专业"
                >
              </el-table-column>
              <el-table-column
                prop="grade"
                label="年级"
                >
              </el-table-column>
              <el-table-column
                prop="clazz"
                label="班级"
                >
              </el-table-column>
              <el-table-column
                prop="user"
                label="姓名"
                width="100">
              </el-table-column>
              <el-table-column
                prop="content"
                label="处罚内容"
                width="180">
                <template slot-scope="props">
                  <div >
                   {{ props.row.content | filterFun }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="updateDate"
                label="处罚时间"
                width="180">
              </el-table-column>
              <el-table-column
                label="操作"
                width="100"
                >
                 <template slot-scope="props">
                  <el-tooltip :content="'点击修改'" placement="top">
                   <span style="cursor: pointer;" ><img style="vertical-align: middle;" @click="chenge(props.row)" src="../../assets/image/xiugai.png"/></span>
                  </el-tooltip>
                  <el-tooltip :content="'点击删除'" placement="top">
                   <span style="cursor: pointer;" ><img style="vertical-align: middle;" @click=" deleten(props.row)" src="../../assets/image/delete-icon.png"/></span>
                  </el-tooltip>
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
      </div>
    </div>
<el-dialog   :visible.sync="dialogassets" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" @click="getUEContent" >添加处罚</p>
  </div>
  <div style="max-width:320px; text-align:left;">
    <el-form :model="formpop"  :label-position="labelPosition"  label-width="65px"  ref='formpop'>
        <el-form-item label="校区">
          <el-select v-model="formpop.xq" clearable @change="querypop(formpop.xq,2)" placeholder="">
              <el-option v-for="item in pop.xq" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系">
          <el-select v-model="formpop.yx" clearable @change="querypop(formpop.yx,3)" placeholder="">
            <el-option v-for="item in pop.yx" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="formpop.zy" @change="selectpop" clearable placeholder="">
            <el-option v-for="item in pop.zy" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="formpop.nj" @change="selectpop" clearable placeholder="">
            <el-option v-for="item in pop.nj" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="formpop.bj"  @change="getstu" clearable  placeholder="">
            <el-option v-for="item in pop.bj" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生">
          <el-select v-model="formpop.stu"  clearable  placeholder="">
            <el-option v-for="item in pop.stu" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="内容:" prop="cont">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="formpop.cont">
          </el-input>
        </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogassets = false">取 消</el-button>
    <el-button   type="primary" @click="assignation('formpop')" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>


<el-dialog   :visible.sync="dialogassetsxiu" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >修改处罚</p>
  </div>
  <div style="max-width:320px; text-align:left;">
    <el-form :model="formpop"  :label-position="labelPosition"  label-width="65px"  ref='formpop'>
        <el-form-item label="校区">
          <div>{{row.ssname}}</div>
        </el-form-item>
        <el-form-item label="院系">
          <div>{{row.dept}}</div>
        </el-form-item>
        <el-form-item label="专业">
          <div>{{row.pro}}</div>
        </el-form-item>
        <el-form-item label="年级">
          <div>{{row.grade}}</div>
        </el-form-item>
        <el-form-item label="班级">
          <div>{{row.clazz}}</div>
        </el-form-item>
        <el-form-item label="学生">
          <div>{{row.user}}</div>
        </el-form-item>
        <el-form-item  label="内容:" prop="cont">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="formpop.cont">
          </el-input>
        </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogassetsxiu = false">取 消</el-button>
    <el-button   type="primary" @click="assignation('formpop')" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import navTop from "../common/header";
import validate from "../../validate";
import api from '../../apis/login.js'
import AD from "../../apis/admin.js";
const qs = require("querystring");
export default {
  name: "tevaluation",
  data() {
    return {
      dialogassetsxiu:false,
      flag:false,
      dialogassets:false,         //弹出
      optiontext:'',
      loading:false,
      tableloading:false,
      treeloading: false,
      labelPosition: "right",
      data2: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData:[],
      page: {
        pageNo: 1,
        pageSize: Number,
        count: null
      },
      form: {
        xq: "",
        yx: "",
        zy: "",
        nj: "",
        bj: "",
        name: "",
      },
      defa: {
        xq: [],
        yx: [],
        zy: [],
        nj: [],
        bj: [],
        name: "",
      },
      formpop: {
        id:'',
        xq: "",
        yx: "",
        zy: "",
        nj: "",
        bj: "",
        stu:'',
        cont:"",
      },
      pop: {
        xq: [],
        yx: [],
        zy: [],
        nj: [],
        bj: [],
        stu:[]
      },
      row:''
    };
  },
  components: {
    navTop
  },
  created() {},
  mounted() {
    this.query(1,4);
    this.querypop(1,4);
    this.getlist();
    api.queryAllGrade().then(data=>{
      if(data) this.defa.nj = data.data.data;this.pop.nj = data.data.data;
    })
  },
  computed: {},
  filters: {  
    filterFun: function (value) {  
      if(value == null){
        return value
      }else{
        return value.split('').length >8 ? value.substring(0,8)+"..." :value
      }
    }  
  },
  methods: {
    getUEContent() {
        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      },
    getlist(){
      let data={
        'teacherId':this.$Cookies.get('user'),
        'ssId':this.form.xq,
        'deptId':this.form.yx,
        'proId':this.form.zy,
        'gradeId':this.form.nj,
        'clazzId':this.form.bj,
        'pageNo': this.page.pageNo,
        'pageSize': 10
      }
      AD.punishlist(qs.stringify(data)).then(r=>{
        if(r) {this.tableData = r.data.data.list;this.page.count = r.data.data.count }
      })
    },
    query(id,type){
      let parms = {
          id:id,
          type:type
        } 
      api.querycampus(parms).then(data=>{                //查询校区
        if(type == 4){
          this.defa.xq = data.data.data;
        };
        if(type == 2){
          this.form.yx = '';
          this.form.zy = '';
          this.form.bj = '';
          this.defa.yx = data.data.data;
        };
        if(type == 3){
          this.form.zy = '';
          this.form.bj = '';
          this.defa.zy = data.data.data;
        }
        this.getlist()
      })
    },
    selectclass(){    //查询班级
      this.getlist() 
      if(this.form.zy == '' || this.form.nj == '') return;
      this.form.bj = '';
      let parms = {
          proid:this.form.zy,
          gradeid:this.form.nj
      }            
      api.selectclasse(parms).then(data=>{
          this.defa.bj = data.data.data
      })
    },
    classgetlist(){
      this.getlist()
    },
    querypop(id,type){
      // if(this.form.zy == '' || this.form.yx == '') return;
      let parms = {
          id:id,
          type:type
        } 
      api.querycampus(parms).then(data=>{                //查询校区
        if(type == 4){
          this.pop.xq = data.data.data;
        };
        if(type == 2){
          if(!this.flag){
            this.formpop.yx = '';
            this.formpop.zy = '';
            this.formpop.bj = '';
          }
          this.pop.yx = data.data.data;
        };
        if(type == 3){
          if(!this.flag){
            this.formpop.zy = '';
            this.formpop.bj = '';
          }
          this.pop.zy = data.data.data;
        }
      })
    },
    getstu(){
      if(this.formpop.bj == '') return;
      AD.getstu({'clazzid':this.formpop.bj}).then(r=>{
        this.pop.stu = r.data.data;
      })
    },
    selectpop(){    //查询班级
      if(this.formpop.zy == '' || this.formpop.nj == '') return;
      if(!this.flag){
            this.formpop.bj = '';
       }
      let parms = {
          proid:this.formpop.zy,
          gradeid:this.formpop.nj
      }            
      api.selectclasse(parms).then(data=>{
          this.pop.bj = data.data.data
      })
    },
    findStudentByFdy(){

    },
    assignation(formName){
      this.$refs[formName].validate((valid) =>{
        if (valid) {
          this.loading = true;
          if(this.optiontext == '添加'){
            let data={
            'ssId':this.formpop.xq,
            'deptId':this.formpop.yx,
            'proId':this.formpop.zy,
            'gradeId':this.formpop.nj,
            'clazzId':this.formpop.bj,
            'teacherId':this.$Cookies.get('user'),
            'userId':this.formpop.stu,
            'content':this.formpop.cont
          }
            // data.userId = this.$Cookies.get('userid');
            AD.punishadd(qs.stringify(data)).then(r=>{
              if(r){
                this.getlist();
                this.loading = false;
              this.$message({
                showClose: true,
                message: '保存成功',
                type: 'success',
                duration:1500
              });
              console.log(this.$refs[formName])
              this.$refs[formName].resetFields();
              this.dialogassets = false;
              }
            })
          }else{
            let data={
              'id':this.formpop.id,
              'userId':this.formpop.stu,
              'content':this.formpop.cont
            }
            AD.punishup(qs.stringify(data)).then(r=>{
              if(r){
                this.getlist();
                this.loading = false;
                this.$message({
                  showClose: true,
                  message: '保存成功',
                  type: 'success',
                  duration:1500
                });
                this.$refs[formName].resetFields();
                this.dialogassetsxiu = false;
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    create(){
      this.dialogassets = true;
      this.optiontext='添加'
      this.formpop.xq = ''
      this.formpop.zy = ''
      this.formpop.yx = ''
      this.formpop.nj = ''
      this.formpop.bj = ''
      this.formpop.stu = ''
      this.formpop.cont = ''
    },
    deleten(row){
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
            formdata.append("id", row.id);
            AD.punishdel(formdata).then(r => {
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
    chenge(row){
      this.flag = true;
      this.optiontext='修改'
      this.formpop.id = row.id;
      this.row = row;
      // this.formpop.xq = row.ssId;
      // this.querypop(row.ssId,2)
      // this.formpop.yx = row.deptId
      // this.querypop(row.deptId,3)
      // this.formpop.zy = row.proId
      // this.formpop.nj = row.gradeId
      // this.selectpop();
      // this.formpop.bj = row.clazzId
      // this.getstu()
      this.formpop.stu = row.userId
      this.formpop.cont = row.content
      this.dialogassetsxiu = true;
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
    
  },
  directives: {},
  watch: {
    dialogassets:function(news,old){
      if(this.optiontext == '修改'){
        if(!news){
          this.flag = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.report {
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
.tevaluation-box {
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 40px;
  background-color: #fff;
}
.tevaluation-top {
  margin: 0 auto;
  width: 1160px;
  padding-top: 20px;
}

.logon-main-logon-right-button .el-button--primary {
  background-color: #208af5;
  width: 94px;
}

</style>