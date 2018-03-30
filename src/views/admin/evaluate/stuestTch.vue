<template>
  <div class="stuestTch">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >学生评价老师</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="stuestTch-box">
        <div class="stuestTch-top clear" >
            <el-row :gutter="20">
              <el-col  :span="18">
                <el-form :inline="true" :model="select_form" label-width="50px"  >
                    <el-form-item label="科目">
                       <el-select v-model="select_form.km" @change="getre" filterable placeholder="请选择或输入关键字">
                          <el-option
                            v-for="item in subjectlist"
                            :key="item.id"
                            :label="item.SubjectName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学期">
                      <el-select v-model="select_form.xq" @change="getre"  >
                        <el-option v-for="item in trem_list" :key="item.termId" :label="item.term" :value="item.term"></el-option>
                      </el-select>
                    </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="6">
                
              </el-col>
            </el-row>
          <div style="margin:0 0 20px;">
            <el-table
              :data="tableData"
              stripe
              v-loading.body="tableloading"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="55">
              </el-table-column>
              <el-table-column
                prop="jobname"
                label="科目/部门">
              </el-table-column>
              <el-table-column
                prop="xq"
                label="评价学期">
              </el-table-column>
              <!-- <el-table-column
                prop="pjDate"
                label="开始时间">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="结束时间">
              </el-table-column> -->
              <el-table-column
                prop="recordstatename"
                label="状态"
                width="80">
              </el-table-column>
              <el-table-column
                prop="recordstate"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.recordstate == '2'"  @click="creat(scope.row)" plain size="small">查看</el-button>
                  <el-button v-if="scope.row.recordstate == '0' || scope.row.recordstate == '1'" @click="creat(scope.row)" type="success" plain size="small">评价</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="text-align:center; ">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page.pageNo"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="page.count">
            </el-pagination>
          </div>
      </div>
    </div>

<!--  -->
<el-dialog   :visible.sync="dialogMinutes" width="50%" >
  <div slot="title"  >
      <p style="font-size:16px;" >评价详情</p>
  </div>
  <div style=" text-align:left;">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-menu 
          @select="select_teacher"
          default-active="1"
          class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>教师列表</span>
            </template>
              <el-menu-item v-for="(item,index) in bpteacher_list" :key="index" :index="item.id">{{item.name}}</el-menu-item>
          </el-submenu>
         
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-tabs v-model="activename" @tab-click="handleClick">
          <div class="tab_kon" v-if="pj_statr.length == 0" >请选择被评对象</div>
          <el-tab-pane :label="'第'+alb_zi[index]+'次评价('+item.state+')'" :name="index.toString()"  :disabled="see_listinfo.recordstate !== '2'"  v-for="(item,index) in pj_statr " :key="item.id" >
            <el-form  :model="pj_form[index]" label-width="90px" ref="form" >
                <el-form-item label="时间：">
                  <span>{{item.startdate+'~'+item.enddate}}</span>
                </el-form-item>
                <el-form-item label="备注：">
                  <span>{{item.evaluate.remarks}}</span>
                </el-form-item>
                <el-form-item label="评价项目：">
                  <span>{{item.evaluate.project}}</span>
                </el-form-item>
                <el-form-item label="评价内容：" v-for="(items,indexs) in item.contents" :key="items.id">
                  <div>{{items.content}}<span style="color:red;">{{'('+items.score+'分)'}}</span></div>
                  <div style="text-align:right"><span>分数：</span><el-input-number v-model="pj_form[index].num[indexs].getscore" :disabled="see_listinfo.recordstate == '2'" size="small" controls-position="right"  :min="0" :max="10"></el-input-number></div>
                </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>  
  </div>
  <div slot="footer" v-if="see_listinfo.recordstate !== '2'" class="dialog-footer">
    <el-button @click="dialogMinutes = false">取 消</el-button>
    <el-button   type="primary" @click="assignation('form')" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import navTop from "../../common/header";
import AD from "../../../apis/admin.js";
const qs = require("querystring");
export default {
  name: "stuestTch",
  data() {
    return {
      alb_zi:['一','二','三'],
      activename:'0',
      subjectlist:[],
      trem_list:[],
      select_form:{
        xq:"",
        km:""
      },
      pj_form:[],
      pj_statr:[],
      bpteacher_list:[],
      see_listinfo:{},
      dialogMinutes:false,
      loading:false,
      tableloading:false,
      labelPosition: "right",
      tableData:[
      ],
      user:'',
      fewWeek:[],
      clazzs:[],
      page: {
        pageNo: 1,
        pageSize: Number,
        count: 1
      },
      form:{
        name:"",
        num:"",
        type:"",
        textarea:""
      },
      row:"",
       rules:{
        type: [ { required: true, message: '请输入资产类型', trigger: 'blur' }, ],
        name: [ { required: true, message: '请输入资产名称', trigger: 'blur' }, ],
        num: [ 
           {type: 'number', required: true, message: '资产数量不能为空', trigger: 'blur' },
           { type: 'number', message: '数量必须为数字值'}
         ],
        Price: [ 
           {type: 'number', required: true, message: '单价不能为空', trigger: 'blur' },
           { type: 'number', message: '单价必须为数字值'}
        ],
      }
    };
  },
  components: {
    navTop
  },  
  created() {
    AD.geTerm().then(r=>{
      if(r){
        this.trem_list = r.data.data;
        // this.select_form = r.data.data[0]
      }
    })
    AD.get_allsubject().then(r=>{
      if(r){
        this.subjectlist = r.data.data;
      }
    })
  },
  mounted() {
    this.getlist()
  },
  computed: {},
  methods: {
    select_teacher(val){
      this.pj_statr=[]
      this.pj_form=[]
      this.score.rid = val
      AD.find_bprxq({"eid":this.see_listinfo.id,"rid":val}).then(r=>{
        if(r){
          let _this = this;
          // for(let i=1,len=r.data.data.length;i<len;i++){
          //     _this.pj_form.push({'num':[]})
          // }
          r.data.data.map(function(item,index){
            _this.pj_form.push({'num':[]})
            item.contents.map(function(items,indexs){
              _this.pj_form[index].num.push({"id":items.id,"getscore":items.getscore})
            })
          })
           this.pj_statr = r.data.data;
          console.log(this.pj_form)
        }
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    assignation(){
      this.score.erid = this.pj_statr[Number(this.activename)].id;
      this.score.contentstr = JSON.stringify(this.pj_form[Number(this.activename)].num);
      this.loading = true;
      AD.set_score(qs.stringify(this.score)).then(r=>{
        this.loading = false;
        if(r){
          
          this.dialogMinutes = false;
          this.$message({
            showClose: true,
            message: r.data.meta.message,
            type: "success",
            duration: "1500"
          });
        }
      })
    },
    getre(){
      this.getlist()
    },
    getlist(){
      // console.log(this.select_form.xq.term)
      let u={
        'xq':this.select_form.xq,
        'subjectid':this.select_form.km,
        'pageSize':10,
        'pageNo':this.page.pageNo,
      }
      AD.get_stupjlist(u).then(r=>{
        if(r){
          this.tableData = r.data.data.list;
          this.page.count = r.data.data.count;
        }
      })
    },
    creat(row){
      this.activename='0'
      this.pj_statr=[]
      this.pj_form=[];
      this.score={
        rid:'',
        erid:'',
        contentstr:null
      };
      this.see_listinfo = row;
      AD.get_bpteacher({"eid":row.id}).then(r=>{
        if(r){this.bpteacher_list = r.data.data;this.dialogMinutes = true;}
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getlist();
    },
    back() {
      this.$router.go(-1);
    },
    
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.stuestTch {
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
.stuestTch-box {
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 40px;
  background-color: #fff;
}
.stuestTch-top {
  margin: 0 auto;
  width: 1160px;
  padding-top: 20px;
}
.tab_kon{
  width:100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
}
</style>