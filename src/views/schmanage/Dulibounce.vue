<template>
    <div class="adtBounce">
        <div class="adtBounce-td clearfix">
            <span class="add">添加值班</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form :model="formx" :rules="rules" ref="formx" label-width="93px" style="padding:22px 10px 0 20px;">
            <el-form-item label="校区:" prop="schooleZoneName" >
                <el-select @change="querystaffname" v-model="formx.schooleZoneName" placeholder="选择校区" value-key="id" >
                    <el-option v-for="item in campsel" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间：" prop="dutyStartTime" >                    
                <el-date-picker v-model="formx.dutyStartTime" type="datetime" placeholder="开始时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" prop="dutyEndTime" >
                <el-date-picker v-model="formx.dutyEndTime" :picker-options="endDateOpt" type="datetime" placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="值班地点：" prop="dutyPlace" >
                <el-input type="textarea" resize="none" v-model="formx.dutyPlace" placeholder=""></el-input>
            </el-form-item> 
            <el-form-item label="值班内容：" prop="dutyContent" >
                <el-input type="textarea" resize="none" v-model="formx.dutyContent" placeholder=""></el-input>
            </el-form-item> 
            <el-form-item label="值班老师：" style="margin-bottom:0;" required> 
                <el-row :gutter="20" v-for="item in number" :key='item' style="margin-left:0;margin-bottom:22px;">
                    <el-col :span="14" style="padding-left:0;">
                        <el-form-item :prop="'staffname.' + [item-1] + '.id'" :rules="{ required: true, message: '请输入教职工姓名', trigger: 'change' }">
                            <!-- :rules="{ required: true, message: '请输入教职工姓名', trigger: 'change' }" -->
                            <el-select v-model="formx.staffname[item-1].id" placeholder="">
                                <el-option v-for="item in staffnamesel" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="padding-left:0;">
                        <el-radio class="radio" v-model="formx.flag" :label="item-1">组长</el-radio>
                    </el-col>
                    <div class="del-icon" @click="delForm(item)">
                        <i></i>
                        <span>删除教职工</span>
                    </div>
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
                        </div>
                    </el-col>
                </div>
            </el-row>
            <div class="save clearfix">
                <el-button type="primary" @click="saveForm('formx')">确定</el-button>
            </div>
        </el-form>
    </div>	
</template>
<script>
    import util from '../../common/js/util.js'
    import api from '../../apis/duty.js'
    import ap from '../../apis/common.js'
	export default {
        data() {
            return {
                number:1,
                // 限制日期
                endDateOpt: {
                    disabledDate: (time) => {
                        return time.getTime() < this.formx.dutyStartTime;    
                    }
                },
                // or:true,
                // 校区
                campsel:[],
                // 教职工职称
                staffnamesel:[],
                rules: {
                    schooleZoneName: [
                        { type:'object',required: true,message: '请选择校区', trigger: 'change'}
                    ],
                    dutyStartTime: [
                        {  type: 'date',required: true, message: '请选择开始时间', trigger: 'change'}
                    ],
                    dutyEndTime: [
                        {  type: 'date',required: true, message: '请选择结束时间', trigger: 'change'}
                    ],
                    dutyPlace:[
                        { required: true,message: '请输入值班地点', trigger: 'change'}
                    ],
                    dutyContent:[
                        { required: true,message: '请输入值班内容', trigger: 'change' }
                    ]
                },
            }
        },
        props: {
            formx:{
                id:'',
                schooleZoneName:"",
                dutyStartTime: '',
                dutyEndTime: '',
                dutyPlace:'',
                dutyContent:'',
                groupId:'',
                flag:'',
                staffname:[
                    {
                        id:'',
                        IsGroupLeader:'',
                    }
                ]
            }
        },
        methods:{
            //通过校区查找老师
            querystaffname(){
                let data = {
                    'ssid':this.formx.schooleZoneName.id,
                }
                ap.queryduty(data).then(response => {
                     this.staffnamesel = response.data.data
                })
            },
            // 关闭弹框和遮罩
            closeBounce:function(){
                // this.or=false;
                this.$emit("close")
            },
            // 表单验证
            saveForm(formName) {
                let _this = this
                this.formx.staffname = this.formx.staffname.map(function(item,index,input){
                    if(index == _this.formx.flag ){
                        item.IsGroupLeader = 'true'
                    }else{
                        item.IsGroupLeader = 'flase'
                    }
                    return item
                })

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data={
                            'schoolZoneId': this.formx.schooleZoneName.id,
                            'schooleZoneName': this.formx.schooleZoneName.name,
                            'startTime':util.formatDate.format(this.formx.dutyStartTime,'yyyy-MM-dd hh:mm'),
                            'endTime': util.formatDate.format(this.formx.dutyEndTime,'yyyy-MM-dd hh:mm'),
                            'dutyPlace': this.formx.dutyPlace,
                            'dutyContent': this.formx.dutyContent,
                            'dutyTeacherInfos': this.formx.staffname
                        }
                        var datas = JSON.stringify(data)
                        var dataw =  {'teacherDuty': datas};
                        var qs = require('querystring');
                        let datax = qs.stringify(dataw);
                        // 添加弹框
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            api.getAdDuInfo(datax).then(response => {
                                if(response.data.meta.code == '200') {
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    }); 
                                }
                                this.$emit("close");    
                            })
                        })
                    } else {

                        return false;
                    }
                });




                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         let data={
                //             'schoolZoneId': this.formx.schooleZoneName.id,
                //             'schooleZoneName': this.formx.schooleZoneName.name,
                //             'startTime':util.formatDate.format(this.formx.dutyStartTime,'yyyy-MM-dd hh:mm'),
                //             'endTime': util.formatDate.format(this.formx.dutyEndTime,'yyyy-MM-dd hh:mm'),
                //             'dutyPlace': this.formx.dutyPlace,
                //             'dutyContent': this.formx.dutyContent,
                //             'dutyTeacherInfos': this.formx.staffname
                //         }
                //         var datas = JSON.stringify(data)
                //         var dataw =  {'teacherDuty': datas};
                //         var qs = require('querystring');
                //         let datax = qs.stringify(dataw);
                //         // 如果存在ID显示编辑否则显示添加弹框
                //         if(!this.formx.id) {
                //             this.$confirm('确认提交吗？', '提示', {}).then(() => {
                //                 api.getAdDuInfo(datax).then(response => {
                //                     if(response.data.meta.code == '200') {
                //                          console.log(response)
                //                         this.$message({
                //                             message: '添加成功',
                //                             type: 'success'
                //                         });
                                        
                //                     }
                //                     this.$emit("close");    
                //                 })
                //             })
                //         } else {
                //             // 显示编辑弹框
                //            var  teacherDutys ={
                //                'teacherDuty':datas
                //            }
                //            let dataws = qs.stringify(teacherDutys);

                //             this.$confirm('确认提交吗？', '提示', {}).then(() => {
                //                 api.putEdit(this.formx.groupId,dataws).then(response =>{
                //                     if(response.data.meta.code=='200'){
                //                         this.$message({
                //                             message: '修改成功',
                //                             type: 'success'
                //                         });
                //                     }
                //                     this.$emit("close");
                //                 })
                                
                //             })
                //             this.or=false;
                //         }
                //     } else {

                //         return false;
                //     }
                // });
            },
            addForm () {
                this.number+=1;
                this.formx.staffname.push({
                    id:'',
                    IsGroupLeader:'',
                })
                // console.log(this.formx.staffname)
            },
            delForm(item){
                // console.log(this.number)
                if(this.number>=2){
                    this.number=this.number-1;
                }else{
                    return
                }
                
                this.formx.staffname.splice(item-1,1);
                
            },
            getCampus(){
                ap.getCampus().then(response => {
                    if(response.data.meta.code ==  '200'){
                        this.campsel = response.data.data
                    }
                })
            }
        },
        created() {
             // 请求校区
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
        .tips{
            float:left;
            color:#ef0000;
            font-size:12px;
        }
        .del-icon{
            cursor:pointer;
            i{
                width:17px;
                height:16px;
                float:left;
                margin-top:10px;
                margin-right:6px;
                background:url("../../assets/img/overtime/del-d.png") 0 0 no-repeat;
                background-size:100% 100%;
            }
            span{
                float: left;
                color:#ef0000;
            }
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
                  
        }  
        
        .save{
            button{
                float:right;
                margin-top:16px;
                margin-bottom:16px; 
            } 
        }
    }
</style>