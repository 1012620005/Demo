<template>
    <div class="teafile clearfix">
        <fc-header></fc-header>
        <div class="container">
            <!-- 上 -->
            <div class="teafile-title clearfix">
                <h5>教职工档案</h5>
                <div class="back clearfix" @click="returnBtn">
                    <span>返回</span>
                    <i></i>
                </div>
            </div>
            <!-- 内容 -->
            <div class="teafile-content">
                <!-- 下拉框 -->
                <div class="files-sel">
                    <div class="file">
                        <span>校区</span>
                        <el-select v-model="campsel.value" placeholder="校区" class="smllSel" @change="getTeaList">
                            <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select> 
                    </div>
                    <div class="file">
                        <span>学历</span>
                        <el-select v-model="edusel.value" placeholder="学历" @change="getTeaList">
                            <el-option v-for="item in edusel.options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>   
                    </div> 
                    <div class="file">
                        <span>职位状态</span>
                        <el-select @change="getTeaList" v-model="jobsel.value" placeholder="职位状态">
                            <el-option v-for="item in jobsel.options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select> 
                    </div>
                    <div class="file">
                        <span>性别</span>
                        <el-select v-model="sexsel.value" placeholder="性别" class="smllSel" @change="getTeaList">
                            <el-option v-for="item in sexsel.options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select> 
                    </div>
                    <div class="file">
                        <span>教职工分类</span>
                        <el-select @change="getTeaList" v-model="classifsel.value" placeholder="教职工分类">
                            <el-option v-for="item in classifsel.options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>  
                </div>
                <!-- 工具 
                <div class="files-tool clearfix">
                    left 
                    <div class="tool-lt clearfix">
                        添加教职工档案 
                        <div class="file-add clearfix" @click="tfaBounce()">
                            <i></i>
                            <span>添加教职工档案</span>
                        </div>-->
                        <!-- 搜索 
                        <div class="file-search">
                            <el-input v-model="input1" placeholder="请输入教职工姓名"></el-input>
                            <img src="../../assets/img/overtime/search.png" alt="">                                    
                        </div>
                    </div>-->
                    <!-- right -->
                    <!-- <div class="tool-rt">
                        <div class="import clearfix">
                            <i></i>
                            <span>导入教职工</span>
                        </div>
                        <div class="export clearfix">
                            <i></i>
                            <span>导出Excel</span>
                        </div>
                    </div>     -->
                <!-- </div>-->
                <!-- 表格 -->
                <el-table :data="tableData" style="width: 100%" v-loading="loading">
                    <el-table-column type="index" label="序号" width="70">
                    </el-table-column>
                    <el-table-column prop="sname" label="校区" width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="no" label="编号" width="100">
                    </el-table-column>
                    <el-table-column prop="name" label="教职工姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别" width="70">
                        <template slot-scope="scope">
                            <div v-if="scope.row.sex == 1">男</div>
                            <div v-else-if="scope.row.sex == 2">女</div>		           	  
                        </template>
                    </el-table-column>
                    <el-table-column prop="birthday" label="出生日期" width="120">
                    </el-table-column>
                    <el-table-column prop="education" label="学历" width="80">
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号" width="150">
                    </el-table-column>
                    <el-table-column prop="positional" label="教职工职称" width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="teatypename" label="教职工分类" width="120" show-overflow-tooltip>
                    </el-table-column> 
                    <el-table-column prop="teastatename" label="职位状态" width="100">
                        <!-- <template slot-scope="scope">
                            <div v-if="scope.row.state == 1">在职</div>
                            <div v-else-if="scope.row.state == 2">离职</div>		           	  
                            <div v-else-if="scope.row.state == 3">休学</div>		           	  
                            <div v-else-if="scope.row.state == 4">离校</div>		           	  
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="email" label="电子邮箱" width="200">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope"> 
                            <img class="view" src="../../assets/img/duty/view.png" @click="viewBounce(scope.row)">
                        </template>
                    </el-table-column>
                </el-table> 
                <!-- 分页 -->
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
                    :page-size="10" layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
                </el-pagination>
            </div> 
        </div>
        <!-- 遮罩 -->
        <div class="mask" v-if="or"></div>
        <!-- 教职工档案添加弹框 -->
        <!-- <tfa-bounce v-show="or" @close="close"></tfa-bounce>  -->
        <!-- 详情弹框 -->
        <tfv-bounce :formv="form" v-if="view" @close="close"></tfv-bounce>
    </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    // 学生档案添加弹框
    // import tfaBounce from './tfabounce.vue'
    // 查看弹框
    import tfvBounce from './tfvbounce.vue'

    import ap from '../../apis/common.js'
    import api from '../../apis/file.js'
    export default {
        data() {
            return {
                // 校区
                campsel:{
                    options: [],
                    value: '',
                },
                // 学历
                edusel:{
                    options: [],
                    value: '',
                },
                // 性别
                sexsel:{
                    options: [],
                    value: '',
                },
                // 职位状态
                jobsel:{
                    options: [],
                    value: '',
                },
                // 教师职称
                profsel:{
                    options: [],
                    value: '',
                },
                // 教职工分类
                classifsel:{
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
                // 原因弹框是否显示
                or:false,
                view:false,
                form:{
                    id:'',
                    sname:'',
                    no:'',
                    name:'',
                    sex:'',
                    birthday:'',
                    education:'',
                    mobile:'',
                    proname:'',
                    positional:'',
                    state:'',
                    email:'',
                }
            }
        },
        components:{
            fcHeader,
            // tfaBounce,
            tfvBounce       
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getTeaList();
            },
            //关闭弹框和遮罩
            close(){
                this.or = false;
                this.view = false;
            },
            // 点击添加学生档案显示弹框
            // tfaBounce:function(){
            //     this.or=true;
            // },
            // 显示详情弹框
            viewBounce:function(obj){
                this.or = true;
                this.view = true;
                this.form.sname=obj.sname;
                this.form.no=obj.no;
                this.form.name=obj.name;
                this.form.sex=obj.sex;
                this.form.birthday=obj.birthday;
                this.form.education=obj.education;
                this.form.mobile=obj.mobile;
                this.form.proname=obj.proname;
                this.form.positional=obj.positional;
                this.form.state=obj.state;
                this.form.email=obj.email;
            },
            // 获取校区
            getCampus(){
                ap.getCampus().then(response => {
                    if(response.data.meta.code ==  '200'){
                        this.campsel.options = response.data.data
                    }
                })
            },
            // 获取学历
            getEdu(){
                api.getEdu().then(response=>{
                    if(response.data.meta.code ==  '200'){
                        this.edusel.options = response.data.data
                    }
                })
            },
            // 教职工职位状态
            getJobSta(){
                api.getJobSta().then(res=>{
                    if(res.data.meta.code ==  '200'){
                        this.jobsel.options = res.data.data
                    }
                })
            },
            // 获取教职工分类
            getStaffClass(){
                api.getStaffClass().then(res=>{
                    
                    if(res.data.meta.code ==  '200'){
                        this.classifsel.options = res.data.data
                    }
                })
            },
            // 获取性别
            getSex(){
                api.getSex().then(response=>{
                    if(response.data.meta.code ==  '200'){
                        this.sexsel.options = response.data.data
                    }
                })
            },
            // 获取老师档案列表
            getTeaList(){
                let para={
                    pageNo:this.currentPage,
                    pageSize:10,
                    ssid:this.campsel.value,
                    sex:this.sexsel.value,
                    education:this.edusel.value,
                    delFlag:this.jobsel.value,
                    teaTypename:this.classifsel.value
                }
                this.loading = true;
                api.getTeaList(para).then(response=>{
                    console.log(response);
                    console.log("999")
                    if(response.data.meta.code ==  '200'){
                        this.tableData = response.data.data.data.list;
                        this.total = response.data.data.data.count;
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
            this.getEdu();
            // 教职工职位状态
            this.getJobSta();
            // 获取教职工分类
            this.getStaffClass();
            this.getSex();
            this.getTeaList();
        }
    }
</script>
<style scoped lang="scss">
.container{
    width:1200px;
    margin:0 auto;
    position: relative;
    // 上
    .teafile-title{
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
            float:right;
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
    // 下
    .teafile-content{
        background:#fff;
        padding-left:24px;
        padding-right:16px;
        border-radius:5px;
        height:100%;
        padding-bottom:100px;
        .files-sel{
            padding-top:22px;
            .file{
                float:left;
                margin-right:17px;
                padding-bottom:14px;
                .smllSel{
                    width:120px;
                }
            }
            .file:last-child{
                margin-right:0;
            }
            .el-select{
                width:144px;
            }
        }
        .files-tool{
            margin-bottom:16px;
            .tool-lt{
                float:left;
                margin-bottom:16px;
                .file-add{
                    float:left;
                    cursor:pointer;
                    margin:6px 16px 6px 0;
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
                .file-search{
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
            .tool-rt{
                float:right;
                margin:8px 0;
                .export{
                    cursor:pointer;
                    float:left;
                    margin-left:15px;
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
            }
        }
        .view{
            cursor:pointer;
            margin-top:9px;
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

