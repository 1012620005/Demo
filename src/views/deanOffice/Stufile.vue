<template>
    <div class="stufile clearfix">
        <fc-header></fc-header>
        <div class="container">
            <!-- 上 -->
            <div class="stufile-title clearfix">
                <h5>学生档案</h5>
                <div class="back clearfix" @click="returnBtn">
                    <span>返回</span>
                    <i></i>
                </div>
            </div>
            <!-- 内容 -->
            <div class="stufile-content">
                <!-- 下拉框 -->
                <div class="files-sel clearfix">
                    <div class="file">
                        <span>校区</span>
                        <el-select @change="querycollege" clearable v-model="campsel.value" placeholder="校区" class="smllSel">
                            <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="file">
                        <span>入学学期</span>
                        <el-select @change="getStuList" clearable v-model="termsel.value" placeholder="入学学期">
                            <el-option v-for="item in termsel.options" :key="item.term" :label="item.term" :value="item.term">
                            </el-option>
                        </el-select>   
                    </div>
                    <div class="file">
                        <span>院系</span>
                        <el-select @change="querymajor" clearable v-model="departsel.value" placeholder="院系">
                            <el-option v-for="item in departsel.options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select> 
                    </div>
                    <div class="file">
                        <span>专业</span>
                        <el-select @change="getStuList" v-model="majorsel.value" clearable placeholder="专业">
                            <el-option v-for="item in majorsel.options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </div> 
                    <div class="file">
                        <span>年级</span>
                        <el-select @change="queryclass" clearable v-model="gradesel.value" placeholder="年级">
                            <el-option v-for="item in gradesel.options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </div> 
                    <div class="file">
                        <span>班级</span>
                        <el-select @change="getStuList" clearable v-model="classsel.value" placeholder="班级">
                            <el-option v-for="item in classsel.options" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid">
                            </el-option>
                        </el-select> 
                    </div>
                </div>
                <!-- 工具 -->
                <!-- <div class="files-tool clearfix">
                    left 
                    <div class="tool-lt clearfix">
                         添加学生档案 
                        <div class="file-add clearfix" @click="showSfabounce()">
                            <i></i>
                            <span>添加学生档案</span>
                        </div>
                        搜索 
                        <div class="file-search">
                            <el-input v-model="input1" placeholder="请输入学生姓名"></el-input>
                            <img src="../../assets/img/overtime/search.png" alt="">                                    
                        </div>
                    </div>-->
                    <!-- right 
                    <div class="tool-rt">
                        <div class="import clearfix">
                            <i></i>
                            <span>导入学生</span>
                        </div>
                        <div class="export clearfix">
                            <i></i>
                            <span>导出Excel</span>
                        </div>
                    </div>    
                </div> -->
                <!-- 表格 -->
                <el-table :data="tableData" style="width: 100%;margin-top:16px;" v-loading="loading">
                    <el-table-column type="index" label="序号" width="70">
                    </el-table-column>
                    <el-table-column prop="sname" label="校区" width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="name" label="学生姓名">
                    </el-table-column>
                    <el-table-column prop="sexname" label="性别" width="70">
                        <template slot-scope="scope">
                            <div v-if="scope.row.sex == 1">男</div>
                            <div v-else-if="scope.row.sex == 2">女</div>		           	  
                        </template>
                    </el-table-column>
                    <el-table-column prop="year" label="入学学期" width="160">
                    </el-table-column>
                    <!-- <el-table-column prop="acade" label="学制" width="100">
                        <template slot-scope="scope">
                            <div v-if="scope.row.acade == 1">三年制</div>
                            <div v-else-if="scope.row.acade == 2">五年制</div>		           	  
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="deptname" label="院系" width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="proname" label="专业" width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="gradename" label="年级">
                    </el-table-column>
                    <el-table-column prop="clazzname" label="班级" width="120" show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column prop="counsellor" label="辅导员" width="100">
                    </el-table-column>
                    <el-table-column prop="schstate" label="在校状态" width="100">
                        <template slot-scope="scope">
                            <div v-if="scope.row.schstate == 1">在校</div>
                            <div v-else-if="scope.row.schstate == 2">毕业</div>		           	  
                            <div v-else-if="scope.row.schstate == 3">休学</div>		           	  
                            <div v-else-if="scope.row.schstate == 4">离校</div>		           	  
                        </template>
                    </el-table-column> -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <img src="../../assets/img/duty/view.png" class="view"  @click="sfvBounce(scope.row)" alt="">
                            <!-- <img src="../../assets/img/overtime/edit.png" class="edit" @click="sfeBounce()" alt=""> -->
                        </template>
                    </el-table-column>
                </el-table> 
                <!-- 分页 -->
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10"
                    layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
                </el-pagination>
            </div> 
        </div>
        <!-- 遮罩 -->
        <div class="mask" v-if="or"></div>
        <!-- 学生档案添加弹框 -->
        <!-- <sfa-bounce v-show="or" @close="close"></sfa-bounce>  -->
        <!-- 修改弹框 -->
        <!-- <sfe-bounce v-show="edit" @close="close"></sfe-bounce> -->
        <!-- 查看弹框 -->
        <sfv-bounce :formv="form" v-if="view" @close="close"></sfv-bounce>
    </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
    // 学生档案添加弹框
    // import sfaBounce from './sfabounce.vue'
    // 修改弹框
    // import sfeBounce from './sfebounce.vue'
    // 查看弹框
    import sfvBounce from './sfvbounce.vue'

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
                // 学年
                // acadesel:{
                //     options: [],
                //     value: '',
                // },
                // 学期
                termsel:{
                    options: [],
                    value: '',
                },
                // 院系
                departsel:{
                    options: [],
                    value: '',
                },
                // 专业
                majorsel:{
                    options: [],
                    value: '',
                },
                // 年级
                gradesel:{
                    options: [],
                    value: '',
                },
                // 班级
                classsel:{
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
                // edit:false,
                view:false,
                form:{
                    id:'',
                    sname:'',
                    name:'',
                    sexname:'',
                    year:'',
                    deptname:'',
                    proname:'',
                    classname:'',
                }
            }
        },
        components:{
            fcHeader,
            // sfaBounce,
            // sfeBounce,
            sfvBounce        
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getStuList();
            },
            //关闭弹框和遮罩
            close(){
                this.or = false;
                this.view = false;
            },
            // 点击添加学生档案显示弹框
            // showSfabounce:function(){
            //     this.or=true;
            // },
            // 点击编辑显示弹框
            // sfeBounce:function(){
            //     this.or=true;
            //     this.edit=true;
            // },
            // 显示查看弹框
            sfvBounce:function(obj){
                this.or=true;
                this.view=true;
                this.form.sname = obj.sname;
                this.form.name = obj.name;
                this.form.sexname = obj.sexname;
                this.form.year = obj.year;
                this.form.deptname = obj.deptname;
                this.form.proname = obj.proname;
                this.form.classname = obj.classname;
            },
            // 获取校区
            getCampus(){
                ap.getCampus().then(response => {
                    if(response.data.meta.code ==  '200'){
                        this.campsel.options = response.data.data
                    }
                })
            },
            // 获取学年
            // getAcade(){
            //     api.getAcade().then(response=>{
            //         if(response.data.meta.code ==  '200'){
            //             this.acadesel.options = response.data.data
            //         }
            //     })
            // },
            // 获取学期
            getTerm(){
                api.getTerm().then(response=>{
                    if(response.data.meta.code ==  '200'){
                        this.termsel.options = response.data.data
                    }
                })
            },
            // 通过校区获取学院
            querycollege(){
                let data={
                    'ssid':this.campsel.value,
                }
                api.getDepart(data).then(response=>{
                    if(response.data.meta.code ==  '200'){
                        this.departsel.options = response.data.data
                        this.getStuList();
                    }
                })
            },
            // 通过院系获取专业
            querymajor(){
                let data={
                    'deptId':this.departsel.value,
                }
                api.getMajor(data).then(response=>{
                    if(response.data.meta.code ==  '200'){
                        this.majorsel.options = response.data.data
                        this.getStuList();
                    }
                })
            },
            // 通过年级、专业获取班级
            queryclass(){
                let data={
                    'proid':this.majorsel.value,
                    'gradeid':this.gradesel.value
                }
                api.getClass(data).then(response=>{

                    if(response.data.meta.code ==  '200'){
                        this.classsel.options = response.data.data
                        this.getStuList();
                    }
                })
            },
            // 获取年级
            getGrade(){
                api.getGrade().then(response=>{
                    if(response.data.meta.code ==  '200'){
                        this.gradesel.options = response.data.data
                        this.getStuList();
                    }
                })
            },
            // 获取学生档案列表
            getStuList(){
               let para={
                    pageNo:this.currentPage,
                    pageSize:10,
                    ssid:this.campsel.value,
                    proid:this.majorsel.value,
                    year:this.termsel.value,
                    deptid:this.departsel.value,
                    gradeid:this.gradesel.value,
                    clazzid:this.classsel.value
                }
                this.loading = true;
                api.getStuList(para).then(response=>{
                    console.log(response);
                    console.log("99999"); 
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
            // this.getAcade();
            this.getTerm();
            this.getGrade();
            this.getStuList();
        }
    }
</script>
<style scoped lang="scss">
.container{
    width:1200px;
    margin:0 auto;
    position: relative;
    // 上
    .stufile-title{
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
    .stufile-content{
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

        .tool-lt{
            float:left;
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
        .view{
            margin-top:4px;
            cursor:pointer;
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

