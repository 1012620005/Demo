<template>
    <div class="adtBounce">
        <div class="adtBounce-td clearfix">
            <span class="add">值班详情</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form label-width="82px" class="demo-ruleForm" style="padding:22px 10px 0 20px;">
            <el-form-item label="校区：">
                <span>{{ form.schooleZoneName }}</span>
            </el-form-item>
            <el-form-item label="开始时间：">                    
                <span>{{ form.dutyStartTime }}</span>
            </el-form-item>
            <el-form-item label="结束时间：">
                <span>{{ form.dutyEndTime }}</span>
            </el-form-item>
            <el-form-item label="值班地点：">
                <span>{{ form.dutyPlace }}</span>
            </el-form-item>
            <el-form-item label="值班内容：">
                <span>{{ form.dutyContent }}</span>
            </el-form-item>
            <el-form-item label="值班老师：">
                <el-row :gutter="20" v-for="item in form.staffname" :key="index">
                    <el-col :span="14" style="padding-left:0;">
                        <span>{{item.id}}</span>
                    </el-col>
                    <el-col :span="6" style="padding-left:0;">
                        <span v-if="item.isGroupLeader=='true'?true:false">组长</span>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>	
</template>
<script>
    import api from '../../apis/duty.js'
	export default {
        data() {
            return {
                // or:true,
                form:{
                    schooleZoneName:"",
                    dutyStartTime:"",
                    dutyEndTime:"",
                    dutyPlace:"",
                    dutyContent:"",
                    staffname:[]
                }
            }
        },
        props:{
            formv:''
        },
        methods:{
            // 隐藏弹框和遮罩
            closeBounce:function(){
                // this.or=false;
                this.$emit("close")
            },
            getDutyCase(){

                api.getDutyCase(this.formv).then(response=>{
                    if(response.data.meta.code ==  '200'){
                        var res=response.data.data;
                        this.form.schooleZoneName = res.schoolName;
                        this.form.dutyStartTime = res.startTime;
                        this.form.dutyEndTime = res.endTime;
                        this.form.dutyPlace = res.dutyPlace;
                        this.form.dutyContent = res.dutyContent;
                        this.form.staffname=res.dutyTeacher;
                    }
                })
            }
        },
        mounted(){
            this.getDutyCase();
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
        
    }
</style>