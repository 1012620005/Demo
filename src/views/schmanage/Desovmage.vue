<template>
    <div class="aidstu">
        <!-- 工具 -->
        <div class="aids-sel clearfix">
            <div class="sel-lt">
                <div class="sel-overtime sel clearfix" @click="showBounce()">
                    <i></i>
                    <span>添加加班</span>
                </div>
                <div class="sel-sch sel">
                    <span>校区</span>
                    <el-select v-model="campsel.value" placeholder="校区" class="smllSel" @change="getDesovList">
                        <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <!-- 选择时间 -->
                <div class="sel-time sel">
                    <span>选择时间</span>
                    <el-date-picker v-model="startTime" type="datetime" placeholder="开始时间">
                    </el-date-picker>
                    <el-date-picker v-model="endTime" type="datetime" :picker-options="endDateOpt" placeholder="结束时间">
                    </el-date-picker>
                    <el-button type="primary" @click="getDesovList">确定</el-button>
                </div>
                <!-- 搜索 -->
                <div class="sel-search sel">
                    <el-input v-model="input1" placeholder="请输入教职工姓名"></el-input>
                    <img src="../../assets/img/overtime/search.png" alt="">                                    
                </div>
            </div>
            <div class="print clearfix">
                <i></i>
                <span>打印</span>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="schoolZoneName" label="校区" width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="userName" label="加班老师" width="120">
            </el-table-column>
            <el-table-column prop="overTimePlace" label="加班地点" width="120">
            </el-table-column>
            <el-table-column prop="workContent" label="加班内容" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="160">
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="160">
            </el-table-column>
            <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <div v-if="scope.row.status == 4" class="handle" @click="overwork(scope.row)">
                        <img src="../../assets/img/overtime/undo.png" alt="" class="undo"> 
                        <span>撤销</span>
                    </div>  
                    <div v-else-if="scope.row.status == 5" class="handle">
                        <img src="../../assets/img/overtime/undo.png" alt="" class="undo"> 
                        <span>已撤销</span>
                    </div>      	  
                </template>
            </el-table-column>
        </el-table> 
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange"
            :current-page.sync="currentPage" :page-size="10" layout="prev, pager, next, jumper"
            :total="total" style="text-align:center;" class="toolbar">
        </el-pagination>
        <!-- 遮罩 -->
        <div class="mask" v-show="or"></div>
        <!-- 添加加班弹框 -->
        <des-bounce v-show="or" :ruleForm="form" @close="close"></des-bounce> 
    </div>
</template>
<script>
    import desBounce from './desbounce.vue'
    import api from '../../apis/common.js'
    import ap from '../../apis/overtime.js'
    export default {
        data() {
            return {
                // 当前页
                currentPage: 1,
                total:0,
                // 是否显示
                or:false,
                // 日期
                startTime: '',
                endTime: '',
                endDateOpt: {
                    disabledDate: (time) => {
                        return time.getTime() < this.startTime;   
                    }
                },
                // 校区
                campsel:{
                    options: [],
                    value: '',
                },
                // 表格数据
                tableData: [],
                // 搜索
                input1:'',
                loading: false,
                form: {
                    id:'',
                    schooleZooneName: null,
                    startTime: '',
                    endTime: '',
                    overTimePlace:'',
                    userId:'', 
                    userName:'',
                    workContent:'', 
                    remarks:''
                }
            }
        },
        components:{
            desBounce
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getDesovList();
            },
            //关闭弹框和遮罩
            close(){
                // this.or=false;
                this.clearform();
            },
            clearform(){
                this.or = false;
                this.form.id = '';
                this.form.schooleZooneName = null;     
                this.form.startTime = '';     
                this.form.endTime = '';     
                this.form.overTimePlace = '';   
                this.form.userId = '';   
                this.form.userName = '';   
                this.form.workContent = '';   
                this.form.remarks = '';   
                this.getDesovList();
            },
            // 显示添加弹框
            showBounce:function(){
                this.or=true;
            },
            // 获取校区
            getCampus(){
                api.getCampus().then(response=>{
                    if(response.data.meta.code ==  '200'){
                        this.campsel.options = response.data.data
                    }
                })
            },
            // 获取列表
            getDesovList(){
                let data={
                    pageNo: this.currentPage,
                    schoolZoneId:this.campsel.value,
                    startTime:this.startTime,
                    endTime:this.endTime
                }
                this.loading = true;
                ap.getDesovList(data).then(response=>{
                    if(response.data.meta.code == '200'){
                        this.tableData = response.data.data.list;
                        this.total = response.data.data.count;
                        this.loading = false;
                    }
                })
            },
            // 撤销
            overwork(row){
                this.$confirm('确认撤销吗？','提示',{
                    type:'warning'
                }).then(_ => {
                    ap.putOverWork(row.id).then(response=>{
                        if(response.data.meta.code=='200'){
                            this.$message({
                                message: '撤销成功',
                                type: 'success'
                            });
                        }
                        this.getDesovList();
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
            this.getDesovList();
            this.getCampus();
        }
    }
</script>
<style scoped lang="scss">
.aidstu{
    padding-top:7px;
    .sel{
        float:left;
        margin-right:17px;
        padding-bottom:14px;
    }
    .sel-overtime{
        cursor:pointer;
        margin:7px 17px 7px 0;
        i{
            width:16px;
            height: 16px;
            float:left;
            margin-top:2px;
            margin-right:8px;
            background:url("../../assets/img/overtime/add.png") 0 0 no-repeat;
            background-size:100% 100%; 
        }
        span{
            color:#208af5;
            font-weight:bold;
        }
    }
    .sel-sch{
        .smllSel{
            width:120px;
        }
    }
    .sel-time{
        span{
            margin-right:5px;
        }
        .el-input{
            width:180px;
            margin-right:5px;
        }
    }
    .sel-search{
        float:left;
        position: relative;
        .el-input{
            width:160px;
        }
        img{
            position: absolute;
            top: 10px;
            right: 8px;
            cursor:pointer;
        }
    }
    
    .print{
        cursor:pointer;
        float:right;
        padding:8px 0;
        i{
            width:16px;
            height: 16px;
            float: left;
            margin-top:2px;
            margin-right:6px;
            background:url("../../assets/img/overtime/print.png") 0 0 no-repeat;
            background-size:100% 100%;
        }
        span{
            float:left;
        }
    }
    .el-select{
        width:154px;
    }
    .handle{
        cursor: pointer;
        .undo{
            margin-top:5px;
            float:left;
            margin-right:4px;
        }
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
}

</style>

