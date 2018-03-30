<template>
  
    <div class="setsitename" >
      <div class="setsite-box-top">
        <span @click="createsitename" class="add-button"><img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加场地名称</i></span>
      </div>
      <ul class="clear">
        <li v-for="(o, index) in namelist" :key="o.id" class="left setsite-name-foter">
          <el-tooltip class="item"   placement="bottom" effect="light" >
            <el-card :body-style="{ padding:'5px' }">
              <img src="../../../assets/image/site-name-icon.png" class="image">
              <div style="padding: 5px;">
                <ol class="setsite-name-foter-ol">
                  <li><span>{{o.siteName}}</span></li>
                  <li><span>{{o.fieldName}}</span></li>
                  <!-- <li><span>{{o.campus}}</span></li> -->
                  <li><span>楼层数：{{o.floorNum}}</span></li>
                  <li><span>容纳人数：{{o.sumGalleryful}}</span></li>
                  <li>
                    <img  @click="creatroom(o.siteNameId)" src="../../../assets/image/chuang-room-icon.png" >
                  </li>
                </ol>
              </div>
            </el-card>
            <div slot="content" class="site-collapse-footer">
              <img @click="changeroom(o)" src="../../../assets/image/xiugai.png"/><img @click="deleteroom(o.siteNameId)" src="../../../assets/image/delete-icon.png"/>
            </div>
          </el-tooltip>  
        </li>
        <div v-if="namelist.length > 0 ? false :true">
          <div class="el-table__empty-block" ><span class="el-table__empty-text">暂无数据</span></div>
        </div>
      </ul>
      
      <!--创建场地名称-->
      <el-dialog   :visible.sync="dialogcreatesites" width="30%" >
        <div slot="title"  >
                <p style="font-size:16px;text-align:left;" >{{optiontext}}场地名称</p>
            </div>
        <div style="max-width:320px; text-align:left;">
          <el-form :model="form"  :label-position="labelPosition" :rules="rules" label-width="85px"  ref='form'>
              <!-- <el-form-item  label="校区:" prop="campus">
                <el-select @change="querytype" v-model="form.campus" value-key="id"  placeholder="">
                  <el-option
                    v-for="item in form2.getcampus"
                    :key="item.id"
                    :label="item.name"
                    :value="item">
                  </el-option>
                </el-select> 
              </el-form-item> -->
              <el-form-item  label="场地类型:" prop="type" >
                <el-select v-model="form.type" value-key="fieldTypeId"  placeholder="">
                  <el-option
                    v-for="item in form2.type"
                    :key="item.fieldTypeId"
                    :label="item.fieldName"
                    :value="item">
                  </el-option>
                </el-select> 
              </el-form-item>
              <el-form-item  label="场地名称:" prop="name" >
                <el-input v-model="form.name"   placeholder="">
                </el-input>
              </el-form-item>
              <el-form-item  label="楼层数:" prop="floor">
                <el-select v-model="form.floor"  placeholder="">
                  <el-option
                    v-for="item in 50"
                    :key="item"
                    :label="item+'层'"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogcreatesites = false">取 消</el-button>
          <el-button   type="primary" @click="assignation('form')" :loading = 'loading' >确 定</el-button>
        </div>
      </el-dialog>
</div>
</template>

<script>
import navTop from "../../common/header";
import course from '../../../apis/course.js'
import api from '../../../apis/login.js'
export default {
  name: 'setsite',
  data() {
    return {
      loading:false,
      dialogcreatesites:false,
      labelPosition:'right',
      namelist:[],
      form:{
        campus:{},
        type:{},
        name:"",
        floor:""
      },
      form2:{
        // getcampus:'',
        type:'',
        name:"",
        floor:""
      },
      roomid:"",
      optiontext:"",
      rules: {
        // campus: [
        //   {type: 'object', required: true, message: '请选择校区', trigger: 'change' },
        // ],
        type: [
          {type: 'object', required: true, message: '请选择类型', trigger: 'change' },
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        floor: [
          {type: 'number', required: true, message: '请选择层高', trigger: 'change' },
        ],
      },
      type_flag:false,
    }
  },
  components:{
    navTop
  },
  created(){
    // let parms = { id:1,type:4}
    // api.querycampus(parms).then(data=>{                //查询校区
    //   if(data){
    //     this.form2.getcampus = data.data.data
    //   }
    // })
    this.querytype()
  },
  mounted() {
    this.getsitename()
  },
  computed: {
    
  },
  methods: {
    creatroom(id){
      console.log(id)
      this.$router.push({path:'/course/site/room',query:{'id':id}})
    },
    getsitename(){
      //获取场地名称
      course.STgetnamelist().then(data=>{
        if(data) this.namelist = data.data.data;
      })
    },
    //通过校区查询教学类型
    querytype(){
      course.STtypelist().then(data=>{
        if(data){
          this.form2.type = data.data.data;
          }; 
      })
    },
    //修改名称
    changeroom(o){
      this.type_flag = true
      this.form.campus={};
      this.roomid = o.siteNameId;
      this.form.campus.name = o.campus;
      this.form.campus.id=o.campusId;
      this.form.type = {'fieldName': o.fieldName,'fieldTypeId':o.fieldTypeId}
      this.form.name =o.siteName;
      this.form.floor = Number(o.floorNum);
      this.optiontext = '修改'
      this.dialogcreatesites = true;
    },
    assignation(formName){
      this.$refs[formName].validate((valid) =>{
        if (valid) {
          this.loading = true;
          let formdata = new FormData();
          // formdata.append('campusId',this.form.campus.id);
          // formdata.append('campus',this.form.campus.name);
          formdata.append('fieldTypeId',this.form.type.fieldTypeId);
          formdata.append('siteName',this.form.name );
          formdata.append('floorNum',this.form.floor);
          if(this.optiontext == '创建'){
            course.STnewsitename(formdata).then(data=>{
              this.loading = false;
              if(data){
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: 'success'
                });
                this.getsitename();
                this.$refs[formName].resetFields();
                this.dialogcreatesites = false;
              }
            })
          }else{
            formdata.append('siteNameId',this.roomid);
            course.STchangeroomname(formdata).then(data=>{
              this.loading = false;
              console.log(data)
              if(data){
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: 'success'
                });
                this.getsitename();
                this.$refs.form.resetFields();
                this.dialogcreatesites = false;
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    deleteroom(id){
      this.$confirm('确认删除?', '提示', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            // instance.confirmButtonText = '执行中...';
            course.STdeleteroom({'siteNameId':id}).then(data=>{
              instance.confirmButtonLoading = false;
              if(data){
                done();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
                  type: 'success'
                });
                this.getsitename();
             }
          })
        } else {
          done();
        }
        }
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });        
      });
    },
    createsitename(){
      this.form.campus = {};
      this.form.type = {};
      this.form.name ='';
      this.form.floor = null;
      this.optiontext = '创建'
      this.dialogcreatesites = true;
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
.setsite-box-top{
  height:50px;
  font-size:14px;
  color:#333;
  text-align:left;
  line-height:50px;
}
.setsite-box-top img{
   vertical-align: middle;
   cursor:pointer;
   margin-left: 10px;
}
.setsitename .setsite-name-foter{
  width:23%;
  margin:1% 10px;
  text-align: center;
}
.setsitename .setsite-name-foter-ol li{
  height:28px;
}
.setsitename .setsite-name-foter-ol li:nth-child(1){
  font-size:16px;
  color:#000;
}
.setsitename .setsite-name-foter-ol li:nth-child(5) img{
  cursor:pointer;
}
.site-collapse-footer{
  width:100px;
  text-align:center;
  height:16px;
}
.site-collapse-footer img{
  margin:0 10px;
  cursor:pointer;
  vertical-align: middle;
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