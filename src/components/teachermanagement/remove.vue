<template>
  <div class="dead-status">
    <div class="table">
      <el-table :data="teaList" stripe 
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                  size="mini"
                  @click="deleteOption(scope.row.id, '0')">还原
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delSure(scope.row.id, '2')">删除
            </el-button>
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
  data() {
    return {
      table1loading:false,
      teaList: [],
      page: {
        pageSize: 10,
        pageNo: 1,
        count: 0
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
  props: {
    remove: null,
  },
  components: {
  },
  created() {
  },
  computed: {
    aDouble: function () {
      return this.tableData.unshift(this.message[0])
    },
  },
  mounted() {
    this.findTeacher();
  },
  methods: {
    delSure(id, type) {
      this.$confirm('此操作将永久删除改用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteOption(id, type);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteOption(id, type) {
      let params = { ids: id, type: type, userType: 2 };
      var qs = require('querystring');
      userApi.deleteOption(qs.stringify(params)).then(data => {
        userApi.showMsg(data.data.meta);
        this.findTeacher();
      });
    },
    findTeacher() {  //教师列表
      let params = {
        proid: this.searchForm.proid,
        deptid: this.searchForm.deptid,
        proid: this.searchForm.proid,
        sid: this.searchForm.sid,
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize,
        username: this.searchForm.username,
        tabType: '3'
      };
      this.table1loading = true;
      userApi.findTeacher(params).then(data => {
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
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.findTeacher();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.findTeacher();
    },
  },
  watch: {
    remove: function () {
      if (this.remove !== null) {
        this.page.pageNo = this.remove.pageNo;
        this.page.pageSize = this.remove.pageSize;
        this.page.count = this.remove.count;
        this.teaList = this.remove.list;
      }
    }
  }
}
</script>
<style scoped>
.Pagination {
  margin-top: 32px;
  margin-bottom: 60px;
  text-align: center;
}
</style>
