<template>
  <div class="faid">
    <!-- 头 -->
    <span class="faid-title">奖学金</span>
    <!--列表  -->
    <el-table stripe :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="term" label="奖学金学期">
        </el-table-column>
        <el-table-column prop="money" label="奖学金金额">
        </el-table-column>
        <el-table-column prop="rankName" label="奖学金等级">
        </el-table-column>
        <el-table-column prop="reason" label="奖学金原因">
        </el-table-column>
        <el-table-column prop="createDate" label="奖学金时间">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button plain>详情</el-button>           	  
            </template>
        </el-table-column>
    </el-table> 
    <!-- 分页 -->
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
    :page-size="10" layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
    </el-pagination>
  </div>
</template>
<script>
import api from '../../apis/fund.js'
export default {
  data(){
      return {
        // 列表
        tableData: [],
        loading: false,
        currentPage: 1,
        total:0,
      }
  },
  methods: {
    //获取奖学金列表
    getStSchlList(){
        let para={
            pageNo:this.currentPage
        }
        this.loading = true;
        api.getStSchlList(para).then(r=>{
            console.log(r);
            console.log("奖学金列表")
            if(r){
                this.tableData = r.data.data.list;
                this.total = r.data.data.count;
                this.loading = false;
            }
        })
    },
    // 分页
    handleCurrentChange(val) {
        this.currentPage=val;
    },
  },
  mounted () {
    //获取奖学金列表
    this.getStSchlList();
  }
}
</script>
<style lang="scss" scoped>
.faid{
    padding-left:8px;
    .faid-title{
        margin:8px 0;
    }
    // 分页
    .toolbar{
        margin-top:20px;
    }
}
</style>


