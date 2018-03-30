<template>
	<div class="contanier">
        <fc-header></fc-header>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					创建宿舍
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="credorm-main">
            <el-col :span="24" class="credorm-top clearfix">
                <div class="crleft" @click="crbuild"><img src="../../../assets/img/orientation/creassl.png" alt=""></div>
                <el-form ref="form" label-width="90px" class="crright">
                    <el-form-item label="校区">
                        <el-select v-model="pageCampus" value-key="id" placeholder="" @change="getDormBuildByCampus">
                            <el-option v-for="item in campusList" :key="item.id" :label="item.name" :value="item" >{{item.name}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" class="credorm-bottom clearfix">
                <ul >
                    <li class="onecre" v-for="(item, index) in buildList">
                        <ul> 
                            <li class="dormpho"><img src="../../../assets/img/orientation/lodge.png" alt=""></li>
                            <li v-if="item.sex == null || item.sex == '' "></li>
                            <li v-if="item.sex == '1' "><img src="../../../assets/img/orientation/boy.png" alt=""></li>
                            <li v-if="item.sex == '2' "><img src="../../../assets/img/orientation/girl.png" alt=""></li>
                            <li v-if="item.sex == '3' ">
                                <img src="../../../assets/img/orientation/boy.png" alt="">
                                <img src="../../../assets/img/orientation/girl.png" alt="">
                            </li>
                            <li>{{item.campusName}}</li>
                            <li><h4>{{item.name}}</h4></li>
                            <li>楼层数：<span>{{item.floors}}层</span></li>
                            <li class="crdormyello" @click="createDorm(item)"><img src="../../../assets/img/orientation/cre.png" alt=""></li>
                        </ul>
                        <div class="suspedit">
                            <p><img src="../../../assets/img/orientation/modif.png" alt="" @click="modifBuild(item,index)"></p>
                            <p><img src="../../../assets/img/orientation/deleteb.png" alt="" @click="deleBuild(item,index)"></p>
                        </div>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <!--创建宿舍楼弹窗-->
        <el-dialog class="crdormpop" :visible.sync="showCrdormpop">
            <div slot="title" class="addclasses-cpm">
                <!-- <img src="../../../assets/image/addstudent2.png" /> -->
                <p>创建宿舍楼</p>
            </div>
            <el-form ref="form" label-width="80px">
                <el-form-item label="校区：">
                    <el-select v-model="buildInfo.campus.id" placeholder="请选择校区">
                        <el-option v-for="item in campusList" :key="item.id" :label="item.name" :value="item.id" >{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="楼名称：" class="buildn">
                    <el-input v-model="buildInfo.name" :value="buildInfo.name" :label="buildInfo.name">{{buildInfo.name}}</el-input>
                </el-form-item>
                <el-form-item label="楼层数：" class="buildn">
                    <el-input v-model="buildInfo.floors"></el-input>
                </el-form-item>
                <el-form-item class="deter">
                    <el-button type="primary" @click="addModifDormBuild">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--修改宿舍楼弹窗-->
        <el-dialog class="crdormpop" :visible.sync="showModif">
            <div slot="title" class="addclasses-cpm">
                <!-- <img src="../../../assets/image/addstudent2.png" /> -->
                <p>修改宿舍楼</p>
            </div>
            <el-form ref="form" label-width="80px">
                <el-form-item label="校区：">
                    <el-select v-model="buildInfo.campus" value-key="id" placeholder="请选择校区">
                        <el-option v-for="item in campusList" :key="item.id" :label="item.name" :value="item" >{{item.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="楼名称：" class="buildn">
                    <el-input v-model="buildInfo.name" :value="buildInfo.name" :label="buildInfo.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="性别：">
                    <el-radio v-for="sex in sexDictList" :label="sex.value" v-model="buildInfo.sex">{{sex.label}}</el-radio>
                </el-form-item> -->
                <el-form-item label="楼层数：" class="buildn">
                    <el-input v-model="buildInfo.floors" :value="buildInfo.floors" :label="buildInfo.floors"></el-input>
                </el-form-item>
                <el-form-item class="deter">
                    <el-button type="primary" @click="addModifDormBuild">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
    import fcHeader from '../../common/header.vue'
    import api from '../../../apis/orientation/distdormitory/dorManag.js'

	export default {
		data () {
			return {
                //页面校区下拉框
                pageCampus : {
                    id : '',
                    name : ''
                },
                buildList : [],
                campusList : [],
                //创建宿舍楼专用
                buildInfo : {
                    campus : {
                        id : '',
                        name : ''
                    },
                    id : '',
                    name : '',
                    floors : '',
                    // sex : ''
                },
                //性别字典
                sexDictList : [],
                //标记修改的宿舍楼
                modifIndex : -1,
                showDesk:false,
                showCrdormpop:false,
                showModif:false,
            }
		},
		components:{
			fcHeader
		},
        methods:{
            crbuild(){
                this.showCrdormpop=true;
                this.buildInfo = {
                    campus : {
                        id : '',
                        name : ''
                    },
                    id : '',
                    name : '',
                    floors : '',
                    sex : ''
                };
            },
            // 修改宿舍楼弹窗
            modifBuild(item,index){
                this.showModif=true;
                this.buildInfo = {
                    campus : {
                        id : item.campusId,
                        name : item.campusName
                    },
                    id : item.id,
                    name : item.name,
                    floors : item.floors,
                    sex : item.sex
                }
                this.modifIndex = index;
            },
            //通过校区加载宿舍楼
            getDormBuildByCampus(item){
                let params = {campusId : item.id}
                api.getDormBuildByWhere(params).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200') {
                         this.buildList = mydata;                   
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            //添加宿舍楼
            addModifDormBuild(){
                //关闭弹窗
                this.showCrdormpop=false;
                this.showModif=false;
                this.buildInfo.campusId = this.buildInfo.campus.id;
                var qs = require('querystring')
                var data = qs.stringify(this.buildInfo)
                api.addModifDormBuild(data).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == '200' && mydata != null) {
                        if(this.buildInfo.id != null && this.buildInfo.id != ''){
                            this.buildList.splice(this.modifIndex,1,mydata);
                        }else{
                            this.buildList.push(mydata);
                        }
                    }else{
                        this.$message.error(meta.message);
                    }
                })
            },
            //删除宿舍楼
            deleBuild(val,index){
                this.$confirm('是否确定删除此宿舍楼', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {id : val.id}
                    api.deleteDormBuild(params).then(response =>{
                        var meta = response.data.meta
                        var mydata = response.data.data;
                        if(meta.code == '200') {
                            this.buildList.splice(index,1);                   
                        }else{
                            this.$message.error(meta.message);
                        }
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
            // 点击创建宿舍跳转
            createDorm(item){
                this.$router.push({
                    name:'crDormitory',
                    query:{
                        buildInfo : item
                    }
                })
            },
            returnClick(){
                this.$router.push({
                    name:'newIndex'
                })
            }
        },
        computed:{
            
        },
        mounted () {
            //加载所有的宿舍楼
            api.getDormBuildByWhere().then(response =>{
                if(response.data.meta.code) {
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if (meta.code == '200') {
                        this.buildList = mydata;
                    }else{
                        this.$message.error(meta.message);
                    }                    
                }
            }),
            // api.getSexDictList({type : 'sex'}).then(response =>{
            //     var meta = response.data.meta
            //     var mydata = response.data.data;
            //     if (meta.code == '200') {
            //         console.log(mydata)
            //         this.sexDictList = mydata;
            //     }else{
            //         this.$message.error(meta.message);
            //     }                    
            // }),
            //加载校区下拉框 
            api.loadSelect({id : '1',type : '4'}).then(response =>{
                var meta = response.data.meta
                var mydata = response.data.data;
                if (meta.code == '200') {
                    console.log(mydata)
                    this.campusList = mydata;
                }else{
                    this.$message.error(meta.message);
                }                    
            })
        }
	}
</script>
<style type="text/css" lang="scss" scoped>
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
                    color:#208af5;
                    font-size:16px;
                    border-bottom:2px solid #208af5;
                    font-weight: bold;
                }
                .tabright{
                    float: right;
                    margin-top: 7px;
                    cursor: pointer;
                    overflow: hidden;
                    margin-top: 18px;
                    span{
                        display: inline-block;
                    }
                    i{	
                        width: 9px;
                        height: 15px;
                        display: inline-block;
                        float: right;
                        margin-left: 6px;
                        margin-top: 2px;
                    }
                }
            }
        }
        // 主体内容
        .credorm-main{
            width:1200px;
            margin: 0 auto;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            // overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            margin-top: 20px;
            .credorm-top{
                .crleft{
                    float: left;
                    height:36px;
                    line-height: 36px;
                    padding-top: 3px;
                    cursor: pointer;
                }
                .crright{float:left}
            }
            .credorm-bottom{
                .onecre{
                    width: 200px;
                    height: 250px;
                    background-color: #fbfcfd;
                    float: left;
                    margin-right: 30px;
                    margin-bottom: 24px;
                    position: relative;
                    ul{
                        text-align: center;
                        li{
                            margin-bottom: 6px;
                            h4{font-size: 15px;}
                            i{color:#ef0000;}
                        }
                        .dormpho{
                            margin-top: 20px;
                        }
                        .crdormyello{
                            cursor: pointer;
                        }
                    }
                    .suspedit{
                        position: absolute;
                        top: 15px;
                        right: 8px;
                        display:none;
                        z-index: 1;
                        p{
                            cursor: pointer;
                            margin-bottom: 6px;
                        }
                    }
                }
                .onecre:hover{
                    box-shadow: 0 0 6px #c7e2fc;
                    .suspedit{
                        display:block;
                    }
                }
            }
        }
        // 创建宿舍楼弹窗
        .crdormpop{
            .el-dialog--small{
                width: 28.5%;
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
            .infor-top{
                overflow: hidden;
                height: 32px;
                line-height: 32px;
                margin-bottom: 34px;
                .infor-cluster{
                    float: left;
                }
                .infor-close{
                    float: right;
                    cursor: pointer;
                }
            }
            .buildn{
                .el-form-item__content{
                    width:49.5%;
                }
            }
            .deter{
                float: right;
                button{
                    width: 96px;
                    height:42px;
                }
            }
        }
        
</style>
<style type="text/css" lang="scss"> 
    .crdormpop{
        .el-dialog__header,.el-dialog__body{
            overflow: hidden;
        }
    }
</style>
