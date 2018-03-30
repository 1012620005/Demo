<template>
  <div class="studentmanagement">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >审核普通人员</span><span class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="studentmanagement-box">
        <div class="tabs">
          <ul class="tabs-items"  >
            <div  @click="tabs">
              <li data-active="1" class="tabs-items-item">基础信息</li>
              <li data-active="3">已停用</li>
              <li data-active="2" >回收站</li>
            </div>
          </ul>
        </div>
        <div class="select">
            <el-form  :model="formselect" label-width="70px" class="demo-form-inline">
              <el-row type="flex" class="row-bg" justify="space-between">
              <el-form-item label="校区">
                <el-select @change="querycollege" v-model="formselect.campus"  placeholder="">
                  <el-option v-for="item in formselect1.campus" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学院">
                <el-select @change="querymajor" v-model="formselect.choosecollege" placeholder="选择学院">
                  <el-option v-for="item in formselect1.choosecollege" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业">
                <el-select @change="selectclass" v-model="formselect.chooseamajor" placeholder="">
                  <el-option v-for="item in formselect1.chooseamajor" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学历">
                <el-select v-model="formselect.selecttheclass" placeholder="">
                  <el-option v-for="item in formselect1.selecttheclass" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item >
                <!--<el-select v-model="formselect.timeofenrollment" placeholder="">
                  <el-option v-for="item in formselect1.timeofenrollment" :key="item.index" :label="item" :value="item" ></el-option>
                </el-select>-->
              </el-form-item>
              </el-row>
            </el-form>
        </div>
        <div v-if="active=='1'" class="additive">
          <div class="feature">
            <div class="left">
              <span @click="addstudent"><img src="../../../assets/image/apply-proper-icon.png"/></span>
              <span><img src="../../../assets/image/audit.png"/></span>
              <div style="display:inline-block">
                <el-form>
                  <el-form-item >
                    <el-input v-model="searchin" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="right">
              <span><img src="../../../assets/image/daoruzhigong-icon.png"/></span>
              <span><img src="../../../assets/image/xiazaiexcel.png"/></span>
            </div>
          </div>
          <div class="table">
            <el-table
              :data="tableData"
              stripe
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column 
                width="45"
                type="selection"
                >
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="60">
              </el-table-column>
              <el-table-column
                prop="campus"
                label="校区"
                width="160">
              </el-table-column>
              <el-table-column
                prop="name"
                label="教职工姓名"
                width="90">
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                width="60">
              </el-table-column>
              <el-table-column
                prop="education"
                label="学历"
                width="160">
              </el-table-column>
              <el-table-column
                prop="cellphone"
                label="手机号"
                width="160">
              </el-table-column>
              <el-table-column
                prop="email"
                label="电子邮箱"
                width="160">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="props">
                  <el-tooltip :content="'查看'" placement="top">
                   <span class="table-end-caozuo"><img @click="deadstatusamend(props.$index,props.row)" src="../../../assets/image/eye-icon.png"/></span>
                  </el-tooltip>
                  <el-tooltip :content="'修改'" placement="top">
                   <span class="table-end-caozuo"><img @click="deadstatusamend(props.$index,props.row)" src="../../../assets/image/xiugai.png"/></span>
                  </el-tooltip>
                  <span class="table-end-caozuo">
                    <el-tooltip :content="props.row.value1 ? '停用':'启用'" placement="top">
                    <el-switch
                    @change="deadstatusseitch(props.$index,props.row)"
                      v-model="tableData[props.$index].value1"
                      on-color="#208af5"
                      off-color="#999"
                      on-text=""
                      off-text=""
                      >
                    </el-switch>
                    </el-tooltip>
                  </span>
                  <span class="table-end-caozuo">
                    <el-tooltip :content="'删除'" placement="top">
                    <span class="table-end-caozuo"><img @click="deadstatusamend(props.$index,props.row)" src="../../../assets/image/delete-icon.png"/></span>
                    </el-tooltip>
                  </span>
                  <span class="table-end-caozuo">
                   <el-tag :type="props.row.value1 ? 'success' : 'danger'" close-transition>{{props.row.value1 ? '已分权限':'未分权限'}}</el-tag>
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <div class="Pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="1000">
              </el-pagination>
            </div>
          </div>
        </div>
        <dead-status v-if="active=='2'" ></dead-status>
        <remove-status v-if="active=='3'"></remove-status>
        <!--添加学生-->
<el-dialog  :visible.sync="dialogFormVisible"  size="tiny"  >
  <div slot="title" class="addclasses-cpm" >
      <img src="../../../assets/image/addstudent2.png" /><p>添加学生</p>
  </div>
  <div style="width:300px;">
  <el-form :model="ruleForm1" :label-position="labelPosition" ref="ruleForm1" label-width="90px" >
    <el-form-item prop="name" label="学生姓名:">
      <el-input v-model="ruleForm1.name" ></el-input>
    </el-form-item>
    <el-form-item prop="cellphone" label="手机号:">
      <el-input v-model="ruleForm1.cellphone" ></el-input>
    </el-form-item >
    <el-form-item prop="identity" label="身份证号:" >
      <el-input v-model="ruleForm1.identity" ></el-input>
    </el-form-item>
    <el-form-item label="性别:" >
      <el-radio class="radio" v-model="ruleForm1.radio" label="1">男</el-radio>
      <el-radio class="radio" v-model="ruleForm1.radio" label="2">女</el-radio>
    </el-form-item>
    <el-form-item prop="campus" label="校区:">
      <el-select v-model="ruleForm1.selecttheclass" >
          <el-option label="区域一" value="1"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item prop="studentsoftranslation" label="入学学期:">
      <el-select v-model="ruleForm1.studentsoftranslation" >
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item prop="choosecollege" label="选择院系:">
        <el-select v-model="ruleForm1.selecttheclass" >
          <el-option label="区域一" value="1"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="chooseamajor" label="选择专业:">
        <el-select v-model="ruleForm1.selecttheclass" >
          <el-option label="区域一" value="1"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="selecttheclass" label="选择班级:">
        <el-select v-model="ruleForm1.selecttheclass" >
          <el-option label="区域一" value="1"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
      </el-form-item>
  </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addstudenttrue('ruleForm1')">确 定</el-button>
  </div>
</el-dialog>

<!--修改学生-->
<el-dialog   :visible.sync="dialogChangeVisible" size="tiny"  >
  <div slot="title" class="addclasses-cpm" >
      <img src="../../../assets/image/addstudent2.png" /><p>修改学生</p>
  </div>
  <div style="width:300px;">
  <el-form :model="tableDatachange" :label-position="labelPosition" label-width="90px" >
    <el-form-item prop="name" label="学生姓名:">
      <span>{{tableDatachange.name}}</span>
    </el-form-item>
    <el-form-item prop="identity" label="身份证号:" >
      <span>{{tableDatachange.identity}}</span>
    </el-form-item>
    <el-form-item prop="cellphone" label="手机号:">
      <el-input v-model="tableDatachange.cellphone" ></el-input>
    </el-form-item >
    <el-form-item label="性别:" >
      <el-radio class="radio" v-model="tableDatachange.radio" label="1">男</el-radio>
      <el-radio class="radio" v-model="tableDatachange.radio" label="2">女</el-radio>
    </el-form-item>
    <el-form-item prop="campus" label="校区:">
      <el-select v-model="tableDatachange.campus" >
        <el-option label="区域一" value="1"></el-option>
        <el-option label="区域二" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="timeofenrollment" label="入学学期:">
      <el-select v-model="ruleForm1.timeofenrollment" >
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item prop="choosecollege" label="选择院系:">
        <span>{{tableDatachange.choosecollege}}</span>
      </el-form-item>
      <el-form-item prop="chooseamajor" label="选择专业:">
        <span>{{tableDatachange.chooseamajor}}</span>
      </el-form-item>
      <el-form-item prop="selecttheclass" label="选择班级:">
        <span>{{tableDatachange.selecttheclass}}</span>
      </el-form-item>
  </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogChangeVisible = false">取 消</el-button>
    <el-button   type="primary" @click="dialogChangeVisible = false"  v-loading="loading">确 定</el-button>
  </div>
</el-dialog>

      </div>
  </div>
</template>

<script>
import navTop from '../../../components/navigation'
import deadStatus from '../../../components/studentmanagement/deadstatus'
import removeStatus from '../../../components/studentmanagement/remove'
import api from '../../../apis/login.js'
export default {
  name: 'studentmanagement',
  data(){
    return {
      searchin:'',
      loading:true,
      labelPosition:"right",
     active: "1",
     currentPage3: 5,
     dialogFormVisible: false,
     dialogChangeVisible:false,
     formselect:{
      campus:"",             //校区
      timeofenrollment:'',  //学期
      choosecollege:"",
      chooseamajor:'', //选择专业 
      selecttheclass:'', //选择班级 
     },
     formselect1:{           //默认数据
      campus:"",             //校区
      timeofenrollment:'',  //学期
      choosecollege:'',
      chooseamajor:'', //选择专业 
      selecttheclass:'', //选择班级 
     },
     tableData:[{  
        campus:"西",      
        name: '王我我我1',
        sex:"你",
        education: '301710199104072911',
        cellphone:"15133652925",
        email:"什么科学",
        value1:true,
       },
       {  
        campus:"西",      
        name: '王我我我1',
        sex:"你",
        education: '301710199104072911',
        cellphone:"15133652925",
        email:"什么科学",
        value1:false,
       },
     ],
      tableDatachange:"",              //修改学生数据
      
      ruleForm1: {                     //添加学生数据
        name: '',         //姓名
        cellphone: '',    //手机号
        identity: '',     //身份证号码
        radio: '1',       //男&女
        campus:"",        //校区
        timeofenrollment:'',  //入学时间  
        choosecollege:'', //选择系 
        chooseamajor:'', //选择专业 
        selecttheclass:'', //选择班级  
      }, 
      tableDatadead:"",                 //被选停用数据
      tableDatadeadstatus:"",           //确认停用
      formLabelWidth: '120px'
    }
  },
  components:{
    navTop,
    deadStatus,
    removeStatus
  },
  created(){
    api.timeofenrollment().then(data=>{
          this.formselect1.timeofenrollment = data.data.data
    })
    let parms = {
          id:1,
          type:4
        } 
    api.querycampus(parms).then(data=>{                //查询校区
      console.log(data.data.data)
          this.formselect1.campus = data.data.data
    })
  },
  mounted() {
  },
  computed: {
    
  },
  methods: {
    querycollege(){   //查询学院
      let parms = {
          id:this.formselect.campus,
          type:2
      } 
      api.querycampus(parms).then(data=>{
          this.formselect1.choosecollege = data.data.data
      })
    },
    querymajor(){   //查询专业  
      let parms = {
          id:this.formselect.choosecollege,
          type:3
      } 
      api.querycampus(parms).then(data=>{
          this.formselect1.chooseamajor = data.data.data
      })
    },
    selectclass(){    //查询班级
      let parms = {
          proid:this.formselect.chooseamajor,
          year:this.formselect.timeofenrollment
      }            
      api.selectclasse(parms).then(data=>{
          this.formselect1.selecttheclass = data.data.data
      })
    },
    addstudent(){
      this.dialogFormVisible = true
    },
    addstudenttrue(formName){
      this.dialogFormVisible = false
      var x = JSON.parse(JSON.stringify(this.ruleForm1))
      this.tableData.unshift(x)
      this.$refs[formName].resetFields()
      console.log(this.ruleForm1)
      console.log(this.tableData)
    },
    deletechange(index,tableData){
      this.dialogChangeVisible = true;
      this.tableDatachange = tableData
      console.log(index);
       console.log(tableData)
    },
    deadstatusseitch(index,data){
      console.log(index);
       console.log(data)
      //  data.value1=!data.value1
       console.log(this.tableData[index].value1)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val){       //被选停用数据
      this.tableDatadead = val
    },
    deadstatus(){
      
    },
    tabs(e){
      this.active = e.target.attributes[1].value
      var length = e.target.parentElement.children.length;
      for(var i=0;i<length;i++){
        e.target.parentElement.children[i].className=" ";
      }
      e.target.className="tabs-items-item"
    }

  },
  directives:{
   
  },
  watch:{
    
  }
     
}

</script>
<style scoped>
.studentmanagement{
  height:100%;
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
.studentmanagement-box{
  width:1200px;
  margin:0 auto 80px;
  padding-bottom:1px;
  background-color:#fff;
}
.tabs{
  height:40px;
  background-color:#eef1f6;
  text-align:left;
  overflow: hidden;
}
.tabs-items{
  margin-left:-1px;
  border-bottom:1px solid #dfe6ec;
  height:39px;
}
.tabs-items li{
  float:left;
  width:120px;
  line-height:39px;
  height:39px;
  text-align:center;
  font-size:14px;
  cursor:pointer;
}
.tabs-items-item{
  background-color:#fff;
  border-right:1px solid #dfe6ec;
  border-top:1px solid #dfe6ec;
  border-left:1px solid #dfe6ec;
  color:#208af5;
}
.select{
  margin-top:22px;
  padding-right:22px;
  text-align:left;
}
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
  margin-right: 2px;
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
/*.controlblue{
  color:
}*/

/*添加学生*/
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
.select .demo-form-inline .el-form-item__content{
  width:153px;
}
.table .el-table .cell{
  padding-right: 0;
}
</style>