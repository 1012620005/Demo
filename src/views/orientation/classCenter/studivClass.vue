<template>
	<div class="container">
		<fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					学生分班列表
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
		<!--主体模块-->
		<el-row :span="24" class="diviclass-main">
			<div class="diviclass-box">
				<div class="dividetails">
                    <el-form ref="form" :model="form" label-width="40px" :inline="true">
                        <el-form-item>{{form.campus}}</el-form-item>
                        <el-form-item>{{form.dept}}</el-form-item>
                        <el-form-item label="专业" class="formstate">
                            <el-select  @change="loadClazz" v-model="form.major" value-key="proid" placeholder="">
                                <el-option v-for="item in majors" :key="item.proid" :label="item.proname" :value="item">{{item.proname}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="班级" class="formstate">
                            <el-select v-model="form.class" placeholder="" value-key="clazzid" @change="loadStulist">
                                <el-option v-for="item in classes" :key="item.clazzid" :label="item.clazzname" :value="item">{{item.clazzname}}</el-option>
                            </el-select>
                        </el-form-item>
                        <a :href="exportExcelURL + form.class.clazzid" class="handle exp"><span class="imgScript exporticon handle"></span>导出</a>
                    </el-form>
                    <div class="divi-table">
                        <template>
                            <el-table :data="tableData" stripe style="width: 100%">
                                <el-table-column type="index" label="序号" width="180"></el-table-column>
                                <el-table-column prop="name" label="学生姓名" width="180"></el-table-column>
                                <el-table-column prop="sex" label="性别"></el-table-column>
                                <el-table-column prop="birthday" label="年龄"></el-table-column>
                                <el-table-column prop="score" label="分数"></el-table-column>
                                <el-table-column prop="oper" label="操作">
                                    <template slot-scope="scope">
                                        <span @click="viewDetail(scope.row)"  class="imgScript seeBtn"></span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div> 
				</div>
            </div>
		</el-row>
        <!--详情-->
        <el-dialog :visible.sync="showDivclass" class="stuClassdetail">
            <div slot="title" class="addclasses-cpm" >
                <p>详情</p>
            </div>
            <div class="studetail-main">
                <h4>基本信息</h4>
                <a :href="exportWordURL + user.id"><div @click="exportWord" class="handle stuexport"><span class="imgScript exporticon handle"></span>导出</div></a>
                <ul class="top-main">
                    <li><div><i>*</i>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</div><span class="thum">{{user.name}}</span></li>
                    <li><div><i>*</i>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div><span>{{user.sexname}}</span></li>
                    <li><div><i>*</i>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</div><span class="thum">{{user.nationname}}</span></li>
                    <li><div><i>*</i>身份证号：</div><span class="thum">{{user.idcard}}</span></li>
                    <li><div><i>*</i>联系电话：</div><span>{{user.phone}}</span></li>
                    <li><div><i>*</i>录取方式：</div><span>{{user.recruitname}}</span></li>
                    <li><div><i>*</i>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;制：</div><span>{{user.studyYearname}}</span></li>
                    <li><div><i>*</i>应届/往届：</div><span>{{user.freshname}}</span></li>
                    <li><div><i>*</i>毕业学校：</div><span class="thum">{{user.graduation}}</span></li>
                    <li><div>准考证号：</div><span class="thum">{{user.ticketNo}}</span></li>
                    <li><div>考&nbsp;&nbsp;生&nbsp;&nbsp;号：</div><span class="thum">{{user.examNo}}</span></li>
                    <li><div>考试总分：</div><span>{{user.score}}</span></li>
                    <li><div><i>*</i>政治面貌：</div><span>{{user.politicalStatusname}}</span></li>
                    <li><div><i>*</i>户口性质：</div><span>{{user.hk}}</span></li>
                </ul>
                <h4>家庭信息</h4>
                <ul>
                    <li class="info"><div><i>*</i>家长姓名：</div><span>{{user.father}}</span></li>
                    <li class="info"><div><i>*</i>联系电话：</div><span>{{user.fatherPhone}}</span></li>
                    <li class="infos"><div><i>*</i>家庭地址：</div><span>{{user.provincename}}{{user.cityname}}{{user.countyname}}{{user.address}}</span></li>
                </ul>
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
import fcHeader from '../../common/header.vue'
import api from '../../../apis/orientation/studivClass.js'

export default {
	data() {
      return {
		tableData: [],
        form:{
            campus:'',
            dept:'',
            major:'',
            class:'',
        },
        majors:[],
        classes:[],
        //导出班级excel
        exportExcelURL : '',
        exportWordURL : '',
        user:{
            name:'',
            sexname:'',
            nationname:'',
            idcard:'',
            phone:'',
            recruitname:'',
            studyYearname:'',
            freshname:'',
            graduation:'',
            ticketNo:'',
            examNo:'',
            score:'',
            politicalStatusname:'',
            hk:'',
            father:'',
            fatherPhone:'',
            provincename:'',
            cityname:'',
            countyname:'',
            address:''
        },
        showDivclass: false	
      }
	},
    components:{
        fcHeader
    },
    methods:{
        //加载班级下拉框
        loadClazz(prof){
            let params = {
                proid:prof.proid    
            }
            api.loadPro(params).then(response => {
                // var meta = response.data.meta;
                // var mydata = response.data.data;
                console.log(prof.name + "的班级：")
                console.log(response.data.data)
                this.classes = response.data.data.clazz;
                this.form.class = response.data.data.clazz[0]
            })
        },
        // 加载学生列表
        loadStulist(clazz){
            let params = {
                clazzid	:clazz.clazzid
            }
            api.findStuByClazz(params).then(response => {
                console.log(response)
                if(response.data.meta.code == 200){
                    this.tableData = response.data.data
                }
            });
        },
        viewDetail(stu){
            this.showDivclass = true;
            let stuInfo = {
                userid: stu.id
            }
            console.log(stuInfo)
            api.viewUserinfo(stuInfo).then(response =>{
                if(response.data.meta.code == 200){
                    this.user = response.data.data;
                    //console.log(response.data.data);
                }
            })
        },
        // excel(){
        //     let params = {
        //         clazzId	:this.form.class.clazzid
        //     }
        //     api.excelClazzInfo(params).then(response => {
                
        //     })
        // },
        exportWord(){
            let stuInfo = {
                useId : this.user.id
            }
            api.exportWordStuInfo(stuInfo).then(response =>{
            })
        },
        returnClick(){
            this.$router.push({
                name:'newIndex'
            })
        }
    },
    mounted () {
        // 一进页面加载班主任（判断是否有班级）
        api.currentUser().then(response => {
            var meta = response.data.meta;
            var mydata = response.data.data;
            if(meta.code == 200){
                this.form.campus = mydata.scoms.name;
                this.form.dept = mydata.dept.name;
                if(mydata.clazzList != null){
                    api.loadPro().then(response => {
                        var meta = response.data.meta;
                        var mydata = response.data.data;
                        if(meta.code == 200){
                            this.majors = mydata.pro;
                            this.form.major = mydata.pro[0]
                        }
                    });
                }
            }
        })
        this.exportExcelURL = api.excelClazzInfo();
        this.exportWordURL = api.exportWordStuInfo();
    }
}
</script>
<style type="text/css" lang="scss" scoped>
	body{
		font-size: 14px;
		color: #333;
    }
    
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
	// 主体模块
	.diviclass-main{
		width:1200px;
		margin: 0 auto;
		margin-top: 20px;
		// color:#333;
		font-size: 14px;
        a{
            color:#1f2d3d;
        }
        a:hover{
            color:#208af5;
        }
		.diviclass-box{
            width: 100%;
			min-height: 700px;
			background-color: #fff;
			border-radius: 6px;
			padding: 30px 0;
			margin-bottom: 30px;
			overflow: hidden;
			.dividetails{
                padding: 0 24px;
                .divi-table{
                    height:500px;
                    overflow: auto;
                }
                .el-form--inline .el-form-item{
                    margin-right: 30px;
                }
                .formstate{
                    .el-form-item__content{
                        width:128px;
                    }
                }
                .el-table__body-wrapper{
                    width: 101%;
                    height: 590px;
                    overflow-y: auto;
                }
				.crumb{
					margin-bottom: 26px;
					.el-breadcrumb__item__inner{
						color: #333333;
					}
				}
                .seeBtn{
                    cursor: pointer;
                    margin-top: 7px;
                }
                .exp{
                    display: inline-block;
                    float: right;
                    margin-top: 10px;
                    cursor: pointer;
                }
                .exporticon{
                    float: left;
                    margin-top: 2px;
                }
			}
        }
    }
    .stuClassdetail{
        a{
            color:#1f2d3d;
        }
        a:hover{
            color:#208af5;
        }
        .el-dialog--small{
            width: 60%;
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
        .studetail-main{
            h4{
                margin-bottom: 24px;
            }
            .top-main{
                margin-bottom: 20px;
                padding-bottom: 16px;
                border-bottom: 1px solid #d2d2d2;
            }
            ul{
                overflow: hidden;
                li{
                    float: left;
                    width: 33.3%;
                    margin-bottom: 14px;
                    height: 20px;
                    // overflow: hidden;
                    div{
                        width: 86px;
                        text-align: right;
                        display: inline-block;
                        float: left;
                        i{
                            color:#ef0000;
                        }
                    }
                    .thum{
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        width: 50%;
                    }
                    .thum:hover{
                        text-overflow:inherit; 
                        overflow: visible; 
                        white-space: pre-line; 
                    }
                    span{
                        display: inline-block;
                    }
                }
                .info{
                    width: 50%;
                }
                .infos{
                    width:100%;
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
    .stuClassdetail{
        .el-dialog__body{
            position: relative;
        }
        .studetail-main{
            .stuexport{
                position: absolute;
                top: 20px;
                right: 40px;
                cursor: pointer;
                .exporticon{
                    float: left;
                    margin-top: 2px;
                }
            }
        }
    }
</style>