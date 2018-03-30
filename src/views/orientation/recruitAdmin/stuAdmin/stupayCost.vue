<template>
	<div class="contanier">
        <!--缴费业务管理-->
		<fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					学生缴费业务管理
				</div>
				<div class="tabright">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="paycost-main">
            <el-col :span="24"  class="paycost-top">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="校区">
                        <el-select v-model="formInline.campus" value-key="id" placeholder="" @change="campus(formInline.campus,'2')">
                            <el-option v-for="item in campuses" :value="item" :label="item.name" :key="item.id">{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="院系">
                        <el-select v-model="formInline.depart" value-key="id" placeholder="" @change="campus(formInline.depart,'3')">
                            <el-option v-for="item in departs" :value="item" :label="item.name" :key="item.id">{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业">
                        <el-select v-model="formInline.major" value-key="id" placeholder="">
                            <el-option v-for="item in majors" :value="item" :label="item.name" :key="item.id">{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="date2" label="选择时间" class="state">
                        <el-date-picker v-model="formInline.value1" type="datetime" placeholder="支付时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="支付状态" class="states">
                        <el-select v-model="formInline.paystat" value-key="id" placeholder="">
                            <el-option v-for="item in paystats" :value="item" :label="item.name" :key="item.id">{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="search-group">
                        <el-input placeholder="请输入学生姓名" icon="search" v-model="formInline.search" :on-icon-click="handleIconClick"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <div class="porint">
                    <img src="../../../../assets/img/orientation/export.png" alt="">
                    <img src="../../../../assets/img/orientation/print.png" alt="">
                </div>
            </el-col>
            <el-col :span="24" class="stucost-list">
                <template>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="ord" label="序号" width="66"></el-table-column>
                        <el-table-column prop="stuname" label="学生姓名" width="100"></el-table-column>
                        <el-table-column prop="sex" label="性别" width="66"></el-table-column>
                        <el-table-column prop="idcard" label="身份证号" width="190"></el-table-column>
                        <el-table-column prop="peo" label="民族"></el-table-column>
                        <el-table-column prop="pro" label="申请专业"></el-table-column>
                        <el-table-column prop="edu" label="学制"  width="80"></el-table-column>
                        <el-table-column prop="paytime" label="支付时间" width="160"></el-table-column>
                        <el-table-column prop="paytotal" label="缴费合计" width="100"></el-table-column>
                        <el-table-column prop="oper" label="操作" width="110">
                            <template slot-scope="scope">
                                <div v-if="scope.row.vacateStatus == 1" class="handle clearfix hagreen">
                                    已支付
                                    <i @click="paydeail"><img src="../../../../assets/img/orientation/view.png" alt=""></i>
                                </div>
                                <div v-else-if="scope.row.vacateStatus == 2" class="handle clearfix hared">
                                    未支付
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>
        </el-row>
        <!--支付详情-->
        <el-dialog class="paydetails" :visible.sync="showConfirm">
            <div slot="title" class="addclasses-cpm" >
                <img src="../../../../assets/image/addstudent2.png" />
                <p>清单</p>
            </div>
            <div class="det-bottom">
                <div class="willpay pubs">
                    <h4>必缴费用</h4>
                    <ul>
                        <li>
                            <img src="../../../../assets/img/orientation/lodsma.png" alt="">
                            <div class="coll">
                                <span>住宿费：<i>3000元</i></span>
                            </div>
                        </li>
                        <li>
                            <img src="../../../../assets/img/orientation/tuitsma.png" alt="">
                            <div class="coll">
                                <span>住宿费：<i>3000元</i></span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="itintent pubs">
                    <h4>物品预定</h4>
                    <ul>
                        <li>
                            <img src="../../../../assets/img/orientation/milsma.png" alt="">
                            <div class="cloth">
                                <div>军训服：<span>M</span><span>1套</span><i>3000元</i></div>
                            </div>
                        </li>
                        <li>
                            <img src="../../../../assets/img/orientation/milsma.png" alt="">
                            <div class="cloth">
                                <div>军训服：<span>M</span><span>1套</span><i>3000元</i></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="datatotal">
                    <ul>
                        <li>订单提交时间：<span>2017-12-30  13：09：28</span></li>
                        <li class="modepay"><span>支付方式：</span><i><img src="../../../../assets/img/orientation/zfb.png" alt=""></i></li>
                        <li class="totup">合计：<span>12000元</span></li>
                    </ul>
                </div>
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
    import fcHeader from '../../../common/header.vue'
    import api from '../../../../apis/orientation/stumajors.js'

	export default {
		data () {
			return {
			    radio3: '',
                num1: 1,
                radio:'',
                formInline: {
                    campus:'',
                    depart: '',
                    major:'',
                    value1: '',
                    paystat:''
                },
                campuses:[],
                departs:[],
                majors:[],
                paystats:[],
                tableData: [{
                    ord: '1',
                    stuname: '姜小珂',
                    sex: '女',
                    idcard:'130183100000000000',
                    peo:'汉',
                    pro:'计算机',
                    edu:'三年制',
                    paytime:'2017-9-28 19:30',
                    paytotal:'3000元',
                    vacateStatus:1
                },{
                    ord: '2',
                    stuname: '姜小珂',
                    sex: '女',
                    idcard:'130183100000000000',
                    peo:'汉',
                    pro:'计算机',
                    edu:'三年制',
                    paytime:'2017-9-28 19:30',
                    paytotal:'3000元',
                    vacateStatus:1
                },{
                    ord: '3',
                    stuname: '姜小珂',
                    sex: '女',
                    idcard:'130183100000000000',
                    peo:'汉',
                    pro:'计算机',
                    edu:'三年制',
                    paytime:'2017-9-28 19:30',
                    paytotal:'3000元',
                    vacateStatus:2
                }],
                showConfirm:false,
            }
		},
		components:{
			fcHeader
		},
        methods:{
            handleChange(value) {
                console.log(value);
            },
            handleIconClick(ev) {
                console.log(ev);
            },
            paydeail(){
                this.showConfirm=true;
            },
            campus(item, type){
                let tables = {
                    id: item.id,
                    type: type
                }
                api.loadSelect(tables).then(response => {
                    console.log(response.data.data);
                    if(response.data.meta.code == 200){
                        if(type =='2'){
                            this.departs = response.data.data;
                        }else if(type =='3'){
                            this.majors = response.data.data;
                        }else if(type=='4'){
                            this.campuses = response.data.data;
                        }
                    }
                });
            }
        },
        computed:{
        
        },
        mounted () {
            this.campus({id : '1',name : ''}, 4);
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
        .paycost-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .paycost-top{
                .el-form-item{
                    width:15%;
                    .el-form-item__content{
                        width:76%;
                    }
                    .el-date-editor.el-input{
                        width: 100%;
                    }
                }
                .state{
                    width: 15%;
                    .el-form-item__content{
                        width: 60%;
                    }
                }
                .states{
                    width: 15%;
                    .el-form-item__content{
                        width: 60%;
                    }
                }
                .search-group{
                    .el-form-item__content{
                        width: 100%;
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
            .porint{
                float: right;
                overflow: hidden;
                margin-bottom: 20px;
                img{
                    margin-left: 15px;
                }
            }
            .stucost-list{
                .el-table th{
                    height: 50px;
                }
                .hagreen{
                    color:#91c604;
                    i{
                        width:25px;
                        height: 16px;
                        margin-top: 4px;
                        margin-left: 5px;
                        float: right;
                        cursor: pointer;
                    }
                }
                .hared{
                    color:#ef0000;
                }
            }
        }
        // 支付详情
        .paydetails{
            .el-dialog--small{
                width: 35%;
            }
            .el-dialog__body{
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
            .det-bottom{
                .pubs{
                    h4{font-size: 16px;margin-bottom: 16px;}
                    border-bottom: 1px solid #d2d2d2;
                    overflow: hidden;
                    ul{margin-bottom: 30px}
                }
                .willpay{
                    li{
                        overflow: hidden;
                        margin-bottom: 30px;
                        img{float: left;margin-right: 10px;}
                        .coll{
                            float: left;
                            height: 63px;
                            width:50%;
                            position: relative;
                            span{
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                i{color: #ef0000;}
                            }
                            
                        }
                    }
                }
                .itintent{
                    h4{margin-top: 24px;}
                    li{
                        overflow: hidden;
                        margin-bottom: 30px;
                        img{float: left;margin-right: 10px;}
                        .cloth{
                            float: left;
                            height: 63px;
                            width:50%;
                            position: relative;
                            div{
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                span{margin-right: 18px}
                                i{color: #ef0000;}
                            }
                        }
                    }
                }
                .datatotal{
                    overflow: hidden;
                    margin-top: 24px;
                    li{
                        float: left;
                        margin-right: 30px;
                    }
                    .modepay{
                        span{
                            float: left;
                            margin-right: 4px;
                        }
                        i{float: left;margin-top: 2px;}
                    }
                    .totup{color: #ef0000;}
                }
            }
        }
</style>
