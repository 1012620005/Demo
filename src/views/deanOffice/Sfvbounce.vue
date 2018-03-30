<template>
    <div class="sfaBounce">
        <div class="sfaBounce-td clearfix">
            <span class="add">学生档案</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form label-width="82px" style="padding:0 20px;">
            <el-form-item label="校区：">
                <span>{{ formv.sname }}</span>
            </el-form-item>
            <el-form-item label="学生姓名："> 
                <span>{{ formv.name }}</span>                   
            </el-form-item>
            <el-form-item label="性别：">
                <span>{{ formv.sexname }}</span>    
            </el-form-item>
            <el-form-item label="学年："> 
                <span>{{ formv.year }}</span>                  
            </el-form-item>
            <el-form-item label="院系：">
                <span>{{ formv.deptname }}</span>
            </el-form-item>
            <el-form-item label="专业：">
                <span>{{ formv.proname }}</span>
            </el-form-item>
            <el-form-item label="班级：">
                <span>{{ formv.classname }}</span>
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
                name:'',
                sexname:'',
                year:'',
                deptname:'',
                proname:'',
                classname:'',
            }
        },
        methods:{
            // 点击关闭按钮弹框和遮罩隐藏
            closeBounce:function(){
                this.$emit("close")
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
                // cursor:pointer;
                // i{
                //     width:32px;
                //     height: 32px;
                //     float: left;
                //     margin-right:18px;
                //     background:url("../../assets/img/overtime/addbouce.png") 0 0 no-repeat;
                //     background-size:100% 100%;
                // }
                // span{
                //     margin-top:6px;
                //     float:left;
                // }
            }
            .close{
                float:right;
                cursor:pointer;
                margin-top:6px;
            }
        }

        .addres{
            span{
                margin-right:12px;
            }
        }
        .birthdate-box{
            position: absolute;
            width:300px;
        }
        .birthdate-box .block{
            display:inline-block;
            width:29%;
        }
        .birthdate-box .inline-block{
            display:inline-block;
            width:33%;
        }
        .birthdate-box .inline-block .el-date-editor{
            width:80px;
        }
        .birthdate-box .block .el-date-editor{
            width:65px;
        }
    }
</style>