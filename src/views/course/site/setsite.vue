<template>
  <div class="setsite">
    <div class="tabs">
      <ul class="tabs-items"  >
        <div  @click="tabs">
          <li data-active="1" class="tabs-items-item">场地类型设置</li>
          <li data-active="2">场地名称设置</li>
        </div>
      </ul>
    </div>
    <div style="margin:0 auto 50px;width:1160px" class="clear">
      <div v-show="active == 1">
        <div class="setsite-box-top">
          <span @click="createsitetype" class="add-button"><img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加场地类型</i></span>
        </div>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="60">
            </el-table-column>
            <!-- <el-table-column
              prop="campus"
              label="校区"
              width="180">
            </el-table-column> -->
            <el-table-column
              prop="fieldName"
              label="场地类型名称"
              >
            </el-table-column>
            <el-table-column
              label="操作"
              width="180"
              >
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click=" deleteformation(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <setsite-name v-show="active == 2" ></setsite-name>
    </div>

<el-dialog   :visible.sync="dialogcreatesite" width="30%" >
    <div slot="title"  >
                <p style="font-size:16px;" >添加场地类型</p>
            </div>
    <div style="max-width:500px; text-align:left;">
      <el-form :model="form" :label-position="labelPosition" label-width="110px"  ref='form'>
          <el-form-item  label="场地类型名称:" :prop="'names['+0+']'" :rules="{type:'string',required: true, message: '不能为空', trigger: 'blur'}"  >
            <el-input v-model="form.names[0]"   placeholder="">
            </el-input>
          </el-form-item>
          <el-form-item  v-for="(item,index) in numberinput" label="" :prop="'names['+item+']'" :rules="{type:'string',required: true, message: '不能为空', trigger: 'blur'}" :key="index" >
            <el-input v-model="form.names[item]"
            placeholder="">
            <i slot="suffix" @click="IconClick(item)" style="cursor: pointer;" class="el-input__icon el-icon-close"></i>
            </el-input>
          </el-form-item>
      </el-form>
      <div class="clear margin-top-5"><img @click="addinput" class="right" src="../../../assets/image/setsite-type-icon.png" /></div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogcreatesite = false">取 消</el-button>
      <el-button   type="primary" @click="assignation('form')" :loading="loading" >确 定</el-button>
    </div>
  </el-dialog>

  </div>
</template>

<script>
import setsiteName from "./setsitename";
import course from "../../../apis/course.js";
import api from "../../../apis/login.js";
export default {
  name: "setsite",
  data() {
    return {
      loading: false,
      numberinput: 0,
      active: 1,
      dialogcreatesite: false,
      labelPosition: "right",
      form: {
        names: [""],
        campus: ""
      },
      form2: {
        getcampus: ""
      },
      tableData: []
    };
  },
  components: {
    setsiteName
  },
  created() {
    // let parms = { id: 1, type: 4 };
    // api.querycampus(parms).then(data => {
    //   //查询校区
    //   if (data) {
    //     this.form2.getcampus = data.data.data;
    //   }
    // });
  },
  mounted() {
    this.alltypelist();
  },
  computed: {},
  methods: {
    alltypelist() {
      course.STtypelist().then(data => {
        if (data) this.tableData = data.data.data;
      });
    },
    //通过校区查询教学类型
    // querytype() {
    //   course.STcumpustype({ campusId: this.form.campus.id }).then(data => {
    //     if (data) {
    //       let _this = this;
    //       this.tableData = data.data.data.map(function(item, index) {
    //         item.campus = _this.form.campus.name;
    //         return item;
    //       });
    //     }
    //   });
    // },
    addinput() {
      this.numberinput += 1;
      this.form.names.push("");
    },
    IconClick(item) {
      this.numberinput = this.numberinput - 1;
      this.form.names.splice(item, 1);
    },
    assignation(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            campusId: this.form.campus.id,
            fieldList: this.form.names
          };
          let formdata = new FormData();
          formdata.append("feildLists", JSON.stringify(data));
          this.loading = true;
          course.STnewsitetype(formdata).then(data => {
            this.loading = false;
            if (data) {
              this.$message({
                showClose: true,
                message: data.data.meta.message,
                type: "success",
                duration: "1500"
              });
              this.alltypelist();
              this.dialogcreatesite = false;
            } else {
              this.loading = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    deleteformation(index, row) {
      this.$confirm("确认删除?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            course
              .STdeletsitetype({ fieldTypeId: row.fieldTypeId })
              .then(data => {
                instance.confirmButtonLoading = false;
                if (data) {
                  done();
                  this.$message({
                    showClose: true,
                    message: data.data.meta.message,
                    type: "success",
                    duration: "1500"
                  });
                  this.alltypelist();
                }
              });
          } else {
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
    },
    createsitetype() {
      this.numberinput = 0;
      this.dialogcreatesite = true;
    },
    tabs(e) {
      this.active = e.target.attributes[1].value;
      var length = e.target.parentElement.children.length;
      for (var i = 0; i < length; i++) {
        e.target.parentElement.children[i].className = " ";
      }
      e.target.className = "tabs-items-item";
    }
  },
  directives: {},
  watch: {
    dialogcreatesite: function() {
      this.form.names = [""];
    }
  }
};
</script>
<style scoped>
.setsite {
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
  padding-bottom: 20px;
  background-color: #fff;
}
.setsite-box-top {
  height: 50px;
  font-size: 14px;
  color: #333;
  text-align: left;
  line-height: 50px;
}
.setsite-box-top img {
  vertical-align: middle;
  cursor: pointer;
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
}
.addclasses-cpm {
  display: inline-block;
  float:left;
}
.addclasses-cpm p {
  display: inline-block;
  margin-left: 10px;
}
.addclasses-cpm img {
  vertical-align: middle;
}
.margin-top-5 img {
  cursor: pointer;
}
</style>