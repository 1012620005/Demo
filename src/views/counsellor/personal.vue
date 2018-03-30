<template>
  <div class="personal">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >个人信息</span><span class="arrow-right" @click="router">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
         <div class="avatar-uploader">
            <div class="avatar-uploader-size-img">
              <span><img :src="photo" /></span>
              <i  @click="changexinxi"><img src="../../assets/image/change-information.png"/></i>
            </div>
        </div>
        <div class="uesrname"><span>{{user.name}}</span><i><img v-if="user.sex === '2'" src="../../assets/image/sex-nv.png"/><img v-if="user.sex === '1'"  src="../../assets/image/sex-nan.png"/></i></div>
        <div class="personalbox">
          <ul class="personal-item">
            <!-- <li><p class="personal-item-left">校区:</p><span>{{user.scoms}}</span></li> -->
            <li><p class="personal-item-left">手机号:</p> <span>{{user.mobile}}</span></li>
            <li><p class="personal-item-left">身份证号:</p><span>{{user.idcard}}</span></li>
            <li><p class="personal-item-left">工号:</p><span>{{user.no}}</span></li>
            <li><p class="personal-item-left">电子邮箱:</p><span>{{user.email}}</span></li>
            <li><p class="personal-item-left">个人学历:</p><span>{{user.educationname}}</span></li>
            <li class="personal-item-status clear">
              <p class="personal-item-left left">在校身份:</p>
              <div  class="personal-item-left-status left">
                <ol  class="clear roles" >
                  <li v-for="(r,index) in role" :key="index" >{{r.name}}</li>           
                </ol>
                
                <div v-if="clazz !== ''"  class="classes-table left">
                  <li style="text-align:left" v-if="clazz !== ''">班级信息:</li>
                  <el-table
                    :data="clazz"
                    border
                    style="width: 100%">
                    <el-table-column
                      type="index"
                      label="序号"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      prop="gradename"
                      label="年级"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="proname"
                      label="专业"
                     >
                    </el-table-column>
                    <el-table-column
                      prop="clazzname"
                      label="班级"
                      >
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </li>
            <li><p class="personal-item-left ">劳动合同:</p>
            <div>
              <span class="left compact-img" v-for="(t,index) in fileList" :key="index" >
                <img :src="t.url"/>
              </span>
              </div>
              </li>
            
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import navTop from "../common/header";
import Router from 'vue-router'
import userApi from '../../apis/userCenter.js'
export default {
  name: 'personal',
  data() {
    return {
      tableData: [
      ],
      user: {name: ''},
      clazz: '',  //班级
      course: '', //学科
      role: '', //身份  
      photo:'',
      fileList:[]
    }
  },
  components:{
    navTop
  },
  created(){
  },
  mounted() {
    this.viewUser();
    
  },
  computed: {
    
  },
  methods: {
    router(url){
      this.$router.go(-1);
    },
    changexinxi(){
      this.$router.push('/counsellor/changepersonals')
    },
    findFileByEntityAndBid(id) {
      let params = {bid:id, entity:"User"}
      userApi.findFileByEntityAndBid(params).then(r=>{
        let data = r.data.data;
        let ldht = data.ldht;
        if (ldht) {
          for (let i = 0; i < ldht.length; i ++) {
            userApi.getFileDownloadUrl(ldht[i].id).then(r=>{
              this.fileList.push({url:r, name:ldht[i].oldname, id:ldht[i].id});
            })
          }
        }
      });
    }, 
    viewUser() {
       userApi.viewUser().then(response => {
          console.log("调用获取用户信息接口")
          console.log(response.data.data);
          this.user = response.data.data;
          this.findFileByEntityAndBid(this.user.id);
          if (this.user.role) {
            this.role = this.user.role;
          }
          if (this.user.clazz) {
            this.clazz = this.user.clazz;
          }
          if (this.user.course) {
            this.course = this.user.course;
          }
          this.photo = userApi.getCommonShowUrl(this.user.photo);
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
.personal{
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
.avatar-uploader-size-img{
  display:inline-block;
  margin-bottom:26px;
  position:relative;
}
.avatar-uploader-size-img span{
  display:inline-block;
  height:80px;
}
.avatar-uploader-size-img i{
  margin-left:12px;
  cursor:pointer;
  position:absolute;
  left: 80px;
  top: 60px;
}
.avatar-uploader-size-img span img{
  width:80px;
  height:80px;
  border-radius:50%;
}   
.uesrname{
  position:relative;
}
.uesrname span{
  font-size:14px;
  color:#262626;
} 
.uesrname i{
  margin-left:32px;
  position:absolute;
}
.personalbox{
  width:275px;
  margin:20px auto 0;
  padding-left: 95px
}
.personal-item{
  width:500px;
}
.personal-item li{
  text-align:left;
  margin-bottom:22px;
  font-size:14px;
  color:#333;
}
.personal-item-change{
  color:#218ffe;
  text-decoration: underline;
  float:right;
  width:300px;
  cursor:pointer;
}
.personal-item-left{
  display:inline-block;
  width:60px;
  text-align:right;
  margin-right:10px;
}
.personal-item-left-status{
  width: 85%;
}
.classes-table{
  position: relative;
  left: -320px;
  width: 750px;
  margin-bottom: 10px;
}
.compact-img img{
  width:140px;
  height:155px;
  margin: 0 5px 0 0;
}
.roles li{
  float: left;
  width:33%;
}
</style>
