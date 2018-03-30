<template>
  <div class="tevaluation">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >学生处罚记录</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="tevaluation-box">
        <div class="tevaluation-top clear" >
          <div class="dfsend-title clearfix">
              <div class="schl">学生处罚记录</div>
              <div class="schl">
                  <label>专业</label>
                  <el-select v-model="majorsel.value" clearable>
                      <el-option v-for="item in majorsel.options" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                  </el-select>
              </div>
              <div class="schl">
                  <label>行政班</label>
                  <el-select v-model="admclasel.value" clearable>
                      <el-option v-for="item in admclasel.options" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                  </el-select>
              </div>
              <div class="schl">
                  <label>专业类</label>
                  <el-select v-model="classifysel.value" clearable>
                      <el-option v-for="item in classifysel.options" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                  </el-select>
              </div>
              <div class="schl">
                  <label>教学班</label>
                  <el-select v-model="classessel.value" clearable>
                      <el-option v-for="item in classessel.options" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                  </el-select>
              </div>
          </div>
          <div style="margin:15px 0 20px;">
            <el-table :data="tableData" stripe v-loading.body="tableloading" style="width: 100%">
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="content" label="学生姓名">
              </el-table-column>
              <el-table-column prop="content" label="专业">
              </el-table-column>
              <el-table-column prop="content" label="行政班">
              </el-table-column>
              <el-table-column prop="content" label="专业类">
              </el-table-column>
              <el-table-column prop="content" label="教学班">
              </el-table-column>
              <el-table-column prop="content" label="处罚记录">
              </el-table-column>
              <el-table-column prop="updateDate" label="处罚时间" width="180">
              </el-table-column>
              <el-table-column label="操作" width="140">
                <template slot-scope="props">
                 <div style="cursor: pointer;">
                    <el-tooltip :content="'查看详情'" placement="top">
                      <span ><img @click="checkinformation(props.row)" style="vertical-align: middle;" src="../../assets/image/eye-icon.png"/></span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="text-align:center; ">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page.pageNo"
              :page-size="10" layout="prev, pager, next, jumper" :total="page.count">
            </el-pagination>
          </div>
      </div>
    </div>

<el-dialog   :visible.sync="dialogassets" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >处罚详情</p>
  </div>
  <div style="max-width:320px; text-align:left;">
    <el-form   :label-position="labelPosition"  label-width="85px"  >
      <el-form-item label="学生姓名:">
        <div>{{formpop.updateDate}}</div>
      </el-form-item>
      <el-form-item label="专业:">
        <div>{{formpop.name}}</div>
      </el-form-item>
      <el-form-item label="行政班:">
        <div>{{formpop.content}}</div>
      </el-form-item>
      <el-form-item label="专业类:">
        <div>{{formpop.updateDate}}</div>
      </el-form-item>
      <el-form-item label="教学班:">
        <div>{{formpop.name}}</div>
      </el-form-item>
      <el-form-item label="处罚记录:">
        <div>{{formpop.content}}</div>
      </el-form-item>
      <el-form-item label="处罚时间:">
        <div>{{formpop.content}}</div>
      </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogassets = false">取 消</el-button> -->
    <el-button   type="primary"  @click="dialogassets = false"  >确 定</el-button>
  </div>
</el-dialog>




  </div>
</template>

<script>
import navTop from "../common/header";
import validate from "../../validate";
import AD from "../../apis/admin.js";
const qs = require("querystring");
export default {
  name: "tevaluation",
  data() {
    return {
      dialogassets:false,
      tableloading:false,
      treeloading: false,
      labelPosition: "right",
      tableData:[],
      currentPage3:1,
      form: {
        time: "",
        state: "",
      },
      page:{
        pageNo: 1,
        pageSize: Number,
        count:null,
      },
      formpop:"",
      // 专业类
      classifysel:{
        options: [],
        value: '',
      },
      // 专业
      majorsel:{
        options: [],
        value: '',
      },
      // 行政班
      admclasel:{
        options: [],
        value: '',
      },
      // 教学班
      classessel:{
        options: [],
        value: '',
      },
    };
  },
  components: {
    navTop
  },
  created() {},
  mounted() {
   this.getlist()
  },
  computed: {},
  methods: {
    getlist(){
      let data={
        'userId':this.$Cookies.get('userId'),
        'pageNo': this.page.pageNo,
        'pageSize': 10
      }
      AD.punishlist(qs.stringify(data)).then(r=>{
        if(r) {this.tableData = r.data.data.list;this.page.count = r.data.data.count }
      })
    },
    checkinformation(row){
      this.dialogassets = true;
      this.formpop = row;
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
.schl{
    float:left;
    margin-right:20px;
    margin-bottom:20px;
}
.schl:first-child{
  margin-top:10px;
}
.schl i{
  width: 16px;
  height:16px;
  float:left;
  margin-top:2px;
  margin-right:6px;
  background:url("../../assets/img/deanfund/print.png") 0 0 no-repeat;
}
.schl .el-select{
  width:147px;
}
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
  margin-left: 22px;
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
.tevaluation-box {
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 40px;
  background-color: #fff;
}
.tevaluation-top {
  margin: 0 auto;
  width: 1160px;
  padding-top: 20px;
}

.logon-main-logon-right-button .el-button--primary {
  background-color: #208af5;
  width: 94px;
}

</style>