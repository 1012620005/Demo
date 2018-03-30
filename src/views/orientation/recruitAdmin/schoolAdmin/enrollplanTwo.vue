<template>
	<div class="contanier">
        <!--主体内容-->
        <el-row :span="24" class="enplan-main">
            <el-col :span="24"  class="enplan-top">
                <el-form :inline="true" :model="formline" class="demo-form-inline">
                    <el-form-item class="addplan">
                        <div  @click="addPlan()"><img src="../../../../assets/img/orientation/add.png" alt=""></div>
                    </el-form-item>
                    <div class="enplan-derivat"><a :href="exportAdmitAreaExcel" class="export clearfix handle"><span class="imgScript exporticon"></span>导出</a></div>
                </el-form>
            </el-col>
            <el-col :span="24" class="enplan-list">
                <div class="tabload">
                    <template>
                        <el-table :data="tableDataen" stripe style="width: 100%" >
                            <el-table-column prop="ord" label="序号" width="66" type="index"></el-table-column>
                            <el-table-column prop="xq" label="学期"></el-table-column>
                            <el-table-column prop="planAdmitPerson" label="计划招生人数"></el-table-column>
                            <el-table-column prop="enrol" label="实际招生人数" ></el-table-column>
                            <el-table-column prop="dutyPerson" label="招生负责人"></el-table-column>
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
        <el-dialog :visible.sync="dialogFormVisible" class="addplanssq">
            <div slot="title" class="addclasses-cpm" >
                <p v-if="formplans.id != ''">修改招生计划</p>
                <p v-else>添加招生计划</p>
            </div>
            <el-form ref="form" :model="formplans" label-width="100px">
                <el-form-item label="学期:">
                    <el-select v-model="formplans.addacayear" placeholder="" value-key="id">
                        <el-option  v-for="item in addacyears" :key="item.id" :label="item.xq" :value="item">{{item.xq}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计划招生人数:">
                    <el-input v-model="formplans.admnum"></el-input>
                </el-form-item>
                <el-form-item label="招生负责人:">
                    <el-select v-model="formplans.resperson" placeholder="" value-key="id">
                        <el-option  v-for="item in respersons" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分配地区:" class="disregion">
                    <div class="dis-box" v-for="(item,index) in direg" :key="index">
                        <el-form>
                            <el-form-item label="省" prop="">
                                <el-select v-model="item.province" placeholder="" @change="loadArea(item.province, '1',index,'1')">
                                    <el-option v-for="items in pros" :key="items.code" :label="items.name" :value="items.code">{{items.name}}</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="市" prop="">
                                <el-select v-model="item.city" placeholder=""  @change="loadArea(item.city, '2',index,'1')">
                                    <el-option  v-for="items in direg[index].cits" :key="items.code" :label="items.name" :value="items.code">{{items.name}}</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="县" prop="" class="county-select">
                                <el-select v-model="item.county" multiple placeholder="">
                                    <el-option  v-for="items in direg[index].counts" :key="items.code" :label="items.name" :value="items.code">{{items.name}}</el-option>
                                </el-select>
                            </el-form-item>
                            <div class="deladdress" @click="deleteDisreg(index)" v-if="index !== 0 ">
                                <img src="../../../../assets/img/orientation/delete.png" alt="">
                            </div>
                        </el-form>
                    </div>
                    <div class="addadress" @click="adddisreg">
                        <img src="../../../../assets/img/orientation/add.png" alt="">
                    </div>
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
			    radio3: '',
                num1: 1,
                radio:'',
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
                    addacayear:{},
                    admnum:'',
                    admper:'',
                    resperson:{},
                    remark:'',
                },
                direg:[
                    {
                        province:'',
                        city:'',
                        county:[],
                        cits:[],
                        counts:[],
                        
                    }
                ],
                setions:[],
                departs:[],
                majors:[],
                reoers:[],
                acyears:[],
                setionsAnoth:[],
                adddeparts:[],
                addmajors:[],
                addacyears:[],
                edusyss:[],
                respersons:[],
                num:0,
                numder:0,
                pros:[],//省
                dialogFormVisible: false,
                // 分页
                currentPage: 1,
                page: {
                    pageSize: 10,
                    pageNo: 1,
                    count: 0
                },
                search: {
                    campusId:''
                },
                flag:false,
                s:{},
                exportAdmitAreaExcel:''//导出
            }
		},
		components:{
			fcHeader
		},
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.page.pageNo=val;
                this.loadList();
            },
            addPlan(){
                this.flag = false;
                this.formplans.id = ''
                this.formplans.addacayear = {};
                this.formplans.admnum = '';
                this.formplans.resperson = {};
                this.direg=[
                    {
                        province:'',
                        city:'',
                        county:[],
                        cits:[],
                        counts:[],
                    }
                ]
                this.dialogFormVisible = true;
                 
            },
            // 通过专业加载负责人
            majorChang(event){
                this.formline.reoer = {
                    dutyId: '',
                    dutyPerson:''
                }
                var reo = {
                    profId: this.formline.major.id
                }
                if(this.formline.major !== ""){
                    api.loadHead(reo).then(response => {
                        if(response){
                            this.reoers = response.data.data;
                        }
                    });
                }
                this.loadList();
            },
            reoerChange(){
                this.loadList();
            },
            acyearChange(){
                this.loadList();
            },
            // 填写实际招生人数
            actualNum(index,row){
                
            },
            // 点击提交添加招生计划
            submit(){
                let array = []
                for(var i=0;i<this.direg.length;i++){
                    var item = this.direg[i];
                    var s = item.province + '@' + item.city + '@' + item.county.join("@")
                    array.push(s)
                }
                var arrays = array.join(",")
                var subPlan = {
                    planAdmitPerson: this.formplans.admnum,
                    dutyId: this.formplans.resperson.id,
                    yearId: this.formplans.addacayear.id,
                    areaStringList: arrays,
                    id: this.formplans.id
                }
                var qs = require('querystring')
                var data = qs.stringify(subPlan)
                if(this.formplans.id !== ''){
                    api.modifyAdmitArea(data).then(response => {
                        if(response.data.meta.code == 200){
                            api.getAdmitAreaByWhere().then(response => {
                                if(response.data.meta.code == 200){
                                    this.tableDataen = response.data.data.list;
                                }
                            });
                        }
                    });
                }else{
                    api.addAdmitArea(data).then(response => {
                        if(response.data.meta.code == 200){
                            api.getAdmitAreaByWhere().then(response => {
                                if(response.data.meta.code == 200){
                                    this.tableDataen = response.data.data.list;
                                }
                            });
                        }
                    });
                }
                this.dialogFormVisible = false;
            },
            // 加载省市县
            loadArea(code,type,index,i){
                let params = {
                    code:code
                }
                api.regionalManag(params).then(response => {
                    if(response.data.meta.code == 200){
                        if (type == '0') {
                            this.pros = response.data.data;
                        } else if (type == '1') {
                            if(!this.flag ){
                                this.direg[index].city = '';
                                this.direg[index].county = [];
                                this.direg[index].counts = [];
                            }
                            this.direg[index].cits = response.data.data;
                        } else if (type == '2') {
                            if(!this.flag){
                                this.direg[index].county = [];
                            }
                            
                            this.num +=1
                            if(this.num == this.numder){
                                this.dialogFormVisible = true;
                                this.num = 0;
                            }
                            this.direg[index].counts = response.data.data;
                        }
                    } 
                })
            },
            // 添加招生计划省市县
            adddisreg(){
                let p = {
                    province: "",
                    city: "",
                    county: [],
                    cits: [],
                    counts: []
                };
                this.direg.push(p);
            },
            // 删除招生计划省市县
            deleteDisreg(index){
                this.direg.splice(index, 1);
            },
            // 点击删除招生计划
            deleteDialog(index,row){
                this.$confirm('是否确定删除此条招生计划？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delet2 = {
                        dutyId: row.dutyId 
                    }
                    this.tableDataen.splice(index,1);
                    api.deleteAdmitArea(delet2).then(response => {
                        this.data = response.data.data;
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
                this.flag = true;
                this.formplans.addacayear = {'xq':row.xq,'id':row.yearId};
                this.formplans.admnum = row.planAdmitPerson;
                this.formplans.resperson = {'name':row.dutyPerson,'id':row.dutyId};
                this.formplans.id = row.id;
                this.s = {
                    dutyId: row.dutyId
                }
                api.getAdmitAreaByDutyId(this.s).then(response => {
                    var meta = response.data.meta;
                    var mydata = response.data.data
                    if(meta.code == 200){
                        this.direg=[];
                        this.num =0;
                        this.numder = mydata.areaList.length;
                        for(var i=0;i<mydata.areaList.length;i++){
                            let item={'province':'','city':'','county':[]};
                            item.province =  mydata.areaList[i][0].label;
                            item.city =  mydata.areaList[i][1].label;
                            for(var j=2;j<mydata.areaList[i].length;j++){
                                item.county.push(mydata.areaList[i][j].label)
                            }
                            this.direg.push(item)
                            this.loadArea(this.direg[i].province, '1',i,'0')
                            this.loadArea(this.direg[i].city, '2',i,'0')
                        }
                    }
                })
                
            },
            loadList(){
                let params = {
                    dutyPerson:this.formline.reoer.dutyPerson,
                    pageNo: this.page.pageNo,
                    pageSize: this.page.pageSize,
                };
                api.getAdmitAreaByWhere(params).then(response => {
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
        },
        computed:{
            
        },
        mounted () {
            this.loadArea('','0'); 
            api.findTcTea().then(response => {
                if(response.data.meta.code == 200){
                    this.respersons = response.data.data;
                }
            })
            this.loadList();
            // 一进页面加载学期
            api.findAllGrade().then(response => {
				if(response.data.meta.code == 200){
					this.acyears = response.data.data;
                    this.addacyears = response.data.data;
				}
            });
            this.exportAdmitAreaExcel = api.exportAdmitAreaExcel();
        },
        watch:{
            // dialogFormVisible:function(news,old){
            //     this.flag
            // }
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
        .addplanssq{
            .el-dialog__body{
                overflow: hidden;
            }
            .el-dialog--small{
                width: 60%;
            }
            .el-form{
                // overflow: hidden;
            }
            .el-form-item{
                float:left;
                width:30%;
                margin-right: 17px;
                .el-form-item__content{
                    width:35%;
                }
            }
            .disregion{
                min-height: 60px;
                position: relative;
                .dis-box{
                    margin-bottom: 10px;
                    display: inline-block;
                    width:100%;
                }
                .addadress{
                    position: absolute;
                    left:-63px;
                    top:34px;
                    cursor: pointer;
                }
                .deladdress{
                    cursor: pointer;
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
        .el-tabs--border-card>.el-tabs__content{
            padding:0;
        }
    }
    .addplanssq{
        .el-dialog__body{
            overflow: hidden;
        }
        .rec-per{
            width: 100% !important;
            .el-form-item__content{
                width:19%;
            }
        }
        .el-dialog__header,.el-dialog__body{
            overflow: hidden;
        }
        .disregion{
            width:100% !important;
            .el-form-item__content{
                width:90%;
                .el-form-item{
                    float: left !important;
                    width:24%;
                    margin-right: 14px;
                    .el-form-item__label{
                        width:30px !important;
                    }
                    .el-form-item__content{
                        margin-left:30px !important;
                    }
                }
                .county-select{
                    width:40%;
                    .el-select{
                        width:102%;
                        .el-select__tags{
                            max-height:66px;
                            overflow: auto;
                        }
                    }
                }
            }
        }
    }
</style>
