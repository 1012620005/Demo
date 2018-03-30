<template>
  <div class="room">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >房间详情</span><span @click="back" class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
        <div style="margin:0 auto 50px;width:1160px" class="room-box clear">
          <div class="room-box-top"><span>场地：{{data.fieldName}}</span><span style="margin-left:10px;">{{data.siteName}}</span><img @click="createroom" src="../../../assets/image/chuang-room-icon.png" /></div>
          <el-collapse  v-model="activeNames" accordion>
            <el-collapse-item  v-for="(item,index) in data.list" :key="index" :name="index">
              <template slot="title">
                <span class="site-collapse-title">{{item.floorNum}}层</span>
                <span class="site-collapse-footer">
                  <img @click.stop="deletefloor(item.floorId)" src="../../../assets/image/delete-icon.png"/>
                </span>
              </template>
                <ul>
                  <li  v-for="(o3, index3) in item.detail" :key="index3" class="site-collapse-card left">
                    <el-card :body-style="{ padding: '0px' }">
                      <div slot="header" class="clear creatromm">
                        <span class="creatromm_span" >{{o3.roomName}}</span>
                        <el-button @click="deleteroom(o3.roomId)" style="float: right; padding: 3px 0" type="text" size="small">删除</el-button>
                        <el-button @click="changeroom(o3,item.floorNum)" style="float: right; padding: 3px 0" type="text" size="small">编辑</el-button>
                      </div>
                      <div class="site-collapse-card-cen" >
                        <p >容纳人数:<span class="number" >{{o3.galleryful}}</span></p>
                        <p >建筑面积:<span class="number" >{{o3.structureArea}}</span></p>
                        <p >使用面积:<span class="number" >{{o3.usefulArea}}</span></p>
                      </div>
                    </el-card>
                  </li>
                </ul>
            </el-collapse-item>
            <div v-if="datalength > 0 ? false :true">
              <div class="el-table__empty-block" ><span class="el-table__empty-text">暂无数据</span></div>
            </div>
          </el-collapse>
        </div>    
     </div>

      <!--添加 -->
    <el-dialog   :visible.sync="dialogVisibleassign" width="30%" >
      <div slot="title"  >
            <p style="font-size:16px;" >创建房间</p>
        </div>
      <div style="max-width:380px; text-align:left;">
            <el-form :model="createform" status-icon :label-position="labelPosition"   ref='form'>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="7">
                  <div style="text-align:right;">楼层：</div>
                </el-col>
                <el-col :span="16">
                  <el-form-item :rules="{ type:'object',required: true, message: '选择楼层', trigger:'change'}" prop="floor">
                    <el-select  v-model="createform.floor"   placeholder="" value-key="floorId">
                      <el-option
                        v-for="item in datafloor"
                        :key="item.floorId"
                        :label="item.floorNum+'层'"
                        :value="item">
                      </el-option>
                    </el-select> 
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-for="(item,index) in createform.formnumber" :key="index"  >
              <el-row type="flex" class="row-bg" justify="space-between">
                  <el-col :span="7">
                    <div style="text-align:right;">起止房间号：</div>
                  </el-col>
                  <el-col :span="16">
                    <el-row type="flex" class="row-bg" justify="space-between">
                      <el-col :span="11">
                        <el-form-item   :prop="'formnumber['+index+'].roomPrefix'"  >
                          <el-input v-model="item.roomPrefix"  placeholder="前缀"></el-input>
                        </el-form-item>   
                      </el-col>
                      <el-col :span="11">
                        <el-form-item  label="" :prop="'formnumber['+index+'].roomSuffix'" >
                          <el-input v-model="item.roomSuffix"  placeholder="后缀"></el-input>
                        </el-form-item> 
                      </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" justify="space-between">
                      <el-col :span="11">
                        <el-form-item   :prop="'formnumber['+index+'].roomStartNum'" 
                        :rules="{type:'string',required: true, message: '不能为空', trigger: 'blur'}" >
                          <el-input v-model="item.roomStartNum"  placeholder="房间号"></el-input>
                        </el-form-item>   
                      </el-col>
                      <el-col :span="11">
                        <el-form-item   :prop="'formnumber['+index+'].roomEndtNum'" 
                        :rules="{type:'string',required: true, message: '不能为空', trigger: 'blur'}" >
                          <el-input v-model="item.roomEndtNum"  placeholder="房间号"></el-input>
                        </el-form-item> 
                      </el-col>
                    </el-row>
                    <el-form-item label="" :prop="'formnumber['+index+'].roomGalleryful'" :rules="[{required: true, message: '填写容纳人数'},{ type: 'number', message: '必须为数字值'}]" >
                      <el-input v-model.number="item.roomGalleryful"  placeholder="容纳人数">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="" :prop="'formnumber['+index+'].structureArea'" :rules="[{required: true, message: '填写建筑面积'},{ type: 'number', message: '必须为数字值'}]" >
                      <el-input v-model.number="item.structureArea"  placeholder="建筑面积">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="" :prop="'formnumber['+index+'].usefulArea'" :rules="[{required: true, message: '填写使用面积'},{ type: 'number', message: '必须为数字值'}]" >
                      <el-input v-model.number="item.usefulArea"  placeholder="使用面积">
                      </el-input>
                    </el-form-item>
                
                <div class="clear margin-top-5" ><img class="right"  @click="deletecreat(index)" src="../../../assets/image/delete-room-icon.png" /></div>
                </el-col>
              </el-row>
              </div>
            </el-form>
            <div class="clear margin-top-5"><img class="right" @click="addcreate" src="../../../assets/image/add-room-icon.png" /></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleassign = false">取 消</el-button>
        <el-button   type="primary" @click="addroom('form')" :loading="loading" >确 定</el-button>
      </div>
    </el-dialog>



    <el-dialog   :visible.sync="dialogchangeroom" width="30%" >
      <div slot="title"  >
            <p style="font-size:16px;" >修改房间</p>
        </div>
      <div style="max-width:380px; text-align:left;">
        <el-form :model="changeform" status-icon :label-position="labelPosition" label-width="100px"   ref='changeform'>
          <el-form-item label="楼层：">
            <span>{{changeform.floor}}</span>
          </el-form-item>
          <el-form-item label="房间名称：" >
            <span>{{changeform.roomName}}</span>
          </el-form-item>
          <el-form-item label="容纳人数：" prop="galleryful" :rules="[{required: true, message: '填写容纳人数'}]" >
            <el-input v-model.number="changeform.galleryful"  placeholder="容纳人数">
            </el-input>
          </el-form-item>
          <el-form-item label="建筑面积：" prop="structureArea" :rules="[{required: true, message: '填写建筑面积'}]" >
            <el-input v-model.number="changeform.structureArea"  placeholder="建筑面积">
            </el-input>
          </el-form-item>
          <el-form-item label="使用面积：" prop="usefulArea" :rules="[{required: true, message: '填写使用面积'}]" >
            <el-input v-model.number="changeform.usefulArea"  placeholder="使用面积">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogchangeroom = false">取 消</el-button>
        <el-button   type="primary" @click="subchangeroom('changeform')" :loading="loading" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import navTop from "../../common/header";
import course from "../../../apis/course.js";
import api from "../../../apis/login.js";
const qs = require('querystring');
export default {
  name: "room",
  data() {
    return {
      activeNames:0,
      loading: false,
      dialogchangeroom: false,
      labelPosition: "right",
      dialogVisibleassign: false,
      data: "",
      datafloor:'',
      form: {
        name: "",
        roomnum: "",
        number: ""
      },
      createform: {
        floor: "",
        formnumber: [
          {
            roomEndtNum: "",
            roomGalleryful: "",
            roomPrefix: "",
            roomStartNum: "",
            roomSuffix: "",
            usefulArea:"",
            structureArea:""
          }
        ]
      },
      changeform:{
        floor: "",
        id:"",
        roomName:"",
        galleryful:"",
        usefulArea:"",
        structureArea:""
      },
      datalength: null
    };
  },
  components: {
    navTop
  },
  created() {},
  mounted() {
    this.getroom();
    this.getfloor();
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    //获取楼层
    getfloor() {
      course.STgetfloor({ siteNameId: this.$route.query.id }).then(data => {
        if (data)  this.datafloor = data.data.data
      });
    },
    //获取房间信息
    getroom() {
      course.STgetroom({ siteNameId: this.$route.query.id }).then(data => {
        if (data) {
          this.data = data.data.data;
          this.datalength = this.data.list.length;
        }
      });
    },
    deletecreat(item) {
      //删除创建
      this.createform.formnumber.splice(item, 1);
    },
    addcreate() {
      //增加创建
      this.createform.formnumber.push({
        roomEndtNum: "",
        roomGalleryful: "",
        roomPrefix: "",
        roomStartNum: "",
        roomSuffix: "",
        usefulArea:"",
        structureArea:""
      });
    },
    createroom() {
      //创建弹出
      this.dialogVisibleassign = true;
    },
    addroom(formName) {
      //确认创建STcreatroom
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formdata = new FormData();
          formdata.append("floorId", this.createform.floor.floorId);
          formdata.append("fieldRooms",JSON.stringify(this.createform.formnumber));
          this.loading = true;
          course.STcreatroom(formdata).then(data => {
            this.loading = false;
            if (data) {
              this.$message({
                showClose: true,
                message: data.data.meta.message,
                type: "success",
                duration: "1500"
              });
              this.$refs[formName].resetFields();
              this.getroom();
              this.dialogVisibleassign = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    changeroom(r,f){
      this.dialogchangeroom = true;
      this.changeform.floor = f;
      this.changeform.roomName = r.roomName;
      this.changeform.galleryful = r.galleryful;
      this.changeform.structureArea = r.structureArea;
      this.changeform.usefulArea = r.usefulArea;
      this.changeform.id = r.roomId;
    },
    subchangeroom(formName){
       this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          course.change_room(qs.stringify(this.changeform)).then(data => {
            this.loading = false;
            if (data) {
              this.$message({
                showClose: true,
                message: data.data.meta.message,
                type: "success",
                duration: "1500"
              });
              this.getroom();
              this.dialogchangeroom = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    deleteroom(roomid){
      this.$confirm("确认删除?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            // let formdata = new FormData();
            // formdata.append("roomId", roomid);
            course.del_room({"roomId":roomid}).then(data => {
              instance.confirmButtonLoading = false;
              if (data) {
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: "success",
                  duration: "1500"
                });
                this.getroom();
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
          duration: "1500"
        });
      });
    },
    deletefloor(floorId) {
      this.$confirm("确认删除?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            course
              .STdeletefloor({
                floorId: floorId,
              })
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
                  this.getroom();
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
          duration: "1500"
        });
      });
    }
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.room {
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
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #fff;
}
.room-box {
  text-align: left;
}
.room-box-top {
  height: 30px;
  font-size: 14px;
  color: #333;
}
.room-box-top img {
  vertical-align: middle;
  margin-left: 15px;
  cursor: pointer;
}
.site-collapse-title {
  display: inline-block;
  margin-right: 10px;
  color: #333;
  font-size: 14px;
}
.site-collapse-card {
  width: 21%;
  margin: 10px 2%;
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
  text-align: left;
  font-size: 14px;
  padding: 5px 18px;
}
.site-collapse-card-cen .number{
  color: #409EFF;
  margin-left: 10px;
}
.site-collapse-footer img {
  margin: 0 10px;
  cursor: pointer;
  vertical-align: sub;
}

/**/
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
.creatromm{
  height: 50px;
}
.creatromm .creatromm_span{
  display: inline-block; 
  width: 130px;
  height: 50px;
  overflow: hidden;
}
</style>
<style>
.room .el-collapse-item__header {
    background-color: aliceblue;
    padding-left: 10px;
}
.room .el-card__header {
    padding: 10px 20px;
}
</style>