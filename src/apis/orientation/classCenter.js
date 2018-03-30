import get from '../../utils/get'
import post from '../../utils/post1'
export default {

  logout() {
      return get({
        url: '/work1/clazzmanager/distritem/distrClazzForProf?campusId=0761de6d4a1c43cc9a391805c2cecd8a&deptId=d82de0f42f6b4187bbdd1c8928877b2c&profId=b10844a353aa413099a7231142388cf9',
    })
  },
  randerList () {
    return get({
      url: ''
    })
  }
}