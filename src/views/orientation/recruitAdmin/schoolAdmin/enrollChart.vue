<template>
	<div class="contanier">
		<fc-header></fc-header>
        <div class="content">
            <return-bar :title="title"></return-bar>
            <!--主体内容-->
            <div class="enrollChart">
                <div class="enrot">
                    <el-form ref="form" label-width="85px">
                        <el-form-item label="统计类型：">
                            <el-select @change="loadChartinfo" v-model="form.statype" value-key="value" clearable>
                                <el-option v-for="item in statypes" :label="item.label" :value="item" :key="item.value">{{item.label}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年级：">
                            <el-select @change="loadChartinfo" v-model="form.grade" value-key="id" clearable>
                                <el-option v-for="item in grades" :label="item.name" :value="item" :key="item.id">{{item.name}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="enchart-main">
                    <el-row>
                        <el-col :span="24" class="ecom"><div id="echart1"></div></el-col>
                    </el-row>
                </div>
            </div>
        </div>

	</div>
</template>
<script type="text/javascript">
    import axios from 'axios'
    import fcHeader from '../../../common/header.vue'
    import returnBar from '../../../common/returnBar.vue'
    import api from '../../../../apis/orientation/recruitAdmin.js'
    import echarts from 'echarts'

	export default {
		data () {
			return {
                title:'招生统计图',
                form:{
                    statype:'',
                    grade:''
                },
                statypes:[],
                grades:[],
                opt1:{
					title:{
						show:true,
						text:'比例统计图',
						textStyle:{
							color:'#323232',
							fontSize:'14px',
						}
					},
					tooltip: {
						trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:[]
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : []
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
					series: [
						// {
                        //     name:'',
                        //     type:'bar',
                        //     data:[]
                        // },
                        // {
                        //     name:'',
                        //     type:'bar',
                        //     data:[]
                        // }
					],
					color:['#5ddc95','#66b2fd','#9383e5','#fcd629']
                },
                gId:'',
                stId:''
            }
		},
		components:{
            fcHeader,
            returnBar
        },
        methods:{
            // 年级、
            loadgrade(){
                let chart = {
                    type : 'admit_stat_chart'
                }
                let _this = this
                axios.all([api.findAllGrade(), api.getDictMapList(chart)])
                .then(axios.spread(function (acct, perms) {
                    // 两个请求现在都执行完成
                    console.log(_this)
                    _this.grades = acct.data.data;
                    _this.form.grade = _this.grades[0]
                    _this.form.grade.id = _this.grades[0].id

                    _this.statypes = perms.data.data;
                    _this.form.statype = _this.statypes[0]
                    _this.form.statype.value = _this.statypes[0].value
                    console.log(_this.form.statype.value)
                    _this.loadChartinfo();
                }));
                // api.findAllGrade().then(response => {
                //     if(response.data.meta.code == 200){
                //         this.grades = response.data.data;
                //         this.form.grade = this.grades[0]
                //         this.form.grade.id = this.grades[0].id
                //         console.log(this.form.grade.id)
                //         this.loadChartinfo();
                //     }
                // })
            },
            // 统计类型
            // loadchartType(){
            //     let chart = {
            //         type : 'admit_stat_chart'
            //     }
            //     api.getDictMapList(chart).then(response => {
            //         if(response.data.meta.code == 200){
            //             this.statypes = response.data.data;
            //             this.form.statype = this.statypes[0]
            //             this.form.statype.value = this.statypes[0].value
            //             console.log(this.form.statype.value)
            //             this.loadChartinfo();
            //         }
            //     })
            // },
            loadChartinfo(){
                let cinfo = {
                    gradeId: this.form.grade.id,
                    dictType: this.form.statype.value
                }
                console.log('abcd')
                console.log(cinfo)
                api.chartInfo(cinfo).then(response => {
                    var meta = response.data.meta
                    var mydata = response.data.data
                    if(meta.code == 200){
                        this.opt1.legend.data = mydata.dict
                        
                        this.opt1.xAxis[0].data = mydata.proList
                            
                        var xshaft = []
                        for(var s = 0; s < mydata.dict.length; s++){
                            xshaft.push({'name':mydata.dict[s],'type':'bar','data':mydata.data[s]})
                        }
                        this.opt1.series = xshaft

                        console.log('aaa')
                        console.log(this.opt1)

                        this.loadEchart();
                    }
                })
            },
            loadEchart () {
                var echart1 = echarts.init(document.getElementById('echart1'))
				echart1.setOption(this.opt1)
			},
        },
        computed:{
            
        },
        mounted () {
            // 年级
            this.loadgrade();
        },
        watch:{
            // 'form.statype':function(newval){

            // }
        }
	}
</script>
<style type="text/css" lang="scss" scoped>
       .content{
            width:1200px;
            margin: 0 auto;
            .enrollChart{
                background:#fff;
                min-height: 740px;
                margin-top: 20px;
                padding: 20px 24px;
                .enrot{
                    overflow: hidden;
                    .el-form-item{
                        float: left;
                    }
                }
                .enchart-main{
                    .ecom{
                        height: 375px;
                    }
                    #echart1{
                        width:100%;
                        height:100%;
                    }
                }
            }
       }
</style>
