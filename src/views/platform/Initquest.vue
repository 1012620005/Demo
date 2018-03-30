<template>
    <div class="initQuest">
        <fc-header></fc-header>
        <div class="container">
            <!-- top -->
            <div class="initQuest-title clearfix">
                <h5>发起问卷</h5>
                <div class="back clearfix" @click="returnBtn">
                    <span>返回</span>
                    <i></i>
                </div>
            </div>
            <!-- bottom -->
            <div class="initQuest-content">
                <el-form :model="formq" :rules="rules"  ref="formq" label-width="121px">
                    <el-form-item label="校区：" prop="camp" > 
                        <el-select v-model="formq.camp" placeholder="">
                            <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>                 
                    </el-form-item>
                    <el-form-item label="调查对象：" prop="respond"  > 
                        <el-select v-model="formq.respond" placeholder="" @change="findName">
                            <el-option v-for="item in respondsel.options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>                      
                    </el-form-item>
                    <el-form-item label="结束时间：" prop="endTime"  > 
                        <el-date-picker v-model="formq.endTime" type="datetime" placeholder="">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="问卷调查标题：" prop="remark"   class="remark"> 
                        <el-input id="limit" type="textarea" resize="none" :maxlength="200" v-model="formq.remark" ref="count">
                        </el-input> 
                        <!-- <div v-html="number"></div> -->      
                    </el-form-item>
                    <el-form-item class="limit">
                        <span class="wordlimit">字数限制200字以内</span>
                    </el-form-item>
                    <el-form-item label="调查题型：" > 
                        <ul ref="surveyQu" @click="loadTab" class="surveyQu clearfix">
                            <li active='1' class="act">单选题</li>
                            <li active='2' >多选题</li>
                            <li active='3'>问答题</li>
                        </ul>                  
                    </el-form-item>
                    <!-- 单选题 -->
                    <div class="topic" id="topic">
                        <!-- 单选题 -->
                        <div v-if="active=='1'" >
                            <!-- <el-form :model="formq" :rules="rules" ref="formq" label-width="121px"> -->
                                <div class="sing" v-for="(items,indexs) in formRadio" :key="indexs">
                                    <div class="sing-title clearfix">
                                        <el-form-item :label="indexs+1+'、标题：'"   class="caption"> 
                                            <el-input placeholder="" v-model="formRadio[indexs].title"></el-input>
                                            <img class="del" src="../../assets/img/quest/del.png" @click="delForm('1',indexs,'1')"> 
                                        </el-form-item>
                                    </div>
                                    <div class="sing-options clearfix" v-for="(item,index) in items.cont" :key="index">
                                        <el-form-item :label="zm[index]"   class="option">  
                                            <el-input placeholder="" v-model="formRadio[indexs].cont[index]"></el-input>  
                                            <img class="del" src="../../assets/img/quest/del.png" @click="delForm('1',indexs,'2',index)">
                                        </el-form-item> 
                                        <el-form-item v-if="(index+1==items.cont.length)?true:false" >
                                            <div class="add-option" @click="addOption('1',indexs)">
                                                <i></i>
                                                <span>选项</span>
                                            </div>
                                        </el-form-item>
                                    </div>
                                    <el-form-item v-if="(indexs+1==formRadio.length)?true:false" >
                                        <div class="add-caption clearfix" @click="addCaption('1')">
                                            <i></i>
                                            <span>标题</span>
                                        </div>
                                    </el-form-item>  
                                </div>
                            <!-- </el-form> -->
                        </div>
                        <!-- 多选题 -->
                        <div v-if="active=='2'" >
                            <div class="mult" v-for="(items,indexs) in formMulti" :key="indexs">
                                <div class="sing-title clearfix">
                                    <el-form-item :label="indexs+1+'、标题：'"  class="caption"> 
                                        <el-input placeholder="" v-model="formMulti[indexs].title"></el-input>
                                        <img class="del" src="../../assets/img/quest/del.png" @click="delForm('2',indexs,'1')"> 
                                    </el-form-item>
                                </div>
                                <div class="sing-options clearfix" v-for="(item,index) in items.cont" :key="index">
                                    <el-form-item :label="zm[index]"   class="option">  
                                        <el-input  v-model="formMulti[indexs].cont[index]"></el-input>  
                                        <img class="del" src="../../assets/img/quest/del.png" @click="delForm('2',indexs,'2',index)">
                                    </el-form-item> 
                                    <el-form-item v-if="(index+1==items.cont.length)?true:false" >
                                        <div class="add-option" @click="addOption('2',indexs)">
                                            <i></i>
                                            <span>选项</span>
                                        </div>
                                    </el-form-item>
                                </div>
                                <el-form-item v-if="(indexs+1==formMulti.length)?true:false" >
                                    <div class="add-caption clearfix" @click="addCaption('2')">
                                        <i></i>
                                        <span>标题</span>
                                    </div>
                                </el-form-item>  
                            </div>
                        </div>
                        <!-- 问答题 -->
                        <div v-if="active=='3'" >
                            <div  class="essay" v-for="(item,indexs) in formanswers" :key="indexs">
                                <div class="sing-title clearfix">
                                    <el-form-item :label="indexs+1+'、标题：'"   class="caption"> 
                                        <el-input placeholder="" v-model="formanswers[indexs].biaoti"></el-input> 
                                        <img class="del" src="../../assets/img/quest/del.png" @click="delForm('3',indexs,'1')">     
                                    </el-form-item>
                                </div>
                                <el-form-item v-if="(indexs+1==formanswers.length)?true:false">
                                    <div class="add-caption clearfix" @click="addCaption('3')">
                                        <i></i>
                                        <span>标题</span>
                                    </div>
                                </el-form-item>    
                            </div>
                        </div>
                    </div> 
                    <!-- 提交按钮 -->
                    <el-form-item>
                        <div class="save clearfix">
                            <el-button type="primary" @click="saveForm('formq')" :loading="loading" >提交</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>	
</template>
<script>
import fcHeader from "../common/header.vue";
import DateFns from "date-fns";
import api from "../../apis/platform.js";
export default {
  data() {
    return {
      loading: false,
      zm: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      active: "1",
      // 日期
      // 校区
      campsel: {
        options: [],
        value: ""
      },
      // 调查对象
      respondsel: {
        options: [],
        value: ""
      },
      // 单选题标题
      sings: [{ soption: 1 }],
      // 多选题
      mults: [{ moption: 1 }],
      // 问答题
      sing: 1,
      // 添加标题
      caption: 1,
      // 添加选项
      option: 1,
      // 表单验证
      formq: {
        camp: "",
        respond: "",
        respondName:'',
        endTime: null,
        remark: "",
        caption: "",
        option: ""
      },
      formRadio: [
        {
          title: "",
          cont: [""]
        }
      ],
      formMulti: [
        {
          title: "",
          cont: [""]
        }
      ],
      formanswers: [
        {
          biaoti: ""
        }
      ],
      rules: {
        camp: [{ required: true, message: "请选择校区", trigger: "change" }],
        respond: [{ required: true, message: "请选择调查对象", trigger: "change" }],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          }
        ],
        remark: [{ required: true, message: "请填写问卷调查介绍", trigger: "change" }]
      }
    };
  },
  components: {
    fcHeader
  },
  methods: {
    returnBtn() {
      this.$router.push("/qunamage");
    },
    // 单选题添加标题
    addCaption: function(i) {
      if (i == "1") {
        this.formRadio.push({
          title: "",
          cont: [""]
        });
      }
      if (i == "2") {
        this.formMulti.push({
          title: "",
          cont: [""]
        });
      }
      if (i == "3") {
        this.formanswers.push({
          biaoti: ""
        });
      }
    },
    // 单选题添加选项
    addOption: function(i, indexs) {
      if (i == "1") {
        this.formRadio[indexs].cont.push("");
      }
      if (i == "2") {
        this.formMulti[indexs].cont.push("");
      }
    },
    // 删除标题及选项
    delForm: function(i, indexs, type, index) {
      // 单选题
      if (i == "1") {
        if (type == "1") {
          if(indexs > 0){
            this.formRadio.splice(indexs, 1);
          }
        } else if (type == "2") {
          if(index > 0){
            this.formRadio[indexs].cont.splice(index, 1);
          }
        }
      }
      // 多选题
      if (i == "2") {
        if (type == "1") {
          if(indexs > 0){
            this.formMulti.splice(indexs, 1);
          }
        } else if (type == "2") {
          if(index > 0){
            this.formMulti[indexs].cont.splice(index, 1);
          }
        }
      }
      // 问答题
      if (i == "3") {
        if (type == "1") {
          if(indexs > 0){
            this.formanswers.splice(indexs, 1);
          }
        }
      }
    },
    // tab切换
    loadTab(e) {
      if (e.target.tagName == "UL") return;
      let li = e.target;
      let lis = e.target.parentElement.children;
      for (let i = 0; i < lis.length; i++) {
        lis[i].className = "";
      }
      li.className = "act";
      this.active = e.target.attributes[1].value;
    },
    // 获取校区
    getCampus() {
      api.getCampus().then(r => {
        if (r) {
          this.campsel.options = r.data.data;
        }
      });
    },
    // 获取被调查对象
    getRespond() {
      api.getRespond().then(r => {
        if (r) {
          console.log(r);
          console.log("44444")
          this.respondsel.options = r.data.data;
        }
      });
    },
    // 表单验证
    saveForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          let questions = [];
          let questionsRadio = [];
          let questionsMulti = [];
          let questionsanswers = [];
          let _this = this;
          questionsRadio = this.formRadio.map(function(item, index) {
            let optionAlp = "";
            let questionOption = "";
            for (let i = 0; i < item.cont.length; i++) {
              if (i == 0) {
                optionAlp = _this.zm[i];
                questionOption = item.cont[i];
              } else {
                optionAlp = optionAlp + "," + _this.zm[i];
                questionOption = questionOption + "@#@" + item.cont[i];
              }
            }
            return {
              optionAlp: optionAlp,
              questionOption: questionOption,
              questionTitle: item.title,
              questionType: "1"
            };
          });
          questionsMulti = this.formMulti.map(function(item, index) {
            let optionAlp = "";
            let questionOption = "";
            for (let i = 0; i < item.cont.length; i++) {
              if (i == 0) {
                optionAlp = _this.zm[i];
                questionOption = item.cont[i];
              } else {
                optionAlp = optionAlp + "," + _this.zm[i];
                questionOption = questionOption + "@#@" + item.cont[i];
              }
            }
            return {
              optionAlp: optionAlp,
              questionOption: questionOption,
              questionTitle: item.title,
              questionType: "2"
            };
          });
          questionsanswers = this.formanswers.map(function(item, index) {
            return {
              optionAlp: "",
              questionOption: "",
              questionTitle: item.biaoti,
              questionType: "3"
            };
          });
          questions = questionsRadio
            .concat(questionsMulti)
            .concat(questionsanswers);
          // console.log(this.formq.endTime);
          let data = {
            imformantName: this.formq.respondName,
            endTime: DateFns.format(
              new Date(this.formq.endTime),
              "YYYY-MM-DD HH:mm:ss"
            ),
            surveyTitle: this.formq.remark,
            campusId: this.formq.camp,
            questions: JSON.stringify(questions)
          };
          let qs = require("querystring");
          api.postCreQu(qs.stringify(data)).then(r => {
            this.loading = false;
            if (r) {
              this.$message({
                showClose: true,
                message: '提交成功',
                // message: r.data.meta.message,
                type: "success"
              });
              this.$router.push("/qunamage");
            }
          });
        }
      });
    },
    findName (val) {
      var obj = this.respondsel.options.find(function (obj) {
				     return  obj.value == val ? obj.label : ''
        })
        this.formq.respondName = obj.label
    }
  },
  mounted() {
    // 获取校区
    this.getCampus();
    // 获取被调查对象
    this.getRespond();
    // tab切换
    // this.loadTab();
  }
};
</script>
<style scoped lang="scss">
.container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  // 上
  .initQuest-title {
    height: 50px;
    line-height: 50px;
    background: #fff;
    padding-left: 24px;
    padding-right: 16px;
    border-radius: 5px;
    margin-top: 12px;
    margin-bottom: 16px;
    h5 {
      color: #208af5;
      font-size: 16px;
      border-bottom: 2px solid #208af5;
      float: left;
      font-weight: bold;
    }
    .back {
      float: right;
      cursor: pointer;
      overflow: hidden;
      span {
        float: left;
      }
      i {
        width: 9px;
        height: 15px;
        float: left;
        margin-top: 18px;
        margin-left: 6px;
        background: url("../../assets/img/overtime/arrow-right.png") 0 0
          no-repeat;
      }
    }
  }
  // 下
  .initQuest-content {
    background: #fff;
    border-radius: 5px;
    padding: 30px 16px 0 24px;
    .remark {
      .el-textarea {
        width: 70%;
      }
    }
    .limit{
      position: relative;
      .wordlimit {
        position: absolute;
        bottom: -14px;
        right: 31%;
      }
    }
    .surveyQu {
      li {
        float: left;
        cursor: pointer;
        margin-right: 48px;
      }
      .act {
        background: #208af5;
        border-radius: 5px;
        color: #fff;
        padding: 0 10px;
      }
    }
    .topic {
      .sing {
        position: relative;
        .add-caption {
          position: absolute;
          bottom: 22px;
          left: 66px;
          cursor: pointer;
          i {
            width: 16px;
            height: 16px;
            float: left;
            margin-top: 10px;
            margin-right: 6px;
            background: url("../../assets/img/overtime/add.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }
          span {
            float: left;
            color: #208af5;
          }
        }
      }
      .mult {
        position: relative;
        .add-caption {
          position: absolute;
          bottom: 22px;
          left: 66px;
          cursor: pointer;
          i {
            width: 16px;
            height: 16px;
            float: left;
            margin-top: 10px;
            margin-right: 6px;
            background: url("../../assets/img/overtime/add.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }
          span {
            float: left;
            color: #208af5;
          }
        }
      }
      .del {
        cursor: pointer;
      }
      .el-input {
        width: 70%;
      }
      .add-option {
        float: left;
        cursor: pointer;
        margin-right: 18px;
        i {
          width: 16px;
          height: 16px;
          float: left;
          margin-top: 10px;
          margin-right: 6px;
          background: url("../../assets/img/quest/add.png") 0 0 no-repeat;
          background-size: 100% 100%;
        }
        span {
          float: left;
          color: #e5b80b;
        }
      }
      .hide {
        display: none;
      }
    }
    .essay {
      .el-input {
        width: 70%;
      }
      .add-caption {
        // float: right;
        cursor: pointer;
        i {
          width: 16px;
          height: 16px;
          float: left;
          margin-top: 10px;
          margin-right: 6px;
          background: url("../../assets/img/overtime/add.png") 0 0 no-repeat;
          background-size: 100% 100%;
        }
        span {
          float: left;
          color: #208af5;
        }
      }
    }
    .el-select {
      width: 190px;
    }
    .el-input {
      width: 190px;
    }
    .save {
      width: 70%;
      button {
        float: right;
        margin-bottom: 40px;
      }
    }
  }
}
</style>