<template>
	<div class="contanier">
		<fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					更换专业
				</div>
				<div class="tabright">
					<span>返回</span>
					<i><img src="../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="replace-main">
            <el-col :span="24" class="replace-profes">
                <ul class="">
                    <li>
                        <i>姓名：</i>
                        <span>好美丽</span>
                    </li>
                    <li>
                        <i>性别：</i>
                        <span>女</span>
                    </li>
                    <li>
                        <i>校区：</i>
                        <span>东校区</span>
                    </li>
                    <li>
                        <i>学制：</i>
                        <span>三年制</span>
                    </li>
                    <li>
                        <i>辅导员：</i>
                        <span>人数糖</span>
                    </li>
                    <li>
                        <i>宿舍楼：</i>
                        <span>15号</span>
                        <span>2503</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <i>原院系：</i>
                        <span>中药学</span>
                    </li>
                    <li>
                        <i>原专业：</i>
                        <span>中药制药</span>
                    </li>
                    <li>
                        <i>原班级：</i>
                        <span>1702班</span>
                    </li>
                </ul>
                <el-row :span="24" class="replace-chose">
                    <el-form ref="form" :model="form">
                        <el-col :span="5">
                            <el-form-item  label="新校区：">
                                <el-select v-model="form.building">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="新院系：">
                                <el-select v-model="form.numbuild">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="新专业：">
                                <el-select v-model="form.numbuild">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="新班级：">
                                <el-select v-model="form.numbuild">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" class="change-reason">
                            <el-form-item label="更改原因">
                                <el-input type="textarea" v-model="form.desc" class="change-height" placeholder="字体限制30内"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item  class="immed-create">
                                <el-button type="primary">提交</el-button>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>

            </el-col>
        </el-row>
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
                    date1: '',
                    date2: '',
                    delivery: false,
                    desc: ''
                }
			}
		},
        methods:{
            onSubmit() {
                console.log('submit!');
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
        // 主体内容
        .replace-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 30px 44px;
            overflow: hidden;
            .replace-profes{
                ul{
                    overflow: hidden;
                    margin-bottom: 38px;
                    li{
                        width: 16%;
                        float: left;
                        i{
                            font-style: normal;
                            margin-right: 8px;
                        }
                    }
                }
                .change-reason{
                    .change-height{
                        textarea{
                            height: 150px;
                            background-color: #f5f5f5;
                        }
                    }
                }
                .replace-chose{
                    .el-select{
                        width: 60%;
                    }
                }
                .immed-create{
                    width: 210px;
                    height: 42px;
                    margin: 0 auto;
                    button{
                         width: 210px;
                         height: 42px;
                    }
                }
            }
        }
</style>