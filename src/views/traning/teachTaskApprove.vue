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
                          <span class="label" style="width:40px">状态</span>
                          <el-select v-model="formInline.gradeId" clearable placeholder="" class="select_width" @change="getUserList">
                              <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in formInline.gradeList"></el-option>
                          </el-select>
                </div>
                <div class="demo-form-inline">
                          <span class="label" style="width:65px">分配机构</span>
                          <el-cascader
                                :options="formInline.courseOrg"
                                v-model="formInline.allotInstitution"
                                :props="props"
                                :show-all-levels="false"
                                change-on-select
                                clearable
                                style="width:180px;" @change="getUserList"
                            ></el-cascader>
                          <span class="label" style="width:65px">课程类型</span>
                          <el-select v-model="formInline.slId" clearable placeholder="" class="select_width" @change="getUserList">
                               <el-option :label="item.courseName" :value="item.id" :key="item.id" v-for="item in auditTableData"></el-option>
                          </el-select>
                          <span class="label" style="width:65px">任课老师</span>
                          <el-select v-model="formInline.teachId" clearable placeholder="" class="select_width" @change="getUserList">
                               <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.teachList"></el-option>
                          </el-select>
                </div>
                <div class="demo-form-inline">          
                        <el-input
                            placeholder=""
                            suffix-icon="el-icon-search"
                            v-model="formInline.clazzName"
                            style="width:160px;margin-left:10px;"  @blur="getUserList">
                        </el-input> 
                </div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	  	    <span @click="absence('添加')" class="lineFlex" style="padding-bottom:5px; padding-right:8px;cursor:pointer"><span class="btn qingjia"></span><span>添加</span></span>
                            <span @click="absence('修改')" class="lineFlex" style="padding-bottom:5px; padding-right:8px;cursor:pointer"><span class="btn qingjia"></span><span>修改</span></span>
                            <span @click="absence('删除')" class="lineFlex" style="padding-bottom:5px; padding-right:8px;cursor:pointer"><span class="btn qingjia"></span><span>删除</span></span>
                            
                            
                            
                            <span @click="aduit('pass')" class="lineFlex" style="padding-bottom:5px; padding-right:8px;cursor:pointer"><span class="btn qingjia"></span><span>审批通过</span></span>
                            <span @click="aduit('nopass')" class="lineFlex" style="padding-bottom:5px; padding-right:8px;cursor:pointer"><span class="btn qingjia"></span><span>审批不通过</span></span>
                            <a :href="exportUrl" class="lineFlex">
                                <span class="imgScript2 exporticon2"></span>
                                <span class="fontColor2 paddingRight2">导出</span>
                            </a>
                </el-form>
                <el-table
                 	fit
				    :data="tableData"
                    border
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
				      prop="clazzName"
				      label="教学班" width="260" fixed>
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.clazzName }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      prop="courserName"
				      label="课程名称" width="200" fixed>
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.courserName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="allotInstitutionName"
				      label="分配机构" width="200" fixed>
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.allotInstitutionName }}</span>
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
				      prop="totalHour"
				      label="总学时" >
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.totalHour }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="alreadyHour"
				      label="已上学时">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.alreadyHour }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="totalScore"
				      label="总学分">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.totalScore }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="credit"
				      label="学期学分">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.credit }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="examFormName"
				      label="考试形式">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.examFormName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="开始周">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.startWeek }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="结束周">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.endWeek }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="周学时">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.studyHours }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="教室" width="200">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.placeName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="连排节数">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.classNum }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="连排次数">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.classNum }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="合班上课教学班">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.inClassName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="接替课程">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.replaceCourseName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="单双周">
					  <template slot-scope="scope" style="width:80%">
						   <span v-show="scope.row.oneWeek == '0'">{{ '不限' }}</span>
                           <span v-show="scope.row.oneWeek == '1'">{{ '单周' }}</span>
                           <span v-show="scope.row.oneWeek == '2'">{{ '双周' }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="老师教材">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.teaTextbookName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="学生教材">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.stuTextbookName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="teacherName"
				      label="任课老师">
					  <template slot-scope="scope" style="width:80%">
						   <span>{{ scope.row.teacherName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="auditingState"
				      label="状态" fixed="right" width="120">
					  <template slot-scope="scope" style="width:80%">
						    <span v-show="scope.row.auditingState == 0" style="color:red">{{ '未设置' }}</span>
                           <span v-show="scope.row.auditingState == 1" style="color:blue">{{ '已设置未提交' }}</span>
                           <span v-show="scope.row.auditingState == 2" style="color:blue">{{ '已提交待审核' }}</span>
                           <span v-show="scope.row.auditingState == 3" style="color:blue">{{ '审核不通过' }}</span>
                           <span v-show="scope.row.auditingState == 4" style="color:blue">{{ ' 审核通过待审批' }}</span>
                           <span v-show="scope.row.auditingState == 5" style="color:blue">{{ '审批通过' }}</span>
                           <span v-show="scope.row.auditingState == 6" style="color:blue">{{ '审批不通过' }}</span>
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
    <el-dialog title="授课任务安排" :visible.sync="auditForm.dialogFormVisible" size="tiny" custom-class="dialogImg" label-position="right" @close="closeAuditDialog('auditForm')">
			<div class="wrapper_dialog">
				  <el-form :inline="true" class="demo-form-inline labelPosition" :model="auditForm" :rules="rules" ref="auditForm">
                        <el-form-item label="分配机构:">
                            <span>{{auditForm.allotInstitutionName}}</span>
                        </el-form-item>
                        <el-form-item label="当前教学班:">
                            <span>{{auditForm.clazzName}}</span>
                        </el-form-item>
                        <el-form-item label="课程名称:">
                            <span>{{auditForm.courserName}}</span>
                        </el-form-item>
                        <el-form-item label="课程类型:">
                            <span>{{auditForm.courseIdCategory}}</span>
                        </el-form-item>
                        <el-form-item label="总学时:">
                            <span>{{auditForm.totalHour}}</span>
                        </el-form-item>
                        <el-form-item label="已上学时:">
                            <span>{{auditForm.alreadyHour}}</span>
                        </el-form-item>
                        <el-form-item label="总学分:">
                            <span>{{auditForm.totalScore}}</span>
                        </el-form-item>
                        <el-form-item label="学分:">
                            <span>{{auditForm.credit}}</span>
                        </el-form-item>
                        <el-form-item label="考试形式:">
                            <span>{{auditForm.examFormName}}</span>
                        </el-form-item>
                        <el-form-item label="教师教材:">
                            <span>{{auditForm.teaTextbookName}}</span>
                        </el-form-item>
                        <el-form-item label="学生教材:">
                            <span>{{auditForm.stuTextbookName}}</span>
                        </el-form-item>
                        <el-form-item label="开始周:">
                            <el-input type="text"  v-model="auditForm.startWeek" class="inputWidth"></el-input>
                        </el-form-item>
                        <el-form-item label="结束周:">
                            <el-input type="text"  v-model="auditForm.endWeek" class="inputWidth"></el-input>
                        </el-form-item>
                        <el-form-item label="周学时:" prop="studyHours">
                            <el-input type="text"  v-model="auditForm.studyHours" class="inputWidth"></el-input>
                        </el-form-item>
                        <el-form-item label="教室名称:" prop="placeName">
                            <!-- <el-cascader
                                :options="formInline.schoolBeign"
                                v-model="auditForm.placeName"
                                :props="props"
                                :show-all-levels="false"
                                change-on-select
                                clearable
                                style="width:180px;"
                            ></el-cascader> -->
                            <el-input type="text"  v-model="auditForm.placeName" class="inputWidth" style="width:150px;" ><i slot="suffix" class="el-input__icon el-icon-search" @click="getRoom"></i></el-input>
                        </el-form-item>
                        <el-form-item label="连排节数:" prop="classNum">
                            <el-input type="text"  v-model="auditForm.classNum" class="inputWidth"></el-input>
                        </el-form-item>
                        <el-form-item label="任课老师:" prop="teacherName">
                            <el-select v-model="auditForm.teacherName" placeholder="" style="width:150px;" >
                                 <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in formInline.teachList"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="合班:" >
                            <el-select v-model="auditForm.inClass" placeholder="" style="width:150px;" multiple>
                                <el-option :label="item.clazzName" :value="item.clazzid" :key="item.clazzid" v-for="item in auditForm.inClassList"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="接替课程:">
                            <el-select v-model="auditForm.replaceCourseid" placeholder="" clearable style="width:150px;" >
                                <el-option :label="item.courseName" :value="item.courseId" :key="item.courseId" :disabled="item.disabled" v-for="item in auditForm.replaceCourseList">
                                    <span style="float: left;width:30%;">{{ item.startWeek }}</span>
                                    <span style="float: left;width:40%;">{{ item.courseName }}</span>
                                    <span style="float: left;width:30%;">{{ item.endWeek }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单双周:">
                            <el-select v-model="auditForm.doubleWeek" placeholder="" style="width:150px;" >
                                <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in auditForm.doubleWeekList"></el-option>
                            </el-select>
                        </el-form-item>
                  </el-form>
				<div slot="footer" class="dialog-footer" style="text-align:center;margin-top:20px;">
					<el-button type="primary" @click="save('auditForm')">保存</el-button>
				</div>			    	
			</div>
	</el-dialog>
    <el-dialog title="选择教室" :visible.sync="setForm.dialogFormVisible" size="tiny" custom-class="dialogImg" label-position="right" @close="closeSetDialog">
			<div class="setBox">
                <div class="set_dialog">
                <div class="setLeft">
                    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:10px;">
                        <span class="label" style="width:40px">建筑物:</span>  
                        <el-select v-model="setForm.floorId" filterable clearable placeholder="输入建筑物" class="select_width" @change="getRoomList">
                               <el-option :label="item.siteName" :value="item.siteNameId" :key="item.siteNameId" v-for="item in setForm.RoomField"></el-option>
                        </el-select>
                        <span class="label" style="width:40px">模糊查询:</span>
                        <el-input type="text"  v-model="setForm.roomName" placeholder="输入房间号/房间名称" class="inputWidth" style="width:150px;" ><i slot="suffix" class="el-input__icon el-icon-search" @click="getRoomList"></i></el-input>
                    </el-form>
                    <el-table
                        :data="setForm.setTableData"
                        max-height="260"
                        border
                        highlight-current-row
                        @current-change="handleCurrentSetChange"
                        style="width: 100%">
                        <el-table-column
                            type="index"
                            label="序号" 
                            >
                        </el-table-column>
                        <el-table-column
                            prop="roomName"
                            label="房间名称" show-overflow-tooltip
                            >
                        </el-table-column>
                        <el-table-column
                            prop="roomCode"
                            label="房间号" show-overflow-tooltip
                            >
                        </el-table-column>
                        <el-table-column
                            prop="fieldName"
                            label="建筑物" show-overflow-tooltip
                            >
                        </el-table-column>
                        <el-table-column
                            prop="floorNum"
                            label="房间楼层" show-overflow-tooltip
                            >
                        </el-table-column>
                        <el-table-column
                            prop="structureArea"
                            label="建筑面积" show-overflow-tooltip
                            >
                        </el-table-column>
                        <el-table-column
                            prop="galleryful"
                            label="容纳人数" show-overflow-tooltip
                            >
                        </el-table-column>
                        <el-table-column
                            prop="usefulArea"
                            label="使用面积" show-overflow-tooltip
                            >
                        </el-table-column>
                    </el-table>
                    <div class="con_left_tab_con_page">
                        <el-pagination
                            @size-change="handleSetSizeChange"
                            @current-change="handleSetCurrentChange"
                            :current-page.sync="setForm.pageNo"
                            :page-size="setForm.pageSize"
                            :page-sizes="[10,20,50,100,200,400]"
                            layout="total, sizes,prev, pager, next,jumper"
                            :total="setForm.count">
                        </el-pagination>
                    </div>
                </div>
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
                title: '授课任务审批',
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
                    RoomField:[],
                    pageNo:1,
                    pageSize:10,
                    count:10,
                    floorId:'',
                    roomName:'',
                    setTableData:[]
                },
                importUrl:'',
                exportUrl:'',
                downLoadUrl:'',
                auditForm:{
                    dialogFormVisible: false,
                    courseId:'',
                    courseName:'',
                    clazzName:'',
                    courseIdCategory:'',
                    totalHour:'',
                    alreadyHour:'',
                    totalScore:'',
                    credit:'',
                    examFormName:'',
                    startWeek:'',
                    endWeek:'',
                    studyHours:'',
                    teacherName:'',
                    placeId:'',
                    placeName:'',
                    classNum:'',
                    auditingState:'',
                    teaTextbookName:'',
                    stuTextbookName:'',
                    doubleWeekList:[],
                    oneWeek:'',
                    inClass:[],
                    thisInclazzId:'',
                    replaceEnd:'',
                    replaceStart:'',
                    replaceTeaid:'',
                    inClassList:[],
                    replaceCourseid:'',
                    replaceCourseList:[],
                    allotInstitutionName:''
                },
                tableData3:[],
                term:'',
                terms:{},
                termArr:['','一','二','三','四','五','六','七','八','九','十','十一','十二','十三'],
                curId:'',
                personId:'',
                multipleSelection:[],
                rules:{
                    studyHours:[{ required: true, message: '请填写周学时', trigger: 'change' }],
                    teacherName:[{ required: true, message: '请选择任课老师', trigger: 'change' }],
                    placeName:[{ required: true, message: '请选择教室名称', trigger: 'change'}],
                    classNum:[{ required: true, message: '请填写连排节数', trigger: 'change' }]
                },
                curClick:''
            }
        },
        components:{
           fcHeader,
           returnBar
        },
        methods:{
           getUserList () {
               let allot = this.formInline.allotInstitution
               if(allot.length == 1) {
                   allot = this.formInline.allotInstitution[0]
               } else if(allot.length == 2) {
                   allot = this.formInline.allotInstitution[1]
               } else {
                   allot = ''
               }
               var data = {
                   auditingState:this.formInline.gradeId,
                   termName:this.formInline.term,
                   teacherId:this.formInline.teachId,
                   clazzid:this.formInline.ccId,
                   coursetypeId:this.formInline.slId,
                   courserName: this.formInline.clazzName,
                   pageNo:this.pageNo,
                   pageSize:this.pageSize,
                   allotInstitution: allot
               }
               apis.getAllotList(data).then(res=>{
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
           closeAuditDialog () {
               this.curId = ''
               this.personId = ''
               this.setForm.dialogFormVisible = false
           },
           closeSetDialog () {
               this.setForm.dialogFormVisible = false
           },
           save (form) {
               this.$refs[form].validate((valid) => {
                    if (valid) {
                        console.log(this.curClick)
                        let arr = []
                        this.auditForm.inClassList.map((item) =>{
                            this.auditForm.inClass.map((obj) =>{
                                if(item.clazzid == obj){
                                    arr.push(item.thisInclazzId)
                                }
                            })
                        })
                        this.auditForm.replaceCourseList.map((item) =>{
                            console.log(this.auditForm.replaceCourseid)
                            console.log(item.courseId)
                            console.log('-------------------------')
                            if(item.courseId === this.auditForm.replaceCourseid){
                                this.auditForm.replaceStart = item.startWeek
                                this.auditForm.replaceEnd = item.endWeek
                                this.auditForm.replaceTeaid = item.teacherId
                            }
                        })
                        let dataBox = {
                            id: this.auditForm.courseId,
                            startWeek: this.auditForm.startWeek,
                            endWeek: this.auditForm.endWeek,
                            studyHours: this.auditForm.studyHours,
                            teacherId: this.auditForm.teacherName,
                            placeId: this.auditForm.placeId,
                            classNum: this.auditForm.classNum,
                            thisInclazzId: arr.join(','),
                            inClass: this.auditForm.inClass.join(','),
                            classOrder: this.auditForm.classOrder,
                            replaceStart: this.auditForm.replaceStart,
                            replaceEnd: this.auditForm.replaceEnd,
                            replaceTeaid: this.auditForm.replaceTeaid,
                            replaceCourseid: this.auditForm.replaceCourseid,
                            replaceTeaid: this.auditForm.replaceTeaid,
                            oneWeek: this.auditForm.oneWeek,
                        }
                        console.log(dataBox)
                        if(this.curClick == '修改') {
                            // 修改
                            let param = qs.stringify(dataBox)
                            apis.updateAllot(param).then((res) =>{
                                if(res){
                                    this.$message({
                                        type:'success',
                                        message:'修改成功'
                                    })
                                    this.curClick = ''
                                    this.getUserList()
                                    this.auditForm.dialogFormVisible = false
                                }
                            })
                        } else {
                            // 添加
                        }                            
                    }
               })
           },
           getRoom () {
               this.setForm.dialogFormVisible = true
           },
           getRoomList (){
               var data = {
                   pageNo: this.setForm.pageNo,
                   pageSize:this.setForm.pageSize,
                   floorId:this.setForm.floorId,
                   roomName: this.setForm.roomName
               }
               apis.getAllRoom(data).then(res =>{
                   if(res){
                       this.setForm.setTableData = res.data.data.list
                       this.setForm.count = res.data.data.count
                   }
               })
           },
           handleSetSizeChange(val){
               this.setForm.pageSize = val
               this.getRoomList()
           },
           handleSetCurrentChange (val) {
               this.setForm.pageNo = val
               this.getRoomList()
           },
           handleCurrentSetChange (obj){
              console.log(obj)
              this.auditForm.placeName = obj.roomName
              this.auditForm.placeId = obj.id
              this.setForm.dialogFormVisible = false
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
               this.curClick = str
               var len = this.multipleSelection.length
               if(len != 1) {
                   this.$message({
                       type:'error',
                       message:`请选择一条数据${str}`
                   })
                   return false
               } 
                var aduitStatus = this.multipleSelection[0].auditingState
                var courseId = this.multipleSelection[0].id
                var startWeek = this.multipleSelection[0].startWeek
                var endWeek = this.multipleSelection[0].endWeek
                var studyHours = this.multipleSelection[0].studyHours
                var params = {
                    id: courseId,
                    startWeek: startWeek,
                    endWeek: endWeek,
                    studyHours:studyHours
                }
                // 获取合班的接口
                var data = qs.stringify(params)
                apis.getAllCourseClass(data).then(res =>{
                    if(res){
                       this.auditForm.inClassList = res.data.data
                    }
                })
                // 获取接替课程的接口
                let dataR = {
                   id: courseId,
                   studyHours:studyHours 
                }
                let dataParam = qs.stringify(dataR)
                apis.getReplace(dataParam).then(res =>{
                    if(res){
                       let arr1 = res.data.data
                       let arr2 = [{startWeek:'开始周',endWeek:'结束周',courseName:'课程名称',disabled:true,courseId:'11111111111111111111'}]
                        this.auditForm.replaceCourseList = [...arr2,...arr1]
                    }
                })
               if(str == '添加') {
                   if(aduitStatus != '1' && aduitStatus != '4') {
                        this.$message({
                            type:'error',
                            message:`只能${str}状态为"已提交待审核"和"审核不通过"和"审批不通过"的信息！`
                        })
                        return false
                   }
                   this.auditForm.dialogFormVisible = true
               } else if(str == '修改') {
                    if(aduitStatus == '3' || aduitStatus == '5') {
                        this.$message({
                            type:'error',
                            message:`审批通过和审核通过待审批的不能${str}！`
                        })
                        return false
                    }
                    let obj = this.multipleSelection[0]
                    this.auditForm.courseId = obj.id
                    this.auditForm.clazzName = obj.clazzName
                    this.auditForm.courserName = obj.courserName
                    this.auditForm.courseIdCategory = obj.courseIdCategory
                    this.auditForm.totalHour = obj.totalHour
                    this.auditForm.alreadyHour = obj.alreadyHour
                    this.auditForm.totalScore = obj.totalScore
                    this.auditForm.credit = obj.credit
                    this.auditForm.examFormName = obj.examFormName
                    this.auditForm.startWeek = obj.startWeek
                    this.auditForm.endWeek = obj.endWeek
                    this.auditForm.studyHours = obj.studyHours
                    this.auditForm.teacherName = obj.teacherId
                    this.auditForm.oneWeek = obj.oneWeek
                    this.auditForm.classOrder = obj.classOrder
                    this.auditForm.placeName = obj.placeName
                    this.auditForm.placeId = obj.placeId
                    this.auditForm.classNum = obj.classNum
                    this.auditForm.replaceCourseid = obj.replaceCourseid
                    this.auditForm.inClass = obj.inClass != '' && obj.inClass != null? obj.inClass.split(',') : []
                    this.auditForm.teaTextbookName = obj.teaTextbookName
                    this.auditForm.stuTextbookName = obj.stuTextbookName
                    this.auditForm.allotInstitutionName = obj.allotInstitutionName
                    this.auditForm.dialogFormVisible = true 
               } else if(str == "删除") {
                   if(aduitStatus == '3' || aduitStatus == '5') {
                        this.$message({
                            type:'error',
                            message:`"审核通过"和"审批通过"的不能${str}`
                        })
                        return false
                   }
                   this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() =>{
                            apis.delAudit(qs.stringify({id:courseId})).then(res =>{
                                if(res) {
                                    this.getUserList()
                                }
                            })
                        }).catch(()=>{

                        })
               }
           },
           aduit (str) {
               var len = this.multipleSelection.length
               if(len == 0) {
                   this.$message({
                       type:'error',
                       message:'请选择一条数据审核'
                   })
                   return false
               } 
               let ids = []
               if(this.multipleSelection.some(function(obj){
                   let status = obj.auditingState
                   let flag = status != '4'
                   return flag
               })){
                   this.$message({
                       type:'error',
                       message:'只能审核状态为"审核通过待审批"的信息'
                   })
               } else {
                   this.multipleSelection.map(function(obj){
                       ids.push(obj.id)
                   })
                   let data = qs.stringify({id:ids})
                   if(str == 'pass') {
                        apis.passAllot(data).then(res =>{
                            if(res){
                                this.$message({
                                    type:'success',
                                    message:'提交成功'
                                })
                                this.getUserList()
                            }
                        })  
                   }else{
                       apis.nopassAllot(data).then(res =>{
                        if(res){
                            this.$message({
                                type:'success',
                                message:'提交成功'
                            })
                            this.getUserList()
                        }
                    })
                   }
               }

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
             // 获取教室的列表页面
            this.getRoomList()
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


