<template>
	<div class="contanier">
		<fc-header></fc-header>
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					学生物品领取
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="gorecestu-main">
            <ul class="particulars">
                <li v-for="item in mustList">
                    <div class="gorleft">
                        <img src="../../../../assets/img/orientation/milsma.png" alt="">
                    </div>
                    <div class="gorright">
                        <p>{{item.payItemName}}：<i>{{item.cost}}元</i></p>
                    </div>
                </li>
                <li v-for="pre in nomustList">
                    <div class="gorleft">
                        <img src="../../../../assets/img/orientation/milsma.png" alt="">
                    </div>
                    <div class="gorright">
                        <p>{{pre.payItemName}}：<span>{{pre.standerd}}</span><span>{{pre.count}}套</span><i>{{pre.cost}}元</i></p>
                    </div>
                </li>
            </ul>
            <div class="gorbtn">
                <el-button type="primary" @click="confirmReceive()">确认领取</el-button>
            </div>
        </el-row>
	</div>
</template>
<script type="text/javascript">
    import fcHeader from '../../../common/header.vue'
    import api from '../../../../apis/orientation/recruitAdmin.js'

	export default {
		data () {
			return {
                input2: '',
                mustList:[],
                nomustList:[],
                totalList:[]
            }
		},
		components:{
			fcHeader
		},
        methods:{
            handleIconClick(ev) {
                console.log(ev);
            },
            loadArticles(){
                var id = this.$route.query.id;
                console.log('abcdefy');
                console.log(this.$route.query.id)
                let params = {stuId:id}
                api.getPayInfo(params).then(response => {
                    if(response.data.meta.code == 200){
                        this.mustList = response.data.data.mustList;
                        this.nomustList = response.data.data.notMustList;
                        this.totalList.id = response.data.data.payTotal.id;
                    }
                });
            },
            // 确认领取
            confirmReceive(){
                let params = {
                    id: this.totalList.id
                }
                api.getGoods(params).then(response => {
                    console.log('jga')
                    console.log(response)
                    if(response.data.meta.code == 200){
                        if(this.$route.query.user_Type == 1){
                            this.$router.push({
                                name:'goodsreceSearch'
                            })
                        }else{
                            this.$router.push({
                                name:'counsellorIndex'
                            })
                        }
                    }
                });
            },
            returnClick(){
                this.$router.push({
                    name:'goodsreceSearch'
                })
            }
        },
        computed:{
        
        },
        mounted () {
            this.loadArticles();
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
        .gorecestu-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            background-color: #fff;
            overflow: hidden;
            border-radius: 4px;
            padding: 18px 22px;
            margin-bottom: 32px;
            min-height: 580px;
            .particulars{
                li{
                    border-bottom: 1px solid #d2d2d2;
                    overflow: hidden;
                    margin-bottom: 30px;
                    padding-bottom: 30px;
                    .gorleft{
                        float: left;
                        margin-right: 12px;
                    }
                    .gorright{
                        float: left;
                        position: relative;
                        height: 61px;
                        width: 800px;
                        p{
                            position: absolute;
                            bottom: 0;
                            left:0;
                            span{margin-right: 20px;}
                            i{color:#ef0000;}
                        }
                    }
                }
                li:last-child{
                    border-bottom: 0;
                }
            }
            .gorbtn{
                text-align: center;
                button{
                    width: 160px;
                    height: 40px;
                }
            }
        }
        
</style>
