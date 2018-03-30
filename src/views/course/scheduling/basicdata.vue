<template>
  <div class="basicdata">
    <div v-if="flag" >
     <p> 请确认教学场地是否已添加，未添加将不能进行排课操作。</p>
     <p>1、已添加可点击 <span @click="flag=false" class="nextbtn">下一步</span>  继续操作 </p>
     <p> 2、未添加或查看修改可点击  <span class="nextbtn"><router-link :to="{path:'/course/site/siteindex'}">场地设置</router-link></span> 设置教学场地 </p>
    </div>
    <div v-if="!flag">
     <p> 请确认教职工和班级均已添加授课，未添加将不能进行排课操作。</p>
     <p>1、已添加可点击 <span @click="nextbtn" class="nextbtn">下一步</span>  继续操作 </p>
     <p> 2、未添加或查看修改可点击  <span class="nextbtn"><router-link :to="{path:'/course/Lecture/Classteaching'}">授课管理</router-link></span> 设置班级授课 </p>
    </div >
  </div>
</template>

<script>
export default {
  name: 'basicdata',
  data() {
    return {
      flag:true,
    } 
  },
  components:{
  },
  created(){
  },
  mounted() {

  },
  computed: {
    
  },
  methods: {
     nextbtn(){
       this.$emit('increment',2)
     }
  },
  directives:{
        
  },
  watch:{
    
  }
     
}

</script>
<style scoped>
.basicdata{
  height:100%;
  text-align: left;
  color:#000;
  
}
.basicdata div{
  width:406px;
  margin: 100px auto;
}
.basicdata p{
  font-size:14px;
  line-height:24px;
}
.basicdata .nextbtn{
  color:#208af5;
  text-decoration:underline ;
  cursor: pointer;
}
</style>
<style>
</style>