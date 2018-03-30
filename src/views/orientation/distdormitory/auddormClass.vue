<template>
	<div class="contanier">
		<fc-header></fc-header>
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					班级宿舍审核
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="aduclass-main">
            <el-col :span="24" class="aduclass-top">
                <el-form :inline="true">
                    <ul>
                        <li>{{campusName}}</li>
                        <li>{{deptName}}</li>
                    </ul>
                    <el-form-item label="专业">
                        <el-select v-model="prof" value-key="proid" placeholder="" @change="getClazzInfoByProf">
                            <el-option v-for="prof in profList" :key="prof.proid" :label="prof.proname" :value="prof">{{prof.proname}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" class="aduclass-table">
                <template>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column type="index" label="序号" width="80"></el-table-column>
                        <el-table-column prop="clazzName" label="班级" width="180"></el-table-column>
                        <el-table-column prop="totalPerson" label="总人数"></el-table-column>
                        <el-table-column prop="boyPerson" label="男生人数"></el-table-column>
                        <el-table-column prop="girlPerson" label="女生人数"></el-table-column>
                        <el-table-column prop="updateDate" label="提交日期"  width="180"></el-table-column>
                        <el-table-column prop="opera" label="操作" width="180">
                            <template slot-scope="scope">
                                <div v-if="scope.row.state == 1" class="word">
                                    <span class="imgScript refresh"></span>
                                    未分配
                                </div>
                                <div v-if="scope.row.state == 2" class="word handle clearfix"  @click="showSeebtn(scope.row)">
                                    <span class="imgScript shenhe"></span>
                                    <p>待审核</p>
                                </div>
                                <div v-else-if="scope.row.state == 3" class="word handle" @click="distrDorm(scope.row)">
                                    <span class="imgScript refresh"></span>
                                    待分配
                                </div>
                                <div v-else-if="scope.row.state == 4" class="word">
                                    <span class="imgScript nosuccess"></span>
                                    未通过
                                </div>
                                <div v-else-if="scope.row.state == 5" class="word">
                                    <span class="imgScript success"></span>
                                    分配完成
                                    <!-- <span class="imgScript success" @click="exportExcelStuDorm(scope.row)"></span> -->
                                    <div class="exp"><a :href="exportExcelURL + scope.row.clazzId"><span class="imgScript exporticon"></span>导出</a></div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>
        </el-row>
        <!--宿舍分配详情弹框-->
        <el-dialog class="aduclass-deta" :visible.sync="showDisdormdeta">
            <div slot="title" class="addclasses-cpm" >
                <img src="../../../assets/image/addstudent2.png" />
                <p>详情</p>
            </div>
            <div class="disdorm-bot">
                <div class="ddt-top">
                    <el-breadcrumb separator=" ">
                        <el-breadcrumb-item :to="{ path: '/' }">{{clazz.campusName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{clazz.deptName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{clazz.profName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{clazz.clazzName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>总人数：<span><i>{{clazz.totalPerson}}</i>人</span></el-breadcrumb-item>
                        <el-breadcrumb-item>男生：<span><i>{{clazz.boyPerson}}</i>人</span></el-breadcrumb-item>
                        <el-breadcrumb-item>女生：<span><i>{{clazz.girlPerson}}</i>人</span></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="ddt-boy bgmain">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;"><img src="../../../assets/img/orientation/boy.png" alt=""></span>
                            <span><i>{{rboyCount}}</i>人</span>
                        </div>
                        <div class="text item">
                            <el-collapse accordion>
                                <el-collapse-item v-for="(build,index) in boy" :key="index">
                                    <template slot="title">
                                        <span>{{build.buildName}}</span><span>{{build.floor}}层</span>
                                    </template>
                                    <ul class="shli">
                                        <li v-for="item in build.distrdormList">
                                            <div class="fjh">{{item.dormName}}</div>
                                            <p>{{item.occupyBed}}-{{item.totalBed}}</p>
                                        </li>
                                    </ul>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-card>
                </div>
                <div class="ddt-girl bgmain">
                    <el-card class="girl-card">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;"><img src="../../../assets/img/orientation/girl.png" alt=""></span>
                            <span><i>{{rgirlCount}}</i>人</span>
                        </div>
                        <div class="text item">
                            <el-collapse accordion>
                                <el-collapse-item v-for="(build,index) in girl" :key="index">
                                    <template slot="title">
                                        <span>{{build.buildName}}</span><span>{{build.floor}}层</span>
                                    </template>
                                    <ul class="shli">
                                        <li v-for="item in build.distrdormList">
                                            <div class="fjh">{{item.dormName}}</div>
                                            <p>{{item.occupyBed}}-{{item.totalBed}}</p>
                                        </li>
                                    </ul>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-card>
                </div>
                <el-form label-width="48px">
                    <el-form-item label="原因:">
                        <el-input type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item class="fdright">
                        <el-button type="primary" @click="agreeDistrTotal('3')" class="yes">通过</el-button>
                        <el-button class="no" @click="agreeDistrTotal('4')">不通过</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../common/header.vue'
    import api from '../../../apis/orientation/distdormitory/auddormClass.js'

	export default {
		data () {
			return {
                showDisdormdeta:false,
                campusName : '',
                deptName : '',
                //专业下拉框
                prof : {
                    proid : '',
                    proname : ''
                },
                profList : [],
                tableData: [],
                //导出excel
                exportExcelURL : '',
                //储存点击的班级
                clazz : {
                    totalPerson : 0,
                    boyPerson : 0,
                    girlPerson : 0,
                    campusName : '',
                    deptName : '',
                    profName : '',
                    clazzId : '',
                    clazzName : '',
                },
                //弹框中的宿舍信息
                boy : [],
                girl :[],
                rboyCount : 0,
                rgirlCount : 0,
            }
		},
		components:{
			fcHeader
		},
        methods:{
            //审核班级修改
            showSeebtn(row){
                this.showDisdormdeta=true;
                this.clazz = row;
                var params = {
                    mainRelation : row.clazzId
                }
                api.getDistrDormByMainId(params).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        this.boy = mydata.boy;
                        this.girl = mydata.girl;
                        this.rboyCount = mydata.rboyCount;
                        this.rgirlCount = mydata.rgirlCount;
                    }
                })
            },
            //跳转为学生分配宿舍
            distrDorm(row){
                this.$router.push({
                    name:'stuDorm',
                    query:{
                        clazzId : row.clazzId
                    }
                })
            },
            getClazzInfoByProf(prof){
                //通过专业加载班级
                var params = {
                    proid : prof.proid
                }
                api.getProfAndClazzForTeac(params).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        this.profList = mydata.pro;
                        this.clazzList = mydata.clazz;
                        var clazzList = [];
                        for(var i = 0; i < mydata.clazz.length; i++){
                            var clazz = mydata.clazz[i];
                            clazz.clazzId = clazz.clazzid;
                            clazz.clazzName = clazz.clazzname;
                            clazzList.push(clazz);
                        }
                        clazzList = JSON.stringify(clazzList);
                        var data = {stringList : clazzList}
                        var qs = require('querystring')
                        data = qs.stringify(data);
                        api.getClazzForTeac(data).then(response =>{
                            var mydata = response.data.data;
                            var meta = response.data.meta;
                            if(meta.code == '200'){
                                this.tableData = mydata;
                                console.log("shuju:")
                                console.log(this.tableData)
                            }
                        })
                    }
                })
            },
            // exportExcelStuDorm(row){
            //     var params = {
            //         clazzId : row.clazzId
            //     }
            //     api.exportExcelStuDorm(params).then(response =>{
            //         var mydata = response.data.data;
            //         var meta = response.data.meta;
            //         if(meta.code == '200'){

            //         }
            //     })
            // },
            agreeDistrTotal(state){
                this.showDisdormdeta = false;
                this.clazz.state = state;
                var params = {
                    mainRelation : this.clazz.clazzId,
                    state : state,
                    reason : ""
                }
                api.agreeDistrTotal(params).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        this.clazz.state = state;
                        // if(state == '3')
                            // alert("通过成功")
                        // else
                            // alert("不通过成功")
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
            api.getCurrentUser().then(response =>{
                var mydata = response.data.data;
                var meta = response.data.meta;
                if(meta.code == '200'){
                    this.campusName = mydata.scoms
                    this.deptName = mydata.dept;
                    this.profName = mydata.pro;
                }  
            }),
            api.getProfAndClazzForTeac().then(response =>{
                var mydata = response.data.data;
                var meta = response.data.meta;
                if(meta.code == '200'){
                    this.profList = mydata.pro;
                    this.prof = mydata.pro[0];
                    // this.clazzList = mydata.clazz;
                    // var clazzList = [];
                    // for(var i = 0; i < mydata.clazz.length; i++){
                    //     var clazz = mydata.clazz[i];
                    //     clazz.clazzId = clazz.clazzid;
                    //     clazz.clazzName = clazz.clazzname;
                    //     clazzList.push(clazz);
                    // }
                    // clazzList = JSON.stringify(clazzList);
                    // var data = {stringList : clazzList}
                    // var qs = require('querystring')
                    // data = qs.stringify(data);
                    // api.getClazzForTeac(data).then(response =>{
                    //     var mydata = response.data.data;
                    //     var meta = response.data.meta;
                    //     if(meta.code == '200'){
                    //         this.tableData = mydata;
                    //     }
                    // })
                } 
            })
            this.exportExcelURL = api.exportExcelStuDorm();
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
        .aduclass-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            a{
                color:#1f2d3d;
            }
            a:hover{
                color:#208af5;
            }
            .aduclass-top{
                overflow: hidden;
                ul{
                    float: left;
                    li{
                        float: left;
                        margin-right: 24px;
                        height: 36px;
                        line-height: 36px;
                    }
                }
                .el-form-item{
                    width: 40%;
                    float: left;
                    .el-form-item__content{
                        width:80%;
                    }
                }
            }
            .aduclass-table{
                .exp{
                    float: right;
                }
                .handle{
                    cursor: pointer;
                }
                .refresh,.shenhe,.success,.nosussess,.exporticon{
                    float: left;
                    margin-top: 4px;
                }
                .seeBtn{
                    float: right;
                    margin-top: 4px;
                }
                .word{
                    p{
                        float: left;
                    }
                }
            }
        }
        // 宿舍分配详情弹框
        .aduclass-deta{
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
                .ddt-top{
                    margin-bottom: 24px;
                    .el-breadcrumb__item__inner{
                        color:#48576a;
                        i{color:#ef0000;}
                    }
                }
                .ddt-boy{
                    .el-card__header{
                        background-color: #deeeff;
                    }
                    .fjh{
                        background-color:#deeeff;
                    }
                }
                .ddt-girl{
                    margin-top: 24px;
                    .el-card__header{
                        background-color: #feebeb;
                    }
                    .fjh{
                        background-color:#feebeb;
                    }
                }
                .bgmain{
                    .el-card{
                        box-shadow: 0 0;
                        .el-card__header{
                            padding:0 12px;
                            span{
                                display: inline-block;
                                margin-left: 10px;
                                i{color:#ef0000;}
                            }
                        }
                        .el-card__body{
                            padding:0;
                            height: 215px;
                            overflow: auto;
                            .el-collapse{
                                border: 0;
                                border-bottom: 1px solid #dfe6ec;
                            }
                            .el-collapse:last-child{
                                border-bottom: 0;
                            }
                            .el-collapse-item__header{
                                span{
                                    margin-right:8px; 
                                }
                            }
                            .shli{
                                text-align: center;
                                li{
                                    float: left;
                                     width: 46px;
                                    margin-bottom: 18px;
                                    margin-right: 13.5px;
                                }
                                .fjh{
                                    width: 46px;
                                    height: 20px;
                                    line-height: 20px;
                                    border-radius: 8px;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
                .el-form{
                    margin-top: 14px;
                    .el-form-item__label{
                        text-align: left;
                    }
                    .el-textarea__inner{
                        border: 0;
                        background-color: #fafafa;
                        height: 60px;
                    }
                    .el-form-item__content{
                        button{
                            width: 96px;
                            height: 42px;
                            border: 0;
                            color: #fff;
                        }
                        .yes{
                            background-color: #91c604;
                        }
                        .no{
                            background-color: #ef0000;
                        }
                    }
                    
                }
                .fdright{
                    float: right;
                }
                .el-form-item:last-child{
                    margin-bottom: 0;
                }
            }
        }
</style>
