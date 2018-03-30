<template>
	<div class="contanier">
		<fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					招生计划
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="enplan-main">
            <el-tabs type="border-card">
                <el-tab-pane label="招生指标">
                    <enrollplan-one></enrollplan-one>  
                </el-tab-pane>
                <el-tab-pane label="招生区域划分">
                    <enrollplan-two></enrollplan-two>  
                </el-tab-pane>
            </el-tabs>
        </el-row>
        

	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../../common/header.vue'
	import enrollplanOne from './enrollplanOne.vue'
	import enrollplanTwo from './enrollplanTwo.vue'

	export default {
		data () {
			return {
			    
            }
		},
		components:{
			fcHeader,
            enrollplanOne,
            enrollplanTwo
		},
        methods:{
            returnClick(){
                this.$router.push({
                    name:'newIndex'
                })
            }
        },
        computed:{
            
        },
        mounted () {
           
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
        .enplan-main{
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
