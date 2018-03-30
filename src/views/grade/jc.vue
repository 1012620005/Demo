<template>
  <div class="class">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >教材管理</span><span @click="back" class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
        <div style="margin:0 auto 50px;width:1160px" class="room-box clear">
          <div class="room-box-top"><img @click="createroom" src="../../assets/image/addjc.png" /></div>
          <div class="selectes">
            <el-form :inline="true"  label-width="68px" class="demo-form-inline">
              <el-form-item  label="学科">
                <el-select v-model="page.subjectid" clearable placeholder="">
                  <el-option v-for="item in jc.subjects" :key="item.id" :label="item.SubjectName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="版本名称">
                <el-form-item >
                  <el-input v-model="page.name" :on-icon-click="getlist" icon="search" placeholder="请输入名称"></el-input>
                </el-form-item>
              </el-form-item>
            </el-form>
          </div>
          <div style="text-align:left">
            <el-table
              :data="pagelist"
              stripe
              v-loading.body="tableloading"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="120">
              </el-table-column>
               <el-table-column
                prop="subjectname"
                label="学科"
                width="200">
              </el-table-column>
              <el-table-column
                prop="version"
                label="版本"
                width="400">
              </el-table-column>
        
               <el-table-column
                prop="subname"
                label="侧别名称"
                width="200">
              </el-table-column>
              
              <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                  <el-tooltip :content="'查看'" placement="top">
                    <span class="table-end-caozuo"><img @click="seeodofocation(scope.row,scope.$index)" src="../../assets/image/eye-icon.png"/></span>
                  </el-tooltip>
                  <el-tooltip :content="'修改'" placement="top">
                    <span class="table-end-caozuo"><img @click="getJc(scope.row)" src="../../assets/image/xiugai.png"/></span>
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
        <el-dialog  :visible.sync="dialogchang" width="30%" >
          <div slot="title"  >
              <p style="font-size:16px;" >{{optiontext+"教材"}}</p>
          </div>
          <div style="max-width:500px; text-align:left;" class="modmain">
            <el-form :model="jc" :label-position="labelPosition" label-width="80px"  ref='form'>
                <el-form-item  label="学科:">
                  <el-select  v-model="jc.subjectid">
                    <el-option v-for="(item,index) in jc.subjects" :key="item.id" :label="item.SubjectName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="版本:" >
                  <el-input v-model="jc.version"  placeholder="">
                  </el-input>
                </el-form-item>
                <el-form-item label="册别名称:" >
                  <el-input v-model="jc.subname"  placeholder="">
                  </el-input>
                </el-form-item>
                <el-form-item label="导入章节:" >
                  <el-upload
                    class="upload-demo"
                    accept=".xls,.xlsx"
                    name="zj"
                    :data="filedata" 
                    :action="uploadurl"
                    :on-remove="handleRemove"
                    :before-upload="before"
                    :on-success="uploadCallBack"
                    :file-list="flist">
                    <el-button size="small" type="primary" class="chosefile">{{u_button}}</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
                  </el-upload>
                  <el-button size="small" @click="getDownZjUrl" type="primary" class="formwork">下载模板</el-button>
                </el-form-item>
            </el-form>
            <el-collapse accordion class="addchapters">
              <el-collapse-item v-for="(z,index) in zs.tree" :key="index"  class="chapttitle">
                <template slot="title">
                  <el-form ref="form" :model="addform" :label-position="labelPositions">
                    <el-form-item>
                      <span>{{z.z.name}}</span>
                    </el-form-item>
                  </el-form>
                </template>
                <el-form ref="form" :model="addform2" :label-position="labelPositions" class="chaptmian">
                  <el-form-item v-for="(j,index) in z.list" :key="index">
                    <span>{{j.name}}</span>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div slot="footer" class="chapt-footer">
            <el-button  type="primary" @click="saveJc()"  >保存</el-button>
          </div>
        </el-dialog>

        <el-dialog  :visible.sync="dialogsee" size='tiny' >
          <div slot="title" style="float:left;" >
              <p style="font-size:16px;" >查看详情</p>
          </div>
          <div style="max-width:500px; text-align:left;" class="modmain">
            <el-form :model="seeaction" :label-position="labelPosition" label-width="80px"  ref='form'>
                <el-form-item  label="学科:">
                  <span>{{seeaction.subjectname}}</span>
                </el-form-item>
                <el-form-item label="版本:" >
                  <span>{{seeaction.version}}</span>
                </el-form-item>
                <el-form-item label="册别名称:" >
                  <span>{{seeaction.subname}}</span>
                </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="chapt-footer">
            <el-button  type="primary" @click="dialogsee = false"  >确定</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import navTop from "../common/header";
import userApi from "../../apis/userCenter.js";
import fileApi from "../../apis/commonFile.js";
export default {
  name: "jc",
  data() {
    return {
      dialogsee:false,
      seeaction:{},
      loading: false,
      dialogchang: false,
      labelPosition: "right",
      labelPositions: "left",
      tableloading: false,
      optiontext: null,
      data: "",
      filedata: {
        filename: ""
      },
      form: {
        grade: "",
        year: "",
        start: ""
      },
      u_button: "选择文件",
      flist: [],
      fileid: [],
      uploadurl: "",
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
        subjectid: "",
        subjects: [],
        name:'',
      },
      pagelist:[],
      jc: {
        id: "",
        name: "",
        subname: "",
        version: "",
        subjectid: "",
        key: "",
        subjects: []
      },
      zs: { tree: [], key: "" },
      addform: {
        name: ""
      },
      addform2: {
        name: ""
      }
    };
  },
  components: {
    navTop
  },
  created() {},
  mounted() {
    userApi.findAllCourse().then(r => {
      console.log(r);
      this.jc.subjects = r.data.data;
    });
    this.findJc();
    this.uploadurl = userApi.getImportZjUrl();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getlist(){
      this.findJc();
    },
    getDownZjUrl() {
      window.open(userApi.getDownZjUrl());
    },
    before(file) {
      this.filedata.filename = file.name;
      return true;
    },
    uploadCallBack(r, file, filelist) {
      this.flist = [];
      let meta = r.meta;
      let data = r.data;
      userApi.showMsg(meta);
      this.zs = data;
      this.jc.key = data.key;
    },
    handleRemove(file, filelist) {
      let fileids = this.fileid;
      for (let i = 0; i < fileids.length; i++) {
        if (file.uid == fileids[i].uid) {
          this.fileid.splice(i, 1);
        }
      }
    },
    getJc(row) {
      let params = { id: row.id };
      userApi.getJc(params).then(r => {
        let jc = r.data.data;
        this.jc.id = jc.id;
        this.jc.name = jc.name;
        this.jc.subname = jc.subname;
        this.jc.version = jc.version;
        this.jc.subjectid = jc.subjectid;
        this.zs.tree = jc.tree;
        if (jc.tree) {
          this.u_button = "重新上传";
        }
        console.log(this.zs);
        this.stumodofocation();
      });
    },
    add() {
      console.log("添加章节");
    },
    findJc() {
      let params = {
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize,
        subjectid: this.page.subjectid,
        dbName:this.page.name
      };
      this.tableloading = true;
      userApi.findJc(params).then(r => {
        this.tableloading = false;
        let page = r.data.data;
        this.page.pageNo = page.pageNo;
        this.page.pageSize = page.pageSize;
        this.page.count = page.count;
        this.pagelist = page.list;
      });
    },
    saveJc() {
      let jc = new FormData();
      jc.append("id", this.jc.id);
      jc.append("name", this.jc.name);
      jc.append("subname", this.jc.subname);
      jc.append("version", this.jc.version);
      jc.append("key", this.jc.key);
      jc.append("subjectid", this.jc.subjectid);
      userApi.saveJc(jc).then(r => {
        let data = r.data;
        if (data) {
          userApi.showMsg(data.meta);
          if (data.meta.status == "success") {
            this.dialogchang = false;
            this.findJc();
          }
        }
      });
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.findJc();
    },
    createroom() {
      //创建弹出
      this.u_button = "上传文件";
      this.jc.id = "";
      this.jc.name = "";
      this.jc.subname = "";
      this.jc.version = "";
      this.jc.key = "";
      this.jc.subjectid = "";
      this.zs = { tree: [], key: "" };
      this.dialogchang = true;
      this.optiontext = "添加";
    },
    stumodofocation(roe, index) {
      this.dialogchang = true;
      this.optiontext = "修改";
    },
    seeodofocation(row, index) {
      this.seeaction = row
      this.dialogsee = true;
    },
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
            formdata.append("jcid", row.id);
            userApi.deleteJc(formdata).then(data => {
              instance.confirmButtonLoading = false;
              if (data) {
                done();
                this.findJc();
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
  watch: {
    'page.subjectid':function(news,old){
        this.findJc();
    }
  }
};
</script>
<style scoped lang="scss" type="text/css">
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
  .room-box {
    .selectes {
      float: left;
    }
  }
}
.room-box-top {
  margin-bottom: 20px;
  text-align: left;
  float: left;
  height: 36px;
  line-height: 36px;
  margin-top: 3px;
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
.modmain {
  .upload-demo {
    float: left;
    .chosefile {
      background-color: transparent;
      border: 0;
      color: #208af5;
      text-decoration: underline;
      margin-top: 5px;
    }
  }
  .formwork {
    background-color: transparent;
    border: 0;
    color: #208af5;
    text-decoration: underline;
    float: right;
    margin-top: 5px;
  }
  .addchapters {
    max-height: 200px;
    overflow-y: auto;
    .el-collapse-item__header {
      overflow: hidden;
      border-bottom: 0;
      .el-form {
        float: left;
        // margin-right:160px;
        margin-top: 4px;
        width: 84%;
        .el-form-item {
          margin-bottom: 0 !important;
          .el-collapse-item__header {
            border: 0;
          }
        }
      }
    }
  }
  .el-collapse-item__wrap {
    border-bottom: 0;
    .chaptmian {
      padding-left: 40px;
      .el-form-item {
        margin-bottom: 10px !important;
      }
    }
  }
  .el-collapse {
    border: 0;
    // border-top: 1px solid #bfcbd9;
    padding-top: 20px;
  }
}
.chapt-footer {
  text-align: center;
  button {
    width: 96px;
    height: 42px;
  }
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
<style lang="scss" type="text/css">
.chapttitle {
  .el-collapse-item__header__arrow {
    float: right;
    height: 43px;
    line-height: 43px;
  }
  .el-collapse-item__header,
  .el-collapse-item__wrap {
    border-bottom: 0;
  }
}
</style>