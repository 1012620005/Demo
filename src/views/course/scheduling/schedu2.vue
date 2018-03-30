<template>
  <div class="classcourse clear">
      <div class="classcourse-left left" >
          <h3 class="el-h3">教师列表</h3>
          <el-row >
            <el-col :span="24" style="" >
              <el-menu default-active="1" class="el-menu-vertical-demo" @select="sLTeacher">
                <el-scrollbar tag="ul"  wrap-class="el-select-dropdown__wraps"
                  view-class="el-select-dropdown__list">
                  <el-menu-item :index="item.id" v-for="(item,index) in teacherList" :key="index">{{item.name}}</el-menu-item>
                </el-scrollbar>
              </el-menu>
            </el-col>
          </el-row>
      </div> 
      <div class="classcourse-right right" >
        <h3>学科</h3>
        <p class="text"><span style="color:red;">选择课程之后再点击空白位置即添加固排课程</span></p>
        <el-table
          :data="tableData"
          stripe
          highlight-current-row
          v-loading.body="table1loading"
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="65">
          </el-table-column>
          <el-table-column
            prop="str1"
            label="任课学科"
            width="180">
          </el-table-column>
          <el-table-column
            prop=""
            label="任课班级">
            <template slot-scope="props">
              <div >
                {{props.row.str3}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="alreadyNum"
            label="已固排节次"
            width="150">
          </el-table-column>
          <el-table-column
            prop="notNum"
            label="未固排节次"
            width="150">
          </el-table-column>
          
          <el-table-column
            prop="week"
            label="授课周次"
            width="150">
            <template slot-scope="props">
              <div >
                {{props.row.startWeek+'~'+props.row.endWeek}}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <h3 style="margin-top:20px;">课表</h3>
        <p class="text"><span style="color:red;">点击课表空白位置设置为禁排，再次点击即可取消禁排。</span></p>
         <div >
              <el-table
                ref = "table"
                v-loading.body="tableloading"
                :data="tableDatasch"
                @cell-click ="cellclick"
                @cell-mouse-leave ="mouseleave"
                @cell-mouse-enter ="mouseenter"
                style="width: 100%"
                border>
                <el-table-column
                  align="center"
                  prop="tablemorning"
                  label="课表"
                  width="150"
                  >
                <template slot-scope="props">
                  <div style="height:60px; padding:10px;">
                    <p>{{props.row.tablemorning[0]}}</p>
                    <p>{{props.row.tablemorning | tostime}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :label="cityOptions[index]"
                :prop="cityOptionseg[index]"
                min-width = "100"
                v-for="(item,index) in formsh.weekNum" :key ='index'
                >
                <template slot-scope="scope">
                  <div style="font-size:12px;">{{scope.row.Schedule.secList[index].valueIndex}}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </div>
  </div>
</template>

<script>
import course from '../../../apis/course.js'
import api from '../../../apis/login.js'
export default {
  name: 'classcourse',
  data() {
    return {
      table1loading:false,
      tableloading:false,
      cityOptions :['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      cityOptionseg :['1', '2', '3', '4', '5', '6', '7'],
      teacherList:"",
      sLTeachers:"",
      tableData: [],
      ScheduleID:"",
      currentRow: null,
      tableDatasch:[],
      formsh:{
        Sections:"",
        weekNum:1,
      },
      termId:""
    }
  },
  components:{

  },
  filters: {
    tostime: function (value) {
      if(value[1] && value[1].start !== '' && value[1].end !== ''){
        return value[1].start.split(':')[0]+':'+value[1].start.split(':')[1]+'~'+value[1].end.split(':')[0]+':'+value[1].end.split(':')[1]
      }
    }
  },
  created(){
    course.teacherlist().then(data=>{
      if(data) this.teacherList = data.data.data;
    })
  },
  mounted() {
    this.termId = JSON.parse(localStorage.getItem("newSchedule")).termId
    this.ScheduleID = this.$Cookies.get('sectionid');
  },
  computed: {
    
  },
  methods: {
    mouseenter(row, column, cell, event){
      if(column.property !== "tablemorning"){
        cell.style.backgroundColor = '#edf7ff';
        cell.style.cursor = 'pointer';
      }
    },
    mouseleave(row, column, cell, event){
      if(column.property !== "tablemorning"){
        cell.style.backgroundColor = '';
      }
    },
    //设置固排、禁排CSsetprohibit
    cellclick(row, column, cell, event){
      if(column.property == "tablemorning"){
        return 
      }else{
        let  formdata = new FormData();
        formdata.append('typeId', this.sLTeachers);
        formdata.append('sectionId', row.Schedule.secList[Number(column.property)-1].id);
        formdata.append('refType', '1');
        formdata.append('termId', this.termId);
        formdata.append('pid', this.ScheduleID);
        if(this.currentRow !== null){
          formdata.append('roomId', this.currentRow.roomId);
          formdata.append('subjectId', this.currentRow.id);
          formdata.append('refId', this.currentRow.classId);
          formdata.append('secState', 1);
        }
        //禁排
        if(this.currentRow == null && cell.children[0].children[0].innerText == ""){
          formdata.append('subjectId','');
          formdata.append('refId', '');
          formdata.append('secState', 3);
        }
        //取消禁排
        if(this.currentRow == null && cell.children[0].children[0].innerText == "禁排"){
          formdata.append('secRefId', row.Schedule.secList[Number(column.property)-1].secRefId);
          formdata.append('subjectId','');
          formdata.append('refId', '');
          formdata.append('secState', 4);
        }
        //取消固排
        if(this.currentRow == null && cell.children[0].children[0].innerText !== "禁排" && cell.children[0].children[0].innerText !== ""){
          formdata.append('secRefId', row.Schedule.secList[Number(column.property)-1].secRefId);
          formdata.append('subjectId','');
          formdata.append('refId', '');
          formdata.append('secState', 2);
        }
        course.CSsetprohibit(formdata).then(data=>{
          if(data){
            
            if(data.data.data == '0'){
              this.getlist();
              this.getkcb()
              this.currentRow = null;
            }
            if(data.data.data == '3'){
              this.$message({
                showClose: true,
                message: '班级已添加禁排',
                type: 'success',
                duration: "1500"
              });
            }
            if(data.data.data == '2'){
              this.$message({
                showClose: true,
                message: '场地已添加禁排',
                type: 'success',
                duration: "1500"
              });
            }
            if(data.data.data === 5){
                this.$message({
                  showClose: true,
                  message: '班级已添加课程',
                  type: 'success',
                  duration: "1500"
                });
              }
              if(data.data.data === 6){
                this.$message({
                  showClose: true,
                  message: '场地已添加课程',
                  type: 'success',
                  duration: "1500"
                });
              }
           }
        })
      }
    },
    //导航
    sLTeacher(index){
      this.sLTeachers = index
      this.getlist();
      this.getkcb()
    },
    //教职工授课列表
    getlist(){
      let datas = {'teacherId':this.sLTeachers,'pageSize':100,'pageNo':1,'termId':this.termId};
      course.classCoursegetList(datas).then(data=>{
        this.table1loading = false;
        if(data) this.tableData = data.data.data.list;
      })
    },
    //获取课表
    getkcb(){    //getnewkb
      let datas = {'id':this.sLTeachers,'type':"1",'pid':this.ScheduleID,'schType':'0','fewWeek':'0'};
      course.CSdisType(datas).then(r=>{
        if(r){
          this.getCSdisType(r.data.data);
          this.tableloading =false;
        }
      })
    },
    // 课表
    getCSdisType(res){
      let num = 0;
      let dataw = res.schList.map(function(item, index) {
        if(item.isPublic == 0){
          num=1+num;
          return {
            'tablemorning':['第'+num+'节',{'start':item.startTime,'end':item.endTime}],'Schedule':item
          }
        }else{
          return {
            'tablemorning':["公共时段",{'start':item.startTime,'end':item.endTime}],'Schedule':item
          }
        }
      });
      console.log(dataw);
      let _this = this;
      _this.tableDatasch = [];
      dataw.map(function(item, index) {
        if(item.Schedule.isPublic == 0){
          _this.tableDatasch.push(item)
        }else{
        //   _this.hb_index = index;
        // item.Schedule.monday={'valueIndex' :item.Schedule.str10,'id':'',}
        // item['colspans']=[1, Number(_weeksum)]
        // _this.tableDatasch.push(item)
        }
      });
      this.formsh.weekNum = res.weekNum;
    },
    handleCurrentChange(val){
       this.currentRow = val;
       console.log(val)
    }
  },
  directives:{
        
  },
  watch:{
    
  }
     
}

</script>
<style scoped>
.classcourse{
  height:100%;
  text-align: left;
}
.classcourse-left{
  width:240px;
}
.classcourse-left .el-select{
  width:240px;
  margin:24px 0 24px;
}
.classcourse .el-h3{
  margin-bottom:15px;
  height:22px;
}
.classcourse-right{
  width:900px;
}
.classcourse-right .text{
  text-align:right;
  margin-bottom:5px;
}
.el-table .info-row {
    background: #c9e5f5;
}

</style>
<style>
.el-select-dropdown__wraps{
  height:600px;
}
.classcourse .el-scrollbar__thumb{
  background-color:#20a0ff;
}
</style> 