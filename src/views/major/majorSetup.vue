<template>
  <div>
    <div class="fileForm">
      <div  class="btnS btnBox" @click="absence" style="width:100px"><span class="btn qingjia"></span>添加</div>
      <el-upload
            class="upload-demo"
            :action="importUrl"
            :auto-upload="true"
            :show-file-list="false"
            accept=".xlx,.xls,.xlsx"
            name="filePath"
            >
            <span class="imgScript2 daoru2 paddingLeft"></span>
            <span class="fontColor2 paddingRight2">导入</span>
        </el-upload>
        <a :href="exportUrl">
            <span class="imgScript2 exporticon2"></span>
          <span class="fontColor2 paddingRight2">导出</span>
        </a>
        <a  :href="downLoadUrl">
            <span class="imgScript2 loadDown"></span>
            <span class="fontColor2 paddingRight2">下载模板</span>
        </a>
      </div>  
    <el-table
            fit
				    :data="tableData"
                    style="margin:0 16px 0 24px;width:1160px;">
				    <el-table-column
				      type="index"
				      label="序号" width="288">
				    </el-table-column>
				    <el-table-column
				      prop="courseName"
				      label="专业类" width="288">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.parentname }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="courseName"
				      label="专业名称" width="288">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.name }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      label="操作" width="288">
				       <template slot-scope="scope">
                             <el-button size="mini" class="formBox" type="primary" plain @click.stop.prevent="editorDialog(scope.row)">编辑</el-button>
							<el-button size="mini"  type="danger"  class="formBox" plain @click.stop.prevent="deleteDialog(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>				    			    			    
				  </el-table>
                  <div class="con_left_tab_con_page">
                	<el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page.sync="pageNo"
					      :page-size="pageSize"
                          :page-sizes="[50,100,200,400]"
					      layout="total, sizes,prev, pager, next,jumper"
					      :total="count">
    				</el-pagination>
                </div>
    <!--编辑和添加专业-->
    <el-dialog :title="addForm.title" :visible.sync="addForm.dialogFormVisible"  class="dialogImg" size="tiny" @close="closeDialog('addForm')">
        <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" :label-position="right" label-width="110px" enctype="multipart/form-data" class="formBox">
                <el-form-item label="专业类:" prop="parentid">
                    <el-select v-model="addForm.parentid" placeholder="" style="width:150px;" >
                        <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in addForm.proList"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="专业名称:" prop="name">
                        <el-input type="text"  v-model="addForm.name" class="inputWidth" style="width:150px;" ></el-input> 
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="successDialog('addForm')">保 存</el-button>
		</div>
    </el-dialog>
  </div>
</template>
<script>
import apis from '../../apis/major.js'
const qs = require('querystring')
export default {
  data () {
      return {
          tableData:[],
          pageNo:1,
          pageSize:50,
          count:1,
          importUrl:'',
          exportUrl:'',
          downLoadUrl:'',
          addForm:{
               id:'',
               title:'',
               dialogFormVisible:false,
               proList:[], 
               parentid:'',
               name:''
          },
           right:"right",
           rules:{
             parentid:[
                { required: true, message: '请选择专业类', trigger: 'change' }
             ],
             name:[
                { required: true, message: '请填写专业名称', trigger: 'change' }
             ]
           }
      }
  },
  methods:{
      deleteDialog (obj) {
          var params = {
              id: obj.id
          }
          var data = qs.stringify(params)
          apis.deleteProList(data).then(res =>{
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
          this.addForm.title =  '编辑专业'
          this.addForm.dialogFormVisible = true 
          this.addForm.id = obj.id
          this.addForm.name = obj.name
          this.addForm.parentid = obj.parentid
      },
      absence () {
          this.addForm.title =  '新增专业'
          this.addForm.dialogFormVisible = true 
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
                        if(this.addForm.id) {
                            // 编辑
                            var params = {
                                id: this.addForm.id,
                                name: this.addForm.name,
                                parentid: this.addForm.parentid
                            }
                            var formData = qs.stringify(params);
                            apis.addOrUpdateProList(formData).then(res =>{
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
                                name: this.addForm.name,
                                parentid: this.addForm.parentid
                            }
                            var formData = qs.stringify(params);
                            apis.addOrUpdateProList(formData).then(res =>{
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
      closeDialog(form){
           this.$refs[form].resetFields();
           this.addForm.title =  ''
           this.addForm.name = ''
           this.addForm.parentid = ''
      },
      getList() {
        var params = {
              pageSize: this.pageSize,
              pageNo: this.pageNo,
          };
          apis.getProListData(params).then(res =>{
              var data = res.data.data
              this.count = data.count
              this.tableData = data.list
          })
      },
      // 获取专业类别
      getProClassList () {
         var params = {
             xz: 1
         }
         apis.searchProList(params).then(res =>{
             if(res) {
                this.addForm.proList = res.data.data
             }
         })
      }
      
  },
  mounted () {
      // 获取课程分类的列表页
      this.getList()
      this.getProClassList()

  }
}
</script>
<style lang="scss" scoped>
    @import '../../common/css/common.scss';
    .btnBox{
        padding-left:24px;
        color:#208af5;
    }
    .fileForm{
      display:flex;
      align-items: center;
    }
</style>




