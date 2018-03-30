<template>
	<div class="contanier">
		<fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					新生报到单
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="newreport-main">
            <el-col :span="24"  class="newreport-top pop oddcolor">
                <div class="newtop">
                    <h4>基本信息</h4>
                    <div class="print"><img src="../../../../assets/img/orientation/print.png" alt=""></div>
                </div>
                <template>
                    <el-table :data="tableData" border style="width: 100%" :show-header="false" >
                        <el-table-column prop="num1" width="120px"></el-table-column>
                        <el-table-column prop="num2"></el-table-column>
                        <el-table-column prop="num3" width="120px"></el-table-column>
                        <el-table-column prop="num4"></el-table-column>
                        <el-table-column prop="num5" width="120px"></el-table-column>
                        <el-table-column prop="num6"></el-table-column>
                    </el-table>
                </template>
            </el-col>
            <el-col :span="24"  class="newreport-center pop oddcolor">
                <h4>辅导员信息</h4>
                <template>
                    <el-table :data="tableData2" border style="width: 100%" :show-header="false" >
                        <el-table-column prop="list1" width="120px"></el-table-column>
                        <el-table-column prop="list2"></el-table-column>
                        <el-table-column prop="list3" width="120px"></el-table-column>
                        <el-table-column prop="list4"></el-table-column>
                        <el-table-column prop="list5" width="120px"></el-table-column>
                        <el-table-column prop="list6"></el-table-column>
                    </el-table>
                </template>
            </el-col>
            <el-col :span="24"  class="newreport-bottom pop">
                <h4>报到环节</h4>
                <template>
                    <el-table :data="tableData3" border style="width: 100%">
                        <el-table-column type="index" label="序号" width="70px"></el-table-column>
                        <el-table-column prop="process" label="环节名称"></el-table-column>
                        <el-table-column prop="ismust" label="是否必办">
                            <template slot-scope="scope">
                                <span>{{scope.row.ismust== 1 ? '是':'否'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="办理地点"></el-table-column>
                        <el-table-column prop="content" label="内容说明"></el-table-column>
                        <!-- <el-table-column prop="instruct" label="说明"></el-table-column> -->
                        <el-table-column label="负责人签字"></el-table-column>
                    </el-table>
                </template>
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
			    tableData:[{
                    num1: '姓名',
                    num2: '',
                    num3: '性别',
                    num4: '',
                    num5: '身份证件号',
                    num6: ''
                },
                {
                    num1: '民族',
                    num2: '',
                    num3: '专业',
                    num4: '',
                    num5: '毕业学校',
                    num6: ''
                },
                {
                    num1: '学制',
                    num2: '',
                    num3: '联系电话',
                    num4: '',
                    num5: '家长姓名',
                    num6: ''
                },
                {
                    num1: '考生号',
                    num2: '',
                    num3: '准考证号',
                    num4: '',
                    num5: '考试总分',
                    num6: ''
                },
                {
                    num1: '应届或往届',
                    num2: '',
                    num3: '户口性质',
                    num4: '',
                    num5: '政治面貌',
                    num6: ''
                },
                {
                    num1: '联系老师',
                    num2: '',
                    num3: '地域',
                    num4: '',
                    num5: '家庭住址',
                    num6: ''
                }],
                tableData2:[{
                    list1: '辅导员姓名',
                    list2: '',
                    list3: '手机号',
                    list4: '',
                    list5: '办公电话',
                    list6: ''
                }],
                tableData3:[],
                user:{
                    name:'',//姓名
                    sexname:'',//性别
                    nationname:'',//民族
                    idcard:'',//身份证号
                    phone:'',//联系电话
                    politicalStatus:'',//录取方式
                    freshname:'',//应届往届
                    graduation:'',//毕业学校
                    ticketNo:'',//准考证号
                    examNo:'',//考生号
                    score:'',//考试总分
                    politicalStatusname:'',//政治面貌
                    hkname:'',// 户口性质
                    father:'',//家长姓名
                    fatherPhone:'',//家长电话
                    provincename:'',//省
                    countyname:'',//县
                    cityname:'',//市
                    address:'',//详细地址
                    scoms:'',//校区
                    dept:'',//院系
                    pro:'',//专业
                    dutyPerson:'',//联系老师
                    studyYearname:''//学制
                },
                stuId:''
            }
            
        },
        computed:{
            
        },
        components:{
            fcHeader
        },
        methods:{
            loadTable(stu){
                let stuIdcard = {
                    idcard: this.$route.query.id//'232301199510082156'
                }
                console.log(stuIdcard)
                api.enquirStuid(stuIdcard).then(response =>{
                    if(response.data.meta.code == 200){
                        this.stuId = response.data.data.id
                        var lxt = {
                            stuId:this.stuId
                        }
                        console.log('jsjjjj')
                        console.log(lxt)
                        api.getStuInfo(lxt).then(response => {
                            if(response.data.meta.code == 200){
                                this.user.dutyPerson = response.data.data.dutyPerson; 
                                this.tableData[5].num2 = this.user.dutyPerson
                            }
                        });
                        this.user = response.data.data;
                        // console.log(response.data.data)
                        this.tableData[0].num2 = this.user.name
                        this.tableData[0].num4 = this.user.sexname
                        this.tableData[0].num6 = this.user.idcard
                        this.tableData[1].num2 = this.user.nationname
                        this.tableData[1].num4 = this.user.pro
                        this.tableData[1].num6 = this.user.graduation
                        this.tableData[2].num2 = this.user.studyYearname
                        this.tableData[2].num4 = this.user.phone
                        this.tableData[2].num6 = this.user.father
                        this.tableData[3].num2 = this.user.examNo
                        this.tableData[3].num4 = this.user.ticketNo
                        this.tableData[3].num6 = this.user.score
                        this.tableData[4].num2 = this.user.freshname
                        this.tableData[4].num4 = this.user.hkname
                        this.tableData[4].num6 = this.user.politicalStatusname
                        // this.tableData[5].num2 = this.user.dutyPerson
                        console.log('agjdjdsjd')
                        console.log(this.user.dutyPerson)
                        this.tableData[5].num4 = this.user.provincename
                        this.tableData[5].num6 = this.user.address
                        // this.tableData2[0].list2 = this.user.address
                        // this.tableData2[0].list4 = this.user.address
                        // this.tableData2[0].list5 = this.user.address
                        
                    }
                })
            },
            returnClick(){
                this.$router.push({
                    name:'newIndex'
                })
            }
        },
        mounted () {
            api.showReport().then(response => {
                // // console.log(response);
				if(response.data.meta.code == 200){
					this.tableData3 = response.data.data;
                    // console.log(this.tableDataen)
				}
            });
            this.loadTable();
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
        .newreport-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .pop{
                margin-top: 32px;
                h4{
                    margin-bottom: 22px;
                }
                .newtop{
                    overflow: hidden;
                    h4{
                        float: left;
                    }
                    .print{
                        float: right;
                        margin-top: 2px;
                        cursor: pointer;
                    }
                }
            }
            .oddcolor{
                table tbody tr td:nth-child(odd){
                    background-color: #eef1f6;
                }
                .el-table--enable-row-hover .el-table__body tr:hover>td{
                    background-color: transparent
                }
                .el-table--enable-row-hover .el-table__body tr:hover>td:nth-child(odd){
                    background-color: #eef1f6;
                }
            }
            .pop:first-child{
                margin-top: 0;
            }
        }
        
</style>
