<template>
	<div class="contanier">
		<fc-header></fc-header>
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
                    专业宿舍分配
                </div>
                <div class="tabright" @click="returnClick">
                    <span>返回</span>
                    <i><img src="../../../assets/researchCenter/return.png" alt=""></i>
                </div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="jordorm-main">
            <el-col :span="12" class="jordorm-left">
                <el-form :inline="true" class="demo-form-inline">
                    <div class="comflo">
                        <h4>{{pageInfo.campus.name}}</h4>
                    </div>
                    <el-form-item label="性别" class="sycw">
                        <el-select v-model="select_Info.sex" placeholder="" @change="getBuildInfoBySex">
                            <el-option v-for="sex in pageInfo.sexDictList" :key="sex.value" :label="sex.label" :value="sex.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="楼号">
                        <el-select v-model="select_Info.build"  placeholder="" value-key="id" @change="getFloorByBuildAndMR">
                            <el-option v-for="item in select_Info.buildList" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="楼层">
                        <el-select v-model="select_Info.floor" placeholder="" @change="getDormBySexBuildFloor">
                            <el-option v-for="item in select_Info.floorList" :key="item.floor" :label="item.floor" :value="item.floor">{{item.floor}}层</el-option>
                        </el-select>
                    </el-form-item>
                    <div class="comrig">
                        剩余床位：<i>{{left_dormInfo.residueBedCount}}</i>
                    </div>
                </el-form>
                <div class="room-left">
                    <template>
                        <el-checkbox-group v-model="checkboxGroup" value-key="id" @change="handleCheckedDormChange">
                            <el-checkbox-button v-for="item in left_dormInfo.dormitorieList" :label="item" :key="item.id" :value="item" :disabled="item.useBed==0">{{item.name}}<p>{{item.totalBed - item.useBed}}-{{item.totalBed}}</p></el-checkbox-button>
                        </el-checkbox-group>
                        <el-checkbox :indeterminate="isIndeterminateLeft" v-model="checkAllLeft" @change="handleCheckAllChange">全选</el-checkbox>
                    </template>
                </div>
                <div class="btnres">
                    <el-button type="primary">重置</el-button>
                </div>
            </el-col>
            <el-col :span="12" class="jordorm-right">
                <div class="coldr-top">
                    <el-breadcrumb separator="">
                        <el-breadcrumb-item :to="{ path: '/' }" class="hbold">{{pageInfo.campus.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item class="hbold">{{pageInfo.dept.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item class="hbold">{{pageInfo.prof.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item>男生：<i>{{pageInfo.boyCount}}</i>人</el-breadcrumb-item>
                        <el-breadcrumb-item>女生：<i>{{pageInfo.girlCount}}</i>人</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-card class="box-card boycard">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;"><img src="../../../assets/img/orientation/boy.png" alt=""></span>
                        <span>未分配</span>
                        <span><i>{{pageInfo.boyCount-pageInfo.rboyCount}}</i>人</span>
                    </div>
                    <div class="boxmain">
                        <el-collapse accordion v-for="(item,index) in pageInfo.boy" :key="index" v-model="activeNames" @change="handleChange">
                            <el-collapse-item :name="item.buildName + item.floor">
                                <template slot="title">
                                    <span>{{item.buildName}}</span><span>{{item.floor}}层</span>
                                </template>
                                <div>
                                    <template>
                                        <el-checkbox-group v-model="checkboxGroupBoy" @change="handleCheckedChangeBoy">
                                            <el-checkbox-button v-for="(i,index) in item.distrdormList " :label="i" :key="i.id">{{i.dormName}}<p>{{i.occupyBed}}-{{i.totalBed}}</p></el-checkbox-button>
                                        </el-checkbox-group>
                                        <el-checkbox :indeterminate="isIndeterminateBoy" v-model="checkAllBoy" @change="handleCheckAllChangeBoy">全选</el-checkbox>
                                    </template>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    <div class="cascading">
                        <div class="">
                            <img src="../../../assets/img/orientation/addform.png" alt="" @click="addDistrdom(1)">
                            <img src="../../../assets/img/orientation/remform.png" alt="" @click="deleteDistrdom('1')">
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card girlcard">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;"><img src="../../../assets/img/orientation/girl.png" alt=""></span>
                        <span>未分配</span>
                        <span><i>{{pageInfo.girlCount - pageInfo.rgirlCount}}</i>人</span>
                    </div>
                    <div class="boxmain">
                        <el-collapse accordion v-for="(item,index) in pageInfo.girl" :key="index" v-model="activeNames" @change="handleChange">
                            <el-collapse-item :name="item.buildName + item.floor">
                                <template slot="title">
                                    <span>{{item.buildName}}</span><span>{{item.floor}}层</span>
                                </template>
                                <div>
                                    <template>
                                        <el-checkbox-group v-model="checkboxGroupGirl" @change="handleCheckedChangeGirl">
                                            <el-checkbox-button v-for="(i,index) in item.distrdormList " :label="i" :key="i.id" :disabled="item.useBed==0">{{i.dormName}}<p>{{i.occupyBed}}-{{i.totalBed}}</p></el-checkbox-button>
                                        </el-checkbox-group>
                                        <el-checkbox :indeterminate="isIndeterminateGirl" v-model="checkAllGirl" @change="handleCheckAllChangeGirl">全选</el-checkbox>
                                    </template>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    <div class="cascading">
                        <div class="">
                            <img src="../../../assets/img/orientation/addform.png" alt="" @click="addDistrdom(2)">
                            <img src="../../../assets/img/orientation/remform.png" alt="" @click="deleteDistrdom('2')">
                        </div>
                    </div>
                </el-card>
                <div class="btnsub">
                    <el-button type="primary" @click="submitdistrTotal">提交</el-button>
                </div>
            </el-col>
        </el-row>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../common/header.vue'
    import api from '../../../apis/orientation/distdormitory/majDorm2.js'
	export default {
		data () {
			return {
                //左侧添加数组
                checkboxGroup : [],
                //左侧全选数据数组:
                isIndeterminateLeft: false,
                checkAllLeft: false,

                //右侧删除数组
                checkboxGroupBoy : [],
                isIndeterminateBoy : false,
                checkAllBoy : false,

                checkboxGroupGirl : [],
                isIndeterminateGirl : false,
                checkAllGirl : false, 

                activeNames : [],
                //页面基本信息
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
                    boyCount : 0,
                    rboyCount : 0,
                    girlCount : 0,
                    rgirlCount : 0,
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
                    //下拉框信息
                    buildList : {},
                    //保存选中的宿舍楼
                    floorList : [],
                },
                left_dormInfo : {
                     // 宿舍列表
                    dormitorieList : [],
                    //床位字典
                    // bedDictList : [],
                    // 剩余床位
                    residueBedCount : 0
                },
                
            }
		},
		components:{
			fcHeader
		},
        methods:{
            //左侧多选
            handleCheckedDormChange(value) {
                let checkedCount = value.length;
                this.checkAllLeft = checkedCount === this.left_dormInfo.dormitorieList.length;
                this.isIndeterminateLeft = checkedCount > 0 && checkedCount < this.left_dormInfo.dormitorieList.length;
            }, 
            //左侧全选
            handleCheckAllChange(event) {
                this.checkboxGroup = event.target.checked ? this.left_dormInfo.dormitorieList : [];
                console.log(this.checkboxGroup);
                this.isIndeterminateLeft = false;
            },

            //右侧多选(男)
            handleCheckedChangeBoy(value) {
                let checkedCount = value.length;
                console.log(checkedCount)
                console.log(this.pageInfo.boyDormCount)
                this.checkAllBoy = checkedCount === this.pageInfo.boyDormCount;
                this.isIndeterminateBoy = checkedCount > 0 && checkedCount < this.pageInfo.boyDormCount
            },
            handleCheckAllChangeBoy(event) {
                var list = [];
                if(event.target.checked){
                    for(var i = 0; i < this.pageInfo.boy.length; i++){
                        var distrdormList = this.pageInfo.boy[i].distrdormList;
                        for(var j = 0; j < distrdormList.length; j++){
                            list.push(distrdormList[j]);
                        }
                    }
                }
                this.checkboxGroupBoy = list;
                this.isIndeterminateBoy = false;
            },

            //右侧多选(女)
            handleCheckedChangeGirl(value) {
                let checkedCount = value.length;
                this.checkAllGirl = checkedCount === this.pageInfo.girlDormCount;
                this.isIndeterminateGirl = checkedCount > 0 && checkedCount < this.pageInfo.girlDormCount;
            },
            handleCheckAllChangeGirl(event) {
                var list = [];
                if(event.target.checked){
                    for(var i = 0; i < this.pageInfo.girl.length; i++){
                        var distrdormList = this.pageInfo.girl[i].distrdormList;
                        for(var j = 0; j < distrdormList.length; j++){
                            list.push(distrdormList[j]);
                        }
                    }
                }
                this.checkboxGroupGirl = list;
                this.isIndeterminateGirl = false;
            },
            handleChange(val){

            },
            //获取宿舍楼下拉框
            getBuildInfoBySex(){
                //清空下拉框
                this.select_Info.build = {
                    id : '',
                    name : ''
                };
                this.select_Info.floor = '';
                // this.bedNums = '';

                var sex = this.select_Info.sex;
                var mr = this.pageInfo.dept.id
                //通过性别加载宿舍楼
                var params = {
                    mainRelation : mr,
                    sex : sex
                }
                api.getBuildInfoBySex(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200') {
                        console.log(mydata)
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
                // this.bedNums = '';
                
                var params = {
                    mainRelation : this.pageInfo.dept.id,
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
            //通过楼层获取宿舍信息
            getDormBySexBuildFloor(){
                if(this.select_Info.floor == '')
                    return;
                var mr = this.pageInfo.dept.id;
                var buildId = this.select_Info.build.id;
                var floor = this.select_Info.floor;
                var params = {
                    mainRelation : mr,
                    buildId : buildId,
                    floor : floor
                }
                this.checkboxGroup = [];
                this.isIndeterminateLeft = false;
                this.checkAllLeft = false;
                api.getDormByMrBuildFloor(params).then(response =>{
                  var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200') {
                        this.left_dormInfo = mydata;
                    }else{
                        this.$message.error(meta.message);
                    }  
                });
            },
            getDistrDormByMainId(){
                //清楚右侧多选和全选
                this.isIndeterminateBoy = false;
                this.checkAllBoy = false;
                this.isIndeterminateGirl = false;
                this.checkAllGirl = false;
                var params = {
                    mainRelation : this.pageInfo.prof.id
                }
                api.getDistrDormByMainId(params).then(response =>{
                  var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200') {
                        console.log(mydata)
                        this.pageInfo.boy = mydata.boy;
                        this.pageInfo.girl = mydata.girl;
                        this.pageInfo.rboyCount = mydata.rboyCount;
                        this.pageInfo.rgirlCount = mydata.rgirlCount;
                        this.pageInfo.boyDormCount = mydata.boyDormCount;
                        this.pageInfo.girlDormCount = mydata.girlDormCount;
                    }else{
                        this.$message.error(meta.message);
                    }  
                });
            },
            addDistrdom(sex){
                if(sex != this.select_Info.sex){
                    this.$message.error("所选床位的性别和添加的位置不符合");
                    return;
                }
                //提交请求的数组
                var stringList = [];
                //院系id
                var mainRelation = this.pageInfo.prof.id;
                var count = 0;
                if(sex == 1){
                    count = this.pageInfo.boyCount - this.pageInfo.rboyCount;
                }else{
                    count = this.pageInfo.girlCount - this.pageInfo.rgirlCount;
                }
                for(var i = 0; i < this.checkboxGroup.length; i++){
                    //不存在未分配人数break
                    if(count == 0)
                        break;
                    var dorm = this.checkboxGroup[i];
                    var str = {};
                    //如果该宿舍没有可以使用的床位continue
                    if(dorm.useBed <= 0)
                        continue;
                    //未分配人数大于该宿舍可使用的床位
                    if(count > dorm.useBed){
                        //创建分配记录
                        str = {
                            mainRelation : mainRelation,
                            dormId : dorm.id,
                            occupyBed : dorm.useBed,
                            useBed : dorm.useBed,
                            sex : this.select_Info.sex
                        }
                        count -= str.occupyBed;
                    }else{//未分配人数小于该宿舍可使用的床位
                        str = {
                            mainRelation : mainRelation,
                            dormId : dorm.id,
                            occupyBed : count,
                            useBed : count,
                            sex : this.select_Info.sex
                        }
                        count = 0;
                    }
                    stringList.push(str);
                }
                //清空分配数组
                this.checkboxGroup = [];
                stringList = JSON.stringify(stringList);
                var data = {stringList : stringList,
                            mainRelation : mainRelation}
                var qs = require('querystring')
                data = qs.stringify(data);
                api.addDistrdom(data).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        // 刷新左侧数据
                        this.getDormBySexBuildFloor()
                        // //刷新右侧数据
                        this.getDistrDormByMainId(); 
                        this.activeNames = [this.select_Info.build.name + this.select_Info.floor];               
                    }else{
                        this.$message.error(meta.message);
                    }                    
                })
            },
            deleteDistrdom(sex){
                var stringList = [];
                if(sex == '1')
                    stringList = this.checkboxGroupBoy
                else
                    stringList = this.checkboxGroupGirl
                var data = {stringList : JSON.stringify(stringList),
                            mainRelation : this.pageInfo.dept.id}
                var qs = require('querystring')
                data = qs.stringify(data)
                if(sex == '1')
                    this.checkboxGroupBoy = []
                else
                    this.checkboxGroupGirl = []
                api.deleteDistrdom(data).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        // 刷新左侧数据
                        this.getDormBySexBuildFloor()
                        // //刷新右侧数据
                        this.getDistrDormByMainId();      
                    }else{
                        this.$message.error(meta.message);
                    }                    
                })
            },
            submitdistrTotal(){
                if(this.pageInfo.girlCount - this.pageInfo.rgirlCount != 0 || this.pageInfo.girlCount - this.pageInfo.rgirlCount != 0 ){
                    this.$message.error("分班未完成,请分配完成再提交");
                    return ;
                }
                var params = {
                    mainRelation : this.pageInfo.prof.id,
                    boyPerson : this.pageInfo.boyCount,
                    girlPerson : this.pageInfo.girlCount
                }
                api.submitdistrTotal(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        //  alert("提交成功")
                        this.$router.push({
                            name:'majDorm'
                        })     
                    }else{
                        this.$message.error(meta.message);
                    }                    
                })
            },
            returnClick(){
                 this.$router.push({
                    name:'majDorm'
                })
            }
        },
        computed:{
        
        },
        mounted () {
            var campusId = this.$route.query.campusId;
            var deptId = this.$route.query.deptId;
            var profId = this.$route.query.profId;
            //初始化页面基本数据    
            api.distrDormForProf({campusId:campusId,deptId,profId:profId}).then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if(meta.code == '200') {
                    this.pageInfo = mydata;
                }else{
                    this.$message.error(meta.message);
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
    .jordorm-main{
        width:1200px;
        margin: 0 auto;
        margin-top: 20px;
        min-height: 740px;
        background-color: #fff;
        padding: 18px 22px;
        overflow: hidden;
        border-radius: 4px;
        margin-bottom: 32px;
        .jordorm-left{
            border-right: 1px solid #dfe6ec;
            padding-right: 22px;
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
            }
            .room-left{
                // width:100%;
                height: 655px;
                padding: 16px 16px 35px 16px;
                border: 1px solid #dfe6ec;
                overflow: auto;
                position: relative;
                .el-checkbox-button{
                    height: 40px;
                    margin-bottom: 8px;
                }
                .el-checkbox-button, .el-checkbox-button__inner{
                    margin-right: 8px;
                }
                .el-checkbox-button:first-child .el-checkbox-button__inner{
                    border-radius: 0;
                    border: 0;
                }
                .el-checkbox-button__inner{
                    border:0;
                    background-color: #e6e6e6;
                    position: relative;
                    border-radius: 8px !important;
                    padding: 0;
                    width:46px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 8px;
                }
                p{
                    position: absolute;
                    bottom: -20px;
                    left:8px;
                }
                .el-checkbox-button.is-checked .el-checkbox-button__inner{
                    background-color: #208af5 !important;
                    color:#fff;
                    box-shadow:0 0;
                    p{color:#333;}
                }
                .el-checkbox{
                    position: absolute;
                    bottom: 7px;    
                }
            }
            .btnres{
                float: right;
                margin-top: 28px;
                button{
                    width:96px;
                    height: 42px;
                    background-color:#91c604;
                    border-color:#91c604;
                }
            }
        }
        .jordorm-right{
            padding-left: 22px;
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
                            color:#ef0000;
                        }
                    }
                }
            }
            .el-card{
                box-shadow: 0 0;
                .el-collapse{
                    border: 0;
                    border-bottom: 1px solid #dfe6ec;
                    .el-collapse-item__header{
                        span{
                            margin-left: 8px;
                        }
                    }
                    .el-collapse-item__wrap{
                        background-color: transparent;
                    }
                    .el-checkbox-group{
                        height:90px;
                        overflow-y: auto;
                    }
                    .el-checkbox-button{
                        height: 40px;
                        margin-bottom: 8px;
                    }
                    .el-checkbox-button, .el-checkbox-button__inner{
                        margin-right: 8px;
                    }
                    .el-checkbox-button:first-child .el-checkbox-button__inner{
                        border-radius: 0;
                        border: 0;
                    }
                    .el-checkbox-button__inner{
                        border:0;
                        position: relative;
                        border-radius: 8px !important;
                        padding: 0;
                        width:46px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        border-radius: 8px;
                    }
                    p{
                        position: absolute;
                        bottom: -20px;
                        left:8px;
                    }
                    .el-checkbox-button.is-checked .el-checkbox-button__inner{
                        color:#fff;
                        box-shadow:0 0;
                        p{color:#333;}
                    }
                }
                .el-collapse:last-child{
                    border: 0;
                    border-bottom: 0;
                }
                .cascading{
                    height: 36px;
                    line-height: 36px;
                    padding:0 8px;
                    position: absolute;
                    bottom: 0;
                    width: 97%;
                    border-top: 1px solid #dfe6ec;
                    z-index: 1;
                    div{
                        float: right;
                        margin-top: 10px;
                        img{
                            float: left;
                            margin-left: 10px;
                            cursor: pointer;
                        }
                    }
                }
                .el-checkbox{
                    position: absolute;
                    bottom: 7px;    
                    right: 188px;
                    z-index: 2;
                }
            }
            
            .btnsub{
                margin-top: 28px;
                button{
                    width:96px;
                    height: 42px;
                }
            }
        }
    }
</style>

<style type="text/css" lang="scss">
    .jordorm-main{
        .jordorm-left{
            .el-form-item{
                width:21%;
                margin-right:0;
                .el-form-item__label{
                    padding-right:6px;
                }
                .el-form-item__content{
                    width:70%;
                }
            }
            .smbed{
                width:30%;
                .el-form-item__content{
                    width:68%;
                }
            }
            .sycw{
                width:16%;
                .el-form-item__content{
                    width:60%;
                    .el-input__icon+.el-input__inner{
                        padding-right: 25px;
                    }
                }
            }
        }
        .boycard{
            .el-card__header{
                background-color: #deeeff;
            }
            .el-checkbox-button__inner{
                background-color: #deeeff;
            }
            .el-checkbox-button.is-checked .el-checkbox-button__inner{
                background-color: #208af5 !important;
            }
        }
        .girlcard{
            margin-top: 20px;
            .el-card__header{
                background-color: #feebeb;
            }
            .el-checkbox-button__inner{
                background-color: #feebeb;
            }
            .el-checkbox-button.is-checked .el-checkbox-button__inner{
                background-color: #ef0000 !important;
            }
        }
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
            padding: 0;
            height: 304px;
            overflow: hidden;
            position: relative;
            .boxmain{
                height: 225px;
                overflow: auto;
            }
        }
        .el-input--suffix .el-input__inner{
            padding-right:21px;
        }
    }
</style>
