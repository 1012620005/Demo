<template>
  <div class="classcourse clear">
      <div class="classcourse-left left" >
          <h3 style="margin-bottom:20px;" >排课范围</h3>
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
                show-checkbox
                ref="tree"
                highlight-current
                :default-expanded-keys="['1']"
                :props="defaultProps"
                accordion
                node-key="id">
              </el-tree>
            </el-col>
          </el-row>
      </div> 
      <div class="classcourse-right right" >
        <h3 style="margin-bottom:20px;">自动排课选项</h3>
        <ul class="automatic-selsect">
          <li>
            <el-row class="automatic-selsect-line" >
              <el-col :span="24"><el-radio class="radio" v-model="automatic.Requirement" label="0">排课要求发生冲突时，允许逐渐取消相关要求，直至把课排完。</el-radio><span @click="setautomaticRequirement" class="automatic-selsect-text" >设置取消要求</span></el-col>
            </el-row>
            <el-row class="automatic-selsect-line">
              <el-col :span="24"><el-radio class="radio" v-model="automatic.Requirement" label="1">即使排课要求冲突，也不要取消相关要求，没排完的课手动安排。</el-radio></el-col>
            </el-row>
          </li>
          <li>
            <el-row class="automatic-selsect-line">
              <el-col :span="24"><el-radio class="radio" v-model="automatic.Sameday" label="0">教职工当天的课程尽量安排在一个上午或一个下午完成</el-radio></el-col>
            </el-row>
            <el-row class="automatic-selsect-line">
              <el-col :span="24"><el-radio class="radio" v-model="automatic.Sameday" label="1">教职工当天的课程上午下午均衡安排</el-radio></el-col>
            </el-row>
          </li>
        </ul>
          <el-row class="automatic-selsect-line">
              <el-col :span="24"><el-checkbox class="radio" v-model="automatic.common" label="1">允许同班同课程同一天上午、下午同时安排</el-checkbox></el-col>
          </el-row>
          <el-row class="automatic-selsect-line">
              <el-col :span="24">
                  <el-checkbox v-model="automatic.cancel.cancelClass" label="1">取消班级禁排</el-checkbox>
                  <el-checkbox v-model="automatic.cancel.cancelTeach" label="2">取消教职工禁排</el-checkbox>
                  <el-checkbox v-model="automatic.cancel.cancelField" label="3">取消场地禁排</el-checkbox>
              </el-col>
          </el-row>
          <el-row class="automatic-selsect-btn">
              <el-col :span="24">
                <el-button :loading="loading" type="primary" @click="startpk">开始排课</el-button>
                <el-button :loading='loadingclear1' type="primary" @click="clearsection('1')" >清空课表</el-button>
                <el-button :loading='loadingclear2' type="primary" @click="clearsection('2')" >清空固排</el-button>
              </el-col>
          </el-row>
      </div>



<!--设置取消要求-->
      <el-dialog   :visible.sync="dialogVisible" width="30%"  >
          <div slot="title"  >
                <p style="font-size:16px;" >设置取消条件优先级</p>
            </div>
          <div style=" text-align:left;" class="clear Sectiontime" >
            <el-table
                :data="tableData"
                stripe
                ref='multipleTable'
                max-height="600"
                style="width: 100%">
                <!-- <el-table-column
                  type="selection"
                  width="55">
                </el-table-column> -->
                <el-table-column
                  type="index"
                  label="序号"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="ruleDesc"
                  label="要求">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="100"
                  >
                  <template slot-scope="scope">
                    <el-tooltip :content="'升序'" placement="top">
                      <span class="table-end-caozuo"><img @click="Descendingcation(scope.$index,scope.row,'1')" src="../../../assets/image/automatic-Ascendingation-icon.png"/></span>
                    </el-tooltip>
                    <el-tooltip :content="'降序'" placement="top">
                      <span class="table-end-caozuo"><img @click="Descendingcation(scope.$index,scope.row,'2')" src="../../../assets/image/automatic-Descendingcation-icon.png"/></span>
                    </el-tooltip>
                  </template>
                </el-table-column>
            </el-table>
            <div style="text-align:center; margin-top:10px;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page.pageNo"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="page.count">
              </el-pagination>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
            <el-button   type="primary" @click="timenation('assign')" :loading = 'loadingdesc' >确 定</el-button>
          </div>
        </el-dialog>
    <!--排课过程中取消的取消要求-->
      <el-dialog   :visible.sync="dialogVisiblecancel" width="30%" >
          <div slot="title" class="addclasses-cpm" >
              <img src="../../../assets/image/addstudent2.png" /><p>排课记录</p>
          </div>
          <div style=" text-align:left;" class="clear Sectiontime" >
            <el-card class="box-card">
              <p>排课过程中已取消的设置要求:</p>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button   type="primary" @click="dialogVisiblecancel = false"  >确 定</el-button>
          </div>
        </el-dialog>
    <!--排课停止-->
      <el-dialog   :visible.sync="dialogVisiblestop" width="30%"  >
          <div slot="title"  >
                <p style="font-size:16px;" >排课停止</p>
            </div>
          <div style=" text-align:left;" class="clear Sectiontime" >
            <el-card class="box-card">
              <p class="stop"> 下列班级已安排课时数超过允许的课表可用位置，自动排课无法进行。请<span>减少班级的周课时数</span>或<span>减少禁排位置</span>。</p>
              <el-table
                  :data="tableDatastop"
                  stripe
                  style="width: 100%">
                  <!--<el-table-column
                    type="index"
                    label="序号"
                    width="80">
                  </el-table-column>-->
                  <el-table-column
                    prop="campus"
                    label="校区">
                  </el-table-column>
                  <el-table-column
                    prop="schoolyear"
                    label="学期">
                  </el-table-column>
                  <el-table-column
                    prop="Department"
                    label="院系">
                  </el-table-column>
                  <el-table-column
                    prop="major"
                    label="专业">
                  </el-table-column>
                  <el-table-column
                    prop="classes"
                    label="班级">
                  </el-table-column>
                  <el-table-column
                    prop="arrange"
                    label="已安排">
                  </el-table-column>
                  <el-table-column
                    prop="noarrange"
                    label="未安排">
                  </el-table-column>
              </el-table>
            </el-card>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button   type="primary" @click="dialogVisiblestop = false"  >确 定</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import course from '../../../apis/course.js'
import api from '../../../apis/login.js'
const qs = require('querystring');
export default {
  name: 'classcourse',
  data() {
    return {
      loadingclear1:false,
      loadingclear2:false,
      loading:false,
      loadingdesc:false,
      dialogVisible:false,
      dialogVisiblecancel:false,
      dialogVisiblestop:false,
      scyearvalue:"",   //学年
      treeloading:false,
      ScheduleID:"",    //课表id
      automatic:{
        Requirement:"0",
        Sameday:"0" ,
        common:"",
        cancel:{
          'cancelClass':"",
          'cancelTeach':"",
          'cancelField':"",
        },
      },
      options: [],  
      tableData:[],
      tableDatastop:[
        {
          campus:"东校区",
          schoolyear:"2017",
          Department:"计算机",
          major:"",
          classes:"102",
          arrange:"21",
          noarrange:"12",
        }
      ],
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      multipleSelection:[],
      termId:'',
      classids:[],   //班级id集合
      page:{
        pageNo: 1,
        pageSize: Number,
        count:null,
      },
    }
  },
  components:{

  },
  created(){
    api.queryAllGrade().then(data=>{
      if(data) this.options = data.data.data; this.scyearvalue = data.data.data[0];
      this.getclassList()
    })
  },
  mounted() {
    this.termId = JSON.parse(localStorage.getItem("newSchedule")).termId;
    this.ScheduleID = this.$Cookies.get('sectionid');
  },
  computed: {
    
  },
  methods: {
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.setautomaticRequirement();
    },
    getclassList(){
      this.treeloading = true;
      let data = {'gradeid':this.scyearvalue.id}
      course.classList(data).then(data=>{
        this.treeloading = false;
        if(data) this.data2 = data.data.data;
      })
    },
    //获取班级id
    getcouseList(){
      let classnum = this.$refs.tree.getCheckedNodes();
      this.classids =[] ;
      let _this = this;
      classnum.map(function(item,index){
        if(item.type == "clazz"){
          _this.classids.push(item.id)
        }
      })
      return this.classids
    },
    //开始排课
    startpk(){
      let classids = this.getcouseList();
      console.log(classids)
      this.loading = true;
      let formdata = new FormData()
      formdata.append('classIds',classids);
      formdata.append('classReq',this.automatic.Requirement);
      formdata.append('teachReq',this.automatic.Sameday );
      formdata.append('pid',this.ScheduleID );
      formdata.append('term',this.termId );
      console.log(this.automatic.cancel)
      if(this.automatic.common){
        formdata.append('courseReq', '0');
      }else{ 
        formdata.append('courseReq', '1');
      }
      if(this.automatic.cancel.cancelClass){
        formdata.append('cancelClass','0');
      }else{
        formdata.append('cancelClass','1');
      }
      if(this.automatic.cancel.cancelTeach){
        formdata.append('cancelTeach','0');
      }else{
        formdata.append('cancelTeach','1');
      }
      if(this.automatic.cancel.cancelField){
        formdata.append('cancelField','0');
      }else{
        formdata.append('cancelField','1');
      }
      course.CSstartpk(formdata).then(data=>{
        this.loading = false;
        if(data){
          // this.dialogVisiblecancel = true;
          this.$message({
            showClose: true,
            message: '排课完成',
            type: 'success'
          });
        }
      })
    },
    //清空课表、固排
    clearsection(item){
      let classnum = this.$refs.tree.getCheckedNodes();
      let classids = this.getcouseList(classnum);
      let formdata = new FormData()
      formdata.append('id',this.ScheduleID);
      formdata.append('secList',classids);
      formdata.append('term',this.termId );
      if(item == '1'){
        formdata.append('state','0');
        this.loadingclear1 = true;
        course.CSclearsection(formdata).then(data=>{
          this.loadingclear1 = false;
          if(data){
            this.$message({
              showClose: true,
              message: data.data.meta.message,
              type: 'success',
              duration: "1500"
            });
          }
        })
      }else{
        this.loadingclear2 = true;
        formdata.append('state','1');
        course.CSclearsection(formdata).then(data=>{
          this.loadingclear2 = false;
          if(data){
            this.$message({
              showClose: true,
              message: data.data.meta.message,
              type: 'success',
              duration: "1500"
            });
          }
        })
      }
      
    },
    setautomaticRequirement(){
      this.getcouseList();
      if(this.classids.length == 0){
        this.$message({
          showClose: true,
          message: '请选择排课范围',
          duration:1500,
        });
      }else{
        this.dialogVisible = true;
        let _this = this;
        let u = {
          'scheduleId':this.ScheduleID,
          'ids':this.classids.join(),
          'pageSize':"10",
          'pageNo':this.page.pageNo,
        }
        course.get_sec(qs.stringify(u)).then(r=>{
          if(r){

            this.tableData = r.data.data.list;
            this.page.count = r.data.data.count
            // setTimeout(function() {
            //   _this.selecttable(data.data.data.reverse());
            // }, 0);
          
          }
        })
      }
    },
    selecttable(rows){
      rows.forEach(row => {
        if(row.str5 == '1'){
          this.$refs.multipleTable.toggleRowSelection(row,true);
        }
      });
    },
    timenation(){
      // let ids = this.multipleSelection.map(function(item,index){
      //   return item.id
      // })
      // let formdata =  new FormData()
      // formdata.append('ids',ids);
      // this.loadingdesc = true;
      // course.setcondition(formdata).then(data=>{
      //   if(data){
      //     console.log(data)
      //     this.$message({
      //       showClose: true,
      //       message: data.data.meta.message,
      //       type: 'success'
      //     });
          // this.loadingdesc = false;
          this.dialogVisible = false;
      //   }else{
      //     this.loadingdesc = true;
      //   }
      // })
    },
    // Ascendingation(){

    // },
    // 降序
    Descendingcation(index,row,i){
      let formdata = new FormData()
      formdata.append('startId',row.id);
      formdata.append('startIndex',row.ruleSeq);
      if(i == '1'){
        formdata.append('endId',this.tableData[index-1].id);
        formdata.append('endIndex',this.tableData[index-1].ruleSeq);
      }
      if(i == '2'){
        formdata.append('endId',this.tableData[index+1].id);
        formdata.append('endIndex',this.tableData[index+1].ruleSeq);
      }
      course.CSsetsort(formdata).then(data=>{
        if(data){
          this.$message({
            showClose: true,
            message: data.data.meta.message,
            type: 'success'
          });
          this.setautomaticRequirement();
        }
      })
    },
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
  margin-top:20px;
}
.classcourse-left{
  width:260px;
}
.classcourse-left .el-select{
  width:100%;
  margin:12px 0 24px;
}

.classcourse-right{
  width:745px;
  margin-right:35px;
}
.classcourse-right .text{
  text-align:right;
  margin-bottom:20px;
}
.el-table .info-row {
    background: #c9e5f5;
}
.automatic-selsect li{
  margin-bottom:10px;
  padding-bottom:10px;
  border-bottom:1px solid #d2d2d2;
}
.automatic-selsect-line{
  padding-left:5px;
  height:40px;
  line-height:40px;
}
.automatic-selsect-btn{
  padding-left:5px;
  margin-top:50px;
}
.automatic-selsect-btn .el-button--primary{
  background-color: #208af5;
  border-color: #208af5;
}
.automatic-selsect-text{
  color:#208af5;
  cursor: pointer;
}
.Sectiontime .text {
  font-size: 14px;
}

.Sectiontime .item {
  padding: 10px 0;
}
.Sectiontime .stop span{
  color:red;
}
.Sectiontime .stop{
  margin-bottom:20px;
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
.table-end-caozuo{
  cursor: pointer;
}
</style>
<style>
.classcourse-left .el-tree{
  float: left;
  min-width: 100%;
}
</style>