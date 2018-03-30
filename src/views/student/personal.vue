<template>
  <div class="personal">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >个人信息</span><span @click="back" class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="magessBox clear">
         <div class="avatar-uploader">
            <div class="avatar-uploader-size-img">
              <span><img :src="fileid"/></span>
              <i @click="xiugaixinxi"><img src="../../assets/image/change-information.png"/></i>
            </div>
        </div>
        <div class="uesrname"><span>{{dataper.name}}</span><i><img v-if="dataper.sexname == '女'" src="../../assets/image/sex-nv.png"/> <img v-if="(dataper.sexname == '男')" src="../../assets/image/sex-nan.png"/></i></div>
        <div class="personalbox">
          <ul class="personal-item">
            <li>身份证号：<span>{{dataper.idcard}}</span></li>
            <li>性别：<span>{{dataper.sexname}}</span></li>
            <li>出生年月：<span>{{ dataper.birthday }}</span></li>
            <!-- <li>邮箱：<span>{{dataper.email}}</span></li> -->
            <li>政治面貌：<span>{{dataper.politicalStatusname}}</span></li>
            <li>所属派出所：<span>{{dataper.pcs}}</span></li>
            <li>户籍性质：<span>{{dataper.hk	}}</span></li>
            <li>邮编：<span>{{dataper.zipcode}}</span></li>
            <li>父亲姓名：<span>{{dataper.father}}</span></li>
            <li>母亲姓名：<span>{{}}</span></li>
            <li>父亲电话：<span>{{dataper.fatherPhone}}</span></li>
            <li>母亲电话：<span>{{}}</span></li>
            <li>是否建档立卡贫困户：<span>{{dataper.ispoor}}</span></li>
            <li>现家庭详细地址：<span>{{dataper.provincename+dataper.cityname+dataper.countyname+dataper.address}}</span></li>
            <li>民族：<span>{{dataper.nationname}}</span></li>


            <li>专业：<span>{{dataper.pro}}</span></li>
            <li>行政班：<span>{{dataper.xzbid}}</span></li>
            <li>教学班：<span>{{dataper.sourcename}}</span></li>
            <li>学制：<span>{{dataper.xz}}</span></li>
            <li>初中毕业学校：<span>{{dataper.graduation}}</span></li>
            <li>就读方式：<span>{{dataper.jdtype}}</span></li>
            <li>入学学期：<span>{{dataper.xq}}</span></li>
            <li>报名日期：<span>{{dataper.bmrq}}</span></li>
            <li>入学学年：<span>{{dataper.year}}</span></li>
            <li>学习形式：<span>{{dataper.studytype}}</span></li>
            <li>学费票号：<span>{{dataper.xfph}}</span></li>
            <li>书费票号：<span>{{dataper.sfph}}</span></li>
            <li>书费金额：<span>{{dataper.sfje}}</span></li>
            <li>金额350住宿费票号：<span>{{dataper.zsf350ph}}</span></li>
            <li>金额175住宿费票号：<span>{{dataper.zsf175ph}}</span></li>
            <li>企业培训费票号：<span>{{dataper.qypxph}}</span></li>




            <li>学生来源：<span>{{dataper.sxly}}</span></li>
            <li>生源地：<span>{{dataper.source}}</span></li>
            <li>户口所在地县级以下详细地址：<span>{{dataper.hkszd}}</span></li>
            <li>招生季节：<span>{{dataper.zsjj}}</span></li>
            <li>招生来源：<span>{{dataper.zsly}}</span></li>
            <li>招生区域：<span>{{dataper.zsqy}}</span></li>
            <li>初中毕业证：<span>{{dataper.sourcename}}</span></li>
            <li>广告媒体名称：<span>{{dataper.ggmtmc}}</span></li>
            <li>专业意向来源：<span>{{dataper.zyyxly}}</span></li>
            <li>招生组：<span>{{dataper.zsz}}</span></li>
            <li>招生人员：<span>{{dataper.zsry}}</span></li>
            <li>中考成绩：<span>{{dataper.score}}</span></li>
            <li>乘火车区间：<span>{{dataper.train}}</span></li>



            <!-- <li>生源地：<span>{{dataper.sourcename}}</span></li>
            <li>民族：<span>{{dataper.nationname}}</span></li>
            <li>政治面貌：<span>{{dataper.politicalStatusname}}</span></li>
            <li>院系：<span>{{dataper.dept}}</span></li>
            <li >专业：<span>{{dataper.pro}}</span><i class="personal-item-change"><router-link to="/classCenter/stumajors">申请更换</router-link></i></li>
            <li>辅导员：<span>{{dataper.tea}}</span></li>
            <li >宿舍：<span>{{dataper.dor}}</span><i class="personal-item-change"><router-link to="/replaceDorm">申请更换</router-link></i></li>
            <li>家庭住址：<span>{{dataper.provincename+dataper.cityname+dataper.countyname+dataper.address}}</span></li> -->
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import navTop from "../common/header";
// import api from '../../apis/student.js'
import api from '../../apis/login.js'
import down from '../../apis/down.js'
import userApi from '../../apis/userCenter.js'
export default {
  name: 'personal',
  data() {
    return {
      dataper:'',
      fileid:""
    }
  },
  components:{
    navTop
  },
  filters: {  
    filterFun: function (value) {  
      if(value == null){
        return value
      }else{
        return  value.substring(0,4)+'年'+value.substring(4,6)+'月'+value.substring(6)+'日'
      }
    }  
  },
  created(){
    api.getselfuser().then(data=>{
        this.dataper = data.data.data;
    })
  },
  mounted() {

  },
  computed: {
    
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    xiugaixinxi(){
      this.$router.push('/student/changepersonal')
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
.avatar-uploader-size-img span{
  display:inline-block;
  height:80px;
}
.avatar-uploader-size-img i{
  margin-left:12px;
  cursor:pointer;
}
.avatar-uploader-size-img span img{
  width:80px;
  height:80px;
  border-radius:50%;
}   
.uesrname span{
  padding-right: 40px;
  font-size:14px;
  color:#262626;
} 
.uesrname i{
  padding-right:40px;
  margin-left:20px;
}
.personalbox{
  width: 330px;
  margin:20px auto 0;
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
  cursor:pointer;
}
</style>
