<template>
  <div class="scheduindex1">
      <el-dialog   :visible="dialogVisibleSchedule"  :show-close="false" width="45%" >
          <div slot="title"  > 
              <p style="font-size:16px; text-align: left;" >课表设置</p>
          </div>
          <div style="text-align:left;" class="clear" >
              <div class="new-Schedule">
                <span @click="newSchedule" class="add-button"><img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 新建课表</i></span>
              </div>
              <el-table
                :data="tableData"
                stripe
                v-loading.body="tableloading"
                highlight-current-row
                @current-change="handleCurrentChange"
                @cell-click="rowclick"
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="65">
                </el-table-column>
                <!-- <el-table-column
                  prop="str3"
                  label="校区"
                  width="160">
                </el-table-column> -->
                <el-table-column
                  prop="termId"
                  label="学期"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="课表名称">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="120"
                  prop="caozuo"
                  >
                  <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click=" deleteformation(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import course from '../../../apis/course.js'
import Vue from 'vue'
import {mapActions} from "vuex";
export default {
  name: 'scheduindex1',
  data() {
    return {
      tableloading:false,
      value1:true,
      dialogVisibleSchedule:false,
      tableData: [],
      currentRow: null
    }
  },
  components:{
  },
  created(){
    this.dialogVisibleSchedule=true;
    this.getallsc()
  },
  mounted() {

  },
  computed: {
    
  },
  methods: {
    //获取所以课表
    getallsc(){
      this.dialogVisibleSchedule=true;
      this.tableloading = true;
      course.getallSChedule().then(data=>{
        if(data){
          this.tableloading =false;
          this.tableData = data.data.data;
        }
      })
    },
    getnewschedules() {
        localStorage.setItem("newSchedule", JSON.stringify(this.currentRow));
        try {
            this.$store.dispatch("getnewschedule", this.currentRow)
        }catch(error) {
            alert(error)
        }
    },
    newSchedule(){
      this.dialogVisibleSchedule=false;
      localStorage.removeItem("newSchedule");
      this.$router.push({path:'/course/site/scheduindex/newSchedule'})  
    },
    // Scheduleset(){
    //   this.getnewschedules();
    //   this.$router.push('/course/site/scheduindex/newSchedule');
    //   this.dialogVisibleSchedule=false;
    // },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
  
    },
    rowclick(row, column, cell, event){
      console.log(column.property !== 'caozuo' )
      if(column.property !== 'caozuo'){
        this.getnewschedules();
        this.$router.push('/course/site/scheduindex/newSchedule');
        this.dialogVisibleSchedule=false;
        console.log('111')
      }
    },
    deleteformation(index,row){
      this.$confirm('确认删除?', '提示', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            course.deleteSChedule({'pid':row.id}).then(data=>{
              instance.confirmButtonLoading = false;
              if(data){
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: 'success'
                });
                this.getallsc();
             }
          })
        } else {
          done();
        }
        }
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });        
      });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  },
  directives:{
        
  },
  watch:{
    
  }
     
}

</script>
<style scoped>
.scheduindex1{
  height:100%;
  text-align: center;
}
.magessBox{
  width:1200px;
}
.new-Schedule img{
  cursor:pointer;
}
</style>
<style>
.scheduindex1 .el-dialog__header{
  background-color:#eef1f6;
  overflow: hidden;
}
</style>