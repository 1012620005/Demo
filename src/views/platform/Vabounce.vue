<template>
    <div class="sfaBounce">
        <div class="sfaBounce-td clearfix">
            <span class="add">预览问卷</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form label-width="82px" style="padding:16px 20px 0 20px;"> 
            <el-form-item label="发起人："> 
                <span>{{form.campus}}</span>                
            </el-form-item>
            <el-form-item label="结束时间：" > 
                <span>{{form.endTime}}</span>
            </el-form-item>
            <el-form-item label="问卷标题："> 
                <span>{{form.surveyTitle}}</span>             
            </el-form-item>
            <!-- 单选题 -->
            <div class="singchoice" style="padding-top:12px;border-top:1px solid #d2d2d2;">
                <h5>单选题</h5>
                <div class="sing" v-for='(items,index) in ques.quesOne' :key="index">
                    <h6>{{index+1+'、'+items.questionTiltle}}</h6>
                    <ul>
                        <li v-for="(item,index) in items.optionList" :key="index">{{zm[index]+'、'+item}}</li>
                    </ul>
                </div>
            </div>
            <!-- 多选题 -->
            <div class="singchoice">
                <h5>多选题</h5>
                <div class="sing" v-for='(items,index) in ques.quesTwo' :key="index">
                    <h6>{{index+1+'、'+items.questionTiltle}}</h6>
                    <ul>
                        <li v-for="(item,index) in items.optionList" :key="index">{{zm[index]+'、'+item}}</li>
                    </ul>
                </div>
            </div>
            <!-- 问答题 -->
            <div class="essayquest">
                <h5>问答题</h5>
                <div class="essay" v-for='(items,index) in ques.quesThr' :key="index">
                    <h6>{{index+1+'、'+items.questionTiltle}}</h6>
                    <span>{{items.answers}}</span>
                </div>
            </div>           
        </el-form>
    </div>	
</template>
<script>
    import api from '../../apis/platform.js'
	export default {
        data() {
            return { 
                zm:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
                form:{
                    campus:"",
                    endTime:"",
                    surveyTitle:"",
                    queNanswer:[]
                },
                ques:{
                   quesOne:[], 
                   quesTwo:[], 
                   quesThr:[], 
                }
            }
        },
        props:{
            formv:''
        },
        methods:{
            // 关闭弹框和遮罩
            closeBounce:function(){
                this.$emit("close")
            },
            getAnsView(){
                api.getAnsView(this.formv).then(response=>{
                    console.log(response);
                    console.log("4444444")
                    if(response.data.meta.code ==  '200'){
                        var res=response.data.data;
                        this.form.campus=res.campus;
                        this.form.endTime=res.endTime;
                        this.form.surveyTitle=res.surveyTitle;
                        this.form.queNanswer=res.queNanswer

                        let _this = this
                        this.form.queNanswer.map(function(item,index){
                            if(item.questionType == '1') _this.ques.quesOne.push(item);
                            if(item.questionType == '2') _this.ques.quesTwo.push(item);
                            if(item.questionType == '3') _this.ques.quesThr.push(item);
                        })
                        
                    }
                })
            }
        },
        mounted(){
            this.getAnsView();
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
                cursor:pointer;
                // margin-top:6px;
            }
            .close{
                float:right;
                cursor:pointer;
                margin-top:6px;
            }
        }
        h5{
            color:#208af5;
            font-size:16px;
            margin-bottom:20px;
        }
        .singchoice{
            margin-bottom:20px;
            .sing{
                h6{
                    font-weight:normal;
                    font-size:14px;
                    margin-bottom:24px;
                }
                ul{
                    margin-left:20px;
                    li{
                        margin-bottom:30px;
                    }
                }
            }
        }
        .essayquest{
            margin-bottom:50px;
            .essay{
                margin-bottom:18px;
                h6{
                    font-weight:normal;
                    font-size:14px;
                    margin-bottom:24px;
                }
                textarea{
                    width:85%;
                    height: 60px;
                    background:#fafafa;
                    resize: none;
                    outline: none;
                    padding-left:10px;
                    padding-top:10px;
                    margin-left:60px;
                }
            }
        }
    }
</style>