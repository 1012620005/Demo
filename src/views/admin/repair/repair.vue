<template>
  <div class="repair">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >申请报修</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="repair-box">
        <div class="repair-top clear" >
            <el-row :gutter="20">
              <el-col style="line-height: 40px;" :span="18">
                <span @click="creat" class="add-button">
                  <img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加申请</i>
                </span>
              </el-col>
              <el-col :span="6">
                <el-form :inline="true" :model="select_form" label-width="50px"  >
                  <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="24">
                    <el-form-item label="状态">
                      <el-select v-model="select_form.flag" >
                        <el-option v-for="item in option_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    </el-row>
                </el-form>
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
                label="资产名称"
                width="140">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="条码号"
                width="140">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="故障说明">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="地点"
                width="140">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="图片"
                width="120">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="申请时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="维修人员"
                width="100">
              </el-table-column>
              <el-table-column
                prop="pjDate"
                label="处理状态"
                width="100">
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
<el-dialog   :visible.sync="dialogMinutes" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >申请报修</p>
  </div>
  <div style="max-width:380px; text-align:left;">
    <el-form :model="form"  :label-position="labelPosition" :rules="rules" label-width="110px"  ref='form'>
        <el-form-item  label="条码号:" prop="type" >
          <el-input v-model="form.type"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="资产名称:" prop="name" >
          <el-input v-model="form.name"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="故障说明:" prop="name" >
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="form.textarea">
          </el-input>
        </el-form-item>
        <el-form-item  label="地点:" prop="name" >
          <el-input v-model="form.name"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="上传图片:" prop="type" >
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList2"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
import validate from "../../../validate";
import AD from "../../../apis/admin.js";
const qs = require("querystring");
export default {
  name: "repair",
  data() {
    return {
      fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      option_list:[
        {id:"1",name:"已处理"},
        {id:"2",name:"待处理"},
      ],
      select_form:{
        flag:''
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
        let _this = this
        r.data.data.map(function(item,index){
          if(new Date(item.termStartTime)<new Date() && new Date(item.termEndTime)>new Date()){
            let fewWeek = Number(item.termWeek)
            for(let i =0;i<fewWeek;i++){
              let n = i+1
              _this.fewWeek.push({'week':'第'+n+'周','items':n})
            }
            _this.form.week = _this.fewWeek[0];
            _this.getlist();
          }
        })
      }
    })
  },
  mounted() {
  },
  computed: {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    assignation(){

    },
    getre(){
      this.getlist()
    },
    getlist(){
      let u={
        'type':1,
        'pageSize':10,
        'pageNo':this.page.pageNo,
      }
      AD.set_asset_aud(u).then(r=>{
        if(r){
          this.tableData = r.data.data.list;
          this.page.count = r.data.data.count;
        }
      })
    },
    creat(row){
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
.repair {
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
.repair-box {
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 40px;
  background-color: #fff;
}
.repair-top {
  margin: 0 auto;
  width: 1160px;
  padding-top: 20px;
}
</style>