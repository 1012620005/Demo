<template>
	<div class="contanier">
        <div class="navigation">
            <el-menu  class="el-menu-demo" >
                <div class="navlogo">
                    <span class="logo"  @click="back"><img style="cursor: pointer;" src='../../../../assets/image/logo.png'/></span><span class="logouesr">智慧校园</span>
                </div>
            </el-menu>
        </div>
		<!--顶部标签-->
        <el-row :span="24" class="table-box">
            <el-col :span="24" class="tabtop">
                <div class="tableft">
					入学申请
				</div>
				<div class="tabright" @click="returnClick">
					<span>返回</span>
					<i><img src="../../../../assets/researchCenter/return.png" alt=""></i>
				</div>
            </el-col>
        </el-row>
        <!--主体内容-->
        <el-row :span="24" class="eapply-main">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="88px" class="demo-ruleForm">
                <el-form-item class="eapp-title validat">
                    <h4>基本信息</h4>
                    <!-- <div class="auditsit">
                        <div class="pass" v-if="users.state == 1">
                            <img src="../../../../assets/img/orientation/pending.png" alt="">
                        </div>
                        <div class="nopass" v-if="users.state == 2">
                            <img src="../../../../assets/img/orientation/pass.png" alt="">
                        </div>
                        <div class="pending" v-if="users.state == 3">
                            <img src="../../../../assets/img/orientation/nopass.png" alt="">
                        </div>
                    </div> -->
                </el-form-item>
                <el-form-item label="姓名:" prop="name" class="mohed">
                    <el-input v-model="ruleForm.name" v-if="showIndex"></el-input>
                    <div v-if ="!showIndex">{{user.name}}</div>
                </el-form-item> 
                <el-form-item label="性别:" prop="sex" class="mohed">
                    <el-select v-model="ruleForm.sex" placeholder="" v-if="showIndex">
                        <el-option v-for="item in ruleForm2.sex" :key="item.value" :label="item.label" :value="item.value">{{item.label}}</el-option>
                    </el-select>
                    <div v-if ="!showIndex">{{user.sexName}}</div>
                </el-form-item>
                <el-form-item label="民族:" prop="nation" class="mohed"> 
                    <el-select v-model="ruleForm.nation" placeholder="" v-if="showIndex">
                        <el-option v-for="item in ruleForm2.nation" :key="item.value" :label="item.label" :value="item.value">{{item.label}}</el-option>
                    </el-select>
                    <div v-if ="!showIndex">{{user.nationName}}</div>
                </el-form-item>
                <el-form-item label="身份证号:" class="mohed">
                    <div>{{user.id}}</div>
                </el-form-item>
                <el-form-item label="出生日期:" prop="btdate" class="mohed">
                    <el-date-picker v-model="ruleForm.btdate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-if="showIndex"></el-date-picker>
                    <div v-if ="!showIndex">{{user.birthday}}</div>
                </el-form-item>
                <el-form-item label="录取方式:" prop="admit_method" class="mohed">
                    <el-select v-model="ruleForm.admit_method" placeholder="" v-if="showIndex">
                        <el-option v-for="item in ruleForm2.admit_method" :key="item.value" :label="item.label" :value="item.value">{{item.label}}</el-option>
                    </el-select>
                    <div v-if ="!showIndex">{{user.admitName}}</div>
                </el-form-item>
                <el-form-item label="学制:" prop="student_year" class="mohed">
                    <el-select v-model="ruleForm.student_year" placeholder="" v-if="showIndex">
                        <el-option v-for="item in ruleForm2.student_year" :key="item.value" :label="item.label" :value="item.value">{{item.label}}</el-option>
                    </el-select>
                    <div v-if ="!showIndex">{{user.xzName}}</div>
                </el-form-item>
                <el-form-item label="应届/往届:" prop="student_period" class="mohed">
                    <el-select v-model="ruleForm.student_period" placeholder="" v-if="showIndex">
                        <el-option v-for="item in ruleForm2.student_period" :key="item.value" :label="item.label" :value="item.value">{{item.label}}</el-option>
                    </el-select>
                    <div v-if ="!showIndex">{{user.yingjieName}}</div>
                </el-form-item>
                <el-form-item label="毕业学校:" prop="graduation" class="mohed">
                    <el-input v-model="ruleForm.graduation" v-if="showIndex"></el-input>
                    <div v-if ="!showIndex">{{user.graduateSchool}}</div>
                </el-form-item>
                <el-form-item label="中考成绩:" prop="testscor" class="mohed">
                    <el-input v-model="ruleForm.testscor" v-if="showIndex"></el-input>
                    <div v-if ="!showIndex">{{user.score}}</div>
                </el-form-item>
                <el-form-item label="政治面貌:" prop="political_face" class="mohed">
                    <el-select v-model="ruleForm.political_face" placeholder="" v-if="showIndex">
                        <el-option v-for="item in ruleForm2.political_face" :key="item.value" :label="item.label" :value="item.value">{{item.label}}</el-option>
                    </el-select>
                    <div v-if ="!showIndex">{{user.politicalName}}</div>
                </el-form-item>
                <el-form-item label="户口性质:" prop="account_type" class="mohed">
                    <el-select v-model="ruleForm.account_type" placeholder="" v-if="showIndex">
                        <el-option v-for="item in ruleForm2.account_type" :key="item.value" :label="item.label" :value="item.value">{{item.label}}</el-option>
                    </el-select>
                    <div v-if ="!showIndex">{{user.hkxzName}}</div>
                </el-form-item>
                <el-form-item label="生源地:" prop="birthplace" class="mohed">
                    <el-select v-model="ruleForm.birthplace"  placeholder="省" v-if="showIndex">
                        <el-option v-for="item in ruleForm2.birthplace" :key="item.code" :label="item.name" :value="item.code">{{item.name}}</el-option>
                    </el-select>
                    <div v-if ="!showIndex">{{user.stuSourceName}}</div>
                </el-form-item>
                <el-form-item class="eapp-title">
                    <h4>家庭信息</h4>
                </el-form-item>
                <el-form-item label="父亲姓名:" prop="father" class="mohed">
                    <el-input v-model="ruleForm.father" v-if="showIndex"></el-input>
                    <div v-if ="!showIndex">{{user.father}}</div>
                </el-form-item>
                <el-form-item label="联系电话:" prop="fatherPhone" class="mohed famohed">
                    <el-input v-model="ruleForm.fatherPhone"></el-input>
                </el-form-item>
                <el-form-item label="母亲姓名:" prop="mother" class="mohed">
                    <el-input v-model="ruleForm.mother" v-if="showIndex"></el-input>
                    <div v-if ="!showIndex">{{user.mother}}</div>
                </el-form-item>
                <el-form-item label="联系电话:" prop="motherPhone" class="mohed">
                    <el-input v-model="ruleForm.motherPhone"></el-input>
                </el-form-item>
                <el-form-item label="家庭地址:" class="houdetail" required>
                    <el-col :span="4" class="widad">
                        <el-form-item prop="province">
                            <el-select v-model="ruleForm.province"  placeholder="省" @change="loadArea(ruleForm.province, '1')" v-if="showIndex">
                                <el-option v-for="item in ruleForm2.province" :key="item.code" :label="item.name" :value="item.code">{{item.name}}</el-option>
                            </el-select>
                            <div v-if ="!showIndex">{{user.provinceName}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" class="widad">
                        <el-form-item prop="city">
                            <el-select v-model="ruleForm.city" placeholder="市" @change="loadArea(ruleForm.city, '2')" v-if="showIndex">
                                <el-option v-for="item in ruleForm2.city" :key="item.code" :label="item.name" :value="item.code">{{item.name}}</el-option>
                            </el-select>
                            <div v-if ="!showIndex">{{user.cityName}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" class="widad">
                        <el-form-item prop="county">
                            <el-select v-model="ruleForm.county" placeholder="县" v-if="showIndex">
                                <el-option v-for="item in ruleForm2.county" :key="item.code" :label="item.name" :value="item.code">{{item.name}}</el-option>
                            </el-select>
                            <div v-if ="!showIndex">{{user.countyName}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="widad">
                        <el-form-item prop="address">
                            <el-input type="textarea" v-model="ruleForm.address" v-if="showIndex" placeholder="请输入详细地址"></el-input>
                            <div v-if ="!showIndex">{{user.address}}</div>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item class="eapp-title">
                    <h4>申请材料</h4>
                </el-form-item>
                <el-form-item label="专业:"  class="mohed" prop="addmajor">
                    <el-select v-model="ruleForm.addmajor" placeholder="" v-if="showIndex" @change="featClass()">
                        <el-option v-for="item in addmajors" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
                    </el-select>
                    <div v-if ="!showIndex">{{user.profName}}</div>
                </el-form-item>
                <el-form-item label="特色班:"  class="mohed" prop="featclass" >
                    <el-select v-model="ruleForm.featclass" placeholder="" v-if="showIndex">
                        <el-option v-for="item in featclasss" :key="item.id" :label="item.clazzName" :value="item.id">{{item.clazzName}}</el-option>
                    </el-select>
                    <div v-if ="!showIndex">{{user.clazzName}}</div>
                </el-form-item>
                <el-form-item label="上传附件:"  class="diplo" required>
                    <div v-if="showIndex">
                        <el-upload :action="uploadUrl" list-type="picture-card" 
                            :on-preview="previewg" 
                            :file-list = "graduPhoto"
                            accept=".jpg,.png"
                            :data="filedata1"
                            :limit="10"
                            :on-success="successg"
                            :on-remove="removeg">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <div class="gradPhotos" v-if="!showIndex"><img v-for="item in gradus" :src="item" /></div>
                </el-form-item>
                <el-form-item class="refer">
                    <div class="prompt" v-if="beizhu">备注：可上传毕业证书、户口本、本人页和身份证，最多可上传10个附件</div>
                </el-form-item>
                <el-form-item class="refer">
                    <el-button type="primary" @click="submits('ruleForm')" v-if="showButton">提交</el-button>
                    <el-button type="primary" @click="payUp" v-if="!showButton">下一步</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <!--审查结果弹窗-->
        
        <div class="pending-approval" v-if="PendingApproval">
            <p>五到七天后可进入平台查看审核结果</p>
            <button @click="returnClick">我知道了</button>
        </div> 
        <div class="lackinfo" v-if="lackinfo">
            <p>信息缺失<span>请重新填写</span></p>
        </div>
        <div class="nothrough" v-if="nothrough">
            <img style="cursor: pointer;" src='../../../../assets/img/orientation/nosmile.png'/>
            <p>审核未通过</p>
        </div>
        <!--遮罩层-->
        <div class="desk"  v-if="showDesk"></div>
	</div>
</template>
<script type="text/javascript">
    import api from '../../../../apis/orientation/recruitAdmin.js'
    import userApi from '../../../../apis/userCenter.js'
    import validate from "../../../../validate"
    import commonFile from '../../../../apis/commonFile.js'
    
	export default {
		data () {
			return {
				ruleForm: {
                    name: '',
                    sex:'',
                    nation:'',
                    idcard:'',
                    btdate:'',
                    admit_method:'',
                    student_year:'',
                    student_period:'',
                    graduation:'',
                    testscor:'',
                    political_face:'',
                    account_type:'',
                    birthplace:'',
                    father:'',
                    fatherPhone:'',
                    mother:'',
                    motherPhone:'',
                    // apmajor:'',
                    province:'',
                    city:'',
                    county:'',
                    address:'',
                    featclass:'',
                    addmajor:'',
                },
                ruleForm2: {
                    name: '',
                    sex:'',
                    nation:'',
                    idcard:'',
                    btdate:'',
                    admit_method:'',
                    student_year:'',
                    student_period:'',
                    graduation:'',
                    testscor:'',
                    political_face:'',
                    account_type:'',
                    birthplace:'',
                    father:'',
                    fatherPhone:'',
                    mother:'',
                    motherPhone:'',
                    // apmajor:'',
                    province:'',
                    city:'',
                    county:'',
                    address:'',
                    featclass:'',
                    addmajor:''
                },
                rules: {
                    name: [ {required: true, validator: validate.required, trigger: 'blur' }],
                    sex: [ {required: true, validator: validate.required, trigger: 'change' }],
                    nation: [ {required: true, validator: validate.required, trigger: 'change' }],
                    btdate: [ { required: true,validator: validate.required, trigger: 'change' }],
                    student_period: [ { required: true,validator: validate.required, trigger: 'change' }],
                    graduation: [ { required: true,validator: validate.required, trigger: 'blur' }],
                    political_face: [ { required: true,validator: validate.required, trigger: 'change' }],
                    birthplace: [ { required: true,validator: validate.required, trigger: 'change' }],
                    account_type: [ { required: true,validator: validate.required, trigger: 'change' }],
                    father: [ { required: true,validator: validate.required, trigger: 'blur' }],
                    fatherPhone: [ { required: true,validator: validate.phonevalidate, trigger: 'blur' }],
                    mother: [ { required: true,validator: validate.required, trigger: 'blur' }],
                    motherPhone: [ { required: true,validator: validate.phonevalidate, trigger: 'blur' }],
                    province: [ { required: true,validator: validate.required, trigger: 'change' }],
                    city: [ { required: true,validator: validate.required, trigger: 'change' }],
                    county: [ { required: true,validator: validate.required, trigger: 'change' }],
                    address: [ { required: true,validator: validate.required, trigger: 'blur' }],
                    featclass: [ { required: true,validator: validate.required, trigger: 'change' }],
                    addmajor: [ { required: true,validator: validate.required, trigger: 'change' }],
                },
                sex:[],
                nation:[],
                student_period:[],
                political_face:[],
                admit_method:[],
                account_type:[],
                student_year:[],
                province:[],
                city:[],
                county:[],
                addmajors:[],  //专业
                featclasss:[],   //特色班
                user:{
                    ids:'',
                    name:'',
                    id:'',
                    sexName:'',
                    nationName:'',
                    birthday:'',
                    admitName:'',
                    xzName:'',
                    yingjieName:'',
                    graduateSchool:'',
                    score:'',
                    politicalName:'',
                    hkxzName:'',
                    stuSourceName:'',
                    father:'',
                    mother:'',
                    provinceName:'',
                    cityName:'',
                    countyName:'',
                    address:'',
                    profName:'',
                    clazzName:''
                },
                dialogImageUrl: '',
                dialogVisible: false,
                // 遮罩层
                showDesk:false,
                // 审查结果
                through:false,
                lackinfo:false,
                nothrough:false,
                PendingApproval:false,
                users:{
                    state:''
                },
                filedata1:{filename:'',entity:'User', type:'graduation'},
                uploadUrl:'',
                file_gid:[],    //毕业证照片
                graduPhoto:[],
                showIndex:true,
                showButton:true,
                fileList:[],
                gradus:[],
                beizhu:true
            }
		},
		components:{
			
		},
        methods:{
            back(){
                this.$router.push('/newIndex')
            },
            loadArea(code, type) {
                let params = {code:code}
                api.regionalManag(params).then(response =>{
                    if(response.data.meta.code == 200){
                        if (type == '0') {
                            this.ruleForm2.province = response.data.data;
                            this.ruleForm2.birthplace = response.data.data;
                        } else if (type == '1') {
                            this.ruleForm2.city = response.data.data;
                        } else if (type == '2') {
                            this.ruleForm2.county = response.data.data;
                        }
                    } 
                })
            },
            // 加载专业
            loadProfess(){
                api.loadProfess().then(response => {
                    if(response.data.meta.code == 200){
                        this.addmajors = response.data.data;
                    }
                })
            },
            // 通过专业加载特色班
            featClass(){
                var ftclass = {
                    profId: this.ruleForm.addmajor
                }
                api.getAllFeaClazz(ftclass).then(response => {
                    if(response.data.meta.code == 200){
                        this.featclasss = response.data.data.list;
                    }
                })
            },
            removeg() {
                this.file_gid='';
            },
            previewg(file) {
                let _this= this
                commonFile.getCommonUploadUrl().then(r=>{_this.uploadUrl=r });
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            successg(r, file) {
                let _this= this
                commonFile.getCommonUploadUrl().then(r=>{_this.uploadUrl=r });
                this.file_gid.push(r.data.id);
            },
            // 一进页面判断是否有此学生身份证号
            loadFirst(){
                var id = this.$Cookies.get("idcard");
                var stuId = {
                    idcard: id
                }
                api.getStuByIdOrIdCard(stuId).then(response =>{
                    var meta = response.data.meta
                    var mydata = response.data.data;
                    if(meta.code == 200){
                        if (mydata !== null) {
                            if(mydata.state == 1){
                                this.PendingApproval=true;
                                this.showDesk=true;
                                this.showIndex = false;
                            }else if(mydata.state == 2){
                                this.showIndex = false;
                                this.showButton = false;
                                this.beizhu = false;
                            }else if(mydata.state == 4){
                                this.nothrough=true;
                                this.showDesk=true;
                                this.showIndex = false;
                            }else{
                                this.lackinfo = true;
                                this.showDesk = true;
                                var _this = this;
                                setTimeout(function(){ 
                                    _this.lackinfo = false;
                                    _this.showDesk = false;
                                },3000); 
                            }
                            this.user.ids = mydata.id;
                            this.$Cookies.set("idcard", mydata.id);
                    
                            this.ruleForm.name = mydata.name;
                            this.user.name = mydata.name;

                            this.ruleForm.sex = mydata.sexName;
                            this.user.sexName = mydata.sexName;

                            this.ruleForm.nation = mydata.nationName;
                            this.user.nationName = mydata.nationName;

                            this.ruleForm.btdate = mydata.birthday;
                            this.user.birthday = mydata.birthday;

                            this.ruleForm.admit_method = mydata.admitName;
                            this.user.admitName = mydata.admitName;

                            this.ruleForm.student_year = mydata.xzName;
                            this.user.xzName = mydata.xzName;

                            this.ruleForm.student_period = mydata.yingjieName;
                            this.user.yingjieName = mydata.yingjieName;

                            this.ruleForm.graduation = mydata.graduateSchool;
                            this.user.graduateSchool = mydata.graduateSchool;

                            this.ruleForm.testscor = mydata.score;
                            this.user.score = mydata.score;

                            this.ruleForm.political_face = mydata.politicalName;
                            this.user.politicalName = mydata.politicalName;

                            this.ruleForm.account_type = mydata.hkxzName;
                            this.user.hkxzName = mydata.hkxzName;

                            this.ruleForm.birthplace = mydata.stuSourceName;
                            this.user.stuSourceName = mydata.stuSourceName;

                            this.ruleForm.father = mydata.father;
                            this.user.father = mydata.father;

                            this.ruleForm.fatherPhone = mydata.fatherPhone;

                            this.ruleForm.father = mydata.father;
                            this.user.father = mydata.father;

                            this.ruleForm.mother = mydata.mother;
                            this.user.mother = mydata.mother;

                            this.ruleForm.motherPhone = mydata.motherPhone;

                            this.ruleForm.province = mydata.provinceName;
                            this.user.provinceName = mydata.provinceName;

                            this.ruleForm.city = mydata.cityName;
                            this.user.cityName = mydata.cityName;

                            this.ruleForm.county = mydata.countyName;
                            this.user.countyName = mydata.countyName;
                            
                            this.ruleForm.address = mydata.address;
                            this.user.address = mydata.address;

                            this.ruleForm.addmajor = mydata.profName;
                            this.user.profName = mydata.profName;

                            this.ruleForm.featclass = mydata.clazzName;
                            this.user.clazzName = mydata.clazzName;
                            
                            this.gradus = [];
                            var pict = mydata.attachment.split('@')
                            let _this=this
                            for(var i=0;i<pict.length;i++){
                                // let url=""
                                commonFile.getDownloadOnceUrl(pict[i]).then(r=>{
                                    _this.gradus.push(r);
                                })
                                
                            }
                        }
                    }
                })
            },
            getDict(p) {//一进页面加载
                let params = {
                    type : p
                }
                api.getDictMapList(params).then(response =>{
                    if(response.data.meta.code == 200){
                        if (p == 'sex') {
                            this.ruleForm2.sex = response.data.data;
                        }else if (p == 'nation') {
                            this.ruleForm2.nation = response.data.data;
                        }else if (p == 'student_period') {
                            this.ruleForm2.student_period = response.data.data;
                        }else if (p == 'political_face') {
                            this.ruleForm2.political_face = response.data.data;
                        }else if (p == 'admit_method') {
                            this.ruleForm2.admit_method = response.data.data;
                        }else if (p == 'account_type') {
                            this.ruleForm2.account_type = response.data.data;
                        }else if (p == 'student_year') {
                            this.ruleForm2.student_year = response.data.data;
                        }
                    }
                })
            },
            // 点击提交入学申请
            submits(formName){
                // 表单验证
                this.$refs[formName].validate((valid) => {
                    if (valid && this.file_gid) {

                        this.PendingApproval=true;
                        this.showDesk=true;
                        
                        var arrStr = this.file_gid.join('@');

                        var formdata = new FormData()
                        formdata.append('name', this.ruleForm.name);
                        formdata.append('sexId', this.ruleForm.sex);
                        formdata.append('nationId', this.ruleForm.nation);
                        formdata.append('idcard', this.user.id);
                        formdata.append('birthday', this.ruleForm.btdate);
                        formdata.append('admitId', this.ruleForm.admit_method);
                        formdata.append('xzId', this.ruleForm.student_year);
                        formdata.append('yingjieId', this.ruleForm.student_period);
                        formdata.append('graduateSchool', this.ruleForm.graduation);
                        formdata.append('score', this.ruleForm.testscor);
                        formdata.append('politicalId', this.ruleForm.political_face);
                        formdata.append('hkxzId', this.ruleForm.account_type);
                        formdata.append('stuSourceId', this.ruleForm.birthplace);
                        formdata.append('father', this.ruleForm.father);
                        formdata.append('fatherPhone', this.ruleForm.fatherPhone);
                        formdata.append('mother', this.ruleForm.mother);
                        formdata.append('motherPhone', this.ruleForm.motherPhone);
                        formdata.append('provinceId', this.ruleForm.province);
                        formdata.append('cityId', this.ruleForm.city);
                        formdata.append('countyId', this.ruleForm.county);
                        formdata.append('address', this.ruleForm.address);
                        formdata.append('profId', this.ruleForm.addmajor);
                        formdata.append('clazzId', this.ruleForm.featclass);
                        formdata.append('attachment', arrStr);

                        api.submitstuApply(formdata).then(response => {
                            if(response.data.meta.code == 200){
                                
                            }
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: '请完善信息',
                            type: 'error'
                        });
                        return false;
                    }
                })
            },
            // 点击缴费
            payUp(){
                this.$router.push({
                    name:'payBusiness',
                })
            },
            returnClick(){
                this.$router.go(-1);
            }
        },
        computed:{
        
        },
        mounted () {
            let _this= this
            commonFile.getCommonUploadUrl().then(r=>{_this.uploadUrl=r });
            this.loadFirst();
            this.loadProfess();
            this.getDict('sex');
            this.getDict('nation');
            this.getDict('student_period');
            this.getDict('political_face');
            this.getDict('admit_method');
            this.getDict('account_type');
            this.getDict('student_year');
            this.loadArea('', '0');
            this.user.id = this.$Cookies.get("idcard");
        }
        
	}
</script>
<style type="text/css" lang="scss" scoped>
        .navigation{
            .el-menu{
                background-color:#208af5;
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
                font-weight: bold;;
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
        }
        // 顶部标签
        .table-box{
            width:1200px;
            margin: 0 auto;
            .tabtop{
                height: 55px;
                margin-top: 7px;
                background-color: #fff;
                border-radius: 4px;
                padding: 0 24px;
                .tableft{
                    float: left;
                    line-height: 55px;
                    color:#208af5;
                    font-size:16px;
                    border-bottom:2px solid #208af5;
                }
                .tabright{
                    float: right;
                    margin-top: 7px;
                    cursor: pointer;
                    overflow: hidden;
                    margin-top: 18px;
                    span{
                        display: inline-block;
                    }
                    i{	
                        width: 9px;
                        height: 15px;
                        display: inline-block;
                        float: right;
                        margin-left: 6px;
                        margin-top: 2px;
                    }
                }
            }
        }
        .eapply-main{
            width:1200px;
            margin: 0 auto;
			margin-top: 20px;
            min-height: 740px;
            background-color: #fff;
            padding: 18px 22px;
            overflow: hidden;
            border-radius: 4px;
            .el-form{
                .el-form-item{
                    float: left;
                    width: 26%;
                    margin-right: 36px;
                   .el-select{
                       width:100%;
                   }
                    .el-form-item__label{
                        text-align: left;
                    }
                }
                .mohed{
                    height:35px;
                }
                .famohed{
                    margin-right: 200px;
                }
                .short{
                    width: 20%;
                }
                h4{
                    font-size: 16px;
                    margin-top: 8px;
                }
                .houdetail{
                    width: 100%;
                    .widad{
                        .el-form-item{
                            width:100%;
                        }
                    }
                    .el-select{
                        width:92%;
                    }
                    .el-textarea{
                        margin-top: 22px;
                    }
                    .el-col-4{
                        margin-right: 15px;
                    }
                    .el-input, .el-input__inner{
                        width: 96%;
                    }
                    .el-col-12{
                        width:51.5%;
                    }
                }
                
                .diplo{
                    width: 100%;
                }
                
                .idcar{
                    width:100%;
                    .positive{float: left;margin-right: 60px;text-align: center;}
                    .contrary{float: left;text-align: center;}
                }
                .refer{
                    text-align: center;
                    width: 100%;
                    button{
                        width: 160px;
                        height: 40px;
                    }
                }
                .validat{
                    h4{float: left;}
                    div{height:22px;}
                    .auditsit{
                        margin-top: 13px;
                        float: left;
                        margin-left: 8px;
                    }
                }
                .prompt{
                    text-align: left;
                    color:#ef0000;
                }
                .el-date-editor.el-input, .el-date-editor.el-input__inner{
                    width:214px;
                }
            }
        }
        // 审查结果弹窗

        .through{
            color:#91c604;
            i{
                font-size: 22px;
                margin-left: 10px;
                text-decoration: underline;
                cursor: pointer;
            }
        }
        .pending-approval{
            text-align:center;
            button{
                width:82px;
                height:30px;
                border-radius: 4px;
                color:#fff;
                background-color: #208af5;
                border-color: #208af5;
            }
            p{
                margin-top: 90px;
                margin-bottom: 46px;
            }
        }
        .lackinfo{
            color:#efb551;
            line-height:222px;
        }
        .nothrough{
            color:#208af5;
            img{
                margin-top: 54px;
                margin-bottom: 25px;
            }
        }
        .through,.pending-approval,.lackinfo,.nothrough{
            width: 400px;
            height: 222px;
            // line-height:222px;
            z-index: 2;
            position: fixed;
			top: 50%;
			left: 50%;
			transform:translate(-50%,-50%);
            background-color: #fff;
            border-radius: 6px;
            text-align: center;
            font-size: 18px;
        }
        .desk{
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1 !important;
        }
</style>
<style type="text/css" lang="scss">
    .eapply-main{
        .eapp-title{
            width: 100% !important;
            .el-form-item__content{
                margin-left: 0 !important;
            }
        }
        .gradPhoto{
            img{
                width: 200px;
            }
        }
        .gradPhotos{
            overflow: hidden;
            img{
                float: left;
                width: 200px;
                margin-right:20px;
            }
        }
        .el-upload--picture-card{
            background-color:#e4f2ff;
            width: 160px;
            height: 80px;
            line-height: 80px;
            border: 0;
            i{
                color: #208af5;
            }
        }
    }
</style>