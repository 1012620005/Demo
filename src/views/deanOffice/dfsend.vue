<template>
  <div class="dfsend">
    <!-- 上 -->
    <!-- <div class="dfsend-title clearfix" @click="postDfsendAdd">
        <i></i>
        <span>添加助学金</span>
    </div> -->
    <!-- 筛查条件及添加 -->
    <div class="dfsend-title clearfix">
        <div class="schl add clearfix" @click="postDfsendAdd">
            <i></i>
            <span>添加助学金</span>
        </div>
        <!-- <div class="schl print clearfix">
            <i></i>
            <span>打印</span>
        </div> -->
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
        <!-- <div class="schl">
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
        </div> -->
        <div class="schl">
            <label>专业类</label>
            <el-select v-model="classifysel.value" clearable @change="getDfsendList">
                <el-option v-for="item in classifysel.options" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="schl">
            <label>专业</label>
            <el-select v-model="majorsel.value" clearable @change="getDfsendList">
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
            <el-select v-model="classsel.value" clearable @change="getDfsendList">
                <el-option v-for="item in classsel.options" :key="item.clazzid" :label="item.clazzname" :value="item.clazzid">
                </el-option>
            </el-select>
        </div>
        <div class="schl">
            <label>学期</label>
            <el-select v-model="termsel.value" clearable @change="getDfsendList">
                <el-option v-for="item in termsel.options" :key="item.termId" :label="item.term" :value="item.termId">
                </el-option>
            </el-select>
        </div>
    </div>
    <!--添加助学金弹框 -->
    <el-dialog title="添加助学金" :visible.sync="dialogFormVisible">
        <el-form ref="form" :rules="rules" :model="form" :label-width="formLabelWidth">
            <!-- <el-form-item label="资助类型：" prop="type">
                <el-select v-model="form.type">
                    <el-option v-for="item in stutypesel" :label="item.value" :value="item.label" :key="item.value"></el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="申请学期：" prop="term">
                <el-select v-model="form.term">
                    <el-option v-for="item in termsel" :label="item.term" :value="item.termId" :key="item.termId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请开始时间：" prop="startTime">
                <el-date-picker v-model="form.startTime" type="datetime">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="申请结束时间：" prop="endTime">
                <el-date-picker v-model="form.endTime" type="datetime">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="助学金说明：" prop="reason">
                <el-input type="textarea" resize="none" v-model="form.reason"></el-input>
            </el-form-item>
            <el-form-item label="上传模板：">
                <el-upload class="upload-demo" :action="uploadUrl" :beforeUpload="beforeAvatarUpload"
                multiple :limit="6" 
                :on-exceed="handleExceed" :on-success="success"  :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传xls、xlsx格式，且不超过10MB</div>
                </el-upload>
            </el-form-item>-->
            <el-form-item label="学号：" prop="stuid">
                <el-input v-model="form.stuid" @blur="getStuInfo"></el-input>
            </el-form-item>
            <el-form-item label="学期：" prop="term">
                <span>{{form.term}}</span>
            </el-form-item>
            <el-form-item label="年级：" prop="grade">
                <span>{{form.grade}}</span>
            </el-form-item>
            <el-form-item label="专业类：" prop="classify">
                <span>{{form.classify}}</span>
            </el-form-item> 
            <el-form-item label="专业：" prop="major">
                <span>{{form.major}}</span>
            </el-form-item> 
            <el-form-item label="班级：" prop="class">
                <span>{{form.class}}</span>
            </el-form-item> 
            <el-form-item label="姓名：" prop="name">
                <span>{{form.name}}</span>
            </el-form-item> 
            <!-- <el-form-item label="班主任：" prop="counselor">
                <span>{{form.counselor}}</span>
            </el-form-item>  -->
            <el-form-item label="助学金金额：" prop="money">
                <el-input v-model="form.money"></el-input>
            </el-form-item>
            <el-form-item label="助学金来源：" prop="source">
                <el-input v-model="form.source"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="note">
                <el-input :row="3" type="textarea" resize="none" v-model="form.note"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm('form')">提交</el-button>
        </div>
    </el-dialog>
    <!-- 助学金详情弹框 -->
    <el-dialog title="助学金详情" :visible.sync="dialogDetailVisible">
        <el-form :label-width="detailLabelWidth">
            <el-form-item label="学号：">
                <span>{{form.stuid}}</span>
            </el-form-item>
            <el-form-item label="学期：">
                <span>{{form.term}}</span>
            </el-form-item>
            <el-form-item label="年级：">
                <span>{{form.grade}}</span>
            </el-form-item>
            <el-form-item label="专业类：">
                <span>{{form.classify}}</span>
            </el-form-item>
            <el-form-item label="专业：">
                <span>{{form.major}}</span>
            </el-form-item>
            <el-form-item label="班级：">
                <span>{{form.class}}</span>
            </el-form-item>
            <el-form-item label="姓名：">
                <span>{{form.name}}</span>
            </el-form-item>
            <el-form-item label="助学金金额：">
                <span>{{form.money}}</span>
            </el-form-item>
            <el-form-item label="助学金来源：">
                <span>{{form.source}}</span>
            </el-form-item>
            <el-form-item label="备注：">
                <span>{{form.note}}</span>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!--列表  -->
    <el-table stripe :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="stuNo" label="学号" width="180">
        </el-table-column>
        <el-table-column prop="stuName" label="姓名">
        </el-table-column>
        <el-table-column prop="clazzify" label="专业类" width="110">
            <template slot-scope="scope">
                <span v-if="scope.row.clazzify!=null">
                    {{scope.row.clazzify.length>5?scope.row.clazzify.substring(0,5)+"...":scope.row.clazzify}}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="major" label="专业" width="110">
            <template slot-scope="scope">
                <span v-if="scope.row.major!=null">
                    {{scope.row.major.length>5?scope.row.major.substring(0,5)+"...":scope.row.major}}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="grade" label="年级" width="100">
        </el-table-column>
        <el-table-column prop="clazz" label="班级" width="110">
            <template slot-scope="scope">
                <span v-if="scope.row.clazz!=null">
                    {{scope.row.clazz.length>5?scope.row.clazz.substring(0,5)+"...":scope.row.clazz}}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="termId" label="学期" width="110">
            <template slot-scope="scope">
                <span v-if="scope.row.termId!=null">
                    {{scope.row.termId.length>5?scope.row.termId.substring(0,5)+"...":scope.row.termId}}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="supportMoney" label="助学金金额" width="110">
        </el-table-column>
        <el-table-column prop="supportSource" label="助学金来源" width="110">
            <template slot-scope="scope">
                <span v-if="scope.row.supportSource!=null">
                    {{scope.row.supportSource.length>5?scope.row.supportSource.substring(0,5)+"...":scope.row.supportSource}}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="110">
            <template slot-scope="scope">
                <span v-if="scope.row.remarks!=null">
                    {{scope.row.remarks.length>5?scope.row.remarks.substring(0,5)+"...":scope.row.remarks}}
                </span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
            <template slot-scope="scope"> 
                 <el-button class="btn" @click="postDfsendDetail(scope.row)" plain>详情</el-button>  
                <el-button class="btn" @click="postDfsendModify(scope.row)" type="primary" plain>修改</el-button>
                <el-button class="btn" @click="postDfsendDel(scope.row)" type="danger" plain>删除</el-button>  	 
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
    // import file from '../../apis/commonFile.js'
    // import util from '../../common/js/util.js'
    const qs = require('querystring')
    export default {
        data(){
            return {
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
                form: {
                    id:'',
                    classify:'',
                    classifyid:'',
                    major:'',
                    majorid:'',
                    grade: '',
                    gradeid:'',
                    class: '',
                    classid:'',
                    term: '',
                    name:'',
                    counselor:'',
                    stuid:'',
                    money:'',
                    source: '',
                    note: '',
                },
                rules: {
                    classify: [
                        { required: true, message: '请选择专业类', trigger: 'change' }
                    ],
                    major: [
                        { required: true, message: '请选择专业', trigger: 'change' }
                    ],
                    grade: [
                        { required: true, message: '请选择年级', trigger: 'change' }
                    ],
                    class: [
                        { required: true, message: '请选择班级', trigger: 'change' }
                    ],
                    term: [
                        { required: true, message: '请选择学期', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请选择姓名', trigger: 'change' }
                    ],
                    stuid: [
                        { required: true, message: '请选择学号', trigger: 'change' }
                    ],
                    money: [
                        { required: true, message: '请输入奖学金金额', trigger: 'change' }
                    ],
                    source: [
                        { required: true, message: '请输入奖学金来源', trigger: 'change' }
                    ],
                    note: [
                        { required: true, message: '请输入备注', trigger: 'change' }
                    ]
                },
                // 助学类型
                // stutypesel:[{
                //     value:'',
                //     label:''
                // }],
                // 专业类
                classifysel:{
                    options: [],
                    value: '',
                },
                // clifysel:[{
                //     value:'',
                //     label:''
                // }],
                 // 专业
                majorsel:{
                    options: [],
                    value: '',
                },
                // majsel:[{
                //     value:'',
                //     label:''
                // }],
                // 年级
                gradesel:{
                    options: [],
                    value: '',
                },
                // gradsel:[{
                //     value:'',
                //     label:''
                // }],
                // 班级
                classsel:{
                    options: [],
                    value: '',
                },
                // clasel:[{
                //     value:'',
                //     label:''
                // }],
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
                // tersel:[{
                //     value:'',
                //     label:''
                // }],
                // 学号
                stuidsel:[{
                    value:'',
                    label:''
                }]
                // 上传模板
                // fileList: [],
                // fileid:'',
                // filename:'',
                // uploadUrl:'',
                // files:[]
            }
        },
        methods: {
            // 获取专业类
            getProClass(){
                let para={
                    xz:1
                }
                com.getProClass(para).then(r=>{
                    if(r){
                        this.classifysel.options = r.data.data;
                        this.getDfsendList();
                    }
                    
                })
            },
            // getClasify(){
            //     let para={
            //         xz:1
            //     }
            //     com.getProClass(para).then(r=>{
            //         if(r){
            //             this.clifysel = r.data.data;
            //         }
            //     })
            // },
            // 获取所有专业
            getAllMajor(){
                com.getAllMajor().then(r=>{
                    if(r){
                        this.majorsel.options = r.data.data;
                    }
                })
            },
            // getAMajor(){
            //     com.getAllMajor().then(r=>{
            //         if(r){
            //             this.majsel = r.data.data;
            //         }
            //     })
            // },
            // 获取所有年级
            getAllGrade(){
                com.getAllGrade().then(r=>{
                    if(r.data.meta.code ==  '200'){
                        this.gradesel.options = r.data.data
                    }
                })
            },
           
            // getAGrade(){
            //     com.getAllGrade().then(r=>{
            //         if(r.data.meta.code ==  '200'){
            //             this.gradsel = r.data.data
            //         }
            //     })
            // },
            // 获取学期
            getTerm(){
                com.getTerm().then(r=>{
                    if(r.data.meta.code = 200){
                        this.termsel.options = r.data.data;
                    }
                })
            },
            // getTem(){
            //     com.getTerm().then(r=>{
            //         if(r.data.meta.code = 200){
            //             this.tersel = r.data.data;
            //         }
            //     })
            // },
            // 根据学号获取学生信息
            getStuInfo(){
                let para={
                    no:this.form.stuid
                }
                com.getStuInfo(para).then(r=>{
                    if(this.form.stuid!=''){
                        if(r){
                            this.form.term=r.data.data.xq;
                            this.form.grade=r.data.data.gradename;
                            this.form.classify=r.data.data.deptname;
                            this.form.major=r.data.data.proname;
                            this.form.class=r.data.data.clazzname;
                            this.form.name=r.data.data.name;
                            this.form.counselor=r.data.data.teaname;

                            this.form.gradeid=r.data.data.gradeid;
                            this.form.classifyid=r.data.data.deptid;
                            this.form.majorid=r.data.data.proid;
                            this.form.classid=r.data.data.clazzid;
                        }
                    }else{
                        this.form.term='';
                        this.form.grade='';
                        this.form.classify='';
                        this.form.major='';
                        this.form.class='';
                        this.form.name='';
                        this.form.counselor='';
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
                        // this.getDftuitList();
                    }
                })
            },
            // getCla(){
            //     let data={
            //         'proid':this.form.major,
            //         'gradeid':this.form.grade
            //     }
            //     com.classQueryMajor(data).then(r=>{
                    
            //         if(r.data.meta.code ==  '200'){
            //             this.clasel = r.data.data;
            //         }
            //     })
            // },

            // 通过班级查询学生
            // classQueryStu(){
            //     let data={
            //         'clazzid':this.form.class
            //     }
            //     com.classQueryStu(data).then(r=>{
                   
            //         if(r.data.meta.code ==  '200'){
            //             this.stunames = r.data.data;
            //             this.form.stuid = r.data.data.no;
            //         }
            //     })
            // },
            // classQueryHao () {
            //     this.form.stuid=this.form.name.no;
            // },
            // 列表
            getDfsendList(){
                let para = {
                    pageNo : this.currentPage,
                    pageSize:10,
                    type:1,

                    calzzifyId:this.classifysel.value,
                    majorId:this.majorsel.value,
                    termId:this.termsel.value,
                    gradeId:this.gradesel.value,
                    clazzId:this.classsel.value
                }
                api.getFundList(para).then(r=>{
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
            clearform(){
                this.form.stuid = '';
                this.form.term = '';
                this.form.grade = '';
                this.form.classify = '';
                this.form.major = '';
                this.form.class = '';
                this.form.name = '';
                this.form.money = '';
                this.form.source = '';
                this.form.note = '';
                // this.postDfsendList();
            },
            // 添加
            postDfsendAdd(){
                this.dialogFormVisible = true;
                this.clearform();
            },
            // 修改
            postDfsendModify(row){
                this.form.id=row.id;
                this.form.stuid = row.stuNo;
                this.form.term = row.termId;
                this.form.grade = row.grade;
                this.form.classify = row.clazzify;
                this.form.major = row.major;
                this.form.class = row.clazz;
                this.form.name = row.stuName;
                this.form.money = row.supportMoney;
                this.form.source = row.supportSource;
                this.form.note = row.remarks;
                this.dialogFormVisible = true;
            },
            // 详情
            postDfsendDetail(row){
                this.form.stuid = row.stuNo;
                this.form.term = row.termId;
                this.form.grade = row.grade;
                this.form.classify = row.clazzify;
                this.form.major = row.major;
                this.form.class = row.clazz;
                this.form.name = row.stuName;
                this.form.money = row.supportMoney;
                this.form.source = row.supportSource;
                this.form.note = row.remarks;
                this.dialogDetailVisible = true
            },
            // 删除
            postDfsendDel(row){
                let para = {
                    id : row.id
                }
                let datad = qs.stringify(para);
                this.$confirm('确认删除吗？', '提示', {}).then(() => {
                    api.postFundDel(datad).then(r=>{
                        var data = r.data;
                        if(data.meta.code = 200){
                            this.getDfsendList();
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
                            stuNo:this.form.stuid,
                            stuName:this.form.name,
                            clazzify:this.form.classify,
                            calzzifyId:this.form.classifyid,
                            major:this.form.major,
                            majorId:this.form.majorid,
                            termId:this.form.term,
                            grade:this.form.grade,
                            gradeId:this.form.gradeid,
                            clazz:this.form.class,
                            clazzId:this.form.classid,
                            supportSource:this.form.source,
                            supportMoney:this.form.money,
                            remarks:this.form.note,
                            type:1                        
                        }
                        let datax = qs.stringify(data);
                        if(!this.form.id){
                            // 提交
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                api.postDfAdd(datax).then(r=>{
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
                                    this.getDfsendList();
                                    
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
                                api.postDfAdd(datam).then(r =>{
                                    console.log(this.form.id);
                                    console.log("修改")
                                    if(r.data.meta.code=='200'){
                                        this.$message({
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                    }
                                    this.dialogFormVisible = false;
                                    this.getDfsendList();
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
            // 获取助学类型
            // getFundType(){
            //     com.getFundType().then(r=>{
            //         if(r.data.meta.code ==  '200'){
            //             this.stutypesel = r.data.data
            //         }
            //     })
            // },
            
            // // 上传文件限制
            // beforeAvatarUpload(file) {
            //     var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
            //     const extension = testmsg === 'xls'
            //     const extension2 = testmsg === 'xlsx'
            //     const isLt2M = file.size / 1024 / 1024 < 10
            //     if(!extension && !extension2) {
            //         this.$message({
            //             message: '上传文件只能是 xls、xlsx格式!',  
            //             type: 'warning'  
            //         });  
            //     }  
            //     if(!isLt2M) {  
            //         this.$message({  
            //             message: '上传文件大小不能超过 10MB!',  
            //             type: 'warning'  
            //         });  
            //     }  
            //     return extension || extension2 && isLt2M
            // },
            // handleExceed(files, fileList) {
            //     this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            // },
            // beforeRemove(file, fileList) {
            //     return this.$confirm(`确定移除 ${ file.name }？`);
            // },
            // success(response, file, fileList){
            //     this.fileid = response.data.id;
            //     this.filename = response.data.oldname;
            //     this.files.push({id:this.fileid,name:this.filename})
            // }
            
        },
        mounted () {
            // 助学金列表
            this.getDfsendList();
            // 获取专业类
            this.getProClass();
            // this.getClasify();
            // 获取学期
            this.getTerm();
            // this.getTem();
            // 获取所有专业
            this.getAllMajor();
            // this.getAMajor();
            // 获取所有年级
            this.getAllGrade();
            // this.getAGrade();
            // 根据学号获取所有学生信息
            // this.getStuInfo();
            
            // 上传模板
            // let _this = this;
            // _this.uploadUrl = file.getFileUploadUrl();
            // setInterval(function(){
            //     _this.uploadUrl = file.getFileUploadUrl();
            //     }, 4 * 60000
            // );
        }
    }
</script>
<style lang="scss" scoped>
.dfsend{
    padding-left:8px;
    // .dfsend-title{
    //     cursor:pointer;
    //     // margin:7px 17px 7px 0;
    //     i{
    //         width:16px;
    //         height: 16px;
    //         float:left;
    //         margin-top:2px;
    //         margin-right:8px;
    //         background:url("../../assets/img/overtime/add.png") 0 0 no-repeat;
    //         background-size:100% 100%; 
    //     }
    //     span{
    //         color:#208af5;
    //         font-weight:bold;
    //     }
    // }
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
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:200px;
    }

    .el-textarea,
    .el-input{
        width:25.4%;
    }
    .btn{
        padding:5px 10px;
    }
    // 分页
    .toolbar{
        margin-top:20px;
    }
}

</style>


