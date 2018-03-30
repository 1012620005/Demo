<template>
	<div class="contanier">
		<fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					学生宿舍管理
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="stuhoman-main">
            <el-col :span="24" class="stuhoman-immob">
                <el-row :span="24" >
                    <el-breadcrumb separator="》">
                        <el-breadcrumb-item :to="{ path: '/' }">{{select_Info.campusName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{select_Info.deptName}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-form ref="form" :inline="true" class="stuhoman-for">
                        <el-form-item label="专业" class="depar">
                            <el-select v-model="select_Info.prof" value-key="proid" placeholder="" @change="loadGrade">
                                <el-option v-for="(prof,index) in select_Info.profList" :label="prof.proname" :value="prof" :key="index">{{prof.proname}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年级" class="rev-status">
                            <el-select v-model="select_Info.grade" value-key="id" placeholder="" @change="loadClazz">
                                <el-option v-for="(grade,index) in select_Info.gradeList" :label="grade.name" :value="grade" :key="index">{{grade.name}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="班级">
                            <el-select v-model="select_Info.clazz" value-key="clazzid" placeholder="" @change="loadInfo">
                                <el-option v-for="(clazz,index) in select_Info.clazzList" :label="clazz.clazzname" :value="clazz" :key="index">{{clazz.clazzname}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="search-group">
                            <el-input placeholder="请输入关键字" v-model="select_Info.searName">
                                <i slot="suffix" class="el-input__icon el-icon-search" @click="loadMethod"></i>
                            </el-input>
                        </el-form-item>
                        <div class="exp-top">
                            <div class="export">
                                <i><img src="../../../assets/researchCenter/export.png" alt=""></i>
                                <span>导出Excel</span>
                            </div>
                            <div class="print">
                                <i><img src="../../../assets/researchCenter/print.png" alt=""></i>
                                <span>打印</span>
                            </div>
                        </div>
                    </el-form>
                </el-row>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="stuName" label="姓名"  width="80"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="50"></el-table-column>
                    <el-table-column prop="profName" label="专业" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="clazzName" label="班级" width="80" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="oldDormName" label="原宿舍" width="90" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="newDormName" label="新宿舍" width="90" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="nameStu" label="更换人" width="70"></el-table-column>
                    <el-table-column prop="reason" label="原因" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createDate" label="提交时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="submittime" label="操作" width="90">
                        <template slot-scope="scope">
                            <div v-if="scope.row.state == 1" class="handle handhover clearfix">
                                <span class="imgScript shenhe"></span>
                                待审核
                                <div class="shenheBounce">
                                    <div class="icons pass" @click="aduit(scope.row,'2')">
                                        <i></i>
                                        <span>通过</span>
                                    </div>
                                    <div class="icons nopass" @click="aduit(scope.row,'3')">
                                        <i></i>
                                        <span>不通过</span>
                                    </div>
                                </div>		
                            </div>
                            <div v-else-if="scope.row.state == 2" class="handle clearfix">
                                <span class="imgScript success"></span>
                                已通过
                            </div>
                            <div v-else-if="scope.row.state == 3" class="handle clearfix">
                                <span class="imgScript nosussess"></span>
                                未通过
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" v-if="Page.dividePage">
					<el-pagination
						@size-change="handleSizeChange"
					    @current-change="handleCurrentChange"
						:current-page.sync="Page.pageNo" 
                        :page-size="Page.pageSize" 
                        layout="prev, pager, next, jumper" 
                        :total="Page.count">
					</el-pagination>
				</div>                
            </el-col>
        </el-row>
        <!--待审核弹框-->
        <el-dialog class="pending-cartridge" :visible.sync="showPending">
            <div slot="title" class="addclasses-cpm" >
                <img src="../../../assets/img/deanfund/icon01.png" />
                <p>原因</p>
            </div>
            <div class="pend-main">
                <el-form>
                    <el-form-item>
                        <el-input type="textarea" v-model="form.desc" class="pend-height"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="pend-btn">
                <button type="button" class="get-through" @click="auditChangeDorm('2')">通过</button>
                <button type="button" class="not-through" @click="auditChangeDorm('3')">不通过</button>
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
    import fcHeader from '../../common/header.vue'
    import api from '../../../apis/orientation/distdormitory/stuhoMan.js'

	export default {
		data () {
           return {
				form: {
                    majors:'',
                    class:'',
                    reviewstatus:'',
                    search:''
                },
                tableData: [],
                // 未审核弹窗
                showPending:false,
                
                select_Info : {
                    campusName : '',
                    deptName : '',
                    prof : {
                        proid : '',
                        proname : ''
                    },
                    profList : [],
                    grade : {
                        id : '',
                        name : '',
                        xq : '',
                        year : ''
                    },
                    gradeList : [],
                    clazz : {
                        clazzid : '',
                        clazzname : ''
                    },
                    clazzList : [],
                    //通过名字查询
                    searName : '',
                    //当前审核条目
                    searRange : [],
                },
                
                Page : {
                    dividePage : true,
                    pageSize : 10,
                    pageNo : 1,
                    count : 1
                },
                changeDorm : {},
			}
        },
        methods:{
            handleIconClick(ev) {
                
            },
            loadMethod(){
                var data = {clazzList : JSON.stringify(this.select_Info.searRange),
                            stuName: this.select_Info.searName,
                            pageNo : this.Page.pageNo,
                            pageSize : this.Page.pageSize };
                var qs = require('querystring')
                data = qs.stringify(data);
                api.getChangeDorm(data).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        this.tableData = mydata.list;
                        this.Page.count = mydata.count;
                        if(mydata.count < this.Page.pageSize){
                            this.Page.dividePage = false;
                        }else{
                            this.Page.dividePage = true;
                        }
                    }
                })
            },
            // 分页
             handleSizeChange(val) {
                console.log('改变为的页：'+val);
            },
            handleCurrentChange(val) {
                var data = {clazzList : JSON.stringify(this.select_Info.searRange),
                            stuName: this.select_Info.searName,
                            pageNo : this.Page.pageNo,
                            pageSize : this.Page.pageSize };
                var qs = require('querystring')
                data = qs.stringify(data);
                api.getChangeDorm(data).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        this.tableData = mydata.list;
                        this.Page.count = mydata.count;
                        if(mydata.count < this.Page.pageSize){
                            this.Page.dividePage = false;
                        }else{
                            this.Page.dividePage = true;
                        }
                    }
                })
            },
            // 审核通过不通过
            aduit(row,state){
                // this.showPending=true;
                this.changeDorm = row;
                var changeDorm = {
                    id : row.id,
                    profId : row.profId,		// 专业id
                    profName : row.profName,		// 专业名
                    clazzId : row.clazzId,		// 班级id
                    clazzName : row.clazzName,		// 班级名
                    oldDormId : row.oldDormId,		// 原宿舍
                    oldDormName : row.oldDormName,		// 原宿舍名
                    newDormId :	row.newDormId,	// 新宿舍
                    newDormName : row.newDormName,		// 新宿舍名
                    stuId : row.stuId,		// 学生id
                    stuName : row.stuName,		// 学生名
                    sex : row.sex == '男' ? '1' : '2',		// rongyu3
                    idStu : row.idStu,		// 学生id
                    nameStu : row.nameStu,		// 学生名
                    reason : row.reason,	// 原因
                    state : state		// 审核状态
                }
                var qs = require('querystring')
                var data = qs.stringify(changeDorm);
                api.changeDorm(data).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200' && mydata != null) {
                        row.state = state;
                    }else{
                        this.$message.error('审核失败');
                    }
                })
            },
            loadGrade(prof){
                this.select_Info.grade = {
                    id : '',
                    name : '',
                    xq : '',
                    year : ''
                }
                this.select_Info.clazz = {
                    clazzid : '',
                    clazzname : ''
                },
                api.getAllGrade().then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        this.select_Info.gradeList = mydata
                    }
                })
                //通过学年加载班级
                let params = {
                    proid : prof.proid
                }
                api.getProfAndClazzForTeac(params).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        for(var i = 0; i < mydata.clazz.length; i++){
                            //用户中心的班级id和我的变量名不一样
                            mydata.clazz[i].clazzId = mydata.clazz[i].clazzid;
                        }
                        this.select_Info.searRange = mydata.clazz
                        console.log("haha")
                        console.log(mydata.clazz)
                        this.loadMethod();
                    }
                })
            },
            //通过班级加载数据
            loadClazz(grade){
                if(grade.id == null || grade.id == '')
                    return;
                this.select_Info.clazz = {
                    clazzid : '',
                    clazzname : ''
                }
                let params = {
                    gradeid : grade.id,
                    proid : this.select_Info.prof.id
                }
                api.getProfAndClazzForTeac(params).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        //用户中心的班级id和我的变量名不一样    
                        for(var i = 0; i < mydata.clazz.length; i++){
                            mydata.clazz[i].clazzId = mydata.clazz[i].clazzid;
                        }
                        this.select_Info.clazzList = mydata.clazz
                        this.select_Info.searRange = mydata.clazz
                        this.loadMethod();
                    }
                })
            },
            loadInfo(clazz){
                if(clazz.clazzid == null || clazz.clazzid == '')
                    return;
                clazz.clazzId = clazz.clazzid;
                this.select_Info.searRange = [clazz];
                this.loadMethod();
            },
            //审核通过不通过
            auditChangeDorm(state){
                // api.saveChangeDorm(data).then(response =>{
                //     var meta = response.data.meta; 
                //     if(meta.code == '200' && mydata != null){
                //         this.changeDorm.state = state;
                //     }
                // })
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
        computed:{

        },
        mounted () {
            api.getCurrentUser().then(response =>{
                var mydata = response.data.data;
                var meta = response.data.meta;
                if(meta.code == '200'){
                    this.select_Info.campusName = mydata.scoms
                    this.select_Info.deptName = mydata.dept;
                }  
            }),
            api.getProfAndClazzForTeac().then(response =>{
                var mydata = response.data.data;
                var meta = response.data.meta;
                if(meta.code == '200'){
                    this.select_Info.profList = mydata.pro;
                } 
            }).then(response =>{
                var count = 0;
                for(var i = 0; i < this.select_Info.profList.length; i++){
                    var prof = this.select_Info.profList[i]
                    let params = {
                        proid : prof.proid
                    }
                    api.getProfAndClazzForTeac(params).then(response =>{
                        var mydata = response.data.data;
                        var meta = response.data.meta; 
                        if(meta.code == '200'){
                            // this.profList = mydata.pro;
                            this.select_Info.clazzList = this.select_Info.clazzList.concat(mydata.clazz)
                            count++;
                        }
                    })
                }
                var _this = this;
                var timer = setInterval(function(){
                    if(count == _this.select_Info.profList.length){
                        clearInterval(timer)
                        for(var i = 0; i< _this.select_Info.clazzList.length; i++){
                            _this.select_Info.clazzList[i].clazzId = _this.select_Info.clazzList[i].clazzid;
                        }
                        //发送请求
                        var data = {clazzList : JSON.stringify(_this.select_Info.clazzList),
                                    pageNo : _this.Page.pageNo,
                                    pageSize : _this.Page.pageSize };
                        var qs = require('querystring')
                        data = qs.stringify(data);
                        //表格中的数据
                        api.getChangeDorm(data).then(response =>{
                            var mydata = response.data.data;
                            var meta = response.data.meta; 
                            if(meta.code == '200'){
                                console.log("heiheihei")
                                _this.tableData = mydata.list;
                                _this.Page.count = mydata.count;
                                _this.select_Info.searRange = _this.select_Info.clazzList;
                                _this.select_Info.clazzList = [];
                                if(mydata.count < _this.Page.pageSize){
                                    _this.Page.dividePage = false;
                                }else{
                                    _this.Page.dividePage = true;
                                }
                            }
                        })
                    }
                },1000)
            })
        }
	}
</script>
<style type="text/css" lang="scss">
        // 顶部标签
        .table-box{
            width:1200px;
            margin: 0 auto;
            .tabtop{
				height: 55px;
				margin-top: 7px;
				background-color: #fff;
				border-radius: 6px;
				padding: 0 24px;
				.tableft{
					float: left;
                    line-height: 55px;
                    border-bottom:2px solid #208af5;
                    color:#208af5;
                    font-size:16px;
                    font-weight: bold;
				}
				.tabright{
					float: right;
					height: 18px;
					// line-height: 55px;
					margin-top: 7px;
					cursor: pointer;
					overflow: hidden;
					margin-top: 18px;
					span{
						display: inline-block;
						// float: right;
					}
					i{	
						width: 9px;
						height: 15px;
						display: inline-block;
						float: right;
						margin-left: 6px;
					}
				}
			}
        }
        // 主体内容
        .stuhoman-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 22px 20px;
            // overflow: hidden;
            .stuhoman-immob{
                .el-breadcrumb{
                    float:left;
                    height: 37px;
                    line-height: 37px;
                    margin-right: 10px;
                    .el-breadcrumb__separator,.el-breadcrumb__item__inner{
                        color:#48576a;
                    }
                }
                .stuhoman-for{
                    .el-form-item{
                        width:15%;
                    }
                    .el-form-item__content{
                        width:70%;
                    }
                    .rev-status{
                        .el-form-item{
                            width:16%;
                        }
                        .el-form-item__content{
                            width:60%;
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
                    
                    // 导出打印
                    .exp-top{
                        float:right;
                        height: 36px;
                        line-height: 36px;
                        i{
                            width: 16px;
                            height: 16px;
                            float: left;
                            margin-right: 4px;
                            margin-top: 4px;
                        }
                        .export{
                            float: left;
                            margin-right:8px;
                            cursor: pointer;
                        }
                        .print{
                            float: right;
                            margin-left: 6px;
                            cursor: pointer;
                        }
                    }
                }
            }
            // 表格
            .el-table{
                overflow: visible;
                .cell{
                    padding: 0 6px;
                }
                th{
                    height: 50px;
                }
                td{
                    height: 45px;
                }
                .handhover{
                    position: relative;
                    z-index: 1;
                    .shenheBounce{
                        display: none;
                        opacity: 0;  
                        position: absolute;
                        right: -75px;;
                        top: 0;
                        min-width: 62px;
                        min-height: 44px;
                        background-color: #fff;
                        padding: 8px;
                        overflow: hidden;
                        .pass{
                            cursor: pointer;
                            i{
                                width: 14px;
                                height: 14px;
                                background: url("../../../assets/researchCenter/tongguo.png") 0 0 no-repeat;
                                display: inline-block;
                            }
                        }
                        .nopass{
                            cursor: pointer;
                            i{
                                width: 14px;
                                height: 14px;
                                background: url("../../../assets/researchCenter/butongguo.png") 0 0 no-repeat;
                                display: inline-block;
                            }                    
                        }
                    }                
                }
                .handhover:hover{
                    .shenheBounce{
                        display: block;
                        opacity: 1;  
                        z-index: 1;
                    }
                }
                .el-table__body-wrapper{
                    overflow: visible;
                }
            }
            .el-table .cell{
                overflow: visible;
            }
            .el-table::after, .el-table::before{
                z-index: 0;
            }
            // 分页
            .block{
                margin-top: 40px;
                text-align: center;
            }
            .imgScript{
                display:inline-block;
                width:14px;
                height:14px;
                background: url('../../../assets/img/connet/script.png') no-repeat;
                background-position: -48px -44px;
                margin: 0 5px;
            }
            span.shenhe:hover{
                background-position:-48px -74px; 
            }
            span.nosussess{
                background-position:-48px -164px; 
            }
            span.nosussess:hover{
                background-position:-48px -194px; 
            }	
            span.success{
                background-position:-48px -104px;
            }
            span.sussess:hover{
                background-position:-48px -134px; 
            }
            // 导出
            .exporticon{
                width:16px;
                height:16px;
                background-position:-48px -224px;
            }
            span.exporticon:hover{
                background-position:-48px -256px;
            }
        }
        // 待审核弹窗
        .pending-cartridge{
            .pend-top{
                overflow: hidden;
                height: 32px;
                line-height: 32px;
                .pend-left{
                    float: left;
                    i{
                        width: 32px;
                        height: 32px;
                        float: left;
                        margin-right: 18px;
                    }
                }
                .pend-right{
                    float: right;
                    cursor: pointer;
                }
            }
            .pend-main{
                margin-top: 24px;
                .pend-height{
                    textarea{
                        height: 162px;
                        background-color: #fafafa;
                        border: 0;
                    }
                }
            }
            .pend-btn{
                text-align: center;
                margin-top: 28px;
                button{
                    width: 96px;
                    height: 42px;
                    border: 0;
                    color: #fff;
                    border-radius: 6px;
                }
                .get-through{
                    background-color: #91c604;
                    margin-right: 28px;
                }
                .not-through{
                    background-color: #ef0000;
                }
            }
        }
</style>