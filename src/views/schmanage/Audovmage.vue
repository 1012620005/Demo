<template>
    <div class="deanfund">
        <!-- 工具 -->
        <div class="adis-tool clearfix">
            <!-- left -->
            <div class="tool-lt clearfix">
                <!-- 校区 -->
                    <div class="tool-sch tool">
                    <span>校区</span>
                    <el-select v-model="campsel.value" placeholder="校区" class="smllSel" @change="getAudovList">
                        <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <!-- 选择时间 -->
                <div class="tool-time tool">
                    <span>选择时间</span>
                    <el-date-picker v-model="startTime" type="datetime" placeholder="开始时间">
                    </el-date-picker>
                    <el-date-picker v-model="endTime" type="datetime" :picker-options="endDateOpt" placeholder="结束时间">
                    </el-date-picker>
                    <el-button type="primary" @click="getAudovList">确定</el-button>
                </div>
                <!-- 搜索 -->
                <div class="aid-search tool">
                    <el-input v-model="filters.search" placeholder="请输入姓名"></el-input>
                    <img src="../../assets/img/overtime/search.png" alt="">                                    
                </div>
            </div>
            <!-- right -->
            <!-- <div class="tool-rt">
                <div class="export clearfix">
                    <i></i>
                    <span>导出Excel</span>
                </div>
                <div class="print clearfix">
                    <i></i>
                    <span>打印</span>
                </div>
            </div>     -->
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="schoolZoneName" label="校区" width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="userName" label="加班老师" width="120">
            </el-table-column>
            <!-- <el-table-column prop="statitle" label="教职工职称" width="120">
            </el-table-column> -->
            <el-table-column prop="workContent" label="工作内容" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间">
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间">
            </el-table-column>
            <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <div v-if="scope.row.status == 1" class="handle clearfix" @mouseover="hoveShow(scope.row.id)" @mouseout="hoveHide(scope.row.id)">
                        <span class="imgScript shenhe"></span>
                        待审核
                        <div class="shenheBounce" v-show="isShow && currIndex == scope.row.id">
                            <div class="icons pass" @click="agree(scope.row.id)">
                                <i></i>
                                <span>通过</span>
                            </div>
                            <div class="icons nopass" @click="disAgree(scope.row.id)">
                                <i></i>
                                <span>不通过</span>
                            </div>
                        </div>				           	   
                    </div>
                    <div v-else-if="scope.row.status == 2" class="handle clearfix">
                        <span class="imgScript success"></span>通过
                    </div>	 
                    <div v-else-if="scope.row.status == 3" class="handle clearfix">
                        <span class="imgScript nosussess"></span>未通过
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
        <!-- 待审核中未通过原因弹框 -->
        <!-- <re-bounce v-show="or" @close="close"></re-bounce>  -->
    </div>
</template>
<script>
    // import reBounce from '../deanOffice/rebounce.vue'
    import api from '../../apis/common.js'
    import ap from '../../apis/overtime.js'
    export default {
        data() {
            return {
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
                filters:{
                    search:'',
                },
                loading: false,
                // 当前页
                currentPage: 1,
                total:0,
                // 是否显示
                isShow:true,
                // 原因弹框是否显示
                or:false,
                currIndex: 1
            }
        },
        components:{
            // reBounce        
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getAudovList();
            },
            //关闭弹框和遮罩
            close(){
                this.or=false;
            },
            //移上待审核显示弹框
            hoveShow:function(id){
               this.currIndex = id
            },
            //离开隐藏弹框
            hoveHide(id){
                this.currIndex = 0  
            },
            // 点击未通过显示弹框
            // reasonBounce:function(){
            //     this.or=true;
            // },
            // 获取校区
            getCampus(){
                api.getCampus().then(response=>{
                    if(response.data.meta.code ==  '200'){
                        this.campsel.options = response.data.data
                    }
                })
            },
            // 校务获取任课老师加班审核列表
            getAudovList(){
                let data={
                    pageNo: this.currentPage,
                    schoolZoneId:this.campsel.value,
                    startTime:this.startTime,
                    endTime:this.endTime
                }
                this.loading = true;
                ap.getAudovList(data).then(response=>{
                    if(response.data.meta.code == '200'){
                        this.tableData = response.data.data.list;
                        this.total = response.data.data.count;
                        this.loading = false;
                    }
                })
            },
            // 校务通过教师加班申请
            agree(row){
                ap.putAgree(row).then(response=>{
                    if(response.data.meta.code=='200'){
                        this.$message({
                            message: '通过',
                            type: 'success'
                        });
                    }
                    this.getAudovList();
                })
            },
            //校务不通过教师加班申请
            disAgree(row){
                ap.putDisAgree(row).then(response=>{
                    if(response.data.meta.code=='200'){
                        this.$message({
                            message: '未通过',
                            type: 'success'
                        });
                    }
                    this.getAudovList();
                })
            }
        },
        mounted(){
            this.getCampus();
            this.getAudovList();
            // this.putAgree();
        }
    }
</script>
<style scoped lang="scss">
.deanfund{
    background:#fff;
    border-radius:5px;
    height:100%;
    padding-bottom:100px;
    .tool-lt{
        float:left;
        .tool{
            float:left; 
            margin-right:20px;
        }
        .tool-sch{
            cursor:pointer;
            margin-bottom:16px;
            .smllSel{
                width:120px;
            }
        }
        .tool-time{
            .el-input{
                width:180px;
                margin-right:5px;
            }
        }
        .aid-search{
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
    }
    .tool-rt{
        float:right;
        margin:8px 0;
        .export{
            cursor:pointer;
            float:left;
            margin-right:15px;
            i{
                width:16px;
                height: 16px;
                float: left;
                margin-top:2px;
                margin-right:6px;
                background:url("../../assets/img/overtime/export.png") 0 0 no-repeat;
                background-size:100% 100%;
            }
            span{
                float:left;
            }
        }
        .print{
            cursor:pointer;
            float:left;
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
    }
    .handle{
        cursor:pointer;
        .imgScript{
            width:14px;
            height: 14px;
            margin-top:6px;
            float:left;
            margin-right:4px;
        }
        .shenheBounce{
            width:80px;
            height: 64px;
            background:#fff;
            border-radius:5px;
            -webkit-box-shadow:0 0 10px rgba(16,97,218,.15);  
            -moz-box-shadow:0 0 10px rgba(16,97,218,.15);  
            box-shadow:0 0 10px rgba(16,97,218,.15);  
            position: absolute;
            top:13px;
            right:16%;
            z-index: 1;
            padding-top:10px;
            padding-left:10px;
            .icons{
                i{
                    width:14px;
                    height: 14px;
                    float: left;
                    margin-right:4px;
                    margin-top:6px;
                }
            }
            .pass{
                margin-bottom:6px;
                i{
                    background:url("../../assets/img/overtime/passed.png") 0 0 no-repeat;
                    background-size:100% 100%;
                }  
            }
            .nopass{
                i{
                    background:url("../../assets/img/overtime/nopass.png") 0 0 no-repeat;
                    background-size:100% 100%;
                } 
            }
        }
        .shenhe{
            background:url("../../assets/img/overtime/pending.png") 0 0 no-repeat;
            background-size:100% 100%;
        }
        .success{
            background:url("../../assets/img/overtime/passed.png") 0 0 no-repeat;
            background-size:100% 100%;
        }
        .nosussess{
            background:url("../../assets/img/overtime/nopass.png") 0 0 no-repeat;
            background-size:100% 100%;
        }
        .btns{
            width:16px;
            height: 16px;
            display:inline-block;
        }
        .editor{
            cursor: pointer;
            background:url("../../assets/img/overtime/edit.png") 0 1px no-repeat;
        }
        .delete{
            cursor: pointer;
            background:url("../../assets/img/overtime/del.png") 0 1px no-repeat;
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

