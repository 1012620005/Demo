<template>
  <div class="stuestTch">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >督导评价管理</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="stuestTch-box">
        <div class="stuestTch-top clear" >
            <el-row :gutter="20">
              <el-col  :span="18">
                <el-form :inline="true" :model="select_form" label-width="50px"  >
                    <el-form-item label="科目">
                      <el-select v-model="select_form.flag" >
                        <el-option v-for="item in option_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="学期">
                      <el-select v-model="select_form.xq" @change="getre" value-key="termId" >
                        <el-option v-for="item in trem_list" :key="item.termId" :label="item.term" :value="item"></el-option>
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
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="55">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="评价项目">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="科目">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="教职工"
                width="120">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="开始时间">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="结束时间">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="状态"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="creat" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="text-align:center;">
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
<el-dialog   :visible.sync="dialogMinutes" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >详情</p>
  </div>
  <div style="max-width:380px; text-align:left;">
    <el-form :model="form"  :label-position="labelPosition" :rules="rules" label-width="110px"  ref='form'>
        <el-form-item  label="条码号:" prop="type" >
          <el-input v-model="form.type"   placeholder="">
          </el-input>
        </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
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
      option_list:[
        {id:"1",name:"在库存"},
        {id:"2",name:"已出库"},
        {id:"3",name:"待审核"},
      ],
      trem_list:[],
      select_form:{
        xq:{},
        km:""
      },
      dialogMinutes:false,
      loading:false,
      tableloading:false,
      labelPosition: "right",
      tableData:[
        {
        "pjDate":"1"
      }
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
        this.select_form = r.data.data[0]
      }
    })
  },
  mounted() {
  },
  computed: {},
  methods: {
    assignation(){

    },
    getre(){
      this.getlist()
    },
    getlist(){
      let u={
        'xq':this.select_form.trem,
        'type':"2",
        'pageSize':10,
        'pageNo':this.page.pageNo,
      }
      AD.getevallist(u).then(r=>{
        if(r){
          this.tableData = r.data.data.list;
          this.page.count = r.data.data.count;
        }
      })
    },
    creat(row){
      // this.row = row;
      this.dialogMinutes = true;
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
</style>