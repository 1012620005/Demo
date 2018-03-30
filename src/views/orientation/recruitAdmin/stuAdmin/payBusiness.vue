<template>
	<div class="contanier">
        <!--缴费业务-->
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
					缴费业务
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="paybusine-main">
            <el-col :span="24">
                <h4>必缴费业务</h4>
                <ul class="pre-service">
                    <li v-for="must in mustlist">
                        <img src="../../../../assets/img/orientation/lodge.png" alt="">
                        <p>{{must.name}}</p>
                        <div class="coll">
                            <p>实收：<span>{{must.cost}}</span></p>
                        </div>
                    </li>
                </ul>
                <div class="state">
                    <p>说明：</p>
                    <ul>
                        <li>1、请于报到前准备好上述各项费用，以便报到现场进行费用缴纳</li>
                        <li>2、请仔细核对，如有疑问请致电财务部 电话：XXX-XXXXXXXX</li>
                        <!-- <li>3、申请助学贷款和学费缓缴、免缴的同学请点击 <span>绿色通道</span></li> -->
                    </ul>
                </div>
            </el-col>
            <el-col :span="24" class="itintend">
                <h4>物品预定</h4>
                <div class="itint-box"  v-for="(optional,index) in opList">
                    <img src="../../../../assets/img/orientation/military.png" alt="">
                    <div class="train-cloth">
                        {{optional.name}}<span>￥{{optional.cost}}</span>
                    </div>
                    <ul>
                        <li>规格</li>
                        <li>
                            <template>
                                <el-radio-group v-model="total[index].radio3">
                                    <el-radio-button :label="obj" :name="obj" v-for="(obj,index) in optional.standerd.split(',')" :key="index"></el-radio-button>
                                </el-radio-group>
                            </template>
                        </li>
                    </ul>
                    <div class="itinum">
                        <div>数量</div>
                        <template class="numbs">
                            <el-input-number v-model="total[index].num1" @change="handleChange" :min="0" :max="10"></el-input-number>
                        </template>
                    </div>
                </div>
            </el-col>
            <el-col :span="24" class="refers">
                <el-button type="primary" @click="btnRefer()">提交</el-button>
            </el-col>
        </el-row>
        <!--确认弹框-->
        <el-dialog :visible.sync="showConfirm" class="confirm-infor">
            <div slot="title" class="addclasses-cpm" >
                <p>确认</p>
            </div>
            <div class="infor-bottom">
                <div class="willpay pay">
                    <div class="will-left">必缴费用</div>
                    <ul>
                        <li v-for="item in mustlist">{{item.name}}：<span>{{item.cost}}</span></li>
                    </ul>
                </div>
                <div class="intends pay">
                    <div class="will-left">物品预定</div>
                    <ul>
                        <li v-for="(comb,index) in total">{{opList[index].name}}：<i>{{comb.radio3}}</i><i>{{comb.num1}}套</i><span>{{comb.num1*opList[index].cost}}元</span></li>
                    </ul>
                </div>
                <div class="total">
                    合计 ：<span>{{numbers}}元</span>
                </div>
                <div class="payment">
                    <div class="will-left">支付方式</div>
                    <template>
                        <el-radio class="radio" v-model="radio" label="1"><img src="../../../../assets/img/orientation/zfb.png" alt=""></el-radio>
                        <el-radio class="radio" v-model="radio" label="2"><img src="../../../../assets/img/orientation/wx.png" alt=""></el-radio>
                        <el-radio class="radios" v-model="radio" label="3">线下支付</el-radio>
                    </template>
                </div>
            </div>
            <el-button type="primary" class="confirms" @click="confirm()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="拼命加载中">确认</el-button>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
    // import fcHeader from '../../../common/header.vue'
    import api from '../../../../apis/orientation/recruitAdmin.js'

	export default {
		data () {
			return {
			    // radio3: '',
                // num1: 1,
                showConfirm:false,
                mustlist:'', //必缴费用
                opList:'', //可选缴费
                stand:'',
                total:[],
                numbers:Number,
                radio:'',
                fullscreenLoading:false
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
            btnRefer(){
                let _this= this
                let arr =0
                this.mustlist.map(function(item,index){
                    arr =Number(item.cost)+arr
                })
                this.total.map(function(item,index){
                  arr = item.num1*_this.opList[index].cost+arr
                })
                this.numbers = arr
                this.showConfirm=true;
            },
            confirm(){
                var stringList = [];
                //必缴项
                for(var i = 0; i < this.mustlist.length; i++){
                    var item = this.mustlist[i];
                    var str = {
                        payItemId : item.id,
                        count : 1,
                        standerd : item.standerd
                    }
                    stringList.push(str);
                }
                //可选项
                for(var i = 0; i < this.total.length; i++){
                    var item = this.total[i];
                    if(item.radio3 != "" && item.num1 != ""){
                        var str = {
                            payItemId : item.id,
                            count : item.num1,
                            standerd : item.radio3
                        }
                        stringList.push(str);
                    }
                }
                console.log(stringList);
                var datas = {stringList :JSON.stringify(stringList),
                            stuId : this.$Cookies.get("idcard"),
                            // stuId:1111,
                            totalCash : 11111}
                            // console.log('hkgha');
                            // console.log(this.$route.query.id)
                            console.log(this.$Cookies.get("idcard"))
                var qs = require('querystring')
                var data = qs.stringify(datas)
                console.log(data);

                api.stuPayinfo(data).then(response => {
                    console.log(response)
                    if(response.data.meta.code == 200){
                        // this.mustlist = response.data.data.mustList;
                    }
                });
                this.fullscreenLoading = true;
                setTimeout(() => {
                    this.fullscreenLoading = false;
                    this.$router.push({
                        name:'paymentList',
                        // query:{
                        //     id: this.$Cookies.get("idcard"),
                        // }
                    })
                }, 3000);
                
            },
            returnClick(){
                this.$router.push('/')
            }
        },
        computed:{
        
        },
        mounted () {
            api.allPayItem().then(response => {
				if(response.data.meta.code == 200){
					this.mustlist = response.data.data.mustList;
                    this.opList = response.data.data.notMustList;
                    for(let i=0;i<this.opList.length;i++){
                        this.total.push({
                            id:this.opList[i].id,
                            radio3:"",  
                            num1:""
                        })
                    }
				}
			});
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
        .paybusine-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .pre-service{
                margin-top: 32px;
                margin-bottom: 32px;
                overflow: hidden;
                li{
                    float: left;
                    width:200px;
                    height:240px;
                    margin-right: 30px;
                    margin-bottom:20px;
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
                            cursor: pointer;
                        }
                    }
                }
            }
            h4{
                margin-top: 22px;
            }
            .itintend{
                margin-top: 22px;
                overflow: hidden;
                .itint-box{
                    float: left;
                    margin-right: 30px;
                }
                img{
                    margin-top: 24px;
                    margin-bottom: 16px;
                }
                .train-cloth{
                    margin-bottom: 22px;
                    span{color: #ef0000;display: inline-block;margin-left: 62px;}
                }
                
            }
            .itinum{
                height: 36px;
                line-height: 36px;
                div{float: left;margin-right: 10px;}
                .numbs{float:left;}
            }
            .refers{
                text-align: center;
                margin-top: 50px;
                button{
                    width:160px;
                    height:40px;
                }
            }
        }
        .confirm-infor{
            .el-dialog--small{
                width: 35%;
            }
            .el-dialog__body{
                overflow: hidden;
            }
            .infor-bottom{
                .pay{
                    min-height:108px;
                    border-bottom: 1px solid #d2d2d2;
                    overflow: hidden;
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
                }
                .payment{
                    margin-top: 30px;
                    padding-top: 30px;
                    border-top: 1px solid #d2d2d2;
                    .will-left{float: left;width:30%;}
                    .el-radio__input{float: left;}
                    .el-radio__label{
                        float: left;
                        margin-top: 2px;
                    }
                    .radios{
                        .el-radio__label{
                            margin-top: -1px;
                        }
                    }
                }
            }
            .confirms{
                width: 96px;
                height:42px;
                float: right;
                margin-top: 8px;
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
        }
</style>
<style type="text/css" lang="scss">
    .paybusine-main{
        .itintend{
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
    }
    .confirm-infor{
        .el-dialog__header,.el-dialog__body{
            overflow: hidden;
        }
    }
</style>
