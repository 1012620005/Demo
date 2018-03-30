<template>
    <div class="container">
        <fc-header></fc-header>
        <div class="content">
            <return-bar :title="title"></return-bar>
            <div class="fclass_set">
                <div class="fclass_tit">
                    <div class="titleft" @click="addfeat"><img src="../../../../assets/img/orientation/add.png" alt=""></div>
                    <div class="titright">
                        <el-form ref="form" label-width="85px">
                            <el-form-item label="专业名称：">
                                <el-select v-model="profname" value-key="id" clearable @change="getname">
                                    <el-option v-for="item in profess" :label="item.name" :value="item" :key="item.id">{{item.name}}</el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="fclass_box">
                    <template>
                        <el-table :data="tableData" style="width: 100%;">
                            <el-table-column label="序号" type="index"></el-table-column>
                            <el-table-column label="专业名称" prop="profName"></el-table-column>
                            <el-table-column label="特色班" prop="clazzName"></el-table-column>
                            <el-table-column label="年级" prop="gradeName"></el-table-column>
                            <el-table-column label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button size="mini" class="modify" @click="modify(scope.$index,scope.row)">修改</el-button>
                                    <el-button size="mini" type="danger" class="delet" @click="deletclass(scope.$index,scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="page.pageNo"
                            :page-size="page.pageSize"
                            layout="prev, pager, next, jumper"
                            :total="page.count">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加特色班 -->
        <el-dialog class="addfclass" :visible.sync="addfclass" width="35%">
            <div slot="title" class="afclass_tit" >
                <p>设置特色班</p>
            </div>
            <div class="afclass_box">
                <el-form ref="afform" :model="afform" label-width="80px">
                    <el-form-item label="专业：">
                        <el-select v-model="afform.prof" value-key="id" v-if="showIndex">
                            <el-option v-for="item in profess" :label="item.name" :value="item" :key="item.id">{{item.name}}</el-option>
                        </el-select>
                        <div v-if ="!showIndex">{{user.professional.name}}</div>
                    </el-form-item>
                    <div class="afeat" v-for="(item,index) in feat" :key="index">
                        <div class="afeat_main">
                            <el-form-item label="特色班：">
                                <el-input v-model="feat[index].featname"></el-input>
                            </el-form-item>
                            <el-form-item label="年级：">
                                <el-select v-model="feat[index].afgrade" value-key="id">
                                    <el-option v-for="items in grade" :label="items.name" :value="items" :key="items.id">{{items.name}}</el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="delete" v-if="index !== 0" @click="deletfeatclass(index)"><img src="../../../../assets/img/orientation/delete.png" alt=""></div>
                    </div>
                    <div class="addafeat" @click="addfeatclass" v-if="hidadd"><img src="../../../../assets/img/orientation/addyellow.png" alt=""></div>
                    <el-form-item class="afbtn">
                        <el-button type="primary" class="cancel" @click="canceldialog">取消</el-button>
                        <el-button type="primary" @click="afeatclass">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import fcHeader from '../../../common/header.vue'
    import returnBar from '../../../common/returnBar.vue'
    import api from '../../../../apis/orientation/recruitAdmin.js'

    export default {
        data () {
            return {
                title:'特色班设置',
                profname:'',
                tableData:[],
                addfclass:false,
                afform:{
                    prof:'',
                },
                profess:[],
                feat:[
                    {
                        featname:'',
                        afgrade:{}
                    }
                ],
                grade:[],
                // 分页
                page: {
                    pageSize: 10,
                    pageNo: 1,
                    count: 0
                },
                hidadd:true,
                user:{
                    professional:''
                },
                showIndex:true
            }
        },
        components:{
            fcHeader,
            returnBar
        },
        methods:{
            addfeat(){
                this.hidadd = true
                this.afform.prof='';
                this.feat=[
                    {
                        featname:'',
                        afgrade:{}
                    }
                ]
                this.addfclass = true;
            },
            // 获取所有专业
            loadAllprof(){
                api.loadProfess().then(response => {
                    if(response.data.meta.code == 200){
                        this.profess = response.data.data;
                    }
                })
                
            },
            getname(){
                this.loadTable();
            },
            loadTable(){
                let params = {
                    profId:this.profname.id,
                    pageNo: this.page.pageNo,
                    pageSize: this.page.pageSize,
                };
                console.log(this.profname)
                api.getAllFeaClazz(params).then(response => {
                    var meta = response.data.meta;
                    var mydata = response.data.data;
                    if(meta.code == 200){
                        this.tableData = mydata.list;
                        this.page.pageNo = mydata.pageNo;
                        this.page.pageSize = mydata.pageSize;
                        this.page.count = mydata.count;
                    }
                })
            },
            // 分页
            handleCurrentChange(val) {
                this.page.pageNo=val;
                this.loadTable();
            },
            // 加载年级
            loadGrade(){
                api.findAllGrade().then(response => {
                    if(response.data.meta.code == 200){
                        this.grade = response.data.data;
                    }
                })
            },
            addfeatclass(){
                this.afform.id=''
                let p = {
                    featname: '',
                    afgrade: {},
                    grade: []
                };
                this.feat.push(p);
            },
            deletfeatclass(index){
                this.feat.splice(index, 1);
            },
            canceldialog(){
                this.addfclass = false;
            },
            afeatclass(){
                let arrfeat = [];
                let arrafgrade = [];
                for(var i = 0; i < this.feat.length; i++){
                    var item = this.feat[i];
                    arrfeat.push(item.featname)
                    arrafgrade.push(item.afgrade.id)
                } 
                var clazz = arrfeat.join('@');
                var grade = arrafgrade.join('@');
                
                let addclazz = {
                    profId: this.afform.prof.id,
                    // profId: this.user.professional.id,
                    gradeId: grade,
                    clazzName:clazz,
                    id:this.afform.id
                }
                var qs = require('querystring')
                var data = qs.stringify(addclazz)
                console.log(data)
                if(this.afform.id !== ''){
                    api.modifFeaClazz(data).then(response => {
                        if(response.data.meta.code == 200){
                            api.getAllFeaClazz().then(response => {
                                var meta = response.data.meta;
                                var mydata = response.data.data;
                                if(meta.code == 200){
                                    this.tableData = mydata.list;
                                }
                            })
                        }
                    })
                }else{
                    api.addFeaClazz(data).then(response => {
                        var meta = response.data.meta
                        var mydata = response.data.data
                        if(meta.code == 200){
                            api.getAllFeaClazz().then(response => {
                                var meta = response.data.meta;
                                var mydata = response.data.data;
                                if(meta.code == 200){
                                    this.tableData = mydata.list;
                                }
                            })
                        }
                    })
                }
                
                this.addfclass = false;
            },
            deletclass(index,row){
                this.$confirm('是否确定删除此条招生计划？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let delet = {
                        id: row.id 
                    }
                    console.log('abcd')
                    console.log(delet)
                    this.tableData.splice(index,1);
                    api.deleteFeaClazz(delet).then(response => {
                        this.data = response.data.data;
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            modify(index,row){
                this.addfclass = true;
                this.hidadd = false;
                this.showIndex = false
                this.afform.id = row.id
                
                // this.afform.prof = {'name':row.profName,'id':row.profId}
                this.user.professional = {'name':row.profName,'id':row.profId}
                this.feat = [];
                this.feat.push({'featname': row.clazzName,'afgrade':{'name':row.gradeName,'id':row.gradeId}})
            }
        },
        computed:{
            
        },
        mounted () {
            this.loadAllprof();
            this.loadGrade();
            this.loadTable();
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .content{
        width:1200px;
        margin: 0 auto;
        .fclass_set{
            background:#fff;
            min-height: 740px;
            margin-top: 20px;
            padding: 20px 24px;
            .fclass_tit{
                overflow: hidden;
                .titleft{
                    float: left;
                    cursor: pointer;
                    margin-top: 10px;
                }
                .titright{
                    float: right;
                }
            }
            .fclass_box{
                .el-table{
                    .el-button{
                        width:44px;
                        height:24px;
                        // line-height: 24px;
                        text-align: center;
                        padding:0;
                    }
                    .modify{
                        background-color: #e2f0fe;
                        border: 1px solid #69b4ff;
                        color: #69b4ff;
                    }
                    .delet{
                        background-color: #ffdbdb;
                        border: 1px solid #f36d6e;
                        color: #f36d6e;
                    }
                }
                .block{
                    margin-top: 30px;
                    text-align: center;
                }
            }
        }
    }
    .addfclass{
        .afclass_box{
            .afeat{
                overflow: hidden;
                .afeat_main{
                    float: left;
                    .el-form-item{
                        float: left;
                    }
                }
                .delete{
                    height: 40px;
                    line-height: 40px;
                    margin-left: 22px;
                    float: left;
                    cursor: pointer;
                }
            }
            .addafeat{
                margin-left: 79px;
                cursor: pointer;
            }
            .afbtn{
                margin-top: 48px;
                text-align: center;
                button{
                    width: 96px;
                    height: 42px;
                }
                .cancel{
                    background-color: #d6d6d6;
                    border-color: #d6d6d6;
                    margin-left: -52px;
                    margin-right: 24px;
                }
            }
        }
    }
</style>

<style type="text/css" lang="scss">

</style>