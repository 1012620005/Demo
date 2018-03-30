import get from '../utils/get'
import post from '../utils/post'
export default {

  login(formData) {
      return post({
        url: '/uc/oauth/token',
        headers:{
          'grant_type' : 'password',
          'authorization': 'Basic cmM6cmNw'
        },
        data:formData
    })
  },
  getroleroot() {                  //获取权限树
      return get({
        url: '/uc/sys/permission/findTree',
        params:'',
    })
  },
  getorgantree(data) {                 //获取机构树
      return get({
        url: '/uc/sys/office/findTree',
        params:data,
    })
  },
  getorganrole(data) {                 //获取机构获取角色
      return get({
        url: '/uc/sys/role/findByOffice',
        params:data
    })
  },
  creatrole(formData) {
      return post({
        url: '/uc/sys/role/save',
        data:formData
    })
  },
  savePermission(formData) {        //分配权限
      return post({
        url: '/uc/sys/role/savePermission',
        data:formData
    })
  },
  enableOption(formData) {        //停用启用
      return post({
        url: '/uc/sys/role/enableOption',
        data:formData
    })
  },
  roledelete(formData) {        //删除角色
      return post({
        url: '/uc/sys/role/delete',
        data:formData
    })
  },
  savePermission(formData) {        //分配权限
      return post({
        url: '/uc/sys/role/savePermission',
        data:formData
    })
  },
  findPermissionByRole(data) {                 //获取角色权限
      return get({
        url: '/uc/sys/role/findPermissionByRole',
        params:data
    })
  },
  addorgan(data) {                 //添加学校、机构、学院/sys/office/delete
      return post({
        url: '/uc/sys/office/save',
        data:data
    })
  },
  deleteorgan(data) {                 //添加学校、机构、学院
      return post({
        url: '/uc/sys/office/delete',
        data:data
    })
  },
  get_roles(data) {                 //获取教师角色列表
      return get({
        url: '/uc/sys/user/findTeaRole',
        params:data
    })
  },
  set_role(data) {                //分配角色
      return post({
        url: '/uc/sys/role/distributeRoles',
        data:data
    })
  },
}
