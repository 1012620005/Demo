<template>
	<div class="contanier">
        <!--主体内容-->
        <el-row :span="24" class="enplan-main">
            <el-col :span="24"  class="enplan-top">
                <el-form :inline="true" :model="formline" class="demo-form-inline">
                    <el-form-item class="addplan">
                        <div  @click="addPlan()"><img src="../../../../assets/img/orientation/add.png" alt=""></div>
                    </el-form-item>
                    <el-form-item label="校区">
                        <el-select v-model="formline.setion" clearable placeholder="" value-key="id" @change="campus1(formline.setion.id,'2')">
                            <el-option v-for="item in setions" :key="item.id" :label="item.name"  :value="item">{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="院系">
                        <el-select v-model="formline.depart" placeholder="" value-key="id" @change="campus1(formline.depart.id,'3')">
                            <el-option v-for="item in departs" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业">
                        <el-select v-model="formline.major" placeholder="" value-key="id"><!-- @change="majorChang($event)"-->
                            <el-option v-for="item in majors" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="负责人">
                        <el-select v-model="formline.reoer" placeholder="" value-key="dutyId" @change="reoerChange"> 
                            <el-option v-for="item in reoers" :key="item.dutyId" :label="item.dutyPerson" :value="item">{{item.dutyPerson}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入学学期" class="sch-semester">
                        <el-select v-model="formline.acyear" placeholder="" @change="acyearChange">
                            <el-option v-for="item in acyears" :key="item" :label="item" :value="item">{{item}}</el-option>
                        </el-select>
                    </el-form-item> -->
                    <div class="enplan-derivat"><a :href="exportAdmitPlanExcel" class="export clearfix handle"><span class="imgScript exporticon"></span>导出</a></div>
                </el-form>
            </el-col>
            <el-col :span="24" class="enplan-list">
                <div class="tabload">
                    <template>
                        <el-table :data="tableDataen" stripe style="width: 100%" >
                            <el-table-column prop="ord" label="序号" width="66" type="index"></el-table-column>
                            <el-table-column prop="campusName" label="校区"></el-table-column>
                            <el-table-column prop="deptName" label="院系"></el-table-column>
                            <el-table-column prop="profName" label="专业"></el-table-column>
                            <el-table-column prop="xq" label="入学学期"></el-table-column>
                            <el-table-column prop="planAdmitCount" label="计划招生人数" width="120"></el-table-column>
                            <el-table-column prop="enrol" label="实际招生人数" width="120"></el-table-column>
                            <el-table-column prop="oper" label="操作" width="100">
                                <template slot-scope="scope">
                                    <div>
                                        <span class="btns editor" @click="dialogFormShow(scope.$index,scope.row)" ></span>
                                        <span class="btns delete" @click="deleteDialog(scope.$index,scope.row)"></span>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
                <div class="block">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="page.pageNo"
                        :page-size="page.pageSize"
                        layout="prev, pager, next, jumper"
                        :total="page.count">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <!--添加招生计划-->
        <el-dialog :visible.sync="dialogFormVisible" class="addplans">
            <div slot="title" class="addclasses-cpm" >
                <p v-if="formplans.id != ''">修改招生计划</p>
                <p v-else>添加招生计划</p>
            </div>
            <el-form ref="form" :model="formplans" label-width="100px">
                <el-form-item label="校区:">
                    <el-select v-model="formplans.addsetion" clearable placeholder="" value-key="id" @change="campus2(formplans.addsetion.id,'2')">
                        <el-option  v-for="item in setionsAnoth" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="院系:">
                    <el-select v-model="formplans.adddepart" placeholder="" value-key="id" @change="campus2(formplans.adddepart.id,'3')">
                        <el-option v-for="item in adddeparts" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业:">
                    <el-select v-model="formplans.addmajor" value-key="id" placeholder="">
                        <el-option v-for="item in addmajors" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学期:">
                    <el-select v-model="formplans.addacayear" placeholder="" value-key="id">
                        <el-option  v-for="item in addacyears" :key="item.id" :label="item.xq" :value="item">{{item.xq}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计划招生人数:" class="plannum">
                    <el-input v-model="formplans.admnum"></el-input>
                </el-form-item>
                <el-button type="primary" class="sub" @click="submit">提交</el-button>
            </el-form>
        </el-dialog>

	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../../common/header.vue'
    import api from '../../../../apis/orientation/recruitAdmin.js'

	export default {
		data () {
			return {
                formline: {
                    setion: '',
                    depart: '',
                    major:'',
                    reoer:'',
                    acyear:''
                },
                tableDataen: [],
                formplans:{
                    addsetion:{},
                    adddepart:{},
                    addmajor:{},
                    edusys:{},
                    addacayear:'',
                    admnum:'',
                    admper:'',
                },
                setions:[],
                departs:[],
                majors:[],
                reoers:[],
                acyears:[],
                setionsAnoth:[],
                adddeparts:[],
                addmajors:[],
                addacyears:[],
                dialogFormVisible: false,
                // 分页
                currentPage: 1,
                page: {
                    pageSize: 10,
                    pageNo: 1,
                    count: 0
                },
                flag:false,
                exportAdmitPlanExcel:''//导出
            }
		},
		components:{
			// fcHeader
		},
        methods:{
            addPlan(){
                this.formplans.id = ''
                this.formplans.addsetion = {}
                this.formplans.adddepart= {}
                this.formplans.addmajor= {}
                this.formplans.addacayear = {};
                this.formplans.admnum = '';
                this.dialogFormVisible = true;
            },
            campus1(id, type){
                let tables = {
                    id: id,
                    type: type
                }
                api.loadSelect(tables).then(response => {
                    if(response.data.meta.code == 200){
                        if(type =='2'){
                            this.departs = response.data.data;
                            this.formline.depart = '';
                            this.formline.major = '';
                            this.majors = [];
                        }else if(type =='3'){
                            this.majors = response.data.data;
                            this.formline.major = '';
                        }else if(type=='4'){
                            this.setions = response.data.data;
                        }
                    }
                });
                this.loadList();
            },
            campus2(id, type, flag){
                let tables = {
                    id: id,
                    type: type
                }
                api.loadSelect(tables).then(response => {
                    if(response.data.meta.code == 200){
                        if(type =='2'){
                            this.adddeparts = response.data.data;
                            if (!this.flag) {
                                this.formplans.adddepart = '';
                                this.formplans.addmajor = '';
                                this.addmajors = [];
                            }
                        }else if(type =='3'){
                            this.addmajors = response.data.data;
                            if(!this.flag){
                                this.formplans.addmajor = '';
                            }
                        }else if(type=='4'){
                            this.setionsAnoth = response.data.data;
                        }
                    }
                });
                this.loadList();
            },
             // 添加招生计划
            submit(){
                var subPlan = {
                    campusId: this.formplans.addsetion.id,
                    campusName: this.formplans.addsetion.name,
                    deptId: this.formplans.adddepart.id,
                    deptName: this.formplans.adddepart.name,
                    profId: this.formplans.addmajor.id,
                    profName: this.formplans.addmajor.name,
                    planAdmitCount: this.formplans.admnum,
                    yearId: this.formplans.addacayear.id,
                    id:this.formplans.id,
                }
                var qs = require('querystring')
                var data = qs.stringify(subPlan)
                api.addAdmissionplan(data).then(response => {
                    if(response.data.meta.code == 200){
                        api.initialLoad().then(response => {
                            if(response.data.meta.code == 200){
                                this.tableDataen = response.data.data.list;
                            }
                        });
                    }
                });
                this.dialogFormVisible = false;
            },
            // 点击删除招生计划
            deleteDialog(index,row){
                this.$confirm('是否确定删除此条招生计划？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delet2 = {
                        id: row.id 
                    }
                    this.tableDataen.splice(index,1);
                    api.deleAdmissionplan(delet2).then(response => {
                        this.datadata = response.data.data;
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            // 修改招生计划
            dialogFormShow(index,row){
                console.log(row)
                this.flag = true;
                this.formplans.addsetion = {
                    id  : row.campusId,
                    name: row.campusName
                }
                this.campus2(row.campusId,'2')
                this.campus2(row.deptId,'3')
                this.formplans.adddepart= {
                    id:row.deptId,
                    name:row.deptName
                }
                this.formplans.addmajor= {
                    id:row.profId,
                    name:row.profName
                }
                this.formplans.addacayear = {'xq':row.xq,'id':row.yearId};
                this.formplans.admnum = row.planAdmitCount;
                this.formplans.id = row.id;
                this.dialogFormVisible = true;
            },
            loadList(){
                let params = {
                    campusId: this.formline.setion.id,
                    deptId: this.formline.depart.id,
                    profId: this.formline.major.id,
                    pageNo: this.page.pageNo,
                    pageSize: this.page.pageSize,
                };
                api.initialLoad(params).then(response => {
                    var meta = response.data.meta;
                    var mydata = response.data.data;
                    if(meta.code == 200){
                        this.tableDataen = mydata.list;
                        this.page.pageNo = mydata.pageNo;
                        this.page.pageSize = mydata.pageSize;
                        this.page.count = mydata.count;
                    }
                });
            },
            handleCurrentChange(val) {
                this.page.pageNo=val;
                this.loadList();
            },
        },
        computed:{
            
        },
        mounted () {
            this.loadList();
            //一进页面加载校区
            this.campus1('1','4');
            this.campus2('1','4');
            // 一进页面加载学期
            api.findAllGrade().then(response => {
				if(response.data.meta.code == 200){
					this.acyears = response.data.data;
                    this.addacyears = response.data.data;
				}
			});
            // 导出
            this.exportAdmitPlanExcel = api.exportAdmitPlanExcel();
        }
	}
</script>
<style type="text/css" lang="scss" scoped>
    .enplan-main{
        width:1200px;
        margin: 0 auto;
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
        .enplan-top{
            .enplan-derivat{
                float: right;
                height: 36px;
                line-height: 36px;
                cursor: pointer;
                span{
                    float: left;
                    margin-top: 9px;
                }
            }
            .addplan{
                width: 5%;
                .el-form-item__content{
                    width:100%;
                    cursor: pointer;
                    img{
                        margin-top: 11px;
                    }
                }
            }
            .sch-semester{
                width:18%
            }
        }
        
        .enplan-list{
            .innums{
                .el-input__inner{
                    background-color: transparent;
                    border-radius: 0;
                    border-top: 0;
                    border-left: 0;
                    border-right: 0;
                    height: 26px;
                }
            }
            .block{
                text-align: center;
                margin-top: 40px;
            }
            .el-table .cell, .el-table th>div{
                padding-left: 10px;
                padding-right: 10px;
            }
            .editor,.delete{
                cursor:pointer;
            }
            .el-table__body-wrapper{
                height:595px;
                overflow-y:auto;
            }
        }
    }
    // 添加招生计划
    .addplans{
        .el-dialog__body{
            overflow: hidden;
        }
        .el-form-item{
            margin-right: 17px;
            .el-form-item__content{
                width:35%;
            }
        }
        .sub{
            width:96px;
            height:40px;
            float: right;
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
    }
</style>
<style type="text/css" lang="scss">
    .enplan-main{
        .enplan-top{
            .el-form-item{
                width:15%;
                .el-form-item__content{
                    width:66%;
                }
            }
        }
    }
    .addplans{
        .el-dialog{
            width:25%;
        }
        .el-dialog__header,.el-dialog__body{
            overflow: hidden;
        }
        .el-dialog--small{
            width: 25%;
        }
        .plannum{
            .el-form-item__content{
                width:48%;
            }
        }
    }
</style>
