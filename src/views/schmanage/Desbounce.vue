<template>
    <div class="adtBounce" v-show="or">
        <div class="adtBounce-td clearfix">
            <span class="add">添加加班</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="93px" style="padding:22px 20px 0 20px;">
            <el-form-item label="校区：" prop="schooleZooneName" required>
                <el-select  @change="querystaffname" v-model="ruleForm.schooleZooneName" placeholder="选择校区" value-key="id">
                    <el-option v-for="item in campsel" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间：" prop="startTime" required>                    
                <el-date-picker v-model="ruleForm.startTime" type="datetime" placeholder="开始时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" prop="endTime" required>
                <el-date-picker v-model="ruleForm.endTime" :picker-options="endDateOpt" type="datetime" placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="加班老师：" prop="userId"  required>
                <el-select v-model="ruleForm.userId" placeholder="加班老师姓名" value-key="id">
                    <el-option v-for="item in stnamsel" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item style="margin-bottom:10px;">
                <div class="adddel-icon clearfix">
                    <div class="add-icon" @click="addForm">
                        <i></i>
                        <span>增加教职工</span>
                    </div>
                    <div class="del-icon" @click="delForm">
                        <i></i>
                        <span>删除教职工</span>
                    </div>
                </div>
            </el-form-item>  -->
            <el-form-item label="加班地点：" prop="overTimePlace" required >
                <el-input resize="none" type="textarea" v-model="ruleForm.overTimePlace"></el-input>
            </el-form-item>
            <el-form-item label="加班内容：" prop="workContent" required >
                <el-input resize="none" type="textarea" v-model="ruleForm.workContent"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remarks">
                <el-input resize="none" type="textarea" v-model="ruleForm.remarks"></el-input>
            </el-form-item>
            <el-button class="save" type="primary" @click="saveForm('ruleForm')">确定</el-button>
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
                or:'true',
                // 校区
                campsel:[],
                // 教职工姓名
                stnamsel:[],
                // 表单验证
                rules: {
                    schooleZooneName: [
                        { type: 'object', required: true,message: '请选择校区', trigger: 'change' }
                    ],
                    startTime: [
                        { type: 'date', required: true, message: '请选择开始时间', trigger: 'change'  }
                    ],
                    endTime: [
                        { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
                    ],
                    userId:[
                        {type: 'object', required: true,message: '请选择加班老师姓名', trigger: 'change' }
                    ],
                    overTimePlace:[
                        { required: true,message: '请输入加班地点', trigger: 'change' }
                    ],
                    workContent: [
                        { required: true,message: '请输入工作内容', trigger: 'change' }
                    ],
                    // remarks: [
                    //     { required: true,message: '请输入备注内容', trigger: 'change' }
                    // ]
                }
            }
        },
        props:{
            ruleForm: {
                id:'',
                schooleZooneName:null,
                startTime: '',
                endTime: '',
                overTimePlace:'',
                userId:'', 
                userName:'',
                workContent:'', 
                remarks:''
            }
        },
        methods:{
            // 点关闭弹框和遮罩
            closeBounce:function(){
                this.or=false;
                this.$emit("close")
            },
            //通过校区查找老师
            querystaffname(){
                if(this.ruleForm.schooleZooneName !== null){
                    let data = {
                        'ssid':this.ruleForm.schooleZooneName.id,
                    }
                    api.queryduty(data).then(response => {
                        this.stnamsel = response.data.data
                    })
                }
            },
            // 表单验证
            saveForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data={
                            'schoolZoneId':this.ruleForm.schooleZooneName.id,
                            'workContent':this.ruleForm.workContent,
                            'overTimePlace':this.ruleForm.overTimePlace,
                            'startTime':util.formatDate.format(this.ruleForm.startTime,'yyyy-MM-dd hh:mm'),
                            'endTime':util.formatDate.format(this.ruleForm.endTime,'yyyy-MM-dd hh:mm'),
                            'userId':this.ruleForm.userId.id,
                            'remarks':this.ruleForm.remarks
                        }
                        var qs = require('querystring');
                        let datax = qs.stringify(data);
                        // 校务老师加班保存
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            ap.postSchSave(datax).then(response=>{
                                console.log(this.ruleForm.schooleZooneName)
                                if(response.data.meta.code == '200'){
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                }
                                this.$emit("close");
                            })
                            
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消添加'
                            });          
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted(){
            api.getCampus().then(response=>{
                if(response.data.meta.code ==  '200'){
                    this.campsel = response.data.data
                }
            })
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
        // .adddel-icon{
        //     float:right;
        //     .add-icon{
        //         float:left;
        //         cursor:pointer;
        //         margin-right:12px;
        //         i{
        //             width:16px;
        //             height:16px;
        //             float:left;
        //             margin-top:10px;
        //             margin-right:6px;
        //             background:url("../../assets/img/overtime/add.png") 0 0 no-repeat;
        //             background-size:100% 100%;
        //         }
        //         span{
        //             float: left;
        //             color:#208af5;
        //         }
        //     }
        //     .del-icon{
        //         float:left;
        //         cursor:pointer;
        //         i{
        //             width:17px;
        //             height:16px;
        //             float:left;
        //             margin-top:10px;
        //             margin-right:6px;
        //             background:url("../../assets/img/overtime/del-d.png") 0 0 no-repeat;
        //             background-size:100% 100%;
        //         }
        //         span{
        //             float: left;
        //             color:#ef0000;
        //         }
        //     }
        // }
        .save{
            float:right;
            margin-bottom:16px;
        }
    }
</style>