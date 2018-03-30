<template>
  <div class="navretrieve">
    <el-menu   class="el-menu-demo" mode="horizontal">
      <div class="navlogo">
        <span class="logo"><img src='../assets/image/logo.png'/></span>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navretrieve',
  data () {
    return {
     
    }
  },
  methods: {
       
  }
}
</script>
<style scoped>
.el-menu{
  background-color:#208af5;
}
.navlogo{
  margin:0 auto;
  height:70px;
  width:1200px;
  text-align:center;
  line-height:70px;
  color:#fff;
  font-size:16px;
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
