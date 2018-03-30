<template>
	<div class="contanier">
		<fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					学生宿舍管理
				</div>
				<div class="tabright">
					<span>返回</span>
					<i><img src="../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="studenthostel-main">
            <el-col :span="24" class="studenthostel-immob">
                <el-row :span="24" >
                    <el-form ref="form" :model="form" class="studenthostel-for">
                        <el-col :span="3">
                            <el-form-item  label="校区">
                                <el-select v-model="form.building" placeholder="">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域一" value="shanghai"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="院系" class="depar">
                                <el-select v-model="form.numbuild" placeholder="">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="专业" class="depar">
                                <el-select v-model="form.majors" placeholder="">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="班级">
                                <el-select v-model="form.class" placeholder="">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="审核状态" class="review-status">
                                <el-select v-model="form.reviewstatus" placeholder="">
                                    <el-option label="已通过" value="shanghai"></el-option>
                                    <el-option label="未通过" value="beijing"></el-option>
                                    <el-option label="待审核" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item class="search-group">
                                <el-input placeholder="请输入关键字" icon="search" v-model="form.search" :on-icon-click="handleIconClick"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <div class="exp-top">
                                <div class="export">
                                    <i><img src="../../assets/researchCenter/export.png" alt=""></i>
                                    <span>导出Excel</span>
                                </div>
                                <div class="print">
                                    <i><img src="../../assets/researchCenter/print.png" alt=""></i>
                                    <span>打印</span>
                                </div>
                            </div>
                        </el-col>
                    </el-form>
                </el-row>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="ord" label="序号" width="50"></el-table-column>
                    <el-table-column prop="campus" label="校区"  width="100"></el-table-column>
                    <el-table-column prop="name" label="姓名"  width="80"></el-table-column>
                    <el-table-column prop="gender" label="性别" width="50"></el-table-column>
                    <el-table-column prop="departments" label="院系"  width="100"></el-table-column>
                    <el-table-column prop="professional" label="专业" width="100"></el-table-column>
                    <el-table-column prop="class" label="班级" width="80"></el-table-column>
                    <el-table-column prop="origdorm" label="原宿舍" width="90"></el-table-column>
                    <el-table-column prop="newdorm" label="新宿舍" width="90"></el-table-column>
                    <el-table-column prop="cause" label="原因"></el-table-column>
                    <el-table-column prop="submittime" label="提交时间"></el-table-column>
                    <el-table-column prop="submittime" label="操作" width="90">
                        <template slot-scope="scope">
                            <div v-if="scope.row.vacateStatus == 1" class="handle clearfix" @click="pendingApproval">
                                <span class="imgScript shenhe"></span>
                                待审核
                            </div>
                            <div v-else-if="scope.row.vacateStatus == 2" class="handle clearfix">
                                <span class="imgScript nosussess"></span>
                                未通过
                            </div>
                            <div v-else-if="scope.row.vacateStatus == 3" class="handle clearfix">
                                <span class="imgScript success"></span>
                                已通过
                            </div>
                            <div v-else-if="scope.row.vacateStatus == 3" class="handle clearfix">
                                <span class="imgScript success"></span>
                                已通过
                            </div>                 
                        </template>
                    </el-table-column>
                </el-table>
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
            </el-col>
        </el-row>
        <!--待审核弹框-->
        <el-dialog class="pend-cartridge" :visible.sync="showPending">
            <div slot="title" class="addclasses-cpm" >
                <img src="../../assets/img/deanfund/icon01.png" />
                <p>原因</p>
            </div>
            <div class="pend-main">
                <el-form>
                    <el-form-item>
                        <el-input type="textarea" v-model="form.desc" class="pend-height"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="pend-btn">
                <button type="button" class="get-through">通过</button>
                <button type="button" class="not-through">不通过</button>
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../common/header.vue'
	export default {
		data () {
           return {
				form: {
                    building: '',
                    numbuild: '',
                    majors:'',
                    class:'',
                    reviewstatus:'',
                    date1: '',
                    date2: '',
                    delivery: false,
                    desc: '',
                    search:''
                },
                tableData: [{
                    ord: '1',
                    campus: '东校区',
                    name: '宋红红',
                    gender:'女',
                    departments:'计算机系',
                    professional:'中药学',
                    class:'中药1',
                    origdorm:'2号楼305',
                    newdorm:'3号楼305',
                    cause:'看病',
                    submittime:'2017-09-07 21:00',
                    vacateStatus:3
                    },
                    {
                    ord: '2',
                    campus: '东校区',
                    name: '桂小青',
                    gender:'女',
                    departments:'计算机系',
                    professional:'中药学',
                    class:'中药1',
                    origdorm:'2号楼305',
                    newdorm:'3号楼305',
                    cause:'看病',
                    submittime:'2017-09-07 21:00',
                    vacateStatus:2
                    },
                    {
                    ord: '3',
                    campus: '东校区',
                    name: '淑小玉',
                    gender:'女',
                    departments:'计算机系',
                    professional:'中药学',
                    class:'中药1',
                    origdorm:'2号楼305',
                    newdorm:'3号楼305',
                    cause:'看病',
                    submittime:'2017-09-07 21:00',
                    vacateStatus:1
                    }
                ],
                currentPage1: 1,
                currentPage2: 1,
                currentPage3: 1,
                currentPage4: 2,
                // 未审核弹窗
                showPending:false,
			}
        },
        methods:{
            onSubmit() {
                console.log('submit!');
            },
            handleIconClick(ev) {
                console.log(ev);
            },
            // 分页
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 待审核
            pendingApproval(){
                this.showPending=true;
            }
        },
        components:{
            fcHeader
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
				border-radius: 6px;
				padding: 0 24px;
				.tableft{
					float: left;
                    line-height: 55px;
                    border-bottom:2px solid #208af5;
                    color:#208af5;
                    font-size:16px;
                    font-weight: bold;
				}
				.tabright{
					float: right;
					height: 18px;
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
        // 主体内容
        .studenthostel-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 22px 20px;
            overflow: hidden;
            .studenthostel-immob{
                .studenthostel-for{
                    .el-select{
                        width: 65%;
                    }
                    .el-form-item__label{
                        padding-right: 6px;
                    }
                    .search-group{
                        margin-left: 10px;
                        margin-right: 10px;
                        i{
                            width: 16px;
                            height: 16px;
                            margin: 10px;
                            display: inline-block;
                            float: right;
                            cursor: pointer;
                            background: url("../../assets/researchCenter/search.png") 0 0 no-repeat;
                        }
                        .el-icon-search:before{
                            content:"";
                        }
                    }
                    .review-status{
                        .el-select{
                            width: 50%;
                        }
                    }
                    .depar{
                        .el-select{
                            width: 75%;
                        }
                    }
                    // 导出打印
                    .exp-top{
                        overflow: hidden;
                        height: 36px;
                        line-height: 36px;
                        i{
                            width: 16px;
                            height: 16px;
                            float: left;
                            margin-right: 4px;
                            margin-top: 4px;
                        }
                        .export{
                            float: left;
                        }
                        .print{
                            float: right;
                            margin-left: 6px;
                        }
                    }
                }
            }
            // 表格
            .el-table{
                .cell{
                    padding: 0 6px;
                }
                th{
                    height: 50px;
                }
                td{
                    height: 45px;
                }
                .handle{
                    cursor: pointer;
                }
                .success{
                    width: 14px;
                    height: 14px;
                    display: inline-block;
                    float: left;
                    margin-right: 5px;
                    margin-top: 5px;
                    background: url("../../assets/researchCenter/tongguo.png") 0 0 no-repeat;
                }
                .nosussess{
                    width: 14px;
                    height: 14px;
                    display: inline-block;
                    float: left;
                    margin-right: 5px;
                    margin-top: 5px;
                    background: url("../../assets/researchCenter/butongguo.png") 0 0 no-repeat;
                }
                .shenhe{
                    width: 14px;
                    height: 14px;
                    display: inline-block;
                    float: left;
                    margin-right: 5px;
                    margin-top: 5px;
                    background: url("../../assets/researchCenter/shenhe.png") 0 0 no-repeat;
                }
            }
            
            // 分页
            .block{
                margin-top: 40px;
                text-align: center;
            }
        }
        // 待审核弹窗
        .pend-cartridge{
            .el-dialog--small{
                width: 25%;
            }
            .el-dialog__body{
                padding: 20px;
                overflow: hidden;
            }
            .addclasses-cpm{
                display:inline-block;
                float: left;
            }
            .addclasses-cpm p{
                display:inline-block;
                margin-left:10px;
            }
            .addclasses-cpm img{
                vertical-align: middle;
            }
            .pend-main{
                margin-top: 24px;
                .pend-height{
                    textarea{
                        height: 162px;
                        background-color: #fafafa;
                        border: 0;
                    }
                }
            }
            .pend-btn{
                text-align: center;
                margin-top: 28px;
                button{
                    width: 96px;
                    height: 42px;
                    border: 0;
                    color: #fff;
                    border-radius: 6px;
                }
                .get-through{
                    background-color: #91c604;
                    margin-right: 28px;
                }
                .not-through{
                    background-color: #ef0000;
                }
            }
        }
</style>