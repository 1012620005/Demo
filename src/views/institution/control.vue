<template>
  <div  class="roleassign-table clear">
    <div class="roleassign-left left">
      <h3 class="roleassign-left-title">所有角色</h3>
      <div class="roleassign-left-cot">
          <el-tree
            :data="data2"
            :props="defaultProps"
            node-key="id"
            check-strictly
            @node-click="findRole"
            highlight-current
            accordion
            >
          </el-tree>
      </div>
    </div>
    <div class="roleassign-right right">
      <p style='text-align:left'>
        <span  @click="addrole" class="add-button"><img style="vertical-align: middle; " src="../../assets/image/add-icon.png"/><i style="vertical-align: middle; "> 添加角色</i></span>
      </p>
        <div class="roleassign-right-table">
              <el-table
              v-loading="loading2"
              :data="tableData"
              stripe
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="55">
              </el-table-column>
              <el-table-column
                prop="name"
                label="角色名称">
              </el-table-column>
              <el-table-column
                prop="officename"
                label="所属机构">
              </el-table-column>
              <el-table-column
                prop="sysDataName"
                label="角色类型"
                width="100">
              </el-table-column>
              <el-table-column
                prop="menuList"
                label="状态"
                width="80">
                <template slot-scope="scope">
                  <span>{{scope.row.menuList == '' ? "未分配" :"已分配" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="280">
                <template slot-scope="scope">
                  <el-button  @click="getRole(scope.row)" plain size="small">编辑</el-button>
                  <div class="table-end-caozuo">
                    <el-tooltip :enterable="false" :content="scope.row.useable== '1' ? '点击停用':'点击启用'" placement="top">
                      <el-switch
                        v-model="tableData[scope.$index].useable"
                        @change="deadstatusseitch(scope.$index,scope.row)"
                        active-color="#999"
                        inactive-color="#208af5"
                        active-value="1"
                        inactive-value="2">
                      </el-switch>
                    </el-tooltip>
                  </div>
                  <el-button  @click="addassign(scope.$index,scope.row)" type="success" plain size="small">分配权限</el-button>
                  <el-button  @click="deleteformation(scope.$index,scope.row)" type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
    </div>
     
    <!--添加角色-->
    <el-dialog   :visible.sync="dialogVisible" width="30%" >
      <div slot="title"  >
          <p style="font-size:16px;" >{{optiontext+"角色"}}</p>
      </div>
      <div class="addrole" style="max-width:500px; text-align:left;">
        <el-form :model="form" :label-position="labelPosition" label-width="75px"  ref='form'>
          <el-form-item  label="角色名称:">
            <el-input v-model="role.name"  placeholder="">
            </el-input>
          </el-form-item>
          <el-form-item label="" >
            {{role.officename}}
          </el-form-item>
          <el-form-item label="所属部门:"  >
            <el-tree
              :data="data2"
              :props="defaultProps"
              node-key="id"
              @node-click="p_nodeClick">
            </el-tree>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button   type="primary" @click="modification('form')"  >确 定</el-button>
      </div>
    </el-dialog>

    <!--添加名称-->
    <el-dialog   :visible.sync="dialogVisibleassign" width="30%" >
      <div slot="title" >
          <p style="font-size:16px;" >权限分配</p>
      </div>
      <div style="text-align:left; height:50px; font-size:16px;">
        {{menu.rolename}}
      </div>
      <div style=" text-align:left;">
          <el-tree
            :data="data3"
            show-checkbox
            ref="tree"
            :props="assignprops"
            node-key="id"
            @check-change="handleCheckChange"
            >
          </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleassign = false">取 消</el-button>
        <el-button   type="primary" @click="assignation('assign')"  >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import institution from "../../apis/institution.js";
import userApi from "../../apis/userCenter.js";
var istitution = 1;
var nstitution = 1;
var flags = true;
export default {
  name: "personal",
  data() {
    return {
      optiontext: "",
      loading2: true,
      labelPosition: "right",
      dialogVisible: false,
      dialogVisibleassign: false,
      form: {
        name: {
          rolename: "",
          roleenname: "",
          value1: true
        }
      },
      tableData: [],
      data2: [],
      defaultProps:{
        children: "children",
        label: "label",
        value:'id'
      },
      data3: [],
      assignprops: {
        children: "children",
        label: "label"
      },
      role: {
        name: "",
        enname: "",
        officeid: "",
        officename: "",
        id: ""
      },
      menu: {
        roleid: "",
        rolename: "",
        menuList: ""
      },
      ischeckedorgan: "", //table数据 角色信息
      ishandlcontrol: [], //权限分配
      nohandlcontrol: [],
      len: 1,
      addassignrow: "", //当前分配权限角色的信息
      addassignrowindex: "",
      xiugairole: "" //修改角色
    };
  },
  components: {},
  created() {
    institution.getroleroot().then(data => {
      this.data3 = data.data.data;
    });
    institution.getorgantree({ xz: "2", officeid: "" }).then(data => {
      this.data2 = data.data.data;
    });
    this.findRole();
  },
  mounted() {},
  computed: {
    nohandlcontrols: function() {
      let _nohandlcontrol = this.nohandlcontrol.map(function(item, index) {
        return item.id;
      });
      return _nohandlcontrol;
    },
    ishandlcontrols: function() {
      let _ishandlcontrol = this.ishandlcontrol.map(function(item, index) {
        return item.id;
      });
      return _ishandlcontrol;
    }
  },
  methods: {
    p_nodeClick(data, node, arr) {
      this.role.officename = data.label;
      this.role.officeid = data.id;
      console.log(data);
    },
    getRole(row) {
      //根据id获取角色
      this.optiontext = "修改";
      console.log(row);
      let params = { roleid: row.id };
      userApi.getRole(params).then(r => {
        let data = r.data.data;
        this.role.id = data.id;
        this.role.name = data.name;
        this.role.officename = data.officename;
        this.role.officeid = data.officeid;
        this.dialogVisible = true;
      });
    },
    organChange(data, checked, indeterminate) {
      this.ischeckedorgan = data;
      this.getorganroleadd();
    },
    findRole(data, node, arr) {
      //加载角色列表
      let id = "";
      if (data) {
        id = data.id;
      }
      let datas = { officeid: id };
      institution.getorganrole(datas).then(data => {
        if (data) {
          this.tableData = data.data.data.map(function(item) {
            if (item.useable == "1") {
              item.useable = true;
            } else {
              item.useable = false;
            }
            return item;
          });
          this.loading2 = false;
          this.dialogVisibleassign = false;
        } else {
          this.$message({
            showClose: true,
            message: data.data.meta.message,
            type: "error"
          });
        }
      })
      .catch(req => {
        this.$message({
          showClose: true,
          message: req,
          type: "error"
        });
      });
    },
    //权限分配
    handleCheckChange(data, checked, indeterminate) {
      let _this = this;
      this.menu.menuList = _this.$refs.tree.getCheckedKeys();
    },
    //添加权限弹出
    addassign(index, row) {
      this.menu.menuList = [];
      let roleid = row.id;
      let params = { roleid: roleid };
      let _this = this;
      userApi.getRole(params).then(r => {
        let role = r.data.data;
        if (r.data.meta.code == 200) {
          this.dialogVisibleassign = true;
          this.menu.roleid = role.id;
          this.menu.rolename = role.name;
          let mlist = role.menuList;
          setTimeout(function() {
            _this.$refs.tree.setCheckedKeys(userApi.obj2arr(mlist, "id"));
          }, 0);
        } else {
          userApi.showMsg(r.data.meta);
        }
      });
    },
    //添加权限
    assignation() {
      let menuList = this.menu.menuList;
      this.$confirm("确认分配权限?", "提示", {
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",

        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            let formdata = new FormData();
            formdata.append("roleid", this.menu.roleid);
            formdata.append("menus", menuList);
            institution
              .savePermission(formdata)
              .then(data => {
                done();
                if (data) {
                  this.findRole();
                  userApi.showMsg(data.data.meta);
                  instance.confirmButtonLoading = false;
                  this.dialogVisibleassign = false;
                }
              })
              .catch(req => {
                this.$message({
                  showClose: true,
                  message: req,
                  type: "error"
                });
                done();
              });
          } else {
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
    modification() {
      //创建修改角色
      let formdata = new FormData();
      formdata.append("name", this.role.name);
      // formdata.append('enname', this.role.enname);
      formdata.append("officeid", this.role.officeid);
      formdata.append("id", this.role.id);
      institution.creatrole(formdata).then(r => {
        if (r) {
          userApi.showMsg(r.data.meta);
          this.dialogVisible = false;
          this.findRole();
        }
      });
    },
    addrole(index, row) {
      //添加修改角色
      this.optiontext = "添加";
      this.role = {
        name: "",
        enname: "",
        officeid: "",
        officename: "",
        id: ""
      };
      this.dialogVisible = true;
    },
    deleteformation(index, row) {
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
            formdata.append("roleid", row.id);
            institution.roledelete(formdata).then(data => {
              instance.confirmButtonLoading = false;
              done();
              if (data) {
                this.findRole();
                this.$message({
                  showClose: true,
                  message: data.data.meta.message,
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
    deadstatusseitch(index, row) {
      //停用启用角色
      let flag;
      console.log(row.useable);
      if (row.useable == "1") {
        flag = "2";
      } else {
        flag = "1";
      }
      let formdata = new FormData();
      formdata.append("roleid", row.id);
      formdata.append("type", flag);
      institution.enableOption(formdata).then(data => {
        if (data) {
          this.$message({
            showClose: true,
            message: data.data.meta.message,
            type: "success"
          });
        }
      });
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
.magessBox {
  width: 1200px;
  margin: 0 auto 30px;
  padding-bottom: 20px;
  background-color: #fff;
}
.roleassign-table {
  width: 1150px;
  margin: 20px auto 0;
}
.roleassign-right-table {
  text-align: left;
  margin-top: 20px;
}
.roleassign-right {
  width: 880px;
}
.roleassign-right-title {
  text-align: left;
  height: 20px;
}
.roleassign-right-title img {
  cursor: pointer;
}
.addschool-f {
  text-align: right;
}
.addschool-f img {
  cursor: pointer;
}
.table-end-caozuo {
  height: 24px;
  line-height: 24px;
  display: inline-block;
  cursor: pointer;
  margin-right: 5px;
}
.table-end-caozuo img {
  vertical-align: middle;
}
.roleassign-left {
  width: 240px;
}
.roleassign-left-title {
  font-size: 16px;
  text-align: left;
  color: #666;
  height: 20px;
}
.roleassign-left-cot {
  text-align: left;
  margin-top: 20px;
}
/*弹出窗口*/
.rolename-box {
  display: inline-block;
  width: 247px;
}
</style>
<style>
.addrole .el-form-item__content {
  margin-top: 5px;
}
</style>
