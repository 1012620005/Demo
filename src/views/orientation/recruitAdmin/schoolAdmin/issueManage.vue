<template>
    <div class="contanier">
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					物品发布管理
				</div>
				<div class="tabright">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <el-row :span="24" class="issue-main">
            <el-tabs type="border-card">
                <el-tab-pane label="必缴费业务">
                    <div class="add-cost" @click="addConst">
                        <img src="../../../../assets/img/orientation/addpay.png" alt="">
                    </div>
                    <ul class="cost-cont">
                        <li class="costmain" v-for="(item,index) in addList">
                            <img src="../../../../assets/img/orientation/lodge.png" alt="">
                            <h4>{{item.name}}</h4>
                            <p>费用：{{item.cost}}</p>
                            <div class="hovfunct">
                                <div><img src="../../../../assets/img/orientation/modif.png" alt="" @click="modifcation(item)"></div>
                                <div><img src="../../../../assets/img/orientation/lower.png" alt=""></div>
                            </div>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="物品预定管理">
                    <div class="add-cost" @click="addArtic">
                        <img src="../../../../assets/img/orientation/addart.png" alt="">
                    </div>
                    <ul class="article">
                        <li class="art-main">
                            <div class="artimg">
                                <img src="../../../../assets/img/orientation/military.png" class="artpho" alt="">
                                <div class="hovfunct">
                                    <div><img src="../../../../assets/img/orientation/modif.png" alt=""></div>
                                    <div><img src="../../../../assets/img/orientation/lower.png" alt=""></div>
                                </div>
                            </div>
                            <div class="artname">
                                军训服 <i>69元</i>
                            </div>
                            <div class="specif">
                                <p>规格</p>
                                <el-checkbox-group v-model="checkboxGroup3" size="small">
                                    <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                                </el-checkbox-group>
                            </div>
                            <div class="artnum">
                                <p>数量</p>
                                <template class="numbs">
                                    <el-input-number v-model="num1" @change="handleChange" :min="0" :max="10"></el-input-number>
                                </template>
                            </div>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </el-row>   
        <!-- 添加缴费业务 -->
        <el-dialog :visible.sync="showAddcost" class="addcosts">
            <div slot="title" class="addclasses-cpm" >
                <!-- <img src="../../../../assets/image/addstudent2.png" /> -->
                <p>添加缴费业务</p>
            </div>
            <el-form :label-position="labelPosition" label-width="88px" :model="form">
                <el-form-item label="业务名称：">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="缩略图：">
                    <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button type="primary" class="thum">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
                <el-form-item label="价格：">
                    <el-input v-model="form.cost"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="submit" @click="submitList()">提交</el-button>
        </el-dialog>
        <!-- 添加物品 -->
        <el-dialog :visible.sync="showArticle" class="articles">
            <div slot="title" class="addclasses-cpm" >
                <!-- <img src="../../../../assets/image/addstudent2.png" /> -->
                <p>添加物品</p>
            </div>
            <el-form :label-position="labelPosition" label-width="88px" :model="form2">
                <el-form-item label="业务名称：">
                    <el-input v-model="form2.name"></el-input>
                </el-form-item>
                <el-form-item label="缩略图：">
                    <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button type="primary" class="thum">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
                <el-form-item label="价格：">
                    <el-input v-model="form2.type"></el-input>
                </el-form-item>
                <el-form-item label="标签设置：" class="labset">
                    <div>
                        <el-form :label-position="labelPosition" label-width="80px" :model="formLabel">
                            <el-form-item label="标签：">
                                <el-input v-model="formLabel.name"></el-input>
                            </el-form-item>
                            <el-form-item label="数量：">
                                <el-input v-model="formLabel.region"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-form-item>
            </el-form>
            <div class="labelsets">
                <div class="labelset">
                    <div><img src="../../../../assets/img/orientation/addlabel.png" alt=""></div>
                    <div><img src="../../../../assets/img/orientation/dellabel.png" alt=""></div>
                </div>
            </div>
                <el-button type="primary" class="submit">提交</el-button>
            
        </el-dialog>
    </div>
</template>
<script type="text/javascript">
    import fcHeader from '../../../common/header.vue'
    import api from '../../../../apis/orientation/issueManage.js'

    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        data () {
            return {
                showAddcost:false,
                showAddcostmodif:false,
                labelPosition: 'right',
                form: {
                    name: '',
                    cost: ''
                },
                form2:{
                    name:'',
                    type:''
                },
                addList:[],
                checkboxGroup3:[],
                fileList:[],
                cities: cityOptions,
                handleRemove(file, fileList) {
                    console.log(file, fileList);
                },
                handlePreview(file) {
                    console.log(file);
                },
                handleExceed(files, fileList) {
                    this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
                },
                num1:'0',
                handleChange(value) {
                    console.log(value);
                },
                showArticle:false,
                formLabel:{
                    name:'',
                    region:''
                }
            }
        },
        components:{
			fcHeader
        },
        methods:{
            addConst(){
                this.showAddcost = true;
            },
            addArtic(){
                this.showArticle = true;
            },

            // 添加业务
            submitList(item){
                var mustLists = {
                    'name': this.form.name,
                    'cost': this.form.cost,
                    'categoryId': 1,
                    'isMust': 1,
                    'standerd': 1,
                    'sort': 1,
                }
                var params = new FormData();
                params.append('string', JSON.stringify(mustLists));
                api.addPayItem(params).then(response=>{
                    console.log(response);
                    var meta = response.data.meta;
                    var mydata = response.data.data;
                    if(meta.code == '200'){
                        this.addList.push(mydata);
                        this.showAddcost = false;
                        this.form.addPayItemname = '';
                        this.form.cost = '';
                    }
                })
            },
            // 修改必缴
            modifcation(item){
                this.showAddcost = true;
                var par = {
                    id: item.id
                }
                this.form.name = item.name
                this.form.cost = item.cost;
                this.form.id = item.id;
                console.log(this.form.id);
            }
        },
        computed:{
        
        },
        mounted () {
            // 一进页面加载必缴项
            api.allPayItem().then(response=>{
                console.log(response)
                var meta = response.data.meta;
                var mydata = response.data.data;
                if(meta.code == '200'){
                    this.addList = mydata.mustList;
                }
            })
        }
    }
</script>
<style type="text/css" lang="scss">
    // 顶部标签
    .table-box{
        width:1200px;
        margin: 0 auto;
        .tabtop{
            height: 55px;
            margin-top: 7px;
            background-color: #fff;
            border-radius: 4px;
            padding: 0 24px;
            .tableft{
                float: left;
                line-height: 55px;
            }
            .tabright{
                float: right;
                height: 15px;
                // line-height: 55px;
                margin-top: 7px;
                cursor: pointer;
                overflow: hidden;
                margin-top: 18px;
                span{
                    display: inline-block;
                    // float: right;
                }
                i{	
                    width: 9px;
                    height: 15px;
                    display: inline-block;
                    float: right;
                    margin-left: 6px;
                }
            }
        }
    }
    .issue-main{
        width:1200px;
        margin: 0 auto;
        min-height: 740px;
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: 32px;
        margin-top: 16px;
        .el-popover, .el-tabs--border-card{
            box-shadow: 0 0;
        }
        .el-tabs__header{
            border-bottom: 1px solid #d1dbe5 !important;
        }
        .el-tabs--border-card{
            border: 0;
        }
        .el-tabs__item{
            height: 40px !important;
            line-height: 40px !important;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item{
            border-top: 1px solid transparent;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
            border-top-color:#d1dbe5;
        }
        .el-tabs__content{
            min-height: 700px;
        }
        .el-tabs--border-card>.el-tabs__content{
            padding: 24px;
        }
        .add-cost{
            cursor: pointer;
        }
        .cost-cont{
            margin-top: 20px;
            .costmain{
                width:200px;
                height: 240px;
                background-color: #fbfcfd;
                margin-right: 30px;
                margin-bottom: 20px;
                text-align: center;
                position: relative;
                float: left;
                img{
                    margin-top: 22px;
                }
                h4{
                    font-size: 16px;
                    margin-top: 16px;
                    margin-bottom: 14px;
                }
                p{
                    font-size: 14px;
                }
                .hovfunct{
                    position: absolute;
                    top: 0;
                    right: 10px;
                    display: none;
                    div{
                        img{
                            margin-top: 10px;
                            cursor: pointer;
                        }
                    }
                }
            }
            .costmain:hover{
                .hovfunct{
                    display: block;
                }
            }
        }
        .article{
            .art-main{
                margin-top: 20px;
                float: left;
                margin-right: 30px;
                margin-bottom: 20px;
                .artimg{
                    overflow: hidden;
                    .artpho{
                        width:140px;
                        height:160px;
                        float: left;
                    }
                    .hovfunct{
                        float: left;
                        margin-left: 22px;
                        div{
                            margin-bottom: 10px;
                        }
                    }
                }
                .artname{
                    width:140px;
                    overflow: hidden;
                    margin-top: 16px;
                    i{
                        color:#ef0000;
                        display: inline-block;
                        float: right;
                    }
                }
                .specif{
                    margin-top: 24px;
                    margin-bottom: 26px;
                    overflow: hidden;
                    height:30px;
                    line-height: 30px;
                    p{
                        float: left;
                        margin-right: 10px;
                    }
                    .el-checkbox-group{
                        display: inline-block;
                    }
                    .el-checkbox-button{
                        height: 30px;
                        .el-radio-button__inner{
                            
                        }
                        .el-checkbox-button__inner{
                            border-radius: 4px;
                            padding:8px;
                            border: 0;
                            background-color: #eef1f6;
                            margin-right: 14px;
                        }
                    }
                    .el-checkbox-button.is-checked{
                        .el-checkbox-button__inner{
                            background-color: #208af5;
                        }
                    }
                }
                .artnum{
                    overflow: hidden;
                    p{
                        float: left;
                        margin-right: 10px;
                        height: 36px;
                        line-height: 36px;
                    }
                    .el-input-number{
                        float: left;
                    }
                }
            }
        }
    }
    // 添加缴费业务
    .addcosts{
        .el-dialog--small{
            width: 30%;
        }
        .el-dialog__body{
            padding: 20px;
            overflow: hidden;
        }
        .addclasses-cpm{
            display:inline-block;
            float: left;
        }
        .addclasses-cpm p{
            display:inline-block;
            margin-left:10px;
        }
        .addclasses-cpm img{
            vertical-align: middle;
        }
        .el-form-item__content{
            width:45%;
        }
        .thum{
            background-color:transparent;
            border-color: transparent;
            color: #208af5;
            text-decoration: underline;
        }
        .submit{
            width:96px;
            height: 42px;
            float: right;
        }   
    }
    // 添加物品
    .articles{
        .el-dialog--small{
            width: 30%;
        }
        .el-dialog__body{
            padding: 20px;
            overflow: hidden;
        }
        .addclasses-cpm{
            display:inline-block;
            float: left;
        }
        .addclasses-cpm p{
            display:inline-block;
            margin-left:10px;
        }
        .addclasses-cpm img{
            vertical-align: middle;
        }
        .el-form-item__content{
            width:45%;
        }
        .thum{
            background-color:transparent;
            border-color: transparent;
            color: #208af5;
            text-decoration: underline;
        }
        .labset>.el-form-item__content{
            width:83%;
            height: 110px;
            background-color: #fafafa;
        }
        .labset{
            .el-form-item{
                margin-top: 12px;
            }
        }
        .labelsets{
            width:100%;
            height: 26px;
            margin-bottom:0;
            .labelset{
                float: right;
                margin-top: 6px;
                overflow: hidden;
                div{
                    float: left;
                    margin-left: 16px;
                }
            }
        }
        .submit{
            width:96px;
            height: 42px;
            float: right;
            margin-top: 74px;
        }   
    }
</style>