<template>
	<div class="contanier">
        <!--缴费业务线上-->
		<fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					缴费业务
				</div>
				<div class="tabright">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="payline-main">
            <el-col :span="24">
                <h4>必缴费业务</h4>
                <ul class="payline-service">
                    <li>
                        <img src="../../../../assets/img/orientation/lodge.png" alt="">
                        <p>住宿费</p>
                        <div class="coll">
                            <p>应收：<span>600</span></p>
                            <p>实收：<span>600</span></p>
                        </div>
                    </li>
                    <li>
                        <img src="../../../../assets/img/orientation/tuition.png" alt="">
                        <p>学费</p>
                        <div class="coll">
                            <p>应收：<span>600</span></p>
                            <p>实收：<span>600</span></p>
                        </div>
                    </li>
                    <li>
                        <img src="../../../../assets/img/orientation/stustatus.png" alt="">
                        <p>学籍费</p>
                        <div class="coll">
                            <p>应收：<span>600</span></p>
                            <p>实收：<span>600</span></p>
                        </div>
                    </li>
                </ul>
                <div class="state">
                    <p>说明：</p>
                    <ul>
                        <li>1、请于报到前准备好上述各项费用，以便报到现场进行费用缴纳</li>
                        <li>2、请仔细核对，如有疑问请致电财务部 电话：XXX-XXXXXXXX</li>
                        <li>3、申请助学贷款和学费缓缴、免缴的同学请点击 <span>绿色通道</span></li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="24" class="itintline">
                <h4>物品预定</h4>
                <div class="showphoto">
                    <img src="../../../../assets/img/orientation/military.png" alt="">
                     <div class="check">
                        <img src="../../../../assets/img/orientation/check.png" alt="">
                    </div>
                </div>
               
                <div class="train-cloth">
                    军训服<span>69元</span>
                </div>
                <ul>
                    <li>规格</li>
                    <li>
                        <template>
                            <el-radio-group v-model="radio3">
                                <el-radio-button label="M"></el-radio-button>
                                <el-radio-button label="L"></el-radio-button>
                                <el-radio-button label="XL"></el-radio-button>
                                <el-radio-button label="XXL"></el-radio-button>
                                <el-radio-button label="XXXL"></el-radio-button>
                            </el-radio-group>
                        </template>
                    </li>
                </ul>
                <div class="itinum">
                    <div>数量</div>
                    <template class="numbs">
                        <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
                    </template>
                </div>
            </el-col>
            <el-col :span="24" class="referline">
                <el-button type="primary" @click="btnRefer">提交</el-button>
            </el-col>
        </el-row>
        <!--确认弹框-->
        <div class="payline-infor" v-if="showConfirm">
            <div class="infor-top">
				<div class="infor-cluster">
					<img src="../../../../assets/img/orientation/affirm.png" alt="">
				</div>
				<div class="infor-close" @click="closeConfirm">
					<img src="../../../../assets/researchCenter/close.png" alt="">
				</div>
			</div>
            <div class="infor-bottom">
                <div class="willpay pay">
                    <div class="will-left">必缴费用</div>
                    <ul>
                        <li>学费：<span>3000元</span></li>
                        <li>学费：<span>3000元</span></li>
                        <li>学费：<span>3000元</span></li>
                    </ul>
                </div>
                <div class="intends pay">
                    <div class="will-left">物品预定</div>
                    <ul>
                        <li>军训服：<i>M</i><i>1套</i><span>3000元</span></li>
                        <li>军训服：<i>M</i><i>1套</i><span>3000元</span></li>
                        <li>军训服：<i>M</i><i>1套</i><span>3000元</span></li>
                    </ul>
                </div>
                <div class="total">
                    合计 ：<span>12000元</span>
                </div>
                <div class="payment">
                    <div class="will-left">支付方式</div>
                    <template>
                        <el-radio class="radio" v-model="radio" label="1"><img src="../../../../assets/img/orientation/zfb.png" alt=""></el-radio>
                        <el-radio class="radio" v-model="radio" label="2"><img src="../../../../assets/img/orientation/wx.png" alt=""></el-radio>
                    </template>
                </div>
            </div>

            <el-button type="primary" class="confirms">确认</el-button>
        </div>
        <!--遮罩层-->
        <div class="desk"  v-if="showDesk"></div>
	</div>
</template>
<script type="text/javascript">
    import fcHeader from '../../../common/header.vue'
    import api from '../../../../apis/orientation/recruitAdmin.js'

	export default {
		data () {
			return {
			    radio3: '',
                num1: 1,
                radio:'',
                showConfirm:false,
                // 遮罩层
                showDesk:false,
                
            }
		},
		components:{
			fcHeader
		},
        methods:{
            handleChange(value) {
                console.log(value);
            },
            btnRefer(){
                this.showConfirm=true;
                this.showDesk=true;
            },
            closeConfirm(){
                this.showConfirm=false;
                this.showDesk=false;
            }
        },
        computed:{
        
        },
        mounted () {
            api.allPayItem().then(response => {
                // console.log(response);
				if(response.data.meta.code == 200){
					// this.tableDataen = response.data.data;
				}
			});
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
        .payline-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .payline-service{
                margin-top: 32px;
                margin-bottom: 32px;
                overflow: hidden;
                li{
                    float: left;
                    width:200px;
                    height:240px;
                    margin-right: 32px;
                    background-color: #fbfcfd;
                    text-align: center;
                    img{
                        margin-top: 24px;
                        margin-bottom: 16px;
                    }
                    p{
                        font-size: 16px;
                    }
                    .coll{
                        margin-top: 12px;
                        p{
                            font-size: 14px;
                            color:#666666;
                            margin-bottom: 8px;
                        }
                    }
                }
            }
            .state{
                ul{
                    margin-top: 8px;
                    li{
                        margin-bottom: 6px;
                        span{
                            color:#91c604;
                            font-size: 18px;
                            text-decoration: underline;
                        }
                    }
                }
            }
            h4{
                margin-top: 22px;
            }
            .itintline{
                margin-top: 22px;
                .showphoto{
                    width:140px;
                    height:160px;
                    position: relative;
                    img{
                        margin-top: 24px;
                        margin-bottom: 16px;
                    }
                    .check{
                        img{
                            position: absolute;
                            top:0;
                            right:0;
                        }
                    }
                }
                .train-cloth{
                    margin-bottom: 22px;
                    span{color: #ef0000;display: inline-block;margin-left: 62px;}
                }
                ul{
                    overflow: hidden;
                    margin-bottom: 22px;
                    li{
                        float: left;
                        margin-right: 10px;
                        height: 30px;
                        line-height: 30px;
                        .el-radio-group{
                            height: 30px;
                            .el-radio-button__inner{
                                padding:8px;
                            }
                            .el-radio-button:first-child .el-radio-button__inner{
                                border-radius: 4px;
                                border: 0;
                            }
                            .el-radio-button:last-child .el-radio-button__inner{
                                border-radius: 4px;
                                border: 0;
                            }
                            .el-radio-button__inner{
                                border: 0;
                                background-color: #eef1f6;
                                border-radius: 4px;
                            }
                            .el-radio-button{
                                margin-right: 14px;
                            }
                            .el-radio-button__orig-radio:checked+.el-radio-button__inner{
                                background-color: #208af5;
                            }
                        }
                    }
                }
            }
            .itinum{
                height: 36px;
                line-height: 36px;
                div{float: left;margin-right: 10px;}
                .numbs{float:left;}
            }
            .referline{
                text-align: center;
                margin-top: 8px;
                button{
                    width:160px;
                    height:40px;
                }
            }
        }
        // 确认弹框
        .payline-infor{
            width: 440px;
            min-height: 498px;
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
            .infor-bottom{
                .pay{
                    height:108px;
                    border-bottom: 1px solid #d2d2d2;
                    .will-left{
                        float: left;
                        width:30%;
                        font-size: 16px;
                    }
                    ul{
                        float: left;
                        li{
                            span{color:#ef0000;}
                            margin-bottom: 12px;
                            i{margin-right: 20px;}
                        }
                    }
                }
                .intends{
                    margin-top: 30px;
                }
                .total{
                    font-size: 16px;
                    margin-top: 28px;
                    color:#ef0000;
                    height: 46px;
                    border-bottom: 1px solid #d2d2d2;
                }
                .payment{
                    margin-top: 30px;
                    .will-left{float: left;width:30%;}
                    .el-radio__input{float: left;}
                    .el-radio__label{
                        float: left;
                        margin-top: 2px;
                    }
                }
            }
            .confirms{
                width: 96px;
                height:42px;
                float: right;
                margin-top: 8px;
            }
        }
</style>
