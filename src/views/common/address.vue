<!-- 地址选择组件 -->
<template>
  <el-form :model="form" class="demo-ruleForm" :rules="rules" ref="form" label-position="top">
    <el-row :gutter="20" class="address" style="margin-bottom:22px;">
      <el-col :span="7" style="padding-left:0;">
        <el-form-item prop="province">
          <el-select v-model="form.province" placeholder="省" @change="proChange" >
            <el-option
              v-for="item in provinces"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item  prop="city">
          <el-select v-model="form.city" placeholder="市" @change="cityChange" >
            <el-option
              v-for="item in citys"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item  prop="county">
          <el-select v-model="form.county" placeholder="县" @change="countyChange" >
            <el-option
              v-for="item in countys"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
          <el-form-item  prop="detail">
            <el-input
              placeholder="详细地址"
              :number="true"
              v-model="form.detail">
            </el-input>
          </el-form-item>
      </el-col>
    </el-row>    
  </el-form>
</template>
<script>
  import addressData from '../../utils/addressData.js'

  function formatData(data){
    var result = [];
    for(var key in data){
      result.push({
        value: key
      })
    }
    return result
  }

  export default {
    name:'address',
    props:['province','city','county','detail','isAddressTrue'],
    data: function () {
      return {
        ruleForm:{
          province:'',
          city:'',
          county:'',
          detail:''  
        },
        rules:{
          province:[{required:true,message:'请选择省份',trigger:'change'}],
          city:[{required:true,message:'请选择城市',trigger:'change'}],
          county:[{required:true,message:'请选择县',trigger:'change'}],
          detail:[{required:true,message:'请填写详细地址',trigger:'change'}]
        },
        form:{
          province: this.province,
          city: this.city,
          county:this.county,
          detail: this.detail
        },
        provinces: formatData(addressData)
      }
    },
    watch: {
      form: {
        handler:function(){
          store.commit('setRuleForm',this.form);
        },
        deep:true
      },
      ifCheckFrom: function (val,oldVal) {
        if(val){
          this.$refs.form.validate((valid) => {
          }) ;
        }
      }
    },
    computed: {
      citys: function (){
        return formatData(addressData[this.form.province])
      },
      countys: function (){
        return formatData(addressData[this.form.city])
      },
      ifCheckFrom: function () {
        return this.isAddressTrue
      }
    },
    methods: {
      proChange: function (val,oldVal) {
        if(oldVal){
          this.form.city='';
          this.form.county='';
          this.form.detail='';
        }
        var data = formatData(addressData[this.form.province]);
        for(var i =0; i<data.length; i++){
          this.$set(this.citys,i,data[i]);
        }
      },
      cityChange: function (val, oldVal) {
        if(oldVal){
          this.form.county='';
          this.form.detail='';
        }
        var data = formatData(addressData[this.form.city]);
        for(var i =0; i<data.length; i++){
          this.$set(this.countys,i,data[i]);
        }
      },
      countyChange: function (val, oldVal) {
        if (oldVal) {
          this.form.detail = '';
        }
      }
    }
  }
</script>
<style>
</style>
