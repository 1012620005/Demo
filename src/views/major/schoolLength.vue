<template>
  <div>
    <div class="fileForm">
      <div  class="btnS btnBox" @click="absence" style="width:100px"><span class="btn qingjia"></span>添加</div>
    </div>
    <el-table
            fit
				    :data="tableData"
                    style="margin:0 16px 0 24px;width:1160px;">
				    <el-table-column
				      type="index"
				      label="序号" width="280">
				    </el-table-column>
				    <el-table-column
				      prop="label"
				      label="名称" width="280">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.label }}</span>
					   </template>
				    </el-table-column>
                    <el-table-column
				      prop="value"
				      label="年" width="280">
					  <template slot-scope="scope" style="width:80%">
						   <span class="textCal">{{ scope.row.value }}</span>
					   </template>
				    </el-table-column>
				    <el-table-column
				      label="操作" width="280">
				       <template slot-scope="scope">
							<el-button size="mini"  type="danger" plain @click.stop.prevent="deleteDialog(scope.row)">删除</el-button>
                            <el-button size="mini"  type="primary" plain @click.stop.prevent="editorDialog(scope.row)">编辑</el-button>
                      </template>
				    </el-table-column>				    			    			    
				  </el-table>
     <!--编辑和添加专业-->              
    <el-dialog :title="addForm.title" :visible.sync="addForm.dialogFormVisible"  class="dialogImg" size="tiny" @close="closeDialog('addForm')">
        <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" :label-position="right" label-width="110px" enctype="multipart/form-data" class="formBox">
                <el-form-item label="年:" prop="value">
                    <el-select v-model="addForm.value" placeholder="" style="width:150px;" :disabled="disable">
                        <el-option :label="item.name" :value="item.name" :key="item.name" v-for="item in yearList"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="名称:" prop="label">
                        <el-input type="text"  v-model="addForm.label" class="inputWidth" style="width:150px;" ></el-input> 
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
          curId:'',
          curVal:'',
          yearList:[{id:1,name:'1'},{id:2,name:'1.5'},{id:3,name:'2'},{id:4,name:'2.5'},{id:5,name:'3'},{id:6,name:'3.5'},{id:7,name:'4'},{id:8,name:'4.5'},{id:9,name:'5'},{id:10,name:'5.5'},{id:11,name:'6'},{id:12,name:'6.5'},{id:13,name:'7'},{id:14,name:'7.5'},{id:15,name:'8'},{id:16,name:'8.5'},{id:17,name:'9'},{id:18,name:'9.5'},{id:19,name:'10'}],
          addForm:{
              id:'',
              title:'',
              dialogFormVisible: false,
              value:'',
              label:''
          },
          rules:{
             value:[
                { required: true, message: '请选择专业类', trigger: 'change' }
             ],
             label:[
                { required: true, message: '请填写专业名称', trigger: 'change' }
             ]
           },
           right:'right',
           disable: false

      }
  },
  methods:{
      deleteDialog (obj) {
          var params = {
              id: obj.id
          }
          var data = qs.stringify(params)
          apis.deleteSchoolLen(data).then(res =>{
              if(res) {
                  this.$message({
                      type:'success',
                      message:'删除成功'
                  })
                  this.getList()
              }
          })
      },
      editorDialog (obj){
          this.disable = true
          this.addForm.id = obj.id
          this.addForm.value = obj.value
          this.addForm.label = obj.label
          this.addForm.title = "编辑学制"
          this.addForm.dialogFormVisible =  true
      },
      absence () {
          this.addForm.title = "新建学制"
          this.addForm.dialogFormVisible =  true
      },
      successDialog (form) {
           this.$refs[form].validate((valid) => {
                if (valid) {
                    var data = {
                        value: this.addForm.value,
                        label: this.addForm.label
                    }
                    if(this.addForm.id) {
                        // 编辑
                        data.id = this.addForm.id
                    } 
                    var params = qs.stringify(data)
                    apis.addSchoolLen(params).then(res =>{
                        if(res) {
                            this.addForm.dialogFormVisible = false
                            this.disable = false
                            this.getList()
                        }
                    })
                }
           })
      },
      closeDialog (form) {
          this.$refs[form].resetFields();
          this.addForm.value =  ''
          this.addForm.label = ''
          this.addForm.id = ''
      },
      handleSizeChange (val) {
          this.pageSize = val
          this.getList()
      },
      handleCurrentChange (val) {
          this.pageNo = val
          this.getList()
      },
      getList() {
            apis.getSchoolLenList().then(res =>{
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




