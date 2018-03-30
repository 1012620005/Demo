<template>
	<div class="contanier">
		<fc-header></fc-header>
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <template class="tableft">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="宿舍管理" name="first">
                            <dor-manag></dor-manag>
                        </el-tab-pane>
                        <el-tab-pane label="学生退宿管理" name="second">学生退宿管理</el-tab-pane>
                    </el-tabs>
                </template>
				<div class="tabright">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../common/header.vue'
    import dorManag from './dorManag.vue'

	export default {
		data () {
			return {
			    activeName: 'first'
            }
		},
		components:{
			fcHeader,
            dorManag
		},
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        computed:{
        
        },
        mounted () {
            
        }
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
				padding: 0;
                position: relative;
				.tableft{
					float: left;
                    line-height: 55px;
				}
                .el-tabs__header{
                    border:0;
                }
                .el-tabs__nav{
                    margin-left: 20px;
                }
                .el-tabs__item{
                    height:55px;
                    line-height: 55px;
                }
				.tabright{
					// float: right;
					height: 15px;
					// line-height: 55px;
					// margin-top: 7px;
					cursor: pointer;
					overflow: hidden;
					// margin-top: 18px;
                    position: absolute;
                    top: 0;
                    right: 24px;
					span{
						display: inline-block;
						// float: right;
					}
					i{	
						width: 9px;
						height: 15px;
						display: inline-block;
						float: right;
						margin-left: 6px;
					}
				}
			}
        }
</style>
