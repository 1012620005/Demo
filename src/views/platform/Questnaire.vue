<template>
    <div class="quest-content">
        <!-- 工具 -->
        <div class="quests-tool clearfix">
            <div class="createBtn quest clearfix" @click="jumpInit">
                <i></i>
                <span>发起问卷</span> 
            </div>
            <!-- 校区 -->
            <div class="quest-camp quest">
                <span>校区</span>
                <el-select @change="getQuList" v-model="campsel.value" placeholder="选择校区" clearable class="smllSel" >
                    <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <!-- 调查对象 -->
            <div class="quest">
                <span>调查对象</span>
                <el-select @change="getQuList" v-model="respondsel.value" placeholder="" clearable  class="smllSel">
                    <el-option v-for="item in respondsel.options" :key="item.label" :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%;margin-top:16px;" v-loading="loading">
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="campus" label="校区" width="120">
                 <template slot-scope="scope">
                    <div>
                        {{scope.row.campus.length>5?scope.row.campus.substring(0,5)+"...":scope.row.campus}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="imformantName" label="调查对象">
            </el-table-column>
            <el-table-column prop="surveyTitle" label="标题">
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" >
            </el-table-column>
            <el-table-column label="问卷状态">
                <template slot-scope="scope">
                    <div v-if="scope.row.isEndTime==1" style="color:#ed0302;">已撤销</div>
                    <div v-else-if="scope.row.isEndTime==2" style="color:#208af5;">未结束</div>
                    <div v-else-if="scope.row.isEndTime==3" style="color:#ff8b00;">已结束</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <div class="img">
                        <img src="../../assets/img/duty/view.png" class="view"  @click="vqBounce(scope.row)" alt="">
                        <el-tooltip placement="top" class="static" >
                            <div slot="content">统计</div>
                            <img src="../../assets/img/quest/static.png" alt="" @click="dataBounce(scope.row)">
                        </el-tooltip> 
                    </div>
                    <div class="state clearfix">
                        <div v-if="scope.row.isEndTime==2?true:false" class="revocat" @click="revocat(scope.row)">
                            <img src="../../assets/img/overtime/undo.png" alt="" class="undo"> 
                            <span>撤销</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table> 
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10"
            layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
        </el-pagination>    
        <!-- 遮罩 -->
        <div class="mask" v-if="or"></div>
        <!-- 查看问卷弹框 -->
        <vq-bounce :formv="id" v-if="view" @close="close"></vq-bounce>
        <!-- 统计弹框 -->
        <data-bounce :formd="data" v-if="dasta" @close="close"></data-bounce>
    </div>
</template>
<script>
    // 查看问卷弹框
    import vqBounce from './vqbounce.vue';
    //统计弹框
    import dataBounce from './databounce.vue'; 

    import api from '../../apis/platform.js'
    
    export default {
        data() {
            return {
                // 校区
                campsel:{
                    options: [],
                    value: '',
                },
                // 被调查对象
                respondsel:{
                    options: [],
                    value: '',
                },
                // 表格数据
                tableData: [],
                loading: false,
                // 当前页
                currentPage: 1,
                total:0,
                // 原因弹框是否显示
                or:false,
                view:false,
                //数据弹框默认隐藏
                dasta:false ,
                id:'',
                data:''
            }
        },
        components:{
            vqBounce,
            //统计弹框 
            dataBounce       
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getQuList();
            },
            //关闭弹框和遮罩
            close(){
                this.or=false;
                this.view=false; 
                this.dasta=false;
            },
            //发起问卷
            jumpInit(){
                this.$router.push('/Initquest')
            },
            //显示查看弹框
            vqBounce:function(row){
                this.or=true;
                this.view=true;
                this.id=row.surveyId;
            },
            //显示统计弹框
            dataBounce:function(row){
                this.or=true;
                this.dasta=true;
                this.data=row.surveyId;
            },
            // 获取校区
            getCampus(){
                api.getCampus().then(response=>{
                    if(response.data.meta.code ==  '200'){
                        this.campsel.options = response.data.data
                    }
                })
            },
            // 获取被调查对象
            getRespond(){
                api.getRespond().then(response=>{
                    if(response.data.meta.code ==  '200'){
                        this.respondsel.options = response.data.data
                    }
                })
            },
            // 获取问卷调查列表
            getQuList(){
                let para={
                    pageNo:this.currentPage,
                    campusId:this.campsel.value,
                    imformantName:this.respondsel.value,
                }
                this.loading = true;
                api.getQuList(para).then(response=>{
                    if(response.data.meta.code == '200'){
                        this.tableData = response.data.data.t;
                        this.total = response.data.data.totalCount;
                        this.loading = false;
                    }
                })
            },
            // 撤销
            revocat(row){
                this.$confirm('确认撤销吗？','提示',{
                    type:'warning'
                }).then(_ => {
                    let para={
                        surveyId:row.surveyId
                    }
                    api.getChangeState(para).then(response=>{
                        if(response.data.meta.code=='200'){
                            this.$message({
                                message: '撤销成功',
                                type: 'success'
                            });
                        }
                        this.getQuList();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消撤销'
                    });          
                });
            }
        },
        mounted(){
            // 获取校区
            this.getCampus();
            // 获取被调查对象
            this.getRespond();
            // 获取问卷调查列表
            this.getQuList();
        }
    }
</script>
<style scoped lang="scss">
    // 下
    .quest-content{
        background:#fff;
        padding-left:24px;
        padding-right:16px;
        border-radius:5px;
        padding-top:17px;
        height:100%;
        padding-bottom:100px;
        .quest{
            float:left;
            margin-right:17px;
            .endtime{
                margin:0 2px;
            }
            .el-select{
                width:144px;
            }
            .smllSel{
                width:120px;
            }
        }
        .createBtn{
            float:left;
            cursor:pointer;
            margin:7px 16px 6px 0;
            i{
                width:16px;
                height: 16px;
                float:left;
                margin-top:2px;
                margin-right:8px;
                background:url("../../assets/img/quest/ad.png") 0 0 no-repeat;
                background-size:100% 100%;  
            }
            span{
                color:#208af5;
                font-weight:bold;
            }
        }
        .state{
            .revocat,.unrevocat{
                float:left;
                margin-top:2px;
                .undo{
                    margin-top:5px;
                    float:left;
                    margin-right:4px;
                }
            }
            .revocat{
                cursor: pointer;
            }
        }
        .img{
            margin-top:4px;
            float:left;
            .view{
                cursor:pointer;
            }
            .static{
                margin:0 8px;
                cursor:pointer;
            }
            .edit{
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

