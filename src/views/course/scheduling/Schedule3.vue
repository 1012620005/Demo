<template>
  <div class="schedulesee clear">
      <div class="classcourse-left left" >
          <h3 class="el-h3" >场地列表</h3>
          <!-- <el-select  v-model="campusvalue" placeholder="请选择" value-key="id">
            <el-option
              v-for="item in campus"
              :key="item.id"
              :label="item.name"
              :value="item">
            </el-option>
          </el-select>  -->
         <el-row class="tac">
            <el-col :span="24">
              <el-tree
                v-loading.body="treeloading"
                :data="datatree"
                ref="tree"
                highlight-current
                :props="defaultProps"
                @node-click="getcouseList"
                accordion
                node-key="id"
                >
              </el-tree>
            </el-col>
          </el-row>
      </div> 
      <div class="classcourse-right right" >
        <el-row :gutter="20">
          <el-col :offset="18" :span="3"><span  style="line-height: 30px;text-align: right;display: inline-block;width: 100%;" >选择周次</span></el-col>
          <el-col :span="3">
            <el-select size="small" v-model="fewWeek" placeholder="">
                <el-option
                  v-for="item in totalWeek"
                  :key="item"
                  :label="item"
                  :value="item">{{'第'+item+'周'}}</el-option>
              </el-select>
            </el-col>
        </el-row>
        <p class="text clear">
          <!-- <span style="color:red;"><i></i>重排</span> -->
          <!-- <span style="color:red;margin-left:25px;"><i></i>清空</span> -->
          <!-- <span style="color:red; margin-left:25px;">提示：点击课表中课程，拖动到绿色位置可收到互调课程。</span> -->
          <span style="color:#000;cursor: pointer;" @click="Print" class="right"><i></i>打印</span>
          </p>

          <div id="Print" class="Print" >
              <el-table
                ref = "table"
                v-loading.body="tableloading"
                :data="tableDatasch"
                @cell-mouse-leave ="mouseleave"
                @cell-mouse-enter ="mouseenter"
                @cell-mouse-up="clickss"
                :span-method="arraySpanMethod"
                style="width: 100%"
                border>
                <el-table-column
                  align="center"
                  prop="tablemorning"
                  label="课表"
                  width="150"
                  >
                <template slot-scope="props">
                  <div style="font-size:12px;min-height: 60px;">
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
                  <div style="font-size:12px;min-height: 60px;" :class="scope.row.Schedule.secList[index].isSet == '0' ? 'colorschedule':''" >{{scope.row.Schedule.secList[index].valueIndex}}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="tableDataunde.length !== 0"  >
            <p class="text"><span style="color:red;">选择课程之后再点击课表红色位置即添加课程</span></p>
            <el-table
              :data="tableDataunde"
              v-loading.body="table1loading"
              v-model="headerAlign"
              stripe
              highlight-current-row
              @row-click="handleCurrentChange"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="65">
              </el-table-column>
              <el-table-column
                prop="str4"
                label="班级">
              </el-table-column>
              <el-table-column
                prop="str2"
                label="学科">
              </el-table-column>
              <el-table-column
                prop="str3"
                label="任课老师">
              </el-table-column>
              <el-table-column
                prop="int1"
                label="已排节次"
                width="150">
              </el-table-column>
              <el-table-column
                prop="int2"
                label="未排节次"
                width="150">
              </el-table-column>
              <el-table-column
                prop="week"
                label="授课周次"
                width="150">
                <template slot-scope="scope">
                  <span>{{scope.row.startWeek+'~'+scope.row.endWeek}}</span>
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
import p from './print.js'
const qs = require('querystring');
export default {
  name: 'classcourse',
  data() {
    return {
      headerAlign:'center',
      table1loading:false,
      tableDataunde:[],
      treeloading:false,
      currentRow:'',
      tableloading:false,
      cityOptions :['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      cityOptionseg :['1', '2', '3', '4', '5', '6', '7'],
      flag:true,
      len:0,
      lenmornings:0,
      lenmorning:0,
      lenAfternoon:0,
      lenNight:0,
      labelPosition:"right",
      options:[],
      scyearvalue:"",
      form:{
        schoolyear:"",
      },
      datatree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form:{
        campus:"",
        weeksum:7,
        Night:3,
        morning:3,
        mornings:3,
        Afternoon:3,
      },
      setcolumns:[],
      setmorning:[],
      setmornings:[],
      setAfternoon:[],
      tableData:[],
      tableDatasch:[],     //课表
      formsh:{
        Sections:"",
        weekNum:1,
      },
      ScheduleID:"",
      tableDataSection:[],
      tableDataSectionnew:[],
      campusvalue:'',
      campus:'',
      totalWeek:1,
      fewWeek:'1',
      kcbname:'',
      kcbclass:'',
      hb_index:'',
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
    let parms = { id:1,type:4}
    api.querycampus(parms).then(data=>{                //查询校区
      if(data){
        this.campus = data.data.data;
        this.campusvalue = this.campus[0];
      }
    });
  },
  mounted(){
    this.termId = JSON.parse(localStorage.getItem("newSchedule")).termId
    this.ScheduleID = this.$Cookies.get('sectionid');
  },
  computed: {
    
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex  === this.hb_index) {
        if (columnIndex === 1) {
          return [1, this.formsh.weekNum];
        }else if (columnIndex >= 2) {
          return [0, 0];
        }
      }
    },
    handleCurrentChange(val){
       this.currentRow = val;
       console.log(val)
       let u={
        'typeId': this.SelectedClassId,
        'pid':this.ScheduleID,
        'type':'2',
        'fewWeek':this.fewWeek,
        'refId'	:val.classId,
        'isColor':'0'
       }
       course.getschcolor(u).then(r=>{
         if(r){
           this.getCSdisType(r.data.data)
         }
       })
    },
    Print(){
      let codestr = document.getElementById("Print").innerHTML
      p.print(codestr,this.kcbname,this.kcbclass,this.fewWeek)
    },
    Gettypetree(newval){
      course.STstypetree({'campusId':newval.id}).then(data=>{
        if(data) this.datatree = data.data.data;
      })
    },
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
    //场地
    getcouseList( data,node, stores){
      if(data.type == "4"){
        // this.tableloading =true;
        this.SelectedClassId = data.id;
        this.getunfinished()
        this.getkcb()
      }
    },
    getkcb(){
      let u={
        'typeId': this.SelectedClassId,
        'pid':this.ScheduleID,
        'type':'2',
        'fewWeek':this.fewWeek,
        'refId'	:null,
        'isColor':'1'
      }
      course.getschcolor(u).then(r=>{
        if(r){
          this.getCSdisType(r.data.data);
        }
      })
    },
    getunfinished(){
      // course.STcourse({'id':this.SelectedClassId,'state':1}).then(data=>{
      //   if(data) this.tableDataunde = data.data.data
      // })
      let u = {
        // 'classId':'',
        // 'teachId':this.SelectedClassId,
        'roomId':this.SelectedClassId,
        'termId':this.termId
      }
      course.getunfinished(u).then(r=>{
        if(r){
          this.tableDataunde = r.data.data;
        }
      })
    },
    getCSdisType(res){
       this.totalWeek = res.totalWeek
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
          _this.hb_index = index;
          item.Schedule.secList.push({valueIndex:'课间操'});
          _this.tableDatasch.push(item)
        }
      });
      this.formsh.weekNum = res.weekNum;
    },
    
    clickss(rows, columns, cells, event, tables){
      if(columns.property === "tablemorning"){
        return
      }
      if(this.currentRow !== ''){
        if(rows.Schedule.secList[Number(columns.property)-1].isSet !== 0 ){
          this.currentRow = "";
          this.$message({
            showClose: true,
            message: '不可操作',
            type: "error"
          });
        }else{
          let u= {
              'pid':this.ScheduleID,
              'typeId':this.SelectedClassId,
              'subjectId':this.currentRow.subject,
              'refId':this.currentRow.classId,
              'refType':'2',
              'sectionId':rows.Schedule.secList[Number(columns.property)-1].id
            }
          course.setNotPk(qs.stringify(u)).then(r=>{
            if(r){
              this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: "success"
                });
                this.getunfinished();
                this.getkcb();
                this.currentRow = "";
            }
          })
        }
        return 
      }else{
        let refid=""
        let type = rows.Schedule.secList[Number(columns.property)-1].refType
        if(type == 0){
          refid = rows.Schedule.secList[Number(columns.property)-1].typeId;
        }else{
          refid = rows.Schedule.secList[Number(columns.property)-1].refId;
        }
        let u={
         'typeId': this.SelectedClassId,
         'pid':this.ScheduleID,
         'type':'2',
        'fewWeek':this.fewWeek,
        'refId'	:refid,
        'isColor':'2',
        'secId':rows.Schedule.secList[Number(columns.property)-1].id,
       }
       course.getschcolor(u).then(r=>{
         if(r){
           this.getCSdisType(r.data.data)
         }
       })
      }
      let _this = this
      const table = tables;
      const cell = cells;
      const row = rows;
      const column = columns;
      let sTop = document.documentElement.scrollTop || document.body.scrollTop;
      cell.style.backgroundColor = 'red';
      let disX = event.clientX - cell.offsetLeft;
      let disY = event.clientY - cell.offsetTop+sTop;
      let node = cell.cloneNode(true);
      node.style.zIndex = 10000;
      node.style.backgroundColor = 'red';
      node.style.position = 'absolute';
      table.$el.children[2].appendChild(node);
      node.children[0].style.width = column.realWidth + 'px';
      node.style.height =  '80px';
      // node.style.opacity = 0.8;
      let oldtabletdcolor = null;
      let lie = null;
      let hang = null;

      document.onmousemove = function(e) {
        let l = e.clientX - disX;
        let t = e.clientY - disY+sTop;
        let tablebody = table.$el.children[2].children[0]
        if(l<150){
          l = 152;
        }else if(l>=tablebody.offsetWidth-node.offsetWidth){
          l = tablebody.offsetWidth-node.offsetWidth;
        };
        if(t<0){
          t = 0;
        }else if(t>=tablebody.offsetHeight-node.offsetHeight){
          t = tablebody.offsetHeight-node.offsetHeight;
        };
        console.log(tablebody.offsetHeight)
        console.log(node.offsetHeight)
        // 移动当前元素
        node.style.left = l + 'px';
        node.style.top = t + 'px';
        let tabletr = table.$el.children[2].children[0].children[1].children;
        let nodetrx = node.offsetLeft + column.realWidth / 2;
        let nodetry = node.offsetTop + 40;
        let tabletrcolor = null;
        let tabletrcolornum = null;
        for (let i = 0; i < tabletr.length; i++) {
          let tabletrtop = tabletr[i].offsetTop;
          console.log(tabletrtop);
          if (i < tabletr.length - 1) {
            if (nodetry > tabletr[i].offsetTop && nodetry < tabletr[i + 1].offsetTop) {
              tabletrcolor = tabletr[i];
              tabletrcolornum = i
            };
          } else {
            if (nodetry > tabletr[i].offsetTop) {
              tabletrcolor = tabletr[i];
              tabletrcolornum = i
            };
          };
        };
        if (tabletrcolor) {
          if (oldtabletdcolor) {
            oldtabletdcolor.style.backgroundColor = '';
            console.log(oldtabletdcolor);
          }
          let tabletd = tabletrcolor.children;
          let tabletdcolor = null;
          let tabletdcolornum = null;
          for (let i = 0; i < tabletd.length; i++) {
            let tabletdleft = tabletd[i].offsetTop;
            console.log(tabletdleft);
            if (i < tabletd.length - 1) {
              if (nodetrx > tabletd[i].offsetLeft && nodetrx < tabletd[i + 1].offsetLeft) {
                tabletdcolor = tabletd[i];
                tabletdcolornum = i
                console.log(tabletdcolor)
                tabletdcolor.style.backgroundColor = 'blue';
              };
            } else {
              if (nodetrx > tabletd[i].offsetLeft) {
                tabletdcolor = tabletd[i];
                tabletdcolornum = i
                tabletdcolor.style.backgroundColor = 'blue';
              };
            };
          };
          oldtabletdcolor = tabletdcolor;
          console.log(oldtabletdcolor);
          lie = tabletdcolornum;   //列坐标
          hang = tabletrcolornum;   //行坐标
        };
        // tabletrcolor.style.color = 'blue';
      };
      document.onmouseup = function(e) {
        if (oldtabletdcolor) {
          oldtabletdcolor.style.backgroundColor = '';
        }
        if(lie !== null){
          let newcells = tables.columns[lie].property
          let newrows = tables.data[hang].Schedule.secList[newcells-1]
          if(newrows.isSet !== 0){
            _this.$message({
              showClose: true,
              message: '不可操作',
              type: "error"
            });
            _this.getkcb();
          }else{
            let u= {
                'fromId':rows.Schedule.secList[Number(columns.property)-1].secRefId,
                'fromSecId':rows.Schedule.secList[Number(columns.property)-1].id,
                'toId':newrows.secRefId,
                'toSecId':newrows.id,
              }
            course.exchangeSec(u).then(r=>{
              _this.getkcb();
              if(r){
                _this.$message({
                    showClose: true,
                    message: '操作成功',
                    type: "success"
                  });
                  
              }
            })
          }
        }else{
          _this.$message({
            showClose: true,
            message: '不可操作',
            type: "error"
          });
          _this.getkcb();
        }
        cell.style.backgroundColor = '';
        table.$el.children[2].removeChild(node);
        document.onmousemove = null;
        document.onmouseup = null;
      };  
      if(event && event.preventDefault) 
          event.preventDefault(); 
      //IE中阻止函数器默认动作的方式 
      else{
        window.event.returnValue = false; 
      }
      return false
    },
  },
  directives:{
        
  },
  watch:{
    campusvalue:function(newval,old){
      this.Gettypetree(newval)
    },
    fewWeek:function(){
      this.getkcb();
      this.getunfinished();
      this.currentRow = "";
    }
  }
     
}

</script>
<style scoped>
.schedulesee{
  height:100%;
  text-align: left;
}
.classcourse-left{
  width:240px;
}
.classcourse-left .el-select{
  width:240px;
  margin:0 0 24px;
}

.classcourse-right{
  width:900px;
}
.schedulesee  .el-h3{
  margin-bottom: 30px;
  line-height: 30px;
}
.classcourse-right .text{
  text-align:left;
  margin-bottom:5px;
  margin-top: 5px;
}
.el-table .info-row {
    background: #c9e5f5;
}
.cell-move {
  transition: transform 1s;
}
.colorschedule{
  background-color:red;
}
</style>