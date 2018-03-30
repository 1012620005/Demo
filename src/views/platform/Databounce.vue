<template>
    <div class="sfaBounce">
        <div class="sfaBounce-td clearfix">
            <span class="add">数据统计</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form label-width="82px" style="padding:0 20px;">
            <el-form-item label="校区："> 
                <span>{{form.campus}}</span>                
            </el-form-item>
            <el-form-item label="调查对象：" > 
                <span>{{form.imformantName}}</span>                   
            </el-form-item>
            <el-form-item label="结束时间：" > 
                <span>{{form.endTime}}</span>
            </el-form-item>
            <el-form-item label="问卷标题："> 
                <span>{{form.surveyTitle}}</span>             
            </el-form-item>
            <!-- 单选题 -->
            <div class="datasel" style="border-top:1px solid #d2d2d2;">
                <h5>单选题</h5>
                <div v-if="dats.datsOne[0].questionTiltle==''?false:true" class="dsel" v-for='(items,index) in dats.datsOne' :key="index">
                    <h6>{{index+1+'、'+items.questionTiltle}}</h6>
                    <div class="fillnum">
                        填写总次数:<span>{{items.quesAnswerCount}}</span>
                    </div>
                </div>
                <div id="chartColumn" style="width:100%; height:600px;"></div>
            </div>
            <!-- 多选题 -->
            <div class="datasel">
                <h5>多选题</h5>
                <div v-if="dats.datsTwo[0].questionTiltle==''?false:true" class="dsel" v-for='(items,index) in dats.datsTwo' :key="index">
                    <h6>{{index+1+'、'+items.questionTiltle}}</h6>
                    <div class="fillnum">
                        填写总次数:<span>{{items.quesAnswerCount}}</span>
                    </div>
                </div>
                <div id="multchartColumn" style="width:100%; height:600px;"></div>
            </div>
            <!-- 数据统计问答 -->
            <div class="anstatic">
                <h5>问答题</h5>
                <div class="total"> 问答合计：<span>{{form.answerCount}}</span></div>
                <div class="anws">
                    <div v-if="dats.datsThr[0].questionTiltle==''?false:true" class="anw" v-for='(items,index) in dats.datsThr' :key="index">
                        <h6>{{index+1+'、'+items.questionTiltle}}</h6>
                        <span class="combine">问答合计：<span>{{items.quesAnswerCount}}</span></span>
                        <el-table :data="items.essay" border style="width: 100%"> 
                            <el-table-column type="index" label="序" width="60">
                            </el-table-column>
                            <el-table-column prop="username" label="姓名" width="120">
                            </el-table-column>
                            <el-table-column prop="answers" label="回答" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            
        </el-form>
    </div>	
</template>
<script>
    import echarts from 'echarts'
    import api from '../../apis/platform.js'
	export default {
        data() {
            return { 
                dasta:true,
                //柱状图 
                chartColumn: null,
                multchartColumn:null,
                form:{
                    campus:"",
                    imformantName:"",
                    endTime:"",
                    surveyTitle:"",
                    answerCount:"",
                    queNanswer:[],
                    map:{}
                },
                dats:{
                   datsOne:[], 
                   datsTwo:[], 
                   datsThr:[], 
                },
                // 单选题
                arrIndex:[],
                series:[],
                // 多选题
                multArrIndex:[],
                multSeries:[]
            }
        },
        props:{
            formd:''
        },
        methods:{
            // 单选题
            drawColumnChart(val,arr) {

                let _this = this;
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: this.form.map[1].op
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: val
                    },
                    series: arr
                });
            },
            // 多选题柱状图
            drawMultColChart(val,ar) {
                let _this = this;
                this.multchartColumn = echarts.init(document.getElementById('multchartColumn'));
                this.multchartColumn.setOption({
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: _this.form.map[2].op
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: val
                    },
                    series: ar,
                    color:['#1790cf','#1bb2d8','#99d2dd','#88b0bb','#1c7099']
                });
            },
            // 组装series
            contacts (arr) {
                var newArr =[]
                for(var i = 0, len = arr.length; i < len; i++) {
                    newArr.push({
                        name: arr[i].name,
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideLeft'
                            }
                        },
                        data: arr[i].data
                    })
                }
                return newArr
            },
            getDataCount(){
                api.getDataCount(this.formd).then(response=>{
                    console.log(response);
                    console.log("222222222222222222222222222222")
                    if(response.data.meta.code ==  '200'){
                        var res=response.data.data;
                        this.form.campus=res.campus;
                        this.form.imformantName=res.imformantName;
                        this.form.endTime=res.endTime;
                        this.form.surveyTitle=res.surveyTitle;
                        this.form.queNanswer=res.queNanswer;
                        this.form.answerCount=res.answerCount;
                        this.form.map=res.map;
                       
                        // 多选题
                        for(var i = 0, len = this.form.map[2].qt.length; i < len; i++) {
                            this.multArrIndex.push(i+1)
                        }
                        this.multSeries = this.contacts(this.form.map[2].answer)
                        this.drawMultColChart(this.multArrIndex,this.multSeries);

                         // 单选题
                        for(var i = 0, len = this.form.map[1].qt.length; i < len; i++) {
                            this.arrIndex.push(i+1)
                        }
                        // console.log(this.arrIndex)
                        this.series = this.contacts(this.form.map[1].answer)
                        this.drawColumnChart(this.arrIndex,this.series);
                       
                        let _this = this
                        this.form.queNanswer.map(function(item,index){
                            if(item.questionType == '1') _this.dats.datsOne.push(item);
                            if(item.questionType == '2') _this.dats.datsTwo.push(item);
                            if(item.questionType == '3') _this.dats.datsThr.push(item);
                        })
                    }
                })
            },
            // 关闭弹框和遮罩
            closeBounce:function(){
                this.dasta=false;
                this.$emit("close")
            }
        },
        mounted:function(){
            this.getDataCount();
        }
    }
</script>
<style scoped lang="scss">
    .sfaBounce{
        width:610px;
        background:#fff;
        border-radius:5px;
        // padding:0 20px;
        max-height:80%;
        overflow-y:auto;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // display: none;
        z-index: 2;
        .sfaBounce-td{
            background:#eef1f6;
            padding:24px 20px 20px 20px;
            .add{
                float:left;
                cursor:pointer;
            }
            .close{
                float:right;
                cursor:pointer;
                margin-top:6px;
            }
        }
        .total{
            color:#ef0000;
            font-size:16px;
            margin-bottom:28px;
        }
        .anw{
            margin-bottom:20px;
            h6{
                font-weight:normal;
                font-size:14px;
                color:#333;
                margin-bottom:12px;
            }
            .combine{
                color:#ef0000;
            }
            .el-table{
                margin-top:18px;
            }
        }
        .datasel{
            padding-top:12px;
            .dsel{
                margin-bottom:20px; 
                h6{
                    font-weight:normal;
                    font-size:14px;
                    color:#333;
                    margin-bottom:12px;
                }
                .fillnum{
                    color:#ef0000;
                }
            }
        }
        h5{
            color:#208af5;
            font-size:16px;
            margin-bottom:20px;
        }
    }
</style>