<template>
	<div class="contanier">
        <!--主体内容-->
        <el-row :span="24" class="newenrs-main">
            <el-col :span="24"  class="newenrs-top">
                <el-form :inline="true" :model="formline" class="demo-form-inline">
                    <el-form-item label="校区 ">
                        <el-select v-model="formline.campus" placeholder="">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学期">
                        <el-select v-model="formline.term" placeholder="">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="院系">
                        <el-select v-model="formline.depart" placeholder="">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业">
                        <el-select v-model="formline.major" placeholder="">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-select v-model="formline.class" placeholder="">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="助学类型" class="stutypes">
                        <el-select v-model="formline.stutype" placeholder="">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :spam="24" class="newenrs-two">
                <div class="appfund fud" @click="showfund"><img src="../../../../assets/img/orientation/applyfund.png" alt=""></div>
                <div class="fud">
                    <el-form :inline="true" :model="formline" class="demo-form-inline">
                        <el-form-item class="search-group">
                            <el-input placeholder="请输入学生姓名" icon="search" v-model="formline.search" :on-icon-click="handleIconClick"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="fud stamp">
                    <img src="../../../../assets/img/orientation/export.png" alt="" class="dypoint">
                    <img src="../../../../assets/img/orientation/print.png" alt="">
                </div>
            </el-col>
            <el-col :span="24" class="newenrs-list">
                <template>
                    <el-table :data="tableDataen" stripe style="width: 100%">
                        <el-table-column prop="ord" label="序号" width="55"></el-table-column>
                        <el-table-column prop="campu" label="校区" width="70"></el-table-column>
                        <el-table-column prop="name" label="姓名" width="70"></el-table-column>
                        <el-table-column prop="attach" label="附件" width="100"></el-table-column>
                        <el-table-column prop="sex" label="性别" width="55"></el-table-column>
                        <el-table-column prop="term" label="学期"  width="180"></el-table-column>
                        <el-table-column prop="faculty" label="院系" width="70"></el-table-column>
                        <el-table-column prop="major" label="专业" width="70"></el-table-column>
                        <el-table-column prop="class" label="班级" width="55"></el-table-column>
                        <el-table-column prop="stutype" label="助学类型"  width="80"></el-table-column>
                        <el-table-column prop="date" label="获奖日期"></el-table-column>
                        <el-table-column prop="oper" label="操作" width="150">
                            <template slot-scope="scope">
                                <div v-if="scope.row.vacateStatus == 1" class="handle handhover clearfix">
                                    <span class="imgScript shenhe"></span>
                                    待审核
                                    <div class="shenheBounce">
                                        <div class="icons pass">
                                            <i></i>
                                            <span>通过</span>
                                        </div>
                                        <div class="icons nopass">
                                            <i></i>
                                            <span>不通过</span>
                                        </div>
                                    </div>				           	   
                                </div>
                                <div v-else-if="scope.row.vacateStatus == 2" class="handle clearfix">
                                    <span class="imgScript nosussess"></span>
                                    未通过
                                    <span class="btns editor" @click="editorDialog(scope.row)" ></span>
                                    <span class="btns delete" @click="deleteDialog(scope.row.id)"></span>
                                </div>
                                <div v-else-if="scope.row.vacateStatus == 3" class="handle clearfix">
                                    <span class="imgScript success"></span>
                                    已通过
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
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
        <!--申请资助-->
        <div class="applyfunds" v-if="showApplyfund">
            <div class="infor-top">
				<div class="infor-cluster">
					<img src="../../../../assets/img/orientation/applyfund.png" alt="">
				</div>
				<div class="infor-close" @click="closeConfirm">
					<img src="../../../../assets/researchCenter/close.png" alt="">
				</div>
			</div>
            <div class="funds-bottom">
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="选择校区：">
                        <el-select v-model="form.ccampu" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择学期：">
                        <el-select v-model="form.cseme" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择院系：">
                        <el-select v-model="form.cdepart" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择专业：">
                        <el-select v-model="form.cmajor" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择班级：">
                        <el-select v-model="form.cclass" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学生姓名：" class="stunameo">
                        <el-input v-model="form.stuname"></el-input>
                    </el-form-item>
                    <el-form-item label="助学类型：">
                        <el-select v-model="form.stutype" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别：">
                        <el-radio-group v-model="form.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="cadbtn">
                        <el-button type="primary" @click="onSubmit">上报</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--遮罩层-->
        <div class="desk"  v-if="showDesk"></div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
			    radio3: '',
                num1: 1,
                radio:'',
                textarea: '',
                formline: {
                    campus: '',
                    term:'',
                    depart:'',
                    major:'',
                    class:'',
                    stutype:''
                },
                tableDataen: [{
                    ord: '1',
                    campu:'东校区',
                    name: '姜小珂',
                    attach:'贫困证明.jpg',
                    sex: '女',
                    term:'2016年-2017年第一学期',
                    faculty:'中医药',
                    major:'中医药',
                    class:'1701',
                    stutype:'助学金',
                    date:'2017-09-07 19:30',
                    vacateStatus:1
                },{
                    ord: '1',
                    campu:'东校区',
                    name: '姜小珂',
                    attach:'贫困证明.jpg',
                    sex: '女',
                    term:'2016年-2017年第一学期',
                    faculty:'中医药',
                    major:'中医药',
                    class:'1701',
                    stutype:'助学金',
                    date:'2017-09-07 19:30',
                    vacateStatus:2
                },{
                    ord: '1',
                    campu:'东校区',
                    name: '姜小珂',
                    attach:'贫困证明.jpg',
                    sex: '女',
                    term:'2016年-2017年第一学期',
                    faculty:'中医药',
                    major:'中医药',
                    class:'1701',
                    stutype:'助学金',
                    date:'2017-09-07 19:30',
                    vacateStatus:3
                }],
                form:{
                    ccampu:'',
                    cseme:'',
                    cdepart:'',
                    cmajor:'',
                    cclass:'',
                    stuname:'',
                    stutype:'',
                    sex:''
                },


                showApplyfund:false,
                // 遮罩层
                showDesk:false,
                // 分页
                currentPage1: 1,
                currentPage2: 1,
                currentPage3: 1,
                currentPage4: 2,
            }
		},
		components:{
			
		},
        methods:{
            handleChange(value) {
                console.log(value);
            },
            handleIconClick(ev) {
                console.log(ev);
            },
            // 申请资助
            showfund(){
                this.showApplyfund=true;
                this.showDesk=true;
            },
            closeConfirm(){
                this.showApplyfund=false;
                this.showDesk=false;
            },
            cancel(){
                this.showApplyfund=false;
                this.showDesk=false;
            },
            onSubmit() {
                console.log('submit!');
            },
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        computed:{
        
        },
        mounted () {
            
        }
	}
</script>
<style type="text/css" lang="scss">
        .newenrs-main{
            width:1200px;
            margin: 0 auto;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            // overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .newenrs-top{
                .el-form-item{
                    width:15%;
                    .el-form-item__content{
                        width:75%;
                    }
                }
                .stutypes{
                    .el-form-item__content{
                        width:60%;
                    }
                }
                .search-group{
                    .el-form-item__content{
                        margin-left: 0 !important;
                        width: 80%;
                    }
                    i{
                        width: 16px;
                        height: 16px;
                        margin: 10px;
                        display: inline-block;
                        float: right;
                        cursor: pointer;
                        background: url("../../../../assets/researchCenter/search.png") 0 0 no-repeat;
                    }
                    .el-icon-search:before{
                        content:"";
                    }                
                }
            }
            .newenrs-two{
                margin-bottom: 16px;
                .fud{
                    float:left;
                    height:36px;
                    line-height: 36px;
                    .search-group{
                        .el-form-item__content{
                            margin-left: 0 !important;
                            width: 80%;
                        }
                        i{
                            width: 16px;
                            height: 16px;
                            margin: 10px;
                            display: inline-block;
                            float: right;
                            cursor: pointer;
                            background: url("../../../../assets/researchCenter/search.png") 0 0 no-repeat;
                        }
                        .el-icon-search:before{
                            content:"";
                        }                
                    }
                }
                .appfund{
                    margin-right: 20px;
                    cursor: pointer;
                }
                .stamp{
                    float: right;
                    .dypoint{margin-right: 15px;}
                }
            }
            .newenrs-list{
                .block{
                    text-align: center;
                    margin-top: 40px;
                }
                .el-table .cell, .el-table th>div{
                    padding: 0 10px;
                }
                .handshow{cursor: pointer;}
                .handhover{
                    position: relative;
                    z-index: 1;
                    .shenheBounce{
                        display: none;
                        opacity: 0;  
                        position: absolute;
                        right: -13px;
                        top: 0;
                        width: 62px;
                        height: 44px;
                        background-color: #fff;
                        padding: 10px;
                        .pass{
                            i{
                                width: 14px;
                                height: 14px;
                                background: url("../../../../assets/researchCenter/tongguo.png") 0 0 no-repeat;
                                display: inline-block;
                            }
                        }
                        .nopass{
                            i{
                                width: 14px;
                                height: 14px;
                                background: url("../../../../assets/researchCenter/butongguo.png") 0 0 no-repeat;
                                display: inline-block;
                            }                    
                        }
                    }                
                }
                .handhover:hover{
                    .shenheBounce{
                        display: block;
                        opacity: 1;  
                        z-index: 1;
                    }
                }
                .el-table::after, .el-table::before{
                    z-index: 0;
                }
                .el-table .cell, .el-table__footer-wrapper, .el-table__header-wrapper,.el-table,.el-table__body-wrapper{
                    overflow: visible;
                }
                span.btns{
                    margin: 0px -3px 0 5px;
                }
            }
        }
        .newenr-main,.el-tabs__content,{
            overflow: visible;
        }
        // 审核
        .applyfunds{
            width: 460px;
            min-height: 516px;
            z-index: 2;
            position: fixed;
            padding:20px;
			top: 50%;
			left: 50%;
			transform:translate(-50%,-50%);
            background-color: #fff;
            border-radius: 6px;
            .infor-top{
                overflow: hidden;
                height: 32px;
                line-height: 32px;
                margin-bottom: 34px;
                .infor-cluster{
                    float: left;
                }
                .infor-close{
                    float: right;
                    cursor: pointer;
                }
            }
            .funds-bottom{
                .stunameo{
                    .el-input{
                        width:59%;
                    }
                }
                .cadbtn{
                    float:right;
                    button{
                        width:96px;
                        height:42px;
                    }
                }
            }
        }
</style>
