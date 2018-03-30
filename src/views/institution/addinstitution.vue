<template>
  
        <div class="roleassign-table clear">
          <div class="roleassign-left left">
            <h3 class="roleassign-left-title">所有部门</h3>
            <div class="roleassign-left-cot">
                <el-tree
                  :data="data2"
                  :props="defaultProps"
                  node-key="id"
                  highlight-current
                  accordion
                  @node-click="po_nodeClick">
                  
                </el-tree>
            </div>
          </div>
          <div class="roleassign-right right">
            <p style='text-align:left'>
              <span  @click="addOrg('0')" class="add-button" ><img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加部门</i></span>
            </p>
              <div class="roleassign-right-table">
                   <el-table
                    :row-class-name="tableRowClassName"
                    :data="formdata"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                      prop="index"
                      label="序号"
                      width="160">
                       <template slot-scope="scope">
                          <span >{{ scope.$index + 1 }}</span>
                       </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="部门名称">
                      <template slot-scope="scope">
                          <span :style="scope.row.flag == '2' ? 'padding-left:20px;': scope.row.flag == '3' ? 'padding-left:40px;' : scope.row.flag == '4' ? 'padding-left:60px;' : '' ">{{ scope.row.name }}</span>
                       </template>
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="部门类型"
                      width="100">
                      <template slot-scope="scope">
                          <span>{{otype[scope.row.type - 1]}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="200"
                      >
                      <template slot-scope="scope" v-if="formdata[scope.$index].type != '1' && formdata[scope.$index].type != '4'">
                        <el-tooltip :content="'修改'" placement="top">
                        <span class="table-end-caozuo"><img  @click="addOrg(formdata[scope.$index].id)" src="../../assets/image/xiugai.png"/></span>
                        </el-tooltip>
                        <el-tooltip  :content="'删除'" placement="top">
                        <span class="table-end-caozuo"><img  @click=" deleteformation(scope.$index,scope.row)" src="../../assets/image/delete-icon.png"/></span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
              </div>
          </div>

<!--添加学校名称-->
<el-dialog   :visible.sync="dialogVisible" size='tiny' >
  <div slot="title" style="float:left;" >
              <p style="font-size:16px;" >{{optiontext+"部门"}}</p>
          </div>
  <div style="max-width:360px; text-align:left;">
  <el-form :model="form" :label-position="labelPosition" label-width="90px"  ref='form'>
    <el-form-item prop="organname" label="部门名称:">
      <el-input v-model="form.orgname"  placeholder="请输入内容"></el-input>
    </el-form-item>
    
    <el-form-item label=""  >
      {{form.parentOrgname}}
    </el-form-item>
    <el-form-item label="上级部门:"  >
      <el-tree
        :data="data3"
        :props="defaultProps"
        node-key="id"
        @node-click="p_nodeClick">
      </el-tree>
    </el-form-item>
  </el-form>
  </div> 
  <div slot="footer" class="dialog-footer">
    <el-button   type="primary" @click="modification('form')"  >确 定</el-button>
  </div>
</el-dialog>


  </div>
</template>

<script>
import institution from '../../apis/institution.js'
import userApi from '../../apis/userCenter.js'
var istitution = 1;
var nstitution = 1;
var flags = true;
export default {
  name: 'personal',
  data() {
    return {
      optiontext:'',
      Checkedx:false,               //是否分校
      addbranchnum:1,
      labelPosition:'right',
      dialogVisible:false,
      form:{
        orgid:'',
        orgname:'',
        parentOrgname:'',
        parentOrgid:'',
      },
      //  tableData:formdata,
      data2: [],
      data3: [],
      tabledata: [],
      formdata: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      otype: ['学校','部门','部门','分校区'],
      ishandlcontrol:[],    //权限分配
      nohandlcontrol:[],
    }
  },
  components:{
    
    
  },
  created(){
    this.loadTree();
  },
  mounted() {

  },
  computed: {
    nohandlcontrols:function(){
      let _nohandlcontrol = this.nohandlcontrol.map(function(item,index){
            return item.id
      })
      return _nohandlcontrol
    },
    ishandlcontrols:function(){
      let _ishandlcontrol = this.ishandlcontrol.map(function(item,index){
            return item.id
      })
      return _ishandlcontrol
    }
  },
  methods:{
    po_nodeClick(data, node, arr) {
      console.log(data);
      this.loadTree(data.id, 'table');
    },
    loadTree(officeid, type) {
      let params = {officeid:officeid, xz:"2"}
      institution.getorgantree(params).then(data=>{
        let d = data.data.data;
        if (type == 'table') {
          this.tabledata = d;
        } else {
          this.tabledata = d;
          this.data2 = d;
          this.data3 = d;
        }
        this.loadTable();
      });
    },
    loadTable() {
      var array = [];
      if (this.tabledata[0]) {
        array.push({name:this.tabledata[0].label,flag:'1',type:this.tabledata[0].type,id:this.tabledata[0].id})
        if (this.tabledata[0].children) {
          this.tabledata[0].children.map(function(item,index,input){
            // console.log(item)
              array.push({name:item.label,indexs:index,flag:'2',type:item.type,id:item.id})
              if(item.children){
                item.children.map(function(item,index,input){
                  array.push({name:item.label,indexs:index,flag:'3',type:item.type,id:item.id})
                    if(item.children){
                      item.children.map(function(item,index,input){
                        array.push({name:item.label,indexs:index,flag:'4',type:item.type,id:item.id})
                      })
                    }
                })
              }
            }
          )
        }
      }
      this.formdata = array;
    },
    p_nodeClick(data, node, arr) {
      if (data.type == '2') {
         node.expanded = false;
      }
      if (data.type == '3') {
        userApi.showTip("只能选择学校、部门、院系作为父节点");
        return;
      }
      this.form.parentOrgname = data.label;
      this.form.parentOrgid = data.id;
    },
    //添加机构上级机构
    handleCheckChange(data, checked, indeterminate) {
      if(flags){
        if(checked && istitution == 1){
          this.ishandlcontrol.push(data)
          istitution = 2;
          setTimeout(function() {
            istitution = 1
          }, 0);
        };
        if( checked == false && nstitution == 1){
          // console.log(checked == false)
          // console.log('11111111111')
          this.nohandlcontrol.push(data)
          nstitution = 2;
          setTimeout(function() {
            nstitution = 1
          }, 0);
        }; 
        flags = false;
        setTimeout(function() {
              flags = true;
            }, 0);
      }
    },
    getOrg(id) {
      let params = {id : id};
      userApi.getOffice(params).then(r=>{
        let org = r.data.data;
        if (org && org.type != '1') {
          this.form.orgid = org.id;
          this.form.orgname = org.name;
          this.form.parentOrgid = org.pid;
          this.form.parentOrgname = org.pname;
          this.dialogVisible=true;
        } else {
          userApi.showTip("这里不能修改学校");
        }
      });
    },
    addOrg(id){ //添加弹窗
      if (id !== '0') {
        this.getOrg(id);
        this.optiontext = '修改'
      } else {
        this.dialogVisible=true;
        this.optiontext = '添加'
        this.form.orgid = '';
        this.form.orgname = '';
        this.form.parentOrgid = '';
        this.form.parentOrgname = '';
      }
    },
    //确认添加机构
    modification(){//savePermission
      if (!this.form.orgname) {
        this.$message({
          message: '请填写机构名称',
          type: 'error',
          duration: 1500
        });
        return;
      }
      if (!this.form.parentOrgname) {
        this.$message({
          message: '请选择上级机构',
          type: 'error',
          duration: 1500
        });
        return;
      }
      let formdata = new FormData()
      formdata.append('parent.id', this.form.parentOrgid);
      formdata.append('name', this.form.orgname);
      formdata.append('xz', '2'); //管理部门
      formdata.append('id', this.form.orgid);
      institution.addorgan(formdata).then(data=>{
        if(data){
          userApi.showMsg(data.data.meta);
          this.dialogVisible = false;
          this.loadTree();
        }
      });
    },
    //表格颜色
    tableRowClassName(row,index){
      // console.log(row)
      if (row.flag === '1') {
          return 'info-row';
        } 
    },
    //是否分校
    handleCheckedx(e){
      this.Checkedx = e.target.checked
    },
    //添加分校
    addbranchschool(){
      this.addbranchnum = this.addbranchnum+1;
      this.form.branschoolname.push({
          name:'',
          value:true,
        })
    },
    //删除分校
    handleIconClick(d){
      console.log(d)
      if( this.addbranchnum >= 2){
         this.addbranchnum = this.addbranchnum-1;
         this.form.branschoolname.splice(d-1,1)
      }else{
         return 
      }
    },
    stumodofocation(index,row){

    },
    deleteformation(index,row){
      console.log(row)
      this.$confirm('此操作将永久删除该机构, 是否继续?', '提示', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',

        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

                let formdata = new FormData()
                formdata.append('id', row.id);
                institution.deleteorgan(formdata).then(data=>{
                    if(data){
                      done();
                      instance.confirmButtonLoading = false;
                      this.$message({
                          showClose: true,
                          message: data.data.meta.message,
                          type: 'success'
                      });
                      this.loadTree();
                      this.loadTable();
                    }
                  }).catch(req=>{
                      done();
                      instance.confirmButtonLoading = false;
                  });
              } else {
                done();
                instance.confirmButtonLoading = false;
              }
            }
        }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
    },
    deadstatusseitch(index,row){

    },
    handleSelectionChange(){

    },
  },
  directives:{
        
  },
  watch:{
    
  }
     
}

</script>
<style scoped>
.roleassign{
  height:100%;
  text-align: center;
}
.log-magess{
  margin:6px auto 16px;
  position: relative;
  background-color:#fff;
  height:50px;
  width:1200px;
  color:#000;
  font-size:16px;
}
.log-magess .arrow-center{
  display:inline-block;
  margin-left:24px;
  height:46px;
  border-bottom:4px solid #208af5;
  line-height:50px;
}
.log-magess .arrow-right{
    position: absolute;
    right:10px;
    top:16px;
    cursor: pointer;
}
.magessBox{
  width:1200px;
  margin:0 auto 30px;
  padding-bottom:20px;
  background-color:#fff;
}
.tabs{
  height:40px;
  background-color:#eef1f6;
  text-align:left;
  overflow: hidden;
}
.tabs-items{
  margin-left:-1px;
  border-bottom:1px solid #dfe6ec;
  height:39px;
}
.tabs-items li{
  float:left;
  width:120px;
  line-height:39px;
  height:39px;
  text-align:center;
  font-size:14px;
  cursor:pointer;
}
.tabs-items-item{
  background-color:#fff;
  border-right:1px solid #dfe6ec;
  border-top:1px solid #dfe6ec;
  border-left:1px solid #dfe6ec;
  color:#208af5;
}
.roleassign-table{
  width:1150px;
  margin:20px auto 0;
}
.roleassign-right-table{
  text-align:left;
  margin-top:20px;
}
.roleassign-right{
  width:880px;
}
.roleassign-right-title{
  text-align:left;
  height:20px;
}
.roleassign-right-title img{
  cursor:pointer;
}
.addschool-f{
  text-align:right;
}
.addschool-f img{
  cursor:pointer;
}
.roleassign-right-table .el-table .info-row {
  background: #c9e5f5;
}
.table{
  padding-left:16px;
  padding-right:16px;
  text-align:left;
  font-size:12px;
}
.table .el-table{
  font-size:12px;
}
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
.roleassign-left{
  width:240px;
}
.roleassign-left-title{
  font-size:16px;
  text-align:left;
  color:#666;
  height:20px;
}
.roleassign-left-cot{
  text-align:left;
  margin-top:20px;
}

</style>
<style>
.roleassign-right-table .el-table .info-row {
  background: #c9e5f5;
}
</style>