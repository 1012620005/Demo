<template>
  <div class="accountsetings">
      <nav-top></nav-top>
      <p class="log-magess"><span class="arrow-center left" >账号设置</span><span class="arrow-right">返回<i class="el-icon-arrow-right"></i></span></p>
      <div class="authentication-box">
          <p><img src="../../assets/image/authentication.png"/></p>
          <div class="accountsetings-box1">
            <ul class="accountsetings-box1-ul">
              <li><p>身份证号</p><i>{{dataper.idcard}}</i></li>
              <li><p><span class="left">手</span>机<span class="right">号</span></p><i>{{dataper.mobile}}</i><button class="btn-save right"><span @click="setphone">修改</span></button></li>
              <li><p><span class="left">邮</span>&nbsp;<span class="right">箱</span></p><i>{{dataper.mobile}}</i><button class="btn-save right"><span @click="setemail">修改</span></button></li>
              
            </ul>
          </div>
          <p  class="accountsetings-box2-title">账号安全</p>
          <div class="accountsetings-box2">
            <ul class="accountsetings-box2-ul">
              <li><p><span class="left">密</span>&nbsp;<span class="right">码</span></p><i>xxxxxxxxxxxxx</i><button class="btn-save right"><span @click="setpassword">修改</span></button></li>
            </ul>
          </div>


      </div>
  </div>
</template>

<script>
import navTop from '../../components/navigation'
import apis from '../../apis/student.js'
export default {
  name: 'accountsetings',
  data() {
    return {
     dataper:'',

    }
  },
  components:{
    navTop
  },
  created(){
    let data={
          userid:''
        }
    apis.querypersonal(data).then(data=>{
        this.dataper = data.data.data
    })
  },
  mounted() {
  },
  computed: {
    
  },
  methods: {
    setphone(){
      this.$router.push('/student/setphone')
    },
    setemail(){
      this.$router.push('/student/setemail')
    },
    setpassword(){
      this.$router.push('/student/setpassword')
    },
  },
  directives:{
        
  },
  watch:{
    
  }
     
}

</script>
<style scoped>
.accountsetings{
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
.authentication-box{
  width:1200px;
  margin:0 auto 80px;
  padding-top:20px;
  padding-bottom:260px;
  background-color:#fff;
  text-align: center;
}
.authentication-box .accountsetings-box2-title{
  margin-bottom:20px;
  color:#333;
  font-weight: 600;
}
.accountsetings-box1{
  width:1100px;
  margin:0 auto 28px;
  padding-bottom:42px;
  border-bottom:1px solid #d2d2d2;
}
.accountsetings-box1-ul li, .accountsetings-box2-ul li{
  margin:0 auto;
  padding: 8px 0;
  width:480px;
  height:46px;
  line-height:46px;
  text-align:left;
}
.accountsetings-box1-ul li p, .accountsetings-box2-ul li p{
  display:inline-block;
  text-align:center;
  width:60px;
}
.accountsetings-box1-ul li i, .accountsetings-box2-ul li i{
  margin-left:10px;
}
.btn-save{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #208af5;
    border: 1px solid #208af5;
    color: #fff;
    padding: 15px 34px;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    outline: 0;
    text-align: center;
}

</style>
