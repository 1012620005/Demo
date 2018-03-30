<template>
  <div class="overtime">
    <fc-header></fc-header>
    <div class="container">
        <div class="overtime-hd">
            <h5>值班管理</h5>
            <div class="back clearfix" @click="returnBtn">
                <span>返回</span>
                <i></i>
            </div>
        </div>
        <div class="overtime-bd">
            <!-- 工具条 -->
            <div class="overtime-bd-title">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div class="grid-content clearfix bg-purple">
                            <!-- 校区 -->
                            <div class="grid-camp">
                                <span>校区</span>
                                <el-select v-model="campsel.value" clearable placeholder="请选择" @change="getInsList">
                                    <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <!-- 选择时间 -->
                            <div class="grid-time">
                                <span>选择时间</span>
                                <el-date-picker v-model="dutyStartTime"  clearable type="datetime"  placeholder="开始时间">
                                </el-date-picker>
                                <el-date-picker v-model="dutyEndTime" clearable :picker-options="endDateOpt" type="datetime"  placeholder="结束时间">
                                </el-date-picker>
                                <el-button type="primary" @click="getInsList">确定</el-button>
                            </div>
                            <!-- 搜索 -->
                            <!-- <div class="grid-search">
                                <el-input v-model="input" placeholder="请输入姓名"></el-input>
                                <img src="../../assets/img/overtime/search.png" alt="">                                    
                            </div> -->
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <!-- <div class="grid-content clearfix bg-purple">
                            <div class="exPrint clearfix">
                                <div class="export clearfix">
                                    <i></i>
                                    <span>导出Excel</span>
                                </div>
                                <div class="print clearfix">
                                    <i></i>
                                    <span>打印</span>
                                </div>
                            </div>
                        </div> -->
                    </el-col>
                </el-row>
            </div>
            <!-- 备注 -->
            <span class="remark">备注：只有组长可以编辑值班情况。</span>
            <!--列表  --> 
            <el-table :data="tableData" style="width: 100%" v-loading="loading">
                <el-table-column type="index" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="schooleZoneName" label="校区" width="120" show-overflow-tooltip>
                </el-table-column>
                <!-- <el-table-column prop="tename" label="老师姓名" width="100">
                </el-table-column>
                <el-table-column prop="tetitle" label="老师职称" width="100">
                </el-table-column> -->
                <el-table-column prop="dutyPlace" label="值班地点" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="dutyContent" label="值班内容" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="dutyStartTime" label="开始时间">
                </el-table-column>
                <el-table-column prop="dutyEndTime" label="结束时间">
                </el-table-column>
                <el-table-column prop="remarks" label="值班情况" width="180" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">    
                        <div class="handle">
                            <img class="view" @click="viewBounce(scope.row)" src="../../assets/img/duty/view.png" alt="">
                            <img v-if="scope.row.isGroupLeader=='true' ? true : false" class="edit" @click="editBounce(scope.row)" src="../../assets/img/overtime/edit.png" alt="">
                            <img v-else class="unedit"  src="../../assets/img/duty/unedit.png" alt="">
                        </div>
                    </template>
                </el-table-column>
            </el-table> 
            <!-- 分页 -->
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
            :page-size="10" layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
            </el-pagination>
        </div>
    </div>
    <!-- 遮罩弹框 -->
    <div class="mask" v-if="or"></div>
    <!-- 查看弹框 -->
    <view-bounce :formd="id" v-if="view" @close="close"></view-bounce> 
    <!-- 编辑弹框 -->
    <edit-bounce :forme="editid" v-if="edit"  @close="close"></edit-bounce>
  </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    import viewBounce from './viewBounce.vue'
    import editBounce from './editBounce.vue'
    import api from '../../apis/duty.js'
    import ap from '../../apis/common.js'
    export default {
		data () {
			return {
                // 开始时间
                dutyStartTime: '',
                // 结束时间
                dutyEndTime: '',
                endDateOpt: {
                    disabledDate: (time) => {
                        return time.getTime() < this.dutyStartTime;   
                    }
                },
                input: '',
                searchString: "",
                // 校区
                campsel:{
                    options: [],
                    value: '',
                },
                value: '',
                tableData: [],
                loading: false,
                // 详情弹框是否显示
                or:false,
                view:false,
                // 编辑弹框是否显示
                edit:false,
                // 当前页
                currentPage: 1,
                total:0,
                id:"",
                editid:{
                    dutyGroupId:"",
                    remarks:''
                }
			}
		},
		components:{
            fcHeader,
            viewBounce,
            editBounce
        },
        methods: {
            // 显示查看弹框
            viewBounce:function(row){
                this.or=true;
                this.view=true;
                this.id = row.dutyGroupId;
            },
            // 编辑弹框
            editBounce:function(row){
                this.edit=true;
                this.or=true;
                this.editid.dutyGroupId =row.dutyGroupId;
                this.editid.remarks =row.remarks
            },
            close() {
                this.or = false;
                this.edit = false;
                this.view = false;
                this.getInsList();
            },
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getInsList();
            },
            // 添加所有校区
            getCampus(){
                ap.getCampus().then(response => {
                    if(response.data.meta.code ==  '200'){
                        this.campsel.options = response.data.data
                    }
                })
            },
            // 获取列表
            getInsList(){
                let data={
                    pageNo: this.currentPage,
                    schoolZoneId:this.campsel.value,
                    dutyStartTime:this.dutyStartTime,
                    dutyEndTime:this.dutyEndTime
                }
                this.loading = true;
                api.getInsList(data).then(response=>{
                    if(response.data.meta.code ==  '200'){
                        // console.log(response);
                        // console.log("00000")
                        this.tableData = response.data.data.list;
                        this.total = response.data.data.count;
                        this.loading = false;
                    }
                })
            },
            returnBtn () {
				this.$router.push('/newIndex')
			}
        },
        mounted(){
            // 获取所有校区
            this.getCampus();
            // 获取值班列表
            this.getInsList();
        }
	}
</script>
<style scoped lang="scss">      
.container{
    width:1200px;
    margin:0 auto;
    position: relative;
    .overtime-hd{
        height:50px;
        line-height:50px;
        background:#fff;
        padding-left:24px;
        padding-right:16px;
        border-radius:5px;
        margin-top:12px;
        margin-bottom:16px;
        h5{
            color:#208af5;
            font-size:16px;
            border-bottom:2px solid #208af5;
            float:left;
            font-weight:bold;
        }
        .back{
            float: right;
            cursor: pointer;
            overflow:hidden;
            span{
                float:left;
            }
            i{
                width:9px;
                height: 15px;
                float:left;
                margin-top:18px;
                margin-left:6px;
                background:url("../../assets/img/overtime/arrow-right.png") 0 0 no-repeat;
            }
        }
    }
    .overtime-bd{
        background:#fff;
        padding-left:24px;
        padding-right:16px;
        border-radius:5px;
        height:100%;
        padding-bottom:160px;
        .overtime-bd-title{
            padding-top:18px;
            .grid-camp{
                float:left;
                margin-right:20px;
                .el-select{
                    width:120px;
                }
            }
            .grid-time{
                float:left;
                span{
                    margin-right:5px;
                }
                .el-input{
                    width:180px;
                    margin-right:5px;
                }
            }
            .grid-search{
                float:left;
                position: relative;
                .el-input{
                    width:156px;
                    margin-left:32px;
                }
                img{
                    position: absolute;
                    top: 10px;
                    right: 8px;
                    cursor:pointer;
                }
            }
            .exPrint{
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
        }
        .remark{
            color:#ef0000;
            font-size:12px;
            padding-top:15px;
            padding-bottom:8px;
            display:block;
        }
        .handle{
            margin-top:6px;
            .view{
                cursor:pointer;
            }
            .edit{
                cursor: pointer;
            }
            .edit,.unedit{
                margin-left:2px;
                margin-right: 2px;
            }
        }
        .toolbar{
            margin-top:20px;
        }
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

