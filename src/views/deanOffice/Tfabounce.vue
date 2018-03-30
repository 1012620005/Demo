<template>
    <div class="sfaBounce" v-show="or">
        <div class="sfaBounce-td clearfix">
            <div class="add clearfix">
                <i></i>
                <span>教职工档案</span>
            </div>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <div class="sfaBounce-bt">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="107px" class="demo-ruleForm">
                <el-form-item label="校区：" prop="camp" required>
                    <el-select v-model="ruleForm.camp" placeholder="">
                        <el-option v-for="item in campsel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名：" prop="stuname" required> 
                    <el-input v-model="ruleForm.stuname"></el-input>                   
                </el-form-item>
                <el-form-item label="性别：" prop="sex" required>
                    <el-radio-group v-model="ruleForm.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生年月：" required>
                    <template slot-scope="scope">
                    <div class="birthdate-box">
                        <div class="inline-block">
                            <el-date-picker
                            v-model="ruleForm.year"
                            align="right"
                            type="year" prop="year" >
                            </el-date-picker>
                            <span class="demonstration">年</span>
                        </div>
                        <div class="block">
                            <el-date-picker
                            v-model="ruleForm.month"
                            align="right"
                            format="MM"
                            type="month">
                            </el-date-picker>
                            <span class="demonstration">月</span>
                        </div>
                        <div class="block">
                            <el-date-picker
                            v-model="ruleForm.day"
                            format="dd"
                            align="right"
                            type="date">
                            </el-date-picker>
                            <span class="demonstration">日</span>
                        </div>
                    </div>
                    </template>
                </el-form-item>
                <el-form-item label="学历：" prop="edu" required> 
                    <el-select v-model="ruleForm.edu" placeholder="">
                        <el-option v-for="item in edusel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>                   
                </el-form-item>
                <el-form-item label="手机号：" prop="tel" required> 
                    <el-input v-model="ruleForm.tel"></el-input>                
                </el-form-item>
                <el-form-item label="教职工职称：" prop="prof" required> 
                    <el-select v-model="ruleForm.prof" placeholder="">
                        <el-option v-for="item in profsel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>                     
                </el-form-item>
                <el-form-item label="教职工分类：" prop="classif" required>
                    <el-select v-model="ruleForm.classif" placeholder="">
                        <el-option v-for="item in classifsel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位状态：" prop="job" required>
                    <el-select v-model="ruleForm.job" placeholder="">
                        <el-option v-for="item in jobsel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电子邮件：" prop="email" required> 
                    <el-input v-model="ruleForm.email"></el-input>                
                </el-form-item>
                <el-button class="save" type="primary" @click="saveForm('ruleForm')">提交</el-button>
            </el-form>
        </div>
    </div>	
</template>
<script>
	export default {
        data() {
            return { 
                or:true,
                // 校区
                campsel:{
                    options: [{
                        value: '选项1',
                        label: '北校区'
                        }, {
                        value: '选项2',
                        label: '南校区'
                        }, {
                        value: '选项3',
                        label: '东校区'
                        }, {
                        value: '选项4',
                        label: '西校区'
                    }]
                },
                // 学历
                edusel:{
                    options: [{
                        value: '选项1',
                        label: '大专'
                        }, {
                        value: '选项2',
                        label: '本科'
                        }, {
                        value: '选项3',
                        label: '硕士'
                        }, {
                        value: '选项4',
                        label: '博士'
                    }],
                    value: '',
                },
                // 教师职称
                profsel:{
                    options: [{
                        value: '选项1',
                        label: '讲师'
                        }, {
                        value: '选项2',
                        label: '高级讲师'
                        }, {
                        value: '选项3',
                        label: '讲师'
                        }, {
                        value: '选项4',
                        label: '高级讲师'
                    }],
                    value: '',
                },
                // 教职工分类
                classifsel:{
                    options: [{
                        value: '选项1',
                        label: '在编'
                        }, {
                        value: '选项2',
                        label: '合同'
                        }, {
                        value: '选项3',
                        label: '外派'
                    }],
                    value: '',
                },
                 // 职位状态
                jobsel:{
                    options: [{
                        value: '选项1',
                        label: '在职'
                        }, {
                        value: '选项2',
                        label: '离职'
                        }, {
                        value: '选项3',
                        label: '在职'
                        }, {
                        value: '选项4',
                        label: '离职'
                    }],
                    value: '',
                },
                
                
                // 表单验证
                ruleForm: {
                    camp: '',
                    stuname: '',
                    sex: '',
                    year:'',
                    month:'',
                    day:'',
                    edu:'',
                    tel:'',
                    prof:'',
                    classif:'',
                    job:'',
                    email:''
                },
                rules: {
                    camp: [
                        { required: true,message: '请选择校区', trigger: 'change' }
                    ],
                    stuname: [
                        { required: true, message: '请输入学生姓名', trigger: 'blur' },
                        { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    year: [
                        { type: 'year', required: true, message: '请选择年', trigger: 'change' }
                    ],
                    month: [
                        { type: 'month', required: true, message: '请选择月', trigger: 'change' }
                    ],
                    day: [
                        { type: 'date', required: true, message: '请选择日', trigger: 'change' }
                    ],
                    edu: [
                        { required: true,message: '请选择学历', trigger: 'change' }
                    ],
                    tel: [
                        { required: true,message: '请输入手机号', trigger: 'change' }
                    ],
                    prof: [
                        { required: true,message: '请选择教职工职称', trigger: 'change' }
                    ],
                    job:[
                        { required: true,message: '请选择职位状态', trigger: 'change' }
                    ],
                    classif:[
                        { required: true,message: '请选择教职工分类', trigger: 'change' }
                    ],
                    email:[
                        { required: true,message: '请输入电子邮箱', trigger: 'change' }
                    ]
                }
            }
        },
        methods:{
            // 点击关闭按钮弹框和遮罩隐藏
            closeBounce:function(){
                this.or=false;
                this.$emit("close")
            },
            // 表单验证
            saveForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                    } else {
                        // console.log('error submit!!');
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
        padding:0 20px;
        max-height:80%;
        overflow-y:auto;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // display: none;
        z-index: 2;
        .sfaBounce-td{
            padding-top:18px;
            padding-bottom:34px;
            .add{
                float:left;
                cursor:pointer;
                i{
                    width:32px;
                    height: 32px;
                    float: left;
                    margin-right:18px;
                    background:url("../../assets/img/overtime/addbouce.png") 0 0 no-repeat;
                    background-size:100% 100%;
                }
                span{
                    margin-top:6px;
                    float:left;
                }
            }
            .close{
                float:right;
                cursor:pointer;
                margin-top:6px;
            }
        }
        .sfaBounce-bt{
            margin-top:25px;
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
            .el-select{
                width:190px;
            }
            .el-input{
                width:190px;
            }
            .el-textarea{
                .el-textarea__inner{
                width:79%;
                border:none;
                resize:none;
                background:#fafafa;
                height: 90px;
                overflow:auto;
                border-radius:4px;
                padding-top:10px;
                padding-left:10px;
                font-family: "微软雅黑";
                font-size:14px;
                }
            }
            
            .adt{
                margin-bottom:16px;
                label{
                    float: left;
                    width:15%;
                    text-align:right;
                    margin-top:6px;
                } 
                
            }
            .save{
                float:right;
                margin-bottom:16px;
            }
        }
        
    }
</style>