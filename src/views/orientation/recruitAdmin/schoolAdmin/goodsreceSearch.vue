<template>
	<div class="contanier">
		<fc-header></fc-header>
		<!--物品领取身份验证-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					学生物品领取管理
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="gosearch-main">
            <el-col :span="24"  class="gosearch-top">
                <el-form :inline="true" :model="formline" class="demo-form-inline">
                    <el-form-item label="校区:">
                    <el-select v-model="formline.campus" placeholder="" clearable value-key="id" @change="campus(formline.campus.id,'2')">
                        <el-option  v-for="item in campuses" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="院系:">
                    <el-select v-model="formline.depart" placeholder="" value-key="id" @change="campus(formline.depart.id,'3')">
                        <el-option v-for="item in departs" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业:">
                    <el-select v-model="formline.major" value-key="id" placeholder="" @change="laodMajor">
                        <el-option v-for="item in majors" :key="item.id" :label="item.name" :value="item">{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="search-group">
                    <el-input placeholder="请输入学生姓名" v-model="formline.search">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="loadList"></i>
                    </el-input>
                </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" class="gosearch-list">
                <template>
                    <el-table :data="tableDataen" stripe style="width: 100%">
                        <el-table-column type="index" label="序号" width="55"></el-table-column>
                        <el-table-column prop="stuName" label="学生姓名" ></el-table-column>
                        <el-table-column prop="sex" label="性别"  width="66"></el-table-column>
                        <el-table-column prop="idCard" label="身份证号" width="190"></el-table-column>
                        <el-table-column prop="campusName" label="校区"></el-table-column>
                        <el-table-column prop="deptName" label="院系"></el-table-column>
                        <el-table-column prop="profName" label="专业"></el-table-column>
                        <el-table-column prop="getState" label="操作" width="90">
                            <template slot-scope="scope">
                               <div v-if="scope.row.getState == 2" class="green clearfix">
                                    已领取
                                </div>
                                <div v-else-if="scope.row.getState == 1" class="red clearfix">
                                    未领取
                                    <el-tooltip class="item" effect="dark" content="去领取" placement="bottom-start">
                                        <span class="allot item" @click="topick(scope.row)"></span>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <div class="block">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="page.pageNo"
                        :page-size="page.pageSize"
                        layout="prev, pager, next, jumper"
                        :total="page.count">
                    </el-pagination>
                </div>   
            </el-col>
        </el-row>
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
                textarea: '',
                formline: {
                    campus:'',
                    depart:'',
                    major:'',
                    state:'',
                    search:''
                },
                campuses:[],
                departs:[],
                majors:[],
                tableDataen: [],
                formplans:{
                    campus:'',
                    acayear:'',
                    depart:'',
                    majors:'',
                    edusys:'',
                    admnum:'',
                    admper:'',
                    remark:''
                },
                currentPage: 1,
                page: {
                    pageSize: 10,
                    pageNo: 1,
                    count: 0
                }
            }
        },
		components:{
			fcHeader
		},
        methods:{
            handleChange(value) {
                console.log(value);
            },
            onSubmit() {
                console.log('submit!');
            },
            // 分页
            handleCurrentChange(val) {
                this.page.pageNo=val;
                this.loadList();
            },
            // 加载校区院系专业
            campus(id,type){
                let tables = {
                    id: id,
                    type: type
                }
                api.loadSelect(tables).then(response => {
                    console.log(response.data.data);
                    if(response.data.meta.code == 200){
                        if(type =='2'){
                            this.departs = response.data.data;
                            this.formline.depart = '';
                            this.formline.major = '';   //专业
                            this.majors = [];
                        }else if(type =='3'){
                            this.majors = response.data.data;
                            this.formline.major = '';
                        }else if(type=='4'){
                            this.campuses = response.data.data;
                        }
                    }
                });
                this.loadList();
            },
            laodMajor(){
                this.loadList();
            },
            loadList(){
                let params = {
                    campusId: this.formline.campus.id,
                    deptId: this.formline.depart.id,
                    profId: this.formline.major.id,
                    stuName: this.formline.search,
                    pageNo: this.page.pageNo,
                    pageSize: this.page.pageSize,
                };
                api.getPayTotalByWhere(params).then(response => {
                    let page = response.data.data;
                    if(response.data.meta.code == 200){
                        this.tableDataen = page.list;
                        this.page.pageNo = page.pageNo;
                        this.page.pageSize = page.pageSize;
                        this.page.count = page.count;
                    }
                })
            },
            // 去领取
            topick(row){
                this.$router.push({
                    name:'goodsreceStu',
                    query:{
                        id: row.stuId,
                        user_Type : 1
                    }
                })
            },
            returnClick(){
                this.$router.push({
                    name:'goodsRece'
                })
            }
        },
        computed:{
        
        },
        mounted () {
             this.campus('1','4');
             this.loadList();
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
        .gosearch-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .gosearch-top{
                .el-form-item{
                    width:18%;
                    .el-form-item__content{
                        width:77%;
                    }
                }
                .state{
                    width:13%;
                    .el-form-item__content{
                        width: 72%;
                    }
                }
                .search-group{
                    width:13% !important;
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
                .funct{
                    float: right;
                    height: 36px;
                    line-height: 36px;
                    .dypoint{
                        margin-right: 14px;
                    }
                }
            }
            
            .gosearch-list{
                .block{
                    text-align: center;
                    margin-top: 40px;
                }
                .toaudit{color:#208af5;}
                .green{color:#91c604}
                .red{color:#ef0000}
                .allot{
                    width:17px;
                    height:16px;
                    display: inline-block;
                    background: url("../../../../assets/img/orientation/allot.png") 0 0 no-repeat;
                    cursor: pointer;
                }
                .el-table .cell, .el-table th>div{
                    padding:0 8px;
                }
            }
        }
        // 审核
        .audit{
            width: 720px;
            min-height: 880px;
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
            .audit-bottom{
                .baseinform{
                    overflow: hidden;
                    li{
                        float: left;
                        width: 33%;
                        margin-bottom: 20px;
                        i{color:#ef0000;}
                        div{
                            width: 88px;
                            float: left;
                            text-align: right;
                            span{float:left;}
                        }
                    }
                    .det{width: 100%;overflow: hidden;}
                    .certif{
                        overflow: hidden;
                        span{float:left;width:160px;height:80px;}
                    }
                    .idcard{
                        .iddddd{
                            width:160px;
                            img{
                                width:160px;
                                height:80px;
                            }
                            float:left;
                            margin-right: 60px;
                            text-align: center;
                        }
                    }
                }
                h4{
                    margin-bottom: 20px;
                    font-size: 16px;
                }
                .reason{
                    overflow: hidden;
                    h4{float: left;}
                    .cause{
                        width:89.9%;
                        float: left;
                        margin-left: 40px;
                        .el-textarea__inner{
                            border: 0;
                            background-color: #fafafa;
                        }
                    }
                }
                .btnss{
                    margin-top: 12px;
                    float: right;
                    button{
                        width: 96px;
                        height: 42px;
                        border:0;
                        color:#fff;
                    }
                    .pass{
                        background-color:#91c604;
                    }
                    .nopass{
                        background-color:#ef0000;
                    }
                }
                .com{
                    border-bottom:1px solid #d2d2d2;
                    margin-bottom: 20px;
                }
            }
        }
</style>
