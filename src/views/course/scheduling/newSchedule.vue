<template>
  <div class="newSchedule">
      <nav-top></nav-top>
      <div class="log-magess"><span class="arrow-center left" >新建课表</span><span @click="back" class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></div>
      <div class="magessBox clear">
        <div style="margin:0 auto 50px;width:1160px" class="room-box clear">

          <el-form :label-position="labelPosition" :model="form" class="demo-form-inline" label-width="80px" >
            <el-row >
              <!-- <el-col :span="6">
                <el-form-item label="校区">
                  <el-select  :disabled="disabled"  v-model="form.campus" value-key="id" >
                    <el-option v-for="(item,index) in form2.campus" :key="item.id" :label="item.name" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item label="学期选择">
                    <el-select :disabled="disabled" @change="getdefweek"  v-model="form.schoolyear" value-key="term" >
                        <el-option v-for="(item,index) in form2.schoolyear" :key="item.term" :label="item.term" :value="item"></el-option>
                      </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="课表名称">
                  <el-input :disabled="disabled"  v-model="form.Schedulename" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row >
              <el-col :span="6">
                <el-form-item label="课表名称">
                  <el-input :disabled="disabled"  v-model="form.Schedulename" ></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row >
              <el-col :span="2">
                <el-form-item label="每周天数">
                  <!-- <el-select :disabled="disabled"   v-model="form.weeksum" placeholder="">
                    <el-option v-for="item in defaultweek" :key="item" :label="item" :value="item"></el-option>
                  </el-select> -->
                  <span>{{form.weeksum}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="早读">
                  <el-select :disabled="disabled"   v-model="form.morning" placeholder="节次">
                    <el-option v-for="(item,index) in 7" :key="item" :label="index" :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="上午">
                  <el-select :disabled="disabled"  v-model="form.mornings" placeholder="节次">
                    <el-option v-for="(item,index) in 7" :key="item" :label="index" :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item  label="下午">
                  <el-select :disabled="disabled"  v-model="form.Afternoon" placeholder="节次">
                    <el-option v-for="(item,index) in 7" :key="item" :label="index" :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="晚自习">
                  <el-select :disabled="disabled"  v-model="form.Night" placeholder="节次">
                    <el-option v-for="(item,index) in 7" :key="item" :label="index" :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-button :disabled="disabled"  type="primary" @click="onSubmit">确 定</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="newSchedule-more clear">
            <p class="left">课表</p>
            <div class="classcourse-box-top right">
              <span @click= "Sectiontime">节次时段设置</span>
              <span @click = "setpublic">公共时段设置</span>
            </div>
          </div>
          <div style="text-align:center; margin-top:20px;" v-if="flag">
            <el-table
              ref = "table"
              :data="tableData"
              v-loading.body="tableloading"
              style="width: 100%"
              @current-change = "haclick"
              :span-method="arraySpanMethod"
              border>
              <el-table-column
                fixed
                prop="tablemorning"
                label="课表"
                width="150"
                align="center"
                >
                <template slot-scope="scope">
                  <div style="height:60px; padding:10px;">
                    <p>{{scope.row.tablemorning[0]}}</p>
                    <p>{{scope.row.tablemorning | tostime}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :label="cityOptions[index]"
                :prop="cityOptionseg[index]"
                min-width = "100"
                v-for = "(item,index) in formsh.weekNum" :key ='item'
                >
              </el-table-column>
            </el-table>
            <div style="text-align:center; margin-top:20px;"><el-button type="primary" size="large" :loading="loading" @click="Psersc">保 存 课 表</el-button></div>
          </div>
        </div>    
     </div>
       <!--节次时段限制-->
          <el-dialog   :visible.sync="dialogVisibletime" width="30%" >
            <div slot="title"  >
                <p style="font-size:16px;text-align:left;" >教职工时段限制</p>
            </div>
            <div style=" text-align:left;" class="clear Sectiontime" >
              <el-table
                :data="tableDataSection"
                style="width: 100%">
                <el-table-column
                  prop="tablec"
                  label="节次"
                  width="80">
                  <template slot-scope="scope">
                    <div>
                      <p>{{scope.row.tablec[0]}}</p>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="start"
                  label="开始时间">
                  <template slot-scope="scope">
                    <el-time-select
                      placeholder="起始时间"
                      v-model="scope.row.start"
                      :picker-options="{
                        start: '06:00',
                        step: '00:05',
                        end: '23:30'
                      }">
                    </el-time-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="end"
                  label="结束时间"
                  >
                  <template slot-scope="scope">
                    <el-time-select
                      placeholder="结束时间"
                      v-model="scope.row.end"
                      :picker-options="{
                        start: '06:00',
                        step: '00:05',
                        end: '23:30',
                        minTime: scope.row.start
                      }">
                    </el-time-select>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibletime = false">取 消</el-button>
              <el-button   type="primary" @click="timenation('assign')"  >确 定</el-button>
            </div>
          </el-dialog>

           <!--公共时段设置-->
          <el-dialog   :visible.sync="dialogpublictime" width="30%" >
            <div slot="title"  >
                <p style="font-size:16px;text-align:left;" >公共时段设置</p>
            </div>
            <div style=" text-align:left;" class="clear publictime" >
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="时段名称:">
                  <el-col :span="11">
                    <el-input v-model="formLabelAlign.name"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="时段位置:">
                  <el-col :span="11">
                    <el-select  v-model="formLabelAlign.positions" placeholder="">
                      <el-option v-for="(item,index) in tableDatalen" :key="index" :label="(index == 0) ? tableData[index].tablemorning[0]+'之前':tableData[index-1].tablemorning[0]+'之后'" :value="index"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="起止时间:">
                    <el-col :span="8">
                      <el-time-select
                        placeholder="起始时间"
                        v-model="formLabelAlign.starttime"
                        :picker-options="{
                          start: '06:00',
                          step: '00:05',
                          end: '23:30'
                        }">
                      </el-time-select>
                    </el-col>
                    <el-col  :span="1">至</el-col>
                    <el-col :span="8">
                        <el-time-select
                          placeholder="结束时间"
                          v-model="formLabelAlign.endtime"
                          :picker-options="{
                            start: '06:00',
                          step: '00:05',
                          end: '23:30',
                            minTime: formLabelAlign.starttime
                          }">
                        </el-time-select>
                    </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="publicsubmit">添 加</el-button>
                </el-form-item>
              </el-form>
              <el-table
                :data="publictable"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="时段位置">
                  <template slot-scope="scope">
                    <span>{{(scope.row.name == 0) ? tableData[scope.row.name].tablemorning[0]+'之前':tableData[scope.row.name-1].tablemorning[0]+'之后'}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="monday"
                  label="时段名称">
                </el-table-column>
                <el-table-column
                  prop="end"
                  label="操作"
                  width="80"
                  >
                  <template slot-scope="scope">
                    <el-tooltip :content="'删除'" placement="top">
                      <span class="table-end-caozuo"><img @click=" deleteformation(scope.$index,scope.row)" src="../../../assets/image/delete-icon.png"/></span>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogpublictime = false">取 消</el-button>
              <el-button   type="primary" @click="dialogpublictime = false"  >确 定</el-button>
            </div>
          </el-dialog>
  </div>
</template>

<script>
import course from '../../../apis/course.js'
import api from '../../../apis/login.js'
import navTop from "../../common/header";
import DateFns  from 'date-fns'
 import Vue from 'vue'
 import {mapActions} from "vuex";
export default {
  name: 'newSchedule',
  data() {
    return {
      disabled:false,
      tableloading:false,
      loading:false,
      dialogpublictime:false,
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        positions: '',
        starttime:'',
        endtime:'',
      },
      LabelAlignflag:false, //公共时段开关 设置公共时段后不可更改课表样式
      publictable:[],       //公共时段表格
      allformLabelAlign:[],
      getScheduleID:"",
      dialogVisibletime:false,
      cityOptions :['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日' ],
      Options :['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
      cityOptionseg :['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday','monday', 'tuesday', 'wednesday', 'thursday',],
      flag:true,
      len:0,
      lenmornings:0,
      lenmorning:0,
      lenAfternoon:0,
      lenNight:0,
      labelPosition:"right",
      form:{
        Schedulename:'',
        schoolyear:{},
        campus:{},
        weeksum:1,
        Night:0,
        morning:0,
        mornings:0,
        Afternoon:0,
      },
      flagschoolyear:false,   //
      form2:{
        schoolyear:"",
        campus:"",
        weeksum:1,
        Night:0,
        morning:0,
        mornings:0,
        Afternoon:0,
      },
      formsh:{
        Sections:"",
        weekNum:1,
      },
      hb_index:"",
      setcolumns:[],
      setmorning:[],
      setmornings:[],
      setAfternoon:[],
      tableData:[],
      tableDatalen:'',
      tableDataSection:[],
      tableDataSectionnew:[],
      defaultweek:1,
    }
  },
  components:{
    navTop
  },
  filters: {
    tostime: function (value) {
      if(value[1] && value[1].start !== '' && value[1].end !== ''){
        return value[1].start.split(':')[0]+':'+value[1].start.split(':')[1]+'~'+value[1].end.split(':')[0]+':'+value[1].end.split(':')[1]
      }
    }
  },
  created(){
    course.getTerm().then(data=>{
      if(data) this.form2.schoolyear = data.data.data;
    })
    let parms = { id:1,type:4}
    api.querycampus(parms).then(data=>{                //查询校区
      if(data){
        this.form2.campus = data.data.data
      }
    })
    console.log(localStorage.getItem("newSchedule"))
    
  },
  mounted() {
    if(localStorage.getItem("newSchedule")){
      //根据id 获取课表信息
      this.disabled = true;
      this.tableloading = true;
      let newschedule = JSON.parse(localStorage.getItem("newSchedule"))
      this.getScheduleID = newschedule.id;
      this.$Cookies.set('sectionid',newschedule.id);
      course.getSection({'id':newschedule.id}).then(data=>{
        if(data){
          this.tableloading = false;
          this.form.Schedulename = newschedule.name;
          this.form.schoolyear = {
            'term' : newschedule.termId
          }
          this.form.campus={
            'id' : newschedule.campusId,
            'name' : newschedule.str3
          }
          this.form.morning = Number(newschedule.readingNum);
          this.form.mornings = Number(newschedule.amNum);
          this.form.Afternoon = Number(newschedule.pmNum);
          this.form.Night = Number(newschedule.eveningNum);
          this.form.weeksum = Number(newschedule.weekNum);
          this.tablemorning();
          this.tablemornings();
          this.tableAfternoon();
          this.tableNight();
          this.tableweek();
          return data
        }
      }).then(data=>{
        let res = data.data.data
        let _tableData=this.tableData
        console.log(_tableData)
        let _this = this;
        console.log(data)
        let allpublic =[];
        let i = -1;
        res.map(function (item,index,input) {
          if(item.isPublic == '0'){
            i =i+1;
            _this.tableDataSection.push({'tablec':_tableData[i].tablemorning,'start':item.startTime,'end':item.endTime})
          }else{
            allpublic.push(item);
            _this.formLabelAlign.positions = index
          }
        })
        console.log(this.tableDataSection)
        this.timenation();
        
        allpublic.map(function(item,index){
          let datatime = new Date();
          _this.publictable.push({tablemorning:[item.name,{'start':item.startTime,'end':item.endTime}],'monday':item.name,'fixed':datatime,'name':item.sectionIndex});
          _this.tableData.splice(item.sectionIndex,0, {tablemorning:["公共时段",{'start':item.startTime,'end':item.endTime}],'monday':item.schDesc,colspans:[1,_this.formsh.weekNum],'fixed':datatime});
        })
      })
    }
    console.log(this.form)
  },
  computed: {

  },
  methods: {
    getdefweek(){
      this.form.weeksum = Math.ceil(Number(this.form.schoolyear.weekNum))
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row)
      if (row.tablemorning[0]  === '公共时段') {
        if (columnIndex === 1) {
          return [1, this.formsh.weekNum];
        }else if (columnIndex >= 2) {
          return [0, 0];
        }
      }
    },
    tremschedul(){
      course.gettermSChedule({'termId':this.form.schoolyear.term}).then(data=>{
        if(data){
          if(data.data.data){
            this.$message({
              showClose: true,
              message: '学期课表已存在',
              type: 'success'
            });
            this.form.schoolyear={};
          }
        }
      })
    },
    //设置节次时段

    //保存课表sectionList
    Psersc(){
      if(this.flagschoolyear){
        this.$message({
          showClose: true,
          message: '学期课表已存在',
          type: 'success'
        });
        console.log('333')
        return
      }
      if(this.getScheduleID){
        this.$router.push('/course/scheduling/scheduindex/1/schedu1');
        return
      }else{
      console.log('222')
      let  formdata = new FormData()
      formdata.append('name', this.form.Schedulename);
      formdata.append('termId', this.form.schoolyear.term);
      formdata.append('campusId', this.form.campus.id);
      formdata.append('weekNum', this.form.schoolyear.weekNum);
      formdata.append('readingNum', this.form.morning);
      formdata.append('amNum', this.form.mornings);
      formdata.append('pmNum', this.form.Afternoon);
      formdata.append('eveningNum', this.form.Night);
      formdata.append('totalWeek', this.form.schoolyear.termWeek);
      formdata.append('endTime', this.form.schoolyear.termEndTime);
      formdata.append('startTime', this.form.schoolyear.termStartTime);
      formdata.append('restNum', this.form.schoolyear.restNum);
      this.loading = true;
      let _this = this;
      course.newSChedule(formdata).then(data=>{
        if(data){
          console.log(data)
          this.getScheduleID = data.data.data;
          this.$Cookies.set('sectionid',this.getScheduleID);
          return course.getSection({'id':this.getScheduleID}).then(data=>{
            if(data){
              return data
            }
          });
        }
      }).then(data=>{
        console.log(this.tableData)
        let Sections = data.data.data;
        let secdata = [];
        let jc = JSON.parse(JSON.stringify(this.tableData));
        let newjc = [];
        jc.map(function(item){
          if(item.tablemorning[0] !== '公共时段'){
            newjc.push(item)
          }
        })
        console.log(newjc)
        Sections.map(function(item,index){
               secdata.push({'scheduleId': _this.getScheduleID,
              'startTime': newjc[item.sectionIndex].tablemorning[1].start,
              'endTime':newjc[item.sectionIndex].tablemorning[1].end,
              'sectionIndex': item.sectionIndex})
        })
        secdata = JSON.stringify(secdata);
        let  formdatas = new FormData()
        formdatas.append('sectionList', secdata);
        return course.setSectionTime(formdatas).then(data=>{
          if(data){
            console.log(data)
            return data
          }
        })
      }).then(data=>{
        console.log(data)
        if(this.publictable.length !== 0){
          let formdatas = new FormData()
            formdatas.append('schDesc', this.formLabelAlign.name);
            formdatas.append('startTime', this.publictable[0].tablemorning[1].start);
            formdatas.append('endTime', this.publictable[0].tablemorning[1].end);
            formdatas.append('scheduleId', this.getScheduleID);
            formdatas.append('sectionIndex', this.formLabelAlign.positions);
            course.PublicTime(formdatas).then(data=>{
              this.loading = false;
              if(data){
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: 'success'
                });
                this.$router.push('/course/scheduling/scheduindex/1/schedu1');
              }
            })
        }else{
          this.loading = false;
          this.$router.push('/course/scheduling/scheduindex/1/schedu1');
        }
      })
    }
  },
    haclick(currentRow, oldCurrentRow){
      console.log(currentRow)
    },
    //公共时段
    setpublic(){
      if(!this.disabled){
        this.dialogpublictime = true;
        this.LabelAlignflag = true;
      }
      
    },
    //时间格式化
    time(date){
      return DateFns.format(new Date(date), 'HH:mm:ss')
    },
    publicsubmit(){
      let allsection = JSON.parse(JSON.stringify(this.tableDataSection))
      this.allformLabelAlign.push(allsection)
      let datatime = new Date();
      this.publictable.push({tablemorning:[this.formLabelAlign.name,{'start':this.formLabelAlign.starttime,'end':this.formLabelAlign.endtime}],'monday':this.formLabelAlign.name,'fixed':datatime,'name':this.formLabelAlign.positions});
      console.log(this.formLabelAlign.positions)
      this.tableData.splice(this.formLabelAlign.positions,0, {tablemorning:["公共时段",{'start':this.formLabelAlign.starttime,'end':this.formLabelAlign.endtime}],'monday':this.formLabelAlign.name,colspans:[1,this.formsh.weekNum],'fixed':datatime});
   },
   //删除公共时段
   deleteformation(index,row){
    let fixedindex;
    this.publictable.splice(index,1)
    this.tableData.map(function(item,index){
      if(item.fixed){
        if(item.fixed == row.fixed) fixedindex = index;
      }
    })
    this.tableData.splice(fixedindex,1)
   },

    //节次时段提交
    timenation(){
      console.log(this.tableDataSection)
      this.dialogVisibletime = false;
      this.tableDataSectionnew =JSON.parse(JSON.stringify(this.tableDataSection))
      console.log(this.tableDataSectionnew)
      let _tableData=this.tableData
      this.tableDataSectionnew.map(function(item,index,input){
        // item.start = DateFns.format(new Date(item.start), 'HH:mm:ss');
        // item.end = DateFns.format(new Date(item.end), 'HH:mm:ss');
        if(_tableData[index].tablemorning[1]){
          _tableData[index].tablemorning.splice(1,1);
        }
        _tableData[index].tablemorning.push({'start':item.start,'end':item.end})
         return item
      })
    },
    //节次时段限制
    Sectiontime(){
      if(!this.disabled){
        console.log()
        this.tableDataSection = this.tableData.map(function (item,index,input) {
          return {'tablec':item.tablemorning,start:'',end:''}
        })
        this.dialogVisibletime = true;
        console.log(this.tableDataSection)
      } 
    },
    onSubmit(){
      if(this.LabelAlignflag){
        return 
      }
      if(this.form.Night+this.form.morning+this.form.mornings+this.form.Afternoon == 0){
        return
      }
      this.tablemorning();
      this.tablemornings();
      this.tableAfternoon();
      this.tableNight();
      this.tableweek();
      
    },
    tableNight(){
      let num=this.form.morning+this.form.mornings+this.form.Afternoon
      this.tableData.splice(this.lenmornings+this.len+this.lenAfternoon,this.lenNight);
        for(var i = 0;i<this.form.Night;i++){
          this.tableData.splice(this.len+this.lenmornings+this.lenAfternoon+i,0, {tablemorning:['第'+this.Options[num+i]+'节']});
        }
      // }
      this.lenNight = this.form.Night
    },
    tableAfternoon(){
      let num=this.form.morning+this.form.mornings
      this.tableData.splice(this.lenmornings+this.len,this.lenAfternoon);
        for(var i = 0;i<this.form.Afternoon;i++){
          this.tableData.splice(this.len+this.lenmornings+i,0, {tablemorning:['第'+this.Options[num+i]+'节']});
        }
      // }
      this.lenAfternoon = this.form.Afternoon
    },
    tablemornings(){
      let num=this.form.morning
      this.tableData.splice(this.len,this.lenmornings);
        for(var i = 0;i<this.form.mornings;i++){
          this.tableData.splice(this.len+i,0, {tablemorning:['第'+this.Options[num+i]+'节']});
        }
      // }
      this.lenmornings = this.form.mornings
    },
    tablemorning(){
      this.tableData.splice(0,this.len);
        for(var i = 0;i<this.form.morning;i++){
          this.tableData.splice(i,0, {tablemorning:['第'+this.Options[i]+'节']});
        }
        console.log(this.setmorning)
      // }
      this.len = this.form.morning
    },
    tableweek(){
      let _weeksum = this.form.weeksum;
      let _this =this;
      this.tableData.map(function(item,index){
        for(var i = 0;i<_weeksum;i++){
          let j = i+1;
          item[_this.cityOptionseg[i]] = '';
        }
        return item
      })
      this.formsh.weekNum = Number(_weeksum);
    },
    back(){
      this.$router.go(-1)
    }
  },
  directives:{
        
  },
  watch:{
    form : {
      handler: function (val, oldVal) {
        this.tableData.map(function(item,index){
          if(item.colspans) item.colspans[1] = val.weeksum;
        });
       },
      deep: true
    },
    tableData:{
      handler: function (val, oldVal) {
        this.tableDatalen = this.tableData.length+1;
       },
      deep: true
    },
    'form.schoolyear':function(news,old){
      if(news !== null && localStorage.getItem("newSchedule") == null){
        this.tremschedul();
      }
    }
  }
     
}

</script>
<style scoped>
.newSchedule{
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
.classcourse-box-top span{
  cursor: pointer;
  margin-right:10px;
  color:#208af5;
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
.Sectiontime .el-date-editor.el-input {
    width: 190px;
}
.publictime .el-date-editor.el-input {
    width: 120px;
}
.el-select {
    width:100%;
}
</style>