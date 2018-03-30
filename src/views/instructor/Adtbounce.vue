<template>
    <div class="adtBounce">
        <div class="adtBounce-td clearfix">
            <span class="add">申请加班</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="padding:22px 20px 0 20px;" label-width="100px" >
            <el-form-item label="校区：" prop="schooleZooneName" >
                <el-select v-model="ruleForm.schooleZooneName" placeholder="选择校区" value-key="id">
                    <el-option v-for="item in campsel" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间：" prop="startTime" >                    
                <el-date-picker v-model="ruleForm.startTime"  type="datetime" placeholder="开始时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" prop="endTime">
                <el-date-picker v-model="ruleForm.endTime" :picker-options="endDateOpt" type="datetime" placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="加班地点：" prop="overTimePlace" >
                <el-input resize="none" type="textarea" v-model="ruleForm.overTimePlace"></el-input>
            </el-form-item>
            <el-form-item label="加班内容：" prop="workContent" >
                <el-input resize="none" type="textarea" v-model="ruleForm.workContent"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remarks">
                <el-input resize="none" type="textarea" v-model="ruleForm.remarks"></el-input>
            </el-form-item>
            <el-button class="save" type="primary" @click="saveForm('ruleForm')" >保存</el-button>
        </el-form>
    </div>	
</template>
<script>
    import util from '../../common/js/util.js'
    import api from '../../apis/common.js'
    import ap from '../../apis/overtime.js'
	export default {
        data() {
            return {
                // 日期
                endDateOpt: {
                    disabledDate: (time) => {
                        return time.getTime() < this.ruleForm.startTime;   
                    }
                },
                // or:true,
                loading: false,
                // 校区
                campsel:[],
                // 表单验证
                rules: {
                    schooleZooneName: [
                        { type:'object',required: true,message: '请选择校区', trigger: 'change'}
                    ],
                    startTime: [
                        { type: 'date', required: true, message: '请选择开始时间', trigger: 'change'}
                    ],
                    endTime: [
                        { type: 'date', required: true, message: '请选择结束时间', trigger: 'change'}
                    ],
                    overTimePlace:[
                        { required: true,message: '请输入加班地点', trigger: 'change' }
                    ],
                    workContent: [
                        { required:true,message: '请输入工作内容', trigger: 'change' }
                    ],
                    // remarks: [
                    //     { required: true,message: '请输入备注内容', trigger: 'change' }
                    // ]
                }
            }
        },
        props: {
            ruleForm: {
                id: '',
                schooleZooneName:null,
                startTime: '',
                endTime: '',
                workContent: '',
                remarks: '',
                overTimePlace:''
            }  
        },
        methods:{
            // 点击关闭按钮弹框和遮罩隐藏
            closeBounce:function(){
                // this.or=false;
                this.$emit("close")
            },
            // 获取校区
            getCampus(){
                api.getCampus().then(response=>{
                    if(response.data.meta.code ==  '200'){
                        this.campsel = response.data.data
                    }
                })
            },
            // 表单验证
            saveForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data={
                            'schoolZoneId':this.ruleForm.schooleZooneName.id,
                            'schooleZooneName':this.ruleForm.schooleZooneName.name,
                            'startTime':util.formatDate.format(this.ruleForm.startTime,'yyyy-MM-dd hh:mm'),
                            'endTime':util.formatDate.format(this.ruleForm.endTime,'yyyy-MM-dd hh:mm'),
                            'workContent':this.ruleForm.workContent,
                            'remarks':this.ruleForm.remarks,
                            'overTimePlace':this.ruleForm.overTimePlace
                        }
                        // this.loading = true;
                        var qs = require('querystring');
                        let datax = qs.stringify(data);
                        if(!this.ruleForm.id){
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {

                                ap.postAdd(datax).then(response => {
                                    
                                    if(response.data.meta.code == '200') {
                                        this.$message({
                                            message: '添加成功',
                                            type: 'success'
                                        });
                                        this.loading = false;
                                    }
                                    this.$emit("close");    
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '取消添加'
                                });          
                            });
                        }else{
                            // 显示编辑弹框
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {

                                ap.putEditOvtime(datax,this.ruleForm.id).then(response =>{

                                    if(response.data.meta.code=='200'){
                                        this.$message({
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                    }
                                    this.$emit("close");
                                })
                                
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '取消编辑'
                                });          
                            });
                            this.or=false;
                        }

                    } else {
                        return false;
                    }
                });
            }

        },
        mounted(){
            this.getCampus();
        }
    }
</script>
<style scoped lang="scss">
    .adtBounce{
        width:480px;
        background:#fff;
        border-radius:5px;
        // padding:0 20px;
        max-height:80%;
        overflow-y: auto;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // display: none;
        z-index: 2;
        .adtBounce-td{
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
        .save{
            float:right;
            margin-bottom:16px;
        }
    }
</style>