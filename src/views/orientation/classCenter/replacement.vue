<template>
    <div class="container">
        <fc-header></fc-header>
        <!--系部更换专业班级-->
        <!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					更换专业/班级
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="depart-main">
            <el-breadcrumb separator="》">
                <el-breadcrumb-item :to="{ path: '/' }">{{stu.campus}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{stu.depart}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form ref="form" :model="form" :inline="true" class="formapp">
                <el-form-item label="专业">
                    <el-select v-model="form.majors" placeholder="" @change="loadClass($event)">
                        <el-option v-for="item in majorses" :key="item.id" :label="item.name"  :value="item.id">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级">
                    <el-select v-model="form.class" placeholder="">
                        <el-option v-for="item in classes" :key="item.clazzid" :label="item.clazzname"  :value="item.clazzid">{{item.clazzname}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态" class="state">
                    <el-select v-model="form.status" placeholder="">
                        <el-option label="待审核" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="search-group">
                    <el-input placeholder="请输入学生姓名" icon="search" v-model="form.search" :on-icon-click="handleIconClick"></el-input>
                </el-form-item>
            </el-form>
            <div class="departable">
                <template>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="ordinal" label="序号"></el-table-column>
                        <el-table-column prop="campus" label="校区"></el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="gender" label="性别"></el-table-column>
                        <el-table-column prop="nowdepart" label="现院系"></el-table-column>
                        <el-table-column prop="nowmajors" label="现专业"></el-table-column>
                        <el-table-column prop="acade" label="学制"></el-table-column>
                        <el-table-column prop="nowclass" label="现班级"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <div v-if="scope.row.vacateStatus == 1" class="handle handhover clearfix">
                                    <span class="imgScript shenhe"></span>
                                    待审核
                                    <!--<div class="shenheBounce">
                                        <div class="icons pass">
                                            <i></i>
                                            <span>通过</span>
                                        </div>
                                        <div class="icons nopass" @click="noPass">
                                            <i></i>
                                            <span>不通过</span>
                                        </div>
                                    </div>				           	   -->
                                </div>
                                <div v-else-if="scope.row.vacateStatus == 2" class="handle clearfix">
                                    <span class="imgScript nosussess"></span>
                                    未通过
                                </div>
                                <div v-else-if="scope.row.vacateStatus == 3" class="handle clearfix">
                                    <span class="imgScript success"></span>
                                    已通过
                                </div>
                                <div v-else-if="scope.row.vacateStatus == 4" class="handle clearfix change" @click="change">
                                    <span class="imgScript chsussess"></span>
                                    更换
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="block">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage3"
					:page-size="100"
					layout="prev, pager, next, jumper"
					:total="1000">
				</el-pagination>
			</div>   
        </el-row>
        <!--更改弹窗-->
        <div class="change-repla" v-if="showChange">
            <div class="repla-top">
				<div class="class-cluster">
					<img src="../../../assets/img/orientation/changcla.png" alt="">
				</div>
				<div class="change-close" @click="changeClose">
					<img src="../../../assets/researchCenter/close.png" alt="">
				</div>
			</div>
            <div class="repla-center">
                <ul>
                    <li class="chac">
                        <ul>
                            <li>姓名：<span>好美丽</span></li>
                            <li>姓别：<span>女</span></li>
                            <li>校区：<span>东校区</span></li>
                            <li>学制：<span>三年制</span></li>
                        </ul>
                    </li>
                    <li class="chac">
                        <ul>
                            <li>辅导员：<span>人数糖</span></li>
                             <li>宿舍楼：<span>15号</span><i>2503</i></li>
                        </ul>
                    </li>
                    <li class="chac">
                        <ul>
                            <li>原院系：<span>中药学</span></li>
                            <li>原专业：<span>中药制药</span></li>
                            <li>原班级：<span>1702班</span></li>
                        </ul>
                    </li>
                </ul>
                <el-form ref="form1" :model="form1" label-width="80px" class="replatab">
                    <el-form-item label="新专业：">
                        <el-select v-model="form1.newprofe" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新班级：">
                        <el-select v-model="form1.newclass" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="assis">
                        辅导员：<span>人数糖</span>
                    </el-form-item>
                    <el-form-item label="更换原因：" class="repeason">
                        <el-input type="textarea" :rows="2" placeholder="" v-model="textarea"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="sub">提交</el-button>
            </div>
        </div>
        <!--弹出遮罩层-->
		<div class="desk" v-if="showDesk"></div>
        <!--不通过原因-->
        <div class="unreason" v-if="shownoPass">
            <div class="ures-top">
				<div class="ures-cluster">
					<img src="../../../assets/img/orientation/reson.png" alt="">
				</div>
				<div class="ures-close" @click="uresClose">
					<img src="../../../assets/researchCenter/close.png" alt="">
				</div>
			</div>
            <div class="ures-center">
                <el-input
                type="textarea"
                :rows="2"
                placeholder=""
                v-model="textarea">
                </el-input>
            </div>
            <el-button type="primary" class="conf">确认</el-button>
        </div>
    </div>
</template>
<script type="text/javascript">
import fcHeader from '../../common/header.vue'
import api from '../../../apis/orientation/replacement.js'

export default {
    data(){
        return{
            form: {
                majors:'',
                class:'',
                status: '',
                search:''
            },
            stu:{
                campus:'',
                depart:''
            },
            majorses:[],
            classes:[],
            department:[],
            input2: '',
            textarea: '',
            tableData: [{
                ordinal: '1',
                campus: '东校区',
                name: '宋红红',
                gender: '女',
                nowdepart: '计算机系',
                nowmajors: '中药学',
                acade: '三年',
                nowclass: '中药1',
                vacateStatus:1
                },{
                ordinal: '1',
                campus: '东校区',
                name: '宋红红',
                gender: '女',
                nowdepart: '计算机系',
                nowmajors: '中药学',
                acade: '三年',
                nowclass: '中药1',
                vacateStatus:3
                },{
                ordinal: '1',
                campus: '东校区',
                name: '宋红红',
                gender: '女',
                nowdepart: '计算机系',
                nowmajors: '中药学',
                acade: '三年',
                nowclass: '中药1',
                vacateStatus:2
                },{
                    ordinal: '1',
                    campus: '东校区',
                    name: '宋红红',
                    gender: '女',
                    nowdepart: '计算机系',
                    nowmajors: '中药学',
                    acade: '三年',
                    nowclass: '中药1',
                    vacateStatus:4
            }],
            form1: {
                newcam: '',
                newdep: '',
                newprofe: '',
                newclass: '',
                delivery: false,
            },
            currentPage1: 1,
            currentPage2: 1,
            currentPage3: 1,
            currentPage4: 2,
            // 更改弹窗
            showChange:false,
            // 遮罩层
		    showDesk:false,
            // 不通过原因
            shownoPass:false
        }
    },
    methods: {
        returnClick(){
            
        },
        onSubmit() {
            console.log('submit!');
        },
        handleIconClick(ev) {
            console.log(ev);
        },
        // 更改弹窗
        change(){
            this.showChange=true;
            this.showDesk=true;
        },
        changeClose(){
            this.showChange=false;
            this.showDesk=false;
        },
        noPass(){
            this.shownoPass=true;
            this.showDesk=true;
        },
        uresClose(){
            this.shownoPass=false;
            this.showDesk=false;
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        showMajor(){
            let maj = {
                id: this.department,
                type: '3'
            }
            console.log(maj)
            api.findOfficeByPid(maj).then(response => {
                if(response.data.meta.code == 200){
                    this.majorses = response.data.data;
                }
            });
        },
        loadClass(event){
            let yea = {
                year: '2017秋',
                proid: this.form.majors
            }
            api.findClazzByPro(yea).then(response => {
                if(response.data.meta.code == 200){
                    this.classes = response.data.data;
                }
            });
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
                this.stu.campus = mydata.scoms.name;
                this.stu.depart = mydata.dept.name;
                this.department = mydata.dept.id;
                console.log(this.department)
                this.showMajor();
            }
        });
    }
}
</script>
<style type="text/css" lang="scss">
    .depart-main{
        width:1200px;
        margin: 0 auto;
		margin-top: 20px;
        min-height: 740px;
        background-color: #fff;
        padding: 18px 22px;
        // overflow: hidden;
        border-radius: 4px;
        .el-breadcrumb{
            float: left;
            height: 36px;
            line-height: 36px;
            margin-right: 20px;
            .el-breadcrumb__separator{
                color: #333;
            }
            .el-breadcrumb__item__inner{
                color: #333;
            }
            
        }
        .formapp{
            .el-form-item{
                margin-right: 16px;
                width: 12%;
                .el-form-item__content{
                    width: 70%;
                }
            }
            .state{
                width: 20%;
                .el-form-item__content{
                    width: 63%;
                }
            }
            .search-group{
                .el-form-item__content{
                    width:100%;
                    margin-left: 0 !important;
                }
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
        }
        .departable{
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
                    right: -53px;;
                    top: 0;
                    width: 62px;
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
            .el-table .cell, .el-table__footer-wrapper, .el-table__header-wrapper,.el-table,.el-table__body-wrapper{
                overflow: visible;
            }
        }
        .block{
            text-align: center;
            margin-top: 40px;
        }
    }
    // 更改弹窗
    .change-repla{
        width: 626px;
        height: 452px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        border-radius: 6px;
        z-index: 2;
        padding: 18px;
        overflow: hidden;
        .repla-top{
            height: 32px;
            line-height: 32px;
            overflow: hidden;
            margin-bottom: 24px;
            .class-cluster{
                float: left;
            }
            .change-close{
                float: right;
                cursor: pointer;
            }
        }
        .repla-center{
            ul{
                li{
                    ul{
                        overflow: hidden;
                        li{
                            float: left;
                            margin-right: 26px;
                        }
                    }
                }
                .chac{
                    margin-bottom: 20px;
                    i{
                        display: inline-block;
                        margin-left: 28px;
                    }
                }
            }
            .replatab{
                overflow: hidden;
                .el-form-item{
                    float: left;
                    width: 40%;
                    .el-form-item__label{
                        text-align: left;
                        width: 72px !important;
                        padding-right: 0;
                    }
                    .el-form-item__content{
                        margin-left: 72px !important;
                        width: 60%;
                    }
                }
                .assis{
                    width: 20%;
                    text-align: right;
                    .el-form-item__content{
                        margin:0 !important;
                        width:100%;
                    }
                }
            }
            .sub{
                width: 96px;
                height: 42px;
                float: right;
            }
            .repeason{
                width: 100% !important;
                textarea{
                    width: 100%;
                    height: 140px;
                    background-color: #f2f2f2;
                }
                .el-form-item__content{
                    width: 88.5% !important;
                }
            }
        }
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


