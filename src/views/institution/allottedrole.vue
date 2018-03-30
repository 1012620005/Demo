<template>
  <div  class="roleassign-table ">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6"  >
          <span  @click="addrole" class="add-button">
            <img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/>
            <i style="vertical-align: middle; ">分配角色</i>
          </span>
        </el-col>
        <el-col :span="9">
          <el-form  :inline="true" label-width="20px">
            <el-form-item label="">
              <el-cascader
                placeholder="请选择部门"
                :options="data2"
                :props="defaultProps"
                filterable
                @change="getlist"
                clearable
                change-on-select
              ></el-cascader>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="sel_form.name" @keyup.native.enter="getlist"  placeholder="请输入关键字">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="getlist"></i>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
        <el-table
        v-loading="loading2"
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="教师名称"
          width="90">
        </el-table-column>
        <el-table-column
          prop="deptname"
          label="部门"
          width="140">
        </el-table-column>
        <el-table-column
          prop="roleList"
          label="角色">
          <template slot-scope="scope">
            <span>{{scope.row.roleList | tostring }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="officename"
          label="隶属机构"
          width="140">
        </el-table-column>
        <el-table-column
          prop="menuList"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <span>{{scope.row.roleList.length == 0 ? "未分配" :"已分配" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button  v-if="scope.row.roleList.length > 0" @click="getRole(scope.row)" plain size="small">编辑</el-button>
            <el-button  v-if="scope.row.roleList.length == 0" @click="getRole(scope.row)" plain size="small">分配</el-button>
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
    <!--添加角色-->
    <el-dialog   :visible.sync="dialogVisible" width="35%" >
      <div slot="title"  >
          <p style="font-size:16px;" >分配角色</p>
      </div>
      <div  >
        <el-form :model="form" :label-position="labelPosition" label-width="90px"  ref='form'>
          <el-form-item label="所属部门："  >
            <el-cascader
                placeholder="请选择部门"
                :options="data2"
                :props="defaultProps"
                filterable
                @change="get_allrole"
                clearable
                change-on-select
              ></el-cascader>
          </el-form-item>
          <el-form-item label="角色：" >
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="items in cities" :label="items.id" :key="items.id">{{items.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :loading='loading_role'  type="primary" @click="modification('form')"  >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import ins from "../../apis/institution.js";
const qs = require('querystring');
export default {
  name: "allottedrole",
  data() {
    return {
      loading2: false,
      loading_role:false,
      labelPosition: "right",
      dialogVisible: false,
      form:{
        checkedCities:[]
      },
      tableData: [],
      data2: [],
      defaultProps:{
        children: "children",
        label: "label",
        value:'id'
      },
      sel_form:{
        name:""
      },
      checkAll: false,
      cities: [],
      isIndeterminate: false,
      select_tea:[],
      page: {
        pageNo: 1,
        pageSize: 10,
        count: 0,
      },
    };
  },
  filters: {
    tostring: function (value) {
        if(value){
          let cont=""
          value.forEach(function(item,index){
            if(index==0){
              cont = item.name
            }else{
              cont = cont+'、'+item.name
            }
          })
          return cont
        }
    }
  },
  components: {},
  created() {
    ins.getorgantree({ xz: "2", officeid: "" }).then(data => {
      this.data2 = data.data.data;
    });
    this.getlist();
    this.get_allrole()
  },
  mounted() {},
  computed: {
    
  },
  methods: {
    get_allrole(val){
      let data={};
      if(val){
        data.officeid = val[val.length-1]
      }
      ins.getorganrole(data).then(r=>{
        this.cities= r.data.data
      })
    },
    handleCheckAllChange(val) {
      let cities=this.cities.map(function(item,index){
        return item.id
      })
      this.form.checkedCities = event.target.checked ? cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleSelectionChange(val){
      this.select_tea=val.map(function(item,index){
        return item.id
      })
    },
    getRole(row) {
      this.select_tea=[]
      this.form.checkedCities = row.roleList.map(function(item,index){
        return item.id
      });
      console.log(this.form.checkedCities)
      this.isIndeterminate= false,
      this.select_tea.push(row.id)
      this.dialogVisible = true;

    },
    getlist(val){
      let data={
        'pageNo':this.page.pageNo,
        'pageSize':this.page.pageSize,
        'name':this.sel_form.name
      }
      if(val){
        data.deptid=val[val.length-1]
      }
      this.loading2 = true;
      ins.get_roles(data).then(r=>{
        if(r){
          this.loading2 = false;
          let page = r.data.data;
          this.tableData = page.list;
          this.page.count = page.count;
        }
      })
    },
    modification() {
      let rolesid = this.form.checkedCities;
      let data={
        'userids':this.select_tea.join(),
        'roleids':rolesid.join()
      }
      this.loading_role = true;
      ins.set_role(qs.stringify(data)).then(r=>{
        this.loading_role = false;
        if(r){
          this.dialogVisible = false;
          this.select_tea=[]
          this.$message({
            message: r.data.meta.message,
            type: "success",
            duration: "1500"
          });
          this.getlist();
        }
      })
    },
    addrole() {
      if(this.select_tea.length == 0){
        this.$message({
          message: '选择批量分配教师',
          duration:1500,
        });
      }else{
        this.dialogVisible = true;
        this.form.checkedCities=[]
      }
      
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getlist();
    },
    handleSizeChange(val){
      this.page.pageSize = val;
      this.getlist();
    }
  },
  directives: {},
  watch: {}
};
</script>
<style scoped>
.roleassign {
  height: 100%;
  text-align: center;
}
.log-magess {
  margin: 6px auto 16px;
  position: relative;
  background-color: #fff;
  height: 50px;
  width: 1200px;
  color: #000;
  font-size: 16px;
}
.log-magess .arrow-center {
  display: inline-block;
  margin-left: 24px;
  height: 46px;
  border-bottom: 4px solid #208af5;
  line-height: 50px;
}
.log-magess .arrow-right {
  position: absolute;
  right: 10px;
  top: 16px;
  cursor: pointer;
}
.el-cascader{
  width:100%
}
.row-bg{
  margin-top: 20px;
}
.Pagination {
  margin-top: 32px;
  margin-bottom: 60px;
  text-align: center;
}
</style>
<style>
.roleassign-table .el-checkbox-group .el-checkbox {
  width: 33%;
  margin-left: 0;
}
</style>
