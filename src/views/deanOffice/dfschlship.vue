<template>
  <div class="dfschlship">
        <!-- 筛查条件及添加 -->
        <div class="dfschlship-title clearfix">
            <div class="schl add clearfix" @click="postDfschAdd">
                <i></i>
                <span>添加奖学金</span>
            </div>
            <div class="schl print clearfix">
                <i></i>
                <span>打印</span>
            </div>
            <div class="schl export clearfix">
                <i></i>
                <span>导出</span>
            </div>
            <div class="schl export clearfix">
                <i></i>
                <span>导进</span>
            </div>
            <div class="schl download clearfix">
                <i></i>
                <span>下载模板</span>
            </div>
            <div class="schl">
                <label>校区</label>
                <el-select v-model="campsel.value" clearable @change="getDepart">
                    <el-option v-for="item in campsel.options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="schl">
                <label>院系</label>
                <el-select v-model="departsel.value" clearable @change="getMajor">
                    <el-option v-for="item in departsel.options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="schl">
                <label>专业</label>
                <el-select v-model="majorsel.value" clearable @change="getDfschlshipList">
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
                <el-select v-model="classsel.value" clearable @change="getDfschlshipList">
                    <el-option v-for="item in classsel.options" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid">
                    </el-option>
                </el-select>
            </div>
            <div class="schl">
                <label>学期</label>
                <el-select v-model="termsel.value" clearable @change="getDfschlshipList">
                    <el-option v-for="item in termsel.options" :key="item.termId" :label="item.term" :value="item.termId">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!-- 奖学金添加弹框 -->
        <el-dialog title="添加奖学金" :visible.sync="dialogFormVisible">
            <el-form ref="form" :rules="rules" :model="form" :label-width="formLabelWidth">
                <el-form-item label="校区：" prop="beSupportSchoolZone" >
                    <el-select v-model="form.beSupportSchoolZone" @change="getDep">
                        <el-option v-for="item in campsel.options" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="院系：" prop="beSupportDepartment">
                    <el-select v-model="form.beSupportDepartment" @change="getMaj">
                        <el-option v-for="item in departs" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业：" prop="beSupportMajor">
                    <el-select v-model="form.beSupportMajor">
                        <el-option v-for="item in majors" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级：" prop="grade" >
                    <el-select v-model="form.grade" @change="getCla">
                        <el-option v-for="item in gradesel.options" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级：" prop="beSupportClass">
                    <el-select v-model="form.beSupportClass" @change="classQueryStu">
                        <el-option v-for="item in classs" :label="item.clazzname" :value="item.clazzid" :key="item.clazzid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名：" prop="beSupportUser">
                    <el-select v-model="form.beSupportUser">
                        <el-option v-for="item in stunames" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学期：" prop="term">
                    <el-select v-model="form.term">
                        <el-option v-for="item in termsel.options" :label="item.term" :value="item.termId" :key="item.termId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金额：" prop="money">
                    <el-input v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item label="奖学金等级：" prop="rank">
                    <el-select v-model="form.rank">
                        <el-option v-for="item in ranksel" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="奖学金时间：" prop="scholarshipTime">
                    <el-date-picker v-model="form.scholarshipTime" type="datetime">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="奖学金原因：" prop="reason">
                    <el-input type="textarea" resize="none" v-model="form.reason"></el-input>
                </el-form-item>
                <el-form-item label="上传附件：">
                    <el-upload class="upload-demo" :action="uploadUrl" multiple :limit="6" :on-success="success"  :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传xls、xlsx格式，且不超过10MB</div> -->
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirm('form')">提交</el-button>
            </div>
        </el-dialog>
        <!-- 奖学金详情弹框 -->
        <el-dialog title="奖学金详情" :visible.sync="dialogDetailVisible">
            <el-form :label-width="detailLabelWidth">
                <el-form-item label="校区：">
                    <span>{{form.beSupportSchoolZone}}</span>
                </el-form-item>
                <el-form-item label="院系：">
                    <span>{{form.beSupportDepartment}}</span>
                </el-form-item>
                <el-form-item label="专业：">
                    <span>{{form.beSupportMajor}}</span>
                </el-form-item>
                <el-form-item label="年级：">
                    <span>{{form.grade}}</span>
                </el-form-item>
                <el-form-item label="班级：">
                    <span>{{form.beSupportClass}}</span>
                </el-form-item>
                <el-form-item label="姓名：">
                    <span>{{form.beSupportUser}}</span>
                </el-form-item>
                <el-form-item label="学期：">
                    <span>{{form.term}}</span>
                </el-form-item>
                <el-form-item label="金额：">
                    <span>{{form.money}}</span>
                </el-form-item>
                <el-form-item label="奖学金等级：">
                    <span>{{form.rank}}</span>
                </el-form-item>
                <el-form-item label="奖学金时间：">
                    <span>{{form.scholarshipTime}}</span>
                </el-form-item>
                <el-form-item label="奖学金原因：">
                    <span>{{form.reason}}</span>
                </el-form-item>
                <el-form-item label="上传附件：">
                    <span>{{files}}</span>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--列表  -->
        <el-table stripe :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="beSupportName" label="姓名">
            </el-table-column>
            <!-- <el-table-column prop="supportStartTime" label="性别">
            </el-table-column> -->
            <el-table-column prop="beSupportSchoolZoneName" label="校区" width="110">
                <template slot-scope="scope">
                    {{scope.row.beSupportSchoolZoneName.length>5?scope.row.beSupportSchoolZoneName.substring(0,5)+"...":scope.row.beSupportSchoolZoneName}}
                </template>
            </el-table-column>
            <el-table-column prop="beSupportDepartmentName" label="院系" width="110">
                <template slot-scope="scope">
                    {{scope.row.beSupportDepartmentName.length>5?scope.row.beSupportDepartmentName.substring(0,5)+"...":scope.row.beSupportDepartmentName}}
                </template>
            </el-table-column>
            <el-table-column prop="beSupportMajorName" label="专业" width="110">
                <template slot-scope="scope">
                    {{scope.row.beSupportMajorName.length>5?scope.row.beSupportMajorName.substring(0,5)+"...":scope.row.beSupportMajorName}}
                </template>
            </el-table-column>
            <el-table-column prop="gradeName" label="年级" width="110">
            </el-table-column>
            <el-table-column prop="beSupportClassName" label="班级">
                <template slot-scope="scope">
                    {{scope.row.beSupportClassName.length>5?scope.row.beSupportClassName.substring(0,5)+"...":scope.row.beSupportClassName}}
                </template>
            </el-table-column>
            <el-table-column prop="term" label="奖学金学期" width="140">
            </el-table-column>
            <el-table-column prop="money" label="奖学金金额" width="110">
            </el-table-column>
            <el-table-column label="奖学金等级" width="110">
                <template slot-scope="scope">
                    <span v-if="scope.row.rank == 1">一等奖学金</span>
                    <span v-else-if="scope.row.rank == 2">二等奖学金</span>
                    <span v-else-if="scope.row.rank == 3">三等奖学金</span>			           	  
                </template>
            </el-table-column>
            <el-table-column label="奖学金原因" width="100">
                <template slot-scope="scope">
                    {{scope.row.reason.length>5?scope.row.reason.substring(0,5)+"...":scope.row.reason}}
                </template>
            </el-table-column>
            <el-table-column prop="scholarshipTime" label="奖学金时间" width="158">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope"> 
                    <el-button class="btn" @click="postDfschDetail(scope.row)" plain>详情</el-button>  
                    <el-button class="btn" @click="postDfschMod(scope.row)" type="primary" plain>修改</el-button>
                    <el-button class="btn" @click="postDfschDel(scope.row)" type="danger" plain>删除</el-button>  	 
                </template>
            </el-table-column>
        </el-table> 
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-size="10" layout="prev, pager, next, jumper" :total="total" style="text-align:center;" class="toolbar">
        </el-pagination>
  </div>
</template>
<script>
    import api from '../../apis/fund.js'
    import com from '../../apis/common.js'
    import file from '../../apis/commonFile.js'
    import util from '../../common/js/util.js'
    const qs = require('querystring')
    export default {
        data(){
            return{
                // 校区
                campsel:{
                    options: [],
                    value: '',
                },
                camps:[{
                    value:'',
                    label:''
                }],
                // 院系
                departsel:{
                    options: [],
                    value: '',
                },
                departs:[{
                    value:'',
                    label:''
                }],
                // 专业
                majorsel:{
                    options: [],
                    value: '',
                },
                majors:[{
                    value:'',
                    label:''
                }],
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
                classs:[{
                    value:'',
                    label:''
                }],
                // 学生姓名
                stunames:[{
                    value:'',
                    label:''
                }],
                // 学期
                termsel:{
                    options: [],
                    value: '',
                },
                // 奖学金等级
                ranksel:[{
                    value:'',
                    label:''
                }],
                // 列表
                tableData: [],
                loading: false,
                currentPage: 1,
                total:0,
                form:{
                    id:'',
                    beSupportSchoolZone:'',
                    beSupportDepartment: '',
                    beSupportMajor: '',
                    grade:'',
                    beSupportClass: '',
                    beSupportUser:'',
                    term:'',
                    money: '',
                    rank: '',
                    scholarshipTime: '',
                    reason:'',
                },
                rules: {
                    beSupportSchoolZone: [
                        { required: true, message: '请选择校区', trigger: 'change' }
                    ],
                    beSupportDepartment: [
                        { required: true, message: '请选择院系', trigger: 'change' }
                    ],
                    beSupportMajor: [
                        { required: true, message: '请选择专业', trigger: 'change' }
                    ],
                    grade: [
                        { required: true, message: '请选择年级', trigger: 'change' }
                    ],
                    beSupportClass: [
                        { required: true, message: '请选择班级', trigger: 'change' }
                    ],
                    beSupportUser: [
                        { required: true, message: '请选择姓名', trigger: 'change' }
                    ],
                    term: [
                        { required: true, message: '请选择申请学期', trigger: 'change' }
                    ],
                    money: [
                        { required: true, message: '请输入金额', trigger: 'change' }
                    ],
                    rank: [
                        { required: true, message: '请选择奖学金等级', trigger: 'change' }
                    ],
                    scholarshipTime: [
                        { type: 'date', required: true, message: '请选择奖学金时间', trigger: 'change' }
                    ],
                    reason: [
                        { required: true, message: '请输入奖学金原因', trigger: 'change' }
                    ]
                },
                // 弹框
                dialogFormVisible: false,
                formLabelWidth: '121px',
                dialogDetailVisible:false,
                detailLabelWidth: '118px',
                // 上传模板
                fileList: [],
                fileid:'',
                filename:'',
                uploadUrl:'',
                files:[]
            }
        },
        methods: {
            clearform(){
                this.form.id = '';
                this.form.beSupportSchoolZone = '';
                this.form.beSupportDepartment = '';
                this.form.beSupportMajor = '';
                this.form.grade = '';
                this.form.beSupportClass = '';
                this.form.beSupportUser = '';
                this.form.term = '';
                this.form.money = '';
                this.form.rank = '';
                this.form.scholarshipTime = '';
                this.form.reason = '';
                this.fileList = []
            },
            // 获取校区
            getCampus(){
                com.getCampus().then(r => {
                    if(r.data.meta.code ==  '200'){
                        this.campsel.options = r.data.data;
                        this.getDfschlshipList();
                    }
                })
            },
            getCam(){
                com.getCampus().then(r => {
                    if(r.data.meta.code ==  '200'){
                        this.camps = r.data.data;
                    }
                })
            },
            // 获取学期
            getTerm(){
                com.getTerm().then(r=>{
                    if(r.data.meta.code ==  '200'){
                        this.termsel.options = r.data.data
                    }
                })
            },
            // 获取院系
            getDepart(){
                let data={
                    'ssid':this.campsel.value,
                }
                com.departQueryCamp(data).then(r=>{
                    
                    if(r.data.meta.code ==  '200'){
                        this.departsel.options = r.data.data;
                        this.getDfschlshipList();
                    }
                })
            },
            getDep(){
                let data={
                    'ssid':this.form.beSupportSchoolZone,
                }
                com.departQueryCamp(data).then(r=>{
                    
                    if(r.data.meta.code ==  '200'){
                        this.departs = r.data.data;
                    }
                })
            },
            // 通过院系获取专业
            getMajor(){
                let data={
                    'deptId':this.departsel.value
                }
                com.majorQueryDepart(data).then(r=>{
                    if(r.data.meta.code ==  '200'){
                        this.majorsel.options = r.data.data;
                        this.getDfschlshipList();
                    }
                })
            },
            getMaj(){
                let data={
                    'deptId':this.form.beSupportDepartment
                }
                com.majorQueryDepart(data).then(r=>{
                    if(r.data.meta.code ==  '200'){
                        this.majors = r.data.data;
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
                        this.getDfschlshipList();
                    }
                })
            },
            getCla(){
                let data={
                    'proid':this.form.beSupportMajor,
                    'gradeid':this.form.grade 
                }
                com.classQueryMajor(data).then(r=>{
                    
                    if(r.data.meta.code ==  '200'){
                        this.classs = r.data.data;
                    }
                })
            },
            // 通过班级查询学生
            classQueryStu(){
                let data={
                    'clazzid':this.form.beSupportClass
                }
                com.classQueryStu(data).then(r=>{
                    if(r.data.meta.code ==  '200'){
                        this.stunames = r.data.data;
                    }
                })
            },
            // 获取奖学金等级
            getRank(){
                com.getRank().then(r=>{
                    if(r.data.meta.code ==  '200'){
                        this.ranksel = r.data.data;
                    }
                })
            },
            // 获取教务奖学金列表
            getDfschlshipList(){
                this.loading = true;
                let para={
                    beSupportSchoolZone:this.campsel.value,
                    beSupportDepartment:this.departsel.value,
                    beSupportMajor:this.majorsel.value,
                    gradeId:this.gradesel.value,
                    beSupportClass:this.classsel.value,
                    termId:this.termsel.value
                }
                api.getDfschlshipList(para).then(r=>{
                    if(r.data.meta.code ==  '200'){
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
            // 添加
            postDfschAdd(){
                this.dialogFormVisible = true;
                this.clearform();
            },
            // 修改
            postDfschMod(row){
                this.form.id = row.id;
                this.form.beSupportSchoolZone = row.beSupportSchoolZone;
                this.form.beSupportDepartment = row.beSupportDepartment;
                this.form.beSupportMajor = row.beSupportMajor;
                this.form.grade = row.gradeId;
                this.form.beSupportClass = row.beSupportClass;
                this.form.beSupportUser = row.beSupportUserId;
                this.form.term = row.termId;
                this.form.money = row.money;
                this.form.rank = row.rank;
                this.form.scholarshipTime = new Date(row.scholarshipTime);
                this.form.reason = row.reason;
                this.fileList = [{}];
                this.dialogFormVisible = true;
                this.getDep();
                this.getMaj();
                this.getCla();
                this.classQueryStu();
            },
            // 详情
            postDfschDetail(row){
                this.form.id = row.id;
                this.form.beSupportSchoolZone = row.beSupportSchoolZoneName;
                this.form.beSupportDepartment = row.beSupportDepartmentName;
                this.form.beSupportMajor = row.beSupportMajorName;
                this.form.grade = row.gradeName;
                this.form.beSupportClass = row.beSupportClassName;
                this.form.beSupportUser = row.beSupportName;
                this.form.term = row.term;
                this.form.money = row.money;
                this.form.rank = row.rankName;
                this.form.scholarshipTime = row.scholarshipTime;
                this.form.reason = row.reason;
                this.fileList = [{}];
                this.dialogDetailVisible = true;
            },
            // 删除
            postDfschDel(row){
                let para = {
                    id : row.id
                }
                let datad = qs.stringify(para);
                this.$confirm('确认删除吗？', '提示', {}).then(() => {
                    api.postDfschlshipDel(datad).then(r=>{
                        var data = r.data;
                        if(data.meta.code = 200){
                            this.getDfschlshipList();
                        }
                    })
                }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消删除'
                    });          
                });
            },
            // 弹框
            confirm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data={
                            beSupportSchoolZone:this.form.beSupportSchoolZone,
                            beSupportDepartment:this.form.beSupportDepartment,
                            beSupportMajor:this.form.beSupportMajor,
                            beSupportClass:this.form.beSupportClass,
                            termId:this.form.term,
                            gradeId:this.form.grade,
                            beSupportUserId:this.form.beSupportUser,
                            money:this.form.money,
                            rank:this.form.rank,
                            scholarshipTime:util.formatDate.format(this.form.scholarshipTime,'yyyy-MM-dd hh:mm:ss'),
                            reason:this.form.reason,
                            applyFile:JSON.stringify(this.files)
                        }
                        let datas = qs.stringify(data);
                        if(!this.form.id){
                            // 添加
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                api.postDfschlshipAdd(datas).then(r=>{
                                    if(!r){
                                        return false;
                                    }
                                    if(r.data.meta.code == '200'){
                                        this.$message({
                                            message: '提交成功',
                                            type: 'success'
                                        });
                                    }
                                    this.dialogFormVisible = false;
                                    this.getDfschlshipList();
                                    
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '取消提交'
                                });          
                            });
                        }else{
                            // 修改
                            data.id = this.form.id
                            let datam = qs.stringify(data);
                            this.$confirm('确认修改吗？', '提示', {}).then(() => {
                                api.postDfschlshipMod(datam).then(r =>{
                                    if(r.data.meta.code=='200'){
                                        this.$message({
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                    }
                                    this.dialogFormVisible = false;
                                    this.getDfschlshipList();
                                })
                                
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '取消修改'
                                });          
                            });
                        }
                        
                    } else {
                        return false;
                    }
                });
            },
            success(response, file, fileList){
                this.fileid = response.data.id;
                this.filename = response.data.oldname;
                this.files.push({id:this.fileid,name:this.filename})
            },

        },
        mounted () {
            // 获取校区
            this.getCampus();
            this.getCam();
            // 获取所有年级
            this.getAllGrade();
            // 获取学期
            this.getTerm();
            // 获取奖学金等级
            this.getRank();
            // 获取教务奖学金列表
            this.getDfschlshipList();
            // 上传模板
            let _this = this;
            _this.uploadUrl = file.getFileUploadUrl();
            setInterval(function(){
                _this.uploadUrl = file.getFileUploadUrl();
                }, 4 * 60000
            );
        }
    }
</script>
<style lang="scss" scoped>
.dfschlship{
    padding-left: 8px;
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
            width:133px;
        }
    }
    .schl:last-child{
        margin-right:0;
    }
    .print{
        margin-top:11px;
        cursor:pointer;
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
    .download{
        margin-top:11px;
        cursor:pointer;
        i{
            background:url("../../assets/img/deanfund/download.png") 0 0 no-repeat;
        }
    }
    .btn{
        padding:5px 10px;
    }
    // 分页
    .toolbar{
        margin-top:20px;
    }
    .el-input{
        width:25.4%;
    }
    .el-textarea{
        width:25.4%;
    }
}
</style>


