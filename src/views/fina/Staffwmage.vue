<template>
    <div class="aidstu clearfix">
        <!-- 工具 -->
        <div class="aids-sel clearfix">
            <div class="sel-lt ">
                <div class="sel-overtime sel clearfix" @click="showBounce()">
                    <i></i>
                    <span>添加教职工工资</span>
                </div>
                <!-- 选择时间 -->
                <div class="sel-time sel">
                    <span>选择时间</span>
                    <el-date-picker v-model="startTime" format="yyyy-MM" type="month" placeholder="开始日期">
                    </el-date-picker> 
                    <el-date-picker v-model="endTime" format="yyyy-MM" type="month" placeholder="结束日期">
                    </el-date-picker>
                    <el-button type="primary" @click="getStaffList">确定</el-button>
                </div>
                <!-- 搜索 -->
                <div class="sel-search sel" >
                    <el-input v-model="filters.name" placeholder="请输入内容"></el-input>
                    <img src="../../assets/img/overtime/search.png" alt="" @click="getStaffList">                                    
                </div>
            </div>
            <div class="sel-rt">
                <div class="import clearfix">
                    <i></i>
                    <span>导入教职工</span>
                </div>
                <a :href="exportUrl" class="export clearfix">
                    <i></i>
                    <span>导出</span>
                </a>
                <a :href="downLoadUrl" class="download clearfix">
                    <i></i>
                    <span>下载Excel</span>
                </a>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="编号" width="55">
            </el-table-column>
            <el-table-column v-for="(item,index) in ruleForms" :key="index" :prop="item.typeName" :label="item.typeName">
            </el-table-column>
        </el-table> 
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
            :page-size="10" layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
        </el-pagination>
        <!-- 遮罩 -->
        <div class="mask" v-show="or"></div>
        <!-- 添加教职工弹框 -->
        <ads-bounce :ruleForm="form" v-show="or" @close="close"></ads-bounce> 
    </div>
</template>
<script>
    import adsBounce from './adsbounce.vue'
    import api from '../../apis/fina.js'
    export default {
        data() {
            return {
                // 日期
                startTime: '',
                endTime: '',
                // 表格数据
                tableData: [],
                loading: false,
                // 搜索
                filters:{
                    name:''
                },
                // 当前页
                currentPage: 1,
                total:0,
                // 是否显示
                or:false,
                ruleForms:[],
                form:{
                    // id:'',
                    name:'',
                    idnum:'',
                    stmonth:''
                },
                downLoadUrl: '',
                exportUrl:''
            }
        },
        components:{
            adsBounce
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getStaffList();
            },
            //关闭弹框和遮罩
            close(){
                this.or=false;
                this.getStaffList();
            },
            // 显示添加弹框
            showBounce:function(){
                this.or=true;
            },
            //获取教职工工资明细列表
            getStaffList(){
                let para={
                    pageNo: this.currentPage,
                    salaryStartTime:this.startTime,
                    salaryEndTime:this.endTime,
                    nameOrId:this.filters.name
                }
                this.loading = true;
                api.getStaffList(para).then(response=>{
                    
                    if(response.data.meta.code == '200'){
                        this.tableData.length = 0;
                        for(var i=0,z=(response.data.data.list.length);i<z;i++){
                            this.tableData.push(response.data.data.list[i]);
                        }
                        this.total = response.data.data.count;
                        this.loading = false;
                    }
                    //     for(var item in response.data.data.list){

                    //        var temp = response.data.data.list[item];
                    //    if (temp.hasOwnProperty(response.data.data.list)) {
                    //         this.tableData.push(response.data.data.list[item])
                
                    //    }
                        //}
                })
            },
            // 获取所有类别
            getAllItem(){
                api.getAllItem().then(response =>{
                    this.ruleForms = response.data.data;
                });
            }
        },
        mounted(){
            // 下载Excel模板
            this.downLoadUrl = api.getDownload();
            // 导出
            this.exportUrl =api.exportSalary(this.startTime,this.endTime,this.filters.name);
            this.getStaffList();
            this.getAllItem();
        }
    }
</script>
<style scoped lang="scss">
.aidstu{
    padding-top:7px;
    .aids-sel{
        margin-bottom:16px;
        .sel-lt{
            float:left;
            margin-bottom:16px;
            .sel{
                float:left;
                margin-right:17px;
                // padding-bottom:14px;
            }
            .sel-overtime{
                cursor:pointer;
                margin:7px 50px 0 0;
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
                    width:104px;
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
        }
        .sel-rt{
            float:right;
            margin:8px 0;
            .export{
                cursor:pointer;
                float:left;
                margin-left:15px;
                color:#333;
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
            .import{
                cursor:pointer;
                float:left;
                i{
                    width:16px;
                    height: 16px;
                    float: left;
                    margin-top:2px;
                    margin-right:6px;
                    background:url("../../assets/img/overtime/import.png") 0 0 no-repeat;
                    background-size:100% 100%;
                }
                span{
                    float:left;
                }
            }
            .download{
                cursor:pointer;
                float:left;
                color:#333;
                i{
                    width:16px;
                    height: 16px;
                    float: left;
                    margin-top:2px;
                    margin-right:6px;
                    background:url("../../assets/img/fina/download.png") 0 0 no-repeat;
                    background-size:100% 100%;
                }
                span{
                    float:left;
                }
            }
        }
    }
    .el-select{
        width:154px;
    }
    .handle{
        margin-top:6px;
        .edit{
            cursor: pointer;
            margin-right: 2px;
        }
        .del{
            cursor: pointer;
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
<style lang="scss">
    .aidstu{
        .el-loading-mask{
            z-index: 0;
        }
    }
</style>

