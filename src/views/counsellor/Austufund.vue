<template>
  <div class="faid">
    <!-- 头 -->
    <span class="faid-title">免学费</span>
    <!-- 免学费详情弹框 -->
    <el-dialog title="免学费详情" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" :label-width="formLabelWidth">
             <el-form-item label="学号：">
                <span>{{form.stuNo}}</span>
            </el-form-item>
            <el-form-item label="姓名：">
                <span>{{form.stuName}}</span>
            </el-form-item>
            <el-form-item label="专业：">
                <span>{{form.major}}</span>
            </el-form-item>
            <el-form-item label="学期：" >
                <span>{{form.term}}</span>
            </el-form-item>
            <el-form-item label="年级：" >
                <span>{{form.grade}}</span>
            </el-form-item>
            <el-form-item label="班级：">
                <span>{{form.class}}</span>
            </el-form-item>
            <el-form-item label="免学费金额：">
                <span>{{form.money}}</span>
            </el-form-item>
            <el-form-item label="免学费来源：">
                <span>{{form.source}}</span>
            </el-form-item>
            <el-form-item label="备注：" >
                <span>{{form.remarks}}</span>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!--列表  -->
    <el-table stripe :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="stuNo" label="学号">
            <template slot-scope="scope">
                <span v-if="scope.row.stuNo!=null">
                    {{scope.row.stuNo.length>5?scope.row.stuNo.substring(0,5)+"...":scope.row.stuNo}}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="stuName" label="姓名">
        </el-table-column>
        <el-table-column prop="major" label="专业">
            <template slot-scope="scope">
                <span v-if="scope.row.major!=null">
                    {{scope.row.major.length>5?scope.row.major.substring(0,5)+"...":scope.row.major}}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="termId" label="学期">
            <template slot-scope="scope">
                <span v-if="scope.row.termId!=null">
                    {{scope.row.termId.length>5?scope.row.termId.substring(0,5)+"...":scope.row.termId}}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="grade" label="年级">
        </el-table-column>
        <el-table-column prop="clazz" label="班级">
            <template slot-scope="scope">
                <span v-if="scope.row.clazz!=null">
                    {{scope.row.clazz.length>5?scope.row.clazz.substring(0,5)+"...":scope.row.clazz}}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="supportMoney" label="免学费金额">
        </el-table-column>
        <el-table-column prop="supportSource" label="免学费来源">
            <template slot-scope="scope">
                <span v-if="scope.row.supportSource!=null">
                    {{scope.row.supportSource.length>5?scope.row.supportSource.substring(0,5)+"...":scope.row.supportSource}}
                </span>
            </template>
        </el-table-column>
        <el-table-column label="备注" width="110">
            <template slot-scope="scope">
                <span v-if="scope.row.remarks!=null">
                    {{scope.row.remarks.length>5?scope.row.remarks.substring(0,5)+"...":scope.row.remarks}}
                </span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope"> 
                <el-button class="btn" @click="postDftuitDetail(scope.row)" plain>详情</el-button>  	 
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
    import com from '../../apis/common.js'
    const qs = require('querystring')
    export default {
        data(){
            return {
                // 列表
                tableData: [],
                loading: false,
                currentPage: 1,
                total:0,
                // 弹框
                dialogFormVisible: false,
                formLabelWidth: '96px',
                form:{
                    stuNo:'',
                    stuName:'',
                    major:'',
                    term:'',
                    grade:'',
                    class:'',
                    money:'',
                    source:'',
                    remarks:''
                }
            }
        },
        methods: {
            // 免学费列表
            getStAidList(){
                let para = {
                    pageNo:this.currentPage,
                    pageSize:10,
                    type:2
                }
                this.loading = true;
                api.getFundList(para).then(r=>{
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
            // 详情
            postDftuitDetail(row){
                this.dialogFormVisible = true;
                this.form.stuNo = row.stuNo;
                this.form.stuName = row.stuName;
                this.form.major = row.major;
                this.form.term = row.termId;
                this.form.grade = row.grade;
                this.form.class = row.clazz;
                this.form.money = row.supportMoney;
                this.form.source = row.supportSource;
                this.form.remarks = row.remarks;
            }
        },
        mounted () {
            // 申请助学金列表
            this.getStAidList();
        }
    }
</script>
<style lang="scss" scoped>
.faid{
    padding-left:8px;
    .el-textarea{
        width:40%;
    }
    .btn{
        padding:5px 10px;
    }
    // 分页
    .toolbar{
        margin-top:20px;
    }
}
</style>


