<template>
	<div class="contanier">
		<fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					审核分班
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="acassig-main">
            <el-col :span="24">
                <el-row :span="24" class="acass-top">
                    <el-form ref="form" :model="form">
                        <el-col :span="5">
                            <el-form-item  label="校区" >
                                <el-select v-model="form.setion" value-key="id" clearable @change="tableChange" visible-change>
                                    <el-option  v-for="item in setions"  :key="item.id" :label="item.name" :value="item">{{ item.name }}</el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item  label="院系">
                             <el-select v-model="form.yuanxi" value-key="id" @change="departChange" visible-change>
                                    <el-option v-for="item in depart" :key="item.id" :label="item.name" :value="item">{{ item.name }} </el-option>
                                </el-select> 
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="专业">
                                <el-select v-model="form.numbuild" value-key="id" @change="pressChange" visible-change>
                                    <el-option v-for="item in press" :key="item.id" :label="item.name" :value="item">{{ item.name }} </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="5">
                            <el-form-item label="审核状态" class="revStatus">
                                <el-select v-model="form.status">
                                    <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">{{ item.label }} </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                    </el-form>
                    <!-- <div class="prints" @click="jumpURL()">
                        <i><img src="../../../assets/researchCenter/print.png" alt=""></i>
                        <span>打印</span>
                    </div> -->
                </el-row>
            </el-col>
            <el-col :span="24" class="acass-table">
                <el-table
                    :data="tableData"
                    style="width: 100%" border>
                    <el-table-column
                        prop="campusName"
                        label="校区"
                        width="100"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="deptName"
                        label="院系"
                        width="100"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="profName"
                        label="专业"
                        width="100"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="clazzName"
                        label="班级"
                        width="120"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column 
                        prop="teacname" 
                        label="班主任" 
                        width="100"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="totalPersons"
                        label="总人数">
                    </el-table-column>
                    <el-table-column
                        prop="boyPersons"
                        label="男生">
                    </el-table-column>
                    <el-table-column
                        prop="girlPersons"
                        label="女生">
                    </el-table-column>
                    <el-table-column
                        prop="createDate"
                        label="提交日期"
                        width="180"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <!-- <div @click="distrClazz(scope.row)" v-if="scope.row.state == 1"> -->
                            <div v-if="scope.row.state == 1">
                                <div class="pass"><span class="imgScript refresh"></span>待分班</div>
                                <!-- <span class="imgScript refresh"></span>
                                待分班 -->
                            </div>
                            <div v-if="scope.row.state == 2"  @click="readClazzInfo(scope.row)" class="pendapproval">
                                <div class="pass"><span class="imgScript shenhe"></span>待审核</div>
                                <!-- <span class="imgScript shenhe"></span>
                                待审核 -->
                            </div>
                            <div v-if="scope.row.state == 3">
                                <div class="pass"><span class="imgScript success"></span>已通过</div>
                                <!-- <span class="imgScript success"></span>
                                已通过 -->
                                <span @click="readClazzInfo(scope.row)" class="imgScript seeBtn"></span>
                                <div class="pass"><a :href="exportProfExcel + scope.row.profId" class="export clearfix"><span class="imgScript exporticon"></span>导出</a></div>
                                <!-- <span @click="exportExcelClazzForProf(scope.row)" class="handle"><span class="imgScript exporticon handle"></span>导出</span> -->
                            </div>
                            <div v-if="scope.row.state == 4">
                                <div @click="jumpDivclass()" class="nopass">
                                    <div class="pass"><span class="imgScript nosussess"></span>未通过</div>
                                    <!-- <span class="imgScript nosussess"></span>
                                    未通过 -->
                                </div>
                                <span @click="readClazzInfo(scope.row)"  class="imgScript seeBtn"></span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!--详情-->
        <el-dialog class="acassdetail" :visible.sync="showCladetail">
            <div slot="title" class="addclasses-cpm">
                <!-- <img src="../../../assets/image/addstudent2.png" /> -->
                <p>详情</p>
            </div>
            <div class="cladet-mian">
                <ul>
                    <li>
                        <ul class="one">
                            <li>{{clazz.ssname}}</li>
                            <li>{{clazz.deptname}}</li>
                            <li>{{clazz.proname}}</li>
                            <li>
                                <template>
                                    <el-select v-model="clazz" value-key="clazzid" placeholder="" @change="clazzSelet">
                                        <el-option v-for="item in clazzList" :key="item.clazzid" :label="item.clazzname" :value="item">
                                        </el-option>
                                    </el-select>
                                </template>
                            </li>
                            <!-- <li v-if="showInfo.state == 3" @click="exportClazzInfo()" class="onexport handle"><span class="imgScript exporticon"></span>导出</li> -->
                            <li class="daochu"><a v-if="showInfo.state == 3" :href="exportClazzExcel + clazz.clazzid" class="export clearfix"><span class="imgScript exporticon"></span>导出</a></li>
                        </ul>
                    </li>
                    <li>
                        <ul class="two">
                            <li>班主任：<span>{{clazz.teaname}}</span></li>
                            <li>总人数：<i>{{tableData2.length}}</i>人</li>
                            <li>男生：<i>{{boyCount}}</i>人</li>
                            <li>女生：<i>{{girlCount}}</i>人</li>
                        </ul>
                    </li>
                </ul>
                <!-- <div class="print">
                    <i><img src="../../../assets/researchCenter/print.png" alt=""></i>
                    <span>打印</span>
                </div> -->
            </div>
            <template>
                <el-table :data="tableData2" stripe style="width: 100%">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="name" label="学生姓名"></el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column prop="birthday" label="出生日期"></el-table-column>
                    <el-table-column prop="score" label="分数"></el-table-column>
                </el-table>
            </template>
            <el-form ref="form" :model="formpass" label-width="40px" class="passNY">
                <!-- <el-form-item label="原因">
                    <el-input type="textarea" v-model="formpass.desc"></el-input>
                </el-form-item> -->
                <div v-if="showDest" class="click-scope">
                    <el-button type="primary" @click="agreeDistrClazz" class="throughs">通过</el-button>
                    <el-button @click="disagreeDistrClazz" class="nothroughs">不通过</el-button>
                </div>
            </el-form>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../common/header.vue'
    import api from '../../../apis/orientation/classDis.js'
     
	export default {
		data () {
			return {
				form: {
                    building: '',
                    numbuild: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    desc: '',
                    setion: '',
                    yuanxi: '',
                    zhuanyu: '',
                    status: ''
                },
                total: 5,
                compus: '东校区',
                tableData: [],
                setions: [],
                depart: [],
                press:[],
                status:[],
                tableData2: [],
                //导出excel路径
                exportProfExcel : '',
                exportClazzExcel : '',
                clazz : {
                    clazzid : '',
                    clazzname : '',
                    teaname : '',
                    proname : '',
                    deptname : '',
                    ssname : '',
                },
                profState : '',
                boyCount : 0,
                girlCount : 0,
                tableData:[],
                // 详情
                showCladetail:false,
                showDest:false,
                clazzList: [],
                value: '',
                showInfo : {
                    state : ''
                },
                formpass:{
                    desc:''
                },
                grade : {
                    year : '',
                    name : '',
                    xq : '',
                    id : ''
                }
            }
		},
		components:{
			fcHeader
		},
        methods:{
            handleClick(row){
            },
            //选择校区
           tableChange (item) {
               this.form.yuanxi = {}
               this.form.numbuild = {}
               api.selectData(item.id).then(response =>{
                   var meta = response.data.meta
                   var mydata = response.data.data
                   if (meta.code == '200') {
                       this.showData(mydata);
                   }
               });
               api.loadCampus(item.id,'2').then(response =>{
                   var meta = response.data.meta
                   var mydata = response.data.data;
                   if (meta.code == '200') {
                       this.depart = mydata
                       this.press = []
                       this.form.yuanxi = ''
                       this.form.numbuild = ''
                   }

               })
           },
           //选择院系
           departChange (item) {
                this.form.numbuild = {}
                api.selectData(this.form.setion.id,item.id).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data
                    if (meta.code == '200') {
                        this.showData(mydata);
                    }
                });
                api.loadCampus(item.id,"3").then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data
                    if(meta.code == '200') {
                        this.press = mydata
                        this.form.numbuild = ''
                    }
                }) 
           },
           //选择专业
           pressChange (item){
               api.selectData(this.form.setion.id,this.form.yuanxi.id,item.id).then(response =>{
                   var meta = response.data.meta
                   var mydata = response.data.data
                   if (meta.code == '200') {
                       this.showData(mydata);
                   }
               });
           },
           showData(data){
                for(var i = 0; i < data.length; i++){
                    var item = data[i];
                    item.rowspans = [
                        {flags: item.campusIsHide, rows: item.campusLength}, 
                        {flags: item.deptIsHide, rows: item.deptLength},
                        {flags: item.profIsHide, rows: item.profLength},
                        {flag: '2', rows: '1'}, 
                        {flag: '2', rows: '1'},
                        {flag: '2', rows: '1'},
                        {flag: '2', rows: '1'},
                        {flag: '2', rows: '1'},
                        {flag: '2', rows: '1'},
                        {flags: item.profIsHide, rows: item.profLength},
                    ]
                }
                this.tableData = data
           },
           readClazzInfo(row) {
                this.showCladetail = true
                //这个是为了审核之后修改状态
                this.showInfo = row;
                if (row.state == '2') {
                    this.showDest = true
                }else{
                    this.showDest = false
                }
                let params = {
                    proid : row.profId,
                    gradeid : this.grade.id
                }
                //获取班级下拉框
                api.selectClazz(params).then(response =>{
                    var code = response.data.meta.code
                    var mydata = response.data.data;
                    if (code == '200') {
                        this.clazzList = mydata
                        this.clazz = mydata[0]
                    }
                })    
                // this.clazzSelet();                
           },
        //    exportClazzInfo(row){
        //         console.log(this.clazz.clazzid)
        //         let params = {
        //             clazzId : this.clazz.clazzid,
        //         }
        //         api.exportClazzInfo(params).then(response =>{

        //         })
        //    },
        //    exportExcelClazzForProf(row){
        //         let params = {
        //             profId : row.profId,
        //         }
        //         api.exportExcelClazzForProfzInfo(params).then(response =>{

        //         })
        //    },
           clazzSelet(clazz){
               console.log("haha")
                api.clazzInfo(clazz.clazzid).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.tableData2 = mydata.stuList
                        this.boyCount = mydata.boyCount;
                        this.girlCount = mydata.girlCount;
                    }
                })
           },
           //同意分班
           agreeDistrClazz(){
                this.showInfo.state = 3;
                this.showCladetail = false;
                api.agreeDistrClazz(this.showInfo.profId).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                    }                    
                })
           },
           //不同意分班
           disagreeDistrClazz(){
                this.showInfo.state = 4;
                this.showCladetail = false
                api.disagreeDistrClazz(this.showInfo.profId).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
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
            api.loadCampus("1","4").then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if (meta.code == '200') {
                    this.setions = mydata
                }                    
            }),
            api.getDictMapList("state").then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data
                if (meta.code == '200') {
                    this.status = mydata
                }      
            })
            this.exportProfExcel = api.exportExcelClazzForProfzInfo();
            this.exportClazzExcel = api.exportClazzInfo();
            //获得当前年级
            api.getCurrentGrade().then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data
                if (meta.code == '200') {
                    this.grade = mydata
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
        .acassig-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            .acass-top{
                .el-select{
                    width: 68%;
                }
                .revStatus{
                    .el-select{
                        width: 50%;
                    }
                }
                .prints{
                    float: right;
                    height: 36px;
                    line-height: 36px;
                    i{
                        width: 16px;
                        height: 16px;
                        float: left;
                        margin-right: 6px;
                        margin-top: 3px;
                    }
                }
            }
            .acass-table{
                .refresh,.shenhe,.success,.nosussess,.exporticon{
                    float: left;
                    margin-top: 4px;
                }
                .seeBtn{
                    float: left;
                    margin-top: 4px;
                    cursor: pointer;
                }
                .nopass{
                    float: left;
                }
                .pendapproval,.nopass{
                    cursor: pointer;
                }
                .pass{
                    float: left;
                }
            }
            .table{
                width: 100%;
                border: 1px solid #dfe6ec;
                border-collapse: collapse;
                text-align: center;
                thead{
                    background-color: #eef1f6;
                    th{
                        border-right: 1px solid #dfe6ec;
                        border-bottom: 1px solid #dfe6ec;
                        height:50px;
                    }
                }
                
                .xiaoqu{
                    vertical-align:inherit;
                }
                .depart{
                    li{
                        border-bottom: 1px solid #dfe6ec;
                    }
                    li:last-child{
                        border-bottom:0;
                    }
                }
                ul{
                    border-bottom: 1px solid #dfe6ec;
                }
                ul:last-child{
                    border-bottom:0;
                }
                li{
                    border-bottom: 1px solid #dfe6ec;
                }
                li:last-child{
                    border-bottom:0;
                }
                
                .banji{
                   
                }
                .banzhuren{
                    tr{
                        td{
                            border: 0;
                            float: left;
                            width: 100%;
                            li{
                               border-bottom: 1px solid #dfe6ec;
                               height:20px; 
                               background:red;
                            }
                            li:last-child{
                               border-bottom: 1px solid #dfe6ec; 
                                height:20px; 
                            }
                        }
                    }
                }
            }
            table tbody{border:1px solid #ccc;  border-collapse:collapse;}
            table td{vertical-align: middle}
            // table td,table th{border-right: 1px solid #dfe6ec}
        }
        // 详情
        .acassdetail{
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
            .cladet-mian{
                ul{
                    // float: left;
                    li{
                        overflow: hidden;
                        margin-bottom: 7px;
                        .one,.two{
                            width: 100%;
                            li{
                                float: left;
                                margin-right: 22px;
                                height: 40px;
                                line-height: 40px;
                                i{
                                    color:#ef0000;
                                }
                            }
                            .daochu{
                                float: right;
                                a{
                                    color:#1f2d3d;
                                }
                                a:hover{
                                    color:#208af5;
                                }
                            }
                            .exporticon{
                                float: left;
                                margin-top: 10px;
                            }
                        }
                    }
                    .onexport{
                        float: right !important;
                    }
                }
                .print{
                    float: right;
                    i{
                        float: left;
                        display: inline-block;
                        margin-right: 6px;
                        margin-top: 2px;
                    }
                    span{
                        float: left;
                        display: inline-block;
                    }
                }
            }
            .el-table__body-wrapper{
                height:300px;
            }
            .passNY{
                margin-top:10px;
                .el-form-item__label{
                    text-align: left;
                }
                .el-textarea__inner{
                    border:0;
                    background-color: #dfe6ec;
                    height:80px;
                }
                
                div{
                    button{
                        width: 96px;
                        height: 42px;
                    }
                    float:right;
                    .throughs{
                        background-color: #91c604;
                        border: 0;
                    }
                    .nothroughs{
                        background-color:#ef0000;
                        border:0;
                        color:#fff;
                    }
                }
            }
        }
        .imgScript{
            display:inline-block;
            width:14px;
            height:14px;
            background: url('../../../assets/img/connet/script.png') no-repeat;
            background-position: -48px -44px;
            margin: 0 5px;
        }
        span.refresh{
            width: 16px;
            height: 16px;
            background-position: -94px -534px;
        }
        span.shenhe:hover{
            background-position:-48px -74px; 
        }
        span.seeBtn{
            width:26px;
            height:17px;
            background-position:-94px -395px;
        }
        span.seeBtn:hover{
            background-position:-94px -427px;
        }
        span.success{
            background-position:-48px -104px;
        }
        span.sussess:hover{
            background-position:-48px -134px; 
        }  
        span.nosussess{
            background-position:-48px -164px; 
        }
        span.nosussess:hover{
            background-position:-48px -194px; 
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
</style>

<style type="text/css" lang="scss">
    .acassig-main{
        table td,table th{border-right: 1px solid #dfe6ec}
        a{
            color:#1f2d3d;
        }
        a:hover{
            color:#208af5;
        }
        .table{
            tbody{
                td{
                    height:40px;
                }
            }
        }
    }
    .acassdetail{
        .el-dialog__header,.el-dialog__body{
            overflow: hidden;
        }
    }
</style>
