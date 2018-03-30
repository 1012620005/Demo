export default {
            emailx: (rule, value, callback) => {             //邮箱验证
            let x = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (value === '') {
              callback(new Error('请输入邮箱地址'));
            } else {
              if (!x.exec(value) ) {
                callback(new Error('请输入正确邮箱地址'));
              }
              callback();
            }
          },
           required: (rule, value, callback) => {       //不为空
            if (!value) {
              return callback(new Error('此项为必填项'));
            }else{
              callback();
            }
          },
          validatePass : function(rule, value, callback) {       //两次密码校验
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.ruleForm2.checkPass !== '') {
                this.$refs.ruleForm2.validateField('checkPass');
              }
              callback();
            }
          },
          validatePass2: function(rule, value, callback) {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          },
           phonevalidate: (rule, value, callback) => {       //手机号验证
            let x = /^1(3|4|5|7|8)[0-9]\d{8}$/
            if (value === '') {
              callback(new Error('请输入号码'));
            } else {
              if (!x.exec(value) ) {
                callback(new Error('请输入正确号码'));
              }
              callback();
            }
          },
          identityvalidate:(rule, value, callback) => {       //身份证号
            // let x = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
            let x = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
            if (value === '') {
              callback(new Error('请输入身份证号'));
            } else {
              if (!x.exec(value) ) {
                callback(new Error('请输入正确身份证号'));
              }
              callback();
            }
          },
          usernames:(rule, value, callback) => {             //用户名验证
            let x = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            let y = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
            let z = /^1(3|4|5|7|8)[0-9]\d{8}$/
            let falg = true
            if (value === '') {
              callback(new Error('请输入用户名'));
            } else {
               if(!x.exec(value) & !y.exec(value) & !z.exec(value) == 1){
                  falg = true
               }else{
                  falg = false
               }
              if (falg) {
                callback(new Error('请输入正确用户名'));
              }
              callback();
            }
          },
          passwords:(rule, value, callback) => { 
            let x = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
               console.log(x.exec(value))
              if (x.exec(value) === null) {
                callback(new Error('密码必须由6-12位数字加字母组成'));
              }
              callback();
            }
          },
}
