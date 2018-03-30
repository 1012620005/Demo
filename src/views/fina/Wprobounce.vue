<template>
    <div class="sfaBounce">
        <div class="sfaBounce-td clearfix">
            <span class="add clearfix">添加工资项目</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form :model="itemform" :rules="rules" ref="itemform" label-width="94px" style="padding:22px 20px 0 20px;">
            <el-form-item label="项目名称：" prop="typeName"> 
                <el-input v-model="itemform.typeName"></el-input>                   
            </el-form-item>
            <el-form-item label="顺序：" prop="typeSort"> 
                <el-input v-model="itemform.typeSort"></el-input>                    
            </el-form-item>
            <el-form-item label="" class="adsBtn"> 
                <el-button class="save" type="primary" @click="saveForm('itemform')">确定</el-button>
                <el-button @click="closeBounce()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>	
</template>
<script>
    import api from '../../apis/fina.js'
	export default {
        data() {
            return { 
                // or:true,
                // loading: true,
                rules: { 
                    typeName: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' }
                    ],
                    typeSort:[
                        { required: true, message: '请输入顺序', trigger: 'blur' },
                    ]
                }
            }
        },
        props:{
            itemform:{
                id:'',
                typeName: '',
                typeSort:''
            }
        },
        methods:{
            // 点击关闭按钮弹框和遮罩隐藏
            closeBounce:function(){
                // this.or=false;
                this.$emit("close")
            },
            // 表单验证
            saveForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        let data = {
                            typeName: this.itemform.typeName,
                            typeSort: this.itemform.typeSort
                        };
                        var qs = require('querystring');
                        let datax = qs.stringify(data);
                        //若存在ID显示编辑弹框否则显示添加弹框 
                        if(!this.itemform.id) {
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                api.postPayItem(datax).then(response=>{
                                
                                    if(response.data.meta.code == 200){
                                        
                                        this.$message({
                                            showClose: true,
                                            message: response.data.meta.message,
                                            type: 'success'
                                        });
                                    
                                    }
                                    this.$emit("close");
                                    if(response.data.meta.code == 500){
                                        // console.log(response);
                                        this.$message({
                                            showClose: true,
                                            message: response.data.meta.message,
                                            type: 'error'
                                        });
                                    }
                                    }).catch(req=>{
                                        this.$message({
                                            showClose: true,
                                            message: req,
                                            type: 'error'
                                    });
                                
                                });
                            })
                        }else{
                            let datas = {
                                typeName: this.itemform.typeName,
                                typeSort: this.itemform.typeSort,
                                id: this.itemform.id
                            };
                            var qs = require('querystring');
                            let datass = qs.stringify(datas);
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                api.putUpItem(datass).then(response=>{
                                    if(response.data.meta.code=='200'){
                                        this.$message({
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                    }
                                    this.$emit("close")
                                })
                            })
                            this.or=false;
                        }

                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted(){
            
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
        .el-select{
            width:190px;
        }
        .el-input{
            width:190px;
        }
        .adsBtn{
            float:right;
            margin-bottom:16px;
            .save{
                // float:right;
                margin-right:20px;
            }
        }
    }
</style>