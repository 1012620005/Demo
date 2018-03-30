<template>
  <div class="dead-status">
      <div class="table">
        <el-table
          :data="teaList"
          stripe
          v-loading.body="table1loading"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="身份证号">
                  <span>{{ props.row.idcard }}</span>
                </el-form-item>
                <el-form-item label="学历">
                  <span>{{ props.row.education }}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column width="45" type="selection">
          </el-table-column>
          <el-table-column type="index" label="序号" width="55">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="90">
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="55">
            <template slot-scope="scope">
              <span>{{scope.row.sex== 1 ? '男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="工号" >
          </el-table-column>
          <el-table-column prop="" label="岗位" >
          </el-table-column>
          <el-table-column prop="" label="教职工分类" >
          </el-table-column>
          <el-table-column prop="mobile" label="手机号码" >
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
                <el-tooltip :enterable="false" :content="'点击启用'" placement="top">
                  <el-switch
                  @change="enableOption(scope.row.id, '0')"
                    v-model="scope.row.login_flag"
                    active-color="#208af5"
                    inactive-color="#999"
                    active-value="0"
                    inactive-value="100">
                  </el-switch>
                </el-tooltip>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteOption(scope.row.id, '1')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="Pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page.pageNo"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.count">
          </el-pagination>
        </div>
      </div>

      
    </div>
</template>

<script>
import userApi from '../../apis/userCenter.js'
import dictApi from '../../apis/dict.js'
export default {
  name: 'dead-status',
  data () {
    return {
      table1loading:false,
        teaList: [],
        page: {
          pageSize:10,
          pageNo:1,
          count:0
        },
        searchForm: {
          education: [], //学历
          proList: [], //专业列表
          deptList: [], //院系
          sList: [],  //分校
          proid: '', //专业id
          deptid: '', //学院id
          sid: '', //校区id
          name: '' //姓名
        }, 
    }
  },
  props:{
    dead:null,
  },
  components:{
  },
  created(){
  },
  computed:{
    
  },
  mounted() {
    this.findTeacher();
  },
  methods: {
    deleteOption(id, type){ 
        let params = {ids:id, type:type, userType:2};
        var qs = require('querystring');
        userApi.deleteOption(qs.stringify(params)).then(data=>{
          userApi.showMsg(data.data.meta);
          this.findTeacher();
        });
    },
    enableOption(id, type){ 
      let params = {ids:id, type:type, userType:2};
      var qs = require('querystring');
      userApi.enableOption(qs.stringify(params)).then(data=>{
        userApi.showMsg(data.data.meta);
        if (data.data.meta.status == 'success') {
          this.findTeacher();
        }
      });
    },
    findTeacher(){  //教师列表
       let params = {proid:this.searchForm.proid, 
        deptid:this.searchForm.deptid, 
        proid:this.searchForm.proid, 
        sid:this.searchForm.sid, 
        pageNo:this.page.pageNo, 
        pageSize:this.page.pageSize,
        username:this.searchForm.username,
        tabType:'2'
      };
      this.table1loading = true;
      userApi.findTeacher(params).then(data=>{
        this.table1loading = false;
        let page = data.data.data;
        if (page) {
          this.teaList = page.list;
          this.page.pageNo = page.pageNo;
          this.page.pageSize = page.pageSize;
          this.page.count = page.count;
        }
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.findTeacher();
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.findTeacher();
    },
  },
  watch:{
    dead:function(){
      if(this.dead !== null){
        this.teaList = this.dead.list;
      }
    }
  }
}
</script>
<style scoped>
.table-end-caozuo{
  height:24px;
  line-height:24px;
  display:inline-block;
  cursor:pointer;
  margin-right: 5px;
}
.table-end-caozuo img{
  vertical-align: middle;
}
.Pagination{
  margin-top:32px;
  margin-bottom:60px;
  text-align:center;
}

</style>