<template>
  <div class="resource">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >资源管理</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="resource-box">
        <div class="tabs">
          <ul class="tabs-items"  >
            <div ref="tabs" @click="tabstop"  >
              <li data-active="2" class="tabs-items-item">我的资源</li>
              <li data-active="1">校本资源</li>
            </div>
          </ul>
        </div>
        <div class="resource-top clear" >
          <div v-if="active == 1">
           <div class="classcourse-left left " >
              <h3 style=" margin-bottom: 20px;">章节列表</h3>
                <el-col :span="24">
                  <el-tree
                    v-loading.body="treeloading"
                    :data="data2"
                    ref="tree"
                    highlight-current
                    :props="defaultProps"
                    @node-click="getresourceList"
                    accordion
                    node-key="id">
                  </el-tree>
                </el-col>
              </el-row>
          </div> 
          <div class="classcourse-right right">
            <div class="resource-box-left clear">
              <span class="left" style="height: 30px;line-height: 30px;" >资源类型：</span>
              <ul class="resource-box-menu clear" @click="tabs" >
                <li class="active" ><a  >全部</a></li>
                <li v-for="t in page.types" :value="t.value" ><a>{{t.label}}</a></li>
              </ul>
              <div style="float:right">
                <el-input v-model="page.name" placeholder="请输入关键字">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="findResource"></i>
                </el-input>
              </div>
            </div>
            <div class="resource-box-card clear">
              <ul  class="resource-box-card-ul clear">
                <li v-for="(t,index) in page.list" :key="t.createdate" @click="getResource(t.id)">
                  
                  <el-card :body-style="{ padding: '10px',cursor: 'pointer' }">
                    <img :src="'./static/imgs/'+iconfont[t.type -1]+'.png'" >
                    <div style="padding: 14px;">
                      <h4>{{t.name}}</h4>
                      <div style="color:#5e7382">
                        <p>作者：{{t.createby}}</p>
                        <time class="time">{{t.createdate}}</time>
                      </div>
                    </div>
                  </el-card>
                </li>
              </ul>
            </div>
            <div style="text-align:center;" >
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="page.pagesize"
                layout="prev, pager, next, jumper"
                :total="page.count">
              </el-pagination>
            </div>
          </div>
          </div>
          <m-re v-if = 'active == 2'></m-re>
        </div>
      </div>

      <!-- 弹出 -->
      <el-dialog   :visible.sync="dialog" width="30%" >
        <div slot="title"  >
            <p style="font-size:16px;" >查看资源</p>
        </div>
        <div style=" text-align:left;">
          <el-form :label-position="labelPosition"  label-width="80px"  ref='form'>
              <!-- <el-form-item   > -->
                <div  v-if="showpalyer">
                  <video-player class="vjs-custom-skin" :options="playerOptions">
                  </video-player>
                </div>
              <!-- </el-form-item> -->
              <el-form-item  label="资源:"  >
                 <a href="#" @click="dowload(resource.fileid)">{{resource.filerealname}}</a>
              </el-form-item>
              <el-form-item  label="关联属性:"  >
                 {{resource.subjectname}}> 
                 {{resource.version}} >
                 {{resource.cb}} >
                 {{resource.zname}} >
                 {{resource.jname}} 
              </el-form-item>
              <el-form-item  label="资源名称:" prop="overdue">
                {{resource.name}}
              </el-form-item>
              <el-form-item  label="资源描述:" prop="overdue">
                {{resource.detail}}
              </el-form-item>
          </el-form>
        </div>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button   type="primary" @click="assignation('form')" :loading = 'loading' >确 定</el-button>
        </div> -->
      </el-dialog>

     
  </div>

  
</template>

<script>
// window.videojs = require('video.js')
//   videojs = videojs.default || videojs
// require('videojs-flash')
import navTop from "../common/header";
import mRe from "./myresource";
import validate from "../../validate";
import AD from "../../apis/admin.js";
import userApi from "../../apis/userCenter.js";
require('videojs-flash')
export default {
  name: "resource",
  data() {
    return {
      videodialog:true,
      playerOptions: {
        sources: [],
        techOrder: ['flash'],
        autoplay: true,
        controls: true
      },
      iconfont:['video','imgss','ppt','word','excel','pdf'],
      active:2,
      showpalyer:false,
      currentPage3:1,
      treeloading:false,
      dialog:false,
      labelPosition: "right",
      data2: [],
      showUrl:'',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        name: "",
        phone: "",
        textarea: ""
      },
      resource: {},
      page:{
        pageNo:1,
        pageSize:12,
        count:0,
        subjectid:'',
        subjectname:'',
        version:'',
        cb:'',
        zid:'',
        zname:'',
        jid:'',
        jname:'',
        list:[],
        types:[]
      }, //资源列表
      searchForm:{
        Keyword:'',
      }
    };
  },
  components: {
    navTop,
    mRe,
  },
  created() {},
  mounted() {
    AD.GetTree().then(data=>{
      if(data){
        let top = [{id:'top', label:'全部', type:'top', children:[]}];
        top[0].children = data.data.data;
        this.data2 = top;
        console.log(top);
        // this.data2 = data.data.data;
      }
    }),
    this.findResourceType();
    this.findResource();
  },
  computed: {},
  methods: {
    dowload(fileid) {
      if (fileid) {
        let url = userApi.getFileDownloadUrl(fileid);
        window.open(url);
      }
    },
     findResource() {
      let params = { 
        pageNo: this.page.pageNo, 
        pageSize: this.page.pageSize, 
        subjectid: this.page.subjectid, 
        cb: this.page.cb, 
        version: this.page.version, 
        zid: this.page.zid, 
        jid: this.page.uid, 
        type: this.page.type, 
        name: this.page.name, 
      };
      console.log("检索参数");
      console.log(params);
      userApi.findPublicPage(params).then(r => {
        if (r) {
          let page = r.data.data;
          this.page.pageNo = page.pageNo;
          this.page.pageSize = page.pageSize;
          this.page.count = page.count;
          this.page.list = page.list;
        }
      });
    },
    getparentnode(node) {
      let t = node;
      this.initParams(t.data);
      if (t.level > 1) {
        this.getparentnode(t.parent);
      } 
    },
    initParams(data) {
      if (data.type == "subject") {
        this.page.subjectid = data.id;
      } else if (data.type == "version") {
        this.page.version = data.id;
      } else if (data.type == "subname") {
        this.page.cb = data.id;
      } else if (data.type == "0") {
        this.page.zid = data.id;
      } else if (data.type == "1") {
        this.page.jid = data.id;
      }
    },
    getresourceList(data, node) {
      this.getparentnode(node);
      if (node.data.type == "top") {
        this.page.subjectid = "";
        this.page.version = "";
        this.page.cb = "";
        this.page.zid = "";
        this.page.jid = "";
      } else if (node.data.type == "subject") {
        this.page.version = "";
        this.page.cb = "";
        this.page.zid = "";
        this.page.jid = "";
      } else if (node.data.type == "version") {
        this.page.cb = "";
        this.page.zid = "";
        this.page.jid = "";
      } else if (node.data.type == "subname") {
        this.page.zid = "";
        this.page.jid = "";
      } else if (node.data.type == "0") {
        this.page.jid = "";
      }
      this.findResource();
    },
    getResource(id) {
      let params = {resourceid:id};
      userApi.getResource(params).then(r=>{
        console.log(r.data.data);
        let resource = r.data.data;
        resource.showUrl = userApi.getDownloadRecourceUrl(resource.filename);
        if (resource.type == "1") {
          this.showpalyer = true;
          let url = {
            type: "rtmp/mp4",
            src: "rtmp://192.168.10.7:1935/vod/" + resource.filename,
            withCredentials: false
          };
          this.playerOptions.sources = [url];
          this.playerOptions.autoplay = true;
          console.log("111111");
          console.log(this.playerOptions);
          console.log("111111");
        } else {
          this.showpalyer = false;
        }
        this.resource = resource;
        this.dialog = true;
      });
    },
    changeroom(){

    },
    deleteroom(){

    },
    //关键字查询
    querykw(){

    },
    handleCurrentChange(val){
      this.page.pageNo = val;
      this.findResource();
    },
    findResourceType() {
      userApi.findResourceType().then(r=>{
        if (r) {
          this.page.types = r.data.data;
        }
      });
    },
  
    back() {
      this.$router.go(-1);
    },
    tabs(e){ 
      console.log(e ) 
      // console.log(e.target == a)
      if(e.target.tagName == 'UL') return
      let li = e.target.tagName == 'A' ? e.target.parentElement : e.target;
      let lis = li.parentElement.children
      // console.log(lis)
      for(let i = 0;i<lis.length;i++){
        lis[i].className = '';
      }
      li.className = 'active'
      if (li.value) {
        this.page.type = li.value;
      } else {
        this.page.type = '';
      }
      this.findResource();
    },
    tabstop(e){
      if (e.target.tagName == "UL" || e.target.tagName == "DIV") return;
      let li = e.target;
      let lis = li.parentElement.children;
      for (let i = 0; i < lis.length; i++) {
        lis[i].className = "";
      }
      li.className = "tabs-items-item";
      this.active = e.target.attributes[1].value;
      this.findResource();
    }
  },
  directives: {},
  watch: {
    dialog:function(news,old){
      console.log(news)
      if(!news){
        this.playerOptions.autoplay = false;
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
.resource-box {
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 40px;
  background-color: #fff;
}
.resource-top {
  margin: 0 auto;
  width: 1160px;
  padding-top: 20px;
}

.logon-main-logon-right-button .el-button--primary {
  background-color: #208af5;
  width: 94px;
}
.classcourse-left{
  width:240px;
}
.classcourse-right{
  width:900px;
}
.resource-box-menu{
  display: inline-block;
}
.resource-box-menu li{
  float:left;
  padding:5px 10px;
  cursor: pointer;
}
.active{
  background-color: #208af5;
  border-radius: 5px;
}
.resource-box-card-ul{
  margin-top:10px;
  width: 100%;
}
.resource-box-card-ul li{
  width: 23%;
  margin: 0 1% 20px;
  float:left;
  text-align:center;
}
.resource-box-card-ul .el-card{
  box-shadow:none;
}
.resource-box-card-ul li:hover{
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  transition: all 0.2s ease-in;
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
  transition: background-color 0.3s ease-in;
}

</style>
<style>
  .el-dialog__header,.el-dialog__body{
    overflow: hidden;
  }
</style>