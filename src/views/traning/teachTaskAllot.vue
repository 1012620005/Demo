<template>
    <div class="container">
		<fc-header></fc-header>
		<div class="content">
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom bookIndex">
                <div class="demo-form-inline">
                          <span class="label" style="width:65px">排课学期</span>
                          <el-select v-model="formInline.trem" clearable placeholder="" class="select_width" @change="getUserList">
                               <el-option :label="item.xq" :value="item.id" :key="item.clazzid" v-for="item in formInline.termList"></el-option>
                          </el-select>
                          <span class="label" style="width:50px">教学班</span>
                          <el-select v-model="formInline.ccId" clearable placeholder="" class="select_width" @change="getUserList">
                               <el-option :label="item.clazzname" :value="item.clazzid" :key="item.clazzid" v-for="item in formInline.ccList"></el-option>
                          </el-select>
                          <span class="label" style="width:65px">课程类型</span>
                          <el-select v-model="formInline.slId" clearable placeholder="" class="select_width" @change="getUserList">
                               <el-option :label="item.courseName" :value="item.id" :key="item.id" v-for="item in auditTableData"></el-option>
                          </el-select>
                           
                </div>
                <div class="demo-form-inline">
                    <span class="label" style="width:65px">开课机构</span>
                          <!-- <el-select v-model="formInline.teachId" clearable placeholder="" class="select_width" @change="getUserList">
                               <el-option :label="item.clazzname" :value="item.clazzid" :key="item.clazzid" v-for="item in formInline.teachList"></el-option>
                          </el-select> -->
                           <el-cascader
                                :options="formInline.courseOrg"
                                v-model="formInline.courseInstitution"
                                :props="props"
                                :show-all-levels="false"
                                change-on-select
                                clearable
                                style="width:180px;"
                                @change="getUserList"
                            ></el-cascader>
                          <span class="label" style="width:65px">分配机构</span>
                          <el-cascader
                                :options="formInline.courseOrg"
                                v-model="formInline.allotInstitution"
                                :props="props"
                                :show-all-levels="false"
                                change-on-select
                                clearable
                                style="width:180px;"
                                @change="getUserList"
                            ></el-cascader>
                          <span class="label" style="width:65px">授课阶段</span>
                           <el-input type="text"  v-model="formInline.startWeek" style="width:50px" @blur="getUserList"></el-input>
                           <span>-</span>
                           <el-input type="text"  v-model="formInline.endWeek" style="width:50px" @blur="getUserList"></el-input>
                          <el-input
                                placeholder="输入课程名称"
                                suffix-icon="el-icon-search"
                                v-model="formInline.courserName"
                                style="width:160px;margin-left:10px;"  @blur="getUserList">
                          </el-input>
                </div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	  	    <span @click="absence('分配')" class="lineFlex" style="padding-bottom:5px; padding-right:8px;cursor:pointer"><span class="btn qingjia"></span><span>设置分配机构</span></span>
                            <a :href="exportUrl" class="lineFlex">
                                <span class="imgScript2 exporticon2"></span>
                                <span class="fontColor2 paddingRight2">导出</span>
                            </a>
				</el-form>
                <el-table
                 	fit
				    :data="tableData"
                    style="margin:0 16px 0 24px;width:1160px;" class="tableBox"  ref="multipleTable" @selection-change="handleSelectionChange">
                        
				    <el-table-column
				      type="index"
				      label="序号" fixed>
				    </el-table-column>
                    <el-table-column
                    type="selection"
                    width="55" fixed>
                    </el-table-column>
				    <el-table-column
				      prop="courserName"
				      label="课程名称" width="200" fixed>
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.courserName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="courseIdCategory"
				      label="课程类型">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.courseIdCategory }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="courseInstitutionName"
				      label="开课机构">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.courseInstitutionName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="clazzName"
				      label="教学班名称">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.clazzName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="allotInstitutionName"
				      label="分配机构">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.allotInstitutionName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="teachingPhase"
				      label="授课阶段">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.teachingPhase }}</span>
					   </template>
				    </el-table-column>	    
				  </el-table>
                  <div class="con_left_tab_con_page">
                	<el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page.sync="pageNo"
					      :page-size="pageSize"
                          :page-sizes="[10,20,50,100,200,400]"
					      layout="total, sizes,prev, pager, next,jumper"
					      :total="count">
    				</el-pagination>
                </div>
			</div>
		</div>
    <!--获取课程的弹出框-->
    <el-dialog title="设置开课机构" :visible.sync="auditForm.dialogFormVisible" size="tiny" custom-class="dialogImg" label-position="right" @close="closeAuditDialog('auditForm')">
			<div class="wrapper_dialog">
				  <el-form :inline="true" class="demo-form-inline labelPosition" :model="auditForm" :rules="rules" ref="auditForm">
                        <el-form-item label="开课机构:" prop="courseOrg">
                            <el-cascader
                                :options="formInline.courseOrg"
                                v-model="auditForm.courseOrg"
                                :props="props"
                                :show-all-levels="false"
                                change-on-select
                                clearable
                                style="width:180px;"
                            ></el-cascader>
                        </el-form-item>
                  </el-form>
				<div slot="footer" class="dialog-footer" style="text-align:center;margin-top:20px;">
					<el-button type="primary" @click="save('auditForm')">保存</el-button>
				</div>			    	
			</div>
	</el-dialog>
</div>
</template>
<script>
    import fcHeader from '../common/header.vue'
	import returnBar from '../common/returnBar.vue'
	import apis from '../../apis/traning.js'
    import commonApi from '../../apis/common.js'
    import fileCommon from '../../apis/commonFile.js'
    const qs = require('querystring')
    export default {
        data () {
            return {
                title: '授课任务分配',
                formInline: {
                    proId:'',
                    proList:[],
                    ccId:'',
                    ccList:[],
                    slId:'',
                    slList:[],
                    gradeId:'',
                    gradeList:[],
                    programId:'',
                    programList:[],
                    schoolBeign:[],
                    courseName:'',
                    courseOrg:[],
                    courseClass:[],
                    exams:[],
                    personProgram:'',
                    trainName:'',
                    term:'',
                    termList:[],
                    teachId:'',
                    teachList:[],
                    courseInstitution:[],
                    allotInstitution:[]
                },
                props:{
                    value:'id',
                    label:'label',
                    children:'children'
                },
                fileData:{
                    entity:'personProgram',
					type:'fujian'  
                },
                fileList:[],
                tableData:[],
                auditTableData:[],
                pageNo:1,
                pageSize:10,
                count:10,
                setForm:{
                    dialogFormVisible:false, 
                },
                importUrl:'',
                exportUrl:'',
                downLoadUrl:'',
                auditForm:{
                    dialogFormVisible: false,
                    courseOrg:[]
                },
                tableData3:[],
                term:'',
                terms:{},
                termArr:['','一','二','三','四','五','六','七','八','九','十','十一','十二','十三'],
                curId:'',
                personId:'',
                multipleSelection:[],
                rules:{
                    courseOrg:[{ required: true, message: '请选择开课机构', trigger: 'change',type:'array'}]
                }
            }
        },
        components:{
           fcHeader,
           returnBar
        },
        methods:{
           getUserList () {
               let allot = this.formInline.allotInstitution
               let course = this.formInline.courseInstitution
               if(allot.length == 1) {
                   allot = this.formInline.allotInstitution[0]
               } else if(allot.length == 2) {
                   allot = this.formInline.allotInstitution[1]
               } else {
                   allot = ''
               }
               if(course.length == 1) {
                   course = this.formInline.courseInstitution[0]
               } else if(course.length == 2) {
                   course = this.formInline.courseInstitution[1]
               } else {
                   course = ''
               }
               var data = {
                   termName:this.formInline.term,
                   clazzid:this.formInline.ccId,
                   coursetypeId:this.formInline.slId,
                   courserName: this.formInline.courseName,
                   courseInstitution:course,
                   allotInstitution:allot,
                   startWeek:this.formInline.startWeek,
                   endWeek:this.formInline.endWeek,
                   pageNo:this.pageNo,
                   pageSize:this.pageSize
               }
               apis.getOrgList(data).then(res=>{
                   if(res){
                       var data = res.data.data
                       this.tableData = data.list
                       this.count =  data.count
                   }
               })
           },
           deleteTconClick () {
               this.addForm.courseName = ''
               this.addForm.coursesList = ''
               this.addForm.courseInstitutionList = ''
           },
           handleSelectionChange (val) {
               this.multipleSelection = val
           },
           closeAuditDialog (form) {
               this.$refs[form].resetFields();
               this.auditForm.dialogFormVisible = false
           },
           save (form) {
               this.$refs[form].validate((valid) => {
                    if (valid) {
                        let idArr = []
                        let orgId = ''
                        this.multipleSelection.map((r) =>{
                            idArr.push(r.id)
                        })
                        if(this.auditForm.courseOrg.length == 1) {
                            orgId = this.auditForm.courseOrg[0]
                        } else if(this.auditForm.courseOrg.length == 2){
                            orgId = this.auditForm.courseOrg[1]
                        } else {
                            orgId = ''
                        }
                        apis.updateOrgList(qs.stringify({id:idArr.join(','),allotInstitution:orgId})).then(res =>{
                            if(res) {
                                this.$message({
                                    type:'success',
                                    message:'设置成功'
                                })
                                this.getUserList()
                                this.auditForm.dialogFormVisible = false
                            }
                        })
                    }
               })
           },
           closeDialog (form) {
               this.$refs[form].resetFields();
               this.addForm.trainName = ''
               this.addForm.majorId = ''
               this.addForm.arrangementId = ''
               this.addForm.schooling = ''
               this.addForm.gradeId = ''
               this.addForm.cultureMode = ''
               this.addForm.term = ''
               this.addForm.attachment = ''
               this.addForm.coursesList = ''
               this.addForm.courseInstitutionList = ''
               this.addForm.id = ''
           },
           deleteDialog (obj) {
           },
           handleSizeChange(val){
               this.pageSize = val
               this.getUserList()
           },
           handleCurrentChange (val) {
               this.pageNo = val
               this.getUserList()
           },
           getProList () {
               // 获取专业的接口
               commonApi.getProListData().then(res=>{
                   if(res){
                       var data = res.data.data
                       this.formInline.proList = data
                   }
               })
               // 获取教学班的接口
               var paramsData = {
                   pageSize: -1
               }
               commonApi.getClass().then(res =>{
                   if(res) {
                       var data = res.data.data
                       this.formInline.ccList = data.list
                   }
               })
               //获取学制的接口
               commonApi.getSchoolL().then(res =>{
                   if(res) {
                      var data = res.data.data
                       this.formInline.slList = data  
                   }
               })
               // 获取学期的接口
               commonApi.getGradeList().then(res =>{
                   if(res) {
                       var data =  res.data.data
                       this.formInline.termList = data
                   }
               })
               //获取培养方式的接口
               var data = {
                   type:'culture_mode'
               }
               commonApi.gettranForm(data).then(res =>{
                   if(res) {
                      var data = res.data.data
                       this.formInline.programList = data  
                   }
               })
               apis.getClassRoom().then(res =>{
                    var data = res.data.data
                    this.formInline.schoolBeign = data
                })
                // 获取课程分类的接口
                var datas = {
                    type: 0
                }
                commonApi.getCourseList(datas).then(res =>{
                    if(res){
                        var data = res.data.data
                        this.formInline.courseClass = data 
                    }
                })
                //获取考试形式的接口
                commonApi.getExam().then(res =>{
                    if(res) {
                        var data = res.data.data
                        this.formInline.exams = data  
                    }
                })
                // 获取课程安排状态的接口
                apis.teachTaskStatus().then(res =>{
                    if(res){
                       var data = res.data.data
                       this.formInline.gradeList = data
                    }
                })
                // 获取开课机构的接口
                 var param = {
                    xz: 2
                };
               commonApi.getInstitution(param).then(res =>{
                    var data = res.data.data
                    this.formInline.courseOrg = data[0].children
                })
                // 获取任课老师的接口
                apis.getTeachApi().then(res=>{
                    if(res){
                        var data = res.data.data
                        this.formInline.teachList = data
                    }
                })
                // 获取单双周的接口
                apis.getDoubleWeek().then(res =>{
                    if(res){
                        var data = res.data.data
                        this.auditForm.doubleWeekList = data
                    }
                })

           },
           getCourse(){
               var params = {
                   type:1
               }
               commonApi.getCourseList(params).then(res =>{
                   if(res) {
                       var data = res.data.data
                       this.auditTableData = data
                   }
               })
           },
           findItem (val) {
               console.log(val)
               var _this = this
               this.formInline.gradeList.map(function(obj){
                   if (obj.id == val) {
                       _this.addForm.term = obj.xq
                   }
               })
           },
           editorSetForm () {},
           absence (str) {
               var len = this.multipleSelection.length
               if(len < 1) {
                   this.$message({
                       type:'error',
                       message:`请至少选择一条数据${str}`
                   })
                   return false
               } 
            this.auditForm.dialogFormVisible = true
           },
           aduit () {
           },
           handleAvatarSuccess () {},
        },
        mounted () {
            var _this = this
            // 获取课程分类的接口
            this.getCourse()
            // 获取专业等的接口
            this.getProList()
            // 获取人才培养方式的列表页面
            this.getUserList()
            this.importUrl = fileCommon.getFileUploadUrl()
            setInterval(function(){_this.importUrl = fileCommon.getFileUploadUrl();}, 4 * 60000);
        }
    }
</script>
<style lang="scss"scoped>
    @import '../../common/css/common.scss';
    .bookIndex {
       .el-tabs--border-card{
           border:none;
           box-shadow:none;
           .el-tabs__content{
               padding:0;
           }
       }
   }
   .label{
       padding-left:9px;
       color:#494949;
   }
   .btnS{
       margin-right:0;
       padding-right:0;
   }
   .select_width{
       width:160px;
   }
   button.formBox.el-button--mini{
            padding: 7px 6px;
    }
    .setform{
        display:flex;
        
    }
   .tableSetForm{
       table{
           border:1px solid #ccc;
           border-collapse:collapse;
          td{
              border:1px solid #ccc;
          }
       }

   }
   .float{
       display:inline-flex;
   }
   .lineFlex{
       display:inline-flex;
       align-items:center;
   }
</style>
<style lang="scss">
    .set_img.el-dialog{
        width:70%;
        .el-dialog__body{
            padding:0 20px 20px;
        }
        
    }
    .upload-demo{
        .el-upload{
            display: inline-flex!important;
        }
    }
    .tableBox{
        .el-table__expanded-cell{
            .el-form-item{
                width:auto!important;
                margin-right:10px;
            }
        }
    }
    .classLabel{
        .el-form-item__label{
            width:120px;
        }
    }
    .labelPosition{
        .el-form-item{
            width:30%;
        }
    }
</style>


