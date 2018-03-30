<template>
  <div class="posts">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >个人工资</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="posts-box">
        <div class="posts-top clear" >
          <div style="margin:0 0 20px;">
            <el-table
              :data="tableData"
              stripe
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="55">
              </el-table-column>
              <el-table-column
                prop="salaryTime"
                label="工资月份">
              </el-table-column>
              <el-table-column
                prop="teacherName"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="idcard"
                label="	身份证号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="salaryType"
                label="工资类别">
              </el-table-column>
              <el-table-column
                prop="schoolName"
                label="处科室">
              </el-table-column>
              <el-table-column
                prop="totalPay"
                label="应发工资">
              </el-table-column>
              <el-table-column
                prop="positionSalary"
                label="岗位工资">
              </el-table-column>
              <el-table-column
                prop="salaryRank"
                label="薪级工资">
              </el-table-column>
              <el-table-column
                prop="teachTime"
                label="教龄津贴">
              </el-table-column>
              <el-table-column
                prop="aloneChildSalary"
                label="独生子女费"
                width="120">
              </el-table-column>
              <el-table-column
                prop="womanSalary"
                label="女职工卫生费"
                width="120">
              </el-table-column>
              <el-table-column
                prop="otherSalary"
                label="其他补贴">
              </el-table-column>
              <el-table-column
                prop="huiminSalary"
                label="回民补贴">
              </el-table-column>
              <el-table-column
                prop="baseProferSalary"
                label="基础性绩效工资"
                width="140">
              </el-table-column>
              <el-table-column
                prop="awardProferSalary"
                label="奖励性绩效工资"
                width="140">
              </el-table-column>
              <el-table-column
                prop="tenamentSalary"
                label="物业补贴">
              </el-table-column>
              <el-table-column
                prop="deductSalary"
                label="应扣工资">
              </el-table-column>
              <el-table-column
                prop="incomTax"
                label="个人所得税"
                width="120">
              </el-table-column>
              <el-table-column
                prop="housingFund"
                label="住房公积金"
                width="120">
              </el-table-column>
              <el-table-column
                prop="pensionInsurance"
                label="养老保险">
              </el-table-column>
              <el-table-column
                prop="medicalInsurance"
                label="医疗保险">
              </el-table-column>
              <el-table-column
                prop="unemploymentInsurance"
                label="失业保险">
              </el-table-column>
              <el-table-column
                prop="reissueProferSalary"
                label="补发绩效工资">
              </el-table-column>
              <el-table-column
                prop="probationSalary"
                label="试用期工资">
              </el-table-column>
              <el-table-column
                prop="reissueBaseSalary"
                label="补发基本工资">
              </el-table-column>
              <el-table-column
                prop="reissueAllowance"
                label="补发津补贴">
              </el-table-column>
              <el-table-column
                prop="realSalary"
                label="实发工资">
              </el-table-column>
            </el-table>
          </div>
          <!-- <div style="text-align:center; ">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page.pageNo"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.count">
            </el-pagination>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import navTop from "../common/header";
import AD from "../../apis/admin.js";
import {getCascader} from "../../utils/auth.js"
const qs = require("querystring");
export default {
  name: "posts",
  data() {
    return {
      labelPosition: "right",
      tableData:[
      ],
      
      page: {
        pageNo: 1,
        pageSize: 10,
        count: 1
      },
      
    };
  },
  components: {
    navTop
  },  
  created() {
    this.getlist()
  },
  mounted() {
    
  },
  computed: {},
  methods: {
    getlist(){
      let u={
        'pageSize':this.page.pageSize,
        'pageNo':this.page.pageNo,
      }
      AD.get_salary(u).then(r=>{
        if(r){
          this.tableData = r.data.data.list;
          this.page.pageNo = r.data.data.pageNo;
          this.page.count = r.data.data.count;
        }
      })
    },
    
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getlist();
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
.posts {
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
.posts-box {
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 40px;
  background-color: #fff;
}
.posts-top {
  margin: 0 auto;
  width: 1160px;
  padding-top: 20px;
}
.posts .el-cascader{
  width: 100%;
}
</style>