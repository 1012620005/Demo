<template>
    <div class="container">
        <fc-header></fc-header>
        <!--教务处更换专业班级-->
        <!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft-x">
					<h5>更换专业/班级</h5>
				</div>
				<div class="tabright">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="application">
            <el-form ref="form" :model="form" label-width="44px" class="formappli">
                <el-form-item label="校区">
                    <el-select v-model="form.campus" placeholder="" @change="campus(form.campus,'2')">
                        <el-option v-for="item in campuses" :key="item.id" :label="item.name"  :value="item.id">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="院系">
                    <el-select v-model="form.depart" placeholder="" @change="campus(form.depart,'3')">
                        <el-option v-for="item in departs" :key="item.id" :label="item.name"  :value="item.id">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
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
                <el-form-item class="search-group">
                    <el-input placeholder="请输入学生姓名" icon="search" v-model="form.search" :on-icon-click="handleIconClick"></el-input>
                </el-form-item>
            </el-form>
            <div class="applitable">
                <template>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="ordinal" label="序号"></el-table-column>
                        <el-table-column prop="campus" label="校区"></el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="gender" label="性别"></el-table-column>
                        <el-table-column prop="ordepart" label="原院系"></el-table-column>
                        <el-table-column prop="majors" label="专业"></el-table-column>
                        <el-table-column prop="acade" label="学制"></el-table-column>
                        <el-table-column prop="class" label="班级"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <div v-if="scope.row.vacateStatus == 1" class="handle clearfix hand-green">
                                    已更改
                                </div>
                                <div v-else-if="scope.row.vacateStatus == 2" class="handle clearfix change" @click="change">
                                    更改
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
        <div class="change-popup" v-if="showChange">
            <div class="change-top">
				<div class="class-cluster">
					<img src="../../../assets/img/orientation/changcla.png" alt="">
				</div>
				<div class="change-close" @click="changeClose">
					<img src="../../../assets/researchCenter/close.png" alt="">
				</div>
			</div>
            <div class="change-center">
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
                <el-form ref="form1" :model="form1" label-width="80px" class="changetab">
                    <el-form-item label="新校区：">
                        <el-select v-model="form1.newcam" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新院系：">
                        <el-select v-model="form1.newdep" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
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
                </el-form>
                <el-button type="primary" class="sub">提交</el-button>
            </div>
        </div>
        <!--弹出遮罩层-->
		<div class="desk" v-if="showDesk"></div>
    </div>
</template>
<script type="text/javascript">
import fcHeader from '../../common/header.vue'
import api from '../../../apis/orientation/acaApplication.js'

export default {
    data(){
        return{
            form: {
                campus: '',
                depart: '',
                majors: '',
                class: '',
                search:''
            },
            campuses:[],
            departs:[],
            majorses:[],
            classes:[],
            input2: '',
            tableData: [{
                ordinal: '1',
                campus: '东校区',
                name: '宋红红',
                gender: '女',
                ordepart: '计算机系',
                majors: '中药学',
                acade: '三年',
                class: '中药1',
                vacateStatus:1
                },{
                ordinal: '1',
                campus: '东校区',
                name: '宋红红',
                gender: '女',
                ordepart: '计算机系',
                majors: '中药学',
                acade: '三年',
                class: '中药1',
                vacateStatus:1
                },{
                ordinal: '1',
                campus: '东校区',
                name: '宋红红',
                gender: '女',
                ordepart: '计算机系',
                majors: '中药学',
                acade: '三年',
                class: '中药1',
                vacateStatus:2
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
		    showDesk:false
        }
    },
    methods: {
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
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // 加载校区
        campus(id, type){
            let tables = {
                id: id,
                type: type
            }
            console.log(tables);
            api.loadSelect(tables).then(response => {
                console.log(response.data.data);
                // console.log(response);
                if(response.data.meta.code == 200){
                    if(type =='2'){
                        this.departs = response.data.data;
                        // this.adddeparts = response.data.data;
                    }else if(type =='3'){
                        this.majorses = response.data.data;
                        // this.addmajors = response.data.data;
                    }else if(type=='4'){
                        this.campuses = response.data.data;
                        // this.setionsAnoth = response.data.data;
                    }
                }
            });
        },
        // 通过专业加载班级
        loadClass(event){
            let yea = {
                year: '2017春',
                proid: this.form.majors
            }
            api.findClazzByPro(yea).then(response => {
                // console.log(response);
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
        this.campus('1','4');
    }
}
</script>
<style type="text/css" lang="scss">
    .application{
        width:1200px;
        margin: 0 auto;
		margin-top: 20px;
        min-height: 740px;
        background-color: #fff;
        padding: 18px 22px;
        overflow: hidden;
        border-radius: 4px;
        .formappli{
            overflow: hidden;
            .el-form-item{
                float: left;
                margin-right: 16px;
                width: 15%;
                .el-form-item__label{
                    text-align: left;
                    padding-right: 0;
                }
            }
            .search-group{
                .el-form-item__content{
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
        .applitable{
            .hand-green{
                color: #91c604;
            }
            .change{
                cursor: pointer;
            }
        }
        .block{
            text-align: center;
            margin-top: 40px;
        }
    }
    // 更改弹窗
    .change-popup{
        width: 626px;
        height: 338px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        border-radius: 6px;
        z-index: 2;
        padding: 18px;
        overflow: hidden;
        .change-top{
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
        .change-center{
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
            .changetab{
                overflow: hidden;
                .el-form-item{
                    float: left;
                    width: 40%;
                    .el-form-item__label{
                        text-align: left;
                        width: 60px !important;
                        padding-right: 0;
                    }
                    .el-form-item__content{
                        margin-left: 60px !important;
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
        }
    }
    .desk{
        z-index: 1 !important;
    }
</style>


