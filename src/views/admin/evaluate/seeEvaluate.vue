<template>
  <div class="seeEvaluate">
      <nav-top></nav-top>
      <div class="log-magess"><span class="arrow-center left" >评价结果</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></div>
        <div  class="seeEvaluate-box">
          <div class="seeEvaluate-top" >
          <el-form :inline="true" :model="select_form" >
            <el-form-item label="评价类别">
              <el-select v-model="select_form.type" >
                <el-option label="教职工互评" value="0"></el-option>
                <el-option label="学生对老师评价" value="1"></el-option>
                <el-option label="督查对老师评价" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评价学期">
              <el-select v-model="select_form.xq"  value-key="termId" >
                <el-option v-for="item in trem_list" :key="item.termId" :label="item.term" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
            
          <div style="margin:0 0 20px;">
            <el-table
              :data="tableData"
              stripe
              v-loading.body="tableloading"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="60">
              </el-table-column>
              <el-table-column
                prop="tyoe"
                label="评价类别"
                width="160"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.type == '0'">教职工互评</span>
                  <span v-if="scope.row.type == '1'">学生对老师评价</span>
                  <span v-if="scope.row.type == '2'">督查对老师评价</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="project"
                label="评价项目">
              </el-table-column>
              <el-table-column
                prop="xq"
                label="评价学期">
              </el-table-column>
              <el-table-column
                prop="assetsType"
                label="评价分数">
              </el-table-column>
              <el-table-column
                label="状态"
                width="80">
                <template slot-scope="scope">
                  <span>{{scope.row.statename}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                  <el-button @click="creat(scope.row)" plain size="small">查看</el-button>
                  <el-button @click="seemap(scope.row)" type="success"  size="small" plain>统计图</el-button>
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
<el-dialog   :visible.sync="dialogMinutes" width="45%" >
  <div slot="title"  >
      <p style="font-size:16px;" >详情</p>
  </div>
  <div style="text-align:left;">
    <el-tabs v-model="activename" @tab-click="handleClick">
      <el-tab-pane :label="'第'+alb_zi[index]+'次评价('+item.state+')'" :name="index.toString()"  v-for="(item,index) in pj_statr " :key="item.id" >
         <el-table
          :data="item.result.list"
          border
          style="width: 100%">
          <el-table-column
            prop="receivename"
            label="评价人">
          </el-table-column>
          <el-table-column
            :prop="items.id"
            :label="items.content" v-for="items in item.result.header" :key="items.id">
          </el-table-column>
          <el-table-column
            prop="total"
            label="总分">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- <div slot="footer" class="dialog-footer">
    <el-button @click="dialogMinutes = false">取 消</el-button>
    <el-button   type="primary" @click="assignation('form')" :loading = 'loading' >确 定</el-button>
  </div> -->
</el-dialog>
<el-dialog  :visible.sync="dialogmap"  width="45%" >
  <div slot="title"  >
      <p style="font-size:16px;" >雷达图</p>
  </div>
  <div  ref="map" style="margin: 0 auto;width: 600px;height:400px;" >
    
  </div>
  <!-- <div slot="footer" class="dialog-footer">
    <el-button @click="dialogmap = false">取 消</el-button>
    <el-button   type="primary" @click="assignation('form')" :loading = 'loading' >确 定</el-button>
  </div> -->
</el-dialog>
  </div>
</template>

<script>
import navTop from "../../common/header";
import validate from "../../../validate";
const echarts = require('echarts');
import AD from "../../../apis/admin.js";
const qs = require('querystring');
export default {
  name: "seeEvaluate",
  data() {
    return {
      alb_zi:['一','二','三'],
      option_list:[
        {id:"0",name:"教职工互评"},
        {id:"1",name:"学生对老师评价"},
        {id:"2",name:"督查对老师评价"},
      ],
      trem_list:[],
      select_form:{
        km:'',
        xq:{}
      },
      pj_statr:[],
      activename:'0',
      dialogMinutes:false,
      dialogmap:false,
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
      },
      option:{
      },
    };
  },
  components: {
    navTop
  },
  created() {},
  mounted() {
   this.getlist();
   AD.geTerm().then(r=>{
      if(r){
        this.trem_list = r.data.data;
        this.select_form = r.data.data[0]
      }
    })
  },
  computed: {},
  methods: {
    //获取列表
    handleClick(tab, event) {
      console.log(this.activename)
    },
    getlist(){
      let data = {
        "pageSize":10,
         "pageNo":this.page.pageNo, 
         "xq": "",
         "type":""
      }
      AD.getevallist(data).then(r=>{
        if(r) {this.tableData = r.data.data.list;this.page.count = r.data.data.count }
      })
    },
    seemap(row){
      let _this = this
      this.dialogmap =true;
      setTimeout(function(){
        AD.eval_Result({"eid":row.id}).then(r=>{
          if(r){
            _this.pj_statr = r.data.data;
            var myChart = echarts.init(_this.$refs.map);
            let indicator_s =[], data_s=[],series_s=[],d=[],ids=[]
            data_s = _this.pj_statr.map(function(item,index){
              let list=item.result.list
              series_s.push({name:'第'+_this.alb_zi[index]+'次评价',value:[]})
              d.push(list[list.length-1])
              
              if(index == 0){
                indicator_s = item.result.headerarr.map(function(items,indexs){
                  ids.push(items.id)
                  return {name:items.content,max:items.score}
                })
              }
              return '第'+_this.alb_zi[index]+'次评价'
            })
            
            for(let x=0;x<d.length;x++){
              if(d[x].total !== 0){
                let w= d[x]
                for(let j=0;j<ids.length;j++){
                  let f = ids[j]
                  series_s[x].value.push(w[ids[j]])
                }
              }
            }
            // 绘制图表
            _this.option = {
                tooltip: {},
                legend: {
                    data: data_s
                },
                radar: {
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                      }
                    },
                    indicator:indicator_s
                },
                series: [{
                    name: row.project,
                    type: 'radar',
                    data : series_s
                }]
            };
            console.log(_this.option)
            myChart.setOption(_this.option);
          }
        })
        
      },0)
    },
    creat(row){
      this.activename='0'
      AD.get_allRecord({"eid":row.id}).then(r=>{
        if(r){this.pj_statr = r.data.data;this.dialogMinutes = true;}
      })
    },
    handleSizeChange(val) {
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
.seeEvaluate-box {
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 40px;
  background-color: #fff;
}
.seeEvaluate-top {
  margin: 0 auto;
  width: 1160px;
  padding-top: 20px;
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
</style>

<style >
.seeEvaluate .demo-table-expand {
    font-size: 0;
  }
 .seeEvaluate .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
 .seeEvaluate .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }
</style>