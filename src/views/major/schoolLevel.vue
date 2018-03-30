<template>
  <div>
    <div class="fileForm">
      <div  class="btnS btnBox" @click="absence" style="width:100px"><span class="btn qingjia"></span>添加</div>
    </div>  
    <el-table
            fit
				    :data="tableData"
                    style="margin:0 16px 0 24px;width:1160px;"  @row-click="editorClick">
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
                                    v-model="scope.row.label" @blur="submitList(scope.row)">
                                </el-input>
                           </template>
						   <span class="textCal" v-else>{{ scope.row.label }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      label="操作" width="380">
				       <template slot-scope="scope">
							<el-button size="mini"  type="danger" plain @click.stop.prevent="deleteDialog(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>				    			    			    
				  </el-table>
  </div>
</template>
<script>
import apis from '../../apis/major.js'
const qs = require('querystring')
export default {
  data () {
      return {
          tableData:[],
          curId:''
      }
  },
  methods:{
      deleteDialog (obj) {
          var params = {
              id: obj.id
          }
          var data = qs.stringify(params)
          apis.deleteCc(data).then(res =>{
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
          var len = this.tableData.length
          this.tableData.unshift({
              label:'',
              value: len + 1,
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
          if(obj.label == '') {
              this.$message({
                showClose: true,
                message: "请填写名称",
                type: "error",
                duration: "1500"
              })
          } else {
              if(obj.id) {
                  var params = {
                       label:obj.label,
                       value:obj.value,
                       id: obj.id
                  }
                   var data = qs.stringify(params)
                    apis.addOrEditorCc(data).then(res =>{
                        if(res){
                            this.curId = ''
                            this.getList()
                        }
                    })
              } else {
                  var params = {
                     label:obj.label,
                     value:obj.value
                  }
                var data = qs.stringify(params)
                apis.addOrEditorCc(data).then(res =>{
                    if(res){
                        this.getList()
                        this.curId = ''
                    }
                })
              }
          }
           
    },
    getList() {
          apis.searchLevelList().then(res =>{
              var data = res.data.data
              this.tableData = data
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




