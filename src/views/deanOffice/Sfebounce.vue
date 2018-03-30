<template>
    <div class="sfaBounce" v-show="edit">
        <div class="sfaBounce-td clearfix">
            <div class="add clearfix">
                <i></i>
                <span>学生档案</span>
            </div>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <div class="sfaBounce-bt">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="校区：" prop="camp" required>
                    <el-select v-model="ruleForm.camp" placeholder="">
                        <el-option v-for="item in campsel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学生姓名："> 
                    <span>啊啊</span>                   
                </el-form-item>
                <el-form-item label="性别：">
                    <span>女</span>    
                </el-form-item>
                <el-form-item label="学籍号："> 
                    <span>09987655433222344</span>                  
                </el-form-item>
                <el-form-item label="入学学期：" prop="term" required>
                    <el-select v-model="ruleForm.term" placeholder="">
                        <el-option v-for="item in termsel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学院：">
                    <span>经济管理系</span>
                </el-form-item>
                <el-form-item label="专业：">
                    <span>工商管理专业</span>
                </el-form-item>
                <el-form-item label="班级：">
                    <span>202</span>
                </el-form-item>
                <el-form-item label="辅导员：">
                    <span>张三</span>
                </el-form-item>
                <el-form-item label="学制：" prop="acade" required>
                    <el-select v-model="ruleForm.acade">
                        <el-option v-for="item in acadesel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="在校状态：" prop="schstate" required>
                    <el-select v-model="ruleForm.schstate">
                        <el-option v-for="item in schstatesel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号：" prop="tel" required> 
                    <el-input v-model="ruleForm.tel"></el-input>                   
                </el-form-item>
                <el-form-item label="政治面貌：" prop="postatus" required>
                    <el-select v-model="ruleForm.postatus">
                        <el-option v-for="item in postatussel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生源地：" prop="stud" required>
                    <el-select v-model="ruleForm.stud">
                        <el-option v-for="item in studsel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
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
                <el-form-item label="民族：" prop="nation" required>
                    <el-select v-model="ruleForm.nation">
                        <el-option v-for="item in nationsel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="家庭住址：" prop="address" required>
                    <address-select
                    :province="ruleForm.province"
                    :city="ruleForm.city"
                    :county="ruleForm.county"
                    :detail="ruleForm.detail"
                    :isAddressTrue="isAddressTrue"
                    ></address-select>
                </el-form-item>
                <el-button class="save" type="primary" @click="saveForm('ruleForm')">提交</el-button>
            </el-form>
        </div>
    </div>	
</template>
<script>
    import addressSelect from '../common/address.vue'
    import store from '../../vuex/store.js'
	export default {
        data() {
            return { 
                isAddressTrue:false,
                edit:true,
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
                // 入学学期
                termsel:{
                    options: [{
                        value: '选项1',
                        label: '2016年春季'
                        }, {
                        value: '选项2',
                        label: '2016年秋季'
                        }, {
                        value: '选项3',
                        label: '2015年春季'
                        }, {
                        value: '选项4',
                        label: '2015年秋季'
                    }],
                    value: '',
                },
                // 学制
                acadesel:{
                    options: [{
                        value: '选项1',
                        label: '奖学金'
                        }, {
                        value: '选项2',
                        label: '助学金'
                        }, {
                        value: '选项3',
                        label: '免学费'
                    }],
                    value: '',
                },
                // 在校状态
                schstatesel:{
                    options: [{
                        value: '选项1',
                        label: '毕业'
                        }, {
                        value: '选项2',
                        label: '离校'
                        }, {
                        value: '选项3',
                        label: '休学'
                    }],
                    value: '',
                },
                // 政治面貌
                postatussel:{
                    options: [{
                        value: '选项1',
                        label: '团员'
                        }, {
                        value: '选项2',
                        label: '党员'
                        }, {
                        value: '选项3',
                        label: '其他'
                    }],
                    value: '',
                },
                // 生源地
                studsel:{
                    options: [{
                        value: '选项1',
                        label: '河南'
                        }, {
                        value: '选项2',
                        label: '河北'
                        }, {
                        value: '选项3',
                        label: '天津'
                    }],
                    value: '',
                },
                // 民族
                nationsel:{
                    options: [{
                        value: '选项1',
                        label: '汉族'
                        }, {
                        value: '选项2',
                        label: '满族'
                        }, {
                        value: '选项3',
                        label: '维吾尔族'
                    }],
                    value: '',
                },
                // 表单验证
                ruleForm: {
                    camp: '',
                    term:'',
                    acade:'',
                    schstate:'',
                    tel:'',
                    postatus:'',
                    stud:'',
                    year:'',
                    month:'',
                    day:'',
                    nation:''
                },
                rules: {
                    camp: [
                        { required: true,message: '请选择校区', trigger: 'change' }
                    ],
                    term: [
                        { required: true,message: '请选择入学学期', trigger: 'change' }
                    ],
                    acade:[
                        { required: true,message: '请选择学制', trigger: 'change' }
                    ],
                    schstate:[
                        { required: true,message: '请选择在校状态', trigger: 'change' }
                    ],
                    tel: [
                        { required: true,message: '请输入手机号', trigger: 'change' }
                    ],
                    postatus:[
                        { required: true,message: '请选择政治面貌', trigger: 'change' }
                    ],
                    stud:[
                        { required: true,message: '请选择生源地', trigger: 'change' }
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
                    nation:[
                        { required: true,message: '请选择民族', trigger: 'change' }
                    ]
                }
            }
        },
        components:{
            addressSelect
        },
        methods:{
            // 点击关闭按钮弹框和遮罩隐藏
            closeBounce:function(){
                this.edit=false;
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
</style>