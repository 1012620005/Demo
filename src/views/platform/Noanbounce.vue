<template>
    <div class="sfaBounce">
        <div class="sfaBounce-td clearfix">
            <span class="add" v-if="formn.view !=='1'">调查问卷</span>
            <span class="add" v-else>预览问卷</span>
            <img class="close" @click="closeBounce()" src="../../assets/img/overtime/close.png" alt="">
        </div>
        <el-form label-width="82px" style="padding:16px 20px 0 20px;"> 
            <el-form-item label="发起人："> 
                <span>{{form.promoter}}</span>                
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
                <div v-if="ques.quesOne[0].questionTiltle==''?false:true" class="sing" v-for='(items,index) in ques.quesOne' :key="index">
                    <h6>{{index+1+'、'+items.questionTiltle}}</h6>
                    <el-radio-group v-model="nsing[index].questionOption" :disabled="formn.view =='1'" >
                        <el-radio style="margin-bottom:20px;"  :label="items.alpList[index]" v-for="(item,index) in items.options" :key="index">{{zm[index]+'、'+item}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <!-- 多选题 -->
            <div class="singchoice">
                <h5>多选题</h5>
                <div v-if="ques.quesTwo[0].questionTiltle==''?false:true" class="sing" v-for='(items,indexs) in ques.quesTwo' :key="indexs">
                    <h6>{{indexs+1+'、'+items.questionTiltle}}</h6>
                    <el-checkbox-group v-model="nmult[indexs].questionOption">
                        <el-checkbox style="margin-bottom:20px;" :label="items.alpList[index]" :disabled="formn.view =='1'" v-for="(item,index) in items.options" :key="index">{{zm[index]+'、'+item}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <!-- 问答题 -->
            <div class="essayquest">
                <h5>问答题</h5>
                <!-- <span>{{ques.quesThr}}</span> -->
                <div v-if="ques.quesThr[0].questionTiltle==''?false:true" class="essay" v-for='(items,index) in ques.quesThr' :key="index">
                    <h6>{{index+1+'、'+items.questionTiltle}}</h6>
                    <el-input resize="none" type="textarea" v-model="ess[index].questionOption" :disabled="formn.view =='1'"></el-input>
                </div>
            </div>  
            <el-form-item label="" class="adsBtn clearfix" > 
                <el-button class="save" style="float:right;" v-if="formn.view !=='1'" type="primary" @click="saveForm('ruleForm')">确定</el-button>
            </el-form-item>         
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
                    promoter:"",
                    endTime:"",
                    surveyTitle:"",
                    list:[],
                },
                ques:{
                   quesOne:[], 
                   quesTwo:[], 
                   quesThr:[], 
                },
                // 单选题
                nsing:[],
                // 多选题
                nmult:[],
                // 问答题
                ess:[],
            }
        },
        props:{
            formn:{
                surveyId:'',
                type:'',
                view:''
            }
        },
        methods:{
            // 关闭弹框和遮罩
            closeBounce:function(){
                this.$emit("close")
            },
            // 获取题型
            postQuView(){
                api.postQuView(this.formn.surveyId).then(response=>{
                    if(response.data.meta.code ==  '200'){
                        var res=response.data.data;
                        this.form.promoter=res.promoter;
                        this.form.endTime=res.endTime;
                        this.form.surveyTitle=res.surveyTitle;
                        this.form.list=res.list
                        return this.form.list
                    }
                }).then(d=>{
                    if(this.formn.type=='1'){
                        api.getAnsView(this.formn.surveyId).then(r=>{
                            if(r.data.meta.code ==  '200'){
                                let _this = this
                                _this.nsing =[];
                                _this.nmult =[];
                                _this.ess =[]
                                // console.log(r.data.data)
                                // console.log("33333")
                                r.data.data.queNanswer.map(function(item,index){
                                    if(item.questionType == '1'){  _this.nsing.push({'questionOption':item.answers,'questionUid':item.questionUid})}
                                    if(item.questionType == '2'){  _this.nmult.push({'questionOption':item.answerList,'questionUid':item.questionUid})}
                                    if(item.questionType == '3'){  _this.ess.push({'questionOption':item.answers,'questionUid':item.questionUid})}
                                })
                                r.data.data.queNanswer.map(function(item,index){
                                    if(item.questionType == '1'){ _this.ques.quesOne.push(item);}
                                    if(item.questionType == '2'){ _this.ques.quesTwo.push(item); }
                                    if(item.questionType == '3'){ _this.ques.quesThr.push(item);}
                                })
                            }
                        })
                    }else{
                        let _this = this
                        d.map(function(item,index){
                            if(item.questionType == '1'){ _this.nsing.push({'questionOption':'','questionUid':item.questionUid}), _this.ques.quesOne.push(item);}
                            if(item.questionType == '2'){ _this.nmult.push({'questionOption':[],'questionUid':item.questionUid}),_this.ques.quesTwo.push(item); }
                            if(item.questionType == '3'){ _this.ess.push({'questionOption':'','questionUid':item.questionUid}),_this.ques.quesThr.push(item);}
                        })
                    }
                })
            },
            saveForm(formName) {

                let nmult = JSON.parse(JSON.stringify(this.nmult))
                nmult=nmult.map(function(item){
                    let d = item.questionOption;
                    let w='';
                    let dlen = d.length;
                    for(let i=0;i<dlen;i++){
                        if(i==0){
                            w = d[i]
                        }else{
                            w = w+','+d[i]
                        }
                    }
                    item.questionOption =w
                    return item
                })

                let answer = this.nsing.concat(nmult,this.ess)

                if(this.formn.type=='1'){
                    //修改
                    let quesnew = this.ques.quesOne.concat(this.ques.quesTwo,this.ques.quesThr)
                    let answernew = answer.map(function(item,index){
                        return {'answerUid':quesnew[index].answerUid,'questionOption':item.questionOption}
                    })

                    // 修改弹框
                    let datam={
                        'modifyQ':JSON.stringify(answernew)
                    }
                    var qs = require('querystring');
                    let datamm = qs.stringify(datam);
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        api.postEditAns(this.formn.surveyId,datamm).then(response=>{
                            if(response.data.meta.code ==  '200'){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            }
                            this.$emit("close")
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });          
                    });
                }else{
                     // 回答弹框
                    let datan={
                        'answer':JSON.stringify(answer)
                    }
                    var qs = require('querystring');
                    let datann = qs.stringify(datan);
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        api.postAns(this.formn.surveyId,datann).then(response=>{
                            if(response.data.meta.code ==  '200'){
                                this.$message({
                                    message: '回答成功',
                                    type: 'success'
                                });
                            }
                            this.$emit("close")
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });          
                    });
                }

            }
        },
        mounted(){
            this.postQuView();
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
            // margin-bottom:20px;
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