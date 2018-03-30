<template>
  <div class="classcourse clear">
      <div class="classcourse-left left" >
          <h3>班级列表</h3>
          <el-select @change="getclassList" v-model="scyearvalue" placeholder="选择学年" value-key="id">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item">
            </el-option>
          </el-select>
          <el-row class="tac">
            <el-col :span="24">
              <el-tree
                v-loading.body="treeloading"
                :data="data2"
                ref="tree"
                :default-expanded-keys="['1']"
                show-checkbox
                :props="defaultProps"
                @check-change="getcouseList"
                node-key="id">
              </el-tree>
            </el-col>
          </el-row>
      </div> 
      <div class="classcourse-right right" >
        <div v-if="course_falg">
          <h3>学科</h3>
          <p class="text"><span style="color:red;">选择课程之后再点击空白位置即添加固排课程</span></p>
          <el-table
            :data="tableData"
            v-loading.body="table1loading"
            v-model="headerAlign"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="65">
            </el-table-column>
            <el-table-column
              prop="str1"
              label="学科"
              width="180">
            </el-table-column>
            <el-table-column
              prop="str2"
              label="任课老师">
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
                <span>{{props.row.startWeek+'~'+props.row.endWeek}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <h3 style="margin-top:20px;">课表</h3>
        <p class="text"><span style="color:red;">点击课表空白位置设置为禁排，再次点击即可取消禁排。</span></p>
            <div  >
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
                  prop="tablemorning"
                  label="课表"
                  width="150"
                  align="center"
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
import {mapActions} from "vuex";
export default {
  name: 'classcourse',
  data() {
    return {
      headerAlign:'center',
      table1loading:false,
      tableloading:false,
      cityOptions :['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      cityOptionseg :['1', '2', '3', '4', '5', '6', '7'],
      scyearvalue:"",   //学年
      treeloading:false,
      ScheduleID:"",
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      termId:"",
      course_falg:true,
      form:{
        checkedCities:[],
        proid:""
      },
      SelectedClassId:[],
      options: [],
      tableData: [],
      currentRow: null,
      tableDatasch:[],
      formsh:{
        Sections:"",
        weekNum:1,
      },
      timenum:null
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
    api.queryAllGrade().then(data=>{
      if(data) this.options = data.data.data;this.scyearvalue = data.data.data[0];
      this.getclassList()
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
        cell.style.backgroundColor = '#e2f0e4';
        cell.style.cursor = 'pointer';
      }
    },
    mouseleave(row, column, cell, event){
      // console.log(column.property)
      if(column.property !== "tablemorning"){
        cell.style.backgroundColor = '';
      }
    },
    //设置固排、禁排CSsetprohibit
    cellclick(row, column, cell, event){

      if(column.property == "tablemorning"){
        return 
      }else{
        console.log(row)
        console.log(column)
        let  formdata = new FormData();
        formdata.append('typeId', this.SelectedClassId.join(','));
        formdata.append('sectionId', row.Schedule.secList[Number(column.property)-1].id);
        formdata.append('refType', '0');
        formdata.append('termId', this.termId);
        formdata.append('pid', this.ScheduleID);
        if(this.currentRow !== null){
          console.log(this.currentRow)//roomId
          formdata.append('subjectId', this.currentRow.id);
          formdata.append('roomId', this.currentRow.roomId);
          formdata.append('refId', this.currentRow.teacherId);
          formdata.append('secState', 1);
        }
        //禁排
        if(this.currentRow == null && cell.children[0].children[0].innerText == ""){
          formdata.append('subjectId', '');
          formdata.append('refId', '');
          formdata.append('secState', 3);
        }
        //取消禁排
        if(this.currentRow == null && cell.children[0].children[0].innerText == "禁排"){
          formdata.append('subjectId', '');
          formdata.append('secRefId', row.Schedule.secList[Number(column.property)-1].secRefId);
          formdata.append('refId', '');
          formdata.append('secState', 4);
        }
        //取消固排
        if(this.currentRow == null && cell.children[0].children[0].innerText !== "禁排" && cell.children[0].children[0].innerText !== ''){
          formdata.append('subjectId', '');
          formdata.append('secRefId', row.Schedule.secList[Number(column.property)-1].secRefId);
          formdata.append('refId', '');
          formdata.append('secState', 2);
        }
        course.CSsetprohibit(formdata).then(data=>{
            if(data){
              this.getkcb();
              if(this.course_falg){
                this.CLgetlist();
              }
              if(data.data.data === 0){
                this.currentRow = null;
              }else{
                if(data.data.data === 1){
                  this.$message({
                    showClose: true,
                    message: '教职工已添加禁排',
                    type: 'success',
                    duration: "1500"
                  });
                }
                if(data.data.data === 2){
                  this.$message({
                    showClose: true,
                    message: '场地已添加禁排',
                    type: 'success',
                    duration: "1500"
                  });
                }
                if(data.data.data === 4){
                  this.$message({
                    showClose: true,
                    message: '教师已添加课程',
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
            }
        })
      }
    },
    //班级列表
    getclassList(){
      this.treeloading = true;
      let data = {'gradeid':this.scyearvalue.id}
      course.classList(data).then(data=>{
        this.treeloading = false;
        if(data) this.data2 = data.data.data;
      })
    },
    //获取班级id
    getcouseList( data,node, stores){

      clearTimeout(this.timenum);
      let _this = this
      this.timenum = setTimeout(function() {
        let calzz = _this.$refs.tree.getCheckedNodes();
        _this.SelectedClassId =[];
        calzz.map(function(item,index){
          if(item.type == "clazz"){
            _this.SelectedClassId.push(item.id)
          }
        })
        if(_this.SelectedClassId.length !== 0){
          if(_this.SelectedClassId.length == 1){
            _this.course_falg = true;
            _this.CLgetlist();
          }else{
            _this.course_falg = false;
          }
          _this.tableloading =true;
          _this.getkcb();
        }
      }, 100);
    },
    //获取班级授课列表接口
    CLgetlist(){
      this.table1loading = true;
      let datas = {'classId':this.SelectedClassId.join(','),'pageSize':100,'pageNo':1,'termId':this.termId};
      course.classCoursegetList(datas).then(data=>{
        this.table1loading = false;
        if(data) this.tableData = data.data.data.list;
      })
    },
    getkcb(){    //getnewkb
      let datas = {'id':this.SelectedClassId.join(','),'type':"0",'pid':this.ScheduleID,'schType':'0','fewWeek':0};
      course.CSdisType(datas).then(r=>{
        if(r){
          this.getCSdisType(r.data.data);
          this.tableloading =false;
        }
      })
    },
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
  width:280px;
}
.classcourse-left .el-cascader{
  width:100%;
  margin:12px 0;
}
.classcourse-left .el-select{
  width:100%;
  margin:12px 0;
}
.classcourse-right{
  width:860px;
}
.classcourse-right .text{
  text-align:right;
  margin-bottom:5px;
}
.el-table .info-row {
    background: #c9e5f5;
}
.tac .clazz_list li{
  margin: 5px 0;
}
</style>
<style>
.el-select-dropdown__wraps{
  height:600px;
}
.classcourse .el-scrollbar__thumb{
  background-color:#20a0ff;
}
.classcourse-left .el-tree{
  float: left;
  min-width: 100%;
}
</style> 