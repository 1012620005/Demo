<template>
	<div class="contanier">
		<fc-header></fc-header>
		<!--审核学生申请-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					新生报到单管理
				</div>
				<div class="tabright">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="newenr-main">
            <el-tabs type="border-card">
                <el-tab-pane label="自定义添加菜单">
                    <cadd-menu></cadd-menu>
                </el-tab-pane>
                <el-tab-pane label="自定义添加类目">
                    
                </el-tab-pane>
            </el-tabs>
        </el-row>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../../common/header.vue'
    import caddMenu from './caddMenu.vue'
	export default {
		data () {
			return {
			    
            }
		},
		components:{
			fcHeader,
            caddMenu
		},
        methods:{
            
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
				padding: 0 24px;
				.tableft{
					float: left;
                    line-height: 55px;
				}
				.tabright{
					float: right;
					height: 15px;
					// line-height: 55px;
					margin-top: 7px;
					cursor: pointer;
					overflow: hidden;
					margin-top: 18px;
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
        .newenr-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            background-color: #fff;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .el-popover, .el-tabs--border-card{
                box-shadow: 0 0;
            }
            .el-tabs--border-card{
                border: 0;
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
        }
        
</style>
