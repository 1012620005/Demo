<template>
 
        <div  class="roleassign-table clear">
          <div class="roleassign-left left">
            <h3 class="roleassign-left-title">所有院系</h3>
            <div class="roleassign-left-cot">
                <el-tree
                  :data="data2"
                  :props="defaultProps"
                  node-key="id"
                  @node-click="po_nodeClick"
                  highlight-current
                  accordion
                  >
                </el-tree>
            </div>
          </div>
          <div class="roleassign-right right">
            <p style='text-align:left'>
              <span @click="addOrg('0')" class="add-button" ><img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加院系</i></span>
            </p>
              <div class="roleassign-right-table">
                   <el-table
                    :data="formdata"
                    style="width: 100%">
                    <el-table-column
                      prop="index"
                      label="序号"
                      width="260">
                       <template slot-scope="scope">
                          <span >{{ scope.$index + 1 }}</span>
                       </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="机构名称"
                      width="330">
                      <template slot-scope="scope">
                          <span :style="scope.row.flag == '2' ? 'padding-left:10px;': scope.row.flag == '3' ? 'padding-left:20px;' : scope.row.flag == '4' ? 'padding-left:30px;' : '' ">{{ scope.row.name }}</span>
                       </template>
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="机构类型"
                      width="100">
                      <template slot-scope="scope">
                          <span>{{otype[scope.row.type - 1]}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope" v-if="formdata[scope.$index].type != '1' && formdata[scope.$index].type != '4'">
                        <el-tooltip :content="'修改'" placement="top">
                        <span class="table-end-caozuo"><img @click="addOrg(formdata[scope.$index].id)" src="../../assets/image/xiugai.png"/></span>
                        </el-tooltip>
                        <el-tooltip :content="'删除'" placement="top">
                          <span class="table-end-caozuo"><img @click=" deleteformation(scope.$index,scope.row)" src="../../assets/image/delete-icon.png"/></span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
                
              </div>
          </div>
     

<!--添加学校名称-->
<el-dialog   :visible.sync="dialogVisible" size='tiny' >
  <div slot="title" style="float:left;" >
      <p style="font-size:16px;" >{{optiontext+"院系"}}</p>
  </div>
  <div style="max-width:350px; text-align:left;">
  <el-form :model="form" :label-position="labelPosition" label-width="90px"  ref='form'>
    <el-form-item prop="" label="院系名称:">
      <el-input  v-model="form.orgname"  placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item prop="" >
      {{form.parentOrgname}}
    </el-form-item>
    <el-form-item label="上级机构:" >
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
export default {
  name: 'personal',
  data() {
    return {
      optiontext:"",
      schoolflag:true,
      addbranchnum:1,
      labelPosition:'right',
      dialogVisible:false,
      form:{
        orgid:'',
        orgname:'',
        parentOrgname:'',
        parentOrgid:'',
      },
      otype: ['学校','学院','专业','分校区'],
      tableData:[],
      formdata:[],
      data2: [],
      data3: [],
      defaultProps: {
      children: 'children',
      label: 'label'
      }
    }
  },
  components:{
  },
  created(){
    institution.getorgantree().then(data=>{
      if(data.data.data[0] == ''){
        this.schoolflag = false;
      }
      this.form.schoolnames = data.data.data[0].label;
      console.log(data)
      this.data2 = data.data.data;
    })
  },
  mounted() {
    this.loadTree();
  },
  computed: {
    
  },
  methods:{
    p_nodeClick(data, node, arr) {
      if (data.type == '2') {
         node.expanded = false;
      }
      if (data.type == '3') {
        userApi.showTip("只能选择学校、院系作为父节点");
        return;
      }
      this.form.parentOrgname = data.label;
      this.form.parentOrgid = data.id;
    },
    po_nodeClick(data, node, arr) {
      console.log(data);
      this.loadTree(data.id, 'table');
    },
    loadTree(officeid, type) {
      let params = {officeid:officeid, xz:'1'}
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
      console.log(array);
      this.formdata = array;
    },
    //添加院系
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
    modification(){
      if (!this.form.orgname) {
        this.$message({
          message: '请填写院系名称',
          type: 'error',
          duration: 1500
        });
        return;
      }
      if (!this.form.parentOrgname) {
        this.$message({
          message: '上级院系不能为空',
          type: 'error',
          duration: 1500
        });
        return;
      }
      let formdata = new FormData()
      formdata.append('parent.id', this.form.parentOrgid);
      formdata.append('name', this.form.orgname);
      formdata.append('xz', '1'); //教学机构
      formdata.append('id', this.form.orgid);
      institution.addorgan(formdata).then(data=>{
        if(data){
          this.dialogVisible = false;
          this.loadTree();
          userApi.showMsg(data.data.meta);
        }
      });
    },
    // addrole(){
    //   this.dialogVisible=true;
    // },
    stumodofocation(index,row){

    },
    addOrg(id){ //添加弹窗
      if (id !== '0') {
        this.optiontext = '修改'
        this.getOrg(id);
      } else {
        this.dialogVisible=true;
        this.form.orgid = '';
        this.form.orgname = '';
        this.form.parentOrgname = '';
        this.form.parentOrgid = '';
        this.optiontext = '添加'
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
                      // this.formdata.splice(index,1)
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
                      // this.$message({
                      //   showClose: true,
                      //   message: req,
                      //   type: 'error'
                      // });
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
