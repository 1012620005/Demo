<template>
  <div class="tevaluation">
    <nav-top></nav-top>
    <p class="log-magess"><span class="arrow-center left" >课程表</span><span class="arrow-right"  @click="back" >返回<i class="el-icon-arrow-right"></i></span></p>
    <div class="tevaluation-box">
      <div class="tevaluation-top clear" >
        <div>
          <el-row :gutter="20">
            <el-col :span="4"  ><span style="line-height: 36px;" >{{selectxq}}</span></el-col>
            <el-col :span="4"  ><span style="line-height: 36px;" >{{newdata}}<i style=" margin-right:10px;" >{{weekdata}}</i></span></el-col>
            <el-col :span="14" >
            <el-form :model="form" label-width="50px" ref="ruleForm" >
              <el-row   type="flex" class="row-bg" justify="space-between"  >
                <el-col v-if="flagclazz" :span="10">
                  <el-form-item label="班级">
                    <el-select @change="querykbclass" v-model="form.bj"  placeholder="">
                        <el-option v-for="item in defa.bj" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label="周次">
                    <!-- <el-select @change="querykb" v-model="form.fewWeek" placeholder="">
                      <el-option
                        v-for="item in totalWeek"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select> -->
                    <el-date-picker
                       @change="querykbweek"
                       v-model="form.data"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日">
                      >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form >
              </el-col>
          </el-row>
        </div>
          <div >
              <el-table
                ref = "table"
                v-loading.body="tableloading"
                :data="tableDatasch"
                style="width: 100%"
                :span-method="arraySpanMethod"
                
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
                  <div style="font-size:12px;min-height: 60px;" :class="scope.row.Schedule.secList[index].isSet == '0' ? 'colorschedule':''" >{{scope.row.Schedule.secList[index].valueIndex}}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import navTop from "../common/header.vue";
import course from "../../apis/course.js";
const qs = require("querystring");
export default {
  name: "tevaluation",
  data() {
    return {
      cityOptions :['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      cityOptionseg :['1', '2', '3', '4', '5', '6', '7'],
      user: "",
      tableDatasch: [], //课表
      formsh: {
        Sections: "",
        weekNum: 1
      },
      tableloading: false,
      defa: {
        bj: []
      },
      totalWeek: null,
      form: {
        bj: "",
        fewWeek:'1',
        data:'',
      },
      flagclazz: false,
      newdata: "",
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      weekdata: "",
      startweekofyear:'',
      endweekofyear:'',
      years:'',
      selectxq:null,
      getDay:null,
      getDaykcb:null,
      hb_index:''
    };
  },
  components: {
    navTop
  },
  filters: {
    tostime: function (value) {
      if(value[1] && value[1].start !== '' && value[1].end !== ''){
        return value[1].start.split(':')[0]+':'+value[1].start.split(':')[1]+'~'+value[1].end.split(':')[0]+':'+value[1].end.split(':')[1]
      }
    }
  },
  created() {
    course.queryuser({ id: this.$Cookies.get("user") }).then(r => {
      this.user = r.data.data;
      if (this.user.clazz.length > 0) {
        this.flagclazz = true;
        this.defa.bj = this.user.clazz;
        this.form.bj = this.user.clazz[0].clazzid;
      }
      this.getkb();
    });
  },
  mounted() {
    let oDate = new Date(); //实例一个时间对象；
    this.getDay = oDate.getDay()
    if(this.getDay == 0){
      this.getDaykcb = 6;
    }else{
      this.getDaykcb = this.getDay-1;
    }
    let month = oDate.getMonth() + 1;
    this.newdata =oDate.getFullYear() + "年" + month + "月" + oDate.getDate() + "日";
    this.weekdata = "星期" + this.weeks[oDate.getDay()];
  },
  computed: {},
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
    querykbclass() {
      this.getkb()
    },
    querykbweek() {
      let checkDate = new Date(this.form.data);
          checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      let time = checkDate.getTime();
          checkDate.setMonth(0);
          checkDate.setDate(1);
      let yearsweek=Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
      if(this.form.data !== ''){
        if(yearsweek-this.startweekofyear>=0 && this.endweekofyear - yearsweek>0){
          this.form.fewWeek = yearsweek-this.startweekofyear+1;
          this.getkb()
        }else{
          this.$message({
            showClose: true,
            message: "课表不存在",
            type: "error",
            duration: "1500"
          });
        }
      }
    },
    getkb() {
      this.tableloading = true;
      let par = {};
      if (this.user.userType == "2") {
        if (this.user.clazz.length == 0) {
          par = {
            teachId: this.user.id,
            campuseId: this.user.sid,
            fewWeek: this.form.fewWeek,
            type: "1"
          };
        } else {
          par = {
            teachId: this.form.bj,
            campuseId: this.user.sid,
            fewWeek: this.form.fewWeek,
            type: "0"
          };
        }
      }
      if (this.user.userType == "3") {
        par = {
          teachId: this.user.clazz.clazzid,
          campuseId: this.user.sid,
          fewWeek: this.form.fewWeek,
          type: "0"
        };
      }
      course.querykb(par).then(r => {
        this.tableloading = false;
        if (r) {
          if (r.data.data !== null) {
            let startTime = r.data.data.startTime.split(' ')[0];
            let checkDate = new Date(startTime);
                checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            let time = checkDate.getTime();
                checkDate.setMonth(0);
                checkDate.setDate(1);
            this.startweekofyear=Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 2;
            this.endweekofyear = this.startweekofyear+r.data.data.totalWeek;
            this.selectxq = r.data.data.termId+'第'+this.form.fewWeek+'周';
            console.log(this.selectxq)
            this.getCSdisType(r.data.data);
          } else {
            this.$message({
              showClose: true,
              message: "课表不存在",
              type: "error",
              duration: "1500"
            });
          }
        }
      });
    },
    getCSdisType(res) {
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
    back() {
      this.$router.go(-1);
    }
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.report {
  height: 100%;
}
.log-magess {
  margin: 6px auto 16px;
  position: relative;
  background-color: #fff;
  height: 50px;
  width: 1200px;
  color: #000;
  font-size: 16px;
}
.log-magess .arrow-center {
  display: inline-block;
  margin-left: 38px;
  height: 46px;
  border-bottom: 4px solid #208af5;
  line-height: 50px;
}
.log-magess .arrow-right {
  position: absolute;
  right: 10px;
  top: 16px;
  cursor: pointer;
}
.tevaluation-box {
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 40px;
  background-color: #fff;
}
.tevaluation-top {
  margin: 0 auto;
  width: 1160px;
  padding-top: 20px;
}

.logon-main-logon-right-button .el-button--primary {
  background-color: #208af5;
  width: 94px;
}
.activekcb{
  background-color: aliceblue;
  margin: 0 -18px;
}
</style>