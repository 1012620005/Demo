<template>
  <div class="container">
       <fc-header></fc-header>
    <div class="content">
       <return-bar :title="title"></return-bar>
        <div class="sLeave-bottom bookIndex"> 
            <div class="demo-form-inline">
                <div  class="btnS btnBox" @click="absence" style="width:60px;"><span class="btn qingjia"></span>添加</div>
                <span class="label" style="width:40px">类型</span>
                 <el-input
                    placeholder=""
                    suffix-icon="el-icon-search"
                    v-model="type" style="width:160px;" @blur="getList">
                </el-input>
                <span class="label" style="width:40px">名称</span>
                 <el-input
                    placeholder=""
                    suffix-icon="el-icon-search"
                    v-model="label" style="width:160px;"  @blur="getList">
                </el-input>
                <span class="label" style="width:40px">描述</span>
                 <el-input
                    placeholder=""
                    suffix-icon="el-icon-search"
                    v-model="description" style="width:160px;"  @blur="getList">
                </el-input>
            </div>
            <el-table
                 	fit
				    :data="tableData"
                    style="margin:0 16px 0 24px;width:1160px;" max-height="360">
				    <el-table-column
				      type="index"
				      label="序号" width="190">
				    </el-table-column>
				    <el-table-column
				      prop="label"
				      label="名称" width="190">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.label }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="value"
				      label="编号" width="190">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.value }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="description"
				      label="字典描述" width="190">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.description }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="type"
				      label="字典类型" width="190">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.type }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      label="操作" width="190">
				       <template slot-scope="scope">
							<el-button size="mini"  type="danger" plain @click.stop.prevent="deleteDialog(scope.row)">删除</el-button>
                             <el-button size="mini" class="formBox" type="primary" plain @click.stop.prevent="editorDialog(scope.row)">编辑</el-button>
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
  <el-dialog :title="addForm.title" :visible.sync="addForm.dialogFormVisible"  class="dialogImg" size="tiny" @close="closeDialog('addForm')">
        <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" label-position="right" label-width="110px" enctype="multipart/form-data" class="formBox">
                <el-form-item label="名称:" prop="label">
                        <el-input type="text"  v-model="addForm.label" class="inputWidth" style="width:150px;" ></el-input> 
                </el-form-item>
                 <el-form-item label="编号:" prop="value">
                        <el-input type="text"  v-model="addForm.value" class="inputWidth" style="width:150px;" ></el-input> 
                </el-form-item>
                 <el-form-item label="字典描述:" prop="description">
                        <el-input type="text"  v-model="addForm.description" class="inputWidth" style="width:150px;" ></el-input> 
                </el-form-item>
                 <el-form-item label="字典类型:" prop="type">
                        <el-input type="text"  v-model="addForm.type" class="inputWidth" style="width:150px;" ></el-input> 
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="successDialog('addForm')">保 存</el-button>
		</div>
    </el-dialog>
  </div>
</template>
<script>
import apis from '../../apis/dicmanage.js'
import fcHeader from '../common/header.vue'
import returnBar from '../common/returnBar.vue'
const qs = require('querystring')
export default {
  data () {
      return {
          tableData:[],
          pageNo:1,
          pageSize:10,
          count:1,
          title:'字典管理',
          addForm:{
              id:'',
              title:'',
              dialogFormVisible: false,
              label:'',
              value:'',
              description:'',
              type:''
          },
          description:'',
          type:'',
          label:'',
          rules:{
              label:[
                { required: true, message: '请填写名称', trigger: 'change' }
              ],
              value:[
                { required: true, message: '请填写编号', trigger: 'change' }
              ],
              description:[
                { required: true, message: '请填写字典描述', trigger: 'change' }
              ],
              type:[
                { required: true, message: '请填写字典类型', trigger: 'change' }
              ]
          }
      }
  },
  components:{
    fcHeader,
    returnBar
  },
  methods:{
       deleteDialog (obj) {
          var params = {
              id: obj.id
          }
          var data = qs.stringify(params)
          apis.deleteList(data).then(res =>{
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
           this.addForm.title =  '编辑字典'
           this.addForm.id = obj.id
           this.addForm.label = obj.label
           this.addForm.value = obj.value
           this.addForm.description = obj.description
           this.addForm.type = obj.type
           this.addForm.dialogFormVisible = true 
      },
      absence () {
          this.addForm.title =  '新增字典'
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
                                label: this.addForm.label,
                                value: this.addForm.value,
                                description: this.addForm.description,
                                type: this.addForm.type,
                            }
                            var formData = qs.stringify(params);
                            apis.addOrEditorList(formData).then(res =>{
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
                                label: this.addForm.label,
                                value: this.addForm.value,
                                description: this.addForm.description,
                                type: this.addForm.type
                            }
                            var formData = qs.stringify(params);
                            apis.addOrEditorList(formData).then(res =>{
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
           this.addForm.label =  ''
           this.addForm.value = ''
           this.addForm.description = ''
           this.addForm.type = ''
      },
      getList() {
          var params = {
              type: this.type,
              label: this.label,
              description: this.description,
              pageSize: this.pageSize,
              pageNo: this.pageNo
          };
          apis.getPageList(params).then(res =>{
              var data = res.data.data
              this.count = data.count
              this.tableData = data.list
          })
      }
  },
  mounted () {
      // 获取课程分类的列表页
      this.getList()
  }
}
</script>
<style lang="scss" scoped>
    @import '../../common/css/common.scss';
    .btnBox{
        padding-left:24px;
        color:#208af5;
    }
    .label{
       padding-left:9px;
       color:#494949;
    }
</style>


