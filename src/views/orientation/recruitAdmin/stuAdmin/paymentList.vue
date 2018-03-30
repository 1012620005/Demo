<template>
	<div class="contanier">
        <!--我的缴费清单-->
		<!-- <fc-header></fc-header> -->
        <div class="navigation">
            <el-menu  class="el-menu-demo" >
                <div class="navlogo">
                    <span class="logo"  @click="back"><img style="cursor: pointer;" src='../../../../assets/image/logo.png'/></span><span class="logouesr">智慧校园</span>
                </div>
            </el-menu>
        </div>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					我的缴费清单
				</div>
				<div class="tabright" @click="returnFirst">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="mentList-main">
            <el-col :span="24"  class="mentList-service">
                <h4>必缴费用</h4>
                <ul>
                    <li v-for="item in itemList">
                        <img src="../../../../assets/img/orientation/lodsma.png" alt="">
                        <div class="coll">
                            <span>{{item.payItemName}}：<i>{{item.cost}}</i></span>
                        </div>
                    </li>
                </ul>
            </el-col>
            <el-col :span="24" class="itinlist">
                <h4>物品预定</h4>
                <ul>
                    <li v-for="pre in preList">
                        <img src="../../../../assets/img/orientation/milsma.png" alt="">
                        <div class="cloth">
                            <div>{{pre.payItemName}}：<span>{{pre.standerd}}</span><span>{{pre.count}}套</span><i>{{pre.cost}}元</i></div>
                        </div>
                    </li>
                </ul>
            </el-col>
            <el-col :span="24" class="ordertime">
                <ul>
                    <li>订单提交时间：<span>{{user.updateDate}}</span></li>
                    <li class="modepay"><span>支付方式：</span><i>线下支付</i></li>
                    <!-- <li class="modepay"><span>支付方式：</span><i><img src="../../../../assets/img/orientation/zfb.png" alt=""></i></li> -->
                    <!-- <li class="modepay"><span>支付方式：</span><i>{{user.payMethod}}</i></li> -->
                    <li class="totup">合计：<span>{{user.totalCash}}</span></li>
                </ul>
            </el-col>
        </el-row>
        
	</div>
</template>
<script type="text/javascript">
    // import fcHeader from '../../../common/header.vue'
    import api from '../../../../apis/orientation/recruitAdmin.js'

	export default {
		data () {
			return {
			    radio3: '',
                num1: 1,
                radio:'',
                itemList:[],
                preList:[],
                user:'',
            }
		},
		components:{
			// fcHeader
		},
        methods:{
            back(){
                this.$router.push('/newIndex')
            },
            handleChange(value) {
                console.log(value);
            },
            returnFirst(){
                this.$router.push({
                    name:'newIndex',
                    // query:{
                    //     id: this.stuId
                    // }
                })
            }
        },
        computed:{
        
        },
        mounted () {
            
            let stuId = {
                stuId:this.$Cookies.get("idcard")
            }
            console.log('jjjgggg')
            console.log(stuId)
            // setTimeout(function(){
                api.getPayInfo(stuId).then(response => {
                    if(response.data.meta.code == 200){
                        this.itemList = response.data.data.mustList;
                        this.preList = response.data.data.notMustList;
                        this.user = response.data.data.payTotal;
                    }
                });
            // },5000)
            
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
        .navigation{
            .el-menu{
                background-color:#208af5;
            }
            .navlogo{
                margin:0 auto;
                height:70px;
                width:1200px;
                text-align:left;
                line-height:70px;
                color:#fff;
                font-size:16px;
            }
            .logouesr{
                margin-top: 8px;
                margin-left:5px;
                display: inline-block;
                height: 60px;
                font-size: 20px;
                font-weight: bold;;
            }  
            .navlogo img{
                vertical-align: middle;
            }
            .logo{
                float:left;
            }
            .logo>img{
                margin-right:6px;
            }
        }
        .mentList-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .mentList-service{
                margin-top: 32px;
                margin-bottom: 32px;
                overflow: hidden;
                border-bottom: 1px solid #d2d2d2;
                li{
                    height:63px;
                    margin-bottom:28px; 
                    img{
                        float: left;
                    }
                    div{
                        float: left;
                        height:63px;
                        width: 50%;
                        margin-left: 12px;
                        position: relative;
                        span{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                        }
                        i{color: #ef0000;}
                    }
                }
            }
            h4{
                font-size: 16px;
                margin-bottom: 20px;
            }
            .itinlist{
                border-bottom: 1px solid #d2d2d2;
                li{
                    overflow: hidden;
                    margin-bottom: 32px;
                    img{float: left;}
                    .cloth{
                        float: left;
                        height: 61px;
                        width: 50%;
                        margin-left: 12px;
                        position: relative;
                        div{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            span{
                                margin-right: 20px;
                            }
                            i{color: #ef0000;}
                        }
                    }
                }
            }
            .ordertime{
                margin-top: 26px;
                ul{
                    li{
                        float: left;
                        margin-right: 114px;
                    }
                    .modepay{
                        span{float: left}
                        i{
                            float: left;
                            margin-top: 2px;
                            margin-left: 4px;
                        }
                    }
                }
            }
        }
        
</style>
<style type="text/css" lang="scss">
    

</style>
