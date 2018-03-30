<template>
  <div class="scrap">
          <el-row :gutter="20">
            <el-col style="line-height: 40px;" :span="18">
              <span @click="deleten" class="add-button">
                <img style="vertical-align: middle; " src="../../../assets/icon/icon_baofei.png"/><i style="vertical-align: middle; color:#f36d6e;"> 审核报废</i>
              </span>
            </el-col>
            <el-col :span="6">
              <!-- <el-form :inline="true" :model="select_form" label-width="50px"  >
                <el-row type="flex" class="row-bg" justify="space-between">
                   <el-col :span="24">
                  <el-form-item label="状态">
                   
                    <el-select v-model="select_form.flag" >
                      <el-option v-for="item in option_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  </el-col>
                  </el-row>
              </el-form> -->
              
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
                    <el-form-item label="入库数">
                      <span>{{ props.row.fundNum }}</span>
                    </el-form-item>
                    <el-form-item label="库存数">
                      <span>{{ props.row.fundNum }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
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
                  <img style="width: 35px;" v-for="item in scope.row.imageUrl" :key="item.fid" :src="bassrcurl+'/fs/file/download?fileid='+item.fid+def_urldown"/>
                  
                </template>
              </el-table-column>
              <el-table-column
                prop="storagePlace"
                label="存放地点">
              </el-table-column>
              <el-table-column
                prop="scrapReason"
                label="报废原因">
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
                prop="status"
                label="状态"
                width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == '6'">已报废</span>
                  <span v-if="scope.row.status == '1'">报废待审核</span>
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

<el-dialog :visible.sync="centerDialogVisible" width="30%" >
  <div slot="title"  >
      <p style="font-size:16px;" >报废原因</p>
  </div>
  <div >
    {{def_select.scrapReason}}
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="set_bf_flag('1')">不 同 意</el-button>
    <el-button type="primary" @click="set_bf_flag('2')">同 意</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import AD from "../../../apis/admin.js";
import cf from "../../../apis/commonFile.js";
import apiUrl from '../../../utils/config'
const qs = require('querystring');
export default {
  name: "scrap",
  data() {
    return {
      fileList2: [],
      def_urldown:cf.getUrl(),
      bassrcurl:apiUrl.BASE_URL,
      option_list:[
        {id:"1",name:"已报废"},
        {id:"2",name:"待审核"},
      ],
      loading:false,
      centerDialogVisible:false,
      tableloading:false,
      labelPosition: "right",
      optiontext:null,
      tableData:[

      ],
      page:{
        pageNo: 1,
        pageSize: Number,
        count:null,
      },
      select_form:{
        flag:"",
        name:""
      },
      def_select:""
    };
  },
  components: {
  },
  created() {},
  mounted() {
    this.getlist();
    let _this = this;
    _this.getUploadUrl();
    setInterval(function(){_this.getUploadUrl()}, 4 * 60000);
  },
  computed: {},
  methods: {
    getlist(){
      let u={
        'type':2,
        'pageSize':10,
        'pageNo':this.page.pageNo,
      }
      AD.set_asset_aud(u).then(r=>{
        if(r) {
          this.tableData =  r.data.data.list.map(function(item,index){
            item.imageUrl = JSON.parse(item.imageUrl)
            return item
          })
          this.page.count = r.data.data.count 
        }
      })
    },
     handleSelectionChange(val) {
      if(val){
        this.def_select = val;
      }
    },
    set_bf_flag(i){
      if(i == '1'){
        AD.off_bf(qs.stringify({"id":this.def_select.id})).then(r => {
          if (r) {
            this.getlist();
            this.$message({
              showClose: true,
              message: '操作成功',
              type: "success",
              duration: "1500"
            });
            this.centerDialogVisible = false;
          }
        });
      }else{
        AD.no_bf(qs.stringify({"id":this.def_select.id})).then(r => {
          if (r) {
            this.getlist();
            this.$message({
              showClose: true,
              message: '操作成功',
              type: "success",
              duration: "1500"
            });
            this.centerDialogVisible = false;
          }
        });
      }
    },
    deleten(){
      if(this.def_select == ""){
        this.$message({
          type: "info",
          message: "选择审核物品",
          duration: "1500"
        });
      }else if(this.def_select.status == '6' ){
        this.$message({
          type: "info",
          message: "物品已报废",
          duration: "1500"
        });
      }else{
        this.centerDialogVisible = true
      }
    },
    getUploadUrl() {
      this.def_url = cf.getFileUploadUrl();
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
.scrap .demo-table-expand {
    font-size: 0;
  }
 .scrap .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
 .scrap .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }
</style>