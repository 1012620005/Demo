<template>
    <div class="aidstu clearfix">
        <!-- 工具 -->
        <!-- <div class="add-camp clearfix" @click="showaidBounce()">
            <i></i>
            <span>添加学年</span>
        </div> -->
        <!-- 表格 -->
        <el-table :data="tableData" fit style="width: 100%;margin-top:5px;" v-loading="loading">
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="studyYear" label="学年">
            </el-table-column>
            <el-table-column prop="term" label="学期">
            </el-table-column>
            <el-table-column prop="bendTime" label="学期起止时间">
                <template slot-scope="scope">
                    <span v-if="scope.row.termStartTime">
                     {{scope.row.termStartTime + '至' + scope.row.termEmdTime}}
                    </span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column prop="termWeek" label="学期周次">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div v-if="scope.row.termWeek" class="mod" @click="modBounce(scope.row)">修改</div>
                    <div v-else class="set clearfix" @click="showBounce(scope.row)">
                        <img src="../../assets/img/subject/set.png" alt=""> 
                        <span>设置起止时间</span>
                    </div>
                </template>
            </el-table-column>
        </el-table> 
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
            :page-size="10" layout="prev, pager, next, jumper"
            :total="total" style="text-align:center;" class="toolbar">
        </el-pagination>
        <!-- 遮罩 -->
        <div class="mask" v-show="or"></div>
        <!-- 设置起止时间弹框 -->
        <stime-bounce :ruleForm="form" v-show="or" @close="close"></stime-bounce> 
    </div>
</template>
<script>
    import stimeBounce from './stimebounce.vue'
    // import { Loading } from 'element-ui'
    import api from '../../apis/subject.js'
    export default {
        data() {
            return {
                // 表格数据
                tableData: [],
                loading: false,
                // 当前页
                currentPage: 1,
                total:0,
                state:'',
                // 是否显示
                or:false,
                form:{
                    id:'',
                    termStartTime: '',
                    termEmdTime: '',
                    studyYear: '',
                    term: '' 
                },
            }
        },
        components:{
            stimeBounce
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getTermList();
            },
            //关闭弹框和遮罩
            close(){
                this.or=false;
                this.clearform();
            },
            clearform(){
                this.or = false;
                this.form.id='';
                this.form.studyYear= '';
                this.form.term= '';
                this.form.termStartTime= '';
                this.form.termEmdTime= ''; 
                this.getTermList();
            },
            // 获取列表
            getTermList(){
                let para={
                    pageNo: this.currentPage,
                }
                this.loading = true;
                api.getTermList(para).then(response=>{
                    if(response.data.meta.code == '200'){
                        this.tableData = response.data.data.list;
                        this.total = response.data.data.count;
                        this.loading = false;
                    }
                })
            },
            // 显示设置起止时间弹框
            showBounce:function(obj){
                this.or=true;
                this.form.studyYear=obj.studyYear;
                this.form.id = obj.id;
                this.form.term=obj.term;
                this.form.termStartTime='';
                this.form.termEmdTime='';
            },
            //显示修改弹框
            modBounce:function(obj){
                this.or = true;
                this.form.id=obj.id;
                this.form.studyYear=obj.studyYear;
                this.form.term=obj.term;
                this.form.termStartTime=new Date(obj.termStartTime);
                this.form.termEmdTime=new Date(obj.termEmdTime);
            }
            
        },
        mounted(){
            this.getTermList();
        }
    }
</script>
<style scoped lang="scss">
    // .add-camp{
    //     cursor:pointer;
    //     margin:7px 0 16px 0;
    //     i{
    //         width:16px;
    //         height: 16px;
    //         float:left;
    //         margin-top:2px;
    //         margin-right:8px;
    //         background:url("../../assets/img/overtime/add.png") 0 0 no-repeat;
    //         background-size:100% 100%; 
    //     }
    //     span{
    //         color:#208af5;
    //         font-weight:bold;
    //     }
    // }
    .set{
        margin-top:6px;
        cursor:pointer;
        img{
            float: left;
            margin-right:6px;
            margin-top:4px;
        }
    }
    .mod{
        cursor:pointer;
    }
    .toolbar{
        margin-top:20px;
    }
    // 遮罩
    .mask{
        z-index: 1;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        // display:none;
        background: rgba(0,0,0,.4);
    }

</style>

