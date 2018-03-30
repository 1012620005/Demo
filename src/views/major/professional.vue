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
                    style="margin:0 16px 0 24px;width:1160px;" @row-click="editorClick">
				    <el-table-column
				      type="index"
				      label="序号" width="380">
				    </el-table-column>
				    <el-table-column
				      prop="courseName"
				      label="名称" width="380">
					  <template slot-scope="scope" style="width:80%">
                           <template v-if="curId == scope.row.id">
                                <el-input
                                    size="mini"
                                    placeholder=""
                                    v-model="scope.row.name" @blur="submitList(scope.row)">
                                </el-input>
                           </template>
						   <span class="textCal" v-else>{{ scope.row.name }}</span>
					   </template>
				    </el-table-column>
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
                :page-sizes="[50,100,200,400]"
					      layout="total, sizes,prev, pager, next,jumper"
					      :total="count">
    				</el-pagination>
                </div>
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
          curId:''
      }
  },
  methods:{
      deleteDialog (obj) {
          var params = {
              id: obj.id
          }
          var data = qs.stringify(params)
          apis.deletePro(data).then(res =>{
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
              name:'',
              id:''
          })
      },
      editorClick (row,event,column) {
          this.curId = row.id
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
          if(obj.name == '') {
              this.$message({
                showClose: true,
                message: "请填写名称",
                type: "error",
                duration: "1500"
              })
          } else {
              if(obj.id) {
                  var params = {
                        name:obj.name,
                        id: obj.id
                  }
                   var data = qs.stringify(params)
                    apis.addOrUpdatePro(data).then(res =>{
                        if(res){
                            this.curId = ''
                            this.getList()
                        }
                    })
              } else {
                  var params = {
                     name:obj.name
                  }
                var data = qs.stringify(params)
                apis.addOrUpdatePro(data).then(res =>{
                    if(res){
                        this.getList()
                        this.curId = ''
                    }
                })
              }
          }
           
    },
    getList() {
        var params = {
              pageSize: this.pageSize,
              pageNo: this.pageNo,
              name:''
          };
          apis.searchProClassList(params).then(res =>{
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
    .fileForm{
      display:flex;
      align-items: center;
    }
</style>



