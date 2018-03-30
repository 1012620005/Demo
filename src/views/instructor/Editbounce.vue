<template>
    <div class="viewBounce" >
        <div class="viewBounce-td clearfix">
            <!-- <button><img src="../../assets/img/duty/icon01.png" alt=""></button> -->
            <span class="view">值班情况</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form :model="forme" :rules="rules" ref="forme" label-width="93px" style="padding:0 20px;">
            <el-form-item label="值班情况：" prop="remarks" required>
                <el-input type="textarea" resize="none" v-model="forme.remarks" placeholder=""></el-input>
            </el-form-item> 
            <div class="ensure clearfix">
                <el-button type="primary" @click="saveForm('forme')">发布</el-button>
            </div>
        </el-form>
        <!-- <div class="viewBounce-bt">
            <form action="">
                <div class="views clearfix">
                    <div class="view clearfix">
                        <label for="">值班情况：</label>
                        <div class="edit_container">
                            <quill-editor v-model="infoForm.a_content" ref="myQuillEditor"
                                class="editer" @ready="onEditorReady($event)">
                            </quill-editor>
                        </div>
                    </div>
                    <div class="view clearfix">
                        <label for="">上传附件：</label>
                        <el-upload class="upload-demo" drag action="" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </div> 
                    <el-button type="primary" class="ensure">发布</el-button>
                </div>
            </form>
        </div> -->
    </div>	
</template>
<script> 
    // import { quillEditor } from 'vue-quill-editor' //调用编辑器
    import api from '../../apis/duty.js'
	export default {
        data() {
            return {
                // infoForm: {
                //     a_title: '',
                //     a_source: '',
                //     a_content:'',
                //     editorOption: {}
                // },
                //表单验证
            //     formc:{
            //         remarks:''
            //    },
                rules: {
                    // a_title: [
                    //     {required: true, message: '请输入标题', trigger: 'blur'}
                    // ],
                    // a_content: [
                    //     {required: true, message: '请输入详细内容', trigger: 'blur'}
                    // ]
                    remarks:[
                        {required: true, message: '请输入值班情况', trigger: 'blur'}
                    ]
                },
            };
        },
        props:{
            forme:{
                dutyGroupId:'',
                remarks:''
            }
        },
        computed: {
            // editor() {
            //     return this.$refs.myQuillEditor.quill
            // }
        },
        methods:{
            // 关闭弹框和遮罩
            closeBounce:function(){
                this.$emit("close")
            },
            saveForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) { 
                        let data={
                            'dutyGroupId':this.forme.dutyGroupId,
                            'remarks':this.forme.remarks
                        }
                        // var qs = require('querystring');
                        // let datax = qs.stringify(data);
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            api.putInsEdit(data).then(response=>{
                                if(response.data.meta.code == '200'){
                                    this.$message({
                                        message: '编辑成功',
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
                    }else{
                        return false;
                    }
                });
            }
        },
        // components:{
        //     quillEditor
        // }
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
            // padding-top:18px;
            // padding-bottom:36px;
            background:#eef1f6;
            padding:24px 20px 20px 20px;
            .view{
                float:left;
                button{
                    width:32px;
                    height: 32px;
                    line-height:32px;
                    border-radius:5px;
                    background:#b6d8fc;
                    text-align:center;
                    border:none;
                    margin-right:12px;
                    img{
                        vertical-align: middle;
                    }
                    span{
                        font-size:16px;
                        color:#000;
                    }
                }
            }
            .close{
                float:right;
                cursor:pointer;
                margin-top: 8px;
            }
        }
        // .view{
        //     margin-bottom:16px;
        //     label{
        //         float:left;
        //         width:16%;
        //         text-align:right;
        //     }
        //     .edit_container{
        //         width:84%;
        //         float:left;
        //         .ql-toolbar.ql-snow{
        //             border-top-left-radius: 5px;
        //             border-top-right-radius: 5px;
        //         }
        //     }
        //     .upload-demo{
        //         width:85%;
        //         float:left;
        //         .el-upload{
        //             width:85%;
        //             .el-upload-dragger{
        //                 width:85%;
        //             }
        //         }
        //     }
        //     .view-rt{
        //         float:left;
        //         width:81.6%;
        //         text-align:left;
        //     }
        // }
        .ensure{
            float:right;
            margin-bottom:14px;
        }
    }
</style>