<template>
  <div>
    <div  class="btnS btnBox">
        <span @click="absence"><span class="btn qingjia"></span>添加课程</span>
            <el-upload
                class="upload-demo"
                :action="importUrl"
                :auto-upload="true"
                :on-success="handleAvatarSuccess" 
                :data="fileData"
                :show-file-list="false"
                accept=".xlx,.xls,.xlsx"
                name="filePath"
                >
                <span class="imgScript2 daoru2 paddingLeft"></span>
	            <span class="fontColor2 paddingRight2">导入</span>
                <!-- <el-button size="small" type="text">点击添加</el-button> -->
            </el-upload>
            
        <a :href="exportUrl">
            <span class="imgScript2 exporticon2"></span>
	        <span class="fontColor2 paddingRight2">导出</span>
        </a>
        <a  :href="downLoadUrl">
            <span class="imgScript2 loadDown"></span>
            <span class="fontColor2 paddingRight2">下载模板</span>
        </a>
        <span class="imgScript2 dayin"></span>
	    <span class="fontColor2 paddingRight2">打印</span>
    </div>
    
    <el-table
                 	fit
				    :data="tableData"
                    style="margin:0 16px 0 24px;width:1160px;" max-height="360">
				    <el-table-column
				      type="index"
				      label="序号" width="128">
				    </el-table-column>
				    <el-table-column
				      label="课程号" width="128">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.courseNum }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="课程名称" width="128">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.courseName }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="课程分类" width="128">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.str1 }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="课程类型" width="128">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.str2 }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="title"
				      label="连排节数" width="128">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.classNum }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="开课机构" width="128">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.str3 }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      label="课程介绍">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.courseDesc }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      label="操作">
				       <template slot-scope="scope" >
                            <el-button size="mini" class="formBox" type="primary" plain @click.stop.prevent="editorDialog(scope.row)">编辑</el-button>
							<el-button size="mini" class="formBox" type="danger" plain @click.stop.prevent="deleteDialog(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>				    			    			    
				  </el-table>
                  <div class="con_left_tab_con_page">
                	<el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page.sync="pageNo"
					      :page-size="10"
                          :page-sizes="[10,20,50,100,200,400]"
					      layout="total, sizes,prev, pager, next,jumper"
					      :total="count">
    				</el-pagination>
                </div>
    <!--添加和编辑-->
    <el-dialog :title="addForm.title" :visible.sync="addForm.dialogFormVisible"  class="dialogImg" size="tiny" @close="closeDialog('addForm')">
        <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" :label-position="right" label-width="110px" enctype="multipart/form-data" class="formBox">
                <el-form-item label="课程分类:" prop="courseClass">
                    <el-select v-model="addForm.courseClass" placeholder="" style="width:150px;" >
                        <el-option :label="item.courseName" :value="item.id" :key="item.id" v-for="item in addForm.courseClassList"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="课程类型:" prop="courseType">
                    <el-select v-model="addForm.courseType" placeholder="" style="width:150px;" >
                        <el-option :label="item.courseName" :value="item.id" :key="item.id" v-for="item in addForm.courseTypeList"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程号:" prop="courseNum">
                        <el-input type="text"  v-model="addForm.courseNum" class="inputWidth" style="width:150px;" ></el-input> 
                </el-form-item>
                <el-form-item label="课程名称:" prop="courseName">
                        <el-input type="text"  v-model="addForm.courseName" class="inputWidth" style="width:150px;" ></el-input> 
                </el-form-item>
                <!-- <el-form-item label="课程别名:">
                        <el-input type="text"  v-model="addForm.courseAlias" class="inputWidth" style="width:150px;" ></el-input> 
                </el-form-item> -->
                <el-form-item label="开课机构:" prop="courseOrg">
                       <el-cascader
                        :options="addForm.schoolBeign"
                        v-model="addForm.courseOrg"
                        :props="props"
                        :show-all-levels="false"
                        change-on-select
                        ></el-cascader> 
                </el-form-item>
                <el-form-item label="连堂节数:" prop="classNum" >
                        <el-input type="text"  v-model="addForm.classNum" class="inputWidth" style="width:150px;"></el-input> 
                </el-form-item>
                <!-- <el-form-item label="连堂次数:" prop="classOrder">
                        <el-input type="text"  v-model="addForm.classOrder" class="inputWidth" style="width:150px;"></el-input> 
                </el-form-item> -->
                <!-- <el-form-item label="上课时间:" prop="oneWeek">
                        <el-radio-group v-model="addForm.oneWeek">
                            <el-radio :label="0">不限</el-radio>
                            <el-radio :label="1">单周</el-radio>
                            <el-radio :label="2">双周</el-radio>
                        </el-radio-group>
                </el-form-item> -->
                <el-form-item label="课程介绍:">
                        <el-input type="textarea"  v-model="addForm.courseDesc" class="inputWidth" style="width:250px;" :rows="4" resize="none"></el-input>
                </el-form-item>
                
        </el-form>
        <div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="successDialog('addForm')">保 存</el-button>
		</div>
    </el-dialog>    
  </div>
</template>
<script>
import apis from '../../apis/courseManage.js'
import commonApi from '../../apis/common.js'
import { getToken } from '../../utils/auth'
const qs = require('querystring')
export default {
  data () {
      return {
          tableData:[],
          pageNo:1,
          pageSize:10,
          count:1,
          addForm:{
               id:'',
               title:'',
               dialogFormVisible:false,
               schoolBeign:[],
               courseClassList:[],
               courseTypeList:[],
               courseClass:'',
               courseType:'',
               courseNum:'',
               courseName:'',
               courseOrg:[],
               classNum:'',
               courseDesc:''
          },
          props:{
              value:'id',
              label:'label',
              children:'children'
          },
          rules:{
             courseClass:[
                { required: true, message: '请选择课程分类', trigger: 'change' }
             ],
             courseType:[
                { required: true, message: '请选择课程类型', trigger: 'change' }
             ],
             courseNum:[
                { required: true, message: '请填写课程号', trigger: 'change' }
             ], 
             courseName:[
                { required: true, message: '请填写课程名称', trigger: 'change' }
             ], 
             courseOrg:[
                { required: true, message: '请选择开课机构', trigger: 'change', type:'array'}
             ],
             classNum:[
                { required: true, message: '请填写连堂节数', trigger: 'change' }
             ]
          },
          right:'right',
          exportUrl:'',
          importUrl:'',
          downLoadUrl:'',
          access:'',
          fileData:{},
          newArr:[]
      }
  },
  methods:{
      deleteDialog (obj) {
          var params = {
              id: obj.id
          }
          apis.deleteCourse(params).then(res =>{
              if(res) {
                  this.$message({
                      type:'success',
                      message:'删除成功'
                  })
                 this.getList()
              }
          })
      },
      editorDialog (obj) {
           this.addForm.id = obj.id
           this.addForm.courseNum = obj.courseNum
           this.addForm.courseName = obj.courseName
           this.addForm.courseClass = obj.courseClass
           this.addForm.courseType = obj.courseType
           this.addForm.courseOrg = obj.courseOrg.split(',')
           this.addForm.classNum = obj.classNum
           this.addForm.classOrder = obj.classOrder
           this.addForm.courseDesc = obj.courseDesc
           this.addForm.title = '编辑课程'
           this.addForm.dialogFormVisible =  true
      },
      absence () {
          this.addForm.title =  '新增课程'
          this.addForm.dialogFormVisible = true
      },
      closeDialog (form) {
           this.$refs[form].resetFields();
           this.addForm.title =  ''
           this.addForm.courseNum = ''
           this.addForm.courseName = ''
           this.addForm.courseClass = ''
           this.addForm.courseType = ''
           this.addForm.courseOrg = []
           this.addForm.classNum = ''
           this.addForm.classOrder = ''
           this.addForm.oneWeek = 0
           this.addForm.courseAlias = ''
           this.addForm.courseDesc = ''
           this.addForm.dialogFormVisible = false
      },
      handleSizeChange (val) {
          this.pageSize = val
          this.getList()
      },
      handleCurrentChange (val) {
          this.pageNo = val
          this.getList()
      },
      successDialog (form) {
          this.$refs[form].validate((valid) => {
                if (valid) {
                    var newCourseOrg = ''
                        newCourseOrg = this.addForm.courseOrg.join(',')
                   
                    if(this.addForm.id) {
                        // 编辑
                        var params = {
                            id: this.addForm.id,
                            courseNum: this.addForm.courseNum,
                            courseName: this.addForm.courseName,
                            courseClass: this.addForm.courseClass,
                            courseType: this.addForm.courseType,
                            courseOrg: newCourseOrg,
                            classNum: this.addForm.classNum,
                            courseDesc: this.addForm.courseDesc
                        }
                        var formData = qs.stringify(params);
                        apis.updateCourse(formData).then(res =>{
                            if(res) {
                                this.$message({
                                    type:'success',
                                    message:'编辑成功'
                                })
                                this.getList()
                                this.addForm.dialogFormVisible = false
                            }
                        })
                    } else {
                        // 新增
                        var params = {
                            courseNum: this.addForm.courseNum,
                            courseName: this.addForm.courseName,
                            courseClass: this.addForm.courseClass,
                            courseType: this.addForm.courseType,
                            courseOrg: newCourseOrg,
                            classNum: this.addForm.classNum,
                            courseDesc: this.addForm.courseDesc
                        }
                        var formData = qs.stringify(params);
                        apis.addCourse(formData).then(res =>{
                            if(res) {
                                this.$message({
                                    type:'success',
                                    message:'保存成功'
                                })
                                this.getList()
                                this.addForm.dialogFormVisible = false
                            }
                        })
                    }
                }
          })
      },
      getList () {
          var params = {
              courseName: '',
              courseOrg:'',
              courseType:'',
              pageSize: this.pageSize,
              pageNo: this.pageNo
          }
          apis.getCourseAllLists(params).then(res =>{
              if(res){
                  var data = res.data.data
                  this.count = data.count
                  this.tableData = data.list
              }
          })
      },
      getInstitution () {
          var param = {
                xz: 2
              };
         commonApi.getInstitution(param).then(res =>{
             var data = res.data.data
             this.addForm.schoolBeign = data[0].children
             console.log(this.addForm.schoolBeign)
         })
      },
      getCourse () {
          var params = {
              type: 0
          }
          // 课程分类
          apis.getCourseAllList(params).then(res =>{
              if(res) {
                  this.addForm.courseClassList = res.data.data
              }
          })
          var data = {
              type:1
          }
          // 课程类型
         apis.getCourseAllList(data).then(res =>{
             if(res) {
                 this.addForm.courseTypeList = res.data.data
             }
          })
      },
      handleAvatarSuccess (res) {
          var me = this
          if(res){
              setTimeout(function(res){
                if(res){
                    me.getList()
                }
              }, 500)
          }
          
      },
      importExecl () {},
      loadFun () {
          // 获取下载模板
          apis.downLoadData().then(res =>{
              if(res) {
                  var url = res.data.data
                  console.log(url)
                  this.downLoadUrl = url
                //   setTimeOut(function (){
                      
                //   },500)
              }
          })
          // 获取导出数据的表格
          apis.exportData().then(res =>{
              if(res) {
                  var url = res.data.data
                   console.log(url)
                  this.exportUrl = url
              }
          })
      }
  }, 
  mounted () {
      // 获取课程分类的列表页
      this.getList()
      // 获取开课机构的接口
      this.getInstitution()
      // 获取课程类型和分类的接口
      this.getCourse()
      // 获取下载和导出模板的路径
      this.loadFun()
      this.fileData = {
           access_token: getToken()
      }
      this.importUrl = apis.importData()
      
  }
}
</script>
<style lang="scss" scoped>
    @import '../../common/css/common.scss';
    .btnBox{
        padding-left:24px;
        color:#208af5;
    }
    .paddingLeft{
	  margin-left:22px;
    }
</style>
<style lang="scss">
    button.formBox.el-button--mini{
            padding: 7px 6px;
    }
</style>



