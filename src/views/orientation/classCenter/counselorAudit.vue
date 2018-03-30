<template>
    <div class="container">
        <fc-header></fc-header>
        <!--辅导员审核更换专业班级-->
        <!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					审核更换专业/班级
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!-- <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft-x">
					<h5>审核更换专业/班级</h5>
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row> -->
        <!--主体内容-->
        <el-row :span="24" class="coun-main">
            <el-tabs type="border-card">
                <el-tab-pane label="学生更换本班级">
                    <counsellor-one></counsellor-one>  
                </el-tab-pane>
                <el-tab-pane label="学生更换其他班级">
                    <counsellor-two></counsellor-two>  
                </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>
</template>
<script type="text/javascript">
import fcHeader from '../../common/header.vue'
import counsellorOne from './counsellorOne.vue'
import counsellorTwo from './counsellorTwo.vue'
// import api from '../../../apis/orientation/counselorAudit.js'

export default {
    data(){
        return{
            
        }
    },
    methods: {
        returnClick(){
            this.$router.push({
                name:'newIndex'
            })
        }
    },
    components:{
        fcHeader,
        counsellorOne,
        counsellorTwo
    },
    mounted(){
        
    }
}
</script>
<style type="text/css" lang="scss" scoped>
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
    .coun-main{
        width:1200px;
        margin: 0 auto;
        min-height: 740px;
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: 32px;
        margin-top: 16px;
        .el-popover, .el-tabs--border-card{
            box-shadow: 0 0;
        }
        .el-tabs__header{
            border-bottom: 1px solid #d1dbe5 !important;
        }
        .el-tabs--border-card{
            border: 0;
        }
        .el-tabs__item{
            height: 40px !important;
            line-height: 40px !important;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item{
            border-top: 1px solid transparent;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
            border-top-color:#d1dbe5;
        }
        .el-tabs__content{
            min-height: 700px;
        }
        .el-tabs--border-card>.el-tabs__content{
            padding: 24px;
        }
    }
</style>


