<template>
	<div class="contanier">
		<fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft-x">
					<h5>班级分配</h5>
				</div>
				<div class="tabright" @click="returnClick()">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="classdistr-main">
            <el-col :span="12" class="left-box">
                <div class="letop">
                    <el-breadcrumb separator="》" class="camp" >
                        <el-breadcrumb-item :to="{ path: '/' }">{{letop.campus.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{letop.department.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{letop.majors.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="totnum">
                        <span>总人数:</span>
                        <span><i>{{tableData3.length}}</i>人</span>
                    </div>
                </div>
                <div class="letopt">
                    <div>学生列表</div>
                    <div class="cate">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="类别" prop="sort">
                                <el-select v-model="form.sort" clearable  placeholder="" @change="randerTable()">
                                    <el-option v-for="item in form2.sorts" :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item  class="single">
                                <el-radio-group v-model="form.radio"  @change="screenSex()">
                                    <el-radio :label="1" >男</el-radio>
                                    <el-radio :label="2">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <template class="tabbottom">
                    <el-table ref="multipleTable" :data="tableData3" stripe border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :default-sort="{prop:'name',prop:'score',prop:'birthday'}" >
                        <el-table-column type="selection" width="50" toggleRowSelection :selectable="checkSelectable"></el-table-column>
                        <el-table-column prop="name" label="姓名" sortable></el-table-column>
                        <el-table-column prop="sex" label="性别" ></el-table-column>
                        <el-table-column prop="birthday" label="出生日期" show-overflow-tooltip sortable></el-table-column>
                        <el-table-column prop="score" label="分数" show-overflow-tooltip sortable></el-table-column>
                    </el-table>
                </template>
                <el-button type="primary" class="reset" @click="reset">重置</el-button>
            </el-col>
            <el-col :span="12" class="right-box">
                <div class="rigtop">
                    <div class="distrib">分配班级</div>
                    <div class="divide-class">
                        <div class="automat" @click="autoClass">
                            <img src="../../../../assets/img/orientation/automat.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="cladisbox">
                    <el-collapse>
                        <el-collapse-item  v-for="(item, index) in tableData4" :id="item.clazzid" :key="index">
                            <template slot="title">
                                <ul>
                                    <li class="clagrad">{{ item.clazzname }}</li>
                                    <li>总：<span>{{ item.count }}</span>人</li>
                                    <li>男：<span>{{ item.girlDistrItemList == null? '0': item.girlDistrItemList.length }}</span>人</li>
                                    <li>女：<span>{{item.boyDistrItemList == null? '0': item.boyDistrItemList.length }}</span>人</li>
                                    <li class="suspend-box">
                                        <div class="addstu"  @click.stop="addStu(item,index)" >
                                            <!-- <img src="../../../../assets/img/orientation/addstu.png" alt=""> -->
                                            <img src="../../../../assets/img/orientation/addyellow.png" alt="">
                                        </div>
                                        <div class="remstu"  @click.stop="removeStu(item,index)">
                                            <!-- <img src="../../../../assets/img/orientation/rem.png" alt="" > -->
                                            <img src="../../../../assets/img/orientation/removes.png" alt="" >
                                        </div>
                                    </li>
                                </ul>
                            </template>
                            <div class="girlbox">
                                <div class="girlleft">
                                    <img src="../../../../assets/img/orientation/girl1.png" alt="">
                                </div>
                                <div class="girlright">
                                    <template v-if="item.girlDistrItemList">
                                        <el-checkbox-group v-model="girlList[index]" value-id="id" @change="handleCheckedCitiesChange">
                                            <el-checkbox :label="obj.studId" v-for="obj in item.girlDistrItemList" :key="obj.id" :value="obj">{{obj.name}}</el-checkbox>
                                        </el-checkbox-group>
                                    </template>
                                </div>
                            </div>
                            <div class="boybox">
                                <div class="boyleft">
                                    <img src="../../../../assets/img/orientation/boy1.png" alt="">
                                </div>
                                <div class="boyright">
                                    <template v-if="item.boyDistrItemList">
                                        <el-checkbox-group v-model="boyList[index]" value-key="id" @change="handleCheckedCitiesChange">
                                            <el-checkbox :label="obj.studId" v-for="obj in item.boyDistrItemList" :key="obj.id" :value="obj">{{obj.name}}</el-checkbox>
                                        </el-checkbox-group>
                                    </template>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <el-button type="primary" class="sub" @click="submit">提交</el-button>
            </el-col>
        </el-row>
        <!--自动分班-->
        <el-dialog class="auto-class" :visible.sync="showautoClass">
            <div slot="title" class="addclasses-cpm" >
                <img src="../../../../assets/image/addstudent2.png" />
                <p>自动分班规则</p>
            </div>
            <template>
                <el-checkbox-group v-model="checkList" @change="autoDistrSelect">
                    <el-checkbox v-for="item in form2.sorts" :key="item.value" :label="item.value" :value="item.value">{{item.label}}</el-checkbox>
                    <el-checkbox  key="score" label="score" value="score">成绩</el-checkbox>
                    <el-checkbox  key="area" label="area" value="area">地域</el-checkbox>
                    <el-checkbox  key="sex" label="sex" value="sex">性别</el-checkbox>
                </el-checkbox-group>
            </template>
            <el-button type="primary" class="sub" @click="autoDistrClazz" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="拼命为您分班中(*╹▽╹*)">提交</el-button>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../../common/header.vue'
    import api from '../../../../apis/orientation/classDis2.js'
    

	export default {
		data () {
			return {
                //自动分班数组
                checkList: [],
                letop:{
                 campus:"",
                 department:"",
                 majors:""
                },
				form: {
                    sort: '',
                    radio: '',
                },
                form2:{
                    sort: '',
                    clanum: ''
                },
                // radio: '1',
                tableData3:[],
                tableData4:[],
                //储存左侧勾选学生
                multipleSelection:[],
                // classNum: 0,
                girlList:[],
                boyList:[],
                // 添加辅导员
                // showaddCouns:false,
                // 自动分班
                showautoClass:false,
                // 遮罩层
		        // showDesk:false,
                data:'',
                fullscreenLoading : false
            }
		},
         methods: {
             //自动分班选项
            autoDistrSelect(){
                console.log(this.checkList);
            },
            autoDistrClazz(){
                this.showautoClass = false;
                this.fullscreenLoading = true;
                var autoDistr = {
                    profId : this.letop.majors.id,
                    admitMethodList : '',
                }
                for(var i = 0; i < this.checkList.length; i++){
                    var item = this.checkList[i];
                    if(item.length < 2){
                        autoDistr.admitMethodList += item ;
                        autoDistr.admitMethodList += ',' ;
                    }else{
                        switch(item){
                            case "score" :
                                autoDistr.score = "DESC"
                                break;
                            case "area" :
                                autoDistr.area = "DESC"
                                break;
                            case "sex" :
                                autoDistr.sex = "DESC"
                                break;
                            default : ;
                        }
                    }
                }
                this.checkList = [];
                api.autoDistrClazz(autoDistr).then(response=>{
                    var meta = response.data.meta;
                    var mydata = response.data.data
                    //响应成功
                    if(meta.code = '200'){
                       this.loadclassData();
                        this.fullscreenLoading = false;              
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // console.log(this.multipleSelection)
                // console.log('----------')
            },
            //左侧绑定禁用事件
            checkSelectable(row) {
                if(row.clazzId == null){    
                    // console.log("左侧班级数据1")
                    // console.log(row)
                    return true;
                }
                console.log("左侧班级数据2")
                console.log(row)
                return false;
            },
            //从班级中删除学生
            handleCheckedCitiesChange(val){
            },
            // 点击添加辅导员
            // addCouns(){
            //     this.showaddCouns=true;
            //     this.showDesk=true;
            // },
            // closeCoun(){
            //     this.showaddCouns=false;
            //     this.showDesk=false;
            // },
            // 点击自动分班
            autoClass(){
                this.showautoClass=true;
            },
            // 类别
            randerTable () {
                let data={
                    'profId':this.letop.majors.id,
                    'admitMethod':this.form.sort,
                    'sex':'',
                    'orderBy':'0',
                }
                api.leftData(data).then(data=>{
                    this.tableData3 = data.data.data;
                    // this.tableData3 =mydata; 
                    this.form.radio = null
                })
            },
            // 通过男女筛选列表
            screenSex(){
                console.log(this.form.radio)
                let sexStu = {
                    profId: this.letop.majors.id,
                    admitMethod: this.form.sort,
                    sex: this.form.radio
                }
                // console.log(sexStu)
                api.leftData(sexStu).then(data=>{
                    this.tableData3 = data.data.data;
                    // this.tableData3 =mydata; 
                })
            },
            // 添加班级
            // addClass () {
            //     var clazzs = {
            //         clazzname: '默认校区',
            //         proid: this.$route.query.campusMajursId
            //     }
            //     var len = this.classNum;
            //     if(len > 5) {
            //         this.$message.error('一次最多添加5个')
            //         this.classNum = 5
            //         return false;
            //     }
            //     var stringList = [];
            //     for(var i = 0; i < len; i++) {  
            //         stringList.push(clazzs);
            //     }
            //     var data = {'stringList':JSON.stringify(stringList)}
            //     var qs = require('querystring')
            //     data = qs.stringify(data)
            //     api.addClassData(data).then(response => {
            //         var meta = response.data.meta
            //         var mydata = response.data.data
            //        if(meta.code == '200' ){
            //            for(var i = 0 ; i < mydata.length;i++){
            //                 this.tableData4.push(mydata[i]);
            //            }
            //        }else{
            //             this.$message.error(meta.message);
            //        }
            //     })

            // },
            // 添加学生
            addStu (obj) {
                var id = obj.clazzid
                var clazzName = obj.clazzname
                // 判断用户是否选中table
                if (this.multipleSelection.length == 0) {
                    this.$message.error('请选择要分班的学生');
                    return false;
                }
                //组合向后台发送的数据
                var stringList = []
                for(var i = 0,len = this.multipleSelection.length; i < len; i++) {
                    var str = {
                        studId: this.multipleSelection[i].studId,
                        clazzId: id,
                        clazzName: clazzName,
                        profId: this.$route.query.campusMajursId,
                        name: this.multipleSelection[i].name,
                        sex: this.multipleSelection[i].sex,
                        admitMethod: this.multipleSelection[i].admitMethod,
                        score:this.multipleSelection[i].score,
                        birthday: this.multipleSelection[i].birthday
                     }
                     console.log('klsagjlsa')
                     console.log(str)
                     this.multipleSelection[i].clazzId = id;
                     this.multipleSelection[i].clazzName = clazzName;
                     stringList.push(str)
                }
                var obj = {stringList:JSON.stringify(stringList)}
                var qs = require('querystring')
                var data = qs.stringify(obj)
                api.addStudent(data).then(response=>{
                    var meta = response.data.meta;
                    var mydata = response.data.data
                    console.log('ahgoiha')
                    console.log(response)
                    //响应成功
                    if(meta.code = '200'){
                        //将左侧数据禁选
                        for(var i = 0,len = this.multipleSelection.length; i < len; i++) {
                            this.multipleSelection[i].clazzId = id;
                            this.multipleSelection[i].clazzName = clazzName;
                        }
                        // 向右侧追加数据
                        this.data = mydata
                    }else{
                        this.$message.error(meta.message);
                    }
                   
                })
            },
            // 移除学生
            removeStu(obj,index){
                if(this.boyList[index].length == 0 && this.girlList[index].length == 0){
                    this.$message.error('没有选中需要删除的学生');
                    return false;
                }
                var stringList = [];
                //组合请求数据
                for(var i = 0; i < this.boyList[index].length; i++){
                    var deleId = this.boyList[index][i]
                    var d = {
                        studId : deleId,
                        profId : this.$route.query.campusMajursId
                    }
                    obj.count--;
                    stringList.push(d);
                }
                for(var i = 0; i < this.girlList[index].length; i++){
                    var deleId = this.girlList[index][i]
                    var d = {
                        studId : deleId,
                        profId : this.$route.query.campusMajursId
                    }
                    obj.count--;
                    stringList.push(d);
                }
                var data = {'stringList':JSON.stringify(stringList)}
                var qs = require('querystring')
                var data = qs.stringify(data);
                // 向后台请求移除数据
                api.removeStudent(data).then(response=>{
                    var meta = response.data.meta;
                    var mydata = response.data.data
                    if(meta.code == '200'){
                        for(var i = 0; i < stringList.length; i++){
                            var deleId = stringList[i].studId;
                             for(var j = 0; j < this.tableData3.length; j++){
                                var stu = this.tableData3[j];
                                if(deleId == stu.studId){
                                    stu.clazzId = null;
                                    stu.clazzName = null;
                                    stu = null;
                                    break;
                                }   
                            }
                            for(var j = 0; j < obj.boyDistrItemList.length; j++){
                                var stu = obj.boyDistrItemList[j];
                                if(deleId == stu.studId){
                                    obj.boyDistrItemList.splice(j,1);
                                    break;
                                }
                            }
                            for(var j = 0; j < obj.girlDistrItemList.length; j++){
                                var stu = obj.girlDistrItemList[j];
                                if(deleId == stu.studId){
                                    obj.girlDistrItemList.splice(j,1);
                                    break;
                                }
                            }
                        }
                    }
                })
            },
            // checkboxInit(row,index){
            //     if (this.multipleSelection.length) 
            //         return 0;//不可勾选
            //     else
            //         return 1;//可勾选
            // },

            // 移除班级
            // remClass(item,index){
            //     // alert("renshutanshishazi154658964546548")
            //    this.tableData4.splice(index,1);
            //     api.removeClass(item.clazzid).then(response=>{
            //        this.data = response.data.data
            //     })
                
            // },
            //提交分班
            submit(){
                console.log("haha")
                console.log(this.tableData4)
                var profId = this.$route.query.campusMajursId
                var count = 0;
                var stringList = []
                for(var i = 0; i < this.tableData4.length; i++){
                    if(this.tableData4[i].count == 0){
                        this.$message.error('存在班级没有分配学生');
                        return;
                    }
                    var string = {
                        clazzid : this.tableData4[i].clazzid,
                        clazzname :this.tableData4[i].clazzname,
                        boyCount : this.tableData4[i].boyDistrItemList.length,
                        girlCount : this.tableData4[i].girlDistrItemList.length,
                        proid : this.letop.majors.id,
                        del_flag : '1'
                    }
                    stringList.push(string);
                    count += this.tableData4[i].count;
                }
                let params = {
                    stringList : JSON.stringify(stringList),
                    profId : profId
                }
                if(count == this.tableData3.length){
                    api.submitDistrClazzInfo(params).then(response=>{
                        var meta = response.data.meta;
                        var mydata = response.data.data
                        if(meta.code == '200'){
                            this.data = mydata
                            this.$router.push({
                                name:'classDis'
                            })
                        }else{
                            this.$message.error(meta.message);
                        }
                    })
                }else{
                     this.$message.error('左侧有学生未分班');
                }
                
            },
            //重置分班
            reset(){
                var profId = this.$route.query.campusMajursId
                api.resetDistrItem(profId).then(response=>{
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        //修改左侧学生，删除右侧学生
                        for(var i = 0; i < this.tableData3.length; i++){
                            var stu = this.tableData3[i]
                            stu.clazzId = null
                            stu.clazzName = null
                        }
                        for(var i = 0; i < this.tableData4.length; i++){
                            var clz = this.tableData4[i]
                            clz.count = 0
                            clz.girlDistrItemList = []
                            clz.boyDistrItemList = []
                        }
                    }else{
                         this.$message.error(meta.message);
                    }
                })
            },
            //回跳页面
            returnClick(){
                this.$router.push({
                    name:'classDis',
                    query:{
                        campusId: '0761de6d4a1c43cc9a39180222cecd8a',
                        campusDepartId: 'd82de0f42f6b4187bbdd21c8928877b2c',
                        campusMajursId: '7ca3abdc64954893aaf0a7e26fasdfde'              
                    }
                })
            },
            // 一进页面加载
            loadclassData(){
                var campusId = this.$route.query.campusId;
                var campusDepartId = this.$route.query.campusDepartId
                var campusMajursId = this.$route.query.campusMajursId
                api.loadclassData(campusId,campusDepartId,campusMajursId).then(response => {
                    var mydata = response.data;
                    var mymeta = response.data.meta;
                    console.log("整个页面的数据")
                    console.log(mydata)
                    if (mymeta.code == '200'){
                        console.log("luqufangshi:")
                        console.log(mydata.data.admitMethodList)
                        this.letop.campus = mydata.data.campus;
                        this.letop.department = mydata.data.dept;
                        this.letop.majors = mydata.data.prof;
                        // this.letop.profNameid = mydata.data.profName;
                        this.form2.sorts = mydata.data.admitMethodList;
                        this.tableData3 = mydata.data.l;                      
                        if(typeof(mydata.data.r) != "undefined"){
                            this.tableData4 = mydata.data.r;
                            this.boyList = new Array(this.tableData4.length);
                            this.girlList = new Array(this.tableData4.length);
                            for(var i = 0; i < this.boyList.length; i++){
                                this.boyList[i] = [];
                                this.girlList[i] = []
                            }
                            console.log("haha")
                            console.log(this.boyList)
                        }                
                    }else{
                        alert(mymeta.message);
                    }

                })
            }
        },
		components:{
			fcHeader
		},
        created (){
            this.loadclassData()
            // console.log(this.$route.query);
            // var campusDepartId=this.$route.query.campusDepartId;
            // var campusId=this.$route.query.campusId;
            // var campusMajursId=this.$route.query.campusMajursId;
            // api.loadclassData(campusDepartId,)
           
        },
        watch:{
            data:function(){
                // alert('1')
             this.loadclassData()
            }
        },
        
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
				.tableft-x{
					float: left;
                    line-height: 55px;
                    overflow: hidden;
                    width: 50%;
                    h5{
                        color:#208af5;
                        font-size:16px;
                        border-bottom:2px solid #208af5;
                        float:left;
                        font-weight:bold;
                    }
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
        .classdistr-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            // 左侧
            .left-box{
                overflow: hidden;
                border-right: 1px solid #eeeeee;
                min-height: 780px;
                padding-right: 22px;
                .el-breadcrumb{
                    font-size: 14px;
                }
                .letop{
                    overflow: hidden;
                    .el-breadcrumb__separator{
                        margin: 0;
                        margin-left: 4px;
                    }
                    .el-breadcrumb__separator{
                        color: #333;
                    }
                    .el-breadcrumb__item__inner{
                         color: #333;
                    }
                    .camp{
                        float: left;
                        margin-right: 22px;
                        height: 36px;
                        line-height: 36px;
                    }
                    .totnum{
                        float: left;
                        margin-right: 22px;
                        height: 36px;
                        line-height: 36px;
                        i{
                            color: #ef0000;
                        }
                    }
                }
                .letopt{
                    overflow: hidden;
                    line-height: 36px;
                    div{
                        float: left;
                    }
                    .cate{
                        float: right;
                        width: 70%;
                        .el-form-item{
                            float: left;
                            margin-bottom: 10px;
                            .el-form-item__label{
                                width: 56px !important;
                            }
                            .el-form-item__content{
                                margin-left: 0 !important;
                            }
                        }
                        .single{
                            float: right;
                            .el-radio-group{
                                height: 40px;
                                line-height: 48px;
                            }
                        }
                    }
                }
                .tabbottom{
                    table td{border: 0;}
                    // 添加后变灰色
                    .changegray{
                        color:#999999;
                    }
                }
                .el-table--border td, .el-table--border th{
                    border-right:0 !important; 
                }
                .reset{
                    width: 96px;
                    height: 42px;
                    float: right;
                    margin-top: 24px;
                    background-color: #91c604;
                    border-color: #91c604;
                }
                .el-table__body-wrapper{
                    height: 588px;
                }
            }
            // 右侧
            .right-box{
                padding-left: 22px;
                // width: 230px;
                overflow: hidden;
                .cladisbox{
                    // width: 100%;
                    height: 681px;
                    overflow: auto;
                    border: 1px solid #dfe6ec;
                    .el-collapse{
                        border: 0;
                    }
                    .el-collapse-item__header{
                        height:20px;
                        min-height: 20px;
                        line-height: normal;
                        padding:14px 0;
                        .el-collapse-item__header__arrow{
                            line-height: 44px;
                            float: right;
                        }
                        .el-collapse-item__arrow{
                            line-height: normal;
                        }
                        ul{
                            float: left;
                            width:94%;
                            padding-left:8px;
                            li{
                                float: left;
                                margin-right: 9px;
                                span{
                                    color: #ef0000;
                                }
                            }
                            .suspend-box{
                                float: right;
                                div{
                                    float: left;
                                    margin-left: 14px;
                                }
                                .addstu,.remstu,.delstu{cursor: pointer;}
                            }
                        }
                    }
                    .el-collapse-item__wrap{
                        overflow: visible;
                    }
                    .el-collapse-item__content{
                        padding:0;
                        .girlbox{
                            height: 114px;
                            background-color: #feebeb;
                            padding: 14px;
                            vertical-align: middle;
                            overflow: hidden;
                            overflow :auto;
                            position: relative;
                            .girlleft{
                                float: left;
                                overflow: hidden;
                                position: absolute;
                                top:5px;
                                left:5px;
                            }
                            .girlright{
                                margin-left: 10px;
                                .el-checkbox{
                                    color: #413c3c;
                                    margin-bottom: 8px;
                                    margin-left: 0;
                                    margin-right: 10px;
                                    .el-checkbox__label{
                                        padding-left: 6px;
                                    }
                                }
                            }
                        }
                        .boybox{
                            height: 96px;
                            background-color: #eef6ff;
                            padding: 14px;
                            vertical-align: middle;
                            overflow: hidden;
                            overflow :auto;
                            position: relative;
                            .boyleft{
                                float: left;
                                overflow: hidden;
                                position: absolute;
                                top:5px;
                                left:5px;
                            }
                            .boyright{
                                margin-left: 10px;
                                .el-checkbox{
                                    color: #413c3c;
                                    margin-bottom: 8px;
                                    margin-left: 0;
                                    margin-right: 10px;
                                    .el-checkbox__label{
                                        padding-left: 6px;
                                    }
                                }
                            }
                        }
                    }
                }
                // .distribut-one{
                //     margin-bottom: 20px;
                // }
                .divide-class{
                    // font-size: 14px;
                    // font-weight: bold;
                    // overflow: hidden;
                    
                    .automat{
                        float: right;
                        margin-left: 30px;
                        cursor: pointer;
                        img{
                            float: left;
                            margin-top: 2px;
                            margin-right: 6px;
                        }
                        span{
                            display: inline-block;
                            margin-top: 5px;
                        }
                    }
                    .aut{
                            color: #6e5c27;
                        }
                }
                .distrib{
                    float: left;
                }
                .rigtop{
                    line-height: 36px;
                    height: 36px;
                    margin-bottom: 15px;
                    .numright{
                        float: right;
                        width: 44%;
                        .deter{
                            float: right;
                        }
                        .clanum{
                            width: 156px;
                            display: inline-block;
                        }
                    }
                }
                // .sechead{
                //     overflow: hidden;
                //     height: 18px;
                //     width: 100%;
                //     line-height: 18px;
                //     ul{
                //         li{
                //             float: left;
                //             margin-right: 28px;
                //             span{
                //                 color: #ef0000;
                //             }
                //         }
                //         .addcoun{
                //             float: right;
                //             cursor: pointer;
                //         }
                //         .clagrad{
                //             font-size: 16px;
                //         }
                //     }
                // }
                
                // .suspend{
                //     height: 38px;
                //     background-color: #eef6ff;
                
                // }
                // .distribut-two{
                //     margin-top: 20px;
                // }
                .sub{
                    width: 96px;
                    height: 42px;
                    margin-top: 24px;
                }
            }
            
        }
        // // 添加辅导员
        // .add-counsellor{
        //     width: 480px;
        //     height: 316px;
        //     padding: 20px;
        //     z-index: 2;
        //     position: fixed;
		// 	top: 50%;
		// 	left: 50%;
		// 	transform:translate(-50%,-50%);
        //     background-color: #fff;
        //     border-radius: 6px;
        //     .coun-top{
        //         overflow: hidden;
        //         height: 32px;
        //         line-height: 32px;
        //         margin-bottom: 34px;
        //         .coun-cluster{
        //             float: left;
        //         }
        //         .coun-close{
        //             float: right;
        //             cursor: pointer;
        //         }
        //     }
        //     .el-form-item__label{
        //         text-align: left;
        //         width: 92px !important;
        //     }
        //     .el-form-item__content{
        //         margin-left: 92px !important;
        //     }
        //     .el-select{
        //         width: 100%;
        //     }
        //     .sub{
        //         width: 96px;
        //         height: 42px;
        //         float: right;
        //     }
        // }
        // 自动分班
        .auto-class{
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
            .el-dialog__body{
                overflow: hidden;
            }
			.el-dialog--small{
                width:25%;
            }
            .el-checkbox-group{
                text-align: center;
                .el-checkbox{
                    float: left;
                    margin-bottom:8px;
                    margin-right: 10px;
                }
            }
            .el-checkbox+.el-checkbox{
                margin-left:0;
            }
            .sub{
                width: 96px;
                height: 42px;
                float: right;
                margin-top: 100px;
            }
        }
</style>