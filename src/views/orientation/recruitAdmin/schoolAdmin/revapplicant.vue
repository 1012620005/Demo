<template>
	<div class="contanier">
		<fc-header></fc-header>
		<!--审核学生申请-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					审核新生
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="revapp-main">
            <el-col :span="24"  class="revapp-top">
                <el-form :inline="true" :model="formline" class="demo-form-inline">
                    <el-form-item label="审核专业">
                        <el-select v-model="formline.profe" placeholder="" @change="scrprof" clearable>
                            <el-option v-for="item in profes" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="formline.state" placeholder="" @change="scrstate" clearable>
                            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">{{item.label}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="search-group">
                        <el-input placeholder="请输入学生姓名" v-model="formline.name">
                            <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div class="exporte"><a :href="exportExcel"><img src="../../../../assets/img/orientation/export.png" alt=""></a></div>
            </el-col>
            <el-col :span="24" class="revapp-list">
                <template>
                    <el-table :data="tableDataen" stripe style="width: 100%">
                        <el-table-column prop="ord" type="index" label="序号" width="66"></el-table-column>
                        <el-table-column prop="name" label="学生姓名" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="sexName" label="性别" width="80">
                            <!-- <template slot-scope="scope">
                                <span>{{scope.row.sex== 1 ? '男':'女'}}</span>
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="idcard" label="身份证" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="profName" label="专业" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="clazzName" label="特色班" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="score" label="中考成绩" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="state" label="状态">
                            <template slot-scope="scope">
                               <div v-if="scope.row.state == 1" class="nosehnhe clearfix">
                                    未审核
                                </div>
                                <div v-else-if="scope.row.state == 2" class="through clearfix">
                                    审核通过
                                </div>
                                <div v-else-if="scope.row.state == 3" class="print clearfix">
                                    已打印通知书
                                </div>
                                <div v-else-if="scope.row.state == 4" class="nothrough clearfix">
                                    审核未通过
                                </div>
                                <div v-else-if="scope.row.state == 5" class="infolack clearfix">
                                    信息缺失
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state" label="操作">
                            <template slot-scope="scope">
                               <div v-if="scope.row.state == 1" class="handle handshow clearfix" @click="audit(scope.$index,scope.row)">
                                    <button size="mini" class="shehe">审核</button>
                                </div>
                                <div v-else-if="scope.row.state == 2" class="handle clearfix">
                                    <button size="mini" class="printing">打印通知书</button>
                                </div>
                                <div v-else-if="scope.row.state == 3" class="handle clearfix" @click="see(scope.$index,scope.row)">
                                    <button size="mini" class="chakan">查看</button>
                                </div>
                                <div v-else-if="scope.row.state == 4" class="handle clearfix" @click="see(scope.$index,scope.row)">
                                    <button size="mini" class="chakan">查看</button>
                                </div>
                                <div v-else-if="scope.row.state == 5" class="handle clearfix" @click="see(scope.$index,scope.row)">
                                    <button size="mini" class="chakan">查看</button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
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
        <!--审核-->
        <el-dialog :visible.sync="dialogTableVisible" class="audits">
            <div slot="title" class="addclasses-cpm" >
                <p>审核</p>
            </div>
            <div class="audit-bottom">
                <div class="com">
                    <div class="exptit">
                        <h4>基本信息</h4>
                        <div class="expword"><a :href="exportWord + user.id"><img src="../../../../assets/img/orientation/expword.png" alt=""></a></div>
                    </div>
                    <ul class="baseinform">
                        <li><div><i>*</i>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</div><span>{{user.name}}</span></li>
                        <li><div><i>*</i>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div><span>{{user.sexName}}</span></li>
                        <li><div><i>*</i>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</div><span>{{user.nationName}}</span></li>
                        <li><div><i>*</i>身份证号：</div><span>{{user.idcard}}</span></li>
                        <li><div><i>*</i>出生日期：</div><span>{{user.birthday}}</span></li>
                        <li><div>录取方式：</div><span>{{user.admitName}}</span></li>
                        <li><div>学制：</div><span>{{user.xzName}}</span></li>
                        <li><div><i>*</i>应届/往届：</div><span>{{user.yingjieName}}</span></li>
                        <li><div><i>*</i>毕业学校：</div><span>{{user.graduateSchool}}</span></li>
                        <li><div>中考成绩：</div><span>{{user.score}}</span></li>
                        <li><div><i>*</i>政治面貌：</div><span>{{user.politicalName}}</span></li>
                        <li><div><i>*</i>户口性质：</div><span>{{user.hkxzName}}</span></li>
                        <li><div><i>*</i>生源地：</div><span>{{user.stuSourceName}}</span></li>
                    </ul>
                </div>
                <div class="com">
                    <h4>家庭信息</h4>
                    <ul class="baseinform">
                        <li><div><i>*</i>父亲姓名：</div><span>{{user.father}}</span></li>
                        <li class="jtinfo"><div><i>*</i>联系电话：</div><span>{{user.fatherPhone}}</span></li>
                        <li><div><i>*</i>母亲姓名：</div><span>{{user.mother}}</span></li>
                        <li><div><i>*</i>联系电话：</div><span>{{user.motherPhone}}</span></li>
                        <li class="det"><div><i>*</i>家庭地址：</div><span>{{user.provinceName}}{{user.cityName}}{{user.countyName}}{{user.address}}</span></li>
                    </ul>
                </div>
                <div class="com">
                    <h4>申请材料</h4>
                    <ul class="baseinform">
                        <li class="fsort"><div><i>*</i>专业：</div><span>{{user.profName}}</span></li>
                        <li class="fsort"><div><i>*</i>特色班：</div><span>{{user.clazzName}}</span></li>
                        <li class="det certif"><div><i>*</i>毕业证书：</div><span><img v-for="item in gradus" :src="item" @click="showimg(item)" /></span></li>
                    </ul>
                </div>
                <div class="btnss" v-if="seedetail">
                    <div class="nopass" @click="onSubmit(5)"><img src="../../../../assets/img/orientation/queshi.png" alt="">信息缺失</div>
                    <div type="primary" @click="onSubmit(2)" class="pass"><img src="../../../../assets/img/orientation/tonguo.png" alt="">通过</div>
                    <div class="nopass" @click="onSubmit(4)"><img src="../../../../assets/img/orientation/btongguo.png" alt="">不通过</div>
                </div>
            </div>
        </el-dialog>
        <el-dialog class="show-photo" :visible.sync="showIdz">
            <div slot="title" class="addclasses-cpm" >详情</div>
            <img :src="show_img" />
        </el-dialog>

	</div>
</template>
<script type="text/javascript">
    import fcHeader from '../../../common/header.vue'
    import api from '../../../../apis/orientation/recruitAdmin.js'
    import apis from '../../../../apis/userCenter.js'
    import commonFile from '../../../../apis/commonFile.js'

	export default {
		data () {
			return {
			    radio3: '',
                num1: 1,
                radio:'',
                textarea: '',
                formline: {
                    profe:'',
                    state:'',
                    name:''
                },
                show_img:'',
                tableDataen: [],
                formplans:{
                    majors:'',
                    edusys:'',
                    admnum:'',
                    admper:'',
                    remark:''
                },
                user:{
                    name:'',//姓名
                    sexName:'',//性别
                    nationName:'',//民族
                    idcard:'',//身份证号
                    birthday:'',//出生日期
                    admitName:'',//录取方式
                    xzName:'',//学制
                    yingjieName:'',//应届/往届
                    graduateSchool:'',//毕业学校
                    score:'',//中考成绩
                    politicalName:'',//政治面貌
                    hkxzName:'',// 户口性质
                    stuSourceName:'',//生源地
                    father:'',//父亲姓名
                    fatherPhone:'',//联系电话
                    mother:'',//父亲姓名
                    motherPhone:'',//联系电话
                    provinceName:'',//省
                    cityName:'',//市
                    countyName:'',//县
                    address:'',//详细地址
                    profName:'',//专业
                    clazzName:'',//特色班
                    attachment:{},//毕业证书
                },
                gradus:[],
                profes:[],//专业
                states:[],//审核状态
                dialogTableVisible:false,
                // 分页
                currentPage: 1,
                myaudit : {},
                page: {
                    pageSize: 10,
                    pageNo: 1,
                    count: 0
                },
                showIdz:false,
                stuId:'',
                seedetail:true,
                exportExcel:'',
                exportWord:''
            }
		},
		components:{
			fcHeader
		},
        methods:{
            showimg(url){
                this.showIdz = true;
                this.show_img = url;
            },
            handleChange(value) {
                console.log(value);
            },
            // 搜索查询
            handleIconClick() {
                this.loadList();
                this.exportsExc();
            },
            scrprof(){
                this.loadList();
                this.exportsExc();
            },
            scrstate(){
                this.loadList();
                this.exportsExc();
            },
            // 点击待审核
            audit(index,row){
                this.myaudit = row
                this.dialogTableVisible=true;
                let audetail = {
                    id: row.id
                }
                api.getStuApplyByIdOrIdCard(audetail).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == 200){
                        this.user = mydata;
                        this.gradus = [];
                        var pict = mydata.attachment.split('@')
                        for(var i=0;i<pict.length;i++){
                            this.gradus.push(commonFile.getFileDownloadUrl(pict[i]));
                        }
                    }else{
                        this.$message({
                            showClose: true,
                            message: '请完善招生计划',
                            type: 'error'
                        });
                        return false;
                    }
                })
            },
            // 查看详情
            see(index,row){
                this.seedetail = false
                this.myaudit = row
                this.dialogTableVisible=true;
                let audetail = {
                    id: row.id
                }
                api.getStuApplyByIdOrIdCard(audetail).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == 200){
                        this.user = mydata;
                        this.gradus = [];
                        var pict = mydata.attachment.split('@')
                        for(var i=0;i<pict.length;i++){
                            this.gradus.push(commonFile.getFileDownloadUrl(pict[i]));
                        }
                    }
                })
            },
            // 审核弹框通过不通过
            onSubmit(sta) {
                let state = {
                    id: this.myaudit.id,
                    state: sta
                }
                var qs = require('querystring')
                var data = qs.stringify(state)
                api.auditStuApply(data).then(response =>{
                    if(response.data.meta.code == 200){
                        this.myaudit.state = sta
                    }
                })
                this.dialogTableVisible=false
            },
            // 分页
            handleCurrentChange(val) {
                this.page.pageNo=val;
                this.loadList();
            },
            loadProf(){
                api.loadProfess().then(response => {
                    if(response.data.meta.code == 200){
                        this.profes = response.data.data;
                    }
                })
            },
            getDict() {//一进页面加载审核状态
                let params = {
                    type : 'stu_ent_state'
                }
                api.getDictMapList(params).then(response =>{
                    if(response.data.meta.code == 200){
                        this.states = response.data.data;
                    }
                })
            },
            loadList() {//一进页面加载列表
                var params = {
                    name: this.formline.name,
                    profId: this.formline.profe,
                    state: this.formline.state,
                    pageNo: this.page.pageNo,
                    pageSize: this.page.pageSize,
                }
                api.getStuApplyByWhere(params).then(response => {
                    if(response.data.meta.code == 200){
                        this.tableDataen = response.data.data.list; 
                        this.page.pageNo = response.data.data.pageNo;
                        this.page.pageSize = response.data.data.pageSize;
                        this.page.count = response.data.data.count;
                    }
                });
            },
            returnClick(){
                this.$router.push({
                    name:'newIndex'
                })
            },
            exportsExc(){
                let expe = {
                    pageNo: this.page.pageNo,
                    pageSize: this.page.pageSize,
                    profId: this.formline.profe,
                    state: this.formline.state
                }
                this.exportExcel = api.exportExcel(expe);
            }
            
        },
        computed:{
        
        },
        mounted () {
            // 一进页面加载专业
            this.loadProf();

            // 一进页面加载审核状态
            this.getDict();

            // 一进页面加载表格
            this.loadList();
            
            // 导出
            this.exportsExc();

            this.exportWord = api.exportWordById();
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
        .revapp-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .revapp-list{
                .block{
                    text-align: center;
                    margin-top: 40px;
                }
                .handshow,button{cursor: pointer;}
                .nosehnhe{
                    color: #208af5;
                }
                .through{
                    color:#68c046;
                }
                .print{
                    color:#bdbdbd;
                }
                .nothrough{
                    color:#f36d6e;
                }
                .infolack{
                    color:#efb551;
                }
                button{
                    width:44px;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    border-radius: 3px;
                }
                .shehe{
                    border:1px solid #69b4ff;
                    background-color: #e2f0fe;
                    color:#69b4ff;
                }
                .printing{
                    border:1px solid #fbcd39;
                    background-color: #ffefcb;
                    color:#efb551;
                    width:75px;
                }
                .chakan{
                    border:1px solid #d2d2d2;
                    background-color: #fff;
                    color:#9c9c9c;
                }
            }
        }
        // 审核
        .audits{
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
            .audit-bottom{
                .baseinform{
                    overflow: hidden;
                    li{
                        float: left;
                        width: 33%;
                        margin-bottom: 20px;
                        i{color:#ef0000;}
                        div{
                            width: 88px;
                            float: left;
                            text-align: right;
                            span{float:left;}
                        }
                    }
                    .fsort{
                        width: 33%;
                    }
                    .jtinfo{
                        margin-right: 200px;
                    }
                    .det{width: 100%;overflow: hidden;}
                    .certif{
                        overflow: hidden;
                        span{
                            float:left;
                            // width:160px;
                            min-height:80px;
                            img{
                                width:150px;
                                float: left;
                                margin-right:10px;
                            }
                        }
                    }
                    .idcard{
                        .iddddd{
                            width:160px;
                            img{
                                width:160px;
                                height:80px;
                            }
                            float:left;
                            margin-right: 60px;
                            text-align: center;
                        }
                    }
                }
                .exptit{
                    overflow:hidden;
                    h4{
                        float:left;
                    }
                    .expword{
                        float:right;
                    }
                }
                h4{
                    margin-bottom: 20px;
                    font-size: 16px;
                }
                .reason{
                    overflow: hidden;
                    h4{float: left;}
                    .cause{
                        width:89.9%;
                        float: left;
                        margin-left: 40px;
                        .el-textarea__inner{
                            border: 0;
                            background-color: #fafafa;
                        }
                    }
                }
                .btnss{
                    margin-top: 12px;
                    overflow: hidden;
                    margin-left: 220px;
                    div{
                        float: left;
                        margin-right: 72px;
                        height: 32px;
                        line-height: 32px;
                        cursor: pointer;
                        img{
                            margin-right: 10px;
                            float: left;
                        }
                    }
                }
                .com{
                    border-bottom:1px solid #d2d2d2;
                    margin-bottom: 20px;
                }
            }
        }
        .show-photo{
            img{
                width:100%;
            }
        }
        .imgScript{
            display:inline-block;
            width:14px;
            height:14px;
            background: url('../../../../assets/img/connet/script.png') no-repeat;
            background-position: -48px -44px;
            margin: 0 5px;
        }
        span.shenhe:hover{
            background-position:-48px -74px; 
        }
        span.nosussess{
            background-position:-48px -164px; 
        }
        span.nosussess:hover{
            background-position:-48px -194px; 
        }	
        span.success{
            background-position:-48px -104px;
        }
        span.sussess:hover{
            background-position:-48px -134px; 
        }
        span.refresh{
            width: 16px;
            height: 16px;
            background-position: -94px -534px;
        }
        span.seeBtn{
            width:26px;
            height:17px;
            background-position:-94px -395px;
        }
        span.seeBtn:hover{
            background-position:-94px -427px;
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
    .revapp-main{
        .revapp-top{
            overflow: hidden;
            .demo-form-inline{
                float: left;
                .el-form-item{
                    width:31%;
                    .el-form-item__content{
                        width:66%;
                    }
                }
                .search-group{
                    .el-form-item__content{
                        margin-left: 0 !important;
                        width: 80%;
                    }
                    i{
                        width: 16px;
                        height: 16px;
                        margin: 10px;
                        display: inline-block;
                        float: right;
                        cursor: pointer;
                        background: url("../../../../assets/researchCenter/search.png") 0 0 no-repeat;
                    }
                    .el-icon-search:before{
                        content:"";
                    }                
                }
            }
            .exporte{
                float: right;
                height: 40px;
                line-height:47px;
                cursor: pointer;
            }
        }
    }
    .audits{
        .el-dialog__header,.el-dialog__body{
            overflow: hidden;
        }
    }
</style>
