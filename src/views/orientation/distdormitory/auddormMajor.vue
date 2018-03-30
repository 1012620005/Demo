<template>
	<div class="contanier">
		<fc-header></fc-header>
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					专业宿舍审核
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <!--宿舍分配详情弹框-->
        <div class="adumajor-deta">
            <div class="disdorm-bot">
                <div class="ddt-top">
                    <el-breadcrumb separator=" ">
                        <el-breadcrumb-item :to="{ path: '/' }">{{campusName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{deptName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{profName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>总人数：<span><i>{{rboyCount + rgirlCount}}</i>人</span></el-breadcrumb-item>
                        <el-breadcrumb-item>男生：<span><i>{{rboyCount}}</i>人</span></el-breadcrumb-item>
                        <el-breadcrumb-item>女生：<span><i>{{rgirlCount}}</i>人</span></el-breadcrumb-item>
                        <div class="exp"><a  v-if="!showThrough" :href="exportExcelURL + profId"><span class="imgScript exporticon"></span>导出</a></div>
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
                    <!-- <el-form-item label="原因:">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item> -->
                    <el-form-item class="fdright" v-if="showThrough">
                        <el-button type="primary" @click="agreeDistrTotal('3')" class="yes">通过</el-button>
                        <el-button class="no" @click="agreeDistrTotal('4')">不通过</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../common/header.vue'
    import api from '../../../apis/orientation/distdormitory/auddormMajor.js'
	export default {
		data () {
			return {
                showThrough : false,
                boy : [],
                girl :[],
                rboyCount : 0,
                rgirlCount : 0,
                campusName : '',
                deptName : '',
                profId : '',
                profName : '',
                //导出excel
                exportExcelURL : '',
            }
		},
		components:{
			fcHeader
		},
        methods:{
            //同意不同意分班
            agreeDistrTotal(state){
                api.agreeDistrTotal(this.profId,state).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    console.log(response)
                    if(meta.code == '200'){
                        // if(state == '3')
                        //     alert("通过成功")
                        // else
                        //     alert("不通过成功")
                        this.showThrough = false;
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
                    this.profId = mydata.proid;
                    this.profName = mydata.pro;
                    api.getDistrTotal(this.profId).then(response =>{
                        var mydata = response.data.data;
                        var meta = response.data.meta;
                        if(meta.code == '200' && mydata != null){
                            if(mydata.state != 2){
                                this.showThrough = false;
                            }
                            else{
                                this.showThrough = true;
                            }
                            //通过专业id加载分班数据
                            api.getDistrDormByMainId(this.profId).then(response =>{
                                var mydata = response.data.data;
                                var meta = response.data.meta;
                                console.log(response)
                                if(meta.code == '200'){
                                    this.campusList = mydata;
                                    this.boy = mydata.boy;
                                    this.girl = mydata.girl;
                                    this.rboyCount = mydata.rboyCount;
                                    this.rgirlCount = mydata.rgirlCount;
                                }        
                            })
                        }else{
                            this.$message.error("宿舍管理员没有为当前系分配宿舍");
                            this.showThrough = false;
                        } 
                    })
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
        // 宿舍分配详情弹框
        .adumajor-deta{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 700px;
            background-color: #fff;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            a{
                color:#1f2d3d;
            }
            a:hover{
                color:#208af5;
            }
            .infor-top{
                overflow: hidden;
                height: 32px;
                line-height: 32px;
                margin-bottom: 34px;
                .infor-cluster{
                    float: left;
                }
                .infor-close{
                    float: right;
                    cursor: pointer;
                }
            }
            .disdorm-bot{
                margin:18px 22px;
                .ddt-top{
                    margin-bottom: 24px;
                    .el-breadcrumb__item__inner{
                        color:#48576a;
                        i{color:#ef0000;}
                    }
                    .exp{
                        float: right;
                        .exporticon{
                            float: left;
                        }
                    }
                }
                .bgmain{
                    .el-card{
                        box-shadow: 0 0;
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
        .imgScript{
            display:inline-block;
            width:14px;
            height:14px;
            background: url('../../../assets/img/connet/script.png') no-repeat;
            background-position: -48px -44px;
            margin: 0 5px;
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

<style type="text/css" lang="scss" >
    .adumajor-deta{
        .disdorm-bot{
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
                    height: 230px;
                    overflow-y: auto;
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
</style>