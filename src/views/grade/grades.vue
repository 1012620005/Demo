<template>
  <div class="grades">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >年级管理</span><span @click="back" class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
        <div style="margin:0 auto 50px;width:1160px" class="room-box clear">
          <div class="room-box-top">
            <span @click="createroom" class="add-button"><img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加年级</i></span>
          </div>
          <div style="text-align:left">
            <el-table
              :data="page.list"
              stripe
              v-loading.body="tableloading"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="80">
              </el-table-column>
              <el-table-column
                prop="name"
                label="年级名称"
                width="180">
              </el-table-column>
              <!-- <el-table-column
                prop="year"
                label="所属年份"
                width="180">
              </el-table-column> -->
              <el-table-column
                prop="xq"
                label="开始学期">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120"
                >
                <template slot-scope="scope">
                  <el-tooltip :content="'修改'" placement="top">
                    <span class="table-end-caozuo"><img @click="stumodofocation(scope.row)" src="../../assets/image/xiugai.png"/></span>
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
        <el-dialog   :visible.sync="dialogchang" width="30%" >
          <div slot="title"  >
              <p style="font-size:16px;" >{{optiontext+"年级"}}</p>
          </div>
          <div style="max-width:500px; text-align:left;">
            <el-form :model="form" :label-position="labelPosition" label-width="80px"  ref='form'>
                <el-form-item  label="添加年级:">
                  <el-input v-model="grade.name"  placeholder="">
                  </el-input>
                </el-form-item>
                <el-form-item label="开始学期:" >
                  <el-select  v-model="grade.xq"  >
                      <el-option v-for="(item,index) in grade.xqs" :key="item.term" :label="item.term" :value="item.term"></el-option>
                    </el-select>
                </el-form-item>
           
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogchang = false">取 消</el-button>
            <el-button   type="primary" @click="saveGrade()"  >确 定</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import navTop from "../common/header";
import course from '../../apis/course.js'
import api from '../../apis/login.js'
import userApi from '../../apis/userCenter.js'
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
      grade : {
        id:'',
        name:'',
        year:'',
        xq:'',
        years:[],
        xqs:[]
      },
      page: {
        pageNo:1,
        pageSize:10,
        count:0,
        list: [],
      }
    }
  },
  components:{
    navTop
  },
  created(){
    
  },
  mounted() {
    course.getTerm().then(r=>{
      this.grade.xqs = r.data.data;
    });
    userApi.findAllYear().then(r=>{
      this.grade.years = r.data.data;
    });
    this.findGrade();
  },
  computed: {
    
  },
  methods: {
    back(){
      this.$router.push('/newIndex');
    },
    findGrade() {
      let params = {pageNo:this.page.pageNo,pageSize:this.page.pageSize}
      userApi.findGrade(params).then(r=>{
        console.log(r);
        if (r && r.data) {
          let page = r.data.data;
          this.page.pageNo = page.pageNo;
          this.page.pageSize = page.pageSize;
          this.page.count = page.count;
          this.page.list = page.list;
        }
      });
    },
    saveGrade() {
      let params = new FormData();
      params.append("id", this.grade.id);
      params.append("name", this.grade.name);
      // params.append("year", this.grade.year);
      params.append("xq", this.grade.xq);
      console.log(params);
      userApi.saveGrade(params).then(r=>{
        userApi.showMsg(r.data.meta);
        if (r.data.meta.status == 'success') {
          this.dialogchang = false;
          this.findGrade();
        }
      });
    },
    createroom(){     //创建弹出
      this.grade.id = '';
      this.grade.name = '';
      // this.grade.year = '';
      this.grade.xq = '';
      this.dialogchang = true;
      this.optiontext = '添加';
    },
    getGrade(id) {
      let params = {id:id}
      userApi.getGrade(params).then(r=>{
        console.log(r);
        if (r && r.data) {
          let grade = r.data.data;
          this.grade.id = grade.id;
          this.grade.name = grade.name;
          // this.grade.year = grade.year;
          this.grade.xq = grade.xq;
        }
      });
    },
    stumodofocation(row){
      this.getGrade(row.id);
      this.dialogchang = true;
      this.optiontext = '修改';

    },
    submits(formName){
      this.$refs[formName].validate((valid) =>{
        if (valid) {

        }
      })
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
            formdata.append('gradeid', row.id); 
            userApi.deleleteGrade(formdata).then(data=>{
              instance.confirmButtonLoading = false;
              if(data){
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: 'success',
                  duration: "1500"
                });
                this.findGrade();
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
.grades{
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
.table-end-caozuo {
  height: 24px;
  line-height: 24px;
  display: inline-block;
  cursor: pointer;
}
.table-end-caozuo img {
  vertical-align: middle;
}
</style>
<style>
  .el-dialog__header{
    overflow: hidden;
  }
</style>