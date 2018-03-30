<template>
  <div class="classcourse clear">
      <div class="classcourse-left left" >
          <el-select @change="getclassList" v-model="scyearvalue" placeholder="选择学年" value-key="id">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item">
            </el-option>
          </el-select>
          <el-row class="tac">
            <el-col :span="24">
              <el-tree
                v-loading.body="treeloading"
                :data="data2"
                ref="tree"
                highlight-current
                :props="defaultProps"
                @node-click="getcouseList"
                accordion
                node-key="id">
              </el-tree>
            </el-col>
          </el-row>
      </div> 
      <div class="classcourse-right right" >
        <div class="el-h3">
          <el-select  v-model="form.schoolyear" value-key="term" visible-change="false" placeholder="选择学期" >
            <el-option v-for="(item,index) in form2.schoolyear" :key="item.term" :label="item.term" :value="item"></el-option>
          </el-select>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          highlight-current-row
          v-loading.body="tableloading"
          @current-change="handleCurrentChange">
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="str2"
            label="学科"
            width="120">
          </el-table-column>
          <el-table-column
            prop="str2"
            label="学期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="str3"
            label="授课老师"
            width="90">
          </el-table-column>
          <el-table-column
            prop="weekNum"
            label="每周节数"
            width="90">
          </el-table-column>
          <el-table-column
            prop="classNum"
            label="连堂节数"
            width="90">
          </el-table-column>
          <el-table-column
            prop="classOrder"
            label="连堂次数"
            width="90"
            >
          </el-table-column>
          <el-table-column
            prop="oneWeek"
            label="单双周"
            width="90">
          </el-table-column>
          <el-table-column
            prop="Weekly"
            label="授课周次"
            width="130">
            <template slot-scope="scope">
              <span></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="oneWeek"
            label="地点"
            width="90">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="chenge(scope.row)" type="text" size="small">设置</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>


      <el-dialog   :visible.sync="dialogLecture" width="30%" >
            <div slot="title"  >
                <p style="font-size:16px;" >设置</p>
            </div>
            <div style=" text-align:left;" class="clear Sectiontime" >
              <div style = "max-width:550px; ">
                <el-form :label-position="labelPosition" label-width="85px" :rules="rules" ref="assign" :model="form">
                  <el-form-item label="学期:">
                    <el-col :span="11">
                      <el-select  v-model="form.schoolyear" value-key="term" visible-change="false" >
                        <el-option v-for="(item,index) in form2.schoolyear" :key="item.term" :label="item.term" :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="授课老师:">
                    <el-col :span="11">
                     <el-select  v-model="form.teacher" @change="querytechxk" visible-change="false"  value-key="id">
                        <el-option v-for="(item,index) in form2.teacher" :key="item.id" :label="item.name" :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="学科:">
                    <el-col :span="11">
                      <el-select  v-model="form.subject" visible-change="false"  value-key="subjectid"  >
                        <el-option v-for="(item,index) in form2.subject" :key="item.subjectid" :label="item.subjectname" :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="每周节数:" prop="weeks">
                    <el-col :span="11">
                      <el-input v-model.number="form.weeks" ></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="连堂节数:">
                    <el-col :span="11">
                      <el-select  v-model="form.series" >
                        <el-option v-for="(item,index) in 7" :key="index" :label="item+1" :value="item+1"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="连堂次数:">
                    <el-col :span="11">
                      <el-select  v-model="form.loop" >
                        <el-option v-for="(item,index) in 10" :key="index" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="单双周:">
                    <el-col :span="11">
                      <el-select  v-model="form.double" value-key="num" >
                        <el-option v-for="(item,index) in form2.double" :key="item.num" :label="item.text" :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="授课周次:">
                     <el-col :span="6">
                        <el-select  v-model="form.Weeklystar" >
                          <el-option v-for="(item,index) in form2.Weeklystar" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-col>
                      <el-col  :span="1">--</el-col>
                      <el-col :span="6">
                        <el-select  v-model="form.Weeklyend" >
                          <el-option v-for="(item,index) in form2.Weeklystar" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="7">
                        <span @click="goSemester" style="color:#208af5; display:inline-block; text-decoration: underline;cursor: pointer; margin-left:10px;">设置学期起止时间</span>
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
import course from "../../../apis/course.js";
import api from "../../../apis/login.js";
export default {
  name: "classcourse",
  data() {
    return {
      tableloading: false,
      treeloading: false,
      scyearvalue: "",
      SelectedClassId: "",
      loading: false,
      dialogLecture: false,
      labelPosition: "right",
      form: {
        schoolyear: "",
        subject: {}, //学科
        teacher: "", //授课老师
        weeks: "", //每周节数
        series: "", //连堂节数
        loop: "", //周次
        double: "", //单双周
        Weeklystar: "", //授课周次
        Weeklyend: "", //授课周次
        id: ""
      },
      form2: {
        schoolyear: "",
        subject: [], //学科
        teacher: [], //授课老师
        weeks: "", //每周节数
        series: "", //连堂节数
        loop: "", //周次
        double: [
          { text: "不限", num: 0 },
          { text: "单周", num: 1 },
          { text: "双周", num: 2 }
        ], //单双周
        Weeklystar: "", //授课周次
        Weeklyend: "" //授课周次
      },
      data2: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      options: [],
      tableData: [{

      }],
      currentRow: null,
      rules: {
        subject: [{type: "object", required: true, message: "请选择班级",trigger: "change"}],
        weeks: [{ type: "number", required: true, message: "必须为数字值" }]
      }
    };
  },
  components: {},
  created() {
    course.getTerm().then(data => {
      if (data) this.form2.schoolyear = data.data.data;
      // this.scyearvalue = this.form2.schoolyear[0];
    });
    api.queryAllGrade().then(data => {
      if (data) this.options = data.data.data;this.scyearvalue = this.options[0];
    });
  },
  mounted() {
    this.getsubject();
  },
  computed: {},
  methods: {
    querytechxk(){
      let u={
        'teaid':this.form.teacher.id,
        'gradeid':this.scyearvalue.id
      }
      course.querytechxk(u).then(r=>{
        if(r){
           this.form2.subject=[];
          let _this = this
          r.data.data.map(function(item){
            if(item.clazzid == _this.SelectedClassId){
              _this.form2.subject.push(item);
            }
          })
        }
      })
    },
    goSemester(){
      this.$router.push('/submgeset')
    },
    //数据过滤
    // formatter(row, column) {
    //   return this.form2.double[row.oneWeek].text;
    // },
    //获取班级列表classList
    getclassList() {
      this.treeloading = true;
      let data = { 'gradeid': this.scyearvalue.id };
      course.classList(data).then(data => {
        this.treeloading = false;
        if (data) this.data2 = data.data.data;
      });
    },
    //班级关联教师列表classgetTeacher
    getteachlist(id) {
      course.classgetTeacher({ clazzid: id }).then(data => {
        if (data) this.form2.teacher = data.data.data;
      });
    },
    //获取学科
    getsubject() {
      api.queryCourse().then(data => {
        // if (data) this.form2.subject = data.data.data;
      });
    },
    //获取班级授课列表
    getcouseList(data, node, stores) {
      if (data.type == "clazz") {
        this.SelectedClassId = data.id;
        // console.log(data.id)
        this.getteachlist(data.id);
        this.CLgetlist();
      }
    },
    //获取班级授课列表接口
    CLgetlist() {
      this.tableloading = true;
      let datas = { classId: this.SelectedClassId };
      course.classCoursegetList(datas).then(data => {
        this.tableloading = false;
        if (data) this.tableData = data.data.data;
      });
    },
    //添加授课
    chenge() {
      if (this.SelectedClassId !== "") {
        this.dialogLecture = true;
      } else {
        this.$message({
          showClose: true,
          message: "请先选择添加授课班级",
          type: "warning",
          duration:'1500'
        });
      }
    },
    timenation(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          let formdata = new FormData();
          // if (this.operationText == "添加授课") {
            formdata.append("teacherId", this.form.teacher.id);
            formdata.append("classId", this.SelectedClassId);
            formdata.append("subject", this.form.subject.subjectid);
            formdata.append("weekNum", this.form.weeks);
            formdata.append("classNum", this.form.series);
            formdata.append("classOrder", this.form.loop);
            formdata.append("oneWeek", this.form.double.num);
            formdata.append("startWeek", this.form.Weeklystar);
            formdata.append("endWeek", this.form.Weeklyend);
            formdata.append("str1", this.form.schoolyear.term);
            course
              .STsave(formdata)
              .then(data => {
                this.loading = false;
                if (data) {
                  this.$message({
                    showClose: true,
                    message: data.data.meta.message,
                    type: "success",
                    duration:'1500'
                  });
                  this.dialogLecture = false;
                  this.CLgetlist();
                }
              })
              .catch(req => {
                this.loading = false;
              });
          // } else {
          //   formdata.append("teacherId", this.form.teacher.id);
          //   formdata.append("id", this.form.id);
          //   formdata.append("classId", this.SelectedClassId);
          //   formdata.append("subject", this.form.subject.subjectid);
          //   formdata.append("weekNum", this.form.weeks);
          //   formdata.append("classNum", this.form.series);
          //   formdata.append("classOrder", this.form.loop);
          //   formdata.append("oneWeek", this.form.double.num);
          //   formdata.append("startWeek", this.form.Weeklystar);
          //   formdata.append("endWeek", this.form.Weeklyend);
          //   formdata.append("str1", this.form.schoolyear.term);
          //   course
          //     .STupdate(formdata)
          //     .then(data => {
          //       this.loading = false;
          //       if (data) {
          //         this.CLgetlist();
          //         this.$message({
          //           showClose: true,
          //           message: data.data.meta.message,
          //           type: "success",
          //           duration:'1500'
          //         });
          //         this.dialogLecture = false;
          //       }
          //     })
          //     .catch(req => {
          //       this.loading = false;
          //     });
          // }
        } else {
          return false;
        }
      });
    },
    //修改
    stumodofocation(index, row) {
      this.form.id = row.id;
      let termWeeknum = "";
      this.form2.schoolyear.map(function(item, index) {
        if (item.term == row.str1) {
          termWeeknum = item.termWeek;
        }
      });
      this.form.schoolyear = { termWeek: termWeeknum, term: row.str1 };
      this.form.teacher = { id: row.teacherId };
      this.form.subject = { subjectid: row.subject };
      this.form.weeks = Number(row.weekNum);
      this.form.series = row.classNum;
      this.form.loop = row.classOrder;
      this.form.double = { 'num': Number(row.oneWeek) };
      this.form.Weeklystar = row.startWeek;
      this.form.Weeklyend = row.endWeek;
      this.dialogLecture = true;
    },
    //删除STdelete
    deleteformation(index, row) {
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
            course.STdelete(formdata).then(data => {
              instance.confirmButtonLoading = false;
              if (data) {
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: "success"
                });
                this.CLgetlist();
              }
            });
          } else {
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
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(val);
    }
  },
  directives: {},
  watch: {
    dialogLecture: function(params) {
      if (this.dialogLecture) {
      }
    },
    "form.schoolyear"(newVal, oldVal) {
      console.log(newVal);
      this.form2.Weeklystar = Number(newVal.termWeek);
    }
  }
};
</script>
<style scoped>
.classcourse {
  height: 100%;
  text-align: left;
}
.classcourse-left {
  width: 240px;
}
.classcourse-left .el-select {
  width: 240px;
  margin-bottom: 24px;
}
.classcourse .el-h3 {
  margin-bottom: 15px;
  height: 40px;
}
.classcourse .el-h3 img {
  cursor: pointer;
}
.classcourse-right {
  width: 900px;
}
.classcourse-right .text {
  text-align: right;
  margin-bottom: 5px;
}
.el-table .info-row {
  background: #c9e5f5;
}
.table-end-caozuo {
  height: 24px;
  line-height: 24px;
  display: inline-block;
  cursor: pointer;
}
.table-end-caozuo img {
  vertical-align: middle;
}
/*添加学生*/
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
</style>
<style>
.classcourse .el-table .cell {
  padding-right: 10px;
  padding-left: 10px;
}
</style>