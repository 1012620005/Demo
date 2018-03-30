<template>
    <div class="viewBounce">
        <div class="viewBounce-td clearfix">
            <!-- <button><img src="../../assets/img/duty/icon01.png" alt=""></button> -->
            <span class="view">值班详情</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <div class="viewBounce-bt">
            <div class="views clearfix">
                <div class="view clearfix">
                    <label for="">校区：</label>
                    <div class="view-rt">{{ form.schooleZoneName }}</div>
                </div>
                <div class="view clearfix">
                    <label for="">开始时间：</label>
                    <span class="view-rt">{{ form.dutyStartTime }}</span>
                </div>
                <div class="view clearfix">
                    <label for="">结束时间：</label>
                    <div class="view-rt">{{ form.dutyEndTime }}</div>
                </div>
                <div class="view clearfix">
                    <label for="">值班地点：</label>
                    <span class="view-rt">{{ form.dutyPlace }}</span>
                </div>
                <div class="view clearfix">
                    <label for="">值班内容：</label>
                    <div class="view-rt">{{ form.remarks }}</div>
                </div>
                <div class="view clearfix" style="border-bottom:1px solid #ccc;padding-bottom:16px;">
                    <label for="">值班老师：</label>
                    <div class="view-rt">
                        <el-row :gutter="20" v-for="item in form.staffname" :key="index" style="margin-left:0;">
                            <el-col :span="14" style="padding-left:0;margin-bottom:12px;">
                                <span>{{item.id}}</span>
                            </el-col>
                            <el-col :span="6" style="padding-left:0;">
                                <span v-if="item.isGroupLeader=='true'?true:false">组长</span>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="view clearfix">
                    <label for="">值班情况：</label>
                    <span class="view-rt">{{ form.dutyContent }}</span>
                </div>
                <!-- <div class="view clearfix">
                    <label for="">上传附件：</label>
                    <span class="view-rt">女生寝室.doc</span>
                </div> -->
                <div class="view clearfix">
                    <label for="">提交时间：</label>
                    <div class="view-rt">{{ form.submit }}</div>
                </div>
            </div>
        </div>
    </div>	
</template>
<script>
    import api from '../../apis/duty.js'
	export default {
        data() {
            return {
                form:{
                    schooleZoneName:"",
                    dutyStartTime:"",
                    dutyEndTime:"",
                    dutyPlace:"",
                    dutyContent:"",
                    remarks:"",
                    staffname:[],
                    submit:""
                }
            };
        },
        props:{
            formd:''
        },
        methods:{
            // 点击关闭按钮弹框和遮罩隐藏
            closeBounce:function(){
                this.$emit("close")
            },
            getDutyCase(){

                api.getDutyCase(this.formd).then(response=>{
                    
                    if(response.data.meta.code ==  '200'){
                        var res=response.data.data;
                        this.form.schooleZoneName = res.schoolName;
                        this.form.dutyStartTime = res.startTime;
                        this.form.dutyEndTime = res.endTime;
                        this.form.dutyPlace = res.dutyPlace;
                        this.form.dutyContent = res.dutyContent;
                        this.form.remarks =res.remarks;
                        this.form.staffname=res.dutyTeacher;
                        this.form.submit=res.submit;
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
    .viewBounce{
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
        .viewBounce-td{
            background:#eef1f6;
            padding:24px 20px 20px 20px;
            .view{
                float:left;
                // button{
                //     width:32px;
                //     height: 32px;
                //     line-height:32px;
                //     border-radius:5px;
                //     background:#b6d8fc;
                //     text-align:center;
                //     border:none;
                //     margin-right:12px;
                //     img{
                //         vertical-align: middle;
                //     }
                //     span{
                //         font-size:16px;
                //         color:#000;
                //     }
                // }
            }
            .close{
                float:right;
                cursor:pointer;
                margin-top: 8px;
            }
        }
        .viewBounce-bt{
            margin-top:34px;
            padding:0 20px;
            .view{
                margin-bottom:26px;
                label{
                    float:left;
                    width:16%;
                    text-align:right;
                }
                .view-rt{
                    float:left;
                    width:84%;
                    text-align:left;
                }
                .seeContent{
                    background:#fafafa;
                    border-radius:5px;
                    padding-top:12px;
                    padding-left:16px;
                    min-height:100px;
                }
            }
            .ensure{
                float:right;
                margin-top:78px;
                margin-bottom:14px;
            }
        }
    }
</style>