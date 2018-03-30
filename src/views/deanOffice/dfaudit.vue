<template>
    <div class="dfaudit">
        <div class="dfaudit-title">
        <!-- 上 -->
        <div class="dfaudit-title-tp clearfix">
            <div class="audit print clearfix">
                <i></i>
                <span>打印</span>
            </div>
            <div class="audit export clearfix">
                <i></i>
                <span>导出</span>
            </div>
            <div class="audit">
                <label>校区</label>
                <el-select v-model="campsel.value" clearable @change="getDepart">
                    <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="audit">
                <label>院系</label>
                <el-select v-model="departsel.value" clearable @change="getMajor">
                    <el-option v-for="item in departsel.options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="audit">
                <label>专业</label>
                <el-select v-model="majorsel.value" clearable>
                    <el-option v-for="item in majorsel.options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="audit">
                <label>年级</label>
                <el-select v-model="gradesel.value" clearable @change="getClass">
                    <el-option v-for="item in gradesel.options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="audit">
                <label>班级</label>
                <el-select v-model="classsel.value" clearable>
                    <el-option v-for="item in classsel.options" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid">
                    </el-option>
                </el-select>
            </div>
            <div class="audit">
                <label>学期</label>
                <el-select v-model="termsel.value" clearable>
                    <el-option v-for="item in termsel.options" :key="item.termId" :label="item.term" :value="item.termId">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!-- 下 -->
        <div class="dfaudit-title-bt">
            <el-input placeholder="请输入学生姓名" v-model="sname" prefix-icon="el-icon-search">
            </el-input>
        </div>
        </div>
        <!--列表  -->
        <el-table stripe :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="supportTermName" label="姓名">
            </el-table-column>
            <el-table-column prop="supportStartTime" label="性别">
            </el-table-column>
            <el-table-column prop="supportEndTime" label="学期">
            </el-table-column>
            <el-table-column prop="supportTermName" label="校区">
            </el-table-column>
            <el-table-column prop="supportStartTime" label="院系">
            </el-table-column>
            <el-table-column prop="supportEndTime" label="专业">
            </el-table-column>
            <el-table-column prop="supportTermName" label="年级">
            </el-table-column>
            <el-table-column prop="supportStartTime" label="班级">
            </el-table-column>
            <el-table-column prop="supportEndTime" label="助学类型">
            </el-table-column>
            <el-table-column prop="supportStartTime" label="提交身份">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span style="color:#208af5;" v-if="scope.row.supportStatus == 0">待审核</span>
                    <span style="color:#f36d6e;" v-else-if="scope.row.supportStatus == 1">未通过</span>
                    <span style="color:#68c046;" v-else-if="scope.row.supportStatus == 2">已通过</span>			           	  
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope"> 
                    <el-button type="primary" class="btn" plain>审核</el-button>
                    <el-button class="btn" plain>详情</el-button>  	 
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
    export default {
        data(){
            return{
                // 校区
                campsel:{
                    options: [],
                    value: '',
                },
                // 院系
                departsel:{
                    options: [],
                    value: '',
                },
                // 专业
                majorsel:{
                    options: [],
                    value: '',
                },
                // 年级
                gradesel:{
                    options: [],
                    value: '',
                },
                // 班级
                classsel:{
                    options: [],
                    value: '',
                },
                // 学期
                termsel:{
                    options: [],
                    value: '',
                },
                // 搜索名字
                sname:'',
                // 列表
                tableData: [],
                loading: false,
                currentPage: 1,
                total:0,
            }
        },
        methods: {
            // 获取校区
            getCampus(){
                com.getCampus().then(r => {
                    if(r.data.meta.code ==  '200'){
                        this.campsel.options = r.data.data;
                    }
                })
            },
            // 获取学期
            getTerm(){
                com.getTerm().then(r=>{
                    if(r.data.meta.code ==  '200'){
                        this.termsel.options = r.data.data
                    }
                })
            },
            // 获取院系
            getDepart(){
                let data={
                    'ssid':this.campsel.value,
                }
                com.departQueryCamp(data).then(r=>{
                    
                    if(r.data.meta.code ==  '200'){
                        this.departsel.options = r.data.data;
                        // this.deanGetList();
                    }
                })
            },
            // 通过院系获取专业
            getMajor(){
                let data={
                    'deptId':this.departsel.value
                }
                com.majorQueryDepart(data).then(r=>{
                    if(r.data.meta.code ==  '200'){
                        this.majorsel.options = r.data.data;
                        // this.deanGetList();
                    }
                })
            },
            // 获取所有年级
            getAllGrade(){
                com.getAllGrade().then(r=>{
                    if(r.data.meta.code ==  '200'){
                        this.gradesel.options = r.data.data
                    }
                })
            },
            // 通过专业年级获取班级
            getClass(){
                let data={
                    'proid':this.majorsel.value,
                    'gradeid':this.gradesel.value 
                }
                com.classQueryMajor(data).then(r=>{
                    
                    if(r.data.meta.code ==  '200'){
                        this.classsel.options = r.data.data;
                        // this.deanGetList();
                    }
                })
            },
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
            },
        },
        mounted () {
            // 获取校区
            this.getCampus();
            // 获取所有年级
            this.getAllGrade();
            // 获取学期
            this.getTerm();
        }
    }
</script>
<style lang="scss" scoped>
.dfaudit{
    padding-left: 8px;
    .audit{
        float:left;
        margin-right:20px;
        i{
            width: 16px;
            height:16px;
            float:left;
            margin-top:2px;
            margin-right:6px;
            background:url("../../assets/img/deanfund/print.png") 0 0 no-repeat;
        }
        .el-select{
            width:122px;
        }
    }
    .audit:last-child{
        margin-right:0;
    }
    .print{
        margin-top:11px;
        cursor:pointer;
    }
    .export{
        margin-top:11px;
        cursor:pointer;
        i{
            background:url("../../assets/img/deanfund/export.png") 0 0 no-repeat;
        }
    }
    .dfaudit-title-bt{
        margin-top:16px;
        margin-bottom:22px;
        .el-input{
            width:24%;
        }
    }
    // 分页
    .toolbar{
        margin-top:20px;
    }
}
</style>

