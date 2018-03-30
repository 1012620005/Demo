<template>
 <div class="contanier">
		<fc-header></fc-header>
		<div class="content">
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom">
                <div  style="margin: 0 auto;width:1160px;">
                <el-row     >
                    <el-col :span="2">
                        <div style="color:#000;font-size:16px; line-height:50px;">学生列表</div>
                    </el-col>
                    <el-col :span="3">    
                        <div class="btnS" @click="bubanFuc" style="cursor:pointer;margin-left:28px;"> <span class="buban"></span>补办毕业证</div>
                    </el-col>
                </el-row>
                <el-form  :model="form" label-width="50px" >
                    <el-row   type="flex" class="row-bg" justify="space-between"  >
                        
                        <el-form-item label="校区">
                            <!-- <el-col :span="3"> -->
                            <el-select v-model="form.xq" clearable @change="query(form.xq,2)" placeholder="">
                                <el-option v-for="item in defa.xq" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                            <!-- </el-col> -->
                        </el-form-item>
                        <el-form-item label="院系">
                            <!-- <el-col :span="3"> -->
                            <el-select v-model="form.yx" clearable @change="query(form.yx,3)" placeholder="">
                            <el-option v-for="item in defa.yx" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                            <!-- </el-col> -->
                        </el-form-item>
                        <el-form-item label="专业">
                            <!-- <el-col :span="3"> -->
                            <el-select v-model="form.zy" @change="selectclass" clearable placeholder="">
                            <el-option v-for="item in defa.zy" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                            <!-- </el-col> -->
                        </el-form-item>
                        <el-form-item label="年级">
                            <!-- <el-col :span="3"> -->
                            <el-select v-model="form.nj" @change="selectclass" clearable placeholder="">
                            <el-option v-for="item in defa.nj" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                            <!-- </el-col> -->
                        </el-form-item>
                        <el-form-item label="班级">
                            <!-- <el-col :span="3"> -->
                            <el-select v-model="form.bj"  clearable  placeholder="">
                            <el-option v-for="item in defa.bj" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid"></el-option>
                            </el-select>
                            <!-- </el-col> -->
                        </el-form-item>
                        <el-form-item >
                            <!-- <el-col :span="3"> -->
                                <el-input v-model="form.name" :on-icon-click="findStudentByFdy" icon="search" placeholder="请输入姓名"></el-input>
                            <!-- </el-col> -->
                        </el-form-item>
                    </el-row>
				</el-form>
				  <el-table
				    :data="tableData"
                    v-loading.body="tableloading"
                     >
				    	<el-table-column
					      label="选中"
					      width="65">
                            <template slot-scope="scope">
                                <div class="indentRadio">
                                    <el-radio class="radio" v-model="radio" :label="scope.row.studentId" :disabled="scope.row.graduateStatus !== '1'" ></el-radio>
                                </div>
                            </template>
				    	</el-table-column>
					    <el-table-column
					      type="index"
					      label="序号" width="65">
					    </el-table-column>
					    <el-table-column
					      prop="studentName"
					      label="学生姓名" 
                          width="100">
					    </el-table-column>
					    <el-table-column
					      prop="entrance"
					      label="入学学期" show-overflow-tooltip >
					    </el-table-column>  
					    <el-table-column
					      prop="recruit"
					      label="学制" width="100">
					    </el-table-column>                                                
					    <el-table-column
					      prop="campus"
					      label="校区" show-overflow-tooltip >
					    </el-table-column>
					    <el-table-column
					      prop="deptname"
					      label="院系" show-overflow-tooltip >
					    </el-table-column>
					    <el-table-column
					      prop="proname"
					      label="专业" show-overflow-tooltip >
					    </el-table-column>	
					    <el-table-column
					      prop="gradename"
					      label="年级" width="110" >
					    </el-table-column>	
					    <el-table-column
					      prop="clazzname"
					      label="班级" show-overflow-tooltip >
					    </el-table-column>                        
					    <el-table-column
					      label="操作" min-width="160">
					       <template slot-scope="scope">
					       	  <div class="box">
                                <el-tooltip :content="'查看详情'" placement="top">
                                    <span style="cursor: pointer;" ><img @click="seeDetial(scope.row)" style="vertical-align: middle;" src="../../assets/image/eye-icon.png"/></span>
                                </el-tooltip>
                                <el-button type="text" v-if="scope.row.graduateStatus == 0" @click="getDip(scope.row)">未领取毕业证</el-button>
                                <el-button type="text" v-if="scope.row.graduateStatus == 1">已领取毕业证</el-button>
                                <el-button type="text" v-if="scope.row.graduateStatus == '2'"  ><span style="color:red">已补办毕业证</span></el-button>
					          </div>			           	           				           
					      </template>
					    </el-table-column>				    			    			    
				  </el-table>
	              <div class="con_left_tab_con_page">
	                	<el-pagination
						      @current-change="handleCurrentChange"
						      :current-page.sync="page.pageNo"
                            :page-size="10"
                            layout="prev, pager, next, jumper"
                            :total="page.count">
	    				</el-pagination>
	               </div>	                
                </div>
            
            </div>
        </div>
    <!--领毕业证-->
    <el-dialog title="领毕业证" :visible.sync="leadForm.dialogFormVisible"  class="dialogImg" size="tiny"> 
         <div class="contentDialog">
             确认领取毕业证
         </div>
         <div slot="footer" class="dialog-footer" style="text-align:right">
			<el-button type="primary" @click="submitDialog">确认</el-button>
		</div>
    </el-dialog>
    <!--补领毕业证-->
     <el-dialog title="补领毕业证" :visible.sync="replaceForm.dialogFormVisible"  class="dialogImg" size="tiny"> 
         <div class="contentDialog">
             <el-form :model="replaceForm"  ref="replaceForm">
                  <el-form-item label="是否有证明">
                       <el-radio class="radio" v-model="replaceForm.radio" label="1">是</el-radio>
                       <el-radio class="radio" v-model="replaceForm.radio" label="0">否</el-radio>
                  </el-form-item>
             </el-form>
         </div>
         <div slot="footer" class="dialog-footer" style="text-align:right">
			<el-button type="primary" :loading="replaceForm.loading" @click="submitReplaceDialog">确认补领</el-button>
		</div>
    </el-dialog>  
    <!--学生详情--> 
      <el-dialog title="学生详情" :visible.sync="xqdoalog"  class="dialogImg" size="tiny"> 
         <div class="contentDialog">
             <el-form :model="seeForm"  ref="seeForm">
                  <el-form-item label="学生姓名:">
                        <span>{{ seeForm.studentName }}</span>
                  </el-form-item>
                  <el-form-item label="入学学期:">
                        <span>{{ seeForm.entrance }}</span>
                  </el-form-item>  
                  <el-form-item label="学制:">
                        <span>{{ seeForm.recruit }}</span>
                  </el-form-item>                                    
                  <el-form-item label="校区:">
                        <span>{{ seeForm.campus }}</span>
                  </el-form-item>
                  <el-form-item label="院系:">
                        <span>{{ seeForm.deptname }}</span>
                  </el-form-item>
                   <el-form-item label="专业:">
                        <span>{{ seeForm.proname }}</span>
                  </el-form-item>
                   <el-form-item label="年级:">
                        <span>{{ seeForm.gradename }}</span>
                  </el-form-item>
                  <el-form-item label="班级:">
                        <span>{{ seeForm.clazzname }}</span>
                  </el-form-item>                                                                                        
             </el-form>
             <div class="listItemBox">
                 <h4 class="listTitle">图书借用</h4>
                 <ul class="listCon">
                     <li class="listConItem" v-for="(item,index) in seeForm.borrowBooks" :key="index">
                         <p class="lie">
                            <span>图书名称:</span><span>{{ item.borrowTime }}</span>
                         </p>
                         <p class="lie">
                            <span>借书时间:</span><span>{{ item.returnTime }}</span>
                         </p>
                         <p class="lie">
                            <span>归还时间:</span><span>{{ item.bookName }}</span>
                         </p>                                                  
                     </li>
                 </ul>
             </div>
             <div class="listItemBox">
                 <h4 class="listTitle">奖惩</h4>
                 <ul class="listCon">
                     <li class="listConItem" v-for="item in seeForm.studetnSupport">
                         <p class="lie">
                            <span>奖励:</span><span>{{ item.bookName }}</span>
                         </p>
                         <p class="lie">
                            <span>奖励时间:</span><span>{{ item.borrowTime }}</span>
                         </p>                                          
                     </li>
                     <li class="listConItem" v-for="item in seeForm.punishList">
                         <p class="lie">
                            <span>处罚:</span><span>{{ item.borrowTime }}</span>
                         </p>
                         <p class="lie">
                            <span>处罚时间:</span><span>{{ item.bookName }}</span>
                         </p>                                          
                     </li>                    
                 </ul>                 
             </div>
         </div>
    </el-dialog>   
</div>
</template>
<script>
	import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
    import api from '../../apis/login.js'
    import AD from "../../apis/admin.js";
    const qs = require("querystring");
    const books =['borrowTime','bookName','returnTime'];
    export default{
        data () {
            return {
                xqdoalog:false,
                tableloading:false,
                title:'离校管理',
                form: {
                    xq: "",
                    yx: "",
                    zy: "",
                    nj: "",
                    bj: "",
                    name: "",
                },
                defa: {
                    xq: [],
                    yx: [],
                    zy: [],
                    nj: [],
                    bj: [],
                    name: "",
                },
                tableData:[],
                leadForm:{
                   dialogFormVisible: false 
                },
                multipleSelection:[],
                replaceForm:{
                    dialogFormVisible: false,
                    radio: '0',
                    loading:false,
                },
                seeForm:{
                    dialogFormVisible: false,
                },
                radio: '',
                page: {
                    pageNo: 1,
                    pageSize: Number,
                    count: null
                },
                row:'',
                
            }
        },
        components:{
            fcHeader,
            returnBar
        },
        methods:{
            query(id,type){
                // if(this.form.zy == '' || this.form.yx == '') return;
                let parms = {
                    id:id,
                    type:type
                    } 
                api.querycampus(parms).then(data=>{                //查询校区
                    if(type == 4){
                    this.defa.xq = data.data.data;
                    };
                    if(type == 2){
                    this.form.yx = '';
                    this.form.zy = '';
                    this.form.bj = '';
                    this.defa.yx = data.data.data;
                    };
                    if(type == 3){
                    this.form.zy = '';
                    this.form.bj = '';
                    this.defa.zy = data.data.data;
                    }
                    this.getlist()
                })
            },
            selectclass(){    //查询班级
                this.getlist();
                if(this.form.zy == '' || this.form.nj == '') return;
                this.form.bj = '';
                let parms = {
                    proid:this.form.zy,
                    gradeid:this.form.nj
                }            
                api.selectclasse(parms).then(data=>{
                    this.defa.bj = data.data.data
                    // this.getlist();
                })
            },
            findStudentByFdy(){
                this.getlist()
            },
            handleCurrentChange (val) {
                this.page.pageNo = val;
                this.getlist();
            },
            bubanFuc () {
                if(this.radio == '') {
                    this.$message.error('请选择要补办毕业证的学生')
                    return false 
                }else{
                    this.replaceForm.dialogFormVisible = true
                }
            },
            seeDetial (row) {
                if(row.borrowBooks.length>0){
                    row.borrowBooks=row.borrowBooks.map(function(item,index){
                        let j = 0;
                        for(let i in item){
                            item[books[j]] = item[i]
                            console.log(i)
                            j++
                        }
                        return item
                    })
                }
                if(row.studetnSupport.length>0){
                    row.studetnSupport=row.studetnSupport.map(function(item,index){
                        let j = 0;
                        for(let i in item){
                            item[books[j]] = item[i]
                            console.log(i)
                            j++
                        }
                        return item
                    })
                }
                if(row.punishList.length>0){
                    row.punishList=row.punishList.map(function(item,index){
                        let j = 0;
                        for(let i in item){
                            item[books[j]] = item[i]
                            console.log(i)
                            j++
                        }
                        return item
                    })
                }
                console.log(row)
                this.seeForm = row
                this.xqdoalog = true
            },
            getDip (row) {
                this.row = row;
                this.leadForm.dialogFormVisible = true
            },
            handleSelectionChange (val) {
                this.multipleSelection = val
            },
            checkSelectable (row,index) {
                if(row.status == 2 || row.status == 0) {
                    return false
                } else {
                    return true
                }
            },
            submitDialog () {
                if(this.row.borrowBooksStatus == '1'){
                    this.$message({
                        showClose: true,
                        message: '图书未归还',
                        type: "error"
                    });
                }else{
                    
                    this.loading=true;
                    let u={
                        'studentId':this.row.studentId,
                    }
                    if(this.row.graduateStatus == '0'){
                        AD.Receivestu(qs.stringify(u)).then(r=>{
                            this.loading=false;
                            if(r){
                                this.leadForm.dialogFormVisible = false;
                                this.getlist()
                                this.$message({
                                    showClose: true,
                                    message: r.data.meta.message,
                                    type: "success"
                                });
                            }
                        })
                    }else{
                        AD.Receiveagain(qs.stringify(u)).then(r=>{
                            this.loading=false;
                            if(r){
                                this.leadForm.dialogFormVisible = false;
                                this.getlist()
                                this.$message({
                                    showClose: true,
                                    message: r.data.meta.message,
                                    type: "success"
                                });
                            }
                        })
                    }
                }
            },
            submitReplaceDialog () {
                this.loading=true;
                let u = {
                    'studentId':this.radio,
                    'reapplyAttest':this.replaceForm.radio
                }
                AD.upmake(qs.stringify(u)).then(r=>{
                    this.loading=false;
                    if(r){
                        this.replaceForm.dialogFormVisible = false;
                        this.getlist()
                        this.$message({
                            showClose: true,
                            message: r.data.meta.message,
                            type: "success"
                        });
                    }
                })
            },
            getlist () {
                this.tableloading = true;
                let u={
                    'ssid':this.form.xq,
                    'deptid':this.form.yx,
                    'proid':this.form.zy,
                    'pageNo':this.page.pageNo,
                    'clazzid':this.form.bj,
                    'gradeid':this.form.nj,
                    'name':this.form.name,
                }
                AD.getleave(u).then(r=>{
                    this.tableloading = false;
                    if(r){
                        this.page.count = r.data.data.count;
                        this.tableData = r.data.data.list;
                    }
                })
            }

        }, 
        mounted () {
            // 获取列表页面的内容
            this.getlist()
            this.query(1,4);
            api.queryAllGrade().then(data=>{
                if(data) this.defa.nj = data.data.data;
            })
        },
        watch:{
            'form.bj':function(){
                this.getlist()
            }
        }
    }
    
</script>
<style lang="scss" scoped>
@import '../../common/css/common.scss';
.buban{
    display: inline-block;
    width:16px;
    height: 16px;
    background:url(../../assets/img/connet/studentApply.png) no-repeat center center;
    margin-right:6px;
}
.listItemBox{
    border:1px solid #dfe6ec;
    box-sizing:border-box;
    margin-bottom:14px;
    .listTitle{
        height:40px;
        background:#e5f2ff;
        line-height:40px;
        padding-left:12px;
        color:#333;
        font-size: 16px;
        font-weight: normal;
    }
    .listCon{
        .listConItem{
            padding-top:10px;
            padding-bottom:10px;
            padding-left:12px;
            border-bottom:1px solid #dfe6ec;
            &:last-child{
                border-bottom:none;
            }
        }
        .lie{
            padding-bottom:10px;
        }
    }
}
</style>
<style lang="scss">
    .finshed{
        .el-button--text{
            color:red!important;
        }
    }
    .contentDialog{
        .el-form-item__label{
            padding-left:12px;
        }
    }
    .indentRadio{
        .el-radio__label{
            display: inline-block;
            text-indent: -999999px;
        }
    }
</style>