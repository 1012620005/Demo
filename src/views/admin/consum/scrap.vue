<template>
  <div class="scrap">
          <el-row :gutter="20">
            <!-- <el-col style="line-height: 40px;" :span="20"> -->
              <!-- <span @click="deleten" class="add-button">
                <img style="vertical-align: middle; " src="../../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 还原</i>
              </span> -->
            <!-- </el-col> -->
            <el-col :span="4" :offset="20">
              <el-form :inline="true" :model="select_form" label-width="50px"  >
                  <el-form-item >
                    <el-input v-model="select_form.name"  placeholder="请输入关键字">
                      <i slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer"  ></i>
                    </el-input>
                  </el-form-item>
              </el-form>
              
            </el-col>
          </el-row>
            
          <div style="margin:0 0 20px;">
            <el-table
              :data="tableData"
              stripe
              v-loading.body="tableloading"
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
                prop="updateDate"
                label="入账时间">
              </el-table-column>
              <el-table-column
                prop="scrapReason"
                label="报废原因">
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
      def_urldown:cf.getUrl(),
      bassrcurl:apiUrl.BASE_URL,
      tableloading:false,
      tableData:[
      ],
      page:{
        pageNo: 1,
        pageSize: Number,
        count:1,
      },
      select_form:{
        flag:"",
        name:""
      },
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
    //获取列表
    getlist(){
      let data = {
        "name":this.select_form.name,
        "type":"2",
         "pageNo":this.page.pageNo, 
         "pageSize": 10,
         "status":"6"
      }
      AD.getasstlist(data).then(r=>{
        if(r) {
          this.tableData =  r.data.data.list.map(function(item,index){
            item.imageUrl = JSON.parse(item.imageUrl)
            return item
          })
          this.page.count = r.data.data.count 
        }
      })
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