<template>
    <div class="sfaBounce">
        <div class="sfaBounce-td clearfix">
            <span class="add">教职工档案</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form label-width="96px" style="padding:0 20px;">
            <el-form-item label="校区：">
                <span>{{ formv.sname }}</span>
            </el-form-item>
            <el-form-item label="编号："> 
                <span>{{ formv.no }}</span>                   
            </el-form-item>
            <el-form-item label="教职工姓名：">
                <span>{{ formv.name }}</span>    
            </el-form-item>
            <el-form-item label="性别：">
                <span>{{ formv.sex }}</span>
            </el-form-item>
            <el-form-item label="出生日期：">
                <span>{{ formv.birthday }}</span>
            </el-form-item>
            <el-form-item label="学历：">
                <span>{{ formv.education }}</span>
            </el-form-item>
            <el-form-item label="手机号：">
                <span>{{ formv.mobile }}</span>
            </el-form-item>
            <el-form-item label="教职工职称：">
                <span>{{ formv.proname }}</span>
            </el-form-item>
            <el-form-item label="教职工分类：">
                <span>{{ formv.positional }}</span>
            </el-form-item>
            <el-form-item label="职位状态：">
                <span>{{ formv.state }}</span>
            </el-form-item>
            <el-form-item label="电子邮箱："> 
                <span>{{ formv.email }}</span>                  
            </el-form-item>
        </el-form>
    </div>	
</template>
<script>
	export default {
        data() {
            return { 
                // view:true,
            }
        },
        props:{
            formv:{
                id:'',
                sname:'',
                no:'',
                name:'',
                sex:'',
                birthday:'',
                education:'',
                mobile:'',
                proname:'',
                positional:'',
                state:'',
                email:'',
            }
        },
        methods:{
            //闭弹框和遮罩
            closeBounce:function(){
                // this.view=false;
                // this.or=false;
                this.$emit("close")
            },
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
    }
</style>