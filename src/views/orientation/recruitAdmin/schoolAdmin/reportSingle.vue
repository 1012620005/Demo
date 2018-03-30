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
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item  prop="stuIdcard">
                    <el-input v-model="ruleForm.stuIdcard" placeholder="请输入学生身份证号" >
                        <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <!-- <div class="seek" :rules="rules">
                <el-input placeholder="请输入学生身份证号" icon="search" v-model="stuIdcard" :on-icon-click="handleIconClick('stuIdcard')"></el-input>
            </div> -->
            <div class="authent">
                <img src="../../../../assets/img/orientation/cardphoto.png" alt="">
            </div>
        </el-row>
	</div>
</template>
<script type="text/javascript">
    import fcHeader from '../../../common/header.vue'
    import validate from "../../../../validate"
    import api from '../../../../apis/orientation/recruitAdmin.js'
	export default {
		data () {
			return {
                ruleForm:{
                    stuIdcard: '',
                },
                stuId:'',
                rules:{        //表单验证
                    stuIdcard: [ {required: true, validator: validate.identityvalidate, trigger: 'blur'}],
                },
            }
		},
		components:{
			fcHeader
		},
        methods:{
            handleIconClick(formname) {
                // console.log(this.$refs)
                // console.log(this.$refs.ruleForm)
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let idCard = {
                            idcard: this.ruleForm.stuIdcard
                        }
                        api.enquirStuid(idCard).then(response =>{
                            if(response.data.meta.code == 200){
                                this.stuId = response.data.data.id
                                console.log(this.stuId)
                                let sid = {
                                    stuId: this.stuId
                                }
                                api.getStuInfo(sid).then(response =>{
                                    if(response.data.meta.code == 200){
                                        console.log('aaa')
                                        console.log(response.data.data.state)
                                        // var _this = this
                                        if(response.data.data.state == '2'){
                                            this.$router.push({
                                            	name:'newReport',
                                            	query:{
                                            		id:this.ruleForm.stuIdcard
                                            	}
                                            })
                                        }else{
                                            this.$message({
                                                showClose: true,
                                                message: '身份证错误',
                                                type: 'error',
                                                duration:'1500'
                                            });
                                        }
                                        
                                    }
                                })
                                // this.$router.push({
                                // 	name:'newReport',
                                // 	query:{
                                // 		id:this.stuIdcard
                                // 	}
                                // })
                            }
                        })
                    }
                })
                // // this.$router.push({
				// // 	name:'newReport',
				// // 	query:{
				// // 		id:this.stuIdcard
				// // 	}
				// // })
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
            .el-form{
                width: 20%;
                float: right;
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
<style type="text/css" lang="scss"> 
    .gorece-main{
        .el-input-group__append{
            .el-button{
                padding:0;
            }
            i{
                width: 16px;
                height: 16px;
                margin-left: 10px;
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
</style>