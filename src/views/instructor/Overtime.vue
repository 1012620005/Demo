<template>
  <div class="overtime">
    <fc-header></fc-header>
    <div class="container">
        <div class="overtime-hd">
            <h5>加班管理</h5>
            <div class="back clearfix" @click="returnBtn">
                <span>返回</span>
                <i></i>
            </div>
        </div>
        <div class="overtime-bd">
            <!-- 工具条 -->
            <div class="overtime-bd-title clearfix">
                <div class="tool clearfix">
                    <!-- 申请加班 -->
                    <div class="grid-add clearfix" @click="showBounce()">
                        <i></i>
                        <span>申请加班</span>
                    </div>
                    <!-- 校区 -->
                    <div class="grid-camp">
                        <span>校区</span>
                        <el-select v-model="campsel.value" placeholder="请选择" @change="getOvtimeList" value-key="id">
                            <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <!-- 选择时间 -->
                    <div class="grid-time">
                        <span>选择时间</span>
                        <el-date-picker v-model="startTime" type="datetime" placeholder="开始时间">
                        </el-date-picker>
                        <el-date-picker v-model="endTime" type="datetime" :picker-options="endDateOpt" placeholder="结束时间">
                        </el-date-picker>
                        <el-button type="primary" @click="getOvtimeList">确定</el-button>
                    </div>
                    <!-- 搜索 -->
                    <!-- <div class="grid-search">
                        <el-input v-model="input" placeholder="请输入关键字"></el-input>
                        <img src="../../assets/img/overtime/search.png" alt="">                                    
                    </div> -->
                </div>
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
            </div>
            <!--列表  -->
            <el-table :data="tableData" style="width: 100%" v-loading="loading">
                <el-table-column type="index" label="序号" width="70">
                </el-table-column>
                <el-table-column prop="schoolZoneName" label="校区" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="overTimePlace" label="加班地点" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="workContent" label="加班内容" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="startTime" label="开始时间">
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间">
                </el-table-column>
                <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status == 1" class="handle clearfix">
                            <span class="imgScript shenhe"></span>待审核           	   
                        </div>
                        <div v-else-if="scope.row.status == 2" class="handle clearfix">
                            <span class="imgScript success"></span>通过
                        </div>
                        <div v-else-if="scope.row.status == 3" class="handle clearfix">
                            <span class="imgScript nosussess"></span>未通过
                            <span class="btns editor" @click="editorDialog(scope.row)" ></span>
                            <span class="btns delete" @click="deleteDialog(scope.row.id)"></span>
                        </div>
                        <div v-else-if="scope.row.status == 4" class="handle clearfix">加班通知</div>	
                        <div v-else-if="scope.row.status == 5" class="handle clearfix">
                            <span class="imgScript undo"></span>已撤销
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
    <!-- 申请加班弹框 -->
    <div class="mask" v-if="or"></div>
    <adt-bounce v-if="or" @close="close" :ruleForm="form"></adt-bounce>
  </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    import adtBounce from './Adtbounce.vue'
    import api from '../../apis/common.js'
    import ap from '../../apis/overtime.js'
    export default {
		data () {
			return {
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
                // value: '',
                // input: '',
                tableData: [],
                loading: false,
                // 是否显示
                or:false,
                form: {
                    id: '',
                    schooleZooneName:null,
                    startTime: '',
                    endTime: '',
                    workContent: '',
                    remarks: '',
                    overTimePlace:''
                },
                // 当前页
                currentPage: 1,
                total:0
			}
		},
		components:{
            fcHeader,
            adtBounce
        },
        methods: {
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getOvtimeList();
            },
            close() {
                this.or = false;
                this.clearform();
            },
            clearform(){
                this.or = false;
                this.form.id = '';
                this.form.schooleZooneName = null;
                this.form.startTime = '';
                this.form.endTime = '';
                this.form.workContent = '';
                this.form.remarks = '';
                this.form.overTimePlace = '';
                this.getOvtimeList();
            },
            // 显示添加弹框
            showBounce:function(){
                this.or=true;
            },
            // 显示编辑弹框
            editorDialog (obj) {
                this.or = true;
                this.form.id = obj.id;
                this.form.schooleZooneName = {'name':obj.schoolZoneName,'id':obj.schoolZoneId};
                this.form.startTime = new Date(obj.startTime);
                this.form.endTime = new Date(obj.endTime);
                this.form.workContent = obj.workContent;
                this.form.remarks = obj.remarks;
                this.form.overTimePlace = obj.overTimePlace;
            },
            // 删除行
            deleteDialog(row){
                this.$confirm('确认删除该记录吗？','提示',{
                    type:'warning'
                }).then(() => {
                   ap.delOvtime(row).then(response =>{
                        if(response.data.meta.code=='200'){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }
                        this.getOvtimeList();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });          
                }); 
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
            getOvtimeList(){
                let data={
                    pageNo:this.currentPage,
                    startTime:this.startTime,
                    endTime:this.endTime,
                    schoolZoneId:this.campsel.value
                }
                this.loading = true;
                ap.getOvtimeList(data).then(response=>{
                    console.log(response);

                    if(response.data.meta.code == '200'){
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
            this.getCampus();
            this.getOvtimeList();
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
            padding:18px 0;
            .tool{
                float:left;
                .grid-add{
                    float:left;
                    cursor:pointer;
                    margin:8px 28px 8px 0;
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
            // .grid-search{
            //     float:left;
            //     position: relative;
            //     .el-input{
            //         width:160px;
            //         margin-left:32px;
            //     }
            //     img{
            //         position: absolute;
            //         top: 10px;
            //         right: 8px;
            //         cursor:pointer;
            //     }
            // }
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
        .handle{
            cursor:pointer;
            .imgScript{
                width:14px;
                height: 14px;
                margin-top:6px;
                float:left;
                margin-right:4px;
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
            .undo{
                background:url("../../assets/img/overtime/undo.png") 0 0 no-repeat;
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
<style lang="scss">
    .overtime-bd{
        .el-loading-mask{
            z-index: 0;
        }
    }
</style>

