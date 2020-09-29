<template>
  <body id="poster">
  <el-form class="forget-container" label-position="left" label-width="0px">
    <h3 class="forget_title">找回密码</h3>
    <el-form-item>
      <el-input type="text" v-model="forgetForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>

    <el-form-item>
      <el-input type="password" v-model="forgetForm.password" auto-complete="off" placeholder="重置密码"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="forget">确认修改密码</el-button>
    </el-form-item>
    <p class="other"><router-link to="/register">没有账号？立即注册</router-link>|<router-link to="/login">登录</router-link></p>
  </el-form>
  </body>
</template>


<script>
  export default {
    name: "forget",
    data() {
      return {
        forgetForm: {
          username: '',
          password: ''
        },
        responseResult: []
      }
    },
    methods: {
      forget() {
        this.$http.post('/yii/home/index/forget',{
          username:this.forgetForm.username,
          password:this.forgetForm.password
        }).then(res=>{
          console.log(res.data)
          console.log(res.msg)
          alert('修改密码成功')
          this.$router.push({
            path:'/login',
            params:{
              username:this.forgetForm.username
            }
          })
        }).catch(function (error) {
          console.log(error)
        })
      },
      // gotoReigster() {
      //   this.$router.push({
      //     path: "/register"
      //   });
      // },
      // gotoLogin(){
      //   this.$router.push({
      //     path:"/login"
      //   });
      // }
    },
    created:function () {
      this.forgetForm.username = this.$route.params.username
    }
  }
</script>

<style>
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

  .forget-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .forget_title {
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
