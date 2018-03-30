<template>
    <div class="container">
        <fc-header></fc-header>
        <!--教务处审核更换专业班级-->
        <!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					审核更换专业/班级
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="depaud-main">
            <el-form ref="form" :model="form" :inline="true" class="formdepadud">
                <el-form-item label="校区">
                    <el-select v-model="form.campus" value-key="id" clearable placeholder="" @change="campus(form.campus,'2')">
                        <el-option v-for="item in campuses" :value="item" :label="item.name" :key="item.id">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="院系">
                    <el-select v-model="form.depart" value-key="id" placeholder="" @change="campus(form.depart,'3')">
                        <el-option v-for="item in departs" :value="item" :label="item.name" :key="item.id">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业">
                    <el-select v-model="form.majors" value-key="id" placeholder=""  @change="loadGrade">
                        <el-option v-for="item in majores" :value="item" :label="item.name" :key="item.id">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级">
                    <el-select v-model="form.grade" value-key="id" placeholder="" @change="loadClazz">
                        <el-option v-for="item in grades" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级">
                    <el-select v-model="form.class" value-key="clazzid" placeholder="">
                        <el-option v-for="item in classes" :value="item" :label="item.clazzname" :key="item.clazzid">{{item.clazzname}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="search-group">
                    <el-input placeholder="请输入学生姓名" v-model="form.search">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="deptable">
                <template>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="oldCampusName" label="校区" width="70"></el-table-column>
                        <el-table-column prop="stuName" label="姓名" width="70" ></el-table-column>
                        <el-table-column prop="sex" label="性别" width="50">
                            <template slot-scope="scope">
                                <span>{{scope.row.sex== 1 ? '男':'女'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="oldDeptName" label="原院系" width="80" ></el-table-column>
                        <el-table-column prop="oldProfName" label="原专业" width="80" ></el-table-column>
                        <el-table-column prop="oldClazzName" label="原班级" width="70"></el-table-column>
                        <el-table-column prop="newCampusName" label="新校区" width="80"></el-table-column>
                        <el-table-column prop="newDeptName" label="新院系" width="80" ></el-table-column>
                        <el-table-column prop="newProfName" label="新专业" width="80"></el-table-column>
                        <el-table-column prop="createDate" label="提交时间" width="160"></el-table-column>
                        <el-table-column prop="reason" label="原因"></el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <div v-if="scope.row.state == 3 && scope.row.against != 3" class="handle handhover clearfix">
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
                                <div v-if="scope.row.state > 3 && scope.row.against != 3" class="handle clearfix">
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
        </el-row>
    </div>
</template>
<script type="text/javascript">
import fcHeader from '../../common/header.vue'
import api from '../../../apis/orientation/deptAudit.js'

export default {
    data(){
        return{
            form: {
                campus: '',
                depart: '',
                majors: '',
                grade: '',
                class: '',
                status: '',
                search:''
            },
            campuses:[],
            departs:[],
            majores:[],
            grades:[],
            classes:[],
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
        // 加载校区
        campus(item,type){
            let tables = {
                id: item.id,
                type: type
            }
            api.loadSelect(tables).then(response => {
                if(response.data.meta.code == 200){
                    if(type =='2'){
                        this.departs = response.data.data;
                        this.form.depart = '';
                        this.form.majors = '';
                        this.majores = [];
                    }else if(type =='3'){
                        this.majores = response.data.data;
                        this.form.majors = '';
                    }else if(type=='4'){
                        this.campuses = response.data.data;
                    }
                }
            });
            this.loadList();
        },
        // 通过专业加载年级
        loadGrade(){
            this.form.grade = {
                id:'',
                name:''
            }
            this.form.class = {
                clazzid:'',
                clazzname:''
            }
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
            this.form.class = {
                clazzid:'',
                clazzname:''
            }
            let params = {
                proid : this.form.majors.id,
                gradeid : this.form.grade.id
            }
            api.findClazzByPro(params).then(response => {
                if(response.data.meta.code == 200){
                    this.classes = response.data.data;
                    this.loadList();
                }
            });
        },
        // 加载表格
        loadList(){
            let allList = {
                type: '3',
                state: '3',
                oldCampusId:this.form.campus.id,
                oldDeptId:this.form.depart.id,
                oldProfId:this.form.majors.id,
                grade_id:this.form.grade.id,
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
        returnClick(){
            this.$router.push({
                name:'newIndex'
            })
        }
    },
    components:{
		fcHeader
    },
    mounted(){
        this.campus({id : '1',name : ''}, 4);
        this.loadList();
    }
}
</script>
<style type="text/css" lang="scss" >
    .table-box{
        width:1200px;
        margin: 0 auto;
        .tabtop{
            height: 55px;
            margin-top: 7px;
            background-color: #fff;
            border-radius: 4px;
            padding: 0 24px;
            .tableft{
                float: left;
                line-height: 55px;
                color:#208af5;
                font-size:16px;
                border-bottom:2px solid #208af5;
                font-weight: bold;
            }
            .tabright{
                float: right;
                margin-top: 7px;
                cursor: pointer;
                overflow: hidden;
                margin-top: 18px;
                span{
                    display: inline-block;
                }
                i{	
                    width: 9px;
                    height: 15px;
                    display: inline-block;
                    float: right;
                    margin-left: 6px;
                    margin-top: 2px;
                }
            }
        }
    }
    .depaud-main{
        width:1200px;
        margin: 0 auto;
		margin-top: 20px;
        min-height: 740px;
        background-color: #fff;
        padding: 18px 22px;
        // overflow: hidden;
        border-radius: 4px;
        .formdepadud{
            overflow: hidden;
            .el-form-item{
                width: 15%;
                .el-form-item__content{
                    width: 75%;
                }
            }
            .auditstat{
                width: 16%;
                .el-form-item__content{
                    width: 60%;
                }
            }
            .search-group{
                .el-form-item__content{
                    width:100%;
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
        .deptable{
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
                    right: -86px;;
                    top: 0;
                    width: 71px;
                    height: 44px;
                    background-color: #fff;
                    padding: 10px;
                    .pass{
                        i{
                            width: 14px;
                            height: 14px;
                            background: url("../../../assets/researchCenter/tongguo.png") 0 0 no-repeat;
                            display: inline-block;
                        }
                    }
                    .nopass{
                        i{
                            width: 14px;
                            height: 14px;
                            background: url("../../../assets/researchCenter/butongguo.png") 0 0 no-repeat;
                            display: inline-block;
                        }                    
                    }
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
    // 不通过原因
    .unreason{
        width: 444px;
        height: 292px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        border-radius: 6px;
        z-index: 2;
        padding: 18px;
        overflow: hidden;
        .ures-top{
            height: 32px;
            line-height: 32px;
            overflow: hidden;
            margin-bottom: 24px;
            .ures-cluster{
                float: left;
            }
            .ures-close{
                float: right;
                cursor: pointer;
            }
        }
        .ures-center{
            textarea{
                width: 100%;
                height: 164px;
                border: 0;
                background-color: #fafafa;
            }
        }
        .conf{
            width: 96px;
            height: 42px;
            float: right;
            margin-top: 30px;
        }
    }
    // 遮罩层
    .desk{
        z-index: 1 !important;
    }
</style>


