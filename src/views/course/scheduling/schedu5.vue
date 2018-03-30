<template>
  <div class="classcourse clear">
      <div class="classcourse-box-top"><span @click="creatermutex('2')"  ><img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加课程互斥限制</i></span><span  @click="creatermutex('3')"><img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加禁止课程相邻</i></span></div>
      <el-table
          :data="tableData"
          stripe
          v-loading.body="tableloading"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="str2"
            label="学科"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ruleDesc"
            label="要求">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
            >
            <template slot-scope="props">
              <el-tooltip :content="'修改'" placement="top">
                <span class="table-end-caozuo"><img @click="stumodofocation(props.$index,props.row)" src="../../../assets/image/xiugai.png"/></span>
              </el-tooltip>
              <el-tooltip :content="'删除'" placement="top">
                <span class="table-end-caozuo"><img @click=" deleteformation(props.$index,props.row)" src="../../../assets/image/delete-icon.png"/></span>
              </el-tooltip>
            </template>
          </el-table-column>
      </el-table>



      <!--教职工互斥-->
      <!--<el-dialog   :visible.sync="dialogVisibleassign" size='tiny' >
        <div slot="title" class="addclasses-cpm" >
            <img src="../../../assets/image/addstudent2.png" /><p>添加课程互斥限制</p>
        </div>
        <div style=" text-align:left;" class="clear" >
          <el-form ref="form"  :model="form" >
              <el-row :gutter="24">
                <el-col :span="9">
                <el-form-item >
                    <el-select  v-model="form.Course1" visible-change="false"  value-key="id"  >
                      <el-option v-for="(item,index) in form2.subject" :key="index" :label="item.SubjectName" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="2">
                  <span>和</span>
                </el-col>
                <el-col :span="9">
                <el-form-item >
                    <el-select  v-model="form.Course2" visible-change="false"  value-key="id"  >
                      <el-option v-for="(item,index) in form2.subject" :key="index" :label="item.SubjectName" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="4">
                  <span>不同时排课</span>
                </el-col>
              </el-row>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleassign = false">取 消</el-button>
          <el-button   type="primary" @click="assignation('assign')" :loading="loading" >确 定</el-button>
        </div>
      </el-dialog>-->

      <!--教职工时段限制-->
      <el-dialog   :visible.sync="dialogVisibletime" width="30%" >
        <div slot="title"  >
            <p style="font-size:16px;" >{{opctionstext}}</p>
        </div>
        <div style="text-align:left;" class="clear" > 
            <el-form ref="form"  v-model="form" >
              <el-row type="flex"  justify="space-around">
                <el-col :span="8">
                <el-form-item >
                    <el-select  v-model="form.Course1" filterable placeholder="请选择或输入关键字"  value-key="id"  >
                      <el-option v-for="(item,index) in form2.subject" :key="index" :label="item.courseName" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="3">
                  <div class="mark-text">{{opctionsbodytext[0]}}</div>
                </el-col>
                <el-col :span="8">
                <el-form-item >
                    <el-select  v-model="form.Course2" filterable placeholder="请选择或输入关键字"  value-key="id"  >
                      <el-option v-for="(item,index) in form2.subject" :key="index" :label="item.courseName" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="5">
                  <div class="mark-text" >{{opctionsbodytext[1]}}</div>
                </el-col>
              </el-row>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibletime = false">取 消</el-button>
          <el-button   type="primary" @click="timenation('assign')" :loading="loading" >确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import course from '../../../apis/course.js'
import api from '../../../apis/login.js'
export default {
  name: 'classcourse',
  data() {
    return {
      loading:false,
      tableloading:false,
      // dialogVisibleassign:false,
      dialogVisibletime:false,
      form:{
        region:"",
        Course1:{},
        Course2:{},
      },
      form2:{
        subject:"",
      },
      ScheduleID:"",
      opctionstext:"",
      opctionsbodytext:[],
      tableData: [],
      rowid:"",
    }
  },
  components:{

  },
  created(){
    
  },
  mounted() {
    this.ScheduleID = this.$Cookies.get('sectionid');
    this.getteacherpeclist();
    this.getsubject();
  },
  computed: {
    
  },
  methods: {
    //获取学科
    getsubject(){
      course.get_allcourse().then(data=>{
        if(data) this.form2.subject = data.data.data;
      })
    },
    //排课要求listCSdisType
    getteacherpeclist(){
      this.tableloading = true;
      course.getTeacherSpe({'type':'1'}).then(data=>{
        this.tableloading = false;
        if(data){
          this.tableData = data.data.data;
        }
      })
    },
    // creatertime(){
    //   this.dialogVisibleassign = true;
    // },
    handleCheckChanges(){

    },
    //添加课程不相邻 CSsaveSpe
    timenation(){
      if(this.opctionsbodytext[2] == '1'){
        let formdata = new FormData()
        formdata.append('ruleId1', this.form.Course1.id);
        formdata.append('ruleId2', this.form.Course2.id);
        formdata.append('scheduleId', this.ScheduleID);
        formdata.append('teachCourse', '1');
        if(this.opctionstext == "添加课程禁止相邻"){
          let datas = this.form.Course1.courseName+"不排在"+this.form.Course2.courseName+"前面"
          formdata.append('ruleDesc', datas);
          formdata.append('ruleType', '3');
        }
        if(this.opctionstext == "添加课程互斥限制"){
          let datas = this.form.Course1.courseName+"、"+this.form.Course2.courseName+"不同时排课"
          formdata.append('ruleDesc', datas);
          formdata.append('ruleType', '2');
        }
         this.loading=true;
         course.CSsaveSpe(formdata).then(data=>{
          this.loading=false;
          if(data){
            this.dialogVisibletime = false;
            this.$message({
              showClose: true,
              message: data.data.meta.message,
              type: 'success'
            });
            this.getteacherpeclist();
          }
        })
      }else{
        let formdata = new FormData()
        formdata.append('id',this.rowid );
        formdata.append('ruleId1', this.form.Course1.id);
        formdata.append('ruleId2', this.form.Course2.id);
        if(this.opctionstext == "修改课程禁止相邻"){
          let datas = this.form.Course1.courseName+"不排在"+this.form.Course2.courseName+"前面"
          formdata.append('ruleDesc',datas);
        }
        if(this.opctionstext == "修改课程互斥限制"){
          let datas = this.form.Course1.courseName+"、"+this.form.Course2.courseName+"不同时排课"
          formdata.append('ruleDesc', datas);
        }
        this.loading=true;
        course.CSupdateSpe(formdata).then(data=>{
          this.loading=false;
          if(data){
            this.dialogVisibletime = false;
            this.$message({
              showClose: true,
              message: data.data.meta.message,
              type: 'success'
            });
            this.getteacherpeclist();
          }
        })
      }
    },
    //添加教职工互斥
    // assignation(){

    // },
    handleCheckChange(){

    },
   //禁止课程相邻
    creatermutex(d){
      if(d == '3'){
        this.opctionstext="添加课程禁止相邻";
        this.opctionsbodytext =['不排在','前面','1'];
      }
      if(d == '2'){
        this.opctionstext="添加课程互斥限制";
        this.opctionsbodytext =['和','不同时排课','1'];
      }
      this.dialogVisibletime = true;
    },
    //修改CSupdateSpe
    stumodofocation(index,row){
      // let ids = row.ruleName.split(',')
      let strs = row.str2.split(',')
      if(row.ruleType == '3'){
        this.opctionstext="修改课程禁止相邻";
        this.opctionsbodytext =['不排在','前面','2'];
      }
      if(row.ruleType == '2'){
        this.opctionstext="修改课程互斥限制";
        this.opctionsbodytext =['和','不同时排课','2']; 
      }
      this.form.Course1.id = row.ruleId1;
      this.form.Course2.id = row.ruleId2;
      this.form.Course1.SubjectName = strs[0];
      this.form.Course2.SubjectName = strs[1];
      this.rowid = row.id;
      this.form = JSON.parse(JSON.stringify(this.form))
      this.dialogVisibletime = true;
    },
    deleteformation(index,row){
      this.$confirm('确认删除?', '提示', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            let formdata = new FormData()
            formdata.append('id', row.id);
            course.CSdeleteSpe(formdata).then(data=>{
              instance.confirmButtonLoading = false;
              if(data){
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: 'success'
                });
                this.getteacherpeclist();
             }
          })
        } else {
          instance.confirmButtonLoading = false;
          done();
        }
        }
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });        
      });
    }
  },
  directives:{
        
  },
  watch:{
  }
     
}

</script>
<style scoped>
.classcourse{
  height:100%;
  text-align: left;
}
.classcourse-box-top{
  margin-bottom:20px;
}
.classcourse-box-top span{
  cursor: pointer;
  margin-right:10px;
  color:#208af5;
  font-size:12px;
}
.classcourse .mutex-box-saff{
  position:relative;
  width:40%; 
  min-height:120px; 
  border:1px solid #bfcbd9;
}
.classcourse .mutex-box-saff .mutex-box-saff-text{
  position:absolute;
  bottom:-22px;
  left:2px;
}
.classcourse .mark-text{
  text-align:center;
  line-height:32px;
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
</style>
<style>

</style> 