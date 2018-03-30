<template>
  <div class="checkinformation">
<!--查看教职工-->
    <el-dialog  :visible.sync="flag"  size="tiny" >
      <div slot="title" style="float:left;" >
          <p style="font-size:16px;" >查看详情</p>
      </div>
      <div style="max-width:400px;" class="add-jzg">
        <el-form :model="messages" :label-position="labelPosition" ref="user" label-width="90px" >
          <el-form-item  label="学生姓名:" >
            {{messages.name}}
          </el-form-item>
          <el-form-item  label="学号:">
            {{messages.no}}
          </el-form-item >
          <el-form-item label="手机号:" >
            {{messages.mobile}}
          </el-form-item>
          <el-form-item  label="身份证号:" >
            {{messages.idcard}}
          </el-form-item>
          <el-form-item  label="邮箱:" >
            {{messages.email}}
          </el-form-item>
          <el-form-item label="性别:" >
            {{messages.sexname}}
          </el-form-item>
          <el-form-item label="入学学期:" >
            {{messages.year}}
          </el-form-item>
          <el-form-item  label="专业:">
            {{messages.proname}} 
          </el-form-item>
          <el-form-item  label="班级:">
            {{messages.clazzname}} 
          </el-form-item>
      </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div style="display:none">{{normalizedSize}}</div>
        <el-button type="primary" @click="flag = false">确定</el-button>
        <!--<el-button type="primary" @click="checkinformation('formx',formx.index)">确 定</el-button>-->
      </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'checkinformation',
  data () {
    return {
     labelPosition:"right",
     flag:false,
    //  flags:function(){
    //    console.log(this.message)
    //  }
    }
  },
  props:{
    message:null,
    messages:null
  },
  created(){
  },
  computed:{
    normalizedSize: function(){
     return  this.flag = this.message[0]
    },
},
  methods: {
    determine(){
      this.$emit('increment',false)
    }
  },
  watch:{
  }
}
</script>
<style scoped>
.feature{
  height:42px;
  padding-left: 16px;
  padding-right: 14px;
}
.feature span{
  margin-right:12px;
  cursor:pointer;
}
.table{
  padding-left:16px;
  padding-right:16px;
  text-align:left;
  font-size:12px;
}
.table .el-table{
  font-size:12px;
}
.table-end-caozuo{
  margin-right:5px;
  height:24px;
  line-height:24px;
  display:inline-block;
  cursor:pointer;
}
.table-end-caozuo img{
  vertical-align: middle;
}
.Pagination{
  margin-top:32px;
  margin-bottom:60px;
  text-align:center;
}


/*辅导员添加班级*/
.Class-teacher{
  position:relative;
  width:700px;
}
.margin-top-5 {
  margin-top: 5px;
  margin-bottom: 5px;
  cursor:pointer;
}
/*添加教职工*/
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
</style>
<style>
.table .el-table .cell{
  padding-right: 0;
}
</style>