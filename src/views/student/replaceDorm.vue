<template>
    <div class="container">
        <fc-header></fc-header>
        <!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					更换宿舍
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="replace-main">
            <el-col :span="24" class="replace-immob">
                <ul class="">
                    <li>
                        <i>姓名：</i>
                        <span>{{stuInfo.name}}</span>
                    </li>
                    <li>
                        <i>性别：</i>
                        <span>{{stuInfo.sexName}}</span>
                    </li>
                    <li>
                        <i>校区：</i>
                        <span>{{stuInfo.campusName}}</span>
                    </li>
                    <li>
                        <i>年级：</i>
                        <span>{{stuInfo.studyYear}}</span>
                    </li>
                    <li>
                        <i>院系：</i>
                        <span>{{stuInfo.deptName}}</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <i>专业：</i>
                        <span>{{stuInfo.profName}}</span>
                    </li>
                    <li>
                        <i>班级：</i>
                        <span>{{stuInfo.clazzName}}</span>
                    </li>
                    <li>
                        <i>辅导员：</i>
                        <span>{{stuInfo.clazzTeac}}</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <i>原宿舍楼：</i>
                        <span>{{stuInfo.dorm.buildName}}</span>
                    </li>
                    <li>
                        <i>原宿舍：</i>
                        <span>{{stuInfo.dorm.dormName}}</span>
                    </li>
                </ul>
                <div class="state-box">
                    <div v-if="stuInfo.state == '1'">
                        <img src="../../assets/img/orientation/daish.png" alt="">
                    </div>
                    <div v-else-if="stuInfo.state == '2'">
                        <img src="../../assets/img/orientation/throu.png" alt="">
                    </div>
                    <div v-else-if="stuInfo.state == '3'">
                        <img src="../../assets/img/orientation/nothrou.png" alt="">
                    </div>
                </div>
                <el-row :span="24" >
                    <el-form>
                        <el-col :span="6">
                            <el-form-item  label="新宿舍楼：">
                                <el-select v-if="this.stuInfo.state == ''" v-model="build" value-key="id"  @change="getFloorByBuildAndMR">
                                    <el-option v-for="build in buildList" :key="build.id" :label="build.name" :value="build">{{build.name}}</el-option>
                                </el-select>
                                <span v-else>{{build.name}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item  label="新楼层：">
                                <el-select v-if="this.stuInfo.state == ''" v-model="floor" placeholder="" @change="getDormBySexBuildFloorForChange">
                                    <el-option v-for="build in floorList" :key="build.floor" :label="build.floor" :value="build.floor">{{build.floor}}层</el-option>
                                </el-select>
                                <span v-else>{{floor}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="新宿舍号：" >
                                <el-select v-if="this.stuInfo.state == ''" v-model="dorm" value-key="id"  @change="getStuByDormAndClazz">
                                    <el-option v-for="dorm in dormList" :key="dorm.id" :label="dorm.name" :value="dorm">{{dorm.name}}</el-option>
                                </el-select>
                                <span v-else>{{dorm.name}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="更换人：">
                                <el-select v-if="this.stuInfo.state == ''" v-model="stu" value-key="stuId" placeholder="" :disabled="this.stuInfo.state != ''" @change="getStu">
                                    <el-option v-for="stu in stuList" :key="stu.stuId" :label="stu.stuName" :value="stu">{{stu.stuName}}</el-option>
                                </el-select>
                                <span v-else>{{stu.stuName}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" class="change-reason">
                            <el-form-item label="更换原因">
                                <el-input type="textarea" v-model="reason" class="change-height" placeholder="" :disabled="this.stuInfo.state != ''"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col v-if="this.stuInfo.state == ''">
                            <el-form-item  class="immed-create">
                                <el-button type="primary" @click="submitChangeDorm">提交</el-button>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    import fcHeader from '../common/header.vue'
    import api from '../../apis/replaceDorm.js'
    export default{
        data () {
           return {
                //下拉框
                build : {
                    id : '',
                    name : ''
                },
                floor : '',
                dorm : {
                    id : '',
                    name : ''
                },
                stu : {
                    stuId : '',
                    stuName : ''
                },
                buildList : [],
                floorList : [],
                dormList : [],
                stuList : [],
                reason : '',

                //保存用户的基本信息
                stuInfo : {
                    id : '',
                    name : '',
                    sexId : '',
                    sexName : '',
                    studyYear : '',
                    campusName : '',
                    deptId : '',
                    deptName : '',
                    profId : '',
                    profName : '',
                    clazzId : '',
                    clazzName : '',
                    clazzTeac : '',
                    build : '',
                    floor : {
                        floor : ''
                    },
                    dorm : {
                        id : '',
                        dormName : '',
                        buildName : ''
                    },
                    state:''
                }
            }
        },
        components:{
			fcHeader
		},
        methods:{
            //获取楼层
            getFloorByBuildAndMR(build){
                if(this.stuInfo.state != ''){
                    return;
                }
                this.floor = ''
                this.dorm = {
                    id : '',
                    name : ''
                }
                this.stu = {
                    stuId : '',
                    stuName : ''
                }
                var params = {
                    mainRelation : this.stuInfo.clazzId,
                    buildId : build.id,
                    sex : this.stuInfo.sexId
                }
                api.getFloorByBuildAndMR(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200') {
                        this.floorList = mydata;
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            //通过楼层加载宿舍  getDormBySexBuildFloor
            getDormBySexBuildFloorForChange(){
                if(this.floor == null || this.floor == '' || this.stuInfo.state != ''){
                    return;
                } else {
                    this.dorm = {
                        id : '',
                        name : ''
                    }
                    this.stu = {
                        stuId : '',
                        stuName : ''
                    }
                    var params = {
                        mainRelation : this.stuInfo.clazzId,
                        buildId : this.build.id,
                        floor : this.floor
                    }
                    api.getDormByOfficeBuildFloor(params).then(response =>{
                        var meta = response.data.meta
                        var mydata = response.data.data;
                        if(meta.code == '200') {
                            this.dormList = mydata
                        }else{
                            this.$message.error(meta.message);
                        }  
                    });
                }
            },
            //通过班级和宿舍加载学生
            getStuByDormAndClazz(dorm){
                if(dorm.id == null || dorm.id == '' || this.stuInfo.state != ''){
                    return;
                }
                this.stu = {
                    stuId : '',
                    stuName : ''
                }
                var clazzId = this.stuInfo.clazzId;
                api.getStuByDormAndClazz(dorm.id,clazzId).then(response =>{
                     var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.stuList = mydata;
                    }   
                })
            },
            getStu(stu){
            },
            //提交更改宿舍
            submitChangeDorm(){
                var changeDorm = {
                    profId : this.stuInfo.profId,
                    profName : this.stuInfo.profName,	
                    clazzId : this.stuInfo.clazzId,
                    clazzName :	this.stuInfo.clazzName,	
                    oldDormId :	this.stuInfo.dorm.id,	
                    oldDormName : this.stuInfo.dorm.dormName,		
                    newDormId :	this.dorm.id,	
                    newDormName : this.dorm.name,		
                    stuId :	this.stuInfo.id,	
                    stuName : this.stuInfo.name,
                    sex : this.stuInfo.sexId,		
                    idStu :	this.stu.stuId,
                    nameStu : this.stu.stuName,
                    reason : this.reason,
                    state : 1		
                }
                console.log(changeDorm)
                // changeDorm = {changeDorm : JSON.stringify(changeDorm)};
                var qs = require('querystring')
                var data = qs.stringify(changeDorm);
                api.saveChangeDorm(data).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200' && mydata != null) {
                        this.$router.push({
                            name : 'newStudent'
                        })
                    }
                })
            },
            returnClick(){
                this.$router.push({
                    name:'newStudent'
                })
            }
        },
        computed:{
        },
        mounted () {
            //加载当前学生的信息
            api.getCurrentUser().then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if (meta.code == '200') {
                    this.stuInfo.id = mydata.id;
                    this.stuInfo.name = mydata.name;
                    this.stuInfo.sexId = mydata.sex;
                    this.stuInfo.sexName = mydata.sexname;
                    this.stuInfo.studyYear = mydata.year,
                    this.stuInfo.campusName = mydata.scoms
                    this.stuInfo.deptId = mydata.deptid;
                    this.stuInfo.deptName = mydata.dept
                    this.stuInfo.profId = mydata.proid;
                    this.stuInfo.profName = mydata.pro
                    this.stuInfo.clazzId = mydata.clazz.clazzid;
                    this.stuInfo.clazzName = mydata.clazz.clazzname
                }                    
            }).then(response =>{
                //加载当前学生的班主任信息
                var clazz = {
                    stuid : this.stuInfo.id
                }
                api.getClazzByStuid(clazz).then(response =>{
                    var meta = response.data.meta 
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        console.log("teac")
                        console.log(mydata)
                        this.stuInfo.clazzTeac = mydata.teaname;
                    }
                })
                //获取当前宿舍信息 
                api.getStuChangeDorm().then(response =>{
                    var meta = response.data.meta 
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.stuInfo.dorm.dormName = mydata.stuDorm.dormName;
                        this.stuInfo.dorm.id = mydata.stuDorm.dormId;
                        this.stuInfo.dorm.buildName = mydata.stuDorm.buildName;
                        //判断一下学生是否提交了申请
                        //需要注意  changeDorm  可能是空的
                        if(mydata.changeDorm != null){
                            this.stuInfo.state = mydata.changeDorm.state;
                            this.build = {
                                id : mydata.changeDorm.buildId,
                                name : mydata.changeDorm.buildName
                            }
                            this.floor = mydata.changeDorm.floor;
                            this.dorm = {
                                id : mydata.changeDorm.newDormId,
                                name : mydata.changeDorm.newDormName
                            }
                            this.stu = {
                                stuId : mydata.changeDorm.idStu,
                                stuName : mydata.changeDorm.nameStu
                            }
                            this.reason = mydata.changeDorm.reason;
                        }else{
                            //通过性别获取宿舍楼信息
                            var params = {
                                mainRelation : this.stuInfo.clazzId,
                                sex : this.stuInfo.sexId
                            }
                            api.getBuildInfoBySex(params).then(response =>{
                                var meta = response.data.meta
                                var mydata = response.data.data;
                                if (meta.code == '200') {
                                    this.buildList = mydata;
                                    console.log("haha")
                                }        
                            })
                        }
                    }
                }) 
            });
            
            
        }
    }
</script>
    
<style type="text/css" lang="scss" scoped>
    .container{
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
				}
				.tabright{
					float: right;
					height: 15px;
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
        .replace-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 30px 44px;
            overflow: hidden;
            position: relative;
            .replace-immob{
                ul{
                    overflow: hidden;
                    margin-bottom: 38px;
                    li{
                        // width: 15%;
                        float: left;
                        margin-right:40px;
                        i{
                            font-style: normal;
                            margin-right: 8px;
                        }
                    }
                }
                .el-select{
                    width: 54%;
                }
                .change-reason{
                    .change-height{
                        textarea{
                            height: 150px;
                            background-color: #f5f5f5;
                        }
                    }
                }
                .immed-create{
                    width: 210px;
                    height: 42px;
                    margin: 0 auto;
                    button{
                         width: 210px;
                         height: 42px;
                    }
                }
                .state-box{
                    position: absolute;
                    top: 10px;
                    right:20px;
                }
            }
        }
    }
</style>
<style type="text/css" lang="scss">
    .container{
        .replace-main{
            .change-reason{
                .change-height{
                    textarea{
                        height: 150px;
                        background-color: #f5f5f5;
                    }
                }
            }
        }
    }
</style>

