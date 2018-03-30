<template>
  <div class="class">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >年级管理</span><span class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
        <div style="margin:0 auto 50px;width:1160px" class="room-box clear">
          <div class="room-box-top"><img @click="createroom" src="../../assets/image/chuang-room-icon.png" /></div>
          <div style="text-align:left">
            <el-table
              :data="tableData"
              stripe
              v-loading.body="tableloading"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="str2"
                label="班级"
                width="180">
              </el-table-column>
             
              <el-table-column
                label="操作"
                width="180"
                >
                <template slot-scope="scope">
                  <el-tooltip :content="'查看'" placement="top">
                    <span class="table-end-caozuo"><img @click="seeodofocation(scope.$index,scope.row)" src="../../assets/image/eye-icon.png"/></span>
                  </el-tooltip>
                  <el-tooltip :content="'修改'" placement="top">
                    <span class="table-end-caozuo"><img @click="stumodofocation(scope.$index,scope.row)" src="../../assets/image/xiugai.png"/></span>
                  </el-tooltip>
                  <el-tooltip :content="'删除'" placement="top">
                    <span class="table-end-caozuo"><img @click=" deleteformation(scope.row)" src="../../assets/image/delete-icon.png"/></span>
                  </el-tooltip>
                </template>
              </el-table-column>
          </el-table>
          </div>
        </div>    
     </div>

     <!--修改-->
        <el-dialog   :visible.sync="dialogchang" size='tiny' >
          <div slot="title" class="addclasses-cpm" >
              <img src="../../assets/image/addstudent2.png" /><p>{{optiontext+"年级"}}</p>
          </div>
          
          <div style="width:500px; text-align:left;">
            <el-form :model="form" :label-position="labelPosition" label-width="80px"  ref='form'>
                <el-form-item  label="校区:">
                  <el-input v-model="form.grade"  placeholder="">
                  </el-input>
                </el-form-item>
                <el-form-item label="院系:" >
                  <el-select  v-model="form.year"  >
                      <el-option v-for="(item,index) in 5" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业:" >
                  <el-select  v-model="form.start"  >
                      <el-option v-for="(item,index) in 5" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级:" >
                  <el-select  v-model="form.start"  >
                      <el-option v-for="(item,index) in 5" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级:" >
                  <el-select  v-model="form.start"  >
                      <el-option v-for="(item,index) in 5" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogchang = false">取 消</el-button>
            <el-button   type="primary" @click="submits('form')"  >确 定</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import navTop from '../../components/navigation'
import course from '../../apis/course.js'
import api from '../../apis/login.js'
export default {
  name: 'grades',
  data() {
    return {
      loading:false,
      dialogchang:false,
      labelPosition:'right',
      tableloading:false,
      optiontext:null,
      data:"",
      form:{
        grade:"",
        year:"",
        start:"",
      },
      datalength:null,
      tableData:[
        {
          'str2':'1'
        }
      ],
    }
  },
  components:{
    navTop
  },
  created(){
    
  },
  mounted() {

  },
  computed: {
    
  },
  methods: {
    createroom(){     //创建弹出
      this.dialogchang = true;
      this.optiontext = '添加';
    },
    stumodofocation(roe,index){
      this.dialogchang = true;
      this.optiontext = '修改';

    },
    submits(formName){
      this.$refs[formName].validate((valid) =>{
        if (valid) {

        }
      })
    },
    seeodofocation(row,index){

    },
    deleteformation(row,index){
      this.$confirm('确认删除?', '提示', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            let formdata = new FormData()
            formdata.append('id', row.clazzid);
            course.CSdeleteSpe(formdata).then(data=>{
              instance.confirmButtonLoading = false;
              if(data){
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: 'success'
                });
             }
          })
        } else {
          instance.confirmButtonLoading = false;
          done();
        }
        }
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });        
      });
    }
    
    
  },
  directives:{
        
  },
  watch:{
    
  }
}
</script>
<style scoped>
.class{
  height:100%;
  text-align: center;
}
.log-magess{
  margin:6px auto 16px;
  position: relative;
  background-color:#fff;
  height:50px;
  width:1200px;
  color:#000;
  font-size:16px;
}
.log-magess .arrow-center{
  display:inline-block;
  margin-left:38px;
  height:46px;
  border-bottom:4px solid #208af5;
  line-height:50px;
}
.log-magess .arrow-right{
    position: absolute;
    right:10px;
    top:16px;
    cursor: pointer;
}
.magessBox{
  width:1200px;
  margin:0 auto 30px;
  padding-top:20px;
  padding-bottom:20px;
  background-color:#fff;
}
.room-box-top{
  margin-bottom:20px;
  text-align:left;
}
.room-box-top img{
  cursor:pointer;
}
.margin-top-5{
  margin:5px 0;
}
.margin-top-5 img{
  cursor:pointer;
}
.addclasses-cpm{
  display:inline-block;
  float: left;
}
.addclasses-cpm p{
  display:inline-block;
  margin-left:10px;
}
.addclasses-cpm img{
  vertical-align: middle;
}
.el-select {
 width: 100%;
}
</style>
<style>

</style>