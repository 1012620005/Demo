<template>
	<div class="contanier">
        <!--主体内容-->
        <el-row :span="24" class="dormanag-main">
            <el-tabs type="border-card">
                <el-tab-pane label="创建宿舍">
                    <create-dorm></create-dorm>
                </el-tab-pane>
                <el-tab-pane label="院系的宿舍分配">院系的宿舍分配</el-tab-pane>
                <el-tab-pane label="专业的宿舍分配">专业的宿舍分配</el-tab-pane>
                <el-tab-pane label="班级的宿舍分配">班级的宿舍分配</el-tab-pane>
            </el-tabs>
        </el-row>
	</div>
</template>
<script type="text/javascript">
import createDorm from './createDorm.vue'

	export default {
		data () {
			return {
			    
            }
		},
		components:{
			createDorm
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
        .dormanag-main{
            width:1200px;
            margin: 0 auto;
            min-height: 740px;
            background-color: #fff;
            // padding: 18px 22px;
            // overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .el-tabs__nav{
                margin-left: 0 !important;
            }
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
            
        }

</style>
