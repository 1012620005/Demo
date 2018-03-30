<template>
    <div class="aidstu clearfix">
        <!-- 工具 -->
        <div class="aids-sel clearfix">
            <div class="sel-lt ">
                <div class="sel-overtime sel clearfix" @click="showBounce()">
                    <i></i>
                    <span>添加值班</span>
                </div>
                <div class="sel-sch sel">
                    <span>校区</span>
                    <el-select v-model="campsel.value" placeholder="校区" class="smllSel" @change="getDuList">
                        <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <!-- 选择时间 -->
                <div class="sel-time sel">
                    <span>选择时间</span>
                    <el-date-picker v-model="dutyStartTime" type="datetime" placeholder="开始时间">
                    </el-date-picker>
                    <el-date-picker v-model="dutyEndTime" :picker-options="endDateOpt" type="datetime" placeholder="结束时间">
                    </el-date-picker>
                    <el-button type="primary" @click="getDuList">确定</el-button>
                </div>
                <!-- 搜索 -->
                <!-- <div class="sel-search sel">
                    <el-input v-model="input1" placeholder="请输入教职工姓名"></el-input>
                    <img src="../../assets/img/overtime/search.png" alt="">                                    
                </div> -->
            </div>
            <div class="print clearfix">
                <i></i>
                <span>打印</span>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="schooleZoneName" label="校区">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.schooleZoneName | filterFun }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="dutyPlace" label="值班地点">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.dutyPlace | filterFun }} 
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="dutyContent" label="值班内容">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.dutyContent | filterFun }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="dutyStartTime" label="开始时间">
            </el-table-column>
            <el-table-column prop="dutyEndTime" label="结束时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div class="handle">
                        <img src="../../assets/img/duty/view.png" alt="" class="view" @click="viewBounce(scope.row)">
                        <!-- <img src="../../assets/img/overtime/edit.png" alt="" class="edit" @click="showeditBounce(scope.row)">  -->
                        <!-- <img src="../../assets/img/overtime/del.png" alt="" class="del" @click="deleteRow(scope.row)">  -->
                    </div>      	  
                </template>
            </el-table-column>
        </el-table> 
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="prev, pager, next, jumper"
            :total="total" style="text-align:center;" class="toolbar">
        </el-pagination>
        <!-- 遮罩 -->
        <div class="mask" v-show="or"></div>
        <!-- 添加值班弹框 -->
        <duli-bounce :formx="form" v-if="add" @close="close"></duli-bounce> 
        <!-- 查看详情弹框 -->
        <duliv-bounce :formv="id" v-if="view" @close="close"></duliv-bounce>
    </div>
</template>
<script>
    import duliBounce from './dulibounce.vue'
    import dulivBounce from './dulivbounce.vue'
    import api from '../../apis/duty.js'
    import ap from '../../apis/common.js'
    export default {
        data() {
            return {
                // 日期
                dutyStartTime: '',
                dutyEndTime: '',
                endDateOpt: {
                    disabledDate: (time) => {
                        return time.getTime() < this.dutyStartTime;   
                    }
                },
                // 校区
                campsel:{
                    options: [],
                    value: '',
                },
                // 表格数据
                tableData: [],
                loading: false,
                // 搜索
                // input1:'',
                // 当前页
                currentPage: 1,
                total:0,
                // 是否显示
                or:false,
                add:false,
                view:false,
                id:"",
                form: {
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
            }
        },
        components:{
            duliBounce,
            dulivBounce
        },
        filters: {  
            filterFun: function (value) {  
                if(value !== null){
                    return value.split("").length>8?value.substring(0,8)+"...":value 
                }else{
                   return value 
                }
            }  
        },
        methods:{
            // 分页
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getDuList();
            },
            //关闭弹框和遮罩
            close(){
                this.or=false;
                this.add=false;
                this.view=false;
                this.clearform();
            },
            clearform(){
                this.or = false;
                this.form.id = '';
                this.form.schooleZoneName = '';     
                this.form.dutyStartTime = '';     
                this.form.dutyEndTime = '';     
                this.form.dutyPlace = '';   
                this.form.dutyContent = '';   
                this.form.staffname = [{id:'',IsGroupLeader:'',}]
                this.getDuList();
                // this.form.staffname.id='';
                // this.form.staffname.name='';
            },
            // 显示添加弹框
            showBounce:function(){
                this.or=true;
                this.add=true;
            },
            // 显示详情弹框
            viewBounce:function(row){
                this.view=true;
                this.or=true;
                this.id = row.dutyGroupId;
            },
            // 显示编辑弹框
            // showeditBounce (obj) {
            //     //   console.log(obj)
            //     this.or= true;
            //     this.form.id = obj.id;
            //     this.form.schooleZoneName = obj.schooleZoneName;     
            //     this.form.dutyStartTime = new Date(obj.dutyStartTime);     
            //     this.form.dutyEndTime = new Date(obj.dutyEndTime);     
            //     this.form.dutyPlace = obj.dutyPlace; 
            //     this.form.dutyContent = obj.dutyContent; 
            //     this.form.groupId = obj.dutyGroupId;    
            //       // this.form.flag = obj.flag     
            //        // this.form.staffname = obj.staffname  
            //     //    console.log( obj.staffname )
            // },
            // 添加所有校区
            getCampus(){
                ap.getCampus ().then(response => {
                    if(response.data.meta.code ==  '200'){
                        this.campsel.options = response.data.data
                    }
                })
            },
            // 查询值班列表
            getDuList(){
                let data={
                    pageNo: this.currentPage,
                    schoolZoneId:this.campsel.value,
                    dutyStartTime:this.dutyStartTime,
                    dutyEndTime:this.dutyEndTime
                }
                this.loading = true;
                api.getDuList(data).then(response =>{
                    if(response.data.meta.code ==  '200'){
                        this.total = response.data.data.count;
                        this.loading = false;
                        this.tableData = response.data.data.list;
                    }
                })
            },
            // 删除当前行
            // deleteRow(row){
            //     this.$confirm('确认删除该记录吗？','提示',{
            //         type:'warning'
            //     }).then(_ => {
            //        api.deleteRow(row.dutyGroupId).then(response =>{
            //            console.log(response);
            //            console.log("wwwww")
            //             if(response.data.meta.code=='200'){
            //                 this.$message({
            //                     message: '删除成功',
            //                     type: 'success'
            //                 });
            //             }
            //             this.getDuList();
            //         }) 
            //     });
                    
            // }
        },
        mounted(){
            // 获取所有校区
            this.getCampus();
            // 获取值班列表
            this.getDuList();
        }
    }
</script>
<style scoped lang="scss">
.aidstu{
    padding-top:7px;
    .sel{
        float:left;
        margin-right:17px;
        padding-bottom:14px;
    }
    .sel-overtime{
        cursor:pointer;
        margin:7px 17px 7px 0;
        i{
            width:16px;
            height: 16px;
            float:left;
            margin-top:2px;
            margin-right:8px;
            background:url("../../assets/img/overtime/add.png") 0 0 no-repeat;
            background-size:100% 100%; 
        }
        span{
            color:#208af5;
            font-weight:bold;
        }
    }
    .sel-sch{
        .smllSel{
            width:120px;
        }
    }
    .sel-time{
        span{
            margin-right:5px;
        }
        .el-input{
            width:180px;
            margin-right:5px;
        }
    }
    .sel-search{
        float:left;
        position: relative;
        .el-input{
            width:160px;
        }
        img{
            position: absolute;
            top: 10px;
            right: 8px;
            cursor:pointer;
        }
    }
    
    .print{
        cursor:pointer;
        float:right;
        padding:8px 0;
        i{
            width:16px;
            height: 16px;
            float: left;
            margin-top:2px;
            margin-right:6px;
            background:url("../../assets/img/overtime/print.png") 0 0 no-repeat;
            background-size:100% 100%;
        }
        span{
            float:left;
        }
    }
    .el-select{
        width:154px;
    }
    .handle{
        margin-top:6px;
        .view{
            cursor:pointer;
        }
        .edit{
            cursor: pointer;
            margin-left:2px;
            margin-right: 2px;
        }
        .del{
            cursor: pointer;
        }
    }
    
    .toolbar{
        margin-top:20px;
    }
    // 遮罩
    .mask{
        z-index: 1;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        // display:none;
        background: rgba(0,0,0,.4);
    }
}

</style>

