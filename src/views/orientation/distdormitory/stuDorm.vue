<template>
	<div class="contanier">
		<fc-header></fc-header>
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
                    学生宿舍分配
                </div>
                <div class="tabright" @click="returnClick">
                    <span>返回</span>
                    <i><img src="../../../assets/researchCenter/return.png" alt=""></i>
                </div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="studorm-main">
            <el-col :span="12" class="studorm-right">
                <div class="coldr-top">
                    <el-breadcrumb separator="">
                        <el-breadcrumb-item :to="{ path: '/' }" class="hbold">{{pageInfo.campus.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item class="hbold">{{pageInfo.dept.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item class="hbold">{{pageInfo.prof.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item class="hbold">{{pageInfo.clazz.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item>男生：<i>{{pageInfo.boy.length}}</i>人</el-breadcrumb-item>
                        <el-breadcrumb-item>女生：<i>{{pageInfo.girl.length}}</i>人</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="stu-boy">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;"><img src="../../../assets/img/orientation/boy.png" alt=""></span>
                            <span>未分配</span>
                            <span><i>{{pageInfo.boyCount}}</i>人</span>
                        </div>
                        <div class="text item">
                            <template>
                                <el-checkbox-group v-model="checkGroupBoy" value-key="id" @change="handleCheckedBoyChange">
                                    <el-checkbox v-for="item in pageInfo.boy" :label="item" :key="item.id" :value="item" :disabled="item.dormId !=''">{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                                <el-checkbox :indeterminate="isIndeterminateBoy" v-model="checkAllBoy" @change="handleCheckAllBoyChange" class="future">全选</el-checkbox>
                            </template>
                        </div>
                    </el-card>
                </div>
                <div class="stu-girl">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="line-height: 36px;"><img src="../../../assets/img/orientation/girl.png" alt=""></span>
                            <span>未分配</span>
                            <span><i>{{pageInfo.girlCount}}</i>人</span>
                        </div>
                        <div class="text item">
                            <template>
                                <el-checkbox-group v-model="checkGroupGirl" value-key="id" @change="handleCheckedGirlChange">
                                    <el-checkbox v-for="item in pageInfo.girl" :label="item" :key="item.id" :value="item" :disabled="item.dormId !=''">{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                                <el-checkbox :indeterminate="isIndeterminateGirl" v-model="checkAllGirl" @change="handleCheckAllGirlChange" class="future">全选</el-checkbox>
                            </template>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="12" class="studorm-left">
                <el-form :inline="true" class="demo-form-inline">
                    <div class="comflo">
                        <h4>{{pageInfo.campus.name}}</h4>
                    </div>
                    <el-form-item label="性别" class="itemwidth">
                        <el-select v-model="select_Info.sex" placeholder="" @change="getBuildInfoBySex">
                            <el-option v-for="sex in pageInfo.sexDictList" :key="sex.value" :label="sex.label" :value="sex.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="楼号">
                        <el-select v-model="select_Info.build"  placeholder="" value-key="id" @change="getFloorByBuildAndMR">
                            <el-option v-for="item in select_Info.buildList" :key="item.id" :label="item.name" :value="item">{{item.name}}层</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="楼层" class="itemwidth">
                        <el-select v-model="select_Info.floor" placeholder="" @change="getDormBySexBuildFloor">
                            <el-option v-for="item in select_Info.floorList" :key="item.floor" :label="item.floor" :value="item.floor"></el-option>
                        </el-select>
                    </el-form-item>
                    <div  class="comrig">
                        剩余床位：<i>{{select_Info.residueBedCount}}</i>
                    </div>
                </el-form>
                <div class="stu-box">
                    <ul class="bed-main">
                        <li class="stu-bed" v-for="(dorm,index) in select_Info.dormList">
                            <template>
                                <div class="stutop">
                                    {{dorm.name}}<span class="sycw">余</span>
                                    <i>
                                        <!-- <el-checkbox :indeterminate="isShow[index]" v-model="bedsAll[index]" @change="handlebedsAll">全选</el-checkbox> -->
                                    </i>
                                </div>
                                <div class="albeds">
                                    <el-checkbox-group v-model="checkedBeds[index]" value-id="bed.id" @change="handleBedsChange(checkedBeds[index],dorm.bedList,index)">
                                        <el-checkbox v-for="bed in dorm.bedList" :label="bed" :key="bed.id" :value="bed" :disabled="bed.id == '' || bed.stuName == null">
                                            <div v-if="bed.id != ''" class="bedsimg">
                                                <img src="../../../assets/img/orientation/beds.png" alt="">
                                                <!-- <img src="../../../assets/img/orientation/bedgray.png" alt=""> -->
                                            </div>
                                            <div v-if="bed.id != ''" class="stubednames">{{bed.stuName}}</div>
                                            <div v-if="bed.id == ''" class="bedsimg">
                                                <img src="../../../assets/img/orientation/bedgray.png" alt="">
                                            </div>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div class="hover-chose">
                                    <span class="addded">
                                        <img src="../../../assets/img/orientation/addy.png" alt="" @click="addStuToDorm(dorm)">
                                        <!-- <img src="../../../assets/img/orientation/addg.png" alt=""> -->
                                    </span>
                                    <span class="remded">
                                        <img src="../../../assets/img/orientation/rem.png" alt="" @click="deleteDistrdom(dorm,index)">
                                        <!-- <img src="../../../assets/img/orientation/remg.png" alt=""> -->
                                    </span>
                                </div>
                            </template>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="24" class="stubton">
                <el-button type="primary" @click="submitStuDormTotal">提交</el-button>
            </el-col>
        </el-row>
	</div>
</template>
<script type="text/javascript">
    import fcHeader from '../../common/header.vue'
    import api from '../../../apis/orientation/distdormitory/stuDorm.js'

	export default {
		data () {
			return {
                pageInfo : {
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
                    clazz : {
                        id : '',
                        name : ''
                    },
                    boyCount : 0,
                    girlCount : 0,
                    sexDictList : [],
                    boy : [],
                    //用来统计右侧的数组个数
                    boyDormCount : 0,
                    girl : [],
                    girlDormCount : 0,
                },
                select_Info : {
                    //选中信息
                    sex : '',
                    build : {
                        id : '',
                        name : ''
                    },
                    floor : '',
                    bedNums : '',
                    //下拉框信息
                    buildList : [],
                    dormList : [],
                    //保存选中的宿舍楼
                    floorList : [],
                    //剩余床位总数
                    residueBedCount : ''
                },
                bedNums : '',

                checkGroupBoy : [],
                isIndeterminateBoy: false,
                checkAllBoy: false,
                
                checkGroupGirl : [],
                checkAllGirl: false,
                isIndeterminateGirl: false,
                // 右侧
                bedsAll: [],
                checkedBeds: [],
                isShow: []

            }
		},
		components:{
			fcHeader
		},
        methods:{
            //男生多选
            handleCheckedBoyChange(value){
                let checkedCount = value.length;
                this.checkAllBoy = checkedCount === this.pageInfo.boy.length;
                this.isIndeterminateBoy = checkedCount > 0 && checkedCount < this.pageInfo.boy.length;
            },
            handleCheckAllBoyChange(event) {
                this.checkGroupBoy = event.target.checked ? this.pageInfo.boy : [];
                this.isIndeterminateBoy = false;
            },

            //女生多选
            handleCheckedGirlChange(value){
                let checkedCount = value.length;
                this.checkAllGirl = checkedCount === this.pageInfo.girl.length;
                this.isIndeterminateGirl = checkedCount > 0 && checkedCount < this.pageInfo.girl.length;
            },
            handleCheckAllGirlChange(event) {
                this.checkGroupGirl = event.target.checked ? this.pageInfo.girl : [];
                console.log(this.checkGroupGirl)
                this.isIndeterminateGirl = false;
            },


            handleCheckedCitiesChange(value) {// bedsOptions
                let checkedCount = value.length;
                this.checkAllGirl = checkedCount === this.checkGroupBoy.length;
                this.isIndeterminateGirl = checkedCount > 0 && checkedCount < this.checkGroupBoy.length;
            },
            //右侧多选
            handleBedsChange(value,dormList,index) {
                let checkedBed = value.length;
                this.bedsAll[index] = checkedBed === dormList.length;
                this.isShow[index] = checkedBed > 0 && checkedBed < dormList.length;
            },
            // 右侧
            handlebedsAll(event) {
                this.checkedBeds = event.target.checked ? null : [];
                this.isShow = false;
            },
            //获取宿舍楼下拉框
            getBuildInfoBySex(){
                this.select_Info.build = {
                    id : '',
                    name : ''
                };
                this.select_Info.floor = '';

                //通过性别加载宿舍楼
                var params = {
                    mainRelation : this.pageInfo.clazz.id,
                    sex : this.select_Info.sex
                }
                api.getBuildInfoBySex(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200') {
                        this.select_Info.buildList = mydata;
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            //通过宿舍楼获取楼层去重信息
            getFloorByBuildAndMR(){
                if(this.select_Info.build.id == '')
                    return ;
                //清空楼层床位下拉框
                this.select_Info.floor = '';
                var params = {
                    mainRelation : this.pageInfo.clazz.id,
                    buildId : this.select_Info.build.id,
                    sex : this.select_Info.sex
                }
                api.getFloorByBuildAndMR(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200') {
                        console.log(mydata)
                        this.select_Info.floorList = mydata;
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            //通过宿舍楼，楼层获取宿舍信息
            getDormBySexBuildFloor(){
                if(this.select_Info.floor == '')
                    return;
                var params = {
                    mainRelation : this.pageInfo.clazz.id,
                    buildId : this.select_Info.build.id,
                    floor : this.select_Info.floor
                }
                api.getDormBySexBuildFloor(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200') {
                        this.checkedBeds = new Array(mydata.dormitorieList.length);
                        this.bedsAll = new Array(mydata.dormitorieList.length);
                        this.isShow = new Array(mydata.dormitorieList.length);
                        for(var i = 0; i < mydata.dormitorieList.length; i++){
                            this.checkedBeds[i] = new Array();
                            var dorm = mydata.dormitorieList[i];
                            dorm.bedList = [];
                            //处理可以使用的床位
                            var useBedCount = 0;
                            for(var j = 0; j < dorm.totalBed; j++){//
                                if(dorm.stuDormList.length > j){
                                    dorm.bedList.push(dorm.stuDormList[j]);
                                    continue;
                                }
                                if(dorm.useBed > useBedCount){
                                    dorm.bedList.push({ id : '空余床位'})
                                    useBedCount++;
                                }else
                                    dorm.bedList.push({ id : ''})
                            }
                        }
                        this.select_Info.dormList = mydata.dormitorieList;
                        this.select_Info.residueBedCount = mydata.residueBedCount;
                        
                    }else{
                        this.$message.error(meta.message);
                    }  
                });
            },//选择几人间
            addStuToDorm(item){
                //清空左侧多选，全选框
                this.checkAllBoy = false
                this.isIndeterminateBoy = false
                this.checkAllGirl = false
                this.isIndeterminateGirl = false
                if(item.useBed <= 0){
                    return;
                }
                var stuList = [];
                var stringList = [];
                if(this.select_Info.sex == '1')//男生
                    stuList = this.checkGroupBoy
                else
                    stuList = this.checkGroupGirl
                for(var i = 0; i < stuList.length; i++){
                    //没有宿舍可以分配
                    if(item.useBed <= 0){
                        break;
                    }
                    var stu = stuList[i];
                    //判断这个人是否分宿舍了
                    if(stu.dormId != '')
                        continue;
                    //减少宿舍的数量
                    item.useBed--;
                    //将左侧的人处理掉
                    if(this.select_Info.sex == '1')
                        this.pageInfo.boyCount--;
                    else
                        this.pageInfo.girlCount--;
                    this.select_Info.residueBedCount--;
                    stu.dormId = item.id;
                    var string = {
                        campusId : this.pageInfo.campus.id,
                        campusName : this.pageInfo.campus.name,
                        deptId : this.pageInfo.dept.id,
                        deptName : this.pageInfo.dept.name,
                        profId : this.pageInfo.prof.id,
                        profName : this.pageInfo.prof.name,
                        stuId : stu.id,
                        stuName : stu.name,
                        dormId : item.id,
                        clazzId : this.pageInfo.clazz.id,
                        clazzName : this.pageInfo.clazz.name,
                        sex : this.select_Info.sex
                    };      
                    stringList.push(string);
                }
                //清空添加数组
                if(this.select_Info.sex == '1')//男生
                    this.checkGroupBoy = [];
                else
                    this.checkGroupGirl = [];
                var data = {stringList : JSON.stringify(stringList)};
                var qs = require('querystring')
                data = qs.stringify(data);
                api.addDistrdom(data).then(response =>{
                    var meta = response.data.meta;
                    var mydata = response.data.data;
                    if(meta.code == '200'){
                        var loc = 0;
                        for(var j = 0; j < item.bedList.length; j++){
                            var bed = item.bedList[j];
                            if(bed.id == '空余床位'){
                                loc = j;
                                break;
                            }
                        }
                        for(var i = 0; i < mydata.length; i++){
                            var stu = mydata[i];
                            item.bedList.splice(loc,1,stu);
                            loc++;
                        }
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            deleteDistrdom(item,index){
                var stringList = [];
                for(var i = 0; i < this.checkedBeds[index].length; i++){
                    var stu = this.checkedBeds[index][i];
                    var string = { id : stu.id};
                    stringList.push(string)
                    //从左侧学生列表中删除该学生的dormId字段,增加未分配的总人数
                    if(this.select_Info.sex == '1')
                        this.pageInfo.boyCount++;
                    else
                        this.pageInfo.girlCount++;
                    if(this.select_Info.sex == '1'){//男生
                        for(var j = 0; j < this.pageInfo.boy.length; j++){
                            var s = this.pageInfo.boy[j];
                            if(s.id == stu.stuId){
                                s.dormId = '';
                                break;
                            }
                        }
                    }
                    else{
                        for(var j = 0; j < this.pageInfo.girl.length; j++){
                            var s = this.pageInfo.girl[j];
                            if(s.id == stu.stuId){
                                s.dormId = '';
                                break;
                            }
                        }
                    }
                }
                var data = {stringList : JSON.stringify(stringList),
                            distrId : item.id}
                var qs = require('querystring')
                data = qs.stringify(data)
                api.deleteDistrdom(data).then(response =>{
                    var meta = response.data.meta;
                    var mydata = response.data.data;
                    if(meta.code = '200'){
                    }else{
                        this.$message.error(meta.message);
                    }
                    this.getDormBySexBuildFloor();
                })
            },
            //保存分班记录
            submitStuDormTotal(){
                //如果男生，女生剩余人数为0
                if(this.pageInfo.boyCount != 0 || this.pageInfo.girlCount != 0){
                    this.$message.error("还有学生没有分配宿舍");
                    return;
                }
                var params = {
                    mainRelation : this.pageInfo.clazz.id
                }
                api.submitStuDormTotal(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.$router.push({
                            name:'auddormClass'
                        })
                    }else{
                        this.$message.error(meta.message);
                    } 
                })
            },
            returnClick(){
                this.$router.push({
                    name:'auddormClass'
                })
            }
        },
        computed:{
        
        },
        mounted () {
            var params = {
                clazzId : this.$route.query.clazzId
            }
            api.distrDormForStu(params).then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if (meta.code == '200') {
                    this.pageInfo = mydata;
                }else{
                    this.$message.error(meta.message);
                }                    
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
            border-radius: 4px;
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
    .studorm-main{
        width:1200px;
        margin: 0 auto;
        margin-top: 20px;
        min-height: 740px;
        background-color: #fff;
        padding: 18px 22px;
        overflow: hidden;
        border-radius: 4px;
        margin-bottom: 32px;
        .studorm-left{
            padding-left: 22px;
            .el-form{
                .comflo{
                    float:left;
                    height:36px;
                    line-height:36px;
                    margin-right: 12px;
                }
                .comrig{
                    float:right;
                    height:36px;
                    line-height:36px;
                    i{
                        color: #ef0000;
                    }
                }
                .el-form-item{
                    width:23%;
                    margin-right:0;
                    .el-form-item__label{
                        padding-right:6px;
                    }
                    .el-form-item__content{
                        width:70%;
                    }
                }
                .itemwidth{
                    width:18% !important;
                    .el-form-item__content{
                        width:60%;
                    }
                }
                .smbed{
                    .el-form-item__content{
                        width:50%;
                    }
                }
            }
            .stu-box{
                height: 775px;
                padding: 16px 0 16px 16px;
                border: 1px solid #dfe6ec;
                margin-bottom: 20px;
                .bed-main{
                    overflow: hidden;
                    .stu-bed{
                        width: 148px;
                        height: 217px;
                        background-color: #f4f9ff;
                        float: left;
                        margin-right: 15px;
                        padding:8px;
                        position: relative;
                        // .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                        //     background-color:#f4f9ff;
                        //     border-color:#f4f9ff;
                        // }
                        .albeds{
                             height:170px;
                             margin-top:10px;
                             overflow-y: auto;
                            .el-checkbox-group{
                                width:148px;
                                overflow: hidden;
                            }
                            .el-checkbox+.el-checkbox{
                                margin-left:0;
                            }
                            label{
                                width:70px;
                                height:72px;
                                margin-right:4px;
                                position: relative;
                                margin-bottom:12px;
                                float:left;
                                overflow: hidden;
                                .bedsimg{
                                    position: absolute;
                                    top:0;
                                }
                                .stubednames{
                                    position: absolute;
                                    bottom:2px;
                                    left:22px;
                                }
                                .el-checkbox__input{
                                    position: absolute;
                                    bottom:0;
                                    left:0;
                                }
                            }
                        }
                        .stutop{
                            overflow: hidden;
                            .sycw{
                                margin-left: 8px;
                            }
                            i{
                                float: right;
                            }
                        }
                        .hover-chose{
                            position: absolute;
                            left:0;
                            bottom:0;
                            width: 100%;
                            height: 24px;
                            background-color:#fff;
                            display:none;
                            box-shadow: 0 0 5px #888888;
                            span{
                                margin-top:4px;
                                cursor: pointer;
                            }
                            .addded{
                                float:left;
                                margin-left:8px;
                            }
                            .remded{
                                float: right;
                                margin-right:8px;
                            }
                        }
                    }
                    .stu-bed:hover{
                        .hover-chose{
                            display:block;
                        }
                    }
                }
            }
        }
        .studorm-right{
            padding-right: 22px;
            border-right: 1px solid #dfe6ec;
            .coldr-top{
                height: 36px;
                line-height: 36px;
                overflow: hidden;
                margin-bottom: 22px;
                .el-breadcrumb{
                    height: 36px;
                    line-height: 36px;
                    .hbold{
                        font-weight: bold;
                    }
                    .el-breadcrumb__item__inner{
                        color:#48576a;
                        i{
                            color: #ef0000;
                        }
                    }
                }
            }
            .el-card{
                box-shadow: 0 0;
                position: relative;
                .el-card__header{
                    padding:0 12px;
                    height:40px;
                    line-height: 40px;
                    span{
                        margin-left: 12px;
                        i{color: #ef0000;}
                    }
                }
                .el-card__body{
                    margin:12px 0 28px 12px;
                    height: 275px;
                    overflow-y: auto;
                    .el-checkbox-group{
                        .el-checkbox{
                            width: 66px;
                            margin-right: 19px;
                            margin-bottom: 24px;
                        }
                        .el-checkbox+.el-checkbox{
                            margin-left: 0;
                        }
                    }
                    .future{
                        position: absolute;
                        right: 14px;
                        bottom: 4px;
                    }
                }
            }
            .stu-boy{
                margin-bottom: 16px;
                .el-card__header{
                    background-color: #deeeff;
                }
            }
            .stu-girl{
                .el-card__header{
                    background-color: #feebeb;
                }
            }
        }
        .stubton{
            text-align: center;
            margin-top: 20px;
            button{
                width: 96px;
                height:42px;
            }
        }
    }
</style>
