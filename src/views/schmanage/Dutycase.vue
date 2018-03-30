<template>
    <div class="aidstu clearfix">
        <!-- 工具 -->
        <div class="aids-sel clearfix">
            <div class="sel-lt ">
                <!-- <div class="sel-overtime sel clearfix" @click="showaidBounce()">
                    <i></i>
                    <span>添加值班</span>
                </div> -->
                <div class="sel-sch sel">
                    <span>校区</span>
                    <el-select v-model="campsel.value" placeholder="校区" class="smllSel" @change="getDuList">
                        <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <!-- 选择时间 -->
                <div class="sel-time sel">
                    <span>选择时间</span>
                    <el-date-picker v-model="dutyStartTime" type="datetime" placeholder="开始时间">
                    </el-date-picker>
                    <el-date-picker v-model="dutyEndTime" type="datetime" :picker-options="endDateOpt" placeholder="结束时间">
                    </el-date-picker>
                    <el-button type="primary" @click="getDuList">确定</el-button>
                </div>
                <!-- 搜索 -->
                <!-- <div class="sel-search sel">
                    <el-input v-model="input1" placeholder="请输入教职工姓名"></el-input>
                    <img src="../../assets/img/overtime/search.png" alt="">                                    
                </div> -->
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="schooleZoneName" label="校区" show-overflow-tooltip>
            </el-table-column>
            <!-- <el-table-column prop="name" label="教职工姓名" width="120">
            </el-table-column>
            <el-table-column prop="jobtitle" label="教职工职称" width="120">
            </el-table-column> -->
            <el-table-column prop="dutyPlace" label="值班地点" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="dutyContent" label="值班内容" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remarks" label="值班情况" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="dutyStartTime" label="开始时间" width="160">
            </el-table-column>
            <el-table-column prop="dutyEndTime" label="结束时间" width="160">
            </el-table-column>
            <el-table-column prop="createDate" label="提交时间" width="180">
            </el-table-column>
            <el-table-column label="操作" width="70">
                <template slot-scope="scope">
                    <div class="handle">
                        <img src="../../assets/img/duty/view.png" alt="" class="view" @click="viewBounce(scope.row)">
                    </div>      	  
                </template>
            </el-table-column>
        </el-table> 
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
            :page-size="10" layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
        </el-pagination>
        <!-- 遮罩 -->
        <div class="mask" v-show="or"></div>
        <!-- 值班详情弹框 -->
        <ducv-bounce :formd="id" v-if="or" @close="close"></ducv-bounce> 
    </div>
</template>
<script>
    import ducvBounce from './ducvbounce.vue'
    import api from '../../apis/duty.js'
    import ap from '../../apis/common.js'
    export default {
        data() {
            return {
                // 日期
                dutyStartTime: '',
                dutyEndTime: '',
                endDateOpt: {
                    disabledDate: (time) => {
                        return time.getTime() < this.dutyStartTime;   
                    }
                },
                // 校区
                campsel:{
                    options: [],
                    value: '',
                },
                // 表格数据
                tableData: [],
                loading: false,
                // 搜索
                input1:'',
                // 当前页
                currentPage: 1,
                total:0,
                // 是否显示
                or:false,
                id:""
            }
        },
        components:{
            ducvBounce
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getDuList();
            },
            //关闭弹框和遮罩
            close(){
                this.or=false;
            },
            //显示详情弹框
            viewBounce:function(row){
                this.or=true;
                this.id = row.dutyGroupId;
            },
            // 添加所有校区
            getCampus(){
                ap.getCampus ().then(response => {
                    // console.log(response);
                    if(response.data.meta.code ==  '200'){
                        this.campsel.options = response.data.data
                    }
                })
            },
            // 获取列表
            getDuList(){
                let data={
                    pageNo: this.currentPage,
                    schoolZoneId:this.campsel.value,
                    dutyStartTime:this.dutyStartTime,
                    dutyEndTime:this.dutyEndTime
                }
                this.loading = true;
                api.getDuList(data).then(response =>{
                    if(response.data.meta.code ==  '200'){
                        console.log(response);
                        console.log("444444444444")
                        this.tableData = response.data.data.list;
                        this.total = response.data.data.count;
                        this.loading = false;
                    }
                })
            },
        },
        mounted(){
            // 获取所有校区
            this.getCampus();
            // 获取值班列表
            this.getDuList();
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
        margin-top:6px;
        .view{
            cursor:pointer;
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

