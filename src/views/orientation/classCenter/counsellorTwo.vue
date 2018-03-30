<template>
    <div class="container">
        <div class="counse-one">
            <el-form ref="form" :model="form" :inline="true" class="counapp">
                <el-form-item label="专业">
                    <el-select v-model="form.major" value-key="proid" placeholder="" clearable @change="loadGrade">
                        <el-option v-for="item in majors" :key="item.proid" :label="item.proname" :value="item">{{item.proname}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级">
                    <el-select v-model="form.grade" value-key="id" placeholder=""  @change="loadClazz">
                        <el-option v-for="item in grades" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" class="formstate">
                    <el-select v-model="form.class" placeholder="" value-key="clazzid" @change="loadStus">
                        <el-option v-for="item in classes" :key="item.clazzid" :label="item.clazzname" :value="item">{{item.clazzname}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="search-group">
                    <el-input placeholder="请输入学生姓名" v-model="form.search">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="countable">
                <template>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column type="index" label="序号" width="70"></el-table-column>
                        <el-table-column prop="oldCampusName" label="校区"  width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="stuName" label="姓名" width="80" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="sex" label="性别" width="70">
                            <template slot-scope="scope">
                                <span>{{scope.row.sex== 1 ? '男':'女'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="oldDeptName" label="原院系" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="oldProfName" label="原专业" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="oldClazzName" label="原班级" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="newClazzName" label="新班级" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="createDate" label="提交时间" width="180" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="reason" label="原因"></el-table-column>
                        <el-table-column label="操作" width="110">
                            <template slot-scope="scope">
                                <div v-if="(scope.row.state == 2 || scope.row.state == 3 || scope.row.state == 5) && scope.row.against != 3 && scope.row.against != 2" class="handle handhover clearfix">
                                    <span class="imgScript shenhe"></span>
                                    待审核
                                    <div class="shenheBounce">
                                        <div class="icons pass" @click="aduit(scope.row)">
                                            <span class="imgScript success"></span>
                                            <span>通过</span>
                                        </div>
                                        <div class="icons nopass" @click="aduit2(scope.row)"> <!-- @click="noPass"-->
                                            <span class="imgScript nosussess"></span>
                                            <span>不通过</span>
                                        </div>
                                    </div>				           	   
                                </div>
                                <div v-if="scope.row.against >= 2" class="handle clearfix">
                                    <span class="imgScript success"></span>
                                    已通过
                                </div>
                                <div v-if="scope.row.against == 3" class="handle clearfix">
                                    <span class="imgScript nosussess"></span>
                                    未通过
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="Page.pageNo" 
                :page-size="Page.pageSize" 
                layout="prev, pager, next, jumper" 
                :total="Page.count">
            </el-pagination>
        </div>
    </div>
</template>
<script type="text/javascript">
    import api from '../../../apis/orientation/counselorAudit.js'
    export default {
        data(){
            return{
                form: {
                    major:'',
                    class:'',
                    status: '',
                    search:'',
                    grade:''
                },
                majors:[],
                classes:[],
                input2: '',
                textarea: '',
                tableData: [],
                grades:[],
                form1: {
                    newcam: '',
                    newdep: '',
                    newprofe: '',
                    newclass: '',
                    delivery: false,
                },
                Page : {
                    // dividePage : true,
                    pageSize : 10,
                    pageNo : 1,
                    count : 1
                },
                searRange:[],
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleIconClick(ev) {
                console.log(ev);
            },
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                let parm={
                    'stringList' : JSON.stringify(this.searRange),
                    'pageNo': this.Page.pageNo,
                    'pageSize':this.Page.pageSize,
                }
                api.getNewCPDEMForTeac(parm).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        this.tableData = mydata.list;
                        this.Page.count = mydata.count;
                    }
                })
            },
            // 加载所有下拉框
            loadMethod(){
                var data = {'stringList' : JSON.stringify(this.searRange),
                            'pageNo' : this.Page.pageNo,
                            'pageSize' : this.Page.pageSize };
                api.getNewCPDEMForTeac(data).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        this.tableData = mydata.list;
                        this.Page.count = mydata.count;
                    }
                })
            },
            // 通过专业加载年级
            loadGrade(){
                api.findAllGrade().then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        this.grades = mydata
                    }
                })
                let params = {
                    proid : this.form.major.proid
                }
                api.loadPro(params).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        for(var i=0;i<mydata.clazz.length;i++){
                            mydata.clazz[i].newClazzId = mydata.clazz[i].clazzid
                        }
                        this.searRange = mydata.clazz
                        this.loadMethod();
                    }
                })
            },
            // 加载班级下拉框
            loadClazz(){
                let params = {
                    gradeid : this.form.grade.id,
                    proid : this.form.major.proid
                }
                api.loadPro(params).then(response =>{
                    var mydata = response.data.data;
                    var meta = response.data.meta;
                    if(meta.code == '200'){
                        for(var i=0;i<mydata.clazz.length;i++){
                            mydata.clazz[i].newClazzId = mydata.clazz[i].clazzid
                        }
                        this.classes = mydata.clazz
                        this.searRange = mydata.clazz
                        this.loadMethod();
                    }
                })
            },
            loadStus(){
                this.searRange = [{newClazzId : this.form.class.clazzid}];
                this.loadMethod();
            },
            aduit(row){
                var changeDorm = {
                    id : row.id
                }
                api.agreeChangeCPDEM(changeDorm).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        row.state = mydata.state;
                        row.against = mydata.against;
                    }
                })
            },
            aduit2(row){
                var changeDorm = {
                    id : row.id
                }
                api.disAgreeChangeCPDEM(changeDorm).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        row.state = mydata.state;
                        row.against = mydata.against;
                    }
                })
            },
            
            
        },
        components:{
        },
        mounted(){
            // 根据辅导员查询专业和班级
            api.loadPro().then(response => {
                var meta = response.data.meta;
                var mydata = response.data.data;
                if(meta.code == 200){
                    this.majors = mydata.pro;
                    return mydata
                    
                }
            }).then(mydata =>{
                let completeCounter = 0;
                // 循环遍历专业下的班级并合并
                for(var i = 0; i < this.majors.length; i++){
                    var pro = this.majors[i];
                    api.loadPro({'proid':pro.proid}).then(response => {
                        var meta = response.data.meta
                        var mydata = response.data.data
                        this.classes = this.classes.concat(mydata.clazz)
                        completeCounter++;
                    })
                }
                var _this = this;
                var timer = setInterval(function(){
                    if(completeCounter == _this.majors.length){
                        clearInterval(timer)
                        let data = [];
                        mydata.clazz.map(function(item,index){
                            data.push({'newClazzId':item.clazzid})
                        })
                        let parm={
                            'stringList' : JSON.stringify(data),
                            'pageNo': _this.Page.pageNo,
                            'pageSize':_this.Page.pageSize,
                        }
                        api.getNewCPDEMForTeac(parm).then(response =>{
                            var mydata = response.data.data;
                            var meta = response.data.meta; 
                            if(meta.code == '200'){
                                _this.tableData = mydata.list;
                                _this.Page.count = mydata.count;
                                _this.searRange = data;
                                _this.classes = [];
                            }
                        })
                    }
                },1000)
            });
                
        }
    }
</script>
<style type="text/css" lang="scss" scoped>
.counse-one{
    .countable{
        .change{
            cursor: pointer;
        }
        .el-table::after, .el-table::before{
            z-index: 0;
        }
        .shenhe{
            width: 14px;
            height: 14px;
            background: url("../../../assets/researchCenter/shenhe.png") 0 0 no-repeat;
            display: inline-block;
        }
        .handhover{
            position: relative;
            z-index: 1;
            .shenheBounce{
                display: none;
                opacity: 0;  
                position: absolute;
                right: -90px;;
                top: 0;
                min-width: 62px;
                height: 44px;
                background-color: #fff;
                padding: 10px;
                .pass{
                    i{
                        width: 14px;
                        height: 14px;
                        background: url("../../../assets/researchCenter/tongguo.png") 0 0 no-repeat;
                        display: inline-block;
                    }
                }
                .nopass{
                    i{
                        width: 14px;
                        height: 14px;
                        background: url("../../../assets/researchCenter/butongguo.png") 0 0 no-repeat;
                        display: inline-block;
                    }                    
                }
            }                
        }
        .success{
            width: 14px;
            height: 14px;
            background: url("../../../assets/researchCenter/tongguo.png") 0 0 no-repeat;
            display: inline-block;
        }
        .nosussess{
            width: 14px;
            height: 14px;
            background: url("../../../assets/researchCenter/butongguo.png") 0 0 no-repeat;
            display: inline-block;
        }
        .handle{
            cursor: pointer;
        }
        .handhover:hover{
            .shenheBounce{
                display: block;
                opacity: 1;  
                z-index: 1;
            }
        }
        .el-table .cell, .el-table th>div{
            padding-left: 10px;
            padding-right: 10px;
        }
    }
}
// 分页
.block{
    margin-top: 40px;
    text-align: center;
}
// 不通过原因
.unreason{
    width: 444px;
    height: 292px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    border-radius: 6px;
    z-index: 2;
    padding: 18px;
    overflow: hidden;
    .ures-top{
        height: 32px;
        line-height: 32px;
        overflow: hidden;
        margin-bottom: 24px;
        .ures-cluster{
            float: left;
        }
        .ures-close{
            float: right;
            cursor: pointer;
        }
    }
    .ures-center{
        textarea{
            width: 100%;
            height: 164px;
            border: 0;
            background-color: #fafafa;
        }
    }
    .conf{
        width: 96px;
        height: 42px;
        float: right;
        margin-top: 30px;
    }
}
// 遮罩层
.desk{
    z-index: 1 !important;
}

</style>
<style type="text/css" lang="scss">
    .counse-one{
        .el-form-item{
            width: 18%;
            .el-form-item__content{
                width: 75%;
            }
        }
        .search-group{
            i{
                width: 16px;
                height: 16px;
                margin: 10px;
                display: inline-block;
                float: right;
                cursor: pointer;
                background: url("../../../assets/researchCenter/search.png") 0 0 no-repeat;
            }
            .el-icon-search:before{
                content:"";
            }                
        }
        .states{
            .el-form-item__content{
                width: 65% !important;
            }
        }
        .countable{
            .el-table .cell, .el-table__footer-wrapper, .el-table__header-wrapper,.el-table,.el-table__body-wrapper{
                overflow: visible;
            }
        }
    }
</style>