<template>
  <div class="fixed_assets">
          <el-row :gutter="20">
            <el-col style="line-height: 40px;" :span="14">
              <span @click="create" class="add-button">
                <img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加入库</i>
              </span>
              <span @click="click_ck_created" class="add-button">
                <img style="vertical-align: middle; " src="../../../assets/icon/icon_chuku.png"/><i style="vertical-align: middle; "> 出库</i>
              </span>
              <span @click="click_return" class="add-button">
                <img style="vertical-align: middle; " src="../../../assets/icon/icon_guihuan.png"/><i style="vertical-align: middle; "> 归还</i>
              </span>
              <span @click="click_scrap" class="add-button">
                <img style="vertical-align: middle; " src="../../../assets/icon/icon_baofei.png"/><i style="vertical-align: middle; color:#f36d6e;"> 报废</i>
              </span>
              <span  class="add-button">
                <img style="vertical-align: middle; " src="../../../assets/icon/icon_print.png"/><i style="vertical-align: middle;color:#68c046;"> 打印二维码/条形码</i>
              </span>
              <a :href="bassrcurl+'/work1/assets/excelAssetsInfo?type=1&status='+select_form.flag+'&access_token='+token" class="add-button">
                <img   style="vertical-align: middle; " src="../../../assets/icon/icon_daochu.png"/><i style="vertical-align: middle;color:#68c046; "> 导出</i>
              </a>
            </el-col>
            <el-col :span="10">
              <el-form :inline="true" :model="select_form" label-width="50px"  >
                <el-row type="flex" class="row-bg" justify="space-between">
                   <el-col :span="14">
                  <el-form-item label="状态">
                    <el-select v-model="select_form.flag"  @change="getlist" >
                      <el-option v-for="item in option_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  </el-col>
                   <el-col :span="8">
                  <el-form-item >
                   
                    <el-input v-model="select_form.name" @keyup.native.enter="getlist"  placeholder="请输入关键字">
                      <i slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer"  @click="getlist" ></i>
                    </el-input>
                    
                  </el-form-item>
                  </el-col>
                  </el-row>
              </el-form>
              
            </el-col>
          </el-row>
            
          <div style="margin:0 0 20px;">
            <el-table
              :data="tableData"
              stripe
              v-loading.body="tableloading"
              highlight-current-row
              @current-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="资产类别">
                      <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="规格型号">
                      <span>{{ props.row.spectionModel }}</span>
                    </el-form-item>
                    <el-form-item label="资产品牌">
                      <span>{{ props.row.brand }}</span>
                    </el-form-item>
                    <el-form-item label="厂商">
                      <span>{{ props.row.manufacturer }}</span>
                    </el-form-item>
                    <el-form-item label="供应商">
                      <span>{{ props.row.supplier }}</span>
                    </el-form-item>
                    <el-form-item label="隶属项目">
                      <span>{{ props.row.attachProgram }}</span>
                    </el-form-item>
                    <el-form-item label="隶属机构">
                      <span>{{ props.row.attachOrganization }}</span>
                    </el-form-item>
                    <el-form-item label="条形码">
                      <span>{{ props.row.price }}</span>
                    </el-form-item>
                    <el-form-item label="金额">
                      <span>{{ props.row.price }}</span>
                    </el-form-item>
                    <!-- <el-form-item label="入库数">
                      <span>{{ props.row.fundNum }}</span>
                    </el-form-item>
                    <el-form-item label="库存数">
                      <span>{{ props.row.fundNum }}</span>
                    </el-form-item> -->
                  </el-form>
                </template>
              </el-table-column>
              <!-- <el-table-column
                type="selection"
                width="55">
              </el-table-column> -->
              <el-table-column
                type="index"
                label="序号"
                width="60">
              </el-table-column>
              <el-table-column
                prop="name"
                label="资产名称">
              </el-table-column>
              <el-table-column
                prop="assetsType"
                label="资产设备图片"
                >
                <template slot-scope="scope">
                  <img style="width: 35px;height:25px;" v-for="item in scope.row.imageUrl" :key="item.fid" :src="bassrcurl+'/fs/file/download?fileid='+item.fid+def_urldown"/>
                  
                </template>
              </el-table-column>
              <el-table-column
                prop="storagePlace"
                label="存放地点">
              </el-table-column>
              <el-table-column
                prop="updateDate"
                label="入账时间">
              </el-table-column>
              <el-table-column
                prop="designer"
                label="制单人"
                width="100">
              </el-table-column>
              <el-table-column
                prop="assetsType"
                label="状态"
                width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '2'">在库存</span>
                  <span v-if="scope.row.status == '1'">报废待审核</span>
                  <!-- <span v-if="scope.row.status == '6'">已报废</span> -->
                  <span v-if="scope.row.status == '3'">已出库</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="160"
                >
                <template slot-scope="scope">
                  <el-button v-if="scope.row.status == '2'" @click="chenge(scope.row)" type="text" size="small">修改</el-button>
                  <el-button  @click="ckDetailed(scope.row)" type="text" size="small">出库明细</el-button>
                  <el-button v-if="scope.row.status == '2'" @click="deleten(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="text-align:center; ">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page.pageNo"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="page.count">
            </el-pagination>
          </div>

<!-- 弹出 -->
<el-dialog   :visible.sync="dialogassets" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >{{optiontext+'入库'}}</p>
  </div>
  <div style="max-width:380px; text-align:left;">
    <el-form :model="form"  :label-position="labelPosition" :rules="rules" label-width="110px"  ref='form'>
        <el-form-item  label="资产名称:" prop="name" >
          <el-input v-model="form.name"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="资产设备图片:"  >
          <el-upload
            class="upload-demo"
            :action="def_url"
            :data="data_assets"
            :on-preview="handlePreview"
            :on-success="handlesuccess"
            :on-remove="handleRemove"
            :file-list="fileList2"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item  label="资产类别:" prop="category" >
          <el-input v-model="form.category"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="存放地点:" prop="storagePlace" >
          <el-input v-model="form.storagePlace"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="规格型号:" prop="spectionModel" >
          <el-input v-model="form.spectionModel"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="资产品牌:" prop="brand" >
          <el-input v-model="form.brand"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item  label="厂商:" prop="manufacturer" >
          <el-input v-model="form.manufacturer"   placeholder="">
          </el-input>
        </el-form-item>
         <el-form-item  label="供应商:" prop="supplier" >
          <el-input v-model="form.supplier"   placeholder="">
          </el-input>
        </el-form-item>
         <el-form-item  label="隶属项目:" prop="attachProgram" >
          <el-input v-model="form.attachProgram"   placeholder="">
          </el-input>
        </el-form-item>
         <el-form-item  label="隶属机构:" prop="attachOrganization" >
          <el-input v-model="form.attachOrganization"   placeholder="">
          </el-input>
        </el-form-item>
         <el-form-item  label="金额:" prop="price" >
          <el-input v-model.number="form.price"   placeholder="">
          </el-input>
        </el-form-item>
        <!-- <el-form-item  label="入库数:" prop="fundNum" >
          <el-input v-model.number="form.fundNum"   placeholder="">
          </el-input>
        </el-form-item> -->
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogassets = false">取 消</el-button>
    <el-button   type="primary" @click="assignation('form')" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>

<!-- 出库 -->
<el-dialog  :visible.sync="dialog_ck_created"  width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >出库</p>
  </div>
  <div style="max-width:380px; text-align:left;">
    <el-form :model="ck_form"  :label-position="labelPosition"  label-width="110px"  ref='form_ck'>
        <!-- <el-form-item  label="出库时间:" prop="name" >
          <el-input v-model="form.name"   placeholder="">
          </el-input>
        </el-form-item> -->
        <el-form-item :rules="{required: true, message: '使用部门不能为空', trigger: 'blur'}" label="使用部门:" prop="department" >
          <el-input v-model="ck_form.department"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item :rules="{required: true, message: '借记人不能为空', trigger: 'blur'}" label="借记人:" prop="name" >
          <el-input v-model="ck_form.name"   placeholder="">
          </el-input>
        </el-form-item>
        <el-form-item :rules="{required: true, message: '借记原因不能为空', trigger: 'blur'}" label="借记原因:" prop="reason" >
          <el-input
            type="textarea"
            :rows="3"
            v-model="ck_form.reason">
          </el-input>
        </el-form-item>
        <!-- <el-form-item  label="出库数:" prop="number" >
          <el-input v-model="ck_form.number"   placeholder="">
          </el-input>
        </el-form-item> -->
        <el-form-item  label="归还时间:" prop="returnDate" >
          <el-date-picker
            v-model="ck_form.returnDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog_ck_created = false">取 消</el-button>
    <el-button   type="primary" @click="ck_updata('form_ck')" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>

<!-- 报废 -->
<el-dialog  :visible.sync="dialog_scrap"  width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >报废</p>
  </div>
  <div >
    <el-form :model="scrap_form"  :label-position="labelPosition"  label-width="60px"  ref='form_bf'>
        <el-form-item :rules="{required: true, message: '报废原因不能为空', trigger: 'blur'}" label="原因:" prop="scrapReason" >
          <el-input
            type="textarea"
            :rows="5"
            v-model="scrap_form.scrapReason">
          </el-input>
        </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog_scrap = false">取 消</el-button>
    <el-button   type="primary" @click="scrap_updata('form_bf')" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>
<!-- 归还 -->
<el-dialog  :visible.sync="dialog_return"  width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >报废</p>
  </div>
  <div >
    <el-form :model="return_form"  :label-position="labelPosition"  label-width="100px" >
        <el-form-item  label="出库时间:"  >
          <span>{{return_form.createDate}}</span>
        </el-form-item>
        <el-form-item  label="使用部门:"  >
          <span>{{return_form.department}}</span>
        </el-form-item>
        <el-form-item  label="借记人:"  >
          <span>{{return_form.name}}</span>
        </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialog_return = false">取 消</el-button>
    <el-button   type="primary" @click="return_updata" :loading = 'loading' >确 定</el-button>
  </div>
</el-dialog>
<!-- 出来明细 -->
<el-dialog   :visible.sync="dialog_ck" width="45%" >
  <div slot="title"  >
      <p style="font-size:16px;" >出库明细</p>
  </div>
  <div>
    <el-table
      :data="data_ck"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="department"
        label="使用部门"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="借记人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="reason"
        label="借记原因">
      </el-table-column>
      <!-- <el-table-column
        prop="number"
        label="出库数量">
      </el-table-column> -->
      <el-table-column
        prop="createDate"
        label="出库时间">
      </el-table-column>
       <el-table-column
        prop="returnDate"
        label="归还时间">
      </el-table-column>
       <el-table-column
        prop="isReturn"
        label="是否归还"
        width="100">
        <template slot-scope="scope">
          <span >{{scope.row.isReturn == '0'? "否":"是"}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>  
</el-dialog>

  </div>
</template>

<script>
import navTop from "../../common/header";
import validate from "../../../validate";
import AD from "../../../apis/admin.js";
import cf from "../../../apis/commonFile.js";
import apiUrl from '../../../utils/config'
const qs = require('querystring');
export default {
  name: "fixed_assets",//
  data() {
    return {
      data_assets:{entity:'assets', type:'file',ticket:''},
      fileList2: [],
      def_urldown:"",
      bassrcurl:apiUrl.BASE_URL,
      option_list:[
        {id:"2",name:"在库存"},
        {id:"3",name:"已出库"},
        {id:"1",name:"报废待审核"},
      ],
      loading:false,
      dialog_return:false,
      dialogassets:false,
      dialog_scrap:false,
      dialog_ck_created:false,
      dialog_ck:false,
      tableloading:false,
      labelPosition: "right",
      optiontext:null,
      tableData:[

      ],
      page:{
        pageNo: 1,
        pageSize: Number,
        count:1,
      },
      return_form:{

      },
      select_form:{
        flag:"",
        name:""
      },
      ck_form:{
        name:"",
        department:"",
        reason:"",
        returnDate:null,
        assetsId:"",
        AssetsType:"1",
        number:null,
      },
      scrap_form:{
        scrapReason:"",
        id:""
      },
      form: {
        type:'1',
        name:'',
        imageUrl:[],
        category:'',
        storagePlace:'',
        spectionModel:'',
        brand:'',
        manufacturer:'',
        supplier:'',
        attachProgram:'',
        attachOrganization:'',
        price:null,
        id:'',
        fundNum:null,
        barCode:"",
      },
      def_url:"",
      data_ck:[],
      def_select:"",
      token:"",
      rules:{
        category: [ { required: true, message: '请输入资产类型', trigger: 'blur' }, ],
        name: [ { required: true, message: '请输入资产名称', trigger: 'blur' }, ],
        storagePlace: [ { required: true, message: '请输入存放地点', trigger: 'blur' }, ],
        spectionModel: [ { required: true, message: '请输入规格型号', trigger: 'blur' }, ],
        price: [ 
           {type: 'number', required: true, message: '单价不能为空', trigger: 'blur' },
           { type: 'number', message: '单价必须为数字值'}
        ],
      }
    };
  },
  components: {
    navTop
  },
  created() {},
  mounted() {
   this.token = this.$Cookies.get('sessionid')
   this.getlist();
   let _this = this;
   cf.getUrl().then(r=>{
     _this.def_urldown = r
   })
    cf.getFileUploadUrl().then(r=>{
      _this.def_url = r
    })
    setInterval(function(){ cf.getFileUploadUrl().then(r=>{
        _this.def_url = r
      })
    }, 240000);
  },
  computed: {},
  methods: {
    import_asste(){
      // AD.import_asste({'type':"1","status":this.select_form.flag}).then(r=>{
      //   if(r){
      //     this.$message({
      //       showClose: true,
      //       message: '导出成功',
      //       type: 'success',
      //       duration:1500
      //     });
      //   }
      // })
    },
    click_return(){
      if(this.def_select !== "" && this.def_select.status == "3"){
        AD.ck_Detailed({"assetsId":this.def_select.id}).then(r=>{
          if(r){
              this.dialog_return = true;
              this.return_form = r.data.data.list[0]
          }
        })
      }else{
        this.$message({
          showClose: true,
          message: '请选择归还物品',
          type: 'info',
          duration:1500
        });
      }
    },
    return_updata(){
      let u={
        "assetsId":this.def_select.id,
        "assetsType":1,
      }
      AD.set_revert(qs.stringify(u)).then(r=>{
        if(r){
          this.getlist();
          this.dialog_return = false;
          this.$message({
            showClose: true,
            message: '操作成功',
            type: 'success',
            duration:1500
          });
        }
      })
    },
    click_scrap(){
      if(this.def_select !== ""){
        this.dialog_scrap = true;
        this.scrap_form={
          scrapReason:"",
          id:""
        }
      }else{
        this.$message({
          showClose: true,
          message: '请选择报废物品',
          type: 'info',
          duration:1500
        });
      }
    },
    scrap_updata(formName){
      this.$refs[formName].validate((valid) =>{
        if (valid) {
          this.scrap_form.id = this.def_select.id
          AD.sq_scrap(qs.stringify(this.scrap_form)).then(r=>{
            if(r){
              this.getlist();
              this.dialog_scrap = false;
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success',
                duration:1500
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    click_ck_created(){
      if(this.def_select !== ""){
        this.dialog_ck_created = true;
        this.ck_form={
          name:"",
          department:"",
          reason:"",
          returnDate:null,
          assetsId:"",
          AssetsType:"1",
          number:null,
        }
      }else{
        this.$message({
          showClose: true,
          message: '请选择出库物品',
          type: 'info',
          duration:1500
        });
      }
    },
    ck_updata(formName){
      this.$refs[formName].validate((valid) =>{
        if (valid) {
          this.ck_form.assetsId = this.def_select.id
          AD.sertck_created(qs.stringify(this.ck_form)).then(r=>{
            if(r){
              this.getlist();
              this.dialog_ck_created = false;
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success',
                duration:1500
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    handleSelectionChange(val) {
      // console.log(this.def_select)
      if(val){
        this.def_select = val;
      }
    },
    //出库明细
    ckDetailed(row){
      AD.ck_Detailed({"assetsId":row.id}).then(r=>{
        if(r){
          this.dialog_ck = true;
          this.data_ck = r.data.data.list
        }
      })
    },
    // getFileDownloadUrl(r){
    //   return  cf.getFileDownloadUrl(r)
    // },
    // getUploadUrl() {
    //   this.def_url = cf.getFileUploadUrl();
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let _this = this
      this.form.imageUrl.map(function(item,index){
        if(item.name == file.name){
          _this.form.imageUrl.splice(index,1)
        }
      })
    },
    handlePreview(file) {
      console.log(file);
    },
    handlesuccess(r, file, fileList){
      console.log(r, file, fileList);
      this.form.imageUrl.push({"fid":r.data.id,"name":file.name})
    },
    //获取列表
    getlist(){
      this.def_select = "";
      let data = {
        "name":this.select_form.name,
        "type":"1",
         "pageNo":this.page.pageNo, 
         "pageSize": 10,
         "status":this.select_form.flag
      }
      AD.getasstlist(data).then(r=>{
        if(r) {
          // this.tableData = r.data.data.list;
          this.tableData =  r.data.data.list.map(function(item,index){
            item.imageUrl = JSON.parse(item.imageUrl)
            return item
          })
          this.page.count = r.data.data.count
        }
      })
    },
    deleten(row){
      this.$confirm("确认删除?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            let formdata = new FormData();
            formdata.append("id", row.id);
            AD.del_asstes(formdata).then(r => {
              instance.confirmButtonLoading = false;
              if (r) {
                this.getlist();
                done();
                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: "success",
                  duration: "1500"
                });
              }
            });
          } else {
            instance.confirmButtonLoading = false;
            done();
          }
        }
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    },
    chenge(row){
      console.log(row)
      this.form.id = row.id;
      this.fileList2 =[];
      this.form.name = row.name;
      if(row.imageUrl !== null){
        this.form.imageUrl = row.imageUrl;
        let _this = this;
        this.fileList2 = this.form.imageUrl.map(function(item,index){
          return {'name':item.name,'url':_this.bassrcurl+'/fs/file/download?fileid='+item.fid+_this.def_urldown}
        })
        console.log(this.fileList2)
      }else{
        this.form.imageUrl = []
      }
      this.form.category = row.category;
      this.form.storagePlace = row.storagePlace;
      this.form.spectionModel = row.spectionModel;
      this.form.brand = row.brand;
      this.form.manufacturer = row.manufacturer;
      this.form.supplier = row.supplier;
      this.form.attachProgram = row.attachProgram;
      this.form.attachOrganization = row.attachOrganization;
      this.form.price = Number(row.price);
      // this.form.fundNum = Number(row.fundNum);
      this.optiontext = '修改'
      this.dialogassets = true;
    },
    assignation(formName){
      this.$refs[formName].validate((valid) =>{
        if (valid) {
          // this.form.imageUrl = this.form.imageUrl.map(function(item,index){
          //   return item.fid;
          // })
          let data=JSON.parse(JSON.stringify(this.form))
          data.imageUrl = JSON.stringify(data.imageUrl)
          this.loading = true;
          // if(this.optiontext == '添加'){
            // console.log(this.form)
            AD.setasstup(qs.stringify(data)).then(r=>{
              if(r){
                this.getlist();
                this.dialogassets = false;
                this.loading = false;
                this.$message({
                  showClose: true,
                  message: '保存成功',
                  type: 'success',
                  duration:1500
                });
              }
            })
        } else {
          return false;
        }
      });
    },
    create(){
      this.optiontext = '添加'
      this.dialogassets = true;
      this.fileList2 = []
      this.form={
        type:'1',
        name:'',
        imageUrl:[],
        category:'',
        storagePlace:'',
        spectionModel:'',
        brand:'',
        manufacturer:'',
        supplier:'',
        attachProgram:'',
        attachOrganization:'',
        price:null,
        id:'',
        fundNum:'',
        barCode:"",
      }
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getlist();
    },
    
    
  },
  directives: {},
  watch: {}
};
</script>
<style >
.fixed_assets .demo-table-expand {
    font-size: 0;
  }
 .fixed_assets .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
 .fixed_assets .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 20%;
  }
</style>