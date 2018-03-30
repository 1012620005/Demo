<template>
    <div class="sfaBounce">
        <div class="sfaBounce-td clearfix">
            <span class="add">添加特殊学科</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="121px" class="demo-ruleForm clearfix" style="padding:22px 20px 0 20px;">
            <div v-for="(item,index) in number" :key="index" >
                <el-form-item label="特殊学科名称：" :prop="'subjectNameVO['+index+']'" :rules="{required: true, message: '请输入学科名称', trigger: 'blur'}"> 
                    <el-input v-model="ruleForm.subjectNameVO[index]">
                        <el-button v-if="ruleForm.id?false:true" slot="append" :icon="ruleForm.closes" @click="handleIconClick(index)"></el-button>
                    </el-input>                   
                </el-form-item>
            </div>
            <el-row v-if="ruleForm.visible">
                <el-col :span="24">
                    <div class="adcampBtn clearfix" @click="addForm">
                        <i></i>
                        <span>添加特殊学科</span>
                    </div>
                </el-col>
            </el-row>
            <el-form-item label="" class="adsBtn"> 
                <el-button class="save" type="primary" @click="saveForm('ruleForm')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>	
</template>
<script>
    import api from '../../apis/subject.js'
	export default {
        data() {
            return { 
                number:1,
            }
        },
        props:{
            ruleForm: {
                closes:'',
                id:'',
                visible:true,
                subjectNameVO:[]
            }
        },
        methods:{
            // 关闭弹框和遮罩
            closeBounce:function(){
                this.$emit("close")
            },
            // 点击输入框中的关闭icon关闭当前项
            handleIconClick(index) {
                if(this.number>=2){
                    this.number=this.number-1;
                }else{
                    return
                }
                
                this.ruleForm.subjectNameVO.splice(index,1);
            },
            // 添加学科
            addForm:function(){
                this.ruleForm.subjectNameVO.push('');
                this.number+=1;
            },
            // 表单验证
            saveForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let datas = JSON.stringify(this.ruleForm.subjectNameVO);
                        let data={
                            subjectNameVO:datas,
                        }
                        var qs = require('querystring');
                        
                        let datax = qs.stringify(data);

                        if(!this.ruleForm.id) {
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                this.number = '1'
                                api.postSpsu(datax).then(response=>{
                                    if(response.data.meta.code == '200'){
                                        this.$message({
                                            message: '添加成功',
                                            type: 'success'
                                        });
                                    }
                                    this.$emit("close")
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消添加'
                                });          
                            });
                        }else{
                            let datac={
                                subjectName:this.ruleForm.subjectNameVO,
                                id:this.ruleForm.id
                            }
                            var qs = require('querystring');
                            let datacc = qs.stringify(datac);
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                api.putDiscInfo(datacc).then(response=>{
                                    if(response.data.meta.code=='200'){
                                        this.$message({
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                    }
                                    this.$emit("close")
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消修改'
                                });          
                            });
                            this.or=false;
                        }
                        
                    }else {
                        return false;
                    }
                });
            }
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