<template>
  <div class="classcourse clear">
      <div class="classcourse-box-top">
        <span @click="creatertime"  ><img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加教职工时段限制</i></span>
        <span  @click="creatermutex"><img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加教职工互斥限制</i></span>
      </div>
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
            label="教职工"
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
<el-dialog   :visible.sync="dialogVisibleassign" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >{{opctionstext}}教职工互斥限制</p>
  </div>
  <div style="text-align:left;" class="clear" >
      <el-form ref="form"  v-model="form" >
        <el-row type="flex"  justify="space-around">
          <el-col :span="8">
          <el-form-item >
              <el-select  v-model="form.Course1" filterable placeholder="请选择或输入关键字"  value-key="id"  >
                <el-option v-for="item in teacherList" :key="item.id" :label="item.name" :value="item"></el-option>
              </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="3">
            <div class="mark-text">和</div>
          </el-col>
          <el-col :span="8">
          <el-form-item >
              <el-select  v-model="form.Course2" filterable   value-key="id"  >
                <el-option v-for="item in teacherList" placeholder="请选择或输入关键字" :key="item.id" :label="item.name" :value="item"></el-option>
              </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="5">
            <div class="mark-text" >不同时上课</div>
          </el-col>
        </el-row>
      </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleassign = false">取 消</el-button>
    <el-button   type="primary" @click="assignation('assign')" :loading="loading" >确 定</el-button>
  </div>
</el-dialog>

    <!--教职工时段限制-->
<el-dialog   :visible.sync="dialogVisibletime" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >{{opctionstext}}教职工时段限制</p>
  </div>
  <div style="max-width:500px; text-align:left;" class="clear" >
    <div class="left" style="width:50%">
      <el-select  v-model="form.h_c" filterable  placeholder="请选择或输入关键字"  value-key="id" >
        <el-option v-for="item in teacherList" :key="item.id" :label="item.name" :value="item"></el-option>
      </el-select>
      </div>
      <div class="right" style="width:40%">
          <el-form ref="form" :model="form">
            <el-row :gutter="24">
              <el-col :span="13">
                <div style="height:40px; line-height:40px;" >
                  <el-radio class="radio" v-model="form.radio"  label="1">上午最多安排</el-radio>
                </div>
              </el-col>
              <el-col :span="11">
                <el-form-item >
                  <el-select v-model="form.region1" placeholder="" >
                    <el-option v-for="(item,index) in 4" :key="index"   :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="13">
                <div style="height:40px; line-height:40px;" >
                  <el-radio class="radio" v-model="form.radio" label="2">下午最多安排</el-radio>
                </div>
              </el-col>
              <el-col :span="11">
                <el-form-item >
                  <el-select v-model="form.region2" placeholder="" >
                    <el-option v-for="(item,index) in 4" :key="index" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
      </div>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibletime = false">取 消</el-button>
    <el-button   type="primary" @click="timenation('assign')" :loading="loading" >确 定</el-button>
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
      loading: false,
      tableloading: false,
      dialogVisibleassign: false,
      dialogVisibletime: false,
      teacherList: [], //老师列表
      form: {
        //选中教师
        Course1: {},
        Course2: {},
        h_c: {},
        region1: "",
        region2: "",
        radio: ""
      },
      tableData: [],
      opctionstext: "",
      ScheduleID: "",
      rowid: ""
    };
  },
  components: {},
  created() {
    course.teacherlist().then(data => {
      if (data) this.teacherList = data.data.data;
    });
  },
  mounted() {
    this.ScheduleID = this.$Cookies.get("sectionid");
    this.getteacherpeclist();
  },
  computed: {},
  methods: {
    //排课要求listCSdisType
    getteacherpeclist() {
      this.tableloading = true;
      course.getTeacherSpe({ type: "2" }).then(data => {
        this.tableloading = false;
        if (data) {
          this.tableData = data.data.data;
        }
      });
    },
    creatertime() {
      this.opctionstext = "添加";
      this.dialogVisibletime = true;
    },
    handleCheckChanges() {},
    timenation() {
      if (this.opctionstext == "添加") {
        let tady = this.form.radio == "1" ? "上午" : "下午";
        let datas =
        this.form.h_c.name+tady + "最多安排" + this.form["region" + this.form.radio] + "节课";
        let formdata = new FormData();
        formdata.append("ruleId1", this.form.h_c.id);
        formdata.append("scheduleId", this.ScheduleID);
        formdata.append("timeInterval", this.form.radio);
        formdata.append("teachCourse", "2");
        formdata.append("secNum", this.form["region" + this.form.radio]);
        formdata.append("ruleDesc", datas);
        formdata.append("ruleType", "1");
        this.loading = true;
        course.CSsaveSpe(formdata).then(data => {
          this.loading = false;
          if (data) {
            this.$message({
              showClose: true,
              message: data.data.meta.message,
              type: "success"
            });
            this.dialogVisibletime = false;
            this.getteacherpeclist();
          }
        });
      }
      if (this.opctionstext == "修改") {
        let tady = this.form.radio == "1" ? "上午" : "下午";
        let datas =
        this.form.h_c.name+tady + "最多安排" + this.form["region" + this.form.radio] + "节课";
        let formdata = new FormData();
        formdata.append("ruleId1", this.form.h_c.id);
        formdata.append("timeInterval", this.form.radio);
        formdata.append("id", this.rowid);
        formdata.append("ruleDesc", datas);
        formdata.append("secNum", this.form["region" + this.form.radio]);
        this.loading = true;
        course.CSupdateSpe(formdata).then(data => {
          this.loading = false;
          if (data) {
            this.$message({
              showClose: true,
              message: data.data.meta.message,
              type: "success",
              duration: "1500"
            });
            this.dialogVisibletime = false;
            this.getteacherpeclist();
          }
        });
      }
    },
    //添加教职工互斥&修改
    assignation() {
      if (this.opctionstext == "添加") {
        let datas =
          this.form.Course1.name + "、" + this.form.Course2.name + "不同时上课";
        let formdata = new FormData();
        formdata.append("ruleId1", this.form.Course1.id);
        formdata.append("ruleId2", this.form.Course2.id);
        formdata.append("scheduleId", this.ScheduleID);
        formdata.append("teachCourse", "2");
        formdata.append("ruleDesc", datas);
        formdata.append("ruleType", "0");
        this.loading = true;
        course.CSsaveSpe(formdata).then(data => {
          this.loading = false;
          if (data) {
            this.$message({
              showClose: true,
              message: data.data.meta.message,
              type: "success",
              duration: "1500"
            });
            this.dialogVisibleassign = false;
            this.getteacherpeclist();
          }
        });
      }
      if (this.opctionstext == "修改") {
        let datas =
          this.form.Course1.name + "、" + this.form.Course2.name + "不同时上课";
        let formdata = new FormData();
        formdata.append("id", this.rowid);
        formdata.append("ruleId1", this.form.Course1.id);
        formdata.append("ruleId2", this.form.Course2.id);
        formdata.append("ruleDesc", datas);
        this.loading = true;
        course.CSupdateSpe(formdata).then(data => {
          this.loading = false;
          if (data) {
            this.dialogVisibleassign = false;
            this.$message({
              showClose: true,
              message: data.data.meta.message,
              type: "success",
              duration: "1500"
            });
            this.getteacherpeclist();
          }
        });
      }
    },
    handleCheckChange() {},

    creatermutex() {
      this.opctionstext = "添加";
      this.dialogVisibleassign = true;
    },
    //修改特殊排课要求
    stumodofocation(index, row) {
      console.log(row);
      this.opctionstext = "修改";
      if (row.ruleType == "0") {
        this.dialogVisibleassign = true;
        // let ids = row.ruleName.split(",");
        let strs = row.str2.split(",");
        this.form.Course1.id = row.ruleId1;
        this.form.Course2.id = row.ruleId2;
        this.form.Course1.name = strs[0];
        this.form.Course2.name = strs[1];
        this.rowid = row.id;
        this.form = JSON.parse(JSON.stringify(this.form));
      }
      if (row.ruleType == "1") {
        this.form.h_c ={};
        this.form.region1 = "";
        this.form.region2 = "";
        this.dialogVisibletime = true;
        this.form.h_c.id = row.ruleId1;
        this.form.h_c.name = row.str2;
        console.log(this.form.h_c)
        this.form.radio = row.timeInterval.toString();
        console.log(row.timeInterval)
        this.rowid = row.id;
        this.form["region" + row.timeInterval] = row.secNum;
        // this.form = JSON.parse(JSON.stringify(this.form))
      }
    },
    //删除特殊排课要求
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
            course.CSdeleteSpe(formdata).then(data => {
              instance.confirmButtonLoading = false;
              if (data) {
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: "success"
                });
                this.getteacherpeclist();
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
    }
  },
  directives: {},
  watch: {
    'form.radio':function(news,old){
      if(news == '1'){
        // this.form.region1 = "";
        this.form.region2 = "";
      }else{
          this.form.region1 = "";
      }
    }
  }
};
</script>
<style scoped>
.classcourse {
  height: 100%;
  text-align: left;
}
.classcourse-box-top {
  margin-bottom: 20px;
}
.classcourse-box-top span{
  cursor: pointer;
  margin-right:10px;
  color:#208af5;
  font-size:12px;
}
.classcourse .mutex-box-saff {
  position: relative;
  width: 40%;
  min-height: 120px;
  border: 1px solid #bfcbd9;
}
.classcourse .mutex-box-saff .mutex-box-saff-text {
  position: absolute;
  bottom: -22px;
  left: 2px;
}
.classcourse .mark-text {
  text-align: center;
  line-height: 32px;
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

</style> 