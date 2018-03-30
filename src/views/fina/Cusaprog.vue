<template>
    <div class="aidstu clearfix">
        <!-- 工具 -->
        <div class="sel-overtime clearfix" @click="showBounce()">
            <i></i>
            <span>添加工资项目</span>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="编号" width="70">
            </el-table-column>
            <el-table-column prop="typeName" label="工资类别">
            </el-table-column>
            <el-table-column prop="typeSort" label="排序">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div class="handle" v-if="scope.row.isDelete == 'false' ? false : true">
                        <img src="../../assets/img/overtime/edit.png" alt="" class="edit" @click="editBounce(scope.row)">
                        <img @click="delItem(scope.row.id)" src="../../assets/img/overtime/del.png" alt=""  class="del">
                    </div> 
                    <div class="forbade" v-else>不能操作</div> 
                </template>
            </el-table-column>
        </el-table> 
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10"
            layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
        </el-pagination>
        <!-- 遮罩 -->
        <div class="mask" v-show="or"></div>
        <!-- 添加工资项目弹框 -->
        <wpro-bounce :itemform="form" v-if="or" @close="close"></wpro-bounce> 
    </div>
</template>
<script>
    import wproBounce from './wprobounce.vue'
    import api from '../../apis/fina.js'
    export default {
        data() {
            return {
                // 表格数据
                tableData: [],
                loading: false,
                // 当前页
                currentPage: 1,
                total:0,
                // listLoading: false,
                // 是否显示
                or:false,
                form: {
                    id:'',
                    typeName: '',
                    typeSort:''
                } 
            }
        },
        components:{
            wproBounce
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getAllItem();
                // console.log(`当前页: ${val}`);
            },
            //关闭弹框和遮罩
            close(){
                this.or=false;
                this.clearform();
                // this.$refs[form].resetFields();
            },
            clearform(){
                this.or = false;
                this.form.id='';
                this.form.typeName = '';
                this.form.typeSort = '';      
                this.getAllItem();
            },
            // 显示添加弹框
            showBounce:function(){
                this.or=true;
            },
            //显示编辑弹框
            editBounce:function(obj){
                this.or=true;
                this.form.id=obj.id;
                this.form.typeName = obj.typeName;
                this.form.typeSort = obj.typeSort; 
            }, 
            //删除当前行
            delItem(id){
                // console.log(id);
                this.$confirm('确认删除该记录吗？','提示',{
                    type:'warning'
                }).then(_ => {
                   api.delItem(id).then(response =>{
                       console.log(response)
                        if(response.data.meta.code=='200'){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }
                        this.getAllItem();
                    }) 
                });
            }, 
            //获取所有类别列表 
            getAllItem(){
                let para = {
                    pageNo: this.currentPage,
                }
                this.loading = true;
                api.getAllItemNo(para).then(response=>{
                    if(response.data.meta.code == '200'){
                        this.tableData = response.data.data.list;
                        this.total = response.data.data.count;
                        this.loading = false;
                    }
                })
            }
        },
        mounted(){
            this.getAllItem();
        }
    }
</script>
<style scoped lang="scss">
.aidstu{
    padding-top:7px;
    .sel-overtime{
        cursor:pointer;
        float:left;
        margin:7px 0 16px 0;
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
    .el-select{
        width:154px;
    }
    .handle{
        margin-top:6px;
        .el-switch{
            height:27px;
            margin:0 4px;
        }
        .edit{
            cursor: pointer;
            margin-right: 2px;
        }
        .del{
            cursor: pointer;
        }
    }
    .forbade{
        color:#999;
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

