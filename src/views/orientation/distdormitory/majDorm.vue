<template>
	<div class="contanier">
		<fc-header></fc-header>
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					专业的宿舍分配
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="majdorm-main">
            <el-col :span="24" class="majdorm-top">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="校区">
                        <el-select v-model="campus" value-key="id" placeholder="" @change="selectCampus">
                            <el-option v-for="item in campusList" :key="item.id" :label="item.name" :value="item" >{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="院系">
                        <el-select v-model="dept" value-key="id" placeholder="" @change="selectDept">
                             <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" class="majdorm-table">
                <template>
                    <el-table :data="tableData" style="width: 100%" border v-loading="loading" element-loading-text="拼命加载中">
                        <el-table-column prop="campusName" label="校区" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="deptName" label="院系" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="profName" label="专业" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="totalPerson" label="总人数"></el-table-column>
                        <el-table-column prop="boyPerson" label="男生"></el-table-column>
                        <el-table-column prop="girlPerson" label="女生"></el-table-column>
                        <el-table-column prop="updateDate" label="提交日期" width="180" show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope" >
                                <div v-if="scope.row.state == 1" class="word handle clearfix" @click="jumpURL(scope.row)">
                                    <div class="pass"><span class="imgScript refresh"></span>待分配</div>
                                    <!-- <span class="imgScript refresh"></span>
                                    <P>待分配</P> -->
                                </div>
                                <div v-else-if="scope.row.state == 2" class="word" @click="readDistrInfo(scope.row)">
                                    <div class="pass"><span class="imgScript shenhe"></span>待审核</div>
                                    <!-- <span class="imgScript shenhe"></span>
                                    <P>待审核</P> -->
                                    <span class="imgScript seeBtn"></span>
                                </div>
                                <div v-else-if="scope.row.state == 3" class="word">
                                    <div class="pass"><span class="imgScript success"></span>已通过</div>
                                    <!-- <span class="imgScript success"></span>
                                    <p>已通过</p> -->
                                    <span class="imgScript seeBtn"  @click="readDistrInfo(scope.row)"></span>
                                    <div class="exp"><a :href="exportExcelURL + scope.row.profId"><span class="imgScript exporticon handle"></span>导出</a></div>
                                </div>
                                <div v-else-if="scope.row.state == 4" class="word">
                                    <div class="pass"><span class="imgScript nosussess"></span>未通过</div>
                                    <!-- <span class="imgScript nosussess"></span>
                                    <p>未通过</p> -->
                                    <span class="imgScript seeBtn" @click="readDistrInfo(scope.row)"></span>
                                    <span class="imgScript btns" @click="jumpURL(scope.row)"></span>
                                </div>   
                            </template>
                        </el-table-column>
                    </el-table>
                </template>

            </el-col>
        </el-row>
        <!--宿舍分配详情弹框-->
        <el-dialog class="majdorm-deta" :visible.sync="showDisdormdeta">
            <div slot="title" class="addclasses-cpm" >
                <img src="../../../assets/image/addstudent2.png" />
                <p>详情</p>
            </div>
            <div class="disdorm-bot">
                <div class="ddt-top">
                    <el-breadcrumb separator=" ">
                        <el-breadcrumb-item :to="{ path: '/' }">{{distrDorm.campusName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{distrDorm.deptName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{distrDorm.profName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>总人数：<span><i>{{distrDorm.totalPerson}}</i>人</span></el-breadcrumb-item>
                        <el-breadcrumb-item>男生：<span><i>{{distrDorm.boyPerson}}</i>人</span></el-breadcrumb-item>
                        <el-breadcrumb-item>女生：<span><i>{{distrDorm.girlPerson}}</i>人</span></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="ddt-boy bgmain">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;"><img src="../../../assets/img/orientation/boy.png" alt=""></span>
                            <span><i>{{window.rboyCount}}</i>人</span>
                        </div>
                        <div class="text item">
                            <el-collapse accordion>
                                <el-collapse-item v-for="(build,index) in window.boy" :key="index">
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
                            <span><i>{{window.rgirlCount}}</i>人</span>
                        </div>
                        <div class="text item">
                            <el-collapse accordion>
                                <el-collapse-item v-for="(build,index) in window.girl" :key="index">
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
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../common/header.vue'
	import api from '../../../apis/orientation/distdormitory/majDorm.js'

	export default {
		data () {
			return {
                showDesk:false,
                showDisdormdeta:false,
                campus : {
                    id : '',
                    name : ''
                },
                campusList : [],
                dept : {
                    id : '',
                    name : ''
                },
                deptList : [],
                tableData:[],
                //导出excel
                exportExcelURL : '',
                // 弹窗中的宿舍的分配详情
                distrDorm : {},
                //弹窗的分配详情
                window : {
                    boy : [],
                    girl :[],
                    rboyCount : 0,
                    rgirlCount : 0
                },
                loading:true
            }
		},
		components:{
			fcHeader
		},
        methods:{
            selectCampus(item){
                this.dept = {};
                api.loadSelect({id : item.id,type : '2'}).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200') {
                        this.deptList = mydata;
                    }else{
                        this.$message.error(meta.message);
                    }

                })
                var params = {
                    campusId : item.id
                }
                api.distrTotalForProf(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200') {
                        this.showData(mydata);
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            selectDept(item){
                var params = {
                    campusId : this.campus.id,
                    deptId : item.id
                }
                api.distrTotalForProf(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200') {
                        this.showData(mydata);
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            jumpURL(row){
                this.$router.push({
                   name:'majDorm2',
                   query:{
                      campusId : row.campusId,
                      deptId : row.deptId,
                      profId : row.profId
                   }
               })
            },
            showData(data){
                for(var i = 0; i < data.length; i++){
                    var item = data[i];
                    item.rowspans = [
                        {flags: item.campusIsHide, rows: item.campusLength}, 
                        {flags: item.deptIsHide, rows: item.deptLength}, 
                        {flags: '2', rows: '1'},
                        {flags: '2', rows: '1'},
                        {flags: '2', rows: '1'},
                        {flags: '2', rows: '1'},
                        {flags: '2', rows: '1'},
                        {flags: '2', rows: '1'},
                    ]
                }
                this.tableData = data;
                this.loading = false;
            },
            //审核宿舍分配信息
            readDistrInfo(row){
                this.showDisdormdeta = true;
                this.distrDorm = row;
                var params = {
                    mainRelation : row.profId
                }
                api.getDistrDormByMainId(params).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        this.window.boy = mydata.boy;
                        this.window.girl = mydata.girl;
                        this.window.rboyCount = mydata.rboyCount;
                        this.window.rgirlCount = mydata.rgirlCount;
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
            //校区下拉框
            api.loadSelect({id : '1',type : '4'}).then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if(meta.code == '200') {
                    this.campusList = mydata;
                    console.log(this.campusList);
                }else{
                    this.$message.error(meta.message);
                }
            }),
            api.distrTotalForProf({}).then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if(meta.code == '200') {
                    this.showData(mydata);
                    console.log(mydata)
                }else{
                    this.$message.error(meta.message);
                }
            })
            this.exportExcelURL = api.exportExcelDistrDorm();
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
        .majdorm-main{
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
            .majdorm-table{
                .exp,.pass{
                    float: left;
                }
                .handle{
                    cursor: pointer;
                }
                .refresh,.shenhe,.success,.nosussess,.exporticon{
                    float: left;
                    margin-top: 4px;
                }
                .seeBtn{
                    float: left;
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
        .majdorm-deta{
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
                            height: 234px;
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
        span.refresh{
            width: 16px;
            height: 16px;
            background-position: -94px -534px;
        }
        span.seeBtn{
            width:26px;
            height:17px;
            background-position:-94px -395px;
        }
        span.seeBtn:hover{
            background-position:-94px -427px;
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
<style  type="text/css" lang="scss">
.majdorm-main{
    .majdorm-top{
        .el-form-item{
            width: 20%;
            .el-form-item__content{
                width:70%;
            }
        }
    }
}
</style>
