<template>
  <div class="reBounce clearfix">
        <div class="reBounce-title clearfix">
            <div class="reBounce-title-lt clearfix">
                <i></i>
                <span>原因</span>    
            </div>
            <img class="close" src="../../assets/img/overtime/close.png" alt="" @click="closeBounce()">
        </div>
        <div class="reBounce-form">
            <el-form :model="authForm" :rules="auths" ref="authForm" class="authForm">
                <el-form-item  prop="desc">
                    <el-input resize='none' type="textarea" v-model="authForm.desc"></el-input>
                    </el-input>
                </el-form-item>
                <el-form-item class="sure clearfix">
                    <el-button type="primary" style="float:right;" @click="submitForm('authForm')">确定</el-button>
                </el-form-item>
            </el-form>  
        </div> 
  </div>
</template>
<script>
    export default{
        data(){
            return {
                authForm:{
                    desc:''
                },
                auths:{
                    desc: [
                        { required: true, message: '请填写原因', trigger: 'blur' }
                    ]
                },
                or:true
            }
        },
        methods:{
            // 表单验证
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.or=false;
                        this.$emit("close");
                    } else {
                        return false;
                    }
                });
            },
            // 点击关闭按钮关闭弹框
            closeBounce:function(){
                this.or=false;
                this.$emit("close");
            }

        }
    }
</script>
<style scoped lang="scss">
    .reBounce{
        width:480px;
        max-height:80%;
        overflow-y:auto;
        background:#fff;
        border-radius:5px;
        padding:0 20px;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // display: none;
        z-index: 2;
        .reBounce-title{
            padding-top:18px;
            padding-bottom:24px;
            .reBounce-title-lt{
                float:left;
                i{
                    width:32px;
                    height: 32px;
                    float:left;
                    margin-right:17px;
                    background:url("../../assets/img/deanfund/icon01.png") 0 0 no-repeat;
                }
                span{
                    float:left;
                    margin-top:6px;
                }
            }
            .close{
                float:right;
                cursor:pointer;
                margin-top:6px;
            }
        }
        .reBounce-form{
            // margin-top:24px;     
            .el-textarea{
                width:100%;
            }
        }
        .el-form-item__content{
            margin-left:0;
        }
    }
</style>
<style>
.el-form-item__content{
    margin-left:0;
}
</style>