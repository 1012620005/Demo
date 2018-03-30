<template>
    <div class="quest-content">
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%;" v-loading="loading">
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="promoter" label="发起人">
            </el-table-column>
            <el-table-column prop="surveyTitle" label="标题">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.surveyTitle.length>8?scope.row.surveyTitle.substring(0,8)+"...":scope.row.surveyTitle}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <div v-if="scope.row.surveyStatus==1" style="color:#ed0302;">已撤销</div>
                    <div v-else-if="scope.row.surveyStatus==2" style="color:#ff8b00;">已回答</div>
                    <div v-else-if="scope.row.surveyStatus==3" style="color:#208af5;">未回答</div>
                    <div v-else-if="scope.row.surveyStatus==4" style="color:#ed0302;">已结束</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <!-- 已撤销 -->
                    <div v-if="scope.row.surveyStatus==1" class="retracted">
                        <img src="../../assets/img/duty/view.png" @click="viewBounce(scope.row)">
                    </div>
                    <!-- 已回答 -->
                    <div v-else-if="scope.row.surveyStatus==2" class="answered">
                        <img src="../../assets/img/duty/view.png" class="view" @click="viewBounce(scope.row)">
                        <img src="../../assets/img/overtime/edit.png" class="edit" @click="editBounce(scope.row)">
                    </div>
                    <!-- 未回答 -->
                    <div v-else-if="scope.row.surveyStatus==3" class="answer">
                        <el-tooltip placement="top">
                            <div slot="content">回答</div>
                            <img src="../../assets/img/quest/answer.png" @click="answerBounce(scope.row)">
                        </el-tooltip>
                    </div>
                    <!-- 已结束 -->
                    <div v-if="scope.row.surveyStatus==4" class="retracted">
                        <img src="../../assets/img/duty/view.png" @click="viewBounce(scope.row)">
                    </div>
                </template>
            </el-table-column>
        </el-table> 
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
            :page-size="10" layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
        </el-pagination>
        <!-- 遮罩 -->
        <div class="mask" v-if="or"></div>
        <!-- 详情弹框 -->
        <!-- <va-bounce :formv="id" v-if="view" @close="close"></va-bounce> -->
        <!-- 回答弹框 -->
        <noan-bounce :formn="form" v-if="answ" @close="close"></noan-bounce>
        
    </div>
</template>
<script>
    //详情弹框
    // import vaBounce from './vabounce.vue'
    //回答弹框
    import noanBounce from './noanbounce.vue' 

    import api from '../../apis/platform.js'
    export default {
        data() {
            return {
                // 表格数据
                tableData: [],
                loading: false,
                // 当前页
                currentPage: 1,
                total:0,
                // 是否显示
                or:false,
                // view:false,
                answ:false,
                // edit:false,
                // 详情弹框
                id:'',
                // 回答弹框
                form:{
                    surveyId:'',
                    type:"",
                    view:''
                }
            }
        },
        components:{
            // vaBounce,
            noanBounce
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getAnList();
            },
            // 获取回答问卷列表
            getAnList(){
                let para={
                    pageNo:this.currentPage,
                }
                this.loading = true;
                api.getAnList(para).then(response=>{
                    console.log(response);
                    console.log("999999")
                    if(response.data.meta.code == '200'){
                        this.tableData = response.data.data.t;
                        this.total = response.data.data.totalCount;
                        this.loading = false;
                    }
                })
            },
            //关闭弹框和遮罩
            close(){
                this.or=false;
                this.view=false;
                this.answ=false;
                this.getAnList();
            },
            //查看弹框
            viewBounce:function(row){
                this.or=true;
                // this.view=true;
                // this.id=row.surveyId;
                this.answ = true;
                this.form.surveyId=row.surveyId;
                this.form.view='1';
            },
            // 回答弹框
            answerBounce:function(row){
                this.or=true;
                this.answ = true;
                this.form.surveyId=row.surveyId;
                this.form.type='2';
                this.form.view='3';
            },
            // 编辑弹框
            editBounce:function(row){
                this.or=true;
                this.answ = true;
                this.form.surveyId=row.surveyId;
                this.form.type='1';
                this.form.view='4';
            }
        },
        mounted(){
            // 获取回答问卷列表
            this.getAnList();
        }
    }
</script>
<style scoped lang="scss">
.quest-content{
    background:#fff;
    padding-left:24px;
    padding-right:16px;
    border-radius:5px;
    padding-top:17px;
    height:100%;
    padding-bottom:100px;
    .answered{
        .view{
            cursor:pointer;
        }
        .edit{
            cursor:pointer;
            margin-left:10px;
        }
    }
    .retracted{
        img{
            cursor:pointer;
        }
    }
    .answer{
        margin-top:8px;
        img{
            cursor:pointer;
        }
    }
    .toolbar{
        margin-top:20px;
    }
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

