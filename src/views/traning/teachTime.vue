<template>
    <div>
       <!-- <div class="demo-form-inline">
            <div  class="btnS" @click="absence" style="cursor:pointer"><span class="btn qingjia"></span>添加教学活动时间表</div>
       </div> -->
				  <el-table
				    :data="tableData"
				    fit style="margin: 0 16px 0 24px;width:1160px;">
					    <el-table-column
					      type="index"
					      label="序号" width="80">
					    </el-table-column>
					    <!-- <el-table-column
					      prop="schoolZoneName"
					      label="校区" show-overflow-tooltip>
					    </el-table-column>
                         <el-table-column
					      prop="deptName"
					      label="院系" >
					    </el-table-column>
					    <el-table-column
					      prop="majorName"
					      label="专业" show-overflow-tooltip>
					    </el-table-column> -->
					    <el-table-column
					      prop="studentSysName"
					      label="学制" show-overflow-tooltip>
					    </el-table-column> 
                        <el-table-column
					      prop="studentSysName"
					      label="状态" show-overflow-tooltip>
					    </el-table-column>                       
					    <el-table-column
					      label="操作" min-width="200">
					       <template slot-scope="scope">
					       	  <div class="box">
                                   <!-- <span class="imgScript seeBtn cursor" @click="seeDetial(scope.row)"></span>
					           	   <span class="btns editor cursor" @click="editorDialog(scope.row)" style="cursor:pointer"></span>
					           	   <span class="btns delete cursor" @click="deleteDialog(scope.row)" style="cursor:pointer"></span> -->
                                   <el-button size="mini" type="primary" plain @click="absence(scope.row)">设置</el-button>
                                   <el-button size="mini" type="primary" plain>修改</el-button>
                                   <el-button size="mini" type="warning" plain>撤销</el-button>
					           </div>          	           				           
					      </template>
					    </el-table-column>				    			    			    
				  </el-table>
	              <div class="con_left_tab_con_page">
	                	<el-pagination
						      @current-change="handleCurrentChange"
						      :current-page="formInline.currentPage"
						      :page-size="10"
						      layout="prev, pager, next, jumper"
						      :total="formInline.size">
	    				</el-pagination>
	              </div>
    <!--添加和编辑教学时间表-->
     <el-dialog :title="addForm.title" :visible.sync="addForm.dialogFormVisible"  class="dialogImg" size="tiny" @close="closedAddForm('addForm')">
            <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" label-position="right" label-width="80px" enctype="multipart/form-data" class="formBox">
                <!-- <el-form-item label="学制:" prop="systme">
                        <el-select v-model="addForm.systme" placeholder="" style="width:150px;" @change="changeYear">
                           <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in addForm.systmeList"></el-option>
                        </el-select>
                </el-form-item> 
                <el-form-item label="学年:" prop="schollYear">
                        <el-select v-model="addForm.schollYear" placeholder="" style="width:150px;" >
                           <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in addForm.showYearList"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="校区:" prop="campus">
                        <el-select v-model="addForm.campus" placeholder="" style="width:150px;" @change="findDepart">
                           <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in addForm.campusList"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="院系:" prop="depart">
                        <el-select v-model="addForm.depart" placeholder="" style="width:150px;" @change="findProf">
                           <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in addForm.departList"></el-option>
                        </el-select>
                </el-form-item>                
                <el-form-item label="专业:" prop="prof">
                        <el-select v-model="addForm.prof" placeholder="" style="width:150px;" >
                           <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in addForm.profList"></el-option>
                        </el-select>
                </el-form-item>  -->
                 <!-- <el-form-item label="学制:" >
                        <span>{{ addForm.studentSysName }}</span>
                </el-form-item> -->
                <!-- <div class="tranPlan" v-for="(item, index) in addForm.planList">
                    <el-form-item label="理论教学:">
                        <el-input type="text"  v-model="item.teachTime" class="inputWidth"></el-input>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="综合实训:">
                        <el-input type="text"  v-model="item.integrate" class="inputWidth"></el-input>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="入学教育:">
                       <el-input type="text"  v-model="item.entrance" class="inputWidth"></el-input>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="岗位培训:">
                        <el-input type="text"  v-model="item.jobTran" class="inputWidth"></el-input>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="就业指导:">
                        <el-input type="text"  v-model="item.votace" class="inputWidth"></el-input>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="军训:">
                        <el-input type="text"  v-model="item.malitary" class="inputWidth"></el-input>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="复习考试:">
                        <el-input type="text"  v-model="item.revise" class="inputWidth"></el-input>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="公益劳动:">
                        <el-input type="text"  v-model="item.voluntary" class="inputWidth"></el-input>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="假期:">
                        <el-input type="text"  v-model="item.holiday" class="inputWidth"></el-input>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="全年周数:">
                        <span class="yearWeeks">{{ item.countNum }}</span>
                    </el-form-item>                                                                                                                                                                                     
                </div> -->
                <!-- <div class="addBtn" @click="addOption"><span class="btn qingjia"></span>添加内容</div> -->
                <div class="tableBox">
                    <div class="tableNav">
                        <span class="title">单位周</span>
                        <span class="title">理论教学</span>
                        <span class="title">综合实训</span>
                        <span class="title">入学教育</span>
                        <span class="title">岗位培训</span>
                        <span class="title">就业指导</span>
                        <span class="title">军训</span>
                        <span class="title">复习考试</span>
                        <span class="title">公益劳动</span>
                        <span class="title">假期</span>
                        <span class="title">全年周数</span>
                    </div>
                    <div class="tableList" v-for="(item, index) in addForm.planList">
                        <span class="tableListName">第{{ index + 1}}学年</span>
                        <span class="tableListItem"><el-input v-model="item.teachTime" placeholder=""></el-input></span>
                        <span class="tableListItem"><el-input v-model="item.teachTime" placeholder=""></el-input></span>
                        <span class="tableListItem"><el-input v-model="item.teachTime" placeholder=""></el-input></span>
                        <span class="tableListItem"><el-input v-model="item.teachTime" placeholder=""></el-input></span>
                        <span class="tableListItem"><el-input v-model="item.teachTime" placeholder=""></el-input></span>
                        <span class="tableListItem"><el-input v-model="item.teachTime" placeholder=""></el-input></span>
                        <span class="tableListItem"><el-input v-model="item.teachTime" placeholder=""></el-input></span>
                        <span class="tableListItem"><el-input v-model="item.teachTime" placeholder=""></el-input></span>
                        <span class="tableListItem"><el-input v-model="item.teachTime" placeholder=""></el-input></span>
                        <span class="tableListItem"><el-input v-model="item.teachTime" placeholder=""></el-input></span>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="successDialog('addForm')">保 存</el-button>
			</div>       
     </el-dialog>    
    <!--查看教学时间表-->	
      <el-dialog title="查看教学时间表" :visible.sync="seeForm.dialogFormVisible"  class="dialogImg" size="tiny" @close="closedAddForm()">
            <el-form :model="seeForm"  label-position="right" label-width="80px"  class="formBox">
                <el-form-item label="学制:" >
                        <span>{{ seeForm.studentSysName }}</span>
                </el-form-item> 
                <el-form-item label="学年:" >
                       <span>{{ seeForm.studentYearName }}</span>
                </el-form-item>
                <el-form-item label="校区:">
                        <span>{{ seeForm.schoolZoneName }}</span>
                </el-form-item>
                <el-form-item label="院系:">
                        <span>{{ seeForm.deptName }}</span>
                </el-form-item>                
                <el-form-item label="专业:">
                        <span>{{ seeForm.majorName }}</span>
                </el-form-item> 
                <div class="tranPlan" v-for="(item, index) in seeForm.planList">
                    <el-form-item label="理论教学:">
                        <span>{{ item.teachTime }}</span>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="综合实训:">
                        <span>{{ item.integrate }}</span>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="入学教育:">
                       <span>{{ item.entrance }}</span>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="岗位培训:">
                        <span>{{ item.jobTran }}</span>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="就业指导:">
                       <span>{{ item.votace }}</span>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="军训:">
                        <span>{{ item.malitary }}</span>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="复习考试:">
                        <span>{{ item.revise }}</span>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="公益劳动:">
                        <span>{{ item.voluntary }}</span>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="假期:">
                        <span>{{ item.holiday }}</span>
                        <span class="planDay">周</span>
                    </el-form-item>
                    <el-form-item label="全年周数:">
                        <span class="yearWeeks">{{ item.countNum }}</span>
                    </el-form-item>                                                                                                                                                                                     
                </div>     
            </el-form>
     </el-dialog>   
    </div>
</template>
<script>
	import apis from '../../apis/traning.js'
    import commonApi from '../../apis/common.js'   
    export default {
        data () {
            return {
                datasss:['teachTime','integrate','entrance','jobTran','votace','malitary', 'revise', 'voluntary','holiday','countNum'],
                tableData:[],
                formInline:{
                    currentPage: 1,
                    size: 1 
                },
                addForm:{
                    id: '',
                    title:'',
                    dialogFormVisible: false,
                    systme: '',
                    systmeList:[],
                    schollYear:'',
                    showYearList:[],
                    schollYearList:[],
                    campus:'',
                    campusList:[],
                    depart: '',
                    departList:[],
                    prof:'',
                    profList:[],
                    planList:[{
                        teachTime:'',
                        integrate:'',
                        entrance:'',
                        jobTran:'',
                        votace:'',
                        malitary:'',
                        revise:'',
                        voluntary:'',
                        holiday: '',
                        countNum: 0
                   },{
                        teachTime:'',
                        integrate:'',
                        entrance:'',
                        jobTran:'',
                        votace:'',
                        malitary:'',
                        revise:'',
                        voluntary:'',
                        holiday: '',
                        countNum: 0 
                   }]
                },
                seeForm:{
                    id: '',
                    dialogFormVisible: false,
                    deptName:'',
                    majorName:'',
                    schoolZoneName:'',
                    studentSysName:'',
                    studentYearName:'',
                    planList:[]  
                },
                rules:{
                    systme:[{ required: true, message: '请选择学制', trigger: 'change' }],
                    schollYear:[{ required: true, message: '请选择学年', trigger: 'change' }],
                    campus:[{ required: true, message: '请选择校区', trigger: 'change' }],
                    depart:[{ required: true, message: '请选择院系', trigger: 'change' }],
                    prof:[{ required: true, message: '请选择专业', trigger: 'change' }]
                }
            }
        },
        components:{
           
        },
        methods:{
            absence () {
                this.addForm.title = '教学活动时间设置'
                this.addForm.dialogFormVisible = true
            },
            changeYear(val) {
               this.addForm.showYearList = this.addForm.schollYearList.slice(0,Number(val))
            },
            seeDetial(obj) {
                var obj = {
                    dept: obj.dept,
                    major: obj.major,
                    schoolZone: obj.schoolZone,
                    studentSys: obj.studentSys
                }
                this.seeForm.dialogFormVisible = true
                var _this = this
                apis.seeTeachTimeDetial(obj).then(res =>{
                    if (res) {
                        if(res.data.meta.code == 200) {
                            var data = res.data.data
                            _this.seeForm.deptName = data.deptName
                            _this.seeForm.majorName = data.majorName
                            _this.seeForm.schoolZoneName = data.schoolZoneName
                            _this.seeForm.studentSysName = data.studentSysName
                            _this.seeForm.studentYearName = data.studentYearName
                           var obj = data.type
                           var arr = []
                           for(var n in obj) {
                            var lie = obj[n]
                              arr.push(lie)
                           }
                           for(var i = 0; i < arr.length; i++) {
                               var obj = arr[i]
                               console.log(obj)
                               var newObj = {}
                               for(var j = 0 ; j < obj.length; j++) {
                                //    newObj[obj[j].trainPlanTypeLabel] = obj[j].trainPlainValue
                                    newObj[this.datasss[j]] = obj[j].trainPlainValue
                               }
                               _this.seeForm.planList.push(newObj)
                               newObj = {}
                           }
                        }
                    }   
                })                
            },
            formChange (obj,form){
                
            },
            editorDialog (obj) {
                var objs = {
                    dept: obj.dept,
                    major: obj.major,
                    schoolZone: obj.schoolZone,
                    studentSys: obj.studentSys
                }
                var _this = this
                this.addForm.id = obj.id
                apis.seeTeachTimeDetial(objs).then(res =>{
                    if (res) {
                      if(res.data.meta.code == 200) {
                            this.addForm.title = '编辑教学活动时间表'
                            var data = res.data.data
                            console.log(data)
                            _this.addForm.prof = data.major
                            _this.addForm.campus = data.schoolZone
                            _this.addForm.systme = data.studentSys
                            _this.addForm.schollYear = data.studentYear
                            _this.addForm.depart = data.dept
                            _this.addForm.planList = []
                            _this.changeYear(_this.addForm.systme)
                            _this.findDepart(_this.addForm.campus)
                            _this.findProf(_this.addForm.depart)
                            console.log(_this.addForm.prof)
                           var obj = data.type
                           var arr = []
                           for(var n in obj) {
                            var lie = obj[n]
                              arr.push(lie)
                           }
                           for(var i = 0; i < arr.length; i++) {
                               var obj = arr[i]
                               console.log(obj)
                               var newObj = {}
                               for(var j = 0 ; j < obj.length; j++) {
                                //    newObj[obj[j].trainPlanTypeLabel] = obj[j].trainPlainValue
                                    newObj[this.datasss[j]] = obj[j].trainPlainValue
                               }
                               _this.addForm.planList.push(newObj)
                               newObj = {}
                               _this.addForm.dialogFormVisible = true
                           }
                        } 
                    }   
                })                 
            },
            deleteDialog(obj) {
                var obj = {
                    dept: obj.dept,
                    major: obj.major,
                    schoolZone: obj.schoolZone,
                    studentSys: obj.studentSys
                }
                var _this = this
                this.$confirm('你确认删除吗？').then(()=>{
                    apis.delTeachTime(obj).then(res =>{
                        if(res) {
                           if(res.data.meta.code == 200) {
                               _this.$message({
                                   type:'success',
                                   message:'删除成功'
                               })
                               _this.getTeachTimeList()
                           }
                        }
                    })
                }).catch(()=>{

                })
            },
            handleCurrentChange (val) {
               this.getTeachTimeList(val)
            },
            addOption () {
                this.addForm.planList.push({
                    teachTime:'',
                    integrate:'',
                    entrance:'',
                    jobTran:'',
                    votace:'',
                    malitary:'',
                    revise:'',
                    voluntary:'',
                    holiday: '',
                    countNum: 0
                })
            },
            successDialog (form) {
                var _this = this
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let temp = {};
                        for(let i = 0, len = _this.addForm.planList.length; i < len; i++) {
                            temp[i+1] = [];
                            var obj = _this.addForm.planList[i]
                            var j = 1;
                            for(let key in obj) {
                                temp[i+1].push({
                                    'trainPlainTypeValue':j,
                                    'trainPlainValue': obj[key]
                                });
                                j++;
                            }
                        }
                        var data = {
                            studentSys: _this.addForm.systme,
                            studentYear:_this.addForm.schollYear,
                            schoolZone: _this.addForm.campus,
                            dept: _this.addForm.depart,
                            major: _this.addForm.prof,
                            type: temp
                        }
                        var dataw = JSON.stringify(data)
                        //console.log(data)
                        if(this.addForm.id) {
                            // 编辑
                            apis.updateTeachTime(dataw).then(res =>{
                                if(res){
                                    if(res.data.meta.code == 200) {
                                        _this.$message({
                                            type:'success',
                                            message:'编辑成功'
                                        })
                                        _this.addForm.dialogFormVisible = false
                                        _this.getTeachTimeList()
                                    }
                                }
                            })
                        } else {
                            // 新增
                            apis.saveTeachTime(dataw).then(res =>{
                                if(res) {
                                    console.log(res)
                                    if(res.data.meta.code ==  200) {
                                        _this.$message({
                                            type:'success',
                                            message:'保存成功'
                                        })
                                        _this.addForm.dialogFormVisible = false
                                        _this.getTeachTimeList()
                                    }

                                }
                            })
                        }
                    }
                })
            },
            closedAddForm (form) {
                if(form) {
                    this.$refs[form].resetFields();
                    this.addForm.depart = ''
                    this.addForm.campus = ''
                    this.addForm.systme = ''
                    this.addForm.schollYear = ''
                    this.addForm.prof = ''
                    this.addForm.planList = [{
                        teachTime:'',
                        integrate:'',
                        entrance:'',
                        jobTran:'',
                        votace:'',
                        malitary:'',
                        revise:'',
                        voluntary:'',
                        holiday: '',
                        countNum: 0 
                    }]
                } else{
                    this.seeForm.planList = []
                }
            },
            getCampusList () {
                this.addForm.depart = ''
                this.addForm.prof = ''
                var _this = this
                var data = {
                    id: 1,
                    type: 4
                };
                commonApi.getDepart(data).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.addForm.campusList = data
                    }
                })
            },
            findDepart (val) {
                var _this = this
                var data = {
                    id: val,
                    type: 2
                }
                commonApi.getDepart(data).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.addForm.departList =  data
                    }
                })
            },
            findProf (val) {
                var _this = this
                var data = {
                    id: val,
                    type: 3
                }
                commonApi.getDepart(data).then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.addForm.profList = data
                    }
                })
            },
            getSchool () {
                var _this = this
                apis.getSchool().then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.addForm.systmeList = data
                    }
                })
            },
            getYear () {
                var _this = this
                apis.getTranYear().then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.addForm.schollYearList = data 
                    }
                })
            },
            getTeachTimeList (pageNum) {
                var data = {
                    pageSize: 10,
                    pageNo:pageNum ? pageNum : 1
                }
                var _this = this
                apis.getTeachTimeList(data).then(res =>{
                    if (res) {
                        var data = res.data.data
                        _this.tableData = data.list
                        _this.formInline.size = data.count
                    }
                })
            }
        },
        computed:{

        },
        watch:{
            'addForm.planList':{
                handler (val) {
                    val.map(function(item){
                        item.countNum = Number(item.teachTime) + Number(item.integrate) + Number(item.entrance) +Number(item.jobTran) + Number(item.votace) + Number(item.malitary) + Number(item.revise) +Number(item.voluntary) +Number(item.holiday)
                    })
                },
                deep:true
            }
        },
        mounted () {
            // 获取校区
            this.getCampusList()
            // 获取学制
            this.getSchool()
            // 获取学年
            this.getYear()
            // 获取教学时间的列表页面
            this.getTeachTimeList(this.formInline.currentPage)
           
        }
    }
</script>
<style lang="scss" scoped>
     @import '../../common/css/common.scss';
    .formBox{
        position:relative;
    }
    .addBtn{
        position: absolute;
        right: 0;
        bottom:0;
        color:#208af5;
        display:flex;
        align-items:center;
    }
    .tableList{
        display:flex;
    }
    .tableListName{
        display: inline-block;
        width:200px;
        line-height:40px;
    }
    .tableListItem{
        border:1px solid #ccc;
    }
</style>
<style lang="scss">
    div.inputWidth.el-input{
        width:50%;
    }
    .tableListItem {
        .el-input__inner{
            border:none;
        }
    }
</style>
