<template>
  <div class="class">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >班级管理</span><span @click="back" class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
        <div style="margin:0 auto 50px;width:1160px" class="room-box clear">
        <div class="select clear">
          <el-form :inline="true" label-width="40px"  v-model="page" class="demo-form-inline" >
            <el-row >
              <el-col :span="4">
                <el-form-item label="校区">
              <el-select clearable @change="findOfficePage(page.ssid, '2')" v-model="page.ssid" placeholder="">
                <el-option v-for="item in page.ss" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="院系">
              <el-select clearable @change="findOfficePage(page.deptid, '3')" v-model="page.deptid" placeholder="">
                 <el-option v-for="items in page.depts" :key="items.id" :label="items.name" :value="items.id"></el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item  label="专业">
              <el-select @change="findClazz" clearable v-model="page.proid" placeholder="">
                <el-option v-for="items in page.pros" :key="items.id" :label="items.name" :value="items.id"></el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item  label="年级">
              <el-select  @change="findClazz" clearable v-model="page.gradeid" placeholder="">
                <el-option v-for="item in clazz.grades" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="名称">
              <el-form-item >
                <el-input v-model="page.name" placeholder="请输入班级名称">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="findClazz"></i>
                </el-input>
              </el-form-item>
            </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
          <div class="room-box-top">
            <span @click="createroom" class="add-button"><img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加班级</i></span>
          </div>
          <div style="text-align:left">
            <el-table
              :data="page.list"
              stripe
              v-loading.body="tableloading"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="70">
              </el-table-column>
              <el-table-column
                prop="clazzname"
                label="名称"
                width="180">
              </el-table-column>
               <el-table-column
                prop="gradename"
                label="年级"
                width="180">
              </el-table-column>
              <el-table-column
                prop="ssname"
                label="校区"
                width="180">
              </el-table-column>
              <el-table-column
                prop="deptname"
                label="院系"
                width="180">
              </el-table-column>
              <el-table-column
                prop="proname"
                label="专业">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120"
                >
                <template slot-scope="scope">
                  <!-- <el-tooltip :content="'查看'" placement="top">
                    <span class="table-end-caozuo"><img @click="seeodofocation(scope.row)" src="../../assets/image/eye-icon.png"/></span>
                  </el-tooltip> -->
                  <el-tooltip :content="'修改'" placement="top">
                    <span class="table-end-caozuo"><img @click="getClazz(scope.row)" src="../../assets/image/xiugai.png"/></span>
                  </el-tooltip>
                  <el-tooltip :content="'删除'" placement="top">
                    <span class="table-end-caozuo"><img @click=" deleteformation(scope.row)" src="../../assets/image/delete-icon.png"/></span>
                  </el-tooltip>
                </template>
              </el-table-column>
          </el-table>
          <div class="Pagination">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="page.pageNo"
                :page-size="page.pageSize"
                layout="prev, pager, next, jumper"
                :total="page.count">
              </el-pagination>
            </div>
          </div>
        </div>    
     </div>

     <!--修改-->
        <el-dialog   :visible.sync="dialogchang" width="30%" >
          <div slot="title"  >
              <p style="font-size:16px;" >{{optiontext+"班级"}}</p>
          </div>
          <div style="max-width:400px; text-align:left;">
            <el-form :model="clazz" :label-position="labelPosition" label-width="80px"  ref='form'>
                <el-form-item  label="校区:">
                  <el-select @change="findOffice(clazz.sid, '2')"  v-model="clazz.sid"  >
                    <el-option v-for="(item,index) in clazz.ss" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="院系:" >
                  <el-select  @change="findOffice(clazz.deptid, '3')" v-model="clazz.deptid"  >
                    <el-option v-for="(item,index) in clazz.depts" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="专业:" >
                  <el-select  v-model="clazz.proid"  >
                      <el-option v-for="(item,index) in clazz.pros" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级:" >
                  <el-select  v-model="clazz.gradeid"  >
                      <el-option v-for="(item,index) in clazz.grades" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级名称:" >
                  <el-input v-model="clazz.name"  placeholder="">
                  </el-input>
                </el-form-item>
                <el-form-item label="辅导员:" >
                  <el-select v-model="clazz.teaid" filterable placeholder="请选择">
                    <el-option
                      v-for="item in clazz.fdys"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogchang = false">取 消</el-button>
            <el-button   type="primary" @click="saveClazz()"  >确 定</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import navTop from "../common/header";
import userApi from "../../apis/userCenter.js";
export default {
  name: "class",
  data() {
    return {
      loading: false,
      dialogchang: false,
      labelPosition: "right",
      tableloading: false,
      optiontext: null,
      data: "",
      form: {
        grade: "",
        year: "",
        start: ""
      },
      datalength: null,
      tableData: [
        {
          str2: "1"
        }
      ],
      page: {
        pageNo: 1,
        pageSize: 10,
        count: 0,
        ssid: "",
        deptid: "",
        proid: "",
        name: "",
        gradeid:"",
        list: [],
        pros: [],
        depts: [],
        ss: [],
        grades: []
      },
      clazz: {
        id: "",
        name: "",
        proid: "",
        deptid: "",
        sid: "",
        gradeid: "",
        teaid: "",
        pros: [],
        depts: [],
        ss: [],
        grades: [],
        fdys: []
      }
    };
  },
  components: {
    navTop
  },
  created() {},
  mounted() {
    userApi.findAllGrade().then(r => {
      this.clazz.grades = r.data.data;
    });
    this.findOffice("1", "4");
    this.findOfficePage("1", "4");
    this.findClazz();
    this.findAllFdy();
  },
  computed: {},
  methods: {
    back(){
      this.$router.go(-1);
    },
    findAllFdy() {
      userApi.findAllFdy().then(r => {
        this.clazz.fdys = r.data.data;
      });
    },
    getClazz(row) {
      this.dialogchang = true;
      this.optiontext = "修改";
      let params = { id: row.clazzid };
      userApi.getClazz(params).then(r => {
        let clazz = r.data.data;
        if (clazz) {
          this.clazz.id = clazz.clazzid;
          this.clazz.name = clazz.clazzname;
          this.clazz.sid = clazz.ssid;
          this.findOffice(this.clazz.sid, "2");
          this.clazz.deptid = clazz.deptid;
          this.findOffice(this.clazz.deptid, "3");
          this.clazz.proid = clazz.proid;
          this.clazz.gradeid = clazz.gradeid;
          this.clazz.teaid = clazz.teaid;
        } else {
          userApi.showMsg(r.data.meta);
        }
      });
    },
    saveClazz() {
      let p = new FormData();
      p.append("id", this.clazz.id);
      p.append("name", this.clazz.name);
      p.append("proid", this.clazz.proid);
      p.append("deptid", this.clazz.deptid);
      p.append("ssid", this.clazz.ssid);
      p.append("gradeid", this.clazz.gradeid);
      p.append("teaid", this.clazz.teaid);
      userApi.saveClazz(p).then(r => {
        let meta = r.data.meta;
        userApi.showMsg(meta);
        if (meta.status == "success") {
          this.dialogchang = false;
          this.findClazz();
        }
      });
    },
    findClazz() {
      let params = {
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize,
        proid: this.page.proid,
        deptid: this.page.deptid,
        ssid: this.page.ssid,
        name: this.page.name,
        gradeid: this.page.gradeid
      };
      userApi.findClazz(params).then(r => {
        console.log(r);
        let page = r.data.data;
        this.page.list = page.list;
        this.page.pageSize = page.pageSize;
        this.page.pageNo = page.pageNo;
        this.page.count = page.count;
      });
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.findClazz();
    },
    findOfficePage(id, type) {
      let params = { id: id, type: type };
      userApi.findOffice(params).then(r => {
        if (r && r.data) {
          let d = r.data.data;
          if (type == "4") {
            this.page.ss = d;
          } else if (type == "2") {
            this.page.depts = d;
            this.page.pros = [];
            this.page.proid = "";
            this.page.deptid = "";
          } else if (type == "3") {
            this.page.pros = d;
          }
          this.findClazz();
        }
      });
    },
    findOffice(id, type) {
      let params = { id: id, type: type };
      userApi.findOffice(params).then(r => {
        if (r && r.data) {
          let d = r.data.data;
          if (type == "4") {
            this.clazz.ss = d;
          } else if (type == "2") {
            this.clazz.depts = d;
          } else if (type == "3") {
            this.clazz.pros = d;
          }
        }
      });
    },
    createroom() {
      //创建弹出
      let clazz = {};
      this.clazz.id = "";
      this.clazz.name = "";
      this.clazz.sid = "";
      this.clazz.teaid = "";
      this.clazz.deptid = "";
      this.clazz.depts = [];
      this.clazz.proid = "";
      this.clazz.pros = [];
      this.clazz.gradeid = "";
      this.dialogchang = true;
      this.optiontext = "添加";
    },
    stumodofocation(roe, index) {
      this.dialogchang = true;
      this.optiontext = "修改";
    },
    submits(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        }
      });
    },
    seeodofocation(row, index) {},
    deleteformation(row) {
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
            userApi.deletClazz(formdata).then(data => {
              instance.confirmButtonLoading = false;
              if (data) {
                this.findClazz();
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
    }
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.class {
  height: 100%;
  text-align: center;
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
.room-box-top {
  margin-bottom: 20px;
  text-align: left;
}
.room-box-top img {
  cursor: pointer;
}
.margin-top-5 {
  margin: 5px 0;
}
.margin-top-5 img {
  cursor: pointer;
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
.el-select {
  width: 100%;
}
.Pagination {
  margin-top: 32px;
  margin-bottom: 60px;
  text-align: center;
}
.table-end-caozuo {
  margin-right: 5px;
  height: 24px;
  line-height: 24px;
  display: inline-block;
  cursor: pointer;
}

.table-end-caozuo img {
  vertical-align: middle;
}
</style>