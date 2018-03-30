<template>
    <div class="container">
        <div class="ofaudit-box">
            <el-breadcrumb separator="》">
                <el-breadcrumb-item :to="{ path: '/' }">{{stu.campus}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{stu.depart}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form ref="form" :model="form" :inline="true" class="loadform" @change="showMajor">
                <el-form-item label="专业" >
                    <el-select v-model="form.major" placeholder="" clearable  value-key="id" @change="loadGrade">
                        <el-option v-for="item in majors" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级">
                    <el-select v-model="form.grade" value-key="id" placeholder="" @change="loadClazz">
                        <el-option v-for="item in grades" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级">
                    <el-select v-model="form.class" placeholder="" value-key="clazzid" @change="loadClasslist">
                        <el-option v-for="item in classes" :key="item.clazzid" :label="item.clazzname" :value="item">{{item.clazzname}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="search-group">
                    <el-input placeholder="请输入学生姓名" v-model="form.search" >
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="ofauditable">
                <template>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="oldCampusName" label="校区"  width="100"></el-table-column>
                        <el-table-column prop="stuName" label="姓名" width="80"></el-table-column>
                        <el-table-column prop="sex" label="性别" width="50">
                            <template slot-scope="scope">
                                <span>{{scope.row.sex== 1 ? '男':'女'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="oldDeptName" label="原院系" width="100"></el-table-column>
                        <el-table-column prop="oldProfName" label="原专业" width="100"></el-table-column>
                        <el-table-column prop="oldClazzName" label="原班级" width="100"></el-table-column>
                        <el-table-column prop="newProfName" label="新专业" width="100"></el-table-column>
                        <el-table-column prop="newClazzName" label="新班级" width="100"></el-table-column>
                        <el-table-column prop="createDate" label="提交时间" width="160"></el-table-column>
                        <el-table-column prop="reason" label="原因"></el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <div v-if="scope.row.state == 2 && scope.row.against != 3" class="handle handhover clearfix">
                                    <span class="imgScript shenhe"></span>
                                    待审核
                                    <div class="shenheBounce">
                                        <div class="icons pass" @click="aduit(scope.row)">
                                            <span class="imgScript success"></span>
                                            <span>通过</span> 
                                        </div>
                                        <div class="icons nopass" @click="aduit2(scope.row)">
                                            <span class="imgScript nosussess"></span>
                                            <span>不通过</span>
                                        </div>
                                    </div>				           	   
                                </div>
                                <div v-if="scope.row.state > 2 && scope.row.against != 3" class="handle clearfix">
                                    <span class="imgScript success"></span>
                                    已通过
                                </div>
                                <div v-if="scope.row.against == 3" class="handle clearfix">
                                    <span class="imgScript nosussess"></span>
                                    未通过
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="Page.pageNo" 
                    :page-size="Page.pageSize" 
                    layout="prev, pager, next, jumper" 
                    :total="Page.count">
                </el-pagination>
            </div>
        </div>   
    </div>
</template>
<script type="text/javascript">
import api from '../../../apis/orientation/ofaudit.js'

export default {
    data(){
        return{
            form: {
                major:'',
                grade:'',
                class:'',
                status: '',
                search:''
            },
            majors:[],
            grades:[],
            department:[],
            classes:[],
            stu:{
                campus:'',  
                depart:''
            },
            input2: '',
            textarea: '',
            tableData: [],
            form1: {
                newcam: '',
                newdep: '',
                newprofe: '',
                newclass: '',
                delivery: false,
            },
            Page : {
                // dividePage : true,
                pageSize : 10,
                pageNo : 1,
                count : 0
            },

            // 更改弹窗
            // showChange:false,
            // 遮罩层
		    // showDesk:false,
            // 不通过原因
            // shownoPass:false
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handleIconClick(ev) {
            console.log(ev);
        },
        // 更改弹窗
        // change(){
        //     this.showChange=true;
        //     this.showDesk=true;
        // },
        // changeClose(){
        //     this.showChange=false;
        //     this.showDesk=false;
        // },
        // noPass(){
        //     this.shownoPass=true;
        //     this.showDesk=true;
        // },
        // uresClose(){
        //     this.shownoPass=false;
        //     this.showDesk=false;
        // },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.Page.pageNo = val;
            this.loadList();
        },
        // 加载专业
        showMajor(){
            console.log('111111111')
            let maj = {
                id: this.department,
                type: '3'
            }
            api.findOfficeByPid(maj).then(response => {
                var meta = response.data.meta;
                var mydata = response.data.data;
                if(meta.code == 200){
                    this.majors = mydata;
                }
            });
            // this.loadList();
        },
        // 通过专业加载年级
        loadGrade(){
            api.findAllGrade().then(response =>{
                var mydata = response.data.data;
                var meta = response.data.meta;
                if(meta.code == '200'){
                    this.grades = mydata
                    // this.grades.id = mydata.id
                }
            })
            this.loadList();
        },
        // 通过年级加载班级
        loadClazz(){
            let params = {
                proid : this.form.major.id,
                gradeid : this.form.grade.id
            }
            api.findClazzByPro(params).then(response => {
                if(response.data.meta.code == 200){
                    this.classes = response.data.data;
                }
            });
            this.loadList();
        },
        loadClasslist(){
            this.loadList();
        },
        // loadClass(){
        //     let yea = {
        //         year: '2017秋',
        //         proid: this.form.major
        //     }
        //     api.findClazzByPro(yea).then(response => {
        //         if(response.data.meta.code == 200){
        //             this.classes = response.data.data;
        //             this.loadList();
        //         }
        //     });
        // },
        // 加载列表
        loadList(){
            let allList = {
                type: '2',
                state: '2',
                oldDeptId: this.department,
                oldProfId:this.form.major.id,
                grade_id: this.form.grade.id,
                oldClazzId:this.form.class.clazzid,
                pageNo: this.Page.pageNo,
                pageSize: this.Page.pageSize,
            }
            api.getOldCPDEM(allList).then(response => {
                if(response.data.meta.code == 200){
                    this.tableData = response.data.data.list;
                    this.Page.pageNo = response.data.data.pageNo;
                    this.Page.pageSize = response.data.data.pageSize;
                    this.Page.count = response.data.data.count;
                }
            });
        },
        aduit(row){
            var changeDorm = {
                id : row.id
            }
            api.agreeChangeCPDEM(changeDorm).then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if (meta.code == '200') {
                    row.state = mydata.state;
                    row.against = mydata.against;
                }
            })
        },
        aduit2(row){
            var changeDorm = {
                id : row.id
            }
            api.disAgreeChangeCPDEM(changeDorm).then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if (meta.code == '200') {
                    row.state = mydata.state;
                    row.against = mydata.against;
                }
            })
        },
    },
    components:{
      
    },
    mounted(){
        api.getCurrentUser().then(response => {
            var meta = response.data.meta;
            var mydata = response.data.data;
            if(meta.code == 200){
                console.log('algkjoakj')
                this.stu.campus = mydata.scoms.name;
                this.stu.depart = mydata.dept.name;
                this.department = mydata.dept.id;
                this.showMajor();
                this.loadList();
            }
        });
    }
}
</script>
<style type="text/css" lang="scss" scoped>
    .ofaudit-box{
        .el-breadcrumb{
            float: left;
            height: 36px;
            line-height: 36px;
            margin-right: 20px;
            .el-breadcrumb__separator{
                color: #333;
            }
            .el-breadcrumb__item__inner{
                color: #333;
            }
        }
        .loadform{
            .el-form-item{
                margin-right: 16px;
                width: 17%;
                .el-form-item__content{
                    width: 70%;
                }
            }
            .state{
                width: 20%;
                .el-form-item__content{
                    width: 63%;
                }
            }
            .search-group{
                 .el-form-item__content{
                    width:100%;
                    margin-left: 0 !important;
                }
                i{
                    width: 16px;
                    height: 16px;
                    margin: 10px;
                    display: inline-block;
                    float: right;
                    cursor: pointer;
                    background: url("../../../assets/researchCenter/search.png") 0 0 no-repeat;
                }
                .el-icon-search:before{
                    content:"";
                }            
            }
        }

        .ofauditable{
            .change{
                cursor: pointer;
            }
            .el-table::after, .el-table::before{
                z-index: 0;
            }
            .shenhe{
                width: 14px;
                height: 14px;
                background: url("../../../assets/researchCenter/shenhe.png") 0 0 no-repeat;
                display: inline-block;
            }
            .handhover{
                position: relative;
                z-index: 1;
                .shenheBounce{
                    display: none;
                    opacity: 0;  
                    position: absolute;
                    right: -85px;;
                    top: 0;
                    min-width: 72px;
                    height: 44px;
                    background-color: #fff;
                    padding: 10px;
                }                      
            }
            .success{
                width: 14px;
                height: 14px;
                background: url("../../../assets/researchCenter/tongguo.png") 0 0 no-repeat;
                display: inline-block;
            }
            .nosussess{
                width: 14px;
                height: 14px;
                background: url("../../../assets/researchCenter/butongguo.png") 0 0 no-repeat;
                display: inline-block;
            }
            .handle{
                cursor: pointer;
            }
            .handhover:hover{
                .shenheBounce{
                    display: block;
                    opacity: 1;  
                    z-index: 1;
                }
            }
            .el-table .cell, .el-table__footer-wrapper, .el-table__header-wrapper,.el-table,.el-table__body-wrapper{
                overflow: visible;
            }
            .el-table .cell, .el-table th>div{
                padding-left: 10px;
                padding-right: 10px;
            }
        }
        .block{
            text-align: center;
            margin-top: 40px;
        }
    }
    
</style>
<style type="text/css" lang="scss">
    .ofaudit-box{
    }
</style>

