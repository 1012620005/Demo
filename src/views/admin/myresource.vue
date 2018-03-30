<template>
  <div class="myresourse" >
           <div class="classcourse-left left " >
              <h3 style=" margin-bottom: 20px;">章节列表 </h3>
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
          <div class="classcourse-right right" >
            <div class="resource-box-left clear">
              <span @click="showDialog('')" class="add-button left" style="line-height:28px;" ><img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 上传资源</i></span>
              <span class="left" style="height: 30px;line-height: 30px;" >资源类型：</span>
              <ul class="resource-box-menu clear" @click="tabs" >
                <li class="active" value='' ><a  >全部</a></li>
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
                <li v-for="(t,index) in page.list" :key="index"  >
                  <el-card :body-style="{ padding: '10px',cursor: 'pointer' }">
                    <!-- <img src="" style="width:80px; height:80px;"> -->
                    <img  @click="getResource(t.id)" :src="'./static/imgs/'+iconfont[t.type -1]+'.png'" >
                    <div style="padding: 14px;">
                      <h4>{{t.name}}</h4>
                      <div style="color:#5e7382"> 
                        <p>作者：{{t.createby}}</p>
                        <time class="time">{{t.createdate}}</time>
                      </div>
                    </div>
                    <div style="height: 20px;" >
                      <span v-if="t.publicflag == '0'" @click="publicresource(t.id, '1')" style="padding:0 6px;cursor: pointer;">
                        <el-tooltip :content="'点击公开'" placement="top">
                          <img   src="../../assets/image/gk.png"/>
                        </el-tooltip>
                        </span>
                      <span v-else @click="publicresource(t.id, '0')" style="padding:0 6px;cursor: pointer;" >
                        <el-tooltip :content="'取消公开'" placement="top">
                        <img   src="../../assets/image/qxgk.png"/>
                        </el-tooltip>
                        </span>
                      <span @click="deleteresource(t.id)" style="padding:0 6px;cursor: pointer;" >
                        <el-tooltip :content="'点击删除'" placement="top">
                        <img  src="../../assets/image/delete-icon.png"/>
                      </el-tooltip>
                      </span>
                    </div>
                  </el-card>
                </li>
              </ul>
            </div>
            <div style="text-align:center;">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="page.pagesize"
                layout="prev, pager, next, jumper"
                :total="page.count">
              </el-pagination>
            </div>
          </div>

<!-- 弹出 -->
<el-dialog   :visible.sync="dialog" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >上传资源</p>
  </div>
  <div style="max-width:420px; text-align:left;">
    <el-form :model="form"  :label-position="labelPosition"  label-width="80px"  ref='form'>
        <el-form-item  label="学科:"  >
          <el-select v-model="form.subjectid" @change="findVersionBySubject" placeholder="">
            <el-option v-for="(t,index) in ss" :label="t.SubjectName" :value="t.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="版本:" >
          <el-select v-model="form.version" @change="findCbByVersion" placeholder="">
            <el-option v-for="(t,index) in vs" :label="t.version" :value="t.version" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="册别:" >
          <el-select v-model="form.jc" value-key="subname" @change="findZjByJc('0')"  placeholder="">
            <el-option  v-for="(t,index) in cs" :label="t.subname" :value="t" :key="index" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="章节:" >
          <el-select v-model="form.zid" @change="findZjByJc('1')"  placeholder="">
            <el-option v-for="(t,index) in zs" :label="t.name" :value="t.id" :key="index" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="节点:"  >
          <el-select v-model="form.jid" placeholder="">
            <el-option v-for="(t,index) in js" :label="t.name" :value="t.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="资源名称:" prop="overdue">
          <el-input v-model.number="form.name"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="资源描述:" prop="overdue">
          <el-input v-model.number="form.detail" placeholder="">
        </el-input>
        </el-form-item>
        <el-form-item  label="上传附件:" prop="file"
         >
          <el-upload
            class="upload-demo"
            :file-list="filelist"
            :on-success="success"
            :action="form.url"
            :data="filedata"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">点击上传</div>
            <!-- <div class="el-upload__tip" slot="tip">提示：上传文件格式所支持的格式有（视频、音频、图片、文档）上传资源即表示您同意上传服务条款，请勿上传色情、反动等违法违规内容</div> -->
          </el-upload>
        </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog = false">取 消</el-button>
    <el-button   type="primary" @click="assignation('form')" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>

<!-- 弹出 -->
<el-dialog   :visible.sync="dialog1" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >上传资源</p>
  </div>
  <div style="max-width:420px; text-align:left;">
    <el-form :model="form"  :label-position="labelPosition"  label-width="80px"  ref='form'>
        <el-form-item  label="学科:"  >
          <el-select v-model="form.subjectid" @change="findVersionBySubject" placeholder="">
            <el-option v-for="(t,index) in ss" :label="t.SubjectName" :value="t.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="版本:" >
          <el-select v-model="form.version" @change="findCbByVersion" placeholder="">
            <el-option v-for="(t,index) in vs" :label="t.version" :value="t.version" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="册别:" >
          <el-select v-model="form.jc" value-key="subname" @change="findZjByJc('0')"  placeholder="">
            <el-option  v-for="(t,index) in cs" :label="t.subname" :value="t" :key="index" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="章节:" >
          <el-select v-model="form.zid" @change="findZjByJc('1')"  placeholder="">
            <el-option v-for="(t,index) in zs" :label="t.name" :value="t.id" :key="index" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="节点:"  >
          <el-select v-model="form.jid" placeholder="">
            <el-option v-for="(t,index) in js" :label="t.name" :value="t.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="关联属性:"  >
            {{form.sx}}
        </el-form-item>
        <el-form-item  label="资源名称:" prop="overdue">
          {{form.name}}
        </el-form-item>
        <el-form-item  label="资源描述:" prop="overdue">
          {{form.detail}}
        </el-form-item>
        <el-form-item  label="文件名称:" prop="overdue">
          <a href="#" @click="download(form.fileid)">{{form.filerealname}}</a>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog1 = false">取 消</el-button>
    <el-button   type="primary" @click="editattr()" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
// import Vue from 'vue'
// // ...
// import { videoPlayer } from 'vue-video-player'
import navTop from "../common/header";
import validate from "../../validate";
import AD from "../../apis/admin.js";
import userApi from "../../apis/userCenter.js";
export default {
  name: "resource",
  data() {
    return {
      // videoOptions: {
      //   source: {
      //     type: "rtmp/mp4",
      //     src: 'rtmp://your.streaming.provider.net/cfx/st/&mp4:path/to/video.mp4',
      //     withCredentials: false
      //   },
      //   language: 'zh-CN',
      //   live: true,
      //   autoplay: true,
      //   height: 540
      // },
      iconfont:['video','imgss','ppt','word','excel','pdf'],
      loading: false,
      edit:false,
      dialog: false,
      dialog1: false,
      treeloading: false,
      currentPage3: 1,
      labelPosition: "right",
      data2: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      filedata:{entity:'resource', type:'file',ticket:''},
      filelist:[],
      resource: {},
      form: {
        id: "",
        subjectid: "",
        version: "",
        jc:{},
        cb: "",
        zid: "",
        jid: "",
        jcid: "",
        detail: "",
        name: "",
        fileid: "",
        filename: "",
        url: "",
        
      },
      ss:[],
      vs:[],
      cs:[],
      zs:[],
      js:[],
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
     
      searchForm: {
        Keyword: ""
      }
    };
  },
  components: {
    navTop
  },
  created() {
    
  },
  mounted() {
    AD.GetTree().then(data => {
      if (data) {
        let top = [{id:'top', label:'全部', type:'top', children:[]}];
        top[0].children = data.data.data;
        this.data2 = top;
        console.log(top);
      }
    }),
    this.findResourceType();  //查询所有资源类型
    this.findResource();  //查询资源
    this.findAllCourse(); //查询所有学科
    let _this = this;
    _this.getUploadUrl();
    setInterval(function(){_this.getUploadUrl()}, 4 * 60000);
  },
  computed: {},
  methods: {
    download(fileid) {  //直接下载
      window.open(userApi.getFileDownloadUrl(fileid));
    },
    getUploadUrl() {
      this.form.url = userApi.getFileUploadUrl();
      console.log(this.form.url);
    },
    getResource(id) {
      // this.edit = true;
      let params = {resourceid:id};
      userApi.getResource(params).then(r=>{
        if (r) {
          this.clearForm();
          this.dialog1 = true;
          let resource = r.data.data;
          this.form.showUrl = userApi.getDownloadRecourceUrl(resource.filename);
          this.form.id = resource.id;
          this.form.fileid = resource.fileid;
          this.form.subjectname = resource.subjectname;
          this.form.sx = resource.subjectname + ">" + resource.version + ">" + resource.cb + ">" + resource.zname + ">" + resource.jname;
          this.form.name = resource.name;
          this.form.detail = resource.detail;
          this.form.filerealname = resource.filerealname;
        }
      });
      setTimeout(this.edit = false, 1000);
    },
    changeroom(){

    },
    deleteroom(){

    },
    publicresource(id, type) {
      let msg = "";
      if (type == '0') {
        msg = "取消"
      }
      this.$confirm('是否确要'+ msg +'公开资源', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let quit = new FormData();
				quit.append('resourceid', id);
				quit.append('type', type);
				userApi.publicResource(quit).then(r => {
					if (r) {
            userApi.showMsg(r.data.meta);
            this.findResource();
          }
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消'
				});          
			});
    },
    deleteresource(id) {
      console.log("删除"+ id);
      this.$confirm('是否确删除资源', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let quit = new FormData();
				quit.append('resourceid', id );
				userApi.deleteResource(quit).then(r => {
					if (r) {
            userApi.showMsg(r.data.meta);
            this.findResource();
          }
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
    },
    clearForm() {
      let form = {
        id: "",
        subjectid: "",
        version: "",
        jc:{},
        cb: "",
        zid: "",
        jid: "",
        jcid: "",
        detail: "",
        name: "",
        fileid: "",
        filename: "",
        url: this.form.url,
      };
      this.form = form;
    },
    showDialog(id) {
      if (id) {
        console.log(id);
      } else {
        this.clearForm();
      }
      // this.getUploadurl();  //获取服务器票据
      this.dialog = true;
    },
    success(r, file, filelist) {
      if (r) {
        console.log(r)
        this.form.fileid = r.data.id;
        this.form.filename = file.name;
        if (filelist.length > 1) {
          filelist.splice(0, 1);
        }
        console.log(this.form);
      }
    },
    findZjByJc(type){
      let jcid;
       if (type == "0") {
            jcid = this.form.jc.id;
          } else if (type == "1") {
            jcid = this.form.zid;
          }
      let params = {jcid:jcid, type:type};
      userApi.findZjByJc(params).then(r=>{
        if (r) {
          if (type == "0") {
            this.zs = r.data.data;
            if (!this.edit) {
              this.form.js = [];
              this.form.zid = '';
              this.form.jid = '';
            }
          } else if (type == "1") {
            this.js = r.data.data;
            if (!this.edit) {
              this.form.jid = '';
            }
          }
        }
      });
    },
    findCbByVersion(){
      let params = {subjectid:this.form.subjectid, version:this.form.version};
      userApi.findCbByVersion(params).then(r=>{
        if (r) {
          this.cs = r.data.data;
          if (!this.edit) {
            this.zs = [];
            this.js = [];
            this.form.cb = '';
            this.form.zid = '';
            this.form.jid = '';
            this.form.jc = {};
          } else {
            for (let i = 0; i < cs.length; i ++) {
              if (cs[i].subjectid == this.form.subjectid 
                && cs[i].version == this.form.version
                && cs[i].cb == this.form.cb ) {
                this.form.jc = cs[i];
                console.log(this.form.jc);
              }
            }
          }
        }
      });
    },
    findVersionBySubject(){
      let params = {subjectid:this.form.subjectid};
      userApi.findVersionBySubject(params).then(r=>{
        if (r) {
          this.vs = r.data.data;
          if (!this.edit) {
            this.cs = [];
            this.zs = [];
            this.js = [];
            this.form.version = '';
            this.form.cb = '';
            this.form.zid = '';
            this.form.jid = '';
            this.form.jc = {};
          }
        }
      });
    },
    findAllCourse() {
      userApi.findAllCourse().then(r=>{
        if (r) {
          this.ss = r.data.data;
        }
      });
    },
    editattr() {  //修改属性提交
      let resource = new FormData();
      resource.append("id", this.form.id);
      resource.append("version", this.form.version);
      resource.append("cb", this.form.jc.subname);
      resource.append("subjectid", this.form.subjectid);
      resource.append("jcid", this.form.jc.id);
      resource.append("zid", this.form.zid);
      resource.append("jid", this.form.jid);
      console.log(this.form);
      userApi.saveResource(resource).then(r=>{
        if (r) {
          dialog1 = false;
          userApi.showMsg(r.data.meta);
          this.findResource();
        }
      });
    },
    //资源提交
    assignation() {
      let resource = new FormData();
      resource.append("id", this.form.id);
      resource.append("name", this.form.name);
      resource.append("version", this.form.version);
      resource.append("cb", this.form.jc.subname);
      resource.append("subjectid", this.form.subjectid);
      resource.append("jcid", this.form.jc.id);
      resource.append("zid", this.form.zid);
      resource.append("jid", this.form.jid);
      resource.append("fileid", this.form.fileid);
      resource.append("filename", this.form.filename);
      resource.append("detail", this.form.detail);
      console.log(this.form);
      userApi.saveResource(resource).then(r=>{
        if (r) {
          userApi.showMsg(r.data.meta);
          this.findResource();
        }
      });
    },

    querykw() {},
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.findResource();
    },
    findResourceType() {
      userApi.findResourceType().then(r => {
        if (r) {
          this.page.types = r.data.data;
        }
      });
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
      userApi.findMyPage(params).then(r => {
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
    back() {
      this.$router.go(-1);
    },
    tabs(e) {
      console.log(e);
      // console.log(e.target == a)
      if (e.target.tagName == "UL") return;
      let li = e.target.tagName == "A" ? e.target.parentElement : e.target;
      let lis = li.parentElement.children;
      // console.log(lis);
      for (let i = 0; i < lis.length; i++) {
        lis[i].className = "";
      }
      li.className = "active";
      if (li.value) {
        this.page.type = li.value;
      } else {
        this.page.type = '';
      }
      this.findResource();
    }
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
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
.classcourse-left {
  width: 240px;
}
.classcourse-right {
  width: 900px;
}
.resource-box-menu {
  display: inline-block;
}
.resource-box-menu li {
  float: left;
  padding: 5px 10px;
  cursor: pointer;
}
.active {
  background-color: #208af5;
  border-radius: 5px;
}
.resource-box-card-ul {
  margin-top: 10px;
  width: 100%;
}
.resource-box-card-ul li {
  width: 23%;
  margin: 0 1% 20px;
  float: left;
  text-align: center;
}
.resource-box-card-ul .el-card {
  box-shadow: none;
}
.resource-box-card-ul li:hover {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease-in;
}
.tabs-items-item {
  background-color: #fff;
  border-right: 1px solid #dfe6ec;
  border-top: 1px solid #dfe6ec;
  border-left: 1px solid #dfe6ec;
  color: #208af5;
  transition: background-color 0.3s ease-in;
}
.el-upload__tip{
  color:red;
}
.el-select{
  width:100%;
}
.myresourse .upload-demo {
  width:100%
}
.site-collapse-footer{
  width:100px;
  text-align:center;
  height:16px;
}
.site-collapse-footer img{
  margin:0 10px;
  cursor:pointer;
  vertical-align: middle;
}
</style>
<style>
.myresourse .upload-demo .el-upload-dragger{
  width:100%;
}
.myresourse .upload-demo .el-upload{
  width:100%;
}
</style>