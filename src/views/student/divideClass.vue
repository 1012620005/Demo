<template>
	<div class="container">
		<fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					学生分班列表
				</div>
				<div class="tabright">
					<span>返回</span>
					<i><img src="../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
		<!--主体模块-->
		<el-row :span="24" class="diviclass-main">
			<div class="diviclass-box">
				<div class="dividetails">
					<el-breadcrumb separator=" " class="crumb">
						<el-breadcrumb-item :to="{ path: '/' }">南校区</el-breadcrumb-item>
						<el-breadcrumb-item>计算机系</el-breadcrumb-item>
						<el-breadcrumb-item>编程专业</el-breadcrumb-item>
						<el-breadcrumb-item>1702班</el-breadcrumb-item>
					</el-breadcrumb>
					<template>
						<el-table :data="tableData" stripe style="width: 100%">
							<el-table-column prop="ord" label="序号" width="180"></el-table-column>
							<el-table-column prop="stuname" label="学生姓名" width="180"></el-table-column>
							<el-table-column prop="gender" label="性别"></el-table-column>
							<el-table-column prop="age" label="年龄"></el-table-column>
							<el-table-column prop="fract" label="分数"></el-table-column>
							<el-table-column prop="oper" label="操作">
								<template slot-scope="scope">
									<el-icon name="time"></el-icon>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</div>
            </div>
		</el-row>
	</div>
</template>
<script type="text/javascript">
import fcHeader from '../common/header.vue'
export default {
	data() {
      return {
		tableData: [{
          ord: '1',
          stuname: '汤姆猫',
          gender: '男',
		  age:'16',
		  fract:'201'
        },{
          ord: '2',
          stuname: '汤姆猫',
          gender: '男',
		  age:'16',
		  fract:'201'
        },{
          ord: '3',
          stuname: '汤姆猫',
          gender: '男',
		  age:'16',
		  fract:'201'
        }]			
      }
				
	},
    components:{
        fcHeader
    }
}
</script>
<style type="text/css" lang="scss" scope>
	body{
		font-size: 14px;
		color: #333;
	}
	// 顶部标签
	.tabbox{
		width:1200px;
		margin:0 auto;
		.tabtop{
			height: 55px;
			margin-top: 7px;
			background-color: #fff;
			border-radius: 6px;
			// padding: 0 24px;
			.tableft{
				float: left;
				.el-tabs__header{
					margin: 0;
					height: 55px;
					border-bottom: 0;
					.el-tabs__nav{
						height: 55px;
						line-height: 55px;
						margin-left: 20px;
						.el-tabs__item{
							color: #333;
							font-size: 16px;
						}
						.el-tabs__item.is-active{
							color: #208af5;
						}
					}
				}
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
					background:url("../../assets/researchCenter/return.png") 0 0 no-repeat; 
					display: inline-block;
					float: right;
					margin-left: 6px;
				}
			}
		}
	}
	// 主体模块
	.diviclass-main{
		width:1200px;
		margin: 0 auto;
		margin-top: 20px;
		// color:#333;
		font-size: 14px;
		.diviclass-box{
            width: 100%;
			min-height: 700px;
			background-color: #fff;
			border-radius: 6px;
			padding: 30px 0;
			margin-bottom: 30px;
			overflow: hidden;
			.dividetails{
				padding: 0 24px;
				.crumb{
					margin-bottom: 26px;
					.el-breadcrumb__item__inner{
						color: #333333;
					}
				}
				.cell{
					i{
						width: 25px;
						height: 16px;
						background: url("../../assets/researchCenter/view.png") 0 0 no-repeat;
						margin-top: 10px;
					}
				}
				.el-icon-time:before{
					content: '';
				}
			}
        }
	}
	
</style>