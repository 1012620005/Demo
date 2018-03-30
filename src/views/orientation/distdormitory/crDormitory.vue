<template>
	<div class="contanier">
		<fc-header></fc-header>
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					宿舍详情
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="crdoms-main">
            <el-col :span="24" class="crdoms-top">
               <img src="../../../assets/img/orientation/creb.png" alt=""  @click="showCrdom">
            </el-col>
            <el-col :span="24" class="crdoms-bottom">
                <el-card class="box-card">
                    <div slot="header" class="crdom-header clearfix">
                        <span style="line-height: 20px;">{{buildInfo.campusName}}</span>
                        <span style="line-height: 20px;">{{buildInfo.name}}</span>
                        <!-- <span style="line-height: 20px;">{{buildInfo.sex == '1' ? '男' : buildInfo.sex == '1'}</span> -->
                        <span style="line-height: 20px;">共{{buildInfo.floors}}层</span>
                        <!-- <img src="../../../assets/img/orientation/delet.png" alt=""> -->
                    </div>
                    <div class="floor">
                        <ul class="flmain">
                            <li class="flsep" v-for="(floorList,index) in floorDormList">
                                <div class="flo">
                                    <div class="floornum">
                                        <span>{{index + 1}}层</span>
                                        <span v-if="floorList.length > 0 && floorList[0].sex == '1' "><img src="../../../assets/img/orientation/boy.png" alt=""></span>
                                        <span v-if="floorList.length > 0 && floorList[0].sex == '2' "><img src="../../../assets/img/orientation/girl.png" alt=""></span>
                                        <span v-if="floorList.length > 0 && floorList[0].sex == '3' " ><span class="imgScript refresh"></span>分配中</span>
                                        <span v-if="floorList.length > 0 && floorList[0].sex == '4' " ><span class="imgScript shenhe"></span>未分配</span>
                                        <!-- <span else>未分配</span> -->
                                        <!-- <i><img src="../../../assets/img/orientation/redact.png" alt="" @click="deleteAll(index+1)"> -->
                                        </i><i><img src="../../../assets/img/orientation/delet.png" alt="" @click="deleteDistrdom(index)"></i>
                                        <!-- <el-checkbox :indeterminate="isIndeterminate[index]" v-model="checkAll[index]" @change="handleCheckAllChange($event,index)" class="cheall">全选</el-checkbox> -->
                                    </div>
                                    <template>
                                        <div style="margin: 15px 0;"></div>
                                        <el-checkbox-group v-model="checkboxGroup[index]" value-key="id"  @change="handleCheckedCitiesChange(checkboxGroup[index],index)">
                                            <el-checkbox-button v-for="item in floorList" :label="item" :key="item.id" :value="item" :disabled="item.useBed != item.totalBed">
                                                {{item.name}}<p><span>{{item.totalBed - item.useBed}}</span><span>-</span><span>{{item.totalBed}}</span></p>
                                            </el-checkbox-button>
                                        </el-checkbox-group>
                                    </template>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!--创建宿舍弹框-->
        <el-dialog class="creafloor" :visible.sync="showCreafloor">
            <div slot="title" class="addclasses-cpm">
                <p>创建宿舍楼<span>提示：请输入阿拉伯数字</span></p>
            </div>
            <div class="cfmain">
                <el-form ref="form" label-width="88px">
                    <el-form-item label="楼层:">
                        <el-select v-model="createDormform.floor" placeholder="">
                            <el-option v-for="(floorList,index) in floorDormList" :value="index+1" :key="index">{{index + 1}}层</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="起止房间号:" class="roomnum">
                        <el-col :span="11">
                            <el-input v-model="createDormform.start"></el-input>
                        </el-col>
                        <el-col :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input v-model="createDormform.end"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="间床位:" class="roomnum">
                        <el-col :span="11">
                            <el-input v-model="createDormform.totalBed"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="btndorm">
                        <el-button type="primary" @click="addDormitory">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
	import fcHeader from '../../common/header.vue'
    import api from '../../../apis/orientation/distdormitory/dorManag.js'

	export default {
		data () {
			return {
                showCreafloor:false,
                checkAll:[],
                isIndeterminate:[],
                //选中需要移除的的宿舍
                checkboxGroup: [],
                //宿舍楼信息
                buildInfo : {},
                //宿舍楼中每一层的宿舍
                floorDormList: [],
                createDormform : {
                    buildId : '',
                    floor : '',
                    start : '',
                    totalBed : '',
                    end : ''
                },
            }
		},
		components:{
			fcHeader
		},
        methods:{
            showCrdom(){
                this.showCreafloor=true;
            },
            //批量创建宿舍
            addDormitory(){
                this.showCreafloor=false;
                var qs = require('querystring')
                var data = qs.stringify(this.createDormform)
                api.addDormitory(data).then(response =>{
                    var meta = response.data.meta;
                    var mydata = response.data.data;
                    if(meta.code == '200'){
                        api.getDormitoryByBuild(this.buildInfo.id).then(response =>{
                            var meta = response.data.meta;
                            var mydata = response.data.data;
                            if(meta.code == '200'){
                                this.floorDormList = mydata;
                                this.createDormform.buildId = this.buildInfo.id
                            }else{
                                this.$message.error(meta.message);
                            }    
                        })
                    }else{
                        this.$message.error(meta.message);
                    } 
                    this.createDormform = {
                        buildId : '',
                        floor : '',
                        start : '',
                        totalBed : '',
                        end : ''
                    }
                })
            },
            returnClick(){
                 this.$router.push({
                    name:'createDorm'
                })
            },
            //批量删除宿舍
            deleteDistrdom(index){
                var stringList = [];
                for(var i = 0; i < this.checkboxGroup[index].length; i++){
                    var obj = {
                        id : this.checkboxGroup[index][i].id
                    }
                    stringList.push(obj)
                }
                console.log("haha")
                console.log(this.checkboxGroup[index])
                this.checkboxGroup[index] = [];
                var data = {'stringList':JSON.stringify(stringList)}
                var qs = require('querystring')
                data = qs.stringify(data)
                api.deleteDistrdom(data).then(response =>{
                    var meta = response.data.meta;
                    var mydata = response.data.data;
                    if(meta.code == '200'){
                        let params = {
                            buildId : this.buildInfo.id,
                            floor : index+1
                        }
                        api.getDormitoryByBuild(this.buildInfo.id).then(response =>{
                            var meta = response.data.meta;
                            var mydata = response.data.data;
                            if(meta.code == '200'){
                                this.floorDormList = mydata;
                                this.checkboxGroup = new Array(mydata.length);
                                this.checkAll = new Array(mydata.length);
                                this.isIndeterminate = new Array(mydata.length);
                                for(var i = 0; i < this.checkboxGroup.length; i++){
                                    this.checkboxGroup[i] = []
                                    this.checkAll[i] = false;
                                    this.isIndeterminate[i] = false;
                                }
                                this.createDormform.buildId = this.buildInfo.id
                            }else{
                                this.$message.error(meta.message);
                            }    
                        })
                        // api.getDormitoryByBuildAndFloor(params).then(response =>{
                        //     var meta = response.data.meta;
                        //     var mydata = response.data.data;
                        //     if(meta.code == '200'){
                        //         this.floorDormList[index] = this.floorDormList[index].splice(0,this.floorDormList[index].length)
                        //         this.floorDormList[index] = mydata;
                        //         console.log(this.floorDormList)
                        //     }
                        // })
                    }else{
                        this.$message.error(meta.message);
                    }    
                })
            },
            //删除一层宿舍
            deleteAll(index){
                api.deleteDormByFloor(this.buildInfo.id,index).then(response =>{
                    var meta = response.data.meta;
                    var mydata = response.data.data;
                    if(meta.code == '200'){
                        this.floorDormList[index-1].splice(0,this.floorDormList[index-1].length);
                    }else{
                        this.$message.error(meta.message);
                    }    
                })
            },
            //宿舍选中框
            handleCheckedCitiesChange(val,index){
                console.log(val);
                let checkedCount = val.length;
                this.checkAll[index] = checkedCount === this.floorDormList[index].length;
                this.isIndeterminate[index] = checkedCount > 0 && checkedCount < this.floorDormList[index].length;
            },
            handleCheckAllChange(event,index) {
                this.checkboxGroup[index] = event.target.checked ? this.floorDormList[index] : [];
                this.isIndeterminate[index] = false;
            },
        },
        computed:{
            
        },
        mounted () {
            this.buildInfo = this.$route.query.buildInfo
            api.getDormitoryByBuild(this.buildInfo.id).then(response =>{
                var meta = response.data.meta;
                var mydata = response.data.data;
                if(meta.code == '200'){
                    this.floorDormList = mydata;
                    this.checkboxGroup = new Array(mydata.length);
                    this.checkAll = new Array(mydata.length);
                    this.isIndeterminate = new Array(mydata.length);
                    for(var i = 0; i < this.checkboxGroup.length; i++){
                        this.checkboxGroup[i] = []
                        this.checkAll[i] = false;
                        this.isIndeterminate[i] = false;
                    }
                    this.createDormform.buildId = this.buildInfo.id
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
        .crdoms-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 32px;
            .crdoms-top{cursor: pointer;}
            .crdoms-bottom{
                .box-card{
                    .crdom-header{
                        img{
                            float: right;
                            cursor: pointer;
                        }
                    }
                }
                margin-top: 14px;
                .floor{
                    .flsep{
                        border-bottom: 1px solid #dfe6ec;
                        height: 150px;
                        overflow-y: auto;
                    }
                    .flsep:last-child{
                        border-bottom:0;
                    }
                    .flo{
                        margin:10px 10px 0 10px;
                        .floornum{
                            margin-bottom: 15px;
                            overflow: hidden;
                            span{display: inline-block;}
                            i{
                                display: inline-block;
                                margin-left: 22px;
                            }
                            .cheall{
                                float: right;
                            }
                        }
                        .el-checkbox-group{
                            height:60px;
                        }
                        .el-checkbox-button{
                            height:48px;
                            margin-bottom: 8px;
                        }
                        .el-checkbox-button, .el-checkbox-button__inner{
                            margin-right: 8px;
                        }
                        .el-checkbox-button:first-child .el-checkbox-button__inner{
                            border-radius: 0;
                            border: 0;
                        }
                        .el-checkbox-button__inner{
                            border:0;
                            background-color: #deeeff;
                            position: relative;
                            border-radius: 8px !important;
                            padding: 0;
                            width:46px;
                            height: 20px;
                            line-height: 20px;
                            text-align: center;
                            border-radius: 8px;
                        }
                        p{
                            position: absolute;
                            bottom: -20px;
                            left:10px;
                        }
                        .el-checkbox-button.is-checked .el-checkbox-button__inner{
                            background-color: #208af5 !important;
                            color:#fff;
                            box-shadow:0 0;
                            p{color:#333;}
                        }
                    }
                }
            }
        }
        .creafloor{
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
                span{
                    color:#ef0000;
                    margin-left: 14px;
                }
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
                    img{float: left}
                    span{
                        display: inline-block;
                        margin-left: 14px;
                        color:#ef0000;
                        float: left;
                    }
                }
                .infor-close{
                    float: right;
                    cursor: pointer;
                }
            }
            .cfmain{
                .roomnum{
                    float: left;
                    width:50%;
                    .el-form-item__label{
                        float: left;
                    }
                    .el-form-item__content{
                        float: left;
                        margin-left: 0 !important;
                        width: 60%;
                    }
                }
                .el-col-2{text-align: center;}
                .funpoint{
                    float: right;
                    overflow: hidden;
                    img{margin-left: 14px;}
                }
                .btndorm{
                    float: right;
                    // margin-top: 26px;
                    button{
                        width: 96px;
                        height:42px;
                    }
                }
            }
        }
</style>
<style type="text/css" lang="scss">
    .crdoms-main{
        .el-card{
            box-shadow: 0 0;
            .el-card__header{
                background-color: #deeeff;
            }
        }
        .el-card__body{
            padding:0;
        }
        .el-checkbox-button__inner{
            border:0;
            border-radius:13px;
            background-color:#e6e6e6;
            padding:6px 13px;
        }
        .el-checkbox-button:first-child .el-checkbox-button__inner{
            border-radius:13px;
        }
        .el-checkbox-button:last-child .el-checkbox-button__inner{
            border-radius:13px;
        }
    }
    .creafloor{
        .el-dialog__header,.el-dialog__body{
            overflow: hidden;
        }
    }
</style>
