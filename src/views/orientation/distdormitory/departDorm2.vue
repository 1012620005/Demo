<template>
	<div class="contanier">
		<fc-header></fc-header>
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
                    院系宿舍分配
                </div>
                <div class="tabright" @click="returnClick">
                    <span>返回</span>
                    <i><img src="../../../assets/researchCenter/return.png" alt=""></i>
                </div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="coldorm-main">
            <el-col :span="12" class="coldorm-left">
                <el-form :inline="true"  class="demo-form-inline">
                    <div class="comflo">
                        <h4>{{pageInfo.campus.name}}</h4>
                    </div>
                    <el-form-item label="楼号">
                        <el-select v-model="select_Info.build" value-key="id" placeholder="" @change="getFloors" >
                            <el-option v-for="(item,index) in select_Info.buildList" :key="item.id" :label="item.name" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="楼层">
                        <el-select v-model="select_Info.floor" placeholder="" @change="getDormitoryBySexBuildFloor">
                            <el-option v-for="(item,index) in select_Info.floorList" :key="index" :label="item+1" :value="item+1">{{item+1}}层</el-option>
                        </el-select>
                    </el-form-item>
                    <div class="comrig">
                        剩余床位：<i>{{l_dormInfo.residueBedCount}}</i>
                    </div>
                </el-form>
                <div class="room-left">
                    <template>
                        <el-checkbox-group v-model="checkboxGroup" @change="handleCheckedDormChange">
                            <el-checkbox-button v-for="item in l_dormInfo.dormitorieList" :label="item" :key="item.id" :value="item.id" :disabled="item.useBed==0">{{item.name}}<p>{{item.totalBed - item.useBed}}-{{item.totalBed}}</p></el-checkbox-button>
                        </el-checkbox-group>
                        <el-checkbox :indeterminate="isIndeterminateLeft" v-model="checkAllLeft" @change="handleCheckAllChange">全选</el-checkbox>
                    </template>
                </div>
                <div class="btnres">
                    <!-- <el-button type="primary">重置</el-button> -->
                </div>
            </el-col>
            <el-col :span="12" class="coldorm-right">
                <div class="coldr-top">
                    <div>
                        <h4>{{pageInfo.dept.name}}</h4>
                    </div>
                    <div>
                        男生：<i>{{pageInfo.boyCount}}</i>人
                    </div>
                    <div>
                        女生：<i>{{pageInfo.girlCount}}</i>人
                    </div>
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
                        <el-collapse accordion v-for="(item,index) in pageInfo.girl" :key="index" v-model="activeNames" @change="handleChange" >
                            <el-collapse-item :name="item.buildName + item.floor">
                                <template slot="title">
                                    <span>{{item.buildName}}</span><span>{{item.floor}}层</span>
                                </template>
                                <div>
                                    <template>
                                        <el-checkbox-group v-model="checkboxGroupGirl" @change="handleCheckedChangeGirl">
                                            <el-checkbox-button v-for="(i,index) in item.distrdormList " :label="i" :key="i.id">{{i.dormName}}<p>{{i.occupyBed}}-{{i.totalBed}}</p></el-checkbox-button>
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
            </el-col>
            <el-col :span="24" class="btnsub">
                <el-button type="primary" @click="submitdistrTotal">提交</el-button>
            </el-col>
        </el-row>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../common/header.vue'
    import api from '../../../apis/orientation/distdormitory/departDorm2.js'

    const cityOptions2 = ['102', '103', '104', '105'];

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
                
                activeNames : ['西校区女生宿舍楼1'],

                //初始化页面基本信息
                pageInfo : {
                    campus : {
                        id : '',
                        name : ''
                    },
                    dept : {
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
                //左侧下拉框信息
                select_Info : {
                    sex : '',
                    build : {
                        id : '',
                        name : ''
                    },
                    floor : '',
                    buildList : {},
                    //保存选中的宿舍楼
                    floorList : [],
                },
                l_dormInfo : {
                    // 宿舍列表
                    dormitorieList : [],
                    //床位字典
                    bedDictList : [],
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
                this.checkAllLeft = checkedCount === this.l_dormInfo.dormitorieList.length;
                this.isIndeterminateLeft = checkedCount > 0 && checkedCount < this.l_dormInfo.dormitorieList.length;
            }, 
            //左侧全选
            handleCheckAllChange(event) {
                this.checkboxGroup = event.target.checked ? this.l_dormInfo.dormitorieList : [];
                this.isIndeterminateLeft = false;
            },
            
            //右侧多选(男)
            handleCheckedChangeBoy(value) {
                let checkedCount = value.length;
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
                console.log(this.activeNames)
            },
            //通过宿舍楼获取宿舍楼层
            getFloors(){
                //如果宿舍楼id为空则返回
                if(this.select_Info.build.id == '')
                    return ;
                this.select_Info.floor = '';
                var params = {
                    id :this.select_Info.build.id
                }
                api.getFloors(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        for(var i = 0; i < mydata; i++){
                            this.select_Info.floorList.splice(i,1,i);
                        }
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            //查询左侧宿舍楼 无床位
            getDormitoryBySexBuildFloor(){
                if(this.select_Info.floor == ''){
                    return ;
                }
                //去除左侧全选
                this.checkAllLeft = false;
                this.isIndeterminateLeft = false;

                var buildId = this.select_Info.build.id;
                var floor = this.select_Info.floor;
                var params = {
                    buildId : this.select_Info.build.id,
                    floor : this.select_Info.floor
                }
                api.getDormForDept(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        console.log(mydata)
                        this.l_dormInfo = mydata
                        this.checkboxGroup = [];
                        
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            //查询右侧分配记录
            getDistrDormByMainId(){
                //清楚右侧多选和全选
                this.isIndeterminateBoy = false;
                this.checkAllBoy = false;
                this.isIndeterminateGirl = false;
                this.checkAllGirl = false;
               var deptId = this.pageInfo.dept.id;
               api.getDistrDormByMainId(deptId).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.pageInfo.boy = mydata.boy;
                        this.pageInfo.girl = mydata.girl;
                        this.pageInfo.rboyCount = mydata.rboyCount;
                        this.pageInfo.rgirlCount = mydata.rgirlCount;
                        this.pageInfo.boyDormCount = mydata.boyDormCount;
                        this.pageInfo.girlDormCount = mydata.girlDormCount;
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            //向宿舍中添加分配
            addDistrdom(sex){
                //首先判断是否选中了宿舍
                if(this.checkboxGroup.length <= 0)
                    return;
                //首先判断该宿舍是否有分配记录
                if(sex != this.checkboxGroup[0].sex && this.checkboxGroup[0].sex != null){
                    this.$message.error("所选床位的性别和添加的位置不符合");
                    return;
                }
                //提交请求的数组
                var stringList = [];
                //院系id
                var mainRelation = this.pageInfo.dept.id;
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
                            sex : sex
                        }
                        count -= str.occupyBed;
                    }else{//未分配人数小于该宿舍可使用的床位
                        str = {
                            mainRelation : mainRelation,
                            dormId : dorm.id,
                            occupyBed : count,
                            useBed : count,
                            sex : sex
                        }
                        count = 0;
                    }
                    stringList.push(str);
                }
                //清空分配数组
                this.checkboxGroup = [];
                stringList = JSON.stringify(stringList);
                var data = {stringList : stringList}
                var qs = require('querystring')
                data = qs.stringify(data)
                api.addDistrdom(data).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        //刷新左侧数据
                        this.getDormitoryBySexBuildFloor();
                        //刷新右侧数据
                        this.getDistrDormByMainId();  
                        //展开需要展开的页面
                        this.activeNames = [this.select_Info.build.name + this.select_Info.floor];            
                    }else{
                        this.$message.error(meta.message);
                    }                    
                })
            },
            //从宿舍楼中删除分配
            deleteDistrdom(sex){
                var stringList = [];
                if(sex == '1')
                    stringList = this.checkboxGroupBoy
                else
                    stringList = this.checkboxGroupGirl
                var data = {stringList : JSON.stringify(stringList)}
                var qs = require('querystring')
                data = qs.stringify(data)
                console.log(data)
                //清空数组中的多余数据
                if(sex == '1'){
                    this.checkboxGroupBoy = []
                    this.checkAllBoy = false;
                    this.isIndeterminateBoy = false;
                }else{
                    this.checkboxGroupGirl = []
                    this.checkAllGirl = false;
                    this.isIndeterminateGirl = false;
                }
                api.deleteDistrdom(data).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                         //刷新左侧数据
                        this.getDormitoryBySexBuildFloor();
                        //刷新右侧数据
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
                var deptId = this.pageInfo.dept.id
                var boyPerson = this.pageInfo.boyCount;
                var girlPerson = this.pageInfo.girlCount;
                api.submitdistrTotal(deptId,boyPerson,girlPerson).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        // alert("提交成功")
                        this.$router.push({
                           name:'departDorm'
                        })     
                    }else{
                        this.$message.error(meta.message);
                    }                    
                })
            },    
            returnClick(){
                this.$router.push({
                    name:'departDorm'
                })
            }
        },
        computed:{
        
        },
        mounted () {
            //初始化加载院系信息
            var campusId = this.$route.query.campusId;
            var deptId = this.$route.query.deptId;
            api.distrDormForDept({campusId:campusId,deptId:deptId}).then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if (meta.code == '200') {
                    this.pageInfo = mydata;
                }else{
                    this.$message.error(meta.message);
                }                    
            })
            api.getDormBuildByWhere({campusId:campusId}).then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if (meta.code == '200') {
                    this.select_Info.buildList = mydata;
                    this.l_dormInfo = {};
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
    .coldorm-main{
        width:1200px;
        margin: 0 auto;
        margin-top: 20px;
        min-height: 740px;
        background-color: #fff;
        padding: 18px 22px;
        overflow: hidden;
        border-radius: 4px;
        margin-bottom: 32px;
        .coldorm-left{
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
                    height:36px;
                    line-height:36px;
                    i{
                        color: #ef0000;
                    }
                }
                .comrig{
                    float: right;
                }
            }
            .room-left{
                // width:100%;
                height: 655px;
                padding: 16px 16px 35px 16px;
                border: 1px solid #dfe6ec;
                overflow: auto;
                position: relative;
                .el-checkbox-group{
                    height:60px;
                }
                .el-checkbox-button, .el-checkbox-button__inner{
                    margin-right: 7px;
                    margin-bottom:14px;
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
                    min-width:46px;
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
        .coldorm-right{
            padding-left: 22px;
            .coldr-top{
                height: 36px;
                line-height: 36px;
                overflow: hidden;
                margin-bottom: 22px;
                div{
                    float: left;
                    margin-right: 16px;
                    i{
                        color: #ef0000;
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
                        .el-collapse-item__content{
                            height:90px;
                            overflow-y: auto;
                        }
                    }
                    .el-checkbox-group{
                        height:60px;
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
            
        }
        .btnsub{
            margin-top: 28px;
            text-align: center;
            button{
                width:96px;
                height: 42px;
            }
        }
    }
</style>
<style type="text/css" lang="scss">
    .coldorm-main{
        .coldorm-left{
            .el-form-item{
                width:24%;
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
                    width:64%;
                }
            }
            .sycw{
                width:26%;
                .el-form-item__content{
                    width:100%;
                }
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
        .el-collapse-item__wrap{
            padding:10px;
        }        
        .room-left{
            .el-checkbox-group{
                .el-checkbox-button{
                    height: 52px;
                }
            }
        }
        .el-checkbox-button__inner{
            background-color: #e6e6e6;
            border:0;
            padding:5px 10px;
            border-radius:13px;
        }
        .el-checkbox-button:first-child .el-checkbox-button__inner{
            border-radius:13px;
        }
        .el-checkbox-button:last-child .el-checkbox-button__inner{
            border-radius:13px;
        }
        .el-collapse-item__header.is-active{
            border-bottom-color:#ebeef5;
        }
        .boycard{
            .el-card__header{
                background-color: #deeeff;
            }
            .el-checkbox-button__inner{
                background-color: #deeeff;
                border:0;
                padding:5px 10px;

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
                border:0;
                padding:5px 10px;
            }
            .el-checkbox-button.is-checked .el-checkbox-button__inner{
                background-color: #ef0000 !important;
            }
        }
    }
</style>
