<template>
  <div>

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <div class="logo">
          <router-link to="/home" class="router-link-active">
          <img style="width: 50px;height: 50px" src="../assets/logo.png">首页
          </router-link>
        </div>
      </el-menu-item>
      <el-menu-item index="2">getUserName()</el-menu-item>

      <el-submenu index="2" class="header-user">

            <template slot="title">我的</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
    export default {
        name: "Home",
      data() {
        return {
          activeIndex: '1',
          homeFrom:{
            username:'',
            // password:''
          }
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        getUserName()
        {
          return this.homeFrom.username
        }
      },
      created:function () {
        this.homeFrom.username=this.$router.params.username;
        // this.homeFrom.password=this.$router.params.password
      }
    }
</script>

<style scoped>

  .router-link-active{
    text-decoration: none;
    font-size: 50px;
  }
  .header-user{
    text-align: right;
  }
</style>
