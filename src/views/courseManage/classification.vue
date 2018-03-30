<template>
  <div>
    <div  class="btnS btnBox" @click="absence"><span class="btn qingjia"></span>添加</div>
    <el-table
                 	fit
				    :data="tableData"
                    style="margin:0 16px 0 24px;width:1160px;" max-height="360" @row-click="editorClick">
				    <el-table-column
				      type="index"
				      label="序号" width="380">
				    </el-table-column>
				    <el-table-column
				      prop="title"
				      label="名称" width="380">
					  <template slot-scope="scope" style="width:80%">
                           <template v-if="curId == scope.row.id">
                                <el-input
                                    size="mini"
                                    placeholder=""
                                    v-model="scope.row.courseName" @blur="submitList(scope.row)">
                                </el-input>
                           </template>
						   <span class="textCal" v-else>{{ scope.row.courseName }}</span>
					   </template>
				    </el-table-column>
				   <!-- <el-table-column
				      prop="note"
				      label="备注" width="290">
					   <template slot-scope="scope">
                           <template v-if="scope.row.editor" style="width:80%">
                                <el-input
                                    size="mini"
                                    placeholder=""
                                    v-model="scope.row.note">
                                </el-input>
                           </template>
						   <span class="textCal" v-else>{{ scope.row.note }}</span>
					   </template>
				    </el-table-column> -->
				    <el-table-column
				      label="操作" width="380">
				       <template slot-scope="scope">
							<el-button size="mini"  type="danger" plain @click.stop.prevent="deleteDialog(scope.row)">删除</el-button>
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
</template>
<script>
import apis from '../../apis/courseManage.js'
const qs = require('querystring')
export default {
  data () {
      return {
          tableData:[],
          pageNo:1,
          pageSize:10,
          count:1,
          curId:''
      }
  },
  methods:{
      deleteDialog (obj) {
          var params = {
              id: obj.id
          }
          apis.removeClassifiCate(params).then(res =>{
              if(res) {
                  this.$message({
                      type:'success',
                      message:'删除成功'
                  })
                  this.getList()
              }
          })
      },
      absence () {
          this.tableData.unshift({
              title:'',
              id:''
          })
      },
      editorClick (row,event,column) {
           row.qdState = 1
      },
      handleSizeChange (val) {
          this.pageSize = val
          this.getList()
      },
      handleCurrentChange (val) {
          this.pageNo = val
          this.getList()
      },
      submitList (obj) {
          if(obj.courseName == '') {
              this.$message({
                showClose: true,
                message: "请填写名称",
                type: "error",
                duration: "1500"
              })
          } else {
              if(obj.id) {
                  var params = {
                        courseName: obj.courseName,
                        courseType: 0,
                        courseDesc: '',
                        id: obj.id
                  }
                   var data = qs.stringify(params)
                    apis.updateClassifiCate(data).then(res =>{
                        if(res){
                            obj.qdState = 0
                            this.getList()
                        }
                    })
              } else {
                  var params = {
                    courseName: obj.courseName,
                    courseType: 0,
                    courseDesc: ''
                  }
                var data = qs.stringify(params)
                apis.addClassifiCate(data).then(res =>{
                    
                    if(res){
                        obj.qdState = 0
                        this.getList()
                    }
                })
              }
          }
           
      },
      getList() {
          var params = {
              courseName: '',
              courseType: 0,
              pageSize: this.pageSize,
              pageNo: this.pageNo
          };
          apis.getCourseList(params).then(res =>{
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
</style>


