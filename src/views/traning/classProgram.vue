<template>
    <div class="container">
		<fc-header></fc-header>
		<div class="content">
			<return-bar :title="title"></return-bar>
			<div class="sLeave-bottom bookIndex">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	  	  <div  class="btnS" style="width:130px;color:#777777;font-size:14px;">班级培养方案列表</div>
				           <span class="label" style="width:40px">专业</span>
                          <el-select v-model="formInline.proId" clearable placeholder="" class="select_width" @change="getUserList">
                              <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.proList"></el-option>
                          </el-select>
                          <span class="label" style="width:40px">层次</span>
                          <el-select v-model="formInline.ccId" clearable placeholder="" class="select_width" @change="getUserList">
                               <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in formInline.ccList"></el-option>
                          </el-select>
                          <span class="label" style="width:40px">学制</span>
                          <el-select v-model="formInline.slId" clearable placeholder="" class="select_width" @change="getUserList">
                               <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in formInline.slList"></el-option>
                          </el-select>
                          <span class="label" style="width:40px">年级</span>
                          <el-select v-model="formInline.gradeId" clearable placeholder="" class="select_width" @change="getUserList">
                              <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.gradeList"></el-option>
                          </el-select>
                          <el-input
                                placeholder="请输入教学班"
                                suffix-icon="el-icon-search"
                                v-model="formInline.clazzName"
                                style="width:193px;margin-left:10px;"  @blur="getUserList">
                          </el-input> 

				</el-form>
                <el-table
                 	fit
				    :data="tableData"
                    style="margin:0 16px 0 24px;width:1160px;">
				    <el-table-column
				      type="index"
				      label="序号">
				    </el-table-column>
                    <el-table-column
				      prop="clazzName"
				      label="教学班" width="200">
					  <template slot-scope="scope" style="width:80%">
						   <span >{{ scope.row.clazzName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="majorName"
				      label="专业" width="160">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.majorName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="arrangementName"
				      label="层次" width="120">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.arrangementName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="schoolingName"
				      label="学制" >
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.schoolingName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="gradeName"
				      label="年级" width="100">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.gradeName }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      label="操作" width="200">
				       <template slot-scope="scope">
                            <el-button size="mini"  type="warning" plain class="formBox" @click.stop.prevent="setDialog(scope.row.id)">设置课学时</el-button>
                            <el-button size="mini"  type="success" plain class="formBox"  @click.stop.prevent="deleteDialog(scope.row)">设置教材</el-button>
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
    <el-dialog title="选择分配机构" :visible.sync="auditForm.dialogFormVisible" size="tiny" custom-class="dialogImg" label-position="right" @close="closeSetDialog">
			<div class="wrapper_dialog">
				  <el-form :inline="true" class="demo-form-inline">
                        <span class="label" style="width:40px">分配机构</span>
                        <el-cascader
                        :options="formInline.schoolBeign"
                        v-model="auditForm.courseOrg"
                        :props="props"
                        :show-all-levels="false"
                        change-on-select
                        class="cascaderBox"
                        clearable
                        ></el-cascader>
                        <el-input type="text"  v-model="auditForm.courseName" placeholder="输入课程名称" class="inputWidth" style="width:150px;" ><i slot="suffix" class="el-input__icon el-icon-search" @click="getCourse"></i></el-input>
                  </el-form>
                <el-table
			      :data="auditTableData"
                   max-height="260"
			      style="width: 100%"  highlight-current-row
                   @current-change="handleCurrentCourseChange">
			      <el-table-column
			        prop="courseName"
			        label="课程名称" show-overflow-tooltip
			        >
			      </el-table-column>
                  <el-table-column
			        prop="courseNum"
			        label="课程代码" show-overflow-tooltip
			        >
			      </el-table-column>
			      <el-table-column
			        label="开课机构"
			        prop="str3"
			       >
			      </el-table-column>
			    </el-table> 
                  </el-form>  	
			</div>
	</el-dialog>
    <!--设置课学时-->
    <el-dialog title="设置课学时" :visible.sync="setForm.dialogFormVisible" size="tiny" custom-class="dialogImg set_img" label-position="right" @close="closeAuditDialog">
			<div class="wrapper_dialog">
                <div class="setform">
                    <div  class="btnS" @click="addSetForm" style="cursor:pointer;width:100px;color:#fbcd39"><span class="imgScript2 setqingjia" style="padding-right:10px;"></span>添加课程</div>
                    <div  class="btnS" @click="editorSetForm" style="cursor:pointer;width:70px"><span class="btn qingjia"></span>编辑</div>
                </div>
                <div class="tableSetForm">
                    <el-table
                        :data="tableData3"
                        style="width: 100%" max-height="500" @row-dblclick="handleClick" >
                        <el-table-column
                          type="index"
					      label="序号" width="80" fixed>
                        </el-table-column>
                        <el-table-column
					      label="操作" width="80" fixed>
                          <template slot-scope="scope">
                               <el-button type="text" size="mini" style="color:#e25454" @click="delItem(scope.row.id)">删除</el-button>
                          </template>
                        </el-table-column>
                        <el-table-column
					      label="课程分类" width="100" fixed>
                             <template slot-scope="scope">
                               <template v-if="curId == scope.row.id">
                                    <el-select v-model="scope.row.courseSort" placeholder="请选择">
                                        <el-option
                                        v-for="item in formInline.courseClass"
                                        :key="item.id"
                                        :label="item.courseName"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                               </template>
						       <span class="textCal" v-else>{{ scope.row.courseSortName }}</span>
                               </template>
                        </el-table-column>
                        <el-table-column
                        prop="courseName"
                        label="课程"
                        width="200" fixed>
                            <template slot-scope="scope">
                                <template v-if="curId == scope.row.id">
                                     <!-- <el-select v-model="scope.row.courseId" placeholder="请选择">
                                        <el-option
                                        v-for="item in auditTableData"
                                        :key="item.id"
                                        :label="item.courseName"
                                        :value="item.id">
                                        </el-option>
                                    </el-select> -->
                                     <el-input type="text"  v-model="scope.row.courseName" placeholder="输入课程名称" class="inputWidth" style="width:150px;" ><i slot="suffix" class="el-input__icon el-icon-search"  @click="handleIconClick"></i></el-input>
                               </template>
						      <span class="textCal" v-else>{{ scope.row.courseName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="学时" fixed  width="160"
                        >
                           <el-table-column
                                label="总学时" 
                               >
                               <template slot-scope="scope">
                                   <span>{{ scope.row.totalHour }}</span>
                               </template>
                            </el-table-column>
                            <el-table-column
                                label="总学分" 
                               >
                                <template slot-scope="scope">
                                   <span>{{ scope.row.totalScore }}</span>
                               </template>
                            </el-table-column>
                        </el-table-column>
                        <template v-for="(item, index) in terms.termList">
                            <el-table-column
                        :label="funBox(item.termNum)"
                        width="80">
                           <el-table-column
                                :label="item.termName + '(' + item.weekNum + ')'"
                               >
                                <el-table-column
                                    label="开始周">
                                    <template slot-scope="scope">
                                        <template v-if="curId == scope.row.id">
                                            <el-input v-model="scope.row['startWeek'+(index + 1)]" placeholder="请输入内容"></el-input>
                                        </template>
                                        <span v-else>{{ scope.row['startWeek'+(index + 1)] }}</span>
                                    </template>
                              </el-table-column>
                              <el-table-column
                                    label="结束周">
                                    <template slot-scope="scope">
                                        <template v-if="curId == scope.row.id">
                                           <el-input v-model="scope.row['endWeek'+(index + 1)]" placeholder="请输入内容"></el-input>
                                        </template>
                                        <span v-else>{{ scope.row['endWeek'+(index + 1)] }}</span>
                                    </template>
                              </el-table-column>
                              <el-table-column
                                    label="周学时">
                                    <template slot-scope="scope">
                                        <template v-if="curId == scope.row.id">
                                           <el-input v-model="scope.row['studyHours'+(index + 1)]" placeholder="请输入内容"></el-input>
                                        </template>
                                         <span v-else>{{ scope.row['studyHours'+(index + 1)] }}</span>
                                    </template>
                              </el-table-column>
                              <el-table-column
                                    label="学分">
                                    <template slot-scope="scope">
                                        <template v-if="curId == scope.row.id">
                                            <el-input v-model="scope.row['credit'+(index + 1)]" placeholder="请输入内容"></el-input>
                                        </template>
                                        <span v-else>{{ scope.row['credit'+(index + 1)] }}</span>
                                    </template>
                              </el-table-column>
                              <el-table-column
                                    label="考试形式">
                                    <template slot-scope="scope">
                                        <template v-if="curId == scope.row.id">
                                            <el-select v-model="scope.row['examForm'+(index + 1)]" placeholder="请选择">
                                                <el-option
                                                v-for="item in formInline.exams"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </template>
                                        <span v-else>{{ examForm(scope.row['examForm'+(index + 1)]) }}</span>    
                                    </template>
                              </el-table-column>
                              <!-- <el-table-column
                                    label="分配机构">
                                    <template slot-scope="scope">
                                        <template v-if="curId == scope.row.id">
                                            <el-input type="text"  v-model="scope.row['allotInstitutionName'+(index + 1)]" placeholder="选择分配机构"><i slot="suffix" class="el-input__icon el-icon-search" @click="getCourseOrg(scope.row['allotInstitution'+(index + 1)])"></i></el-input>
                                        </template>
                                        <span v-else>{{ scope.row['allotInstitutionName'+(index + 1)] }}</span>    
                                    </template>
                              </el-table-column> -->
                            </el-table-column>
                        </el-table-column>
                        </template>
                    </el-table>
                </div>
				<div slot="footer" class="dialog-footer" style="text-align:center;margin-top:20px;">
					<el-button type="primary" @click="saveForm" :disabled="addClick">保存</el-button>
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
                title: '班级培养方案',
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
                    clazzName:''
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
                auditForm:{
                   dialogFormVisible: false,
                   multipleSelection:[],
                   courseName:'',
                   courseOrg:[]
                },
                tableData3:[],
                term:'',
                terms:{},
                termArr:['','一','二','三','四','五','六','七','八','九','十','十一','十二','十三'],
                curId:'',
                personId:'',
                addClick:true,

            }
        },
        components:{
           fcHeader,
           returnBar
        },
        methods:{
           getUserList () {
               var data = {
                   majorId:this.formInline.proId,
                   gradeId:this.formInline.gradeId,
                   arrangementId:this.formInline.ccId,
                   schooling:this.formInline.slId,
                   clazzName:this.formInline.clazzName,
                   pageNo:this.pageNo,
                   pageSize:this.pageSize
               }
               apis.classProgramList(data).then(res=>{
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
               var newArr = []
               val.map(function(obj){
                  newArr.push({
                      courseName:obj.courseName,
                      courseOrg:obj.courseOrg,
                      courseId: obj.id
                  })
               })
               this.auditForm.multipleSelection = newArr
           },
           closeAuditDialog () {
               this.curId = ''
               this.personId = ''
               this.tableData3 = []
               this.terms = {}
               this.setForm.dialogFormVisible = false
           },
           save () {
               var str = this.auditForm.courseOrg.join(',')
               var arr = this.auditForm.courseOrg
               var name = ''
               if(this.auditForm.courseOrg.length == 2) {
                   this.formInline.schoolBeign.map(function(obj){
                       if(obj.id == arr[0]) {
                           obj.children.map(function(item){
                               if(item.id == arr[1]){
                                   name = item.label
                               }
                           })
                       }
                   })
               } else {
                   this.formInline.schoolBeign.map(function(obj){
                       if(obj.id == arr[0]) {
                           name = obj.label
                       }
                   })
               }
               
              this.auditForm.dialogFormVisible = false
           },
           handleCurrentCourseChange (val) {
               this.addClick = false
               var _this = this
                this.tableData3.map(function(obj){
                        if (obj.id == _this.curId) {
                            _this.$set(obj,'courseName',val.courseName)
                            _this.$set(obj,'courseId',val.courseClass)
                        } 
                })
               this.auditForm.dialogFormVisible = false
           },
           handleIconClick () {
               this.auditForm.dialogFormVisible = true
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
               // 获取层次的接口
               commonApi.getCcData ().then(res =>{
                   if(res) {
                       var data = res.data.data
                       this.formInline.ccList = data
                   }
               })
               //获取学制的接口
               commonApi.getSchoolL().then(res =>{
                   if(res) {
                      var data = res.data.data
                       this.formInline.slList = data  
                   }
               })
              //获取年级的接口
              commonApi.getGradeData().then(res =>{
                   if(res) {
                      var data = res.data.data
                       this.formInline.gradeList = data  
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
                var param = {
                    xz: 2
                };
               commonApi.getInstitution(param).then(res =>{
                    var data = res.data.data
                    this.formInline.schoolBeign = data[0].children
                    console.log(this.formInline.schoolBeign)
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
           },
           getCourse(){
              var courseOrg = ''
               if(this.auditForm.courseOrg.length == 2){
                   courseOrg = this.auditForm.courseOrg[1]
               } else {
                   courseOrg = this.auditForm.courseOrg[0]
               }
               var params = {
                   courseName:this.auditForm.courseName,
                   courseOrg: courseOrg
               }
               commonApi.getAllCourse(params).then(res =>{
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
           addSetForm () {
               this.addClick = false
               var len = this.terms.termList.length
               var arr = this.terms.termList
               var obj = {
                   courseId:'',
                   courseSort:'96fc7730a50443e29d1f4a20018466e1',
                   totalHour:0,
                   totalScore:0,
                   id:''
               }
               for(var i = 0; i < len; i++){
                   obj['startWeek'+(i + 1)] = 1
                   obj['endWeek' + (i + 1)] = arr[i].weekNum
                   obj['studyHours'+(i + 1)] = ''
                   obj['credit' + (i + 1)] = ''
                   obj['examForm' + (i + 1)] = '1'
               }
               this.tableData3.push(obj)
           },
           editorSetForm () {},
           setDialog (id) {
               this.personId = id
               var _this = this
               this.table3Data(id,function(){
                    setTimeout(function () {
                        _this.setForm.dialogFormVisible = true
                    },1000)
               })
           },
           table3Data (id,callback) {
               var params = {
                   id:id
               }
               apis.getClazzCourse(params).then(res =>{
                   if(res){
                       var arr = res.data.data
                       this.terms = arr.shift()
                       this.tableData3 = arr
                       if(callback){
                           callback()
                       }
                   }
                  
               })
           },
           funBox (num) {
               return '第' + this.termArr[num] + '学期'
           },
           examForm (num) {
               if(num == 1) {
                   return '考试'
               } else {
                   return '考查'
               }
           },
           handleClick (row) {
               this.curId = row.id
           },
           saveForm () {
               if(this.curId != '') {
                   // 编辑
                   var arr = {}
                   var _this = this
                   this.tableData3.map(function(obj){
                       if(obj.id == _this.curId){
                          arr = obj 
                       }
                   })
                   var params = qs.stringify({trainCourse: JSON.stringify(arr),id:arr.id})
                    apis.updateClazzCourse(params).then(res =>{
                        if(res) {
                            this.$message({
                                type:'success',
                                message:'编辑成功'
                            })
                           this.table3Data(this.personId)
                           this.curId = ''
                        }
                    })
               } else {
                    // 添加
                    var  obj = this.tableData3[this.tableData3.length -1]
                    this.$confirm('修改培养方案课程学时设置将删除对应的教学班培养方案和授课任务安排，是否继续？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        var params = qs.stringify({trainCourse: JSON.stringify(obj),id:this.personId})
                        apis.addClassRoom(params).then(res =>{
                            if(res) {
                                this.$message({
                                    type:'success',
                                    message:'添加成功'
                                })
                                this.table3Data(this.personId)
                            } 
                        })
                    }).catch(()=>{
                    })
                    this.addClick = true
               }
           },
           delItem (id) {
               var obj =  {
                   id: id
               };
               var params = qs.stringify(obj);
               apis.delClazzCourse(params).then(res =>{
                   if(res){
                       this.$message({
                           type:'success',
                           message:'删除成功'
                       })
                       this.table3Data(this.personId)
                   }
               }) 
           },
           getCourseOrg (id) {
               if (id) {
                   var arr = id.split(',')
                   this.auditForm.courseOrg = arr
               }
               this.auditForm.dialogFormVisible = true
           },
           closeSetDialog () {
              this.auditForm.courseOrg = []
           }

        },
        mounted () {
            var _this = this
            this.formInline.proId = this.$route.query.majorId
            this.formInline.gradeId = this.$route.query.gradeId
            this.formInline.ccId = this.$route.query.cc
            this.formInline.slId = this.$route.query.schooling
            // 获取课程分类的接口
            this.getCourse()
            // 获取专业等的接口
            this.getProList()
            // 获取人才培养方式的列表页面
            this.getUserList()
           // this.importUrl = fileCommon.getFileUploadUrl()
          //  setInterval(function(){_this.importUrl = fileCommon.getFileUploadUrl();}, 4 * 60000);
        },
        watch:{
            'tableData3':{
                handler (val) {
                   if(this.tableData3.length) {
                        var len = this.terms.termList.length
                        val.map(function(item){
                            var countHour = 0
                            var countScore = 0
                            for(var i = 1; i <= len; i++){
                                var startWeek =  item['startWeek'+ i] == null ? 0: Number(item['startWeek'+ i])
                                var endWeek =  item['endWeek'+ i] == null ? 0: Number(item['endWeek'+ i])
                                var studyHours =  item['studyHours'+ i] == null ? 0: Number(item['studyHours'+ i])
                                var credit =  item['credit'+ i] == null ? 0: Number(item['credit'+ i])
                                countHour += (endWeek - (startWeek-1))*studyHours
                                countScore += credit
                            }
                            item.totalHour = countHour
                            item.totalScore = countScore
                        })
                    }
                },
                deep:true
            } 
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
</style>
<style lang="scss">
    .set_img.el-dialog{
        width:90%!important;
        height:auto;
        .el-dialog__body{
            padding:0 20px 20px;
        }
        
    }
    .tableSetForm{
        .el-table{
            font-size:10px;
            th{
                padding:4px 0;
            }
            td{
                padding:4px 0;
            }

        }
    }
    .cascaderBox{
        width:50%;
    }
</style>


