<template>
	<div class="content">
		<div class="sLeave-bottom">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<div class="inter_form">
					<!--<div  class="btnS" @click="absence"><span class="btn qingjia"></span>发布职位</div>
					<div class="label color">职位</div>
				    <el-select v-model="formInline.job" placeholder="职位">
	                    <el-option label="事假" value="事假"></el-option>
	                    <el-option label="病假" value="病假"></el-option>
	                </el-select>-->
					<!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
					<el-input placeholder="请输入关键字" icon="search"  v-model="formInline.keyword"style="width:193px;margin-left:30px;">
					</el-input> 					
				</div>
				<!--<div class="return_btn_bottom"><span class="color">返回</span><i class="return_btn_img"></i></div>-->
			</el-form>
			<div class="sLeave-table">
				<template>
					<el-table :data="tableData" stripe style="width: 100%">
						<el-table-column prop="ord" label="序号"></el-table-column>
						<el-table-column prop="name" label="姓名"></el-table-column>
						<el-table-column prop="gender" label="性别"></el-table-column>
						<el-table-column prop="age" label="年龄"></el-table-column>
						<el-table-column prop="edu" label="学历"></el-table-column>
						<el-table-column prop="apply" label="应聘职位"></el-table-column>
						<el-table-column prop="compat" label="匹配度" width="185">
							<template slot-scope="scope">
								<el-progress :percentage="70"></el-progress>
							</template>
						</el-table-column>
						<el-table-column prop="state" label="面试状态">
							<template slot-scope="scope">
								<div v-if="scope.row.vacateStatus == 1" class="handle clearfix hand-green">
									已通知
								</div>
								<div v-else-if="scope.row.vacateStatus == 2" class="handle clearfix change" @click="change">
									未通知
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="oper" label="操作">
							<template slot-scope="scope">
								<el-icon name="time"></el-icon>
								<span class="imgScript seeBtn" @click="operDetail"></span>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</div>
			<div class="con_left_tab_con_page">
			    <el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-size="6"
					layout="prev, pager, next, jumper"
					:total="6">
			    </el-pagination>
		    </div>
		</div>
		<!--详情弹框-->
		<div class="details-pop" v-if="showDeta">
			<div class="detail-top">
				<div class="add-big">
					<span class="addBig"></span>
					<span>详情</span>
				</div>
				<div class="add-right" @click="addClose">
					<img src="../../assets/img/employ/close.png" alt="">
				</div>
			</div>
			<div class="detail-bottom">
				<el-form ref="formDetail" :model="formDetail" label-width="80px">
					<el-form-item label="下发对象：">
						<div>王少华、李文浩</div>	
					</el-form-item>
					<el-form-item label="公文标题：">
						<div>教研通知</div>	
					</el-form-item>
					<el-form-item label="公文内容：">
						<el-input type="textarea" v-model="formDetail.offi" class="office"></el-input>
					</el-form-item>
					<el-form-item label="备注：">
						<el-input type="textarea" v-model="formDetail.remark" class="remark"></el-input>
					</el-form-item>
					<el-form-item label="上传附件：">
						<div>教研文件.doc</div>	
					</el-form-item>
					<el-form-item label="是否流转：">
						<el-radio-group v-model="formDetail.circ">
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="confirm">确认</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<!--遮罩层-->
		<div class="desk" v-if="showDesk"></div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data () {
			return {
				formInline: {
					keyword: '',
					job: ''
				},
				tableData: [{
					ord: '1',
					name: '蓝精灵',
					gender: '女',
					age:'18',
					edu:'大专',
					apply:'销售',
					endtime:'2017-9-22',
					vacateStatus:1
				},{
					ord: '1',
					name: '蓝精灵',
					gender: '女',
					age:'18',
					edu:'大专',
					apply:'销售',
					endtime:'2017-9-22',
					vacateStatus:1
				},{
					ord: '1',
					name: '蓝精灵',
					gender: '女',
					age:'18',
					edu:'大专',
					apply:'销售',
					endtime:'2017-9-22',
					vacateStatus:1
				}],
				currentPage: 1,
				size: 6,
				value1:true,
				// 详情弹框
				showDeta:false,
				// 遮罩层
				showDesk:false,
				formDetail:{
					offi:'',
					remark:'',
					circ:'',
					type:'',
					subord:'',
					wages:'',
					worklife:'',
					posi:'',
					workcity:'',
					endtime:'',
					time:''
				},
				options: [{
					value: 'ziyuan',
					label: '资源',
					children: [{
						value: 'axure',
						label: 'Axure Components'
					}, {
						value: 'sketch',
						label: 'Sketch Templates'
					}, {
						value: 'jiaohu',
						label: '组件交互文档'
					}]
        		}],
				selectedOptions2: []
			}
		},
		methods:{
			absence(){},
			onSubmit(){},
			handleSizeChange () {},
			handleCurrentChange () {},
			operDetail(){
				this.showDesk=true;
				this.showDeta=true;
			},
			addClose(){
				this.showDesk=false;
				this.showDeta=false;
			},
			handleChange(value) {
				console.log(value);
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	 @import '../../common/css/common.scss';
	 .sLeave-bottom{
		padding: 0 16px 0 0;
		box-sizing:border-box;
		.sLeave-table{
			padding-left: 24px;
			margin-top: 10px;
			.el-icon-time:before{
				content: '';
			}
			.imgScript{
				margin: 0;
				margin-top: 8px;
			}
			.cell{
				cursor: pointer;
			}
			.el-switch{
				.el-switch__core{
					width: 25px !important;
					height: 16px !important;
				}
				.el-switch__button{
					width: 13px !important;
					height: 14px !important;
					transform:translate(2px, 0px) !important;
				}
			}
			.is-checked{
				.el-switch__button{
					transform:translate(9px, 0px) !important;
				}
			}
			.hand-green{
				color:#91c604;
			}
		}
	}
	.demo-form-inline{
		 justify-content: space-between;
		 .inter_form{
		 	display:flex;
		 	align-items:center;
			 margin-top:17px;
			 margin-top: 7px; 
		 }
		 .return_btn_bottom{
		 	display:flex;
		 	align-items:center;
				.return_btn_img{
					display:inline-block;
					width:9px;
					height:15px;
					background:url('../../assets/img/connet/return.png') no-repeat;
					padding-left:4px;
					margin-left: 6px;
				}	
		 }

		 .color{
		 	color:#333;
			 margin-right: 12px;
		 }
	}
	// 详情弹框
	.details-pop{
		width: 566px;
		height: 564px;
		background-color: #fff;
		border-radius: 6px;
		z-index: 1000;
		position: fixed;
		top: 50%;
		left: 50%;
		transform:translate(-50%,-50%);
		padding:20px 18px;
		.detail-top{
			overflow: hidden;
			.add-big{
				height: 32px;
				line-height: 32px;
				float: left;
				span{
					display: inline-block;
					float: left;
				}
				.addBig{
					margin-right: 16px;
				}
			}
			.add-right{
				float: right;
				margin-top: 4px;
				cursor: pointer;
			}
		}
		.detail-bottom{
			.el-form-item__label{
				text-align: left;
				width:88px !important;
			}
			.el-form-item__content{
				margin-left: 88px !important;
			}
			.el-textarea__inner{
				background-color: #fafafa;
				border: 0;
			}
			.office{
				textarea{
					height: 160px;
				}
			}
			.remark{
				textarea{
					height: 80px;
				}
			}
			.el-form-item{
				margin-bottom: 18px;
			}
			.confirm{
				width: 96px;
				height: 42px;
				float: right;
			}
		}
	}
</style>