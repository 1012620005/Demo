<template>
    <div>
       <div class="demo-form-inline">
            <div  class="btnS" @click="absence" style="cursor:pointer"><span class="btn qingjia"></span>添加课程教学时间</div>
       </div>
		<el-table
				    :data="tableData"
				    fit style="margin: 0 16px 0 24px;width:1160px;">
					    <el-table-column
					      type="index"
					      label="序号" width="80">
					    </el-table-column>
					    <el-table-column
					      prop="subjectName"
					      label="课程名称" show-overflow-tooltip>
					    </el-table-column>
					    <el-table-column
					      prop="totalSudtyTime"
					      label="总学时" show-overflow-tooltip>
					    </el-table-column>
					    <el-table-column
					      prop="theoryTime"
					      label="理论时" >
                        </el-table-column>
					    <el-table-column
					      prop="cotentTraining"
					      label="课内容实训时" show-overflow-tooltip>
					    </el-table-column>
					    <el-table-column
					      prop="togetherTraining"
					      label="课程综合实训">                          
					    </el-table-column>
					    <el-table-column
					      label="操作" min-width="200">
					       <template slot-scope="scope">
					       	  <div class="box">
					           	   <span class="btns editor" @click="editorDialog(scope.row)" style="cursor:pointer"></span>
					           	   <span class="btns delete" @click="deleteDialog(scope.row.id)" style="cursor:pointer"></span>
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
    <!--添加课程和编辑课程-->
    <el-dialog :title="addForm.title" :visible.sync="addForm.dialogFormVisible"  class="dialogImg" size="tiny" @close="closeDialog('addForm')">
        <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" :label-position="right" label-width="110px" enctype="multipart/form-data" class="formBox">
                <el-form-item label="课程名称:" prop="subjectName">
                        <el-select v-model="addForm.subjectName" placeholder="" style="width:150px;" >
                           <el-option :label="item.SubjectName" :value="item.id" :key="item.id" v-for="item in addForm.subjectList"></el-option>
                        </el-select>
                </el-form-item> 
                <el-form-item label="总学时:">
                        <el-input type="text"  v-model="addForm.period" class="inputWidth"></el-input>
                </el-form-item>
                <el-form-item label="理论时:">
                        <el-input type="text"  v-model="addForm.theory" class="inputWidth"></el-input> 
                </el-form-item>
                <el-form-item label="课内容实训时:">
                        <el-input type="text"  v-model="addForm.lecture" class="inputWidth"></el-input> 
                </el-form-item>                
                <el-form-item label="课程综合实训:">
                         <el-input type="text"  v-model="addForm.training" class="inputWidth"></el-input>
                </el-form-item>
                
        </el-form>
        <div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="successDialog('addForm')">保 存</el-button>
		</div>
    </el-dialog>                  
    </div>
</template>
<script>
	import apis from '../../apis/traning.js'
    import commonApi from '../../apis/common.js'   
    export default {
        data () {
            return {
                formInline:{
                    size: 1,
                    currentPage:1
                },
                tableData: [],
                addForm:{
                    id:'',
                    title:'',
                    dialogFormVisible: false,
                    subjectName:'',
                    subjectList:[],
                    period:'',
                    theory:'',
                    lecture:'',
                    training:''
                },
                rules:{
                   subjectName:[{ required: true, message: '请选择课程名称', trigger: 'change' }],
                   period:[{required: true, message: '请填写总学时', trigger: 'change'}],
                   theory:[{required: true, message: '请填写理论时', trigger: 'change'}],
                   lecture:[{required: true, message: '请填写课内容实训时', trigger: 'change'}],
                   training:[{required: true, message: '请填写课程综合实训', trigger: 'change'}]
                },
                right:'right'
            }
        },
        methods:{
            absence () {
                this.addForm.title = '新增课程教学时间'
                this.addForm.dialogFormVisible = true
            },
            closeDialog (form) {
                if(form) {
                    this.$refs[form].resetFields();
                } 
                this.addForm.id = ''
                this.addForm.title = ''
                this.addForm.subjectName = ''
                this.addForm.period = ''
                this.addForm.theory = ''
                this.addForm.lecture = ''
                this.addForm.training = ''
            },
            editorDialog (obj) {
                this.addForm.title = '编辑课程教学时间'
                this.addForm.id = obj.id
                this.addForm.subjectName = obj.subject
                this.addForm.period = obj.totalSudtyTime
                this.addForm.theory = obj.theoryTime
                this.addForm.lecture = obj.cotentTraining
                this.addForm.training = obj.togetherTraining
                this.addForm.dialogFormVisible = true
            },
            deleteDialog (id) {
                var _this = this
                this.$confirm('你确定删除吗？').then(() =>{
                    apis.deleteCourseTime({id:id}).then(res =>{
                        if(res){
                            if(res.data.meta.code == 200) {
                                _this.$message({
                                    type:'success',
                                    message:'删除成功'
                                })
                                _this.getAllList()
                            }
                        }
                    })
                }).catch(() =>{

                })
            },
            handleCurrentChange (val) {
                this.getAllList(val)
            },
            getAllSubject () {
                var _this = this
                commonApi.getAllSubject().then(res =>{
                    if(res) {
                        var data = res.data.data
                        _this.addForm.subjectList = data
                    }
                })
            },
            successDialog (form) {
                var _this = this
				this.$refs[form].validate((valid) => {
                    if (valid) {
                        if(this.addForm.id) {
                            var data = {
                                id: this.addForm.id,
                                subject: this.addForm.subjectName,
                                totalSudtyTime: this.addForm.period,
                                theoryTime: this.addForm.theory,
                                cotentTraining: this.addForm.lecture,
                                togetherTraining: this.addForm.training
                            }
                            var qs = require('querystring')
                            var datax = qs.stringify(data)
                            apis.updateCourseTime(datax).then(res =>{
                                if (res) {
                                    if(res.data.meta.code ==  200) {
                                        _this.$message({
                                            type:'success',
                                            message:'编辑成功'
                                        })
                                        _this.addForm.dialogFormVisible = false
                                        _this.getAllList()
                                    }
                                }
                            })
                        } else {
                             var formData = new FormData()
                            formData.append('subject',this.addForm.subjectName)
                            formData.append('totalSudtyTime',this.addForm.period)
                            formData.append('theoryTime',this.addForm.theory)
                            formData.append('cotentTraining',this.addForm.lecture)
                            formData.append('togetherTraining',this.addForm.training)
                            apis.addCourseTime(formData).then(res =>{
                                if (res) {
                                    if(res.data.meta.code == 200) {
                                        _this.$message({
                                            type:'success',
                                            message:'添加成功'
                                        })
                                        _this.addForm.dialogFormVisible = false
                                        _this.getAllList()
                                    }
                                }
                           })
                        }
                        
                    }
                })    
            },
            getAllList (pageNum) {
                var data = {
                    pageSize: 10,
                    pageNo:pageNum ? pageNum : 1
                }
                var _this = this
                apis.getCourseTimeList().then(res =>{
                    if(res){
                        var data = res.data.data
                       _this.tableData = data.list
                       _this.formInline.size = data.count
                    }
                })
            }
        },
        mounted () {
            // 获取所有的学科
            this.getAllSubject()
            // 获取列表
            this.getAllList()
        }
    }
</script>
<style lang="scss">

</style>


