<template>
	<div class="contanier">
		<fc-header></fc-header>
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					物品领取身份验证
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="gorece-main">
            <div class="seek" @click="jumpWplist">
                <!-- <el-input placeholder="学生列表搜索" icon="search" v-model="input2" :on-icon-click="handleIconClick"></el-input> -->
                <img src="../../../../assets/img/orientation/stuliss.png" alt="">
            </div>
            <div class="authent">
                <img src="../../../../assets/img/orientation/cardphoto.png" alt="">
            </div>
        </el-row>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../../common/header.vue'
	export default {
		data () {
			return {
			    input2: ''
            }
		},
		components:{
			fcHeader
		},
        methods:{
            handleIconClick(ev) {
                console.log(ev);
            },
            jumpWplist(){
                this.$router.push({
                    name:'goodsreceSearch'
                })
            },
            returnClick(){
                this.$router.push({
                    name:'newIndex'
                })
            }
        },
        computed:{
        
        },
        mounted () {
            
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
        .gorece-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            background-color: #fff;
            overflow: hidden;
            border-radius: 4px;
            padding: 18px 22px;
            margin-bottom: 32px;
            min-height: 580px;
            .seek{
                width:150px;
                float: right;
                overflow: hidden;
                margin-top: 20px;
                cursor: pointer;
                // i{
                //     width: 21px;
                //     height: 21px;
                //     margin: 7px;
                //     display: inline-block;
                //     float: right;
                //     cursor: pointer;
                //     background: url("../../../../assets/img/orientation/seek.png") 0 0 no-repeat;
                // }
                // .el-input__inner{
                //     background-color:#eef1f6;
                //     border:0;
                // }
                // .el-icon-search:before{
                //     content:"";
                // }                
            }
            .authent{
                margin-top: 70px;
                text-align: center;
                img{
                    width: 263px;
                    height:298px;
                }
            }
        }
        
</style>
