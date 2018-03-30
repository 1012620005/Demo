<template>
    <div class="aidstu">
        <!-- 工具 -->
        <div class="spsub-title clearfix">
            <div class="spsub-title-lt clearfix" @click="showBounce()">
                <i></i>
                <span>添加学科</span>
            </div>
            <!-- <div class="spsub-title-rt clearfix">
                <div class="import clearfix">
                    <i></i>
                    <span>导入学科</span>
                </div>
                <div class="download clearfix">
                    <i></i>
                    <span>下载Excel模板</span>
                </div>
            </div> -->
        </div>   
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="subjectName" label="学科名称">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div class="handle">
                        <img src="../../assets/img/overtime/edit.png" @click="editDialog(scope.row)" alt="" class="edit"> 
                        <img src="../../assets/img/overtime/del.png" @click="delDisc(scope.row.id)" alt="" class="del"> 
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
        <div class="mask" v-if="or"></div>
        <!-- 添加学科弹框 -->
        <disc-bounce :ruleForm="form" v-if="or" @close="close"></disc-bounce> 
    </div>
</template>
<script>
    import discBounce from './discbounce.vue'
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
                form:{
                    id:'',
                    subjectNameVO:[],
                    closes:'',
                    visible:false
                },
                // 是否显示
                or:false,
                
            }
        },
        components:{
            discBounce
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getDiscList();
            },
            //关闭弹框和遮罩
            close(){
                this.or=false;
                this.clearform();
                number:0
            },
            clearform(){
                this.or = false;
                this.form.id='';
                this.form.subjectNameVO =[];    
                this.getDiscList();
            },
            // 显示添加弹框
            showBounce:function(){
                this.or=true;
                this.form.visible=true;
                this.form.closes='close';
                this.form.subjectNameVO=[];
            },
            // 显示编辑弹框
            editDialog:function(obj){
                this.or = true;
                this.form.visible=false;
                this.form.closes='';
                this.form.id=obj.id;
                this.form.subjectNameVO.splice(0,1,obj.subjectName)
            },
            // 列表
            getDiscList(){
                let para={
                    pageNo: this.currentPage,
                }
                this.loading = true;
                api.getDiscList(para).then(response=>{
                    if(response.data.meta.code == '200'){
                        this.tableData = response.data.data.list;
                        this.total = response.data.data.count;
                        this.loading = false;
                    }
                })
            },
            // 删除当前行
            delDisc(id){
                this.$confirm('确认删除该记录吗？','提示',{
                    type:'warning'
                }).then(_ => {
                   api.delDisc(id).then(response =>{
                        if(response.data.meta.code=='200'){
                            this.$message({
                                message: '删除成功',
                                type: 'success'

                            });
                        }
                        this.getDiscList();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    }); 
                });
            }
        },
        mounted(){
            this.getDiscList();
        }
    }
</script>
<style scoped lang="scss">
    .spsub-title{
        margin-top:5px;
        margin-bottom:16px;
        .spsub-title-lt{
            float:left;
            cursor:pointer;
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
        .spsub-title-rt{
            float: right;
            .import{
                float: left;
                margin-right:14px;
                cursor:pointer;
                i{
                    width:16px;
                    height: 16px;
                    float:left;
                    margin-top:2px;
                    margin-right:6px;
                    background:url("../../assets/img/overtime/import.png") 0 0 no-repeat;
                }
                span{
                    float:left;
                }
            }
            .download{
                float: left;
                cursor:pointer;
                i{
                    width:16px;
                    height:16px;
                    float:left;
                    margin-top:2px;
                    margin-right:6px;
                    background:url("../../assets/img/subject/download.png") 0 0 no-repeat;
                }
                span{
                    float:left;
                }
            }
        }
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

</style>

