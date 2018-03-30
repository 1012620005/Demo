<template>
  <div class="stustatmage">
    <fc-header></fc-header>
    <div class="container">
      <!-- 上 -->
      <div class="stustatmage-title clearfix">
          <h5 class="stustatmage-title-lt">学籍管理</h5>
          <div class="back clearfix" @click="returnBtn">
              <span>返回</span>
              <i></i>
          </div>
      </div>
      <!-- 下 -->
      <div class="stustatmage-content">
        <!-- 筛查条件及添加 -->
        <div class="stmage-title clearfix">
            <div class="schl add clearfix" @click="postStuadmitAdd">
                <i></i>
                <span>添加</span>
            </div>
            <el-upload class="upload-demo schl import clearfix"
                :action="importUrl" :auto-upload="true" :on-success="handleAvatarSuccess" :data="fileData"
                :show-file-list="false" accept=".xlx,.xls,.xlsx" name="filePath">
                <i></i>
                <span>导入</span>
            </el-upload>
            <a :href="exportUrl" class="schl export clearfix">
                <i></i>
                <span>导出</span>
            </a>
            <a :href="downLoadUrl" class="schl download clearfix">
                <i></i>
                <span>下载模板</span>
            </a>
            <div class="schl">
                <label>专业类</label>
                <el-select v-model="classifysel.value" clearable @change="getStustaList">
                    <el-option v-for="item in classifysel.options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="schl">
                <label>专业</label>
                <el-select v-model="majorsel.value" clearable @change="getStustaList">
                    <el-option v-for="item in majorsel.options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="schl">
                <label>年级</label>
                <el-select v-model="gradesel.value" clearable @change="getClass">
                    <el-option v-for="item in gradesel.options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="schl">
                <label>班级</label>
                <el-select v-model="classsel.value" clearable @change="getStustaList">
                    <el-option v-for="item in classsel.options" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!--添加学籍弹框 -->
        <el-dialog title="添加学生学籍" :visible.sync="dialogFormVisible">
            <div class="tabs">
                <ul class="stuadTab">
                    <div ref="stuadTab" @click="stuadTab" class="clearfix">
                        <li data-active="1" class="tabs-items-item">基础信息</li>
                        <li data-active="2">家庭住址</li>
                        <li data-active="3">入学信息</li>
                        <li data-active="4">家庭成员</li>
                    </div>
                </ul>
            </div>
            <!-- tab内容 -->
            <div class="tabCon">
                <!-- 基础信息 -->
                <div class="basinfo" v-if="active == '1'">
                    <el-form ref="form" :rules="rules" :model="form" :label-width="formLabelWidth">
                        <el-form-item label="姓名：">
                            <span>{{form.name}}</span>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <span>{{form.sex}}</span>
                        </el-form-item>
                        <el-form-item label="出生日期：">
                            <span>{{form.birth}}</span>
                        </el-form-item> 
                        <el-form-item label="专业类：">
                            <span>{{form.classify}}</span>
                        </el-form-item> 
                        <el-form-item label="专业：">
                            <span>{{form.major}}</span>
                        </el-form-item> 
                        <el-form-item label="年级：">
                            <span>{{form.grade}}</span>
                        </el-form-item> 
                        <el-form-item label="班级：">
                            <span>{{form.class}}</span>
                        </el-form-item> 
                        <el-form-item label="身份证类型：">
                            <span>{{form.idtype}}</span>
                        </el-form-item>
                        <el-form-item label="身份证号：">
                            <span>{{form.idnum}}</span>
                        </el-form-item> 
                        <el-form-item label="行政班：">
                            <span>{{form.admclass}}</span>
                        </el-form-item> 
                        <el-form-item label="教学班：">
                            <span>{{form.teaclass}}</span>
                        </el-form-item> 
                        <el-form-item label="学号：">
                            <span>{{form.stuid}}</span>
                        </el-form-item>
                        <el-form-item label="学生类别：" prop="stuclass">
                            <el-select v-model="form.stuclass" clearable placeholder="">
                                <el-option v-for="item in stuclasel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="学习形式：">
                            <span>{{form.lernform}}</span>
                        </el-form-item>
                        <el-form-item label="入学方式：" prop="entway">
                            <el-select v-model="form.entway" clearable placeholder="">
                                <el-option v-for="item in entwaysel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="就读方式：">
                            <span>{{form.studway}}</span>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align:center;">
                        <el-button type="primary" @click="next(1,'form')">下一步</el-button>
                    </div>
                </div>
                <!-- 家庭住址 -->
                <div class="homeadress" v-if="active == '2'">
                    <el-form ref="form" :rules="rules" :model="form" label-width="208px">
                        <el-form-item label="国际/地区：" prop="inregion">
                            <el-select v-model="form.inregion" clearable placeholder="" @change="changeValue">
                                <el-option v-for="item in inregionsel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="港澳台侨外：" prop="overseas">
                            <el-select v-model="form.overseas" clearable placeholder="">
                                <el-option v-for="item in overseassel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="婚姻状况：" prop="mstatus">
                            <el-select v-model="form.mstatus" clearable placeholder="">
                                <el-option v-for="item in mstatussel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>  
                        <el-form-item label="乘车区间：">
                            <span>{{form.drange}}</span>
                        </el-form-item> 
                        <el-form-item label="是否随迁子女：">
                            <el-select v-model="form.achild" clearable placeholder="">
                                <el-option v-for="item in achildsel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="生源地行政区划码：">
                            <el-input v-model="form.socode"></el-input>
                        </el-form-item> 
                        <el-form-item label="出生地行政区划码：">
                            <el-input v-model="form.birplace"></el-input>
                        </el-form-item> 
                        <el-form-item label="籍贯地行政区划码：">
                            <el-input v-model="form.natcode"></el-input>
                        </el-form-item>
                        <el-form-item label="户口所在地区县以下详细地址：">
                            <span>{{form.address}}</span>
                        </el-form-item> 
                        <el-form-item label="所属派出所：">
                            <span>{{form.substation}}</span>
                        </el-form-item> 
                        <el-form-item label="户口所在地行政区划码：" prop="regcode" >
                            <el-input v-model="form.regcode"></el-input>
                        </el-form-item> 
                        <el-form-item label="户口性质：">
                            <span>{{form.acnature}}</span>
                        </el-form-item>
                        <el-form-item label="学生居住类型：" prop="sturestype">
                            <el-select v-model="form.sturestype" clearable placeholder="">
                                <el-option v-for="item in sturestypesel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align:center;">
                        <el-button type="primary" @click="next(2,'form')">下一步</el-button>
                    </div>
                </div>
                <!-- 入学信息 -->
                <div class="adminfo" v-if="active == '3'">
                    <el-form ref="form" :rules="rules" :model="form" label-width="152px">
                        <el-form-item label="入学年月：">
                            <span>{{form.schyear}}</span>
                        </el-form-item>
                        <el-form-item label="专业简称：" prop="proabb">
                            <el-input v-model="form.proabb"></el-input>
                        </el-form-item>
                        <el-form-item label="学制：">
                            <span>{{form.edusystme}}</span>
                        </el-form-item> 
                        <el-form-item label="民族：">
                            <span>{{form.nation}}</span>
                        </el-form-item> 
                        <el-form-item label="政治面貌：">
                            <span>{{form.polandscape}}</span>
                        </el-form-item> 
                        <el-form-item label="健康状况：" prop="health">
                            <el-select v-model="form.health" clearable placeholder="">
                                <el-option v-for="item in healthsel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="学生来源：">
                            <span>{{form.stusour}}</span>
                        </el-form-item> 
                        <el-form-item label="招生对象：" prop="entarget">
                            <el-select v-model="form.entarget" clearable placeholder="">
                                <el-option v-for="item in entargetsel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系电话：" prop="tel">
                            <el-input v-model="form.tel"></el-input>    
                        </el-form-item> 
                        <el-form-item label="是否建档立卡贫困户：">
                            <span>{{form.conpoor}}</span>
                        </el-form-item> 
                        <el-form-item label="招生方式：">
                            <span>{{form.admway}}</span>
                        </el-form-item> 
                        <el-form-item label="联招合作类型：" prop="collatype">
                            <el-select v-model="form.collatype" clearable placeholder="">
                                <el-option v-for="item in collatypesel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="初中毕业证：" prop="junsch">
                            <el-select v-model="form.junsch" clearable placeholder="">
                                <el-option v-for="item in junschsel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="初中毕业学校：">
                            <span>{{form.juschool}}</span>
                        </el-form-item>
                        <el-form-item label="考试总分：">
                            <el-input v-model="form.testscores"></el-input>
                        </el-form-item>
                        <el-form-item label="考生号：">
                            <el-input v-model="form.cannumber"></el-input>
                        </el-form-item>
                        <el-form-item label="准考证号：">
                            <el-input v-model="form.exregnum"></el-input>
                        </el-form-item>
                        <el-form-item label="联招合作办学形式：">
                            <el-select v-model="form.cfcoeducat" clearable placeholder="">
                                <el-option v-for="item in cfcoeducatsel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联招合作学校代码：">
                            <el-input v-model="form.coshcode"></el-input>
                        </el-form-item>
                        <el-form-item label="校外教学点：">
                            <el-input v-model="form.exteapoint"></el-input>
                        </el-form-item>
                        <el-form-item label="分段培养方式：" prop="trainway">
                            <el-select v-model="form.trainway" clearable placeholder="">
                                <el-option v-for="item in trainwaysel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align:center;">
                        <el-button type="primary" @click="next(3,'form')">下一步</el-button>
                    </div>
                </div>
                <!-- 家庭成员 -->
                <div class="fammem" v-if="active == '4'">
                    <el-form ref="form" :rules="rules" :model="form" label-width="183px">
                        <el-form-item label="电子信箱/其他联系方式：" >
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item label="英文名字：">
                            <el-input v-model="form.enname"></el-input>
                        </el-form-item>
                        <el-form-item label="家庭现地址：">
                            <el-input v-model="form.curaddress"></el-input>
                        </el-form-item> 
                        <el-form-item label="家庭邮政编码：">
                            <el-input v-model="form.famzipcode"></el-input>
                        </el-form-item> 
                        <el-form-item label="家庭电话：">
                            <el-input v-model="form.famtel"></el-input>
                        </el-form-item> 
                        <el-form-item label="成员1姓名：">
                            <el-input v-model="form.memonename"></el-input>
                        </el-form-item> 
                        <el-form-item label="成员1关系：">
                            <el-select v-model="form.memonerelat" clearable placeholder="">
                                <el-option v-for="item in memonerelatsel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="成员1是否监护人：">
                            <el-select v-model="form.memoneguar" clearable placeholder="">
                                <el-option v-for="item in memoneguarsel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="成员1联系电话：">
                            <el-input v-model="form.memonetel"></el-input>
                        </el-form-item> 
                        <el-form-item label="成员1出生年月：">
                            <el-date-picker v-model="form.memonebirth" type="datetime" placeholder="选择出生年月">
                            </el-date-picker>
                        </el-form-item> 
                        <el-form-item label="成员1身份证类型：">
                            <el-select v-model="form.memoneidtype" clearable placeholder="">
                                <el-option v-for="item in memoneidtypesel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="成员1身份证号：">
                            <el-input v-model="form.memoneidnum"></el-input>
                        </el-form-item>
                        <el-form-item label="成员1民族：">
                            <el-select v-model="form.memoneidnat" clearable placeholder="">
                                <el-option v-for="item in memoneidnatsel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="成员1政治面貌：">
                            <el-select v-model="form.memonepol" clearable placeholder="">
                                <el-option v-for="item in memonepolsel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="成员1健康状况：">
                            <el-select v-model="form.memonehea" clearable placeholder="">
                                <el-option v-for="item in memoneheasel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="成员1工作或学习单位：">
                            <el-input v-model="form.memonejob"></el-input>
                        </el-form-item>
                        <el-form-item label="成员1职位：">
                            <el-input v-model="form.memonepos"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align:center;">
                        <el-button type="primary" @click="confirm('form')">提交</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
        <!-- 学生学籍详情 -->
        <el-dialog title="学生学籍详情" :visible.sync="dialogDetailVisible">
            <div class="tabdet">
                <ul class="studeTab">
                    <div ref="studeTab" @click="studeTab" class="clearfix">
                        <li data-active="1" class="tabs-items-item">基础信息</li>
                        <li data-active="2">家庭住址</li>
                        <li data-active="3">入学信息</li>
                        <li data-active="4">家庭成员</li>
                    </div>
                </ul>
            </div>
            <!-- tab内容 -->
            <div class="tabdeCon">
                <!-- 基础信息 -->
                <div class="basinfo" v-if="active == '1'">
                    <el-form ref="form" :label-width="formLabelWidth">
                        <el-form-item label="姓名：">
                            <span>{{form.name}}</span>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <span>{{form.sex}}</span>
                        </el-form-item>
                        <el-form-item label="出生日期：">
                            <span>{{form.birth}}</span>
                        </el-form-item> 
                        <el-form-item label="专业类：">
                            <span>{{form.classify}}</span>
                        </el-form-item> 
                        <el-form-item label="专业：">
                            <span>{{form.major}}</span>
                        </el-form-item> 
                        <el-form-item label="年级：">
                            <span>{{form.grade}}</span>
                        </el-form-item> 
                        <el-form-item label="班级：">
                            <span>{{form.class}}</span>
                        </el-form-item> 
                        <el-form-item label="身份证类型：">
                            <span>{{form.idtype}}</span>
                        </el-form-item>
                        <el-form-item label="身份证号：">
                            <span>{{form.idnum}}</span>
                        </el-form-item> 
                        <el-form-item label="行政班：">
                            <span>{{form.admclass}}</span>
                        </el-form-item> 
                        <el-form-item label="教学班：">
                            <span>{{form.teaclass}}</span>
                        </el-form-item> 
                        <el-form-item label="学号：">
                            <span>{{form.stuid}}</span>
                        </el-form-item>
                        <el-form-item label="学生类别：">
                            <span>{{form.stuclass}}</span>
                        </el-form-item>
                        <el-form-item label="学习形式：">
                            <span>{{form.lernform}}</span>
                        </el-form-item>
                        <el-form-item label="入学方式：">
                            <span>{{form.entway}}</span>
                        </el-form-item>
                        <el-form-item label="就读方式：">
                            <span>{{form.studway}}</span>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 家庭住址 -->
                <div class="homeadress" v-if="active == '2'">
                    <el-form ref="form" label-width="208px">
                        <el-form-item label="国际/地区：">
                            <span>{{form.inregion}}</span>
                        </el-form-item>
                        <el-form-item label="港澳台侨外：">
                            <span>{{form.overseas}}</span>
                        </el-form-item>
                        <el-form-item label="婚姻状况：">
                            <span>{{form.mstatus}}</span>
                        </el-form-item>  
                        <el-form-item label="乘车区间：">
                            <span>{{form.drange}}</span>
                        </el-form-item> 
                        <el-form-item label="是否随迁子女：">
                            <span>{{form.achild}}</span>
                        </el-form-item> 
                        <el-form-item label="生源地行政区划码：">
                            <span>{{form.socode}}</span>
                        </el-form-item> 
                        <el-form-item label="出生地行政区划码：">
                            <span>{{form.birplace}}</span>
                        </el-form-item> 
                        <el-form-item label="籍贯地行政区划码：">
                            <span>{{form.natcode}}</span>
                        </el-form-item>
                        <el-form-item label="户口所在地区县以下详细地址：">
                            <span>{{form.address}}</span>
                        </el-form-item> 
                        <el-form-item label="所属派出所：">
                            <span>{{form.substation}}</span>
                        </el-form-item> 
                        <el-form-item label="户口所在地行政区划码：">
                            <span>{{form.regcode}}</span>
                        </el-form-item> 
                        <el-form-item label="户口性质：">
                            <span>{{form.acnature}}</span>
                        </el-form-item>
                        <el-form-item label="学生居住类型：">
                            <span>{{form.sturestype}}</span>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 入学信息 -->
                <div class="adminfo" v-if="active == '3'">
                    <el-form ref="form" label-width="152px">
                        <el-form-item label="入学年月：">
                            <span>{{form.schyear}}</span>
                        </el-form-item>
                        <el-form-item label="专业简称：">
                            <span>{{form.proabb}}</span>
                        </el-form-item>
                        <el-form-item label="学制：">
                            <span>{{form.edusystme}}</span>
                        </el-form-item> 
                        <el-form-item label="民族：">
                            <span>{{form.nation}}</span>
                        </el-form-item> 
                        <el-form-item label="政治面貌：">
                            <span>{{form.polandscape}}</span>
                        </el-form-item> 
                        <el-form-item label="健康状况：">
                            <span>{{form.health}}</span>
                        </el-form-item> 
                        <el-form-item label="学生来源：">
                            <span>{{form.stusour}}</span>
                        </el-form-item> 
                        <el-form-item label="招生对象：">
                            <span>{{form.entarget}}</span>
                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <span>{{form.tel}}</span>  
                        </el-form-item> 
                        <el-form-item label="是否建档立卡贫困户：">
                            <span>{{form.conpoor}}</span>
                        </el-form-item> 
                        <el-form-item label="招生方式：">
                            <span>{{form.admway}}</span>
                        </el-form-item> 
                        <el-form-item label="联招合作类型：">
                            <span>{{form.collatype}}</span>
                        </el-form-item>
                        <!-- <el-form-item label="初中毕业证：" prop="junsch">
                            <el-select v-model="form.junsch" clearable placeholder="">
                                <el-option v-for="item in junschsel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="初中毕业学校：">
                            <span>{{form.juschool}}</span>
                        </el-form-item>
                        <el-form-item label="考试总分：">
                            <span>{{form.testscores}}</span>
                        </el-form-item>
                        <el-form-item label="考生号：">
                            <span>{{form.cannumber}}</span>
                        </el-form-item>
                        <el-form-item label="准考证号：">
                            <span>{{form.exregnum}}</span>
                        </el-form-item>
                        <el-form-item label="联招合作办学形式：">
                            <span>{{form.cfcoeducat}}</span>
                        </el-form-item>
                        <el-form-item label="联招合作学校代码：">
                            <span>{{form.coshcode}}</span>
                        </el-form-item>
                        <el-form-item label="校外教学点：">
                            <span>{{form.exteapoint}}</span>
                        </el-form-item>
                        <el-form-item label="分段培养方式：">
                            <span>{{form.trainway}}</span>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 家庭成员 -->
                <div class="fammem" v-if="active == '4'">
                    <el-form ref="form" label-width="183px">
                        <el-form-item label="电子信箱/其他联系方式：" >
                            <span>{{form.email}}</span>
                        </el-form-item>
                        <el-form-item label="英文名字：">
                            <span>{{form.enname}}</span>
                        </el-form-item>
                        <el-form-item label="家庭现地址：">
                            <span>{{form.curaddress}}</span>
                        </el-form-item> 
                        <el-form-item label="家庭邮政编码：">
                            <span>{{form.famzipcode}}</span>
                        </el-form-item> 
                        <el-form-item label="家庭电话：">
                            <span>{{form.famtel}}</span>
                        </el-form-item> 
                        <el-form-item label="成员1姓名：">
                            <span>{{form.memonename}}</span>
                        </el-form-item> 
                        <el-form-item label="成员1关系：">
                            <span>{{form.memonerelat}}</span>
                        </el-form-item> 
                        <!-- <el-form-item label="成员1是否监护人：">
                            <el-select v-model="form.memoneguar" clearable placeholder="">
                                <el-option v-for="item in memoneguarsel" :key="item.label" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="成员1联系电话：">
                            <span>{{form.memonetel}}</span>
                        </el-form-item> 
                        <el-form-item label="成员1出生年月：">
                            <span>{{form.memonebirth}}</span>
                        </el-form-item> 
                        <el-form-item label="成员1身份证类型：">
                            <span>{{form.memoneidtype}}</span>
                        </el-form-item> 
                        <el-form-item label="成员1身份证号：">
                            <span>{{form.memoneidnum}}</span>
                        </el-form-item>
                        <el-form-item label="成员1民族：">
                            <span>{{form.memoneidnat}}</span>
                        </el-form-item>
                        <el-form-item label="成员1政治面貌：">
                            <span>{{form.memonepol}}</span>
                        </el-form-item>
                        <el-form-item label="成员1健康状况：">
                            <span>{{form.memonehea}}</span>
                        </el-form-item>
                        <el-form-item label="成员1工作或学习单位：">
                            <span>{{form.memonejob}}</span>
                        </el-form-item>
                        <el-form-item label="成员1职位：">
                            <span>{{form.memonepos}}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-dialog>
        <!--列表  -->
        <el-table stripe :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="sex" label="性别">
                <template slot-scope="scope">
                    <span v-if="scope.row.sex=1">男</span>
                    <span v-else-if="scope.row.sex=2">女</span>
                </template>
            </el-table-column>
            <el-table-column prop="birthday" label="出生日期" width="120">
            </el-table-column>
            <el-table-column prop="officeName" label="专业类" width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.officeName!=null">
                        {{scope.row.officeName.length>5?scope.row.officeName.substring(0,5)+"...":scope.row.officeName}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="proName" label="专业" width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.proName!=null">
                        {{scope.row.proName.length>5?scope.row.proName.substring(0,5)+"...":scope.row.proName}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="gradeName" label="年级" width="100">
            </el-table-column>
            <!-- <el-table-column prop="clazzId" label="班级" width="110">
                <template slot-scope="scope">
                    <span v-if="scope.row.clazzId!=null">
                        {{scope.row.clazzId.length>5?scope.row.clazzId.substring(0,5)+"...":scope.row.clazzId}}
                    </span>
                </template>
            </el-table-column> -->
            <el-table-column prop="schoolRoll.stuType" label="学生类别" width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.schoolRoll.stuType!=null">
                        {{scope.row.schoolRoll.stuType.length>5?scope.row.schoolRoll.stuType.substring(0,5)+"...":scope.row.schoolRoll.stuType}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="jdtype" label="就读方式" width="120">
            </el-table-column>
            <el-table-column prop="schoolRoll.entranceWay" label="入学方式" width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.schoolRoll.entranceWay!=null">
                        {{scope.row.schoolRoll.entranceWay.length>5?scope.row.schoolRoll.entranceWay.substring(0,5)+"...":scope.row.schoolRoll.entranceWay}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="sxly" label="学习形式" width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.sxly!=null">
                        {{scope.row.sxly.length>5?scope.row.sxly.substring(0,5)+"...":scope.row.sxly}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="216">
                <template slot-scope="scope"> 
                    <el-button class="btn" @click="postStuDetail(scope.row)" plain>详情</el-button>  
                    <el-button class="btn" @click="postStuModify(scope.row)" type="primary" plain>修改</el-button>
                    <el-button class="btn" @click="postStuDel(scope.row)" type="danger" plain>删除</el-button>  	 
                </template>
            </el-table-column>
        </el-table> 
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-size="10" layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import fcHeader from '../common/header.vue'
  import api from '../../apis/file.js'
  import com from '../../apis/common.js'
  const qs = require('querystring')
  export default {
    data(){
      return {
        //下载模板
        downLoadUrl: '',
        exportUrl:'',
        importUrl:'',
        fileData:{},
        // 列表
        tableData: [],
        loading: false,
        currentPage: 1,
        total:0,
        // 弹框
        dialogFormVisible: false,
        formLabelWidth: '121px',
        dialogDetailVisible:false,
        detailLabelWidth: '96px',
        active: "1",
        // 基础信息
        form:{
            id:'',
            // 基础信息
            name:'',
            sex:'',
            birth:'',
            classify:'',
            major:'',
            grade: '',
            class: '',
            idtype: '',
            idnum:'',
            admclass:'',
            teaclass:'',
            stuid:'',
            stuclass: '',
            lernform: '',
            entway:'',
            studway:'',
            // 家庭住址
            inregion:'',
            overseas:'',
            mstatus:'',
            drange:'',
            achild:'',
            socode:'',
            birplace:'',
            natcode:'',
            address:'',
            substation:'',
            regcode:'',
            acnature:'',
            sturestype:'',
            // 入学信息
            schyear:'',
            proabb:'',
            edusystme:'',
            nation:'',
            polandscape:'',
            health:'',
            stusour:'',
            entarget:'',
            tel:'',
            conpoor:'',
            admway:'',
            collatype:'',
            // junsch:'',
            juschool:'',
            testscores:'',
            cannumber:'',
            exregnum:'',
            cfcoeducat:'',
            coshcode:'',
            exteapoint:'',
            trainway:'',
            // 家庭成员
            email:'',
            enname:'',
            curaddress:'',
            famzipcode:'',
            famtel:'',
            memonename:'',
            memonerelat:'',
            memoneguar:'',
            memonetel:'',
            memonebirth:'',
            memoneidtype:'',
            memoneidnum:'',
            memoneidnat:'',
            memonepol:'',
            memonehea:'',
            memonejob:'',
            memonepos:'',
        },
        rules: {
            // 基础信息必填项
            stuclass: [
                { required: true, message: '请选择学生类别', trigger: 'change' }
            ],
            entway: [
                { required: true, message: '请选择入学方式', trigger: 'change' }
            ],
            // 家庭住址必填项
            inregion:[
                { required: true, message: '请选择国际/地区', trigger: 'change' }
            ],
            overseas: [
                { required: true, message: '请选择港澳台侨外', trigger: 'change' }
            ],
            mstatus: [
                { required: true, message: '请选择婚姻状况', trigger: 'change' }
            ],
            regcode: [
                { required: true, message: '请输入户口所在地行政区划码', trigger: 'blur' }
            ],
            sturestype: [
                { required: true, message: '请选择学生居住类型', trigger: 'change' }
            ],
            // 入学信息必填项
            proabb:[
                { required: true, message: '请输入专业简称', trigger: 'blur' }
            ],
            health: [
                { required: true, message: '请选择健康状况', trigger: 'change' }
            ],
            entarget: [
                { required: true, message: '请选择招生对象', trigger: 'change' }
            ],
            tel: [
                { required: true, message: '请输入联系电话', trigger: 'blur' }
            ],
            collatype: [
                { required: true, message: '请选择联招合作类型', trigger: 'change' }
            ],
            trainway:[
                { required: true, message: '请选择分段培养方式', trigger: 'change' }
            ],
            // junsch: [
            //     { required: true, message: '请选择初中毕业证', trigger: 'change' }
            // ],
            testscores: [
                { required: true, message: '请输入考试总分', trigger: 'blur' }
            ],
            cannumber: [
                { required: true, message: '请输入考生号', trigger: 'blur' }
            ],
            exregnum: [
                { required: true, message: '请输入准考证号', trigger: 'blur' }
            ],
        },
        // 专业类
        classifysel:{
            options: [],
            value: '',
        },
        // 专业
        majorsel:{
            options: [],
            value: '',
        },
        // 年级
        gradesel:{
            options: [],
            value: '',
        },
        // 班级
        classsel:{
            options: [],
            value: '',
        },
        // 基础信息学生类别
        stuclasel:[{
            label:'',
            value:''
        }],
        // 基础信息入学方式
        entwaysel:[{
            label:'',
            value:''
        }],
        // 家庭住址国际/地区
        inregionsel:[{
            label:'',
            value:''
        }],
        // 家庭住址港澳台侨外
        overseassel:[{
            label:'',
            value:''
        }],
        // 家庭住址婚姻状况
        mstatussel:[{
            label:'',
            value:''
        }],
        // 家庭住址是否随迁子女
        achildsel:[
            {
                label:'是',
                value:'1'
            },
            {
                label:'否',
                value:'2'
            },
        ],
        // 家庭住址学生居住类型
        sturestypesel:[{
            label:'',
            value:''
        }],
        // 入学信息健康状况
        healthsel:[{
            label:'',
            value:''
        }],
        // 入学信息招生对象
        entargetsel:[{
            label:'',
            value:''
        }],
        // 入学信息联招合作类型
        collatypesel:[{
            label:'',
            value:''
        }],
        // 入学信息联招合作办学形式
        cfcoeducatsel:[{
            label:'',
            value:''
        }],
        // 入学信息分段培养方式
        trainwaysel:[{
            label:'',
            value:''
        }],
        // 家庭成员关系
        memonerelatsel:[{
            label:'',
            value:''
        }],
        // 家庭成员是否监护人
        memoneguarsel:[
            {
                label:'是',
                value:'1'
            },
            {
                label:'否',
                value:'2'
            },
        ],
        // 家庭成员身份证类型
        memoneidtypesel:[{
            label:'',
            value:''
        }],
        // 家庭成员民族
        memoneidnatsel:[{
            label:'',
            value:''
        }],
        // 家庭成员政治面貌
        memonepolsel:[{
            label:'',
            value:''
        }],
        // 家庭成员健康状况
        memoneheasel:[{
            label:'',
            value:''
        }]
      }
    },
    components: {
      fcHeader,
    },
    methods: {
        // 导入
        handleAvatarSuccess (r) {
          var me = this
          if(r){
              setTimeout(function(r){
                if(r){
                    me.getStustaList()
                }
              }, 500)
          }
          
        },
        // 把国家/地区的中文值传给后台
        changeValue(value){
            let arr = [];
            arr = this.inregionsel.find((item)=>{
                return item.value === value;
            });
            this.form.inregion = arr.label;
        },
        // 下一步
        next(index,formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let liDiv=this.$refs['stuadTab'];
                    let lis = liDiv.children;
                    for (let i = 0; i < lis.length; i++) {
                        lis[i].className = "";
                    }
                    if(this.active == index){
                        lis[index].className = "tabs-items-item";
                    }
                    if (this.active++ > 3) this.active = 4;
                } else {
                    return false;
                }
            });
        },
        returnBtn () {
            this.$router.push('/newIndex')
        },
        // 获取专业类
        getProClass(){
            let para={
                xz:1
            }
            com.getProClass(para).then(r=>{
                if(r){
                    this.classifysel.options = r.data.data;
                    // this.getDfsendList();
                }
                
            })
        },
        // 获取所有专业
        getAllMajor(){
            com.getAllMajor().then(r=>{
                if(r){
                    this.majorsel.options = r.data.data;
                }
            })
        },
        // 获取所有年级
        getAllGrade(){
            com.getAllGrade().then(r=>{
                if(r.data.meta.code ==  '200'){
                    this.gradesel.options = r.data.data
                }
            })
        },
        // 通过专业年级获取班级
        getClass(){
            let data={
                'proid':this.majorsel.value,
                'gradeid':this.gradesel.value 
            }
            com.classQueryMajor(data).then(r=>{
                
                if(r.data.meta.code ==  '200'){
                    this.classsel.options = r.data.data;
                    this.getStustaList();
                }
            })
        },
        //获取基础信息学生类别
        getBiscla(){
            let para={
                type:'student_type'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.stuclasel = r.data.data; 
                }
            })
        },
        //获取基础信息入学方式
        getBientway(){
            let para={
                type:'entrance_way'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.entwaysel = r.data.data; 
                }
            })
        },
        // 获取家庭住址国际/地区
        getInregion(){
            let para={
                type:'country'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.inregionsel = r.data.data; 
                }
            })
        },
        // 获取家庭住址港澳台侨外
        getOverSeas(){
            let para={
                type:'outside_nation'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.overseassel = r.data.data; 
                }
            })
        },
        // 获取家庭住址婚姻状况
        getMstatus(){
            let para={
                type:'marry_situation'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.mstatussel = r.data.data; 
                }
            })
        },
        // 获取家庭住址学生居住类型
        getStuResType(){
            let para={
                type:'student_swell_type'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.sturestypesel = r.data.data; 
                }
            })
        },
        // 获取入学信息健康状况
        getHealth(){
            let para={
                type:'health_status'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.healthsel = r.data.data; 
                }
            })
        },
        // 获取入学信息招生对象
        getEnTarget(){
            let para={
                type:'recruit_object'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.entargetsel = r.data.data; 
                }
            })
        },
        // 获取入学信息联招合作类型
        getCollaType(){
            let para={
                type:'union_type'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.collatypesel = r.data.data; 
                }
            })
        }, 
        // 获取入学信息联招合作办学形式
        getCfCoEducat(){
            let para={
                type:'union_cooperation_way'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.cfcoeducatsel = r.data.data; 
                }
            })
        },
        // 获取入学信息分段培养方式
        getTrainWay(){
            let para={
                type:'train_way'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.trainwaysel = r.data.data; 
                }
            })
        },
        // 获取家庭成员关系
        getMemOneRelat(){
            let para={
                type:'member_relation'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.memonerelatsel = r.data.data; 
                }
            })
        },
        // 获取家庭成员身份证类型
        getMemOneIdType(){
            let para={
                type:'identity_type'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.memoneidtypesel = r.data.data; 
                }
            })
        },
        // 获取家庭成员政治面貌
        getMemOnePol(){
            let para={
                type:'politics_status'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.memonepolsel = r.data.data; 
                }
            })
        },
        // 获取家庭成员健康状况
        getMemOneHea(){
            let para={
                type:'health_status'
            }
            api.getAllData(para).then(r=>{
                if(r){
                   this.memoneheasel = r.data.data; 
                }
            })
        },
        clearform(){
            // 基础信息
            this.form.name = '';
            this.form.sex = '';
            this.form.birth = '';
            this.form.classify = '';
            this.form.major = '';
            this.form.grade = '';
            this.form.class = '';
            this.form.idtype = '';
            this.form.idnum = '';
            this.form.admclass = '';
            this.form.teaclass = '';
            this.form.stuid = '';
            this.form.stuclass = '';
            this.form.lernform = '';
            this.form.entway = '';
            this.form.studway = '';
            // 家庭住址
            this.form.inregion = '';
            this.form.overseas = '';
            this.form.mstatus = '';
            this.form.drange = '';
            this.form.achild = '';
            this.form.socode = '';
            this.form.birplace = '';
            this.form.natcode = '';
            this.form.address = '';
            this.form.substation = '';
            this.form.regcode = '';
            this.form.acnature = '';
            this.form.sturestype = '';
            // 入学信息
            this.form.schyear = '';
            this.form.proabb = '';
            this.form.edusystme = '';
            this.form.nation = '';
            this.form.polandscape = '';
            this.form.health = '';
            this.form.stusour = '';
            this.form.entarget = '';
            this.form.tel = '';
            this.form.conpoor = '';
            this.form.admway = '';
            this.form.collatype = '';
            // junsch:'',
            this.form.juschool = '';
            this.form.testscores = '';
            this.form.cannumber = '';
            this.form.exregnum = '';
            this.form.cfcoeducat = '';
            this.form.coshcode = '';
            this.form.exteapoint = '';
            this.form.trainway = '';
            // 家庭成员
            this.form.email = '';
            this.form.enname = '';
            this.form.curaddress = '';
            this.form.famzipcode = '';
            this.form.famtel = '';
            this.form.memonename = '';
            this.form.memonerelat = '';
            this.form.memoneguar = '';
            this.form.memonetel = '';
            this.form.memonebirth = '';
            this.form.memoneidtype = '';
            this.form.memoneidnum = '';
            this.form.memoneidnat = '';
            this.form.memonepol = '';
            this.form.memonehea = '';
            this.form.memonejob = '';
            this.form.memonepos = '';
        },
        // 添加
        postStuadmitAdd(){
            this.dialogFormVisible = true;
            this.clearform();
        },
        // 修改
        postStuModify(row){
            this.form.id=row.id;
            // 基础信息
            this.form.name = row.name;
            this.form.sex = row.sex;
            this.form.birth = row.birthday;
            this.form.classify = row.officeName;
            this.form.major = row.proName;
            this.form.grade = row.gradeName;
            this.form.class = row.clazzName;
            this.form.idtype = row.idcardtype;
            this.form.idnum = row.idcard;
            this.form.admclass = row.xzbName;
            // this.form.teaclass = row;
            this.form.stuid = row.no;
            this.form.stuclass = row.schoolRoll.stuType;
            this.form.lernform = row.sxly;
            this.form.entway = row.schoolRoll.entranceWay;
            // this.form.studway = row;
            // 家庭住址
            this.form.inregion = row.schoolRoll.internationRegion;
            this.form.overseas = row.schoolRoll.outside;
            this.form.mstatus = row.schoolRoll.maritalStatus;
            // this.form.drange = row.schoolRoll.internationRegion;
            this.form.achild = row.schoolRoll.istrailing;
            this.form.socode = row.schoolRoll.sourceCode;
            this.form.birplace = row.schoolRoll.birthCode;
            this.form.natcode = row.schoolRoll.nativeCode;
            // this.form.address = row.schoolRoll.internationRegion;
            // this.form.substation = row.schoolRoll.internationRegion;
            this.form.regcode = row.schoolRoll.residenceCode;
            // this.form.acnature = row.schoolRoll.internationRegion;
            this.form.sturestype = row.schoolRoll.dwellType;
            // 入学信息
            // this.form.schyear = row;
            this.form.proabb = row.schoolRoll.majorShort;
            // this.form.edusystme = row;
            // this.form.nation = row;
            // this.form.polandscape = row;
            this.form.health = row.schoolRoll.health;
            // this.form.stusour = row;
            this.form.entarget = row.schoolRoll.recuitObject;
            this.form.tel = row.schoolRoll.phone;
            // this.form.conpoor = row;
            // this.form.admway = row;
            this.form.collatype = row.schoolRoll.unionWay;
            // junsch:'',
            // this.form.juschool = row;
            this.form.testscores = row.schoolRoll.score;
            this.form.cannumber = row.schoolRoll.examNo;
            this.form.exregnum = row.schoolRoll.examNum;
            this.form.cfcoeducat = row.schoolRoll.unionWay;
            this.form.coshcode = row.schoolRoll.unionCode;
            this.form.exteapoint = row.schoolRoll.outsidePoint;
            this.form.trainway = row.schoolRoll.trainMode;
            // 家庭成员
            this.form.email = row.schoolRoll.email;
            this.form.enname = row.schoolRoll.englishName;
            this.form.curaddress = row.schoolRoll.address;
            this.form.famzipcode = row.schoolRoll.postalCode;
            this.form.famtel = row.schoolRoll.homeTelephone;
            this.form.memonename = row.schoolRoll.memberRelation.memonename;
            this.form.memonerelat = row.schoolRoll.memberRelation.memonerelat;
            this.form.memoneguar = row.schoolRoll.memberRelation.memoneguar;
            this.form.memonetel = row.schoolRoll.memberRelation.memonetel;
            this.form.memonebirth = row.schoolRoll.memberRelation.memonebirth;
            this.form.memoneidtype = row.schoolRoll.memberRelation.memoneidtype;
            this.form.memoneidnum = row.schoolRoll.memberRelation.memoneidnum;
            this.form.memoneidnat = row.schoolRoll.memberRelation.memoneidnat;
            this.form.memonepol = row.schoolRoll.memberRelation.memonepol;
            this.form.memonehea = row.schoolRoll.memberRelation.memonehea;
            this.form.memonejob = row.schoolRoll.memberRelation.memonejob;
            this.form.memonepos = row.schoolRoll.memberRelation.memonepos;
            this.dialogFormVisible = true;
        },
        // 详情
        postStuDetail(row){
            this.dialogDetailVisible = true;
            console.log(row);
            console.log("详情");
            // 基础信息
            this.form.name = row.name;
            this.form.sex = row.sex;
            this.form.birth = row.birthday;
            this.form.classify = row.officeName;
            this.form.major = row.proName;
            this.form.grade = row.gradeName;
            this.form.class = row.clazzName;
            this.form.idtype = row.idcardtype;
            this.form.idnum = row.idcard;
            this.form.admclass = row.xzbName;
            // this.form.teaclass = row;
            this.form.stuid = row.no;
            this.form.stuclass = row.schoolRoll.stuType;
            this.form.lernform = row.sxly;
            this.form.entway = row.schoolRoll.entranceWay;
            // this.form.studway = row;
            // 家庭住址
            this.form.inregion = row.schoolRoll.internationRegion;
            this.form.overseas = row.schoolRoll.outside;
            this.form.mstatus = row.schoolRoll.maritalStatus;
            // this.form.drange = row.schoolRoll.internationRegion;
            this.form.achild = row.schoolRoll.istrailing;
            this.form.socode = row.schoolRoll.sourceCode;
            this.form.birplace = row.schoolRoll.birthCode;
            this.form.natcode = row.schoolRoll.nativeCode;
            // this.form.address = row.schoolRoll.internationRegion;
            // this.form.substation = row.schoolRoll.internationRegion;
            this.form.regcode = row.schoolRoll.residenceCode;
            // this.form.acnature = row.schoolRoll.internationRegion;
            this.form.sturestype = row.schoolRoll.dwellType;
            // 入学信息
            // this.form.schyear = row;
            this.form.proabb = row.schoolRoll.majorShort;
            // this.form.edusystme = row;
            // this.form.nation = row;
            // this.form.polandscape = row;
            this.form.health = row.schoolRoll.health;
            // this.form.stusour = row;
            this.form.entarget = row.schoolRoll.recuitObject;
            this.form.tel = row.schoolRoll.phone;
            // this.form.conpoor = row;
            // this.form.admway = row;
            this.form.collatype = row.schoolRoll.unionWay;
            // junsch:'',
            // this.form.juschool = row.schoolRoll;
            this.form.testscores = row.schoolRoll.score;
            this.form.cannumber = row.schoolRoll.examNo;
            this.form.exregnum = row.schoolRoll.examNum;
            this.form.cfcoeducat = row.schoolRoll.unionWay;
            this.form.coshcode = row.schoolRoll.unionCode;
            this.form.exteapoint = row.schoolRoll.outsidePoint;
            this.form.trainway = row.schoolRoll.trainMode;
            // 家庭成员
            this.form.email = row.schoolRoll.email;
            this.form.enname = row.schoolRoll.englishName;
            this.form.curaddress = row.schoolRoll.address;
            this.form.famzipcode = row.schoolRoll.postalCode;
            this.form.famtel = row.schoolRoll.homeTelephone;
            this.form.memonename = row.schoolRoll.memberRelation.memonename;
            this.form.memonerelat = row.schoolRoll.memberRelation.memonerelat;
            this.form.memoneguar = row.schoolRoll.memberRelation.memoneguar;
            this.form.memonetel = row.schoolRoll.memberRelation.memonetel;
            this.form.memonebirth = row.schoolRoll.memberRelation.memonebirth;
            this.form.memoneidtype = row.schoolRoll.memberRelation.memoneidtype;
            this.form.memoneidnum = row.schoolRoll.memberRelation.memoneidnum;
            this.form.memoneidnat = row.schoolRoll.memberRelation.memoneidnat;
            this.form.memonepol = row.schoolRoll.memberRelation.memonepol;
            this.form.memonehea = row.schoolRoll.memberRelation.memonehea;
            this.form.memonejob = row.schoolRoll.memberRelation.memonejob;
            this.form.memonepos = row.schoolRoll.memberRelation.memonepos;
        },
        // 删除学籍
        postStuDel(row){
            let para={
                id : row.id
            }
            var qs = require('querystring');
            let datax = qs.stringify(para);
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                api.postStustaDel(datax).then(r=>{
                    this.getStustaList();   
                })
            });
        },
        // tab切换
        stuadTab(e){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (e.target.tagName == "UL" || e.target.tagName == "DIV") return;
                    let li = e.target;
                    let lis = li.parentElement.children;
                    for (let i = 0; i < lis.length; i++) {
                        lis[i].className = "";
                    }
                    this.$refs.form.clearValidate()
                    li.className = "tabs-items-item";
                    this.active = e.target.attributes[1].value;
                } else {
                    return false;
                }
            });
            
        },
        // 详情tab切换
        studeTab(e){
            if (e.target.tagName == "UL" || e.target.tagName == "DIV") return;
            let li = e.target;
            let lis = li.parentElement.children;
            for (let i = 0; i < lis.length; i++) {
                lis[i].className = "";
            }
            li.className = "tabs-items-item";
            this.active = e.target.attributes[1].value;
        },
        // 列表
        getStustaList(){
          let para = {
              pageNo : this.currentPage,
              pageSize:10,
              type:1,

              officeId:this.classifysel.value,
              proId:this.majorsel.value,
              gradeId:this.gradesel.value,
              clazzId:this.classsel.value,
          }
          api.getStustaList(para).then(r=>{
              if(r){
                  this.tableData = r.data.data.list;
                  this.total = r.data.data.count;
                  this.loading = false;
              }
          })
        },
        // 分页
        handleCurrentChange(val) {
            this.currentPage=val;
        },
        // 弹框
        confirm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let memberRelation = [{
                        memonename:this.form.memonename,
                        memonerelat:this.form.memonerelat,
                        memoneguar:this.form.memoneguar,
                        memonetel:this.form.memonetel,
                        memonebirth:this.form.memonebirth,
                        memoneidtype:this.form.memoneidtype,
                        memoneidnum:this.form.memoneidnum,
                        memoneidnat:this.form.memoneidnat,
                        memonepol:this.form.memonepol,
                        memonehea:this.form.memonehea,
                        memonejob:this.form.memonejob,
                        memonepos:this.form.memonepos
                    }]
                    let data={
                        'stuId':'041841d88e434363a3e23a5910cfd818',
                        'stuType':this.form.stuclass,
                        'entranceWay':this.form.entway,
                        'internationRegion':this.form.inregion,
                        'outside':this.form.overseas,
                        'maritalStatus':this.form.mstatus,
                        'residenceCode':this.form.regcode,
                        'dwellType':this.form.sturestype,
                        'majorShort':this.form.proabb,
                        'health':this.form.health,
                        'recuitObject':this.form.entarget,
                        'phone':this.form.tel,
                        'unionType':this.form.collatype,
                        'trainMode':this.form.trainway,
                        // 不是必填参数
                        'email':this.form.email,
                        'nativeCode':this.form.natcode,
                        'englishName':this.form.enname,
                        'score':this.form.testscores,
                        'birthCode':this.form.birplace,
                        'examNo':this.form.cannumber,
                        'address':this.form.curaddress,
                        'postalCode':this.form.famzipcode,
                        'sourceCode':this.form.socode,
                        'unionCode':this.form.coshcode,
                        'unionWay':this.form.cfcoeducat,
                        'outsidePoint':this.form.exteapoint,
                        'examNum':this.form.exregnum,
                        'istrailing':this.form.achild,
                        'homeTelephone':this.form.famtel,
                        'memberRelation':JSON.stringify(memberRelation)
                    }
                    let datax = qs.stringify(data);
                    if(!this.form.id){
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {

                            api.postStusta(datax).then(r => {
                                
                                if(r.data.meta.code == '200') {
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                }else{
                                    return false;
                                }
                                this.dialogFormVisible = false;
                                this.getStustaList();    
                            })
                            
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消添加'
                            });          
                        });
                    }else{
                        // 修改
                        data.id = this.form.id
                        let datam = qs.stringify(data);
                        this.$confirm('确认提交吗2？', '提示', {}).then(() => {

                            api.postStusta(datam).then(r =>{
                                if(r.data.meta.code=='200'){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                }else{
                                    return false;
                                }
                                this.dialogFormVisible = false;
                                this.getStustaList();   
                            })
                            
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消编辑'
                            });          
                        });
                    }
                } else {
                    return false;
                }
            });
        },
    },
    mounted () {
        // 列表
        this.getStustaList();
        // 获取专业类
        this.getProClass();
        // 获取所有专业
        this.getAllMajor();
        // 获取所有年级
        this.getAllGrade();
        //获取基础信息学生类别
        this.getBiscla();
        //获取基础信息入学方式
        this.getBientway();
        // 获取家庭住址国际/地区
        this.getInregion();
        // 获取家庭住址港澳台侨外
        this.getOverSeas();
        // 获取家庭住址婚姻状况
        this.getMstatus();
        // 获取家庭住址学生居住类型
        this.getStuResType();
        // 获取入学信息健康状况
        this.getHealth();
        // 获取入学信息招生对象
        this.getEnTarget();
        // 获取入学信息联招合作类型
        this.getCollaType();
        // 获取入学信息联招合作办学形式
        this.getCfCoEducat();
        // 获取入学信息分段培养方式
        this.getTrainWay();
        // 获取家庭成员关系
        this.getMemOneRelat();
        // 获取家庭成员身份证类型
        this.getMemOneIdType();
        // 获取家庭成员政治面貌
        this.getMemOnePol();
        // 获取家庭成员健康状况
        this.getMemOneHea();
        // 下载Excel模板
        this.downLoadUrl = api.getExcelDown();
        // 导出
        this.exportUrl =api.getExportSheet();
        // 导入
        this.importUrl = api.getImportSheet()
    }
  }
</script>
<style lang="scss" scoped>
  .container{
    width:1200px;
    margin:0 auto;
    position: relative;
    // 上
    .stustatmage-title{
        height:50px;
        line-height:50px;
        background:#fff;
        padding-left:24px;
        padding-right:16px;
        border-radius:5px;
        margin-top:12px;
        margin-bottom:16px;
        .stustatmage-title-lt{
            float:left;
            color:#208af5;
            font-size:16px;
            border-bottom:2px solid #208af5;
            font-weight:bold;
        }
        .back{
            float:right;
            cursor: pointer;
            span{
                float:left;
            }
            i{
                width:9px;
                height: 15px;
                float:left;
                margin-top:18px;
                margin-left:6px;
                background:url("../../assets/img/overtime/arrow-right.png") 0 0 no-repeat;
            }
        }
    }
    // 下
    .stustatmage-content{
        background:#fff;
        padding-left:24px;
        padding-right:16px;
        border-radius:5px;
        min-height: 200px;
        .stmage-title{
          padding-top:15px;
          .schl{
            float:left;
            margin-right:20px;
            margin-bottom:20px;
            i{
                width: 16px;
                height:16px;
                float:left;
                margin-top:2px;
                margin-right:6px;
                background:url("../../assets/img/deanfund/print.png") 0 0 no-repeat;
            }
            .el-select{
                width:147px;
            }
          }
          .schl:last-child{
              margin-right:0;
          }
          .add{
              margin-top:11px;
              cursor:pointer;
              i{
                  background:url("../../assets/img/overtime/add.png") 0 0 no-repeat;
              }
              span{
                  color:#208af5;
              }
          }
          .export{
              margin-top:11px;
              cursor:pointer;
              i{
                  background:url("../../assets/img/deanfund/export.png") 0 0 no-repeat;
              }
          }
          .import{
              margin-top:11px;
              cursor:pointer;
              i{
                  background:url("../../assets/img/file/import.png") 0 0 no-repeat;
              }
          }
          .download{
              margin-top:11px;
              cursor:pointer;
              i{
                  background:url("../../assets/img/file/download.png") 0 0 no-repeat;
              }
          }
        }
        .btn{
            padding:6px 12px;
        }
        .tabs,.tabdet{
            height: 40px;
            text-align: left;
        }
        .tabCon .el-input,
        .tabdeCon .el-input{
            width:27%;
        }
        .stuadTab,
        .studeTab{
            border-bottom: 1px solid #dfe6ec;
            height: 40px;
        }
        .stuadTab li ,
        .studeTab li        {
            float: left;
            width: 120px;
            line-height: 40px;
            height: 40px;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
        }
        .tabs-items-item {
            background-color: #fff;
            color: #208af5;
            border-bottom:2px solid #208af5;
            transition: background-color 0.3s ease-in;
        }
        .basinfo,.homeadress,.adminfo,.fammem{
            margin-top:24px;
        }
        // .el-date-editor.el-input, .el-date-editor.el-input__inner{
        //     width:200px;
        // }
        // .el-textarea,
        // .el-input{
        //     width:25.4%;
        // }
        // .btn{
        //     padding:5px 10px;
        // }
        // 分页
        .toolbar{
            margin-top:20px;
        }
    }
  }
</style>


