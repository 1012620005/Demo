<template>
  <div class="specialsubject">
        <div style="margin:0 auto 50px;width:1160px;padding-top:20px;" class="clear">
            <div class="site-algin site-left left">
                <el-row >
                  <el-col :span="4">
                    <div style ="height:36px; line-height:36px;font-weight: 600; font-size: 16px;">特殊学科</div>
                  </el-col>
                  <el-form ref="form" :model="form" label-width="40px">
                    <el-col :span="11">
                      <el-form-item label="校区">
                        <el-select   @change="querytype" v-model="form.campus"  value-key="id" >
                          <el-option v-for="(item,index) in form2.campus" :key="index" :label="item.name" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
                <div class="site-left-collapse site-left-box">
                  <div style="padding:10px 0 ;" class="clear">
                      <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
                        <div class="site-collapse-card-left left" v-for="(item,index) in form2.subject" :class="item.clazzStatus == '1' ? 'color':''" :key="index">
                          <span>{{item.clazzname}}</span>
                        </div>
                      <!--</el-checkbox-group>-->
                  </div>
                </div>
            </div>
            <div class="site-algin site-right right">
                <el-row type="flex" class="site-left-top" justify="space-between">
                  <el-form ref="siteform" :model="siteform" label-width="80px">
                    <el-col :span="20">
                      <el-form-item label="场地类型">
                        <el-select @change="querytypenames"  v-model="siteform.sitetype" value-key="fieldTypeId" >
                          <el-option v-for="(item,index) in siteform2.sitetype" :key="item.fieldTypeId" :label="item.fieldName" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
                <div class="site-left-collapse">
                  <el-collapse accordion  @change="changetype" v-if="flags" >
                    <el-collapse-item  v-for="(item, index1) in typenamenum" :key="item.fieldTypeId"  :name="index1">
                      <template slot="title">
                        <span class="site-collapse-title" style="padding-left:15px" >{{siteform.sitetype.fieldName}}</span><span class="site-collapse-tit le">{{item.fieldName}}</span>
                      </template>
                      <div>
                        <el-collapse accordion @change="changetypename" >
                          <el-collapse-item  v-for="(o2, index2) in floornumlist" :key="index2"  :name="index2">
                            <template slot="title">
                              <span class="site-collapse-title" style="padding-left:30px" >{{o2.floorNum}}层</span><span class="site-collapse-title">房间数:<i>{{o2.roomNum}}</i>个</span><span class="site-collapse-title">未分配:<i>{{o2.roomRemain}}</i>个</span>
                            </template>
                              <div style="padding:10px 0 ;" class="clear">
                                    <div  v-for="(o3, index3) in o2.roomDetail" :key="o3.roomId" class="site-collapse-card left">
                                      <el-card :body-style="{ padding: '0px' }">
                                        <div class="site-collapse-card-top" ><span>{{o3.roomName}}</span></div>
                                        <p class="site-collapse-card-cen">容纳：{{o3.galleryful}}人</p>
                                        <div  class="site-collapse-card-bot">
                                            <img v-if="o3.str2 == '0' ? false:true " @click="addclass(item,o2,o3,index1,index2,index3)" src="../../../assets/image/add-sub-icon.png"/>
                                            <div v-if="o3.clazzDetail !== null" class="card-bot-class">
                                              <ul>
                                                
                                                <li v-for="(o4,index) in o3.clazzDetail"><span>{{o4.clazzName}}</span><i v-if="o3.str2 == '0' ? false:true " @click="deleteclass(item,o2,o3,index1,index2,index3,o4)" class="el-icon-close card-bot-class-icon"></i></li>
                                              </ul>
                                            </div>
                                        </div>
                                      </el-card>
                                    </div>
                                    <div v-if="o2.roomDetail.length > 0 ? false :true">
                                      <div class="el-table__empty-block" ><span class="el-table__empty-text">暂无数据</span></div>
                                    </div>
                              </div>
                          </el-collapse-item>
                          <div v-if="floornumlist.length > 0 ? false :true">
                            <div class="el-table__empty-block" ><span class="el-table__empty-text">暂无数据</span></div>
                          </div>
                        </el-collapse>
                      </div>
                    </el-collapse-item>
                    <div v-if="typenamenum.length > 0 ? false :true">
                      <div class="el-table__empty-block" ><span class="el-table__empty-text">暂无数据</span></div>
                    </div>
                  </el-collapse>
                </div>
            </div>
        </div>
     <!--班级-->
     <el-dialog   :visible.sync="dialogVisible" width="30%" >
        <div slot="title"  >
                <p style="font-size:16px;text-align:left;" >添加学科</p>
            </div>
        <div style="text-align:left;" class="clear" >
          <div><span>特殊学科</span></div>
          <el-radio-group v-model="radio2">
            <ul class="dialog-ul clear">
              <li v-for="(item,index) in classnum" :key="index" ><el-radio :label="item.clazzid">{{item.clazzname}}</el-radio></li>
            </ul>
          </el-radio-group>
        </div>
        <div slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogVisibletime = false">取 消</el-button>-->
          <el-button   type="primary" @click="timenation('assign')" :loading="loading" >确 定</el-button>
        </div>
      </el-dialog>

  </div>
</template>

<script>
import course from "../../../apis/course.js";
import api from "../../../apis/login.js";
export default {
  name: "specialsubject",
  data() {
    return {
      loading: false,
      dialogVisible: false,
      flags: true,
      flag: true,
      radio2: "", //要分配班级的班级id
      selectperd: "",
      selectspecialty: "",
      classnum: [],
      typenamenum: "", //类型下场地名称
      // floornum:[],
      floornumlist: [],
      specfixed: "", //教室位置
      classfixed: "", //教室位置
      roomId: "", //要分配班级的教室id
      Choicefloor: null,
      form: {
        campus: ""
      },
      form2: {
        campus: "",
        subject: []
      },
      siteform: {
        sitetype: "",
        sitename: "",
        sitefloor: ""
      },
      siteform2: {
        sitetype: "",
        sitename: "",
        sitefloor: ""
      },
      checkedCities: []
    };
  },
  components: {},
  created() {},
  mounted() {
    let parms = { id: 1, type: 4 };
    api.querycampus(parms).then(data => {
      //查询校区
      if (data) {
        this.form2.campus = data.data.data;
        this.form.campus = this.form2.campus[0];
      }
    });
    this.getsubject();
  },
  computed: {},
  methods: {
    //获取学科
    getsubject() {
      course.getspecial().then(data => {
        if (data) {
          this.form2.subject = data.data.data;
        }
      });
    },
    //通过类型获取名称
    querytypenames() {
      course
        .querytypename({ fieldTypeId: this.siteform.sitetype.fieldTypeId })
        .then(data => {
          if (data) {
            this.typenamenum = data.data.data;
            this.flags = false;
            let _this = this;
            setTimeout(function() {
              console.log("1111");
              _this.flags = true;
            }, 0);
          }
        });
    },
    //通过校区查询教学类型
    querytype() {
      course.STcumpustype({ campusId: this.form.campus.id }).then(data => {
        if (data) {
          if (data.data.data.length > 0) {
            this.siteform2.sitetype = data.data.data;
            this.siteform.sitetype = data.data.data[0];
            this.querytypenames();
          }
        }
      });
    },
    deleteclass(a, b, c, d, e, f, g) {
      this.$confirm("确认删除?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            course
              .deletepro({ proid: g.clazzId, roomId: c.roomId })
              .then(data => {
                instance.confirmButtonLoading = false;
                if (data) {
                  done();
                  this.$message({
                    showClose: true,
                    message: data.data.meta.message,
                    type: "success"
                  });
                  this.changetype(this.classfixed);
                  this.getsubject();
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
    //班级添加场地
    addclass(a, b, c, d, e, f) {
      this.dialogVisible = true;
      this.roomId = c.roomId;
      let _this = this;
      this.classnum = [];
      this.form2.subject.map(function(item, index) {
        if (item.clazzStatus == "0") {
          _this.classnum.push(item);
        }
      });
      console.log(a);
      console.log(b);
      console.log(c);
      console.log(d);
      console.log(e);
      console.log(f);
      this.Choicefloor = [d, e];
    },
    //确认学科添加到班级
    timenation() {
      let formdata = new FormData();
      formdata.append("proid", this.radio2);
      formdata.append("roomId", this.roomId);
      formdata.append("attrId", "1");
      this.loading = true;
      course.specaddroom(formdata).then(data => {
        this.loading = false;
        if (data) {
          this.$message({
            showClose: true,
            message: data.data.meta.message,
            type: "success"
          });
          this.dialogVisible = false;
          this.changetype(this.classfixed);
          this.getsubject();
        }
      });
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
    },
    changetype(a) {
      if (a !== "") {
        this.classfixed = a;
        course
          .typegetfloor({ siteNameId: this.typenamenum[a].siteNameId })
          .then(data => {
            //获取楼层房间信息
            if (data) {
              console.log(data);
              this.floornumlist = data.data.data;
            }
          });
      }
    },
    changetypename(a) {
      if (a !== "") {
      }
    }
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.specialsubject {
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
.site-algin {
  width: 560px;
  text-align: left;
}

.site-collapse-card-left {
  width: 22.5%;
  margin: 10px 1%;
  text-align: center;
  border: 1px solid #dfe6ec;
  height: 45px;
  border-radius: 10px;
  padding: 5px 0;
}
.site-collapse-card {
  width: 29%;
  margin: 10px 2%;
  text-align: center;
}
.site-collapse-card .site-collapse-card-top {
  height: 30px;
  background-color: #deeeff;
  line-height: 30px;
  text-align: center;
}
.site-collapse-card .site-collapse-card-top span {
  font-size: 14px;
  color: #333;
}
.site-collapse-card-cen {
  text-align: center;
  font-size: 12px;
  line-height: 30px;
  height: 30px;
}
.site-collapse-card-bot {
  padding: 5px;
  height: 90px;
  text-align: center;
}
.site-collapse-card-bot img {
  /*margin-top:20px;*/
  cursor: pointer;
}
.site-collapse-card-bot .card-bot-class {
  position: relative;
  padding: 10px 0;
  border-radius: 5px;
  background-color: #fff8db;
  color: #cba30b;
}
.card-bot-class-icon {
  position: absolute;
  cursor: pointer;
  right: 2px;
  bottom: 4px;
}
.site-collapse-title {
  display: inline-block;
  margin-right: 10px;
  color: #333;
  font-size: 14px;
}
.site-collapse-title i {
  color: #ef0000;
}
.site-left-box {
  border: 1px solid #dfe6ec;
}
.site-left-box .color {
  color: #dfe6ec;
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
.dialog-ul {
  margin-top: 20px;
  width: 540px;
}
.dialog-ul li {
  margin: 10px 0;
  float: left;
  width: 33.3%;
  text-align: left;
}
.site-collapse-card-bot ul li {
  position: relative;
}
</style>
<style>
.site-left-collapse .el-collapse-item__content {
  padding: 0;
}
.site-left-collapse .el-collapse-item__header {
  background-color: #deeeff;
}
.specialsubject .site-left-box .el-checkbox-button__inner {
  width: 130px;
  overflow: hidden;
  border-radius: 4px;
}
</style>