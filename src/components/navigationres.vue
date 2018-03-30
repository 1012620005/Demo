<template>
  <div class="navigation">
      <div class="navlogo">
        <span class="logo"><img src='../assets/img/connet/tangshan_logo.png'/></span><span class="logouesr">智慧校园</span>
      </div>
  </div>
</template>

<script>
import api from '../apis/login.js'
export default {
  name: 'navigation',
  data () {
    return {
      user:{
        name:"",
      }
    }
  },
  mounted () {
  },
  methods: { 
 }

}
</script>
<style scoped>
.navigation{
  background-color:#3b4966;
}
.navlogo{
  margin:0 auto;
  height:70px;
  width:1200px;
  text-align:left;
  line-height:70px;
  color:#fff;
  font-size:16px;
}
 .logouesr{
 margin-top: 8px;
 margin-left:5px;
display: inline-block;
height: 60px;
font-size: 20px;
font-weight: bold;
 } 
.navlogo img{
  vertical-align: middle;
}
.logo{
  float:left;
}
.logo>img{
  margin-right:6px;
}
</style>
