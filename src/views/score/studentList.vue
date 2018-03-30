<template>
  <div class="contanier">
		<fc-header></fc-header>
		<div class="content">
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <div class="fontColor" style="margin-right: 10px;">学期</div>
						<el-select v-model="formInline.depart" clearable placeholder="选择学期"  @change="changeSemester" style="width:120px">
								<el-option :label="item.proname" :value="item.proid" :key="item.proid" v-for="item in formInline.semesterList"></el-option>
						</el-select>
                        <div class="fontColor label_padding">试卷</div>
						<el-select v-model="formInline.depart" clearable placeholder="选择试卷"  @change="changePaper" style="width:120px">
								<el-option :label="item.proname" :value="item.proid" :key="item.proid" v-for="item in formInline.paperList"></el-option>
						</el-select>
                        <div class="fontColor label_padding">考试类型</div>
						<el-select v-model="formInline.depart" clearable placeholder="选择考试类型"  @change="changeExamType" style="width:200px">
							<el-option :label="item.proname" :value="item.proid" :key="item.proid" v-for="item in formInline.examTypeList"></el-option>
						</el-select>                                                                 
                </el-form>
                <p class="tableStatus">
                    <span class="tableItem" v-for="(item,index) in gradeTable" :class="[curIndex == index ? 'curIndex' : '']">{{ item }}</span>
                </p>
                <div class="tableScore">
                    <ul class="scoreName">
                        <li class="scoreTitle">学科</li>
                        <li class="scoreCon" v-for="item in examSubject">{{ item }}</li>
                    </ul>
                    <ul class="scoreName">
                       <li class="scoreTitle scoreBottom">分数</li>
                       <li class="scoreCon scoreBottom" v-for="item in examScore">{{ item }}</li>
                    </ul>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
    import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import apis from '../../apis/studentList.js'
    import commonApi from '../../apis/common.js'  
    export default {
        data () {
            return {
                title: '成绩查询',
                curIndex: 0,
                gradeTable:['在线成绩表','线下成绩表'],
                formInline:{
                    semester:'',
                    semesterList:[],
                    paper:'',
                    paperList:[],
                    examType:'',
                    examTypeList:[]
                },
                examSubject:['语文','语文','语文','语文','语文','语文','语文','语文','语文','语文'],
                examScore:['60','70','90','100','40','50','60','80','100','40']
            }
        },
        components:{
           fcHeader,
           returnBar 
        },
        methods:{
            changeSemester () {

            },
            changePaper () {

            },
            changeExamType () {

            }
        }
    }  
</script>
<style lang="scss" scoped>
    @import '../../common/css/common.scss';
    .tableStatus{
        padding-left:24px;
        margin-top:28px;
        margin-bottom:17px;
    }
    .tableItem{
        display: inline-block;
        margin-right:44px;
        font-size:16px;
        padding-bottom:5px;
        color:#666;
    }
    .curIndex{
       border-bottom:2px solid #208af5;
       color:#208af5;
    }
    .tableScore{
        margin: 0 16px 0 24px;
        box-sizing:border-box;
        color:#222;
        font-size:16px;
        border:1px solid #dfe6ec;
    }
    .scoreTitle{
        padding:15px 44px;
        background:#f1f3f7;
        border-bottom:1px solid #dfe6ec;
        border-right:1px solid #dfe6ec;
    }
    li.scoreBottom{
        border-bottom:none;
    }
    .scoreName{
        display:flex;
        .scoreCon{
            flex:1;
            text-align:center;
            line-height:50px;
            border-bottom:1px solid #dfe6ec;
            border-right: 1px solid #dfe6ec;
            &:last-child{
                border-right:none;
            }
        }
    }
</style>