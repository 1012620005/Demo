<template>
	<div class="contanier">
		<fc-header></fc-header>
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					学生退宿管理
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="checkdorm-main">
            <el-col :span="24" class="checkdorm-top">
                <el-form :inline="true"  class="demo-form-inline">
                    <el-form-item label="校区">
                        <el-select v-model="select_Info.campus" clearable value-key="id" placeholder="" @change="loadDept">
                            <el-option v-for="campus in select_Info.campusList" :key="campus.id" :label="campus.name" :value="campus">{{campus.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="院系">
                        <el-select v-model="select_Info.dept" value-key="id" placeholder="" @change="loadProf">
                            <el-option v-for="dept in select_Info.deptList" :key="dept.id" :label="dept.name" :value="dept">{{dept.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业">
                        <el-select v-model="select_Info.prof" value-key="id" placeholder=""@change="loadGrade">
                            <el-option v-for="prof in select_Info.profList" :key="prof.id" :label="prof.name" :value="prof">{{prof.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年级">
                        <el-select v-model="select_Info.grade" value-key="id" placeholder="" @change="loadClazz">
                            <el-option v-for="grade in select_Info.gradeList" :key="grade.id" :label="grade.name" :value="grade">{{grade.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-select v-model="select_Info.clazz" value-key="clazzid" placeholder="" @change="loadTableByClazz">
                            <el-option v-for="clazz in select_Info.clazzList" :key="clazz.clazzid" :label="clazz.clazzname" :value="clazz">{{clazz.clazzname}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" class="instuname">
                        <el-input placeholder="请输入学生姓名" v-model="select_Info.searchName">
                            <i slot="suffix" class="el-input__icon el-icon-search" @click="loadTableAndTotal"></i>
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" class="checkdorm-table">
                <template>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column type="index" label="序号" width="100"></el-table-column>
                        <el-table-column prop="campusName" label="校区" width="180"></el-table-column>
                        <el-table-column prop="stuName" label="姓名"></el-table-column>
                        <el-table-column prop="sex" label="性别"></el-table-column>
                        <el-table-column prop="deptName" label="院系"></el-table-column>
                        <el-table-column prop="profName" label="专业"></el-table-column>
                        <el-table-column prop="clazzName" label="班级"></el-table-column>
                        <el-table-column prop="state" label="操作">
                            <template slot-scope="scope">
                                <div v-if="scope.row.state == 1" class="handle handhover clearfix" @click="showSeebtn(scope.row)">
                                    退宿
                                </div>
                                <div v-else-if="scope.row.state == 2" class="handle clearfix alcheck">
                                    已退宿
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>
            <el-col :span="24" class="pagings" v-if="Page.dividePage">
                <template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" 
                            @current-change="handleCurrentChange" 
                            :current-page.sync="Page.pageNo" 
                            :page-size="Page.pageSize" 
                            layout="prev, pager, next, jumper" 
                            :total="Page.count">
                        </el-pagination>
                    </div>
                </template>
            </el-col>
        </el-row>
        <!--宿舍分配详情弹框-->
        <el-dialog class="checkdorm-deta" :visible.sync="showDisdormdeta">
           <div slot="title" class="addclasses-cpm" >
                <!-- <img src="../../../assets/img/deanfund/icon01.png" /> -->
                <p>退宿</p>
            </div>
            <div class="disdorm-bot">
                <el-form ref="form" label-width="66px">
                    <ul>
                        <li>
                            <span>姓名：<i>{{stuInfo.stuName}}</i></span>
                            <span>性别：<i>{{stuInfo.sex}}</i></span>
                            <span>校区：<i>{{stuInfo.campusName}}</i></span>
                            <span>学制：<i>{{stuInfo.studyYear}}</i></span>
                        </li>
                        <li>
                            <span>院系：<i>{{stuInfo.deptName}}</i></span>
                            <span>专业：<i>{{stuInfo.profName}}</i></span>
                            <span>班级：<i>{{stuInfo.clazzName}}</i></span>
                            <span>辅导员：<i>{{stuInfo.teac}}</i></span>
                        </li>
                    </ul>
                    <el-form-item label="原因：">
                        <el-input type="textarea" v-model="formboun.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
    import fcHeader from '../../common/header.vue'
    import api from '../../../apis/orientation/distdormitory/stucheckDorm.js'

	export default {
		data () {
			return {
                showDisdormdeta:false,

                form:{
                    desc:''
                },
                tableData: [],
                formboun:{
                    desc:''
                },
                Page :{
                    pageNo: 1,
                    dividePage : false,
                    pageSize : 10,
                    count : 0
                },
                select_Info : {
                    campus : {
                        id : '',
                        name : ''
                    },
                    dept : {
                        id : '',
                        name : ''
                    },
                    
                    prof : {
                        id : '',
                        name : ''
                    },
                    grade : {
                        id : '',
                        name : '',
                        xq : '',
                        year : ''
                    },
                    clazz : {
                        clazzid : '',
                        clazzname : ''
                    },
                    searchName : '',
                    //下拉框内容
                    campusList : [],
                    deptList : [],
                    profList : [],
                    gradeList : [],
                    clazzList : [],
                },
                stuInfo : {
                    id : '',
                    stuName : '',
                    sex : '',
                    campusId : '',
                    campusName : '',
                    studyYear : '',
                    deptName : '',
                    profName : '',
                    clazzName : '',
                    reason : ''
                }
            }
		},
		components:{
			fcHeader
		},
        methods:{
            showSeebtn(row){
                this.showDisdormdeta = true;
                let params = {
                    userid : row.stuId
                }
                api.getUserById(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.stuInfo = row;
                        this.stuInfo.sex = mydata.sexname;
                    }
                })
            },
            onSubmit() {
                this.showDisdormdeta = false;
                api.backDorm(this.stuInfo).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.stuInfo.state = 2;
                    }
                })
            },
            // handleIconClick(ev) {
            //     console.log(ev);
            // },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                let params = {
                    campusId : this.select_Info.campus.id,
                    deptId : this.select_Info.dept.id,
                    profId : this.select_Info.prof.id,
                    gradeId : this.select_Info.grade.id,
                    clazzId : this.select_Info.clazz.clazzid,
                    pageNo: this.Page.pageNo,
                    pageSize : this.Page.pageSize,
                }
                api.loadInfo(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.tableData = mydata.list;
                        this.Page.count = mydata.count;
                        if(mydata.count > this.Page.pageSize){
                            this.Page.dividePage = true;
                        }else{
                            this.Page.dividePage = false;
                        }
                    }
                })
            },
            //下拉框方法
            loadDept(campus){
                this.select_Info.dept = {
                    id : '',
                    name : ''
                }
                this.select_Info.prof = {
                    id : '',
                    name : ''
                }
                this.select_Info.grade = {
                    id : '',
                    name : '',
                    xq : '',
                    year : ''
                }
                this.select_Info.clazz = {
                    clazzid : '',
                    clazzname : ''
                }
                this.Page.pageNo = 1;
                this.select_Info.searchName = '';
                this.loadTableAndTotal();
                api.loadSelect(campus.id,'2').then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.select_Info.deptList = mydata
                    }
                })
            },
            loadProf(dept){
                if(dept.id == '')
                    return;
                this.select_Info.prof = {
                    id : '',
                    name : ''
                }
                this.select_Info.grade = {
                    id : '',
                    name : '',
                    xq : '',
                    year : ''
                }
                this.select_Info.clazz = {
                    clazzid : '',
                    clazzname : ''
                }
                this.Page.pageNo = 1;
                this.select_Info.searchName = '';
                this.loadTableAndTotal();
                api.loadSelect(dept.id,'3').then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.select_Info.profList = mydata
                    }
                })
            },
            loadGrade(){
                this.select_Info.grade = {
                    id : '',
                    name : '',
                    xq : '',
                    year : ''
                }
                this.clazz = {
                    clazzid : '',
                    clazzname : ''
                }
                this.Page.pageNo = 1;
                this.select_Info.searchName = '';
                this.loadTableAndTotal();
                console.log("haha")
                api.loadGrade().then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.select_Info.gradeList = mydata
                    }
                })
            },
            loadClazz(grade){
                if(grade.id == ''){
                    return;
                }
                let params = {
                    gradeid : grade.id,
                    proid : this.select_Info.prof.id
                }
                this.clazz = {
                    clazzid : '',
                    clazzname : ''
                }
                this.Page.pageNo = 1;
                this.select_Info.searchName = '';
                this.loadTableAndTotal();
                api.loadClazz(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.select_Info.clazzList = mydata
                    }
                })
            },
            loadTableByClazz(){
                this.select_Info.searchName = '';
                this.loadTableAndTotal();
            },
            loadTableAndTotal(){
                this.Page.pageNo = 1;
                let params = {
                    campusId : this.select_Info.campus.id,
                    deptId : this.select_Info.dept.id,
                    profId : this.select_Info.prof.id,
                    gradeId : this.select_Info.grade.id,
                    clazzId : this.select_Info.clazz.clazzid,
                    stuName : this.select_Info.searchName,
                    pageNo : this.Page.pageNo,
                    pageSize : this.Page.pageSize,
                }
                api.loadInfo(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.tableData = mydata.list;
                        this.Page.count = mydata.count;
                        if(mydata.count > this.Page.pageSize){
                            this.Page.dividePage = true;
                        }else{
                            this.Page.dividePage = false;
                        }
                    }
                })
            },
            returnClick(){
                this.$router.push({
                    name:'newIndex'
                })
            }
        },
        computed:{
        
        },
        mounted () {
            api.loadSelect('1','4').then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if (meta.code == '200') {
                    this.select_Info.campusList = mydata
                }
            })
            api.loadInfo(this.Page).then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if (meta.code == '200') {
                    this.tableData = mydata.list;
                    this.Page.count = mydata.count;
                    console.log("ha1")
                    if(mydata.count > this.Page.pageSize){
                        this.Page.dividePage = true;
                    }else{
                        this.Page.dividePage = false;
                    }
                }
            })
        }
	}
</script>
<style type="text/css" lang="scss" scoped>
        // 顶部标签
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
        .checkdorm-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .checkdorm-top{
                .instuname{
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
            .checkdorm-table{
                .handhover{
                    cursor: pointer;
                }
                .alcheck{
                    color: #91c604;
                }
            }
            .pagings{
                text-align: center;
                margin-top: 40px;
            }
        }
        // 宿舍分配详情弹框
        .checkdorm-deta{
            .el-dialog--small{
                width: 40%;
            }
            .el-dialog__body{
                padding: 20px;
                overflow: hidden;
            }
            .addclasses-cpm{
                display:inline-block;
                float: left;
            }
            .addclasses-cpm p{
                display:inline-block;
                margin-left:10px;
            }
            .addclasses-cpm img{
                vertical-align: middle;
            }
            .disdorm-bot{
                .el-form{
                    ul{
                        li{
                            margin-bottom: 28px;
                            span{
                                margin-right: 26px;
                            }
                        }
                    }
                }
                .el-form-item{
                    .el-form-item__label{
                        text-align: left;
                    }
                    .el-textarea__inner{
                        background-color: #f2f2f2;
                        height: 130px;
                    }
                    button{
                        width: 96px;
                        height: 42px;
                        float: right;
                    }
                }
                .el-form-item:last-child{
                    margin-bottom: 0;
                }
            }
        }
</style>
<style type="text/css" lang="scss">
    .checkdorm-main{
        .checkdorm-top{
            .el-form-item{
                width: 16%;
                .el-form-item__content{
                    width:77%;
                }
            }
            .instuname{
                width: 13%;
                .el-form-item__content{
                    width:100%;
                    margin-left: 0 !important;
                }
            }
        }
    }
</style>
