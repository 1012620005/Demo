<template>
    <div class="sfaBounce" v-show="or">
        <div class="sfaBounce-td clearfix">
            <span class="add">设置起止时间</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="121px" class="demo-ruleForm clearfix" style="padding:22px 20px 0 20px;">
            <el-form-item label="学年：" > 
                <span>{{ruleForm.studyYear}}</span>            
            </el-form-item>
            <el-form-item label="学期："> 
                <span>{{ruleForm.term}}</span>            
            </el-form-item>
            <el-form-item label="学期起止时间：" required> 
                <el-col :span="11">
                    <el-form-item prop="termStartTime">
                        <el-date-picker type="date" placeholder="开始时间" v-model="ruleForm.termStartTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="termEmdTime" >
                        <el-date-picker type="date" placeholder="结束时间" :picker-options="endDateOpt" v-model="ruleForm.termEmdTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>            
            </el-form-item>
            <el-form-item class="adsBtn"> 
                <el-button class="save" type="primary" @click="saveForm('ruleForm')" :loading="editorLoading">确定</el-button>
            </el-form-item>
        </el-form>
    </div>	
</template>
<script>
    import util from '../../common/js/util.js'
    import api from '../../apis/subject.js'
	export default {
        data() {
            return { 
                or:true,
                endDateOpt: {
                    disabledDate: (time) => {
                        return time.getTime() < this.ruleForm.termStartTime;
                    }
                },
                editorLoading: false,
                // 表单验证
                rules:{
                    termStartTime: [
                        { type:"date", required: true, message: '请选择开始日期', trigger: 'change' }
                    ],
                    termEmdTime: [
                        { type:"date", required: true, message: '请选择结束日期', trigger: 'change' }
                    ]
                }
            }
        },
        props:{
            ruleForm: {
                id:'',
                termStartTime: '',
                termEmdTime: '',
                studyYear: '',
                term: ''
            }
        },
        methods:{
            // 关闭弹框和遮罩
            closeBounce:function(){
                this.or=false;
                this.$emit("close")
            },
            // 表单验证
            saveForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // var formData = new FormData();
                        // formData.append('termStartTime',util.formatDate.format(this.ruleForm.termStartTime,'yyyy-MM-dd'));
                        // formData.append('termEmdTime',util.formatDate.format(this.ruleForm.termEmdTime,'yyyy-MM-dd'));
                        // formData.append('id',this.ruleForm.id);
                        let data={
                            'termStartTime':util.formatDate.format(this.ruleForm.termStartTime,'yyyy-MM-dd'),
                            'termEmdTime':util.formatDate.format(this.ruleForm.termEmdTime,'yyyy-MM-dd'),
                            'id':this.ruleForm.id
                        }
                        var qs = require('querystring');
                        let datax = qs.stringify(data);
                        api.putTermTime(datax).then(response=>{
                
                            if(response.data.meta.code=='200') {
                                var msg = response.data.meta.message
                                this.$message({
                                    type:'success',
                                    message: msg
                                })
                                this.editorLoading = false
                                this.$emit("close")
                            }else {
                                this.editorLoading = false
                                this.$message.error(response.data.meta.message)
                            }	
                        })
                        this.or=false;
                       
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted(){
            // limitDate()
        }
    }
</script>
<style scoped lang="scss">
    .sfaBounce{
        width:480px;
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
            }
            .close{
                float:right;
                cursor:pointer;
                margin-top:6px;
            }
        }
        .adsBtn{
            float:right;
            margin-bottom:16px;
        }
        .adcampBtn{
            float:right;
            margin-bottom:16px;
            cursor: pointer;
            i{
                width:16px;
                height: 16px;
                float: left;
                margin-right:6px;
                margin-top:2px;
                background:url("../../assets/img/overtime/add.png") 0 0 no-repeat;
            }
            span{
                float:left;
                color:#208af5;
            }
        }
    }
</style>