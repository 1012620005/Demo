<template>
  <div class="classcourse clear">
      <div class="classcourse-left left" >
          <h3 class="el-h3">教职工列表</h3>
          <el-row class="tac">
            <el-col :span="24" style="overflow:auto; height:600px;" >
              <el-menu default-active="1" class="el-menu-vertical-demo" @select="sLTeacher">
                <el-scrollbar tag="ul"  wrap-class="el-select-dropdown__wraps"
                  view-class="el-select-dropdown__list">
                  <el-menu-item :index="item.id" v-for="(item,index) in teacherList" :key="index">{{item.name}}</el-menu-item>
                </el-scrollbar>
              </el-menu>
            </el-col>
          </el-row>
      </div> 
      <div class="classcourse-right right" >
        <p class="el-h3"><img @click="Addinglectures" src="../../../assets/image/Adding-lectures-icon.png"/></p>
        <el-table
          :data="tableData"
          stripe
          v-loading.body="tableloading"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="str5"
            label="学科"
            width="150">
          </el-table-column>
          <el-table-column
            prop="schoolYear"
            label="学年"
            width="90">
          </el-table-column>
          <el-table-column
            prop="str1"
            label="校区"
            width="130">
          </el-table-column>
          <el-table-column
            prop="str2"
            label="院系"
            width="130">
          </el-table-column>
          <el-table-column
            prop="str3"
            label="专业"
            width="140">
          </el-table-column>
          <el-table-column
            prop="str4"
            label="班级"
            width="110"
            >
          </el-table-column>
          <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-tooltip :content="'修改'" placement="top">
                  <span class="table-end-caozuo"><img @click="stumodofocation(scope.$index,scope.row)" src="../../../assets/image/xiugai.png"/></span>
                </el-tooltip>
                <el-tooltip :content="'删除'" placement="top">
                  <span class="table-end-caozuo"><img @click=" deleteformation(scope.$index,scope.row)" src="../../../assets/image/delete-icon.png"/></span>
                </el-tooltip>
              </template>
            </el-table-column>
        </el-table>
      </div>


      <el-dialog   :visible.sync="dialogLecture" size='tiny' >
            <div slot="title" class="addclasses-cpm" >
                <img src="../../../assets/image/addstudent2.png" /><p>{{operationText}} </p>
            </div>
            <div style=" text-align:left;" class="clear Sectiontime" >
              <div style = "380px;">
                <el-form :label-position="labelPosition" label-width="80px" :rules="rules" ref="assign" :model="form">
                  <el-form-item label="学科:">
                    <el-col :span="12">
                      <el-select  v-model="form.subject"  value-key="id" >
                        <el-option v-for="(item,index) in form2.subject" :key="index" :label="item.SubjectName" :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="学年:">
                      <el-col :span="12">
                        <el-select  @change="selectclass"  v-model="form.schoolyear" >
                          <el-option v-for="(item,index) in form2.schoolyear" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="校区:">
                    <el-col :span="12">
                      <el-select   @change="selectdepar" v-model="form.campus"  value-key="id" >
                        <el-option v-for="(item,index) in form2.campus" :key="index" :label="item.name" :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="院系:">
                    <el-col :span="12">
                      <el-select  @change="selectmajor"  v-model="form.departments" value-key="id" >
                        <el-option v-for="(item,index) in form2.departments" :key="index" :label="item.name" :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="专业:">
                    <el-col :span="12">
                      <el-select @change="selectclass"  v-model="form.major" value-key="id" >
                        <el-option v-for="(item,index) in form2.major" :key="index" :label="item.name" :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="班级:"  prop="class">
                    <el-col :span="12">
                      <el-select  v-model="form.class"   value-key="id"  > 
                        <el-option v-for="(item,index) in form2.class" :key="index" :label="item.name" :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-form>
              </div>
              
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogLecture = false">取 消</el-button>
              <el-button   type="primary" @click="timenation('assign')" :loading="loading"  >确 定</el-button>
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
      tableloading:false,
      operationText:"",
      loading:false,
      dialogLecture:false,
      labelPosition:'right',
      teacherList:"",
      sLTeachers:null,
      form:{
        subject:"",    //学科
        schoolyear:"",    //学年
        campus:"",          //校区
        departments:"",         //院系
        major:"",           //专业
        class:"",         //班级
        id:"",
        gradeId:""
      },
      form2:{
        subject:"",    //学科
        schoolyear:"",    //学年
        campus:"",          //校区
        departments:"",         //院系
        major:"",           //专业
        class:"",         //班级
      },
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        tableData: [],
        currentRow: null,
        rules: {
          class: [
            {type:'object', required: true, message: '请选择班级', trigger: 'change' }
          ],
        }
    }
  },
  components:{

  },
  created(){
    course.teacherlist().then(data=>{
      if(data){
        this.teacherList = data.data.data
      }
    })
    api.queryCourse().then(data=>{
      if(data){
        this.form2.subject = data.data.data
      }
    })
    api.timeofenrollment().then(data=>{
      if(data){
         this.form2.schoolyear = data.data.data
      }
    })
    let parms = { id:1,type:4}
    api.querycampus(parms).then(data=>{                //查询校区
      if(data){
        this.form2.campus = data.data.data
      }
    })
  },
  mounted() {

  },
  computed: {
    
  },
  methods: {
    
    //查找学院
    selectdepar(){
        for(var i in this.form) {
          if(i == 'departments') this.form[i] = '';
          if(i == 'major') this.form[i] = '';
          if(i == 'class') this.form[i] = '';
        }
        let parms = { id:this.form.campus.id,type:2} 
        api.querycampus(parms).then(data=>{
            this.form2.departments = data.data.data
        })
    },
    //查找专业
    selectmajor(){
        for(var i in this.form) {
          if(i == 'major') this.form[i] = '';
          if(i == 'class') this.form[i] = '';
        }
        let parms = {id:this.form.departments.id, type:3} 
        api.querycampus(parms).then(data=>{
            this.form2.major = data.data.data
        })
    },
    selectclass(){
        for(var i in this.form) {
          if(i == 'class') this.form[i] = '';
        }
        let parms = {
            proid:this.form.major.id,
            year:this.form.schoolyear} 
        api.selectclasse(parms).then(data=>{
            this.form2.class = data.data.data
        })
    },
    //getlist
    getlist(){
      this.tableloading = true;
      course.GTClist({'teacherId':this.sLTeachers}).then(data=>{
        this.tableloading = false;
        if(data) this.tableData = data.data.data
      })
    },
    //导航
    sLTeacher(index){
      this.sLTeachers = index
      this.getlist();
    },
    //添加授课
    Addinglectures(){
      if(this.sLTeachers !== null){
        this.dialogLecture = true;
        this.operationText = "添加授课"
      }else{
        this.$message({
          showClose: true,
          message: '请先选择添加授课教师',
          type: 'warning'
        });
      }
    },
    //确认添加
    timenation(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading=true;
          let  formdata = new FormData()
          if(this.operationText == "添加授课"){
            formdata.append('subjectId', this.form.subject.id);
            formdata.append('schoolYear', this.form.schoolyear);
            formdata.append('campusId', this.form.campus.id);
            formdata.append('departmentId', this.form.departments.id);
            formdata.append('majorId', this.form.major.id);
            formdata.append('teacherId', this.sLTeachers);
            formdata.append('classId', this.form.class.id);
            course.TCsave(formdata).then(data=>{
              console.log(data)
              this.loading=false;
              if(data){
                this.getlist();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: 'success'
                });
                this.dialogLecture = false;
              }
            }).catch(req=>{
              this.loading=false;
            })
          }else{
            formdata.append('subjectId', this.form.subject.id);
            formdata.append('schoolYear', this.form.schoolyear);
            formdata.append('campusId', this.form.campus.id);
            formdata.append('departmentId', this.form.departments.id);
            formdata.append('majorId', this.form.major.id);
            formdata.append('teacherId', this.sLTeachers);
            formdata.append('classId', this.form.class.id);
            formdata.append('id', this.form.id);
            formdata.append('gradeId', this.form.gradeId);
            console.log()
            course.TCupdate(formdata).then(data=>{

              this.loading=false;
              if(data){
                this.getlist();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: 'success'
                });
                this.dialogLecture = false;
              }
            }).catch(req=>{
              this.loading=false;
            })
          }
        } else {
          return false;
        }
      });
    },
    //修改
    stumodofocation(index,row){
      console.log(row)
      let _this = this
      this.form.subject ={name:row.str5,id:row.subjectId};    //学科
      this.form.schoolyear = row.schoolYear; //学年
      this.form.campus = {name:row.str1,id:row.campusId};          //校区
      this.form.departments = {name:row.str2,id:row.departmentId};     //院系
      this.form.major = {name:row.str3,id:row.majorId};           //专业
      this.form.class = {name:row.str4,id:row.classId};         //班级
      this.form.id = row.id;
      this.form.gradeId = row.gradeId;
      this.operationText = "修改授课"
      this.dialogLecture = true;
    },
    //删除
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
            course.TCdelete(formdata).then(data=>{
              instance.confirmButtonLoading = false;
              this.dialogVisibleassign = false;
              if(data){
                done();
                this.getlist();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: 'success'
                });
             }
          })
        } else {
          done();
        }
        }
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });        
      });
    },
    handleCurrentChange(val){
       this.currentRow = val;
       console.log(val)
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
.classcourse-left{
  width:240px;
}
.classcourse .el-h3{
  margin-bottom:15px;
  height:22px;
}
.classcourse .el-h3 img{
  cursor:pointer;
}
.classcourse-right{
  width:900px;
}
.classcourse-right .text{
  text-align:right;
  margin-bottom:5px;
}
.el-table .info-row {
    background: #c9e5f5;
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
</style>
<style>
.el-select-dropdown__wraps{
  height:600px;
}
.classcourse .el-table .cell{
  padding-right:0;
}
</style>