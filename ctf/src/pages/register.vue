<template>
  <body id="poster">
  <el-form class="register-container" label-position="left" label-width="0px">
    <h3 class="register_title">注册</h3>
    <el-form-item>
      <el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
    </el-form-item>

    <el-form-item>
      <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>

    <el-form-item>
    <el-input type="password" v-model="registerForm.password1" auto-complete="off" placeholder="请再次输入密码"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="submitForm(registerForm)">确认注册</el-button>
    </el-form-item>
    <p class="other"><router-link to="/login">登录</router-link></p>
  </el-form>
  </body>
</template>

<script>
    export default {
        name: "register",
      data() {
        return {
          registerForm: {
            password: "",
            password1: "",
            username: ""
          },
          flag: true
        }
      },
      methods: {
        submitForm(formName) {
          if(this.registerForm.password1 != this.registerForm.password)
          {
            alert("两次输入密码不一致！")
            return;
          }
          console.log(this.registerForm.username);
          console.log(this.registerForm.password);
          this.$http.post('/yii/home/index/register',{
            username:this.registerForm.username,
            password:this.registerForm.password
          }).then(res=>{
            console.log(res.data)
            alert('注册成功')
            this.$router.push({
              path:'/login',
              params:{
                username:this.registerForm.username,
                password:this.registerForm.password
              }
            })
          }).catch(function (error) {
            console.log(error)
          })
        },
        // gotoLogin() {
        //   this.$router.push({
        //     path: "/login"
        //   });
        // }
      }
    }
</script>

<style scoped>
  #poster {
    /*background:url("../assets/eva.jpg") no-repeat;*/
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0;
  }

  .register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .register_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .other {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    text-align: center;
    /*text-indent: 8px;*/
    width: 360px;
  }
  .other:hover {
    /*color: #2c2fd6;*/
  }
</style>


