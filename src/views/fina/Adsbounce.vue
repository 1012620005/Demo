<template>
    <div class="sfaBounce" v-show="or">
        <div class="sfaBounce-td clearfix">
            <span class="add">教职工工资</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form :model="ruleForm"  style="padding:22px 20px 0 20px;" :rules="rules" ref="ruleForm" label-width="107px">
            <!-- <el-form-item label="职工姓名：" prop="name"> 
                <el-input v-model="ruleForm.name"></el-input>                   
            </el-form-item>
            <el-form-item  label="身份证号：" prop="idnum" required> 
                <el-input v-model="ruleForm.idnum"></el-input>                   
            </el-form-item>
            <el-form-item  label="工资月份：" prop="stmonth" required> 
                <el-date-picker v-model="ruleForm.stmonth"  type="month" placeholder="选择月">
                </el-date-picker>                   
            </el-form-item>
            <el-form-item v-for="(item,index) in ruleForms.slice(3)" :key="item.id" :label="item.typeName+'：'" :prop="String(index)" 
            :rules ="[{ required: true, message: '不能为空', trigger: 'blur' }]"
            > 
                <el-input v-model="ruleForm[index]"></el-input>                   
            </el-form-item> -->
            <el-form-item v-for="(item,index) in ruleForms" :key="item.id" :label="item.typeName+'：'" :prop="String(index)" 
            :rules ="[{ required: true, message: '不能为空', trigger: 'blur' }]"
            > 
                <el-input v-model="ruleForm[index]"></el-input>                   
            </el-form-item>
            <!-- <el-form-item label="身份证号：" prop="id" required> 
                <el-input v-model="ruleForm.id"></el-input>                   
            </el-form-item> -->
            <!-- <el-form-item label="职务：" prop="prof" required> 
                <el-select v-model="ruleForm.prof" placeholder="">
                    <el-option v-for="item in profsel.options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>                     
            </el-form-item>
            <el-form-item label="绩效工资：" prop="merit" required>
                <el-input v-model="ruleForm.merit"></el-input>
            </el-form-item>
            <el-form-item label="基本工资：" prop="basepay" required> 
                <el-input v-model="ruleForm.basepay"></el-input>               
            </el-form-item>
            <el-form-item label="备注：" prop="remark" required> 
                <el-input type="textarea" resize="none" v-model="ruleForm.remark"></el-input>                
            </el-form-item> -->
            <el-form-item label="" class="adsBtn"> 
                <el-button class="save" type="primary" @click="saveForm('ruleForm')">确定</el-button>
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
                or:true,
                // 职务
                profsel:{
                    options: [],
                    value: '',
                },
                // 表单验证
                ruleForms:[],
                rules: { 
                    // name: [
                    //     { required: true, message: '请输入姓名', trigger: 'blur' },
                    // ],
                    // idnum:[
                    //     { required: true, message: '请输入身份证号', trigger: 'blur' },
                    // ],
                    // stmonth: [
                    //     { type:'date',required: true,message: '请选择月份', trigger: 'change' }
                    // ],
                    // merit: [
                    //     { required: true,message: '请填写绩效工资', trigger: 'change' }
                    // ],
                    // basepay: [
                    //     { required: true,message: '请填写基本工资', trigger: 'change' }
                    // ],
                    // remark:[
                    //     { required: true,message: '请填写备注内容', trigger: 'change' }
                    // ]
                    
                }
            }
        },
        props:{
            ruleForm: {
                // stuname: '',
                // dyna:'',
                // name:'',
                // idnum:'',
                // stmonth:''
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
                // console.log(this.ruleForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        
                        let forms =[]
                        for(let item in this.ruleForm){
                            forms.push(this.ruleForm[item])
                        }
                        let data=this.ruleForms.map((item,index)=>{
                            return {
                                'financeKey':item.typeName,
                                'finaceValue':forms[index],
                                'finaceTypeId':item.id
                            }
                        })
                        
                        let datas ={
                            'jwFinance':JSON.stringify(data),
                        }
                        var qs = require('querystring');
                        
                        let datax = qs.stringify(datas);
                        
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            api.postStaff(datax).then(response=>{
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
                            console.log(item.id);
                            console.log("88888")     
                        });  
                        
                    } else {
                        return false;
                    }
                });
            },
            // 获取全部类别
            getAllItem(){
                api.getAllItem().then(response =>{
                    console.log(response);
                    console.log("333333333333")
                    this.ruleForms = response.data.data;
                    let ruleForm = this.ruleForm
                })
            }
        },
        mounted(){
            // 获取全部类别
            this.getAllItem();
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