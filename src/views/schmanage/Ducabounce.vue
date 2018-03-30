<template>
    <div class="adtBounce" v-show="or">
        <div class="adtBounce-td clearfix">
            <div class="add clearfix">
                <i></i>
                <span>添加值班</span>
            </div>
            <img class="close" @click="changeAddBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <div class="adtBounce-bt">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="107px" class="demo-ruleForm">
                <el-form-item label="校区：" prop="camp" required>
                    <el-select v-model="ruleForm.camp" placeholder="">
                        <el-option v-for="item in campsel.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间：" prop="startTime" required>                    
                    <el-date-picker v-model="ruleForm.startTime" type="datetime" placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间：" prop="endTime" required>
                    <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                
                <el-form-item label="教职工职称：" required v-for="item in staffnamesel" >
                    <el-row :gutter="20" >
                        <el-col :span="11" style="padding-left:0;">
                            <el-form-item prop="jobtitle" required>
                                <el-select v-model="ruleForm.jobtitle" placeholder="" class="bigsel">
                                    <el-option v-for="item in item.options" :value="item.value" :key="item.value" :label="item.label">
                                    </el-option>
                                </el-select> 
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" style="padding-left:0;">
                            <el-form-item prop="staffname" required>
                                <el-select v-model="ruleForm.staffname" placeholder="教职工姓名" class="smalsel">
                                    <el-option v-for="item in item.jobtitlesel" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" style="padding-left:0;">
                            <el-radio class="radio" v-model="radio" label="item.radios">组长</el-radio>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-row :gutter="20">
                    <div class="adddel-icon clearfix">
                        <el-col :span="12">
                            <div class="tips">备注：组长只能选择一个</div>
                        </el-col>   
                        <el-col :span="12">
                            <div class="tips-rt">
                                <div class="add-icon" @click="addForm">
                                    <i></i>
                                    <span>增加教职工</span>
                                </div>
                                <div class="del-icon" @click="delForm">
                                    <i></i>
                                    <span>删除教职工</span>
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-row>
                <el-button class="save" type="primary" @click="saveForm('ruleForm')">确定</el-button>
            </el-form>
        </div>
    </div>	
</template>
<script>
	export default {
        data() {
            return {
                // 日期
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                        }
                    }]
                },
                // endDateOpt: {
                //     disabledDate: (time) => {
                //         return time.getTime() < this.form.startTime;   
                //     }
                // },
                or:'true',
                radio:'',
                userId: '2',
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
                // 教职工职称
                staffnamesel:[
                    {
                        options: [
                            {
                                value: '选项1',
                                label: '张三'
                                }, {
                                value: '选项2',
                                label: '李四'
                                }, {
                                value: '选项3',
                                label: '王五'
                                }, {
                                value: '选项4',
                                label: '周通'
                            }
                        ],
                        jobtitlesel: [
                            {                               
                                value: '选项1',
                                label: '讲师'
                                }, {
                                value: '选项2',
                                label: '特级讲师'
                                }, {
                                value: '选项3',
                                label: '讲师'
                                }, {
                                value: '选项4',
                                label: '讲师'
                            }
                        ]
                    }
                ],
                // 表单验证
                ruleForm: {
                    camp: '',
                    startTime: '',
                    endTime: '',
                    jobtitle:'',
                    staffname:''
                },
                rules: {
                    camp: [
                        { required: true,message: '请选择校区', trigger: 'change' }
                    ],
                    startTime: [
                        { type: 'date', required: true, message: '请选择开始时间', trigger: 'change'  }
                    ],
                    endTime: [
                        { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
                    ],
                    jobtitle:[
                        { required: true,message: '请选择教职工职称', trigger: 'change' }
                    ],
                    staffname:[
                        { required: true,message: '请选择教职工姓名', trigger: 'change' }
                    ]
                }
            }
        },
        props: {
            form: {
                userId: '2',
                startTime: '',
                endTime: '',
                jobtitle:''
            }  
        },
        methods:{
            // 点击关闭按钮弹框和遮罩隐藏
            changeAddBounce:function(){
                this.or=false;
                this.$emit("close")
            },
            // 表单验证
            saveForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.or=false;
                        this.$emit("close")
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            addForm () {
                this.staffnamesel.push({
                    options: [{
                        value: '选项1',
                        label: '张三'
                        }, {
                        value: '选项2',
                        label: '李四'
                        }, {
                        value: '选项3',
                        label: '王五'
                        }, {
                        value: '选项4',
                        label: '周通',
                        
                    }],
                    jobtitlesel: [
                        {
                                value: '选项1',
                                label: '讲师'
                                }, {
                                value: '选项2',
                                label: '特级讲师'
                                }, {
                                value: '选项3',
                                label: '讲师'
                                }, {
                                value: '选项4',
                                label: '讲师'
                            
                        }
                    ] ,
                    radios:[
                        { radio:'' }
                    ]                       
                })
            },
            delForm(){
                this.staffnamesel.pop({
                    options: [{
                        value: '选项1',
                        label: '张三'
                        }, {
                        value: '选项2',
                        label: '李四'
                        }, {
                        value: '选项3',
                        label: '王五'
                        }, {
                        value: '选项4',
                        label: '周通'
                    }],
                    jobtitlesel: [
                        {
                            value: '选项1',
                            label: '讲师'
                            }, {
                            value: '选项2',
                            label: '特级讲师'
                            }, {
                            value: '选项3',
                            label: '讲师'
                            }, {
                            value: '选项4',
                            label: '讲师'
                            
                        }
                    ]                        
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    .adtBounce{
        width:480px;
        background:#fff;
        border-radius:5px;
        padding:0 20px;
        max-height:80%;
        overflow-y: auto;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // display: none;
        z-index: 2;
        .adtBounce-td{
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
        .adtBounce-bt{
            padding-top:34px;
            padding-bottom:34px;
            .el-select{
                width:190px;
            }
            .bigsel{
                width:160px;
            }
            .smalsel{
                width:120px;
                // margin-left:3px;
            }
            .adddel-icon{
                
                .tips{
                    float:left;
                    color:#ef0000;
                    font-size:12px;
                }
                .tips-rt{
                    float:right;
                    .add-icon{
                        float:left;
                        cursor:pointer;
                        margin-right:12px;
                        i{
                            width:16px;
                            height:16px;
                            float:left;
                            margin-top:3px;
                            margin-right:6px;
                            background:url("../../assets/img/overtime/add.png") 0 0 no-repeat;
                            background-size:100% 100%;
                        }
                        span{
                            float: left;
                            color:#208af5;
                        }
                    }
                    .del-icon{
                        float:left;
                        cursor:pointer;
                        i{
                            width:17px;
                            height:16px;
                            float:left;
                            margin-top:3px;
                            margin-right:6px;
                            background:url("../../assets/img/overtime/del-d.png") 0 0 no-repeat;
                            background-size:100% 100%;
                        }
                        span{
                            float: left;
                            color:#ef0000;
                        }
                    }
                }
                
            }
            
            .el-textarea{
                width:98%;
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
                margin-top:22px;
            }
        }
        
    }
</style>