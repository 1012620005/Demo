<template>
    <div class="container">
        <fc-header></fc-header>
        <!--辅导员查看分班状态-->
        <!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft-x">
					<h5>学生分班列表</h5>
				</div>
				<div class="tabright">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="councheck-main">
            <el-col :span="24" class="cocheck-top">
                <el-row :span="24">
                    <el-form ref="form" :model="form" label-width="80px" :inline="true">
                        <el-col :span="3">
                            <el-breadcrumb separator="">
                                <el-breadcrumb-item :to="{ path: '/' }">南校区</el-breadcrumb-item>
                                <el-breadcrumb-item>计算机专业</el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                        <el-col :span="10" class="contable">
                            <el-form-item label="专业">
                                <el-select v-model="form.region" placeholder="">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="班级">
                                <el-select v-model="form.region" placeholder="">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" class="exp">
                            <div class="export"><img src="../../../assets/img/orientation/export.png" alt=""></div>
                            <div class="print"><img src="../../../assets/img/orientation/print.png" alt=""></div>
                        </el-col>
                    </el-form>
                </el-row>
            </el-col>
            <el-col :span="24">
            <div class="counchecktable">
                <template>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="ordinal" label="序号"></el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="gender" label="性别"></el-table-column>
                        <el-table-column prop="age" label="年龄"></el-table-column>
                        <el-table-column prop="score" label="分数"></el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-icon name="time"></el-icon>
                                <span  @click="audit"></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            </el-col>
        </el-row>
        <!--审核详情-->
        <div class="rev-detail" v-if="showDetail">
            <div class="revdet-top">
				<div class="revdet-cluster">
					<img src="../../../assets/img/orientation/detail.png" alt="">
				</div>
				<div class="revdet-close" @click="changeClose">
					<img src="../../../assets/researchCenter/close.png" alt="">
				</div>
			</div>
            <div class="revdet-center">
                <ul>
                    <li><h4>基本信息</h4></li>
                    <li>
                        <ul>
                            <li><i>*</i>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<span>好美丽</span></li>
                            <li><i>*</i>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<span>女</span></li>
                            <li><i>*</i>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：<span>汉</span></li>
                            <li><i>*</i>身份证号：<span>110110110110110110</span></li>
                            <li><i>*</i>联系电话：<span>110110110110</span></li>
                            <li><i>*</i>录取方式：<span>统招</span></li>
                            <li><i>*</i>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;制：<span>三年</span></li>
                            <li><i>*</i>应届/往届：<span>应届</span></li>
                            <li><i>*</i>毕业学校：<span>华夏五千年</span></li>
                            <li>准考证号：<span>110110110110</span></li>
                            <li>考生号：<span>110110110110</span></li>
                            <li>考试总分：<span>110</span></li>
                            <li><i>*</i>政治面貌：<span>团员</span></li>
                            <li><i>*</i>户口性质：<span>农业</span></li>
                        </ul>
                    </li>
                    <li class="family"><h4>家庭信息</h4></li>
                    <li>
                        <ul>
                            <li><i>*</i>家长姓名：<span>应届</span></li>
                            <li><i>*</i>联系电话：<span>110110110110</span></li>
                            <li class="address"><i>*</i>家庭地址：<span>河北省石家庄市晋州市，政府家属大院3号4单元502</span></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <!--弹出遮罩层-->
		<div class="desk" v-if="showDesk"></div>
        
    </div>
</template>
<script type="text/javascript">
import fcHeader from '../../common/header.vue'
export default {
    data(){
        return{
            form: {
                status: '',
                search:''
            },
            input2: '',
            textarea: '',
            tableData: [{
                ordinal: '1',
                name: '宋红红',
                gender: '女',
                age:'18',
                score:'150'
                },{
                ordinal: '1',
                name: '宋红红',
                gender: '女',
                age:'18',
                score:'150'
                },{
                ordinal: '1',
                name: '宋红红',
                gender: '女',
                age:'18',
                score:'150'
            }],
            form1: {
                newcam: '',
                newdep: '',
                newprofe: '',
                newclass: '',
                delivery: false,
            },
            // 审核详情
            showDetail:false,
            // 遮罩层
		    showDesk:false,
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handleIconClick(ev) {
            console.log(ev);
        },
        // 审核详情
        audit(){
            this.showDetail=true;
            this.showDesk=true;
        },
        changeClose(){
            this.showDetail=false;
            this.showDesk=false;
        }
    },
    components:{
		fcHeader
    },
}
</script>
<style type="text/css" lang="scss">
    .councheck-main{
        width:1200px;
        margin: 0 auto;
		margin-top: 20px;
        min-height: 740px;
        background-color: #fff;
        padding: 18px 22px;
        // overflow: hidden;
        border-radius: 4px;
        .cocheck-top{
            // margin-bottom: 18px;
            .el-breadcrumb{
                // float: left;
                height: 36px;
                line-height: 36px;
                .el-breadcrumb__item__inner{
                    color:#48576a;
                }
            }
            .contable{
                .el-form-item{
                    .el-form-item__label{
                        width:44px !important;
                    }
                    .el-form-item__content{
                        width:100px;
                    }
                }
            }
            .exp{
                float: right;
                height: 36px;
                line-height: 36px;
                .export{
                    float: left;
                    margin-right: 13px;
                }
                .print{
                    float: right;
                }
            }
        }
        .counchecktable{
            .el-icon-time:before{
                content:''
            }
            span{
                display: inline-block;
                width:25px;
                height: 16px;
                background: url('../../../assets/researchCenter/view.png') 0 0 no-repeat;
                margin-top: 4px;
            }
        }
        .block{
            text-align: center;
            margin-top: 40px;
        }
    }
    // 审核详情
    .rev-detail{
        width: 724px;
        height: 424px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        border-radius: 6px;
        z-index: 2;
        padding: 18px;
        overflow: hidden;
        .revdet-top{
            height: 32px;
            line-height: 32px;
            overflow: hidden;
            margin-bottom: 24px;
            .revdet-cluster{
                float: left;
            }
            .revdet-close{
                float: right;
                cursor: pointer;
            }
        }
        .revdet-center{
            ul{
                li{
                    h4{
                        margin-bottom: 24px;
                    }
                    ul{
                        overflow: hidden;
                        li{
                            width: 33%;
                            float: left;
                            margin-bottom: 18px;
                            i{color:#ef0000;}
                        }
                        .address{
                            width: 100%;
                        }
                    }
                }
                .family{
                    padding-top: 18px;
                    border-top: 1px solid #d2d2d2;
                }
            }
        }
    }
    // 遮罩层
    .desk{
        z-index: 1 !important;
    }
</style>


