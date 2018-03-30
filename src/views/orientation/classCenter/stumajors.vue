<template>
    <div class="container">
        <fc-header></fc-header>
        <!--学生更换专业-->
        <!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					更换专业
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="stumajor-main">
            <div class="accordinfo">
                <ul>
                    <li>
                        <ul>
                            <li>姓名：<span>{{user.name}}</span></li>
                            <li>性别：<span>{{user.sex}}</span></li>
                            <li>校区：<span>{{user.orcampus}}</span></li>
                            <!-- <li>学制：<span>{{user.systme}}</span></li> -->
                            <li>辅导员：<span>{{user.orcounselor}}</span></li>
                            <!-- <li>宿舍楼：<span>{{user.build}}</span><i>{{user.room}}</i></li> -->
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li>原院系：<span>{{user.ordepart}}</span></li>
                            <li>原专业：<span>{{user.ormajor}}</span></li>
                            <li>原班级：<span>{{user.orclass}}</span></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="state-box">
                <div v-if="user.state == 1">
                    <img src="../../../assets/img/orientation/daish.png" alt="">
                </div>
                <div v-if="user.state == 2">
                    <img src="../../../assets/img/orientation/throu.png" alt="">
                </div>
                <div v-if="user.state == 3">
                    <img src="../../../assets/img/orientation/nothrou.png" alt="">
                </div>
            </div>
            <el-form ref="form" :model="form"  class="formstumaj">
                <el-form-item label="新校区：">
                    <el-select v-if="this.flag == false" v-model="form.newcampus" placeholder="" clearable  value-key="id" :disabled="user.state !== null?true:false"  @change="campus(form.newcampus,'2')">
                        <el-option v-for="item in campuses" :key="item.id" :label="item.name"  :value="item">{{item.name}}</el-option>
                    </el-select>
                    <span>{{users.campus}}</span>
                </el-form-item>
                <el-form-item label="新院系：">
                    <el-select v-if="this.flag == false" v-model="form.newdepart" placeholder="" value-key="id" :disabled="user.state !== null?true:false" @change="campus(form.newdepart,'3')">
                        <el-option v-for="item in departs" :key="item.id" :label="item.name"  :value="item">{{item.name}}</el-option>
                    </el-select>
                    <span>{{users.depart}}</span>
                </el-form-item>
                <el-form-item label="新专业：">
                    <el-select v-if="this.flag == false" v-model="form.newmajors" placeholder="" value-key="id" :disabled="user.state !== null?true:false"  @change="loadClass">
                        <el-option v-for="item in majorses" :key="item.id" :label="item.name"  :value="item">{{item.name}}</el-option>
                    </el-select>
                    <span>{{users.majors}}</span>
                </el-form-item>
                <el-form-item label="新班级：">
                    <el-select v-if="this.flag == false" v-model="form.newclass" value-key="clazzid" placeholder=""  :disabled="user.state !== null?true:false" @change="loadTeach">
                        <el-option v-for="item in classes" :key="item.clazzid" :label="item.clazzname"  :value="item">{{item.clazzname}}</el-option>
                    </el-select>
                    <span>{{users.class}}</span>
                </el-form-item>
                <el-form-item class="assis">
                    辅导员：<span>{{user.teachname}}</span>
                </el-form-item>
                <el-form-item label="更改原因：" class="chareason">
                    <el-input type="textarea" :rows="2" placeholder="" v-model="textarea"  :disabled="user.state !== null?true:false"></el-input>
                </el-form-item>
            </el-form>
            <div class="rebtn" v-if="user.state == null">
                <el-button type="primary" class="refer" @click="submit()">提交</el-button>
            </div>
        </el-row>
        
    </div>
</template>
<script type="text/javascript">
import fcHeader from '../../common/header.vue'
import api from '../../../apis/orientation/stumajors.js'

export default {
    data(){
        return{
            form: {
                newcampus: {
                    id : '',
                    name : ''
                },
                newdepart: {
                    id : '',
                    name : ''
                },
                newmajors: {
                    id : '',
                    name : ''
                },
                newclass: {
                    clazzid : '',
                    clazzname : ''
                },
            },
            campuses:[],
            // orcampusId:[],
            departs:[],
            // ordepartsId:[],
            majorses:[],
            classes:[],
            stuId:[],
            // ormajorId:[],
            // orclassId:[],
            input2: '',
            textarea: '',
            user:{
                stuId:'',
                name:'',
                sex:'',
                orcampus:'',
                systme:'',
                orcounselor:'',
                build:'',
                room:'',
                ordepart:'',
                ormajor:'',
                orclass:'',
                orcampusId:'',
                ordepartId:'',
                ormajorId:'',
                orclassId:'',
                state:null,
                teachname:'',
                gradeid:'',
                gradename:''
            },
            users:{
                campus:'',
                depart:'',
                majors:'',
                class:''
            },
            flag:false,
            // submits:true
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handleIconClick(ev) {
            console.log(ev);
        },
        // 加载校区
        campus(item, type, flag){
            let tables = {
                id: item.id,
                type: type
            }
            api.loadSelect(tables).then(response => {
                console.log(response.data.data);
                // console.log(response);
                if(response.data.meta.code == 200){
                    if(type =='2'){
                        this.departs = response.data.data;
                        console.log(this.form.newdepart)
                        if (!this.flag) {
                            this.form.newdepart = '';
                            this.form.newmajors = '';   //专业
                            this.majorses = [];
                        }
                        console.log(this.form.newdepart)
                        
                    }else if(type =='3'){
                        this.majorses = response.data.data;
                        if (!this.flag) {
                            this.form.newmajors = '';   //专业
                        }
                    }else if(type=='4'){
                        this.campuses = response.data.data;
                    }
                }
            });
        },
        // 通过专业加载班级
        loadClass(){
            this.form.newclass = {
                clazzid:'',
                clazzname:''
            }
            this.user.teachname = ''
            let yea = {
                proid: this.form.newmajors.id
            }
            api.findClazzByPro(yea).then(response => {
                if(response.data.meta.code == 200){
                    this.classes = response.data.data;
                }
            });
        },
        // 根据班级获取辅导员
        loadTeach(){
            let clazzid = {
                id: this.form.newclass.clazzid
            }
            api.getTeach(clazzid).then(response => {
                if(response.data.meta.code == 200){
                    if(response.data.data !== null){
                        this.user.teachname = response.data.data.teaname
                        this.user.gradename = response.data.data.gradename
                        this.user.gradeid = response.data.data.gradeid
                    }
                }
            })
        },
        // 点击提交
        submit(){
            var changeCPDM = {
                stuId : this.user.stuId,   //学生id
                stuName : this.user.name,    //学生姓名
                sex : this.user.sex,      //性别
                oldCampusId : this.user.orcampusId,   //旧校区id
                oldCampusName : this.user.orcampus,     //旧校区名
                newCampusId : this.form.newcampus.id,      //新校区id
                newCampusName : this.form.newcampus.name,   //新校区名
                oldDeptId : this.user.ordepartId,      //旧院系id
                oldDeptName : this.user.ordepart,    //旧院系名
                newDeptId : this.form.newdepart.id,      //新院系id
                newDeptName : this.form.newdepart.name,    //新院系名
                oldProfId : this.user.ormajorId ,       //旧专业id
                oldProfName : this.user.ormajor,    //旧专业名
                newProfId : this.form.newmajors.id,      //新专业id
                newProfName : this.form.newmajors.name,    //新专业名
                oldClazzId : this.user.orclassId,     //旧班级id
                oldClazzName : this.user.orclass,   //旧班级名
                newClazzId : this.form.newclass.clazzid,     //新班级id
                newClazzName : this.form.newclass.clazzname,    //新班级名
                reason : this.textarea,
                gradeId : this.user.gradeid,//专业id
                gradeName : this.user.gradename //专业名
            }
            console.log('popopo')
            console.log(changeCPDM);
            // var data = {'changeCPDM':JSON.stringify(changeCPDM)}
            var qs = require('querystring')
            var data = qs.stringify(changeCPDM)
            // console.log(data);
            // console.log(data)
            api.applyChangeCPDM(data).then(response => {
                var meta = response.data.meta;
                var mydata = response.data.data;
                if(meta.code == 200){
                    // this.changeCPDM = mydata;
                    this.loadState();
                }
            });
            // this.returnClick();
        },
        // 加载审核状态
        loadState(){
            var stu = {
                stuId : this.user.stuId
            }
            api.getStuInfo(stu).then(response =>{
                var meta = response.data.meta;
                var mydata = response.data.data;
                console.log('pppp')
                console.log(response)
                if(meta.code == 200 && mydata !== null){
                    this.flag = true;
                    // this.form.newcampus = {
                    //     id : mydata.newCampusId,
                    //     name : mydata.newCampusName
                    // }
                    // this.form.newdepart = {
                    //     id : mydata.newDeptId,
                    //     name : mydata.newDeptName
                    // }
                    // this.form.newmajors = {
                    //     id : mydata.newProfId,
                    //     name : mydata.newProfName
                    // }
                    // this.form.newclass = {
                    //     clazzid : mydata.newClazzId,
                    //     clazzname : mydata.newClazzName
                    // }
                    this.users.campus = mydata.newCampusName
                    this.users.depart = mydata.newDeptName
                    this.users.majors = mydata.newProfName
                    this.users.class = mydata.newClazzName
                    console.log('aaabbb')
                    console.log(this.form.newclass)
                    // this.form.newcampus.name = mydata.newCampusName
                    // this.form.newcampus.id = mydata.newCampusId
                    // this.form.newdepart.name = mydata.newDeptName
                    // this.form.newdepart.id = mydata.newDeptId
                    // this.form.newmajors.name = mydata.newProfName
                    // this.form.newmajors.id = mydata.newProfId
                    // this.form.newclass.clazzname = mydata.newClazzName
                    // this.form.newclass.clazzid = mydata.newClazzId
                    // this.user.teachname = mydata.newClazzName
                    this.textarea = mydata.reason
                    console.log('cccddd')
                    console.log(this.form.newclass)
                    if(mydata.against == 1){
                        this.user.state = mydata.against;
                    }else if(mydata.against == 2){
                        this.user.state = mydata.against;
                    }else{
                        this.user.state = mydata.against;
                    }
                }
            })
        },
        returnClick(){
            this.$router.push({
                name:'newStudent'
            })
        }
    },
    components:{
		fcHeader
    },
    mounted(){
        api.getCurrentUser().then(response => {
            var meta = response.data.meta;
            var mydata = response.data.data;
            if(meta.code == 200){
                this.user.name = mydata.name;
                this.user.stuId = mydata.id;
                this.user.sex = mydata.sex == '1'? '男' : '女';
                this.user.orcampus = mydata.scoms.name;
                this.user.orcampusId = mydata.scoms.id;
                this.user.ordepartId = mydata.dept.id;
                this.user.ormajorId = mydata.pro.id;
                // this.user.systme = mydata.studyYearName; //学制
                // this.user.orcounselor = mydata.  //辅导员
                // this.user.build = mydata.  //宿舍楼
                // this.user.room = mydata.  //房间号
                this.user.ordepart = mydata.dept.name;  
                this.user.ormajor = mydata.pro.name;
                if(mydata.clazzList != null && mydata.clazzList.length>0){
                    this.user.orclass = mydata.clazzList[0].clazzname;  
                    this.user.orclassId = mydata.clazzList[0].clazzid;
                    console.log(this.user.orclassId)
                    let params = {
                        id : this.user.orclassId
                    }
                    var _this = this
                    api.getTeach(params).then(response => {
                        console.log(response)
                        console.log('lakgjak')
                        if(response.data.meta.code == 200){
                            _this.user.orcounselor = response.data.data.teaname
                        }
                    })
                }
                this.loadState();
            }
        });
        this.campus({id : '1',name : ''}, 4);
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
    .stumajor-main{
        width:1200px;
        margin: 0 auto;
		margin-top: 20px;
        min-height: 740px;
        background-color: #fff;
        padding: 18px 22px;
        // overflow: hidden;
        border-radius: 4px;
        position: relative;
        .accordinfo{
            margin-bottom: 55px;
            ul{
                li{
                    ul{
                        overflow: hidden;
                        margin-bottom: 34px;
                        li{
                            float: left;
                            margin-right: 74px;
                            span{
                                display: inline-block;
                                margin-left: 8px;
                            }
                            i{
                                display: inline-block;
                                margin-left: 16px;
                            }
                        }
                    }
                }
            }
        }
        .state-box{
            position: absolute;
            top: 10px;
            right: 20px;
        }
        .formstumaj{
            overflow: hidden;
            .el-form-item{
                float: left;
                margin-right: 22px;
                width: 18%;
                // .el-form-item__label{
                //     text-align: left;
                //     width: 50px !important;
                //     padding-right: 0;
                // }
                // .el-form-item__content{
                //     margin-left: 50px !important;
                // }
            }
            
        }
        .rebtn{
            text-align: center;
            width:100%;
            margin-top: 16px;
            .refer{
                width: 210px;
                height: 42px;
            }
        }
    }
</style>
<style type="text/css" lang="scss">
    .stumajor-main{
        .formstumaj{
            .el-form-item__label{
                width: 69px;
            }
            .el-form-item__content{
                margin-left:69px;
            }
            .chareason{
                width: 100% !important;
                margin-top: 16px;
                textarea{
                    width: 100%;
                    height: 150px;
                    background-color: #f5f5f5;
                }
                .el-form-item__label{
                    width: 82px !important;
                }
                .el-form-item__content{
                    margin-left:82px !important;
                }
            }
        }
    }
</style>


